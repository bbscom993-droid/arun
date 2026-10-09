import React from 'react';
import { Article } from '../types/news';
import { Bookmark, X, Trash2, ArrowRight } from 'lucide-react';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a1a36] border-l border-amber-500/30 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-5 py-4 bg-[#071328] border-b border-blue-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Bookmark className="w-4 h-4 fill-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-editorial">Artikel Tersimpan</h3>
                <span className="text-[11px] text-amber-400 font-mono tabular-nums">
                  {savedArticles.length} artikel tersimpan untuk dibaca
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Tutup laci simpanan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {savedArticles.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-3">
                  <Bookmark className="w-6 h-6 text-amber-400/50" />
                </div>
                <p className="text-sm font-bold text-white font-editorial">Belum Ada Berita Tersimpan</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Tandai berita menarik dengan ikon bookmark untuk membacanya nanti kapan saja.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors"
                >
                  Jelajahi Berita Sekarang
                </button>
              </div>
            ) : (
              savedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="group p-3 rounded-xl bg-[#08152e] border border-blue-900/60 hover:border-amber-400/50 cursor-pointer transition-colors flex items-start gap-3"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] text-amber-400 mb-0.5">
                      <span className="font-semibold">{art.category}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveBookmark(art.id);
                        }}
                        className="text-slate-400 hover:text-rose-400 p-0.5"
                        title="Hapus simpanan"
                        aria-label="Hapus simpanan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-tight">
                      {art.title}
                    </h4>

                    <span className="text-[10px] text-slate-400 mt-1 block font-mono tabular-nums">
                      {art.readTimeMinutes} mnt baca · {art.city}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {savedArticles.length > 0 && (
            <div className="p-4 bg-[#071328] border-t border-blue-900/60 flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
              >
                Hapus Semua Simpanan
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Selesai
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
