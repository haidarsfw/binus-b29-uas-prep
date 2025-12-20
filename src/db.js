// ================================================================
// UAS BM B29 PREP - DATABASE (LICENSE KEY ONLY)
// ================================================================

export const DB = {
    // ============================================================
    // LICENSE KEYS (Sistem Utama)
    // Format: key, nama pemilik, durasi aktif (hari)
    // ============================================================
    licenseKeys: [
        { key: 'B29-7D-001', name: 'Mahasiswa 1', daysActive: 7 },
        { key: 'B29-14D-002', name: 'Mahasiswa 2', daysActive: 14 },
        { key: 'B29-30D-003', name: 'Mahasiswa 3', daysActive: 30 },
        { key: 'admin1', name: 'Admin', daysActive: 365, isAdmin: true },
        { key: 'azhura', name: 'Azhura', daysActive: 99999 },
        { key: 'tester01', name: 'Tester', daysActive: 14, unlimitedDevices: true },
        // Tambahkan license key baru di sini
    ],

    // ============================================================
    // JADWAL UJIAN PER KELAS
    // ============================================================
    schedules: {
        'LA86': { 'Marketing Management': '2026-01-06T08:00:00', 'Human Resources Management': '2026-01-07T10:00:00', 'Management Information Systems': '2026-01-08T13:00:00', 'Introduction to Management': '2026-01-09T08:00:00' },
        'LB86': { 'Marketing Management': '2026-01-06T10:00:00', 'Human Resources Management': '2026-01-07T13:00:00', 'Management Information Systems': '2026-01-08T08:00:00', 'Introduction to Management': '2026-01-09T10:00:00' },
        'LC86': { 'Marketing Management': '2026-01-06T13:00:00', 'Human Resources Management': '2026-01-07T08:00:00', 'Management Information Systems': '2026-01-08T10:00:00', 'Introduction to Management': '2026-01-09T13:00:00' },
        'LD86': { 'Marketing Management': '2026-01-06T15:00:00', 'Human Resources Management': '2026-01-07T15:00:00', 'Management Information Systems': '2026-01-08T15:00:00', 'Introduction to Management': '2026-01-09T15:00:00' },
        'LE86': { 'Marketing Management': '2026-01-06T17:00:00', 'Human Resources Management': '2026-01-07T17:00:00', 'Management Information Systems': '2026-01-08T17:00:00', 'Introduction to Management': '2026-01-09T17:00:00' },
        'Other': { 'Marketing Management': '2026-01-10T08:00:00', 'Human Resources Management': '2026-01-10T10:00:00', 'Management Information Systems': '2026-01-10T13:00:00', 'Introduction to Management': '2026-01-10T15:00:00' },
    },

    classes: ['LA86', 'LB86', 'LC86', 'LD86', 'LE86', 'Other'],

    subjects: [
        { id: 'marketing', name: 'Marketing Management', icon: 'TrendingUp', description: 'Strategi pemasaran & marketing mix' },
        { id: 'hr', name: 'Human Resources Management', icon: 'Users', description: 'Rekrutmen & manajemen kinerja' },
        { id: 'mis', name: 'Management Information Systems', icon: 'Monitor', description: 'Sistem informasi & digital' },
        { id: 'intro', name: 'Introduction to Management', icon: 'Briefcase', description: 'Dasar-dasar manajemen' },
    ],

    content: {
        marketing: {
            materi: [
                { id: 1, title: 'Pertemuan 1: Pengantar Marketing', type: 'PDF', xp: 10 },
                { id: 2, title: 'Pertemuan 2: Segmentasi Pasar', type: 'PPT', xp: 10 },
                { id: 3, title: 'Pertemuan 3: Targeting & Positioning', type: 'PDF', xp: 10 },
                { id: 4, title: 'Pertemuan 4: Marketing Mix (4P)', type: 'PPT', xp: 15 },
                { id: 5, title: 'Pertemuan 5: Digital Marketing', type: 'PDF', xp: 15 },
            ],
            kisiKisi: ['Konsep dasar marketing', 'Segmentasi: geografis, demografis, psikografis', 'Strategi targeting', 'Positioning & differentiation', 'Marketing Mix: 4P', 'Digital marketing', 'CRM', 'Marketing analytics'],
            flashcards: [
                { id: 1, term: 'Marketing Mix', definition: 'Kombinasi 4P: Product, Price, Place, Promotion' },
                { id: 2, term: 'Segmentasi Pasar', definition: 'Membagi pasar berdasarkan karakteristik' },
                { id: 3, term: 'Positioning', definition: 'Menempatkan produk di benak konsumen' },
                { id: 4, term: 'Brand Equity', definition: 'Nilai tambah berdasarkan persepsi merek' },
                { id: 5, term: 'STP', definition: 'Segmentation, Targeting, Positioning' },
            ],
            essayExam: [{ question: 'Jelaskan Marketing Mix (4P) dengan contoh startup Indonesia!', modelAnswer: '1) Product - layanan digital, 2) Price - dynamic pricing, 3) Place - aplikasi mobile, 4) Promotion - promo cashback.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                { question: 'Apa kepanjangan 4P?', options: ['Product, Price, Place, Promotion', 'People, Process, Physical, Price', 'Product, People, Price, Profit', 'Place, Promotion, Process, Physical'], answer: 0, xp: 5 },
                { question: 'Segmentasi gaya hidup termasuk...', options: ['Geografis', 'Demografis', 'Psikografis', 'Perilaku'], answer: 2, xp: 5 },
                { question: 'Harga tinggi produk baru disebut...', options: ['Penetration', 'Skimming', 'Competitive', 'Bundle'], answer: 1, xp: 5 },
            ],
        },
        hr: {
            materi: [
                { id: 1, title: 'Pertemuan 1: Pengantar HRM', type: 'PDF', xp: 10 },
                { id: 2, title: 'Pertemuan 2: Rekrutmen & Seleksi', type: 'PPT', xp: 10 },
                { id: 3, title: 'Pertemuan 3: Pelatihan', type: 'PDF', xp: 10 },
                { id: 4, title: 'Pertemuan 4: Kompensasi', type: 'PPT', xp: 15 },
            ],
            kisiKisi: ['Fungsi HRM', 'Rekrutmen: job analysis, description', 'Metode seleksi', 'Training Need Analysis', 'Kompensasi', 'Performance appraisal'],
            flashcards: [
                { id: 1, term: 'Job Analysis', definition: 'Mengumpulkan info tugas & kualifikasi' },
                { id: 2, term: 'Onboarding', definition: 'Orientasi karyawan baru' },
                { id: 3, term: 'KPI', definition: 'Key Performance Indicator' },
                { id: 4, term: 'TNA', definition: 'Training Need Analysis' },
            ],
            essayExam: [{ question: 'Rancang program onboarding untuk Gen Z!', modelAnswer: 'Pre-boarding digital, buddy system, training, project assignment.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                { question: 'Job Description adalah...', options: ['Kualifikasi', 'Daftar tugas', 'Analisis', 'Evaluasi'], answer: 1, xp: 5 },
                { question: '360-Degree Feedback adalah...', options: ['MBO', 'Penilaian multi-pihak', 'BARS', 'Rating'], answer: 1, xp: 5 },
            ],
        },
        mis: {
            materi: [
                { id: 1, title: 'Pertemuan 1: Pengantar SI', type: 'PDF', xp: 10 },
                { id: 2, title: 'Pertemuan 2: IT Infrastructure', type: 'PPT', xp: 10 },
                { id: 3, title: 'Pertemuan 3: Database & Big Data', type: 'PDF', xp: 10 },
                { id: 4, title: 'Pertemuan 4: E-Commerce', type: 'PPT', xp: 15 },
            ],
            kisiKisi: ['Komponen SI', 'Jenis SI: TPS, MIS, DSS, ESS', 'Cloud: SaaS, PaaS, IaaS', 'Big Data', 'E-commerce'],
            flashcards: [
                { id: 1, term: 'ERP', definition: 'Sistem terintegrasi proses bisnis' },
                { id: 2, term: 'Cloud Computing', definition: 'Layanan IT via internet' },
                { id: 3, term: 'Big Data', definition: 'Volume, Velocity, Variety' },
                { id: 4, term: 'SaaS', definition: 'Software as a Service' },
            ],
            essayExam: [{ question: 'Bagaimana ERP meningkatkan efisiensi UMKM?', modelAnswer: 'Integrasi data, otomatisasi, real-time reporting.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                { question: 'SaaS adalah...', options: ['System', 'Software', 'Storage', 'Security'], answer: 1, xp: 5 },
                { question: 'Velocity dalam Big Data adalah...', options: ['Volume', 'Variety', 'Kecepatan', 'Veracity'], answer: 2, xp: 5 },
            ],
        },
        intro: {
            materi: [
                { id: 1, title: 'Pertemuan 1: Konsep Manajemen', type: 'PDF', xp: 10 },
                { id: 2, title: 'Pertemuan 2: Fungsi POLC', type: 'PPT', xp: 10 },
                { id: 3, title: 'Pertemuan 3: Lingkungan Bisnis', type: 'PDF', xp: 10 },
                { id: 4, title: 'Pertemuan 4: Kepemimpinan', type: 'PPT', xp: 15 },
            ],
            kisiKisi: ['Definisi manajemen', 'POLC', 'Level manajemen', 'Lingkungan bisnis', 'Teori motivasi', 'Gaya kepemimpinan'],
            flashcards: [
                { id: 1, term: 'POLC', definition: 'Planning, Organizing, Leading, Controlling' },
                { id: 2, term: 'Stakeholder', definition: 'Pihak berkepentingan' },
                { id: 3, term: 'SWOT', definition: 'Strengths, Weaknesses, Opportunities, Threats' },
                { id: 4, term: 'CSR', definition: 'Corporate Social Responsibility' },
            ],
            essayExam: [{ question: 'Gaya kepemimpinan efektif untuk tim remote?', modelAnswer: 'Transformational + trust-based management.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                { question: 'POLC adalah...', options: ['Plan, Organize, Lead, Control', 'Planning, Organizing, Leading, Controlling', 'Process, Operation', 'Profit, Org'], answer: 1, xp: 5 },
                { question: 'Top Manager mengelola...', options: ['Lini depan', 'Menengah', 'Keseluruhan', 'Proyek'], answer: 2, xp: 5 },
            ],
        },
    },

    simulatedUsers: [
        { name: 'Andi', avatar: '👨‍🎓' },
        { name: 'Budi', avatar: '👨‍💻' },
        { name: 'Citra', avatar: '👩‍🎓' },
        { name: 'Dewi', avatar: '👩‍💼' },
    ],
    simulatedActivities: ['belajar', 'quiz', 'flashcard', 'fokus 🎯'],
};

export default DB;
