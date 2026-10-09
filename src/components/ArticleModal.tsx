import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types/news';
import { 
  X, Bookmark, Share2, Volume2, Pause, Play, Check, 
  MessageSquare, ThumbsUp, Sparkles, Heart, Eye, ArrowLeft, Send, Copy
} from 'lucide-react';

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.979-.275-.101-.475-.15-.675.15-.2.299-.775.979-.95 1.178-.175.2-.351.226-.651.076-.3-.15-1.267-.467-2.413-1.488-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.131-.611.135-.134.3-.35.45-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-.926-2.23-.244-.585-.493-.505-.676-.514l-.576-.01c-.2 0-.525.075-.8.375-.275.3-1.051 1.026-1.051 2.502 0 1.476 1.075 2.899 1.226 3.099.15.2 2.115 3.23 5.124 4.53 3.008 1.301 3.008.868 3.558.814.55-.054 1.78-.727 2.03-1.428.25-.701.25-1.302.175-1.428-.075-.126-.275-.201-.576-.351zm-5.467 7.424h-.008a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.512-5.26c0-5.445 4.432-9.876 9.884-9.876 2.637 0 5.116 1.028 6.981 2.893a9.824 9.824 0 012.894 6.983c0 5.447-4.432 9.878-9.871 9.878zm8.414-18.286A11.82 11.82 0 0012.005 0C5.395 0 .02 5.375.02 11.984a11.91 11.91 0 001.602 6.005L0 24l6.183-1.621a11.93 11.93 0 005.822 1.507h.005c6.609 0 11.984-5.375 11.984-11.984 0-3.203-1.247-6.213-3.513-8.481z"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  onAddComment: (articleId: string, comment: Comment) => void;
  onReaction: (articleId: string, reactionType: 'like' | 'impressed' | 'inspired' | 'sad') => void;
  relatedArticles: Article[];
  onSelectRelated: (article: Article) => void;
  onOpenIklan?: (formatName?: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  isBookmarked,
  onAddComment,
  onReaction,
  relatedArticles,
  onSelectRelated,
  onOpenIklan
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Comment Form state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Audio player simulation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2 * audioSpeed;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, audioSpeed]);

  // Reset audio when article changes
  useEffect(() => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [article?.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${article.title} - Arun News`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + '\n' + shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: 'c-' + Date.now(),
      author: commentName.trim() || 'Pembaca Arun News',
      avatar: (commentName.trim() || 'PA').slice(0, 2).toUpperCase(),
      timeAgo: 'Baru saja',
      text: commentText.trim(),
      likes: 0
    };

    onAddComment(article.id, newComment);
    setCommentText('');
    setCommentName('');
  };

  const fontSizeClass = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-0 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-[#0b1b3b] text-slate-100 w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Navigation Bar */}
        <div className="sticky top-0 z-30 bg-[#08152e]/95 backdrop-blur px-5 py-3 border-b border-blue-900/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <span className="text-slate-500" aria-hidden="true">|</span>
            <span className="text-xs font-semibold text-slate-300 truncate max-w-xs sm:max-w-md">
              {article.category} · {article.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center bg-slate-900 rounded-lg p-1 text-xs border border-slate-800">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 rounded font-bold ${fontSize === 'sm' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                title="Ukuran teks kecil"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 rounded font-bold ${fontSize === 'base' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                title="Ukuran teks normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 rounded font-bold ${fontSize === 'lg' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                title="Ukuran teks besar"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Hapus dari Simpanan' : 'Simpan Berita'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-950' : ''}`} />
            </button>

            {/* Social Share Quick Actions in Top Bar */}
            <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-300 hover:text-[#25D366] hover:bg-slate-800/80 rounded-lg transition-colors"
                title="Bagikan ke WhatsApp"
                aria-label="Bagikan ke WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                title="Bagikan ke Twitter / X"
                aria-label="Bagikan ke Twitter / X"
              >
                <TwitterXIcon />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-300 hover:text-[#1877F2] hover:bg-slate-800/80 rounded-lg transition-colors"
                title="Bagikan ke Facebook"
                aria-label="Bagikan ke Facebook"
              >
                <FacebookIcon />
              </a>
              <button
                onClick={handleShare}
                className="p-1.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-lg transition-colors relative"
                title="Salin Tautan Berita"
                aria-label="Salin Tautan Berita"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {copiedLink && (
                  <span className="absolute -bottom-7 right-0 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap z-50">
                    Tautan Disalin!
                  </span>
                )}
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
              aria-label="Tutup artikel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Body */}
        <div className="p-6 sm:p-10 max-w-3xl mx-auto w-full">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-semibold mb-3">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-300">{article.city}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-300">{article.publishedAt}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-400">{article.readTimeMinutes} menit baca</span>
            {article.reportStatus && (
              <>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  article.reportStatus === 'Ditindaklanjuti'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-amber-400 text-slate-950'
                }`}>
                  Status: {article.reportStatus}
                </span>
              </>
            )}
            {article.legalRef && (
              <>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                  Rujukan: {article.legalRef}
                </span>
              </>
            )}
          </div>

          {/* Headline Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight font-editorial text-balance">
            {article.title}
          </h1>

          {/* Author & Editor Bylines */}
          <div className="mt-4 pb-4 border-b border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-white">Wartawan: {article.author}</span>
              <span className="text-slate-500 mx-2">|</span>
              <span className="text-slate-400">Editor: {article.editor}</span>
            </div>
            <div className="flex items-center gap-4 font-mono tabular-nums text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                {article.views.toLocaleString('id-ID')} Pembaca
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                {article.commentsCount} Komentar
              </span>
            </div>
          </div>

          {/* Audio Narrator Widget (Dengarkan Berita) */}
          <div className="mt-5 p-4 rounded-xl bg-[#07152f] border border-amber-500/30 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Berita Ini (Fitur Audio AI Redaksi)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAudioSpeed(audioSpeed === 1 ? 1.5 : 1)}
                  className="font-mono tabular-nums text-[11px] text-slate-300 hover:text-amber-400 bg-slate-800 px-2 py-0.5 rounded font-bold"
                >
                  {audioSpeed}x Kecepatan
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center hover:bg-amber-300 transition-colors shadow shrink-0"
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-slate-950" />
                ) : (
                  <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                )}
              </button>

              <div className="flex-1">
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setAudioProgress((clickX / rect.width) * 100);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer"
                >
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums mt-1">
                  <span>{isPlayingAudio ? 'Sedang Memutar Audio Narasi' : 'Klik putar untuk mendengarkan'}</span>
                  <span>{Math.round((article.readTimeMinutes * 60 * audioProgress) / 100)} dtk / {article.readTimeMinutes * 60} dtk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Focal Image */}
          <figure className="my-6">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-blue-900/60 shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-slate-400 italic">
              {article.imageCaption} <span className="text-amber-400 font-medium">Foto: Redaksi Arun News</span>
            </figcaption>
          </figure>

          {/* Lead Paragraph Summary */}
          <div className="p-4 bg-amber-400/10 border-l-4 border-amber-400 rounded-r-lg mb-6">
            <p className="text-sm sm:text-base font-medium text-amber-200 leading-relaxed">
              <strong>ARUN NEWS, {article.city.toUpperCase()} — </strong>
              {article.summary}
            </p>
          </div>

          {/* Full Article Body with Drop Cap on First Paragraph */}
          <div className={`space-y-5 text-slate-200 font-normal ${fontSizeClass}`}>
            {article.content.map((paragraph, idx) => (
              <React.Fragment key={idx}>
                <p
                  className={
                    idx === 0
                      ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-400'
                      : ''
                  }
                >
                  {paragraph}
                </p>

                {/* In-Article Native Sponsored Banner (Slot 2) */}
                {idx === 1 && (
                  <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-[#08152e] via-[#0e2752] to-[#08152e] border border-amber-500/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 not-prose">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                      <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                        AD
                      </div>
                      <div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <span className="text-xs font-bold text-white font-editorial">
                            Ruang Iklan In-Article Arun News (CTR 3,8%)
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-amber-400 border border-amber-400/30 px-1.5 rounded">
                            Sponsored
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          Posisi strategis di tengah bacaan artikel dengan fokus dan atensi pembaca tertinggi.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenIklan?.('In-Article Native Banner & Sponsored')}
                      className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors shrink-0 shadow cursor-pointer whitespace-nowrap"
                    >
                      Pasang Iklan di Sini
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Topik Terkait:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-amber-300 bg-[#071329] border border-amber-400/30 px-2.5 py-1 rounded font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Media Sharing Section */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#08152e] via-[#0c224b] to-[#08152e] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-editorial">
                  Bagikan Berita Ini ke Media Sosial
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Sebarkan fakta jurnalisme tepercaya Arun News ke rekan dan grup Anda.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-slate-950 border border-[#25D366]/40 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Bagikan ke WhatsApp"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>

              {/* Twitter / X */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-white text-slate-200 hover:text-slate-950 border border-slate-700 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Bagikan ke Twitter / X"
              >
                <TwitterXIcon />
                <span>Twitter / X</span>
              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Bagikan ke Facebook"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </a>

              {/* Salin Tautan */}
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-amber-400 border border-slate-800 text-xs font-semibold transition-all shadow-sm active:scale-95 relative cursor-pointer"
                title="Salin Tautan Berita"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Tersalin!' : 'Salin Tautan'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Reactions */}
          <div className="mt-8 p-5 bg-[#08152e] rounded-xl border border-blue-900/60">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Bagaimana Tanggapan Anda Terhadap Berita Ini?
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => onReaction(article.id, 'like')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-slate-200 transition-all active:scale-95"
              >
                <ThumbsUp className="w-4 h-4 text-blue-400" />
                <span>Suka</span>
                <span className="font-mono tabular-nums text-amber-400">({article.reactions.like})</span>
              </button>

              <button
                onClick={() => onReaction(article.id, 'impressed')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-slate-200 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Kagum</span>
                <span className="font-mono tabular-nums text-amber-400">({article.reactions.impressed})</span>
              </button>

              <button
                onClick={() => onReaction(article.id, 'inspired')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-slate-200 transition-all active:scale-95"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Inspiratif</span>
                <span className="font-mono tabular-nums text-amber-400">({article.reactions.inspired})</span>
              </button>

              <button
                onClick={() => onReaction(article.id, 'sad')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-slate-200 transition-all active:scale-95"
              >
                <span>😢</span>
                <span>Prihatin</span>
                <span className="font-mono tabular-nums text-amber-400">({article.reactions.sad})</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-10 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-editorial">
                  Kolom Komentar ({article.comments.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Bebas &amp; Santun sesuai UU ITE</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6 p-4 rounded-xl bg-[#08152e] border border-blue-900/60">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Nama atau Inisial Anda (opsional)"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="mb-3">
                <textarea
                  rows={3}
                  placeholder="Tuliskan pandangan atau tanggapan Anda mengenai berita ini..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Komentar</span>
                </button>
              </div>
            </form>

            {/* Existing Comments List */}
            <div className="space-y-3">
              {article.comments.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4 italic">
                  Belum ada komentar. Jadilah yang pertama memberikan ulasan!
                </p>
              ) : (
                article.comments.map((comm) => (
                  <div key={comm.id} className="p-3.5 rounded-lg bg-[#071329] border border-slate-800/80 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-400/30">
                      {comm.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{comm.author}</span>
                        <span className="text-[11px] text-slate-500">{comm.timeAgo}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {comm.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Articles Footer */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-800">
              <h3 className="text-base font-bold text-white font-editorial mb-4">
                Berita Terkait Lainnya
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 rounded-xl bg-[#08152e] border border-blue-900/60 hover:border-amber-400/40 cursor-pointer group transition-colors flex items-center gap-3"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-semibold">{rel.category}</span>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-tight">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
