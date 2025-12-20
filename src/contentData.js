// ================================================================
// BINUS B29 UAS PREP - DATA KONTEN (MUDAH DIEDIT)
// ================================================================
// Ubah data di bawah ini untuk mengganti konten tanpa merusak kode

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
            materi: [
                { title: 'Pertemuan 1: Pengantar Marketing', url: '#', type: 'PDF' },
                { title: 'Pertemuan 2: Segmentasi Pasar', url: '#', type: 'PPT' },
                { title: 'Pertemuan 3: Targeting & Positioning', url: '#', type: 'PDF' },
                { title: 'Pertemuan 4: Marketing Mix (4P)', url: '#', type: 'PPT' },
                { title: 'Pertemuan 5: Digital Marketing', url: '#', type: 'PDF' },
            ],
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
            flashcards: [
                { term: 'Marketing Mix', definition: 'Kombinasi 4P: Product, Price, Place, Promotion yang digunakan perusahaan untuk mencapai tujuan pemasaran' },
                { term: 'Segmentasi Pasar', definition: 'Proses membagi pasar menjadi kelompok pembeli yang berbeda berdasarkan karakteristik, kebutuhan, atau perilaku' },
                { term: 'Positioning', definition: 'Strategi untuk menempatkan produk di benak konsumen relatif terhadap pesaing' },
                { term: 'Brand Equity', definition: 'Nilai tambah yang diberikan pada produk berdasarkan persepsi dan pengalaman konsumen terhadap merek' },
                { term: 'Customer Lifetime Value', definition: 'Prediksi total nilai keuntungan yang dihasilkan dari hubungan dengan pelanggan selama masa hidupnya' },
            ],
            essayExam: [
                {
                    question: 'Jelaskan konsep Marketing Mix (4P) dan berikan contoh penerapannya pada perusahaan startup teknologi di Indonesia!',
                    modelAnswer: 'Marketing Mix (4P) terdiri dari: 1) Product - produk/jasa yang ditawarkan, 2) Price - strategi penetapan harga, 3) Place - saluran distribusi, 4) Promotion - komunikasi pemasaran. Contoh pada Gojek: Product (layanan transportasi, food delivery), Price (dynamic pricing), Place (aplikasi mobile), Promotion (promo cashback, iklan digital).',
                    rubric: {
                        teori: 'Menjelaskan 4P dengan benar dan lengkap (30%)',
                        konteks: 'Contoh relevan dengan startup Indonesia (40%)',
                        argumentasi: 'Analisis hubungan antar elemen 4P (30%)',
                    },
                },
                {
                    question: 'Analisis strategi segmentasi dan targeting yang tepat untuk produk skincare lokal yang ingin bersaing dengan brand internasional!',
                    modelAnswer: 'Strategi yang tepat: 1) Segmentasi demografis (wanita 18-35 tahun), psikografis (sadar kesehatan kulit), perilaku (aktif di social media). 2) Targeting: differentiated marketing dengan fokus pada niche market. 3) Positioning: natural ingredients, halal certified, affordable luxury.',
                    rubric: {
                        teori: 'Pemahaman konsep segmentasi & targeting (30%)',
                        konteks: 'Relevansi dengan pasar skincare Indonesia (40%)',
                        argumentasi: 'Logika strategi kompetitif (30%)',
                    },
                },
            ],
            quiz: [
                { question: 'Apa kepanjangan dari 4P dalam Marketing Mix?', options: ['Product, Price, Place, Promotion', 'People, Process, Physical, Price', 'Product, People, Price, Profit', 'Place, Promotion, Process, Physical'], answer: 0 },
                { question: 'Segmentasi berdasarkan gaya hidup termasuk jenis segmentasi...', options: ['Geografis', 'Demografis', 'Psikografis', 'Perilaku'], answer: 2 },
                { question: 'Strategi penetapan harga tinggi untuk produk baru disebut...', options: ['Penetration Pricing', 'Skimming Pricing', 'Competitive Pricing', 'Bundle Pricing'], answer: 1 },
                { question: 'CRM adalah singkatan dari...', options: ['Customer Relation Method', 'Customer Relationship Management', 'Consumer Research Marketing', 'Corporate Resource Management'], answer: 1 },
                { question: 'Tahap pertama dalam proses STP adalah...', options: ['Targeting', 'Positioning', 'Segmentation', 'Differentiation'], answer: 2 },
            ],
        },

        // ============ HUMAN RESOURCES MANAGEMENT ============
        hr: {
            materi: [
                { title: 'Pertemuan 1: Pengantar HRM', url: '#', type: 'PDF' },
                { title: 'Pertemuan 2: Rekrutmen & Seleksi', url: '#', type: 'PPT' },
                { title: 'Pertemuan 3: Pelatihan & Pengembangan', url: '#', type: 'PDF' },
                { title: 'Pertemuan 4: Kompensasi & Benefit', url: '#', type: 'PPT' },
                { title: 'Pertemuan 5: Manajemen Kinerja', url: '#', type: 'PDF' },
            ],
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
            ],
            essayExam: [
                {
                    question: 'Rancang program onboarding yang efektif untuk karyawan generasi Z di perusahaan startup! Jelaskan tahapan dan aktivitasnya!',
                    modelAnswer: 'Program onboarding Gen Z: 1) Pre-boarding digital (welcome kit virtual), 2) Hari pertama: buddy system, office tour, 3) Minggu 1: training teknis + company culture, 4) Bulan 1: project assignment + regular check-in, 5) Bulan 3: evaluasi dan feedback. Fokus pada: digital tools, flexibility, purpose-driven work.',
                    rubric: {
                        teori: 'Pemahaman konsep onboarding (30%)',
                        konteks: 'Relevansi dengan karakteristik Gen Z (40%)',
                        argumentasi: 'Struktur program yang logis dan komprehensif (30%)',
                    },
                },
            ],
            quiz: [
                { question: 'Dokumen yang berisi daftar tugas dan tanggung jawab suatu posisi adalah...', options: ['Job Specification', 'Job Description', 'Job Analysis', 'Job Evaluation'], answer: 1 },
                { question: 'Metode penilaian kinerja yang melibatkan feedback dari berbagai pihak disebut...', options: ['MBO', 'BARS', '360-Degree Feedback', 'Graphic Rating Scale'], answer: 2 },
                { question: 'Training Need Analysis dilakukan untuk...', options: ['Menentukan gaji karyawan', 'Mengidentifikasi kebutuhan pelatihan', 'Mengevaluasi kinerja', 'Merekrut karyawan baru'], answer: 1 },
                { question: 'Employee engagement mengukur...', options: ['Kehadiran karyawan', 'Keterikatan emosional karyawan dengan perusahaan', 'Produktivitas karyawan', 'Gaji karyawan'], answer: 1 },
                { question: 'Apa yang BUKAN termasuk dalam kompensasi non-finansial?', options: ['Bonus tahunan', 'Pengakuan prestasi', 'Work-life balance', 'Kesempatan pengembangan karir'], answer: 0 },
            ],
        },

        // ============ MANAGEMENT INFORMATION SYSTEMS ============
        mis: {
            materi: [
                { title: 'Pertemuan 1: Pengantar Sistem Informasi', url: '#', type: 'PDF' },
                { title: 'Pertemuan 2: IT Infrastructure', url: '#', type: 'PPT' },
                { title: 'Pertemuan 3: Database & Big Data', url: '#', type: 'PDF' },
                { title: 'Pertemuan 4: E-Commerce & Digital Business', url: '#', type: 'PPT' },
                { title: 'Pertemuan 5: Cybersecurity & Ethics', url: '#', type: 'PDF' },
            ],
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
            ],
            essayExam: [
                {
                    question: 'Bagaimana implementasi sistem ERP dapat meningkatkan efisiensi operasional UMKM di Indonesia? Jelaskan tantangan dan solusinya!',
                    modelAnswer: 'Manfaat ERP untuk UMKM: 1) Integrasi data antar departemen, 2) Otomatisasi proses, 3) Real-time reporting. Tantangan: biaya implementasi tinggi, resistance to change, keterbatasan SDM IT. Solusi: cloud-based ERP (lebih affordable), phased implementation, training intensif.',
                    rubric: {
                        teori: 'Pemahaman konsep ERP (30%)',
                        konteks: 'Relevansi dengan kondisi UMKM Indonesia (40%)',
                        argumentasi: 'Analisis tantangan dan solusi yang logis (30%)',
                    },
                },
            ],
            quiz: [
                { question: 'SaaS adalah singkatan dari...', options: ['System as a Service', 'Software as a Service', 'Storage as a Service', 'Security as a Service'], answer: 1 },
                { question: 'Karakteristik Big Data yang merujuk pada kecepatan data adalah...', options: ['Volume', 'Variety', 'Velocity', 'Veracity'], answer: 2 },
                { question: 'Sistem yang membantu manajer level atas dalam pengambilan keputusan strategis adalah...', options: ['TPS', 'MIS', 'DSS', 'ESS'], answer: 3 },
                { question: 'Model e-commerce antara bisnis dengan konsumen adalah...', options: ['B2B', 'B2C', 'C2C', 'G2C'], answer: 1 },
                { question: 'Phishing termasuk jenis ancaman...', options: ['Malware', 'Social Engineering', 'DDoS Attack', 'SQL Injection'], answer: 1 },
            ],
        },

        // ============ INTRODUCTION TO MANAGEMENT ============
        intro: {
            materi: [
                { title: 'Pertemuan 1: Konsep Dasar Manajemen', url: '#', type: 'PDF' },
                { title: 'Pertemuan 2: Fungsi Manajemen', url: '#', type: 'PPT' },
                { title: 'Pertemuan 3: Lingkungan Bisnis', url: '#', type: 'PDF' },
                { title: 'Pertemuan 4: Pengambilan Keputusan', url: '#', type: 'PPT' },
                { title: 'Pertemuan 5: Kepemimpinan & Motivasi', url: '#', type: 'PDF' },
            ],
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
            ],
            essayExam: [
                {
                    question: 'Analisis gaya kepemimpinan yang paling efektif untuk memimpin tim remote/hybrid di era pasca-pandemi! Berikan contoh penerapannya!',
                    modelAnswer: 'Gaya kepemimpinan yang efektif untuk tim remote: 1) Transformational leadership (inspiring, vision-driven), 2) Servant leadership (supporting team needs). Penerapan: komunikasi rutin via video call, trust-based performance management, flexible working hours, focus on output bukan presence.',
                    rubric: {
                        teori: 'Pemahaman teori kepemimpinan (30%)',
                        konteks: 'Relevansi dengan konteks kerja remote/hybrid (40%)',
                        argumentasi: 'Contoh penerapan yang praktis dan logis (30%)',
                    },
                },
            ],
            quiz: [
                { question: 'POLC adalah singkatan dari...', options: ['Plan, Organize, Lead, Control', 'Planning, Organizing, Leading, Controlling', 'Process, Operation, Leadership, Command', 'Profit, Organization, Labor, Capital'], answer: 1 },
                { question: 'Manajer yang bertanggung jawab atas keseluruhan organisasi adalah...', options: ['First-line Manager', 'Middle Manager', 'Top Manager', 'Project Manager'], answer: 2 },
                { question: 'Teori X dan Y dikemukakan oleh...', options: ['Abraham Maslow', 'Frederick Herzberg', 'Douglas McGregor', 'Peter Drucker'], answer: 2 },
                { question: 'Faktor yang termasuk lingkungan eksternal adalah...', options: ['Budaya organisasi', 'Struktur organisasi', 'Kondisi ekonomi', 'Karyawan'], answer: 2 },
                { question: 'CSR adalah singkatan dari...', options: ['Customer Service Report', 'Corporate Social Responsibility', 'Company Strategic Review', 'Chief Sales Representative'], answer: 1 },
            ],
        },
    },
};

export default CONTENT_DATA;
