import React from 'react';
import { Zap, Volume2, ArrowRight } from 'lucide-react';
import { BREAKING_NEWS_ITEMS } from '../data/newsData';

interface BreakingTickerProps {
  onSelectHeadline: (headline: string) => void;
  items?: string[];
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ onSelectHeadline, items }) => {
  const tickerItems = items && items.length > 0 ? items : BREAKING_NEWS_ITEMS;

  return (
    <div className="w-full bg-[#08152b] border-b border-amber-500/20 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex items-center gap-3 overflow-hidden">
        {/* Flash Label */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase shrink-0 shadow-sm">
          <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          <span>FLASH NEWS</span>
        </div>

        {/* Marquee ticker container */}
        <div className="relative flex-1 overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium cursor-pointer">
            {tickerItems.concat(tickerItems).map((item, index) => (
              <span
                key={index}
                onClick={() => onSelectHeadline(item)}
                className="hover:text-amber-300 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>{item}</span>
                <span className="text-amber-500/60 font-bold" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Tip indicator */}
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
          <span>Arahkan kursor untuk jeda</span>
        </div>
      </div>
    </div>
  );
};
