import React, { useState } from 'react';
import { 
  X, Briefcase, TrendingUp, Users, Target, CheckCircle2, 
  Send, Phone, Mail, Award, Layout, FileText, Sparkles, ArrowRight
} from 'lucide-react';

interface IklanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormat?: string;
}

export const IklanModal: React.FC<IklanModalProps> = ({
  isOpen,
  onClose,
  initialFormat = 'Top Leaderboard'
}) => {
  const [activeTab, setActiveTab] = useState<'format' | 'spots' | 'form' | 'stats'>('format');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFormat, setSelectedFormat] = useState(initialFormat);
  const [budgetRange, setBudgetRange] = useState('Rp 5 Juta - Rp 15 Juta');
  const [campaignNotes, setCampaignNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const adFormats = [
    {
      id: 'leaderboard',
      name: 'Top Header Leaderboard Banner',
      dimension: '970x90 / 728x90 px',
      impressions: '1,5 Juta+ Impresi / Minggu',
      pos: 'Tepat di bagian atas portal antara TopNav dan Breaking Ticker',
      desc: 'Penempatan dengan visibilitas paling tinggi, langsung dilihat pembaca saat pertama kali membuka website Arun News.',
      highlight: 'Paling Populer untuk Brand Awareness'
    },
    {
      id: 'in-article',
      name: 'In-Article Native Banner & Sponsored',
      dimension: '728x200 / 300x250 px',
      impressions: '2,8 Juta+ Impresi / Minggu',
      pos: 'Di tengah isi paragraf artikel berita pada ArticleModal',
      desc: 'Iklan menyatu secara elegan dengan alur baca berita, memiliki tingkat Click-Through Rate (CTR) tertinggi mencapai 3,8%.',
      highlight: 'CTR Tertinggi'
    },
    {
      id: 'sidebar',
      name: 'Sidebar Sticky Rectangle',
      dimension: '300x250 / 300x600 px',
      impressions: '1,2 Juta+ Impresi / Minggu',
      pos: 'Mendampingi kolom ArunTerpopuler di halaman depan',
      desc: 'Menemani pandangan mata pembaca saat menjelajahi daftar artikel trending secara real-time.',
      highlight: 'Tahan Lama (High Dwell Time)'
    },
    {
      id: 'advertorial',
      name: 'Advertorial & Berita Bersponsor',
      dimension: 'Artikel Lengkap + Foto Jurnalistik',
      impressions: 'Permanen SEO & Media Social Push',
      pos: 'Kanal Berita Terkait (Ekonomi, Daerah, Inovasi, Politik)',
      desc: 'Artikel mendalam bernilai jurnalisme tinggi yang disusun tim redaksi Arun News mengenai produk, kebijakan, atau profil instansi Anda.',
      highlight: 'Storytelling & Trust Maksimal'
    },
    {
      id: 'video',
      name: 'Arun Video Pre-Roll & Sponsorship',
      dimension: 'Video 16:9 (15-30 detik)',
      impressions: '500 Ribu+ Tayangan Video',
      pos: 'Sebelum pemutaran video dokumenter di galeri Arun Video',
      desc: 'Format video bergerak resolusi tinggi dengan audiens yang fokus dan tingkat penyelesaian tonton di atas 85%.',
      highlight: 'Engagement Audio-Visual'
    },
    {
      id: 'lapor',
      name: 'Kemitraan Khusus & CSR Pemda / BUMN',
      dimension: 'Paket Terpadu Kampanye Nasional',
      impressions: 'Cakupan Lintas Platform',
      pos: 'Kanal Lapor Warga, Banner Kolom & Dialog Redaksi',
      desc: 'Kolaborasi solusi informasi publik, sosialisasi program kerja kementerian, pemerintah daerah, dan BUMN se-Nusantara.',
      highlight: 'Kemitraan Publik Strategis'
    }
  ];

  const adPlacementSpots = [
    {
      name: 'Slot 1: Header Leaderboard (Paling Atas)',
      badge: 'Desktop & Mobile',
      desc: 'Terletak tepat di bawah Top Navigation dan di atas Breaking News Flash Ticker. Merupakan titik pandang pertama (*first fold*) yang memberikan 100% eksposur awal kepada setiap pengunjung unik.',
      spec: 'Ukuran ideal: 970x90px (Desktop), 320x50px (Mobile), Format JPG/PNG/WebP/HTML5 interaktif.'
    },
    {
      name: 'Slot 2: In-Article Reading Canvas (Di Tengah Isi Berita)',
      badge: 'High Engagement',
      desc: 'Disisipkan di antara paragraf 2 dan 3 saat pembaca membaca berita lengkap di ArticleModal. Menangkap perhatian pembaca yang sedang fokus menyimak informasi.',
      spec: 'Ukuran ideal: 728x200px atau 300x250px, mendukung tautan langsung ke Landing Page produk Anda.'
    },
    {
      name: 'Slot 3: Sidebar ArunTerpopuler (Samping Kanan)',
      badge: 'Trending Column',
      desc: 'Bersebelahan langsung dengan kotak berita real-time ArunTerpopuler (01-05). Audiens yang mencari berita viral akan otomatis melihat materi promosi Anda.',
      spec: 'Ukuran ideal: 300x250px (Medium Rectangle) atau 300x600px (Half Page Banner).'
    },
    {
      name: 'Slot 4: In-Feed Native Grid Card (Di Antara Kartu Berita)',
      badge: 'Natural Blend',
      desc: 'Disisipkan secara mulus di antara daftar kartu berita pada Kanal Berita (NewsGrid) dengan label "Kemitraan / Bersponsor", tidak terhalang oleh ad-blocker standar.',
      spec: 'Ukuran ideal: 4:3 gambar lanskap + judul berita komersial + ringkasan deck singkat.'
    },
    {
      name: 'Slot 5: Video Player Sponsorship',
      badge: 'Multimedia 20Detik / Arun TV',
      desc: 'Muncul di player video jurnalisme dokumenter sebelum video diputar, lengkap dengan tombol CTA "Kunjungi Website".',
      spec: 'Durasi video: 15 detik bumper atau 30 detik non-skippable HD.'
    }
  ];

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="bg-[#0b1b3b] text-slate-100 w-full max-w-4xl rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden relative my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#08152e] via-[#0d234d] to-[#08152e] border-b border-amber-500/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Briefcase className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-editorial tracking-tight">
                  Layanan Pasang Iklan &amp; Kerja Sama Media
                </h3>
                <span className="hidden sm:inline bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30">
                  MEDIA KIT 2026
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Arun News — Jembatan Komunikasi Brand &amp; Instansi Menjangkau Seluruh Nusantara
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup modal iklan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 bg-[#08152e] border-b border-blue-900/60 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('format')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'format'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Pilihan Format &amp; Paket Iklan
          </button>
          <button
            onClick={() => setActiveTab('spots')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'spots'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tempat / Slot Penempatan Iklan
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'stats'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Profil Audiens &amp; Jangkauan
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'form'
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Formulir Booking &amp; Konsultasi
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: FORMAT & PAKET IKLAN */}
          {activeTab === 'format' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-amber-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Tersedia diskon paket kampanye bulanan &amp; tahunan untuk Brand, BUMN, dan Kementerian.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('form')}
                  className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  Ajukan Penawaran
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adFormats.map((fmt) => (
                  <div
                    key={fmt.id}
                    className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60 hover:border-amber-400/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {fmt.highlight}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{fmt.dimension}</span>
                      </div>

                      <h4 className="text-sm font-bold text-white font-editorial">{fmt.name}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{fmt.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-mono text-[11px] font-semibold">{fmt.impressions}</span>
                      <button
                        onClick={() => {
                          setSelectedFormat(fmt.name);
                          setActiveTab('form');
                        }}
                        className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Pilih Format</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TEMPAT / SLOT PENEMPATAN IKLAN */}
          {activeTab === 'spots' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#08152e] border border-blue-900/60 rounded-xl text-xs text-slate-300">
                <p>
                  Portal berita <strong>Arun News</strong> dirancang dengan tata letak modern dan ramah pengguna (*user-friendly*), sehingga materi iklan Anda tampil secara berkelas tanpa mengganggu kenyamanan pembaca dalam menyimak berita.
                </p>
              </div>

              <div className="space-y-3">
                {adPlacementSpots.map((spot, index) => (
                  <div key={index} className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60 hover:border-amber-400/40 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center font-mono">
                          0{index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white font-editorial">{spot.name}</h4>
                      </div>
                      <span className="text-[10px] bg-blue-950 text-amber-300 font-bold px-2 py-0.5 rounded border border-blue-800">
                        {spot.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">{spot.desc}</p>
                    <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] text-amber-300/90 font-mono">
                      Spesifikasi: {spot.spec}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROFIL AUDIENS & STATISTIK */}
          {activeTab === 'stats' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60 text-center">
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">4,8 Juta+</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Pembaca Unik / Bulan</span>
                </div>
                <div className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60 text-center">
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">18,5 Juta+</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Tayangan Halaman (PV)</span>
                </div>
                <div className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60 text-center">
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">38 Provinsi</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Sebaran Pembaca Nusantara</span>
                </div>
                <div className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60 text-center">
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">3,8%</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Rata-rata CTR Iklan</span>
                </div>
              </div>

              {/* Demografi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Demografi Usia Pembaca</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-mono">
                    <li className="flex justify-between"><span>25 - 34 Tahun (Profesional Muda &amp; Pengusaha):</span> <span className="font-bold text-white">42%</span></li>
                    <li className="flex justify-between"><span>35 - 54 Tahun (Pembuat Kebijakan &amp; Eksekutif):</span> <span className="font-bold text-white">36%</span></li>
                    <li className="flex justify-between"><span>18 - 24 Tahun (Mahasiswa &amp; Gen-Z):</span> <span className="font-bold text-white">15%</span></li>
                    <li className="flex justify-between"><span>55+ Tahun (Tokoh Masyarakat &amp; Senior):</span> <span className="font-bold text-white">7%</span></li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#08152e] border border-blue-900/60">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>Perangkat Pengakses</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-mono">
                    <li className="flex justify-between"><span>Ponsel Pintar (Mobile Web &amp; App):</span> <span className="font-bold text-white">78%</span></li>
                    <li className="flex justify-between"><span>Komputer &amp; Laptop Kantor (Desktop):</span> <span className="font-bold text-white">19%</span></li>
                    <li className="flex justify-between"><span>Tablet:</span> <span className="font-bold text-white">3%</span></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FORMULIR BOOKING & KONSULTASI */}
          {activeTab === 'form' && (
            <div>
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-editorial">
                    Permohonan Kerja Sama Diterima!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Terima kasih, perwakilan tim marketing &amp; kemitraan strategis <strong>Arun News</strong> akan segera menghubungi <strong>{contactName || 'Anda'}</strong> ({companyName || 'Instansi Anda'}) melalui WhatsApp / Email dalam waktu 1x24 jam kerja.
                  </p>
                  <div className="p-3 bg-[#08152e] border border-amber-500/30 rounded-xl inline-block text-xs text-amber-300">
                    Format Dipilih: <strong>{selectedFormat}</strong> | Estimasi Anggaran: <strong>{budgetRange}</strong>
                  </div>
                  <div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
                    >
                      Selesai &amp; Tutup
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Nama Perusahaan / Instansi / Brand <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: PT Nusantara Karya / Pemkab Bogor"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Nama Narahubung / PIC <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap Anda"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Nomor WhatsApp Aktif <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Alamat Email Perusahaan <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="marketing@brand.co.id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Pilihan Format / Layanan Iklan
                      </label>
                      <select
                        value={selectedFormat}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        {adFormats.map((f) => (
                          <option key={f.id} value={f.name}>{f.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Estimasi Anggaran Kampanye
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="Rp 2,5 Juta - Rp 5 Juta">Rp 2,5 Juta - Rp 5 Juta (Paket Pemula)</option>
                        <option value="Rp 5 Juta - Rp 15 Juta">Rp 5 Juta - Rp 15 Juta (Paket Reguler)</option>
                        <option value="Rp 15 Juta - Rp 35 Juta">Rp 15 Juta - Rp 35 Juta (Paket Prioritas)</option>
                        <option value="Diatas Rp 35 Juta">Diatas Rp 35 Juta (Paket Kemitraan Tahunan / Roadblock)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Catatan Singkat / Kebutuhan Kampanye
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan tujuan promosi, periode jadwal penayangan yang diinginkan, atau pertanyaan terkait materi iklan..."
                      value={campaignNotes}
                      onChange={(e) => setCampaignNotes(e.target.value)}
                      className="w-full text-xs px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Permohonan Kerja Sama</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer with Direct Contact */}
        <div className="px-6 py-3 bg-[#071328] border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline Marketing: 0812-9988-7766</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5" />
              <span>iklan@arunnews.id</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Respon Cepat 1x24 Jam Kerja
          </span>
        </div>

      </div>
    </div>
  );
};
