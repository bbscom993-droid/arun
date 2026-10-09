import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ShieldCheck, Sparkles, Bell, Clock, Users } from 'lucide-react';

export const NewsletterDigest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Politik & Kebijakan',
    'Ekonomi & Bisnis',
    'Daerah & Lapor Warga'
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState('');

  const availableTopics = [
    'Politik & Kebijakan',
    'Ekonomi & Bisnis',
    'Kriminal & Hukum',
    'Daerah & Lapor Warga',
    'Olahraga & Timnas',
    'Inovasi & Legalitas'
  ];

  const handleToggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setConfirmedEmail(email.trim());
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#09152a] via-[#0c1f44] to-[#071328] py-14 px-4 lg:px-8 border-t border-amber-500/25 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-[#091a38] border border-amber-500/35 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          
          {isSubscribed ? (
            /* Subscribed Success View */
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                  BERHASIL BERLANGGANAN
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-editorial">
                  Selamat Datang di Warta Pagi Arun News!
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Email konfirmasi telah dikirimkan ke <strong className="text-amber-400">{confirmedEmail}</strong>. Edisi pertama kurasi berita <strong className="text-white">{frequency === 'daily' ? 'Harian (06.00 WIB)' : 'Mingguan'}</strong> akan mulai masuk ke kotak surat Anda.
              </p>

              <div className="p-4 bg-[#071329] border border-blue-900/60 rounded-xl max-w-md mx-auto text-xs text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Jadwal Pengiriman:</span>
                  <span className="text-amber-300 font-bold font-mono">
                    {frequency === 'daily' ? 'Setiap Hari Pukul 06.00 WIB' : 'Setiap Sabtu Pagi'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Topik Terpilih:</span>
                  <span className="text-white font-medium">{selectedTopics.length} Kategori Berita</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Ubah Pengaturan Berlangganan
                </button>
              </div>
            </div>
          ) : (
            /* Signup Form View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Headline & Benefits */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                    WARTA PAGI REDAKSI · DAILY DIGEST
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight font-editorial text-balance">
                  Awali Hari dengan 5 Berita Terpenting Nusantara Langsung di Email Anda
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dapatkan rangkuman eksklusif analisis politik, dinamika pasar bursa, putusan hukum terkini, dan investigasi aspirasi daerah sebelum Anda memulai aktivitas pagi.
                </p>

                {/* Social Proof Stats */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span><strong className="text-white font-mono tabular-nums">64.200+</strong> Pembaca Aktif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Terkirim Pukul <strong className="text-white font-mono">06.00 WIB</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Bebas Spam · Sekali Klik Berhenti</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Subscription Form */}
              <div className="lg:col-span-5 bg-[#08152e] border border-blue-900/70 rounded-xl p-5 sm:p-6 shadow-inner space-y-4">
                
                {/* Frequency Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Frekuensi Pengiriman:
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-[#061124] p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setFrequency('daily')}
                      className={`py-1.5 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
                        frequency === 'daily'
                          ? 'bg-amber-400 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Harian (06.00 WIB)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('weekly')}
                      className={`py-1.5 px-3 rounded-lg font-bold transition-all text-center cursor-pointer ${
                        frequency === 'weekly'
                          ? 'bg-amber-400 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Mingguan (Sabtu)
                    </button>
                  </div>
                </div>

                {/* Topic Preferences Chips */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Pilih Topik Minat Anda:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableTopics.map((topic) => {
                      const isSelected = selectedTopics.includes(topic);
                      return (
                        <button
                          type="button"
                          key={topic}
                          onClick={() => handleToggleTopic(topic)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 font-semibold'
                              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Alamat Email Anda:
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 active:scale-[0.99] text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Daftar Gratis Warta Pagi</span>
                  </button>
                </form>

                <p className="text-[10px] text-slate-400 text-center leading-tight">
                  Dengan mendaftar, Anda menyetujui Pedoman Privasi Arun News. Tanpa spam, batalkan kapan saja.
                </p>

              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
