import { NewsCategory } from './news';

export type StaffRole = 
  | 'Dewan Pembina'
  | 'Pemimpin Umum'
  | 'Pemimpin Redaksi'
  | 'Wakil Pemimpin Redaksi'
  | 'Redaktur Pelaksana'
  | 'Ombudsman'
  | 'Redaktur Desk'
  | 'Wartawan / Koresponden'
  | 'Fotografer & Multimedia'
  | 'IT & Keamanan Siber';

export interface EditorialStaff {
  id: string;
  name: string;
  role: StaffRole;
  desk?: NewsCategory | 'Umum' | 'Investigasi' | 'Multimedia' | 'Hukum';
  pressCardNumber: string; // No KTA Pers
  phone: string;
  email: string;
  city: string;
  photoUrl: string;
  isActive: boolean;
  joinedDate: string;
}

export type AdSlotType = 
  | 'Top Header Leaderboard Banner'
  | 'In-Article Native Banner'
  | 'Sidebar Sticky Half-Page'
  | 'In-Feed Native Grid Card'
  | 'Pop-up Floating Sponsorship';

export interface AdCampaign {
  id: string;
  clientName: string;
  slotType: AdSlotType;
  title: string;
  description: string;
  bannerImage: string;
  targetUrl: string;
  targetCtaText: string;
  startDate: string;
  endDate: string;
  pricePerMonth: number;
  status: 'Aktif' | 'Dijadwalkan' | 'Kedaluwarsa' | 'Ditunda';
  impressions: number;
  clicks: number;
}

export interface MediaSettings {
  mediaName: string;
  tagline: string;
  companyName: string;
  skKemenkumham: string;
  dewanPersNo: string;
  officeAddress: string;
  phoneHotline: string;
  whatsappRedaksi: string;
  emailRedaksi: string;
  bankAccount: string;
  qrisMerchantName: string;
}
