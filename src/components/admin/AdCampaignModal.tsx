import React, { useState, useEffect } from 'react';
import { X, Save, DollarSign, Megaphone, Calendar } from 'lucide-react';
import { AdCampaign, AdSlotType } from '../../types/editorial';

interface AdCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ad: AdCampaign) => void;
  adToEdit: AdCampaign | null;
}

const SLOT_TYPES: AdSlotType[] = [
  'Top Header Leaderboard Banner',
  'In-Article Native Banner',
  'Sidebar Sticky Half-Page',
  'In-Feed Native Grid Card',
  'Pop-up Floating Sponsorship'
];

export const AdCampaignModal: React.FC<AdCampaignModalProps> = ({
  isOpen,
  onClose,
  onSave,
  adToEdit
}) => {
  const [clientName, setClientName] = useState('');
  const [slotType, setSlotType] = useState<AdSlotType>('Top Header Leaderboard Banner');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [targetCtaText, setTargetCtaText] = useState('Kunjungi Mitra');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-31');
  const [pricePerMonth, setPricePerMonth] = useState(7500000);
  const [status, setStatus] = useState<'Aktif' | 'Dijadwalkan' | 'Kedaluwarsa' | 'Ditunda'>('Aktif');

  useEffect(() => {
    if (adToEdit) {
      setClientName(adToEdit.clientName);
      setSlotType(adToEdit.slotType);
      setTitle(adToEdit.title);
      setDescription(adToEdit.description);
      setBannerImage(adToEdit.bannerImage);
      setTargetUrl(adToEdit.targetUrl);
      setTargetCtaText(adToEdit.targetCtaText);
      setStartDate(adToEdit.startDate);
      setEndDate(adToEdit.endDate);
      setPricePerMonth(adToEdit.pricePerMonth);
      setStatus(adToEdit.status);
    } else {
      setClientName('');
      setSlotType('Top Header Leaderboard Banner');
      setTitle('');
      setDescription('');
      setBannerImage('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80');
      setTargetUrl('https://wa.me/6281288992026?text=Halo%20Mitra%20Iklan%20Arun');
      setTargetCtaText('Hubungi Mitra');
      setStartDate('2026-10-08');
      setEndDate('2026-11-08');
      setPricePerMonth(8500000);
      setStatus('Aktif');
    }
  }, [adToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !title.trim()) {
      alert('Nama klien dan judul kampanye iklan wajib diisi.');
      return;
    }

    const updatedAd: AdCampaign = {
      id: adToEdit ? adToEdit.id : `ad-cmp-${Date.now()}`,
      clientName,
      slotType,
      title,
      description,
      bannerImage: bannerImage.trim() || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
      targetUrl: targetUrl.trim() || 'https://wa.me/6281288992026',
      targetCtaText: targetCtaText.trim() || 'Pelajari Selengkapnya',
      startDate,
      endDate,
      pricePerMonth: Number(pricePerMonth) || 5000000,
      status,
      impressions: adToEdit ? adToEdit.impressions : 0,
      clicks: adToEdit ? adToEdit.clicks : 0
    };

    onSave(updatedAd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#09152b] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-200">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#061021] border-b border-blue-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-editorial">
                {adToEdit ? 'Edit Slot & Kampanye Iklan' : 'Pasang Slot Iklan Baru'}
              </h2>
              <p className="text-xs text-slate-400">
                Manajemen Monetisasi &amp; Kemitraan Komersial Arun News
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Nama Klien / Perusahaan Sponsor <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Contoh: PT Bank Mandiri / Telkomsel / Astra Nusantara"
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Penempatan Slot Iklan</label>
              <select
                value={slotType}
                onChange={(e) => setSlotType(e.target.value as AdSlotType)}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {SLOT_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Status Kampanye</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Aktif">Aktif (Tayang Sekarang)</option>
                <option value="Dijadwalkan">Dijadwalkan</option>
                <option value="Ditunda">Ditunda</option>
                <option value="Kedaluwarsa">Kedaluwarsa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Headline / Judul Iklan <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Solusi Pembiayaan Modal Usaha Bunga Rendah"
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Deskripsi Singkat Iklan</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan copywriting penawaran..."
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">URL Banner / Gambar</label>
              <input
                type="text"
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Teks Tombol Aksi (CTA)</label>
              <input
                type="text"
                value={targetCtaText}
                onChange={(e) => setTargetCtaText(e.target.value)}
                placeholder="Daftar Sekarang / Hubungi Kami"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Tautan Tujuan (Link URL / WhatsApp)</label>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://client-landingpage.com atau https://wa.me/..."
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tanggal Mulai</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tanggal Berakhir</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tarif Kontrak (Rp/Bulan)</label>
              <input
                type="number"
                step="500000"
                value={pricePerMonth}
                onChange={(e) => setPricePerMonth(Number(e.target.value))}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>{adToEdit ? 'Simpan Perubahan Iklan' : 'Pasang Iklan Sekarang'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
