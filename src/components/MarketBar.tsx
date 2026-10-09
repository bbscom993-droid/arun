import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { MARKET_TICKER_DATA } from '../data/newsData';

export const MarketBar: React.FC = () => {
  return (
    <div className="w-full bg-[#0d203f] border-b border-blue-900/40 text-slate-300 py-1.5 px-4 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-amber-400 font-bold shrink-0">
          <DollarSign className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wider text-[11px]">Pasar & Finansial:</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto">
          {MARKET_TICKER_DATA.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5 whitespace-nowrap text-xs">
              <span className="text-slate-400 font-medium">{item.name}</span>
              <span className="font-mono tabular-nums font-semibold text-slate-100">{item.value}</span>
              <span
                className={`flex items-center font-mono tabular-nums text-[11px] font-bold ${
                  item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {item.isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                )}
                {item.change}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Bursa Saham BEI Aktif</span>
        </div>
      </div>
    </div>
  );
};
