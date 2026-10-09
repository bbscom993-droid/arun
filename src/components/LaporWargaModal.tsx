import React, { useState } from 'react';
import { X, Send, Megaphone, CheckCircle2, Shield, UploadCloud, MapPin, AlertCircle } from 'lucide-react';
import { Article } from '../types/news';

interface LaporWargaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (newArticle: Article) => void;
}

export const LaporWargaModal: React.FC<LaporWargaModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport
}) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [categoryType, setCategoryType] = useState('Infrastruktur');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [contactPhone, setContactPhone] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !city.trim()) return;

    const trackingId = 'ARUN-LAPOR-' + Math.floor(1000 + Math.random() * 9000);

    const newReportArticle: Article = {
      id: 'lapor-' + Date.now(),
      title: `Lapor Warga [${trackingId}]: ${title.trim()}`,
      slug: `lapor-warga-${Date.now()}`,
      summary: description.slice(0, 160) + (description.length > 160 ? '...' : ''),
      content: [
        `Laporan ini diterima redaksi Arun News melalui kanal Lapor Warga dari wilayah ${city.trim()} pada ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}.`,
        description.trim(),
        `Status Laporan: Dalam penelusuran dan koordinasi tim redaksi investigasi Arun News bersama instansi berwenang di ${city.trim()}.`,
        `Nomor Registrasi Laporan Publik: ${trackingId}. Identitas pelapor: ${isAnonymous ? 'Anonim (Dilindungi UU Pers)' : (reporterName || 'Warga Terverifikasi')}.`
      ],
      category: 'Lapor Warga',
      author: isAnonymous ? 'Warga Nusantara (Anonim)' : (reporterName.trim() || 'Aspirasi Warga'),
      editor: 'Redaksi Investigasi Arun News',
      city: city.trim(),
      publishedAt: 'Baru saja',
      readTimeMinutes: 2,
      image: '/src/assets/images/news_olahraga_stadion_1791478718927.jpg',
      imageCaption: `Dokumentasi laporan warga terkait ${title.trim()} di ${city.trim()}.`,
      views: 1,
      commentsCount: 0,
      reportStatus: 'Dalam Investigasi',
      reactions: {
        like: 1,
        impressed: 0,
        inspired: 1,
        sad: 0
      },
      tags: ['Lapor Warga', categoryType, city.trim(), 'Aspirasi Publik'],
      comments: []
    };

    onSubmitReport(newReportArticle);
    setSubmittedId(trackingId);
  };

  const handleReset = () => {
    setTitle('');
    setCity('');
    setDescription('');
    setReporterName('');
    setContactPhone('');
    setIsAnonymous(false);
    setSubmittedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#0b1b3b] text-slate-100 w-full max-w-2xl rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#08152e] border-b border-blue-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow">
              <Megaphone className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-editorial tracking-tight">
                Lapor Warga <span className="text-amber-400">Arun News</span>
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                Jembatan Aspirasi Warga dengan Redaksi &amp; Instansi Berwenang
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Tutup formulir"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedId ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-white font-editorial">
                Laporan Berhasil Diterbitkan!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Laporan Anda kini tampil di kanal <strong className="text-amber-400">Lapor Warga</strong> dan tim jurnalis Arun News segera memverifikasi serta menindaklanjuti ke instansi dinas terkait.
              </p>
              <div className="p-3 bg-[#08152e] border border-amber-500/30 rounded-xl inline-block">
                <span className="text-xs text-slate-400 block">Nomor Tiket Registrasi:</span>
                <span className="text-base font-mono font-bold text-amber-400 tracking-wider">
                  {submittedId}
                </span>
              </div>
              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Lihat Berita &amp; Selesai
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-blue-950/60 border border-blue-800/60 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Sesuai <strong>UU Pers &amp; Kode Etik</strong>, identitas pelapor dapat dirahasiakan sepenuhnya jika diminta. Sampaikan fakta yang dapat dipertanggungjawabkan.
                </span>
              </div>

              {/* Judul Laporan */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Judul Laporan / Peristiwa <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Jembatan Gantung Desa Karang Amblas Terputus Sejak Kemarin"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Lokasi & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Lokasi / Daerah Kejadian <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kab. Bogor, Jawa Barat"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Kategori Masalah
                  </label>
                  <select
                    value={categoryType}
                    onChange={(e) => setCategoryType(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Infrastruktur & Jalan">Infrastruktur &amp; Jalan</option>
                    <option value="Lingkungan & Limbah">Lingkungan &amp; Limbah</option>
                    <option value="Layanan Publik & Bansos">Layanan Publik &amp; Bansos</option>
                    <option value="Keamanan & Ketertiban">Keamanan &amp; Ketertiban</option>
                    <option value="Pendidikan & Kesehatan">Pendidikan &amp; Kesehatan</option>
                  </select>
                </div>
              </div>

              {/* Rincian Kejadian */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Uraian Detail Masalah &amp; Kronologi <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan secara runtut kronologi, dampak terhadap masyarakat sekitar, dan harapan tindakan dari instansi terkait..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                ></textarea>
              </div>

              {/* Identitas & Privasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    Nama Pelapor
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? 'Identitas Dirahasiakan' : 'Nama Lengkap Anda'}
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none ${
                      isAnonymous
                        ? 'bg-slate-800/50 border-slate-800 text-slate-500'
                        : 'bg-slate-900 border-slate-800 text-white focus:border-amber-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    WhatsApp / HP Konfirmasi Redaksi
                  </label>
                  <input
                    type="tel"
                    placeholder="08xxxxxxxxxx (Hanya untuk tim redaksi)"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Anonim Switch */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-700 text-amber-400 focus:ring-amber-400 w-4 h-4 bg-slate-900"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-slate-300 select-none cursor-pointer">
                  Rahasiakan nama saya (Tayangkan sebagai <strong>Warga Nusantara / Anonim</strong>)
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-blue-900/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Laporan Warga</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
