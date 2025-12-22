// ================================================================
// BINUS B29 UAS PREP - DATA KONTEN (MUDAH DIEDIT)
// ================================================================
// File ini berisi semua konten pembelajaran
// Edit data di bawah untuk mengubah konten

// Helper: Generate URL untuk embed file dari Google Drive
// Untuk file biasa: https://drive.google.com/file/d/{FILE_ID}/preview
// Untuk Google Slides/Docs: https://docs.google.com/presentation/d/{FILE_ID}/embed atau /document/d/{FILE_ID}/preview

export const CONTENT_DATA = {
    // Kode akses untuk masuk
    accessCode: 'B29SUCCESS',

    // Daftar mata kuliah
    subjects: [
        {
            id: 'marketing',
            name: 'Marketing Management',
            icon: 'TrendingUp',
            color: 'from-blue-500 to-cyan-500',
            description: 'Strategi pemasaran, segmentasi, positioning, dan marketing mix',
        },
        {
            id: 'hr',
            name: 'Human Resources Management',
            icon: 'Users',
            color: 'from-purple-500 to-pink-500',
            description: 'Rekrutmen, pelatihan, kompensasi, dan manajemen kinerja',
        },
        {
            id: 'mis',
            name: 'Management Information Systems for Leaders',
            icon: 'Monitor',
            color: 'from-green-500 to-emerald-500',
            description: 'Sistem informasi, teknologi bisnis, dan transformasi digital',
        },
        {
            id: 'intro',
            name: 'Introduction to Management and Business',
            icon: 'Briefcase',
            color: 'from-orange-500 to-red-500',
            description: 'Dasar-dasar manajemen, fungsi bisnis, dan lingkungan organisasi',
        },
    ],

    // Konten per mata kuliah
    content: {
        // ============ MARKETING MANAGEMENT ============
        marketing: {
            // Materi PPT dari kampus per sesi
            // type: 'drive-pdf', 'drive-pptx', 'drive-gslides', 'drive-gdoc'
            // driveId: File ID dari Google Drive link
            materi: [
                { title: 'Sesi 1: Pengantar Marketing', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 2: Segmentasi Pasar', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 3: Targeting & Positioning', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 4: Marketing Mix (4P)', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 5: Digital Marketing', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
            ],

            // Rangkuman - dikategorikan
            rangkuman: {
                modulInti: [
                    { title: 'Modul 1: Marketing Fundamentals', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pdf' },
                    { title: 'Modul 2: STP Strategy', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pdf' },
                ],
                addendum: [
                    { title: 'Addendum: Case Studies', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-gdoc' },
                ],
                mentorPPT: [
                    { title: 'Rangkuman Mentor Sesi 1-5', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-gslides' },
                ],
            },

            // Kisi-kisi (teks)
            kisiKisi: [
                'Konsep dasar marketing dan evolusi pemasaran',
                'Segmentasi pasar: geografis, demografis, psikografis, perilaku',
                'Strategi targeting: undifferentiated, differentiated, concentrated',
                'Positioning dan brand differentiation',
                'Marketing Mix: Product, Price, Place, Promotion',
                'Digital marketing dan social media strategy',
                'Customer Relationship Management (CRM)',
                'Marketing analytics dan metrics',
            ],

            // Flashcards (akan di-random setiap kali dibuka)
            flashcards: [
                { term: 'Marketing Mix', definition: 'Kombinasi 4P: Product, Price, Place, Promotion yang digunakan perusahaan untuk mencapai tujuan pemasaran' },
                { term: 'Segmentasi Pasar', definition: 'Proses membagi pasar menjadi kelompok pembeli yang berbeda berdasarkan karakteristik, kebutuhan, atau perilaku' },
                { term: 'Positioning', definition: 'Strategi untuk menempatkan produk di benak konsumen relatif terhadap pesaing' },
                { term: 'Brand Equity', definition: 'Nilai tambah yang diberikan pada produk berdasarkan persepsi dan pengalaman konsumen terhadap merek' },
                { term: 'Customer Lifetime Value', definition: 'Prediksi total nilai keuntungan yang dihasilkan dari hubungan dengan pelanggan selama masa hidupnya' },
                { term: 'STP', definition: 'Segmentation, Targeting, Positioning - kerangka kerja strategis untuk menentukan pasar sasaran' },
                { term: 'Price Skimming', definition: 'Strategi penetapan harga tinggi saat peluncuran produk baru, lalu menurunkan harga seiring waktu' },
                { term: 'Penetration Pricing', definition: 'Strategi penetapan harga rendah untuk memasuki pasar dan membangun market share dengan cepat' },
            ],

            // Quiz (akan di-random setiap kali dibuka)
            quiz: [
                { question: 'Apa kepanjangan dari 4P dalam Marketing Mix?', options: ['Product, Price, Place, Promotion', 'People, Process, Physical, Price', 'Product, People, Price, Profit', 'Place, Promotion, Process, Physical'], answer: 0 },
                { question: 'Segmentasi berdasarkan gaya hidup termasuk jenis segmentasi...', options: ['Geografis', 'Demografis', 'Psikografis', 'Perilaku'], answer: 2 },
                { question: 'Strategi penetapan harga tinggi untuk produk baru disebut...', options: ['Penetration Pricing', 'Skimming Pricing', 'Competitive Pricing', 'Bundle Pricing'], answer: 1 },
                { question: 'CRM adalah singkatan dari...', options: ['Customer Relation Method', 'Customer Relationship Management', 'Consumer Research Marketing', 'Corporate Resource Management'], answer: 1 },
                { question: 'Tahap pertama dalam proses STP adalah...', options: ['Targeting', 'Positioning', 'Segmentation', 'Differentiation'], answer: 2 },
                { question: 'Brand awareness termasuk dalam komponen...', options: ['Brand Loyalty', 'Brand Equity', 'Brand Identity', 'Brand Extension'], answer: 1 },
                { question: 'Digital marketing TIDAK mencakup...', options: ['SEO', 'Social Media Marketing', 'Billboard Advertising', 'Email Marketing'], answer: 2 },
                { question: 'Strategi targeting yang menyasar satu segmen khusus adalah...', options: ['Undifferentiated', 'Differentiated', 'Concentrated', 'Mass Marketing'], answer: 2 },
            ],
        },

        // ============ HUMAN RESOURCES MANAGEMENT ============
        hr: {
            materi: [
                { title: 'Sesi 1: Pengantar HRM', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 2: Rekrutmen & Seleksi', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 3: Pelatihan & Pengembangan', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 4: Kompensasi & Benefit', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 5: Manajemen Kinerja', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
            ],
            rangkuman: {
                modulInti: [
                    { title: 'Modul 1: HR Fundamentals', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pdf' },
                ],
                addendum: [],
                mentorPPT: [
                    { title: 'Rangkuman Mentor HRM', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-gslides' },
                ],
            },
            kisiKisi: [
                'Fungsi dan peran strategis HRM dalam organisasi',
                'Proses rekrutmen: job analysis, job description, job specification',
                'Metode seleksi: wawancara, tes psikologi, assessment center',
                'Training Need Analysis (TNA) dan metode pelatihan',
                'Sistem kompensasi: gaji pokok, tunjangan, insentif',
                'Performance appraisal: MBO, 360-degree feedback, KPI',
                'Employee engagement dan retention strategy',
                'HR analytics dan digital HR transformation',
            ],
            flashcards: [
                { term: 'Job Analysis', definition: 'Proses sistematis mengumpulkan informasi tentang tugas, tanggung jawab, dan kualifikasi yang dibutuhkan untuk suatu pekerjaan' },
                { term: 'Onboarding', definition: 'Proses orientasi dan integrasi karyawan baru ke dalam organisasi' },
                { term: 'KPI', definition: 'Key Performance Indicator - ukuran kuantitatif untuk mengukur kinerja karyawan terhadap target' },
                { term: 'Employee Turnover', definition: 'Tingkat perputaran karyawan yang keluar dan digantikan dalam periode tertentu' },
                { term: 'Compensation & Benefits', definition: 'Total imbalan yang diterima karyawan termasuk gaji, tunjangan, bonus, dan fasilitas lainnya' },
                { term: 'Job Description', definition: 'Dokumen yang berisi daftar tugas, tanggung jawab, dan wewenang suatu posisi' },
                { term: 'Job Specification', definition: 'Dokumen yang berisi kualifikasi minimum yang dibutuhkan untuk suatu posisi (pendidikan, pengalaman, skill)' },
                { term: '360-Degree Feedback', definition: 'Metode penilaian kinerja yang mengumpulkan feedback dari atasan, rekan kerja, bawahan, dan diri sendiri' },
            ],
            quiz: [
                { question: 'Dokumen yang berisi daftar tugas dan tanggung jawab suatu posisi adalah...', options: ['Job Specification', 'Job Description', 'Job Analysis', 'Job Evaluation'], answer: 1 },
                { question: 'Metode penilaian kinerja yang melibatkan feedback dari berbagai pihak disebut...', options: ['MBO', 'BARS', '360-Degree Feedback', 'Graphic Rating Scale'], answer: 2 },
                { question: 'Training Need Analysis dilakukan untuk...', options: ['Menentukan gaji karyawan', 'Mengidentifikasi kebutuhan pelatihan', 'Mengevaluasi kinerja', 'Merekrut karyawan baru'], answer: 1 },
                { question: 'Employee engagement mengukur...', options: ['Kehadiran karyawan', 'Keterikatan emosional karyawan dengan perusahaan', 'Produktivitas karyawan', 'Gaji karyawan'], answer: 1 },
                { question: 'Apa yang BUKAN termasuk dalam kompensasi non-finansial?', options: ['Bonus tahunan', 'Pengakuan prestasi', 'Work-life balance', 'Kesempatan pengembangan karir'], answer: 0 },
                { question: 'Tahap pertama dalam proses rekrutmen adalah...', options: ['Wawancara', 'Job Analysis', 'Seleksi', 'Onboarding'], answer: 1 },
                { question: 'MBO adalah singkatan dari...', options: ['Management By Observation', 'Management By Objectives', 'Monitoring Business Operations', 'Managing Business Organizations'], answer: 1 },
            ],
        },

        // ============ MANAGEMENT INFORMATION SYSTEMS ============
        mis: {
            materi: [
                { title: 'Sesi 1: Pengantar Sistem Informasi', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 2: IT Infrastructure', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 3: Database & Big Data', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 4: E-Commerce & Digital Business', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
                { title: 'Sesi 5: Cybersecurity & Ethics', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pptx' },
            ],
            rangkuman: {
                modulInti: [
                    { title: 'Modul 1: MIS Fundamentals', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pdf' },
                ],
                addendum: [],
                mentorPPT: [
                    { title: 'Rangkuman Mentor MIS', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-gslides' },
                ],
            },
            kisiKisi: [
                'Komponen sistem informasi: hardware, software, data, people, process',
                'Jenis-jenis sistem informasi: TPS, MIS, DSS, ESS',
                'Cloud computing: SaaS, PaaS, IaaS',
                'Big data analytics dan business intelligence',
                'E-commerce models: B2B, B2C, C2C',
                'Cybersecurity threats dan protection strategies',
                'Digital transformation dan Industry 4.0',
                'IT governance dan strategic alignment',
            ],
            flashcards: [
                { term: 'ERP', definition: 'Enterprise Resource Planning - sistem terintegrasi yang mengelola seluruh proses bisnis dalam satu platform' },
                { term: 'Cloud Computing', definition: 'Model penyediaan layanan IT melalui internet dengan sumber daya yang dapat diskalakan sesuai kebutuhan' },
                { term: 'Big Data', definition: 'Dataset besar dan kompleks yang memerlukan teknologi khusus untuk analisis (karakteristik: Volume, Velocity, Variety)' },
                { term: 'Business Intelligence', definition: 'Teknologi dan praktik untuk mengumpulkan, menganalisis, dan menyajikan data bisnis untuk pengambilan keputusan' },
                { term: 'Cybersecurity', definition: 'Praktik melindungi sistem, jaringan, dan data dari serangan digital dan akses tidak sah' },
                { term: 'SaaS', definition: 'Software as a Service - model cloud computing di mana software diakses via internet (contoh: Google Workspace, Salesforce)' },
                { term: 'DSS', definition: 'Decision Support System - sistem informasi yang membantu pengambilan keputusan dengan analisis data' },
                { term: 'Phishing', definition: 'Serangan social engineering yang menipu pengguna untuk memberikan informasi sensitif melalui email/website palsu' },
            ],
            quiz: [
                { question: 'SaaS adalah singkatan dari...', options: ['System as a Service', 'Software as a Service', 'Storage as a Service', 'Security as a Service'], answer: 1 },
                { question: 'Karakteristik Big Data yang merujuk pada kecepatan data adalah...', options: ['Volume', 'Variety', 'Velocity', 'Veracity'], answer: 2 },
                { question: 'Sistem yang membantu manajer level atas dalam pengambilan keputusan strategis adalah...', options: ['TPS', 'MIS', 'DSS', 'ESS'], answer: 3 },
                { question: 'Model e-commerce antara bisnis dengan konsumen adalah...', options: ['B2B', 'B2C', 'C2C', 'G2C'], answer: 1 },
                { question: 'Phishing termasuk jenis ancaman...', options: ['Malware', 'Social Engineering', 'DDoS Attack', 'SQL Injection'], answer: 1 },
                { question: 'Yang BUKAN termasuk komponen sistem informasi adalah...', options: ['Hardware', 'Software', 'Marketing', 'Data'], answer: 2 },
                { question: 'IaaS menyediakan...', options: ['Aplikasi siap pakai', 'Platform pengembangan', 'Infrastruktur IT (server, storage)', 'Database management'], answer: 2 },
            ],
        },

        // ============ INTRODUCTION TO MANAGEMENT ============
        intro: {
            materi: [
                { title: 'Sesi 15: Leadership Theory', driveId: '1oEVEZInDyOAGwW_aVNbTytyMDxqw26n6', type: 'drive-gslides' },
                { title: 'Sesi 16: Being Effective Leader', driveId: '1JbbLQGTqAAs7Ti3uOE_mRmXvOQolkoIU', type: 'drive-gslides' },
                { title: 'Sesi 17: Monitoring and Controlling I', driveId: '1z7rBmsMF3qVgG1sxbJquesqXlbgJbMk3', type: 'drive-gslides' },
                { title: 'Sesi 18: Managing and Controlling II', driveId: '17uVHouud9lE9YxSzE0hKKdz2ygeXQAYY', type: 'drive-gslides' },
                { title: 'Sesi 19: Identifying Risk', driveId: '1lkT_2qkG1_GfK-DGjqDmThNHiClllxA4', type: 'drive-gslides' },
                { title: 'Sesi 20: Evaluating I', driveId: '1Z8gDIisxD3AxJLPN3ylmtlnBwLI6cRYb', type: 'drive-gslides' },
                { title: 'Sesi 21: Risk Management', driveId: '1RkSBEZfq5T5qK1yw3viqfCQ1SgJNOJ2I', type: 'drive-gslides' },
                { title: 'Sesi 22: Evaluating II', driveId: '1GZY6OTGh83SeOfEb2HveW9R51mqV_UQ2', type: 'drive-gslides' },
                { title: 'Sesi 23: Entrepreneurship', driveId: '1119SDRUhnEA-WD75hmeBbIEWSdYVko6O', type: 'drive-gslides' },
                { title: 'Sesi 24: Starting a Small Business', driveId: '1z6xRzBjcHIxWepq2LZ6tP10JFEINSUdM', type: 'drive-gslides' },
                { title: 'Sesi 25: Management Practice', driveId: '1GaUU2AvqXYgO4mp-EqW_aezrQyzFYcQl', type: 'drive-gslides' },
                { title: 'Sesi 26: Strategic Management', driveId: '1_lZ4uBcRQPWYZBG7Ry4-5346-tnnko2Q', type: 'drive-gslides' },
            ],
            rangkuman: {
                modulInti: [
                    { title: 'Modul 1: Management Fundamentals', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-pdf' },
                ],
                addendum: [],
                mentorPPT: [
                    { title: 'Rangkuman Mentor Intro Management', driveId: 'PASTE_FILE_ID_HERE', type: 'drive-gslides' },
                ],
            },
            kisiKisi: [
                'Definisi manajemen dan peran manajer',
                'Fungsi manajemen: Planning, Organizing, Leading, Controlling (POLC)',
                'Level manajemen: top, middle, first-line manager',
                'Lingkungan bisnis: internal, eksternal, global',
                'Proses pengambilan keputusan rasional',
                'Teori motivasi: Maslow, Herzberg, McGregor',
                'Gaya kepemimpinan: autocratic, democratic, laissez-faire',
                'Etika bisnis dan tanggung jawab sosial perusahaan (CSR)',
            ],
            flashcards: [
                { term: 'POLC', definition: 'Empat fungsi manajemen: Planning (perencanaan), Organizing (pengorganisasian), Leading (kepemimpinan), Controlling (pengendalian)' },
                { term: 'Stakeholder', definition: 'Individu atau kelompok yang memiliki kepentingan terhadap organisasi, termasuk karyawan, pelanggan, investor, dan masyarakat' },
                { term: 'SWOT Analysis', definition: 'Alat analisis strategis: Strengths (kekuatan), Weaknesses (kelemahan), Opportunities (peluang), Threats (ancaman)' },
                { term: 'Corporate Social Responsibility', definition: 'Komitmen perusahaan untuk berkontribusi pada pembangunan ekonomi berkelanjutan sambil memperhatikan dampak sosial dan lingkungan' },
                { term: 'Hierarchy of Needs', definition: 'Teori Maslow tentang lima tingkat kebutuhan manusia: fisiologis, keamanan, sosial, penghargaan, dan aktualisasi diri' },
                { term: 'Theory X & Y', definition: 'Teori McGregor: X (karyawan malas, perlu kontrol ketat) vs Y (karyawan self-motivated, suka tanggung jawab)' },
                { term: 'Laissez-faire Leadership', definition: 'Gaya kepemimpinan yang memberikan kebebasan penuh kepada bawahan untuk mengambil keputusan' },
                { term: 'Herzberg Two-Factor Theory', definition: 'Teori motivasi: Hygiene Factors (mencegah ketidakpuasan) dan Motivator Factors (meningkatkan kepuasan)' },
            ],
            quiz: [
                { question: 'POLC adalah singkatan dari...', options: ['Plan, Organize, Lead, Control', 'Planning, Organizing, Leading, Controlling', 'Process, Operation, Leadership, Command', 'Profit, Organization, Labor, Capital'], answer: 1 },
                { question: 'Manajer yang bertanggung jawab atas keseluruhan organisasi adalah...', options: ['First-line Manager', 'Middle Manager', 'Top Manager', 'Project Manager'], answer: 2 },
                { question: 'Teori X dan Y dikemukakan oleh...', options: ['Abraham Maslow', 'Frederick Herzberg', 'Douglas McGregor', 'Peter Drucker'], answer: 2 },
                { question: 'Faktor yang termasuk lingkungan eksternal adalah...', options: ['Budaya organisasi', 'Struktur organisasi', 'Kondisi ekonomi', 'Karyawan'], answer: 2 },
                { question: 'CSR adalah singkatan dari...', options: ['Customer Service Report', 'Corporate Social Responsibility', 'Company Strategic Review', 'Chief Sales Representative'], answer: 1 },
                { question: 'Tingkat teratas dalam Hierarchy of Needs Maslow adalah...', options: ['Safety', 'Social', 'Esteem', 'Self-actualization'], answer: 3 },
                { question: 'Gaya kepemimpinan yang melibatkan partisipasi bawahan adalah...', options: ['Autocratic', 'Democratic', 'Laissez-faire', 'Bureaucratic'], answer: 1 },
            ],
        },
    },
};

export default CONTENT_DATA;
