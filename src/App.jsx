import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, TrendingUp, Users, Monitor, Briefcase, FileText, List, Layers, ClipboardCheck, ChevronLeft, Eye, EyeOff, MessageCircle, Sun, Moon, Play, Pause, RotateCcw, Check, X, Timer, Key, ArrowRight, Settings, Palette, Type, Sparkles, Clock, BookOpen, Target } from 'lucide-react';
import DB from './db';

const iconMap = { TrendingUp, Users, Monitor, Briefcase };
const smooth = { duration: 0.25, ease: [0.4, 0, 0.2, 1] };

const themeColors = [
  { id: 'blue', name: 'Blue', color: '#3b82f6' },
  { id: 'indigo', name: 'Indigo', color: '#6366f1' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'rose', name: 'Rose', color: '#f43f5e' },
  { id: 'amber', name: 'Amber', color: '#f59e0b' },
];

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'outfit', name: 'Outfit' },
  { id: 'poppins', name: 'Poppins' },
];

const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

const validateLicense = (key) => {
  const license = DB.licenseKeys.find(l => l.key.toUpperCase() === key.toUpperCase());
  if (!license) return { valid: false, error: 'License key tidak valid' };
  const stored = localStorage.getItem(`lic_${key}`);
  if (stored) {
    const data = JSON.parse(stored);
    if (new Date(data.expiry) < new Date()) return { valid: false, error: 'License sudah expired' };
    return { valid: true, license: { ...license, ...data } };
  }
  const now = new Date();
  const data = { activated: now.toISOString(), expiry: new Date(now.getTime() + license.daysActive * 86400000).toISOString() };
  localStorage.setItem(`lic_${key}`, JSON.stringify(data));
  return { valid: true, license: { ...license, ...data } };
};

// Circular Progress Component
function CircularProgress({ value, size = 120, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="track" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} />
        <circle className="progress" cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <span className="value text-2xl">{Math.round(value)}%</span>
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
      if (sectionProgress.includes(itemId)) return prev;
      return { ...prev, [subjectId]: { ...subjectProgress, [section]: [...sectionProgress, itemId] } };
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
    <div className={`min-h-screen bg-[var(--bg)] no-select ${dark ? 'dark' : ''}`}>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={smooth} className="surface-elevated p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text)]">Pilih Kelas Anda</h2>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Jadwal ujian akan menyesuaikan</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {DB.classes.map(c => (
              <motion.button key={c} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedClass(c)}
                className={`p-4 rounded-xl text-sm font-medium transition-all ${selectedClass === c ? 'gradient-accent text-white shadow-lg' : 'surface text-[var(--text)] hover:border-[var(--border-strong)]'}`}>{c}</motion.button>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} disabled={!selectedClass}
            onClick={() => { const u = { ...session, selectedClass }; setSession(u); localStorage.setItem('session', JSON.stringify(u)); setView('dashboard'); }}
            className="btn btn-primary w-full disabled:opacity-40"><span>Lanjutkan</span><ArrowRight className="w-4 h-4" /></motion.button>
        </motion.div>
      </div>
      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[var(--bg)] no-select ${dark ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-lg border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentSubject && (
              <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => { setCurrentSubject(null); setActiveTab(0); }} className="p-2 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">
                <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
              </motion.button>
            )}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 gradient-accent rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-[var(--text)]">UAS BM B29</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--surface-alt)] border border-[var(--border)]">
              <Clock className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-sm font-medium text-[var(--text)] tabular-nums">{formatTime(pomo.time)}</span>
              <button onClick={() => setPomo(p => ({ ...p, active: !p.active }))} className={`p-1 rounded-lg ml-1 ${pomo.active ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
                {pomo.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={() => setPomo({ time: 25 * 60, active: false })} className="p-1 rounded-lg text-[var(--text-muted)]"><RotateCcw className="w-3.5 h-3.5" /></button>
            </div>
            <button onClick={() => setShowSettings(true)} className="p-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors"><Settings className="w-5 h-5 text-[var(--text-secondary)]" /></button>
            <button onClick={() => setDark(!dark)} className="p-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">
              {dark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[var(--accent)]" />}
            </button>
            <button onClick={logout} className="text-sm text-[var(--text-muted)] hover:text-[var(--danger)] px-3 py-2 transition-colors">Keluar</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          {!currentSubject ? (
            <motion.div key="d" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={smooth}>
              <Dashboard session={session} selectedClass={selectedClass} overallProgress={getOverallProgress()} onSelect={setCurrentSubject} progress={progress} />
            </motion.div>
          ) : (
            <motion.div key="s" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={smooth}>
              <SubjectView subject={currentSubject} activeTab={activeTab} setActiveTab={setActiveTab} progress={progress} updateProgress={updateProgress} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setShowSettings(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="modal p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[var(--text)]">Pengaturan Tampilan</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-xl hover:bg-[var(--surface-alt)]"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] mb-3"><Palette className="w-4 h-4" />Warna Aksen</label>
                  <div className="flex gap-3">
                    {themeColors.map(t => (
                      <motion.button key={t.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setTheme(t.id)}
                        className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${theme === t.id ? 'border-[var(--text)] scale-110' : 'border-transparent'}`}
                        style={{ background: t.color }}>{theme === t.id && <Check className="w-5 h-5 text-white" />}</motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] mb-3"><Type className="w-4 h-4" />Font</label>
                  <div className="grid grid-cols-3 gap-2">
                    {fonts.map(f => (
                      <button key={f.id} onClick={() => setFont(f.id)} className={`p-3 rounded-xl text-sm font-medium transition-all ${font === f.id ? 'gradient-accent text-white' : 'surface text-[var(--text)]'}`} style={{ fontFamily: f.name }}>{f.name}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 surface rounded-xl">
                  <span className="text-[var(--text)]">Mode Gelap</span>
                  <button onClick={() => setDark(!dark)} className={`w-12 h-7 rounded-full p-1 transition-colors ${dark ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}>
                    <motion.div layout className={`w-5 h-5 rounded-full bg-white shadow ${dark ? 'ml-auto' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <a href="https://wa.me/6287839256171" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.div>
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

  const submit = (e) => {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true); setError('');
    setTimeout(() => {
      const r = validateLicense(key);
      if (r.valid) onSuccess({ ...r.license, key });
      else setError(r.error);
      setLoading(false);
    }, 400);
  };

  return (
    <div className={`min-h-screen bg-[var(--bg)] flex items-center justify-center p-6 ${dark ? 'dark' : ''}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={smooth} className="w-full max-w-sm">
        <div className="surface-elevated p-8">
          <div className="flex justify-end mb-2">
            <button onClick={() => setDark(!dark)} className="p-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">
              {dark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[var(--accent)]" />}
            </button>
          </div>
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={smooth} className="w-20 h-20 gradient-accent rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl">
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
            {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--danger)] text-sm">{error}</motion.p>}
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={loading || !key.trim()} className="btn btn-primary w-full text-base">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Masuk</span><ArrowRight className="w-5 h-5" /></>}
            </motion.button>
          </form>
          <div className="mt-6 pt-5 border-t border-[var(--border)] text-center">
            <p className="text-[var(--text-muted)] text-sm mb-3">Belum punya license?</p>
            <a href="https://wa.me/6287839256171" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#25d366] font-medium hover:underline">
              <MessageCircle className="w-4 h-4" />Hubungi Admin
            </a>
          </div>
        </div>
      </motion.div>
      <div className="watermark">Made by haidarsb LE86</div>
    </div>
  );
}

function Dashboard({ session, selectedClass, overallProgress, onSelect, progress }) {
  const name = session?.name || 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 17 ? 'Selamat Siang' : 'Selamat Malam';

  const getSubjectProgress = (subjectId) => {
    const content = DB.content[subjectId];
    const subjectProgress = progress[subjectId] || {};
    const total = (content.materi?.length || 0) + (content.kisiKisi?.length || 0);
    const completed = (subjectProgress.materi?.length || 0) + (subjectProgress.kisiKisi?.length || 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="animate-fade">
      {/* Greeting Section */}
      <div className="surface-elevated p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <CircularProgress value={overallProgress} size={140} stroke={10} />
          <div className="text-center md:text-left flex-1">
            <p className="text-[var(--text-secondary)] mb-1">{greeting},</p>
            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">{name}!</h1>
            <p className="text-[var(--text-secondary)]">Kelas {selectedClass} • Progress belajar kamu sudah <span className="font-semibold text-[var(--accent)]">{Math.round(overallProgress)}%</span></p>
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-alt)] text-sm text-[var(--text-secondary)]">
                <BookOpen className="w-4 h-4" />{DB.subjects.length} Mata Kuliah
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-alt)] text-sm text-[var(--text-secondary)]">
                <Target className="w-4 h-4" />Siap UAS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Mata Kuliah</h2>
      <div className="grid sm:grid-cols-2 gap-4 stagger">
        {DB.subjects.map((s, i) => {
          const Icon = iconMap[s.icon];
          const subjectProg = getSubjectProgress(s.id);
          return (
            <motion.button key={s.id} whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }} onClick={() => onSelect(s)} className="surface-elevated surface-interactive p-6 text-left animate-slide">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-[var(--accent)]">{subjectProg}%</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-1">{s.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{s.description}</p>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${subjectProg}%` }} transition={{ duration: 0.6, delay: i * 0.1 }} className="h-full gradient-accent rounded-full" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function SubjectView({ subject, activeTab, setActiveTab, progress, updateProgress }) {
  const content = DB.content[subject.id];
  const tabs = [
    { name: 'Materi', icon: FileText },
    { name: 'Kisi-Kisi', icon: List },
    { name: 'Flashcards', icon: Layers },
    { name: 'Quiz & Essay', icon: ClipboardCheck },
  ];

  return (
    <div className="animate-fade">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-1">{subject.name}</h2>
        <p className="text-[var(--text-secondary)]">{subject.description}</p>
      </div>

      <div className="tabs mb-6">
        {tabs.map((t, i) => (
          <button key={t.name} onClick={() => setActiveTab(i)} className={`tab ${activeTab === i ? 'active' : ''}`}>
            <t.icon className="w-4 h-4 inline mr-2" />{t.name}
          </button>
        ))}
      </div>

      <div className="animate-fade">
        {activeTab === 0 && <Materi materi={content.materi} subjectId={subject.id} progress={progress} updateProgress={updateProgress} />}
        {activeTab === 1 && <KisiKisi kisiKisi={content.kisiKisi} subjectId={subject.id} progress={progress} updateProgress={updateProgress} />}
        {activeTab === 2 && <Flashcards flashcards={content.flashcards} />}
        {activeTab === 3 && <QuizEssay quiz={content.quiz} essayExam={content.essayExam} />}
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
          <motion.div key={m.id} className="surface p-4 flex items-center justify-between animate-slide">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.type === 'PDF' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-[var(--text)]">{m.title}</p>
                <p className="text-sm text-[var(--text-muted)]">{m.type}</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => mark(m.id)} disabled={done}
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
    <div className="surface divide-y divide-[var(--border)] stagger">
      {kisiKisi.map((k, i) => {
        const done = completed.includes(i);
        return (
          <motion.div key={i} className="p-4 flex items-center gap-4 animate-slide">
            <button onClick={() => mark(i)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${done ? 'bg-[var(--success)] border-[var(--success)]' : 'border-[var(--border-strong)]'}`}>
              {done && <Check className="w-4 h-4 text-white" />}
            </button>
            <span className={`text-[var(--text)] flex-1 ${done ? 'line-through opacity-60' : ''}`}>{k}</span>
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
      {flashcards.map((f, i) => (
        <motion.div key={f.id} whileHover={{ scale: 1.01 }} onClick={() => toggle(f.id)} className={`flashcard h-48 animate-slide ${flipped[f.id] ? 'flipped' : ''}`}>
          <div className="flashcard-inner">
            <div className="flashcard-front shadow-lg">
              <span className="text-xs text-white/60 absolute top-4 left-4">TAP TO FLIP</span>
              <h4 className="text-lg font-semibold">{f.term}</h4>
            </div>
            <div className="flashcard-back shadow-lg">
              <span className="text-xs text-[var(--accent)] absolute top-4 left-4 font-medium">DEFINISI</span>
              <p className="text-[var(--text)] text-sm leading-relaxed">{f.definition}</p>
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
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => setMode('quiz')} className="surface-elevated surface-interactive p-8 text-center">
        <div className="w-14 h-14 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ClipboardCheck className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text)] mb-1">Quiz</h3>
        <p className="text-sm text-[var(--text-secondary)]">{quiz.length} soal pilihan ganda</p>
      </motion.button>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} onClick={() => setMode('essay')} className="surface-elevated surface-interactive p-8 text-center">
        <div className="w-14 h-14 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text)] mb-1">Essay</h3>
        <p className="text-sm text-[var(--text-secondary)]">{essayExam.length} soal essay</p>
      </motion.button>
    </div>
  );

  if (mode === 'essay') {
    const q = essayExam[0];
    return (
      <div className="surface p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text)]">Soal Essay</h3>
          <button onClick={() => { setMode(null); setAns(''); setShowAnswer(false); }} className="text-sm text-[var(--text-muted)] hover:text-[var(--danger)]">← Kembali</button>
        </div>
        <p className="text-[var(--text)]">{q.question}</p>
        <textarea value={ans} onChange={(e) => setAns(e.target.value)} placeholder="Tulis jawaban Anda..." className="input h-40" />
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setShowAnswer(true)} disabled={ans.length < 10 || showAnswer} className="btn btn-primary w-full">
          Lihat Model Jawaban
        </motion.button>
        {showAnswer && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-xl">
            <h4 className="font-semibold text-[var(--success)] mb-2">Model Jawaban</h4>
            <p className="text-[var(--text-secondary)] text-sm">{q.modelAnswer}</p>
          </motion.div>
        )}
      </div>
    );
  }

  if (done) return (
    <div className="surface p-8 text-center">
      <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl">
        <ClipboardCheck className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-[var(--text)] mb-2">Selesai!</h3>
      <p className="text-4xl font-bold gradient-text mb-4">{score}/{quiz.length}</p>
      <p className="text-[var(--text-secondary)] mb-6">{score === quiz.length ? 'Sempurna! 🎉' : score >= quiz.length * 0.7 ? 'Bagus! 👍' : 'Terus berlatih!'}</p>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setMode(null); setCur(0); setSel(null); setScore(0); setDone(false); setTime(20); }} className="btn btn-primary">Kembali</motion.button>
    </div>
  );

  const q = quiz[cur];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => { setMode(null); setCur(0); setSel(null); setScore(0); setDone(false); }} className="text-sm text-[var(--text-muted)] hover:text-[var(--danger)]">← Kembali</button>
        <span className="text-[var(--text-secondary)] text-sm">{cur + 1}/{quiz.length}</span>
        <span className={`text-sm font-medium ${time <= 5 ? 'text-[var(--danger)]' : 'text-[var(--text-secondary)]'}`}><Timer className="w-4 h-4 inline mr-1" />{time}s</span>
      </div>
      <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden"><div className="timer-bar h-full rounded-full" style={{ width: `${(time / 20) * 100}%` }} /></div>
      <div className="surface p-6">
        <p className="text-[var(--text)] text-lg mb-6">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((o, i) => {
            let cls = 'surface hover:border-[var(--border-strong)]';
            if (sel !== null) { if (i === q.answer) cls = 'bg-[var(--success)]/15 border-[var(--success)]'; else if (i === sel) cls = 'bg-[var(--danger)]/15 border-[var(--danger)]'; }
            return (
              <motion.button key={i} whileHover={sel === null ? { scale: 1.01 } : {}} onClick={() => handleAns(i)} disabled={sel !== null}
                className={`w-full p-4 rounded-xl text-left border transition-all ${cls}`}>
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
