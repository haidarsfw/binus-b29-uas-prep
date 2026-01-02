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
                    { title: 'Modul 1: Marketing Channels & Logistics', driveId: '1PEHKsMdAJ6R32gh7K1KRG6cGuQ4QFifm4pJHSI9Sm0w', type: 'drive-gdoc' },
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
                    { title: 'Rangkuman Mentor (by Kak Zarnis)', driveId: '1R1BjF8tTbqH7lB4WX0D2SPkPL4pbfXHd', type: 'drive-pdf' },
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
                // ===== MODUL 1: KEPEMIMPINAN (Session 15-16) =====
                // Definisi
                { term: 'Pemimpin (Leader)', definition: 'Individu yang memiliki kemampuan untuk memengaruhi orang lain dan memegang otoritas manajerial' },
                { term: 'Kepemimpinan (Leadership)', definition: 'Proses memengaruhi sekelompok orang untuk mencapai tujuan bersama' },

                // Teori Sifat
                { term: 'Trait Theories', definition: 'Teori yang berfokus pada identifikasi karakteristik fisik atau kepribadian yang membedakan pemimpin dari bukan pemimpin (era 1920-1930an)' },

                // Teori Perilaku - Iowa
                { term: 'Gaya Autokratis', definition: 'Pemimpin memusatkan wewenang, mendikte metode kerja, dan membatasi partisipasi bawahan' },
                { term: 'Gaya Demokratis', definition: 'Pemimpin melibatkan karyawan dalam pengambilan keputusan dan mendelegasikan wewenang. Menghasilkan kepuasan kerja lebih tinggi' },
                { term: 'Gaya Laissez-faire', definition: 'Pemimpin memberikan kebebasan total kepada kelompok untuk membuat keputusan. Seringkali tidak efektif karena kurangnya arahan' },

                // Teori Perilaku - Ohio State
                { term: 'Initiating Structure (Orientasi Tugas)', definition: 'Sejauh mana pemimpin mendefinisikan peran, menetapkan target, dan mengorganisir pekerjaan' },
                { term: 'Consideration (Orientasi Hubungan)', definition: 'Sejauh mana pemimpin membangun hubungan kerja berdasarkan kepercayaan timbal balik dan menghargai perasaan bawahan' },

                // SLT
                { term: 'Situational Leadership Theory (SLT)', definition: 'Teori Hersey & Blanchard: kepemimpinan efektif bergantung pada penyesuaian gaya pemimpin dengan Kesiapan (Readiness) pengikut' },
                { term: 'R1 - Telling', definition: 'Pengikut Tidak Mampu & Tidak Mau → Pemimpin memberikan instruksi spesifik dan pengawasan ketat' },
                { term: 'R2 - Selling', definition: 'Pengikut Tidak Mampu tapi Mau → Pemimpin menjelaskan keputusan dan memberikan kesempatan bertanya' },
                { term: 'R3 - Participating', definition: 'Pengikut Mampu tapi Tidak Mau/Ragu → Pemimpin berbagi ide dan memfasilitasi pengambilan keputusan' },
                { term: 'R4 - Delegating', definition: 'Pengikut Mampu & Mau → Pemimpin menyerahkan tanggung jawab keputusan dan pelaksanaan sepenuhnya' },

                // Path-Goal Theory
                { term: 'Path-Goal Theory', definition: 'Teori yang menyatakan tugas pemimpin adalah membantu pengikut mencapai tujuan dengan memberikan arahan/dukungan. Pemimpin sebagai "pembuka jalan"' },

                // LMX Theory
                { term: 'In-Group (LMX)', definition: 'Kelompok yang dipercaya pemimpin, mendapat perhatian lebih, dan sering mendapat tugas istimewa' },
                { term: 'Out-Group (LMX)', definition: 'Kelompok yang hanya menjalankan tugas sesuai deskripsi formal dengan hubungan terbatas dengan pemimpin' },

                // 5 Sources of Power
                { term: 'Legitimate Power', definition: 'Kekuasaan yang berasal dari posisi formal dalam hierarki organisasi' },
                { term: 'Coercive Power', definition: 'Kekuasaan berdasarkan rasa takut atau kemampuan menghukum (memecat, menunda promosi)' },
                { term: 'Reward Power', definition: 'Kekuasaan untuk memberikan penghargaan atau insentif yang bernilai bagi orang lain' },
                { term: 'Expert Power', definition: 'Kekuasaan berdasarkan keahlian, keterampilan khusus, atau pengetahuan mendalam' },
                { term: 'Referent Power', definition: 'Kekuasaan yang muncul karena orang lain mengagumi atau ingin meniru karakteristik pribadi pemimpin (karisma)' },

                // Trust Dimensions
                { term: '5 Dimensi Kepercayaan', definition: 'Integritas (kejujuran), Kompetensi (skill), Konsistensi (keandalan), Loyalitas (melindungi), Keterbukaan (berbagi informasi)' },

                // ===== MODUL 2: PENGENDALIAN (Session 17-18) =====
                { term: 'Controlling (Pengendalian)', definition: 'Proses manajemen yang melibatkan pemantauan (monitoring), perbandingan (comparing), dan perbaikan (correcting) kinerja kerja' },
                { term: '3 Alasan Pentingnya Controlling', definition: 'Planning Link (feedback rencana), Empowering Employees (delegasi dgn kontrol), Protecting Workplace (lindungi aset)' },

                // Control Process
                { term: 'Langkah 1: Measuring', definition: 'Mengukur kinerja aktual melalui observasi langsung (MBWA), laporan statistik, laporan lisan, atau laporan tertulis' },
                { term: 'Range of Variation', definition: 'Kisaran variasi yang dapat diterima saat membandingkan kinerja aktual dengan standar' },
                { term: 'Langkah 3: Taking Managerial Action', definition: '3 opsi: Do Nothing (sesuai standar), Correct Performance (perbaiki), Revise Standard (ubah target)' },
                { term: 'Immediate vs Basic Corrective Action', definition: 'Immediate: padamkan masalah saat itu. Basic: analisis akar penyebab agar tidak terulang' },

                // Financial Controls
                { term: 'Rasio Likuiditas', definition: 'Mengukur kemampuan perusahaan membayar utang jangka pendek. Contoh: Current Ratio' },
                { term: 'Rasio Leverage', definition: 'Mengukur penggunaan utang untuk membiayai aset. Contoh: Debt to Assets Ratio' },
                { term: 'Rasio Aktivitas', definition: 'Mengukur efisiensi penggunaan aset. Contoh: Inventory Turnover' },
                { term: 'Rasio Profitabilitas', definition: 'Mengukur efektivitas menghasilkan laba. Contoh: Return on Investment (ROI)' },

                // Balanced Scorecard
                { term: 'Balanced Scorecard', definition: '4 perspektif evaluasi: Keuangan, Pelanggan, Proses Internal, Pembelajaran & Pertumbuhan (People/Innovation)' },
                { term: 'Benchmarking', definition: 'Proses pencarian praktik terbaik (best practices) dari pesaing atau non-pesaing untuk dijadikan referensi perbaikan' },
                { term: 'Employee Theft', definition: 'Pengambilan properti perusahaan tanpa izin: uang, barang kantor, atau "pencurian waktu" (main sosmed saat kerja)' },

                // ===== MODUL 3: KEWIRAUSAHAAN (Session 19-22) =====
                { term: 'Small Business vs Entrepreneurship', definition: 'Small Business: stabilitas, risiko sebagai ancaman. Entrepreneur: inovasi, growth, risiko sebagai peluang' },
                { term: '4 Proses Kewirausahaan', definition: 'Eksplorasi Konteks → Identifikasi Peluang → Memulai Usaha (Start) → Mengelola Usaha (Manage)' },
                { term: 'Feasibility Study', definition: 'Studi kelayakan sebelum investasi: analisis Kompetitor (differentiation) dan Pembiayaan (sumber modal)' },
                { term: 'Angel Investor', definition: 'Individu kaya yang berinvestasi di tahap awal startup' },
                { term: 'Venture Capital', definition: 'Perusahaan investasi profesional yang mendanai startup dengan potensi pertumbuhan tinggi' },

                // Legal Forms
                { term: 'Sole Proprietorship', definition: 'Bisnis dimiliki 1 orang. Kelebihan: mudah didirikan. Kekurangan: Unlimited Liability (harta pribadi ikut disita)' },
                { term: 'Partnership', definition: 'Dimiliki 2+ orang. Kelebihan: kombinasi modal & keahlian. Kekurangan: potensi konflik, unlimited liability' },
                { term: 'Corporation (C-Corp)', definition: 'Badan hukum terpisah. Kelebihan: Limited Liability. Kekurangan: biaya mahal, Double Taxation (pajak perusahaan + dividen)' },
                { term: 'LLC (Limited Liability Company)', definition: 'Bentuk hybrid: pajak fleksibel seperti Partnership + perlindungan hukum seperti Corporation' },

                // Risk Perception
                { term: 'Risk Avoider vs Risk Seeker', definition: 'Avoider: fokus sisi negatif. Seeker: fokus keuntungan positif. Kunci: Calculated Risk (kelola risiko)' },

                // Peter Drucker - Sources of Opportunity
                { term: 'The Unexpected (Drucker)', definition: 'Sumber peluang dari sukses/gagal yang tidak diduga. Contoh: Post-it Note dari kegagalan lem kuat' },
                { term: 'The Incongruous (Drucker)', definition: 'Ketidakcocokan antara "seharusnya" vs realita. Contoh: streaming muncul karena ketidaknyamanan sewa DVD' },
                { term: 'Demographics (Drucker)', definition: 'Perubahan struktur penduduk. Contoh: populasi menua buka peluang bisnis kesehatan lansia' },
                { term: 'Changes in Perception (Drucker)', definition: 'Perubahan cara pandang masyarakat. Contoh: gaya hidup sehat memicu bisnis katering diet' },

                // Office Politics
                { term: 'Politik Organisasi', definition: 'Realita: organisasi adalah entitas politis karena adanya Potensi Konflik atas Sumber Daya (anggaran, jabatan, fasilitas terbatas)' },
                { term: '3 Strategi Politik Kantor', definition: 'Networking, Hindari Tainted Members, Support Your Boss (dukung atasan agar karir naik bersama)' },

                // Motivation Theories
                { term: 'Hierarki Maslow', definition: '5 tingkat: Fisiologis → Keamanan (Safety) → Sosial → Penghargaan (Esteem) → Aktualisasi Diri' },
                { term: 'Teori Dua Faktor Herzberg', definition: 'Hygiene Factors (ekstrinsik: gaji) = cegah ketidakpuasan. Motivator Factors (intrinsik: prestasi) = tingkatkan kepuasan' },
                { term: 'Equity Theory', definition: 'Karyawan membandingkan (Input:Output) diri vs orang lain. Ketidakadilan = malas, absen, resign' },
                { term: 'Expectancy Theory', definition: '3 keyakinan: Expectancy (bisa capai target) → Instrumentality (pasti dapat reward) → Valence (reward menarik)' },

                // ===== MODUL 4: STRATEGI (Session 25-26) =====
                { term: 'Outsourcing', definition: 'Memindahkan aktivitas non-inti ke pihak eksternal yang lebih ahli. Contoh: bank sewa jasa keamanan' },
                { term: 'Offshoring', definition: 'Memindahkan proses bisnis/produksi ke negara lain (biaya tenaga kerja murah). Contoh: pabrik sepatu ke Vietnam' },
                { term: 'Value Chain Management', definition: 'Rantai Nilai: kontrol proses dari hulu ke hilir. Contoh: Starbucks kontrol dari petani kopi hingga barista' },
                { term: 'Integrated Value Chain (Starbucks)', definition: 'Kontrol kualitas dari pemilihan biji kopi Arabika, roasting di fasilitas khusus, hingga penyeduhan barista' },

                // Strategic Management
                { term: 'Manajemen Strategis', definition: 'Cetak biru (blueprint) tentang bagaimana perusahaan berbisnis, menang bersaing, dan memuaskan pelanggan' },
                { term: '6 Langkah Manajemen Strategis', definition: '1.Identifikasi Misi → 2.Analisis Eksternal (O/T) → 3.Analisis Internal (S/W) → 4.Rumus Strategi → 5.Implementasi → 6.Evaluasi' },
                { term: 'Misi vs Visi', definition: 'Misi: alasan keberadaan perusahaan (sekarang). Visi: apa yang ingin dicapai (masa depan)' },
                { term: 'Analisis SWOT', definition: 'Gabungan analisis eksternal (Opportunities, Threats) dan internal (Strengths, Weaknesses)' },
                { term: 'Core Competencies', definition: 'Kekuatan unik yang menjadi senjata utama perusahaan untuk menang bersaing' },
                { term: 'Corporate vs Competitive Strategy', definition: 'Corporate: bisnis apa yang dimasuki (tumbuh/stabil/ramping). Competitive: cara mengalahkan lawan' },

                // Competitive Advantage
                { term: 'Keunggulan Kompetitif', definition: 'Sesuatu yang membedakan dari pesaing: Kualitas (terbaik), Biaya Rendah (termurah), Teknologi/Inovasi (terdepan)' },
                { term: 'Economic Moat (Warren Buffett)', definition: 'Parit ekonomi: merek kuat (Coca-Cola), paten teknologi, atau biaya switching tinggi (ekosistem Apple)' },
                { term: 'First Mover', definition: 'Organisasi pertama yang bawa inovasi ke pasar. Untung: kuasai pasar, standar industri. Rugi: biaya riset mahal, risiko gagal' },
                { term: 'Second Mover Advantage', definition: 'Kompetitor bisa meniru dan menyempurnakan produk first mover dengan biaya lebih murah' },

                // ===== TAMBAHAN TEKNIS =====
                { term: "Porter's Five Forces", definition: '5 kekuatan industri: Threat of New Entrants, Threat of Substitutes, Bargaining Power of Buyers, Bargaining Power of Suppliers, Current Rivalry' },
                { term: 'Threat of New Entrants', definition: 'Ancaman pendatang baru: seberapa mudah orang bikin bisnis saingan?' },
                { term: 'Threat of Substitutes', definition: 'Ancaman produk pengganti. Contoh: kopi diganti teh' },
                { term: 'Bargaining Power of Buyers', definition: 'Kekuatan tawar pembeli: kalau pembeli sensitif harga, profit tipis' },
                { term: 'Bargaining Power of Suppliers', definition: 'Kekuatan tawar pemasok: kalau pemasok bahan baku cuma satu, dia bisa main harga' },
                { term: 'Current Rivalry', definition: 'Persaingan sesama pemain lama di industri' },

                // Business Plan Structure
                { term: '7 Bagian Business Plan', definition: 'Executive Summary, Company Description, Industry Analysis, Management Team, Service/Product, Marketing Strategy (4P), Financial Plan' },
                { term: 'Executive Summary', definition: 'Ringkasan eksekutif: dibuat terakhir, ditaruh paling depan di Business Plan' },

                // Employee Discipline
                { term: '4 Kategori Masalah Disiplin Karyawan', definition: 'Attendance (telat/bolos), On-the-Job Behaviors (mabuk/judi), Dishonesty (mencuri/bohong CV), Outside Activities (kriminal)' },
            ],
            quiz: [
                // ===== MODUL 1: KEPEMIMPINAN =====
                { question: 'Apa perbedaan utama antara Pemimpin dan Kepemimpinan?', options: ['Keduanya sama saja', 'Pemimpin = individu, Kepemimpinan = proses', 'Pemimpin = proses, Kepemimpinan = individu', 'Tidak ada perbedaan dalam manajemen'], answer: 1 },
                { question: 'Gaya kepemimpinan yang melibatkan karyawan dalam pengambilan keputusan adalah...', options: ['Autokratis', 'Demokratis', 'Laissez-faire', 'Telling'], answer: 1 },
                { question: 'Menurut SLT, pengikut R2 (Tidak Mampu tapi Mau) membutuhkan gaya...', options: ['Telling', 'Selling', 'Participating', 'Delegating'], answer: 1 },
                { question: 'Kekuasaan yang berasal dari keahlian atau pengetahuan mendalam disebut...', options: ['Legitimate Power', 'Coercive Power', 'Reward Power', 'Expert Power'], answer: 3 },
                { question: 'Kelompok yang dipercaya pemimpin dan sering mendapat tugas istimewa dalam LMX Theory adalah...', options: ['Out-Group', 'In-Group', 'Work-Group', 'Control-Group'], answer: 1 },
                { question: 'Teori yang menyatakan pemimpin sebagai "pembuka jalan" adalah...', options: ['Trait Theory', 'Path-Goal Theory', 'LMX Theory', 'SLT'], answer: 1 },
                { question: 'Dimensi Consideration dalam Teori Perilaku berorientasi pada...', options: ['Tugas dan target', 'Hubungan dan kepercayaan', 'Hukuman dan kontrol', 'Kekuasaan dan otoritas'], answer: 1 },
                { question: 'Kekuasaan berdasarkan kemampuan untuk menghukum disebut...', options: ['Legitimate Power', 'Coercive Power', 'Reward Power', 'Referent Power'], answer: 1 },

                // ===== MODUL 2: PENGENDALIAN =====
                { question: 'Controlling melibatkan 3 proses utama, yaitu...', options: ['Planning, Leading, Organizing', 'Monitoring, Comparing, Correcting', 'Hiring, Training, Firing', 'Budgeting, Forecasting, Auditing'], answer: 1 },
                { question: 'Tindakan korektif yang menganalisis akar penyebab masalah disebut...', options: ['Immediate Corrective Action', 'Basic Corrective Action', 'Revise Standard', 'Do Nothing'], answer: 1 },
                { question: 'Rasio yang mengukur kemampuan perusahaan membayar utang jangka pendek adalah...', options: ['Rasio Leverage', 'Rasio Likuiditas', 'Rasio Aktivitas', 'Rasio Profitabilitas'], answer: 1 },
                { question: 'Balanced Scorecard mengevaluasi perusahaan dari berapa perspektif?', options: ['2', '3', '4', '5'], answer: 2 },
                { question: 'Proses pencarian praktik terbaik dari pesaing disebut...', options: ['Controlling', 'Benchmarking', 'Auditing', 'Monitoring'], answer: 1 },
                { question: 'ROI termasuk dalam rasio...', options: ['Likuiditas', 'Leverage', 'Aktivitas', 'Profitabilitas'], answer: 3 },
                { question: 'Perspektif "People/Innovation" dalam Balanced Scorecard mengukur...', options: ['Keuangan', 'Pelanggan', 'Proses Internal', 'Pembelajaran & Pertumbuhan'], answer: 3 },

                // ===== MODUL 3: KEWIRAUSAHAAN =====
                { question: 'Perbedaan utama Small Business vs Entrepreneurship adalah...', options: ['Ukuran perusahaan', 'Jumlah karyawan', 'Pandangan terhadap risiko dan inovasi', 'Lokasi bisnis'], answer: 2 },
                { question: 'Bentuk kepemilikan bisnis dengan Unlimited Liability adalah...', options: ['Corporation', 'LLC', 'Sole Proprietorship', 'S-Corp'], answer: 2 },
                { question: 'Double Taxation terjadi pada bentuk bisnis...', options: ['Sole Proprietorship', 'Partnership', 'Corporation (C-Corp)', 'LLC'], answer: 2 },
                { question: 'Individu kaya yang berinvestasi di tahap awal startup disebut...', options: ['Venture Capital', 'Angel Investor', 'Hedge Fund', 'Private Equity'], answer: 1 },
                { question: 'Menurut Peter Drucker, Post-it Note adalah contoh sumber peluang...', options: ['Demographics', 'The Unexpected', 'The Incongruous', 'Changes in Perception'], answer: 1 },
                { question: 'Teori 2 Faktor Herzberg: gaji termasuk dalam...', options: ['Motivator Factors', 'Hygiene Factors', 'Intrinsic Factors', 'Growth Factors'], answer: 1 },
                { question: 'Menurut Equity Theory, karyawan membandingkan...', options: ['Gaji dengan target', 'Input:Output diri vs orang lain', 'Jam kerja dengan hasil', 'Skill dengan jabatan'], answer: 1 },
                { question: 'Tingkat teratas dalam Hierarki Maslow adalah...', options: ['Keamanan', 'Sosial', 'Penghargaan', 'Aktualisasi Diri'], answer: 3 },
                { question: 'Keyakinan "kalau target tercapai, pasti dapat bonus" dalam Expectancy Theory disebut...', options: ['Expectancy', 'Instrumentality', 'Valence', 'Motivation'], answer: 1 },
                { question: 'LLC menggabungkan kelebihan dari...', options: ['Sole Proprietorship dan Corporation', 'Partnership dan Corporation', 'Franchise dan Partnership', 'Corporation dan S-Corp'], answer: 1 },

                // ===== MODUL 4: STRATEGI =====
                { question: 'Memindahkan aktivitas ke pihak eksternal yang lebih ahli disebut...', options: ['Offshoring', 'Outsourcing', 'Restructuring', 'Downsizing'], answer: 1 },
                { question: 'Starbucks menggunakan konsep apa untuk menjaga konsistensi rasa kopi?', options: ['Franchise Model', 'Integrated Value Chain', 'Cost Leadership', 'Differentiation'], answer: 1 },
                { question: 'Berapa langkah dalam Proses Manajemen Strategis?', options: ['4', '5', '6', '7'], answer: 2 },
                { question: 'Analisis SWOT adalah gabungan langkah ke...', options: ['1 dan 2', '2 dan 3', '3 dan 4', '4 dan 5'], answer: 1 },
                { question: 'Istilah Warren Buffett untuk "parit ekonomi" adalah...', options: ['Competitive Advantage', 'Economic Moat', 'Blue Ocean', 'First Mover'], answer: 1 },
                { question: 'Organisasi pertama yang membawa inovasi ke pasar disebut...', options: ['Market Leader', 'First Mover', 'Pioneer', 'Innovator'], answer: 1 },
                { question: 'Misi perusahaan menjelaskan...', options: ['Tujuan masa depan', 'Alasan keberadaan perusahaan saat ini', 'Strategi bersaing', 'Target keuangan'], answer: 1 },
                { question: 'Corporate Strategy menjawab pertanyaan...', options: ['Bagaimana mengalahkan pesaing?', 'Bisnis apa yang akan dimasuki?', 'Siapa target pelanggan?', 'Berapa harga produk?'], answer: 1 },

                // ===== TAMBAHAN TEKNIS =====
                { question: "Berapa jumlah kekuatan dalam Porter's Five Forces?", options: ['3', '4', '5', '6'], answer: 2 },
                { question: 'Ancaman produk pengganti dalam Porter disebut...', options: ['Threat of New Entrants', 'Threat of Substitutes', 'Bargaining Power of Buyers', 'Current Rivalry'], answer: 1 },
                { question: 'Bagian Business Plan yang dibuat terakhir tapi ditaruh paling depan adalah...', options: ['Company Description', 'Executive Summary', 'Financial Plan', 'Industry Analysis'], answer: 1 },
                { question: 'Bermain media sosial saat jam kerja termasuk kategori...', options: ['Attendance', 'On-the-Job Behaviors', 'Dishonesty', 'Outside Activities'], answer: 1 },
                { question: 'Bargaining Power of Suppliers tinggi jika...', options: ['Banyak pemasok bahan baku', 'Pemasok bahan baku cuma satu', 'Harga bahan baku murah', 'Pembeli banyak pilihan'], answer: 1 },
                { question: 'Berapa bagian standar dalam struktur Business Plan?', options: ['5', '6', '7', '8'], answer: 2 },
            ],
        },
    },
};

export default CONTENT_DATA;
