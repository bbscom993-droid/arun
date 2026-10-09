import React, { useState, useEffect } from 'react';
import { X, Save, Sparkles, Image as ImageIcon, Eye, Tag, FileText, CheckCircle2 } from 'lucide-react';
import { Article, NewsCategory } from '../../types/news';

interface ArticleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  articleToEdit: Article | null;
}

const CATEGORIES: NewsCategory[] = [
  'Politik',
  'Olahraga',
  'Kriminal',
  'Ekonomi',
  'Daerah',
  'Lain-lain',
  'Lapor Warga',
  'Legalitas'
];

const PRESET_IMAGES = [
  { label: 'Politik / DPR', url: '/src/assets/images/hero_indonesia_summit_1791478680076.jpg' },
  { label: 'Ekonomi / Bursa IDX', url: '/src/assets/images/news_bursa_idx_1791478693881.jpg' },
  { label: 'Olahraga / Stadion GBK', url: '/src/assets/images/news_olahraga_stadion_1791478718927.jpg' },
  { label: 'Kriminal / Kepolisian', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80' },
  { label: 'Daerah / Pembangunan', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80' },
  { label: 'Legalitas / Pengadilan', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80' }
];

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  articleToEdit
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NewsCategory>('Politik');
  const [summary, setSummary] = useState('');
  const [contentParagraphs, setContentParagraphs] = useState<string>('');
  const [author, setAuthor] = useState('Tim Redaksi Arun News');
  const [editor, setEditor] = useState('Nurul Hidayati');
  const [city, setCity] = useState('Jakarta');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [imageCaption, setImageCaption] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState(3);
  const [tagsString, setTagsString] = useState('Arun News, Nusantara');
  const [isHeadline, setIsHeadline] = useState(false);
  const [legalRef, setLegalRef] = useState('');
  const [reportStatus, setReportStatus] = useState<'Dalam Investigasi' | 'Terverifikasi' | 'Ditindaklanjuti' | 'Selesai'>('Terverifikasi');

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setCategory(articleToEdit.category);
      setSummary(articleToEdit.summary);
      setContentParagraphs(articleToEdit.content.join('\n\n'));
      setAuthor(articleToEdit.author);
      setEditor(articleToEdit.editor);
      setCity(articleToEdit.city);
      setImage(articleToEdit.image);
      setImageCaption(articleToEdit.imageCaption);
      setReadTimeMinutes(articleToEdit.readTimeMinutes);
      setTagsString(articleToEdit.tags.join(', '));
      setIsHeadline(Boolean(articleToEdit.isHeadline));
      setLegalRef(articleToEdit.legalRef || '');
      setReportStatus(articleToEdit.reportStatus || 'Terverifikasi');
    } else {
      // Default new article template
      setTitle('');
      setCategory('Politik');
      setSummary('');
      setContentParagraphs('Paragraf 1: Tuliskan fakta 5W+1H berita utama di sini secara lugas dan terverifikasi.\n\nParagraf 2: Rincian latar belakang kejadian, pernyataan narasumber kredibel, dan data pendukung.');
      setAuthor('Dimas Wicaksono');
      setEditor('Nurul Hidayati');
      setCity('Jakarta');
      setImage(PRESET_IMAGES[0].url);
      setImageCaption('Dokumentasi resmi liputan Redaksi Arun News di lokasi kejadian.');
      setReadTimeMinutes(3);
      setTagsString('Politik, Kebijakan, Nasional');
      setIsHeadline(false);
      setLegalRef('');
      setReportStatus('Terverifikasi');
    }
  }, [articleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('Judul dan ringkasan berita wajib diisi.');
      return;
    }

    const paragraphs = contentParagraphs
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const tags = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const updatedArticle: Article = {
      id: articleToEdit ? articleToEdit.id : `art-custom-${Date.now()}`,
      title,
      slug: slug || `berita-${Date.now()}`,
      summary,
      content: paragraphs.length > 0 ? paragraphs : [summary],
      category,
      author: author || 'Redaksi Arun News',
      editor: editor || 'Nurul Hidayati',
      city: city || 'Jakarta',
      publishedAt: articleToEdit?.publishedAt || `${new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date())} WIB`,
      readTimeMinutes: Number(readTimeMinutes) || 3,
      image: image.trim() || PRESET_IMAGES[0].url,
      imageCaption: imageCaption.trim() || 'Foto: Dokumentasi Redaksi Arun News',
      views: articleToEdit ? articleToEdit.views : 120,
      commentsCount: articleToEdit ? articleToEdit.commentsCount : 0,
      isHeadline,
      isPopular: articleToEdit ? articleToEdit.isPopular : isHeadline,
      popularRank: articleToEdit?.popularRank,
      reportStatus: category === 'Lapor Warga' ? reportStatus : undefined,
      legalRef: category === 'Legalitas' ? legalRef : undefined,
      reactions: articleToEdit ? articleToEdit.reactions : { like: 10, impressed: 5, inspired: 4, sad: 0 },
      comments: articleToEdit ? articleToEdit.comments : [],
      tags: tags.length > 0 ? tags : [category, 'Arun News']
    };

    onSave(updatedArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#09152b] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-200">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#061021] border-b border-blue-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-editorial">
                {articleToEdit ? 'Edit Berita Redaksi' : 'Tulis Berita Baru (CMS Arun News)'}
              </h2>
              <p className="text-xs text-slate-400">
                Patuhi Kode Etik Jurnalistik &amp; Pedoman Pemberitaan Media Siber
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[78vh] overflow-y-auto space-y-5 text-xs">
          
          {/* Baris 1: Judul Berita */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Judul Berita (Headline) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Putusan Pengadilan Negeri Kabulkan Gugatan Hak Masyarakat Adat..."
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Baris 2: Kategori & Kota & Waktu Baca & Headline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Kategori Berita</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Lokasi / Kota Liputan</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Jakarta / Lampung / Surabaya"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              >
              </input>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Estimasi Baca (Menit)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={readTimeMinutes}
                onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer p-2 bg-slate-900/60 border border-slate-700/80 rounded-xl hover:border-amber-400/50">
                <input
                  type="checkbox"
                  checked={isHeadline}
                  onChange={(e) => setIsHeadline(e.target.checked)}
                  className="rounded text-amber-400 focus:ring-amber-400 h-4 w-4 bg-slate-950 border-slate-600"
                />
                <span className="font-semibold text-amber-300 text-[11px]">Pin Lead Utama (Headline)</span>
              </label>
            </div>
          </div>

          {/* Conditional Fields: Lapor Warga / Legalitas */}
          {category === 'Lapor Warga' && (
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-between gap-4">
              <span className="font-semibold text-amber-300">Status Tindak Lanjut Aduan Warga:</span>
              <select
                value={reportStatus}
                onChange={(e) => setReportStatus(e.target.value as any)}
                className="bg-[#061021] border border-amber-400/40 rounded-lg px-3 py-1.5 text-white"
              >
                <option value="Dalam Investigasi">Dalam Investigasi</option>
                <option value="Terverifikasi">Terverifikasi</option>
                <option value="Ditindaklanjuti">Ditindaklanjuti</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          )}

          {category === 'Legalitas' && (
            <div className="p-3 bg-blue-950/60 border border-blue-500/40 rounded-xl space-y-1">
              <label className="block font-semibold text-blue-300">Referensi Dasar Hukum / No. Putusan:</label>
              <input
                type="text"
                value={legalRef}
                onChange={(e) => setLegalRef(e.target.value)}
                placeholder="Contoh: Putusan MK No. 168/PUU-XXI/2023 atau UU No. 40 Tahun 1999"
                className="w-full bg-[#040b17] border border-slate-700 rounded-lg px-3 py-1.5 text-white"
              />
            </div>
          )}

          {/* Baris 3: Ringkasan (Lead Berita) */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Ringkasan Berita (Lead Summary) <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tuliskan 1-2 kalimat pengantar padat dan faktual..."
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          {/* Baris 4: Isi Berita (Paragraf demi Paragraf) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-slate-300 font-semibold">
                Isi Lengkap Berita (Pisahkan antar-paragraf dengan 2x Enter / Baris Baru)
              </label>
              <span className="text-[11px] text-amber-400/80">Format Jurnalistik Multi-Paragraf</span>
            </div>
            <textarea
              rows={6}
              value={contentParagraphs}
              onChange={(e) => setContentParagraphs(e.target.value)}
              placeholder="Paragraf 1...&#10;&#10;Paragraf 2...&#10;&#10;Paragraf 3..."
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-amber-400 font-sans leading-relaxed text-xs"
            />
          </div>

          {/* Baris 5: Foto & Caption */}
          <div className="space-y-3 p-4 bg-[#061021] border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                Foto Utama Berita &amp; Keterangan (Caption)
              </span>
              <span className="text-[10px] text-slate-400">Pilih dari preset atau masukkan link URL</span>
            </div>

            {/* Presets Button */}
            <div className="flex flex-wrap gap-2">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setImage(img.url)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] border transition-colors ${
                    image === img.url
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">URL Gambar Foto:</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/... atau /src/assets/images/..."
                  className="w-full bg-[#040b17] border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">Keterangan Foto (Caption):</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Contoh: Suasana ruang sidang paripurna DPR RI di Senayan..."
                  className="w-full bg-[#040b17] border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>
            </div>
          </div>

          {/* Baris 6: Wartawan & Editor & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Penulis / Wartawan</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Dimas Wicaksono"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Editor / Redaktur</label>
              <input
                type="text"
                value={editor}
                onChange={(e) => setEditor(e.target.value)}
                placeholder="Nurul Hidayati"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tags (Pisahkan koma)</label>
              <input
                type="text"
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
                placeholder="Politik, DPR, KPU, Pilkada"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>{articleToEdit ? 'Simpan Perubahan Berita' : 'Terbitkan Berita Baru'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
