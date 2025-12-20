import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, TrendingUp, Users, Monitor, Briefcase, FileText, List, Layers, ClipboardCheck, ChevronLeft, Eye, EyeOff, MessageCircle, Sun, Moon, Play, Pause, RotateCcw, Check, X, Timer, Key, ArrowRight, Settings, Palette, Type, Sparkles, Clock, BookOpen, MessageSquare, Plus, Trash2, Send, ChevronDown, ChevronUp, User, XCircle, Calendar, StickyNote, Headphones, Bell, BellRing, Reply, AlertTriangle, Image } from 'lucide-react';
import DB from './db';
import { validateLicenseWithDevice, setupPresence, updatePresence, subscribeToPresence, subscribeToThreads, createThread, deleteThread, closeThread, subscribeToComments, addComment, deleteComment, addReply, uploadImage, getDeviceId } from './firebase';

const iconMap = { TrendingUp, Users, Monitor, Briefcase };
const smooth = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

const themeColors = [
  { id: 'blue', name: 'Blue', color: '#3b82f6' },
  { id: 'indigo', name: 'Indigo', color: '#6366f1' },
  { id: 'violet', name: 'Violet', color: '#8b5cf6' },
  { id: 'rose', name: 'Rose', color: '#f43f5e' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'amber', name: 'Amber', color: '#f59e0b' },
];

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'outfit', name: 'Outfit' },
  { id: 'poppins', name: 'Poppins' },
];

const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

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

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') !== 'false');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'blue');
  const [font, setFont] = useState(() => localStorage.getItem('font') || 'inter');
  const [session, setSession] = useState(null);
  const [view, setView] = useState('login');
  const [selectedClass, setSelectedClass] = useState('');
  const [currentSubject, setCurrentSubject] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem('studyProgress') || '{}'));
  const [pomo, setPomo] = useState({ time: 25 * 60, active: false });
  const [showSettings, setShowSettings] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reminder, setReminder] = useState(() => localStorage.getItem('studyReminder') || '');
  const [showReminder, setShowReminder] = useState(false);
  const [reminderActive, setReminderActive] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font', font);
    localStorage.setItem('dark', dark);
    localStorage.setItem('theme', theme);
    localStorage.setItem('font', font);
  }, [dark, theme, font]);

  useEffect(() => {
    const s = localStorage.getItem('session');
    if (s) { const d = JSON.parse(s); setSession(d); setSelectedClass(d.selectedClass || ''); setView(d.selectedClass ? 'dashboard' : 'class'); }
  }, []);

  useEffect(() => { localStorage.setItem('studyProgress', JSON.stringify(progress)); }, [progress]);

  useEffect(() => {
    if (!pomo.active) return;
    const i = setInterval(() => setPomo(p => p.time <= 1 ? { time: 25 * 60, active: false } : { ...p, time: p.time - 1 }), 1000);
    return () => clearInterval(i);
  }, [pomo.active]);

  // Realtime clock & reminder check
  const [showReminderAlert, setShowReminderAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      // Check reminder
      if (reminder && !reminderActive) {
        const [h, m] = reminder.split(':').map(Number);
        if (now.getHours() === h && now.getMinutes() === m) {
          setReminderActive(true);
          setShowReminderAlert(true);

          // Play beep sound
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
          } catch (e) { console.log('Audio not supported'); }

          // Vibrate if supported
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

          // Browser notification
          if (Notification.permission === 'granted') {
            new Notification('🔔 Waktunya Belajar!', { body: 'Reminder belajar UAS sudah aktif!', icon: '/vite.svg' });
          }
        }
      }
      // Reset reminder active after 1 minute
      if (reminderActive && new Date().getSeconds() === 0) {
        setReminderActive(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [reminder, reminderActive]);

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
    setupPresence(userId, session.userName, currentSubject?.id);
    const unsub = subscribeToPresence(setOnlineUsers);
    return () => unsub();
  }, [session, currentSubject]);

  // Update presence when subject changes
  useEffect(() => {
    if (!session) return;
    const userId = getDeviceId();
    updatePresence(userId, { currentSubject: currentSubject?.id || null });
  }, [session, currentSubject]);

  // Content protection
  useEffect(() => {
    if (!session) return;
    const prevent = (e) => e.preventDefault();
    const keyH = (e) => { if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'p'].includes(e.key.toLowerCase())) e.preventDefault(); };
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('keydown', keyH);
    return () => { document.removeEventListener('contextmenu', prevent); document.removeEventListener('keydown', keyH); };
  }, [session]);

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
      total += (content.materi?.length || 0) + (content.kisiKisi?.length || 0);
      const subjectProgress = progress[subjectId] || {};
      completed += (subjectProgress.materi?.length || 0) + (subjectProgress.kisiKisi?.length || 0);
    });
    return total > 0 ? (completed / total) * 100 : 0;
  }, [progress]);

  const logout = () => { localStorage.removeItem('session'); setSession(null); setView('login'); setSelectedClass(''); };

  if (view === 'login') return <Login dark={dark} setDark={setDark} onSuccess={(d) => { setSession(d); localStorage.setItem('session', JSON.stringify(d)); setView('class'); }} />;

  if (view === 'class') return (
    <div className={`min-h-screen no-select ${dark ? 'dark' : ''}`} style={{ background: 'var(--bg)' }}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={smooth} className="glass-strong p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={smooth} className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg glow">
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-xl font-bold text-[var(--text)]">Pilih Kelas Anda</h2>
            <p className="text-[var(--text-secondary)] text-sm mt-2">Jadwal ujian akan menyesuaikan</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6 stagger">
            {DB.classes.map(c => (
              <motion.button key={c} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedClass(c)}
                className={`p-4 rounded-xl text-sm font-medium transition-all animate-slide-up ${selectedClass === c ? 'gradient-accent text-white shadow-lg glow' : 'glass-card text-[var(--text)]'}`}>{c}</motion.button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={!selectedClass}
            onClick={() => { const u = { ...session, selectedClass }; setSession(u); localStorage.setItem('session', JSON.stringify(u)); setView('dashboard'); }}
            className="btn btn-primary w-full text-base disabled:opacity-40"><span>Lanjutkan</span><ArrowRight className="w-5 h-5" /></motion.button>
        </motion.div>
      </div>
      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );

  return (
    <div className={`min-h-screen no-select ${dark ? 'dark' : ''}`} style={{ background: 'var(--bg)' }}>
      <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentSubject && (
              <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => { setCurrentSubject(null); setActiveTab(0); }} className="p-2 rounded-xl hover:bg-[var(--surface-hover)] transition-all">
                <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
              </motion.button>
            )}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 gradient-accent rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-[var(--text)]">UAS BM B29</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Clock + Reminder Card */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-card">
              <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="text-xs font-medium text-[var(--text)] tabular-nums">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="w-px h-4 bg-[var(--border)]" />
              <button onClick={() => setShowReminder(true)} className={`p-1 rounded-lg hover:bg-[var(--surface-hover)] transition-all relative ${reminder ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                {reminder ? <BellRing className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                {reminder && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />}
              </button>
            </div>
            {/* Pomodoro Card */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl glass-card">
              <Timer className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--text)] tabular-nums">{formatTime(pomo.time)}</span>
              <button onClick={() => setPomo(p => ({ ...p, active: !p.active }))} className={`p-1 rounded-lg ${pomo.active ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
                {pomo.active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setPomo({ time: 25 * 60, active: false })} className="p-1 rounded-lg text-[var(--text-muted)]">
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
            <button onClick={() => setShowSettings(true)} className="p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all"><Settings className="w-5 h-5 text-[var(--text-secondary)]" /></button>
            <button onClick={() => setDark(!dark)} className="p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-all">
              {dark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[var(--accent)]" />}
            </button>
            <button onClick={logout} className="btn-ghost text-sm">Keluar</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          {!currentSubject ? (
            <motion.div key="d" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={smooth}>
              <Dashboard session={session} selectedClass={selectedClass} overallProgress={getOverallProgress()} onSelect={setCurrentSubject} progress={progress} onlineUsers={onlineUsers} schedules={DB.schedules} />
            </motion.div>
          ) : (
            <motion.div key="s" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={smooth}>
              <SubjectView subject={currentSubject} activeTab={activeTab} setActiveTab={setActiveTab} progress={progress} updateProgress={updateProgress} session={session} selectedClass={selectedClass} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setShowSettings(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="modal p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[var(--text)]">Pengaturan</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-xl hover:bg-[var(--surface-hover)]"><X className="w-5 h-5" /></button>
              </div>
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
              <p className="text-[var(--text-secondary)] text-sm mb-4">Set waktu untuk mengingatkan Anda belajar. Notifikasi akan muncul pada waktu yang ditentukan.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">Waktu Reminder</label>
                  <input
                    type="time"
                    value={reminder}
                    onChange={(e) => {
                      setReminder(e.target.value);
                      localStorage.setItem('studyReminder', e.target.value);
                    }}
                    className="input text-center text-lg"
                  />
                </div>
                {reminder && (
                  <div className="p-3 bg-[var(--accent-soft)] rounded-xl text-center">
                    <p className="text-sm text-[var(--accent)] font-medium">🔔 Reminder aktif: {reminder}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {reminder && (
                    <button
                      onClick={() => {
                        setReminder('');
                        localStorage.removeItem('studyReminder');
                        setShowReminder(false);
                      }}
                      className="btn btn-secondary flex-1"
                    >
                      Hapus Reminder
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowReminder(false)}
                    className="btn btn-primary flex-1"
                  >
                    Simpan
                  </motion.button>
                </div>
              </div>
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg glass-strong border border-[var(--border)]">
            <Headphones className="w-6 h-6 text-[var(--text)]" />
          </motion.div>
        </div>
      </a>
      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );
}

function Login({ dark, setDark, onSuccess }) {
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true); setError('');
    try {
      const r = await validateLicenseWithDevice(key, DB.licenseKeys);
      if (r.valid) onSuccess({ ...r.license, key });
      else setError(r.error);
    } catch (err) {
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
            <h1 className="text-2xl font-bold gradient-text">UAS BM B29 Prep</h1>
            <p className="text-[var(--text-secondary)] mt-2">Platform Belajar Premium</p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block"><Key className="w-4 h-4 inline mr-2" />License Key</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={key} onChange={(e) => setKey(e.target.value.toUpperCase())} placeholder="Masukkan license key" className="input pr-12" autoComplete="off" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--danger)] text-sm flex items-center gap-2"><XCircle className="w-4 h-4" />{error}</motion.p>}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading || !key.trim()} className="btn btn-primary w-full text-base">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Masuk</span><ArrowRight className="w-5 h-5" /></>}
            </motion.button>
          </form>
          <div className="mt-6 pt-5 border-t border-[var(--border)] text-center">
            <p className="text-[var(--text-muted)] text-sm mb-3">Belum punya license?</p>
            <a href="https://wa.me/6287839256171" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline">
              <MessageCircle className="w-4 h-4" />Hubungi Admin
            </a>
          </div>
        </div>
      </motion.div>
      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );
}

function Dashboard({ session, selectedClass, overallProgress, onSelect, progress, onlineUsers, schedules }) {
  const name = session?.userName || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam';
  const classSchedule = schedules[selectedClass] || schedules['Other'] || {};

  const getSubjectProgress = (subjectId) => {
    const content = DB.content[subjectId];
    const subjectProgress = progress[subjectId] || {};
    const total = (content.materi?.length || 0) + (content.kisiKisi?.length || 0);
    const completed = (subjectProgress.materi?.length || 0) + (subjectProgress.kisiKisi?.length || 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }) + ' ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="animate-fade">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={smooth} className="glass-strong p-6 sm:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <CircularProgress value={overallProgress} size={120} stroke={10} />
          <div className="text-center md:text-left flex-1">
            <p className="text-[var(--text-secondary)] mb-1">{greeting},</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2 flex items-center gap-2 justify-center md:justify-start">
              {name}!
              {session?.isAdmin && <span className="text-xs px-2 py-0.5 bg-red-500/15 text-red-500 rounded-md font-semibold">Admin</span>}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base">Kelas {selectedClass} • Progress <span className="font-bold gradient-text">{Math.round(overallProgress)}%</span></p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="badge badge-accent"><BookOpen className="w-3 h-3" />{DB.subjects.length} Mata Kuliah</span>
              {onlineUsers.length > 0 && <span className="badge badge-success"><span className="online-dot mr-1" />{onlineUsers.length} Online</span>}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two Column Grid: Online Users & Schedule */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Online Users */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="online-dot" />
            <span className="text-sm font-medium text-[var(--text)]">Sedang Belajar</span>
          </div>
          {onlineUsers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {onlineUsers.map((u, i) => (
                <motion.span key={u.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="inline-flex items-center gap-2 px-3 py-1.5 surface-flat rounded-full text-xs sm:text-sm">
                  <div className="avatar avatar-sm text-xs">{u.userName?.charAt(0) || '?'}</div>
                  <span className="text-[var(--text)]">{u.userName}</span>
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-muted)] text-sm">Belum ada yang online</p>
          )}
        </div>

        {/* Exam Schedule */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--text)]">Jadwal UAS</span>
          </div>
          <div className="space-y-2 max-h-36 overflow-y-auto scrollbar-hide">
            {Object.entries(classSchedule).map(([subject, date]) => (
              <div key={subject} className="flex justify-between items-center text-xs sm:text-sm py-1">
                <span className="text-[var(--text)] truncate flex-1 mr-2">{subject.slice(0, 20)}</span>
                <span className="text-[var(--text-muted)] whitespace-nowrap">{formatDate(date)}</span>
              </div>
            ))}
          </div>
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
    </div>
  );
}

function SubjectView({ subject, activeTab, setActiveTab, progress, updateProgress, session, selectedClass }) {
  const content = DB.content[subject.id];


  const tabs = [
    { name: 'Materi', icon: FileText },
    { name: 'Rangkuman', icon: StickyNote },
    { name: 'Kisi-Kisi', icon: List },
    { name: 'Flashcards', icon: Layers },
    { name: 'Quiz & Essay', icon: ClipboardCheck },
    { name: 'Forum', icon: MessageSquare },
  ];



  return (
    <div className="animate-fade">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-1">{subject.name}</h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base">{subject.description}</p>
      </div>

      <div className="tabs mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((t, i) => (
          <button key={t.name} onClick={() => setActiveTab(i)} className={`tab text-xs sm:text-sm ${activeTab === i ? 'active' : ''}`}>
            <t.icon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" /><span className="hidden sm:inline">{t.name}</span><span className="sm:hidden">{t.name.slice(0, 4)}</span>
          </button>
        ))}
      </div>

      <div className="animate-fade">
        {activeTab === 0 && <Materi materi={content.materi} subjectId={subject.id} progress={progress} updateProgress={updateProgress} />}
        {activeTab === 1 && <Rangkuman subjectId={subject.id} />}
        {activeTab === 2 && <KisiKisi kisiKisi={content.kisiKisi} subjectId={subject.id} progress={progress} updateProgress={updateProgress} />}
        {activeTab === 3 && <Flashcards flashcards={content.flashcards} />}
        {activeTab === 4 && <QuizEssay quiz={content.quiz} essayExam={content.essayExam} />}
        {activeTab === 5 && <Forum subjectId={subject.id} session={session} selectedClass={selectedClass} />}
      </div>
    </div>
  );
}

function Rangkuman({ subjectId }) {
  const content = DB.content[subjectId];
  const rangkumanText = content?.rangkuman || 'Rangkuman untuk mata kuliah ini akan segera tersedia. Silakan cek kembali nanti.';

  return (
    <div className="glass-card p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <StickyNote className="w-5 h-5 text-[var(--accent)]" />
        <h3 className="font-bold text-[var(--text)]">Rangkuman</h3>
      </div>
      <div className="prose prose-sm max-w-none">
        <p className="text-[var(--text)] whitespace-pre-wrap leading-relaxed">{rangkumanText}</p>
      </div>
    </div>
  );
}

function Materi({ materi, subjectId, progress, updateProgress }) {
  const completed = progress[subjectId]?.materi || [];
  const mark = (id) => updateProgress(subjectId, 'materi', id);

  return (
    <div className="space-y-3 stagger">
      {materi.map(m => {
        const done = completed.includes(m.id);
        return (
          <motion.div key={m.id} className="glass-card p-4 flex items-center justify-between animate-slide-up">
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${m.type === 'PDF' ? 'bg-red-500/15 text-red-500' : 'bg-orange-500/15 text-orange-500'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-[var(--text)]">{m.title}</p>
                <p className="text-sm text-[var(--text-muted)]">{m.type}</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => mark(m.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${done ? 'bg-[var(--success)]/15 text-[var(--success)]' : 'btn-secondary'}`}>
              {done ? <><Check className="w-4 h-4 inline mr-1" />Selesai</> : 'Tandai Dibaca'}
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}

function KisiKisi({ kisiKisi, subjectId, progress, updateProgress }) {
  const completed = progress[subjectId]?.kisiKisi || [];
  const mark = (i) => updateProgress(subjectId, 'kisiKisi', i);

  return (
    <div className="glass-card divide-y divide-[var(--border)] stagger">
      {kisiKisi.map((k, i) => {
        const done = completed.includes(i);
        return (
          <motion.div key={i} className="p-4 flex items-center gap-4 animate-slide-in" style={{ animationDelay: `${i * 0.03}s` }}>
            <button onClick={() => mark(i)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${done ? 'bg-[var(--success)] border-[var(--success)]' : 'border-[var(--border-strong)] hover:border-[var(--accent)]'}`}>
              {done && <Check className="w-4 h-4 text-white" />}
            </button>
            <span className={`text-[var(--text)] ${done ? 'line-through opacity-60' : ''}`}>{k}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function Flashcards({ flashcards }) {
  const [flipped, setFlipped] = useState({});
  const toggle = (id) => setFlipped(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
      {flashcards.map(f => (
        <motion.div key={f.id} whileHover={{ scale: 1.02 }} onClick={() => toggle(f.id)} className={`flashcard h-52 animate-slide-up ${flipped[f.id] ? 'flipped' : ''}`}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <span className="text-xs text-white/60 absolute top-4 left-4 font-medium">TAP TO FLIP</span>
              <h4 className="text-lg font-bold">{f.term}</h4>
            </div>
            <div className="flashcard-back">
              <span className="text-xs text-[var(--accent)] absolute top-4 left-4 font-bold">DEFINISI</span>
              <p className="text-[var(--text)] leading-relaxed">{f.definition}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function QuizEssay({ quiz, essayExam }) {
  const [mode, setMode] = useState(null);
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(20);
  const [ans, setAns] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (mode !== 'quiz' || done || sel !== null) return;
    const t = setInterval(() => setTime(v => { if (v <= 1) { handleAns(-1); return 20; } return v - 1; }), 1000);
    return () => clearInterval(t);
  }, [mode, cur, sel, done]);

  const handleAns = (i) => { if (sel !== null) return; setSel(i); if (i === quiz[cur].answer) setScore(s => s + 1); };
  const next = () => { if (cur < quiz.length - 1) { setCur(c => c + 1); setSel(null); setTime(20); } else setDone(true); };

  if (!mode) return (
    <div className="grid sm:grid-cols-2 gap-4">
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => setMode('quiz')} className="glass-card glass-card-interactive p-8 text-center">
        <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg glow">
          <ClipboardCheck className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[var(--text)] mb-1">Quiz</h3>
        <p className="text-sm text-[var(--text-secondary)]">{quiz.length} soal pilihan ganda</p>
      </motion.button>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => setMode('essay')} className="glass-card glass-card-interactive p-8 text-center">
        <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg glow">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-[var(--text)] mb-1">Essay</h3>
        <p className="text-sm text-[var(--text-secondary)]">{essayExam.length} soal essay</p>
      </motion.button>
    </div>
  );

  if (mode === 'essay') {
    const q = essayExam[0];
    return (
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[var(--text)]">Soal Essay</h3>
          <button onClick={() => { setMode(null); setAns(''); setShowAnswer(false); }} className="btn-ghost text-sm">← Kembali</button>
        </div>
        <p className="text-[var(--text)]">{q.question}</p>
        <textarea value={ans} onChange={(e) => setAns(e.target.value)} placeholder="Tulis jawaban Anda..." className="input h-40" />
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setShowAnswer(true)} disabled={ans.length < 10 || showAnswer} className="btn btn-primary w-full">Lihat Model Jawaban</motion.button>
        {showAnswer && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-xl">
            <h4 className="font-bold text-[var(--success)] mb-2">Model Jawaban</h4>
            <p className="text-[var(--text-secondary)] text-sm">{q.modelAnswer}</p>
          </motion.div>
        )}
      </div>
    );
  }

  if (done) return (
    <div className="glass-card p-8 text-center">
      <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl glow">
        <ClipboardCheck className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-[var(--text)] mb-2">Selesai!</h3>
      <p className="text-4xl font-bold gradient-text mb-4">{score}/{quiz.length}</p>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setMode(null); setCur(0); setSel(null); setScore(0); setDone(false); setTime(20); }} className="btn btn-primary">Kembali</motion.button>
    </div>
  );

  const q = quiz[cur];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => { setMode(null); setCur(0); setSel(null); setScore(0); setDone(false); }} className="btn-ghost text-sm">← Kembali</button>
        <span className="text-[var(--text-secondary)]">{cur + 1}/{quiz.length}</span>
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
        {sel !== null && <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={next} className="btn btn-primary w-full mt-6">{cur < quiz.length - 1 ? 'Lanjut' : 'Lihat Hasil'}</motion.button>}
      </div>
    </div>
  );
}

function Forum({ subjectId, session, selectedClass }) {
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

  useEffect(() => {
    const unsub = subscribeToThreads(subjectId, setThreads);
    return () => unsub();
  }, [subjectId]);

  const handleCreate = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setCreating(true);
    try {
      let imageUrl = null;
      if (newImage) {
        imageUrl = await uploadImage(newImage, `threads/${subjectId}`);
      }
      await createThread(subjectId, newTitle, newContent, getDeviceId(), session.userName, selectedClass, imageUrl);
      setNewTitle(''); setNewContent(''); setNewImage(null); setImagePreview(null); setShowNew(false);
    } catch (e) { alert(e.message); }
    setCreating(false);
  };

  const confirmDeleteThread = async () => {
    if (!confirmDelete) return;
    try {
      await deleteThread(subjectId, confirmDelete.id);
      setSelectedThread(null);
      setConfirmDelete(null);
    } catch (e) { alert(e.message); }
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

function ThreadView({ subjectId, thread, session, selectedClass, onBack, onDelete }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // comment id
  const [replyText, setReplyText] = useState('');
  const [confirmDeleteComment, setConfirmDeleteComment] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const isOwner = thread.authorId === getDeviceId();

  useEffect(() => {
    const unsub = subscribeToComments(subjectId, thread.id, setComments);
    return () => unsub();
  }, [subjectId, thread.id]);

  const handlePost = async () => {
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      await addComment(subjectId, thread.id, newComment, getDeviceId(), session.userName, selectedClass);
      setNewComment('');
    } catch (e) { alert(e.message); }
    setPosting(false);
  };

  const handleReply = async (commentId) => {
    if (!replyText.trim()) return;
    setPosting(true);
    try {
      await addReply(subjectId, thread.id, commentId, replyText, getDeviceId(), session.userName, selectedClass);
      setReplyText('');
      setReplyingTo(null);
    } catch (e) { alert(e.message); }
    setPosting(false);
  };

  const handleDeleteComment = async () => {
    if (!confirmDeleteComment) return;
    setDeleting(true);
    try {
      await deleteComment(subjectId, thread.id, confirmDeleteComment);
      setConfirmDeleteComment(null);
    } catch (e) { alert(e.message); }
    setDeleting(false);
  };

  return (
    <div className="animate-fade">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="btn-ghost text-sm">← Kembali</button>
        {isOwner && (
          <button onClick={onDelete} className="btn-ghost text-[var(--danger)] text-sm"><Trash2 className="w-4 h-4 mr-1" />Hapus</button>
        )}
      </div>

      {/* Thread Content */}
      <div className="glass-card p-6 mb-6">
        <h2 className="text-xl font-bold text-[var(--text)] mb-2">{thread.title}</h2>
        <div className="flex items-center gap-3 mb-4 text-sm text-[var(--text-muted)]">
          <div className="avatar avatar-sm">{thread.authorName?.charAt(0) || '?'}</div>
          <span>{thread.authorName}</span>
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
        <div className="flex gap-3 mb-6">
          <div className="avatar flex-shrink-0">{session.userName?.charAt(0) || '?'}</div>
          <div className="flex-1 flex gap-2">
            <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Tulis komentar..." className="input flex-1" onKeyDown={(e) => e.key === 'Enter' && handlePost()} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePost} disabled={posting || !newComment.trim()} className="btn btn-primary">
              {posting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            </motion.button>
          </div>
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
                  {c.authorClass && <span className="class-badge text-xs">{c.authorClass}</span>}
                  <span className="text-xs text-[var(--text-muted)]">{new Date(c.createdAt).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-1">
                  {!thread.closed && (
                    <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)} className="btn-ghost text-xs p-1">
                      <Reply className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {isCommentOwner && (
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
