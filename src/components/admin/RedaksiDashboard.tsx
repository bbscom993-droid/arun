import React, { useState } from 'react';
import { 
  Newspaper, 
  Megaphone, 
  Users, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Eye, 
  Search, 
  ArrowLeft, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  TrendingUp,
  FileBadge,
  Sparkles
} from 'lucide-react';
import { Article, NewsCategory } from '../../types/news';
import { EditorialStaff, AdCampaign, MediaSettings } from '../../types/editorial';
import { ArticleEditorModal } from './ArticleEditorModal';
import { StaffEditorModal } from './StaffEditorModal';
import { AdCampaignModal } from './AdCampaignModal';

interface RedaksiDashboardProps {
  articles: Article[];
  onUpdateArticles: (articles: Article[]) => void;
  staffList: EditorialStaff[];
  onUpdateStaffList: (staff: EditorialStaff[]) => void;
  adCampaigns: AdCampaign[];
  onUpdateAdCampaigns: (ads: AdCampaign[]) => void;
  mediaSettings: MediaSettings;
  onUpdateMediaSettings: (settings: MediaSettings) => void;
  breakingNewsList: string[];
  onUpdateBreakingNewsList: (items: string[]) => void;
  onNavigateHome: () => void;
}

export const RedaksiDashboard: React.FC<RedaksiDashboardProps> = ({
  articles,
  onUpdateArticles,
  staffList,
  onUpdateStaffList,
  adCampaigns,
  onUpdateAdCampaigns,
  mediaSettings,
  onUpdateMediaSettings,
  breakingNewsList,
  onUpdateBreakingNewsList,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<'berita' | 'iklan' | 'redaksi' | 'pengaturan'>('berita');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<NewsCategory | 'Semua'>('Semua');

  // Modal States
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState<EditorialStaff | null>(null);

  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [adToEdit, setAdToEdit] = useState<AdCampaign | null>(null);

  // Settings form local state
  const [settingsForm, setSettingsForm] = useState<MediaSettings>(mediaSettings);
  const [newTickerText, setNewTickerText] = useState('');
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Copy Direct Link to Clipboard
  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + '#/redaksi';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // --- ARTIKEL HANDLERS ---
  const handleSaveArticle = (savedArt: Article) => {
    const exists = articles.some((a) => a.id === savedArt.id);
    let updated: Article[];
    if (exists) {
      updated = articles.map((a) => (a.id === savedArt.id ? savedArt : a));
    } else {
      updated = [savedArt, ...articles];
    }
    // If set as headline, demote other headlines to false
    if (savedArt.isHeadline) {
      updated = updated.map((a) => (a.id === savedArt.id ? a : { ...a, isHeadline: false }));
    }
    onUpdateArticles(updated);
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus berita:\n"${title}"?`)) {
      onUpdateArticles(articles.filter((a) => a.id !== id));
    }
  };

  const handleToggleHeadline = (id: string) => {
    onUpdateArticles(
      articles.map((a) => {
        if (a.id === id) {
          return { ...a, isHeadline: !a.isHeadline };
        }
        return a.isHeadline ? { ...a, isHeadline: false } : a;
      })
    );
  };

  // --- STAFF HANDLERS ---
  const handleSaveStaff = (savedStaff: EditorialStaff) => {
    const exists = staffList.some((s) => s.id === savedStaff.id);
    if (exists) {
      onUpdateStaffList(staffList.map((s) => (s.id === savedStaff.id ? savedStaff : s)));
    } else {
      onUpdateStaffList([savedStaff, ...staffList]);
    }
  };

  const handleDeleteStaff = (id: string, name: string) => {
    if (window.confirm(`Hapus anggota redaksi "${name}"?`)) {
      onUpdateStaffList(staffList.filter((s) => s.id !== id));
    }
  };

  const handleToggleStaffActive = (id: string) => {
    onUpdateStaffList(
      staffList.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  // --- AD CAMPAIGN HANDLERS ---
  const handleSaveAd = (savedAd: AdCampaign) => {
    const exists = adCampaigns.some((a) => a.id === savedAd.id);
    if (exists) {
      onUpdateAdCampaigns(adCampaigns.map((a) => (a.id === savedAd.id ? savedAd : a)));
    } else {
      onUpdateAdCampaigns([savedAd, ...adCampaigns]);
    }
  };

  const handleDeleteAd = (id: string, client: string) => {
    if (window.confirm(`Hapus kampanye iklan klien "${client}"?`)) {
      onUpdateAdCampaigns(adCampaigns.filter((a) => a.id !== id));
    }
  };

  const handleToggleAdStatus = (id: string) => {
    onUpdateAdCampaigns(
      adCampaigns.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'Aktif' ? 'Ditunda' : 'Aktif';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  // --- SETTINGS HANDLERS ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMediaSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  const handleAddTicker = () => {
    if (!newTickerText.trim()) return;
    onUpdateBreakingNewsList([newTickerText.trim(), ...breakingNewsList]);
    setNewTickerText('');
  };

  const handleDeleteTicker = (index: number) => {
    onUpdateBreakingNewsList(breakingNewsList.filter((_, i) => i !== index));
  };

  // Filtered articles
  const filteredArticles = articles.filter((art) => {
    const matchesCategory = filterCategory === 'Semua' || art.category === filterCategory;
    const matchesQuery = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Calculate totals
  const totalRevenue = adCampaigns
    .filter((a) => a.status === 'Aktif')
    .reduce((sum, a) => sum + a.pricePerMonth, 0);

  return (
    <div className="min-h-screen bg-[#040b17] text-slate-100 font-sans pb-16">
      
      {/* 1. Header Bar Redaksi CMS */}
      <header className="sticky top-0 z-40 bg-[#061021]/95 backdrop-blur-md border-b border-amber-500/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Brand + Dashboard title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Kembali ke Portal Berita"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portal Berita</span>
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-editorial">
                  ARUN<span className="text-amber-400">.</span>NEWS
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                  Ruang Redaksi &amp; CMS
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {mediaSettings.tagline} · Sistem Manajemen Berita, Iklan &amp; Redaksi
              </span>
            </div>
          </div>

          {/* Right action: Share/Direct Link & Live Website CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 text-xs font-medium transition-colors"
              title="Salin Tautan Akses Khusus Ruang Redaksi"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Tautan Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-[11px]">#/redaksi</span>
                </>
              )}
            </button>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Live Portal</span>
            </button>
          </div>
        </div>

        {/* 2. Top Tabs Menu */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 border-t border-slate-800/80">
          <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar py-2 text-xs font-semibold">
            
            <button
              onClick={() => setActiveTab('berita')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'berita'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Manajemen Berita</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'berita' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('iklan')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'iklan'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Manajemen Iklan &amp; Kemitraan</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'iklan' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {adCampaigns.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('redaksi')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'redaksi'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Susunan Redaksi &amp; Wartawan</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'redaksi' ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {staffList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pengaturan')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'pengaturan'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan Media &amp; Legalitas</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        
        {/* Banner Quick Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-[#08152e] border border-blue-900/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Berita Tayang</span>
              <span className="text-2xl font-bold text-white font-mono mt-0.5 block">{articles.length}</span>
              <span className="text-[10px] text-amber-400">8 Kanal Resmi Aktif</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#08152e] border border-blue-900/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Kemitraan Iklan Aktif</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono mt-0.5 block">
                {adCampaigns.filter((a) => a.status === 'Aktif').length}
              </span>
              <span className="text-[10px] text-emerald-300">Slot Terisi &amp; Berbayar</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Megaphone className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#08152e] border border-blue-900/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Anggota Redaksi &amp; Pers</span>
              <span className="text-2xl font-bold text-white font-mono mt-0.5 block">{staffList.length}</span>
              <span className="text-[10px] text-slate-300">Wartawan &amp; Dewan Pers</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#08152e] border border-blue-900/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Nilai Kontrak Iklan</span>
              <span className="text-xl font-bold text-amber-300 font-mono mt-0.5 block">
                Rp {(totalRevenue / 1000000).toFixed(1)} Jt<span className="text-xs text-slate-400 font-normal">/bln</span>
              </span>
              <span className="text-[10px] text-amber-400/90">Komersial &amp; Adv.</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: MANAJEMEN BERITA                                  */}
        {/* ======================================================== */}
        {activeTab === 'berita' && (
          <div className="space-y-5">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#08152e] p-4 rounded-2xl border border-blue-900/60">
              
              {/* Search + Category Filter */}
              <div className="flex flex-wrap items-center gap-2.5 flex-1">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul, wartawan, kota..."
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="bg-[#040b17] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Semua">Semua Kategori ({articles.length})</option>
                  <option value="Politik">Politik</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Kriminal">Kriminal</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Daerah">Daerah</option>
                  <option value="Lain-lain">Lain-lain</option>
                  <option value="Lapor Warga">Lapor Warga</option>
                  <option value="Legalitas">Legalitas</option>
                </select>
              </div>

              {/* Add New Article Button */}
              <button
                onClick={() => {
                  setArticleToEdit(null);
                  setIsArticleModalOpen(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis Berita Baru</span>
              </button>
            </div>

            {/* Articles List / Table */}
            <div className="bg-[#08152e] border border-blue-900/60 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#061021] border-b border-blue-900 text-slate-400 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Berita / Headline</th>
                      <th className="py-3.5 px-3">Kanal</th>
                      <th className="py-3.5 px-3">Wartawan &amp; Editor</th>
                      <th className="py-3.5 px-3">Waktu &amp; Kota</th>
                      <th className="py-3.5 px-3 text-center">Pembaca</th>
                      <th className="py-3.5 px-3 text-right">Aksi Redaksional</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          Tidak ada berita yang sesuai dengan filter pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-900/60 transition-colors">
                          
                          {/* Title + Thumbnail + Flags */}
                          <td className="py-3.5 px-4 max-w-md">
                            <div className="flex items-start gap-3">
                              <img
                                src={art.image}
                                alt={art.title}
                                className="w-16 h-12 object-cover rounded-lg border border-slate-700/80 shrink-0"
                              />
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {art.isHeadline && (
                                    <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/50 rounded text-[10px] font-bold flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-amber-400" />
                                      HEADLINE UTAMA
                                    </span>
                                  )}
                                  {art.reportStatus && (
                                    <span className="px-2 py-0.5 bg-sky-950 text-sky-300 border border-sky-500/40 rounded text-[10px] font-semibold">
                                      {art.reportStatus}
                                    </span>
                                  )}
                                  {art.legalRef && (
                                    <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-500/40 rounded text-[10px] font-semibold">
                                      Ref: {art.legalRef}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-bold text-white text-xs line-clamp-2 leading-snug">
                                  {art.title}
                                </h3>
                                <p className="text-[11px] text-slate-400 line-clamp-1">
                                  {art.summary}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-800 text-blue-300 font-semibold text-[11px]">
                              {art.category}
                            </span>
                          </td>

                          {/* Author & Editor */}
                          <td className="py-3.5 px-3 text-slate-300">
                            <div className="font-semibold text-white">{art.author}</div>
                            <div className="text-[11px] text-slate-400">Ed: {art.editor}</div>
                          </td>

                          {/* Time & City */}
                          <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                            <div className="text-slate-300">{art.city}</div>
                            <div className="text-[10px]">{art.publishedAt}</div>
                          </td>

                          {/* Views */}
                          <td className="py-3.5 px-3 text-center">
                            <div className="inline-flex items-center gap-1 text-slate-300 font-mono">
                              <Eye className="w-3 h-3 text-amber-400" />
                              <span>{art.views.toLocaleString('id-ID')}</span>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              
                              {/* Toggle Headline */}
                              <button
                                onClick={() => handleToggleHeadline(art.id)}
                                title={art.isHeadline ? 'Batalkan Status Headline' : 'Jadikan Headline Utama'}
                                className={`p-1.5 rounded-lg border transition-colors ${
                                  art.isHeadline
                                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400/30'
                                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-amber-400 hover:border-slate-500'
                                }`}
                              >
                                <Star className={`w-3.5 h-3.5 ${art.isHeadline ? 'fill-amber-400' : ''}`} />
                              </button>

                              {/* Edit Article */}
                              <button
                                onClick={() => {
                                  setArticleToEdit(art);
                                  setIsArticleModalOpen(true);
                                }}
                                title="Edit Berita"
                                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Article */}
                              <button
                                onClick={() => handleDeleteArticle(art.id, art.title)}
                                title="Hapus Berita"
                                className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MANAJEMEN IKLAN & KEMITRAAN                       */}
        {/* ======================================================== */}
        {activeTab === 'iklan' && (
          <div className="space-y-5">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#08152e] p-4 rounded-2xl border border-blue-900/60">
              <div>
                <h3 className="font-bold text-white text-sm">
                  Daftar Slot &amp; Kampanye Iklan Arun News
                </h3>
                <p className="text-xs text-slate-400">
                  Kelola penempatan sponsor, tarif promosi, tautan WhatsApp, dan status penayangan.
                </p>
              </div>

              <button
                onClick={() => {
                  setAdToEdit(null);
                  setIsAdModalOpen(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Pasang Slot Iklan Baru</span>
              </button>
            </div>

            {/* Ads Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adCampaigns.map((ad) => (
                <div
                  key={ad.id}
                  className="bg-[#08152e] border border-blue-900/70 rounded-2xl p-5 space-y-4 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 uppercase tracking-wider block w-fit mb-1">
                        {ad.slotType}
                      </span>
                      <h4 className="font-bold text-white text-sm">
                        {ad.clientName}
                      </h4>
                      <p className="text-xs text-slate-300 font-semibold line-clamp-1 mt-0.5">
                        {ad.title}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleAdStatus(ad.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                        ad.status === 'Aktif'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {ad.status === 'Aktif' ? '● TAYANG AKTIF' : '○ NONAKTIF / DITUNDA'}
                    </button>
                  </div>

                  {/* Banner Image Preview */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-700/80 max-h-36 bg-slate-950">
                    <img
                      src={ad.bannerImage}
                      alt={ad.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[11px] text-white line-clamp-1">
                        {ad.description}
                      </span>
                    </div>
                  </div>

                  {/* Stats & Details */}
                  <div className="grid grid-cols-3 gap-2 text-center bg-[#061021] p-2.5 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tarif Kontrak</span>
                      <span className="font-bold text-amber-300 font-mono">
                        Rp {(ad.pricePerMonth / 1000000).toFixed(1)} Jt
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tayang (Imp.)</span>
                      <span className="font-bold text-white font-mono">
                        {ad.impressions.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Klik CTA</span>
                      <span className="font-bold text-emerald-400 font-mono">
                        {ad.clicks.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Date Range & Actions */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{ad.startDate} s/d {ad.endDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setAdToEdit(ad);
                          setIsAdModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-400 text-slate-300 hover:text-white transition-colors"
                      >
                        Edit Iklan
                      </button>

                      <button
                        onClick={() => handleDeleteAd(ad.id, ad.clientName)}
                        className="p-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SUSUNAN REDAKSI & WARTAWAN                        */}
        {/* ======================================================== */}
        {activeTab === 'redaksi' && (
          <div className="space-y-5">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#08152e] p-4 rounded-2xl border border-blue-900/60">
              <div>
                <h3 className="font-bold text-white text-sm">
                  Susunan Dewan Redaksi &amp; Koresponden Media Siber
                </h3>
                <p className="text-xs text-slate-400">
                  Transparansi pers mematuhi UU No. 40 Tahun 1999 dan Pedoman Pemberitaan Media Siber Dewan Pers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setStaffToEdit(null);
                    setIsStaffModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Anggota Redaksi</span>
                </button>
              </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staffList.map((st) => (
                <div
                  key={st.id}
                  className="bg-[#08152e] border border-blue-900/70 rounded-2xl p-5 space-y-3 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={st.photoUrl}
                      alt={st.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/40 shrink-0"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <span className="px-2 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded text-[10px] font-bold uppercase tracking-wider inline-block">
                        {st.role}
                      </span>
                      <h4 className="font-bold text-white text-xs truncate">
                        {st.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Desk: <span className="text-slate-200 font-semibold">{st.desk}</span> · {st.city}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 p-2.5 bg-[#061021] rounded-xl border border-slate-800 text-[11px] text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">KTA Pers:</span>
                      <span className="font-mono text-amber-300">{st.pressCardNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">WhatsApp:</span>
                      <span>{st.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="truncate max-w-[170px]">{st.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                    <button
                      onClick={() => handleToggleStaffActive(st.id)}
                      className={`text-[10px] font-bold flex items-center gap-1.5 ${
                        st.isActive ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${st.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      {st.isActive ? 'Wartawan Berizin Aktif' : 'Status Non-Aktif'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setStaffToEdit(st);
                          setIsStaffModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-blue-400 text-slate-300 hover:text-white transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteStaff(st.id, st.name)}
                        className="p-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PENGATURAN MEDIA & LEGALITAS ("DLL")              */}
        {/* ======================================================== */}
        {activeTab === 'pengaturan' && (
          <div className="space-y-6 max-w-4xl">
            
            {/* Form Settings */}
            <form onSubmit={handleSaveSettings} className="bg-[#08152e] border border-blue-900/60 rounded-2xl p-6 space-y-6">
              
              <div className="border-b border-blue-900/80 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-editorial">
                    Profil Media &amp; Legalitas Badan Hukum
                  </h3>
                  <p className="text-xs text-slate-400">
                    Konfigurasi identitas resmi portal Arun News, legalitas Kemenkumham, dan kontak redaksi.
                  </p>
                </div>

                {settingsSavedToast && (
                  <span className="px-3 py-1 bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-lg flex items-center gap-1.5 animate-pulse">
                    <Check className="w-3.5 h-3.5" />
                    Pengaturan Berhasil Disimpan!
                  </span>
                )}
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Media Portal</label>
                  <input
                    type="text"
                    value={settingsForm.mediaName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, mediaName: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tagline Resmi</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-amber-300 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama PT / Penerbit</label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nomor SK Kemenkumham RI</label>
                  <input
                    type="text"
                    value={settingsForm.skKemenkumham}
                    onChange={(e) => setSettingsForm({ ...settingsForm, skKemenkumham: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">No. Verifikasi Dewan Pers</label>
                  <input
                    type="text"
                    value={settingsForm.dewanPersNo}
                    onChange={(e) => setSettingsForm({ ...settingsForm, dewanPersNo: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hotline / Telepon Redaksi</label>
                  <input
                    type="text"
                    value={settingsForm.phoneHotline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phoneHotline: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Redaksi &amp; Lapor Warga</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappRedaksi}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappRedaksi: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Resmi Redaksi</label>
                  <input
                    type="email"
                    value={settingsForm.emailRedaksi}
                    onChange={(e) => setSettingsForm({ ...settingsForm, emailRedaksi: e.target.value })}
                    className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Alamat Kantor Redaksi</label>
                <input
                  type="text"
                  value={settingsForm.officeAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                  className="w-full bg-[#040b17] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              {/* Rekening Sawer Kopi */}
              <div className="p-4 bg-[#061021] border border-amber-500/30 rounded-xl space-y-3 text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  ☕ Pengaturan Sawer Kopi Redaksi &amp; Donasi Pembaca
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Nomor Rekening Bank:</label>
                    <input
                      type="text"
                      value={settingsForm.bankAccount}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bankAccount: e.target.value })}
                      className="w-full bg-[#040b17] border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Nama Merchant QRIS:</label>
                    <input
                      type="text"
                      value={settingsForm.qrisMerchantName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, qrisMerchantName: e.target.value })}
                      className="w-full bg-[#040b17] border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
                >
                  Simpan Konfigurasi Media
                </button>
              </div>
            </form>

            {/* Breaking News Ticker Manager */}
            <div className="bg-[#08152e] border border-blue-900/60 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white font-editorial">
                  Manajemen Breaking News Ticker (Pita Berita Berjalan)
                </h3>
                <p className="text-xs text-slate-400">
                  Tambahkan atau hapus headline darurat yang berputar di pita atas halaman utama portal.
                </p>
              </div>

              {/* Add Ticker */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTickerText}
                  onChange={(e) => setNewTickerText(e.target.value)}
                  placeholder="Contoh: 🏛️ POLITIK: Rapat Paripurna DPR sahkan UU Ketenagakerjaan..."
                  className="flex-1 bg-[#040b17] border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleAddTicker}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
                >
                  Tambah Ticker
                </button>
              </div>

              {/* List */}
              <div className="space-y-2 pt-2">
                {breakingNewsList.map((ticker, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 p-3 bg-[#061021] border border-slate-800 rounded-xl text-xs text-slate-200"
                  >
                    <span className="line-clamp-1">{ticker}</span>
                    <button
                      onClick={() => handleDeleteTicker(index)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Hapus Ticker"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* MODALS */}
      <ArticleEditorModal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onSave={handleSaveArticle}
        articleToEdit={articleToEdit}
      />

      <StaffEditorModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onSave={handleSaveStaff}
        staffToEdit={staffToEdit}
      />

      <AdCampaignModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        onSave={handleSaveAd}
        adToEdit={adToEdit}
      />
    </div>
  );
};
