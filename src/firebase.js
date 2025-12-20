import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, push, remove, update, onDisconnect, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBMhL2t-KrIS0M22607mB3ovEq_pe5OcSs",
    authDomain: "binus-b29-uas-prep.firebaseapp.com",
    databaseURL: "https://binus-b29-uas-prep-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "binus-b29-uas-prep",
    storageBucket: "binus-b29-uas-prep.firebasestorage.app",
    messagingSenderId: "585421081642",
    appId: "1:585421081642:web:a4db50f1cd77ac53704753"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Generate unique device ID
export const getDeviceId = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        const nav = window.navigator;
        const screen = window.screen;
        const fingerprint = [
            nav.userAgent,
            nav.language,
            screen.colorDepth,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            nav.hardwareConcurrency || 0,
            nav.platform,
        ].join('|');
        deviceId = btoa(fingerprint).slice(0, 32) + '_' + Date.now().toString(36);
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
};

// License validation with device lock (with timeout)
export const validateLicenseWithDevice = async (key, licenses) => {
    const license = licenses.find(l => l.key.toUpperCase() === key.toUpperCase());
    if (!license) return { valid: false, error: 'License key tidak valid' };

    const deviceId = getDeviceId();
    const licenseRef = ref(db, `licenses/${key.toUpperCase()}`);

    try {
        // Use get() with timeout instead of onValue()
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), 8000)
        );

        const snapshot = await Promise.race([get(licenseRef), timeoutPromise]);
        const data = snapshot.val();

        if (data) {
            // License already activated
            if (data.deviceId !== deviceId) {
                return { valid: false, error: 'License sudah digunakan di device lain' };
            }
            // Check expiry
            if (data.expiry && new Date(data.expiry) < new Date()) {
                return { valid: false, error: 'License sudah expired' };
            }
            return { valid: true, license: { ...license, ...data } };
        } else {
            // First time activation
            const now = new Date();
            const expiry = new Date(now.getTime() + license.daysActive * 86400000);
            const newData = {
                deviceId,
                userName: license.name,
                activatedAt: now.toISOString(),
                expiry: expiry.toISOString(),
            };
            await set(licenseRef, newData);
            return { valid: true, license: { ...license, ...newData } };
        }
    } catch (error) {
        console.error('Firebase error:', error);
        if (error.message === 'timeout') {
            return { valid: false, error: 'Koneksi timeout. Cek internet Anda.' };
        }
        return { valid: false, error: 'Koneksi ke server gagal: ' + error.message };
    }
};

// Presence system
export const setupPresence = (userId, userName, currentSubject = null) => {
    const userStatusRef = ref(db, `presence/${userId}`);
    const connectedRef = ref(db, '.info/connected');

    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            // Connected
            const statusData = {
                online: true,
                userName,
                currentSubject,
                lastSeen: serverTimestamp(),
            };
            set(userStatusRef, statusData);

            // When disconnected
            onDisconnect(userStatusRef).update({
                online: false,
                lastSeen: serverTimestamp(),
            });
        }
    });

    return userStatusRef;
};

export const updatePresence = (userId, data) => {
    const userStatusRef = ref(db, `presence/${userId}`);
    update(userStatusRef, { ...data, lastSeen: serverTimestamp() });
};

export const subscribeToPresence = (callback) => {
    const presenceRef = ref(db, 'presence');
    return onValue(presenceRef, (snapshot) => {
        const data = snapshot.val() || {};
        const users = Object.entries(data)
            .filter(([_, v]) => v.online)
            .map(([id, v]) => ({ id, ...v }));
        callback(users);
    });
};

// Forum system
export const subscribeToThreads = (subjectId, callback) => {
    const threadsRef = ref(db, `forums/${subjectId}/threads`);
    return onValue(threadsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const threads = Object.entries(data)
            .map(([id, v]) => ({ id, ...v }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(threads);
    });
};

export const createThread = async (subjectId, title, content, authorId, authorName) => {
    const threadsRef = ref(db, `forums/${subjectId}/threads`);
    const newThread = {
        title,
        content,
        authorId,
        authorName,
        createdAt: new Date().toISOString(),
        closed: false,
        commentCount: 0,
    };
    const newRef = push(threadsRef);
    await set(newRef, newThread);
    return newRef.key;
};

export const deleteThread = async (subjectId, threadId) => {
    const threadRef = ref(db, `forums/${subjectId}/threads/${threadId}`);
    await remove(threadRef);
};

export const closeThread = async (subjectId, threadId, closed) => {
    const threadRef = ref(db, `forums/${subjectId}/threads/${threadId}`);
    await update(threadRef, { closed });
};

export const subscribeToComments = (subjectId, threadId, callback) => {
    const commentsRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments`);
    return onValue(commentsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const comments = Object.entries(data)
            .map(([id, v]) => ({ id, ...v }))
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        callback(comments);
    });
};

export const addComment = async (subjectId, threadId, content, authorId, authorName) => {
    const commentsRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments`);
    const threadRef = ref(db, `forums/${subjectId}/threads/${threadId}`);

    const newComment = {
        content,
        authorId,
        authorName,
        createdAt: new Date().toISOString(),
    };

    await push(commentsRef, newComment);

    // Update comment count
    onValue(commentsRef, (snapshot) => {
        const count = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
        update(threadRef, { commentCount: count });
    }, { onlyOnce: true });
};

export { db, ref, onValue };
