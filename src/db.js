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
                // ===== MODUL 2: PENGENDALIAN (Session 17-18) =====
                { id: 23, term: 'Controlling', definition: 'Proses manajemen: pemantauan (monitoring), perbandingan (comparing), dan perbaikan (correcting) kinerja' },
                { id: 24, term: '3 Alasan Pentingnya Controlling', definition: 'Planning Link (feedback rencana), Empowering Employees, Protecting Workplace' },
                { id: 25, term: 'Langkah 1: Measuring', definition: 'Mengukur kinerja aktual melalui MBWA, laporan statistik, laporan lisan, laporan tertulis' },
                { id: 26, term: 'Range of Variation', definition: 'Kisaran variasi yang dapat diterima saat membandingkan kinerja aktual dengan standar' },
                { id: 27, term: 'Tindakan Manajerial', definition: '3 opsi: Do Nothing, Correct Performance (immediate/basic), Revise Standard' },
                { id: 28, term: 'Rasio Likuiditas', definition: 'Mengukur kemampuan bayar utang jangka pendek. Contoh: Current Ratio' },
                { id: 29, term: 'Rasio Leverage', definition: 'Mengukur penggunaan utang untuk membiayai aset. Contoh: Debt to Assets' },
                { id: 30, term: 'Rasio Aktivitas', definition: 'Mengukur efisiensi penggunaan aset. Contoh: Inventory Turnover' },
                { id: 31, term: 'Rasio Profitabilitas', definition: 'Mengukur efektivitas menghasilkan laba. Contoh: ROI' },
                { id: 32, term: 'Balanced Scorecard', definition: '4 perspektif: Keuangan, Pelanggan, Proses Internal, Pembelajaran/Pertumbuhan' },
                { id: 33, term: 'Benchmarking', definition: 'Pencarian praktik terbaik (best practices) dari pesaing untuk referensi perbaikan' },
                { id: 34, term: 'Employee Theft', definition: 'Pengambilan properti perusahaan tanpa izin: uang, barang, atau "pencurian waktu"' },
                // ===== MODUL 3: KEWIRAUSAHAAN (Session 19-22) =====
                { id: 35, term: 'Small Business vs Entrepreneurship', definition: 'Small Business: stabilitas, risiko=ancaman. Entrepreneur: inovasi, growth, risiko=peluang' },
                { id: 36, term: '4 Proses Kewirausahaan', definition: 'Eksplorasi Konteks → Identifikasi Peluang → Start Venture → Manage Venture' },
                { id: 37, term: 'Feasibility Study', definition: 'Studi kelayakan: analisis Kompetitor (differentiation) dan Pembiayaan (sumber modal)' },
                { id: 38, term: 'Angel Investor', definition: 'Individu kaya yang berinvestasi di tahap awal startup' },
                { id: 39, term: 'Venture Capital', definition: 'Perusahaan investasi profesional yang mendanai startup high-growth' },
                { id: 40, term: 'Sole Proprietorship', definition: 'Bisnis 1 orang. (+) mudah didirikan. (-) Unlimited Liability' },
                { id: 41, term: 'Partnership', definition: 'Bisnis 2+ orang. (+) kombinasi modal. (-) konflik, unlimited liability' },
                { id: 42, term: 'Corporation (C-Corp)', definition: 'Badan hukum terpisah. (+) Limited Liability. (-) Double Taxation' },
                { id: 43, term: 'LLC', definition: 'Hybrid: pajak fleksibel Partnership + perlindungan hukum Corporation' },
                { id: 44, term: 'Risk Avoider vs Risk Seeker', definition: 'Avoider: fokus negatif. Seeker: fokus positif. Kunci: Calculated Risk' },
                { id: 45, term: 'The Unexpected (Drucker)', definition: 'Sumber peluang dari sukses/gagal tak terduga. Contoh: Post-it Note' },
                { id: 46, term: 'The Incongruous (Drucker)', definition: 'Ketidakcocokan "seharusnya" vs realita. Contoh: streaming vs sewa DVD' },
                { id: 47, term: 'Demographics (Drucker)', definition: 'Perubahan struktur penduduk. Contoh: bisnis kesehatan lansia' },
                { id: 48, term: 'Changes in Perception', definition: 'Perubahan cara pandang masyarakat. Contoh: katering diet sehat' },
                { id: 49, term: 'Politik Organisasi', definition: 'Organisasi = entitas politis karena Potensi Konflik atas Sumber Daya' },
                { id: 50, term: 'Strategi Bertahan Politik Kantor (3)', definition: '1. Networking (bangun aliansi), 2. Hindari Tainted Members (orang reputasi buruk), 3. Support Your Boss (dukung atasan)' },
                { id: 51, term: 'Teori Hierarki Kebutuhan Maslow (5 tingkat)', definition: 'Fisiologis (makan/minum) → Keamanan (aman dari PHK) → Sosial (diterima rekan) → Penghargaan (jabatan) → Aktualisasi Diri (potensi maksimal)' },
                { id: 52, term: 'Teori Dua Faktor Herzberg', definition: 'Hygiene Factors (ekstrinsik: gaji, kondisi kerja) = cegah ketidakpuasan. Motivator Factors (intrinsik: prestasi, tanggung jawab) = tingkatkan kepuasan' },
                { id: 53, term: 'Equity Theory', definition: 'Karyawan bandingkan Input:Output diri vs orang lain. Ketidakadilan = malas/resign' },
                { id: 54, term: 'Teori Harapan (Expectancy Theory)', definition: '3 keyakinan: Expectancy (bisa capai target) → Instrumentality (pasti dapat reward) → Valence (reward menarik)' },
                // ===== MODUL 4: STRATEGI (Session 25-26) =====
                { id: 55, term: 'Outsourcing', definition: 'Memindahkan aktivitas non-inti ke pihak eksternal yang lebih ahli' },
                { id: 56, term: 'Offshoring', definition: 'Memindahkan proses bisnis ke negara lain (biaya tenaga kerja murah)' },
                { id: 57, term: 'Value Chain Management', definition: 'Kontrol proses dari hulu ke hilir. Contoh: Starbucks dari petani ke barista' },
                { id: 58, term: 'Manajemen Strategis', definition: 'Cetak biru bagaimana perusahaan berbisnis, menang bersaing, memuaskan pelanggan' },
                { id: 59, term: '6 Langkah Proses Manajemen Strategis', definition: '1. Identifikasi Misi/Visi → 2. Analisis Eksternal (O/T) → 3. Analisis Internal (S/W) → 4. Formulasi Strategi → 5. Implementasi → 6. Evaluasi Hasil' },
                { id: 60, term: 'Misi vs Visi', definition: 'Misi: alasan keberadaan (sekarang). Visi: apa yang ingin dicapai (masa depan)' },
                { id: 61, term: 'Analisis SWOT', definition: 'Gabungan analisis eksternal (O/T) dan internal (S/W)' },
                { id: 62, term: 'Core Competencies', definition: 'Kekuatan unik yang jadi senjata utama perusahaan untuk menang' },
                { id: 63, term: 'Corporate vs Competitive Strategy', definition: 'Corporate: bisnis apa dimasuki. Competitive: cara mengalahkan lawan' },
                { id: 64, term: 'Keunggulan Kompetitif', definition: 'Pembeda dari pesaing: Kualitas, Biaya Rendah, Teknologi/Inovasi' },
                { id: 65, term: 'Economic Moat (Buffett)', definition: 'Parit ekonomi: merek kuat, paten, biaya switching tinggi' },
                { id: 66, term: 'First Mover', definition: 'Pertama bawa inovasi ke pasar. (+) kuasai pasar. (-) biaya riset mahal' },
                { id: 67, term: 'Second Mover Advantage', definition: 'Kompetitor meniru dan menyempurnakan dengan biaya lebih murah' },
                // ===== TAMBAHAN TEKNIS =====
                { id: 68, term: "Porter's Five Forces", definition: '5 kekuatan: New Entrants, Substitutes, Buyer Power, Supplier Power, Rivalry' },
                { id: 69, term: 'Threat of New Entrants', definition: 'Ancaman pendatang baru: seberapa mudah bikin bisnis saingan' },
                { id: 70, term: 'Threat of Substitutes', definition: 'Ancaman produk pengganti. Contoh: kopi diganti teh' },
                { id: 71, term: 'Bargaining Power of Buyers', definition: 'Kekuatan tawar pembeli: sensitif harga = profit tipis' },
                { id: 72, term: 'Bargaining Power of Suppliers', definition: 'Kekuatan tawar pemasok: pemasok sedikit = bisa main harga' },
                { id: 73, term: 'Current Rivalry', definition: 'Persaingan sesama pemain lama di industri' },
                { id: 74, term: '7 Bagian Business Plan', definition: 'Executive Summary, Company Description, Industry Analysis, Management Team, Product, Marketing, Financial' },
                { id: 75, term: 'Executive Summary', definition: 'Ringkasan eksekutif: dibuat terakhir, ditaruh paling depan' },
                { id: 76, term: '4 Masalah Disiplin Karyawan', definition: 'Attendance (telat), On-the-Job (mabuk/judi), Dishonesty (mencuri), Outside Activities (kriminal)' },
            ],
            essayExam: [{ question: 'Gaya kepemimpinan efektif untuk tim remote?', modelAnswer: 'Transformational + trust-based management.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                // ===== MODUL 1: KEPEMIMPINAN =====
                { question: 'Apa perbedaan Pemimpin dan Kepemimpinan?', options: ['Sama saja', 'Pemimpin = individu, Kepemimpinan = proses', 'Pemimpin = proses', 'Tidak ada perbedaan'], answer: 1, xp: 5 },
                { question: 'Gaya kepemimpinan yang melibatkan karyawan dalam pengambilan keputusan?', options: ['Autokratis', 'Demokratis', 'Laissez-faire', 'Telling'], answer: 1, xp: 5 },
                { question: 'Pengikut R2 (Tidak Mampu tapi Mau) butuh gaya...', options: ['Telling', 'Selling', 'Participating', 'Delegating'], answer: 1, xp: 5 },
                { question: 'Kekuasaan dari keahlian disebut...', options: ['Legitimate', 'Coercive', 'Reward', 'Expert'], answer: 3, xp: 5 },
                { question: 'Kelompok In-Group dalam LMX adalah...', options: ['Yang diabaikan', 'Yang dipercaya dan dapat tugas istimewa', 'Yang berkunjung', 'Yang baru'], answer: 1, xp: 5 },
                { question: 'Path-Goal Theory: pemimpin sebagai...', options: ['Penghukum', 'Pembuka jalan', 'Pengawas', 'Kontroller'], answer: 1, xp: 5 },
                { question: 'Consideration berorientasi pada...', options: ['Tugas', 'Hubungan dan kepercayaan', 'Hukuman', 'Kekuasaan'], answer: 1, xp: 5 },
                { question: 'Coercive Power berdasarkan...', options: ['Posisi', 'Kemampuan menghukum', 'Hadiah', 'Karisma'], answer: 1, xp: 5 },
                // ===== MODUL 2: PENGENDALIAN =====
                { question: 'Controlling = ...', options: ['Planning, Leading, Organizing', 'Monitoring, Comparing, Correcting', 'Hiring, Training', 'Budgeting'], answer: 1, xp: 5 },
                { question: 'Basic Corrective Action adalah...', options: ['Padamkan masalah saat itu', 'Analisis akar penyebab', 'Ubah target', 'Do Nothing'], answer: 1, xp: 5 },
                { question: 'Rasio untuk bayar utang jangka pendek?', options: ['Leverage', 'Likuiditas', 'Aktivitas', 'Profitabilitas'], answer: 1, xp: 5 },
                { question: 'Balanced Scorecard punya berapa perspektif?', options: ['2', '3', '4', '5'], answer: 2, xp: 5 },
                { question: 'Benchmarking adalah...', options: ['Kontrol', 'Cari praktik terbaik', 'Audit', 'Monitor'], answer: 1, xp: 5 },
                { question: 'ROI termasuk rasio...', options: ['Likuiditas', 'Leverage', 'Aktivitas', 'Profitabilitas'], answer: 3, xp: 5 },
                // ===== MODUL 3: KEWIRAUSAHAAN =====
                { question: 'Perbedaan Small Business vs Entrepreneurship?', options: ['Ukuran', 'Jumlah karyawan', 'Pandangan risiko dan inovasi', 'Lokasi'], answer: 2, xp: 5 },
                { question: 'Unlimited Liability ada di...', options: ['Corporation', 'LLC', 'Sole Proprietorship', 'S-Corp'], answer: 2, xp: 5 },
                { question: 'Double Taxation terjadi di...', options: ['Sole Proprietorship', 'Partnership', 'Corporation (C-Corp)', 'LLC'], answer: 2, xp: 5 },
                { question: 'Angel Investor adalah...', options: ['Venture Capital', 'Individu kaya investasi tahap awal', 'Hedge Fund', 'Bank'], answer: 1, xp: 5 },
                { question: 'Post-it Note contoh sumber peluang...', options: ['Demographics', 'The Unexpected', 'The Incongruous', 'Perception'], answer: 1, xp: 5 },
                { question: 'Gaji termasuk faktor... (Herzberg)', options: ['Motivator', 'Hygiene', 'Intrinsic', 'Growth'], answer: 1, xp: 5 },
                { question: 'Equity Theory: karyawan bandingkan...', options: ['Gaji vs target', 'Input:Output vs orang lain', 'Jam kerja vs hasil', 'Skill vs jabatan'], answer: 1, xp: 5 },
                { question: 'Tingkat teratas Maslow?', options: ['Keamanan', 'Sosial', 'Penghargaan', 'Aktualisasi Diri'], answer: 3, xp: 5 },
                { question: 'Instrumentality (Expectancy Theory)?', options: ['Bisa capai target', 'Pasti dapat reward', 'Reward menarik', 'Kerja keras'], answer: 1, xp: 5 },
                // ===== MODUL 4: STRATEGI =====
                { question: 'Outsourcing adalah...', options: ['Pindah ke negara lain', 'Pindah ke pihak eksternal ahli', 'Restrukturisasi', 'Downsizing'], answer: 1, xp: 5 },
                { question: 'Starbucks pakai konsep...', options: ['Franchise', 'Integrated Value Chain', 'Cost Leadership', 'Differentiation'], answer: 1, xp: 5 },
                { question: 'Proses Manajemen Strategis ada berapa langkah?', options: ['4', '5', '6', '7'], answer: 2, xp: 5 },
                { question: 'SWOT gabungan langkah ke...', options: ['1 dan 2', '2 dan 3', '3 dan 4', '4 dan 5'], answer: 1, xp: 5 },
                { question: 'Warren Buffett: Economic Moat adalah...', options: ['Competitive Advantage', 'Parit ekonomi melindungi bisnis', 'Blue Ocean', 'First Mover'], answer: 1, xp: 5 },
                { question: 'First Mover adalah...', options: ['Market Leader', 'Pertama bawa inovasi ke pasar', 'Pioneer', 'Innovator'], answer: 1, xp: 5 },
                { question: 'Misi perusahaan menjelaskan...', options: ['Tujuan masa depan', 'Alasan keberadaan saat ini', 'Strategi bersaing', 'Target keuangan'], answer: 1, xp: 5 },
                // ===== TAMBAHAN TEKNIS =====
                { question: "Porter's Five Forces ada berapa?", options: ['3', '4', '5', '6'], answer: 2, xp: 5 },
                { question: 'Threat of Substitutes = ...', options: ['Pendatang baru', 'Produk pengganti', 'Kekuatan pembeli', 'Persaingan'], answer: 1, xp: 5 },
                { question: 'Executive Summary dibuat kapan?', options: ['Pertama', 'Terakhir, tapi ditaruh depan', 'Tengah', 'Tidak penting'], answer: 1, xp: 5 },
                { question: 'Main sosmed saat kerja = ...', options: ['Attendance', 'On-the-Job Behaviors', 'Dishonesty', 'Outside Activities'], answer: 1, xp: 5 },
                { question: 'Bargaining Power of Suppliers tinggi jika...', options: ['Banyak pemasok', 'Pemasok cuma satu', 'Harga murah', 'Pembeli banyak'], answer: 1, xp: 5 },
                { question: 'Business Plan standar ada berapa bagian?', options: ['5', '6', '7', '8'], answer: 2, xp: 5 },
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
