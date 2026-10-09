export type NewsCategory = 
  | 'Semua'
  | 'Politik'
  | 'Olahraga'
  | 'Kriminal'
  | 'Ekonomi'
  | 'Daerah'
  | 'Lain-lain'
  | 'Lapor Warga'
  | 'Legalitas';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  text: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  category: NewsCategory;
  author: string;
  editor: string;
  city: string;
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  imageCaption: string;
  views: number;
  commentsCount: number;
  isHeadline?: boolean;
  isPopular?: boolean;
  popularRank?: number;
  reportStatus?: 'Dalam Investigasi' | 'Terverifikasi' | 'Ditindaklanjuti' | 'Selesai';
  legalRef?: string;
  reactions: {
    like: number;
    impressed: number;
    inspired: number;
    sad: number;
  };
  comments: Comment[];
  tags: string[];
}

export interface VideoNews {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  views: string;
  date: string;
  description: string;
}

export interface MarketItem {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}
