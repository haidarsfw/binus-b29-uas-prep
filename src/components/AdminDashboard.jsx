// AdminDashboard Component - Lazy loaded for code splitting
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Plus, Settings, Trash2, RotateCcw, Zap, Key, Activity, FileText, Megaphone,
    AlertTriangle, Database, Check, XCircle, Send, Crown, BarChart3, Copy, ExternalLink
} from 'lucide-react';
import {
    fetchLicenseKeys, getAllUsers, createLicenseKey, updateLicenseKey, deleteLicenseKey,
    resetLicenseDevices, sendAnnouncement, clearAnnouncement, suspendLicense, unsuspendLicense,
    subscribeToActivityLogs, subscribeToErrorLogs, clearOldErrorLogs, markErrorResolved,
    getUserLeaderboard, getPeakHoursData, clearAllUserData, resetLicenseKeysToDefaults,
    adminUpdateDisplayName, subscribeToInvoiceCounter, incrementInvoiceCounter, setInvoiceCounter
} from '../firebase';

// Simple ConfirmModal for standalone usage
function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[700] flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[var(--surface-solid)] p-5 rounded-2xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
                <h3 className="font-bold text-[var(--text)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{message}</p>
                <div className="flex gap-2">
                    <button onClick={onClose} className="btn btn-secondary flex-1">Batal</button>
                    <button onClick={onConfirm} className="btn btn-primary flex-1 bg-red-500 hover:bg-red-600">Ya, Lanjutkan</button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function AdminDashboard({ session, onClose }) {
    const [activeTab, setActiveTab] = useState(0);
    const [licenseKeys, setLicenseKeys] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateKey, setShowCreateKey] = useState(false);
    const [editingKey, setEditingKey] = useState(null);
    const [keyForm, setKeyForm] = useState({ key: '', name: '', daysActive: 30, isAdmin: false, isTester: false, maxDevices: 1, fixedExpiry: '' });
    const [saving, setSaving] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [statsRefresh, setStatsRefresh] = useState(0);
    const [dangerAction, setDangerAction] = useState(null);
    const [resetDevicesKey, setResetDevicesKey] = useState(null);
    const [activityLogs, setActivityLogs] = useState([]);
    const [suspendModal, setSuspendModal] = useState(null);
    const [suspendMinutes, setSuspendMinutes] = useState(60);
    const [actionLoading, setActionLoading] = useState(false);
    const [announcementText, setAnnouncementText] = useState('');
    const [announcementType, setAnnouncementType] = useState('info');
    const [sendingAnnouncement, setSendingAnnouncement] = useState(false);
    const [errorLogs, setErrorLogs] = useState([]);
    const [errorFilter, setErrorFilter] = useState('all');
    const [clearingLogs, setClearingLogs] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [leaderboardExpanded, setLeaderboardExpanded] = useState(false);
    const [peakHours, setPeakHours] = useState(Array(24).fill(0));
    const [dangerZoneConfirm, setDangerZoneConfirm] = useState(0);

    // Quick License Generator state
    const [quickInvoice, setQuickInvoice] = useState(90); // Synced from Firebase
    const [quickName, setQuickName] = useState('');
    const [quickWhatsApp, setQuickWhatsApp] = useState('');
    const [quickPackage, setQuickPackage] = useState('discount'); // discount, normal, free
    const [quickFreeReason, setQuickFreeReason] = useState('LE86'); // LE86, FP Kak Chantyka, User Whitelist
    const [quickDevices, setQuickDevices] = useState(1); // Device count
    const [generatedKey, setGeneratedKey] = useState('');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [quickCopied, setQuickCopied] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState(false);
    const [tempInvoice, setTempInvoice] = useState(90);

    // Subscribe to invoice counter from Firebase (real-time sync)
    useEffect(() => {
        const unsub = subscribeToInvoiceCounter((value) => {
            setQuickInvoice(value);
            setTempInvoice(value);
        });
        return () => unsub && unsub();
    }, []);

    // Package options
    const packageOptions = [
        { id: 'discount', label: 'Discount Promo (Rp. 10.000)', days: 30 },
        { id: 'normal', label: 'Normal Price (Rp. 15.000)', days: 30 },
        { id: 'free', label: 'Free (LE86/FP/Whitelist)', days: 30 },
    ];

    const freeReasons = ['LE86', 'FP Kak Chantyka', 'User Whitelist'];

    // Device options
    const deviceOptions = [1, 2, 3, 5, 10];


    // Generate key and message
    const handleQuickGenerate = async () => {
        if (!quickName.trim()) return;
        setSaving(true); // Reuse existing saving state

        const prefix = 'B29';
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newKey = `${prefix}-${random}`;

        const packageInfo = packageOptions.find(p => p.id === quickPackage);
        const packageLabel = quickPackage === 'free'
            ? `${quickFreeReason} (Free)`
            : packageInfo?.label || '';

        const today = new Date();
        const dateStr = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

        // Use current invoice for message BEFORE incrementing
        const currentInvoice = quickInvoice;

        // Create the key in Firebase with device count
        try {
            console.log('Creating license key:', newKey);
            await createLicenseKey({
                key: newKey,
                name: quickName.trim(),
                daysActive: packageInfo?.days || 30,
                isAdmin: false,
                isTester: false,
                maxDevices: quickDevices,
            });
            console.log('License key created successfully');

            setGeneratedKey(newKey);

            // Generate WhatsApp message (exact template from user)
            // Using template literal without fancy chars for better WA compatibility
            const message = `🧾 INVOICE #${String(currentInvoice).padStart(3, '0')}
UAS BM B29 Study App
Halo ${quickName.trim()}, pembayaran kamu sudah kami terima. 

Berikut detail pesananmu:
📅 Tanggal: ${dateStr}
👤 ID: ${quickName.trim()}
📦 Paket: ${packageLabel}
✅ Status: LUNAS

🔐 YOUR LICENSE KEY:
${newKey}
(Copy kode di atas)

🌍 AKSES WEBSITE:
https://uasbmb29.xyz/

⚠️ LANGKAH AKTIVASI (PENTING!):
Agar akunmu terverifikasi dan tidak kena banned, lakukan ini sekarang:
1. Buka website & masukkan License Key di atas.
2. Login menggunakan Device utama kamu (HP/Laptop).
3. Screenshot halaman utama (Dashboard) setelah berhasil masuk.
4. Kirim Screenshot-nya ke chat ini sebagai bukti validasi device.

Note: Sistem akan mengunci ID device sesuai screenshot yang dikirim.

Jangan share key ini ke orang lain ya!
Selamat belajar! 🚀`;

            setGeneratedMessage(message);

            // Increment invoice counter in Firebase (syncs to all devices)
            console.log('Incrementing invoice counter...');
            await incrementInvoiceCounter();
            console.log('Invoice incremented');

            setStatsRefresh(r => r + 1);
        } catch (e) {
            console.error('Error creating key:', e);
            alert('Error: ' + e.message);
        }
        setSaving(false);
    };

    // Save invoice number edit
    const handleSaveInvoice = async () => {
        const value = parseInt(tempInvoice) || 90;
        try {
            await setInvoiceCounter(value);
            setEditingInvoice(false);
        } catch (e) {
            console.error('Error setting invoice:', e);
            alert('Error saving invoice: ' + e.message);
        }
    };


    const copyToClipboard = async (text) => {
        await navigator.clipboard.writeText(text);
        setQuickCopied(true);
        setTimeout(() => setQuickCopied(false), 2000);
    };

    const openWhatsApp = () => {
        if (!quickWhatsApp.trim() || !generatedMessage) return;
        let phone = quickWhatsApp.replace(/\D/g, '');
        if (phone.startsWith('0')) phone = '62' + phone.slice(1);
        // Using api.whatsapp.com instead of wa.me for better unicode/emoji support
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(generatedMessage)}`;
        window.open(url, '_blank');
    };

    // Delete the just-created license key (for quick undo)
    const handleDeleteQuickKey = async () => {
        if (!generatedKey) return;
        if (!window.confirm(`Hapus license key ${generatedKey}?`)) return;

        try {
            await deleteLicenseKey(generatedKey);
            setGeneratedKey('');
            setGeneratedMessage('');
            // Don't decrement invoice - it's already used
        } catch (e) {
            console.error('Error deleting key:', e);
            alert('Error deleting key: ' + e.message);
        }
    };

    const resetQuickForm = () => {
        setQuickName('');
        setQuickWhatsApp('');
        setQuickPackage('discount');
        setQuickDevices(1);
        setGeneratedKey('');
        setGeneratedMessage('');
    };

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
        { name: 'Quick', icon: Zap },      // Quick License Generator
        { name: 'Keys', icon: Key },
        { name: 'Stats', icon: Activity },
        { name: 'Logs', icon: FileText },
        { name: 'Announce', icon: Megaphone },
        { name: 'Danger', icon: AlertTriangle },
    ];

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

    useEffect(() => {
        const unsub = subscribeToActivityLogs(setActivityLogs, 100);
        return () => unsub && unsub();
    }, []);

    useEffect(() => {
        const unsub = subscribeToErrorLogs(setErrorLogs, 100);
        return () => unsub && unsub();
    }, []);

    useEffect(() => {
        const loadAnalytics = async () => {
            const lb = await getUserLeaderboard();
            const ph = await getPeakHoursData();
            setLeaderboard(lb);
            setPeakHours(ph);
        };
        loadAnalytics();
    }, [statsRefresh]);

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
                const oldKeyData = licenseKeys.find(k => k.key === editingKey);
                const oldName = oldKeyData?.name;
                await updateLicenseKey(editingKey, dataToSave);
                if (oldName && oldName !== keyForm.name) {
                    await adminUpdateDisplayName(editingKey, oldName, keyForm.name);
                }
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
            setStatsRefresh(r => r + 1);
        } catch (e) {
            console.error('Error deleting key:', e);
        }
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
                            {/* Quick License Generator Tab */}
                            {activeTab === 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[var(--text)] flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-amber-500" />
                                            Quick License Generator
                                        </h3>
                                        {/* Editable Invoice Number */}
                                        {editingInvoice ? (
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs text-[var(--text-muted)]">#</span>
                                                <input
                                                    type="number"
                                                    value={tempInvoice}
                                                    onChange={(e) => setTempInvoice(e.target.value)}
                                                    className="w-16 px-2 py-1 text-xs rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                                                    autoFocus
                                                />
                                                <button onClick={handleSaveInvoice} className="p-1 text-green-500 hover:bg-green-500/10 rounded">
                                                    <Check className="w-3 h-3" />
                                                </button>
                                                <button onClick={() => { setEditingInvoice(false); setTempInvoice(quickInvoice); }} className="p-1 text-red-500 hover:bg-red-500/10 rounded">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setEditingInvoice(true)}
                                                className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                                            >
                                                Invoice #{String(quickInvoice).padStart(3, '0')} ✏️
                                            </button>
                                        )}
                                    </div>

                                    {/* Quick Form */}
                                    <div className="glass-card p-4 space-y-3">
                                        <input
                                            value={quickName}
                                            onChange={(e) => setQuickName(e.target.value)}
                                            placeholder="Nama Customer..."
                                            className="input"
                                        />
                                        <input
                                            value={quickWhatsApp}
                                            onChange={(e) => setQuickWhatsApp(e.target.value)}
                                            placeholder="No. WhatsApp (08xxx)..."
                                            className="input"
                                        />

                                        {/* Device Count */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-[var(--text-muted)]">Max Devices:</label>
                                            <div className="flex flex-wrap gap-2">
                                                {deviceOptions.map(devices => (
                                                    <button
                                                        key={devices}
                                                        onClick={() => setQuickDevices(devices)}
                                                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${quickDevices === devices
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-[var(--surface-hover)] text-[var(--text-secondary)]'
                                                            }`}
                                                    >
                                                        {devices} Device{devices > 1 ? 's' : ''}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Package Selection */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-[var(--text-muted)]">Paket:</label>
                                            <div className="flex flex-wrap gap-2">
                                                {packageOptions.map(pkg => (
                                                    <button
                                                        key={pkg.id}
                                                        onClick={() => setQuickPackage(pkg.id)}
                                                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${quickPackage === pkg.id
                                                            ? 'bg-[var(--accent)] text-white'
                                                            : 'bg-[var(--surface-hover)] text-[var(--text-secondary)]'
                                                            }`}
                                                    >
                                                        {pkg.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Free Reason Selection */}
                                        {quickPackage === 'free' && (
                                            <div className="space-y-2">
                                                <label className="text-xs text-[var(--text-muted)]">Alasan Free:</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {freeReasons.map(reason => (
                                                        <button
                                                            key={reason}
                                                            onClick={() => setQuickFreeReason(reason)}
                                                            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${quickFreeReason === reason
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-[var(--surface-hover)] text-[var(--text-secondary)]'
                                                                }`}
                                                        >
                                                            {reason}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleQuickGenerate}
                                            disabled={!quickName.trim() || saving}
                                            className="btn btn-primary w-full"
                                        >
                                            {saving ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Zap className="w-4 h-4" />
                                            )}
                                            {saving ? 'Creating...' : 'Generate License Key'}
                                        </button>
                                    </div>

                                    {/* Generated Result */}
                                    {generatedKey && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="glass-card p-4 space-y-3 border border-green-500/30"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-green-500">✅ Key Created!</span>
                                                <code className="text-lg font-mono text-[var(--accent)]">{generatedKey}</code>
                                            </div>

                                            {/* Message Preview */}
                                            <div className="bg-[var(--surface)] rounded-lg p-3 max-h-48 overflow-y-auto">
                                                <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap font-sans">
                                                    {generatedMessage}
                                                </pre>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => copyToClipboard(generatedMessage)}
                                                    className="btn btn-secondary flex-1"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                    {quickCopied ? 'Copied!' : 'Copy Message'}
                                                </button>
                                                <button
                                                    onClick={openWhatsApp}
                                                    disabled={!quickWhatsApp.trim()}
                                                    className="btn btn-primary flex-1 bg-green-600 hover:bg-green-700"
                                                >
                                                    <ExternalLink className="w-4 h-4" /> Open WhatsApp
                                                </button>
                                            </div>

                                            {/* Delete Key Button (for quick undo) */}
                                            <button
                                                onClick={handleDeleteQuickKey}
                                                className="btn btn-ghost w-full text-sm text-red-500 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-3 h-3" /> Hapus Key Ini (Undo)
                                            </button>

                                            <button
                                                onClick={resetQuickForm}
                                                className="btn btn-ghost w-full text-sm"
                                            >
                                                + Buat Order Baru
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* License Keys Tab */}
                            {activeTab === 1 && (
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
                                                    <label className="text-xs text-[var(--text-muted)] mb-1 block">Tanggal Expire (opsional)</label>
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

                                    {/* Users Section */}
                                    <h3 className="font-medium text-[var(--text)] mt-6">{users.length} Users Terdaftar</h3>
                                    <div className="space-y-2">
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
                                </div>
                            )}

                            {/* Stats Tab */}
                            {activeTab === 2 && (
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
                                        <button onClick={() => setStatsRefresh(r => r + 1)} className="btn btn-secondary col-span-2">
                                            <RotateCcw className="w-4 h-4" />Refresh Data
                                        </button>
                                    </div>

                                    {/* Leaderboard */}
                                    <div>
                                        <h3 className="font-medium text-[var(--text)] mb-3 flex items-center gap-2">
                                            <Crown className="w-4 h-4 text-amber-500" /> Leaderboard
                                        </h3>
                                        {leaderboard.length === 0 ? (
                                            <p className="text-sm text-[var(--text-muted)] text-center py-4">Belum ada data.</p>
                                        ) : (
                                            <div className="space-y-2">
                                                {(leaderboardExpanded ? leaderboard : leaderboard.slice(0, 10)).map((user, i) => (
                                                    <div key={user.licenseKey} className="glass-card p-3 flex items-center gap-3">
                                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-amber-500 text-white' :
                                                            i === 1 ? 'bg-gray-400 text-white' :
                                                                i === 2 ? 'bg-amber-700 text-white' :
                                                                    'bg-[var(--surface)] text-[var(--text-muted)]'
                                                            }`}>{i + 1}</span>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-[var(--text)]">{user.userName}</p>
                                                            <p className="text-[10px] text-[var(--text-muted)]">
                                                                Quiz: {user.totalScore} pts | Online: {Math.floor(user.onlineMinutes / 60)}h {user.onlineMinutes % 60}m
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {leaderboard.length > 10 && (
                                                    <button
                                                        onClick={() => setLeaderboardExpanded(!leaderboardExpanded)}
                                                        className="btn btn-secondary w-full text-xs py-2"
                                                    >
                                                        {leaderboardExpanded ? `Tampilkan 10 Teratas` : `Lihat Semua (${leaderboard.length} user)`}
                                                    </button>
                                                )}
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

                            {/* Logs Tab */}
                            {activeTab === 3 && (
                                <div className="space-y-4">
                                    <h3 className="font-medium text-[var(--text)]">Activity Logs</h3>
                                    {activityLogs.length === 0 ? (
                                        <p className="text-sm text-[var(--text-muted)] text-center py-4">Belum ada aktivitas.</p>
                                    ) : (
                                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                            {activityLogs.slice(0, 20).map(log => (
                                                <div key={log.id} className="glass-card p-2 text-sm">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-[var(--text)]">{log.userName}</span>
                                                            {log.count > 1 && (
                                                                <span className="text-[10px] px-1.5 py-0.5 bg-[var(--accent)] text-white rounded-full font-bold">
                                                                    x{log.count}
                                                                </span>
                                                            )}
                                                        </div>
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

                                    {/* Error Logs */}
                                    <div className="flex items-center justify-between mt-6">
                                        <h3 className="font-medium text-[var(--text)]">Error Logs</h3>
                                        <div className="flex gap-2">
                                            <select value={errorFilter} onChange={(e) => setErrorFilter(e.target.value)} className="input text-sm py-1 px-2">
                                                <option value="all">Semua</option>
                                                <option value="unresolved">Belum Diperbaiki</option>
                                                <option value="resolved">Sudah Diperbaiki</option>
                                            </select>
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
                                        </div>
                                    </div>
                                    {errorLogs.length === 0 ? (
                                        <p className="text-sm text-[var(--text-muted)] text-center py-4">✅ Tidak ada error logs.</p>
                                    ) : (
                                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                            {errorLogs
                                                .filter(log => {
                                                    if (errorFilter === 'resolved') return log.resolved;
                                                    if (errorFilter === 'unresolved') return !log.resolved;
                                                    return true;
                                                })
                                                .slice(0, 20)
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

                            {/* Announce Tab */}
                            {activeTab === 4 && (
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

                            {/* Danger Zone Tab */}
                            {activeTab === 5 && (
                                <div className="space-y-4">
                                    {dangerZoneConfirm < 3 ? (
                                        <div className="glass-card p-6 text-center">
                                            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-bold text-red-500 mb-2">⚠️ Danger Zone</h3>
                                            <p className="text-sm text-[var(--text-muted)] mb-4">
                                                Akses ke Danger Zone memerlukan 3x konfirmasi untuk mencegah aksi tidak disengaja.
                                            </p>
                                            <p className="text-xs text-[var(--text-muted)] mb-4">
                                                Konfirmasi: {dangerZoneConfirm}/3
                                            </p>
                                            <button
                                                onClick={() => setDangerZoneConfirm(c => c + 1)}
                                                className="btn btn-secondary"
                                            >
                                                {dangerZoneConfirm === 0 ? 'Konfirmasi Pertama' :
                                                    dangerZoneConfirm === 1 ? 'Konfirmasi Kedua' :
                                                        'Konfirmasi Terakhir'}
                                            </button>
                                            <button
                                                onClick={() => { setDangerZoneConfirm(0); setActiveTab(0); }}
                                                className="btn btn-ghost text-sm ml-2"
                                            >
                                                Batalkan
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="glass-card p-4 border-red-500/30 border">
                                                <h4 className="text-sm font-medium text-red-500 mb-3 flex items-center gap-2">
                                                    <AlertTriangle className="w-4 h-4" />Danger Zone - AKTIF
                                                </h4>
                                                <p className="text-xs text-[var(--text-muted)] mb-4">
                                                    ⚠️ Aksi di bawah ini TIDAK DAPAT dibatalkan. Pastikan Anda yakin sebelum melanjutkan.
                                                </p>
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
                                            </div>
                                            <button
                                                onClick={() => setDangerZoneConfirm(0)}
                                                className="btn btn-secondary w-full"
                                            >
                                                🔒 Kunci Kembali Danger Zone
                                            </button>
                                        </div>
                                    )}
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
                        ? 'PERINGATAN: Ini akan menghapus SEMUA data aktivasi user. Semua user harus login ulang. Tindakan ini tidak bisa dibatalkan!'
                        : 'PERINGATAN: Ini akan menghapus SEMUA license keys dan membuat ulang 3 key default. Keys yang dibuat manual akan hilang!'}
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
