import { Article, VideoNews, MarketItem } from '../types/news';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Konsolidasi Parlemen dan KPU: Kesiapan Logistik Surat Suara Pilkada Serentak Tuntas di 514 Wilayah',
    slug: 'konsolidasi-parlemen-dan-kpu-pilkada-serentak',
    summary: 'Komisi Pemilihan Umum bersama Komisi II DPR RI memastikan seluruh tahapan percetakan, pengamanan, dan distribusi logistik pemilu rampung tepat waktu ke pelosok Nusantara.',
    content: [
      'Komisi Pemilihan Umum (KPU) RI bersama jajaran Komisi II DPR RI menggelar rapat koordinasi nasional terkait kesiapan logistik pelaksanaan Pilkada Serentak 2026 di Jakarta Convention Center pada Kamis pagi.',
      'Ketua KPU menegaskan bahwa pendistribusian surat suara dan kotak suara ke 514 kabupaten dan kota telah mencapai 98,4%, dengan prioritas utama pengiriman menuju wilayah kepulauan terluar menggunakan armada kapal perintis TNI AL dan pesawat kargo perintis.',
      '“Transparansi dan integritas logistik adalah kunci utama menjaga kepercayaan suara rakyat. Seluruh kotak suara kini dilengkapi segel barcode digital berkeamanan tinggi yang dapat dipantau langsung oleh para saksi dan pengawas Bawaslu,” ungkap perwakilan pimpinan sidang.',
      'Rapat juga menyepakati pembentukan posko tanggap darurat di daerah-daerah rawan cuaca ekstrem dan bencana geologis untuk memastikan hak pilih setiap warga negara terlindungi tanpa diskriminasi.',
      'Aparat kepolisian dan TNI menyiagakan lebih dari 180 ribu personel gabungan guna mengawal kelancaran distribusi logistik hingga ke tingkat Tempat Pemungutan Suara (TPS).'
    ],
    category: 'Politik',
    author: 'Dimas Wicaksono',
    editor: 'Nurul Hidayati',
    city: 'Jakarta',
    publishedAt: '8 Okt 2026, 15:30 WIB',
    readTimeMinutes: 4,
    image: '/src/assets/images/hero_indonesia_summit_1791478680076.jpg',
    imageCaption: 'Pimpinan KPU dan Komisi II DPR menggelar rapat koordinasi nasional logistik pemilu di Jakarta.',
    views: 48290,
    commentsCount: 142,
    isHeadline: true,
    isPopular: true,
    popularRank: 1,
    reactions: {
      like: 1240,
      impressed: 580,
      inspired: 890,
      sad: 12
    },
    tags: ['Politik', 'Pilkada Serentak', 'KPU RI', 'DPR RI', 'Demokrasi'],
    comments: [
      {
        id: 'c-1',
        author: 'Bambang Suryo',
        avatar: 'BS',
        timeAgo: '25 menit lalu',
        text: 'Apresiasi pengamanan logistik dengan barcode digital. Semoga pelaksanaan di lapangan berjalan tertib dan jujur.',
        likes: 34
      },
      {
        id: 'c-2',
        author: 'Citra Kirana',
        avatar: 'CK',
        timeAgo: '42 menit lalu',
        text: 'Pengawalan TNI AL untuk wilayah kepulauan sangat krusial mengingat ombak laut sedang tinggi. Tetap semangat petugas pemilu!',
        likes: 19
      }
    ]
  },
  {
    id: 'art-sport-1',
    title: 'Gemuruh 75 Ribu Suporter di GBK: Timnas Garuda Taklukkan Lawan 2-1 Lewat Gol Menit Krusial',
    slug: 'gemuruh-suporter-gbk-timnas-garuda-menang-2-1',
    summary: 'Pertandingan sengit Kualifikasi Internasional menyajikan drama menegangkan hingga menit ke-88 sebelum gol sundulan penyerang Garuda memastikan 3 poin penuh.',
    content: [
      'Stadion Utama Gelora Bung Karno (SUGBK) Senayan bergemuruh sepanjang 90 menit saat Tim Nasional Indonesia mengamankan kemenangan krusial 2-1 atas lawannya dalam lanjutan Kualifikasi Piala Dunia 2026 Zona Asia.',
      'Laga berlangsung dengan intensitas sangat tinggi sejak peluit awal dibunyikan. Sempat tertinggal lewat serangan balik cepat di babak pertama, skuad Garuda bangkit lewat pressing agresif dan kombinasi umpan satu-dua yang memukau.',
      'Gol penyama kedudukan dicetak oleh gelandang serang melalui tendangan melengkung dari luar kotak penalti pada menit ke-56. Puncaknya, di menit ke-88, skema sepak pojok matang berhasil dituntaskan dengan tandukan keras yang merobek jala gawang lawan.',
      'Pelatih kepala memuji determinasi pantang menyerah anak asuhnya di hadapan puluhan ribu pendukung militan yang tak henti menyanyikan lagu kebangsaan sepanjang laga berlangsung.'
    ],
    category: 'Olahraga',
    author: 'Fajar Nugroho',
    editor: 'Rian Dwi',
    city: 'Jakarta',
    publishedAt: '8 Okt 2026, 14:45 WIB',
    readTimeMinutes: 3,
    image: '/src/assets/images/news_olahraga_stadion_1791478718927.jpg',
    imageCaption: 'Aksi duel perebutan bola sengit di bawah sorotan lampu Stadion Utama Gelora Bung Karno Jakarta.',
    views: 52100,
    commentsCount: 231,
    isHeadline: false,
    isPopular: true,
    popularRank: 2,
    reactions: {
      like: 2890,
      impressed: 910,
      inspired: 1120,
      sad: 5
    },
    tags: ['Olahraga', 'Timnas Indonesia', 'Sepakbola', 'GBK', 'Garuda'],
    comments: [
      {
        id: 'c-sport',
        author: 'Bayu Perkasa',
        avatar: 'BP',
        timeAgo: '1 jam lalu',
        text: 'Mental juara terpancar nyata! Perjuangan tanpa henti hingga menit akhir membuahkan hasil manis.',
        likes: 48
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Bareskrim Polri Bongkar Sindikat Penipuan Investasi Kripto Ilegal Berkedok Robot Trading Rp 120 Miliar',
    slug: 'bareskrim-polri-bongkar-sindikat-investasi-kripto-ilegal',
    summary: 'Subdit Siber Bareskrim meringkus 6 tersangka utama yang memperdaya lebih dari 4.000 korban dari berbagai kota dengan janji keuntungan pasti 15% per bulan.',
    content: [
      'Direktorat Tindak Pidana Siber Bareskrim Polri berhasil mengungkap jaringan penipuan investasi aset kripto ilegal berskala nasional yang beroperasi dari beberapa markas di Jakarta, Surabaya, dan Bali.',
      'Dalam penggerebekan serentak, penyidik mengamankan aset senilai Rp 120 miliar yang terdiri atas puluhan rekening bank yang telah dibekukan, 8 mobil mewah, aset kripto USDT, serta perangkat server komputer pencatat transaksi fiktif.',
      'Direktur Tindak Pidana Siber menyatakan bahwa para pelaku memanfaatkan platform trading bodong tanpa izin Bappebti dan OJK. Korban dijanjikan imbal hasil tetap dan bonus berjenjang mirip skema Ponzi.',
      'Pihak kepolisian membuka hotline aduan khusus bagi masyarakat yang merasa dirugikan agar segera melapor dengan menyertakan bukti mutasi transfer dan identitas akun.'
    ],
    category: 'Kriminal',
    author: 'Raditya Pratama',
    editor: 'Eko Prasetyo',
    city: 'Jakarta',
    publishedAt: '8 Okt 2026, 14:15 WIB',
    readTimeMinutes: 4,
    image: '/src/assets/images/news_bursa_idx_1791478693881.jpg',
    imageCaption: 'Penyidik Siber Polri memperlihatkan barang bukti digital dan aset sitaan kasus robot trading ilegal.',
    views: 38400,
    commentsCount: 92,
    isHeadline: false,
    isPopular: true,
    popularRank: 3,
    reactions: {
      like: 980,
      impressed: 420,
      inspired: 180,
      sad: 45
    },
    tags: ['Kriminal', 'Bareskrim Polri', 'Siber', 'Investasi Bodong', 'Hukum'],
    comments: [
      {
        id: 'c-3',
        author: 'Hendra Gunawan',
        avatar: 'HG',
        timeAgo: '1 jam lalu',
        text: 'Jangan pernah mudah tergiur iming-iming bunga tinggi tanpa izin OJK. Salut untuk ketegasan Bareskrim!',
        likes: 27
      }
    ]
  },
  {
    id: 'art-econ-1',
    title: 'Ekonomi: IHSG Cetak Rekor 7.458 di Tengah Surplus Neraca Dagang 52 Bulan dan Guyuran Dana Asing',
    slug: 'ekonomi-ihsg-cetak-rekor-7458-surplus-dagang',
    summary: 'Indeks bursa saham Indonesia kembali menembus rekor tertinggi sepanjang masa dengan aksi beli bersih investor institusi global senilai Rp 8,4 triliun.',
    content: [
      'Laju Indeks Harga Saham Gabungan (IHSG) di Bursa Efek Indonesia (BEI) menorehkan rekor tertinggi sepanjang sejarah dengan menembus level psikologis 7.458,12 pada penutupan perdagangan.',
      'Penguatan indeks ditopang oleh rilis data fundamental ekonomi makro yang solid, inflasi yang terjaga di kisaran 2,4%, serta surplus neraca transaksi berjalan yang melampaui estimasi konsensus analis.',
      'Sektor perbankan, energi hijau, dan manufaktur berorientasi ekspor mendominasi volume transaksi harian dengan kenaikan rata-rata saham bluechip mencapai 1,8% hingga 3,2%.',
      'Pemerintah optimis stabilitas sektor riil dan cadangan devisa yang kuat menjadi bantalan kokoh perekonomian nasional menghadapi volatilitas global.'
    ],
    category: 'Ekonomi',
    author: 'Raditya Pratama',
    editor: 'Eko Prasetyo',
    city: 'Jakarta',
    publishedAt: '8 Okt 2026, 13:55 WIB',
    readTimeMinutes: 3,
    image: '/src/assets/images/news_bursa_idx_1791478693881.jpg',
    imageCaption: 'Monitor pergerakan saham di Main Hall Bursa Efek Indonesia menunjukkan tren hijau penguatan indeks.',
    views: 31200,
    commentsCount: 68,
    isHeadline: false,
    isPopular: true,
    popularRank: 4,
    reactions: {
      like: 890,
      impressed: 420,
      inspired: 310,
      sad: 4
    },
    tags: ['Ekonomi', 'IHSG', 'Bursa Efek', 'Finansial', 'Investasi'],
    comments: []
  },
  {
    id: 'art-3',
    title: 'Daerah: Pembangunan Dermaga Terpadu dan Sentra Logistik Dingin Natuna Resmi Beroperasi',
    slug: 'daerah-pembangunan-dermaga-dan-sentra-natuna-beroperasi',
    summary: 'Infrastruktur maritim strategis di Natuna kini memangkas ongkos angkut hasil tangkapan nelayan hingga 35% dan memperkuat konektivitas pangan antarpulau.',
    content: [
      'Pemerintah Daerah Kepulauan Riau bersama Kementerian Kelautan dan Perikanan meresmikan dermaga terpadu serta fasilitas cold storage berkapasitas 500 ton di Selat Lampa, Natuna.',
      'Dengan beroperasinya fasilitas ini, nelayan tradisional tidak lagi terpaksa menjual ikan dengan harga anjlok saat musim panen melimpah. Kapal kargo pendingin kini bersandar secara terjadwal setiap 3 hari sekali menuju Batam dan Tanjung Priok.',
      'Bupati Natuna menyampaikan bahwa keberadaan fasilitas modern ini adalah bukti nyata komitmen pemerataan pembangunan di garda terdepan Nusantara.',
      'Selain mendukung ekonomi perikanan, dermaga ini juga difungsikan sebagai pos logistik tanggap bencana dan penyaluran bahan pokok subsidi untuk pulau-pulau terpencil di sekitarnya.'
    ],
    category: 'Daerah',
    author: 'Anisa Maharani',
    editor: 'Bagus Setyawan',
    city: 'Natuna',
    publishedAt: '8 Okt 2026, 13:40 WIB',
    readTimeMinutes: 3,
    image: '/src/assets/images/news_teknologi_satelit_1791478708138.jpg',
    imageCaption: 'Aktivitas bongkar muat ikan nelayan di dermaga terpadu modern Selat Lampa, Natuna.',
    views: 26800,
    commentsCount: 54,
    isHeadline: false,
    isPopular: true,
    popularRank: 5,
    reactions: {
      like: 1450,
      impressed: 780,
      inspired: 990,
      sad: 2
    },
    tags: ['Daerah', 'Natuna', 'Perikanan', 'Konektivitas', 'Kepri'],
    comments: [
      {
        id: 'c-4',
        author: 'Arif Wibowo',
        avatar: 'AW',
        timeAgo: '2 jam lalu',
        text: 'Pembangunan daerah 3T seperti ini yang sangat dinantikan rakyat. Nelayan kita berhak sejahtera!',
        likes: 42
      }
    ]
  },
  {
    id: 'art-4',
    title: 'Legalitas: Mahkamah Konstitusi Bacakan Putusan Krusial Uji Materi Perlindungan Hak Ketenagakerjaan',
    slug: 'legalitas-mk-bacakan-putusan-uji-materi-ketenagakerjaan',
    summary: 'MK mengabulkan sebagian permohonan serikat pekerja terkait batas waktu Perjanjian Kerja Waktu Tertentu (PKWT) dan penegasan komponen upah minimum layak.',
    content: [
      'Mahkamah Konstitusi (MK) membacakan putusan penting terkait pengujian materi Undang-Undang Ketenagakerjaan dalam sidang pleno terbuka yang dipimpin oleh Ketua MK di Gedung Mahkamah Konstitusi, Jakarta.',
      'Dalam amar putusannya, Mahkamah menegaskan bahwa status pekerja kontrak (PKWT) wajib dibatasi maksimal lima tahun termasuk perpanjangan. Bila melampaui masa tersebut, pekerja demi hukum berubah status menjadi pegawai tetap (PKWTT).',
      'Mahkamah juga memerintahkan pembentuk undang-undang untuk menyusun regulasi ketenagakerjaan baru yang lebih komprehensif dan partisipatif dalam kurun waktu maksimal dua tahun.',
      'Pakar hukum tata negara menilai putusan ini merupakan terobosan hukum progresif yang mengembalikan marwah kepastian hukum dan perlindungan keadilan sosial bagi kaum pekerja di seluruh Indonesia.'
    ],
    category: 'Legalitas',
    author: 'Fajar Nugroho',
    editor: 'Rian Dwi',
    city: 'Jakarta',
    publishedAt: '8 Okt 2026, 11:20 WIB',
    readTimeMinutes: 4,
    image: '/src/assets/images/hero_indonesia_summit_1791478680076.jpg',
    imageCaption: 'Majelis Hakim Konstitusi membacakan amar putusan uji materi regulasi ketenagakerjaan di Jakarta.',
    views: 39100,
    commentsCount: 118,
    isHeadline: false,
    legalRef: 'Putusan MK No. 168/PUU-XXI/2026',
    reactions: {
      like: 2190,
      impressed: 810,
      inspired: 1020,
      sad: 15
    },
    tags: ['Legalitas', 'Mahkamah Konstitusi', 'Hukum', 'Ketenagakerjaan', 'Putusan MK'],
    comments: [
      {
        id: 'c-5',
        author: 'Bayu Perkasa',
        avatar: 'BP',
        timeAgo: '3 jam lalu',
        text: 'Keputusan yang sangat adil dan memberi angin segar bagi kepastian masa depan pekerja kontrak di tanah air.',
        likes: 67
      }
    ]
  },
  {
    id: 'art-5',
    title: 'Lapor Warga: Jalan Poros Antar-Kecamatan Way Kanan Ambles, Dinas PU Turunkan Ekskavator Tanggap Darurat',
    slug: 'lapor-warga-jalan-poros-way-kanan-ambles-pu-turunkan-alat-berat',
    summary: 'Aspirasi warga yang diunggah ke kanal Lapor Warga Arun News langsung direspons cepat oleh pemerintah kabupaten dengan penanganan bronjong kawat dan jalur darurat.',
    content: [
      'Menindaklanjuti laporan warga masyarakat yang masuk melalui kanal Lapor Warga Arun News mengenai amblesnya badan jalan poros penghubung Kecamatan Pakuan Ratu dan Negeri Besar, Dinas Pekerjaan Umum setempat bergerak cepat ke lokasi.',
      'Hujan lebat berdurasi lebih dari 5 jam pada Rabu malam memicu longsoran tebing selebar 12 meter yang memutus akses angkutan hasil bumi dan kendaraan roda empat.',
      'Kepala Dinas PU didampingi Camat setempat menyatakan bahwa dua unit ekskavator dan puluhan material bronjong batu telah diterjunkan ke titik kejadian untuk membuat perkuatan lereng darurat.',
      '“Kami berterima kasih kepada warga dan jurnalisme warga Arun News yang mengirimkan koordinat akurat. Ditargetkan jalur darurat roda dua dan empat bermuatan ringan bisa dilalui kembali besok siang,” ujar pejabat terkait di lokasi.'
    ],
    category: 'Lapor Warga',
    author: 'Aspirasi Warga / Redaksi Arun',
    editor: 'Nurul Hidayati',
    city: 'Way Kanan, Lampung',
    publishedAt: '8 Okt 2026, 10:10 WIB',
    readTimeMinutes: 3,
    image: '/src/assets/images/news_olahraga_stadion_1791478718927.jpg',
    imageCaption: 'Petugas Dinas PU dan warga bahu-membahu memasang pengaman tebing jalan ambles di Way Kanan.',
    views: 24450,
    commentsCount: 63,
    isHeadline: false,
    reportStatus: 'Ditindaklanjuti',
    reactions: {
      like: 1410,
      impressed: 490,
      inspired: 570,
      sad: 8
    },
    tags: ['Lapor Warga', 'Infrastruktur', 'Way Kanan', 'Tanggap Darurat', 'Pelayanan Publik'],
    comments: [
      {
        id: 'c-6',
        author: 'Sugeng Riyadi',
        avatar: 'SR',
        timeAgo: '4 jam lalu',
        text: 'Kanal Lapor Warga Arun News terbukti sangat efektif menjadi jembatan antara keluhan rakyat dan respon dinas terkait!',
        likes: 51
      }
    ]
  },
  {
    id: 'art-6',
    title: 'Lapor Warga: Dugaan Limbah Industri Hitam Cemari Sungai Cisadane, Warga Desak DLH Uji Laboratorium',
    slug: 'lapor-warga-dugaan-limbah-hitam-cisadane-dlh-uji-lab',
    summary: 'Warga bantaran mengeluhkan bau menyengat dan air sungai menghitam pekat. Tim Pengawas Lingkungan Hidup terjun mengambil 6 sampel air limbah.',
    content: [
      'Warga permukiman di sepanjang bantaran Sungai Cisadane melaporkan dugaan pembuangan limbah cair industri tanpa pengolahan yang membuat air sungai berubah warna menjadi kehitaman dan mengeluarkan bau menyengat.',
      'Laporan tersebut mencuat setelah warga mendokumentasikan saluran pipa pembuangan tersembunyi dan mengunggahnya ke platform Lapor Warga Arun News.',
      'Dinas Lingkungan Hidup (DLH) bersama aparat penegak hukum Gakkum LHK langsung mendatangi lokasi pada Kamis siang untuk menyegel sementara outlet saluran pipa dan mengambil enam sampel air untuk uji baku mutu di laboratorium terakreditasi.',
      'Pemerintah daerah menegaskan tidak akan segan mencabut izin operasi perusahaan bila terbukti sengaja membuang air limbah B3 di atas ambang batas baku mutu lingkungan.'
    ],
    category: 'Lapor Warga',
    author: 'Warga Peduli Cisadane',
    editor: 'Eko Prasetyo',
    city: 'Tangerang',
    publishedAt: '8 Okt 2026, 09:15 WIB',
    readTimeMinutes: 3,
    image: '/src/assets/images/news_teknologi_satelit_1791478708138.jpg',
    imageCaption: 'Petugas Pengawas Lingkungan Hidup mengambil sampel air di titik saluran buangan sungai.',
    views: 18900,
    commentsCount: 47,
    isHeadline: false,
    reportStatus: 'Dalam Investigasi',
    reactions: {
      like: 620,
      impressed: 310,
      inspired: 410,
      sad: 42
    },
    tags: ['Lapor Warga', 'Cisadane', 'Lingkungan Hidup', 'Limbah Pabrik', 'DLH'],
    comments: []
  },
  {
    id: 'art-7',
    title: 'Lain-lain: Inovasi Petani Milenial Malang Ciptakan Sensor IoT Hemat Air dan Pupuk Presisi 40%',
    slug: 'lain-lain-inovasi-petani-milenial-malang-sensor-iot-pertanian',
    summary: 'Teknologi mikrokontroler karya pemuda desa mampu memprediksi kelembaban tanah dan kebutuhan nutrisi tanaman hortikultura secara real-time via smartphone.',
    content: [
      'Kelompok tani muda di lereng Gunung Bromo, Malang, berhasil mengembangkan sistem irigasi tetes pintar berbasis Internet of Things (IoT) dengan biaya perakitan yang terjangkau bagi petani kecil.',
      'Sistem ini dilengkapi sensor kelembapan tanah dan cuaca lokal yang secara otomatis mengatur jadwal penyiraman dan takaran pupuk cair sesuai kebutuhan riil tanaman.',
      'Hasil uji coba pada komoditas cabai rawit dan tomat selama dua musim panen membuktikan adanya efisiensi konsumsi air hingga 40% dan peningkatan bobot buah hingga 25%.',
      'Inovasi ini kini mulai direplikasi oleh lebih dari 12 kelompok tani di Jawa Timur dan memperoleh pembinaan dari kementerian terkait.'
    ],
    category: 'Lain-lain',
    author: 'Nadia Salsabila',
    editor: 'Nurul Hidayati',
    city: 'Malang',
    publishedAt: '8 Okt 2026, 08:30 WIB',
    readTimeMinutes: 3,
    image: '/src/assets/images/news_bursa_idx_1791478693881.jpg',
    imageCaption: 'Petani milenial memperlihatkan modul kontrol irigasi pintar berbasis aplikasi di kebun Malang.',
    views: 16700,
    commentsCount: 31,
    reactions: {
      like: 880,
      impressed: 340,
      inspired: 610,
      sad: 2
    },
    tags: ['Lain-lain', 'Pertanian Modern', 'IoT', 'Petani Milenial', 'Inovasi'],
    comments: []
  },
  {
    id: 'art-8',
    title: 'Legalitas: BPN Terbitkan 12.000 Sertifikat Tanah Elektronik Gratis bagi Masyarakat Adat Nusantara',
    slug: 'legalitas-bpn-terbitkan-sertifikat-tanah-elektronik-masyarakat-adat',
    summary: 'Kementerian ATR/BPN mempercepat kepastian hukum hak ulayat dan tanah adat guna mencegah konflik agraria dan perambahan hutan terlarang.',
    content: [
      'Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional (ATR/BPN) secara resmi menyerahkan 12.000 sertifikat tanah elektronik komunal kepada masyarakat hukum adat di wilayah Kalimantan dan Sumatra.',
      'Langkah terobosan hukum ini memberikan perlindungan legalitas absolut yang diakui negara terhadap wilayah adat yang telah dihuni secara turun-temurun selama ratusan tahun.',
      'Menteri ATR/BPN menyatakan bahwa sertifikat digital ini dilengkapi tanda tangan elektronik bersertifikasi BSrE dan koordinat spasial geospasial presisi tinggi sehingga tidak dapat ditumpuk klaim sepihak oleh pihak lain.',
      'Lembaga Bantuan Hukum mengapresiasi penerbitan sertifikat ini sebagai langkah konkret mewujudkan keadilan agraria dan penghormatan hak konstitusional masyarakat adat.'
    ],
    category: 'Legalitas',
    author: 'Prof. Dr. Hendra Suwandi',
    editor: 'Nurul Hidayati',
    city: 'Pontianak',
    publishedAt: '8 Okt 2026, 07:00 WIB',
    readTimeMinutes: 4,
    image: '/src/assets/images/hero_indonesia_summit_1791478680076.jpg',
    imageCaption: 'Penyerahan simbolis sertifikat tanah elektronik komunal kepada tetua adat.',
    views: 21800,
    commentsCount: 56,
    legalRef: 'Permen ATR/BPN No. 14 Tahun 2026',
    reactions: {
      like: 1150,
      impressed: 490,
      inspired: 720,
      sad: 4
    },
    tags: ['Legalitas', 'BPN', 'Sertifikat Tanah', 'Masyarakat Adat', 'Agraria'],
    comments: []
  }
];

export const BREAKING_NEWS_ITEMS = [
  '🏛️ POLITIK: KPU dan DPR tuntaskan distribusi logistik Pilkada ke 514 wilayah Nusantara',
  '⚽ OLAHRAGA: Timnas Garuda menang dramatis 2-1 di SUGBK lewat gol sundulan menit akhir',
  '🚨 KRIMINAL: Bareskrim bekukan aset Rp 120 Miliar sindikat penipuan trading ilegal',
  '📈 EKONOMI: IHSG cetak rekor 7.458 poin ditopang surplus dagang 52 bulan berturut-turut',
  '🌏 DAERAH: Dermaga terpadu Selat Lampa Natuna beroperasi pangkas ongkos logistik nelayan',
  '📢 LAPOR WARGA: Respon cepat amblesnya jalan poros Way Kanan, alat berat dikerahkan',
  '⚖️ LEGALITAS: Putusan MK tegaskan batas waktu pekerja kontrak PKWT maksimal 5 tahun'
];

export const MARKET_TICKER_DATA: MarketItem[] = [
  { name: 'IHSG', value: '7.458,12', change: '+0.64%', isPositive: true },
  { name: 'USD/IDR', value: '15.620,00', change: '-0.16%', isPositive: true },
  { name: 'Emas Antam', value: 'Rp 1.485.000/gr', change: '+0.45%', isPositive: true },
  { name: 'Minyak Brent', value: '$78.40/bbl', change: '-0.32%', isPositive: false },
  { name: 'SBN 10 Thn', value: '6,42%', change: '-0.02%', isPositive: true }
];

export const VIDEO_STORIES: VideoNews[] = [
  {
    id: 'vid-1',
    title: 'Arun Investigasi: Mengusut Jejak Aliran Dana Robot Trading Bodong Rp 120 Miliar',
    duration: '04:12',
    category: 'Arun Kriminal',
    thumbnail: '/src/assets/images/news_bursa_idx_1791478693881.jpg',
    views: '142K ditonton',
    date: '2 jam lalu',
    description: 'Eksklusif Arun News menelusuri modus operandi para tersangka menjaring ribuan korban dengan janji keuntungan fiktif dan mobil mewah.'
  },
  {
    id: 'vid-2',
    title: 'Arun Warga: Laporan Lapangan Amblesnya Jalan Way Kanan dan Gerak Cepat Dinas PU',
    duration: '03:45',
    category: 'Lapor Warga',
    thumbnail: '/src/assets/images/news_olahraga_stadion_1791478718927.jpg',
    views: '98K ditonton',
    date: '4 jam lalu',
    description: 'Liputan jurnalisme warga di lapangan memperlihatkan upaya penanganan tanggap darurat dan pemasangan bronjong batu di Way Kanan.'
  },
  {
    id: 'vid-3',
    title: 'Arun Olahraga: Gemuruh 75 Ribu Penonton Gelora Bung Karno Bikin Merinding',
    duration: '03:30',
    category: 'Arun Olahraga',
    thumbnail: '/src/assets/images/news_olahraga_stadion_1791478718927.jpg',
    views: '185K ditonton',
    date: '5 jam lalu',
    description: 'Cuplikan dari tepi lapangan menyaksikan gol kemenangan Garuda dan nyanyian kebangsaan tanpa henti puluhan ribu suporter.'
  }
];

export const EDITORIAL_CHANNELS = [
  { name: 'Politik', desc: 'Kebijakan Publik, Parlemen & Pilkada', count: '124 Berita' },
  { name: 'Olahraga', desc: 'Sepakbola, Raket, Balap & Atletik', count: '78 Berita' },
  { name: 'Kriminal', desc: 'Hukum, Investigasi Siber & Kepolisian', count: '88 Berita' },
  { name: 'Ekonomi', desc: 'Pasar Modal, Makro, Perbankan & Bisnis', count: '94 Berita' },
  { name: 'Daerah', desc: 'Denyut Pembangunan 38 Provinsi', count: '96 Berita' },
  { name: 'Lain-lain', desc: 'Inovasi, Sosok, Budaya & Edukasi', count: '52 Berita' },
  { name: 'Lapor Warga', desc: 'Aspirasi & Jurnalisme Warga Interaktif', count: '73 Laporan' },
  { name: 'Legalitas', desc: 'Putusan Pengadilan, MK & Regulasi', count: '45 Berita' }
];
