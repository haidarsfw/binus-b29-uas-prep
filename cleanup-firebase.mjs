// Firebase Cleanup Script
// This script backs up data first, then cleans only SAFE data paths

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, remove } from 'firebase/database';
import fs from 'fs';

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

// SAFE paths to clean (will NOT delete user data)
const SAFE_TO_CLEAN = [
    'globalChat',        // Live chat messages
    'forums',            // Forum threads & comments
    'activityLogs',      // Activity logs
    'analyticsLogs',     // Analytics logs
    'errorLogs',         // Error reports
    'announcements',     // Admin announcements
    'presence',          // Online status (auto-cleans anyway)
];

// PROTECTED paths - NEVER delete these
const PROTECTED = [
    'licenseKeys',       // License keys
    'users',             // User activations
    'userSettings',      // Theme, progress, etc
    'userNotes',         // Personal notes
    'referralRecords',   // Referral history
];

async function backup() {
    console.log('📦 Starting backup...');
    const snapshot = await get(ref(db));
    const data = snapshot.val();

    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `firebase_backup_${date}.json`;

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`✅ Backup saved to: ${filename}`);
    console.log(`   Size: ${(fs.statSync(filename).size / 1024).toFixed(2)} KB`);

    return filename;
}

async function cleanup() {
    console.log('\n🧹 Starting cleanup...\n');

    for (const path of SAFE_TO_CLEAN) {
        try {
            const snapshot = await get(ref(db, path));
            if (snapshot.exists()) {
                const data = snapshot.val();
                const count = typeof data === 'object' ? Object.keys(data).length : 1;

                console.log(`🗑️  Cleaning: ${path} (${count} items)`);
                await remove(ref(db, path));
                console.log(`   ✅ Deleted: ${path}`);
            } else {
                console.log(`⏭️  Skipped: ${path} (empty)`);
            }
        } catch (error) {
            console.log(`   ❌ Error cleaning ${path}:`, error.message);
        }
    }

    console.log('\n✨ Cleanup complete!');
    console.log('\n🔒 Protected data (NOT deleted):');
    PROTECTED.forEach(p => console.log(`   • ${p}`));
}

async function main() {
    console.log('========================================');
    console.log('   Firebase Cleanup Script');
    console.log('========================================\n');

    // Step 1: Backup
    const backupFile = await backup();

    // Step 2: Cleanup
    await cleanup();

    console.log('\n========================================');
    console.log(`   Backup location: ${backupFile}`);
    console.log('   Web is now fresh and clean! 🎉');
    console.log('========================================\n');

    process.exit(0);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
