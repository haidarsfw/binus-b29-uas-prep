// ================================================================
// UAS BM B29 PREP - DATABASE (LICENSE KEY ONLY)
// ================================================================

export const DB = {
    // ============================================================
    // LICENSE KEYS - Now stored in Firebase Database
    // Admin can manage keys via the Admin Dashboard
    // Default keys are initialized automatically on first load
    // ============================================================

    // ============================================================
    // JADWAL UJIAN PER KELAS (12-24 Januari 2026)
    // ============================================================
    schedules: {
        'LA86': { 'Marketing Management': '2026-01-12T08:00:00', 'Human Resources Management': '2026-01-14T10:00:00', 'Management Information Systems': '2026-01-18T13:00:00', 'Introduction to Management': '2026-01-22T08:00:00' },
        'LB86': { 'Marketing Management': '2026-01-12T10:00:00', 'Human Resources Management': '2026-01-15T13:00:00', 'Management Information Systems': '2026-01-19T08:00:00', 'Introduction to Management': '2026-01-22T10:00:00' },
        'LC86': { 'Marketing Management': '2026-01-13T13:00:00', 'Human Resources Management': '2026-01-15T08:00:00', 'Management Information Systems': '2026-01-19T10:00:00', 'Introduction to Management': '2026-01-23T13:00:00' },
        'LD86': { 'Marketing Management': '2026-01-13T15:00:00', 'Human Resources Management': '2026-01-16T15:00:00', 'Management Information Systems': '2026-01-20T15:00:00', 'Introduction to Management': '2026-01-23T15:00:00' },
        'LE86': { 'Marketing Management': '2026-01-14T17:00:00', 'Human Resources Management': '2026-01-17T17:00:00', 'Management Information Systems': '2026-01-21T17:00:00', 'Introduction to Management': '2026-01-24T17:00:00' },
        'Other': { 'Marketing Management': '2026-01-14T08:00:00', 'Human Resources Management': '2026-01-17T10:00:00', 'Management Information Systems': '2026-01-21T13:00:00', 'Introduction to Management': '2026-01-24T15:00:00' },
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
                { id: 1, title: 'Sesi 15: Leadership Theory', driveId: '1n-lJxgWDJNfJIXUPbiAjxcia3Jenv1RSLRSeooF8JQs', type: 'gslides', xp: 10 },
                { id: 2, title: 'Sesi 16: Being Effective Leader', driveId: '1cVWC8B-1_cARGmqZdMslH4W_gQYl1wickoTk5k08VSM', type: 'gslides', xp: 10 },
                { id: 3, title: 'Sesi 17: Monitoring and Controlling I', driveId: '15b_hoZDhPaCU0UKyG-5-w9CTyQ4uaaMIoNZL-D18GNY', type: 'gslides', xp: 10 },
                { id: 4, title: 'Sesi 18: Managing and Controlling II', driveId: '1MbbH93lgGl9x-_4rH0rFAApORjBz8QZ9_GPsHQce96o', type: 'gslides', xp: 10 },
                { id: 5, title: 'Sesi 19: Identifying Risk', driveId: '17mgdkHbTGbGLorUphwUC9jFNU0dUvdr2Bh6rFkTcmdU', type: 'gslides', xp: 10 },
                { id: 6, title: 'Sesi 20: Evaluating I', driveId: '1Cq7X97CbRV5FKqs6hKMYyePYGdTGS-_9tqnC-7BVtBc', type: 'gslides', xp: 10 },
                { id: 7, title: 'Sesi 21: Risk Management', driveId: '1UVG8oSal-alTDH8F3M2sPRpxCODHxJyhE92MLqwRPQA', type: 'gslides', xp: 10 },
                { id: 8, title: 'Sesi 22: Evaluating II', driveId: '1TpkDSNRvt6ztnJMWPPMTu9NaHI17sENCdxNFGTO0iD0', type: 'gslides', xp: 10 },
                { id: 9, title: 'Sesi 23: Entrepreneurship', driveId: '1AXYv24SJpnnnOnw7O7H5JXGWCr-HD-1f6BqVFcKDfsU', type: 'gslides', xp: 10 },
                { id: 10, title: 'Sesi 24: Starting a Small Business', driveId: '1IG61q3mtjaXlt5TTE-CAoTrMaQJPhnpXAYqXH1Iam8o', type: 'gslides', xp: 10 },
                { id: 11, title: 'Sesi 25: Management Practice', driveId: '17uORJbantM8G3gmHxofbK60JOuNfUrtCMCGZHGgYXoc', type: 'gslides', xp: 10 },
                { id: 12, title: 'Sesi 26: Strategic Management', driveId: '1OsUUicgtzVA9tcXWhCT29ClNIuPROxWD_vQVnI49dsA', type: 'gslides', xp: 15 },
            ],
            rangkuman: {
                modulInti: [
                    { title: 'Modul 1: Kepemimpinan (Leadership)', contentKey: 'modul1', type: 'native' },
                    { title: 'Modul 2: Pengendalian (Controlling)', contentKey: 'modul2', type: 'native' },
                    { title: 'Modul 3: Strategi & Praktik Manajemen', driveId: '1v14Gr6lJ9gtrd2P3_3aYgOROCX6yS_f9i770Z9CeVzE', type: 'gdocs' },
                ],
                addendum: [
                    { title: 'Tambahan Detail Teknis (Hafalan Slide)', driveId: '1FyQth89iLyWke7-8cALM4Ln-euCYTIBrHVSFO-Slz-U', type: 'gdocs' },
                ],
                mentorPPT: [],
            },
            kisiKisi: [
                { topic: 'Social Media & Monitoring (Studi Kasus)', items: ['Studi kasus social media monitor performance (sosmed pengontrol dan pengawasan)'] },
                { topic: 'Planning & Controlling', items: ['Planning controlling link (POAC)'] },
                { topic: 'Motivation', items: ['Maslow Hierarchy (Hierarki Kebutuhan Maslow)'] },
                { topic: 'Strategic Management (Manajemen Strategis)', items: ['Six steps strategic management process (6 langkah proses manajemen strategis)', 'Strategic Evaluation', 'Strategic Management (konsep umum)'] },
                { topic: 'Entrepreneurship (Kewirausahaan)', items: ['Small business vs entrepreneurship - kunci perbedaan', 'Entrepreneurship (konsep umum)'] },
                { topic: 'Risk Management (Manajemen Risiko)', items: ['Risk identification', 'Risk management'] },
            ],
            kisiKisiNote: 'Format Ujian: 5 soal esai semua analisis (Catatan dari Dosen LE86)',
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
