import { useState, useEffect, useCallback, useMemo, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, TrendingUp, Users, Monitor, Briefcase, FileText, List, Layers, ClipboardCheck, ChevronLeft, ChevronRight, Eye, EyeOff, MessageCircle, Sun, Moon, Coffee, Play, Pause, RotateCcw, Check, X, Timer, Key, ArrowRight, Settings, Palette, Type, Sparkles, Clock, BookOpen, MessageSquare, Plus, Trash2, Send, ChevronDown, ChevronUp, User, XCircle, Calendar, StickyNote, Headphones, Bell, BellRing, Reply, AlertTriangle, Image, Zap, Bot, GraduationCap, Lightbulb, Target, HelpCircle, Mic, Smile, Shield, Copy, Share2, ExternalLink, LogOut, Gift, Crown, Mail, Maximize2, Minimize2, Database, Activity, Presentation, PlusCircle, Search, Megaphone, Info, Bookmark, Star, BarChart3, Volume2 } from 'lucide-react';
import DB from './db';
import RANGKUMAN_CONTENT from './rangkumanContent';
import { validateLicenseWithDevice, setupPresence, updatePresence, removePresence, subscribeToPresence, subscribeToThreads, createThread, deleteThread, closeThread, subscribeToComments, addComment, deleteComment, addReply, uploadImage, uploadAudio, getDeviceId, subscribeToGlobalChat, sendGlobalMessage, deleteGlobalMessage, initializeDefaultLicenseKeys, fetchLicenseKeys, createLicenseKey, updateLicenseKey, deleteLicenseKey, resetLicenseDevices, getAllUsers, getReferralStats, ensureReferralCode, saveUserEmail, getUserEmail, clearAllUserData, resetLicenseKeysToDefaults, subscribeToAnnouncements, sendAnnouncement, clearAnnouncement, saveUserSettings, getUserSettings, subscribeToUserSettings, saveUserNotes, getUserNotes, getAllUserNotes, logError, logActivity, logAnalytics, suspendLicense, unsuspendLicense, subscribeToActivityLogs, saveBookmarks, getBookmarks, subscribeToBookmarks, subscribeToErrorLogs, clearOldErrorLogs, markErrorResolved, subscribeToUnreadErrorCount, logStudySession, getUserLeaderboard, getPeakHoursData, updateQuizScore, updateOnlineTime, recordSession } from './firebase';
import { sendReminderEmail, isEmailConfigured, isValidEmail } from './emailService';
const iconMap = { TrendingUp, Users, Monitor, Briefcase };
const smooth = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };



// --- Rate Limiting Helper ---
const rateLimits = {};
const checkRateLimit = (key, limitMs) => {
  const now = Date.now();
  if (rateLimits[key] && now - rateLimits[key] < limitMs) {
    const remaining = Math.ceil((limitMs - (now - rateLimits[key])) / 1000);
    return { allowed: false, remaining }; // Rate limited
  }
  rateLimits[key] = now;
  return { allowed: true, remaining: 0 }; // Allowed
};

const themeColors = [
  { id: 'blue', name: 'Blue', color: '#3b82f6' },
  { id: 'indigo', name: 'Indigo', color: '#6366f1' },
  { id: 'violet', name: 'Violet', color: '#8b5cf6' },
  { id: 'rose', name: 'Rose', color: '#f43f5e' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'amber', name: 'Amber', color: '#f59e0b' },
  { id: 'slate', name: 'Slate', color: '#64748b' },
  { id: 'zinc', name: 'Zinc', color: '#71717a' },
  { id: 'midnight', name: 'Midnight', color: '#3730a3' },
];

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'outfit', name: 'Outfit' },
  { id: 'poppins', name: 'Poppins' },
];

const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

// Loading Spinner for Suspense fallback
function LoadingSpinner({ message = 'Memuat...' }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="glass-strong p-6 rounded-2xl text-center">
        <div className="w-10 h-10 border-3 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[var(--text)] text-sm">{message}</p>
      </div>
    </div>
  );
}

function CircularProgress({ value, size = 140, stroke = 10 }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="hsl(calc(var(--accent-h) + 30), 80%, 60%)" />
          </linearGradient>
        </defs>
        <circle className="track" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} />
        <circle className="progress-ring" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <span className="value text-3xl">{Math.round(value)}%</span>
    </div>
  );
}

// ============================================
// PREVIEW MODE WATERMARK - Diagonal repeating semi-transparent
// ============================================
function PreviewWatermark() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99998,
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
          transform: 'rotate(-30deg)',
          opacity: 0.15
        }}
      >
        {Array.from({ length: 20 }).map((_, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: '100px', whiteSpace: 'nowrap' }}>
            {Array.from({ length: 10 }).map((_, colIdx) => (
              <div
                key={colIdx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#ff4444',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textTransform: 'uppercase',
                  userSelect: 'none'
                }}
              >
                <span style={{ fontSize: '24px' }}>⚠️ PREVIEW MODE</span>
                <span style={{ fontSize: '12px' }}>Dapatkan License Key untuk Full Access</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// USER WATERMARK - Small username in corner for tracking
// ============================================
function UserWatermark({ username }) {
  if (!username) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '6px',
        left: '6px',
        padding: '0',
        background: 'transparent',
        fontSize: '8px',
        color: 'rgba(128,128,128,0.4)',
        pointerEvents: 'none',
        zIndex: 2147483647,
        userSelect: 'none',
        fontFamily: 'monospace',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        letterSpacing: '0.2px'
      }}
    >
      {username}
    </div>
  );
}

// ============================================
// CONTENT LOCK OVERLAY - For preview mode locked content
// ============================================
function ContentLockOverlay({ message = "Dapatkan License Key untuk membuka Full Access" }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        zIndex: 100,
        borderRadius: 'inherit'
      }}
    >
      <div style={{ fontSize: '48px' }}>🔒</div>
      <p style={{ color: '#fff', fontSize: '14px', textAlign: 'center', maxWidth: '280px', fontWeight: '500' }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <a
          href="https://forms.gle/C1XFvjqhSzo8bBT1A"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          📝 Dapatkan License
        </a>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
        <a
          href="https://wa.me/6287839256171"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          💬 Chat Admin
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') !== 'false');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'blue');
  const [font, setFont] = useState(() => localStorage.getItem('font') || 'inter');
  const [session, setSession] = useState(null);
  const [view, setView] = useState('login');
  const [selectedClass, setSelectedClass] = useState('');
  const [currentSubject, setCurrentSubject] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState({});
  const [pomo, setPomo] = useState({ time: 25 * 60, active: false });
  const [showSettings, setShowSettings] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reminder, setReminder] = useState(() => localStorage.getItem('studyReminder') || '');
  const [showReminder, setShowReminder] = useState(false);
  const [reminderActive, setReminderActive] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showLegalPopup, setShowLegalPopup] = useState(null); // 'tos' or 'privacy'
  const [notifications, setNotifications] = useState([]);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [rememberClass, setRememberClass] = useState(() => localStorage.getItem('rememberClass') === 'true');
  const savedClass = localStorage.getItem('savedClass');

  // New states for new features
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [docViewerUrl, setDocViewerUrl] = useState('');
  const [docViewerTitle, setDocViewerTitle] = useState('');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [referralStats, setReferralStats] = useState({ referralCode: null, referralCount: 0 });
  const [lastTestReminder, setLastTestReminder] = useState(0);

  // New states for 4 new features
  const [imagePreview, setImagePreview] = useState(null); // { url: string } for lightbox
  const [announcement, setAnnouncement] = useState(null); // { message, type, active }
  const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState({ show: false, query: '', category: 'all' });

  // Toast notification state (replaces browser alert)
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Cooldown notification state
  const [cooldown, setCooldown] = useState({ show: false, message: '', seconds: 0 });

  // Alarm state for reminder (continuous alarm until dismissed)
  const [alarmActive, setAlarmActive] = useState(false);
  const alarmAudioRef = useRef(null);

  // Browser notification state
  const [notificationPermission, setNotificationPermission] = useState('default');
  const mentionSoundRef = useRef(null);

  // Hide online status state (privacy feature) - default OFF (visible)
  const [hideStatus, setHideStatus] = useState(() => localStorage.getItem('hideStatus') === 'true');
  const [hideStatusChangedAt, setHideStatusChangedAt] = useState(() => parseInt(localStorage.getItem('hideStatusChangedAt') || '0'));
  const [showHideStatusConfirm, setShowHideStatusConfirm] = useState(false); // Styled confirmation modal

  // === NEW FEATURE STATES (v1.1.0) ===

  // Bookmark system - syncs to Firebase
  const [bookmarks, setBookmarks] = useState([]); // { id, subjectId, type, category, note, createdAt }
  const [showBookmarkModal, setShowBookmarkModal] = useState(null); // { subjectId, type, item } for adding bookmark

  // Dark mode schedule - auto switch based on time
  const [darkModeSchedule, setDarkModeSchedule] = useState(() => {
    const saved = localStorage.getItem('darkModeSchedule');
    return saved ? JSON.parse(saved) : { enabled: false, startTime: '18:00', endTime: '06:00' };
  });

  // Admin error notification badge
  const [unreadErrorCount, setUnreadErrorCount] = useState(0);

  // === NEW FEATURE EFFECTS (v1.1.0) ===

  // Subscribe to bookmarks from Firebase
  useEffect(() => {
    if (!session?.licenseKey) return;
    const unsub = subscribeToBookmarks(session.licenseKey, (data) => {
      setBookmarks(data || []);
    });
    return () => unsub();
  }, [session?.licenseKey]);

  // Dark mode schedule - auto switch based on time (FIXED: only checks interval, tracks last switch)
  useEffect(() => {
    if (!darkModeSchedule.enabled) return;

    let lastSwitchedMinute = -1; // Track last switch to prevent duplicates

    const checkDarkMode = () => {
      const now = new Date();
      const currentMinute = now.getHours() * 60 + now.getMinutes();

      // Prevent multiple switches in the same minute
      if (currentMinute === lastSwitchedMinute) return;

      const [startH, startM] = darkModeSchedule.startTime.split(':').map(Number);
      const [endH, endM] = darkModeSchedule.endTime.split(':').map(Number);
      const startTime = startH * 60 + startM;
      const endTime = endH * 60 + endM;

      // Handle overnight schedule (e.g., 18:00 - 06:00)
      let shouldBeDark;
      if (startTime > endTime) {
        shouldBeDark = currentMinute >= startTime || currentMinute < endTime;
      } else {
        shouldBeDark = currentMinute >= startTime && currentMinute < endTime;
      }

      // Use functional update and track switch
      setDark(prev => {
        if (prev !== shouldBeDark) {
          lastSwitchedMinute = currentMinute;
          localStorage.setItem('dark', String(shouldBeDark));
          return shouldBeDark;
        }
        return prev;
      });
    };

    // Only check on interval, NOT immediately (prevents initial switch bug)
    const interval = setInterval(checkDarkMode, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [darkModeSchedule.enabled, darkModeSchedule.startTime, darkModeSchedule.endTime]);

  // Subscribe to unread error count (admin only)
  useEffect(() => {
    if (!session?.isAdmin) return;
    const unsub = subscribeToUnreadErrorCount(setUnreadErrorCount);
    return () => unsub();
  }, [session?.isAdmin]);

  // --- Advanced Features Effects ---
  useEffect(() => {
    // Request notification permission and store result
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(perm => setNotificationPermission(perm));
      }
    }
    // Log visit
    logAnalytics('APP_OPEN', { userAgent: navigator.userAgent });
  }, []);

  // Log login
  useEffect(() => {
    if (session) {
      logActivity(session.userName || session.name || 'Unknown', 'LOGIN', `Role: ${session.isAdmin ? 'Admin' : 'User'}`);
    }
  }, [session?.licenseKey]);

  // Preview Mode Detection - License key "Preview01" triggers preview mode
  const isPreviewMode = useMemo(() => {
    return session?.licenseKey?.toLowerCase() === 'preview01';
  }, [session]);

  // Show toast function
  const showToast = (message, type = 'info', duration = 4000) => {
    setToast({ show: true, message, type });
    if (duration > 0) {
      setTimeout(() => setToast(t => ({ ...t, show: false })), duration);
    }
  };

  // Show cooldown notification (animated from bottom)
  const showCooldown = (message, seconds) => {
    setCooldown({ show: true, message, seconds });
    setTimeout(() => setCooldown(c => ({ ...c, show: false })), 2500);
  };

  // === BOOKMARK FUNCTIONS (v1.1.0) ===
  const addBookmark = async (subjectId, type, itemKey, category = 'important', note = '') => {
    const newBookmark = {
      id: Date.now().toString(),
      subjectId,
      type, // 'materi', 'flashcard', 'quiz', 'essay'
      itemKey, // e.g., 'ppt-1' or 'flashcard-0'
      category, // 'important', 'review-later', 'difficult'
      note,
      createdAt: new Date().toISOString()
    };
    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    await saveBookmarks(session.licenseKey, updated);
    showToast('📌 Ditambahkan ke bookmark', 'success', 2000);
  };

  const removeBookmark = async (bookmarkId) => {
    const updated = bookmarks.filter(b => b.id !== bookmarkId);
    setBookmarks(updated);
    await saveBookmarks(session.licenseKey, updated);
    showToast('🗑️ Bookmark dihapus', 'success', 2000);
  };

  const updateBookmarkNote = async (bookmarkId, note) => {
    const updated = bookmarks.map(b => b.id === bookmarkId ? { ...b, note } : b);
    setBookmarks(updated);
    await saveBookmarks(session.licenseKey, updated);
  };

  const isBookmarked = (subjectId, type, itemKey) => {
    return bookmarks.some(b => b.subjectId === subjectId && b.type === type && b.itemKey === itemKey);
  };

  const getBookmarkByItem = (subjectId, type, itemKey) => {
    return bookmarks.find(b => b.subjectId === subjectId && b.type === type && b.itemKey === itemKey);
  };

  // Show browser notification for mentions
  const showBrowserNotification = useCallback((title, body, onClick) => {
    // Play mention sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const playBeep = (freq, startTime, duration) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      // Two quick beeps
      playBeep(880, audioContext.currentTime, 0.1);
      playBeep(1100, audioContext.currentTime + 0.15, 0.1);
    } catch (e) { /* Audio not supported */ }

    // Show browser notification if permitted and tab not focused
    if (notificationPermission === 'granted' && document.hidden) {
      const notification = new Notification(title, {
        body,
        icon: '/vite.svg',
        tag: 'mention-' + Date.now()
      });
      if (onClick) {
        notification.onclick = () => {
          window.focus();
          onClick();
          notification.close();
        };
      }
    }
    // Also show in-app toast
    showToast(`📢 ${title}: ${body}`, 'info', 5000);
  }, [notificationPermission]);

  // Play continuous alarm sound until stopped
  const playAlarmSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Store stop flag in the ref itself
      const soundState = { isPlaying: true, audioContext };
      alarmAudioRef.current = soundState;

      const playBeep = () => {
        // Check if still playing using the ref
        if (!alarmAudioRef.current || !alarmAudioRef.current.isPlaying) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);

        // Schedule next beep - check ref each time
        setTimeout(() => {
          if (alarmAudioRef.current && alarmAudioRef.current.isPlaying) {
            playBeep();
          }
        }, 500);
      };

      playBeep();
    } catch (e) {
      // Alarm sound not supported
    }
  };

  // Stop alarm function
  const stopAlarmSound = () => {
    if (alarmAudioRef.current) {
      alarmAudioRef.current.isPlaying = false;
      if (alarmAudioRef.current.audioContext) {
        try { alarmAudioRef.current.audioContext.close(); } catch { }
      }
      alarmAudioRef.current = null;
    }
  };

  // Constants
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
  const WARNING_BEFORE_TIMEOUT_MS = 5 * 60 * 1000; // Show warning 5 mins before timeout

  // Initialize default license keys on first load
  useEffect(() => {
    initializeDefaultLicenseKeys();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font', font);
    localStorage.setItem('dark', dark);
    localStorage.setItem('theme', theme);
    localStorage.setItem('font', font);

    // Sync settings to Firebase (only if logged in)
    if (session?.licenseKey) {
      saveUserSettings(session.licenseKey, { dark, theme, font });
    }
  }, [dark, theme, font, session?.licenseKey]);

  // Sync selected class to Firebase
  useEffect(() => {
    if (session?.licenseKey && selectedClass) {
      saveUserSettings(session.licenseKey, { selectedClass });
      localStorage.setItem('savedClass', selectedClass);
    }
  }, [selectedClass, session?.licenseKey]);

  // Sync reminder to Firebase
  useEffect(() => {
    if (session?.licenseKey && reminder) {
      saveUserSettings(session.licenseKey, { reminder });
    }
  }, [reminder, session?.licenseKey]);

  // Scroll to top when navigating to a subject or back to dashboard
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSubject]);

  useEffect(() => {
    const s = localStorage.getItem('session');
    if (s) {
      const d = JSON.parse(s);
      setSession(d);
      setSelectedClass(d.selectedClass || '');
      setView(d.selectedClass ? 'dashboard' : 'class');
      // Load user-specific progress
      const userProgressKey = `studyProgress_${d.licenseKey || d.key || 'default'}`;
      const userProgress = localStorage.getItem(userProgressKey);
      if (userProgress) {
        setProgress(JSON.parse(userProgress));
      }
      // Record session for peak hours analytics (excludes admins)
      recordSession(d.isAdmin);
      // Show terms agreement on every login/reload
      if (!sessionStorage.getItem('termsAgreedThisSession')) {
        setShowTerms(true);
      }
    }
  }, []);

  useEffect(() => {
    if (session) {
      const userProgressKey = `studyProgress_${session.licenseKey || session.key || 'default'}`;
      localStorage.setItem(userProgressKey, JSON.stringify(progress));
      // Sync progress to Firebase
      if (session.licenseKey && Object.keys(progress).length > 0) {
        saveUserSettings(session.licenseKey, { progress });
      }
    }
  }, [progress, session]);

  // Auto-select saved class if remember is enabled
  useEffect(() => {
    if (view === 'class' && rememberClass && savedClass && !selectedClass) {
      setSelectedClass(savedClass);
    }
  }, [view, rememberClass, savedClass, selectedClass]);

  useEffect(() => {
    if (!pomo.active) return;
    const i = setInterval(() => setPomo(p => p.time <= 1 ? { time: 25 * 60, active: false } : { ...p, time: p.time - 1 }), 1000);
    return () => clearInterval(i);
  }, [pomo.active]);

  // Track online time every 5 minutes for leaderboard
  useEffect(() => {
    if (!session?.licenseKey) return;
    const interval = setInterval(() => {
      updateOnlineTime(session.licenseKey, 5); // Add 5 minutes
    }, 5 * 60 * 1000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [session?.licenseKey]);

  // Subscribe to announcements (realtime)
  useEffect(() => {
    const unsubscribe = subscribeToAnnouncements((data) => {
      setAnnouncement(data);
      if (data && data.active) {
        // Check if user already dismissed this announcement
        const dismissedAt = localStorage.getItem('lastDismissedAnnouncement');
        if (!dismissedAt || new Date(dismissedAt) < new Date(data.createdAt)) {
          setShowAnnouncementPopup(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // ESC key handler - close modals/popups or go back
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        // Priority order: close modals first, then go back
        if (imagePreview) {
          setImagePreview(null);
        } else if (subjectSearch.show) {
          setSubjectSearch(s => ({ ...s, show: false, query: '' }));
        } else if (showDocViewer) {
          setShowDocViewer(false);
        } else if (showSettings) {
          setShowSettings(false);
        } else if (showAdminDashboard) {
          setShowAdminDashboard(false);
        } else if (currentSubject) {
          // ESC from subject view to dashboard
          setCurrentSubject(null);
        }
        // Note: showAnnouncementPopup intentionally NOT closed by ESC
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [imagePreview, subjectSearch.show, showSettings, showAdminDashboard, showDocViewer, currentSubject]);

  // Realtime clock & reminder check
  const [showReminderAlert, setShowReminderAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      // Check reminder - format is "YYYY-MM-DDTHH:MM"
      if (reminder && reminder.includes('T') && !reminderActive && !alarmActive) {
        const reminderDate = new Date(reminder);
        // Check if current time matches reminder time (same year, month, day, hour, minute)
        if (
          now.getFullYear() === reminderDate.getFullYear() &&
          now.getMonth() === reminderDate.getMonth() &&
          now.getDate() === reminderDate.getDate() &&
          now.getHours() === reminderDate.getHours() &&
          now.getMinutes() === reminderDate.getMinutes()
        ) {
          setReminderActive(true);

          // Activate fullscreen alarm with continuous sound
          setAlarmActive(true);
          playAlarmSound();

          // Vibrate if supported
          if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);

          // Browser notification
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification('🔔 WAKTUNYA BELAJAR!', { body: 'Reminder belajar UAS sudah aktif!', icon: '/vite.svg' });
          }

          // Send email reminder if user has email saved
          if (userEmail && session?.userName) {
            sendReminderEmail(userEmail, session.userName, reminder)
              .then(() => { })
              .catch(() => { });
          }
        }
      }
      // Reset reminder active after 1 minute
      if (reminderActive && new Date().getSeconds() === 0) {
        setReminderActive(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [reminder, reminderActive, userEmail, session, alarmActive]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Setup presence
  useEffect(() => {
    if (!session) return;
    const userId = getDeviceId();
    setupPresence(userId, session.userName, currentSubject?.id, hideStatus);
    const unsub = subscribeToPresence(setOnlineUsers);
    return () => unsub();
  }, [session, currentSubject, hideStatus]);

  // Update presence when subject or hideStatus changes
  useEffect(() => {
    if (!session) return;
    const userId = getDeviceId();
    updatePresence(userId, { currentSubject: currentSubject?.id || null, hideStatus });
  }, [session, currentSubject, hideStatus]);

  // Smart presence: frequent updates when tab visible, infrequent when hidden
  useEffect(() => {
    if (!session) return;
    const userId = getDeviceId();
    let interval = null;

    const updateHeartbeat = () => {
      updatePresence(userId, {}); // Updates lastSeen timestamp
    };

    const handleVisibilityChange = () => {
      // Clear existing interval
      if (interval) clearInterval(interval);

      if (document.visibilityState === 'visible') {
        // Tab is active - update immediately and every 5 minutes
        updateHeartbeat();
        interval = setInterval(updateHeartbeat, 5 * 60 * 1000); // 5 minutes when visible
      } else {
        // Tab is hidden - update every 30 minutes
        interval = setInterval(updateHeartbeat, 30 * 60 * 1000); // 30 minutes when hidden
      }
    };

    // Initial setup
    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [session]);

  // Content protection
  useEffect(() => {
    if (!session) return;
    const prevent = (e) => e.preventDefault();
    const keyH = (e) => { if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'p'].includes(e.key.toLowerCase())) e.preventDefault(); };
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('keydown', keyH);
    return () => { document.removeEventListener('contextmenu', prevent); document.removeEventListener('keydown', keyH); };
  }, [session]);

  // Session Timeout - Track user activity
  useEffect(() => {
    if (!session) return;

    const updateActivity = () => {
      setLastActivity(Date.now());
      setShowTimeoutWarning(false); // Reset warning on activity
    };

    // Track user interactions
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, updateActivity, { passive: true }));

    return () => {
      events.forEach(event => window.removeEventListener(event, updateActivity));
    };
  }, [session]);

  // Session Timeout - Check for timeout
  useEffect(() => {
    if (!session) return;

    const checkTimeout = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;

      if (timeSinceActivity >= SESSION_TIMEOUT_MS) {
        // Auto logout
        const userId = getDeviceId();
        removePresence(userId);
        localStorage.removeItem('session');
        sessionStorage.removeItem('termsAgreedThisSession');
        setSession(null);
        setView('login');
        setSelectedClass('');
        setShowTimeoutWarning(false);
      } else if (timeSinceActivity >= SESSION_TIMEOUT_MS - WARNING_BEFORE_TIMEOUT_MS) {
        // Show warning
        setShowTimeoutWarning(true);
      }
    };

    const interval = setInterval(checkTimeout, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [session, lastActivity, SESSION_TIMEOUT_MS, WARNING_BEFORE_TIMEOUT_MS]);

  // Load user email, settings, and referral stats when session changes
  useEffect(() => {
    if (!session || !session.licenseKey) return;

    const loadUserData = async () => {
      try {
        // Check if license is expired (for cached sessions)
        if (session.expiry) {
          const expiryDate = new Date(session.expiry);
          const now = new Date();
          if (expiryDate < now) {
            // License expired - logout
            showToast('License Anda sudah expired. Silakan hubungi admin untuk perpanjangan.', 'error', 8000);
            localStorage.removeItem('session');
            setSession(null);
            setView('login');
            return;
          }
        }

        const email = await getUserEmail(session.licenseKey);
        if (email) setUserEmail(email);

        // Load synced settings from Firebase
        const cloudSettings = await getUserSettings(session.licenseKey);
        if (cloudSettings) {
          // Apply cloud settings to local state
          if (cloudSettings.selectedClass) {
            setSelectedClass(cloudSettings.selectedClass);
            localStorage.setItem('savedClass', cloudSettings.selectedClass);
          }
          if (cloudSettings.dark !== undefined) {
            const darkValue = cloudSettings.dark === true || cloudSettings.dark === 'true';
            setDark(darkValue);
            localStorage.setItem('dark', darkValue);
          }
          if (cloudSettings.theme) {
            setTheme(cloudSettings.theme);
            localStorage.setItem('theme', cloudSettings.theme);
          }
          if (cloudSettings.font) {
            setFont(cloudSettings.font);
            localStorage.setItem('font', cloudSettings.font);
          }
          // Sync hideStatus from cloud - works across devices
          if (cloudSettings.hasOwnProperty('hideStatus')) {
            const hideStatusValue = cloudSettings.hideStatus === true || cloudSettings.hideStatus === 'true';
            setHideStatus(hideStatusValue);
            localStorage.setItem('hideStatus', String(hideStatusValue));
          }
          if (cloudSettings.hasOwnProperty('hideStatusChangedAt')) {
            setHideStatusChangedAt(cloudSettings.hideStatusChangedAt || 0);
            localStorage.setItem('hideStatusChangedAt', String(cloudSettings.hideStatusChangedAt || 0));
          }
          // Sync reminder - handle empty string as "no reminder"
          if (cloudSettings.hasOwnProperty('reminder')) {
            setReminder(cloudSettings.reminder || '');
            if (cloudSettings.reminder) {
              localStorage.setItem('studyReminder', cloudSettings.reminder);
            } else {
              localStorage.removeItem('studyReminder');
            }
          }
          // Load progress from cloud
          if (cloudSettings.progress && Object.keys(cloudSettings.progress).length > 0) {
            setProgress(cloudSettings.progress);
            const userProgressKey = `studyProgress_${session.licenseKey}`;
            localStorage.setItem(userProgressKey, JSON.stringify(cloudSettings.progress));
          }
        }

        // Get referral stats
        let stats = await getReferralStats(session.licenseKey);

        // If no referral code, create one
        if (!stats.referralCode && !session.referralCode) {
          const newCode = await ensureReferralCode(session.licenseKey);
          if (newCode) {
            stats = { ...stats, referralCode: newCode };
          }
        }

        setReferralStats(stats);
      } catch (e) {
        console.error('Error loading user data:', e);
      }
    };

    loadUserData();
  }, [session]);

  // Realtime sync: listen for settings changes from other devices
  useEffect(() => {
    if (!session?.licenseKey) return;

    const unsubscribe = subscribeToUserSettings(session.licenseKey, (settings) => {
      if (!settings) return;

      // Sync progress from other devices
      if (settings.progress && Object.keys(settings.progress).length > 0) {
        setProgress(prev => {
          // Only update if different to avoid loops
          const prevJson = JSON.stringify(prev);
          const newJson = JSON.stringify(settings.progress);
          if (prevJson !== newJson) {
            const userProgressKey = `studyProgress_${session.licenseKey}`;
            localStorage.setItem(userProgressKey, newJson);
            return settings.progress;
          }
          return prev;
        });
      }

      // Sync theme settings
      if (settings.dark !== undefined) {
        const darkValue = settings.dark === true || settings.dark === 'true';
        setDark(prev => prev !== darkValue ? darkValue : prev);
      }
      if (settings.theme) {
        setTheme(prev => prev !== settings.theme ? settings.theme : prev);
      }
      if (settings.font) {
        setFont(prev => prev !== settings.font ? settings.font : prev);
      }
      // Sync reminder - handle empty string as "deleted reminder"
      if (settings.hasOwnProperty('reminder')) {
        const newReminder = settings.reminder || '';
        setReminder(prev => prev !== newReminder ? newReminder : prev);
        if (!newReminder) {
          localStorage.removeItem('studyReminder');
        }
      }
    });

    return () => unsubscribe();
  }, [session?.licenseKey]);

  const updateProgress = useCallback((subjectId, section, itemId) => {
    setProgress(prev => {
      const subjectProgress = prev[subjectId] || {};
      const sectionProgress = subjectProgress[section] || [];
      // Toggle: remove if exists, add if not
      const newSectionProgress = sectionProgress.includes(itemId)
        ? sectionProgress.filter(id => id !== itemId)
        : [...sectionProgress, itemId];
      return { ...prev, [subjectId]: { ...subjectProgress, [section]: newSectionProgress } };
    });
  }, []);

  const getOverallProgress = useCallback(() => {
    let total = 0, completed = 0;
    Object.keys(DB.content).forEach(subjectId => {
      const content = DB.content[subjectId];
      const subjectProgress = progress[subjectId] || {};

      // Materi Inti only
      const materiCount = content.materi?.length || 0;
      total += materiCount;
      completed += (subjectProgress.materi?.length || 0);

      // Quiz modules (count unique categories)
      if (content.quiz?.length > 0) {
        const categories = [...new Set(content.quiz.map(q => q.category || 'General').filter(Boolean))];
        total += categories.length;
        const quizScores = subjectProgress.quizScores || {};
        completed += Object.keys(quizScores).length;
      }
    });
    return total > 0 ? (completed / total) * 100 : 0;
  }, [progress]);

  const logout = () => {
    setConfirmLogout(true);
  };

  const confirmLogoutAction = () => {
    // Remove presence before clearing session
    const userId = getDeviceId();
    removePresence(userId);

    localStorage.removeItem('session');
    sessionStorage.removeItem('termsAgreedThisSession'); // Clear so terms shows on next login
    setSession(null);
    setView('login');
    setSelectedClass('');
    setConfirmLogout(false);
  };

  if (view === 'login') return <Login dark={dark} setDark={setDark} onSuccess={(d) => {
    setSession(d);
    localStorage.setItem('session', JSON.stringify(d));

    // Handle referral notification in App (where showToast exists)
    if (d.referralResult) {
      if (d.referralResult.success) {
        setTimeout(() => {
          showToast(`🎉 Referral Berhasil! Anda diundang oleh: ${d.referralResult.referrerName}`, 'success', 6000);
        }, 800);
      } else if (d.referralResult.error) {
        setTimeout(() => {
          showToast(`⚠️ ${d.referralResult.error}`, 'warning', 5000);
        }, 800);
      }
    }

    setView('class');
  }} />;

  if (view === 'class') return (
    <div className={`min-h-screen no-select ${dark ? 'dark' : ''}`} style={{ background: 'var(--bg)' }}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={smooth} className="glass-strong p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={smooth} className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg glow">
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            {rememberClass && savedClass ? (
              <>
                <h2 className="text-xl font-bold text-[var(--text)]">Selamat Datang Kembali!</h2>
                <p className="text-[var(--text-secondary)] text-sm mt-2">Kelas Anda: <span className="font-bold text-[var(--accent)]">{savedClass}</span></p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[var(--text)]">Pilih Kelas Anda</h2>
                <p className="text-[var(--text-secondary)] text-sm mt-2">Pilihlah kelas yang sesuai</p>
              </>
            )}
          </div>

          {/* Show class grid only if not remembered */}
          {!(rememberClass && savedClass) && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4 stagger">
                {DB.classes.map(c => (
                  <motion.button key={c} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedClass(c)}
                    className={`p-4 rounded-xl text-sm font-medium transition-all animate-slide-up ${selectedClass === c ? 'gradient-accent text-white shadow-lg glow' : 'glass-card text-[var(--text)]'}`}>{c}</motion.button>
                ))}
              </div>

              {/* Remember class checkbox */}
              <label className="flex items-center gap-2 mb-6 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberClass}
                  onChange={(e) => {
                    setRememberClass(e.target.checked);
                    localStorage.setItem('rememberClass', e.target.checked);
                    if (!e.target.checked) {
                      localStorage.removeItem('savedClass');
                    }
                  }}
                  className="w-4 h-4 accent-[var(--accent)] rounded"
                />
                <span className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--text)] transition-colors">Ingat pilihan saya</span>
              </label>
            </>
          )}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!selectedClass}
            onClick={() => {
              const u = { ...session, selectedClass };
              setSession(u);
              localStorage.setItem('session', JSON.stringify(u));
              // Save class if remember is enabled
              if (rememberClass) {
                localStorage.setItem('savedClass', selectedClass);
              }
              setView('dashboard');
              // Show terms agreement on every fresh login
              if (!sessionStorage.getItem('termsAgreedThisSession')) {
                setShowTerms(true);
              }
              // Show tutorial if first time OR if preview mode (always show for preview)
              if (!localStorage.getItem('tutorialCompletedV5') || session.licenseKey?.toLowerCase() === 'preview01') {
                setShowTutorial(true);
              }
            }}
            className="btn btn-primary w-full text-base disabled:opacity-40">
            <span>Lanjutkan</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Ganti Kelas button - only show when class is remembered */}
          {rememberClass && savedClass && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setRememberClass(false);
                localStorage.setItem('rememberClass', 'false');
                localStorage.removeItem('savedClass');
                setSelectedClass('');
              }}
              className="btn btn-secondary w-full text-base mt-3"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ganti Kelas</span>
            </motion.button>
          )}
        </motion.div>
      </div>
      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );

  return (
    <div className={`min-h-screen no-select ${dark ? 'dark' : ''}`} style={{ background: 'var(--bg)' }}>
      <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {currentSubject && (
              <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => { setCurrentSubject(null); setActiveTab(0); }} className="p-1.5 sm:p-2 rounded-xl hover:bg-[var(--surface-hover)] transition-all">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)]" />
              </motion.button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-9 sm:h-9 gradient-accent rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-semibold text-sm sm:text-base text-[var(--text)]">UAS BM B29</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            {/* Clock + Date + Reminder Card - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-card">
              <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-xs font-medium text-[var(--text)] tabular-nums">
                {currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </span>
              <div className="w-px h-3 bg-[var(--border)]" />
              <span className="text-xs font-medium text-[var(--text)] tabular-nums">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="w-px h-4 bg-[var(--border)]" />
              <button onClick={() => setShowReminder(true)} className={`p-1 rounded-lg hover:bg-[var(--surface-hover)] transition-all relative ${reminder ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                {reminder ? <BellRing className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                {reminder && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />}
              </button>
            </div>
            {/* Pomodoro Card - Compact on mobile */}
            <div className="flex items-center gap-0.5 sm:gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl glass-card">
              <Timer className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent)]" />
              <span className="text-[10px] sm:text-xs font-medium text-[var(--text)] tabular-nums">{formatTime(pomo.time)}</span>
              <button onClick={() => setPomo(p => ({ ...p, active: !p.active }))} className={`p-0.5 sm:p-1 rounded-lg ${pomo.active ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
                {pomo.active ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              </button>
              <button onClick={() => setPomo({ time: 25 * 60, active: false })} className="p-0.5 sm:p-1 rounded-lg text-[var(--text-muted)] hidden sm:block">
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
            {/* Admin Dashboard Button with Error Badge */}
            {session?.isAdmin && (
              <div className="relative">
                <button onClick={() => setShowAdminDashboard(true)} className="p-1.5 sm:p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all" title="Admin Dashboard">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </button>
                {unreadErrorCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse">
                    {unreadErrorCount > 99 ? '99+' : unreadErrorCount}
                  </span>
                )}
              </div>
            )}
            <button onClick={() => setShowSettings(true)} className="p-1.5 sm:p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all"><Settings className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)]" /></button>
            <button onClick={() => setDark(!dark)} className="p-1.5 sm:p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all">
              {dark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent)]" />}
            </button>
            <button onClick={logout} className="btn-ghost text-xs sm:text-sm px-2 sm:px-3">Keluar</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          {!currentSubject ? (
            <motion.div key="d" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={smooth}>
              <Dashboard session={session} selectedClass={selectedClass} overallProgress={getOverallProgress()} onSelect={setCurrentSubject} progress={progress} onlineUsers={onlineUsers} schedules={DB.schedules} hideStatus={hideStatus} />
            </motion.div>
          ) : (
            <motion.div key="s" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={smooth}>
              <SubjectView subject={currentSubject} activeTab={activeTab} setActiveTab={setActiveTab} progress={progress} updateProgress={updateProgress} session={session} selectedClass={selectedClass} isPreviewMode={isPreviewMode} showCooldown={showCooldown} onlineUsers={onlineUsers} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '60px 16px 16px 16px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            style={{
              backgroundColor: dark ? '#1a1a24' : '#ffffff',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '85vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
            }}
            className="p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--text)]">Pengaturan</h3>
              <button onClick={() => setShowSettings(false)} className="p-2 rounded-xl hover:bg-[var(--surface-hover)]"><X className="w-5 h-5" /></button>
            </div>

            {/* Lock overlay for preview mode */}
            {isPreviewMode ? (
              <div style={{ position: 'relative', minHeight: '200px' }}>
                <ContentLockOverlay message="Pengaturan tidak tersedia di Preview Mode" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] mb-3"><Palette className="w-4 h-4" />Warna Aksen</label>
                  <div className="flex gap-3">
                    {themeColors.map(t => (
                      <motion.button key={t.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setTheme(t.id)}
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${theme === t.id ? 'border-[var(--text)] scale-105' : 'border-transparent'}`}
                        style={{ background: t.color }}>{theme === t.id && <Check className="w-5 h-5 text-white" />}</motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] mb-3"><Type className="w-4 h-4" />Font</label>
                  <div className="grid grid-cols-3 gap-2">
                    {fonts.map(f => (
                      <button key={f.id} onClick={() => setFont(f.id)} className={`p-3 rounded-xl text-sm font-medium transition-all ${font === f.id ? 'gradient-accent text-white' : 'glass-card text-[var(--text)]'}`} style={{ fontFamily: f.name }}>{f.name}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                  <span className="text-[var(--text)]">Mode Gelap</span>
                  <button onClick={() => setDark(!dark)} className={`w-12 h-7 rounded-full p-1 transition-colors ${dark ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}>
                    <motion.div layout className={`w-5 h-5 rounded-full bg-white shadow-md ${dark ? 'ml-auto' : ''}`} />
                  </button>
                </div>

                {/* Dark Mode Schedule */}
                <div className="p-4 glass-card rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[var(--text)] font-medium">Jadwal Mode Gelap</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {darkModeSchedule.enabled ? `🕐 ${darkModeSchedule.startTime} - ${darkModeSchedule.endTime}` : 'Matikan/nyalakan manual'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const updated = { ...darkModeSchedule, enabled: !darkModeSchedule.enabled };
                        setDarkModeSchedule(updated);
                        localStorage.setItem('darkModeSchedule', JSON.stringify(updated));
                        if (session?.licenseKey) {
                          saveUserSettings(session.licenseKey, { darkModeSchedule: updated });
                        }
                      }}
                      className={`w-12 h-7 rounded-full p-1 transition-colors ${darkModeSchedule.enabled ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
                    >
                      <motion.div layout className={`w-5 h-5 rounded-full bg-white shadow-md ${darkModeSchedule.enabled ? 'ml-auto' : ''}`} />
                    </button>
                  </div>
                  {darkModeSchedule.enabled && (
                    <div className="flex gap-2 items-center pt-2 border-t border-[var(--border)]">
                      <div className="flex-1">
                        <label className="text-xs text-[var(--text-muted)] block mb-1">Mulai Gelap</label>
                        <input
                          type="time"
                          value={darkModeSchedule.startTime}
                          onChange={(e) => {
                            const updated = { ...darkModeSchedule, startTime: e.target.value };
                            setDarkModeSchedule(updated);
                            localStorage.setItem('darkModeSchedule', JSON.stringify(updated));
                            if (session?.licenseKey) {
                              saveUserSettings(session.licenseKey, { darkModeSchedule: updated });
                            }
                          }}
                          className="input w-full text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-[var(--text-muted)] block mb-1">Selesai</label>
                        <input
                          type="time"
                          value={darkModeSchedule.endTime}
                          onChange={(e) => {
                            const updated = { ...darkModeSchedule, endTime: e.target.value };
                            setDarkModeSchedule(updated);
                            localStorage.setItem('darkModeSchedule', JSON.stringify(updated));
                            if (session?.licenseKey) {
                              saveUserSettings(session.licenseKey, { darkModeSchedule: updated });
                            }
                          }}
                          className="input w-full text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Hide Online Status - Below Mode Gelap */}
                <div className="p-4 glass-card rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[var(--text)] font-medium">Sembunyikan Status Online</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {hideStatus ? '🔒 Status tersembunyi - kamu tidak bisa melihat siapa yang online' : '👀 Status terlihat oleh semua orang'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const now = Date.now();
                        const cooldownMs = 60 * 60 * 1000; // 1 hour
                        const timePassed = now - hideStatusChangedAt;
                        // Admin bypass - no cooldown for admin
                        if (!session?.isAdmin && timePassed < cooldownMs && hideStatusChangedAt > 0) {
                          const remainingMin = Math.ceil((cooldownMs - timePassed) / 60000);
                          showToast(`⏳ Kamu hanya bisa mengganti ini 1 jam sekali. Tunggu ${remainingMin} menit lagi.`, 'warning');
                          return;
                        }
                        // Show styled confirmation modal
                        setShowHideStatusConfirm(true);
                      }}
                      className={`w-12 h-7 rounded-full p-1 transition-colors ${hideStatus ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
                    >
                      <motion.div layout className={`w-5 h-5 rounded-full bg-white shadow-md ${hideStatus ? 'ml-auto' : ''}`} />
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-2">
                    ⚠️ Kamu hanya bisa mengganti pengaturan ini <b>1 jam sekali</b>. Jika menyembunyikan status, kamu juga tidak bisa melihat siapa yang online.
                    {session?.isAdmin && <span className="block mt-1 text-amber-500">👑 Admin tetap bisa melihat semua user.</span>}
                  </p>
                </div>

                {/* Email for Reminder */}
                <div className="p-4 glass-card rounded-xl space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                    <Mail className="w-4 h-4" />Email untuk Reminder
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="input flex-1"
                    />
                    <button
                      onClick={async () => {
                        if (!userEmail || !isValidEmail(userEmail)) {
                          showToast('Masukkan email yang valid', 'error');
                          return;
                        }
                        try {
                          await saveUserEmail(session.licenseKey, userEmail);
                          showToast('Email berhasil disimpan!', 'success');
                        } catch (e) {
                          showToast('Error: ' + e.message, 'error');
                        }
                      }}
                      className="btn btn-primary px-4"
                    >
                      Simpan
                    </button>
                    {userEmail && (
                      <button
                        onClick={async () => {
                          try {
                            setUserEmail('');
                            await saveUserEmail(session.licenseKey, '');
                            showToast('Email dihapus. Anda tidak akan menerima notifikasi email.', 'info');
                          } catch (e) {
                            showToast('Error: ' + e.message, 'error');
                          }
                        }}
                        className="btn btn-secondary px-3"
                        title="Hapus email"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Test Reminder Button */}
                  <button
                    onClick={async () => {
                      // Rate limit check - 60 seconds between tests
                      const now = Date.now();
                      const cooldown = 60 * 1000; // 60 seconds
                      if (now - lastTestReminder < cooldown) {
                        const remaining = Math.ceil((cooldown - (now - lastTestReminder)) / 1000);
                        showToast(`⏳ Tunggu ${remaining} detik lagi sebelum test ulang.`, 'warning');
                        return;
                      }
                      setLastTestReminder(now);

                      // Test notification
                      if (typeof Notification !== 'undefined') {
                        if (Notification.permission === 'granted') {
                          new Notification('🔔 Test Reminder!', { body: 'Notifikasi browser berfungsi!', icon: '/vite.svg' });
                        } else if (Notification.permission === 'default') {
                          const perm = await Notification.requestPermission();
                          if (perm === 'granted') {
                            new Notification('🔔 Test Reminder!', { body: 'Notifikasi browser aktif!', icon: '/vite.svg' });
                          }
                        }
                      }

                      // Play sound
                      try {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        oscillator.frequency.value = 800;
                        oscillator.type = 'sine';
                        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.5);
                      } catch { }

                      // Vibrate
                      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

                      // Test email if configured
                      if (userEmail && isValidEmail(userEmail)) {
                        const result = await sendReminderEmail(userEmail, session?.userName || 'User', 'TEST');
                        if (result.success) {
                          showToast('✅ Test berhasil!\n- Notifikasi: ' + (Notification.permission === 'granted' ? 'Aktif' : 'Tidak aktif') + '\n- Email: Terkirim ke ' + userEmail, 'success');
                        } else {
                          showToast('⚠️ Test selesai!\n- Notifikasi: ' + (Notification.permission === 'granted' ? 'Aktif' : 'Tidak aktif') + '\n- Email: Gagal - ' + (result.error || 'Unknown error'), 'warning');
                        }
                      } else {
                        showToast('✅ Test notifikasi selesai!\n- Notifikasi: ' + (Notification.permission === 'granted' ? 'Aktif' : Notification.permission) + '\n- Email: Tidak ditest (email belum diisi)', 'success');
                      }
                    }}
                    className="btn btn-secondary w-full text-sm"
                  >
                    🔔 Test Reminder (Notifikasi + Email)
                  </button>

                  <div className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${typeof Notification !== 'undefined' && Notification.permission === 'granted' ? 'bg-green-500' : typeof Notification !== 'undefined' && Notification.permission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                    <span className="text-[var(--text-muted)]">
                      Notifikasi Browser: {typeof Notification === 'undefined' ? '❌ Tidak didukung' : Notification.permission === 'granted' ? '✅ Aktif' : Notification.permission === 'denied' ? '❌ Diblokir' : '⚠️ Belum diizinkan'}
                    </span>
                  </div>
                </div>

                {/* Referral Code */}
                {(referralStats.referralCode || session?.referralCode) && (
                  <div className="p-4 glass-card rounded-xl space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                      <Gift className="w-4 h-4" />Kode Referral Anda
                    </label>
                    <div className="flex gap-2">
                      <code className="flex-1 p-3 bg-[var(--accent-soft)] rounded-xl text-[var(--accent)] font-mono text-center">
                        {referralStats.referralCode || session?.referralCode}
                      </code>
                      <button
                        onClick={() => {
                          const code = referralStats.referralCode || session?.referralCode;
                          navigator.clipboard.writeText(code);
                          showToast('Kode referral berhasil disalin!', 'success');
                        }}
                        className="btn btn-secondary px-3"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const code = referralStats.referralCode || session?.referralCode;
                          const text = `Yuk belajar UAS bareng di BINUS B29 UAS Prep! Gunakan kode referral: ${code}`;
                          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                        }}
                        className="btn btn-primary px-3"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-muted)]">Jumlah referral berhasil:</span>
                      <span className="font-bold text-[var(--accent)]">{referralStats.referralCount || 0}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Legal Section */}
            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
                <button
                  onClick={() => setShowLegalPopup('tos')}
                  className="hover:text-[var(--text-secondary)] transition-colors"
                >
                  Syarat & Ketentuan
                </button>
                <span>|</span>
                <button
                  onClick={() => setShowLegalPopup('privacy')}
                  className="hover:text-[var(--text-secondary)] transition-colors"
                >
                  Kebijakan Privasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Popup Modal */}
      <AnimatePresence>
        {showLegalPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ zIndex: 999999 }}
            onClick={() => setShowLegalPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="modal p-6 max-w-md max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {showLegalPopup === 'tos' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-[var(--text)]">Syarat & Ketentuan</h2>
                  </div>
                  <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>License key bersifat <strong>pribadi</strong> dan tidak boleh dibagikan.</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Dilarang menjual, menyewakan, atau memindahtangankan license key.</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Dilarang mengakali sistem dengan cara apapun.</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Konten di forum harus sopan dan tidak melanggar hukum.</span>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl mt-4">
                      <p className="text-red-500 font-bold text-center text-xs">Pelanggaran = Akses DICABUT. NO REFUND!</p>
                    </div>
                  </div>
                </>
              )}

              {showLegalPopup === 'privacy' && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-[var(--text)]">Kebijakan Privasi</h2>
                  </div>
                  <div className="space-y-4 text-sm text-[var(--text-secondary)]">
                    <div>
                      <p className="font-semibold text-[var(--text)] mb-1">Data yang dikumpulkan:</p>
                      <p className="text-xs">Nama, email (opsional), license key, device ID, progress belajar, aktivitas forum.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text)] mb-1">Penggunaan data:</p>
                      <p className="text-xs">Autentikasi, sinkronisasi progress, notifikasi pengingat, dan peningkatan layanan.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text)] mb-1">Keamanan:</p>
                      <p className="text-xs">Data disimpan di Firebase dengan enkripsi. Kami tidak menjual data ke pihak ketiga.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text)] mb-1">Hak pengguna:</p>
                      <p className="text-xs">Anda dapat meminta penghapusan data dengan menghubungi admin.</p>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={() => setShowLegalPopup(null)}
                className="btn btn-primary w-full mt-6"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide Status Confirmation Modal (styled, not browser native) */}
      <AnimatePresence>
        {showHideStatusConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setShowHideStatusConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-strong p-6 rounded-2xl max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-bold text-[var(--text)] text-center text-lg mb-2">
                {hideStatus ? '👀 Tampilkan Status Online?' : '🔒 Sembunyikan Status Online?'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] text-center mb-4">
                {hideStatus
                  ? 'Status kamu akan terlihat oleh semua orang.'
                  : 'Jika menyembunyikan status, kamu juga tidak bisa melihat siapa yang online.'}
              </p>
              <p className="text-xs text-[var(--text-muted)] text-center mb-4 p-2 bg-[var(--accent-soft)] rounded-lg">
                ⚠️ Kamu hanya bisa mengganti ini <b>1 jam sekali</b>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHideStatusConfirm(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl surface-flat text-[var(--text)] text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    const newValue = !hideStatus;
                    const now = Date.now();
                    setHideStatus(newValue);
                    setHideStatusChangedAt(now);
                    localStorage.setItem('hideStatus', String(newValue));
                    localStorage.setItem('hideStatusChangedAt', String(now));
                    if (session?.licenseKey) {
                      saveUserSettings(session.licenseKey, { hideStatus: newValue, hideStatusChangedAt: now });
                    }
                    showToast(newValue ? '🔒 Status online disembunyikan' : '👀 Status online terlihat', 'success');
                    setShowHideStatusConfirm(false);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl gradient-accent text-white text-sm font-medium"
                >
                  Ya, Lanjutkan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Reminder Modal */}
      <AnimatePresence>
        {showReminder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setShowReminder(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="modal p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="text-lg font-bold text-[var(--text)]">Reminder Belajar</h3>
                </div>
                <button onClick={() => setShowReminder(false)} className="p-2 rounded-xl hover:bg-[var(--surface-hover)]"><X className="w-5 h-5" /></button>
              </div>

              {/* Lock overlay for preview mode */}
              {isPreviewMode ? (
                <div style={{ position: 'relative', minHeight: '150px' }}>
                  <ContentLockOverlay message="Reminder tidak tersedia di Preview Mode" />
                </div>
              ) : (
                <>
                  <p className="text-[var(--text-secondary)] text-sm mb-4">Set tanggal dan waktu untuk mengingatkan Anda belajar.</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">Tanggal</label>
                        <input
                          type="date"
                          value={reminder.split('T')[0] || ''}
                          onChange={(e) => {
                            const time = reminder.split('T')[1] || '08:00';
                            const newReminder = e.target.value + 'T' + time;
                            setReminder(newReminder);
                            localStorage.setItem('studyReminder', newReminder);
                          }}
                          className="input text-center"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">Waktu</label>
                        <input
                          type="time"
                          value={reminder.split('T')[1] || '08:00'}
                          onChange={(e) => {
                            const date = reminder.split('T')[0] || new Date().toISOString().split('T')[0];
                            const newReminder = date + 'T' + e.target.value;
                            setReminder(newReminder);
                            localStorage.setItem('studyReminder', newReminder);
                          }}
                          className="input text-center"
                        />
                      </div>
                    </div>
                    {reminder && reminder.includes('T') && (
                      <div className="p-3 bg-[var(--accent-soft)] rounded-xl text-center">
                        <p className="text-sm text-[var(--accent)] font-medium">🔔 Reminder: {new Date(reminder).toLocaleString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      {reminder && (
                        <button
                          onClick={() => {
                            setReminder('');
                            localStorage.removeItem('studyReminder');
                            // Sync to Firebase so all devices with same license key get updated
                            if (session?.licenseKey) {
                              saveUserSettings(session.licenseKey, { reminder: '' });
                            }
                            setShowReminder(false);
                            showToast('🔔 Reminder dihapus', 'success');
                          }}
                          className="btn btn-secondary flex-1"
                        >
                          Hapus
                        </button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          // Sync reminder to Firebase
                          if (session?.licenseKey && reminder) {
                            saveUserSettings(session.licenseKey, { reminder });
                          }
                          setShowReminder(false);
                          if (reminder && reminder.includes('T')) {
                            showToast('🔔 Reminder disimpan', 'success');
                          }
                        }}
                        className="btn btn-primary flex-1"
                      >
                        Simpan
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reminder Alert Popup */}
      <AnimatePresence>
        {showReminderAlert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" style={{ zIndex: 200 }}>
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="glass-strong p-8 text-center max-w-sm mx-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl"
              >
                <BellRing className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-2">🔔 Waktunya Belajar!</h2>
              <p className="text-[var(--text-secondary)] mb-6">Reminder belajar UAS kamu sudah aktif. Yuk mulai belajar!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReminderAlert(false)}
                className="btn btn-primary w-full text-lg"
              >
                OK, Mulai Belajar!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Support FAB */}
      <a href="https://wa.me/6287839256171" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 group">
        <div className="flex items-center gap-2">
          <span className="hidden group-hover:block px-3 py-1.5 glass-strong rounded-lg text-sm text-[var(--text)] animate-fade whitespace-nowrap">Contact Support</span>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg glass-strong border border-[var(--border)]">
            <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text)]" />
          </motion.div>
        </div>
      </a>

      {/* Global Live Chat - with Suspense */}
      <Suspense fallback={null}>
        <GlobalChat session={session} selectedClass={selectedClass} onlineUsers={onlineUsers} addNotification={(n) => setNotifications(prev => [...prev, { id: Date.now() + Math.random(), ...n }])} onImageClick={setImagePreview} isPreviewMode={isPreviewMode} showCooldown={showCooldown} showBrowserNotification={showBrowserNotification} />
      </Suspense>

      {/* Notification Popup */}
      <div className="fixed top-4 right-4 z-[400] space-y-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              onAnimationComplete={() => setTimeout(() => setNotifications(prev => prev.filter(x => x.id !== n.id)), 3000)}
              className="glass-strong px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 pointer-events-auto max-w-xs"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${n.type === 'mention' ? 'bg-blue-500' : 'bg-[var(--accent)]'}`}>
                {n.type === 'mention' ? <MessageSquare className="w-4 h-4 text-white" /> : <Bell className="w-4 h-4 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text)] truncate">{n.title}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{n.message}</p>
              </div>
              <button onClick={() => setNotifications(prev => prev.filter(x => x.id !== n.id))} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Terms Agreement Modal (Every Login) */}
      <AnimatePresence>
        {showTerms && view === 'dashboard' && (
          <TermsAgreement onAgree={() => { sessionStorage.setItem('termsAgreedThisSession', 'true'); setShowTerms(false); }} />
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        onConfirm={confirmLogoutAction}
        title="Keluar"
        message="Yakin ingin keluar dari akun?"
      />

      {/* Toast Notification (replaces browser alert) */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[500] max-w-md"
          >
            <div className={`glass-strong px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${toast.type === 'success' ? 'border-l-4 border-green-500' :
              toast.type === 'error' ? 'border-l-4 border-red-500' :
                toast.type === 'warning' ? 'border-l-4 border-yellow-500' :
                  'border-l-4 border-[var(--accent)]'
              }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${toast.type === 'success' ? 'bg-green-500/15' :
                toast.type === 'error' ? 'bg-red-500/15' :
                  toast.type === 'warning' ? 'bg-yellow-500/15' :
                    'bg-[var(--accent-soft)]'
                }`}>
                {toast.type === 'success' ? <Check className="w-4 h-4 text-green-500" /> :
                  toast.type === 'error' ? <X className="w-4 h-4 text-red-500" /> :
                    toast.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-500" /> :
                      <Bell className="w-4 h-4 text-[var(--accent)]" />}
              </div>
              <p className="text-sm text-[var(--text)] whitespace-pre-line">{toast.message}</p>
              <button onClick={() => setToast(t => ({ ...t, show: false }))} className="ml-2 p-1 rounded-lg hover:bg-[var(--surface-hover)]">
                <X className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cooldown Notification (animated from bottom) */}
      <AnimatePresence>
        {cooldown.show && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[600]"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full shadow-lg text-sm font-medium">
              <Timer className="w-4 h-4 animate-pulse" />
              <span>⏳ Tunggu {cooldown.seconds}s</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alarm Modal (fullscreen wake-up alarm) */}
      <AnimatePresence>
        {alarmActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            style={{ zIndex: 600 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-strong p-8 max-w-md w-full mx-4 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-20 h-20 mx-auto mb-6 bg-[var(--accent-soft)] rounded-full flex items-center justify-center"
              >
                <BellRing className="w-10 h-10 text-[var(--accent)]" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Waktunya Belajar!</h2>
              <p className="text-[var(--text-secondary)] mb-6">Reminder belajar UAS Anda sudah aktif.</p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    stopAlarmSound();
                    setAlarmActive(false);
                    // Clear reminder to stop red dot
                    setReminder('');
                    localStorage.removeItem('studyReminder');
                    setReminderActive(false);
                    // Sync to Firebase so all devices know reminder is cleared
                    if (session?.licenseKey) {
                      saveUserSettings(session.licenseKey, { reminder: '' });
                    }
                  }}
                  className="btn btn-primary px-6 py-3"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Berhenti
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    stopAlarmSound();
                    setAlarmActive(false);
                    // Snooze for 5 minutes
                    setTimeout(() => {
                      setAlarmActive(true);
                      playAlarmSound();
                    }, 5 * 60 * 1000);
                    showToast('Alarm di-snooze 5 menit', 'info');
                  }}
                  className="btn btn-secondary px-6 py-3"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Snooze 5m
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Tutorial - with Suspense */}
      <AnimatePresence>
        {showTutorial && (
          <Suspense fallback={<LoadingSpinner message="Memuat Tutorial..." />}>
            <Tutorial onComplete={() => setShowTutorial(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Session Timeout Warning Modal */}
      <AnimatePresence>
        {showTimeoutWarning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" style={{ zIndex: 300 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass-strong p-6 max-w-sm mx-4 text-center">
              <div className="w-16 h-16 bg-orange-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">Sesi Akan Berakhir</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-5">
                Anda tidak aktif selama beberapa waktu. Sesi akan otomatis logout dalam 5 menit.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setLastActivity(Date.now()); setShowTimeoutWarning(false); }}
                className="btn btn-primary w-full"
              >
                Tetap Login
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {showDocViewer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/80" onClick={() => setShowDocViewer(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="h-full flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 bg-[var(--surface-solid)]">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-medium text-[var(--text)] truncate max-w-xs">{docViewerTitle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a href={docViewerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-sm px-3 py-1.5">
                    <ExternalLink className="w-4 h-4" />Buka di Tab Baru
                  </a>
                  <button onClick={() => setShowDocViewer(false)} className="p-2 rounded-xl hover:bg-[var(--surface-hover)]">
                    <X className="w-5 h-5 text-[var(--text-secondary)]" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-900">
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(docViewerUrl)}&embedded=true`}
                  className="w-full h-full border-0"
                  title="Document Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Dashboard Modal - with loading state */}
      <AnimatePresence>
        {showAdminDashboard && (
          <Suspense fallback={<LoadingSpinner message="Memuat Admin Dashboard..." />}>
            <AdminDashboard
              session={session}
              onClose={() => setShowAdminDashboard(false)}
            />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Image Lightbox/Preview */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[700] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setImagePreview(null)}
          >
            <button
              onClick={() => setImagePreview(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcement Popup */}
      <AnimatePresence>
        {showAnnouncementPopup && announcement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[800] bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-strong p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${announcement.type === 'warning' ? 'bg-yellow-500/20' :
                  announcement.type === 'maintenance' ? 'bg-red-500/20' : 'bg-[var(--accent-soft)]'
                  }`}>
                  <Megaphone className={`w-6 h-6 ${announcement.type === 'warning' ? 'text-yellow-500' :
                    announcement.type === 'maintenance' ? 'text-red-500' : 'text-[var(--accent)]'
                    }`} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text)]">Pengumuman</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {new Date(announcement.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <p className="text-[var(--text)] mb-6 whitespace-pre-wrap">{announcement.message}</p>
              <button
                onClick={() => {
                  setShowAnnouncementPopup(false);
                  localStorage.setItem('lastDismissedAnnouncement', new Date().toISOString());
                }}
                className="btn btn-primary w-full"
              >
                <Check className="w-4 h-4" />
                <span>Mengerti</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Mode Watermark - Full screen diagonal */}
      {isPreviewMode && <PreviewWatermark />}

      {/* User Watermark - Username tracking (only for non-preview users) */}
      {session && !isPreviewMode && <UserWatermark username={session.name || session.licenseKey} />}

      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );
}

function Login({ dark, setDark, onSuccess }) {
  const [key, setKey] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showReferral, setShowReferral] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Rate limiting state
  const [loginAttempts, setLoginAttempts] = useState(() => {
    const stored = localStorage.getItem('loginAttempts');
    return stored ? JSON.parse(stored) : { count: 0, lockedUntil: null };
  });
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Rate limiting thresholds
  const LOCKOUT_TIERS = [
    { attempts: 3, duration: 60 * 1000 },      // 3 fails = 1 min
    { attempts: 6, duration: 5 * 60 * 1000 },  // 6 fails = 5 min
    { attempts: 9, duration: 30 * 60 * 1000 }, // 9 fails = 30 min
  ];

  // Check lockout status
  useEffect(() => {
    if (!loginAttempts.lockedUntil) {
      setLockoutRemaining(0);
      return;
    }

    const checkLockout = () => {
      const now = Date.now();
      if (now >= loginAttempts.lockedUntil) {
        setLockoutRemaining(0);
        // Don't reset count, just unlock
        const updated = { ...loginAttempts, lockedUntil: null };
        setLoginAttempts(updated);
        localStorage.setItem('loginAttempts', JSON.stringify(updated));
      } else {
        setLockoutRemaining(Math.ceil((loginAttempts.lockedUntil - now) / 1000));
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [loginAttempts]);

  const isLockedOut = lockoutRemaining > 0;

  const getLockoutDuration = (attempts) => {
    for (let i = LOCKOUT_TIERS.length - 1; i >= 0; i--) {
      if (attempts >= LOCKOUT_TIERS[i].attempts) {
        return LOCKOUT_TIERS[i].duration;
      }
    }
    return 0;
  };

  const handleFailedAttempt = () => {
    const newCount = loginAttempts.count + 1;
    const lockoutDuration = getLockoutDuration(newCount);
    const updated = {
      count: newCount,
      lockedUntil: lockoutDuration > 0 ? Date.now() + lockoutDuration : null,
    };
    setLoginAttempts(updated);
    localStorage.setItem('loginAttempts', JSON.stringify(updated));
  };

  const resetAttempts = () => {
    const updated = { count: 0, lockedUntil: null };
    setLoginAttempts(updated);
    localStorage.setItem('loginAttempts', JSON.stringify(updated));
  };

  const formatLockoutTime = (seconds) => {
    if (seconds >= 60) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs}s`;
    }
    return `${seconds}s`;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!key.trim() || isLockedOut) return;

    setLoading(true);
    setError('');

    try {
      // Bypass validation for Preview01 - special preview mode key
      if (key.toLowerCase() === 'preview01') {
        resetAttempts();
        onSuccess({
          licenseKey: key,
          name: 'Preview User',
          type: 'preview',
          expiry: null
        });
        setLoading(false);
        return;
      }

      const r = await validateLicenseWithDevice(key, referralCode.trim() || null);
      if (r.valid) {
        resetAttempts(); // Reset on success
        // Referral notifications handled in App component's onSuccess callback
        onSuccess({ ...r.license, key, referralResult: r.referralResult });
      } else {
        // Check if it's an expired license (don't count as failed attempt)
        const isExpiredError = r.error?.includes('expired') || r.error?.includes('Expired');
        // Check if it's a network error (don't count as failed attempt)
        const isNetworkError = r.error?.includes('timeout') || r.error?.includes('Koneksi') || r.error?.includes('server gagal');

        // Only count as failed attempt if it's an invalid key error
        if (!isNetworkError && !isExpiredError) {
          handleFailedAttempt();
          setError(r.error + ` (${3 - (loginAttempts.count % 3 + 1)} percobaan tersisa)`);
        } else if (isExpiredError) {
          // Special styling for expired license
          setError('⏰ ' + r.error + '\n\nHubungi admin untuk perpanjangan.');
        } else {
          setError(r.error);
        }
      }
    } catch {
      // Network/timeout errors should NOT count as failed attempts
      setError('Koneksi gagal. Coba lagi.');
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${dark ? 'dark' : ''}`} style={{ background: 'var(--bg)' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={smooth} className="w-full max-w-sm">
        <div className="glass-strong p-8">
          <div className="flex justify-end mb-2">
            <button onClick={() => setDark(!dark)} className="p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all">
              {dark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[var(--accent)]" />}
            </button>
          </div>
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0.8, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ ...smooth, delay: 0.1 }} className="w-20 h-20 gradient-accent rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl glow animate-float">
              <Lock className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>UAS BM B29 Study App</h1>
            <p className="text-[var(--text-secondary)] mt-2">🎓 Platform Belajar Premium</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block"><Key className="w-4 h-4 inline mr-2" />License Key</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  placeholder="Masukkan license key"
                  className="input pr-20"
                  autoComplete="off"
                  disabled={isLockedOut}
                />
                {/* Preview icon with tooltip */}
                <button
                  type="button"
                  onClick={() => setKey('PREVIEW01')}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-300 transition-colors group"
                  title="Coba Preview Mode tanpa license"
                >
                  <Play className="w-4 h-4" />
                  <span className="absolute -top-8 right-0 bg-[var(--surface-solid)] text-[var(--text)] text-xs px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[var(--border)]">
                    Preview Mode
                  </span>
                </button>
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Referral Code Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowReferral(!showReferral)}
                className="text-sm text-[var(--accent)] flex items-center gap-1.5 hover:opacity-80 transition-opacity font-medium"
              >
                <Gift className="w-3.5 h-3.5" />
                {showReferral ? 'Sembunyikan' : 'Punya kode referral?'}
              </button>

              <AnimatePresence>
                {showReferral && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-[var(--text-muted)] mt-2 mb-1">
                      Tip: Minta kode referral dari teman (ada di Settings dashboard mereka).
                    </p>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                      placeholder="REF-XXXX-XXXX (opsional)"
                      className="input mt-1"
                      disabled={isLockedOut}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lockout Warning */}
            {isLockedOut && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-orange-500/15 border border-orange-500/30 rounded-xl text-center"
              >
                <p className="text-orange-500 text-sm font-medium flex items-center justify-center gap-2">
                  <Timer className="w-4 h-4" />
                  Terlalu banyak percobaan. Coba lagi dalam {formatLockoutTime(lockoutRemaining)}
                </p>
              </motion.div>
            )}

            {error && !isLockedOut && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--danger)] text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4" />{error}
                {loginAttempts.count > 0 && <span className="text-xs">({3 - (loginAttempts.count % 3 || 3)} percobaan tersisa)</span>}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: isLockedOut ? 1 : 1.02 }}
              whileTap={{ scale: isLockedOut ? 1 : 0.98 }}
              type="submit"
              disabled={loading || !key.trim() || isLockedOut}
              className="btn btn-primary w-full text-base"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Masuk</span><ArrowRight className="w-5 h-5" /></>}
            </motion.button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--border)]">
            <p className="text-[var(--text-muted)] text-sm mb-3 text-center">Belum punya license?</p>
            {/* Get License | Chat Admin - grid for perfect centering */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <a href="https://forms.gle/C1XFvjqhSzo8bBT1A" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 justify-end text-sky-400 font-semibold text-sm hover:text-sky-300 transition-colors">
                <FileText className="w-4 h-4" />Get License
              </a>
              <span className="text-[var(--text-muted)]">|</span>
              <a href="https://wa.me/6287839256171" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 justify-start text-emerald-400 font-semibold text-sm hover:text-emerald-300 transition-colors">
                <MessageCircle className="w-4 h-4" />Chat Admin
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );
}

function Dashboard({ session, selectedClass, overallProgress, onSelect, progress, onlineUsers, schedules, hideStatus }) {
  const name = session?.userName || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam';
  const classSchedule = schedules[selectedClass] || schedules['Other'] || {};
  const [showScheduleInfo, setShowScheduleInfo] = useState(false);
  const [showPatchNotes, setShowPatchNotes] = useState(false);
  const [expandedVersions, setExpandedVersions] = useState({}); // Track which versions are expanded

  // Version and patch notes data
  const currentVersion = "1.1.1";
  const patchNotes = {
    current: {
      version: "1.1.1",
      date: "31 Des 2025",
      changes: [
        "- Jadwal UAS RESMI dari BINUSMAYA (5 mata kuliah lengkap)",
        "- Keterangan tipe ujian: Onsite / Online",
        "- CB Pancasila: Start 14 Jan, Deadline 21 Jan 17:01",
        "- Countdown otomatis ke ujian terdekat",
        "- Info tooltip: sumber jadwal resmi BINUSMAYA"
      ]
    },
    past: [
      {
        version: "1.1.0",
        date: "30 Des 2024",
        changes: [
          "- Fitur Jadwal Mode Gelap: atur waktu otomatis gelap/terang",
          "- Rangkuman: 3 mode tampilan (Dark/Sepia/Light) + layout lebih compact",
          "- Perbaikan sinkronisasi Reminder antar perangkat",
          "- Peningkatan performa: ukuran aplikasi dikurangi 31%",
          "- Perbaikan pengaturan yang tidak tersimpan",
          "- Sistem multi-perangkat yang lebih stabil"
        ]
      },
      {
        version: "1.0.2",
        date: "29 Des 2024",
        changes: [
          "- Fitur Sembunyikan Status Online di Settings",
          "- Tombol Hubungi Admin di halaman error",
          "- Perbaikan reminder red dot yang tidak hilang",
          "- Peningkatan logging error untuk debugging",
          "- Tombol patch notes dengan warna berbeda"
        ]
      },
      {
        version: "1.0.1",
        date: "29 Des 2024",
        changes: [
          "- Fitur quiz per modul dengan penyimpanan skor",
          "- Peningkatan kenyamanan tampilan light mode",
          "- Perbaikan error pada mode 'Kerjakan Semua'",
          "- Perhitungan progress berdasarkan Materi Inti dan Quiz",
          "- Penambahan 3 opsi tema warna baru",
          "- Forum dan Chat mention system dengan @all untuk admin"
        ]
      },
      {
        version: "1.0.0",
        date: "25 Des 2024",
        changes: [
          "- Rilis versi pertama aplikasi",
          "- Sistem Flashcards dan Quiz",
          "- Live Chat dan Forum diskusi",
          "- Fitur pengingat belajar",
          "- Dukungan multi-theme",
          "- Sinkronisasi progress ke cloud"
        ]
      }
    ]
  };

  const getSubjectProgress = (subjectId) => {
    const content = DB.content[subjectId];
    const subjectProgress = progress[subjectId] || {};

    // Materi Inti only
    let total = content.materi?.length || 0;
    let completed = subjectProgress.materi?.length || 0;

    // Quiz modules (count unique categories)
    if (content.quiz?.length > 0) {
      const categories = [...new Set(content.quiz.map(q => q.category || 'General').filter(Boolean))];
      total += categories.length;
      const quizScores = subjectProgress.quizScores || {};
      completed += Object.keys(quizScores).length;
    }

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };


  return (
    <div className="animate-fade">

      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={smooth} className="glass-strong p-6 sm:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <CircularProgress value={overallProgress} size={120} stroke={10} />
          <div className="text-center md:text-left flex-1">
            <p className="text-[var(--text-secondary)] mb-1">{greeting},</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2 flex items-center gap-2 justify-center md:justify-start flex-wrap">
              {name}!
              {session?.isAdmin && <span className="text-[10px] px-1.5 py-0.5 bg-red-500/15 text-red-500 rounded font-semibold">Admin</span>}
              {session?.isTester && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/15 text-amber-500 rounded font-semibold">Tester</span>}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base">Kelas {selectedClass} • Progress <span className="font-bold gradient-text">{Math.round(overallProgress)}%</span></p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="badge badge-accent"><BookOpen className="w-3 h-3" />{DB.subjects.length} Mata Kuliah</span>
              {onlineUsers.length > 0 && <span className="badge badge-success"><span className="online-dot mr-1" />{onlineUsers.length} Online</span>}
              <button onClick={() => setShowPatchNotes(true)} className="badge hover:opacity-80 transition-opacity cursor-pointer" style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4', fontWeight: 600 }}>
                <Sparkles className="w-3 h-3" />v{currentVersion}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Widget Row - Auto-resize: Sedang Belajar shrinks, Jadwal UAS expands */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Online Users - shrink to fit content */}
        <div className="glass-card p-4 md:w-auto md:min-w-[140px] md:max-w-[240px] shrink-0">
          {/* Online Widget Header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="online-dot" />
            <span className="text-sm font-medium text-[var(--text)]">Online</span>
            {/* Show count of visible users (admin sees all, non-admin sees only non-hidden) */}
            <span className="ml-auto text-xs px-1.5 py-0.5 surface-flat rounded-full text-[var(--text-muted)] font-medium">
              {session?.isAdmin ? onlineUsers.length : onlineUsers.filter(u => !u.hideStatus).length}
            </span>
          </div>
          {/* Show message if user is hiding their status */}
          {hideStatus && !session?.isAdmin ? (
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <span>🔒</span> Status kamu tersembunyi
            </p>
          ) : onlineUsers.length > 0 ? (() => {
            // Filter users: admin sees all, others see only non-hidden users
            const visibleOnlineUsers = session?.isAdmin
              ? onlineUsers
              : onlineUsers.filter(u => !u.hideStatus);

            // Group users by userName and collect device types + hideStatus
            const grouped = visibleOnlineUsers.reduce((acc, u) => {
              const name = u.userName || 'Unknown';
              if (!acc[name]) acc[name] = { userName: name, devices: [], hideStatus: u.hideStatus };
              acc[name].devices.push(u.deviceType || 'desktop');
              return acc;
            }, {});
            const uniqueUsers = Object.values(grouped);

            // Device type to emoji mapping
            const deviceEmoji = (type) => {
              if (type === 'mobile') return '📱';
              if (type === 'tablet') return '📲';
              return '💻';
            };

            // Get emoji string for devices
            const getDeviceEmojis = (devices) => {
              if (devices.length === 1) return deviceEmoji(devices[0]);
              // Count each device type
              const counts = devices.reduce((acc, d) => {
                acc[d] = (acc[d] || 0) + 1;
                return acc;
              }, {});
              // Build emoji string with (n) format
              let str = '';
              if (counts.desktop) str += counts.desktop > 1 ? `(${counts.desktop}) 💻` : '💻';
              if (counts.mobile) str += counts.mobile > 1 ? ` (${counts.mobile}) 📱` : ' 📱';
              if (counts.tablet) str += counts.tablet > 1 ? ` (${counts.tablet}) 📲` : ' 📲';
              return str.trim();
            };

            return uniqueUsers.length > 0 ? (
              <div className="flex flex-col gap-1">
                {uniqueUsers.slice(0, 4).map((u, i) => (
                  <motion.div key={u.userName} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-1.5 text-xs">
                    <div className="avatar avatar-sm text-[10px] w-5 h-5 shrink-0">{u.userName?.charAt(0) || '?'}</div>
                    <span className="text-[var(--text)] truncate">{u.userName}</span>
                    {/* Admin sees 🔒 for hidden users */}
                    {session?.isAdmin && u.hideStatus && <span className="text-[10px]" title="Status tersembunyi">🔒</span>}
                    <span className="text-[10px] ml-auto">{getDeviceEmojis(u.devices)}</span>
                  </motion.div>
                ))}
                {uniqueUsers.length > 4 && (
                  <span className="text-xs text-[var(--text-muted)]">+{uniqueUsers.length - 4} lainnya</span>
                )}
              </div>
            ) : (
              <p className="text-[var(--text-muted)] text-xs">-</p>
            );
          })() : (
            <p className="text-[var(--text-muted)] text-xs">-</p>
          )}
        </div>

        {/* Exam Schedule - grow to fill space */}
        <div className="glass-card p-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--text)]">Jadwal UAS</span>
            <div className="relative">
              <button
                onClick={() => setShowScheduleInfo(!showScheduleInfo)}
                onMouseEnter={() => setShowScheduleInfo(true)}
                onMouseLeave={() => setShowScheduleInfo(false)}
                className="p-1 -m-1 touch-manipulation"
                aria-label="Info jadwal"
              >
                <Info className="w-3.5 h-3.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors" />
              </button>
              <AnimatePresence>
                {showScheduleInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-[var(--surface-solid)] border border-[var(--border)] rounded-lg shadow-lg z-50 text-xs text-[var(--text-secondary)] min-w-[200px]"
                  >
                    ✅ Jadwal ini adalah jadwal <strong className="text-[var(--success)]">resmi</strong> dari aplikasi <strong>BINUSMAYA</strong>.
                    <br />Diperbarui: 31 Des 2025
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[var(--border)]"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="space-y-1">
            {Object.entries(classSchedule)
              .sort(([, a], [, b]) => new Date(a.date || a) - new Date(b.date || b))
              .map(([subject, info]) => {
                const d = new Date(info.date || info);
                const dueDate = info.due ? new Date(info.due) : null;
                const isOnline = info.type === 'online';
                return (
                  <div key={subject} className="flex items-center text-xs py-1 border-b border-[var(--border)] last:border-0">
                    <span className="text-[var(--text)] flex-1 mr-2 leading-tight">{subject}</span>
                    <span className="text-[var(--text-muted)] text-[10px] mr-2">
                      {isOnline ? 'Online' : 'Onsite'}
                    </span>
                    {dueDate ? (
                      <span className="text-[var(--text-secondary)] font-medium whitespace-nowrap">
                        {d.toLocaleDateString('id-ID', { day: 'numeric' })} - {dueDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    ) : (
                      <span className="text-[var(--text-secondary)] font-medium whitespace-nowrap">
                        {d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </span>
                    )}
                    <span className="text-[var(--text-muted)] ml-1.5 whitespace-nowrap">
                      {dueDate ? dueDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Exam Countdown - fixed width */}
        <div className="md:w-[200px] shrink-0">
          <ExamCountdown schedules={schedules} selectedClass={selectedClass} />
        </div>
      </div>

      {/* Subjects */}
      <h2 className="text-lg font-bold text-[var(--text)] mb-4">Mata Kuliah</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
        {DB.subjects.map((s, i) => {
          const Icon = iconMap[s.icon];
          const subjectProg = getSubjectProgress(s.id);
          return (
            <motion.button key={s.id} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.99 }} onClick={() => onSelect(s)} className="glass-card glass-card-interactive p-5 sm:p-6 text-left animate-slide-up">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg glow">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-sm font-bold gradient-text">{subjectProg}%</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text)] mb-1">{s.name}</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 sm:mb-4 line-clamp-2">{s.description}</p>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${subjectProg}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full gradient-accent rounded-full" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Patch Notes Modal */}
      <AnimatePresence>
        {showPatchNotes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPatchNotes(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong p-6 max-w-md w-full relative max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setShowPatchNotes(false)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text)]">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text)]">Patch Notes</h3>
                  <p className="text-xs text-[var(--text-muted)]">Versi {currentVersion}</p>
                </div>
              </div>

              {/* Current Update */}
              <div className="mb-4">
                <h4 className="text-sm font-bold text-[var(--accent)] mb-2">
                  🆕 v{patchNotes.current.version} - {patchNotes.current.date}
                </h4>
                <ul className="space-y-1">
                  {patchNotes.current.changes.map((c, i) => (
                    <li key={i} className="text-xs text-[var(--text-secondary)] pl-2">{c}</li>
                  ))}
                </ul>
              </div>

              {/* Past Updates - Collapsible per version */}
              {patchNotes.past.length > 0 && (
                <div className="border-t border-[var(--border)] pt-4">
                  <h4 className="text-sm font-medium text-[var(--text-muted)] mb-3">Riwayat Update</h4>
                  {patchNotes.past.map((p, idx) => {
                    const isExpanded = expandedVersions[p.version] || false;
                    return (
                      <div key={idx} className="mb-3">
                        <button
                          onClick={() => setExpandedVersions(prev => ({ ...prev, [p.version]: !prev[p.version] }))}
                          className="w-full flex items-center justify-between text-left p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
                        >
                          <p className="text-xs font-medium text-[var(--text)]">v{p.version} - {p.date}</p>
                          <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-0.5 mt-1 pl-2"
                            >
                              {p.changes.map((c, i) => (
                                <li key={i} className="text-xs text-[var(--text-muted)]">{c}</li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bug Report Note */}
              <div className="mt-4 p-3 surface-flat rounded-lg">
                <p className="text-xs text-[var(--text-secondary)]">
                  💡 Menemukan bug atau kendala? Chat admin di tombol bawah kanan layar Anda!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubjectView({ subject, activeTab, setActiveTab, progress, updateProgress, session, selectedClass, isPreviewMode, showCooldown, onlineUsers }) {
  const content = DB.content[subject.id];
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchTarget, setSearchTarget] = useState(null); // { type, key, index } for navigation

  // Helper function to get context around keyword
  const getKeywordContext = (text, query, contextLen = 60) => {
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const lowerText = cleanText.toLowerCase();
    const idx = lowerText.indexOf(query.toLowerCase());
    if (idx === -1) return cleanText.slice(0, 120) + '...';

    const start = Math.max(0, idx - contextLen);
    const end = Math.min(cleanText.length, idx + query.length + contextLen);
    let context = cleanText.slice(start, end);
    if (start > 0) context = '...' + context;
    if (end < cleanText.length) context = context + '...';
    return context;
  };

  // Search function
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results = [];

    // Search in Kisi-Kisi
    if (searchCategory === 'all' || searchCategory === 'kisi') {
      const kisiKisi = content.kisiKisi || [];
      if (Array.isArray(kisiKisi)) {
        kisiKisi.forEach((item, idx) => {
          if (typeof item === 'string') {
            if (item.toLowerCase().includes(q)) {
              results.push({ type: 'kisi', content: item, index: idx, title: 'Kisi-Kisi' });
            }
          } else if (item.topic && item.items) {
            if (item.topic.toLowerCase().includes(q)) {
              results.push({ type: 'kisi', content: item.topic, index: idx, title: item.topic });
            }
            item.items.forEach((subItem) => {
              if (subItem.toLowerCase().includes(q)) {
                results.push({ type: 'kisi', content: subItem, index: idx, title: item.topic });
              }
            });
          }
        });
      }
    }

    // Search in Flashcards
    if (searchCategory === 'all' || searchCategory === 'flashcard') {
      const flashcards = content.flashcards || [];
      flashcards.forEach((fc, idx) => {
        if (fc.term?.toLowerCase().includes(q)) {
          results.push({ type: 'flashcard', content: fc.term, index: idx, title: fc.term, definition: fc.definition });
        } else if (fc.definition?.toLowerCase().includes(q)) {
          results.push({ type: 'flashcard', content: getKeywordContext(fc.definition, searchQuery), index: idx, title: fc.term, definition: fc.definition });
        }
      });
    }

    // Search in Rangkuman
    if (searchCategory === 'all' || searchCategory === 'rangkuman') {
      const rangkumanKey = subject.id === 'mis' ? 'mis' :
        subject.id === 'intro' ? 'intro' :
          subject.id === 'marketing' ? 'marketing' :
            subject.id === 'hr' ? 'hr' : null;
      if (rangkumanKey && RANGKUMAN_CONTENT[rangkumanKey]) {
        Object.entries(RANGKUMAN_CONTENT[rangkumanKey]).forEach(([key, val]) => {
          if (typeof val === 'string' && val.toLowerCase().includes(q)) {
            // Get context around keyword
            const context = getKeywordContext(val, searchQuery);
            // Get module title from key
            const moduleTitle = key.replace('modul', 'Modul ').replace('tambahan', 'Addendum');
            results.push({ type: 'rangkuman', content: context, key, title: moduleTitle });
          }
        });
      }
    }

    return results.slice(0, 20); // Limit to 20 results
  }, [searchQuery, searchCategory, content, subject.id]);

  const tabs = [
    { name: 'Materi', icon: FileText },
    { name: 'Rangkuman', icon: StickyNote },
    { name: 'Kisi-Kisi', icon: List },
    { name: 'Flashcards & Quiz', icon: Layers },
    { name: 'Catatan', icon: StickyNote },
    { name: 'Forum', icon: MessageSquare },
  ];



  return (
    <div className="animate-fade">
      <div className="mb-4 sm:mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-1">{subject.name}</h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base">{subject.description}</p>
        </div>
        <button
          onClick={() => setShowSearch(true)}
          className="p-2 rounded-xl hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors shrink-0"
          title="Cari di mata kuliah ini"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/60 flex items-start justify-center pt-20 p-4"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="glass-strong p-4 w-full max-w-lg max-h-[70vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-[var(--text-muted)]" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari di mata kuliah ini..."
                  className="flex-1 bg-transparent text-[var(--text)] outline-none"
                />
                <button onClick={() => setShowSearch(false)} className="p-1 hover:bg-[var(--surface-hover)] rounded-lg">
                  <X className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Category tabs */}
              <div className="flex gap-1 mb-3 overflow-x-auto">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'rangkuman', label: 'Rangkuman' },
                  { id: 'kisi', label: 'Kisi-Kisi' },
                  { id: 'flashcard', label: 'Flashcard' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSearchCategory(cat.id)}
                    className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${searchCategory === cat.id
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--surface-hover)] text-[var(--text-muted)]'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {searchQuery.trim() && searchResults.length === 0 && (
                  <p className="text-center text-[var(--text-muted)] py-8">Tidak ditemukan</p>
                )}
                {searchResults.map((r, i) => {
                  // Highlight keyword in content
                  const highlightKeyword = (text) => {
                    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                    const parts = text.split(regex);
                    return parts.map((part, idx) =>
                      part.toLowerCase() === searchQuery.toLowerCase()
                        ? <mark key={idx} className="bg-yellow-500/50 text-[var(--text)] px-0.5 rounded">{part}</mark>
                        : part
                    );
                  };

                  return (
                    <div
                      key={i}
                      className="p-3 bg-[var(--surface)] rounded-xl hover:bg-[var(--surface-hover)] cursor-pointer transition-colors"
                      onClick={() => {
                        // Navigate to the appropriate tab with target
                        setSearchTarget({ type: r.type, key: r.key, index: r.index, query: searchQuery });
                        if (r.type === 'kisi') setActiveTab(2);
                        else if (r.type === 'flashcard') setActiveTab(3);
                        else if (r.type === 'rangkuman') setActiveTab(1);
                        setShowSearch(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${r.type === 'kisi' ? 'bg-blue-500/20 text-blue-500' :
                          r.type === 'flashcard' ? 'bg-green-500/20 text-green-500' :
                            'bg-purple-500/20 text-purple-500'
                          }`}>
                          {r.type === 'kisi' ? 'Kisi-Kisi' : r.type === 'flashcard' ? 'Flashcard' : 'Rangkuman'}
                        </span>
                        {r.title && <span className="text-xs text-[var(--text-muted)] font-medium">{r.title}</span>}
                      </div>
                      <p className="text-sm text-[var(--text)] line-clamp-2">{highlightKeyword(r.content)}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="tabs mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((t, i) => (
          <button key={t.name} onClick={() => setActiveTab(i)} className={`tab text-xs sm:text-sm ${activeTab === i ? 'active' : ''}`}>
            <t.icon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" /><span className="hidden sm:inline">{t.name}</span><span className="sm:hidden">{t.name.slice(0, 4)}</span>
          </button>
        ))}
      </div>

      <div className="animate-fade" style={{ position: 'relative', minHeight: '300px' }}>
        {activeTab === 0 && <Materi materi={content.materi} subjectId={subject.id} progress={progress} updateProgress={updateProgress} isPreviewMode={isPreviewMode} />}
        {activeTab === 1 && <Rangkuman subjectId={subject.id} searchTarget={searchTarget} onClearSearch={() => setSearchTarget(null)} isPreviewMode={isPreviewMode} />}
        {activeTab === 2 && <KisiKisi kisiKisi={content.kisiKisi} kisiKisiNote={content.kisiKisiNote} kisiKisiTambahan={content.kisiKisiTambahan} kisiKisiTambahanNote={content.kisiKisiTambahanNote} subjectId={subject.id} isPreviewMode={isPreviewMode} />}
        {activeTab === 3 && <FlashcardsQuiz flashcards={content.flashcards} quiz={content.quiz} subjectId={subject.id} isPreviewMode={isPreviewMode} progress={progress} updateProgress={updateProgress} searchTarget={searchTarget} onClearSearch={() => setSearchTarget(null)} session={session} />}
        {activeTab === 4 && <PersonalNotes subjectId={subject.id} subjectName={subject.name} isPreviewMode={isPreviewMode} licenseKey={session?.licenseKey} />}
        {activeTab === 5 && <Forum subjectId={subject.id} session={session} selectedClass={selectedClass} isPreviewMode={isPreviewMode} showCooldown={showCooldown} onlineUsers={onlineUsers} />}

        {/* Content Lock Overlay for Preview Mode */}
        {isPreviewMode && <ContentLockOverlay />}
      </div>
    </div>
  );
}

function Rangkuman({ subjectId, searchTarget, onClearSearch, isPreviewMode }) {
  const content = DB.content[subjectId];
  const rangkuman = content?.rangkuman;
  const [viewFile, setViewFile] = useState(null);
  const [expandedSections, setExpandedSections] = useState({ modulInti: true, addendum: true, mentorPPT: true });
  const [viewerTheme, setViewerTheme] = useState('dark'); // 'dark', 'sepia', 'light'
  const viewerDarkMode = viewerTheme === 'dark'; // For backward compatibility
  const cycleViewerTheme = () => setViewerTheme(prev => prev === 'dark' ? 'sepia' : prev === 'sepia' ? 'light' : 'dark');
  const [highlightQuery, setHighlightQuery] = useState(''); // For search keyword highlighting

  // Handle search target navigation
  useEffect(() => {
    if (searchTarget && searchTarget.type === 'rangkuman' && searchTarget.key) {
      // Find which modul/section matches the key
      const key = searchTarget.key;
      // Store the search query for highlighting
      if (searchTarget.query) {
        setHighlightQuery(searchTarget.query);
      }
      if (key.startsWith('modul') && rangkuman?.modulInti) {
        const modulNum = parseInt(key.replace('modul', '')) - 1;
        if (modulNum >= 0 && rangkuman.modulInti.length > modulNum) {
          const modulFile = rangkuman.modulInti[modulNum];
          setExpandedSections(prev => ({ ...prev, modulInti: true }));
          // Auto-open the content viewer
          if (modulFile) {
            setViewFile(modulFile);
          }
        }
      } else if ((key.includes('tambahan') || key.includes('addendum')) && rangkuman?.addendum) {
        setExpandedSections(prev => ({ ...prev, addendum: true }));
        // Auto-open addendum if available
        if (rangkuman.addendum.length > 0) {
          setViewFile(rangkuman.addendum[0]);
        }
      }
      // Clear search target after navigation
      if (onClearSearch) onClearSearch();
    }
  }, [searchTarget, rangkuman, onClearSearch]);

  // Generate embed URL based on file type
  const getEmbedUrl = (file) => {
    if (!file.driveId || file.driveId === 'PASTE_FILE_ID_HERE') return null;
    // Google Docs
    if (file.type === 'gdocs') return `https://docs.google.com/document/d/${file.driveId}/preview`;
    // Google Slides
    if (file.type === 'gslides') return `https://docs.google.com/presentation/d/${file.driveId}/embed?start=false&loop=false&delayms=3000`;
    // Default to Drive preview for PDF and other files
    return `https://drive.google.com/file/d/${file.driveId}/preview`;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // If rangkuman is a string (old format), show as text
  if (typeof rangkuman === 'string') {
    return (
      <div className="glass-card p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <StickyNote className="w-5 h-5 text-[var(--accent)]" />
          <h3 className="font-bold text-[var(--text)]">Rangkuman</h3>
        </div>
        <p className="text-[var(--text)] whitespace-pre-wrap leading-relaxed">{rangkuman}</p>
      </div>
    );
  }

  // ESC to close content viewer
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && viewFile) {
        e.stopImmediatePropagation();
        setViewFile(null);
        setHighlightQuery('');
      }
    };
    window.addEventListener('keydown', handleEsc, true);
    return () => window.removeEventListener('keydown', handleEsc, true);
  }, [viewFile]);

  const closeViewer = () => setViewFile(null);

  const renderFileList = (files) => {
    if (!files || files.length === 0) return null;

    return (
      <div className="space-y-2">
        {files.map((file, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setViewFile(file)}
            className="glass-card p-3 flex items-center gap-3 cursor-pointer hover:border-[var(--accent)]"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${file.type?.includes('pdf') ? 'bg-red-500/15 text-red-500' :
              file.type?.includes('gslides') || file.type?.includes('pptx') ? 'bg-orange-500/15 text-orange-500' :
                'bg-blue-500/15 text-blue-500'
              }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[var(--text)] text-sm">{file.title}</p>
              <p className="text-xs text-[var(--text-muted)]">Tap untuk melihat</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* File Viewer Modal - Direct render to avoid flickering */}
      {viewFile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{viewFile.title}</h3>
              {/* Highlight indicator */}
              {highlightQuery && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(250,204,21,0.3)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#fcd34d'
                }}>
                  <span>"{highlightQuery}"</span>
                  <button
                    onClick={() => setHighlightQuery('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fcd34d',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {/* Dark Mode Toggle */}
              {viewFile.type === 'native' && (
                <button
                  type="button"
                  onClick={cycleViewerTheme}
                  style={{
                    color: 'white',
                    padding: '8px 12px',
                    background: viewerTheme === 'dark' ? 'rgba(59,130,246,0.5)' : viewerTheme === 'sepia' ? 'rgba(180,140,100,0.5)' : 'rgba(255,255,255,0.25)',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px'
                  }}
                >
                  {viewerTheme === 'dark' ? <Moon className="w-4 h-4" /> : viewerTheme === 'sepia' ? <Coffee className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  {viewerTheme === 'dark' ? 'Dark' : viewerTheme === 'sepia' ? 'Sepia' : 'Light'}
                </button>
              )}
              {/* Close Button */}
              <button
                type="button"
                onClick={closeViewer}
                style={{
                  color: 'white',
                  padding: '10px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Container */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {/* Native Content Viewer - Copy Protected */}
            {viewFile.type === 'native' && viewFile.contentKey ? (
              <div
                className="copy-protected"
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  height: '100%',
                  overflowY: 'auto',
                  backgroundColor: viewerTheme === 'dark' ? '#1a1a2e' : viewerTheme === 'sepia' ? '#cdc5b9' : '#f5f3ef',
                  borderRadius: '12px',
                  padding: '32px 40px',
                  color: viewerTheme === 'dark' ? '#e5e7eb' : viewerTheme === 'sepia' ? '#1f2937' : '#374151',
                  transition: 'background-color 0.3s, color 0.3s',
                  textShadow: viewerTheme === 'dark' ? 'none' : '0 0.5px 1px rgba(0,0,0,0.12)',
                  boxShadow: viewerTheme === 'dark'
                    ? '0 4px 20px rgba(0,0,0,0.5)'
                    : '0 4px 20px rgba(0,0,0,0.12)'
                }}
                onContextMenu={e => e.preventDefault()}
                onCopy={e => e.preventDefault()}
                onCut={e => e.preventDefault()}
              >
                {(() => {
                  const moduleContent = RANGKUMAN_CONTENT[subjectId]?.[viewFile.contentKey];
                  if (!moduleContent) return <p>Konten tidak ditemukan.</p>;

                  // If content is a string with HTML-like tags, parse and render
                  if (typeof moduleContent === 'string') {
                    // Helper function to highlight search keyword
                    const highlightKeyword = (text) => {
                      if (!highlightQuery || typeof text !== 'string') return text;
                      const regex = new RegExp(`(${highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                      const parts = text.split(regex);
                      if (parts.length === 1) return text;
                      return parts.map((part, idx) =>
                        part.toLowerCase() === highlightQuery.toLowerCase()
                          ? <mark key={idx} id={idx === 1 ? 'search-highlight-first' : undefined} style={{ backgroundColor: '#fcd34d', color: '#1a1a2e', padding: '0 2px', borderRadius: '2px' }}>{part}</mark>
                          : part
                      );
                    };

                    // Helper function to parse inline formatting (bold, italic)
                    const parseInline = (text) => {
                      if (!text || typeof text !== 'string') return text;

                      const parts = [];
                      let remaining = text;
                      let key = 0;

                      // Process character by character with tag detection
                      while (remaining.length > 0) {
                        // Check for <b> tag
                        const boldStart = remaining.indexOf('<b>');
                        const italicStart = remaining.indexOf('<i>');

                        // Find which tag comes first
                        let nextTagStart = -1;
                        let tagType = null;

                        if (boldStart !== -1 && (italicStart === -1 || boldStart < italicStart)) {
                          nextTagStart = boldStart;
                          tagType = 'b';
                        } else if (italicStart !== -1) {
                          nextTagStart = italicStart;
                          tagType = 'i';
                        }

                        if (nextTagStart === -1) {
                          // No more tags, add remaining text
                          if (remaining) parts.push(<span key={key++}>{highlightKeyword(remaining)}</span>);
                          break;
                        }

                        // Add text before the tag
                        if (nextTagStart > 0) {
                          parts.push(<span key={key++}>{highlightKeyword(remaining.slice(0, nextTagStart))}</span>);
                        }

                        // Find closing tag
                        const closeTag = `</${tagType}>`;
                        const closeTagPos = remaining.indexOf(closeTag, nextTagStart + 3);

                        if (closeTagPos === -1) {
                          // No closing tag, treat as plain text
                          parts.push(<span key={key++}>{highlightKeyword(remaining.slice(nextTagStart))}</span>);
                          break;
                        }

                        // Extract content between tags
                        const innerContent = remaining.slice(nextTagStart + 3, closeTagPos);

                        // Recursively parse inner content for nested tags
                        const parsedInner = parseInline(innerContent);

                        if (tagType === 'b') {
                          parts.push(<strong key={key++} style={{ fontWeight: '600' }}>{parsedInner}</strong>);
                        } else {
                          parts.push(<em key={key++} style={{ fontStyle: 'italic' }}>{parsedInner}</em>);
                        }

                        remaining = remaining.slice(closeTagPos + closeTag.length);
                      }

                      if (parts.length === 0) return text;
                      if (parts.length === 1) return parts[0];
                      return parts;
                    };

                    // Auto-scroll to first highlight after render
                    setTimeout(() => {
                      const firstHighlight = document.getElementById('search-highlight-first');
                      if (firstHighlight) {
                        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);

                    // Split by lines and parse tags
                    const lines = moduleContent.split('\n');
                    return (
                      <div style={{ lineHeight: '1.7' }}>
                        {lines.map((line, idx) => {
                          const trimmed = line.trim();
                          if (!trimmed) {
                            return <div key={idx} style={{ height: '12px' }} />;
                          }

                          // <h1>...</h1> - Module title
                          if (trimmed.startsWith('<h1>')) {
                            const content = trimmed.replace(/<\/?h1>/g, '');
                            return (
                              <h1 key={idx} style={{
                                fontSize: '22px',
                                fontWeight: 'bold',
                                color: viewerTheme === 'dark' ? '#60a5fa' : '#1d4ed8',
                                marginTop: idx > 0 ? '24px' : '0',
                                marginBottom: '6px'
                              }}>
                                {parseInline(content)}
                              </h1>
                            );
                          }

                          // <subtitle>...</subtitle> - Subtitle
                          if (trimmed.startsWith('<subtitle>')) {
                            // Strip any remaining HTML tags like <i></i>
                            const content = trimmed.replace(/<\/?subtitle>/g, '').replace(/<\/?[^>]+(>|$)/g, '');
                            return (
                              <p key={idx} style={{
                                fontSize: '14px',
                                color: viewerTheme === 'dark' ? '#9ca3af' : '#64748b',
                                marginBottom: '6px'
                              }}>
                                {content}
                              </p>
                            );
                          }

                          // <h2>...</h2> - Session header
                          if (trimmed.startsWith('<h2>')) {
                            const content = trimmed.replace(/<\/?h2>/g, '');
                            return (
                              <h2 key={idx} style={{
                                fontSize: '17px',
                                fontWeight: 'bold',
                                color: viewerTheme === 'dark' ? '#fbbf24' : '#b45309',
                                marginTop: '20px',
                                marginBottom: '10px',
                                paddingBottom: '6px',
                                borderBottom: `1px solid ${viewerTheme === 'dark' ? 'rgba(251,191,36,0.3)' : 'rgba(180,83,9,0.25)'}`
                              }}>
                                {parseInline(content)}
                              </h2>
                            );
                          }

                          // <h3>...</h3> - Numbered heading
                          if (trimmed.startsWith('<h3>')) {
                            const content = trimmed.replace(/<\/?h3>/g, '');
                            return (
                              <h3 key={idx} style={{
                                fontSize: '15px',
                                fontWeight: '600',
                                color: viewerTheme === 'dark' ? '#34d399' : '#047857',
                                marginTop: '16px',
                                marginBottom: '6px'
                              }}>
                                {parseInline(content)}
                              </h3>
                            );
                          }

                          // <warning>...</warning> - UAS warning
                          if (trimmed.startsWith('<warning>')) {
                            const content = trimmed.replace(/<\/?warning>/g, '');
                            return (
                              <div key={idx} style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: viewerTheme === 'dark' ? '#f87171' : '#dc2626',
                                backgroundColor: viewerTheme === 'dark' ? 'rgba(248,113,113,0.1)' : 'rgba(220,38,38,0.08)',
                                padding: '10px 14px',
                                borderRadius: '6px',
                                marginTop: '10px',
                                marginBottom: '10px',
                                borderLeft: `3px solid ${viewerTheme === 'dark' ? '#f87171' : '#dc2626'}`
                              }}>
                                {parseInline(content)}
                              </div>
                            );
                          }

                          // <img> - Image tag
                          if (trimmed.startsWith('<img')) {
                            const srcMatch = trimmed.match(/src="([^"]+)"/);
                            const altMatch = trimmed.match(/alt="([^"]+)"/);
                            const src = srcMatch ? srcMatch[1] : '';
                            const alt = altMatch ? altMatch[1] : 'Image';
                            return (
                              <div key={idx} style={{
                                marginTop: '12px',
                                marginBottom: '12px',
                                textAlign: 'center'
                              }}>
                                <img
                                  src={src}
                                  alt={alt}
                                  style={{
                                    maxWidth: '100%',
                                    borderRadius: '8px',
                                    boxShadow: viewerTheme === 'dark'
                                      ? '0 4px 12px rgba(0,0,0,0.4)'
                                      : '0 4px 12px rgba(0,0,0,0.15)'
                                  }}
                                />
                                <p style={{
                                  fontSize: '12px',
                                  color: viewerTheme === 'dark' ? '#9ca3af' : '#6b7280',
                                  marginTop: '8px',
                                  fontStyle: 'italic'
                                }}>{alt}</p>
                              </div>
                            );
                          }

                          // <bullet>...</bullet> - Bullet point
                          if (trimmed.startsWith('<bullet>')) {
                            const content = trimmed.replace(/<\/?bullet>/g, '');
                            return (
                              <div key={idx} style={{
                                display: 'flex',
                                marginLeft: '16px',
                                marginBottom: '8px'
                              }}>
                                <span style={{
                                  marginRight: '12px',
                                  color: viewerTheme === 'dark' ? '#60a5fa' : '#2563eb',
                                  fontWeight: 'bold'
                                }}>•</span>
                                <span style={{
                                  fontSize: '14px',
                                  color: viewerTheme === 'dark' ? '#d1d5db' : '#475569',
                                  flex: 1
                                }}>
                                  {parseInline(content)}
                                </span>
                              </div>
                            );
                          }

                          // Regular paragraph
                          return (
                            <p key={idx} style={{
                              fontSize: '14px',
                              marginBottom: '10px',
                              color: viewerTheme === 'dark' ? '#d1d5db' : '#475569'
                            }}>
                              {parseInline(trimmed)}
                            </p>
                          );
                        })}
                      </div>
                    );
                  }

                  // Legacy structured format support (if any old modules still use it)
                  return (
                    <div className="space-y-6">
                      {/* Title */}
                      <div style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '12px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
                          📘 {moduleContent.title}
                        </h2>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>{moduleContent.subtitle}</p>
                      </div>

                      {/* Intro */}
                      {moduleContent.intro && (
                        <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7', fontStyle: 'italic', backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px' }}>
                          {moduleContent.intro}
                        </p>
                      )}

                      {/* Sections */}
                      {moduleContent.sections?.map((section, sIdx) => (
                        <div key={sIdx} style={{ marginTop: '24px' }}>
                          {/* Section Title */}
                          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px', backgroundColor: '#e5e7eb', padding: '10px 14px', borderRadius: '6px' }}>
                            {section.title}
                          </h3>

                          {/* Warning if exists */}
                          {section.warning && (
                            <div style={{ backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '10px 14px', marginBottom: '16px', borderRadius: '4px' }}>
                              <span style={{ fontWeight: 'bold', color: '#92400e' }}>⚠️ {section.warning}</span>
                            </div>
                          )}

                          {/* Content Items */}
                          {section.content?.map((item, iIdx) => (
                            <div key={iIdx} style={{ marginBottom: '20px' }}>
                              {/* Heading */}
                              <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#2563eb', marginBottom: '8px' }}>
                                {item.heading}
                              </h4>

                              {/* Main Text */}
                              {item.text && (
                                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.7', marginBottom: '10px' }}>
                                  {item.text}
                                </p>
                              )}

                              {/* Note */}
                              {item.note && (
                                <p style={{ fontSize: '13px', color: '#059669', fontStyle: 'italic', backgroundColor: '#ecfdf5', padding: '8px 12px', borderRadius: '4px', marginBottom: '10px' }}>
                                  💡 {item.note}
                                </p>
                              )}

                              {/* Image if exists */}
                              {item.image && (
                                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                                  <img
                                    src={item.image}
                                    alt="Diagram"
                                    style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                    draggable={false}
                                  />
                                </div>
                              )}

                              {/* SubSections */}
                              {item.subSections?.map((sub, subIdx) => (
                                <div key={subIdx} style={{ marginLeft: '16px', marginBottom: '12px' }}>
                                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563', marginBottom: '6px' }}>
                                    📌 {sub.title}
                                  </p>
                                  <ul style={{ marginLeft: '20px' }}>
                                    {sub.items?.map((li, liIdx) => (
                                      <li key={liIdx} style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '4px', listStyleType: 'disc' }}>
                                        {li}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            ) : viewFile.driveId && viewFile.driveId !== 'PASTE_FILE_ID_HERE' ? (
              /* Iframe Viewer for Google Docs */
              <>
                <iframe
                  key={viewFile.driveId}
                  src={getEmbedUrl(viewFile)}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title={viewFile.title}
                />
                {/* Copy Protection Overlay - Only block on slides/docs, not on PDFs (need scroll) */}
                {viewFile.type !== 'pdf' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      right: '16px',
                      bottom: '16px',
                      borderRadius: '8px',
                      background: 'transparent',
                      zIndex: 10,
                      cursor: 'default'
                    }}
                    onContextMenu={e => e.preventDefault()}
                    onCopy={e => e.preventDefault()}
                    onCut={e => e.preventDefault()}
                    onSelectStart={e => e.preventDefault()}
                    onDragStart={e => e.preventDefault()}
                  />
                )}
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white' }}>
                <p>File belum tersedia.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className="space-y-4 copy-protected"
        onContextMenu={e => e.preventDefault()}
        onCopy={e => e.preventDefault()}
        onCut={e => e.preventDefault()}
      >
        {/* Modul Inti */}
        {rangkuman?.modulInti?.length > 0 && (
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection('modulInti')}
              className="w-full p-4 flex items-center justify-between hover:bg-[var(--surface-hover)]"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                <span className="font-bold text-[var(--text)]">Modul Inti</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">{rangkuman.modulInti.length}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${expandedSections.modulInti ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.modulInti && (
              <div className="px-4 pb-4">
                {renderFileList(rangkuman.modulInti)}
              </div>
            )}
          </div>
        )}

        {/* Addendum */}
        {rangkuman?.addendum?.length > 0 && (
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection('addendum')}
              className="w-full p-4 flex items-center justify-between hover:bg-[var(--surface-hover)]"
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-green-500" />
                <span className="font-bold text-[var(--text)]">Addendum / Tambahan</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-500">{rangkuman.addendum.length}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${expandedSections.addendum ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.addendum && (
              <div className="px-4 pb-4">
                {renderFileList(rangkuman.addendum)}
              </div>
            )}
          </div>
        )}

        {/* Mentor PPT */}
        {rangkuman?.mentorPPT?.length > 0 && (
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection('mentorPPT')}
              className="w-full p-4 flex items-center justify-between hover:bg-[var(--surface-hover)]"
            >
              <div className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-purple-500" />
                <span className="font-bold text-[var(--text)]">Rangkuman Mentor</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-500">{rangkuman.mentorPPT.length}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${expandedSections.mentorPPT ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.mentorPPT && (
              <div className="px-4 pb-4">
                {renderFileList(rangkuman.mentorPPT)}
                <p className="text-xs text-center text-[var(--text-muted)] mt-3 italic">
                  ✨ big thanks to kak zarnis ! ✨
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mentor PPT Note - when no mentor content but has note */}
        {rangkuman?.mentorPPTNote && (!rangkuman?.mentorPPT || rangkuman.mentorPPT.length === 0) && (
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Presentation className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-[var(--text)]">Rangkuman Mentor</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200">{rangkuman.mentorPPTNote}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {(!rangkuman || ((!rangkuman.modulInti || rangkuman.modulInti.length === 0) && (!rangkuman.addendum || rangkuman.addendum.length === 0) && (!rangkuman.mentorPPT || rangkuman.mentorPPT.length === 0))) && (
          <div className="glass-card p-8 text-center">
            <StickyNote className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-50" />
            <p className="text-[var(--text-muted)]">Rangkuman akan segera tersedia.</p>
          </div>
        )}
      </div>
    </>
  );
}

function Materi({ materi, subjectId, progress, updateProgress, isPreviewMode }) {
  const completed = progress[subjectId]?.materi || [];
  const mark = (idx) => updateProgress(subjectId, 'materi', idx);
  const [viewFile, setViewFile] = useState(null);

  const getTypeLabel = (type) => {
    if (type?.includes('pptx') || type?.includes('gslides')) return 'PPT';
    if (type?.includes('pdf')) return 'PDF';
    if (type?.includes('gdoc')) return 'DOC';
    return type?.toUpperCase() || 'FILE';
  };

  // ESC to close viewer
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && viewFile) {
        e.stopImmediatePropagation();
        setViewFile(null);
      }
    };
    window.addEventListener('keydown', handleEsc, true);
    return () => window.removeEventListener('keydown', handleEsc, true);
  }, [viewFile]);

  const closeViewer = () => setViewFile(null);

  return (
    <>
      {/* File Viewer Modal - Rendered directly, not as component */}
      {viewFile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{viewFile.title}</h3>
            <button
              type="button"
              onClick={closeViewer}
              style={{
                color: 'white',
                padding: '10px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Iframe Container */}
          <div style={{ flex: 1, padding: '16px', overflow: 'hidden' }}>
            {viewFile.driveId && viewFile.driveId !== 'PASTE_FILE_ID_HERE' ? (
              <iframe
                key={viewFile.driveId}
                src={`https://docs.google.com/presentation/d/${viewFile.driveId}/embed?start=false&loop=false&delayms=3000`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: 'white'
                }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title={viewFile.title}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white' }}>
                <p>File belum tersedia.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Materi List */}
      <div className="space-y-3 stagger">
        {materi.map((m, idx) => {
          const done = completed.includes(idx);
          const typeLabel = getTypeLabel(m.type);
          const hasFile = m.driveId && m.driveId !== 'PASTE_FILE_ID_HERE';

          return (
            <motion.div key={idx} className="glass-card p-4 flex items-center justify-between animate-slide-up">
              <div
                className={`flex items-center gap-4 flex-1 ${hasFile ? 'cursor-pointer' : ''}`}
                onClick={() => hasFile && setViewFile(m)}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${typeLabel === 'PDF' ? 'bg-red-500/15 text-red-500' :
                  typeLabel === 'PPT' ? 'bg-orange-500/15 text-orange-500' :
                    'bg-blue-500/15 text-blue-500'
                  }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[var(--text)]">{m.title}</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {typeLabel} {hasFile ? '• Tap untuk buka' : '• Belum tersedia'}
                  </p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => mark(idx)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${done ? 'bg-[var(--success)]/15 text-[var(--success)]' : 'btn-secondary'}`}>
                {done ? <><Check className="w-4 h-4 inline mr-1" />Selesai</> : 'Selesai'}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

function KisiKisi({ kisiKisi, kisiKisiNote, kisiKisiTambahan, kisiKisiTambahanNote, subjectId, isPreviewMode }) {
  // Check if kisiKisi is the old format (array of strings) or new format (array of objects with topic/items)
  const isNewFormat = kisiKisi?.length > 0 && typeof kisiKisi[0] === 'object' && kisiKisi[0].topic;

  return (
    <div className="space-y-4">
      {/* Kisi-Kisi Content */}
      <div className="glass-card p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-[var(--accent)]" />
          <h3 className="font-bold text-[var(--text)]">Kisi-Kisi Ujian {subjectId === 'marketing' && <span className="text-xs font-normal text-[var(--text-muted)] ml-1">(B28)</span>}</h3>
        </div>

        {isNewFormat ? (
          // New format with topics and items
          <div className="space-y-4">
            {kisiKisi.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-semibold text-[var(--text)] text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  {section.topic}
                </h4>
                <ul className="ml-8 space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-[var(--text-secondary)] text-sm flex items-start gap-2">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : kisiKisi?.length > 0 ? (
          // Old format - simple list of strings
          <ul className="space-y-2">
            {kisiKisi?.map((k, i) => (
              <li key={i} className="text-[var(--text)] text-sm flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">•</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        ) : (
          // Empty state - no kisi-kisi available
          <div className="text-center py-6">
            <AlertTriangle className="w-12 h-12 text-[var(--warning)] mx-auto mb-3 opacity-60" />
            <p className="text-[var(--text-muted)] text-sm">Kisi-kisi belum tersedia untuk mata kuliah ini.</p>
          </div>
        )}
      </div>

      {/* Note - context-aware label */}
      {kisiKisiNote && (
        <div className="glass-card p-4 border-l-4 border-[var(--warning)]">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-[var(--warning)]" />
            <span className="font-bold text-[var(--text)] text-sm">{kisiKisi?.length > 0 ? 'Catatan Penting' : 'Informasi'}</span>
          </div>
          <p className="text-[var(--text)] text-sm">{kisiKisiNote}</p>
        </div>
      )}

      {/* Kisi-Kisi Tambahan - Separate section */}
      {kisiKisiTambahan && kisiKisiTambahan.length > 0 && (
        <div className="glass-card p-4 sm:p-6 border-l-4 border-[var(--info)]">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-5 h-5 text-[var(--info)]" />
            <h3 className="font-bold text-[var(--text)]">Kisi-Kisi Tambahan</h3>
            {kisiKisiTambahanNote && <span className="text-xs text-[var(--text-secondary)] italic">{kisiKisiTambahanNote}</span>}
          </div>
          <div className="space-y-4">
            {kisiKisiTambahan.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-semibold text-[var(--text)] text-sm">
                  {section.topic}
                </h4>
                {section.subtitle && (
                  <p className="text-xs text-[var(--accent)] italic ml-2">{section.subtitle}</p>
                )}
                <ul className="ml-4 space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-[var(--text-secondary)] text-sm flex items-start gap-2">
                      <span className="text-[var(--info)] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FlashcardsQuiz({ flashcards, quiz, subjectId, isPreviewMode, progress, updateProgress, searchTarget, onClearSearch, session }) {
  const [mode, setMode] = useState('flashcards'); // 'flashcards', 'quiz-select', or 'quiz'
  const [flipped, setFlipped] = useState({});
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(20);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [selectedModule, setSelectedModule] = useState(null);
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState(null);

  // Get saved progress
  const subjectProgress = progress?.[subjectId] || {};
  const quizScores = subjectProgress.quizScores || {};

  // Get unique quiz categories/modules
  const quizModules = useMemo(() => {
    if (!quiz?.length) return [];
    const categories = [...new Set(quiz.map(q => q.category || 'General').filter(Boolean))];
    return categories.map(cat => ({
      name: cat,
      questions: quiz.filter(q => (q.category || 'General') === cat),
      lastScore: quizScores[cat] || null
    }));
  }, [quiz, quizScores]);

  // Get questions for selected module
  const moduleQuestions = useMemo(() => {
    if (!selectedModule) return [];
    if (selectedModule === 'all') return quiz || [];
    return quiz?.filter(q => (q.category || 'General') === selectedModule) || [];
  }, [quiz, selectedModule]);

  // Fisher-Yates shuffle
  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledFlashcards = useMemo(() => shuffleArray(flashcards || []), [flashcards, shuffleKey]);
  const shuffledModuleQuiz = useMemo(() => shuffleArray(moduleQuestions), [moduleQuestions, shuffleKey]);

  const toggle = (id) => setFlipped(prev => ({ ...prev, [id]: !prev[id] }));

  // Navigate to searched flashcard
  useEffect(() => {
    if (searchTarget && searchTarget.type === 'flashcard' && typeof searchTarget.index === 'number' && flashcards?.length > 0) {
      setMode('flashcards');
      // Get the original flashcard by index
      const targetCard = flashcards[searchTarget.index];
      if (targetCard && shuffledFlashcards?.length > 0) {
        // Find this card in the shuffled array
        const shuffledIndex = shuffledFlashcards.findIndex(f =>
          f.id === targetCard.id || (f.term === targetCard.term && f.definition === targetCard.definition)
        );
        if (shuffledIndex >= 0) {
          // Calculate which page this card is on (default 8 cards per page)
          const cPerPage = typeof cardsPerPage === 'number' && cardsPerPage > 0 ? cardsPerPage : 8;
          const targetPage = Math.floor(shuffledIndex / cPerPage);
          setFlashPage(targetPage);
          // Highlight and flip the card
          const cardId = targetCard.id || searchTarget.index;
          setHighlightedCard(cardId);
          setFlipped(prev => ({ ...prev, [cardId]: true }));
        }
      }
      // Clear after a delay
      setTimeout(() => {
        setHighlightedCard(null);
        onClearSearch?.();
      }, 3000);
    }
  }, [searchTarget]);

  // Timer for quiz
  useEffect(() => {
    if (mode !== 'quiz' || done || sel !== null) return;
    const t = setInterval(() => setTime(v => { if (v <= 1) { handleAns(-1); return 20; } return v - 1; }), 1000);
    return () => clearInterval(t);
  }, [mode, cur, sel, done]);

  const handleAns = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (shuffledModuleQuiz && i === shuffledModuleQuiz[cur]?.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (cur < shuffledModuleQuiz.length - 1) {
      setCur(c => c + 1);
      setSel(null);
      setTime(20);
    } else {
      setDone(true);
      // Save score for this module
      if (selectedModule && updateProgress && !isPreviewMode) {
        const finalScore = score + (sel !== null && shuffledModuleQuiz[cur]?.answer === sel ? 1 : 0);
        const percentage = Math.round(finalScore / shuffledModuleQuiz.length * 100);
        updateProgress(subjectId, 'quizScores', { ...(subjectProgress.quizScores || {}), [selectedModule]: percentage });
        // Track quiz score for leaderboard
        if (session?.licenseKey) {
          updateQuizScore(session.licenseKey, finalScore);
        }
      }
    }
  };

  const resetQuiz = () => {
    setCur(0);
    setSel(null);
    setScore(0);
    setDone(false);
    setTime(20);
    setShuffleKey(k => k + 1);
  };

  const startModuleQuiz = (moduleName) => {
    setSelectedModule(moduleName);
    resetQuiz();
    setMode('quiz');
  };

  const backToModuleSelect = () => {
    setMode('quiz-select');
    setSelectedModule(null);
    resetQuiz();
  };

  // Mark flashcards as completed
  const markFlashcardsComplete = () => {
    if (updateProgress && !isPreviewMode) {
      updateProgress(subjectId, 'flashcardsCompleted', true);
    }
    setFlashcardsCompleted(true);
  };

  // Pagination for flashcards
  const [flashPage, setFlashPage] = useState(0);
  const getCardsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 8;
      if (window.innerWidth >= 640) return 8;
      return 4;
    }
    return 8;
  };
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalFlashPages = Math.ceil((shuffledFlashcards?.length || 0) / cardsPerPage);
  const currentFlashcards = shuffledFlashcards?.slice(flashPage * cardsPerPage, (flashPage + 1) * cardsPerPage) || [];

  const nextFlashPage = () => {
    if (flashPage < totalFlashPages - 1) {
      setFlashPage(p => p + 1);
      setFlipped({});
    }
  };

  const prevFlashPage = () => {
    if (flashPage > 0) {
      setFlashPage(p => p - 1);
      setFlipped({});
    }
  };

  // ========== QUIZ MODULE SELECTION VIEW ==========
  if (mode === 'quiz-select') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMode('flashcards')} className="btn-ghost text-sm">← Ke Flashcards</button>
          <h3 className="font-bold text-[var(--text)]">Pilih Modul Quiz</h3>
        </div>

        <div className="grid gap-3">
          {quizModules.map((mod, idx) => (
            <motion.button
              key={mod.name}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => startModuleQuiz(mod.name)}
              className="glass-card p-4 text-left flex items-center justify-between hover:border-[var(--accent)] transition-all"
            >
              <div className="flex-1">
                <p className="font-medium text-[var(--text)]">{mod.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{mod.questions.length} soal</p>
              </div>
              <div className="flex items-center gap-3">
                {mod.lastScore !== null ? (
                  <span className={`text-sm font-bold ${mod.lastScore >= 70 ? 'text-[var(--success)]' : mod.lastScore >= 50 ? 'text-[var(--warning)]' : 'text-[var(--danger)]'}`}>
                    {mod.lastScore}% ✓
                  </span>
                ) : (
                  <span className="text-xs text-[var(--text-muted)]">Belum dikerjakan</span>
                )}
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* All-at-once option */}
        <div className="pt-4 border-t border-[var(--border)]">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => { setSelectedModule('all'); resetQuiz(); setMode('quiz'); }}
            className="btn btn-secondary w-full"
          >
            Kerjakan Semua ({quiz?.length || 0} soal)
          </motion.button>
        </div>
      </div>
    );
  }

  // ========== FLASHCARDS VIEW ==========
  if (mode === 'flashcards') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[var(--text)]">Flashcards ({shuffledFlashcards?.length || 0} kartu)</h3>
          <div className="flex items-center gap-2">
            {subjectProgress.flashcardsCompleted && (
              <span className="text-xs text-[var(--success)] font-medium">✓ Selesai</span>
            )}
            {quiz?.length > 0 && (
              <button onClick={() => setMode('quiz-select')} className="btn btn-primary text-sm">
                Mulai Quiz →
              </button>
            )}
          </div>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevFlashPage}
            disabled={flashPage === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${flashPage === 0
              ? 'bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed opacity-50'
              : 'bg-[var(--accent)] text-white shadow-lg hover:shadow-xl'
              }`}
          >
            ←
          </motion.button>

          <div className="text-center">
            <p className="text-lg font-bold text-[var(--text)]">{flashPage + 1} / {totalFlashPages || 1}</p>
            <p className="text-xs text-[var(--text-muted)]">
              Kartu {flashPage * cardsPerPage + 1} - {Math.min((flashPage + 1) * cardsPerPage, shuffledFlashcards?.length || 0)}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextFlashPage}
            disabled={flashPage >= totalFlashPages - 1}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${flashPage >= totalFlashPages - 1
              ? 'bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed opacity-50'
              : 'bg-[var(--accent)] text-white shadow-lg hover:shadow-xl'
              }`}
          >
            →
          </motion.button>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mb-4">Klik kartu untuk flip 🔄</p>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentFlashcards.map((f, idx) => (
            <motion.div
              key={f.id || idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`aspect-[3/4] cursor-pointer perspective-1000 ${highlightedCard === (f.id || idx) ? 'ring-4 ring-yellow-400 rounded-xl animate-pulse' : ''}`}
              onClick={() => toggle(f.id || idx)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped[f.id || idx] ? 'rotate-y-180' : ''}`}>
                {/* Back - DEFINISI */}
                <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg p-4 flex items-center justify-center text-center bg-[var(--surface)] border border-[var(--border)] rotate-y-180 overflow-auto">
                  <span className="text-xs text-[var(--accent)] absolute top-4 left-4 font-bold">DEFINISI</span>
                  <p className="text-[var(--text)] leading-relaxed text-sm">{f.definition}</p>
                </div>
                {/* Front - TERM */}
                <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg p-4 flex items-center justify-center text-center gradient-accent">
                  <span className="text-xs text-white/60 absolute top-4 left-4 font-bold">TERM</span>
                  <p className="text-white font-semibold text-sm leading-tight">{f.term}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Navigation */}
        {totalFlashPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalFlashPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setFlashPage(i); setFlipped({}); }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === flashPage
                  ? 'bg-[var(--accent)] w-6'
                  : 'bg-[var(--border)] hover:bg-[var(--text-muted)]'
                  }`}
              />
            ))}
          </div>
        )}

        {/* Mark as complete button */}
        {flashPage >= totalFlashPages - 1 && !subjectProgress.flashcardsCompleted && (
          <div className="mt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={markFlashcardsComplete}
              className="btn btn-success"
            >
              ✓ Tandai Flashcards Selesai
            </motion.button>
          </div>
        )}
      </div>
    );
  }

  // ========== QUIZ DONE VIEW ==========
  if (done) {
    const finalScore = Math.round((score / shuffledModuleQuiz.length) * 100);
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl glow">
          <ClipboardCheck className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--text)] mb-2">Quiz Selesai!</h3>
        <p className="text-sm text-[var(--text-muted)] mb-2">{selectedModule === 'all' ? 'Semua Modul' : selectedModule}</p>
        <p className="text-4xl font-bold gradient-text mb-2">{score}/{shuffledModuleQuiz.length}</p>
        <p className={`text-lg font-bold mb-4 ${finalScore >= 70 ? 'text-[var(--success)]' : finalScore >= 50 ? 'text-[var(--warning)]' : 'text-[var(--danger)]'}`}>
          {finalScore}%
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={backToModuleSelect} className="btn btn-secondary">
            ← Pilih Modul Lain
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={resetQuiz} className="btn btn-primary">
            Ulangi Quiz Ini
          </motion.button>
        </div>
      </div>
    );
  }

  // ========== QUIZ VIEW ==========
  const q = shuffledModuleQuiz?.[cur];
  if (!q) return <div className="text-[var(--text-secondary)]">Quiz tidak tersedia</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={backToModuleSelect} className="btn-ghost text-sm">← Pilih Modul</button>
        <div className="text-center">
          <span className="text-[var(--text-secondary)] text-sm">{selectedModule === 'all' ? 'Semua' : selectedModule}</span>
          <p className="text-xs text-[var(--text-muted)]">{cur + 1}/{shuffledModuleQuiz.length}</p>
        </div>
        <span className={`badge ${time <= 5 ? 'badge-warning animate-pulse' : ''}`}><Timer className="w-3 h-3 mr-1" />{time}s</span>
      </div>
      <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden"><div className="timer-bar h-full rounded-full" style={{ width: `${(time / 20) * 100}%` }} /></div>
      <div className="glass-card p-6">
        <p className="text-[var(--text)] text-lg mb-6">{q.question}</p>
        <div className="space-y-3 stagger">
          {q.options.map((o, i) => {
            let cls = 'glass-card hover:border-[var(--accent)]';
            if (sel !== null) { if (i === q.answer) cls = 'bg-[var(--success)]/15 border-[var(--success)]'; else if (i === sel) cls = 'bg-[var(--danger)]/15 border-[var(--danger)]'; }
            return (
              <motion.button key={i} whileHover={sel === null ? { scale: 1.01 } : {}} onClick={() => handleAns(i)} disabled={sel !== null}
                className={`w-full p-4 rounded-xl text-left border transition-all animate-slide-up ${cls}`}>
                <span className="text-[var(--text)]">{String.fromCharCode(65 + i)}. {o}</span>
              </motion.button>
            );
          })}
        </div>
        {sel !== null && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={next} className="btn btn-primary w-full mt-6">{cur < shuffledModuleQuiz.length - 1 ? 'Lanjut' : 'Lihat Hasil'}</motion.button>}
      </div>
    </div>
  );
}

function PersonalNotes({ subjectId, subjectName, isPreviewMode, licenseKey }) {
  const storageKey = `personalNotes_${subjectId}`;
  const [notes, setNotes] = useState(() => localStorage.getItem(storageKey) || '');
  const [saved, setSaved] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Load notes from Firebase on mount
  useEffect(() => {
    if (!licenseKey || isPreviewMode) return;

    const loadCloudNotes = async () => {
      const cloudNotes = await getUserNotes(licenseKey, subjectId);
      if (cloudNotes && cloudNotes !== notes) {
        setNotes(cloudNotes);
        localStorage.setItem(storageKey, cloudNotes);
      }
    };
    loadCloudNotes();
  }, [licenseKey, subjectId, isPreviewMode]);

  const handleChange = (e) => {
    setNotes(e.target.value);
    setSaved(false);
  };

  const saveNotes = async () => {
    localStorage.setItem(storageKey, notes);

    // Sync to Firebase if logged in
    if (licenseKey && !isPreviewMode) {
      setSyncing(true);
      await saveUserNotes(licenseKey, subjectId, notes);
      setSyncing(false);
    }
    setSaved(true);
  };

  const exportToPDF = () => {
    // Create HTML content for printing
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Catatan - ${subjectName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; line-height: 1.8; }
          h1 { color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px; font-size: 24px; }
          .date { color: #666; font-size: 12px; margin-bottom: 30px; }
          .content { white-space: pre-wrap; font-size: 14px; color: #333; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #999; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <h1>Catatan: ${subjectName}</h1>
        <div class="date">Diekspor pada: ${new Date().toLocaleString('id-ID')}</div>
        <div class="content">${notes.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div>
        <div class="footer">BINUS B29 UAS Prep - Catatan Pribadi</div>
      </body>
      </html>
    `;

    // Create hidden iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(htmlContent);
    iframe.contentWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 300);

    showToast('Print dialog dibuka. Pilih "Save as PDF" untuk menyimpan.', 'info');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[var(--text)]">Catatan Pribadi</h3>
        <div className="flex gap-2">
          <button onClick={saveNotes} disabled={saved} className={`btn text-sm ${saved ? 'btn-secondary opacity-50' : 'btn-primary'}`}>
            {saved ? '✓ Tersimpan' : 'Simpan'}
          </button>
          <button onClick={exportToPDF} disabled={!notes.trim()} className="btn btn-secondary text-sm">
            📄 Export PDF
          </button>
        </div>
      </div>
      <div className="glass-card p-4">
        <textarea
          value={notes}
          onChange={handleChange}
          onBlur={saveNotes}
          placeholder="Tulis catatan pribadi Anda untuk mata kuliah ini...&#10;&#10;Tips:&#10;- Tulis poin-poin penting&#10;- Buat ringkasan materi&#10;- Catat pertanyaan untuk dosen"
          className="input min-h-[400px] resize-y"
          style={{ minHeight: '400px' }}
        />
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        💡 Catatan tersimpan otomatis di browser. Klik "Export PDF" untuk mendownload.
      </p>
    </div>
  );
}


function Forum({ subjectId, session, selectedClass, isPreviewMode, showCooldown, onlineUsers = [] }) {
  const [threads, setThreads] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedThread, setSelectedThread] = useState(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // ESC to close thread view or new thread form
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (selectedThread) {
          e.stopImmediatePropagation();
          setSelectedThread(null);
        } else if (showNew) {
          e.stopImmediatePropagation();
          setShowNew(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc, true);
    return () => window.removeEventListener('keydown', handleEsc, true);
  }, [selectedThread, showNew]);

  useEffect(() => {
    const unsub = subscribeToThreads(subjectId, setThreads);
    return () => unsub();
  }, [subjectId]);

  const handleCreate = async () => {
    const rateCheck = checkRateLimit('createThread', 30000);
    if (!rateCheck.allowed) {
      showCooldown('Thread', rateCheck.remaining);
      return;
    }
    if (!newTitle.trim() || !newContent.trim()) return;
    setCreating(true);
    try {
      let imageUrl = null;
      if (newImage) {
        imageUrl = await uploadImage(newImage);
      }
      await createThread(subjectId, newTitle, newContent, getDeviceId(), session.userName || session.name || 'Anonymous', selectedClass, imageUrl, { isAdmin: session?.isAdmin, isTester: session?.isTester });
      setNewTitle(''); setNewContent(''); setNewImage(null); setImagePreview(null); setShowNew(false);
    } catch (e) { showToast(e.message, 'error'); }
    setCreating(false);
  };

  const confirmDeleteThread = async () => {
    if (!confirmDelete) return;
    try {
      await deleteThread(subjectId, confirmDelete.id);
      setSelectedThread(null);
      setConfirmDelete(null);
    } catch (e) { showToast(e.message, 'error'); }
  };

  if (selectedThread) {
    return (
      <>
        <ThreadView
          subjectId={subjectId}
          thread={selectedThread}
          session={session}
          selectedClass={selectedClass}
          onBack={() => setSelectedThread(null)}
          onDelete={() => setConfirmDelete({ type: 'thread', id: selectedThread.id })}
          showCooldown={showCooldown}
          onlineUsers={onlineUsers}
        />
        {/* Confirm Modal */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" style={{ zIndex: 200 }}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass-strong p-6 max-w-sm mx-4 text-center">
                <div className="w-14 h-14 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] mb-2">Hapus Thread?</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-5">Thread dan semua komentar akan dihapus permanen.</p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmDelete(null)} className="btn btn-secondary flex-1">Batal</button>
                  <button onClick={confirmDeleteThread} className="btn btn-danger flex-1">Hapus</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="animate-fade">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[var(--text)]">Forum Diskusi</h3>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowNew(!showNew)} className="btn btn-primary text-sm">
          <Plus className="w-4 h-4" />Buat Thread
        </motion.button>
      </div>

      {/* New Thread Form */}
      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="glass-card p-5 mb-4 space-y-4">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Judul thread..." className="input" />
            <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Isi thread..." className="input h-24" />

            {/* Image Upload */}
            <div className="flex items-center gap-3">
              <label className="btn btn-secondary text-sm cursor-pointer">
                <Image className="w-4 h-4 mr-1.5" />Gambar
                <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
              </label>
              {imagePreview && (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                  <button onClick={() => { setNewImage(null); setImagePreview(null); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">×</button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => { setShowNew(false); setNewImage(null); setImagePreview(null); }} className="btn btn-secondary flex-1">Batal</button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCreate} disabled={creating || !newTitle.trim() || !newContent.trim()} className="btn btn-primary flex-1">
                {creating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Buat Thread'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thread List */}
      {threads.length === 0 ? (
        <div className="empty-state">
          <MessageSquare className="w-16 h-16 mx-auto" />
          <p>Belum ada thread. Jadilah yang pertama!</p>
        </div>
      ) : (
        <div className="space-y-3 stagger">
          {threads.map(t => (
            <motion.div key={t.id} whileHover={{ scale: 1.01 }} onClick={() => setSelectedThread(t)} className="thread-card cursor-pointer animate-slide-up">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-[var(--text)]">{t.title}</h4>
                {t.closed && <span className="badge">Ditutup</span>}
              </div>
              <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">{t.content}</p>
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  {t.authorName}
                  {t.authorClass && <span className="class-badge">{t.authorClass}</span>}
                </span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{t.commentCount || 0} komentar</span>
                <span>{new Date(t.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThreadView({ subjectId, thread, session, selectedClass, onBack, onDelete, showCooldown, onlineUsers = [] }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // comment id
  const [replyText, setReplyText] = useState('');
  const [confirmDeleteComment, setConfirmDeleteComment] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const isOwner = thread.authorId === getDeviceId();
  const isAdmin = session?.isAdmin === true;

  // Get unique usernames for mentions
  const mentionableUsers = useMemo(() => {
    const users = onlineUsers.filter(u => u.userName).map(u => u.userName);
    return [...new Set(users)].slice(0, 10);
  }, [onlineUsers]);

  // Insert @mention into comment
  const insertMention = (username) => {
    setNewComment(prev => prev + `@${username} `);
    setShowMentions(false);
  };

  useEffect(() => {
    const unsub = subscribeToComments(subjectId, thread.id, setComments);
    return () => unsub();
  }, [subjectId, thread.id]);

  const handlePost = async () => {
    const rateCheck = checkRateLimit('postComment', 10000);
    if (!rateCheck.allowed) {
      showCooldown('Komentar', rateCheck.remaining);
      return;
    }
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      await addComment(subjectId, thread.id, newComment, getDeviceId(), session.userName || session.name || 'Anonymous', selectedClass, { isAdmin: session?.isAdmin, isTester: session?.isTester });
      setNewComment('');
    } catch (e) { showToast(e.message, 'error'); }
    setPosting(false);
  };

  const handleReply = async (commentId) => {
    const rateCheck = checkRateLimit('replyComment', 5000);
    if (!rateCheck.allowed) {
      showCooldown('Reply', rateCheck.remaining);
      return;
    }
    if (!replyText.trim()) return;
    setPosting(true);
    try {
      await addReply(subjectId, thread.id, commentId, replyText, getDeviceId(), session.userName || session.name || 'Anonymous', selectedClass, { isAdmin: session?.isAdmin, isTester: session?.isTester });
      setReplyText('');
      setReplyingTo(null);
    } catch (e) { showToast(e.message, 'error'); }
    setPosting(false);
  };

  const handleDeleteComment = async () => {
    if (!confirmDeleteComment) return;
    setDeleting(true);
    try {
      await deleteComment(subjectId, thread.id, confirmDeleteComment);
      setConfirmDeleteComment(null);
    } catch (e) { showToast(e.message, 'error'); }
    setDeleting(false);
  };

  return (
    <div className="animate-fade">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="btn-ghost text-sm">← Kembali</button>
        {(isOwner || isAdmin) && (
          <button onClick={onDelete} className="btn-ghost text-[var(--danger)] text-sm"><Trash2 className="w-4 h-4 mr-1" />Hapus</button>
        )}
      </div>

      {/* Thread Content */}
      <div className="glass-card p-6 mb-6">
        <h2 className="text-xl font-bold text-[var(--text)] mb-2">{thread.title}</h2>
        <div className="flex items-center gap-3 mb-4 text-sm text-[var(--text-muted)]">
          <div className="avatar avatar-sm">{thread.authorName?.charAt(0) || '?'}</div>
          <span>{thread.authorName}</span>
          {thread.isAdmin && <span className="text-[10px] px-1.5 py-0.5 bg-red-500/15 text-red-500 rounded font-medium">Admin</span>}
          {thread.isTester && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/15 text-amber-500 rounded font-medium">Tester</span>}
          {thread.authorClass && <span className="class-badge">{thread.authorClass}</span>}
          <span>•</span>
          <span>{new Date(thread.createdAt).toLocaleString('id-ID')}</span>
        </div>
        <p className="text-[var(--text)] whitespace-pre-wrap">{thread.content}</p>
        {thread.imageUrl && (
          <img src={thread.imageUrl} alt="Thread image" className="mt-4 rounded-xl max-w-full max-h-96 object-contain" />
        )}
      </div>

      {/* Comments */}
      <h3 className="font-bold text-[var(--text)] mb-4">{comments.length} Komentar</h3>

      {!thread.closed && (
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="avatar flex-shrink-0">{session.userName?.charAt(0) || '?'}</div>
            <div className="flex-1 flex gap-2">
              <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Tulis komentar..." className="input flex-1" onKeyDown={(e) => e.key === 'Enter' && handlePost()} />
              <button onClick={() => setShowMentions(!showMentions)} className={`btn-ghost p-2 ${showMentions ? 'text-[var(--accent)]' : ''}`} title="Mention user">
                <User className="w-4 h-4" />
              </button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePost} disabled={posting || !newComment.trim()} className="btn btn-primary">
                {posting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
          {/* Mention Dropdown */}
          <AnimatePresence>
            {showMentions && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 ml-12 p-2 surface-flat rounded-lg">
                <p className="text-xs text-[var(--text-muted)] mb-2">Mention user:</p>
                <div className="flex flex-wrap gap-1">
                  {isAdmin && (
                    <button onClick={() => insertMention('all')} className="px-2 py-0.5 text-xs bg-red-500/15 text-red-500 rounded-lg font-medium">@all</button>
                  )}
                  {mentionableUsers.map(u => (
                    <button key={u} onClick={() => insertMention(u)} className="px-2 py-0.5 text-xs surface-flat rounded-lg hover:bg-[var(--accent-soft)]">@{u}</button>
                  ))}
                  {mentionableUsers.length === 0 && !isAdmin && (
                    <span className="text-xs text-[var(--text-muted)]">Tidak ada user online</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {thread.closed && (
        <div className="glass-card p-4 mb-6 text-center text-[var(--text-muted)]">
          Thread ini sudah ditutup
        </div>
      )}

      <div className="space-y-3 stagger">
        {comments.map(c => {
          const isCommentOwner = c.authorId === getDeviceId();
          const replies = c.replies ? Object.entries(c.replies).map(([id, r]) => ({ id, ...r })).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : [];

          return (
            <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="comment-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="avatar avatar-sm">{c.authorName?.charAt(0) || '?'}</div>
                  <span className="font-medium text-[var(--text)] text-sm">{c.authorName}</span>
                  {c.isAdmin && <span className="text-[8px] px-1 bg-red-500/15 text-red-400 rounded font-medium">Admin</span>}
                  {c.isTester && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/15 text-amber-500 rounded font-medium">Tester</span>}
                  {c.authorClass && <span className="class-badge text-xs">{c.authorClass}</span>}
                  <span className="text-xs text-[var(--text-muted)]">{new Date(c.createdAt).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-1">
                  {!thread.closed && (
                    <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)} className="btn-ghost text-xs p-1">
                      <Reply className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {(isAdmin || isOwner || isCommentOwner) && (
                    <button onClick={() => setConfirmDeleteComment(c.id)} className="btn-ghost text-xs p-1 text-[var(--danger)]">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">{c.content}</p>

              {/* Replies */}
              {replies.length > 0 && (
                <div className="ml-6 mt-3 space-y-2 border-l-2 border-[var(--border)] pl-4">
                  {replies.map(r => (
                    <div key={r.id} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="avatar avatar-sm" style={{ width: 24, height: 24, fontSize: 10 }}>{r.authorName?.charAt(0) || '?'}</div>
                        <span className="font-medium text-[var(--text)]">{r.authorName}</span>
                        {r.authorClass && <span className="class-badge text-xs">{r.authorClass}</span>}
                        <span className="text-xs text-[var(--text-muted)]">{new Date(r.createdAt).toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-[var(--text-secondary)]">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {replyingTo === c.id && (
                <div className="mt-3 ml-6 flex gap-2">
                  <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Balas komentar..." className="input flex-1 text-sm" onKeyDown={(e) => e.key === 'Enter' && handleReply(c.id)} autoFocus />
                  <button onClick={() => handleReply(c.id)} disabled={posting || !replyText.trim()} className="btn btn-primary text-xs px-3">
                    {posting ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Confirm Delete Comment Modal */}
      <AnimatePresence>
        {confirmDeleteComment && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" style={{ zIndex: 200 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass-strong p-6 max-w-sm mx-4 text-center">
              <div className="w-14 h-14 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">Hapus Komentar?</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-5">Komentar akan dihapus permanen.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDeleteComment(null)} className="btn btn-secondary flex-1" disabled={deleting}>Batal</button>
                <button onClick={handleDeleteComment} className="btn btn-danger flex-1" disabled={deleting}>
                  {deleting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : 'Hapus'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// EXAM COUNTDOWN WIDGET
// ============================================
function ExamCountdown({ schedules, selectedClass }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, subject: '', date: null });

  useEffect(() => {
    const classSchedule = schedules[selectedClass] || schedules['Other'] || {};

    const updateCountdown = () => {
      const now = new Date();
      let nearestExam = null;
      let nearestSubject = '';

      Object.entries(classSchedule).forEach(([subject, info]) => {
        const dateStr = info.date || info;
        const examDate = new Date(dateStr);
        if (examDate > now && (!nearestExam || examDate < nearestExam)) {
          nearestExam = examDate;
          nearestSubject = subject;
        }
      });

      if (nearestExam) {
        const diff = nearestExam - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds, subject: nearestSubject, date: nearestExam });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [schedules, selectedClass]);

  if (!countdown.date) return null;

  const isUrgent = countdown.days <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card p-4 h-full flex flex-col ${isUrgent ? 'border border-red-500/50' : ''}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Target className={`w-4 h-4 ${isUrgent ? 'text-red-500' : 'text-[var(--accent)]'}`} />
        <span className="text-sm font-medium text-[var(--text)]">Countdown UAS</span>
        {isUrgent && <span className="ml-auto text-xs text-red-500 font-bold animate-pulse">H-{countdown.days}</span>}
      </div>
      <p className="text-xs text-[var(--text-muted)] mb-3">{countdown.subject}</p>
      <div className="flex gap-2 text-center flex-1 items-stretch">
        {[
          { value: countdown.days, label: 'Hari' },
          { value: countdown.hours, label: 'Jam' },
          { value: countdown.minutes, label: 'Mnt' },
          { value: countdown.seconds, label: 'Dtk' },
        ].map((item, i) => (
          <div key={i} className="flex-1 surface-flat rounded-lg py-2 px-1 flex flex-col items-center justify-center">
            <div className={`text-xl font-bold tabular-nums ${isUrgent ? 'text-red-500' : 'gradient-text'}`}>
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-[9px] text-[var(--text-muted)]">{item.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// INTERACTIVE TUTORIAL
// ============================================
function Tutorial({ onComplete }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Selamat Datang! 👋',
      content: 'Ini adalah BINUS B29 UAS Prep - platform lengkap untuk persiapan UAS. Mari kita jelajahi semua fitur yang tersedia!',
      icon: GraduationCap,
    },
    {
      title: 'Dashboard & Mata Kuliah 📚',
      content: 'Di dashboard, kamu bisa lihat jadwal UAS, countdown, dan pilih mata kuliah. Setiap mata kuliah punya: Materi PDF, Kisi-Kisi, Rangkuman, Flashcards, Quiz, dan Forum.',
      icon: BookOpen,
    },
    {
      title: 'Flashcards & Quiz 🎯',
      content: 'Gunakan Flashcards untuk belajar dengan flip card interaktif. Quiz mode untuk uji pemahaman dengan timer dan skor. Essay mode untuk latihan jawaban panjang.',
      icon: Target,
    },
    {
      title: 'Pomodoro Timer ⏱️',
      content: 'Timer Pomodoro 25 menit untuk belajar fokus. Klik Play untuk mulai, Pause untuk istirahat, Reset untuk ulang. Produktivitas naik!',
      icon: Timer,
    },
    {
      title: 'Reminder Alarm 🔔',
      content: 'Set reminder di Settings! Saat waktunya tiba, alarm FULLSCREEN akan muncul dengan suara terus-menerus sampai kamu stop. Ada snooze 5 menit juga!',
      icon: BellRing,
    },
    {
      title: 'Forum Diskusi 💡',
      content: 'Setiap mata kuliah punya forum diskusi. Buat thread baru, reply komentar, upload gambar. Diskusi bareng teman-teman!',
      icon: MessageCircle,
    },
    {
      title: 'Live Chat Global 💬',
      content: 'Tombol chat di pojok kanan bawah untuk ngobrol real-time. Kirim teks, emoji, gambar, voice note. Lihat siapa yang online!',
      icon: MessageSquare,
    },
    {
      title: 'Settings & Referral ⚙️',
      content: 'Klik gear icon untuk Settings: ubah tema, font, set email reminder. Bagikan kode referral ke teman untuk track siapa yang kamu ajak!',
      icon: Settings,
    },
    {
      title: 'Siap Belajar! 🚀',
      content: 'Semua fitur sudah siap! Jangan lupa set reminder harian, eksplorasi semua materi, dan sukses UAS! Semangat! 💪',
      icon: Sparkles,
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem('tutorialCompletedV5', 'true');
      onComplete();
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-strong p-8 max-w-md w-full text-center"
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === step ? 'w-6 gradient-accent' : i < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
            />
          ))}
        </div>

        {/* Icon */}
        <motion.div
          key={step}
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-20 h-20 gradient-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        {/* Content */}
        <motion.div key={`content-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl font-bold text-[var(--text)] mb-3">{currentStep.title}</h2>
          <p className="text-[var(--text-secondary)] mb-8">{currentStep.content}</p>
        </motion.div>

        {/* Button - No Skip */}
        <div className="flex">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="btn btn-primary flex-1"
          >
            {step === steps.length - 1 ? 'Mulai Belajar!' : 'Lanjut'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// TERMS AGREEMENT
// ============================================
function TermsAgreement({ onAgree }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-strong p-6 sm:p-8 rounded-2xl max-w-md w-full"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text)]">Syarat & Ketentuan</h2>
            <p className="text-xs text-[var(--text-muted)]">Harap baca dengan seksama</p>
          </div>
        </div>

        <div className="space-y-3 mb-6 text-sm text-[var(--text-secondary)]">
          <p className="font-medium text-[var(--text)]">Dengan menggunakan aplikasi ini, kamu menyetujui:</p>

          <div className="space-y-2">
            <div className="flex gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>License key bersifat <strong>pribadi</strong> dan tidak boleh dibagikan kepada siapapun.</span>
            </div>
            <div className="flex gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>Dilarang menjual, menyewakan, atau memindahtangankan license key.</span>
            </div>
            <div className="flex gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>Dilarang mengakali sistem dengan cara apapun.</span>
            </div>
            <div className="flex gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>Konten di forum harus sopan dan tidak melanggar hukum.</span>
            </div>
          </div>

          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl mt-4">
            <p className="text-red-500 font-bold text-center">Pelanggaran = Akses DICABUT. NO REFUND!</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[var(--accent)]"
            />
            <span className="text-sm text-[var(--text)]">
              Saya telah membaca dan <strong>menyetujui</strong> semua syarat & ketentuan di atas.
            </span>
          </label>

          <motion.button
            whileHover={{ scale: agreed ? 1.02 : 1 }}
            whileTap={{ scale: agreed ? 0.98 : 1 }}
            onClick={onAgree}
            disabled={!agreed}
            className="btn btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Saya Setuju & Lanjutkan
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// CONFIRM MODAL (Custom - replaces window.confirm)
// ============================================
function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-strong p-5 rounded-2xl max-w-xs w-full"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="font-bold text-[var(--text)] text-center mb-2">{title || 'Konfirmasi'}</h3>
        <p className="text-sm text-[var(--text-secondary)] text-center mb-4">{message || 'Yakin?'}</p>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 px-4 rounded-xl surface-flat text-[var(--text)] text-sm font-medium">Batal</button>
          <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 py-2 px-4 rounded-xl bg-red-500 text-white text-sm font-medium">Ya</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// VOICE NOTE PLAYER (Using Web Audio API - No MediaSession)
// ============================================
function VoiceNotePlayer({ src, isMine }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const startTimeRef = useRef(0);
  const pausedAtRef = useRef(0);
  const animationRef = useRef(null);

  // Load audio on mount
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();

        // Create AudioContext lazily
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;
        setDuration(audioBuffer.duration);
        setIsLoaded(true);
      } catch (e) {
        console.error('Error loading audio:', e);
      }
    };

    loadAudio();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (sourceNodeRef.current) {
        try { sourceNodeRef.current.stop(); } catch (e) { }
      }
    };
  }, [src]);

  const updateProgress = () => {
    if (audioContextRef.current && isPlaying) {
      const elapsed = audioContextRef.current.currentTime - startTimeRef.current + pausedAtRef.current;
      const dur = audioBufferRef.current?.duration || 1;

      if (elapsed >= dur) {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        pausedAtRef.current = 0;
        return;
      }

      setCurrentTime(elapsed);
      setProgress((elapsed / dur) * 100);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const togglePlay = async () => {
    if (!isLoaded || !audioBufferRef.current) return;

    // Resume AudioContext if suspended (browser autoplay policy)
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      // Pause
      pausedAtRef.current += audioContextRef.current.currentTime - startTimeRef.current;
      if (sourceNodeRef.current) {
        try { sourceNodeRef.current.stop(); } catch (e) { }
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    } else {
      // Play
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);

      source.onended = () => {
        if (isPlaying) {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
          pausedAtRef.current = 0;
        }
      };

      const offset = pausedAtRef.current;
      source.start(0, offset);

      sourceNodeRef.current = source;
      startTimeRef.current = audioContextRef.current.currentTime;
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handleSeek = (e) => {
    if (!audioBufferRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const seekTime = pct * audioBufferRef.current.duration;

    pausedAtRef.current = seekTime;
    setCurrentTime(seekTime);
    setProgress(pct * 100);

    if (isPlaying) {
      // Stop current and restart at new position
      if (sourceNodeRef.current) {
        try { sourceNodeRef.current.stop(); } catch (e) { }
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0, seekTime);

      sourceNodeRef.current = source;
      startTimeRef.current = audioContextRef.current.currentTime;
      pausedAtRef.current = seekTime;
    }
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-2 py-1`}>
      <button
        onClick={togglePlay}
        disabled={!isLoaded}
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isMine ? 'bg-white/20 text-white' : 'bg-[var(--accent)]/20 text-[var(--accent)]'} ${!isLoaded ? 'opacity-50' : ''}`}
      >
        {!isLoaded ? (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>
      <div className="flex-1 flex flex-col gap-0.5 min-w-[80px]">
        <div
          className={`h-1.5 rounded-full cursor-pointer ${isMine ? 'bg-white/30' : 'bg-[var(--accent)]/20'}`}
          onClick={handleSeek}
        >
          <div
            className={`h-full rounded-full transition-all ${isMine ? 'bg-white' : 'bg-[var(--accent)]'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={`text-[9px] ${isMine ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
          🎤 {isPlaying ? formatTime(currentTime) : formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

// ============================================
// GLOBAL LIVE CHAT
// ============================================
const EMOJI_LIST = ['😀', '😂', '🥰', '😎', '🤔', '👍', '👎', '🔥', '❤️', '💯', '✅', '📚', '💡', '🎉', '😢', '😡'];
const DEFAULT_STICKERS = [
  { id: 'study', url: '📚', isEmoji: true },
  { id: 'tired', url: '😴', isEmoji: true },
  { id: 'help', url: '🆘', isEmoji: true },
  { id: 'done', url: '✅', isEmoji: true },
  { id: 'fire', url: '🔥', isEmoji: true },
  { id: 'love', url: '❤️', isEmoji: true },
];

function GlobalChat({ session, selectedClass, onlineUsers = [], addNotification, onImageClick, isPreviewMode, showCooldown, showBrowserNotification }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [showMentions, setShowMentions] = useState(false);
  const [customStickers, setCustomStickers] = useState(() => JSON.parse(localStorage.getItem('customStickers') || '[]'));
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [seenMentionIds, setSeenMentionIds] = useState(() => JSON.parse(localStorage.getItem('seenMentions') || '[]'));
  const seenMentionIdsRef = useRef(seenMentionIds); // Ref to track latest seen IDs
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const stickerInputRef = useRef(null);
  const isFirstLoad = useRef(true);

  const currentDeviceId = getDeviceId();
  const currentUserName = session?.userName || session?.name || 'Anonymous';
  const isAdmin = session?.isAdmin === true;
  const isTester = session?.isTester === true;

  // Sync ref with state
  useEffect(() => {
    seenMentionIdsRef.current = seenMentionIds;
  }, [seenMentionIds]);

  // ESC key to close chat
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.stopImmediatePropagation();
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc, true);
    return () => window.removeEventListener('keydown', handleEsc, true);
  }, [isOpen]);

  // Subscribe to chat messages for mention detection (ALWAYS active)
  useEffect(() => {
    isFirstLoad.current = true;
    const unsub = subscribeToGlobalChat((msgs) => {
      // Always update messages
      setMessages(msgs);

      const currentSeen = new Set(seenMentionIdsRef.current);
      let hasNewMentions = false;

      // Check for new mentions that haven't been seen
      msgs.forEach(m => {
        // Check for @username or @all mentions
        const mentionsMe = m.content?.includes(`@${currentUserName}`);
        const mentionsAll = m.content?.includes('@all');
        const isNewMessage = !currentSeen.has(m.id);
        const isFromOthers = m.authorId !== currentDeviceId;
        // Only notify for messages in last 30 seconds (avoid old message spam)
        const isRecent = Date.now() - m.timestamp < 30000;

        if ((mentionsMe || mentionsAll) && isFromOthers && isNewMessage && isRecent) {
          const notifTitle = mentionsAll ? 'Pengumuman untuk Semua' : 'Kamu di-mention!';

          addNotification?.({ type: 'mention', title: notifTitle, message: `${m.authorName}: ${m.content.slice(0, 50)}` });

          // Use showBrowserNotification helper (includes sound)
          showBrowserNotification?.(notifTitle, `${m.authorName}: ${m.content.slice(0, 80)}`, () => setIsOpen(true));

          // Mark as seen
          currentSeen.add(m.id);
          hasNewMentions = true;
        }
      });

      if (hasNewMentions) {
        const newSeenArray = Array.from(currentSeen).slice(-100);
        setSeenMentionIds(newSeenArray);
        localStorage.setItem('seenMentions', JSON.stringify(newSeenArray));
        seenMentionIdsRef.current = newSeenArray;
      }
    });
    return () => unsub();
  }, [currentUserName, currentDeviceId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      // Use instant on first load, smooth on subsequent updates
      messagesEndRef.current.scrollIntoView({ behavior: isFirstLoad.current ? 'instant' : 'smooth' });
      isFirstLoad.current = false;
    }
  }, [messages]);

  useEffect(() => {
    const match = input.match(/@(\w*)$/);
    setShowMentions(match && onlineUsers.length > 0);
  }, [input, onlineUsers]);

  const insertMention = (userName) => {
    setInput(prev => prev.replace(/@\w*$/, `@${userName} `));
    setShowMentions(false);
  };

  const sendTextMessage = async () => {
    const rateCheck = checkRateLimit('chat', 2000);
    if (!rateCheck.allowed) {
      showCooldown('Chat', rateCheck.remaining);
      return;
    }
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      // Store reply info as separate fields (for WhatsApp-style display)
      const replyData = replyTo ? { replyToId: replyTo.id, replyToName: replyTo.authorName, replyToContent: replyTo.content?.slice(0, 40) || '...' } : {};
      await sendGlobalMessage(input.trim(), currentDeviceId, currentUserName, selectedClass, 'text', null, replyData, { isAdmin, isTester });
      setInput('');
      setReplyTo(null);
    } catch (e) { console.error(e); }
    setSending(false);
    setShowEmoji(false);
  };

  const sendImage = async (file) => {
    if (!file) return;
    setSending(true);
    try {
      const url = await uploadImage(file);
      await sendGlobalMessage('', currentDeviceId, currentUserName, selectedClass, 'image', url, {}, { isAdmin, isTester });
    } catch (e) { console.error(e); }
    setSending(false);
  };

  const sendSticker = async (sticker) => {
    setSending(true);
    try {
      if (sticker.isEmoji) {
        await sendGlobalMessage(sticker.url, currentDeviceId, currentUserName, selectedClass, 'sticker', null, {}, { isAdmin, isTester });
      } else {
        await sendGlobalMessage('', currentDeviceId, currentUserName, selectedClass, 'customSticker', sticker.url, {}, { isAdmin, isTester });
      }
    } catch (e) { console.error(e); }
    setSending(false);
    setShowStickers(false);
  };

  const addCustomSticker = async (file) => {
    if (!file) return;
    try {
      const url = await uploadImage(file);
      const newStickers = [...customStickers, { id: Date.now().toString(), url, isEmoji: false }];
      setCustomStickers(newStickers);
      localStorage.setItem('customStickers', JSON.stringify(newStickers));
    } catch (e) { console.error(e); }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks = [];
      recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        if (chunks.length === 0) return;
        const blob = new Blob(chunks, { type: mimeType });
        setSending(true);
        try {
          const file = new File([blob], `voice.${mimeType === 'audio/webm' ? 'webm' : 'm4a'}`, { type: mimeType });
          const url = await uploadAudio(file);
          await sendGlobalMessage('🎤', currentDeviceId, currentUserName, selectedClass, 'audio', url, {}, { isAdmin, isTester });
        } catch (e) { console.error(e); }
        setSending(false);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (e) { showToast('Izinkan akses mikrofon', 'error'); }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null);
    }
  };

  const deleteMessage = async (msgId) => {
    setConfirmDelete(msgId);
  };

  const confirmDeleteMessage = async () => {
    if (!confirmDelete) return;
    try { await deleteGlobalMessage(confirmDelete); } catch (e) { console.error(e); }
    setConfirmDelete(null);
  };

  const canDelete = (msg) => isAdmin || msg.authorId === currentDeviceId;
  const allStickers = [...DEFAULT_STICKERS, ...customStickers];

  return (
    <>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="fixed bottom-20 sm:bottom-24 right-5 z-50 w-10 h-10 sm:w-14 sm:h-14 gradient-accent rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl glow">
        <MessageSquare className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setIsOpen(false)}>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="glass-strong w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden flex flex-col" style={{ maxHeight: '85vh', height: '600px' }} onClick={e => e.stopPropagation()}>

              <div className="p-4 border-b border-[var(--border)] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center"><MessageSquare className="w-5 h-5 text-white" /></div>
                  <div>
                    <h3 className="font-bold text-[var(--text)]">Global Live Chat</h3>
                    <p className="text-xs text-[var(--text-muted)]">{onlineUsers.length} online • {messages.length} pesan</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-[var(--surface-hover)]"><X className="w-5 h-5 text-[var(--text-secondary)]" /></button>
              </div>

              {/* Lock overlay for preview mode */}
              {isPreviewMode ? (
                <div style={{ position: 'relative', flex: 1, minHeight: '200px' }}>
                  <ContentLockOverlay message="Live Chat tidak tersedia di Preview Mode" />
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {messages.length === 0 && <div className="text-center py-8"><MessageSquare className="w-12 h-12 mx-auto text-[var(--accent)] mb-3 opacity-50" /><p className="text-[var(--text-muted)] text-sm">Say hi! 👋</p></div>}
                  {messages.map((msg) => {
                    const isMine = msg.authorId === currentDeviceId;
                    const isMedia = msg.type === 'image' || msg.type === 'customSticker' || msg.type === 'audio';
                    const isDeleted = msg.deleted === true;

                    // Deleted message
                    if (isDeleted) {
                      return (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                          <div className="px-3 py-1.5 rounded-2xl surface-flat text-[var(--text-muted)] text-sm italic flex items-center gap-1.5">
                            <XCircle className="w-3 h-3" />
                            <span>Pesan telah dihapus</span>
                          </div>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[75%]`}>
                          {!isMine && <span className="text-[10px] text-[var(--text-muted)] mb-0.5 ml-1">{msg.authorName} {msg.isAdmin && <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded mr-0.5">Admin</span>}{msg.isTester && <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded mr-0.5">Tester</span>}{msg.authorClass && <span className="text-[10px] px-1.5 py-0.5 bg-[var(--accent)]/20 rounded">{msg.authorClass}</span>}</span>}
                          <div className={`group relative inline-block ${isMedia && msg.type !== 'audio' ? '' : 'px-3 py-1.5 rounded-2xl'} text-sm ${isMine && !(isMedia && msg.type !== 'audio') ? 'gradient-accent text-white rounded-br-sm' : !(isMedia && msg.type !== 'audio') ? 'surface-flat text-[var(--text)] rounded-bl-sm' : ''}`}>
                            {/* WhatsApp-style Reply Quote */}
                            {msg.replyToName && (
                              <div className={`mb-1 px-2 py-1 rounded-lg text-[10px] border-l-2 ${isMine ? 'bg-white/10 border-white/50' : 'bg-[var(--accent)]/10 border-[var(--accent)]'}`}>
                                <span className="font-medium">{msg.replyToName}</span>
                                <p className="opacity-70 truncate">{msg.replyToContent}</p>
                              </div>
                            )}
                            {msg.type === 'image' && msg.mediaUrl && <img src={msg.mediaUrl} alt="" className="rounded-xl max-w-full max-h-40 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => onImageClick && onImageClick(msg.mediaUrl)} />}
                            {msg.type === 'customSticker' && msg.mediaUrl && <img src={msg.mediaUrl} alt="" className="w-20 h-20 object-contain cursor-pointer hover:opacity-90 transition-opacity" onClick={() => onImageClick && onImageClick(msg.mediaUrl)} />}
                            {msg.type === 'audio' && msg.mediaUrl && <VoiceNotePlayer src={msg.mediaUrl} isMine={isMine} />}
                            {msg.type === 'sticker' && <span className="text-3xl">{msg.content}</span>}
                            {(msg.type === 'text' || !msg.type) && <span className="break-words">{msg.content?.split(/(@\w+)/g).map((p, i) => p.startsWith('@') ? <span key={i} className="font-bold text-blue-300">{p}</span> : p)}</span>}
                            <div className={`absolute ${isMine ? '-left-12' : '-right-12'} top-0 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}>
                              <button onClick={() => setReplyTo(msg)} className="w-5 h-5 rounded-full surface-flat flex items-center justify-center text-[10px]"><Reply className="w-3 h-3" /></button>
                              {canDelete(msg) && <button onClick={() => deleteMessage(msg.id)} className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">×</button>}
                            </div>
                          </div>
                          <span className="text-[8px] text-[var(--text-muted)] mt-0.5 ml-1">{new Date(msg.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
              {replyTo && <div className="px-3 py-1.5 border-t border-[var(--border)] flex items-center gap-2 text-xs"><Reply className="w-3 h-3 text-[var(--accent)]" /><span className="flex-1 truncate text-[var(--text-muted)]">Balas {replyTo.authorName}</span><button onClick={() => setReplyTo(null)}><X className="w-3 h-3" /></button></div>}

              <AnimatePresence>
                {showMentions && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-[var(--border)]"><div className="p-2 flex flex-wrap gap-1">{session?.isAdmin && <button onClick={() => insertMention('all')} className="px-2 py-0.5 text-xs bg-red-500/15 text-red-500 rounded-lg font-medium">@all</button>}{onlineUsers.filter(u => u.userName).slice(0, 6).map(u => <button key={u.id} onClick={() => insertMention(u.userName)} className="px-2 py-0.5 text-xs surface-flat rounded-lg">@{u.userName}</button>)}</div></motion.div>}
              </AnimatePresence>

              <AnimatePresence>
                {showEmoji && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-[var(--border)]"><div className="p-2 flex flex-wrap gap-1.5">{EMOJI_LIST.map(e => <button key={e} onClick={() => setInput(prev => prev + e)} className="text-lg hover:scale-125 transition-transform">{e}</button>)}</div></motion.div>}
              </AnimatePresence>

              <AnimatePresence>
                {showStickers && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-[var(--border)]"><div className="p-2 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">{allStickers.map(s => <button key={s.id} onClick={() => sendSticker(s)} className="w-10 h-10 surface-flat rounded-lg flex items-center justify-center overflow-hidden hover:scale-105 transition-transform">{s.isEmoji ? <span className="text-xl">{s.url}</span> : <img src={s.url} alt="" className="w-full h-full object-cover" />}</button>)}<input ref={stickerInputRef} type="file" accept="image/*" onChange={e => { addCustomSticker(e.target.files[0]); e.target.value = ''; }} className="hidden" /><button onClick={() => stickerInputRef.current?.click()} className="w-10 h-10 border border-dashed border-[var(--border)] rounded-lg flex items-center justify-center text-[var(--text-muted)]"><Plus className="w-4 h-4" /></button></div></motion.div>}
              </AnimatePresence>

              <div className="p-2.5 border-t border-[var(--border)] shrink-0">
                <div className="flex items-center gap-1.5">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={e => { sendImage(e.target.files[0]); e.target.value = ''; }} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()} className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text-muted)]" disabled={sending}><Image className="w-4 h-4" /></button>
                  <button onClick={() => { setShowStickers(!showStickers); setShowEmoji(false); }} className={`p-1.5 rounded-lg hover:bg-[var(--surface-hover)] ${showStickers ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}><Sparkles className="w-4 h-4" /></button>
                  <button onClick={recording ? stopRecording : startRecording} className={`p-1.5 rounded-lg ${recording ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-[var(--surface-hover)] text-[var(--text-muted)]'}`} disabled={sending}><Mic className="w-4 h-4" /></button>
                  <div className="flex-1 flex items-center gap-1 surface-flat rounded-lg px-2.5">
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendTextMessage()} placeholder="Ketik... (@mention)" className="flex-1 bg-transparent py-1.5 text-sm text-[var(--text)] outline-none" />
                    <button onClick={() => { setShowEmoji(!showEmoji); setShowStickers(false); }} className={showEmoji ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}><Smile className="w-4 h-4" /></button>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendTextMessage} disabled={sending || !input.trim()} className="btn btn-primary p-2">
                    {sending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Confirm Modal for Delete */}
      <ConfirmModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={confirmDeleteMessage}
        title="Hapus Pesan"
        message="Yakin ingin menghapus pesan ini?"
      />
    </>
  );
}

// ============================================
// ADMIN DASHBOARD COMPONENT
// ============================================
function AdminDashboard({ session, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [licenseKeys, setLicenseKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [editingKey, setEditingKey] = useState(null); // Key being edited
  const [keyForm, setKeyForm] = useState({ key: '', name: '', daysActive: 30, isAdmin: false, isTester: false, maxDevices: 1, fixedExpiry: '' });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [statsRefresh, setStatsRefresh] = useState(0);
  const [dangerAction, setDangerAction] = useState(null);
  const [resetDevicesKey, setResetDevicesKey] = useState(null); // For Reset Devices confirmation
  // Activity logs & suspend
  const [activityLogs, setActivityLogs] = useState([]);
  const [suspendModal, setSuspendModal] = useState(null); // { key, name }
  const [suspendMinutes, setSuspendMinutes] = useState(60);
  const [actionLoading, setActionLoading] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementType, setAnnouncementType] = useState('info');
  const [sendingAnnouncement, setSendingAnnouncement] = useState(false);

  // Error Logs state (Phase 4)
  const [errorLogs, setErrorLogs] = useState([]);
  const [errorFilter, setErrorFilter] = useState('all'); // 'all', 'critical', 'warning', 'resolved'
  const [clearingLogs, setClearingLogs] = useState(false);

  // Analytics state (Phase 5)
  const [leaderboard, setLeaderboard] = useState([]);
  const [peakHours, setPeakHours] = useState(Array(24).fill(0));

  // Announcement templates
  const announcementTemplates = [
    { label: '🔄 Server Reboot', text: 'Server akan di-reboot sebentar lagi. Mohon tunggu sekitar 1 menit dan refresh halaman.', type: 'maintenance' },
    { label: '⚡ Update', text: 'Sedang ada update sistem. Mohon tunggu sebentar dan refresh halaman setelah selesai.', type: 'info' },
    { label: '🛠️ Maintenance', text: 'Sistem sedang dalam maintenance. Mohon maaf atas ketidaknyamanan ini.', type: 'maintenance' },
    { label: '📢 Info', text: 'Info: Selamat belajar! Semoga sukses UAS-nya! 💪', type: 'info' },
  ];

  const handleSendAnnouncement = async () => {
    if (!announcementText.trim()) return;
    setSendingAnnouncement(true);
    try {
      await sendAnnouncement(announcementText, announcementType);
      setAnnouncementText('');
    } catch (e) {
      console.error('Error sending announcement:', e);
    }
    setSendingAnnouncement(false);
  };

  const handleClearAnnouncement = async () => {
    setSendingAnnouncement(true);
    try {
      await clearAnnouncement();
    } catch (e) {
      console.error('Error clearing announcement:', e);
    }
    setSendingAnnouncement(false);
  };

  const tabs = [
    { name: 'Keys', icon: Key },         // Tab 0: License Keys + Users (merged)
    { name: 'Stats', icon: Activity },   // Tab 1: Stats + Analytics (merged)  
    { name: 'Logs', icon: FileText },    // Tab 2: Activity Logs + Error Logs (merged)
    { name: 'Announce', icon: Megaphone }, // Tab 3: Announcements
  ];

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [keys, allUsers] = await Promise.all([
          fetchLicenseKeys(),
          getAllUsers()
        ]);
        setLicenseKeys(keys);
        setUsers(allUsers);
      } catch (e) {
        console.error('Error loading admin data:', e);
      }
      setLoading(false);
    };
    loadData();
  }, [statsRefresh]);

  // Subscribe to activity logs
  useEffect(() => {
    const unsub = subscribeToActivityLogs(setActivityLogs, 100);
    return () => unsub && unsub();
  }, []);

  // Subscribe to error logs (Phase 4)
  useEffect(() => {
    const unsub = subscribeToErrorLogs(setErrorLogs, 100);
    return () => unsub && unsub();
  }, []);

  // Load analytics data (Phase 5)
  useEffect(() => {
    const loadAnalytics = async () => {
      const lb = await getUserLeaderboard();
      const ph = await getPeakHoursData();
      setLeaderboard(lb);
      setPeakHours(ph);
    };
    loadAnalytics();
  }, []);

  const resetForm = () => {
    setKeyForm({ key: '', name: '', daysActive: 30, isAdmin: false, isTester: false, maxDevices: 1, fixedExpiry: '' });
    setShowCreateKey(false);
    setEditingKey(null);
  };

  const startEdit = (k) => {
    setEditingKey(k.key);
    setKeyForm({
      key: k.key,
      name: k.name,
      daysActive: k.daysActive || 30,
      isAdmin: k.isAdmin || false,
      isTester: k.isTester || false,
      maxDevices: k.maxDevices || (k.unlimitedDevices ? 999 : 1),
      fixedExpiry: k.fixedExpiry ? k.fixedExpiry.split('T')[0] : ''
    });
    setShowCreateKey(true);
  };

  const handleSaveKey = async () => {
    if (!keyForm.key.trim() || !keyForm.name.trim()) return;
    setSaving(true);
    try {
      const dataToSave = {
        ...keyForm,
        fixedExpiry: keyForm.fixedExpiry ? new Date(keyForm.fixedExpiry).toISOString() : null
      };

      if (editingKey) {
        await updateLicenseKey(editingKey, dataToSave);
      } else {
        await createLicenseKey(dataToSave);
      }
      resetForm();
      setStatsRefresh(r => r + 1);
    } catch (e) {
      console.error('Error saving key:', e);
    }
    setSaving(false);
  };

  const handleDeleteKey = async () => {
    if (!confirmDelete) return;
    try {
      await deleteLicenseKey(confirmDelete);
      setConfirmDelete(null);
      setStatsRefresh(r => r + 1); // Refresh data
    } catch (e) {
      showToast('Error deleting key: ' + e.message, 'error');
    }
  };

  const generateRandomKey = () => {
    const prefix = 'B29';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setNewKey(prev => ({ ...prev, key: `${prefix}-${random}` }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/60" onClick={onClose}>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }}
        className="absolute right-0 top-0 h-full w-full max-w-lg bg-[var(--surface-solid)] shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="font-bold text-[var(--text)]">Admin Dashboard</h2>
              <p className="text-xs text-[var(--text-muted)]">{session?.userName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[var(--surface-hover)]">
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border)] shrink-0">
          {tabs.map((tab, i) => (
            <button key={tab.name} onClick={() => setActiveTab(i)}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === i ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
              <tab.icon className="w-4 h-4" />{tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* License Keys Tab */}
              {activeTab === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[var(--text)]">{licenseKeys.length} License Keys</h3>
                    <button onClick={() => { resetForm(); setShowCreateKey(true); }} className="btn btn-primary text-sm py-2">
                      <Plus className="w-4 h-4" />Buat Key
                    </button>
                  </div>

                  {/* Create/Edit Key Form */}
                  <AnimatePresence>
                    {showCreateKey && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden glass-card p-4 space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-[var(--text)]">{editingKey ? '✏️ Edit Key' : '➕ Buat Key Baru'}</h4>
                        </div>
                        <div className="flex gap-2">
                          <input value={keyForm.key} onChange={e => setKeyForm(prev => ({ ...prev, key: e.target.value.toUpperCase() }))}
                            placeholder="License Key" className="input flex-1" disabled={!!editingKey} />
                          {!editingKey && (
                            <button onClick={() => {
                              const prefix = 'B29';
                              const random = Math.random().toString(36).substring(2, 8).toUpperCase();
                              setKeyForm(prev => ({ ...prev, key: `${prefix}-${random}` }));
                            }} className="btn btn-secondary p-2" title="Generate Random">
                              <Zap className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <input value={keyForm.name} onChange={e => setKeyForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Nama Pemilik" className="input" />

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-[var(--text-muted)] mb-1 block">Durasi (hari)</label>
                            <input type="number" value={keyForm.daysActive} onChange={e => setKeyForm(prev => ({ ...prev, daysActive: parseInt(e.target.value) || 30 }))}
                              className="input" min={1} />
                          </div>
                          <div>
                            <label className="text-xs text-[var(--text-muted)] mb-1 block">Max Devices</label>
                            <select value={keyForm.maxDevices} onChange={e => setKeyForm(prev => ({ ...prev, maxDevices: parseInt(e.target.value) }))}
                              className="input">
                              <option value={1}>1 device</option>
                              <option value={2}>2 devices</option>
                              <option value={3}>3 devices</option>
                              <option value={4}>4 devices</option>
                              <option value={5}>5 devices</option>
                              <option value={6}>6 devices</option>
                              <option value={7}>7 devices</option>
                              <option value={8}>8 devices</option>
                              <option value={9}>9 devices</option>
                              <option value={10}>10 devices</option>
                              <option value={999}>∞ Unlimited</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-[var(--text-muted)] mb-1 block">Tanggal Expire (opsional, override durasi)</label>
                          <input type="date" value={keyForm.fixedExpiry} onChange={e => setKeyForm(prev => ({ ...prev, fixedExpiry: e.target.value }))}
                            className="input" />
                        </div>

                        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <input type="checkbox" checked={keyForm.isAdmin} onChange={e => setKeyForm(prev => ({ ...prev, isAdmin: e.target.checked }))}
                            className="w-4 h-4 rounded" />Admin Access
                        </label>
                        <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <input type="checkbox" checked={keyForm.isTester} onChange={e => setKeyForm(prev => ({ ...prev, isTester: e.target.checked }))}
                            className="w-4 h-4 rounded" />Tester Badge
                        </label>

                        <div className="flex gap-2 pt-2">
                          <button onClick={resetForm} className="btn btn-secondary flex-1">Batal</button>
                          <button onClick={handleSaveKey} disabled={saving || !keyForm.key || !keyForm.name} className="btn btn-primary flex-1">
                            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (editingKey ? 'Update' : 'Simpan')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Keys List */}
                  <div className="space-y-2">
                    {licenseKeys.map(k => {
                      const user = users.find(u => u.licenseKey === k.key);
                      const expiryDate = user?.expiry ? new Date(user.expiry) : (k.fixedExpiry ? new Date(k.fixedExpiry) : null);
                      const isExpired = expiryDate && expiryDate < new Date();
                      const deviceCount = user?.deviceIds?.length || (user?.deviceId ? 1 : 0);

                      return (
                        <div key={k.key} className="glass-card p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <code className="text-sm font-mono text-[var(--accent)]">{k.key}</code>
                              {k.isAdmin && <span className="badge text-[10px] bg-red-500/15 text-red-500 border-0">Admin</span>}
                              <span className="badge text-[10px] bg-blue-500/15 text-blue-500 border-0">{(k.maxDevices || 1) >= 999 ? '∞' : k.maxDevices || 1}📱</span>
                              {isExpired && <span className="badge text-[10px] bg-red-500/15 text-red-500 border-0">Expired</span>}
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => startEdit(k)} className="p-2 text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg" title="Edit">
                                <Settings className="w-4 h-4" />
                              </button>
                              <button onClick={() => setResetDevicesKey(k.key)} className="p-2 text-orange-500 hover:bg-orange-500/10 rounded-lg" title="Reset Devices">
                                <RotateCcw className="w-4 h-4" />
                              </button>
                              <button onClick={() => setConfirmDelete(k.key)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            <span className="font-medium">{k.name}</span>
                            <span className="mx-2">•</span>
                            <span>{k.daysActive} hari</span>
                            {k.isTester && <span className="mx-2 text-[10px] px-1.5 py-0.5 bg-amber-500/15 text-amber-500 rounded">Tester</span>}
                            {deviceCount > 0 && <span className="mx-2">• {deviceCount}/{(k.maxDevices || 1) >= 999 ? '∞' : k.maxDevices || 1} device</span>}
                          </div>
                          {expiryDate && (
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                              📅 Expire: {expiryDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              {user?.activatedAt && <span className="ml-2">| Aktif: {new Date(user.activatedAt).toLocaleDateString('id-ID')}</span>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Users Tab - now part of Keys tab */}
              {activeTab === 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-[var(--text)]">{users.length} Users Terdaftar</h3>
                  {users.map(u => {
                    const isExpired = u.expiry && new Date(u.expiry) < new Date();
                    const lk = licenseKeys.find(k => k.key === u.licenseKey);
                    const isSuspended = lk?.suspendedUntil && new Date(lk.suspendedUntil) > new Date();
                    return (
                      <div key={u.licenseKey} className="glass-card p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[var(--text)]">{u.userName}</span>
                            {isSuspended && <span className="badge text-[10px] bg-orange-500/15 text-orange-500 border-0">🚫 Suspended</span>}
                            {isExpired ? (
                              <span className="badge text-[10px] bg-red-500/15 text-red-500 border-0">Expired</span>
                            ) : (
                              <span className="badge text-[10px] bg-green-500/15 text-green-500 border-0">Active</span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mb-2">
                          <code className="text-[var(--accent)]">{u.licenseKey}</code>
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-[var(--text-muted)] mb-2">
                          <span>📅 {u.expiry ? new Date(u.expiry).toLocaleDateString('id-ID') : '-'}</span>
                          {u.referralCode && <span>🎁 {u.referralCount || 0} referral</span>}
                          {u.email && <span>✉️ {u.email}</span>}
                        </div>
                        {/* SUSPEND/UNSUSPEND BUTTON - HIGHLY VISIBLE */}
                        <button
                          onClick={() => isSuspended ? unsuspendLicense(u.licenseKey).then(() => setStatsRefresh(r => r + 1)) : setSuspendModal({ key: u.licenseKey, name: u.userName })}
                          className={`w-full py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${isSuspended ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30'}`}
                        >
                          {isSuspended ? <><Check className="w-4 h-4" /> Unsuspend User</> : <><XCircle className="w-4 h-4" /> Suspend User</>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-4 text-center">
                      <p className="text-3xl font-bold gradient-text">{licenseKeys.length}</p>
                      <p className="text-xs text-[var(--text-muted)]">Total Keys</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-3xl font-bold gradient-text">{users.length}</p>
                      <p className="text-xs text-[var(--text-muted)]">Users Registered</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-3xl font-bold text-green-500">{users.filter(u => !u.expiry || new Date(u.expiry) > new Date()).length}</p>
                      <p className="text-xs text-[var(--text-muted)]">Valid Today</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                      <p className="text-3xl font-bold text-purple-500">{users.reduce((acc, u) => acc + (u.referralCount || 0), 0)}</p>
                      <p className="text-xs text-[var(--text-muted)]">Referrals</p>
                    </div>
                  </div>

                  <button onClick={() => setStatsRefresh(r => r + 1)} className="btn btn-secondary w-full">
                    <RotateCcw className="w-4 h-4" />Refresh Data
                  </button>

                  {/* Danger Zone */}
                  <div className="mt-6 pt-4 border-t border-red-500/30">
                    <h4 className="text-sm font-medium text-red-500 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />Danger Zone
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setDangerAction('clearUsers')}
                        disabled={actionLoading}
                        className="w-full py-2 px-3 bg-orange-500/15 border border-orange-500/30 rounded-xl text-orange-500 text-sm font-medium hover:bg-orange-500/25 transition-colors disabled:opacity-50"
                      >
                        🧹 Clear All Users Data
                      </button>
                      <button
                        onClick={() => setDangerAction('resetKeys')}
                        disabled={actionLoading}
                        className="w-full py-2 px-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-500 text-sm font-medium hover:bg-red-500/25 transition-colors disabled:opacity-50"
                      >
                        🔄 Reset License Keys to Defaults
                      </button>
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] mt-2">
                      Clear Users: Menghapus data aktivasi. Reset Keys: Menghapus semua keys dan membuat ulang ADMIN1, TESTER01, TESTER02.
                    </p>
                  </div>
                </div>
              )}

              {/* Announce Tab */}
              {activeTab === 3 && (
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <h4 className="font-medium text-[var(--text)] mb-3 flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-[var(--accent)]" />
                      Kirim Pengumuman
                    </h4>

                    {/* Templates */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {announcementTemplates.map((t, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setAnnouncementText(t.text);
                            setAnnouncementType(t.type);
                          }}
                          className="px-2 py-1 text-xs bg-[var(--surface-hover)] hover:bg-[var(--accent-soft)] text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-lg transition-colors"
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* Type selector */}
                    <div className="flex gap-2 mb-3">
                      {['info', 'warning', 'maintenance'].map(t => (
                        <button
                          key={t}
                          onClick={() => setAnnouncementType(t)}
                          className={`px-3 py-1 text-xs rounded-lg transition-colors ${announcementType === t
                            ? t === 'info' ? 'bg-blue-500/20 text-blue-500' :
                              t === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                                'bg-red-500/20 text-red-500'
                            : 'bg-[var(--surface-hover)] text-[var(--text-muted)]'
                            }`}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Text input */}
                    <textarea
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      placeholder="Ketik pesan pengumuman..."
                      className="w-full p-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] resize-none outline-none focus:border-[var(--accent)]"
                      rows={4}
                    />

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleSendAnnouncement}
                        disabled={sendingAnnouncement || !announcementText.trim()}
                        className="btn btn-primary flex-1 disabled:opacity-50"
                      >
                        {sendingAnnouncement ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span>Kirim</span>
                      </button>
                      <button
                        onClick={handleClearAnnouncement}
                        disabled={sendingAnnouncement}
                        className="btn btn-secondary disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] text-center">
                    Pengumuman akan muncul sebagai popup di semua user yang sedang online.
                  </p>
                </div>
              )}

              {/* Activity Logs Tab - now part of Logs tab */}
              {activeTab === 2 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-[var(--text)]">Activity Logs (Terbaru)</h3>
                  {activityLogs.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)] text-center py-4">Belum ada aktivitas.</p>
                  ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {activityLogs.map(log => (
                        <div key={log.id} className="glass-card p-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-[var(--text)]">{log.userName}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                          </div>
                          <div className="text-[var(--text-secondary)]">
                            <span className="font-mono text-xs px-1 py-0.5 bg-[var(--accent)]/15 rounded">{log.action}</span>
                            {log.details && <span className="ml-2">{log.details}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Error Logs Tab - now part of Logs tab */}
              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[var(--text)]">Error Logs</h3>
                    <div className="flex gap-2">
                      <select
                        value={errorFilter}
                        onChange={(e) => setErrorFilter(e.target.value)}
                        className="input text-sm py-1 px-2"
                      >
                        <option value="all">Semua</option>
                        <option value="unresolved">Belum Diperbaiki</option>
                        <option value="resolved">Sudah Diperbaiki</option>
                      </select>
                      <button
                        onClick={async () => {
                          setClearingLogs(true);
                          const cleared = await clearOldErrorLogs(7);
                          setClearingLogs(false);
                          alert(cleared > 0 ? `${cleared} logs lama (>7 hari) dihapus` : 'Tidak ada logs yang lebih dari 7 hari');
                        }}
                        disabled={clearingLogs}
                        className="btn btn-secondary text-xs py-1 px-2"
                      >
                        {clearingLogs ? '...' : 'Hapus >7 hari'}
                      </button>
                      <button
                        onClick={async () => {
                          const unresolved = errorLogs.filter(l => !l.resolved);
                          for (const log of unresolved) {
                            await markErrorResolved(log.id);
                          }
                          alert(`${unresolved.length} errors marked as resolved`);
                        }}
                        className="btn btn-secondary text-xs py-1 px-2"
                      >
                        ✓ All Resolved
                      </button>
                    </div>
                  </div>
                  {errorLogs.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)] text-center py-4">✅ Tidak ada error logs.</p>
                  ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {errorLogs
                        .filter(log => {
                          if (errorFilter === 'resolved') return log.resolved;
                          if (errorFilter === 'unresolved') return !log.resolved;
                          return true;
                        })
                        .map(log => (
                          <div key={log.id} className={`glass-card p-3 text-sm ${log.resolved ? 'opacity-60' : ''}`}>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${log.message?.includes('crash') || log.message?.includes('fatal')
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-amber-500/20 text-amber-500'
                                    }`}>
                                    {log.message?.includes('crash') || log.message?.includes('fatal') ? 'CRITICAL' : 'WARNING'}
                                  </span>
                                  <span className="text-[10px] text-[var(--text-muted)]">
                                    {new Date(log.timestamp).toLocaleString('id-ID')}
                                  </span>
                                  {log.resolved && <Check className="w-3 h-3 text-green-500" />}
                                </div>
                                <p className="text-[var(--text)] font-mono text-xs break-all">{log.message}</p>
                                {log.stack && (
                                  <details className="mt-1">
                                    <summary className="text-[10px] text-[var(--text-muted)] cursor-pointer">Stack trace</summary>
                                    <pre className="text-[9px] text-[var(--text-muted)] mt-1 p-2 bg-black/20 rounded overflow-x-auto">{log.stack}</pre>
                                  </details>
                                )}
                              </div>
                              {!log.resolved && (
                                <button
                                  onClick={() => markErrorResolved(log.id)}
                                  className="btn btn-secondary text-[10px] py-1 px-2 shrink-0"
                                >
                                  ✓ Resolved
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Analytics Tab - now part of Stats tab */}
              {activeTab === 1 && (
                <div className="space-y-6">
                  {/* Leaderboard */}
                  <div>
                    <h3 className="font-medium text-[var(--text)] mb-3 flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-500" /> Leaderboard
                    </h3>
                    {leaderboard.length === 0 ? (
                      <p className="text-sm text-[var(--text-muted)] text-center py-4">Belum ada data.</p>
                    ) : (
                      <div className="space-y-2">
                        {leaderboard.slice(0, 10).map((user, i) => (
                          <div key={user.licenseKey} className="glass-card p-3 flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-amber-500 text-white' :
                              i === 1 ? 'bg-gray-400 text-white' :
                                i === 2 ? 'bg-amber-700 text-white' :
                                  'bg-[var(--surface)] text-[var(--text-muted)]'
                              }`}>{i + 1}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[var(--text)]">{user.userName}</p>
                              <p className="text-[10px] text-[var(--text-muted)]">
                                Quiz: {user.totalScore} pts | Online: {Math.round(user.onlineMinutes / 60)}h
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Peak Hours Chart */}
                  <div>
                    <h3 className="font-medium text-[var(--text)] mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[var(--accent)]" /> Jam Tersibuk
                    </h3>
                    <div className="glass-card p-4">
                      <div className="flex items-end gap-1 h-24">
                        {peakHours.map((count, hour) => {
                          const maxCount = Math.max(...peakHours, 1);
                          const height = (count / maxCount) * 100;
                          return (
                            <div key={hour} className="flex-1 flex flex-col items-center">
                              <div
                                className="w-full bg-[var(--accent)] rounded-t transition-all"
                                style={{ height: `${height}%`, minHeight: count > 0 ? '4px' : '0' }}
                                title={`${hour}:00 - ${count} sesi`}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-1 text-[8px] text-[var(--text-muted)]">
                        <span>00</span>
                        <span>06</span>
                        <span>12</span>
                        <span>18</span>
                        <span>23</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Delete Key Confirmation */}
        <ConfirmModal
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={handleDeleteKey}
          title="Hapus License Key"
          message={`Yakin ingin menghapus key ${confirmDelete}? User yang menggunakan key ini tidak akan bisa login lagi.`}
        />

        {/* Reset Devices Confirmation */}
        <ConfirmModal
          isOpen={!!resetDevicesKey}
          onClose={() => setResetDevicesKey(null)}
          onConfirm={async () => {
            await resetLicenseDevices(resetDevicesKey);
            setStatsRefresh(p => p + 1);
            setResetDevicesKey(null);
          }}
          title="🔄 Reset Devices"
          message={`Reset semua devices untuk key ${resetDevicesKey}? User harus login ulang dari device baru.`}
        />

        {/* Danger Action Confirmation */}
        <ConfirmModal
          isOpen={!!dangerAction}
          onClose={() => !actionLoading && setDangerAction(null)}
          onConfirm={async () => {
            setActionLoading(true);
            try {
              if (dangerAction === 'clearUsers') {
                await clearAllUserData();
              } else if (dangerAction === 'resetKeys') {
                await resetLicenseKeysToDefaults();
              }
              setStatsRefresh(r => r + 1);
              setDangerAction(null);
            } catch (e) {
              console.error('Danger action error:', e);
            }
            setActionLoading(false);
          }}
          title={dangerAction === 'clearUsers' ? '⚠️ Hapus Semua Data User' : '⚠️ Reset License Keys'}
          message={dangerAction === 'clearUsers'
            ? 'PERINGATAN: Ini akan menghapus SEMUA data aktivasi user (referral, email, dll). Semua user harus login ulang. Tindakan ini tidak bisa dibatalkan!'
            : 'PERINGATAN: Ini akan menghapus SEMUA license keys dan membuat ulang 3 key default (ADMIN1, TESTER01, TESTER02). Keys yang dibuat manual akan hilang!'}
        />

        {/* Suspend Modal */}
        <AnimatePresence>
          {suspendModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[700] flex items-center justify-center p-4" onClick={() => setSuspendModal(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[var(--surface-solid)] p-5 rounded-2xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <h3 className="font-bold text-[var(--text)] mb-3">Suspend User</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Suspend <strong>{suspendModal.name}</strong> ({suspendModal.key}) selama berapa menit?
                </p>
                <select value={suspendMinutes} onChange={e => setSuspendMinutes(Number(e.target.value))} className="input w-full mb-4">
                  <option value={30}>30 menit</option>
                  <option value={60}>1 jam</option>
                  <option value={180}>3 jam</option>
                  <option value={1440}>1 hari</option>
                  <option value={10080}>1 minggu</option>
                  <option value={43200}>1 bulan</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={() => setSuspendModal(null)} className="btn btn-secondary flex-1">Batal</button>
                  <button onClick={async () => { await suspendLicense(suspendModal.key, suspendMinutes); setStatsRefresh(r => r + 1); setSuspendModal(null); }} className="btn btn-primary flex-1 bg-orange-500 hover:bg-orange-600">Suspend</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
