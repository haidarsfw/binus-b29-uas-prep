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

// Cloudinary Config (Free tier - unsigned upload)
const CLOUDINARY_CLOUD_NAME = 'dmerjrm3p';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

// Image compression
export const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Upload image to Cloudinary (free, reliable, no Firebase upgrade needed!)
export const uploadImage = async (file) => {
    try {
        // Compress image first
        let uploadFile = file;
        if (file.type.startsWith('image/')) {
            uploadFile = await compressImage(file);
        }

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error('Upload gagal. Pastikan Cloudinary config sudah benar.');
        }

        const data = await response.json();
        console.log('Cloudinary response:', data); // Debug log

        if (data.secure_url) {
            console.log('Image URL:', data.secure_url);
            return data.secure_url;
        } else {
            throw new Error(data.error?.message || 'Upload gagal');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

// Upload audio to Cloudinary (uses /video/upload endpoint)
export const uploadAudio = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('resource_type', 'video'); // audio uses video resource type

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            console.error('Cloudinary audio error:', errData);
            throw new Error('Upload audio gagal');
        }

        const data = await response.json();
        console.log('Cloudinary audio response:', data);

        if (data.secure_url) {
            return data.secure_url;
        } else {
            throw new Error(data.error?.message || 'Upload audio gagal');
        }
    } catch (error) {
        console.error('Error uploading audio:', error);
        throw error;
    }
};

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

    // If unlimited devices, skip device validation
    if (license.unlimitedDevices) {
        const now = new Date();
        const expiry = new Date(now.getTime() + license.daysActive * 86400000);
        return {
            valid: true,
            license: {
                ...license,
                userName: license.name,
                expiry: expiry.toISOString()
            }
        };
    }

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

// Remove user from online presence (called on logout)
export const removePresence = (userId) => {
    const userStatusRef = ref(db, `presence/${userId}`);
    remove(userStatusRef);
};

export const subscribeToPresence = (callback) => {
    const presenceRef = ref(db, 'presence');
    return onValue(presenceRef, (snapshot) => {
        const data = snapshot.val() || {};
        const now = Date.now();
        const ACTIVE_THRESHOLD = 60 * 60 * 1000; // 1 hour in ms

        const users = Object.entries(data)
            .filter(([_, v]) => {
                if (!v.online) return false;
                // Filter out users who haven't been active in 15 minutes
                const lastSeen = v.lastSeen || 0;
                return (now - lastSeen) < ACTIVE_THRESHOLD;
            })
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

// Helper function for timeout
const withTimeout = (promise, ms) => {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Koneksi timeout. Coba lagi.')), ms)
    );
    return Promise.race([promise, timeout]);
};

export const createThread = async (subjectId, title, content, authorId, authorName, authorClass, imageUrl = null) => {
    const threadsRef = ref(db, `forums/${subjectId}/threads`);
    const newThread = {
        title,
        content,
        authorId,
        authorName,
        authorClass: authorClass || 'Other',
        imageUrl,
        createdAt: new Date().toISOString(),
        closed: false,
        commentCount: 0,
    };

    try {
        const newRef = push(threadsRef);
        await withTimeout(set(newRef, newThread), 8000);
        return newRef.key;
    } catch (error) {
        console.error('Error creating thread:', error);
        throw error;
    }
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

export const addComment = async (subjectId, threadId, content, authorId, authorName, authorClass) => {
    const commentsRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments`);
    const threadRef = ref(db, `forums/${subjectId}/threads/${threadId}`);

    const newComment = {
        content,
        authorId,
        authorName,
        authorClass: authorClass || 'Other',
        createdAt: new Date().toISOString(),
    };

    try {
        await withTimeout(push(commentsRef, newComment), 8000);

        // Update comment count using get() with timeout
        const snapshot = await withTimeout(get(commentsRef), 5000);
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        await withTimeout(update(threadRef, { commentCount: count }), 5000);
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

export const deleteComment = async (subjectId, threadId, commentId) => {
    const commentRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments/${commentId}`);
    const threadRef = ref(db, `forums/${subjectId}/threads/${threadId}`);
    const commentsRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments`);

    try {
        await withTimeout(remove(commentRef), 8000);
        // Update comment count
        const snapshot = await withTimeout(get(commentsRef), 5000);
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        await withTimeout(update(threadRef, { commentCount: count }), 5000);
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

export const addReply = async (subjectId, threadId, commentId, content, authorId, authorName, authorClass) => {
    const repliesRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments/${commentId}/replies`);

    const newReply = {
        content,
        authorId,
        authorName,
        authorClass: authorClass || 'Other',
        createdAt: new Date().toISOString(),
    };

    try {
        await withTimeout(push(repliesRef, newReply), 8000);
    } catch (error) {
        console.error('Error adding reply:', error);
        throw error;
    }
};

export const deleteReply = async (subjectId, threadId, commentId, replyId) => {
    const replyRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments/${commentId}/replies/${replyId}`);
    try {
        await withTimeout(remove(replyRef), 8000);
    } catch (error) {
        console.error('Error deleting reply:', error);
        throw error;
    }
};

// ============================================
// GLOBAL CHAT SYSTEM
// ============================================

// Subscribe to global chat messages (last 100)
export const subscribeToGlobalChat = (callback) => {
    const chatRef = ref(db, 'globalChat');
    return onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const messages = Object.entries(data)
                .map(([id, msg]) => ({ id, ...msg }))
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .slice(-100); // Keep last 100 messages
            callback(messages);
        } else {
            callback([]);
        }
    });
};

// Send global chat message
export const sendGlobalMessage = async (content, authorId, authorName, authorClass, type = 'text', mediaUrl = null, replyData = {}) => {
    const chatRef = ref(db, 'globalChat');
    const newMessage = {
        content,
        type, // 'text', 'image', 'audio', 'sticker'
        mediaUrl,
        authorId,
        authorName,
        authorClass,
        createdAt: new Date().toISOString(),
        ...replyData // Include replyToId, replyToName, replyToContent if present
    };
    try {
        await withTimeout(push(chatRef, newMessage), 8000);
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Delete global chat message (soft delete - marks as deleted)
export const deleteGlobalMessage = async (messageId) => {
    const msgRef = ref(db, `globalChat/${messageId}`);
    try {
        await withTimeout(update(msgRef, { deleted: true, content: '', mediaUrl: null }), 8000);
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};

// Compress audio to smaller size
export const compressAudio = async (blob) => {
    // Return original for now - audio compression is complex
    // In production, use a library like lamejs for MP3 compression
    return blob;
};

export { db, ref, onValue };
