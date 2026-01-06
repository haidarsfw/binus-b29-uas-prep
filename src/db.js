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
    // JADWAL UJIAN RESMI (dari BINUSMAYA - 31 Des 2025)
    // Format: { date: ISO, type: 'onsite'|'online', note: optional }
    // ============================================================
    schedules: {
        'LA86': {
            'Introduction to Management and Business': { date: '2026-01-12T13:00:00', end: '2026-01-12T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Marketing Management': { date: '2026-01-13T08:00:00', end: '2026-01-13T09:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Character Building: Pancasila': { date: '2026-01-14T00:00:00', due: '2026-01-21T17:01:00', type: 'online', note: 'Online Exam - Final Project (Start: 14 Jan, Due: 21 Jan 17:01)' },
            'Business Mathematics': { date: '2026-01-16T00:00:00', due: '2026-01-23T13:00:00', type: 'online', note: 'Online Exam - Group Project (Start: 16 Jan, Due: 23 Jan 13:00)' },
            'Management Information Systems for Leader': { date: '2026-01-20T10:00:00', end: '2026-01-20T12:00:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Human Resources Management': { date: '2026-01-22T13:00:00', end: '2026-01-22T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' }
        },
        'LB86': {
            'Introduction to Management and Business': { date: '2026-01-12T13:00:00', end: '2026-01-12T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Marketing Management': { date: '2026-01-13T08:00:00', end: '2026-01-13T09:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Character Building: Pancasila': { date: '2026-01-14T00:00:00', due: '2026-01-21T17:01:00', type: 'online', note: 'Online Exam - Final Project (Start: 14 Jan, Due: 21 Jan 17:01)' },
            'Business Mathematics': { date: '2026-01-16T00:00:00', due: '2026-01-23T13:00:00', type: 'online', note: 'Online Exam - Group Project (Start: 16 Jan, Due: 23 Jan 13:00)' },
            'Management Information Systems for Leader': { date: '2026-01-20T10:00:00', end: '2026-01-20T12:00:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Human Resources Management': { date: '2026-01-22T13:00:00', end: '2026-01-22T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' }
        },
        'LC86': {
            'Introduction to Management and Business': { date: '2026-01-12T13:00:00', end: '2026-01-12T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Marketing Management': { date: '2026-01-13T08:00:00', end: '2026-01-13T09:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Character Building: Pancasila': { date: '2026-01-14T00:00:00', due: '2026-01-21T17:01:00', type: 'online', note: 'Online Exam - Final Project (Start: 14 Jan, Due: 21 Jan 17:01)' },
            'Business Mathematics': { date: '2026-01-16T00:00:00', due: '2026-01-23T13:00:00', type: 'online', note: 'Online Exam - Group Project (Start: 16 Jan, Due: 23 Jan 13:00)' },
            'Management Information Systems for Leader': { date: '2026-01-20T10:00:00', end: '2026-01-20T12:00:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Human Resources Management': { date: '2026-01-22T13:00:00', end: '2026-01-22T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' }
        },
        'LD86': {
            'Introduction to Management and Business': { date: '2026-01-12T13:00:00', end: '2026-01-12T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Marketing Management': { date: '2026-01-13T08:00:00', end: '2026-01-13T09:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Character Building: Pancasila': { date: '2026-01-14T00:00:00', due: '2026-01-21T17:01:00', type: 'online', note: 'Online Exam - Final Project (Start: 14 Jan, Due: 21 Jan 17:01)' },
            'Business Mathematics': { date: '2026-01-16T00:00:00', due: '2026-01-23T13:00:00', type: 'online', note: 'Online Exam - Group Project (Start: 16 Jan, Due: 23 Jan 13:00)' },
            'Management Information Systems for Leader': { date: '2026-01-20T10:00:00', end: '2026-01-20T12:00:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Human Resources Management': { date: '2026-01-22T13:00:00', end: '2026-01-22T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' }
        },
        'LE86': {
            'Introduction to Management and Business': { date: '2026-01-12T13:00:00', end: '2026-01-12T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Marketing Management': { date: '2026-01-13T08:00:00', end: '2026-01-13T09:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Character Building: Pancasila': { date: '2026-01-14T00:00:00', due: '2026-01-21T17:01:00', type: 'online', note: 'Online Exam - Final Project (Start: 14 Jan, Due: 21 Jan 17:01)' },
            'Business Mathematics': { date: '2026-01-16T00:00:00', due: '2026-01-23T13:00:00', type: 'online', note: 'Online Exam - Group Project (Start: 16 Jan, Due: 23 Jan 13:00)' },
            'Management Information Systems for Leader': { date: '2026-01-20T10:00:00', end: '2026-01-20T12:00:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Human Resources Management': { date: '2026-01-22T13:00:00', end: '2026-01-22T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' }
        },
        'Other': {
            'Introduction to Management and Business': { date: '2026-01-12T13:00:00', end: '2026-01-12T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Marketing Management': { date: '2026-01-13T08:00:00', end: '2026-01-13T09:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Character Building: Pancasila': { date: '2026-01-14T00:00:00', due: '2026-01-21T17:01:00', type: 'online', note: 'Online Exam - Final Project (Start: 14 Jan, Due: 21 Jan 17:01)' },
            'Business Mathematics': { date: '2026-01-16T00:00:00', due: '2026-01-23T13:00:00', type: 'online', note: 'Online Exam - Group Project (Start: 16 Jan, Due: 23 Jan 13:00)' },
            'Management Information Systems for Leader': { date: '2026-01-20T10:00:00', end: '2026-01-20T12:00:00', type: 'onsite', note: 'Onsite Exam (Theory)' },
            'Human Resources Management': { date: '2026-01-22T13:00:00', end: '2026-01-22T14:40:00', type: 'onsite', note: 'Onsite Exam (Theory)' }
        },
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
                { id: 1, title: 'Week 9: Marketing Channels: Delivering Customer Value (Ch.12)', driveId: '1iHavus9po50lLBAk0FDwCCAHRYVMt3UL7LSA77zbDuI', type: 'slides', xp: 10 },
                { id: 2, title: 'Week 10: Integrated Marketing Communication Strategy (Ch.14)', driveId: '1e6FeM9DmYF-CNLKA45MYbdy67LwRWaShHTc2CDErSKc', type: 'slides', xp: 10 },
                { id: 3, title: 'Week 11: Creating Competitive Advantage (Ch.18)', driveId: '199uY5bAsXjuhancjXsREKngHjbl9cwhGwbkpt982NCM', type: 'slides', xp: 10 },
                { id: 4, title: 'Week 12: The Global Marketplace (Ch.19)', driveId: '1gKZH42cgwMT_QJHOBanaUtfN2VT54D1C6A1oj-baES8', type: 'slides', xp: 10 },
                { id: 5, title: 'Week 13: Sustainable Marketing: Social Responsibility & Ethics (Ch.20)', driveId: '1pxfTiAYLtrqG9M6xAvRWsXyZCoLypoz6JKBeOhvVCz0', type: 'slides', xp: 10 },
            ],
            kisiKisi: [
                {
                    topic: "Michael Porter's Basic Strategies",
                    items: [
                        'Cost Leadership',
                        'Differentiation',
                        'Focus'
                    ]
                },
                {
                    topic: 'Market Leader Strategies',
                    items: []
                },
                {
                    topic: 'Competitive Analysis',
                    items: []
                },
                {
                    topic: 'IMC (Integrated Marketing Communication)',
                    items: [
                        'Push Strategy',
                        'Pull Strategy'
                    ]
                },
                {
                    topic: 'AIDA',
                    items: []
                }
            ],
            kisiKisiNote: 'INFO: Menurut info dari dosen, soal kemungkinan besar berisi teori saja, mirip dengan UTS. Ujian bersifat Close Book, tanpa kalkulator/gadget.',
            kisiKisiTambahan: [
                {
                    topic: 'AIDA Model',
                    instruction: 'Jelaskan konsep, jabarkan singkatan, dan berikan contoh konkret.',
                    items: [
                        'Konsep: Model komunikasi pemasaran yang menggambarkan tahapan kognitif konsumen.',
                        'Attention: Bagaimana cara memancing perhatian konsumen.',
                        'Interest: Bagaimana membuat konsumen tertarik mempelajari lebih lanjut.',
                        'Desire: Bagaimana memunculkan hasrat/keinginan untuk memiliki produk.',
                        'Action: Bagaimana mendorong konsumen melakukan tindakan pembelian.'
                    ]
                },
                {
                    topic: 'Pricing Strategy (Strategi Penetapan Harga)',
                    instruction: 'Jelaskan definisi dari strategi berikut:',
                    items: [
                        'Cost Based: Penetapan harga berdasarkan akumulasi biaya yang terjadi atas pembuatan produk (cost of production).',
                        'Value Based: Kebalikan dari cost based; penetapan harga berdasarkan apa yang diminta atau seberapa besar nilai yang dirasakan/diinginkan customer (customer value).',
                        'Competition Based: Penetapan harga yang bereaksi terhadap apa yang dilakukan oleh kompetitornya.',
                        'Competitor Based: Penetapan harga berdasarkan harga pasar atau mengikuti kompetitor lainnya.'
                    ]
                },
                {
                    topic: 'Integrated Marketing Communication (IMC)',
                    instruction: 'Jelaskan konsep, alasan pentingnya, dan elemen (tools) di dalamnya.',
                    items: [
                        'Konsep IMC: Mengintegrasikan berbagai saluran komunikasi untuk menyampaikan pesan yang konsisten.',
                        'Urgensi (Kenapa butuh IMC?): Menjelaskan mengapa perusahaan tidak bisa hanya mengandalkan 1 hal/channel saja.',
                        'Kenapa tidak cukup satu saluran? Karena audiens tersebar dan membutuhkan pendekatan holistik agar pesan tersampaikan efektif.',
                        'Promotion Tools (Dijelaskan masing-masing): Advertising (Iklan), Sales Promotion (Promosi Penjualan), Public Relations, Direct Marketing, dll.'
                    ]
                },
                {
                    topic: 'Marketing Communication Budget',
                    instruction: 'Jelaskan jenis-jenis metode penganggaran komunikasi pemasaran dan berikan contohnya.',
                    items: []
                },
                {
                    topic: 'Market Entry Strategy',
                    instruction: 'Jelaskan bagaimana strategi untuk memasuki pasar baru (How to entry new market strategy).',
                    items: []
                }
            ],
            kisiKisiTambahanNote: 'Ini adalah kisi-kisi UAS B28, jangan dijadikan referensi utama.',
            flashcards: [
                // MODUL 1: Marketing Channels & Logistics
                { id: 1, term: 'Filosofi Netflix: "Finding the Future by Abandoning the Past"', definition: 'Strategi berani meninggalkan model bisnis lama (DVD fisik) demi masa depan (Streaming) agar tidak tertinggal zaman seperti Blockbuster.' },
                { id: 2, term: 'Supply Chain (Rantai Pasokan)', definition: 'Pandangan tradisional "Make-and-Sell". Fokus pada bahan baku, input produktif, dan kapasitas pabrik.' },
                { id: 3, term: 'Demand Chain (Rantai Permintaan)', definition: 'Pandangan "Sense-and-Respond". Perencanaan dimulai dari kebutuhan pelanggan, baru menyusun sumber daya ke belakang.' },
                { id: 4, term: 'Value Delivery Network', definition: 'Jaringan yang terdiri dari perusahaan, pemasok, distributor, dan pelanggan yang bermitra untuk meningkatkan kinerja seluruh sistem.' },
                { id: 5, term: 'Upstream Partners (Hulu)', definition: 'Mitra yang menyediakan bahan mentah, komponen, keuangan, dan keahlian (Suppliers).' },
                { id: 6, term: 'Downstream Partners (Hilir)', definition: 'Saluran pemasaran (Wholesaler/Retailer) yang menghubungkan perusahaan ke pelanggan akhir.' },
                { id: 7, term: 'Marketing Channel (Saluran Distribusi)', definition: 'Sekumpulan organisasi yang saling bergantung untuk membuat produk/jasa tersedia bagi konsumen atau bisnis.' },
                { id: 8, term: 'Mengapa menggunakan Perantara? (Efisiensi Kontak)', definition: 'Perantara mengubah keragaman produk produsen menjadi keragaman yang diinginkan konsumen & mengurangi jumlah kontak transaksi (Lebih efisien).' },
                { id: 9, term: 'Fungsi Saluran: Information & Promotion', definition: 'Information: Riset pasar/intelijen. Promotion: Komunikasi persuasif tentang penawaran.' },
                { id: 10, term: 'Fungsi Saluran: Contact & Matching', definition: 'Contact: Menemukan pembeli. Matching: Menyesuaikan penawaran (perakitan, pengemasan, grading).' },
                { id: 11, term: 'Fungsi Saluran: Negotiation', definition: 'Mencapai kesepakatan harga agar kepemilikan barang dapat berpindah.' },
                { id: 12, term: 'Fungsi Saluran: Physical Dist, Financing, Risk Taking', definition: 'Physical Dist: Angkut/simpan. Financing: Dana operasional. Risk Taking: Menanggung risiko saluran.' },
                { id: 13, term: 'Direct Marketing Channel', definition: 'Tidak ada perantara. Produsen menjual langsung ke konsumen. (Contoh: GEICO, Quicken Loans).' },
                { id: 14, term: 'Indirect Marketing Channel (Levels)', definition: 'Level 1: +Retailer. Level 2: +Wholesaler -> Retailer. Level 3: +Wholesaler -> Jobber -> Retailer.' },
                { id: 15, term: 'Horizontal Conflict', definition: 'Konflik antar perusahaan pada level yang sama. (Contoh: Dealer mobil A vs Dealer mobil B soal harga/wilayah).' },
                { id: 16, term: 'Vertical Conflict', definition: 'Konflik antar level berbeda dalam saluran yang sama. (Contoh: McDonald\'s pusat vs Franchisee soal standar).' },
                { id: 17, term: 'Conventional Distribution Channel', definition: 'Produsen/Grosir/Ritel terpisah, cari untung sendiri-sendiri, tidak ada kepemimpinan yang kuat, sering merugikan sistem.' },
                { id: 18, term: 'Vertical Marketing System (VMS)', definition: 'Produsen, grosir, dan pengecer bertindak sebagai satu sistem terpadu.' },
                { id: 19, term: 'Corporate VMS', definition: 'Menggabungkan produksi dan distribusi di bawah kepemilikan tunggal (Single Ownership).' },
                { id: 20, term: 'Contractual VMS (Franchise)', definition: 'Perusahaan independen bergabung via kontrak. Paling umum: Franchise Organization (Ford, Coca-Cola, Burger King).' },
                { id: 21, term: 'Administered VMS', definition: 'Kepemimpinan diasumsikan melalui ukuran dan kekuatan (dominasi) anggota, bukan kontrak. (Contoh: Walmart, P&G, Apple).' },
                { id: 22, term: 'Horizontal Marketing System', definition: 'Dua perusahaan di level sama bergabung untuk peluang baru. (Contoh: Starbucks buka di dalam Target).' },
                { id: 23, term: 'Multichannel Distribution System', definition: 'Satu perusahaan punya 2+ saluran untuk segmen beda. (Contoh: John Deere jual traktor besar via dealer, traktor kecil via Lowe\'s/Online).' },
                { id: 24, term: 'Disintermediation', definition: 'Pemotongan perantara (cut-off) atau penggantian perantara lama dengan model baru. (Contoh: Spotify ganti iTunes; Toys"R"Us bangkrut).' },
                { id: 25, term: '4 Langkah Desain Saluran', definition: '1. Analisis Kebutuhan Konsumen. 2. Tetapkan Tujuan. 3. Identifikasi Alternatif (Jenis/Jumlah/Tanggungjawab). 4. Evaluasi Alternatif.' },
                { id: 26, term: 'Intensive Distribution', definition: 'Stok di sebanyak mungkin outlet. Wajib untuk Convenience products (Sabun, permen).' },
                { id: 27, term: 'Exclusive Distribution', definition: 'Hak eksklusif di sedikit dealer. Wajib untuk Luxury goods (Rolex, Mobil mewah) demi citra/layanan.' },
                { id: 28, term: 'Selective Distribution', definition: 'Di antara intensif dan eksklusif. Cocok untuk Shopping goods (TV, Furnitur, Elektronik).' },
                { id: 29, term: 'Manajemen Saluran (Selecting, Managing, Evaluating)', definition: 'Selecting: Memilih anggota (Timex). Managing: Memotivasi (PRM). Evaluating: Cek performa (kuota/stok).' },
                { id: 30, term: 'Exclusive Dealing', definition: 'Penjual menuntut dealer dilarang menjual produk pesaing. (Legal jika tidak mematikan kompetisi).' },
                { id: 31, term: 'Exclusive Territorial Agreements', definition: 'Produsen membatasi wilayah penjualan dealer.' },
                { id: 32, term: 'Tying Agreements (Full-line forcing)', definition: 'Produsen menjual merek kuat hanya jika dealer mau mengambil merek lain yang kurang laku (Beli A wajib Beli B). Sering Ilegal.' },
                { id: 33, term: 'Marketing Logistics (Definisi & Tujuan)', definition: 'Merencanakan aliran fisik barang. Tujuan: Level layanan target dengan biaya minimal (Trade-off biaya vs layanan).' },
                { id: 34, term: '4 Fungsi Logistik', definition: '1. Warehousing (Gudang/DC). 2. Inventory (JIT/RFID). 3. Transportation (Multimodal). 4. Info Mgmt (EDI).' },
                { id: 35, term: 'Third-Party Logistics (3PL)', definition: 'Menggunakan penyedia luar (FedEx, UPS, DHL) agar perusahaan fokus ke bisnis inti.' },
                { id: 36, term: 'Sociolla (Omnichannel)', definition: 'Integrasi fisik & digital mulus. Menggunakan aplikasi SOCO di toko untuk scan barcode/review.' },
                // MODUL 2: Integrated Marketing Communication Strategy
                { id: 37, term: 'Kasus Burger King', definition: 'Kampanye "liar/aneh" tapi disiplin pada posisi merek "Home of the Whopper" & diferensiasi "Flame-Grilled".' },
                { id: 38, term: 'Advertising (Periklanan)', definition: 'Jangkauan luas, non-personal, biaya total tinggi tapi murah per kontak, bisa diulang (repeat).' },
                { id: 39, term: 'Sales Promotion (Promosi Penjualan)', definition: 'Insentif jangka pendek, respon cepat ("Beli Sekarang!"), diskon/kupon/pameran.' },
                { id: 40, term: 'Personal Selling (Penjualan Pribadi)', definition: 'Interaksi dua arah, bangun hubungan, efektif di tahap akhir, biaya paling mahal per kontak.' },
                { id: 41, term: 'Public Relations (PR)', definition: 'Membangun citra baik, menangani rumor. Sifat: Lebih kredibel/jujur dibanding iklan (berita/feature).' },
                { id: 42, term: 'Direct & Digital Marketing', definition: 'Segera, terpersonalisasi, interaktif (Medsos, Telemarketing).' },
                { id: 43, term: 'IMC (Integrated Marketing Comm.)', definition: 'Mengintegrasikan saluran komunikasi untuk pesan yang Jelas, Konsisten, dan Menarik (Clear, Consistent, Compelling).' },
                { id: 44, term: 'Content Marketing Manager', definition: 'Peran baru pemasar: Menciptakan, Menginspirasi, dan Membagikan pesan merek (Shareable brand messages).' },
                { id: 45, term: '9 Elemen Komunikasi', definition: 'Sender, Encoding, Message, Media, Decoding, Receiver, Response, Feedback, Noise.' },
                { id: 46, term: '6 Tahap Kesiapan Pembeli', definition: 'Awareness -> Knowledge -> Liking -> Preference -> Conviction -> Purchase.' },
                { id: 47, term: 'Model AIDA', definition: 'Attention (Perhatian), Interest (Minat), Desire (Keinginan), Action (Tindakan).' },
                { id: 48, term: '3 Jenis Daya Tarik (Appeals)', definition: '1. Rational (Manfaat/Kualitas). 2. Emotional (Takut/Cinta/Humor). 3. Moral (Benar vs Salah).' },
                { id: 49, term: 'Personal vs Nonpersonal Channels', definition: 'Personal: Tatap muka/chat/Word-of-Mouth (Buzz Marketing). Nonpersonal: Media massa/Events/Atmosfer.' },
                { id: 50, term: 'Affordable Method', definition: 'Anggaran "semampunya". Mengabaikan dampak promosi terhadap penjualan.' },
                { id: 51, term: 'Percentage-of-Sales Method', definition: 'Anggaran = % dari penjualan. Salah logika: melihat penjualan sebagai sebab, bukan hasil promosi.' },
                { id: 52, term: 'Competitive-Parity Method', definition: 'Menyamai pengeluaran pesaing.' },
                { id: 53, term: 'Objective-and-Task Method', definition: 'Metode Paling Logis. 1. Definisi tujuan. 2. Tentukan tugas. 3. Hitung biaya tugas.' },
                { id: 54, term: 'Push Strategy', definition: 'Produsen "mendorong" produk ke retailer (via sales force) agar retailer jual ke konsumen.' },
                { id: 55, term: 'Pull Strategy', definition: 'Produsen "menarik" konsumen (via Iklan TV/IG) agar konsumen meminta barang ke retailer.' },
                { id: 56, term: 'Deceptive Advertising', definition: 'Iklan palsu atau menipu.' },
                { id: 57, term: 'Bait-and-Switch', definition: 'Ilegal: Pancing dengan harga murah, bilang stok habis, paksa beli barang mahal.' },
                { id: 58, term: 'Etika Sales (Penjualan)', definition: 'Dilarang: Suap (Bribes), Mencuri rahasia dagang, Menjelekkan pesaing (Disparage) dengan info palsu.' },
                { id: 59, term: 'Tokopedia ("Mulai Aja Dulu")', definition: 'Memposisikan brand sebagai Enabler (pemberdaya) untuk mengatasi hambatan psikologis memulai bisnis.' },
                // MODUL 3: Creating Competitive Advantage
                { id: 60, term: 'Filosofi Nordstrom', definition: 'Fokus Diferensiasi Pelayanan. Aturan: "Use good judgment". Fokus Lifetime Value.' },
                { id: 61, term: 'Identifikasi Pesaing: Industry vs Market View', definition: 'Industry: Pesaing produk sama (Pepsi vs Coke). Market: Pesaing kebutuhan sama (Coke vs Jus). Market View mencegah Marketing Myopia.' },
                { id: 62, term: 'Menilai Pesaing (Assessing)', definition: 'Menentukan tujuan, strategi, kekuatan/kelemahan (Benchmarking), dan reaksi pesaing.' },
                { id: 63, term: 'Customer Value Analysis', definition: 'Alat untuk menentukan manfaat apa yang dihargai pelanggan & peringkat performa kita vs pesaing.' },
                { id: 64, term: 'Strong vs Weak / Close vs Distant', definition: 'Strong: Melajamkan kemampuan. Close: Hati-hati jangan hancurkan pesaing dekat (bisa undang pemain besar).' },
                { id: 65, term: 'Blue Ocean Strategy', definition: 'Mencari ruang pasar tanpa pesaing (uncontested market space). Menciptakan permintaan baru.' },
                { id: 66, term: 'Overall Cost Leadership', definition: 'Biaya produksi/distribusi terendah untuk harga termurah. (Contoh: Walmart, AirAsia).' },
                { id: 67, term: 'Differentiation', definition: 'Menciptakan produk/program unik & superior (Kelas atas). (Contoh: Apple, Nordstrom).' },
                { id: 68, term: 'Focus (Niche)', definition: 'Fokus pada segmen sempit atau wilayah tertentu. (Contoh: Ritz-Carlton).' },
                { id: 69, term: 'Middle-of-the-Roaders', definition: 'Strategi gagal. Tidak termurah, tidak terunik. (Contoh: Sears, Holiday Inn lama).' },
                { id: 70, term: 'Market Leader (40%) - Expand Total Market', definition: '1. New Users (Pengguna baru). 2. New Uses (Kegunaan baru). 3. More Usage (Pakai lebih sering).' },
                { id: 71, term: 'Market Leader (40%) - Protect & Expand Share', definition: 'Protect: Inovasi berkelanjutan (Continuous Innovation). Expand Share: Rebut porsi pesaing.' },
                { id: 72, term: 'Market Challenger (30%)', definition: 'Runner-up agresif. Serangan Frontal (tandingi 4P) atau Indirect (serang titik lemah).' },
                { id: 73, term: 'Market Follower (20%)', definition: 'Runner-up main aman. Meniru (Imitate) pemimpin untuk profit stabil tanpa biaya inovasi tinggi.' },
                { id: 74, term: 'Market Nicher (10%)', definition: 'Spesialisasi pasar kecil. Kunci: High Margin (bukan volume). Kenal target sangat dalam.' },
                { id: 75, term: '4 Orientasi Perusahaan', definition: '1. Product (Barang). 2. Customer (Pelanggan). 3. Competitor (Pesaing). 4. Market-Centered (Seimbang Pelanggan & Pesaing).' },
                { id: 76, term: 'AirAsia (Cost Leadership)', definition: 'Efisiensi: No frills, Single aircraft type, Quick turnaround, Online distribution.' },
                // MODUL 4: The Global Marketplace
                { id: 77, term: 'L\'Oréal Strategy', definition: 'Universalisation: Global Brand Impact (Konsisten) + Local Brand Responsiveness (Adaptasi).' },
                { id: 78, term: 'Trade Barriers (Hambatan Dagang)', definition: 'Tariff (Pajak), Quota (Batasan jumlah), Exchange Controls (Mata uang), Nontariff (Birokrasi/Standar).' },
                { id: 79, term: 'Subsistence Economies', definition: 'Mayoritas bertani sederhana, sedikit peluang pasar. (Contoh: Afrika).' },
                { id: 80, term: 'Raw Material Exporting Economies', definition: 'Kaya SDA (Minyak/Timah), miskin industri. Pasar alat berat/truk. (Contoh: Arab Saudi, Chile).' },
                { id: 81, term: 'Emerging Economies (Industrializing)', definition: 'Manufaktur tumbuh cepat, kelas menengah baru. Pasar bahan baku/baja. (Contoh: BRIC).' },
                { id: 82, term: 'Industrial Economies', definition: 'Pengekspor barang jadi, kaya. Pasar segala jenis barang. (Contoh: Jepang, AS).' },
                { id: 83, term: 'Indikator Potensi Pasar', definition: 'Demografi, Geografis, Faktor Ekonomi, Sosiokultural, Politik-Hukum.' },
                { id: 84, term: 'Exporting', definition: 'Indirect: Lewat perantara (Risiko min). Direct: Urus sendiri (Risiko & Profit lebih besar).' },
                { id: 85, term: 'Joint Venture: Licensing', definition: 'Jual hak merek/resep dengan royalti. (Contoh: Coca-Cola bottlers).' },
                { id: 86, term: 'Joint Venture: Contract Manufacturing', definition: 'Kontrak pabrik lokal untuk produksi. (Mulai cepat, risiko kecil).' },
                { id: 87, term: 'Joint Venture: Management Contracting', definition: 'Jual "jasa manajemen" (Hilton kelola hotel punya investor lokal).' },
                { id: 88, term: 'Joint Venture: Joint Ownership', definition: 'Bikin PT baru bareng partner lokal. (Wajib di beberapa negara).' },
                { id: 89, term: 'Direct Investment', definition: 'Bangun fasilitas sendiri 100%. Kontrol penuh, risiko tertinggi (politik/devaluasi).' },
                { id: 90, term: 'Product/Promotion Adaptation (5 Strategi)', definition: '1. Straight Ext: Tetap/Tetap. 2. Prod Adapt: Ubah Prod/Promo Tetap. 3. Comm Adapt: Prod Tetap/Ubah Promo. 4. Dual Adapt: Ubah Semua. 5. Inv: Produk Baru.' },
                { id: 91, term: 'Price Escalation', definition: 'Harga luar negeri lebih mahal karena logistik/tarif/margin perantara.' },
                { id: 92, term: 'Dumping', definition: 'Menjual di luar negeri lebih murah dari modal atau harga domestik. (Ilegal/Sanksi WTO).' },
                { id: 93, term: 'Whole-Channel View', definition: 'Seller -> Channels between nations -> Channels within nations -> Buyer.' },
                { id: 94, term: 'Evolusi Organisasi Global', definition: 'Export Dept -> International Division -> Global Organization (Dunia sebagai satu pasar tanpa batas).' },
                { id: 95, term: 'Gojek Global (Adapted Marketing)', definition: 'Ganti nama (Go-Viet/GET) dan adaptasi layanan (Singapura mobil, Vietnam motor).' },
                // MODUL 5: Sustainable Marketing
                { id: 96, term: 'Unilever Sustainable Living Plan', definition: 'Bisnis tumbuh 2x, Dampak lingkungan turun 50%, Dampak sosial naik. (Bisnis & Sustainability bisa jalan bareng).' },
                { id: 97, term: 'Sustainable Marketing', definition: 'Memenuhi kebutuhan kini sambil melestarikan kemampuan generasi mendatang untuk memenuhi kebutuhan mereka.' },
                { id: 98, term: 'Sustainable vs Konsep Lain', definition: 'Marketing Concept: Kini/Kini. Societal: Kini/Masa Depan (Konsumen). Strategic: Kini/Masa Depan (Bisnis).' },
                { id: 99, term: 'Penyebab High Prices', definition: '1. High Distribution Costs. 2. High Ad/Promo Costs. 3. Excessive Markups.' },
                { id: 100, term: 'Deceptive Practices', definition: 'Pricing: Harga palsu. Promotion: Iklan bohong. Packaging: Slack filling (Kemasan besar isi sedikit).' },
                { id: 101, term: 'Planned Obsolescence', definition: 'Sengaja bikin produk cepat rusak/usang agar konsumen beli lagi (Fashion/Gadget).' },
                { id: 102, term: 'Redlining', definition: 'Menghindari buka toko di daerah miskin. (Orang miskin terpaksa belanja mahal).' },
                { id: 103, term: 'Dampak ke Masyarakat', definition: 'Materialism (False wants), Social Goods (Kurang fasilitas umum), Cultural Pollution (Polusi iklan).' },
                { id: 104, term: 'Dampak ke Bisnis Lain', definition: 'Akuisisi pesaing, Hambatan masuk (Barriers to entry), Kompetisi predator.' },
                { id: 105, term: 'Consumerism', definition: 'Gerakan hak pembeli: Hak Tahu, Hak Didengar, Hak Keamanan, Hak Memilih.' },
                { id: 106, term: 'Environmentalism', definition: 'Gerakan peduli lingkungan (Pollution Prevention & Product Stewardship).' },
                { id: 107, term: 'Environmental Portfolio (Internal)', definition: 'Pollution Prevention: Cegah limbah (Hari Ini). New Clean Tech: Kemampuan baru (Masa Depan).' },
                { id: 108, term: 'Environmental Portfolio (Eksternal)', definition: 'Product Stewardship: Tanggung jawab siklus hidup (Hari Ini). Sustainability Vision: Visi strategis (Masa Depan).' },
                { id: 109, term: '5 Prinsip Sustainable Marketing', definition: '1. Consumer-Oriented. 2. Customer-Value. 3. Innovative. 4. Sense-of-Mission. 5. Societal.' },
                { id: 110, term: 'Etika Pemasaran', definition: 'Harus dipandu oleh Perusahaan & Manajer Individu (bukan cuma hukum). Butuh integritas & conscience.' },
                { id: 111, term: 'Lemonilo (Societal Marketing)', definition: 'Seimbang 3 aspek: Consumer (Enak), Company (Profit), Society (Sehat/Tanpa pengawet).' },
            ],
            essayExam: [{ question: 'Jelaskan Marketing Mix (4P) dengan contoh startup Indonesia!', modelAnswer: '1) Product - layanan digital, 2) Price - dynamic pricing, 3) Place - aplikasi mobile, 4) Promotion - promo cashback.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                // MODUL 1: CHANNELS & LOGISTICS (20 questions)
                { question: "Pelajaran utama dari kasus Netflix 'Finding the Future by Abandoning the Past' adalah...", options: ["Perusahaan harus mempertahankan layanan lama selama mungkin", "Kunci sukses hanya pada konten orisinil, bukan distribusi", "Perusahaan harus berani meninggalkan cara lama demi masa depan agar tidak tertinggal", "Fokus utama harus pada pengiriman fisik DVD daripada streaming"], answer: 2, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Pandangan 'Sense-and-Respond' yang memulai perencanaan dari kebutuhan pelanggan disebut...", options: ["Supply Chain", "Demand Chain", "Value Chain", "Logistic Chain"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Mitra dalam Value Delivery Network yang menyediakan bahan mentah, komponen, dan keuangan disebut...", options: ["Downstream Partners", "Upstream Partners", "Retailers", "Intermediaries"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Apa fungsi utama perantara (Intermediaries) terkait efisiensi ekonomi?", options: ["Meningkatkan biaya produk", "Mengurangi jumlah kontak transaksi antara produsen dan konsumen", "Memperpanjang waktu pengiriman", "Menghilangkan peran produsen"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Fungsi anggota saluran: Membentuk dan menyesuaikan penawaran dengan kebutuhan pembeli (perakitan/pengemasan) disebut...", options: ["Contact", "Matching", "Negotiation", "Promotion"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Saluran pemasaran yang TIDAK memiliki perantara (Produsen -> Konsumen) disebut...", options: ["Indirect Marketing Channel", "Direct Marketing Channel", "Hybrid Channel", "Vertical Channel"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Konflik yang terjadi antar perusahaan pada tingkat saluran yang sama (misal: Dealer A vs Dealer B) disebut...", options: ["Vertical Conflict", "Horizontal Conflict", "System Conflict", "Multi-channel Conflict"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Konflik antara McDonald's pusat dengan pemegang franchise terkait standar pelayanan adalah contoh...", options: ["Horizontal Conflict", "Vertical Conflict", "Lateral Conflict", "External Conflict"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Bentuk VMS di mana produksi dan distribusi digabungkan di bawah kepemilikan tunggal (Single Ownership) adalah...", options: ["Corporate VMS", "Contractual VMS", "Administered VMS", "Conventional VMS"], answer: 0, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Franchise Organization (Waralaba) adalah contoh paling umum dari...", options: ["Corporate VMS", "Contractual VMS", "Administered VMS", "Horizontal Marketing System"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "VMS di mana kepemimpinan diasumsikan melalui ukuran dan kekuatan dominasi salah satu anggota (seperti Walmart/Apple) disebut...", options: ["Corporate VMS", "Contractual VMS", "Administered VMS", "Conventional Channel"], answer: 2, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Ketika dua perusahaan di level yang sama bergabung untuk peluang baru (Contoh: Starbucks di dalam Target), disebut...", options: ["Vertical Marketing System", "Horizontal Marketing System", "Multichannel System", "Disintermediation"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Fenomena tergesernya iTunes oleh Spotify atau bangkrutnya Toys'R'Us karena e-commerce disebut...", options: ["Intermediation", "Disintermediation", "Reintermediation", "Integration"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Strategi distribusi untuk 'Convenience Products' (sabun, permen) yang menyetok di sebanyak mungkin outlet adalah...", options: ["Exclusive Distribution", "Selective Distribution", "Intensive Distribution", "Niche Distribution"], answer: 2, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Strategi distribusi untuk 'Luxury Goods' (Rolex, Mobil Mewah) yang memberikan hak pada jumlah dealer sangat terbatas adalah...", options: ["Exclusive Distribution", "Selective Distribution", "Intensive Distribution", "Mass Distribution"], answer: 0, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Strategi distribusi di antara intensif dan eksklusif (contoh: TV, Furniture, Nike) disebut...", options: ["Inclusive Distribution", "Selective Distribution", "Intensive Distribution", "Exclusive Distribution"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Hukum: Produsen menjual merek kuat HANYA jika dealer mau mengambil merek lain yang kurang laku (Full-line forcing) disebut...", options: ["Exclusive Dealing", "Tying Agreements", "Exclusive Territorial", "Dumping"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Tujuan utama Logistik Pemasaran adalah...", options: ["Biaya termurah tanpa peduli layanan", "Layanan terbaik tanpa peduli biaya", "Level layanan target dengan biaya seminimal mungkin", "Menghapus semua gudang"], answer: 2, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Menggunakan penyedia jasa luar (FedEx, DHL) untuk mengurus logistik disebut...", options: ["In-house Logistics", "Third-Party Logistics (3PL)", "Cross-Docking", "Multimodal"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Kasus Sociolla menggunakan strategi integrasi fisik dan digital yang disebut...", options: ["Direct Marketing", "Omnichannel Retailing", "Single Channel", "Traditional Retail"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Dalam Supply Chain, pandangan tradisional 'Make-and-Sell' berfokus pada...", options: ["Kebutuhan pelanggan", "Bahan baku, input produktif, dan kapasitas pabrik", "Pemasaran digital", "Layanan purna jual"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                { question: "Dalam Desain Saluran, langkah pertama adalah...", options: ["Menetapkan Tujuan", "Menganalisis Kebutuhan Konsumen", "Evaluasi Alternatif", "Memilih Anggota"], answer: 1, xp: 5, category: "Modul 1: Channels & Logistics" },
                // MODUL 2: IMC STRATEGY (14 questions)
                { question: "Apa kunci sukses komunikasi Burger King di tengah kampanye yang 'aneh'?", options: ["Anggaran tak terbatas", "Konsistensi posisi 'Home of the Whopper' & diferensiasi 'Flame-Grilled'", "Selalu menggunakan selebriti", "Meniru McDonald's"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Alat promosi yang memiliki jangkauan luas, bisa diulang, namun bersifat satu arah (monolog) adalah...", options: ["Personal Selling", "Advertising", "Sales Promotion", "Direct Marketing"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Alat promosi berupa insentif jangka pendek (diskon/kupon) untuk mendorong pembelian segera adalah...", options: ["Advertising", "Public Relations", "Sales Promotion", "Personal Selling"], answer: 2, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Alat promosi paling mahal per kontak namun paling efektif membangun preferensi dan hubungan adalah...", options: ["Advertising", "Sales Promotion", "Personal Selling", "Public Relations"], answer: 2, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Definisi IMC (Integrated Marketing Communications) menekankan pesan yang...", options: ["Lucu, Viral, Singkat", "Jelas, Konsisten, dan Menarik (Clear, Consistent, Compelling)", "Teknis, Detail, Ilmiah", "Murah, Cepat, Efektif"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Tahapan model AIDA dalam merancang pesan adalah...", options: ["Awareness, Interest, Desire, Action", "Attention, Interest, Desire, Action", "Action, Interest, Desire, Awareness", "Attention, Information, Decision, Action"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Metode anggaran promosi yang paling logis (berdasarkan tujuan & tugas) adalah...", options: ["Affordable Method", "Percentage-of-Sales Method", "Competitive-Parity Method", "Objective-and-Task Method"], answer: 3, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Metode anggaran yang salah logika karena memandang penjualan sebagai penyebab promosi (bukan hasil) adalah...", options: ["Affordable Method", "Percentage-of-Sales Method", "Competitive-Parity Method", "Objective-and-Task Method"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Strategi 'Push Strategy' dilakukan dengan cara...", options: ["Produsen mempromosikan langsung ke konsumen akhir", "Produsen mendorong produk melalui saluran (grosir/ritel) agar mereka menjualnya", "Konsumen meminta barang ke pengecer", "Mengandalkan word-of-mouth"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Strategi 'Pull Strategy' dilakukan dengan cara...", options: ["Produsen memberikan insentif ke dealer", "Produsen mempromosikan langsung ke konsumen akhir agar mereka meminta barang ke pengecer", "Salesman mendatangi rumah konsumen", "Meningkatkan margin keuntungan pengecer"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Praktik ilegal 'Bait-and-Switch' adalah...", options: ["Diskon cuci gudang", "Memancing dengan harga murah, bilang stok habis, paksa beli barang mahal", "Memberikan sampel gratis", "Menjual barang bundle"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Kampanye Tokopedia 'Mulai Aja Dulu' memposisikan brand sebagai...", options: ["Toko termurah", "Enabler (Pemberdaya) mimpi", "Aplikasi tercanggih", "Logistik tercepat"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Dalam 6 Tahap Kesiapan Pembeli, tahapan setelah 'Knowledge' adalah...", options: ["Purchase", "Liking", "Preference", "Conviction"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                { question: "Daya tarik pesan (Message Appeal) yang membangkitkan emosi takut/cinta/humor adalah...", options: ["Rational Appeal", "Emotional Appeal", "Moral Appeal", "Social Appeal"], answer: 1, xp: 5, category: "Modul 2: IMC Strategy" },
                // MODUL 3: COMPETITIVE ADVANTAGE (15 questions)
                { question: "Filosofi Nordstrom fokus pada...", options: ["Harga Termurah", "Diferensiasi Pelayanan Ekstrem", "Teknologi Canggih", "Lokasi Terbanyak"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Identifikasi pesaing 'Market View' lebih baik daripada 'Industry View' karena...", options: ["Lebih mudah risetnya", "Mencegah Marketing Myopia (melihat pemuas kebutuhan yang sama)", "Hanya melihat produk yang identik", "Fokus pada proses produksi"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Alat analisis untuk menentukan manfaat yang dihargai pelanggan & peringkat performa vs pesaing adalah...", options: ["SWOT", "Customer Value Analysis", "BCG Matrix", "Porter 5 Forces"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Strategi 'Blue Ocean' menyarankan untuk...", options: ["Bertarung di pasar padat (Red Ocean)", "Mencari ruang pasar tanpa pesaing (uncontested) dan menciptakan permintaan baru", "Meniru pemimpin pasar", "Menurunkan harga serendah mungkin"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Strategi Porter: Menekan biaya produksi terendah untuk harga murah (Contoh: AirAsia/Walmart) adalah...", options: ["Differentiation", "Overall Cost Leadership", "Focus", "Middle-of-the-Roaders"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Strategi Porter: Menciptakan produk unik/superior (Contoh: Apple) adalah...", options: ["Differentiation", "Overall Cost Leadership", "Focus", "Middle-of-the-Roaders"], answer: 0, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Strategi Porter: Fokus pada segmen sempit/wilayah tertentu (Contoh: Ritz-Carlton) adalah...", options: ["Differentiation", "Overall Cost Leadership", "Focus", "Middle-of-the-Roaders"], answer: 2, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Perusahaan yang gagal karena mencoba jadi segalanya (tidak termurah, tidak terunik) disebut Porter sebagai...", options: ["Market Leader", "Middle-of-the-Roaders", "Market Nicher", "Challenger"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Strategi Market Leader 'Expand Total Market' meliputi...", options: ["Lower Price, Lower Cost", "New Users, New Uses, More Usage", "Imitate, Adapt, Cloning", "Frontal Attack, Flank Attack"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Perusahaan Runner-up yang agresif menyerang pemimpin pasar disebut...", options: ["Market Leader", "Market Challenger", "Market Follower", "Market Nicher"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Perusahaan Runner-up yang main aman dan meniru pemimpin untuk profit stabil disebut...", options: ["Market Challenger", "Market Follower", "Market Nicher", "Market Leader"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Kunci sukses Market Nicher (Pencari Celah) adalah...", options: ["Volume tinggi", "Spesialisasi & High Margin", "Harga murah", "Distribusi massal"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Orientasi perusahaan terbaik (Market-Centered) menyeimbangkan fokus pada...", options: ["Produk & Penjualan", "Pelanggan & Pesaing", "Biaya & Profit", "Lokal & Global"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Strategi Market Leader 'Protect Share' dilakukan dengan cara...", options: ["Inovasi berkelanjutan (Continuous Innovation)", "Menurunkan kualitas", "Menaikkan harga", "Mengurangi promosi"], answer: 0, xp: 5, category: "Modul 3: Competitive Advantage" },
                { question: "Dalam analisis pesaing, langkah 'Selecting' menyarankan untuk berhati-hati menghancurkan...", options: ["Pesaing Lemah", "Pesaing Dekat (Close Competitors)", "Pesaing Jauh", "Pesaing Asing"], answer: 1, xp: 5, category: "Modul 3: Competitive Advantage" },
                // MODUL 4: GLOBAL MARKETPLACE (15 questions)
                { question: "Strategi L'Oreal 'Universalisation' menggabungkan...", options: ["Cost Leadership & Focus", "Global Brand Impact & Local Brand Responsiveness", "Export & Import", "Online & Offline"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Pajak impor yang dikenakan pemerintah disebut...", options: ["Quota", "Tariff", "Embargo", "Nontariff Barrier"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Batasan jumlah barang yang boleh diimpor disebut...", options: ["Quota", "Tariff", "Exchange Control", "Tax"], answer: 0, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Struktur ekonomi negara kaya SDA tapi miskin industri (Pasar alat berat) adalah...", options: ["Subsistence Economies", "Raw Material Exporting Economies", "Emerging Economies", "Industrial Economies"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Struktur ekonomi negara manufaktur tumbuh cepat & kelas menengah baru (BRIC) adalah...", options: ["Subsistence Economies", "Emerging Economies (Industrializing)", "Raw Material Exporting", "Industrial Economies"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Strategi masuk pasar global risiko terendah (lewat perantara) adalah...", options: ["Direct Investment", "Joint Venture", "Direct Exporting", "Indirect Exporting"], answer: 3, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Menjual hak merek/resep dengan bayaran royalti (Contoh: Coca-Cola) adalah...", options: ["Licensing", "Contract Manufacturing", "Direct Investment", "Management Contracting"], answer: 0, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Mengontrak pabrik lokal untuk memproduksi barang (Risiko kecil, cepat mulai) adalah...", options: ["Licensing", "Contract Manufacturing", "Management Contracting", "Joint Ownership"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Membangun fasilitas sendiri 100% di luar negeri (Risiko tertinggi, Kontrol penuh) adalah...", options: ["Direct Investment", "Joint Venture", "Exporting", "Licensing"], answer: 0, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Adaptasi: Mengubah produk, Promosi tetap. Disebut...", options: ["Straight Extension", "Product Adaptation", "Communication Adaptation", "Dual Adaptation"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Adaptasi: Produk tetap, Promosi diubah. Disebut...", options: ["Straight Extension", "Product Adaptation", "Communication Adaptation", "Dual Adaptation"], answer: 2, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Adaptasi: Mengubah produk DAN promosi sekaligus. Disebut...", options: ["Straight Extension", "Product Adaptation", "Dual Adaptation", "Product Invention"], answer: 2, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Menciptakan produk baru khusus untuk pasar luar negeri disebut...", options: ["Product Invention", "Product Adaptation", "Dual Adaptation", "Straight Extension"], answer: 0, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Menjual produk di luar negeri lebih murah dari modal/domestik (Ilegal) disebut...", options: ["Price Escalation", "Dumping", "Transfer Pricing", "Discounting"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Strategi Gojek di Vietnam/Thailand (Ganti nama & layanan) adalah contoh...", options: ["Standardized Marketing", "Adapted Marketing", "Global Marketing", "Export Marketing"], answer: 1, xp: 5, category: "Modul 4: Global Marketplace" },
                { question: "Jenis Joint Venture 'Joint Ownership' berarti...", options: ["Membentuk PT baru bersama investor lokal", "Sekadar memberi lisensi", "Mengontrak pabrik", "Ekspor langsung"], answer: 0, xp: 5, category: "Modul 4: Global Marketplace" },
                // MODUL 5: SUSTAINABLE MARKETING (14 questions)
                { question: "Tujuan Unilever Sustainable Living Plan adalah...", options: ["Profit maksimal tanpa peduli lingkungan", "Bisnis tumbuh 2x, Dampak lingkungan turun 50%, Dampak sosial naik", "Menutup pabrik yang polusi", "Hanya fokus donasi"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Definisi Sustainable Marketing adalah...", options: ["Memenuhi kebutuhan kini untuk profit kini", "Memenuhi kebutuhan kini sambil melestarikan kemampuan generasi masa depan", "Hanya memikirkan masa depan", "Menjual produk daur ulang saja"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Penyebab kritik 'High Prices' menurut pengamat sosial, KECUALI...", options: ["Biaya Distribusi Tinggi", "Biaya Iklan/Promo Tinggi", "Markup Berlebihan", "Biaya Bahan Baku Murah"], answer: 3, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Praktik 'Deceptive Pricing' adalah...", options: ["Iklan berlebihan", "Menipu harga (diskon palsu/harga eceran palsu)", "Kemasan isi angin", "Produk cepat rusak"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Praktik 'Deceptive Packaging' (Slack Filling) adalah...", options: ["Harga palsu", "Kemasan dibuat besar tapi isinya sedikit", "Iklan bohong", "Barang palsu"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Sengaja membuat produk cepat rusak/usang (Planned Obsolescence) sering terjadi di industri...", options: ["Makanan", "Fashion & Gadget", "Properti", "Jasa"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Diskriminasi wilayah (menghindari buka toko di daerah miskin) disebut...", options: ["Greenwashing", "Redlining", "Whitewashing", "Blacklisting"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Gerakan hak pembeli (Tahu, Didengar, Aman, Memilih) disebut...", options: ["Consumerism", "Environmentalism", "Socialism", "Capitalism"], answer: 0, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Strategi lingkungan: Mencegah limbah sebelum diciptakan (Internal/Hari Ini) adalah...", options: ["Pollution Prevention", "Product Stewardship", "New Clean Technology", "Sustainability Vision"], answer: 0, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Strategi lingkungan: Tanggung jawab dampak produk sepanjang siklus hidup (Eksternal/Hari Ini) adalah...", options: ["Pollution Prevention", "Product Stewardship", "New Clean Technology", "Sustainability Vision"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Prinsip: Perusahaan mendefinisikan misi dalam istilah sosial luas (Sense-of-Mission) contohnya...", options: ["Dove membangun kepercayaan diri wanita", "Perusahaan jual sabun biasa", "Perusahaan cari untung", "Perusahaan teknologi"], answer: 0, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Kasus Lemonilo menerapkan Societal Marketing dengan menyeimbangkan...", options: ["Konsumen (Enak), Company (Profit), Society (Sehat)", "Harga, Barang, Tempat", "Lokal, Nasional, Global", "Iklan, Sales, PR"], answer: 0, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Kritik 'Cultural Pollution' menuduh pemasaran...", options: ["Mencemari udara", "Mengotori indera masyarakat dengan gangguan komersial/iklan berlebih", "Merusak budaya tradisional", "Membuang limbah sembarangan"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                // ADDENDUM (5 questions)
                { question: "Hambatan perdagangan 'Nontariff Barriers' meliputi...", options: ["Pajak impor", "Batasan jumlah", "Standar produk yang bias atau birokrasi dipersulit", "Larangan total"], answer: 2, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Peran baru pemasar 'Content Marketing Manager' bertugas...", options: ["Hanya membuat iklan TV", "Menciptakan, Menginspirasi, dan Membagikan pesan merek (Shareable)", "Mengurus logistik", "Mengatur keuangan"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Tujuan 'Benchmarking' dalam analisis pesaing adalah...", options: ["Meniru pesaing persis", "Membandingkan produk/proses dengan pesaing/pemimpin untuk perbaikan", "Mencuri rahasia dagang", "Menurunkan harga"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Strategi lingkungan 'New Clean Technology' fokus pada...", options: ["Pencegahan limbah saat ini", "Mengembangkan kemampuan baru untuk masa depan (Internal)", "Tanggung jawab produk", "Visi strategis"], answer: 1, xp: 5, category: "Modul 5: Sustainable Marketing" },
                { question: "Kenaikan harga produk di luar negeri akibat logistik & tarif disebut...", options: ["Price Escalation", "Dumping", "Inflation", "Devaluation"], answer: 0, xp: 5, category: "Modul 5: Sustainable Marketing" },
                // ADDITIONAL QUESTIONS (45 questions)
                { question: "Salah satu dari 8 fungsi anggota saluran adalah 'Risk Taking', yang berarti...", options: ["Menanggung risiko pelaksanaan pekerjaan saluran", "Mengambil keuntungan sebesar-besarnya", "Berjudi dengan stok barang", "Menghindari tanggung jawab hukum"], answer: 0, xp: 5 },
                { question: "Fungsi anggota saluran 'Financing' bertugas untuk...", options: ["Mengakuisisi dan menggunakan dana untuk menutup biaya operasional saluran", "Mencari investor asing", "Memberikan pinjaman kepada konsumen", "Membayar pajak perusahaan"], answer: 0, xp: 5 },
                { question: "Dalam manajemen logistik, penggabungan dua atau lebih moda transportasi (misal: Truk + Kereta) disebut...", options: ["Multimodal Transportation", "Single Mode", "Physical Distribution", "Warehousing"], answer: 0, xp: 5 },
                { question: "Sistem manajemen informasi logistik yang mempertukarkan data pesanan dan inventaris secara elektronik antar komputer disebut...", options: ["EDI (Electronic Data Interchange)", "VMS (Vertical Marketing System)", "ERP (Enterprise Resource Planning)", "CRM (Customer Relationship Management)"], answer: 0, xp: 5 },
                { question: "Manajemen saluran tidak hanya memilih, tetapi juga memotivasi anggota saluran menggunakan sistem...", options: ["PRM (Partner Relationship Management)", "HRM (Human Resource Management)", "SCM (Supply Chain Management)", "TQM (Total Quality Management)"], answer: 0, xp: 5 },
                { question: "Kebijakan publik: Ketika produsen membatasi wilayah geografis di mana dealer boleh menjual produk, disebut...", options: ["Exclusive Territorial Agreements", "Exclusive Dealing", "Tying Agreements", "Full-line Forcing"], answer: 0, xp: 5 },
                { question: "Konflik saluran vertikal sering terjadi karena...", options: ["Perbedaan tujuan antara kantor pusat dan franchisee", "Persaingan antar sesama toko ritel", "Perebutan wilayah antar sales", "Perang harga antar distributor"], answer: 0, xp: 5 },
                { question: "Dalam 9 Elemen Komunikasi, gangguan statis atau distorsi yang mengakibatkan pesan tidak diterima dengan jelas disebut...", options: ["Noise (Kebisingan)", "Decoding", "Encoding", "Feedback"], answer: 0, xp: 5 },
                { question: "Proses mengubah pikiran menjadi simbol-simbol (kata/gambar) oleh pengirim pesan disebut...", options: ["Encoding", "Decoding", "Response", "Media"], answer: 0, xp: 5 },
                { question: "Jenis daya tarik pesan (Message Appeal) yang ditujukan pada perasaan audiens tentang apa yang 'benar' dan 'salah' (isu sosial) adalah...", options: ["Moral Appeal", "Rational Appeal", "Emotional Appeal", "Humor Appeal"], answer: 0, xp: 5 },
                { question: "Saluran komunikasi personal yang melibatkan komunikasi dari mulut ke mulut tentang produk disebut...", options: ["Buzz Marketing / Word-of-Mouth", "Mass Media", "Atmospheres", "Events"], answer: 0, xp: 5 },
                { question: "Metode anggaran 'Competitive-Parity' didasarkan pada asumsi bahwa...", options: ["Pengeluaran pesaing mewakili kebijaksanaan kolektif industri", "Penjualan menentukan promosi", "Perusahaan harus hemat", "Tujuan spesifik harus dicapai"], answer: 0, xp: 5 },
                { question: "Dalam etika Personal Selling, tenaga penjual dilarang keras melakukan...", options: ["Menawarkan suap (Bribes) kepada agen pembelian", "Memberikan kartu nama", "Melakukan presentasi produk", "Follow up calon pelanggan"], answer: 0, xp: 5 },
                { question: "Selain suap, tenaga penjual juga dilarang melakukan 'Disparage', yaitu...", options: ["Menjelek-jelekkan pesaing dengan informasi palsu", "Menurunkan harga produk sendiri", "Mempromosikan fitur unggulan", "Mencari pelanggan baru"], answer: 0, xp: 5 },
                { question: "Tujuan utama dari 'Benchmarking' adalah...", options: ["Membandingkan produk/proses dengan pemimpin industri untuk meningkatkan kualitas/kinerja", "Meniru logo pesaing", "Menetapkan harga yang sama persis", "Mencuri karyawan pesaing"], answer: 0, xp: 5 },
                { question: "Dalam analisis pesaing, menyerang 'Pesaing Dekat' (Close Competitors) terlalu keras bisa berisiko...", options: ["Memaksa mereka bergabung menjadi pesaing yang lebih besar atau mengundang pemain raksasa masuk", "Membuat perusahaan bangkrut seketika", "Meningkatkan loyalitas pelanggan mereka", "Mengurangi biaya promosi"], answer: 0, xp: 5 },
                { question: "Strategi Market Challenger 'Frontal Attack' berarti...", options: ["Menandingi produk, iklan, dan harga pemimpin pasar secara langsung", "Menyerang titik lemah pesaing", "Menghindari konfrontasi", "Berpura-pura menjadi mitra"], answer: 0, xp: 5 },
                { question: "Perusahaan yang berorientasi 'Product-Oriented' cenderung...", options: ["Hanya fokus membuat barang bagus tapi melupakan kebutuhan pasar", "Sangat memperhatikan gerak-gerik pesaing", "Fokus total pada kepuasan pelanggan", "Menyeimbangkan pelanggan dan pesaing"], answer: 0, xp: 5 },
                { question: "Perusahaan yang berorientasi 'Competitor-Centered' memiliki kelemahan...", options: ["Terlalu reaktif terhadap gerakan lawan dan kehilangan visi sendiri", "Tidak peduli pada keuntungan", "Produknya selalu berkualitas buruk", "Mengabaikan biaya produksi"], answer: 0, xp: 5 },
                { question: "Struktur ekonomi 'Subsistence Economies' (seperti sebagian negara Afrika) memiliki karakteristik...", options: ["Mayoritas penduduk bertani sederhana dan sedikit peluang pasar", "Kaya sumber daya alam", "Manufaktur berkembang pesat", "Ekspor barang jadi teknologi tinggi"], answer: 0, xp: 5 },
                { question: "Struktur ekonomi 'Industrial Economies' (seperti Jepang/AS) adalah pasar yang baik untuk...", options: ["Segala jenis barang dan jasa", "Hanya bahan mentah", "Hanya alat berat", "Bantuan kemanusiaan saja"], answer: 0, xp: 5 },
                { question: "Hambatan perdagangan 'Exchange Controls' membatasi...", options: ["Jumlah mata uang asing yang boleh ditukarkan dan nilai tukarnya", "Jumlah fisik barang masuk", "Standar kualitas produk", "Iklan produk asing"], answer: 0, xp: 5 },
                { question: "Strategi masuk 'Management Contracting' terjadi ketika...", options: ["Perusahaan domestik mengekspor jasa manajemen (misal: Hotel) ke mitra asing yang menyediakan modal", "Perusahaan membangun pabrik sendiri", "Perusahaan menjual lisensi paten", "Perusahaan hanya mengirim barang"], answer: 0, xp: 5 },
                { question: "Konsep 'Whole-Channel View' dalam distribusi global mencakup...", options: ["Seller -> Saluran antar negara -> Saluran dalam negara -> Pembeli Akhir", "Hanya saluran di negara asal", "Hanya saluran di negara tujuan", "Hanya transportasi laut"], answer: 0, xp: 5 },
                { question: "Strategi Adaptasi 'Dual Adaptation' berarti perusahaan mengubah...", options: ["Baik Produk maupun Promosinya", "Hanya Produk", "Hanya Promosi", "Tidak mengubah apapun"], answer: 0, xp: 5 },
                { question: "Dalam Environmental Portfolio, 'Sustainability Vision' berfokus pada...", options: ["Panduan strategis masa depan tentang bagaimana perusahaan melayani kebutuhan dunia", "Pengelolaan limbah pabrik hari ini", "Tanggung jawab produk yang sudah dijual", "Teknologi bersih yang sedang dipakai"], answer: 0, xp: 5 },
                { question: "Prinsip 'Consumer-Oriented Marketing' mengharuskan perusahaan untuk...", options: ["Memandang dan mengatur kegiatan pemasaran dari sudut pandang konsumen", "Fokus pada efisiensi pabrik", "Memprioritaskan keinginan investor", "Mengabaikan keluhan pelanggan"], answer: 0, xp: 5 },
                { question: "Prinsip 'Innovative Marketing' mensyaratkan perusahaan untuk...", options: ["Terus mencari perbaikan produk dan pemasaran yang nyata", "Mempertahankan cara lama", "Meniru produk pesaing", "Mengurangi biaya riset"], answer: 0, xp: 5 },
                { question: "Kritik sosial 'Too Few Social Goods' menyoroti ketidakseimbangan antara...", options: ["Barang pribadi (mobil) dan barang sosial (jalan raya/polusi)", "Barang mewah dan barang murah", "Barang impor dan barang lokal", "Barang fisik dan jasa digital"], answer: 0, xp: 5 },
                { question: "Dampak pemasaran pada bisnis lain: 'Barriers to Entry' (Hambatan Masuk) sering disebabkan oleh...", options: ["Anggaran iklan raksasa perusahaan besar yang sulit ditandingi pemain baru", "Kurangnya inovasi", "Harga bahan baku murah", "Pajak pemerintah rendah"], answer: 0, xp: 5 },
                { question: "Perbedaan 'Concept Marketing' vs 'Strategic Planning' adalah...", options: ["Marketing Concept fokus profit saat ini, Strategic Planning fokus profit masa depan", "Marketing Concept fokus masa depan, Strategic Planning fokus saat ini", "Keduanya sama saja", "Marketing Concept tidak peduli konsumen"], answer: 0, xp: 5 },
                { question: "Contoh 'Product Invention' dalam pasar global adalah...", options: ["Menciptakan mobil murah sederhana khusus untuk negara berkembang", "Menjual iPhone yang sama di seluruh dunia", "Mengganti bahasa iklan", "Mengubah rasa makanan"], answer: 0, xp: 5 },
                { question: "Just-in-Time (JIT) adalah sistem logistik untuk...", options: ["Membawa stok hanya saat diperlukan untuk menekan biaya simpan", "Menimbun barang sebanyak mungkin", "Mengirim barang secepat kilat dengan biaya mahal", "Menghindari penggunaan gudang"], answer: 0, xp: 5 },
                { question: "Dalam proses komunikasi, 'Decoding' adalah...", options: ["Proses penerima menafsirkan arti simbol yang dikirim", "Proses pengirim membuat pesan", "Gangguan sinyal", "Respons balik konsumen"], answer: 0, xp: 5 },
                { question: "Salah satu strategi Market Leader 'Expand Share' harus berhati-hati agar...", options: ["Biaya merebut pangsa pasar tidak melebihi keuntungannya", "Tidak terlalu banyak menjual produk", "Pesaing tidak bangkrut", "Pemerintah tidak memberikan subsidi"], answer: 0, xp: 5 },
                { question: "Apa itu 'Customer-Value Marketing'?", options: ["Menempatkan sumber daya pada investasi yang membangun nilai jangka panjang bagi pelanggan", "Fokus pada promosi penjualan jangka pendek", "Menaikkan harga setinggi mungkin", "Memberikan hadiah langsung"], answer: 0, xp: 5 },
                { question: "Distributor yang membeli dari produsen dan menjual ke pengecer disebut...", options: ["Wholesaler (Grosir)", "Retailer (Pengecer)", "Agent", "Broker"], answer: 0, xp: 5 },
                { question: "Apa yang dimaksud dengan 'Entrepreneurial Marketing' (Addendum)?", options: ["Pemasaran kreatif dan berani yang dilakukan perusahaan di awal usaha", "Pemasaran formal dengan data besar", "Pemasaran khusus perusahaan bangkrut", "Pemasaran digital saja"], answer: 0, xp: 5 },
                { question: "Risiko terbesar dari 'Direct Investment' di negara asing adalah...", options: ["Gejolak politik, devaluasi mata uang, dan penyitaan aset", "Biaya kirim mahal", "Kurang kontrol", "Kualitas produk menurun"], answer: 0, xp: 5 },
                { question: "Gerakan 'Environmentalism' saat ini berfokus pada...", options: ["Environmental Sustainability (Laba + Planet)", "Menutup semua pabrik", "Melarang penggunaan teknologi", "Kembali ke zaman batu"], answer: 0, xp: 5 },
                { question: "Channel Level 3 terdiri dari...", options: ["Produsen -> Wholesaler -> Jobber -> Retailer -> Konsumen", "Produsen -> Retailer -> Konsumen", "Produsen -> Konsumen", "Produsen -> Agent -> Konsumen"], answer: 0, xp: 5 },
                { question: "Dalam analisis pesaing, 'Strong Competitors' berguna untuk...", options: ["Melajamkan kemampuan perusahaan", "Meningkatkan omzet instan", "Mengurangi biaya riset", "Memudahkan monopoli"], answer: 0, xp: 5 },
                { question: "Kelemahan utama 'Affordable Method' dalam penganggaran adalah...", options: ["Mengabaikan dampak promosi terhadap penjualan", "Terlalu boros", "Terlalu rumit dihitung", "Membutuhkan data pesaing"], answer: 0, xp: 5 },
                { question: "Praktik 'Acquisition of Competitors' oleh perusahaan besar sering dikritik karena...", options: ["Dapat mematikan persaingan dan menciptakan monopoli", "Meningkatkan efisiensi", "Menurunkan harga pasar", "Membuka lapangan kerja"], answer: 0, xp: 5 },
                { question: "Fungsi logistik 'Warehousing' modern lebih mengarah pada...", options: ["Distribution Centers (bergerak cepat/otomatis)", "Storage Warehouses (menyimpan lama)", "Gudang manual", "Penumpukan barang"], answer: 0, xp: 5 },
            ],
            rangkuman: {
                modulIntiUpdated: [
                    { title: 'Modul 1: Marketing Channels & Logistics (Updated)', contentKey: 'modul1_updated', type: 'native', driveId: '17-z0k_80y0J1BKMWj7napjgK3vlNLXuhCQOIoOqGCf8' },
                    { title: 'Modul 2: Integrated Marketing Communication (Updated)', contentKey: 'modul2_updated', type: 'native', driveId: '10nXUYo_qBmv2aJa1yyIAw8-ofMTZk7s4LV6glV7kBZQ' },
                    { title: 'Modul 3: Creating Competitive Advantage (Updated)', contentKey: 'modul3_updated', type: 'native', driveId: '1xzXIGBx95Oedfx8F3DFrG2VoBFbOcLPbDp7iQdCzaQ8' },
                    { title: 'Modul 4: The Global Marketplace (Updated)', contentKey: 'modul4_updated', type: 'native', driveId: '1CN4t3yozNdbhdx8IVvPKkstl_R4AQpp_A6zq1jzUqrk' },
                    { title: 'Modul 5: Sustainable Marketing (Updated)', contentKey: 'modul5_updated', type: 'native', driveId: '1u6nS8--Fr1ELddGt58AId0BrUgRPoH80M0HFBmLmWX0' },
                ],
                modulInti: [
                    { title: 'Modul 1: Marketing Channels & Logistics', contentKey: 'modul1', type: 'native' },
                    { title: 'Modul 2: Integrated Marketing Communication Strategy', contentKey: 'modul2', type: 'native' },
                    { title: 'Modul 3: Creating Competitive Advantage', contentKey: 'modul3', type: 'native' },
                    { title: 'Modul 4: The Global Marketplace', contentKey: 'modul4', type: 'native' },
                    { title: 'Modul 5: Sustainable Marketing', contentKey: 'modul5', type: 'native' },
                ],
                addendumUpdated: [
                    { title: 'Addendum: Materi Pelengkap & Detail Teknis (Updated)', contentKey: 'tambahan_updated', type: 'native', driveId: '131-PQf0K0YuhTqx0MD_geMSGhEW-FtZzi9QfAekit94' },
                ],
                addendum: [
                    { title: 'Addendum: Materi Pelengkap & Detail Teknis', contentKey: 'tambahan', type: 'native' },
                ],
                mentorPPT: [
                    { title: 'Rangkuman Mentor (by Kak Zarnis)', driveId: '1W2s-4M2XUsdYSkTVNc4aOqyberNikqKS', type: 'pdf' },
                ],
            },
        },
        hr: {
            materi: [
                { id: 1, title: 'Session 17-18: Establishing Strategic Pay Plans I & II', driveId: '1eg-iGY5h6VNadewjcVqkWmQYyVfVw-bUgjg6ARfm8nM', type: 'slides', xp: 10 },
                { id: 2, title: 'Session 19-20: Pay for Performance I & II', driveId: '1RD1zOr0mgI66sjCGFro-dfgOhguFVhvYqYVw-tdzA3I', type: 'slides', xp: 10 },
                { id: 3, title: 'Session 21: Safety, Health and Risk Management', driveId: '14bLMwTUKcuG0hu-LXQtL2NSDeXqgtHJCr-WSUySuWYg', type: 'slides', xp: 10 },
                { id: 4, title: 'Session 22: Labor Relations and Collective Bargain', driveId: '1ElmwxZZh2eLj_T74c73VlbotgLI-YQfsnkrdEG4DntE', type: 'slides', xp: 10 },
                { id: 5, title: 'Session 23: HR Analytics', driveId: '15jkleBjDeXK1z4P68dUZmdhqsh4Ey_biFjenZ0AJVVU', type: 'slides', xp: 10 },
                { id: 6, title: "Session 24: David Ulrich's HR Model", driveId: '1kPfIyjSEFHj5jAPtG-PyG3F1PKtOTj4NkmLDsRjCNhA', type: 'slides', xp: 10 },
                { id: 7, title: 'Session 25: Managing Global HR', driveId: '13FudOLqKTggQHxM6dPFEgvGhQx8R8KbzhqoL75jVe68', type: 'slides', xp: 10 },
                { id: 8, title: 'Session 26: Managing HR in SME', driveId: '1ZVRcU56KB3Jg5ZVHQHgwxrzDA9xXw-shv0quXTq_teQ', type: 'slides', xp: 10 },
            ],
            kisiKisi: [
                {
                    topic: 'Compensation & Benefit Program',
                    instruction: 'Teori - Pembobotan: 20%',
                    items: []
                },
                {
                    topic: 'Safety, Health & Risk Management',
                    instruction: 'Teori - Pembobotan: 20%',
                    items: []
                },
                {
                    topic: 'Labor Relation & Collective Bargaining',
                    instruction: 'Case Study - Pembobotan: 60%',
                    items: []
                }
            ],
            kisiKisiNote: 'Berdasarkan evaluasi terhadap pelaksanaan ujian sebelumnya, soal Ujian Akhir Semester (UAS) untuk mata kuliah ini diprediksi memiliki tingkat kesesuaian yang sangat tinggi (identik) dengan kisi-kisi yang telah diberikan. Mahasiswa disarankan untuk mempelajari poin-poin kisi-kisi secara mendalam karena kemungkinan besar materi tersebut akan keluar persis seperti yang tertulis.',
            flashcards: [
                // Legislasi Tambahan
                { id: 1, term: 'Age Discrimination in Employment Act (ADEA)', definition: 'Undang-undang yang melindungi pekerja dari diskriminasi berdasarkan usia (disebutkan dalam daftar legislasi pelindung hak pekerja).' },
                { id: 2, term: 'ADA (1990)', definition: 'Americans with Disabilities Act, melindungi pekerja dengan disabilitas (disebutkan dalam daftar legislasi pelindung hak pekerja).' },
                { id: 3, term: 'FMLA', definition: 'Family and Medical Leave Act, mengatur cuti medis dan keluarga (disebutkan dalam daftar legislasi pelindung hak pekerja).' },
                // Teori Vroom
                { id: 4, term: 'Komponen 1: Ekspektasi (Expectancy)', definition: 'Keyakinan bahwa usaha akan menghasilkan kinerja (Bagian dari Teori Harapan Vroom).' },
                { id: 5, term: 'Komponen 2: Instrumentalitas', definition: 'Keyakinan bahwa kinerja akan menghasilkan imbalan/reward (Bagian dari Teori Harapan Vroom).' },
                { id: 6, term: 'Komponen 3: Valensi', definition: 'Nilai yang diberikan individu terhadap imbalan tersebut (Bagian dari Teori Harapan Vroom).' },
                // Sistem Insentif
                { id: 7, term: 'Lump-sum Merit', definition: 'Opsi kenaikan gaji berbasis kinerja yang dibayarkan sekali (tidak permanen menambah gaji pokok), berbeda dengan Merit Pay standar.' },
                { id: 8, term: 'Enterprise Incentive Management (EIM)', definition: 'Sistem manajemen yang diperlukan untuk mengelola rencana insentif komisi/kombinasi yang kompleks secara efektif.' },
                // Bahaya Kantor
                { id: 9, term: 'Bahaya Kabel Listrik', definition: 'Kabel yang terkelupas atau manajemen kabel yang buruk menimbulkan risiko tersandung (trip hazard).' },
                { id: 10, term: 'Bahaya Lantai', definition: 'Lantai licin atau karpet yang tidak rata yang berpotensi menyebabkan jatuh.' },
                { id: 11, term: 'Bahaya Pencahayaan', definition: 'Pencahayaan yang buruk, terutama di tangga atau lorong yang dapat memicu kecelakaan.' },
                { id: 12, term: 'Bahaya Kimia Kantor', definition: 'Penyimpanan bahan kimia pembersih yang tidak aman.' },
                // Ergonomi
                { id: 13, term: 'Posisi Monitor yang Benar', definition: 'Monitor komputer harus sejajar dengan mata untuk mencegah gangguan leher/punggung.' },
                { id: 14, term: 'Kursi Ergonomis', definition: 'Diperlukan untuk mencegah Repetitive Motion Disorders dan masalah punggung akibat duduk lama.' },
                // Alat Bantu
                { id: 15, term: 'e-tool OSHA', definition: 'Alat bantu desain workstation yang direkomendasikan untuk solusi ergonomi komputer.' },
                // Stres Kerja
                { id: 16, term: 'Perbedaan Burnout vs Depresi', definition: 'Burnout adalah kelelahan total, sementara Depresi adalah kondisi klinis yang lebih fatal; keduanya memerlukan intervensi berbeda.' },
                // Definisi Ahli
                { id: 17, term: 'Definisi HR Analytics (Lalwani, 2021)', definition: 'Penerapan metode statistik pada data SDM, talenta, keuangan, dan operasional yang terintegrasi.' },
                { id: 18, term: 'Definisi HR Analytics (AIHR/Vulpen, 2021)', definition: 'Proses pengumpulan bersama (co-collection), analisis, dan pelaporan data HR.' },
                // Metrik Hiring
                { id: 19, term: 'Faktor Speed of Process', definition: 'Kecepatan proses rekrutmen mempengaruhi tingkat penerimaan penawaran (Offer Acceptance Rate).' },
                { id: 20, term: 'Faktor Candidate Experience', definition: 'Pengalaman kandidat selama seleksi mempengaruhi keputusan menerima penawaran.' },
                // Metrik Retensi
                { id: 21, term: 'Faktor Hubungan Atasan', definition: 'Kualitas hubungan dengan manajer adalah penentu utama retensi karyawan.' },
                { id: 22, term: 'Faktor Work-Life Balance', definition: 'Keseimbangan kerja dan kehidupan pribadi mempengaruhi keputusan karyawan untuk bertahan.' },
                // Formulir Manual
                { id: 23, term: 'Formulir New Employee Checklist', definition: 'Daftar periksa untuk memastikan semua prosedur penerimaan karyawan baru terlaksana (Item No. 2 Tabel 18.1).' },
                { id: 24, term: 'Formulir Telephone Reference Report', definition: 'Laporan hasil pengecekan referensi kandidat via telepon (Item No. 5 Tabel 18.1).' },
                { id: 25, term: 'Formulir Employee Secrecy Agreement', definition: 'Perjanjian kerahasiaan yang wajib ditandatangani karyawan baru (Item No. 9 Tabel 18.1).' },
                { id: 26, term: 'Formulir Employee Status Change Request', definition: 'Permintaan perubahan status karyawan (promosi/mutasi) untuk karyawan saat ini (Item No. 10 Tabel 18.1).' },
                { id: 27, term: 'Formulir Probation Notice', definition: 'Pemberitahuan masa percobaan bagi karyawan (Item No. 15 Tabel 18.1).' },
                { id: 28, term: 'Formulir Disciplinary Notice', definition: 'Pemberitahuan tindakan disipliner tertulis (Item No. 20 Tabel 18.1).' },
                { id: 29, term: 'Formulir Grievance Form', definition: 'Formulir resmi untuk karyawan mengajukan keluhan (Item No. 21 Tabel 18.1).' },
                { id: 30, term: 'Formulir Retirement Checklist', definition: 'Daftar periksa prosedur pensiun karyawan (Item No. 25 Tabel 18.1).' },
                { id: 31, term: 'Formulir COBRA Acknowledgment', definition: 'Pengakuan terkait asuransi kesehatan lanjutan pasca-kerja (Item No. 27 Tabel 18.1).' },
                // Vendor HRIS
                { id: 32, term: 'ADP (Automated Data Process, Inc.)', definition: 'Salah satu vendor utama perangkat lunak HRIS yang disebutkan dalam materi.' },
                { id: 33, term: 'Lawson Software', definition: 'Vendor perangkat lunak HRIS yang disebutkan dalam materi.' },
                { id: 34, term: 'Workday', definition: 'Vendor perangkat lunak HRIS berbasis cloud modern yang disebutkan dalam materi.' },
                { id: 35, term: 'Odoo', definition: 'Platform manajemen bisnis open-source yang mencakup modul HR, disebutkan dalam materi.' },
                { id: 36, term: 'SAP America, Inc.', definition: 'Vendor sistem enterprise besar yang menyediakan solusi HRIS.' },
                // Tambahan Flashcard (37-55)
                { id: 37, term: 'ERISA (Detail)', definition: 'Undang-undang yang mengatur dana pensiun, hak vesting, dan portabilitas (dijelaskan lebih dalam dari sekadar singkatan).' },
                { id: 38, term: 'Kode Input Bonus Hashmicro', definition: 'Kode yang digunakan dalam sistem untuk Yearly Bonus adalah YB.' },
                { id: 39, term: 'Alur Update Kontrak Hashmicro', definition: 'Urutan status wajib: Running -> New -> Update Struktur Gaji -> Running.' },
                { id: 40, term: 'Lump-sum Merit', definition: 'Kenaikan gaji berbasis kinerja yang dibayarkan sekali saja (tidak menaikkan gaji pokok secara permanen).' },
                { id: 41, term: 'Detail Statistik Kematian (AS)', definition: 'Angka spesifik kematian kerja per tahun: 5.190 pekerja.' },
                { id: 42, term: 'Detail Statistik Cedera (AS)', definition: 'Angka spesifik cedera/penyakit kerja per tahun: 2,9 juta kasus.' },
                { id: 43, term: 'Chance Occurrences', definition: 'Peristiwa di luar kendali manajemen (contoh: bencana alam) yang menyebabkan kecelakaan.' },
                { id: 44, term: 'Detail Right to Work', definition: 'Aturan hukum negara bagian yang melarang kewajiban keanggotaan serikat sebagai syarat kerja (ancaman bagi Union Security).' },
                { id: 45, term: 'Class Action', definition: 'Salah satu strategi serikat pekerja modern: menggunakan tuntutan hukum massal untuk menekan perusahaan.' },
                { id: 46, term: 'Sitasi Meulen & McCall (2018)', definition: 'Ahli yang merumuskan 4 Tingkat Kematangan Analitik (Descriptive s.d Prescriptive).' },
                { id: 47, term: 'Definisi Descriptive Analytics', definition: 'Tingkat dasar analitik yang hanya menjawab "Apa yang terjadi?" (What happened?).' },
                { id: 48, term: 'Wonderlic Personnel Test', definition: 'Salah satu tes seleksi sederhana yang direkomendasikan untuk bisnis kecil.' },
                { id: 49, term: 'Predictive Index', definition: 'Alat tes seleksi lain yang cocok dan efektif untuk bisnis kecil.' },
                { id: 50, term: 'Simple IRA', definition: 'Program pensiun yang murah, mudah, dan sederhana, sering digunakan sebagai daya tarik bisnis kecil.' },
                { id: 51, term: 'Hardship Allowance', definition: 'Tunjangan khusus bagi ekspatriat yang ditempatkan di lokasi dengan kondisi hidup sulit/berbahaya.' },
                { id: 52, term: 'Foreign Service Premium', definition: 'Insentif finansial tambahan sekadar karena bersedia bekerja di luar negeri.' },
                { id: 53, term: 'Mobility Premiums', definition: 'Pembayaran sekaligus (lump-sum) untuk menghargai perpindahan tempat tinggal.' },
                { id: 54, term: 'Odoo', definition: 'Salah satu vendor HRIS yang disebutkan dalam materi (Open source solution).' },
                { id: 55, term: 'SAP America', definition: 'Vendor sistem enterprise besar untuk HRIS yang terdaftar di materi.' },
            ],
            essayExam: [{ question: 'Rancang program onboarding untuk Gen Z!', modelAnswer: 'Pre-boarding digital, buddy system, training, project assignment.', rubric: { teori: 30, konteks: 40, argumentasi: 30 } }],
            quiz: [
                // Modul 1: Kompensasi (1-12)
                { question: "Apa definisi dari 'Aligned Reward Strategy' dalam manajemen kompensasi?", options: ['Strategi membayar gaji terendah untuk menghemat biaya', 'Paket kompensasi yang menghasilkan perilaku karyawan untuk mencapai strategi kompetitif', 'Sistem pembayaran yang hanya berdasarkan pada durasi kerja', 'Strategi menyamakan gaji semua level karyawan demi keadilan'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                { question: 'Apa dua komponen utama dalam kompensasi karyawan?', options: ['Gaji Pokok dan Tunjangan Makan', 'Pembayaran Finansial Langsung dan Pembayaran Finansial Tidak Langsung', 'Insentif Jangka Pendek dan Insentif Jangka Panjang', 'Upah Minimum dan Upah Lembur'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                { question: "Menurut Teori Keadilan (Equity Theory), 'Keadilan Eksternal' merujuk pada apa?", options: ['Membandingkan gaji antar jabatan di dalam perusahaan', 'Membandingkan gaji dengan perusahaan lain di pasar', 'Membandingkan gaji antar individu dengan jabatan yang sama', 'Keadilan dalam proses alokasi gaji'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                { question: "Dalam konteks FLSA (1938), apa yang dimaksud dengan karyawan 'Exempt'?", options: ['Karyawan yang dikecualikan dari aturan lembur (biasanya manajer/profesional)', 'Karyawan yang berhak mendapatkan uang lembur', 'Karyawan paruh waktu', 'Karyawan magang'], answer: 0, xp: 5, category: "Modul 1: Kompensasi" },
                { question: 'Undang-undang mana yang menetapkan upah minimum dan lembur untuk kontrak pemerintah?', options: ['Davis-Bacon Act (1931)', 'Walsh-Healey Public Contract Act (1936)', 'Equal Pay Act (1963)', 'ERISA (1974)'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                { question: 'Apa elemen dasar pekerjaan seperti keterampilan, usaha, dan tanggung jawab dalam Evaluasi Jabatan disebut?', options: ['Key Performance Indicators', 'Job Specifications', 'Compensable Factors', 'Job Descriptions'], answer: 2, xp: 5, category: "Modul 1: Kompensasi" },
                { question: 'Metode evaluasi jabatan yang paling sederhana dengan memeringkat jabatan dari terendah ke tertinggi adalah?', options: ['Metode Poin', 'Metode Klasifikasi', 'Metode Pemeringkatan (Ranking Method)', 'Factor Comparison'], answer: 2, xp: 5, category: "Modul 1: Kompensasi" },
                { question: "Apa langkah keempat dalam membangun 'Market-Competitive Pay Plan'?", options: ['Pilih Jabatan Benchmark', 'Analisis Pasar (Survei Gaji)', 'Tetapkan Rentang Tarif', 'Koreksi Tarif di Luar Garis'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                { question: "'County of Washington v. Gunther' menetapkan prinsip hukum terkait apa?", options: ['Keselamatan Kerja', 'Hak Berserikat', 'Comparable Worth (Nilai Sebanding)', 'Pensiun Dini'], answer: 2, xp: 5, category: "Modul 1: Kompensasi" },
                { question: 'Menurut Teori Motivasi Herzberg, gaji dianggap sebagai faktor apa?', options: ['Motivator', 'Higienis (Mencegah ketidakpuasan)', 'Intrinsik', 'Afektif'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                { question: "Dalam Teori Harapan Vroom, keyakinan bahwa 'kinerja akan menghasilkan imbalan' disebut?", options: ['Ekspektasi', 'Instrumentalitas', 'Valensi', 'Reinforcement'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                { question: 'Jenis insentif tim yang membagikan hasil dari penghematan biaya produksi disebut?', options: ['Profit-sharing plans', 'ESOPs', 'Scanlon plans', 'Commission plans'], answer: 2, xp: 5, category: "Modul 1: Kompensasi" },
                // Modul 1: Teknis Hashmicro (13)
                { question: "Pada software Hashmicro, apa yang wajib diisi pada tab 'Accounting' saat membuat Salary Rules?", options: ['Nama Karyawan', 'Debit Account dan Credit Account', 'Nomor Rekening Bank', 'Tanggal Lahir'], answer: 1, xp: 5, category: "Modul 1: Kompensasi" },
                // Modul 1: Legislasi Tambahan (14)
                { question: 'Undang-undang yang melindungi pekerja dari diskriminasi berdasarkan usia adalah?', options: ['ADA', 'FMLA', 'ADEA (Age Discrimination in Employment Act)', 'ERISA'], answer: 2, xp: 5, category: "Modul 1: Kompensasi" },
                // Modul 2: K3 & Risiko (15-18)
                { question: "Apa yang dimaksud dengan 'Unsafe Conditions'?", options: ['Perilaku ceroboh karyawan', 'Bencana alam tak terduga', 'Penyebab fisik/lingkungan seperti peralatan rusak atau ventilasi buruk', 'Tekanan mental dari atasan'], answer: 2, xp: 5, category: "Modul 2: K3 & Keselamatan" },
                { question: "Apa 'garis pertahanan pertama' (first line of defense) pemberi kerja dalam mencegah kecelakaan?", options: ['Mengurangi Kondisi Tidak Aman', 'Mengurangi Tindakan Tidak Aman', 'Melakukan Pelatihan K3', 'Menyediakan Klinik Kesehatan'], answer: 0, xp: 5, category: "Modul 2: K3 & Keselamatan" },
                { question: "Apa tujuan utama dari 'Job Hazard Analysis'?", options: ['Menghitung biaya asuransi', 'Mengidentifikasi bahaya di tiap langkah kerja spesifik', 'Menilai kinerja karyawan', 'Menentukan gaji pokok'], answer: 1, xp: 5, category: "Modul 2: K3 & Keselamatan" },
                // Modul 2: Detail Teknis (18-19)
                { question: 'Terkait ergonomi komputer, di mana posisi monitor yang benar?', options: ['Di atas tingkat mata', 'Sejajar dengan mata', 'Di bawah dagu', 'Di samping kiri meja'], answer: 1, xp: 5, category: "Modul 2: K3 & Keselamatan" },
                { question: 'Apa prinsip utama keamanan siber terkait data lama?', options: ['Data lama harus diarsipkan selamanya', 'Old data is bad data (Data lama adalah risiko dan harus dibersihkan)', 'Data lama tidak perlu diamankan', 'Data lama lebih aman dari data baru'], answer: 1, xp: 5, category: "Modul 2: K3 & Keselamatan" },
                // Modul 2: K3 Indonesia (20)
                { question: 'Peraturan Pemerintah (PP) No. 50 Tahun 2012 mengatur tentang apa?', options: ['Upah Minimum Provinsi', 'Penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3)', 'Jaminan Hari Tua', 'Serikat Pekerja'], answer: 1, xp: 5, category: "Modul 2: K3 & Keselamatan" },
                // Modul 2: Detail Teknis (21)
                { question: "Apa perbedaan utama antara 'Burnout' dan 'Depresi'?", options: ['Burnout adalah masalah fisik, Depresi masalah mental', 'Burnout adalah kelelahan total, Depresi adalah kondisi klinis yang lebih fatal', 'Burnout hanya dialami manajer, Depresi dialami staf', 'Tidak ada perbedaan, keduanya sama'], answer: 1, xp: 5, category: "Modul 2: K3 & Keselamatan" },
                // Modul 3: Hubungan Kerja (22-25)
                { question: "Kontrak 'Yellow Dog' yang dinyatakan tidak berlaku oleh Norris-LaGuardia Act berisi janji apa?", options: ['Janji pengusaha menaikkan gaji', 'Janji pekerja untuk tidak bergabung dengan serikat pekerja', 'Janji serikat untuk tidak mogok', 'Janji pekerja untuk bekerja lembur'], answer: 1, xp: 5, category: "Modul 3: Hubungan Kerja" },
                { question: 'Manakah yang merupakan praktik tidak adil pengusaha menurut Wagner Act?', options: ['Mendominasi atau mencampuri pembentukan serikat', 'Melakukan featherbedding', 'Memaksa karyawan mogok', 'Menolak membayar iuran serikat'], answer: 0, xp: 5, category: "Modul 3: Hubungan Kerja" },
                { question: 'Apa istilah untuk praktik serikat pekerja meminta bayaran untuk pekerjaan yang tidak dilakukan?', options: ['Lockout', 'Boycott', 'Featherbedding', 'Wildcat Strike'], answer: 2, xp: 5, category: "Modul 3: Hubungan Kerja" },
                { question: 'Jika negosiasi buntu, pihak ketiga yang bisa membuat keputusan MENGIKAT (binding) disebut?', options: ['Mediator', 'Fact-finder', 'Arbitrator', 'Konsultan'], answer: 2, xp: 5, category: "Modul 3: Hubungan Kerja" },
                // Modul 4: Transformasi HR (26-27)
                { question: "Menurut David Ulrich, peran HR yang bertugas sebagai 'mitra strategis' adalah?", options: ['Administrative Expert', 'Change Agent', 'Employee Advocate', 'HR Business Partner (Strategic Partner)'], answer: 3, xp: 5, category: "Modul 4: HR Analytics" },
                { question: "Apa fokus utama peran 'Change Agent' dalam model Ulrich?", options: ['Mengelola administrasi penggajian', 'Mengelola transformasi dan budaya organisasi', 'Menangani keluhan individu karyawan', 'Menyusun kontrak kerja'], answer: 1, xp: 5, category: "Modul 4: HR Analytics" },
                // Modul 4: HR Analytics (28-30)
                { question: "Tahap kematangan analitik yang menjawab pertanyaan 'Mengapa itu terjadi?' (Why did it happen?) adalah?", options: ['Descriptive Analytics', 'Diagnostic Analytics', 'Predictive Analytics', 'Prescriptive Analytics'], answer: 1, xp: 5, category: "Modul 4: HR Analytics" },
                { question: "Apa rumus yang tepat untuk menghitung 'Retention Rate'?", options: ['(Jumlah Karyawan Baru / Total Karyawan) x 100%', '(Jumlah Karyawan Akhir Periode / Jumlah Karyawan Awal Periode [tanpa rekrutmen baru]) x 100%', '(Jumlah Karyawan Keluar / Total Karyawan Awal) x 100%', '(Total Gaji / Jumlah Karyawan) x 100%'], answer: 1, xp: 5, category: "Modul 4: HR Analytics" },
                { question: 'Menurut West (2019), HR Analytics adalah pertemuan dari disiplin ilmu apa saja?', options: ['Ekonomi, Hukum, dan Sosiologi', 'Statistik, Ilmu Perilaku, Teknologi, dan Strategi', 'Akuntansi, Manajemen, dan Psikologi', 'Pemasaran, Operasional, dan Keuangan'], answer: 1, xp: 5, category: "Modul 4: HR Analytics" },
                // Modul 5: Global HR (31-34)
                { question: 'Strategi penyusunan staf global di mana posisi kunci diisi oleh warga negara asal (expatriates) disebut?', options: ['Polycentric', 'Geocentric', 'Ethnocentric', 'Regiocentric'], answer: 2, xp: 5, category: "Modul 5: Global HR" },
                { question: "Salah satu dimensi budaya Hofstede adalah 'Power Distance'. Apa artinya?", options: ['Tingkat kenyamanan terhadap risiko', 'Penerimaan terhadap distribusi kekuasaan yang tidak setara', 'Fokus pada kepentingan individu vs kelompok', 'Orientasi jangka panjang vs tradisi'], answer: 1, xp: 5, category: "Modul 5: Global HR" },
                { question: 'Apa pendekatan kompensasi yang umum digunakan untuk ekspatriat agar daya belinya setara dengan di negara asal?', options: ['Metode Lokalisasi', 'Metode Lump-sum', 'Metode Neraca (Balance Sheet Approach)', 'Metode Negosiasi'], answer: 2, xp: 5, category: "Modul 5: Global HR" },
                // Modul 5: SME HR (34)
                { question: 'Apa itu PEO (Professional Employer Organization)?', options: ['Organisasi serikat pekerja internasional', "Vendor outsourcing yang menjadi 'co-employers' menangani administrasi HR/pajak", 'Badan pemerintah untuk UKM', 'Software rekrutmen gratis'], answer: 1, xp: 5, category: "Modul 5: Global HR" },
                // Modul 5: SME HR - Formulir (35-37)
                { question: "Formulir 'Telephone Reference Report' digunakan pada tahap apa?", options: ['Saat karyawan akan pensiun', 'Saat mengevaluasi kinerja tahunan', 'Saat memeriksa referensi kandidat karyawan baru', 'Saat mengajukan klaim asuransi'], answer: 2, xp: 5, category: "Modul 5: Global HR" },
                { question: 'Formulir apa yang wajib ditandatangani karyawan baru untuk menjaga rahasia perusahaan?', options: ['Grievance Form', 'COBRA Acknowledgment', 'Employee Secrecy Agreement', 'Probation Notice'], answer: 2, xp: 5, category: "Modul 5: Global HR" },
                { question: "'Grievance Form' berfungsi untuk?", options: ['Mengajukan cuti liburan', 'Melaporkan pengeluaran dinas', 'Mengajukan keluhan resmi karyawan', 'Mencatat kehadiran harian'], answer: 2, xp: 5, category: "Modul 5: Global HR" },
                // Modul 5: SME HR - Vendor (38)
                { question: 'Manakah di bawah ini yang merupakan vendor perangkat lunak HRIS yang disebutkan dalam materi?', options: ['Adobe Photoshop', 'Workday', 'AutoCAD', 'CorelDraw'], answer: 1, xp: 5, category: "Modul 5: Global HR" },
                // Modul 1: Kompensasi (39)
                { question: "Metode insentif 'Piecework' jenis 'Straight Piecework' artinya?", options: ['Membayar tarif tetap per unit yang dihasilkan', 'Membayar berdasarkan jam kerja standar', 'Membayar bonus tahunan', 'Membayar komisi penjualan'], answer: 0, xp: 5, category: "Modul 5: Global HR" },
                // Modul 5: Global HR (40)
                { question: 'Masalah utama dalam repatriasi (kepulangan) ekspatriat adalah?', options: ['Biaya tiket pesawat terlalu mahal', 'Investasi sia-sia karena ekspatriat sering keluar setelah kembali (turnover)', 'Ekspatriat lupa bahasa negara asal', 'Visa kerja kadaluarsa'], answer: 1, xp: 5, category: "Modul 5: Global HR" },
                // Tambahan Quiz (41-60)
                { question: 'Undang-undang ERISA (1974) secara spesifik mengatur tentang apa?', options: ['Upah Minimum dan Lembur', 'Diskriminasi Gender', 'Dana Pensiun, Hak Vesting, dan Portabilitas', 'Keselamatan Kerja di Pabrik'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: "Apa perbedaan utama 'Lump-sum Merit' dengan kenaikan gaji merit biasa?", options: ['Lump-sum dibayarkan setiap bulan', 'Lump-sum hanya untuk eksekutif', 'Lump-sum dibayarkan sekali dan tidak menaikkan gaji pokok permanen', 'Lump-sum berupa saham bukan uang tunai'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: "Dalam panduan Hashmicro, apa kode input yang digunakan untuk 'Yearly Bonus'?", options: ['BON', 'YB', 'ANB', 'THR'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Bagaimana urutan status kontrak yang benar saat melakukan update struktur gaji di Hashmicro?', options: ['Draft -> Running -> Done', 'Running -> Cancelled -> New', 'Running -> New -> Update Struktur -> Running', 'New -> Running -> Expired'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: 'Berdasarkan statistik AS dalam materi, berapa jumlah kematian pekerja per tahun?', options: ['1.000 pekerja', '5.190 pekerja', '10.500 pekerja', '250 pekerja'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Peristiwa di luar kendali manajemen seperti bencana alam dikategorikan sebagai?', options: ['Unsafe Acts', 'Unsafe Conditions', 'Chance Occurrences', 'Human Error'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: "Apa itu aturan 'Right to Work' yang sering menjadi tantangan bagi serikat pekerja?", options: ['Hak untuk mogok kerja kapan saja', 'Larangan kewajiban keanggotaan serikat sebagai syarat kerja', 'Kewajiban perusahaan menyediakan ruang serikat', 'Hak pekerja mendapatkan pesangon'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Selain mengorganisasi agresif dan menekan Kongres, apa strategi modern serikat pekerja?', options: ['Menggunakan kekerasan fisik', 'Menggunakan tuntutan hukum Class Action', 'Membeli saham mayoritas perusahaan', 'Menutup pabrik secara paksa'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Siapa ahli yang merumuskan 4 Tingkat Kematangan Analitik (Descriptive hingga Prescriptive)?', options: ['David Ulrich', 'Meulen & McCall (2018)', 'Frederick Taylor', 'Geert Hofstede'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: "Apa fokus dari 'Descriptive Analytics'?", options: ["Menjawab 'Apa yang akan terjadi?'", "Menjawab 'Mengapa itu terjadi?'", "Menjawab 'Apa yang terjadi?' (What happened?)", 'Memberikan solusi otomatis'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: 'Manakah di bawah ini yang merupakan tes seleksi personel sederhana yang direkomendasikan untuk bisnis kecil?', options: ['GMAT', 'Wonderlic Personnel Test', 'TOEFL', 'Rorschach Test'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Selain Wonderlic, tes apa yang disebut efektif untuk seleksi di bisnis kecil?', options: ['Predictive Index', 'IQ Test Lengkap', 'Tes Kesehatan MRI', 'Tes DNA'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: 'Apa nama program pensiun yang murah dan sederhana yang sering digunakan bisnis kecil?', options: ['Complex 401(k)', 'Defined Benefit Plan', 'Simple IRA', 'State Pension'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: 'Tunjangan yang diberikan kepada ekspatriat karena ditempatkan di lokasi yang sulit atau berbahaya disebut?', options: ['Mobility Premium', 'Hardship Allowance', 'Performance Bonus', 'Travel Grant'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: "Apa definisi 'Foreign Service Premium'?", options: ['Gaji pokok mata uang asing', 'Insentif finansial tambahan karena bersedia bekerja di luar negeri', 'Biaya sekolah anak ekspatriat', 'Asuransi kesehatan internasional'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Pembayaran lump-sum untuk menghargai perpindahan tempat tinggal ekspatriat disebut?', options: ['Mobility Premiums', 'Severance Pay', 'Commission', 'Overtime Pay'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: 'Selain Workday dan Oracle, manakah yang termasuk vendor HRIS utama dalam materi?', options: ['SAP America', 'Microsoft Word', 'Canva', 'Zoom'], answer: 0, xp: 5 },
                { question: 'Platform manajemen bisnis open-source yang mencakup modul HR dan disebut dalam materi adalah?', options: ['Linux HR', 'Odoo', 'Android', 'Mozilla'], answer: 1, xp: 5 },
                { question: 'Siapa pencetus gerakan Manajemen Ilmiah yang menjadi akar sistem pembayaran berbasis kinerja?', options: ['Frederick Taylor', 'Henri Fayol', 'Max Weber', 'Elton Mayo'], answer: 0, xp: 5 },
                { question: "Apa pendekatan 'Polycentric' dalam penyusunan staf global?", options: ['Posisi kunci di luar negeri diisi oleh penduduk setempat (Locals)', 'Posisi kunci diisi oleh warga negara asal', 'Mencari orang terbaik tanpa melihat negara', 'Memindahkan pabrik ke negara berkembang'], answer: 0, xp: 5 },
            ],
            rangkuman: {
                modulIntiUpdated: [
                    { title: 'Modul 1: Manajemen Kompensasi Strategis & Sistem Insentif', contentKey: 'modul1_updated', type: 'native', driveId: '1bSa6d-ka4fP68h0VXYx0aYtxUImPQAVwMf1jwIjlEH0' },
                    { title: 'Modul 2: Manajemen Keselamatan, Kesehatan, dan Risiko Kerja', contentKey: 'modul2_updated', type: 'native', driveId: '1VkAxW46apLIgDxRWI8WQswfpbumtZWsf1EVNo93_Uts' },
                    { title: 'Modul 3: Hubungan Tenaga Kerja dan Perundingan Kolektif', contentKey: 'modul3_updated', type: 'native', driveId: '1o1-gUJ8dwmKlYJ5IDXmq-2q2RAMR7GPoNyT1EU4uzt4' },
                    { title: 'Modul 4: Transformasi Infrastruktur HR (Model Ulrich & HR Analytics)', contentKey: 'modul4_updated', type: 'native', driveId: '1LAvY83j_6MT5eQ4IzRmujKVA50ZA1d7yKIzmmRMZM_M' },
                    { title: 'Modul 5: Manajemen SDM Global & Bisnis Kecil (SME)', contentKey: 'modul5_updated', type: 'native', driveId: '122yziPxTCSyEFo_i7QoncCdKBmq0V1vcuKb_m7pLJWg' },
                ],
                modulInti: [
                    { title: 'Modul 1: Manajemen Kompensasi Strategis & Sistem Insentif', contentKey: 'modul1', type: 'native' },
                    { title: 'Modul 2: Manajemen Keselamatan, Kesehatan, dan Risiko Kerja', contentKey: 'modul2', type: 'native' },
                    { title: 'Modul 3: Hubungan Tenaga Kerja dan Perundingan Kolektif', contentKey: 'modul3', type: 'native' },
                    { title: 'Modul 4: Transformasi Infrastruktur HR (Model Ulrich & HR Analytics)', contentKey: 'modul4', type: 'native' },
                    { title: 'Modul 5: Manajemen SDM Global & Bisnis Kecil (SME)', contentKey: 'modul5', type: 'native' },
                ],
                addendumUpdated: [
                    { title: 'Addendum: Detail Mikro & Teknis Pelengkap (Case Study Cheat Sheet)', contentKey: 'tambahan_updated', type: 'native', driveId: '1eSR8D_BF242xt0XO917fIJYYncoUdEo70FTWOHOX1hI' },
                ],
                addendum: [
                    { title: 'Addendum: Detail Mikro & Teknis Pelengkap (Modul 1-5)', contentKey: 'tambahan', type: 'native' },
                ],
                mentorPPT: [],
                mentorPPTNote: '⚠️ Rangkuman Mentor tidak tersedia untuk mata kuliah Human Resources Management.',
            },
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
                        'Soal No. 2: Knowledge Management (Managing Knowledge and Artificial Intelligence) — Sesi 9',
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
                    { title: 'Rangkuman Mentor (by Kak Zarnis)', driveId: '1BVqxMm333yl6p2TahXa-Tdu87RVQz1Wq', type: 'pdf' },
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
                { question: "Dalam konteks manajemen, apa perbedaan mendasar antara 'Pemimpin' (Leader) dan 'Kepemimpinan' (Leadership)?", options: ['Pemimpin adalah prosesnya, Kepemimpinan adalah orangnya', 'Pemimpin adalah individu dengan otoritas, Kepemimpinan adalah proses memengaruhi orang lain', 'Pemimpin selalu manajer formal, Kepemimpinan adalah sifat bawaan', 'Tidak ada perbedaan, keduanya sama'], answer: 1, xp: 5, category: "Modul 1: Leadership" },
                { question: "Mengapa 'Teori Sifat' (Trait Theories) pada era 1920-an dianggap kurang valid dalam menentukan kesuksesan pemimpin?", options: ['Karena terlalu fokus pada perilaku daripada fisik', 'Karena tidak ditemukan satu set sifat universal yang menjamin seseorang menjadi pemimpin sukses', 'Karena mengabaikan faktor inteligensi', 'Karena hanya berlaku untuk pemimpin militer'], answer: 1, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Studi University of Iowa mengidentifikasi tiga gaya kepemimpinan. Gaya manakah yang memberikan kebebasan total kepada kelompok untuk membuat keputusan?', options: ['Gaya Autokratis', 'Gaya Demokratis', 'Gaya Laissez-faire', 'Gaya Transformasional'], answer: 2, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Dalam studi Ohio State & Michigan, perilaku pemimpin yang fokus pada pencapaian target, pengorganisasian kerja, dan definisi peran disebut?', options: ['Orientasi Hubungan (Consideration)', 'Orientasi Tugas (Initiating Structure)', 'Orientasi Karyawan', 'Orientasi Kepercayaan'], answer: 1, xp: 5, category: "Modul 1: Leadership" },
                { question: "Menurut Situational Leadership Theory (Hersey & Blanchard), gaya 'Telling' paling cocok diterapkan pada kondisi pengikut yang...", options: ['R1: Tidak Mampu & Tidak Mau', 'R2: Tidak Mampu tapi Mau', 'R3: Mampu tapi Tidak Mau', 'R4: Mampu & Mau'], answer: 0, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Jika karyawan memiliki kompetensi tinggi (Mampu) tetapi sedang kehilangan motivasi atau ragu (Tidak Mau), gaya kepemimpinan apa yang harus digunakan (R3)?', options: ['Telling (Instruksi)', 'Selling (Jual ide)', 'Participating (Partisipasi)', 'Delegating (Pendelegasian)'], answer: 2, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Kondisi ideal R4 (Mampu & Mau) membutuhkan gaya kepemimpinan...', options: ['Telling', 'Selling', 'Participating', 'Delegating'], answer: 3, xp: 5, category: "Modul 1: Leadership" },
                { question: "Apa inti dari 'Path-Goal Theory'?", options: ['Pemimpin harus lahir dengan bakat tertentu', 'Pemimpin bertugas membantu pengikut mencapai tujuan dengan membersihkan hambatan', 'Pemimpin harus membagi tim menjadi In-Group dan Out-Group', 'Pemimpin harus memiliki kekuasaan koersif'], answer: 1, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Menurut teori LMX (Leader-Member Exchange), bawahan yang mendapatkan kepercayaan lebih, tugas istimewa, dan perhatian lebih disebut?', options: ['Out-Group', 'In-Group', 'Core Team', 'High Performers'], answer: 1, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Seorang pemimpin ditaati karena ia memiliki kemampuan untuk memecat atau menunda promosi bawahan. Ini adalah contoh kekuasaan...', options: ['Legitimate Power', 'Reward Power', 'Coercive Power', 'Expert Power'], answer: 2, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Kekuasaan yang muncul karena orang lain mengagumi kepribadian atau ingin meniru pemimpin (karisma) disebut?', options: ['Expert Power', 'Referent Power', 'Legitimate Power', 'Reward Power'], answer: 1, xp: 5, category: "Modul 1: Leadership" },
                { question: 'Manakah yang BUKAN merupakan salah satu dari 5 dimensi Kepercayaan (Trust)?', options: ['Integritas', 'Kompetensi', 'Popularitas', 'Loyalitas'], answer: 2, xp: 5, category: "Modul 1: Leadership" },
                // ===== CONTROLLING (13-22) =====
                { question: 'Apa definisi dari proses Pengendalian (Controlling)?', options: ['Proses merekrut karyawan baru', 'Proses memantau, membandingkan, dan memperbaiki kinerja', 'Proses menyusun visi dan misi', 'Proses memotivasi karyawan'], answer: 1, xp: 5, category: "Modul 2: Controlling" },
                { question: "Salah satu alasan pentingnya controlling adalah 'Protecting the Workplace'. Apa artinya?", options: ['Melindungi aset dari pencurian, pemborosan, dan menjamin keselamatan kerja', 'Memastikan manajer tidak dipecat', 'Menjaga rahasia perusahaan dari kompetitor', 'Mencegah karyawan resign'], answer: 0, xp: 5, category: "Modul 2: Controlling" },
                { question: 'Urutan 3 langkah proses pengendalian yang benar adalah:', options: ['Comparing -> Measuring -> Action', 'Action -> Measuring -> Comparing', 'Measuring -> Comparing -> Taking Managerial Action', 'Measuring -> Action -> Comparing'], answer: 2, xp: 5, category: "Modul 2: Controlling" },
                { question: 'Jika kinerja aktual jauh di bawah standar, namun setelah diselidiki ternyata targetnya yang tidak realistis (terlalu tinggi), tindakan apa yang harus diambil?', options: ['Do Nothing', 'Immediate Corrective Action', 'Basic Corrective Action', 'Revise Standard'], answer: 3, xp: 5, category: "Modul 2: Controlling" },
                { question: 'Tindakan perbaikan yang menelusuri akar penyebab masalah agar tidak terulang kembali disebut?', options: ['Basic Corrective Action', 'Immediate Corrective Action', 'Disciplinary Action', 'Preventive Action'], answer: 0, xp: 5, category: "Modul 2: Controlling" },
                { question: 'Rasio keuangan yang mengukur kemampuan perusahaan membayar utang jangka pendek (seperti Current Ratio) disebut?', options: ['Rasio Profitabilitas', 'Rasio Leverage', 'Rasio Aktivitas', 'Rasio Likuiditas'], answer: 3, xp: 5, category: "Modul 2: Controlling" },
                { question: "Dalam Balanced Scorecard, perspektif yang melihat 'pandangan pemegang saham' adalah?", options: ['Perspektif Pelanggan', 'Perspektif Keuangan', 'Perspektif Proses Internal', 'Perspektif Pembelajaran & Pertumbuhan'], answer: 1, xp: 5, category: "Modul 2: Controlling" },
                { question: 'Proses mencari praktik terbaik (best practices) dari pesaing atau non-pesaing untuk ditiru disebut?', options: ['Outsourcing', 'Offshoring', 'Benchmarking', 'Brainstorming'], answer: 2, xp: 5, category: "Modul 2: Controlling" },
                { question: "Masalah disiplin karyawan berupa 'bermain saham/judi di kantor' atau 'gagal mencapai target' masuk dalam kategori?", options: ['Attendance (Kehadiran)', 'Dishonesty (Ketidakjujuran)', 'Outside Activities', 'On-the-Job Behaviors'], answer: 3, xp: 5, category: "Modul 2: Controlling" },
                { question: "Mengambil properti perusahaan atau melakukan 'pencurian waktu' (main sosmed saat kerja) termasuk isu?", options: ['Workplace Privacy', 'Employee Theft', 'Workplace Violence', 'Corporate Espionage'], answer: 1, xp: 5, category: "Modul 2: Controlling" },
                // ===== ENTREPRENEURSHIP (23-34) =====
                { question: 'Apa perbedaan mindset utama antara Small Business dan Entrepreneurship?', options: ['Small Business cari untung, Entrepreneur cari rugi', 'Small Business cari stabilitas & hindari risiko; Entrepreneur cari pertumbuhan (growth) & kelola risiko', 'Small Business modal besar, Entrepreneur modal kecil', 'Tidak ada perbedaan'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Apa nama badan usaha yang dimiliki satu orang dan memiliki risiko Unlimited Liability (harta pribadi bisa disita)?', options: ['Corporation', 'Partnership', 'Sole Proprietorship', 'LLC'], answer: 2, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Keuntungan utama dari bentuk Corporation (PT) adalah?', options: ['Biaya pendirian murah', 'Pajak tunggal', 'Limited Liability (Tanggung jawab terbatas)', 'Mudah dibubarkan'], answer: 2, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Kelemahan utama Corporation adalah terkena pajak atas laba perusahaan DAN pajak atas dividen pemegang saham. Istilah ini disebut?', options: ['Tax Amnesty', 'Double Taxation', 'Unlimited Liability', 'Fiscal Risk'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Dalam manajemen risiko, tipe orang yang melihat ketidakpastian sebagai peluang keuntungan disebut?', options: ['Risk Avoider', 'Risk Seeker', 'Risk Manager', 'Risk Controller'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Post-it Note ditemukan karena kegagalan membuat lem kuat. Menurut Peter Drucker, ini sumber peluang dari?', options: ['The Incongruous', 'The Unexpected', 'Demographics', 'New Knowledge'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Sumber peluang bisnis yang berasal dari perubahan struktur penduduk (misal: populasi menua) disebut?', options: ['Demographics', 'Changes in Perception', 'The Incongruous', 'Process Need'], answer: 0, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: "Strategi politik kantor: Mengapa disarankan untuk 'Support Your Boss'?", options: ['Agar bisa menjilat atasan', 'Karena kesuksesan atasan biasanya akan mengangkat kesuksesan tim/bawahan juga', 'Agar atasan tidak marah', 'Supaya gaji cepat naik'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Menurut Teori Herzberg, Gaji dan Kondisi Kerja termasuk dalam faktor?', options: ['Faktor Motivator', 'Faktor Higiene', 'Faktor Intrinsik', 'Faktor Aktualisasi'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Dalam Teori Herzberg, jika Faktor Higiene terpenuhi dengan baik, apa dampaknya pada karyawan?', options: ['Sangat termotivasi', 'Netral (tidak kecewa, tapi belum tentu semangat)', 'Kecewa berat', 'Ingin resign'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: 'Teori Motivasi yang menyatakan karyawan membandingkan rasio Input/Output dirinya dengan orang lain adalah?', options: ['Expectancy Theory', 'Goal Setting Theory', 'Equity Theory', 'Reinforcement Theory'], answer: 2, xp: 5, category: "Modul 3: Entrepreneurship" },
                { question: "Dalam Teori Harapan (Expectancy), keyakinan bahwa 'Jika saya mencapai target, saya PASTI dapat bonus' disebut?", options: ['Expectancy', 'Instrumentality', 'Valence', 'Performance'], answer: 1, xp: 5, category: "Modul 3: Entrepreneurship" },
                // ===== STRATEGY (35-46) =====
                { question: 'Memindahkan aktivitas non-inti (seperti cleaning service) ke pihak ketiga disebut?', options: ['Offshoring', 'Outsourcing', 'Insourcing', 'Downsizing'], answer: 1, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Memindahkan lokasi operasional/pabrik ke negara lain untuk menekan biaya disebut?', options: ['Outsourcing', 'Offshoring', 'Exporting', 'Licensing'], answer: 1, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Starbucks mengontrol kualitas kopi dari petani hingga barista. Ini adalah penerapan?', options: ['Value Chain Management', 'Supply Chain Management', 'Just in Time', 'Six Sigma'], answer: 0, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Langkah pertama dalam Proses Manajemen Strategis adalah?', options: ['Analisis SWOT', 'Identifikasi Misi, Tujuan, dan Strategi saat ini', 'Implementasi Strategi', 'Merumuskan Strategi'], answer: 1, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Analisis SWOT adalah gabungan dari?', options: ['Analisis Internal (Strength, Weakness) & Eksternal (Opportunity, Threat)', 'Analisis Keuangan & Pemasaran', 'Analisis Pesaing & Pelanggan', 'Analisis Global & Lokal'], answer: 0, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Sesuatu yang membedakan organisasi dari pesaingnya (bisa berupa kualitas, biaya, atau teknologi) disebut?', options: ['Core Competencies', 'Competitive Advantage', 'Strategic Goal', 'Business Model'], answer: 1, xp: 5, category: "Modul 4: Strategy" },
                { question: "Konsep 'Economic Moat' (Parit Ekonomi) bertujuan untuk?", options: ['Menyerang kompetitor secara agresif', 'Mempertahankan keunggulan kompetitif (Sustaining Advantage) dari serangan pesaing', 'Mencari investor baru', 'Menutup perusahaan'], answer: 1, xp: 5, category: "Modul 4: Strategy" },
                { question: "Apa risiko utama menjadi 'First Mover'?", options: ['Kehilangan pasar', 'Biaya riset mahal dan risiko produk gagal tinggi', 'Tidak bisa menetapkan harga tinggi', 'Tidak ada risiko'], answer: 1, xp: 5, category: "Modul 4: Strategy" },
                { question: "Dalam Porter's Five Forces, ancaman dari produk beda jenis yang memiliki fungsi sama (misal: Kopi vs Teh) disebut?", options: ['Threat of New Entrants', 'Current Rivalry', 'Threat of Substitutes', 'Bargaining Power of Buyers'], answer: 2, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Jika pemasok bahan baku hanya ada satu (monopoli), maka kekuatan apa yang tinggi menurut Porter?', options: ['Bargaining Power of Suppliers', 'Bargaining Power of Buyers', 'Threat of New Entrants', 'Current Rivalry'], answer: 0, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Bagian Business Plan yang berisi Visi, Misi, dan Sejarah perusahaan adalah?', options: ['Executive Summary', 'Company Description', 'Industry Analysis', 'Marketing Strategy'], answer: 1, xp: 5, category: "Modul 4: Strategy" },
                { question: 'Bagian Business Plan yang ditulis paling terakhir tapi ditaruh paling depan adalah?', options: ['Financial Plan', 'Marketing Strategy', 'Executive Summary', 'Management Team'], answer: 2, xp: 5, category: "Modul 4: Strategy" },
                // ===== ADDITIONAL (47-55) =====
                { question: "Manakah yang merupakan definisi 'Kesiapan' (Readiness) dalam SLT?", options: ['Tingkat pendidikan dan usia', 'Kemampuan (Ability) dan Kemauan (Willingness)', 'Pengalaman kerja dan gaji', 'Jabatan dan koneksi'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Tiga jenis tindakan manajerial dalam controlling adalah?', options: ['Do Nothing, Correct Performance, Revise Standard', 'Plan, Do, Check', 'Hire, Fire, Promote', 'Sell, Buy, Hold'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: 'Contoh Rasio Aktivitas (Activity Ratio) adalah?', options: ['Inventory Turnover', 'Current Ratio', 'Debt to Asset', 'Return on Investment'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: 'Tahap kedua dalam proses kewirausahaan setelah Eksplorasi Konteks adalah?', options: ['Memulai Usaha', 'Mengelola Usaha', 'Identifikasi Peluang', 'Exit Strategy'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: 'Feasibility Study (Studi Kelayakan) menganalisis dua hal utama, yaitu?', options: ['Kompetitor dan Pembiayaan', 'Gedung dan Karyawan', 'Logo dan Website', 'Pajak dan Hukum'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: 'Gaya kepemimpinan Iowa yang memusatkan wewenang dan mendikte metode kerja adalah?', options: ['Autokratis', 'Demokratis', 'Laissez-faire', 'Liberal'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: "Dimensi kepercayaan 'Konsistensi' merujuk pada?", options: ['Kejujuran', 'Keandalan, prediktabilitas, dan penilaian yang baik', 'Keahlian teknis', 'Kesediaan berbagi ide'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: "Porter's 5 Forces: Threat of New Entrants mengukur?", options: ['Seberapa mudah orang baru membuat bisnis saingan', 'Seberapa kuat pembeli menawar', 'Seberapa banyak barang pengganti', 'Seberapa kuat persaingan lama'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: 'Urutan ke-7 (terakhir) dalam struktur Business Plan adalah?', options: ['Marketing Strategy', 'Financial Plan', 'Management Team', 'Executive Summary'], answer: 1, xp: 5, category: "Tambahan: Review" },
                // ===== QUIZ TAMBAHAN (56-60) =====
                { question: 'Dalam Teori Hierarki Kebutuhan Maslow, kebutuhan akan pengakuan, jabatan, dan status sosial masuk dalam tingkatan?', options: ['Kebutuhan Sosial', 'Kebutuhan Keamanan', 'Kebutuhan Penghargaan (Esteem)', 'Aktualisasi Diri'], answer: 2, xp: 5, category: "Tambahan: Review" },
                { question: 'Jika manajer memperbaiki kinerja dengan cara memadamkan masalah saat itu juga agar pekerjaan bisa lanjut (tanpa mencari akar masalah), tindakan ini disebut?', options: ['Basic Corrective Action', 'Immediate Corrective Action', 'Revise Standard', 'Preventive Maintenance'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Karyawan yang terlibat dalam pemogokan kerja ilegal atau aktivitas kriminal di luar kantor dikategorikan dalam masalah disiplin?', options: ['On-the-Job Behaviors', 'Outside Activities', 'Dishonesty', 'Attendance'], answer: 1, xp: 5, category: "Tambahan: Review" },
                { question: 'Dalam Analisis SWOT, faktor internal positif yang dimiliki perusahaan (aset, paten, budaya kerja) disebut?', options: ['Strengths (Kekuatan)', 'Weaknesses (Kelemahan)', 'Opportunities (Peluang)', 'Threats (Ancaman)'], answer: 0, xp: 5, category: "Tambahan: Review" },
                { question: 'Apa hubungan antara Perencanaan (Planning) dan Pengendalian (Controlling)?', options: ['Pengendalian tidak butuh perencanaan', 'Perencanaan memberikan standar/target untuk dikendalikan; tanpa rencana, tidak ada pengendalian', 'Pengendalian dilakukan sebelum perencanaan', 'Keduanya fungsi yang terpisah total'], answer: 1, xp: 5, category: "Tambahan: Review" },
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
