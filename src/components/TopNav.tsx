import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Sun, Moon, Megaphone } from 'lucide-react';
import { NewsCategory } from '../types/news';

interface TopNavProps {
  activeCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  onOpenLaporWarga: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigateRedaksi?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenBookmarks,
  onOpenLaporWarga,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
      };
      setCurrentDateTime(new Intl.DateTimeFormat('id-ID', options).format(now) + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks: { label: string; category: NewsCategory }[] = [
    { label: 'Semua', category: 'Semua' },
    { label: 'Politik', category: 'Politik' },
    { label: 'Olahraga', category: 'Olahraga' },
    { label: 'Kriminal', category: 'Kriminal' },
    { label: 'Ekonomi', category: 'Ekonomi' },
    { label: 'Daerah', category: 'Daerah' },
    { label: 'Lain-lain', category: 'Lain-lain' },
    { label: 'Lapor Warga', category: 'Lapor Warga' },
    { label: 'Legalitas', category: 'Legalitas' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A1A36] text-slate-100 border-b border-amber-500/25 shadow-md">
      {/* 1. Top Utility Ribbon */}
      <div className="border-b border-slate-800/80 bg-[#071326] px-4 lg:px-8 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date & Location */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              PORTAL RESMI
            </span>
            <span className="hidden sm:inline text-slate-400" aria-hidden="true">·</span>
            <span className="text-slate-300 font-mono tabular-nums">{currentDateTime || 'Kamis, 8 Oktober 2026 WIB'}</span>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">·</span>
            <span className="hidden md:inline text-amber-300 font-medium italic">
              "Jembatan Media Nusantara"
            </span>
          </div>

          {/* Right: Trust indicator & Edition */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Terverifikasi Dewan Pers RI</span>
            </span>
            <span className="hidden lg:inline text-slate-600" aria-hidden="true">·</span>
            <span className="hidden lg:inline text-slate-400">24 Jam Non-Stop</span>
          </div>
        </div>
      </div>

      {/* 2. Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with Tagline */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('Semua');
            }}
            className="group flex flex-col focus-visible:outline-amber-400"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors font-editorial">
                ARUN<span className="text-amber-400">.</span>NEWS
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-amber-300/95 uppercase -mt-1 hidden sm:block">
              Jembatan Media Nusantara
            </span>
          </a>
        </div>

        {/* Zone 2: Clean Text Navigation Links (Single-line, no pills) */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-300">
          {navLinks.map((item) => {
            const isActive = activeCategory === item.category;
            const isLapor = item.category === 'Lapor Warga';
            return (
              <button
                key={item.category}
                onClick={() => onSelectCategory(item.category)}
                className={`transition-colors whitespace-nowrap relative py-1 focus-visible:outline-amber-400 ${
                  isActive
                    ? 'text-amber-400 font-bold'
                    : isLapor
                    ? 'text-amber-300 hover:text-amber-200 font-bold'
                    : 'hover:text-amber-300 text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Lapor Warga Action Button */}
          <button
            onClick={onOpenLaporWarga}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap"
            title="Kirim Laporan Warga Baru"
          >
            <Megaphone className="w-3.5 h-3.5 fill-slate-950" />
            <span>Lapor Warga</span>
          </button>

          {/* Search Toggle / Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-[#071326] border border-amber-500/40 rounded-lg px-2.5 py-1.5 shadow-inner">
                <Search className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-32 sm:w-44"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-xs text-slate-400 hover:text-white ml-1 px-1"
                  aria-label="Tutup pencarian"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-colors focus-visible:outline-amber-400"
                aria-label="Cari Berita"
                title="Cari Berita"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bookmark Drawer Trigger */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-amber-300 bg-slate-900 border border-slate-800 hover:border-amber-400/40 transition-colors rounded-lg shadow-sm whitespace-nowrap"
            title="Lihat Artikel Tersimpan"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Tersimpan</span>
            <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold flex items-center justify-center font-mono tabular-nums">
              {savedCount}
            </span>
          </button>

          {/* Contrast / Dark Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg transition-colors focus-visible:outline-amber-400"
            title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
            aria-label="Ubah tema"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Category Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-[#0c1e3d] border-t border-slate-800 text-xs font-semibold text-slate-300 no-scrollbar">
        {navLinks.map((item) => (
          <button
            key={item.category}
            onClick={() => onSelectCategory(item.category)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg transition-colors ${
              activeCategory === item.category
                ? 'text-slate-950 bg-amber-400 font-bold'
                : 'text-slate-300 hover:text-white bg-slate-800/40'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
