import React from 'react';
import { Article } from '../types/news';
import { Quote, Feather, BookOpen, ArrowRight } from 'lucide-react';

interface OpinionSectionProps {
  opinionArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  opinionArticles,
  onSelectArticle
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="bg-gradient-to-br from-[#0a1a36] to-[#0c224b] rounded-2xl border border-amber-500/30 p-6 lg:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-amber-500/20 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-editorial tracking-tight">
                Arun<span className="text-amber-400">Analisis</span>: Gagasan, Legalitas &amp; Kebijakan Publik
              </h2>
              <p className="text-xs text-slate-300">
                Ulasan mendalam pakar hukum, akademisi, dan analis kebijakan di Nusantara.
              </p>
            </div>
          </div>
          <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider self-start sm:self-auto">
            RUANG OPINI TERKURASI
          </span>
        </div>

        {/* Opinion Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opinionArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="group bg-[#08152b] border border-blue-900/60 hover:border-amber-400/50 rounded-xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Author Avatar & Bylines */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold flex items-center justify-center text-sm shadow">
                    {art.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {art.author}
                    </h4>
                    <p className="text-[11px] text-amber-400/90 font-medium">{art.city}</p>
                  </div>
                </div>

                {/* Pull Quote Mark */}
                <Quote className="w-6 h-6 text-amber-400/40 mb-2" />

                <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors font-editorial leading-snug">
                  {art.title}
                </h3>

                <p className="mt-2.5 text-xs text-slate-300 line-clamp-3 leading-relaxed italic">
                  "{art.summary}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
                <span>{art.readTimeMinutes} menit baca</span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Baca Esai <ArrowRight className="w-3.5 h-3.5 inline" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
