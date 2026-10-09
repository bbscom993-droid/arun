import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Newspaper, Coffee } from 'lucide-react';
import { EDITORIAL_CHANNELS } from '../data/newsData';
import { SawerKopiModal } from './SawerKopiModal';

interface FooterProps {
  onOpenIklan?: () => void;
  onNavigateRedaksi?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenIklan }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSawerKopiOpen, setIsSawerKopiOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#061021] text-slate-300 border-t border-amber-500/30 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-blue-900/60">
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white font-editorial">
                ARUN<span className="text-amber-400">.</span>NEWS
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">
                Jembatan Media Nusantara
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Portal berita independen dan jurnalisme investigasi yang menjadi jembatan informasi tepercaya rakyat Nusantara. Menyajikan fakta lugas tentang politik, kriminal, daerah, legalitas, serta wadah aspirasi lapor warga 24 jam.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Terverifikasi Dewan Pers RI · Mematuhi Pedoman Pemberitaan Media Siber</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#08152e] border border-blue-900/60 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4" />
              <span>WARTA PAGI REDAKSI</span>
            </div>
            <h3 className="text-base font-bold text-white font-editorial">
              Dapatkan Kurasi Berita Penting Setiap Pukul 06.00 WIB
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Rangkuman analisis politik, pergerakan bursa, dan inovasi teknologi langsung di kotak masuk Anda.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Terima kasih! Email Anda telah terdaftar dalam buletin harian Warta Pagi.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Masukkan alamat email Anda..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 text-xs rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Langganan</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Channels Grid */}
        <div className="py-10 border-b border-blue-900/60">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
            KANAL RESMI ARUN NEWS MEDIA (8 KANAL UTAMA)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            {EDITORIAL_CHANNELS.map((ch) => (
              <div key={ch.name} className="p-3 bg-[#08152e]/50 border border-slate-800/80 rounded-xl hover:border-amber-400/40 transition-colors">
                <span className="text-xs font-bold text-white block">{ch.name}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5 line-clamp-2">{ch.desc}</span>
                <span className="text-[10px] text-amber-400/90 font-mono tabular-nums block mt-1">{ch.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Navigation */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            {/* Tombol Sawer Kopi Redaksi di Footer (dekat Tentang Kami) */}
            <button
              onClick={() => setIsSawerKopiOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-lg shadow transition-all active:scale-95 cursor-pointer"
              title="Sawer Secangkir Kopi untuk Redaksi Arun News"
            >
              <Coffee className="w-3.5 h-3.5 fill-slate-950" />
              <span>Sawer Kopi Redaksi</span>
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a href="#about" className="hover:text-amber-400 transition-colors">Tentang Kami</a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a href="#pedoman" className="hover:text-amber-400 transition-colors">Pedoman Media Siber</a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a href="#karier" className="hover:text-amber-400 transition-colors">Karier Wartawan</a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={onOpenIklan}
              className="hover:text-amber-400 transition-colors cursor-pointer text-amber-300 font-semibold"
            >
              Kerja Sama &amp; Pasang Iklan
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a href="#kontak" className="hover:text-amber-400 transition-colors">Kontak Pengaduan</a>
          </div>

          <div className="text-[11px] text-slate-500 font-mono tabular-nums text-center md:text-right">
            © 2026 ARUN NEWS — JEMBATAN MEDIA NUSANTARA. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>

      </div>

      {/* Popup Sawer Kopi */}
      <SawerKopiModal
        isOpen={isSawerKopiOpen}
        onClose={() => setIsSawerKopiOpen(false)}
      />
    </footer>
  );
};
