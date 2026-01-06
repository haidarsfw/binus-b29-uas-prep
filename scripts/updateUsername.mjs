// One-time script to update username in Firebase
// Run with: node --experimental-vm-modules scripts/updateUsername.mjs

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBMhL2t-KrIS0M22607mB3ovEq_pe5OcSs",
    authDomain: "binus-b29-uas-prep.firebaseapp.com",
    databaseURL: "https://binus-b29-uas-prep-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "binus-b29-uas-prep",
    storageBucket: "binus-b29-uas-prep.firebasestorage.app",
    messagingSenderId: "977668931392",
    appId: "1:977668931392:web:e7c5aafffc2e09ff9f8de5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Configuration
const LICENSE_KEY = 'B29-3BL3EL';
const OLD_NAME = 'Noel';
const NEW_NAME = 'Christian';

async function updateDisplayName() {
    const updates = {};
    const keyUpper = LICENSE_KEY.toUpperCase();

    console.log(`\n🔄 Updating username: "${OLD_NAME}" → "${NEW_NAME}" for key ${keyUpper}\n`);

    try {
        // 1. Update licenseKeys
        const licenseKeyRef = ref(db, `licenseKeys/${keyUpper}`);
        const licenseKeySnap = await get(licenseKeyRef);
        if (licenseKeySnap.exists()) {
            const data = licenseKeySnap.val();
            if (data.name === OLD_NAME) {
                updates[`licenseKeys/${keyUpper}/name`] = NEW_NAME;
                console.log('✅ Found in licenseKeys');
            }
        }

        // 2. Update licenses activation data
        const activationRef = ref(db, `licenses/${keyUpper}`);
        const activationSnap = await get(activationRef);
        if (activationSnap.exists()) {
            const data = activationSnap.val();
            if (data.userName === OLD_NAME) {
                updates[`licenses/${keyUpper}/userName`] = NEW_NAME;
                console.log('✅ Found in licenses activation');
            }
        }

        // 3. Update presence system
        const presenceRef = ref(db, 'presence');
        const presenceSnap = await get(presenceRef);
        if (presenceSnap.exists()) {
            const presenceData = presenceSnap.val();
            Object.entries(presenceData).forEach(([userId, userData]) => {
                if (userData.userName === OLD_NAME) {
                    updates[`presence/${userId}/userName`] = NEW_NAME;
                    console.log(`✅ Found in presence: ${userId}`);
                }
            });
        }

        // 4. Update global chat messages
        const chatRef = ref(db, 'globalChat');
        const chatSnap = await get(chatRef);
        if (chatSnap.exists()) {
            const messages = chatSnap.val();
            let chatCount = 0;
            Object.entries(messages).forEach(([msgId, msg]) => {
                if (msg.authorName === OLD_NAME) {
                    updates[`globalChat/${msgId}/authorName`] = NEW_NAME;
                    chatCount++;
                }
            });
            if (chatCount > 0) console.log(`✅ Found ${chatCount} chat messages`);
        }

        // 5. Update forum threads and comments
        const forumRef = ref(db, 'forum');
        const forumSnap = await get(forumRef);
        if (forumSnap.exists()) {
            const subjects = forumSnap.val();
            let forumCount = 0;
            Object.entries(subjects).forEach(([subjectId, threads]) => {
                if (threads) {
                    Object.entries(threads).forEach(([threadId, thread]) => {
                        // Update thread author
                        if (thread.authorName === OLD_NAME) {
                            updates[`forum/${subjectId}/${threadId}/authorName`] = NEW_NAME;
                            forumCount++;
                        }
                        // Update comments
                        if (thread.comments) {
                            Object.entries(thread.comments).forEach(([commentId, comment]) => {
                                if (comment.authorName === OLD_NAME) {
                                    updates[`forum/${subjectId}/${threadId}/comments/${commentId}/authorName`] = NEW_NAME;
                                    forumCount++;
                                }
                                // Update replies
                                if (comment.replies) {
                                    Object.entries(comment.replies).forEach(([replyId, reply]) => {
                                        if (reply.authorName === OLD_NAME) {
                                            updates[`forum/${subjectId}/${threadId}/comments/${commentId}/replies/${replyId}/authorName`] = NEW_NAME;
                                            forumCount++;
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            if (forumCount > 0) console.log(`✅ Found ${forumCount} forum entries`);
        }

        // Apply all updates
        const updateCount = Object.keys(updates).length;
        if (updateCount > 0) {
            console.log(`\n📝 Applying ${updateCount} updates...`);
            await update(ref(db), updates);
            console.log(`\n✅ SUCCESS! Updated ${updateCount} entries.`);
            console.log(`\n🎉 User "${OLD_NAME}" is now "${NEW_NAME}" everywhere!`);
        } else {
            console.log('\n⚠️ No entries found with that old name.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateDisplayName();
