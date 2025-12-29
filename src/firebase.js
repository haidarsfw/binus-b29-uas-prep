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
export const setupPresence = (userId, userName, currentSubject = null) => {
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

// Log user activity
export const logActivity = async (userName, action, details = '') => {
    try {
        const logRef = ref(db, 'activityLogs');
        const newLog = {
            userName,
            action, // e.g., 'LOGIN', 'LOGOUT', 'UPDATE_PROFILE'
            details,
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

export { db, ref, onValue };
