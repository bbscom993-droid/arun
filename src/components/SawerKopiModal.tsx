import React, { useState } from 'react';
import { X, Coffee, Heart, CheckCircle2, QrCode, Sparkles, Send, ShieldCheck, CreditCard } from 'lucide-react';

interface SawerKopiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SawerKopiModal: React.FC<SawerKopiModalProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [supporterName, setSupporterName] = useState<string>('');
  const [supporterMessage, setSupporterMessage] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'ewallet' | 'va'>('qris');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const coffeePackages = [
    { amount: 10000, cups: 1, label: '1 Cangkir Kopi', desc: 'Penyemangat liputan harian' },
    { amount: 25000, cups: 2, label: '2 Cangkir Kopi', desc: 'Dukungan kopi tim investigasi' },
    { amount: 50000, cups: 4, label: 'Paket Kopi Redaksi', desc: 'Bahan bakar riset fakta lapangan' },
    { amount: 100000, cups: 8, label: 'Kopi & Liputan Khusus', desc: 'Dukungan penuh jurnalisme independen' },
  ];

  const recentSupporters = [
    { name: 'Hendra Gunawan', amount: 'Rp 25.000', msg: 'Tetap kritis dan independen, Arun News!', time: '10 menit lalu' },
    { name: 'Warga Peduli Natuna', amount: 'Rp 50.000', msg: 'Terima kasih atas liputan dermaga daerah kami.', time: '35 menit lalu' },
    { name: 'Hamba Allah', amount: 'Rp 10.000', msg: 'Semangat untuk seluruh jurnalis di lapangan.', time: '1 jam lalu' }
  ];

  const handleSelectPackage = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) {
      setSelectedAmount(Number(val));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSupporterName('');
    setSupporterMessage('');
    onClose();
  };

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#0b1b3b] text-slate-100 w-full max-w-lg rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#08152e] via-[#0e244d] to-[#08152e] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Coffee className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-editorial tracking-tight">
                  Sawer Kopi <span className="text-amber-400">Redaksi</span>
                </h3>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                  ARUN NEWS
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Apresiasi secangkir kopi untuk menjaga jurnalisme independen
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Tutup popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/50 flex items-center justify-center">
                <Coffee className="w-8 h-8 fill-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-white font-editorial">
                Terima Kasih Banyak atas Saweran Kopinya!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Apresiasi sebesar <strong className="text-amber-400">Rp {activeAmount.toLocaleString('id-ID')}</strong> dari <strong className="text-white">{supporterName.trim() || 'Pembaca Setia'}</strong> telah kami terima.
              </p>
              {supporterMessage && (
                <div className="p-3 bg-[#08152e] border border-blue-900/60 rounded-xl max-w-sm mx-auto text-xs italic text-amber-200">
                  "{supporterMessage}"
                </div>
              )}
              <p className="text-[11px] text-slate-400">
                Secangkir kopi hangat Anda menjadi bahan bakar semangat para jurnalis Arun News dalam menyuarakan kebenaran dari Sabang sampai Merauke.
              </p>
              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Tutup &amp; Kembali Membaca
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Info banner */}
              <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Setiap teguk kopi dari Anda mendukung liputan investigasi, verifikasi berita daerah, dan operasional pelaporan warga tanpa intervensi pihak mana pun.
                </span>
              </div>

              {/* Paket Saweran Kopi */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  Pilih Jumlah Secangkir Kopi:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {coffeePackages.map((pkg) => {
                    const isSelected = selectedAmount === pkg.amount && !customAmount;
                    return (
                      <button
                        type="button"
                        key={pkg.amount}
                        onClick={() => handleSelectPackage(pkg.amount)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
                            : 'bg-[#08152e] border-blue-900/60 text-slate-200 hover:border-amber-400/50 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold flex items-center gap-1">
                            <Coffee className={`w-3.5 h-3.5 ${isSelected ? 'fill-slate-950' : 'text-amber-400'}`} />
                            {pkg.label}
                          </span>
                        </div>
                        <div className={`text-sm font-mono tabular-nums font-extrabold ${isSelected ? 'text-slate-950' : 'text-amber-400'}`}>
                          Rp {pkg.amount.toLocaleString('id-ID')}
                        </div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                          {pkg.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nominal Kustom */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Atau Masukkan Nominal Kustom (Rp):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-amber-400 font-mono">Rp</span>
                  <input
                    type="text"
                    placeholder="Contoh: 75.000"
                    value={customAmount ? Number(customAmount).toLocaleString('id-ID') : ''}
                    onChange={handleCustomChange}
                    className="w-full text-xs pl-10 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono tabular-nums"
                  />
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">
                  Metode Pembayaran:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'qris'
                        ? 'bg-[#0e2550] border-amber-400 text-amber-400 font-bold'
                        : 'bg-[#08152e] border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>QRIS Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ewallet')}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'ewallet'
                        ? 'bg-[#0e2550] border-amber-400 text-amber-400 font-bold'
                        : 'bg-[#08152e] border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>GoPay / DANA / OVO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('va')}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'va'
                        ? 'bg-[#0e2550] border-amber-400 text-amber-400 font-bold'
                        : 'bg-[#08152e] border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Transfer Bank</span>
                  </button>
                </div>
              </div>

              {/* QRIS Preview Simulation */}
              {paymentMethod === 'qris' && (
                <div className="p-3 bg-[#071328] border border-amber-500/30 rounded-xl flex items-center justify-between gap-3">
                  <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                    {/* Simulated QR Code SVG */}
                    <div className="w-full h-full bg-slate-900 rounded grid grid-cols-3 gap-0.5 p-1">
                      <div className="bg-white rounded-sm"></div>
                      <div className="bg-slate-900"></div>
                      <div className="bg-white rounded-sm"></div>
                      <div className="bg-slate-900"></div>
                      <div className="bg-white rounded-sm"></div>
                      <div className="bg-slate-900"></div>
                      <div className="bg-white rounded-sm"></div>
                      <div className="bg-slate-900"></div>
                      <div className="bg-white rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-[11px] text-slate-300">
                    <span className="font-bold text-amber-400 block">QRIS Nasional Terverifikasi</span>
                    <span>Scan menggunakan BCA, Mandiri, BRI, BNI, GoPay, OVO, ShopeePay, atau DANA.</span>
                  </div>
                </div>
              )}

              {/* Nama & Pesan */}
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    placeholder="Nama Anda (opsional, kosongkan bila Anonim)"
                    value={supporterName}
                    onChange={(e) => setSupporterName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Tulis pesan atau kata semangat untuk redaksi..."
                    value={supporterMessage}
                    onChange={(e) => setSupporterMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <Coffee className="w-4 h-4 fill-slate-950" />
                  <span>Kirim Sawer Kopi Rp {activeAmount.toLocaleString('id-ID')}</span>
                </button>
              </div>

              {/* Recent Supporters ticker */}
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Saweran Kopi Terakhir dari Pembaca:
                </span>
                <div className="space-y-1.5">
                  {recentSupporters.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300 bg-[#071329] px-2.5 py-1 rounded-lg border border-slate-800/60">
                      <div className="truncate max-w-[240px]">
                        <span className="font-semibold text-white">{s.name}</span>
                        <span className="text-slate-500 mx-1">·</span>
                        <span className="text-slate-400 italic">"{s.msg}"</span>
                      </div>
                      <span className="text-amber-400 font-mono font-bold shrink-0">{s.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
