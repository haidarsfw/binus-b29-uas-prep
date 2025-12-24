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
        'LA86': { 'Marketing Management': '2026-01-12T08:00:00', 'Human Resources Management': '2026-01-14T10:00:00', 'Management Information Systems for Leader': '2026-01-18T13:00:00', 'Introduction to Management and Business': '2026-01-22T08:00:00' },
        'LB86': { 'Marketing Management': '2026-01-12T10:00:00', 'Human Resources Management': '2026-01-15T13:00:00', 'Management Information Systems for Leader': '2026-01-19T08:00:00', 'Introduction to Management and Business': '2026-01-22T10:00:00' },
        'LC86': { 'Marketing Management': '2026-01-13T13:00:00', 'Human Resources Management': '2026-01-15T08:00:00', 'Management Information Systems for Leader': '2026-01-19T10:00:00', 'Introduction to Management and Business': '2026-01-23T13:00:00' },
        'LD86': { 'Marketing Management': '2026-01-13T15:00:00', 'Human Resources Management': '2026-01-16T15:00:00', 'Management Information Systems for Leader': '2026-01-20T15:00:00', 'Introduction to Management and Business': '2026-01-23T15:00:00' },
        'LE86': { 'Marketing Management': '2026-01-14T17:00:00', 'Human Resources Management': '2026-01-17T17:00:00', 'Management Information Systems for Leader': '2026-01-21T17:00:00', 'Introduction to Management and Business': '2026-01-24T17:00:00' },
        'Other': { 'Marketing Management': '2026-01-14T08:00:00', 'Human Resources Management': '2026-01-17T10:00:00', 'Management Information Systems for Leader': '2026-01-21T13:00:00', 'Introduction to Management and Business': '2026-01-24T15:00:00' },
    },

    classes: ['LA86', 'LB86', 'LC86', 'LD86', 'LE86', 'Other'],

    subjects: [
        { id: 'marketing', name: 'Marketing Management', icon: 'TrendingUp', description: 'Strategi pemasaran & marketing mix' },
        { id: 'hr', name: 'Human Resources Management', icon: 'Users', description: 'Rekrutmen & manajemen kinerja' },
        { id: 'mis', name: 'Management Information Systems for Leader', icon: 'Monitor', description: 'Sistem informasi & digital' },
        { id: 'intro', name: 'Introduction to Management and Business', icon: 'Briefcase', description: 'Dasar-dasar manajemen' },
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
                { id: 1, title: 'Sesi 17-18: Managing Knowledge and AI', driveId: '171mU9rgucQijqFYqrsjkYzey-KZzFFJDJqAHC4HbrSY', type: 'gslides', xp: 10 },
                { id: 2, title: 'Sesi 19-20: Enhancing Decision Making', driveId: '1Cn99eN5eYrEg2amdXoIughTI7iXBDhLEvVcIlN9mrec', type: 'gslides', xp: 10 },
                { id: 3, title: 'Sesi 21-22: Building Information Systems', driveId: '1dzai_J7FyPv6HQRqTRTcMAGr3d9JxUmz12VzxNR9WN0', type: 'gslides', xp: 10 },
                { id: 4, title: 'Sesi 23-24: Enterprise Applications', driveId: '1_26GBKYRlj5EXgDNvM8rxPwZ42vhzXeq9LJMtGh2phA', type: 'gslides', xp: 10 },
                { id: 5, title: 'Sesi 25-26: Final Exam Review', driveId: '17aZk_UhptDmOjqIJaa9fNLgvrshXUFxcsX3L0b4vnB8', type: 'gslides', xp: 10 },
            ],
            kisiKisi: [
                {
                    topic: 'A. MINI CASE (3 Soal)', items: [
                        'Soal No. 1: E-Commerce - Business Model (E-Commerce: Digital Markets, Digital Goods)',
                        'Soal No. 2: Knowledge Management (Managing Knowledge and Artificial Intelligence)',
                        'Soal No. 3: Decision Making (Enhancing Decision Making)'
                    ]
                },
                {
                    topic: 'B. STUDY CASE (2 Soal)', items: [
                        'Soal No. 1: Information Systems (Building Information Systems)',
                        'Soal No. 2: Operational Excellence (Enterprise Applications)'
                    ]
                },
            ],
            kisiKisiNote: 'Format Ujian: Mini Case 3 Soal + Study Case 2 Soal',
            flashcards: [
                // ===== MODUL 1: MANAJEMEN PENGETAHUAN & AI (Session 17-18) =====
                { id: 1, term: 'Hierarki Data, Informasi, Pengetahuan', definition: '1. Data: Fakta mentah (Cth: "Kopi, Rp 20rb"). 2. Informasi: Data yang diproses jadi pola (Cth: "Penjualan naik jam 10"). 3. Pengetahuan (Knowledge): Wawasan actionable untuk keputusan (Cth: "Tambah staf jam 10").' },
                { id: 2, term: 'Tacit Knowledge (Pengetahuan Tersirat)', definition: '[PENTING KASUS] Pengetahuan yang "hidup" di kepala karyawan (intuisi, pengalaman). Sulit diformulasikan & hilang jika karyawan keluar. (Cth: Insting negosiasi salesman veteran).' },
                { id: 3, term: 'Explicit Knowledge (Pengetahuan Tersurat)', definition: 'Pengetahuan yang sudah dikodifikasi/didokumentasikan. Mudah disimpan dan disebar. (Cth: SOP, Resep KFC, Database pelanggan). Tantangan KM: Mengubah Tacit menjadi Explicit.' },
                { id: 4, term: 'Knowledge Management Value Chain (4 Tahap)', definition: '1. Akuisisi: Berburu pengetahuan (Data mining, riset). 2. Penyimpanan: Digitizing, CMS, Knowledge Base. 3. Penyebaran: Portal, Email, Wiki (Orang tepat dapat info tepat). 4. Penerapan: Menggunakan pengetahuan untuk ubah praktik bisnis (Profit/Efisiensi).' },
                { id: 5, term: 'Knowledge Work Systems (KWS)', definition: '[ADDENDUM] Sistem khusus untuk "Pekerja Berpengetahuan" (Insinyur/Arsitek). Contoh: CAD (Desain 3D) dan VR (Simulasi). Solusi untuk kasus biro riset/desain.' },
                { id: 6, term: 'Enterprise Content Management (ECM)', definition: '[ADDENDUM] Sistem untuk mengelola dokumen tak terstruktur (PDF, Email, Video) agar mudah diindeks dan dicari.' },
                { id: 7, term: 'Artificial Intelligence (AI)', definition: 'Upaya sistem komputer meniru fungsi kognitif manusia (belajar, pola, masalah) untuk memproses data lebih cepat dan akurat, tanpa kesadaran biologis.' },
                { id: 8, term: 'Sistem Pakar (Expert Systems)', definition: '[TEKNIK AI] AI tertua untuk masalah terstruktur. Menggunakan aturan "JIKA - MAKA" (If-Then Rules). Cocok untuk diagnosa mesin/medis.' },
                { id: 9, term: 'Machine Learning (Pembelajaran Mesin)', definition: '[TEKNIK AI] Sistem "belajar sendiri" dari ribuan data historis untuk menemukan pola statistik tanpa aturan kaku. Semakin banyak data, semakin pintar. (Cth: Rekomendasi Netflix).' },
                { id: 10, term: 'Neural Networks (Jaringan Syaraf Tiruan)', definition: '[TEKNIK AI] Meniru otak biologis (neuron). Jago mengenali pola rumit/visual/non-linear. Solusi untuk Deteksi Penipuan (Fraud) dan Face ID.' },
                { id: 11, term: 'Algoritma Genetika (Genetic Algorithms)', definition: '[TEKNIK AI] Meniru evolusi (seleksi alam, mutasi) untuk mencari Solusi Optimal dari jutaan kombinasi. Solusi untuk Optimasi Rute Logistik.' },
                { id: 12, term: 'Agen Cerdas (Intelligent Agents)', definition: 'Software yang bekerja di background untuk tugas spesifik berulang tanpa intervensi manusia. (Cth: Chatbot, Siri, Auto-scheduler).' },
                // ===== MODUL 2: PENGAMBILAN KEPUTUSAN (Session 19-20) =====
                { id: 13, term: 'Keputusan Tidak Terstruktur (Unstructured)', definition: 'Level: Manajemen Senior. Masalah baru, non-rutin, butuh intuisi/penilaian. Tidak ada prosedur baku. (Cth: Investasi pabrik baru, Pindah pasar).' },
                { id: 14, term: 'Keputusan Terstruktur (Structured)', definition: 'Level: Manajemen Operasional. Masalah rutin, berulang, ada SOP jelas. Bisa diotomatisasi. (Cth: Restock barang jika sisa 10).' },
                { id: 15, term: 'Keputusan Semi-Terstruktur', definition: 'Level: Manajemen Menengah. Campuran prosedur standar dan penilaian manusia. (Cth: Analisis kenapa penjualan wilayah X turun).' },
                { id: 16, term: "Simon's Model (4 Tahap Keputusan)", definition: '[WAJIB HAFAL URUTAN] 1. Intelligence: Menemukan masalah ("Apa masalahnya?"). 2. Design: Merancang opsi solusi ("Apa pilihannya?"). 3. Choice: Memilih solusi terbaik ("Eksekusi yang mana?"). 4. Implementation: Menjalankan & memantau hasil.' },
                { id: 17, term: 'Business Intelligence (BI) Ecosystem', definition: 'Payung besar infrastruktur & alat analisis. Elemen: Data (Ops/IoT), Data Warehouse, Analytics Tools, Metode Manajerial (BSC), Platform Pengiriman (Dashboard), UI.' },
                { id: 18, term: 'Drill-down (Kemampuan BI)', definition: 'Kemampuan melihat detail data dari umum ke khusus. (Nasional -> Provinsi -> Kota -> Toko).' },
                { id: 19, term: 'Balanced Scorecard (BSC)', definition: '[SANGAT PENTING] Kerangka kerja strategis menyeimbangkan 4 dimensi: 1. Financial: Masa lalu (ROI, Cash). 2. Customer: Pandangan luar (Kepuasan, Retensi). 3. Internal Process: Efisiensi operasi (Produk cacat, Cycle time). 4. Learning & Growth: Masa depan (Skill karyawan, Sistem, Inovasi).' },
                { id: 20, term: 'Group Decision Support Systems (GDSS)', definition: 'Sistem interaktif untuk memfasilitasi rapat/pemecahan masalah kelompok tak terstruktur. Fitur: Voting elektronik, kuesioner anonim (mencegah dominasi satu orang).' },
                // ===== MODUL 3: MEMBANGUN SISTEM INFORMASI (Session 21-22) =====
                { id: 21, term: 'SDLC (Waterfall Model)', definition: 'Metode tradisional, bertahap, kaku, formal. Tahapan mengalir ke bawah seperti air terjun.' },
                { id: 22, term: '6 Tahapan SDLC (Urutan)', definition: '[WAJIB HAFAL URUTAN] 1. Analisis: Diagnosis masalah & Kebutuhan (Feasibility Study). 2. Desain: Blueprint teknis (Logical & Physical). 3. Pemrograman: Coding. 4. Pengujian: Unit, System, & Acceptance Testing. 5. Konversi: Pindah sistem lama ke baru. 6. Produksi & Maintenance: Operasional & perbaikan rutin.' },
                { id: 23, term: 'Strategi Konversi: Paralel', definition: 'Sistem lama & baru jalan bersamaan. Paling Aman, tapi Paling Mahal (double cost).' },
                { id: 24, term: 'Strategi Konversi: Direct Cutover', definition: 'Langsung ganti sistem di tanggal tertentu. Paling Murah, tapi Paling Berisiko (jika gagal, lumpuh).' },
                { id: 25, term: 'Prototyping', definition: 'Metode iteratif (berulang). Buat mockup cepat -> User coba -> Revisi. Cocok jika kebutuhan user abstrak/belum jelas. Risiko: Dokumentasi buruk ("tambal sulam").' },
                { id: 26, term: 'End-User Development', definition: 'User bikin sistem sendiri (Excel/Access). Cepat, tapi risiko Shadow IT, keamanan rendah, data tidak standar.' },
                { id: 27, term: 'Outsourcing (Make or Buy)', definition: 'Make (In-house): Jika sistem adalah Core Competency (rahasia dapur). Buy/Outsource: Jika fungsi umum (Payroll/HR) atau ingin pangkas biaya.' },
                { id: 28, term: 'Mobile App Development', definition: '[ADDENDUM] 1. Native App: Download di Store, cepat, akses fitur HP, mahal. 2. Mobile Web: Website tampilan HP, murah, fitur terbatas. 3. Responsive Design: 1 website otomatis menyesuaikan layar (PC/HP).' },
                // ===== MODUL 4: ENTERPRISE APPLICATIONS (Session 23-24) =====
                { id: 29, term: 'Enterprise Systems (ERP)', definition: 'Solusi "Silo Informasi". Satu database pusat terintegrasi. Sales input order -> Gudang, Produksi, Keuangan otomatis update real-time.' },
                { id: 30, term: 'Bullwhip Effect (SCM)', definition: 'Masalah distorsi informasi permintaan. Perubahan kecil di ritel menyebabkan fluktuasi stok besar di pabrik (penimbunan safety stock). Solusi: Berbagi data real-time.' },
                { id: 31, term: 'Push-Based Model (Build-to-Stock)', definition: 'Produksi berdasarkan Ramalan/Prediksi. Risiko: Gudang penuh jika ramalan salah.' },
                { id: 32, term: 'Pull-Based Model (Demand-Driven)', definition: 'Produksi dipicu Pesanan Nyata (Build-to-Order). Cth: Dell. Stok minim, efisien.' },
                { id: 33, term: 'Upstream vs Downstream SCM', definition: '[ADDENDUM - WAJIB HAFAL] Upstream (Hulu): Hubungan dengan Supplier (Bahan baku). Downstream (Hilir): Hubungan dengan Distributor & Pelanggan (Barang jadi, pengiriman).' },
                { id: 34, term: 'CRM Operasional', definition: 'Customer-facing. Melayani pelanggan langsung. Cth: SFA (Sales), Call Center, Marketing Automation.' },
                { id: 35, term: 'CRM Analitis', definition: 'Analisis Data. Tidak melayani langsung, tapi cari pola (CLV, Churn Rate) pakai Data Mining.' },
                { id: 36, term: 'Social CRM', definition: '[ADDENDUM] Menghubungkan sistem CRM dengan percakapan medsos (Twitter/FB) agar CS bisa respon komplain publik dengan cepat.' },
                { id: 37, term: 'Customer Lifetime Value (CLV)', definition: 'Metrik CRM Analitis: Total profit yang didapat dari satu pelanggan seumur hidupnya. Menentukan siapa pelanggan VIP.' },
                // ===== MODUL 5: E-COMMERCE & PASAR DIGITAL (Session 25-26) =====
                { id: 38, term: '8 Fitur Unik E-Commerce', definition: '[WAJIB HAFAL] 1. Ubiquity: Ada di mana saja (belanja dr kasur). 2. Global Reach: Lintas negara. 3. Universal Standards: Standar teknis sama. 4. Richness: Video/Audio/Teks kompleks. 5. Interactivity: Komunikasi 2 arah. 6. Info Density: Info murah, akurat, transparan. 7. Personalization: Konten sesuai individu. 8. Social Tech: User content & sharing.' },
                { id: 39, term: 'Information Asymmetry', definition: 'Ketimpangan info penjual vs pembeli. Di pasar digital, asimetri ini berkurang (transparan).' },
                { id: 40, term: 'Disintermediation', definition: 'Penghapusan perantara (Distributor/Grosir). Produsen jual langsung ke konsumen -> Harga lebih murah.' },
                { id: 41, term: 'Model Bisnis: Market Creator', definition: 'Platform tempat bertemu penjual & pembeli. Tidak punya barang. (Cth: Tokopedia, Shopee, eBay).' },
                { id: 42, term: 'Model Bisnis: Transaction Broker', definition: 'Proses transaksi, ambil fee, hemat waktu user. (Cth: Traveloka, Gojek).' },
                { id: 43, term: 'Revenue Model: Freemium', definition: 'Layanan dasar gratis, fitur canggih bayar. (Cth: Spotify Free vs Premium, LinkedIn).' },
                { id: 44, term: 'Revenue Model: Affiliate', definition: 'Komisi dari merujuk pengunjung ke situs lain (Referral link).' },
                { id: 45, term: 'Barang Digital (Digital Goods)', definition: 'Barang dikirim via jaringan (Musik, Software). Biaya produksi unit pertama mahal, unit kedua (copy) Hampir NOL. Margin tinggi.' },
                { id: 46, term: 'Micropayment Systems', definition: '[ADDENDUM] Pembayaran transaksi nilai sangat kecil/receh (<$10). Penting untuk jual beli konten digital eceran (lagu/item game).' },
            ],
            essayExam: [{ question: 'Bagaimana ERP meningkatkan efisiensi UMKM?', modelAnswer: 'Integrasi data, otomatisasi, real-time reporting.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                // ===== MODUL 1: KM & AI (7 questions) =====
                { id: 1, question: 'Dalam hierarki nilai data, manakah yang didefinisikan sebagai fakta mentah yang belum diolah dan belum memiliki arti strategis?', options: ['Informasi', 'Pengetahuan (Knowledge)', 'Data', 'Wawasan (Insight)'], answer: 2, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 2, question: "Pengetahuan yang 'hidup' di dalam kepala karyawan, bersifat subjektif, berbasis intuisi, dan sulit didokumentasikan disebut sebagai:", options: ['Explicit Knowledge', 'Tacit Knowledge', 'Structured Knowledge', 'External Knowledge'], answer: 1, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 3, question: 'Manakah urutan yang benar dari empat mata rantai Rantai Nilai Manajemen Pengetahuan (Knowledge Management Value Chain)?', options: ['Akuisisi -> Penyimpanan -> Penyebaran -> Penerapan', 'Penyimpanan -> Akuisisi -> Penerapan -> Penyebaran', 'Akuisisi -> Penerapan -> Penyebaran -> Penyimpanan', 'Perencanaan -> Akuisisi -> Penyimpanan -> Evaluasi'], answer: 0, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 4, question: "Teknik AI yang menggunakan aturan logika 'JIKA - MAKA' (If-Then Rules) untuk meniru kemampuan pengambilan keputusan seorang ahli manusia disebut:", options: ['Neural Networks', 'Genetic Algorithms', 'Sistem Pakar (Expert Systems)', 'Machine Learning'], answer: 2, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 5, question: 'Teknik AI yang meniru arsitektur biologis otak manusia dan sangat efektif untuk mengenali pola visual rumit seperti wajah atau deteksi penipuan kartu kredit adalah:', options: ['Fuzzy Logic', 'Intelligent Agents', 'Jaringan Syaraf Tiruan (Neural Networks)', 'Sistem Pakar'], answer: 2, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 6, question: "Sistem khusus yang dirancang untuk membantu 'Pekerja Berpengetahuan' seperti arsitek atau insinyur dalam menciptakan pengetahuan baru (contoh: CAD atau VR) disebut:", options: ['Knowledge Work Systems (KWS)', 'Office Automation Systems (OAS)', 'Transaction Processing Systems (TPS)', 'Decision Support Systems (DSS)'], answer: 0, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 7, question: 'Untuk mencari solusi optimal dari jutaan kemungkinan kombinasi (seperti optimasi rute logistik), teknik AI manakah yang meniru proses evolusi biologi?', options: ['Machine Learning', 'Algoritma Genetika (Genetic Algorithms)', 'Natural Language Processing', 'Robotics'], answer: 1, xp: 5, category: 'Modul 1: KM & AI' },
                // ===== MODUL 2: Decision Making (5 questions) =====
                { id: 8, question: 'Keputusan yang sifatnya baru, penting, tidak rutin, dan membutuhkan penilaian mendalam dari Manajemen Senior dikategorikan sebagai:', options: ['Keputusan Terstruktur', 'Keputusan Semi-Terstruktur', 'Keputusan Tidak Terstruktur', 'Keputusan Operasional'], answer: 2, xp: 5, category: 'Modul 2: Decision Making' },
                { id: 9, question: 'Menurut Herbert Simon, tahap pertama dalam pemecahan masalah di mana manajer menyelidiki lingkungan untuk menemukan masalah disebut:', options: ['Design', 'Choice', 'Implementation', 'Intelligence'], answer: 3, xp: 5, category: 'Modul 2: Decision Making' },
                { id: 10, question: 'Dalam Balanced Scorecard, dimensi yang berfokus pada kemampuan perusahaan untuk terus berinovasi, memperbaiki sistem, dan meningkatkan keahlian karyawan adalah:', options: ['Financial', 'Customer', 'Internal Business Process', 'Learning & Growth'], answer: 3, xp: 5, category: 'Modul 2: Decision Making' },
                { id: 11, question: 'Kemampuan sistem Business Intelligence untuk melihat data dari tingkat ringkasan (nasional) ke tingkat yang lebih detail (kota/toko) disebut:', options: ['Drill-down', 'Forecast', 'Roll-up', 'Slicing'], answer: 0, xp: 5, category: 'Modul 2: Decision Making' },
                { id: 12, question: 'Sistem interaktif yang memfasilitasi pemecahan masalah tidak terstruktur oleh sekelompok pengambil keputusan dengan fitur voting elektronik dan anonimitas adalah:', options: ['CRM', 'ERP', 'GDSS (Group Decision Support Systems)', 'SCM'], answer: 2, xp: 5, category: 'Modul 2: Decision Making' },
                // ===== MODUL 3: Building IS (7 questions) =====
                { id: 13, question: 'Metode pengembangan sistem tradisional yang tahapannya mengalir berurutan (Analisis -> Desain -> Coding -> Testing) dan kaku disebut:', options: ['Agile', 'Prototyping', 'SDLC (Waterfall)', 'Scrum'], answer: 2, xp: 5, category: 'Modul 3: Building IS' },
                { id: 14, question: 'Manakah urutan yang BENAR dari tahapan SDLC?', options: ['Analisis -> Desain -> Pemrograman -> Pengujian -> Konversi -> Produksi', 'Desain -> Analisis -> Pengujian -> Pemrograman -> Produksi -> Konversi', 'Analisis -> Pengujian -> Desain -> Pemrograman -> Konversi -> Produksi', 'Perencanaan -> Desain -> Analisis -> Konversi -> Pengujian -> Produksi'], answer: 0, xp: 5, category: 'Modul 3: Building IS' },
                { id: 15, question: 'Strategi konversi sistem di mana sistem lama dan baru dijalankan bersamaan untuk sementara waktu (paling aman namun paling mahal) adalah:', options: ['Direct Cutover', 'Parallel Strategy', 'Pilot Study', 'Phased Approach'], answer: 1, xp: 5, category: 'Modul 3: Building IS' },
                { id: 16, question: 'Jenis pengujian sistem yang dilakukan oleh pengguna akhir (user) untuk menentukan apakah sistem layak digunakan secara operasional disebut:', options: ['Unit Testing', 'System Testing', 'Integration Testing', 'Acceptance Testing'], answer: 3, xp: 5, category: 'Modul 3: Building IS' },
                { id: 17, question: 'Metode pengembangan sistem yang bersifat iteratif (berulang), di mana model kerja awal dibuat dengan cepat untuk dicoba oleh pengguna, disebut:', options: ['Waterfall', 'Prototyping', 'Outsourcing', 'SDLC'], answer: 1, xp: 5, category: 'Modul 3: Building IS' },
                { id: 18, question: 'Jika sebuah perusahaan ingin membangun aplikasi mobile yang dapat mengakses fitur hardware (kamera/GPS) secara maksimal dan performa tinggi, jenis aplikasi apa yang harus dipilih?', options: ['Mobile Web App', 'Native App', 'Responsive Web', 'HTML5 App'], answer: 1, xp: 5, category: 'Modul 3: Building IS' },
                { id: 19, question: 'Dokumen formal yang dikirimkan perusahaan kepada vendor perangkat lunak untuk meminta spesifikasi dan harga saat ingin membeli sistem paket disebut:', options: ['SOP', 'RFP (Request for Proposal)', 'SLA (Service Level Agreement)', 'Memo Internal'], answer: 1, xp: 5, category: 'Modul 3: Building IS' },
                // ===== MODUL 4: Ops & CRM (8 questions) =====
                { id: 20, question: 'Masalah dalam rantai pasok di mana perubahan kecil pada permintaan pelanggan menyebabkan fluktuasi stok yang besar di tingkat distributor dan pabrik disebut:', options: ['Just-in-Time Effect', 'Pull Effect', 'Bullwhip Effect', 'Domino Effect'], answer: 2, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 21, question: 'Model rantai pasok di mana produksi dipicu langsung oleh pesanan nyata pelanggan (Build-to-Order) disebut:', options: ['Push-Based Model', 'Pull-Based Model', 'Forecast-Driven Model', 'Stock-Based Model'], answer: 1, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 22, question: "Sistem perusahaan yang mengintegrasikan berbagai departemen (Keuangan, HR, Gudang, Sales) ke dalam satu database pusat untuk menghilangkan 'Silo Informasi' adalah:", options: ['CRM (Customer Relationship Management)', 'SCM (Supply Chain Management)', 'ERP (Enterprise Resource Planning)', 'KMS (Knowledge Management System)'], answer: 2, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 23, question: 'Bagian dari rantai pasok yang fokus pada hubungan perusahaan dengan pemasok (Suppliers) untuk mengelola bahan baku disebut:', options: ['Downstream Supply Chain', 'Upstream Supply Chain', 'Internal Supply Chain', 'Logistics Chain'], answer: 1, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 24, question: 'Jenis CRM yang tidak berhadapan langsung dengan pelanggan, tetapi menganalisis data untuk menemukan pola perilaku (seperti Churn Rate atau CLV) adalah:', options: ['Operational CRM', 'Analytical CRM', 'Collaborative CRM', 'Social CRM'], answer: 1, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 25, question: 'Metrik CRM yang menghitung total keuntungan yang diharapkan dari seorang pelanggan selama masa hubungannya dengan perusahaan disebut:', options: ['ROI (Return on Investment)', 'Churn Rate', 'CLV (Customer Lifetime Value)', 'NPS (Net Promoter Score)'], answer: 2, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 37, question: 'Alat yang menghubungkan data percakapan pelanggan di media sosial (Facebook/Twitter) langsung ke dalam sistem CRM perusahaan disebut:', options: ['Social CRM', 'Mobile CRM', 'Cloud CRM', 'Operational CRM'], answer: 0, xp: 5, category: 'Modul 4: Ops & CRM' },
                // ===== MODUL 5: E-Commerce (9 questions) =====
                { id: 26, question: 'Fitur unik E-Commerce yang memungkinkan pasar tersedia di mana saja dan kapan saja (membebaskan pasar dari batasan fisik) adalah:', options: ['Global Reach', 'Richness', 'Ubiquity', 'Interactivity'], answer: 2, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 27, question: 'Fenomena di mana produsen menjual produk langsung ke konsumen tanpa melalui perantara (distributor/grosir) disebut:', options: ['Disintermediation', 'Information Asymmetry', 'Price Discrimination', 'Market Segmentation'], answer: 0, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 28, question: 'Di pasar tradisional terjadi ketimpangan informasi antara penjual dan pembeli. Di pasar digital, transparansi membuat hal ini berkurang. Istilah untuk ketimpangan ini adalah:', options: ['Information Density', 'Information Asymmetry', 'Digital Divide', 'Network Effect'], answer: 1, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 29, question: 'Model bisnis E-Commerce di mana perusahaan menyediakan platform digital tempat bertemunya penjual dan pembeli (contoh: Tokopedia, eBay) disebut:', options: ['E-tailer', 'Content Provider', 'Market Creator', 'Service Provider'], answer: 2, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 30, question: 'Perusahaan seperti Netflix atau Spotify yang mendistribusikan informasi, musik, atau video secara online termasuk dalam model bisnis:', options: ['Transaction Broker', 'Content Provider', 'Community Provider', 'Portal'], answer: 1, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 31, question: 'Model pendapatan di mana perusahaan menawarkan layanan dasar secara gratis tetapi mengenakan biaya untuk fitur premium/canggih disebut:', options: ['Subscription Model', 'Sales Revenue Model', 'Freemium Revenue Model', 'Affiliate Revenue Model'], answer: 2, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 32, question: 'Karakteristik unik dari Barang Digital (Digital Goods) adalah:', options: ['Biaya produksi unit pertama murah, biaya salinan mahal', 'Biaya produksi unit pertama mahal, biaya salinan (marginal cost) hampir nol', 'Biaya penyimpanan sangat tinggi', 'Tidak bisa dikirim melalui jaringan internet'], answer: 1, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 33, question: 'Sistem pembayaran yang memungkinkan transaksi bernilai sangat kecil (receh, misal di bawah $10) secara efisien disebut:', options: ['Credit Card Systems', 'Micropayment Systems', 'Bank Transfer', 'COD (Cash on Delivery)'], answer: 1, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 34, question: 'Model pendapatan di mana situs web mendapatkan komisi karena mengirimkan pengunjung ke situs lain (referral) disebut:', options: ['Affiliate Revenue Model', 'Advertising Revenue Model', 'Subscription Revenue Model', 'Transaction Fee Revenue Model'], answer: 0, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 39, question: 'Fitur E-Commerce yang memungkinkan pesan atau produk disesuaikan dengan individu spesifik (seperti rekomendasi nama di produk) disebut:', options: ['Universal Standards', 'Personalization/Customization', 'Global Reach', 'Information Density'], answer: 1, xp: 5, category: 'Modul 5: E-Commerce' },
                // ===== ADDITIONAL QUESTIONS =====
                { id: 35, question: 'Strategi konversi yang paling berisiko karena jika sistem baru gagal maka operasional akan terhenti total (tidak ada backup sistem lama) adalah:', options: ['Parallel Strategy', 'Phased Approach', 'Direct Cutover', 'Pilot Study'], answer: 2, xp: 5, category: 'Modul 3: Building IS' },
                { id: 36, question: "Dalam keputusan 'Make or Buy', perusahaan sebaiknya memilih 'Buy' (Membeli Paket Software) atau 'Outsource' jika:", options: ['Sistem tersebut merupakan Core Competency perusahaan', 'Sistem tersebut bersifat rahasia dan unik', 'Sistem tersebut adalah fungsi umum (seperti Payroll) dan bukan keunggulan kompetitif utama', 'Perusahaan memiliki tim IT yang sangat besar dan menganggur'], answer: 2, xp: 5, category: 'Modul 3: Building IS' },
                { id: 38, question: "Jenis laporan BI yang memungkinkan pengguna memfilter data berdasarkan kriteria tertentu (misal: 'Hanya tampilkan penjualan wilayah Jakarta') disebut:", options: ['Production Reports', 'Parameterized Reports', 'Dashboards', 'Forecasts'], answer: 1, xp: 5, category: 'Modul 2: Decision Making' },
                { id: 40, question: 'Tahap terakhir dalam Rantai Nilai Manajemen Pengetahuan (KM Value Chain), di mana pengetahuan digunakan untuk mengubah praktik bisnis menjadi lebih efisien, adalah:', options: ['Akuisisi Pengetahuan', 'Penyimpanan Pengetahuan', 'Penyebaran Pengetahuan', 'Penerapan Pengetahuan'], answer: 3, xp: 5, category: 'Modul 1: KM & AI' },
                // ===== ADDITIONAL BATCH 2 (13 questions) =====
                { id: 41, question: 'Program perangkat lunak yang bekerja di latar belakang tanpa intervensi manusia langsung untuk melaksanakan tugas spesifik, berulang, dan terprediksi (contoh: Chatbot atau Siri) disebut:', options: ['Expert Systems', 'Neural Networks', 'Intelligent Agents', 'Genetic Algorithms'], answer: 2, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 42, question: 'Sistem yang digunakan untuk mengelola dokumen tak terstruktur seperti PDF, Email, dan Video agar mudah diindeks dan dicari perusahaan adalah:', options: ['KMS (Knowledge Management System)', 'ECM (Enterprise Content Management)', 'ERP (Enterprise Resource Planning)', 'TPS (Transaction Processing System)'], answer: 1, xp: 5, category: 'Modul 1: KM & AI' },
                { id: 43, question: 'Keputusan yang bersifat rutin, berulang, dan sudah memiliki prosedur standar (SOP) yang jelas (contoh: pemesanan ulang stok otomatis) dikategorikan sebagai:', options: ['Keputusan Tidak Terstruktur', 'Keputusan Semi-Terstruktur', 'Keputusan Terstruktur', 'Keputusan Strategis'], answer: 2, xp: 5, category: 'Modul 2: Decision Making' },
                { id: 44, question: 'Tahap kedua dalam model Simon, di mana manajer merancang, mengembangkan, dan menganalisis berbagai kemungkinan solusi, disebut:', options: ['Intelligence', 'Design', 'Choice', 'Implementation'], answer: 1, xp: 5, category: 'Modul 2: Decision Making' },
                { id: 45, question: 'Metode pengembangan sistem di mana pengguna bisnis (non-IT) membuat sistem mereka sendiri menggunakan alat sederhana seperti Excel atau Access (berisiko menimbulkan Shadow IT) disebut:', options: ['Prototyping', 'Outsourcing', 'End-User Development', 'Agile Development'], answer: 2, xp: 5, category: 'Modul 3: Building IS' },
                { id: 46, question: 'Tahap pengujian program di mana sistem diuji per modul kecil secara terpisah sebelum digabungkan disebut:', options: ['Unit Testing', 'System Testing', 'Acceptance Testing', 'Stress Testing'], answer: 0, xp: 5, category: 'Modul 3: Building IS' },
                { id: 47, question: 'Strategi konversi di mana sistem baru diterapkan di satu area terbatas dulu (misal: hanya Cabang Jakarta) sebagai percobaan sebelum ke seluruh perusahaan adalah:', options: ['Direct Cutover', 'Parallel Strategy', 'Pilot Study', 'Phased Approach'], answer: 2, xp: 5, category: 'Modul 3: Building IS' },
                { id: 48, question: "Model produksi 'Build-to-Stock' di mana jadwal produksi didasarkan pada ramalan/prediksi permintaan (berisiko gudang penuh jika prediksi salah) disebut:", options: ['Pull-Based Model', 'Push-Based Model', 'Just-in-Time', 'Demand-Driven'], answer: 1, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 49, question: 'Bagian rantai pasok yang fokus pada distribusi barang jadi ke distributor, pengecer, hingga sampai ke tangan pelanggan disebut:', options: ['Upstream Supply Chain', 'Downstream Supply Chain', 'Internal Supply Chain', 'Supplier Network'], answer: 1, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 50, question: 'Jenis CRM yang mencakup aplikasi yang berhadapan langsung dengan pelanggan (Customer-facing), seperti Sales Force Automation dan Call Center, adalah:', options: ['Analytical CRM', 'Operational CRM', 'Strategic CRM', 'Social CRM'], answer: 1, xp: 5, category: 'Modul 4: Ops & CRM' },
                { id: 51, question: 'Fitur E-Commerce yang memungkinkan penyajian pesan yang kompleks (teks, audio, video) secara bersamaan untuk memberikan pengalaman mendalam disebut:', options: ['Ubiquity', 'Richness', 'Global Reach', 'Interactivity'], answer: 1, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 52, question: 'Model bisnis di mana perusahaan bertindak sebagai perantara yang memproses transaksi dan mengambil fee (contoh: Traveloka, Gojek) disebut:', options: ['Market Creator', 'Transaction Broker', 'Content Provider', 'Portal'], answer: 1, xp: 5, category: 'Modul 5: E-Commerce' },
                { id: 53, question: "Model bisnis yang menyediakan 'pintu gerbang' masuk ke web dengan paket layanan lengkap seperti berita, email, dan pencarian (contoh: Yahoo, MSN) disebut:", options: ['Portal', 'E-tailer', 'Community Provider', 'Service Provider'], answer: 0, xp: 5, category: 'Modul 5: E-Commerce' },
            ],
            rangkuman: {
                modulInti: [
                    { title: 'Modul 1: Manajemen Pengetahuan & AI', contentKey: 'modul1', type: 'native' },
                    { title: 'Modul 2: Peningkatan Pengambilan Keputusan', contentKey: 'modul2', type: 'native' },
                    { title: 'Modul 3: Membangun Sistem Informasi', contentKey: 'modul3', type: 'native' },
                    { title: 'Modul 4: Enterprise Applications (ERP/SCM/CRM)', contentKey: 'modul4', type: 'native' },
                    { title: 'Modul 5: E-Commerce & Pasar Digital', contentKey: 'modul5', type: 'native' },
                ],
                addendum: [
                    { title: 'Addendum: Detail Teknis Hafalan Slide', contentKey: 'tambahan', type: 'native' },
                ],
                mentorPPT: [
                    { title: 'Rangkuman Mentor MIS', driveId: '1BVqxMm333yl6p2TahXa-Tdu87RVQz1Wq', type: 'pdf' },
                ],
            },
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
                    { title: 'Modul 3: Kewirausahaan & Manajemen Risiko', contentKey: 'modul3', type: 'native' },
                    { title: 'Modul 4: Strategi & Praktik Manajemen', contentKey: 'modul4', type: 'native' },
                ],
                addendum: [
                    { title: 'Tambahan Detail Teknis (Hafalan Slide)', contentKey: 'tambahan', type: 'native' },
                ],
                mentorPPT: [
                    { title: 'Rangkuman Mentor (by Kak Zarnis)', driveId: '1R1BjF8tTbqH7lB4WX0D2SPkPL4pbfXHd', type: 'pdf' },
                ],
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
            kisiKisiTambahan: [
                {
                    topic: 'A. CASE STUDY 1: STARBUCKS (COMPANY SBX)', subtitle: 'Topik: Risk Management & Strategy Building', items: [
                        'Strategy Building: Bagaimana strategi Starbucks dalam membangun bisnisnya.',
                        'Risk Framework: Kerangka kerja risiko.',
                        'Risk Identification: Identifikasi risiko.',
                        'Risk Management: Manajemen risiko secara umum.',
                        'Risk Mitigation: Mitigasi (pengurangan) risiko.',
                        'Fail-Safe Protocols: Protokol keamanan/kegagalan (fail-safe).'
                    ]
                },
                {
                    topic: 'B. CASE STUDY 2: MIXUE', subtitle: 'Topik: Strategic Evaluation', items: [
                        'Induk Bisnis Mixue: Analisis terkait induk perusahaan.',
                        'Strategic Evaluation 1 & 2: Tahapan evaluasi strategis (1 dan 2).',
                        'Performance Gap: Analisis performance gap between strategy (celah kinerja antara strategi dan realisasi).',
                        'Digital: Aspek digital dalam strategi Mixue.'
                    ]
                },
                {
                    topic: 'C. TOPIK ESAI (KONSEP UMUM)', items: [
                        'Entrepreneurship & MSME: Konsep kewirausahaan dan kaitannya dengan UMKM (Micro, Small, and Medium Enterprises).',
                        'Strategic Management: Manajemen strategis.',
                        'Corporate Global Strategy: Strategi global korporasi (Global/Corporate Global Strategy).'
                    ]
                },
            ],
            kisiKisiTambahanNote: '*dari Kemanggisan, LE21',
            flashcards: [
                // ===== MODUL 1: KEPEMIMPINAN (Session 15-16) - 14 Flashcards =====
                { id: 1, term: 'Definisi Pemimpin (Leader)', definition: 'Individu yang memiliki kemampuan untuk memengaruhi orang lain dan memegang otoritas manajerial.' },
                { id: 2, term: 'Definisi Kepemimpinan (Leadership)', definition: 'Proses memengaruhi sekelompok orang untuk mencapai tujuan bersama.' },
                { id: 3, term: 'Teori Sifat (Trait Theories)', definition: 'Teori (1920-30an) yang meyakini "pemimpin itu dilahirkan, bukan dibentuk". Fokus pada fisik, penampilan, dan kelas sosial. Kesimpulan: Kurang valid karena tidak ada satu set sifat universal yang menjamin kesuksesan.' },
                { id: 4, term: '3 Gaya Kepemimpinan (Univ. of Iowa)', definition: '1. Autokratis: Memusatkan wewenang, mendikte, membatasi partisipasi. 2. Demokratis: Melibatkan karyawan, delegasi wewenang (kepuasan kerja tinggi). 3. Laissez-faire: Kebebasan total (sering tidak efektif).' },
                { id: 5, term: '2 Dimensi Perilaku (Ohio & Michigan)', definition: '1. Orientasi Tugas (Initiating Structure): Definisi peran, target, organisasi kerja. 2. Orientasi Hubungan (Consideration): Kepercayaan timbal balik, menghargai perasaan bawahan.' },
                { id: 6, term: 'Situational Leadership Theory (SLT)', definition: 'Teori Hersey & Blanchard: Efektivitas tergantung penyesuaian gaya pemimpin dengan Kesiapan (Readiness) pengikut (Ability + Willingness).' },
                { id: 7, term: 'SLT: R1 (Tidak Mampu & Tidak Mau)', definition: 'Butuh gaya Telling: Instruksi spesifik dan pengawasan ketat.' },
                { id: 8, term: 'SLT: R2 (Tidak Mampu tapi Mau)', definition: 'Butuh gaya Selling: Menjelaskan keputusan, memberi kesempatan bertanya (jaga motivasi).' },
                { id: 9, term: 'SLT: R3 (Mampu tapi Tidak Mau/Ragu)', definition: 'Butuh gaya Participating: Berbagi ide, fasilitasi keputusan (tingkatkan PD).' },
                { id: 10, term: 'SLT: R4 (Mampu & Mau)', definition: 'Butuh gaya Delegating: Menyerahkan tanggung jawab keputusan & pelaksanaan sepenuhnya.' },
                { id: 11, term: 'Path-Goal Theory', definition: 'Tugas pemimpin adalah membantu pengikut mencapai tujuan dan menjadi "pembuka jalan" (membersihkan hambatan).' },
                { id: 12, term: 'Leader-Member Exchange (LMX)', definition: 'Pemimpin membedakan bawahan menjadi: 1. In-Group: Dipercaya, tugas istimewa, kinerja tinggi. 2. Out-Group: Hanya tugas formal, hubungan terbatas.' },
                { id: 13, term: '5 Sumber Kekuasaan (Sources of Power)', definition: '1. Legitimate: Dari posisi formal. 2. Coercive: Rasa takut/hukuman. 3. Reward: Memberi penghargaan/insentif. 4. Expert: Keahlian/skill khusus. 5. Referent: Karisma/dikagumi.' },
                { id: 14, term: '5 Dimensi Kepercayaan (Trust)', definition: '1. Integritas: Kejujuran. 2. Kompetensi: Skill teknis/interpersonal. 3. Konsistensi: Keandalan. 4. Loyalitas: Melindungi wajah orang lain. 5. Keterbukaan: Berbagi info secara bebas.' },
                // ===== MODUL 2: PENGENDALIAN (Session 17-18) - 9 Flashcards =====
                { id: 15, term: 'Definisi Pengendalian (Controlling)', definition: 'Proses memantau (monitoring), membandingkan (comparing), dan memperbaiki (correcting) kinerja. Mata rantai terakhir fungsi manajemen.' },
                { id: 16, term: '3 Alasan Pentingnya Controlling', definition: '1. Planning Link: Memastikan rencana realistis & efektif. 2. Empowering Employees: Memberikan otonomi dengan pantauan hasil. 3. Protecting Workplace: Melindungi aset & memastikan keamanan (K3).' },
                { id: 17, term: '3 Langkah Proses Pengendalian', definition: '1. Measuring: Mengukur kinerja aktual (observasi, laporan). 2. Comparing: Bandingkan aktual vs standar (perhatikan Range of Variation). 3. Taking Action: Do nothing, Correct performance, atau Revise standard.' },
                { id: 18, term: '3 Jenis Tindakan Manajerial (Action)', definition: '1. Do Nothing: Jika sesuai standar. 2. Correct Performance: Perbaikan segera (immediate) atau mendasar (basic - cari akar masalah). 3. Revise Standard: Jika target terlalu rendah atau terlalu tinggi (tidak realistis).' },
                { id: 19, term: '4 Jenis Rasio Keuangan (Financial Controls)', definition: '1. Likuiditas: Bayar utang jangka pendek (Current Ratio). 2. Leverage: Penggunaan utang (Debt to Assets). 3. Aktivitas: Efisiensi aset (Inventory Turnover). 4. Profitabilitas: Efektivitas laba (ROI).' },
                { id: 20, term: 'Balanced Scorecard (4 Perspektif)', definition: 'Mengevaluasi kinerja dari sisi: 1. Keuangan. 2. Pelanggan. 3. Proses Internal. 4. Pembelajaran & Pertumbuhan (People/Innovation).' },
                { id: 21, term: 'Benchmarking', definition: 'Proses mencari praktik terbaik (best practices) dari pesaing atau non-pesaing untuk ditiru/diadaptasi.' },
                { id: 22, term: 'Isu Pengendalian Kontemporer', definition: '1. Lintas Budaya: Metode pengawasan beda tiap negara. 2. Privasi: Hak memantau email/internet vs privasi karyawan. 3. Pencurian Karyawan: Mengambil properti atau "pencurian waktu".' },
                { id: 23, term: '4 Jenis Masalah Disiplin Karyawan', definition: '1. Attendance: Telat, bolos, sakit palsu. 2. On-the-Job Behaviors: Mabuk, judi di kantor, gagal capai target. 3. Dishonesty: Mencuri, bohong di CV. 4. Outside Activities: Mogok kerja ilegal, kriminal di luar.' },
                // ===== MODUL 3: KEWIRAUSAHAAN & MOTIVASI (Session 19-22) - 13 Flashcards =====
                { id: 24, term: 'Small Business vs. Entrepreneurship', definition: 'Small Business: Cari stabilitas, risiko = ancaman, kelola independen. Entrepreneurship: Cari pertumbuhan (growth) & inovasi, risiko = peluang.' },
                { id: 25, term: '4 Tahap Proses Kewirausahaan', definition: '1. Eksplorasi Konteks. 2. Identifikasi Peluang. 3. Memulai Usaha (Start). 4. Mengelola Usaha (Manage).' },
                { id: 26, term: 'Studi Kelayakan (Feasibility Study)', definition: 'Analisis sebelum investasi: 1. Kompetitor: Diferensiasi produk. 2. Pembiayaan: Bootstrapping, Angel Investor, Venture Capital.' },
                { id: 27, term: 'Sole Proprietorship (Perseorangan)', definition: 'Konsep: Milik 1 orang. Kelebihan: Mudah, murah, kontrol penuh. Kekurangan: Unlimited Liability (harta pribadi bisa disita).' },
                { id: 28, term: 'Partnership (Persekutuan)', definition: 'Konsep: Milik 2 orang/lebih. Kelebihan: Modal lebih mudah, kombinasi skill. Kekurangan: Konflik mitra, Unlimited Liability (pada General Partnership).' },
                { id: 29, term: 'Corporation (PT)', definition: 'Konsep: Badan hukum terpisah. Kelebihan: Limited Liability (harta pribadi aman). Kekurangan: Mahal, regulasi rumit, Double Taxation (Pajak ganda).' },
                { id: 30, term: 'Persepsi Risiko (Risk Perception)', definition: '1. Risk Avoider: Fokus sisi negatif, cari aman. 2. Risk Seeker: Fokus potensi untung, ketidakpastian = peluang. Kunci: Calculated Risk (Mengelola risiko).' },
                { id: 31, term: '4 Sumber Peluang (Peter Drucker)', definition: '1. The Unexpected: Sukses/gagal tak diduga. 2. The Incongruous: Ketidakcocokan realita vs seharusnya. 3. Demographics: Perubahan penduduk (mis: penuaan). 4. Changes in Perception: Perubahan pandangan (mis: gaya hidup sehat).' },
                { id: 32, term: 'Strategi Politik Kantor', definition: '1. Networking: Aliansi formal/informal. 2. Hindari "Tainted Members": Jangan dekat dengan yang bereputasi buruk. 3. Support Your Boss: Bantu atasan sukses.' },
                { id: 33, term: 'Teori Maslow (5 Jenjang)', definition: '1. Fisiologis. 2. Keamanan (Safety). 3. Sosial. 4. Penghargaan (Esteem). 5. Aktualisasi Diri.' },
                { id: 34, term: 'Teori Dua Faktor Herzberg', definition: '1. Higiene (Ekstrinsik): Gaji, kondisi kerja. (Jelek = tidak puas, Bagus = netral). 2. Motivator (Intrinsik): Prestasi, tanggung jawab. (Membuat semangat kerja).' },
                { id: 35, term: 'Teori Keadilan (Equity Theory)', definition: 'Membandingkan rasio Input (kerja keras, skill) vs Output (gaji, bonus) diri sendiri dengan orang lain. Ketidakadilan memicu demotivasi.' },
                { id: 36, term: 'Teori Harapan (Expectancy Theory)', definition: 'Motivasi = Expectancy (Yakin bisa capai target) x Instrumentality (Yakin dapat reward) x Valence (Nilai reward menarik).' },
                // ===== MODUL 4: STRATEGI (Session 25-26) - 10 Flashcards =====
                { id: 37, term: 'Outsourcing vs. Offshoring', definition: 'Outsourcing: Sewa pihak ketiga untuk aktivitas non-inti (mis: cleaning service). Offshoring: Pindah lokasi ke negara lain (kejar biaya murah), operasional bisa milik sendiri/pihak lain.' },
                { id: 38, term: 'Value Chain Management (Starbucks)', definition: 'Kontrol kualitas hulu ke hilir (petani -> roasting -> barista). Termasuk standar CSR/Lingkungan (Greener Stores).' },
                { id: 39, term: 'Manajemen Strategis', definition: '"Cetak biru" bagaimana perusahaan bersaing, melayani pelanggan, dan mencapai tujuan.' },
                { id: 40, term: '6 Langkah Proses Manajemen Strategis', definition: '1. Identifikasi Misi/Visi. 2. Analisis Eksternal (Peluang/Ancaman). 3. Analisis Internal (Kekuatan/Kelemahan). 4. Merumuskan Strategi. 5. Implementasi. 6. Evaluasi Hasil.' },
                { id: 41, term: 'Analisis SWOT', definition: 'Gabungan langkah 2 & 3: Strengths, Weaknesses, Opportunities, Threats.' },
                { id: 42, term: 'Keunggulan Kompetitif', definition: 'Pembeda organisasi dari pesaing. Bisa berupa: Kualitas, Biaya Rendah, atau Teknologi/Inovasi.' },
                { id: 43, term: 'Economic Moat', definition: '"Parit Ekonomi" untuk mempertahankan keunggulan (Sustaining Advantage). Contoh: Merek kuat, paten, ekosistem terkunci.' },
                { id: 44, term: 'First Mover', definition: 'Organisasi pertama yang membawa inovasi ke pasar. Untung: Kuasai pasar, loyalitas. Rugi: Biaya riset mahal, risiko gagal, mudah ditiru (Second Mover).' },
                { id: 45, term: "Lima Kekuatan Porter (Porter's 5 Forces)", definition: '1. Threat of New Entrants: Ancaman pendatang baru (kemudahan bikin bisnis saingan). 2. Threat of Substitutes: Ancaman produk pengganti (mis: kopi diganti teh). 3. Bargaining Power of Buyers: Kekuatan tawar pembeli (sensitivitas harga). 4. Bargaining Power of Suppliers: Kekuatan tawar pemasok (monopoli bahan baku). 5. Current Rivalry: Persaingan sesama pemain lama.' },
                { id: 46, term: '7 Struktur Rencana Bisnis (Urutan Slide)', definition: '1. Executive Summary: Ringkasan eksekutif (dibuat terakhir, ditaruh paling depan). 2. Company Description: Visi, misi, sejarah. 3. Industry Analysis: Analisis pasar. 4. Management Team: Siapa yang menjalankan bisnis. 5. Service/Product Operation: Detail produk. 6. Marketing Strategy: Cara jualan (4P). 7. Financial Plan: Proyeksi keuangan (Rugi/Laba).' },
            ],
            essayExam: [{ question: 'Gaya kepemimpinan efektif untuk tim remote?', modelAnswer: 'Transformational + trust-based management.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                // ===== LEADERSHIP (1-12) =====
                { question: "Dalam konteks manajemen, apa perbedaan mendasar antara 'Pemimpin' (Leader) dan 'Kepemimpinan' (Leadership)?", options: ['Pemimpin adalah prosesnya, Kepemimpinan adalah orangnya', 'Pemimpin adalah individu dengan otoritas, Kepemimpinan adalah proses memengaruhi orang lain', 'Pemimpin selalu manajer formal, Kepemimpinan adalah sifat bawaan', 'Tidak ada perbedaan, keduanya sama'], answer: 1, xp: 5 },
                { question: "Mengapa 'Teori Sifat' (Trait Theories) pada era 1920-an dianggap kurang valid dalam menentukan kesuksesan pemimpin?", options: ['Karena terlalu fokus pada perilaku daripada fisik', 'Karena tidak ditemukan satu set sifat universal yang menjamin seseorang menjadi pemimpin sukses', 'Karena mengabaikan faktor inteligensi', 'Karena hanya berlaku untuk pemimpin militer'], answer: 1, xp: 5 },
                { question: 'Studi University of Iowa mengidentifikasi tiga gaya kepemimpinan. Gaya manakah yang memberikan kebebasan total kepada kelompok untuk membuat keputusan?', options: ['Gaya Autokratis', 'Gaya Demokratis', 'Gaya Laissez-faire', 'Gaya Transformasional'], answer: 2, xp: 5 },
                { question: 'Dalam studi Ohio State & Michigan, perilaku pemimpin yang fokus pada pencapaian target, pengorganisasian kerja, dan definisi peran disebut?', options: ['Orientasi Hubungan (Consideration)', 'Orientasi Tugas (Initiating Structure)', 'Orientasi Karyawan', 'Orientasi Kepercayaan'], answer: 1, xp: 5 },
                { question: "Menurut Situational Leadership Theory (Hersey & Blanchard), gaya 'Telling' paling cocok diterapkan pada kondisi pengikut yang...", options: ['R1: Tidak Mampu & Tidak Mau', 'R2: Tidak Mampu tapi Mau', 'R3: Mampu tapi Tidak Mau', 'R4: Mampu & Mau'], answer: 0, xp: 5 },
                { question: 'Jika karyawan memiliki kompetensi tinggi (Mampu) tetapi sedang kehilangan motivasi atau ragu (Tidak Mau), gaya kepemimpinan apa yang harus digunakan (R3)?', options: ['Telling (Instruksi)', 'Selling (Jual ide)', 'Participating (Partisipasi)', 'Delegating (Pendelegasian)'], answer: 2, xp: 5 },
                { question: 'Kondisi ideal R4 (Mampu & Mau) membutuhkan gaya kepemimpinan...', options: ['Telling', 'Selling', 'Participating', 'Delegating'], answer: 3, xp: 5 },
                { question: "Apa inti dari 'Path-Goal Theory'?", options: ['Pemimpin harus lahir dengan bakat tertentu', 'Pemimpin bertugas membantu pengikut mencapai tujuan dengan membersihkan hambatan', 'Pemimpin harus membagi tim menjadi In-Group dan Out-Group', 'Pemimpin harus memiliki kekuasaan koersif'], answer: 1, xp: 5 },
                { question: 'Menurut teori LMX (Leader-Member Exchange), bawahan yang mendapatkan kepercayaan lebih, tugas istimewa, dan perhatian lebih disebut?', options: ['Out-Group', 'In-Group', 'Core Team', 'High Performers'], answer: 1, xp: 5 },
                { question: 'Seorang pemimpin ditaati karena ia memiliki kemampuan untuk memecat atau menunda promosi bawahan. Ini adalah contoh kekuasaan...', options: ['Legitimate Power', 'Reward Power', 'Coercive Power', 'Expert Power'], answer: 2, xp: 5 },
                { question: 'Kekuasaan yang muncul karena orang lain mengagumi kepribadian atau ingin meniru pemimpin (karisma) disebut?', options: ['Expert Power', 'Referent Power', 'Legitimate Power', 'Reward Power'], answer: 1, xp: 5 },
                { question: 'Manakah yang BUKAN merupakan salah satu dari 5 dimensi Kepercayaan (Trust)?', options: ['Integritas', 'Kompetensi', 'Popularitas', 'Loyalitas'], answer: 2, xp: 5 },
                // ===== CONTROLLING (13-22) =====
                { question: 'Apa definisi dari proses Pengendalian (Controlling)?', options: ['Proses merekrut karyawan baru', 'Proses memantau, membandingkan, dan memperbaiki kinerja', 'Proses menyusun visi dan misi', 'Proses memotivasi karyawan'], answer: 1, xp: 5 },
                { question: "Salah satu alasan pentingnya controlling adalah 'Protecting the Workplace'. Apa artinya?", options: ['Melindungi aset dari pencurian, pemborosan, dan menjamin keselamatan kerja', 'Memastikan manajer tidak dipecat', 'Menjaga rahasia perusahaan dari kompetitor', 'Mencegah karyawan resign'], answer: 0, xp: 5 },
                { question: 'Urutan 3 langkah proses pengendalian yang benar adalah:', options: ['Comparing -> Measuring -> Action', 'Action -> Measuring -> Comparing', 'Measuring -> Comparing -> Taking Managerial Action', 'Measuring -> Action -> Comparing'], answer: 2, xp: 5 },
                { question: 'Jika kinerja aktual jauh di bawah standar, namun setelah diselidiki ternyata targetnya yang tidak realistis (terlalu tinggi), tindakan apa yang harus diambil?', options: ['Do Nothing', 'Immediate Corrective Action', 'Basic Corrective Action', 'Revise Standard'], answer: 3, xp: 5 },
                { question: 'Tindakan perbaikan yang menelusuri akar penyebab masalah agar tidak terulang kembali disebut?', options: ['Basic Corrective Action', 'Immediate Corrective Action', 'Disciplinary Action', 'Preventive Action'], answer: 0, xp: 5 },
                { question: 'Rasio keuangan yang mengukur kemampuan perusahaan membayar utang jangka pendek (seperti Current Ratio) disebut?', options: ['Rasio Profitabilitas', 'Rasio Leverage', 'Rasio Aktivitas', 'Rasio Likuiditas'], answer: 3, xp: 5 },
                { question: "Dalam Balanced Scorecard, perspektif yang melihat 'pandangan pemegang saham' adalah?", options: ['Perspektif Pelanggan', 'Perspektif Keuangan', 'Perspektif Proses Internal', 'Perspektif Pembelajaran & Pertumbuhan'], answer: 1, xp: 5 },
                { question: 'Proses mencari praktik terbaik (best practices) dari pesaing atau non-pesaing untuk ditiru disebut?', options: ['Outsourcing', 'Offshoring', 'Benchmarking', 'Brainstorming'], answer: 2, xp: 5 },
                { question: "Masalah disiplin karyawan berupa 'bermain saham/judi di kantor' atau 'gagal mencapai target' masuk dalam kategori?", options: ['Attendance (Kehadiran)', 'Dishonesty (Ketidakjujuran)', 'Outside Activities', 'On-the-Job Behaviors'], answer: 3, xp: 5 },
                { question: "Mengambil properti perusahaan atau melakukan 'pencurian waktu' (main sosmed saat kerja) termasuk isu?", options: ['Workplace Privacy', 'Employee Theft', 'Workplace Violence', 'Corporate Espionage'], answer: 1, xp: 5 },
                // ===== ENTREPRENEURSHIP (23-34) =====
                { question: 'Apa perbedaan mindset utama antara Small Business dan Entrepreneurship?', options: ['Small Business cari untung, Entrepreneur cari rugi', 'Small Business cari stabilitas & hindari risiko; Entrepreneur cari pertumbuhan (growth) & kelola risiko', 'Small Business modal besar, Entrepreneur modal kecil', 'Tidak ada perbedaan'], answer: 1, xp: 5 },
                { question: 'Apa nama badan usaha yang dimiliki satu orang dan memiliki risiko Unlimited Liability (harta pribadi bisa disita)?', options: ['Corporation', 'Partnership', 'Sole Proprietorship', 'LLC'], answer: 2, xp: 5 },
                { question: 'Keuntungan utama dari bentuk Corporation (PT) adalah?', options: ['Biaya pendirian murah', 'Pajak tunggal', 'Limited Liability (Tanggung jawab terbatas)', 'Mudah dibubarkan'], answer: 2, xp: 5 },
                { question: 'Kelemahan utama Corporation adalah terkena pajak atas laba perusahaan DAN pajak atas dividen pemegang saham. Istilah ini disebut?', options: ['Tax Amnesty', 'Double Taxation', 'Unlimited Liability', 'Fiscal Risk'], answer: 1, xp: 5 },
                { question: 'Dalam manajemen risiko, tipe orang yang melihat ketidakpastian sebagai peluang keuntungan disebut?', options: ['Risk Avoider', 'Risk Seeker', 'Risk Manager', 'Risk Controller'], answer: 1, xp: 5 },
                { question: 'Post-it Note ditemukan karena kegagalan membuat lem kuat. Menurut Peter Drucker, ini sumber peluang dari?', options: ['The Incongruous', 'The Unexpected', 'Demographics', 'New Knowledge'], answer: 1, xp: 5 },
                { question: 'Sumber peluang bisnis yang berasal dari perubahan struktur penduduk (misal: populasi menua) disebut?', options: ['Demographics', 'Changes in Perception', 'The Incongruous', 'Process Need'], answer: 0, xp: 5 },
                { question: "Strategi politik kantor: Mengapa disarankan untuk 'Support Your Boss'?", options: ['Agar bisa menjilat atasan', 'Karena kesuksesan atasan biasanya akan mengangkat kesuksesan tim/bawahan juga', 'Agar atasan tidak marah', 'Supaya gaji cepat naik'], answer: 1, xp: 5 },
                { question: 'Menurut Teori Herzberg, Gaji dan Kondisi Kerja termasuk dalam faktor?', options: ['Faktor Motivator', 'Faktor Higiene', 'Faktor Intrinsik', 'Faktor Aktualisasi'], answer: 1, xp: 5 },
                { question: 'Dalam Teori Herzberg, jika Faktor Higiene terpenuhi dengan baik, apa dampaknya pada karyawan?', options: ['Sangat termotivasi', 'Netral (tidak kecewa, tapi belum tentu semangat)', 'Kecewa berat', 'Ingin resign'], answer: 1, xp: 5 },
                { question: 'Teori Motivasi yang menyatakan karyawan membandingkan rasio Input/Output dirinya dengan orang lain adalah?', options: ['Expectancy Theory', 'Goal Setting Theory', 'Equity Theory', 'Reinforcement Theory'], answer: 2, xp: 5 },
                { question: "Dalam Teori Harapan (Expectancy), keyakinan bahwa 'Jika saya mencapai target, saya PASTI dapat bonus' disebut?", options: ['Expectancy', 'Instrumentality', 'Valence', 'Performance'], answer: 1, xp: 5 },
                // ===== STRATEGY (35-46) =====
                { question: 'Memindahkan aktivitas non-inti (seperti cleaning service) ke pihak ketiga disebut?', options: ['Offshoring', 'Outsourcing', 'Insourcing', 'Downsizing'], answer: 1, xp: 5 },
                { question: 'Memindahkan lokasi operasional/pabrik ke negara lain untuk menekan biaya disebut?', options: ['Outsourcing', 'Offshoring', 'Exporting', 'Licensing'], answer: 1, xp: 5 },
                { question: 'Starbucks mengontrol kualitas kopi dari petani hingga barista. Ini adalah penerapan?', options: ['Value Chain Management', 'Supply Chain Management', 'Just in Time', 'Six Sigma'], answer: 0, xp: 5 },
                { question: 'Langkah pertama dalam Proses Manajemen Strategis adalah?', options: ['Analisis SWOT', 'Identifikasi Misi, Tujuan, dan Strategi saat ini', 'Implementasi Strategi', 'Merumuskan Strategi'], answer: 1, xp: 5 },
                { question: 'Analisis SWOT adalah gabungan dari?', options: ['Analisis Internal (Strength, Weakness) & Eksternal (Opportunity, Threat)', 'Analisis Keuangan & Pemasaran', 'Analisis Pesaing & Pelanggan', 'Analisis Global & Lokal'], answer: 0, xp: 5 },
                { question: 'Sesuatu yang membedakan organisasi dari pesaingnya (bisa berupa kualitas, biaya, atau teknologi) disebut?', options: ['Core Competencies', 'Competitive Advantage', 'Strategic Goal', 'Business Model'], answer: 1, xp: 5 },
                { question: "Konsep 'Economic Moat' (Parit Ekonomi) bertujuan untuk?", options: ['Menyerang kompetitor secara agresif', 'Mempertahankan keunggulan kompetitif (Sustaining Advantage) dari serangan pesaing', 'Mencari investor baru', 'Menutup perusahaan'], answer: 1, xp: 5 },
                { question: "Apa risiko utama menjadi 'First Mover'?", options: ['Kehilangan pasar', 'Biaya riset mahal dan risiko produk gagal tinggi', 'Tidak bisa menetapkan harga tinggi', 'Tidak ada risiko'], answer: 1, xp: 5 },
                { question: "Dalam Porter's Five Forces, ancaman dari produk beda jenis yang memiliki fungsi sama (misal: Kopi vs Teh) disebut?", options: ['Threat of New Entrants', 'Current Rivalry', 'Threat of Substitutes', 'Bargaining Power of Buyers'], answer: 2, xp: 5 },
                { question: 'Jika pemasok bahan baku hanya ada satu (monopoli), maka kekuatan apa yang tinggi menurut Porter?', options: ['Bargaining Power of Suppliers', 'Bargaining Power of Buyers', 'Threat of New Entrants', 'Current Rivalry'], answer: 0, xp: 5 },
                { question: 'Bagian Business Plan yang berisi Visi, Misi, dan Sejarah perusahaan adalah?', options: ['Executive Summary', 'Company Description', 'Industry Analysis', 'Marketing Strategy'], answer: 1, xp: 5 },
                { question: 'Bagian Business Plan yang ditulis paling terakhir tapi ditaruh paling depan adalah?', options: ['Financial Plan', 'Marketing Strategy', 'Executive Summary', 'Management Team'], answer: 2, xp: 5 },
                // ===== ADDITIONAL (47-55) =====
                { question: "Manakah yang merupakan definisi 'Kesiapan' (Readiness) dalam SLT?", options: ['Tingkat pendidikan dan usia', 'Kemampuan (Ability) dan Kemauan (Willingness)', 'Pengalaman kerja dan gaji', 'Jabatan dan koneksi'], answer: 1, xp: 5 },
                { question: 'Tiga jenis tindakan manajerial dalam controlling adalah?', options: ['Do Nothing, Correct Performance, Revise Standard', 'Plan, Do, Check', 'Hire, Fire, Promote', 'Sell, Buy, Hold'], answer: 0, xp: 5 },
                { question: 'Contoh Rasio Aktivitas (Activity Ratio) adalah?', options: ['Inventory Turnover', 'Current Ratio', 'Debt to Asset', 'Return on Investment'], answer: 0, xp: 5 },
                { question: 'Tahap kedua dalam proses kewirausahaan setelah Eksplorasi Konteks adalah?', options: ['Memulai Usaha', 'Mengelola Usaha', 'Identifikasi Peluang', 'Exit Strategy'], answer: 2, xp: 5 },
                { question: 'Feasibility Study (Studi Kelayakan) menganalisis dua hal utama, yaitu?', options: ['Kompetitor dan Pembiayaan', 'Gedung dan Karyawan', 'Logo dan Website', 'Pajak dan Hukum'], answer: 0, xp: 5 },
                { question: 'Gaya kepemimpinan Iowa yang memusatkan wewenang dan mendikte metode kerja adalah?', options: ['Autokratis', 'Demokratis', 'Laissez-faire', 'Liberal'], answer: 0, xp: 5 },
                { question: "Dimensi kepercayaan 'Konsistensi' merujuk pada?", options: ['Kejujuran', 'Keandalan, prediktabilitas, dan penilaian yang baik', 'Keahlian teknis', 'Kesediaan berbagi ide'], answer: 1, xp: 5 },
                { question: "Porter's 5 Forces: Threat of New Entrants mengukur?", options: ['Seberapa mudah orang baru membuat bisnis saingan', 'Seberapa kuat pembeli menawar', 'Seberapa banyak barang pengganti', 'Seberapa kuat persaingan lama'], answer: 0, xp: 5 },
                { question: 'Urutan ke-7 (terakhir) dalam struktur Business Plan adalah?', options: ['Marketing Strategy', 'Financial Plan', 'Management Team', 'Executive Summary'], answer: 1, xp: 5 },
                // ===== QUIZ TAMBAHAN (56-60) =====
                { question: 'Dalam Teori Hierarki Kebutuhan Maslow, kebutuhan akan pengakuan, jabatan, dan status sosial masuk dalam tingkatan?', options: ['Kebutuhan Sosial', 'Kebutuhan Keamanan', 'Kebutuhan Penghargaan (Esteem)', 'Aktualisasi Diri'], answer: 2, xp: 5 },
                { question: 'Jika manajer memperbaiki kinerja dengan cara memadamkan masalah saat itu juga agar pekerjaan bisa lanjut (tanpa mencari akar masalah), tindakan ini disebut?', options: ['Basic Corrective Action', 'Immediate Corrective Action', 'Revise Standard', 'Preventive Maintenance'], answer: 1, xp: 5 },
                { question: 'Karyawan yang terlibat dalam pemogokan kerja ilegal atau aktivitas kriminal di luar kantor dikategorikan dalam masalah disiplin?', options: ['On-the-Job Behaviors', 'Outside Activities', 'Dishonesty', 'Attendance'], answer: 1, xp: 5 },
                { question: 'Dalam Analisis SWOT, faktor internal positif yang dimiliki perusahaan (aset, paten, budaya kerja) disebut?', options: ['Strengths (Kekuatan)', 'Weaknesses (Kelemahan)', 'Opportunities (Peluang)', 'Threats (Ancaman)'], answer: 0, xp: 5 },
                { question: 'Apa hubungan antara Perencanaan (Planning) dan Pengendalian (Controlling)?', options: ['Pengendalian tidak butuh perencanaan', 'Perencanaan memberikan standar/target untuk dikendalikan; tanpa rencana, tidak ada pengendalian', 'Pengendalian dilakukan sebelum perencanaan', 'Keduanya fungsi yang terpisah total'], answer: 1, xp: 5 },
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
