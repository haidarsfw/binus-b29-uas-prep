// ============================================
// EMAIL NOTIFICATION SERVICE
// Uses EmailJS (Free tier: 200 emails/month)
// Setup: https://www.emailjs.com
// ============================================

// EmailJS Configuration - Your actual keys
const EMAILJS_SERVICE_ID = 'service_ljj2j0y';
const EMAILJS_TEMPLATE_ID = 'template_2sx3owh';
const EMAILJS_PUBLIC_KEY = 'hqwq-k5PYpFx8y5hL';

// Load EmailJS SDK dynamically
let emailjsLoaded = false;
const loadEmailJS = () => {
    return new Promise((resolve, reject) => {
        if (emailjsLoaded) {
            resolve(window.emailjs);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
            emailjsLoaded = true;
            resolve(window.emailjs);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

// Send study reminder email
export const sendReminderEmail = async (toEmail, userName, reminderTime) => {
    try {
        const emailjs = await loadEmailJS();

        const templateParams = {
            to_email: toEmail,
            to_name: userName,
            reminder_time: reminderTime,
            app_name: 'BINUS B29 UAS Prep',
            message: `Hai ${userName}! 🔔 Ini pengingat belajarmu untuk UAS. Waktunya fokus dan raih nilai terbaik! Semangat! 💪`
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error: error.text || error.message };
    }
};

// Check if EmailJS is properly configured
export const isEmailConfigured = () => {
    return EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
        EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
        EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
};

// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default {
    sendReminderEmail,
    isEmailConfigured,
    isValidEmail
};
