import React from 'react';
import { Article, NewsCategory } from '../types/news';
import { Bookmark, Eye, MessageSquare, Filter, X, Megaphone, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onOpenLaporWarga: () => void;
  onOpenIklan?: (formatName?: string) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onOpenLaporWarga,
  onOpenIklan
}) => {
  const categories: NewsCategory[] = [
    'Semua',
    'Politik',
    'Olahraga',
    'Kriminal',
    'Ekonomi',
    'Daerah',
    'Lain-lain',
    'Lapor Warga',
    'Legalitas'
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 border-t border-blue-900/40">
      {/* Category Tabs & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-editorial">
              {searchQuery 
                ? `Hasil Pencarian: "${searchQuery}"` 
                : activeCategory === 'Semua' 
                ? 'Kanal Berita Terkini & Investigasi' 
                : `Kanal ${activeCategory}`}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Arun News — Jembatan Media Nusantara menyajikan informasi berimbang, transparan, dan tepercaya.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar p-1 bg-[#07152d] border border-blue-900/60 rounded-xl">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const isLapor = cat === 'Lapor Warga';
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : isLapor
                    ? 'text-amber-300 hover:text-white hover:bg-slate-800/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lapor Warga Callout Banner when in Lapor Warga category or on Semua */}
      {activeCategory === 'Lapor Warga' && (
        <div className="my-6 bg-gradient-to-r from-[#0d234d] via-[#102b5e] to-[#0a1c3d] border border-amber-500/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Megaphone className="w-4 h-4 fill-amber-400" />
              <span>JURNALISME WARGA &amp; ADVOKASI PUBLIK</span>
            </div>
            <h3 className="text-lg font-bold text-white font-editorial">
              Punya Keluhan Pelayanan Publik, Jalan Rusak, atau Peristiwa di Daerah Anda?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Arun News menjadi jembatan langsung ke pihak berwenang. Kirimkan laporan fakta lapangan Anda, tim redaksi kami siap mengawal hingga tuntas.
            </p>
          </div>
          <button
            onClick={onOpenLaporWarga}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-all whitespace-nowrap flex items-center gap-2"
          >
            <Megaphone className="w-4 h-4" />
            <span>Kirim Laporan Baru</span>
          </button>
        </div>
      )}

      {/* Active Search Notice */}
      {searchQuery && (
        <div className="my-4 flex items-center justify-between bg-amber-400/10 border border-amber-400/30 rounded-lg px-4 py-2 text-xs text-amber-300">
          <span>Menampilkan hasil pencarian untuk kata kunci <strong>"{searchQuery}"</strong></span>
          <button
            onClick={onClearSearch}
            className="flex items-center gap-1 font-bold text-amber-400 hover:text-amber-200"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Pencarian</span>
          </button>
        </div>
      )}

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-4">
            <Filter className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white font-editorial">Tidak ada berita pada kanal ini</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Coba pilih kanal berita yang berbeda atau reset filter pencarian.
          </p>
          <button
            onClick={() => {
              onClearSearch();
              onSelectCategory('Semua');
            }}
            className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors"
          >
            Lihat Semua Berita
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art, index) => {
            const bookmarked = isBookmarked(art.id);
            return (
              <React.Fragment key={art.id}>
                <article
                  onClick={() => onSelectArticle(art)}
                  className="group bg-[#091a38] border border-blue-900/60 hover:border-amber-400/40 rounded-xl overflow-hidden shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                <div>
                  {/* Media container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091a38] via-transparent to-transparent"></div>

                    {/* Category Label */}
                    <div className="absolute top-3 left-3 bg-[#08152b]/90 backdrop-blur border border-amber-400/30 text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded">
                      {art.category}
                    </div>

                    {/* Report Status or Legal Indicator */}
                    {art.reportStatus && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                          art.reportStatus === 'Ditindaklanjuti' 
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-amber-500 text-slate-950'
                        }`}>
                          {art.reportStatus}
                        </span>
                      </div>
                    )}

                    {art.legalRef && (
                      <div className="absolute bottom-2.5 left-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded shadow bg-blue-600 text-white flex items-center gap-1">
                          <Scale className="w-3 h-3" />
                          <span>{art.legalRef}</span>
                        </span>
                      </div>
                    )}

                    {/* Bookmark action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(art.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur transition-all ${
                        bookmarked
                          ? 'bg-amber-400 text-slate-950 shadow'
                          : 'bg-slate-900/70 text-slate-300 hover:text-amber-400'
                      }`}
                      title={bookmarked ? 'Hapus Simpanan' : 'Simpan Berita'}
                      aria-label="Simpan Berita"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-slate-950' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <span>{art.city}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.publishedAt.split(',')[1]?.trim() || art.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readTimeMinutes} mnt baca</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug font-editorial">
                      {art.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                {/* Footer metrics */}
                <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                  <span className="text-slate-400 truncate max-w-[130px]">Oleh: {art.author.split(' ')[0]}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-amber-400" />
                      {art.views.toLocaleString('id-ID')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-amber-400" />
                      {art.commentsCount}
                    </span>
                  </div>
                </div>
              </article>

              {/* Slot 4: In-Feed Native Sponsored Card */}
              {index === 2 && (
                <article
                  key="native-ad-feed"
                  onClick={() => onOpenIklan?.('In-Feed Native Grid Card & Sponsored')}
                  className="group bg-gradient-to-br from-[#0a2046] via-[#0d2859] to-[#081836] border border-amber-500/40 hover:border-amber-400 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div>
                    {/* Media container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 flex items-center justify-center p-6 text-center">
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                          <Megaphone className="w-6 h-6 fill-slate-950" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 font-mono">
                            KEMITRAAN RESMI · NATIVE AD
                          </span>
                          <h4 className="text-sm font-bold text-white mt-1 font-editorial">
                            Slot Iklan In-Feed Native Grid
                          </h4>
                        </div>
                      </div>
                      
                      <div className="absolute top-3 left-3 bg-amber-400/90 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                        BERSAMPUL SPONSOR
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[11px] text-amber-300/80 mb-2">
                        <span>Nasional</span>
                        <span aria-hidden="true">·</span>
                        <span>Media Kit Arun News</span>
                        <span aria-hidden="true">·</span>
                        <span>Jangkauan 38 Provinsi</span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug font-editorial">
                        Posisikan Berita &amp; Promo Brand Anda di Garis Depan Bersama Arun News
                      </h3>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        Tampil natural bersama artikel redaksi dengan CTR tinggi, bebas ad-blocker dan menjangkau ribuan pembaca setia.
                      </p>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Hubungi Redaksi Bisnis</span>
                    <span className="text-amber-400 font-bold group-hover:underline flex items-center gap-1">
                      Pasang Iklan →
                    </span>
                  </div>
                </article>
              )}
            </React.Fragment>
          );
        })}
        </div>
      )}
    </section>
  );
};
