import React from 'react';
import { Article } from '../types/news';
import { Bookmark, Eye, MessageSquare, Clock, ArrowUpRight, Flame, Megaphone } from 'lucide-react';

interface HeroLeadProps {
  headlineArticle: Article;
  secondaryArticles: Article[];
  popularArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onOpenIklan?: (formatName?: string) => void;
}

export const HeroLead: React.FC<HeroLeadProps> = ({
  headlineArticle,
  secondaryArticles,
  popularArticles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onOpenIklan
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      {/* 3-Column Editorial Grid: Lead Story (7 cols) + Secondary Spotlight & detikTerpopuler (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* === TIER 1: LEAD HEADLINE (7 Columns) === */}
        <div className="lg:col-span-7 flex flex-col group">
          {/* Main Visual Frame with Zero-Broken-Image Fallback */}
          <div 
            onClick={() => onSelectArticle(headlineArticle)}
            className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-amber-500/30 cursor-pointer shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
          >
            <img
              src={headlineArticle.image}
              alt={headlineArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              onError={(e) => {
                // Graceful CSS fallback container if image fails
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08152b] via-[#08152b]/40 to-transparent"></div>

            {/* Floating Top Lead Indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider shadow">
                FOKUS UTAMA
              </span>
              <span className="bg-[#0b1b3d]/90 backdrop-blur text-amber-300 text-xs font-medium px-2.5 py-1 rounded border border-amber-400/30">
                {headlineArticle.city}
              </span>
            </div>

            {/* Quick Bookmark Float */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(headlineArticle.id);
              }}
              className={`absolute top-4 right-4 p-2.5 rounded-lg backdrop-blur transition-all ${
                isBookmarked(headlineArticle.id)
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900/70 text-slate-200 hover:text-amber-400'
              }`}
              title={isBookmarked(headlineArticle.id) ? 'Hapus Simpanan' : 'Simpan Berita'}
              aria-label="Simpan Berita"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked(headlineArticle.id) ? 'fill-slate-950' : ''}`} />
            </button>

            {/* Caption on media base */}
            <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-300/90 italic truncate">
              {headlineArticle.imageCaption}
            </div>
          </div>

          {/* Lead Headline Narrative */}
          <div className="mt-4 flex flex-col">
            {/* Unboxed Metadata with separators (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide">
              <span>{headlineArticle.category}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">{headlineArticle.publishedAt}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-400">{headlineArticle.readTimeMinutes} menit baca</span>
            </div>

            <h1
              onClick={() => onSelectArticle(headlineArticle)}
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight font-editorial hover:text-amber-300 transition-colors cursor-pointer text-balance"
            >
              {headlineArticle.title}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
              {headlineArticle.summary}
            </p>

            {/* Lead Meta Footer & Read Trigger */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="text-slate-300 font-medium">Oleh: {headlineArticle.author}</span>
                <span className="flex items-center gap-1 font-mono tabular-nums text-slate-400">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  {headlineArticle.views.toLocaleString('id-ID')}
                </span>
                <span className="flex items-center gap-1 font-mono tabular-nums text-slate-400">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  {headlineArticle.commentsCount} Komentar
                </span>
              </div>

              <button
                onClick={() => onSelectArticle(headlineArticle)}
                className="flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 transition-colors group/btn"
              >
                <span>Baca Selengkapnya</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* === TIER 2 & TIER 3: POPULAR & SPOTLIGHT COLUMN (5 Columns) === */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* ArunTerpopuler Box */}
          <div className="bg-[#0a1936] rounded-xl border border-amber-500/30 p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h2 className="text-lg font-bold text-white tracking-tight font-editorial">
                  Arun<span className="text-amber-400">Terpopuler</span>
                </h2>
              </div>
              <span className="text-[11px] font-mono tabular-nums text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                REAL-TIME TRENDING
              </span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {popularArticles.map((art, index) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="py-3.5 first:pt-3.5 last:pb-1 flex items-start gap-4 group cursor-pointer hover:bg-slate-800/30 px-2 -mx-2 rounded-lg transition-colors"
                >
                  {/* Big Stylized Ranking Number */}
                  <span className="font-editorial text-2xl lg:text-3xl font-black text-amber-400 font-mono tabular-nums shrink-0 w-8">
                    0{index + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Unboxed category & timestamp */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                      <span className="text-amber-400 font-semibold">{art.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.publishedAt.split(',')[1]?.trim() || art.publishedAt}</span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-400 font-mono tabular-nums">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-400" />
                        {art.views.toLocaleString('id-ID')}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-slate-400" />
                        {art.commentsCount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Spotlight Card from Secondary Features */}
          {secondaryArticles[0] && (
            <div 
              onClick={() => onSelectArticle(secondaryArticles[0])}
              className="bg-[#091a38] border border-blue-900/60 hover:border-amber-400/40 rounded-xl overflow-hidden shadow-md cursor-pointer group transition-all"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={secondaryArticles[0].image}
                  alt={secondaryArticles[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091a38] via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-amber-300 font-semibold">
                  <span>SOROTAN KHUSUS</span>
                  <span className="text-slate-300 font-normal">{secondaryArticles[0].category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug font-editorial">
                  {secondaryArticles[0].title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {secondaryArticles[0].summary}
                </p>
              </div>
            </div>
          )}

          {/* Sidebar Sticky Rectangle Ad Slot (300x250) */}
          <div className="bg-gradient-to-br from-[#08152e] to-[#0d234d] border border-amber-500/30 rounded-xl p-4 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider">Kemitraan Komersial</span>
              <span>Slot 300x250 px</span>
            </div>
            
            <div className="py-3 text-center space-y-1.5">
              <span className="text-xs font-bold text-white font-editorial block">
                Ruang Promosi Strategis ArunTerpopuler
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed max-w-xs mx-auto">
                Tampilkan produk atau pesan kampanye brand Anda tepat di sebelah daftar berita paling viral hari ini.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">1,2 Juta+ Pembaca / Pekan</span>
              <button
                onClick={() => onOpenIklan?.('Sidebar Sticky Rectangle')}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Megaphone className="w-3 h-3" />
                <span>Pasang Iklan</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
