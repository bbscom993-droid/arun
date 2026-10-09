import React from 'react';
import { Megaphone, ExternalLink, Sparkles } from 'lucide-react';

interface AdLeaderboardProps {
  onOpenIklan: (formatName?: string) => void;
}

export const AdLeaderboard: React.FC<AdLeaderboardProps> = ({ onOpenIklan }) => {
  return (
    <div className="w-full bg-[#08152b] py-2.5 px-4 lg:px-8 border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0a2046] via-[#102d62] to-[#0a2046] border border-amber-500/30 p-3 sm:px-6 sm:py-3.5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Ad Label Tag */}
          <div className="absolute top-1 right-2 text-[9px] uppercase tracking-wider text-slate-400 font-mono">
            Ruang Iklan Resmi · 970x90
          </div>

          {/* Left Content */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow">
              <Sparkles className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs sm:text-sm font-bold text-white font-editorial tracking-tight">
                  Tingkatkan Jangkauan Brand Anda Bersama Arun News
                </span>
                <span className="hidden md:inline text-[10px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                  SLOT PREMIUM
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                Jangkau lebih dari 4,8 juta pembaca pengambil keputusan &amp; masyarakat berdaya beli tinggi di 38 provinsi.
              </p>
            </div>
          </div>

          {/* Right Action Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenIklan('Top Header Leaderboard Banner')}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs font-bold rounded-lg shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Pasang Iklan di Sini</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
