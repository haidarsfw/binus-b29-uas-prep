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
        if (data.secure_url) {
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

// ============================================
// LICENSE KEY SYSTEM (Firebase-based)
// ============================================

// Fetch all license keys from Firebase (admin only)
export const fetchLicenseKeys = async () => {
    try {
        const licenseKeysRef = ref(db, 'licenseKeys');
        const snapshot = await withTimeout(get(licenseKeysRef), 15000);
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.entries(data).map(([id, value]) => ({ id, ...value }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching license keys:', error);
        throw error;
    }
};

// Create a new license key (admin only)
export const createLicenseKey = async (keyData) => {
    const { key, name, daysActive, isAdmin = false, isTester = false, maxDevices = 1, fixedExpiry = null } = keyData;
    const licenseKeyRef = ref(db, `licenseKeys/${key.toUpperCase()}`);
    const newKey = {
        key: key.toUpperCase(),
        name,
        daysActive: parseInt(daysActive),
        isAdmin,
        isTester,
        maxDevices: parseInt(maxDevices) || 1, // Default to 1 device
        fixedExpiry: fixedExpiry || null, // If set, use this instead of calculating from daysActive
        createdAt: new Date().toISOString(),
    };
    try {
        await withTimeout(set(licenseKeyRef, newKey), 15000);
        return newKey;
    } catch (error) {
        console.error('Error creating license key:', error);
        throw error;
    }
};

// Update an existing license key (admin only)
export const updateLicenseKey = async (originalKey, keyData) => {
    const { key, name, daysActive, isAdmin, maxDevices, fixedExpiry } = keyData;

    try {
        // If key changed, need to move data
        if (originalKey.toUpperCase() !== key.toUpperCase()) {
            // Get old data
            const oldKeyRef = ref(db, `licenseKeys/${originalKey.toUpperCase()}`);
            const oldActivationRef = ref(db, `licenses/${originalKey.toUpperCase()}`);

            const [keySnapshot, activationSnapshot] = await Promise.all([
                withTimeout(get(oldKeyRef), 15000),
                withTimeout(get(oldActivationRef), 15000)
            ]);

            // Create new data at new location
            const newKeyRef = ref(db, `licenseKeys/${key.toUpperCase()}`);
            const newActivationRef = ref(db, `licenses/${key.toUpperCase()}`);

            const updatedKey = {
                key: key.toUpperCase(),
                name,
                daysActive: parseInt(daysActive),
                isAdmin: isAdmin || false,
                isTester: keyData.isTester || false,
                maxDevices: parseInt(maxDevices) || 1,
                fixedExpiry: fixedExpiry || null,
                createdAt: keySnapshot.exists() ? keySnapshot.val().createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            await withTimeout(set(newKeyRef, updatedKey), 15000);

            if (activationSnapshot.exists()) {
                await withTimeout(set(newActivationRef, activationSnapshot.val()), 15000);
                await withTimeout(remove(oldActivationRef), 15000);
            }

            await withTimeout(remove(oldKeyRef), 15000);
        } else {
            // Just update existing
            const keyRef = ref(db, `licenseKeys/${key.toUpperCase()}`);
            const snapshot = await withTimeout(get(keyRef), 15000);

            const updatedKey = {
                ...(snapshot.exists() ? snapshot.val() : {}),
                key: key.toUpperCase(),
                name,
                daysActive: parseInt(daysActive),
                isAdmin: isAdmin || false,
                isTester: keyData.isTester || false,
                maxDevices: parseInt(maxDevices) || 1,
                fixedExpiry: fixedExpiry || null,
                updatedAt: new Date().toISOString(),
            };

            await withTimeout(set(keyRef, updatedKey), 15000);
        }

        return true;
    } catch (error) {
        console.error('Error updating license key:', error);
        throw error;
    }
};

// Admin function to update user's display name across all Firebase locations
// This propagates name changes to: licenses, presence, chat messages, forum threads/comments
export const adminUpdateDisplayName = async (licenseKey, oldName, newName) => {
    if (!licenseKey || !newName || oldName === newName) return;

    const updates = {};
    const keyUpper = licenseKey.toUpperCase();

    try {
        // 1. Update licenses activation data
        const activationRef = ref(db, `licenses/${keyUpper}`);
        const activationSnap = await get(activationRef);
        if (activationSnap.exists()) {
            const data = activationSnap.val();
            if (data.userName === oldName) {
                updates[`licenses/${keyUpper}/userName`] = newName;
            }
        }

        // 2. Update presence system
        const presenceRef = ref(db, 'presence');
        const presenceSnap = await get(presenceRef);
        if (presenceSnap.exists()) {
            const presenceData = presenceSnap.val();
            Object.entries(presenceData).forEach(([userId, userData]) => {
                if (userData.userName === oldName) {
                    updates[`presence/${userId}/userName`] = newName;
                }
            });
        }

        // 3. Update global chat messages
        const chatRef = ref(db, 'globalChat');
        const chatSnap = await get(chatRef);
        if (chatSnap.exists()) {
            const messages = chatSnap.val();
            Object.entries(messages).forEach(([msgId, msg]) => {
                if (msg.authorName === oldName) {
                    updates[`globalChat/${msgId}/authorName`] = newName;
                }
            });
        }

        // 4. Update forum threads and comments
        const forumRef = ref(db, 'forum');
        const forumSnap = await get(forumRef);
        if (forumSnap.exists()) {
            const subjects = forumSnap.val();
            Object.entries(subjects).forEach(([subjectId, threads]) => {
                if (threads) {
                    Object.entries(threads).forEach(([threadId, thread]) => {
                        // Update thread author
                        if (thread.authorName === oldName) {
                            updates[`forum/${subjectId}/${threadId}/authorName`] = newName;
                        }
                        // Update comments
                        if (thread.comments) {
                            Object.entries(thread.comments).forEach(([commentId, comment]) => {
                                if (comment.authorName === oldName) {
                                    updates[`forum/${subjectId}/${threadId}/comments/${commentId}/authorName`] = newName;
                                }
                                // Update replies
                                if (comment.replies) {
                                    Object.entries(comment.replies).forEach(([replyId, reply]) => {
                                        if (reply.authorName === oldName) {
                                            updates[`forum/${subjectId}/${threadId}/comments/${commentId}/replies/${replyId}/authorName`] = newName;
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }

        // 5. Apply all updates atomically
        if (Object.keys(updates).length > 0) {
            await update(ref(db), updates);
        }

        return true;
    } catch (error) {
        console.error('Error updating display name across Firebase:', error);
        throw error;
    }
};

// Delete a license key (admin only)
export const deleteLicenseKey = async (key) => {
    const licenseKeyRef = ref(db, `licenseKeys/${key.toUpperCase()}`);
    const activationRef = ref(db, `licenses/${key.toUpperCase()}`);
    try {
        await withTimeout(remove(licenseKeyRef), 15000);
        await withTimeout(remove(activationRef), 15000); // Also remove activation data
        return true;
    } catch (error) {
        console.error('Error deleting license key:', error);
        throw error;
    }
};

// Reset device registrations for a license key (admin only)
export const resetLicenseDevices = async (key) => {
    const activationRef = ref(db, `licenses/${key.toUpperCase()}`);
    try {
        const snapshot = await withTimeout(get(activationRef), 15000);
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Keep other data but reset deviceIds
            await withTimeout(update(activationRef, {
                deviceIds: [],
                deviceId: null // Legacy field
            }), 15000);
        }
        return true;
    } catch (error) {
        console.error('Error resetting devices:', error);
        throw error;
    }
};

// License validation with device lock (fetches from Firebase)
export const validateLicenseWithDevice = async (key, referralCode = null) => {
    try {
        // Fetch license key from Firebase
        const licenseKeyRef = ref(db, `licenseKeys/${key.toUpperCase()}`);
        const keySnapshot = await withTimeout(get(licenseKeyRef), 15000);

        if (!keySnapshot.exists()) {
            return { valid: false, error: 'License key tidak valid' };
        }

        const license = keySnapshot.val();
        let referralResult = null;
        const now = new Date();

        // Check if account is suspended
        if (license.suspendedUntil && new Date(license.suspendedUntil) > now) {
            return { valid: false, error: `Akun disuspend sampai ${new Date(license.suspendedUntil).toLocaleString('id-ID')}` };
        }

        // Check fixedExpiry FIRST (before any other validation)
        if (license.fixedExpiry) {
            const fixedExpiryDate = new Date(license.fixedExpiry);
            if (fixedExpiryDate < now) {
                return { valid: false, error: 'License sudah expired' };
            }
        }

        // If unlimited devices, skip device validation
        if (license.unlimitedDevices) {
            const expiry = license.fixedExpiry
                ? new Date(license.fixedExpiry)
                : new Date(now.getTime() + license.daysActive * 86400000);

            // Handle referral if provided
            if (referralCode) {
                referralResult = await applyReferralCode(referralCode, key.toUpperCase());
            }

            return {
                valid: true,
                referralResult,
                license: {
                    ...license,
                    licenseKey: key.toUpperCase(),
                    userName: license.name,
                    expiry: expiry.toISOString()
                }
            };
        }

        const deviceId = getDeviceId();
        const activationRef = ref(db, `licenses/${key.toUpperCase()}`);
        const activationSnapshot = await withTimeout(get(activationRef), 15000);
        const activationData = activationSnapshot.val();

        // Determine max devices allowed
        const maxDevices = license.maxDevices || (license.unlimitedDevices ? 999 : 1);

        if (activationData) {
            // License already activated - check if this device is allowed
            const existingDevices = activationData.deviceIds || (activationData.deviceId ? [activationData.deviceId] : []);

            // Check if current device is in the list
            if (!existingDevices.includes(deviceId)) {
                // Device not registered - check if we can add more
                if (existingDevices.length >= maxDevices) {
                    return { valid: false, error: `License sudah digunakan di ${existingDevices.length} device (max: ${maxDevices})` };
                }
                // Add this device
                const updatedDevices = [...existingDevices, deviceId];
                await update(activationRef, { deviceIds: updatedDevices });
            }

            // Check expiry from activation data
            if (activationData.expiry && new Date(activationData.expiry) < now) {
                return { valid: false, error: 'License sudah expired' };
            }

            // Handle referral if provided (even on re-login, will be rejected if already used)
            if (referralCode) {
                referralResult = await applyReferralCode(referralCode, key.toUpperCase());
            }

            return {
                valid: true,
                referralResult,
                license: {
                    ...license,
                    ...activationData,
                    deviceIds: activationData.deviceIds || existingDevices,
                    licenseKey: key.toUpperCase()
                }
            };
        } else {
            // First time activation
            // Use fixedExpiry if set, otherwise calculate from daysActive
            const expiry = license.fixedExpiry
                ? new Date(license.fixedExpiry)
                : new Date(now.getTime() + license.daysActive * 86400000);

            // Double-check expiry for first activation
            if (expiry < now) {
                return { valid: false, error: 'License sudah expired' };
            }

            // Generate referral code for this user
            const userReferralCode = generateReferralCode(key);

            const newData = {
                deviceIds: [deviceId], // Store as array for multi-device support
                userName: license.name,
                activatedAt: now.toISOString(),
                expiry: expiry.toISOString(),
                referralCode: userReferralCode,
                referralCount: 0,
            };
            await set(activationRef, newData);

            // Handle referral if provided
            if (referralCode) {
                referralResult = await applyReferralCode(referralCode, key.toUpperCase());
                // Update referredBy based on result
                if (referralResult?.success) {
                    await update(activationRef, {
                        referredBy: referralCode,
                        referredByUser: referralResult.referrerName
                    });
                }
            }

            return {
                valid: true,
                referralResult,
                license: {
                    ...license,
                    ...newData,
                    referredBy: referralResult?.success ? referralCode : null,
                    licenseKey: key.toUpperCase()
                }
            };
        }
    } catch (error) {
        console.error('Firebase error:', error);
        if (error.message === 'timeout') {
            return { valid: false, error: 'Koneksi timeout. Cek internet Anda.' };
        }
        return { valid: false, error: 'Koneksi ke server gagal: ' + error.message };
    }
};

// ============================================
// REFERRAL SYSTEM
// ============================================

// Generate unique referral code
export const generateReferralCode = (licenseKey) => {
    const base = licenseKey.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `REF-${base.slice(0, 4)}-${random}`;
};

// Ensure user has a referral code (create if missing)
export const ensureReferralCode = async (licenseKey) => {
    try {
        const activationRef = ref(db, `licenses/${licenseKey.toUpperCase()}`);
        const snapshot = await withTimeout(get(activationRef), 15000);

        if (!snapshot.exists()) {
            return null; // User not activated yet
        }

        const data = snapshot.val();
        if (data.referralCode) {
            return data.referralCode; // Already has one
        }

        // Generate and save new referral code
        const newCode = generateReferralCode(licenseKey);
        await update(activationRef, { referralCode: newCode, referralCount: data.referralCount || 0 });
        return newCode;
    } catch (error) {
        console.error('Error ensuring referral code:', error);
        return null;
    }
};

// Apply referral code (increment referrer's count)
// Returns: { success, error?, referrerName?, referredName? }
export const applyReferralCode = async (referralCode, newUserKey) => {
    try {
        if (!referralCode || !newUserKey) {
            return { success: false, error: 'Kode referral tidak valid' };
        }

        // First check if this user has already used a referral
        const newUserRef = ref(db, `licenses/${newUserKey.toUpperCase()}`);
        const newUserSnapshot = await withTimeout(get(newUserRef), 15000);

        if (newUserSnapshot.exists()) {
            const newUserData = newUserSnapshot.val();
            // Check if already used a referral
            if (newUserData.referredBy) {
                return { success: false, error: 'Anda sudah pernah menggunakan kode referral' };
            }
        }

        // Find who owns this referral code
        const licensesRef = ref(db, 'licenses');
        const snapshot = await withTimeout(get(licensesRef), 15000);

        if (!snapshot.exists()) {
            return { success: false, error: 'Kode referral tidak ditemukan' };
        }

        const licenses = snapshot.val();
        let referrerId = null;
        let referrerData = null;

        for (const [key, data] of Object.entries(licenses)) {
            if (data.referralCode === referralCode && key.toUpperCase() !== newUserKey.toUpperCase()) {
                referrerId = key;
                referrerData = data;
                break;
            }
        }

        // Check if trying to use own referral code
        for (const [key, data] of Object.entries(licenses)) {
            if (data.referralCode === referralCode && key.toUpperCase() === newUserKey.toUpperCase()) {
                return { success: false, error: 'Tidak bisa menggunakan kode referral sendiri' };
            }
        }

        if (!referrerId) {
            return { success: false, error: 'Kode referral tidak ditemukan' };
        }

        const referrerRef = ref(db, `licenses/${referrerId}`);
        const newUserData = newUserSnapshot.exists() ? newUserSnapshot.val() : {};

        // Increment referral count for referrer
        await update(referrerRef, {
            referralCount: (referrerData.referralCount || 0) + 1
        });

        // Mark the new user as referred
        await update(newUserRef, {
            referredBy: referralCode,
            referredByUser: referrerData.userName || referrerId
        });

        // Record the referral for history
        const referralRecordRef = ref(db, `referrals/${referrerId}/${newUserKey.toUpperCase()}`);
        await set(referralRecordRef, {
            referredAt: new Date().toISOString(),
            newUserKey: newUserKey.toUpperCase(),
            newUserName: newUserData.userName || newUserKey
        });

        return {
            success: true,
            referrerName: referrerData.userName || referrerId,
            referredName: newUserData.userName || newUserKey
        };
    } catch (error) {
        console.error('Error applying referral:', error);
        return { success: false, error: 'Gagal menerapkan kode referral' };
    }
};

// Get referral stats for a user
export const getReferralStats = async (licenseKey) => {
    try {
        const activationRef = ref(db, `licenses/${licenseKey.toUpperCase()}`);
        const snapshot = await withTimeout(get(activationRef), 15000);

        if (!snapshot.exists()) return { referralCode: null, referralCount: 0 };

        const data = snapshot.val();
        return {
            referralCode: data.referralCode || null,
            referralCount: data.referralCount || 0,
            referredBy: data.referredBy || null
        };
    } catch (error) {
        console.error('Error getting referral stats:', error);
        return { referralCode: null, referralCount: 0 };
    }
};

// Get referral leaderboard
export const getReferralLeaderboard = async () => {
    try {
        const licensesRef = ref(db, 'licenses');
        const snapshot = await withTimeout(get(licensesRef), 15000);

        if (!snapshot.exists()) return [];

        const licenses = snapshot.val();
        const leaderboard = Object.entries(licenses)
            .filter(([_, data]) => data.referralCount > 0)
            .map(([key, data]) => ({
                licenseKey: key,
                userName: data.userName,
                referralCount: data.referralCount || 0
            }))
            .sort((a, b) => b.referralCount - a.referralCount)
            .slice(0, 10); // Top 10

        return leaderboard;
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        return [];
    }
};

// ============================================
// USER SETTINGS SYNC
// ============================================

// Save user settings to Firebase (syncs across devices)
export const saveUserSettings = async (licenseKey, settings) => {
    try {
        const settingsRef = ref(db, `userSettings/${licenseKey.toUpperCase()}`);
        await withTimeout(update(settingsRef, {
            ...settings,
            updatedAt: new Date().toISOString()
        }), 15000);
        return true;
    } catch (error) {
        console.error('Error saving settings:', error);
        return false;
    }
};

// Get user settings from Firebase
export const getUserSettings = async (licenseKey) => {
    try {
        const settingsRef = ref(db, `userSettings/${licenseKey.toUpperCase()}`);
        const snapshot = await withTimeout(get(settingsRef), 15000);

        if (!snapshot.exists()) return null;
        return snapshot.val();
    } catch (error) {
        console.error('Error getting settings:', error);
        return null;
    }
};

// Subscribe to user settings for realtime sync across devices
export const subscribeToUserSettings = (licenseKey, callback) => {
    const settingsRef = ref(db, `userSettings/${licenseKey.toUpperCase()}`);
    const unsubscribe = onValue(settingsRef, (snapshot) => {
        callback(snapshot.val());
    }, (error) => {
        console.error('Error subscribing to settings:', error);
    });
    return unsubscribe;
};

// Save user personal notes to Firebase
export const saveUserNotes = async (licenseKey, subjectId, notes) => {
    try {
        const notesRef = ref(db, `userNotes/${licenseKey.toUpperCase()}/${subjectId}`);
        await withTimeout(set(notesRef, {
            content: notes,
            updatedAt: new Date().toISOString()
        }), 15000);
        return true;
    } catch (error) {
        console.error('Error saving notes:', error);
        return false;
    }
};

// Get user personal notes from Firebase
export const getUserNotes = async (licenseKey, subjectId) => {
    try {
        const notesRef = ref(db, `userNotes/${licenseKey.toUpperCase()}/${subjectId}`);
        const snapshot = await withTimeout(get(notesRef), 15000);

        if (!snapshot.exists()) return null;
        return snapshot.val()?.content || '';
    } catch (error) {
        console.error('Error getting notes:', error);
        return null;
    }
};

// Get all user notes from Firebase
export const getAllUserNotes = async (licenseKey) => {
    try {
        const notesRef = ref(db, `userNotes/${licenseKey.toUpperCase()}`);
        const snapshot = await withTimeout(get(notesRef), 15000);

        if (!snapshot.exists()) return {};
        return snapshot.val();
    } catch (error) {
        console.error('Error getting all notes:', error);
        return {};
    }
};

// ============================================
// EMAIL NOTIFICATION SYSTEM
// ============================================

// Save user email
export const saveUserEmail = async (licenseKey, email) => {
    try {
        const userRef = ref(db, `licenses/${licenseKey.toUpperCase()}`);
        await withTimeout(update(userRef, { email }), 15000);
        return true;
    } catch (error) {
        console.error('Error saving email:', error);
        throw error;
    }
};

// Get user email
export const getUserEmail = async (licenseKey) => {
    try {
        const userRef = ref(db, `licenses/${licenseKey.toUpperCase()}`);
        const snapshot = await withTimeout(get(userRef), 15000);
        if (snapshot.exists()) {
            return snapshot.val().email || null;
        }
        return null;
    } catch (error) {
        console.error('Error getting email:', error);
        return null;
    }
};

// ============================================
// ADMIN FUNCTIONS
// ============================================

// Get all users (admin)
export const getAllUsers = async () => {
    try {
        const licensesRef = ref(db, 'licenses');
        const snapshot = await withTimeout(get(licensesRef), 15000);

        if (!snapshot.exists()) return [];

        const data = snapshot.val();
        return Object.entries(data).map(([key, value]) => ({
            licenseKey: key,
            ...value
        }));
    } catch (error) {
        console.error('Error getting all users:', error);
        return [];
    }
};

// Initialize default license keys if none exist
export const initializeDefaultLicenseKeys = async () => {
    try {
        const licenseKeysRef = ref(db, 'licenseKeys');
        const snapshot = await get(licenseKeysRef);

        if (!snapshot.exists()) {
            // Create default keys - using correct names
            const defaultKeys = [
                { key: 'ADMIN1', name: 'Admin', daysActive: 365, isAdmin: true, maxDevices: 2 },
                { key: 'TESTER01', name: 'Tester', daysActive: 365, isAdmin: false, maxDevices: 999, fixedExpiry: '2026-01-01T00:00:00.000Z' },
                { key: 'TESTER02', name: 'Tester2', daysActive: 365, isAdmin: false, maxDevices: 999, fixedExpiry: '2026-01-01T00:00:00.000Z' },
            ];

            for (const keyData of defaultKeys) {
                await createLicenseKey(keyData);
            }
            // License keys initialized
        }
    } catch (error) {
        console.error('Error initializing license keys:', error);
    }
};

// Clear all user activation data (admin only) - use with caution!
export const clearAllUserData = async () => {
    try {
        const licensesRef = ref(db, 'licenses');
        await withTimeout(remove(licensesRef), 15000);
        // User data cleared
        return true;
    } catch (error) {
        console.error('Error clearing user data:', error);
        throw error;
    }
};

// Reset all referral data (admin only) - clears referral records and resets counts
export const resetAllReferralData = async () => {
    try {
        // Clear referral records
        const referralsRef = ref(db, 'referrals');
        await withTimeout(remove(referralsRef), 15000);

        // Clear referral fields from all licenses
        const licensesRef = ref(db, 'licenses');
        const snapshot = await withTimeout(get(licensesRef), 15000);

        if (snapshot.exists()) {
            const licenses = snapshot.val();
            for (const [key, data] of Object.entries(licenses)) {
                const userRef = ref(db, `licenses/${key}`);
                await update(userRef, {
                    referredBy: null,
                    referredByUser: null,
                    referralCount: 0
                });
            }
        }

        // Referral data reset
        return true;
    } catch (error) {
        console.error('Error resetting referral data:', error);
        throw error;
    }
};

// Reset license keys to defaults (admin only) - use with caution!
export const resetLicenseKeysToDefaults = async () => {
    try {
        // Remove all existing keys
        const licenseKeysRef = ref(db, 'licenseKeys');
        await withTimeout(remove(licenseKeysRef), 15000);

        // Create default keys with correct settings
        const defaultKeys = [
            { key: 'ADMIN1', name: 'Admin', daysActive: 365, isAdmin: true, maxDevices: 2 },
            { key: 'TESTER01', name: 'Tester', daysActive: 365, isAdmin: false, maxDevices: 999, fixedExpiry: '2026-01-01T00:00:00.000Z' },
            { key: 'TESTER02', name: 'Tester2', daysActive: 365, isAdmin: false, maxDevices: 999, fixedExpiry: '2026-01-01T00:00:00.000Z' },
        ];

        for (const keyData of defaultKeys) {
            await createLicenseKey(keyData);
        }

        // License keys reset to defaults
        return true;
    } catch (error) {
        console.error('Error resetting license keys:', error);
        throw error;
    }
};

// Device type detection
export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};

// Presence system
export const setupPresence = (userId, userName, currentSubject = null, hideStatus = false, licenseKey = null) => {
    const userStatusRef = ref(db, `presence/${userId}`);
    const connectedRef = ref(db, '.info/connected');
    const deviceType = getDeviceType();

    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            // Connected
            const statusData = {
                online: true,
                userName,
                currentSubject,
                deviceType,
                hideStatus, // Privacy: hide from online list
                licenseKey: licenseKey || null, // Track which license key this device belongs to
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

        // Get all active device sessions
        const activeSessions = Object.entries(data)
            .filter(([_, v]) => {
                if (!v.online) return false;
                const lastSeen = v.lastSeen || 0;
                return (now - lastSeen) < ACTIVE_THRESHOLD;
            })
            .map(([id, v]) => ({ id, ...v }));


        // Group by userName PRIMARILY to ensure consistent grouping
        // This ensures same user with multiple devices/tabs shows as ONE user
        // Using userName ensures old sessions (without licenseKey) group with new sessions (with licenseKey)
        const usersByName = {};
        activeSessions.forEach(session => {
            // Use userName as primary key - this is consistent across all sessions for same user
            const groupKey = session.userName || session.licenseKey || session.id;

            if (!usersByName[groupKey]) {
                usersByName[groupKey] = {
                    ...session,
                    deviceCount: 1,
                    devices: [{ id: session.id, deviceType: session.deviceType }]
                };
            } else {
                usersByName[groupKey].deviceCount++;
                // Only add if not already in devices list (prevent duplicates from same tab refresh)
                const existingDevice = usersByName[groupKey].devices.find(d => d.id === session.id);
                if (!existingDevice) {
                    usersByName[groupKey].devices.push({ id: session.id, deviceType: session.deviceType });
                }
            }
        });

        // Convert to array of unique users with device count
        const users = Object.values(usersByName);
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

export const createThread = async (subjectId, title, content, authorId, authorName, authorClass, imageUrl = null, badges = {}) => {
    const threadsRef = ref(db, `forums/${subjectId}/threads`);
    const newThread = {
        title,
        content,
        authorId,
        authorName,
        authorClass: authorClass || 'Other',
        isAdmin: badges.isAdmin || false,
        isTester: badges.isTester || false,
        imageUrl,
        createdAt: new Date().toISOString(),
        closed: false,
        commentCount: 0,
    };

    try {
        const newRef = push(threadsRef);
        await withTimeout(set(newRef, newThread), 15000);
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

export const addComment = async (subjectId, threadId, content, authorId, authorName, authorClass, badges = {}) => {
    const commentsRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments`);
    const threadRef = ref(db, `forums/${subjectId}/threads/${threadId}`);

    const newComment = {
        content,
        authorId,
        authorName,
        authorClass: authorClass || 'Other',
        isAdmin: badges.isAdmin || false,
        isTester: badges.isTester || false,
        createdAt: new Date().toISOString(),
    };

    try {
        await withTimeout(push(commentsRef, newComment), 15000);

        // Update comment count using get() with timeout
        const snapshot = await withTimeout(get(commentsRef), 10000);
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        await withTimeout(update(threadRef, { commentCount: count }), 10000);

        // Create notification for thread author (if commenter is not the author)
        try {
            const threadSnapshot = await get(threadRef);
            if (threadSnapshot.exists()) {
                const thread = threadSnapshot.val();
                // Don't notify if commenting on own thread
                if (thread.authorId && thread.authorId !== authorId) {
                    const notifRef = ref(db, `notifications/${thread.authorId}`);
                    await push(notifRef, {
                        type: 'thread_reply',
                        threadId,
                        threadTitle: thread.title || 'Thread',
                        subjectId,
                        replierName: authorName,
                        preview: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
                        read: false,
                        createdAt: Date.now()
                    });
                }
            }
        } catch (notifError) {
            // Don't fail the comment if notification fails
            console.error('Failed to create notification:', notifError);
        }
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
        await withTimeout(remove(commentRef), 15000);
        // Update comment count
        const snapshot = await withTimeout(get(commentsRef), 10000);
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        await withTimeout(update(threadRef, { commentCount: count }), 10000);
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

export const addReply = async (subjectId, threadId, commentId, content, authorId, authorName, authorClass, badges = {}) => {
    const repliesRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments/${commentId}/replies`);

    const newReply = {
        content,
        authorId,
        authorName,
        authorClass: authorClass || 'Other',
        isAdmin: badges.isAdmin || false,
        isTester: badges.isTester || false,
        createdAt: new Date().toISOString(),
    };

    try {
        await withTimeout(push(repliesRef, newReply), 15000);
    } catch (error) {
        console.error('Error adding reply:', error);
        throw error;
    }
};

export const deleteReply = async (subjectId, threadId, commentId, replyId) => {
    const replyRef = ref(db, `forums/${subjectId}/threads/${threadId}/comments/${commentId}/replies/${replyId}`);
    try {
        await withTimeout(remove(replyRef), 15000);
    } catch (error) {
        console.error('Error deleting reply:', error);
        throw error;
    }
};

// ============================================
// FORUM POLLS SYSTEM
// ============================================

// Create a poll in forum
export const createPoll = async (subjectId, question, options, authorId, authorName, authorClass, badges = {}) => {
    const pollsRef = ref(db, `forums/${subjectId}/polls`);

    const newPoll = {
        question,
        options: options.map((opt, idx) => ({ id: idx, text: opt, votes: 0 })),
        voters: {}, // Track who voted for what: { oderId/licenseKey: optionIndex }
        totalVotes: 0,
        authorId,
        authorName,
        authorClass: authorClass || 'Other',
        isAdmin: badges.isAdmin || false,
        isTester: badges.isTester || false,
        createdAt: new Date().toISOString(),
        active: true
    };

    try {
        const newRef = await push(pollsRef, newPoll);
        return newRef.key;
    } catch (error) {
        console.error('Error creating poll:', error);
        throw error;
    }
};

// Vote on a poll (one vote per user)
export const votePoll = async (subjectId, pollId, optionIndex, voterId) => {
    const pollRef = ref(db, `forums/${subjectId}/polls/${pollId}`);

    try {
        const snapshot = await get(pollRef);
        if (!snapshot.exists()) throw new Error('Poll not found');

        const poll = snapshot.val();

        // Check if user already voted
        if (poll.voters && poll.voters[voterId] !== undefined) {
            throw new Error('Kamu sudah vote di poll ini');
        }

        // Update vote count for the selected option
        const options = [...poll.options];
        options[optionIndex].votes = (options[optionIndex].votes || 0) + 1;

        // Update poll with new vote
        await update(pollRef, {
            options,
            totalVotes: (poll.totalVotes || 0) + 1,
            [`voters/${voterId}`]: optionIndex
        });

        return true;
    } catch (error) {
        console.error('Error voting on poll:', error);
        throw error;
    }
};

// Subscribe to polls for a subject (realtime)
export const subscribeToPolls = (subjectId, callback) => {
    const pollsRef = ref(db, `forums/${subjectId}/polls`);
    return onValue(pollsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const polls = Object.entries(data)
            .map(([id, poll]) => ({ id, ...poll }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(polls);
    });
};

// Delete a poll (admin or author only)
export const deletePoll = async (subjectId, pollId) => {
    const pollRef = ref(db, `forums/${subjectId}/polls/${pollId}`);
    try {
        await remove(pollRef);
        return true;
    } catch (error) {
        console.error('Error deleting poll:', error);
        throw error;
    }
};

// ============================================
// NOTIFICATION SYSTEM (for thread reply notifications)
// ============================================

// Create a notification for a user
export const createNotification = async (userId, notification) => {
    if (!userId) return;
    try {
        const notifRef = ref(db, `notifications/${userId}`);
        await push(notifRef, {
            ...notification,
            read: false,
            createdAt: Date.now()
        });
    } catch (e) {
        console.error('Failed to create notification:', e);
    }
};

// Subscribe to user's notifications
export const subscribeToNotifications = (userId, callback) => {
    if (!userId) return () => { };
    const notifRef = ref(db, `notifications/${userId}`);
    return onValue(notifRef, (snapshot) => {
        const data = snapshot.val() || {};
        const notifications = Object.entries(data)
            .map(([id, v]) => ({ id, ...v }))
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 20); // Keep last 20
        callback(notifications);
    });
};

// Mark notification as read
export const markNotificationRead = async (userId, notificationId) => {
    if (!userId || !notificationId) return;
    try {
        const notifRef = ref(db, `notifications/${userId}/${notificationId}`);
        await update(notifRef, { read: true });
    } catch (e) {
        console.error('Failed to mark notification read:', e);
    }
};

// Clear all notifications for a user
export const clearAllNotifications = async (userId) => {
    if (!userId) return;
    try {
        const notifRef = ref(db, `notifications/${userId}`);
        await remove(notifRef);
    } catch (e) {
        console.error('Failed to clear notifications:', e);
    }
};

// Create mention notifications for @all or @username
// Pass senderKey to exclude sender from receiving their own mention notification
// Pass threadData for forum context: { threadId, subjectId, threadTitle }
export const createMentionNotifications = async (messageText, senderName, senderKey, context = 'chat', threadData = null) => {
    if (!messageText) {
        return;
    }

    try {
        // Get all license keys to find users by name
        const keysRef = ref(db, 'licenseKeys');
        const keysSnapshot = await get(keysRef);
        if (!keysSnapshot.exists()) {
            return;
        }

        const keysData = keysSnapshot.val();
        const allUsers = Object.entries(keysData).map(([key, data]) => ({
            licenseKey: key,
            userName: data.name || key.substring(0, 8)
        }));

        // Build thread info for forum context
        const threadInfo = threadData ? {
            threadId: threadData.threadId,
            subjectId: threadData.subjectId,
            threadTitle: threadData.threadTitle
        } : {};

        // Check for @all mention
        if (messageText.toLowerCase().includes('@all')) {
            // Notify all users except sender
            for (const user of allUsers) {
                if (user.licenseKey !== senderKey) {
                    await createNotification(user.licenseKey, {
                        type: 'mention_all',
                        senderName,
                        preview: messageText.substring(0, 100),
                        context,
                        ...threadInfo
                    });
                }
            }
            return; // Don't process individual mentions if @all was used
        }

        // Check for individual @username mentions
        const mentionRegex = /@(\w+)/g;
        let match;
        const mentionedNames = new Set();

        while ((match = mentionRegex.exec(messageText)) !== null) {
            const mentionedName = match[1].toLowerCase();
            if (mentionedName !== 'all') {
                mentionedNames.add(mentionedName);
            }
        }

        // Find users matching mentioned names and create notifications
        for (const mentionedName of mentionedNames) {
            const matchedUser = allUsers.find(u =>
                u.userName.toLowerCase() === mentionedName ||
                u.userName.toLowerCase().includes(mentionedName)
            );

            if (matchedUser && matchedUser.licenseKey !== senderKey) {
                await createNotification(matchedUser.licenseKey, {
                    type: 'mention',
                    senderName,
                    preview: messageText.substring(0, 100),
                    context,
                    ...threadInfo
                });
            }
        }
    } catch (e) {
        console.error('Failed to create mention notifications:', e);
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

// Cleanup old chat messages (older than X days) - call periodically
export const cleanupOldChatMessages = async (daysOld = 7) => {
    try {
        const chatRef = ref(db, 'globalChat');
        const snapshot = await get(chatRef);
        if (!snapshot.exists()) return { deleted: 0 };

        const now = Date.now();
        const maxAge = daysOld * 24 * 60 * 60 * 1000; // days to ms
        const data = snapshot.val();
        let deletedCount = 0;

        const updates = {};
        Object.entries(data).forEach(([id, msg]) => {
            const msgTime = new Date(msg.createdAt).getTime();
            if (now - msgTime > maxAge) {
                updates[`globalChat/${id}`] = null;
                deletedCount++;
            }
        });

        if (Object.keys(updates).length > 0) {
            await update(ref(db), updates);
        }

        return { deleted: deletedCount };
    } catch (e) {
        console.error('Failed to cleanup chat messages:', e);
        return { deleted: 0, error: e.message };
    }
};

// Send global chat message
export const sendGlobalMessage = async (content, authorId, authorName, authorClass, type = 'text', mediaUrl = null, replyData = {}, badges = {}) => {
    const chatRef = ref(db, 'globalChat');
    const newMessage = {
        content,
        type, // 'text', 'image', 'audio', 'sticker'
        mediaUrl,
        authorId,
        authorName,
        authorClass,
        isAdmin: badges.isAdmin || false,
        isTester: badges.isTester || false,
        createdAt: new Date().toISOString(),
        ...replyData // Include replyToId, replyToName, replyToContent if present
    };
    try {
        await withTimeout(push(chatRef, newMessage), 15000);
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Delete global chat message (soft delete - marks as deleted)
export const deleteGlobalMessage = async (messageId) => {
    const msgRef = ref(db, `globalChat/${messageId}`);
    try {
        await withTimeout(update(msgRef, { deleted: true, content: '', mediaUrl: null }), 15000);
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};

// ============================================
// PINNED MESSAGES SYSTEM (Max 3 pins)
// ============================================

// Pin a message (max 3 pinned at a time)
export const pinChatMessage = async (messageId, messageData, pinnedBy) => {
    const pinnedRef = ref(db, 'pinnedMessages');
    try {
        // Check current pin count
        const snapshot = await get(pinnedRef);
        const currentPins = snapshot.val() || {};
        const pinCount = Object.keys(currentPins).length;

        if (pinCount >= 3) {
            throw new Error('Maksimum 3 pesan yang bisa di-pin. Unpin salah satu terlebih dahulu.');
        }

        // Check if already pinned
        if (currentPins[messageId]) {
            throw new Error('Pesan sudah di-pin.');
        }

        // Add to pinned messages
        const pinRef = ref(db, `pinnedMessages/${messageId}`);
        await set(pinRef, {
            content: messageData.content || '',
            type: messageData.type || 'text',
            mediaUrl: messageData.mediaUrl || null,
            authorName: messageData.authorName,
            authorClass: messageData.authorClass || '',
            isAdmin: messageData.isAdmin || false,
            originalMsgId: messageId,
            pinnedAt: new Date().toISOString(),
            pinnedBy
        });
        return true;
    } catch (error) {
        console.error('Error pinning message:', error);
        throw error;
    }
};

// Unpin a message
export const unpinChatMessage = async (messageId) => {
    const pinRef = ref(db, `pinnedMessages/${messageId}`);
    try {
        await remove(pinRef);
        return true;
    } catch (error) {
        console.error('Error unpinning message:', error);
        throw error;
    }
};

// Subscribe to pinned messages (realtime)
export const subscribeToPinnedMessages = (callback) => {
    const pinnedRef = ref(db, 'pinnedMessages');
    return onValue(pinnedRef, (snapshot) => {
        const data = snapshot.val() || {};
        const pinnedMessages = Object.entries(data)
            .map(([id, msg]) => ({ id, ...msg }))
            .sort((a, b) => new Date(b.pinnedAt) - new Date(a.pinnedAt));
        callback(pinnedMessages);
    });
};

// ============================================
// CHAT UNREAD TRACKING (Sync across devices)
// ============================================

// Save last read message ID for a user (call when user opens chat)
export const saveLastReadMessageId = async (licenseKey, messageId) => {
    if (!licenseKey || !messageId) return;
    const readRef = ref(db, `users/${licenseKey}/lastReadChatMessageId`);
    try {
        await set(readRef, { messageId, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error saving last read message:', error);
    }
};

// Get last read message ID for a user
export const getLastReadMessageId = async (licenseKey) => {
    if (!licenseKey) return null;
    const readRef = ref(db, `users/${licenseKey}/lastReadChatMessageId`);
    try {
        const snapshot = await get(readRef);
        return snapshot.val()?.messageId || null;
    } catch (error) {
        console.error('Error getting last read message:', error);
        return null;
    }
};

// Subscribe to last read message ID changes (realtime sync across devices)
export const subscribeToLastReadMessageId = (licenseKey, callback) => {
    if (!licenseKey) return () => { };
    const readRef = ref(db, `users/${licenseKey}/lastReadChatMessageId`);
    return onValue(readRef, (snapshot) => {
        callback(snapshot.val()?.messageId || null);
    }, (error) => {
        console.error('Failed to subscribe to lastRead:', error);
        callback(null);
    });
};

// Compress audio to smaller size
export const compressAudio = async (blob) => {
    // Return original for now - audio compression is complex
    // In production, use a library like lamejs for MP3 compression
    return blob;
};

// ============================================
// ANNOUNCEMENT SYSTEM (Admin broadcasts)
// ============================================

// Subscribe to announcements (realtime)
export const subscribeToAnnouncements = (callback) => {
    const announcementRef = ref(db, 'announcement');
    return onValue(announcementRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.active) {
            callback(data);
        } else {
            callback(null);
        }
    });
};

// Send announcement (admin only)
export const sendAnnouncement = async (message, type = 'info') => {
    const announcementRef = ref(db, 'announcement');
    const newAnnouncement = {
        message,
        type, // 'info', 'warning', 'maintenance'
        active: true,
        createdAt: new Date().toISOString(),
    };
    try {
        await withTimeout(set(announcementRef, newAnnouncement), 15000);
    } catch (error) {
        console.error('Error sending announcement:', error);
        throw error;
    }
};

// Clear announcement (admin only)
export const clearAnnouncement = async () => {
    const announcementRef = ref(db, 'announcement');
    try {
        await withTimeout(set(announcementRef, { active: false }), 15000);
    } catch (error) {
        console.error('Error clearing announcement:', error);
        throw error;
    }
};
// --- Advanced Features: Error Reporting, Analytics, Suspension ---

// Log error to Firestore
export const logError = async (error, context = {}) => {
    try {
        const errorRef = ref(db, 'errorLogs');
        const newError = {
            message: error.message || String(error),
            stack: error.stack || null,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        await push(errorRef, newError);
    } catch (e) {
        console.error('Failed to log error:', e);
    }
};

// Log user activity (with stacking for consecutive same-user actions)
export const logActivity = async (userName, action, details = '') => {
    try {
        const logRef = ref(db, 'activityLogs');

        // Get the last log entry to check if we should stack
        const snapshot = await get(logRef);
        if (snapshot.exists()) {
            const logs = snapshot.val();
            const logEntries = Object.entries(logs);

            // Sort by timestamp descending to get the most recent
            logEntries.sort((a, b) => new Date(b[1].timestamp) - new Date(a[1].timestamp));

            if (logEntries.length > 0) {
                const [lastKey, lastLog] = logEntries[0];

                // Check if same user and same action (stack them)
                if (lastLog.userName === userName && lastLog.action === action) {
                    // Increment the count
                    const currentCount = lastLog.count || 1;
                    await update(ref(db, `activityLogs/${lastKey}`), {
                        count: currentCount + 1,
                        timestamp: new Date().toISOString(), // Update timestamp to latest
                        details: details || lastLog.details
                    });
                    return; // Don't create new entry
                }
            }
        }

        // Create new log entry (different user or action)
        const newLog = {
            userName,
            action,
            details,
            count: 1,
            timestamp: new Date().toISOString()
        };
        await push(logRef, newLog);
    } catch (e) {
        console.error('Failed to log activity:', e);
    }
};

// Log analytics event
export const logAnalytics = async (eventName, data = {}) => {
    try {
        const analyticsRef = ref(db, 'analytics');
        const newEvent = {
            eventName,
            data,
            timestamp: new Date().toISOString()
        };
        await push(analyticsRef, newEvent);
    } catch (e) {
        console.error('Failed to log analytics:', e);
    }
};

// Suspend a license key
export const suspendLicense = async (key, durationMinutes) => {
    const licenseRef = ref(db, `licenseKeys/${key.toUpperCase()}`);
    const suspendedUntil = new Date(Date.now() + durationMinutes * 60000).toISOString();
    try {
        await update(licenseRef, { suspendedUntil });
        return true;
    } catch (error) {
        console.error('Error suspending license:', error);
        throw error;
    }
};

// Unsuspend a license key
export const unsuspendLicense = async (key) => {
    const licenseRef = ref(db, `licenseKeys/${key.toUpperCase()}`);
    try {
        await update(licenseRef, { suspendedUntil: null });
        return true;
    } catch (error) {
        console.error('Error unsuspending license:', error);
        throw error;
    }
};

// Subscribe to activity logs (for admin panel)
export const subscribeToActivityLogs = (callback, limit = 50) => {
    const logsRef = ref(db, 'activityLogs');
    return onValue(logsRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const logs = Object.entries(data)
                .map(([id, log]) => ({ id, ...log }))
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, limit);
            callback(logs);
        } else {
            callback([]);
        }
    });
};

// ============ BOOKMARK SYSTEM ============

// Save all bookmarks for a user
export const saveBookmarks = async (licenseKey, bookmarks) => {
    try {
        const bookmarksRef = ref(db, `bookmarks/${licenseKey}`);
        await set(bookmarksRef, bookmarks);
        return true;
    } catch (e) {
        console.error('Failed to save bookmarks:', e);
        return false;
    }
};

// Get bookmarks for a user
export const getBookmarks = async (licenseKey) => {
    try {
        const bookmarksRef = ref(db, `bookmarks/${licenseKey}`);
        const snapshot = await get(bookmarksRef);
        return snapshot.exists() ? snapshot.val() : [];
    } catch (e) {
        console.error('Failed to get bookmarks:', e);
        return [];
    }
};

// Subscribe to bookmark changes (real-time sync)
export const subscribeToBookmarks = (licenseKey, callback) => {
    const bookmarksRef = ref(db, `bookmarks/${licenseKey}`);
    return onValue(bookmarksRef, (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : [];
        callback(Array.isArray(data) ? data : []);
    });
};

// ============ ERROR LOGS (ADMIN) ============

// Subscribe to error logs
export const subscribeToErrorLogs = (callback, limit = 100) => {
    const errorRef = ref(db, 'errorLogs');
    return onValue(errorRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const logs = Object.entries(data)
                .map(([id, log]) => ({ id, ...log }))
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, limit);
            callback(logs);
        } else {
            callback([]);
        }
    });
};

// Clear old error logs (older than X days)
export const clearOldErrorLogs = async (daysOld) => {
    try {
        const errorRef = ref(db, 'errorLogs');
        const snapshot = await get(errorRef);
        if (!snapshot.exists()) return 0;

        const data = snapshot.val();
        const cutoffDate = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
        let cleared = 0;

        for (const [id, log] of Object.entries(data)) {
            const logTime = new Date(log.timestamp).getTime();
            if (logTime < cutoffDate) {
                await remove(ref(db, `errorLogs/${id}`));
                cleared++;
            }
        }
        return cleared;
    } catch (e) {
        console.error('Failed to clear old logs:', e);
        return 0;
    }
};

// Mark error as resolved
export const markErrorResolved = async (errorId) => {
    try {
        const errorRef = ref(db, `errorLogs/${errorId}`);
        await update(errorRef, { resolved: true, resolvedAt: new Date().toISOString() });
        return true;
    } catch (e) {
        console.error('Failed to mark error resolved:', e);
        return false;
    }
};

// Get unread (unresolved) error count
export const subscribeToUnreadErrorCount = (callback) => {
    const errorRef = ref(db, 'errorLogs');
    return onValue(errorRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const unreadCount = Object.values(data).filter(log => !log.resolved).length;
            callback(unreadCount);
        } else {
            callback(0);
        }
    });
};

// ============ USER ANALYTICS (ADMIN) ============

// Log study session for analytics
export const logStudySession = async (licenseKey, data) => {
    try {
        const sessionRef = ref(db, `analytics/sessions`);
        await push(sessionRef, {
            licenseKey,
            ...data,
            timestamp: new Date().toISOString()
        });
        return true;
    } catch (e) {
        console.error('Failed to log study session:', e);
        return false;
    }
};

// Get user leaderboard (by quiz scores and online time)
export const getUserLeaderboard = async () => {
    try {
        // Get license keys for names
        const keysRef = ref(db, 'licenseKeys');
        const keysSnapshot = await get(keysRef);
        const keysData = keysSnapshot.exists() ? keysSnapshot.val() : {};

        // Build leaderboard from license keys (includes everyone)
        const users = Object.entries(keysData)
            .map(([key, data]) => ({
                licenseKey: key,
                userName: data.name || key.substring(0, 8),
                totalScore: data.totalQuizScore || 0,
                onlineMinutes: data.totalOnlineMinutes || 0,
                isAdmin: data.isAdmin || false,
            }));

        // Sort by: onlineMinutes DESC only (hours-based ranking)
        return users.sort((a, b) => b.onlineMinutes - a.onlineMinutes);
    } catch (e) {
        console.error('Failed to get leaderboard:', e);
        return [];
    }
};

// Get peak hours data (activity by hour)
export const getPeakHoursData = async () => {
    try {
        const sessionsRef = ref(db, 'analytics/sessions');
        const snapshot = await get(sessionsRef);
        if (!snapshot.exists()) {
            return Array(24).fill(0);
        }

        const data = snapshot.val();
        const hourCounts = Array(24).fill(0);
        let validCount = 0;

        Object.values(data).forEach(session => {
            if (session.timestamp) {
                // Handle both number (Date.now()) and string (ISO) formats
                const ts = typeof session.timestamp === 'number'
                    ? session.timestamp
                    : new Date(session.timestamp).getTime();
                const hour = new Date(ts).getHours();
                if (!isNaN(hour) && hour >= 0 && hour < 24) {
                    hourCounts[hour]++;
                    validCount++;
                }
            }
        });

        return hourCounts;
    } catch (e) {
        console.error('Failed to get peak hours:', e);
        return Array(24).fill(0);
    }
};

// ============================================
// STATS TRACKING (for Leaderboard & Analytics)
// ============================================
// Set user's total quiz score (absolute value, not additive)
// This should be called with the calculated total from all quiz progress
export const setQuizScore = async (licenseKey, totalScore) => {
    if (!licenseKey) return;
    try {
        const keyRef = ref(db, `licenseKeys/${licenseKey}`);
        const snapshot = await get(keyRef);
        if (snapshot.exists()) {
            await update(keyRef, {
                totalQuizScore: totalScore,
                lastQuizAt: Date.now()
            });
        }
    } catch (e) {
        console.error('Failed to set quiz score:', e);
    }
};

// Reset all quiz scores for all users (admin only)
// This clears totalQuizScore in licenseKeys and quizScores in userSettings
export const resetAllQuizScores = async () => {
    try {
        // Reset totalQuizScore in all licenseKeys
        const licenseKeysRef = ref(db, 'licenseKeys');
        const licenseSnapshot = await get(licenseKeysRef);
        if (licenseSnapshot.exists()) {
            const updates = {};
            Object.keys(licenseSnapshot.val()).forEach(key => {
                updates[`licenseKeys/${key}/totalQuizScore`] = 0;
                updates[`licenseKeys/${key}/lastQuizAt`] = null;
            });
            await update(ref(db), updates);
        }

        // Reset progress in userSettings for all users
        const userSettingsRef = ref(db, 'userSettings');
        const settingsSnapshot = await get(userSettingsRef);
        if (settingsSnapshot.exists()) {
            const updates = {};
            Object.keys(settingsSnapshot.val()).forEach(key => {
                updates[`userSettings/${key}/progress`] = {};
            });
            await update(ref(db), updates);
        }

        return true;
    } catch (e) {
        console.error('Failed to reset quiz scores:', e);
        return false;
    }
};

// Update user's online time (in minutes)
export const updateOnlineTime = async (licenseKey, minutes) => {
    if (!licenseKey || !minutes) return;
    try {
        const keyRef = ref(db, `licenseKeys/${licenseKey}`);
        const snapshot = await get(keyRef);
        if (snapshot.exists()) {
            const currentTotal = snapshot.val().totalOnlineMinutes || 0;
            await update(keyRef, {
                totalOnlineMinutes: currentTotal + minutes
            });
        }
    } catch (e) {
        console.error('Failed to update online time:', e);
    }
};

// Record session for peak hours tracking (excludes admins)
export const recordSession = async (isAdmin = false) => {
    if (isAdmin) {
        return;
    }
    try {
        const sessionsRef = ref(db, 'analytics/sessions');
        const result = await push(sessionsRef, {
            timestamp: Date.now()
        });
    } catch (e) {
        console.error('[recordSession] Failed:', e);
    }
};

export { db, ref, onValue };
