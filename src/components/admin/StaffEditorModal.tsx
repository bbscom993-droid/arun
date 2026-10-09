import React, { useState, useEffect } from 'react';
import { X, Save, UserCheck, ShieldCheck } from 'lucide-react';
import { EditorialStaff, StaffRole } from '../../types/editorial';

interface StaffEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: EditorialStaff) => void;
  staffToEdit: EditorialStaff | null;
}

const ROLES: StaffRole[] = [
  'Dewan Pembina',
  'Pemimpin Umum',
  'Pemimpin Redaksi',
  'Wakil Pemimpin Redaksi',
  'Redaktur Pelaksana',
  'Ombudsman',
  'Redaktur Desk',
  'Wartawan / Koresponden',
  'Fotografer & Multimedia',
  'IT & Keamanan Siber'
];

export const StaffEditorModal: React.FC<StaffEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  staffToEdit
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<StaffRole>('Wartawan / Koresponden');
  const [desk, setDesk] = useState('Politik');
  const [pressCardNumber, setPressCardNumber] = useState('');
  const [phone, setPhone] = useState('0812-');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (staffToEdit) {
      setName(staffToEdit.name);
      setRole(staffToEdit.role);
      setDesk(staffToEdit.desk || 'Politik');
      setPressCardNumber(staffToEdit.pressCardNumber);
      setPhone(staffToEdit.phone);
      setEmail(staffToEdit.email);
      setCity(staffToEdit.city);
      setPhotoUrl(staffToEdit.photoUrl);
      setIsActive(staffToEdit.isActive);
    } else {
      setName('');
      setRole('Wartawan / Koresponden');
      setDesk('Politik');
      setPressCardNumber(`DP-WTR-${Math.floor(100 + Math.random() * 900)}/AN/2026`);
      setPhone('0812-');
      setEmail('');
      setCity('Jakarta');
      setPhotoUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');
      setIsActive(true);
    }
  }, [staffToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nama anggota redaksi wajib diisi.');
      return;
    }

    const updatedStaff: EditorialStaff = {
      id: staffToEdit ? staffToEdit.id : `staff-${Date.now()}`,
      name,
      role,
      desk: (desk as any) || 'Umum',
      pressCardNumber: pressCardNumber.trim() || `DP-STAFF-${Date.now().toString().slice(-4)}/AN/2026`,
      phone,
      email: email.trim() || `${name.toLowerCase().replace(/[^a-z]/g, '')}@arunnews.id`,
      city: city || 'Jakarta',
      photoUrl: photoUrl.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      isActive,
      joinedDate: staffToEdit ? staffToEdit.joinedDate : 'Oktober 2026'
    };

    onSave(updatedStaff);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#09152b] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-200">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#061021] border-b border-blue-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-editorial">
                {staffToEdit ? 'Edit Data Redaksi' : 'Tambah Anggota Susunan Redaksi'}
              </h2>
              <p className="text-xs text-slate-400">
                Data resmi Dewan Pers &amp; KTA Media Siber Arun News
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
              Nama Lengkap beserta Gelar <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Nurul Hidayati, S.I.Kom., C.J."
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Jabatan Redaksional</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as StaffRole)}
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Desk Liputan / Bidang</label>
              <input
                type="text"
                value={desk}
                onChange={(e) => setDesk(e.target.value)}
                placeholder="Politik / Kriminal / Hukum / Investigasi"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                No. KTA Pers / Registrasi Dewan Pers
              </label>
              <input
                type="text"
                value={pressCardNumber}
                onChange={(e) => setPressCardNumber(e.target.value)}
                placeholder="DP-RED-004/AN/2026"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Wilayah Tugas / Kota</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Jakarta Pusat / Surabaya / Medan"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nomor Telepon / WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812-3456-7890"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Resmi Redaksi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama.wartawan@arunnews.id"
                className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">URL Foto Profil</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-white text-xs"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-900/60 border border-slate-700 rounded-xl">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded text-emerald-400 focus:ring-emerald-400 h-4 w-4 bg-slate-950 border-slate-600"
              />
              <div>
                <span className="font-semibold text-white">Status Wartawan Aktif &amp; Berizin Liputan</span>
                <p className="text-[10px] text-slate-400">
                  Wartawan terdaftar berhak melakukan peliputan dengan perlindungan UU Pers No. 40 Tahun 1999.
                </p>
              </div>
            </label>
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
              <span>{staffToEdit ? 'Simpan Data Anggota' : 'Tambahkan ke Redaksi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
