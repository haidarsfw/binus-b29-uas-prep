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
                { id: 1, title: 'Sesi 15: Leadership Theory', driveId: '1oEVEZInDyOAGwW_aVNbTytyMDxqw26n6', type: 'drive-gslides', xp: 10 },
                { id: 2, title: 'Sesi 16: Being Effective Leader', driveId: '1JbbLQGTqAAs7Ti3uOE_mRmXvOQolkoIU', type: 'drive-gslides', xp: 10 },
                { id: 3, title: 'Sesi 17: Monitoring and Controlling I', driveId: '1z7rBmsMF3qVgG1sxbJquesqXlbgJbMk3', type: 'drive-gslides', xp: 10 },
                { id: 4, title: 'Sesi 18: Managing and Controlling II', driveId: '17uVHouud9lE9YxSzE0hKKdz2ygeXQAYY', type: 'drive-gslides', xp: 10 },
                { id: 5, title: 'Sesi 19: Identifying Risk', driveId: '1lkT_2qkG1_GfK-DGjqDmThNHiClllxA4', type: 'drive-gslides', xp: 10 },
                { id: 6, title: 'Sesi 20: Evaluating I', driveId: '1Z8gDIisxD3AxJLPN3ylmtlnBwLI6cRYb', type: 'drive-gslides', xp: 10 },
                { id: 7, title: 'Sesi 21: Risk Management', driveId: '1RkSBEZfq5T5qK1yw3viqfCQ1SgJNOJ2I', type: 'drive-gslides', xp: 10 },
                { id: 8, title: 'Sesi 22: Evaluating II', driveId: '1GZY6OTGh83SeOfEb2HveW9R51mqV_UQ2', type: 'drive-gslides', xp: 10 },
                { id: 9, title: 'Sesi 23: Entrepreneurship', driveId: '1119SDRUhnEA-WD75hmeBbIEWSdYVko6O', type: 'drive-gslides', xp: 10 },
                { id: 10, title: 'Sesi 24: Starting a Small Business', driveId: '1z6xRzBjcHIxWepq2LZ6tP10JFEINSUdM', type: 'drive-gslides', xp: 10 },
                { id: 11, title: 'Sesi 25: Management Practice', driveId: '1GaUU2AvqXYgO4mp-EqW_aezrQyzFYcQl', type: 'drive-gslides', xp: 10 },
                { id: 12, title: 'Sesi 26: Strategic Management', driveId: '1_lZ4uBcRQPWYZBG7Ry4-5346-tnnko2Q', type: 'drive-gslides', xp: 15 },
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
