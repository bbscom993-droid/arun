/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_ARTICLES, BREAKING_NEWS_ITEMS } from './data/newsData';
import { INITIAL_EDITORIAL_STAFF, INITIAL_AD_CAMPAIGNS, INITIAL_MEDIA_SETTINGS } from './data/editorialData';
import { Article, Comment, NewsCategory } from './types/news';
import { EditorialStaff, AdCampaign, MediaSettings } from './types/editorial';
import { TopNav } from './components/TopNav';
import { BreakingTicker } from './components/BreakingTicker';
import { MarketBar } from './components/MarketBar';
import { HeroLead } from './components/HeroLead';
import { NewsGrid } from './components/NewsGrid';
import { VideoSection } from './components/VideoSection';
import { OpinionSection } from './components/OpinionSection';
import { ArticleModal } from './components/ArticleModal';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { LaporWargaModal } from './components/LaporWargaModal';
import { AdLeaderboard } from './components/AdLeaderboard';
import { IklanModal } from './components/IklanModal';
import { NewsletterDigest } from './components/NewsletterDigest';
import { Footer } from './components/Footer';
import { RedaksiDashboard } from './components/admin/RedaksiDashboard';

export default function App() {
  // Routing State ('portal' vs 'redaksi')
  const [currentRoute, setCurrentRoute] = useState<'portal' | 'redaksi'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash === '#/redaksi' ||
        hash === '#redaksi' ||
        path === '/redaksi' ||
        search.includes('page=redaksi') ||
        search.includes('view=redaksi')
      ) {
        return 'redaksi';
      }
    }
    return 'portal';
  });

  // State with LocalStorage persistence fallback
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('arun_news_articles');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_ARTICLES;
  });

  const [staffList, setStaffList] = useState<EditorialStaff[]>(() => {
    try {
      const saved = localStorage.getItem('arun_editorial_staff');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_EDITORIAL_STAFF;
  });

  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>(() => {
    try {
      const saved = localStorage.getItem('arun_ad_campaigns');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_AD_CAMPAIGNS;
  });

  const [mediaSettings, setMediaSettings] = useState<MediaSettings>(() => {
    try {
      const saved = localStorage.getItem('arun_media_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_MEDIA_SETTINGS;
  });

  const [breakingNewsList, setBreakingNewsList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('arun_breaking_news');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return BREAKING_NEWS_ITEMS;
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem('arun_news_articles', JSON.stringify(articles));
    } catch (e) {
      // ignore
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('arun_editorial_staff', JSON.stringify(staffList));
    } catch (e) {
      // ignore
    }
  }, [staffList]);

  useEffect(() => {
    try {
      localStorage.setItem('arun_ad_campaigns', JSON.stringify(adCampaigns));
    } catch (e) {
      // ignore
    }
  }, [adCampaigns]);

  useEffect(() => {
    try {
      localStorage.setItem('arun_media_settings', JSON.stringify(mediaSettings));
    } catch (e) {
      // ignore
    }
  }, [mediaSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('arun_breaking_news', JSON.stringify(breakingNewsList));
    } catch (e) {
      // ignore
    }
  }, [breakingNewsList]);

  // URL Hash Navigation Listener
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash === '#/redaksi' ||
        hash === '#redaksi' ||
        path === '/redaksi' ||
        search.includes('page=redaksi') ||
        search.includes('view=redaksi')
      ) {
        setCurrentRoute('redaksi');
      } else {
        setCurrentRoute('portal');
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const navigateToRedaksi = () => {
    window.location.hash = '/redaksi';
    setCurrentRoute('redaksi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortal = () => {
    window.location.hash = '';
    setCurrentRoute('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reader state
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['art-1', 'art-4']);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isBookmarkDrawerOpen, setIsBookmarkDrawerOpen] = useState(false);
  const [isLaporWargaOpen, setIsLaporWargaOpen] = useState(false);
  const [isIklanModalOpen, setIsIklanModalOpen] = useState(false);
  const [selectedIklanFormat, setSelectedIklanFormat] = useState('Top Header Leaderboard Banner');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Handle Open Iklan Modal with specific format
  const handleOpenIklan = (formatName?: string) => {
    setSelectedIklanFormat(formatName || 'Top Header Leaderboard Banner');
    setIsIklanModalOpen(true);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const isBookmarked = (articleId: string) => bookmarkedIds.includes(articleId);

  // Reaction Handler
  const handleReaction = (
    articleId: string,
    reactionType: 'like' | 'impressed' | 'inspired' | 'sad'
  ) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const updated = {
            ...art,
            reactions: {
              ...art.reactions,
              [reactionType]: art.reactions[reactionType] + 1
            }
          };
          if (activeArticle && activeArticle.id === articleId) {
            setActiveArticle(updated);
          }
          return updated;
        }
        return art;
      })
    );
  };

  // Add Comment Handler
  const handleAddComment = (articleId: string, comment: Comment) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const updated = {
            ...art,
            commentsCount: art.commentsCount + 1,
            comments: [comment, ...art.comments]
          };
          if (activeArticle && activeArticle.id === articleId) {
            setActiveArticle(updated);
          }
          return updated;
        }
        return art;
      })
    );
  };

  // Citizen Report Submission Handler
  const handleReportSubmit = (newReport: Article) => {
    setArticles((prev) => [newReport, ...prev]);
    setActiveCategory('Lapor Warga');
    setActiveArticle(newReport);
  };

  // Filtered Articles based on Category and Search Query
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCategory =
        activeCategory === 'Semua' || art.category === activeCategory;
      const matchSearch =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  // Derived datasets
  const headlineArticle = useMemo(() => {
    return articles.find((a) => a.isHeadline) || articles[0];
  }, [articles]);

  const secondaryArticles = useMemo(() => {
    return articles.filter((a) => !a.isHeadline).slice(0, 3);
  }, [articles]);

  const popularArticles = useMemo(() => {
    return articles
      .filter((a) => a.isPopular)
      .sort((a, b) => (a.popularRank || 99) - (b.popularRank || 99))
      .slice(0, 5);
  }, [articles]);

  const opinionArticles = useMemo(() => {
    return articles.filter((a) => a.category === 'Legalitas' || a.id === 'art-8');
  }, [articles]);

  const savedArticlesList = useMemo(() => {
    return articles.filter((a) => bookmarkedIds.includes(a.id));
  }, [articles, bookmarkedIds]);

  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return articles
      .filter((a) => a.id !== activeArticle.id)
      .filter((a) => a.category === activeArticle.category || a.tags.some((t) => activeArticle.tags.includes(t)))
      .slice(0, 2);
  }, [articles, activeArticle]);

  // Handle Breaking Headline Click
  const handleSelectBreaking = (headlineText: string) => {
    if (headlineText.includes('POLITIK') || headlineText.includes('Pilkada')) {
      const art = articles.find((a) => a.category === 'Politik');
      setActiveArticle(art || articles[0]);
    } else if (headlineText.includes('OLAHRAGA') || headlineText.includes('Garuda')) {
      const art = articles.find((a) => a.category === 'Olahraga');
      setActiveArticle(art || articles[0]);
    } else if (headlineText.includes('KRIMINAL') || headlineText.includes('Bareskrim')) {
      const art = articles.find((a) => a.category === 'Kriminal');
      setActiveArticle(art || articles[0]);
    } else if (headlineText.includes('EKONOMI') || headlineText.includes('IHSG')) {
      const art = articles.find((a) => a.category === 'Ekonomi');
      setActiveArticle(art || articles[0]);
    } else if (headlineText.includes('LEGALITAS') || headlineText.includes('MK')) {
      const art = articles.find((a) => a.category === 'Legalitas');
      setActiveArticle(art || articles[0]);
    } else if (headlineText.includes('LAPOR WARGA') || headlineText.includes('Way Kanan')) {
      const art = articles.find((a) => a.category === 'Lapor Warga');
      setActiveArticle(art || articles[0]);
    } else if (headlineText.includes('DAERAH') || headlineText.includes('Natuna')) {
      const art = articles.find((a) => a.category === 'Daerah');
      setActiveArticle(art || articles[0]);
    } else {
      setActiveArticle(articles[0]);
    }
  };

  // If user navigated to separate link '#/redaksi', render RedaksiDashboard
  if (currentRoute === 'redaksi') {
    return (
      <RedaksiDashboard
        articles={articles}
        onUpdateArticles={setArticles}
        staffList={staffList}
        onUpdateStaffList={setStaffList}
        adCampaigns={adCampaigns}
        onUpdateAdCampaigns={setAdCampaigns}
        mediaSettings={mediaSettings}
        onUpdateMediaSettings={setMediaSettings}
        breakingNewsList={breakingNewsList}
        onUpdateBreakingNewsList={setBreakingNewsList}
        onNavigateHome={navigateToPortal}
      />
    );
  }

  // Otherwise render reader portal
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#09152a] text-slate-100' : 'bg-[#f4f7fb] text-slate-900'} flex flex-col font-sans transition-colors duration-200 selection:bg-amber-400 selection:text-slate-950`}>
      {/* 1. Top Navigation Bar with strict 3-zone contract & utility ribbon */}
      <TopNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarkDrawerOpen(true)}
        onOpenLaporWarga={() => setIsLaporWargaOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onNavigateRedaksi={navigateToRedaksi}
      />

      {/* Ad Leaderboard Slot (Top Header 970x90) */}
      <AdLeaderboard onOpenIklan={handleOpenIklan} />

      {/* 2. Urgent Flash Breaking News Ticker */}
      <BreakingTicker onSelectHeadline={handleSelectBreaking} items={breakingNewsList} />

      {/* 3. Real-time Market & Economic Indices Ribbon */}
      <MarketBar />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {/* Only show Hero & Lead section when on default 'Semua' view and not searching */}
        {activeCategory === 'Semua' && !searchQuery && (
          <HeroLead
            headlineArticle={headlineArticle}
            secondaryArticles={secondaryArticles}
            popularArticles={popularArticles}
            onSelectArticle={(art) => setActiveArticle(art)}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onOpenIklan={handleOpenIklan}
          />
        )}

        {/* 4. Filterable News Grid & Channel Feed */}
        <NewsGrid
          articles={filteredArticles}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onSelectArticle={(art) => setActiveArticle(art)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked}
          onOpenLaporWarga={() => setIsLaporWargaOpen(true)}
          onOpenIklan={handleOpenIklan}
        />

        {/* 5. Arun Video & Multimedia Section */}
        {activeCategory === 'Semua' && !searchQuery && (
          <VideoSection />
        )}

        {/* 6. Arun Analisis / Legalitas & Opini */}
        {(activeCategory === 'Semua' || activeCategory === 'Legalitas') && !searchQuery && (
          <OpinionSection
            opinionArticles={opinionArticles}
            onSelectArticle={(art) => setActiveArticle(art)}
          />
        )}
      </main>

      {/* 7. Warta Pagi Daily Digest Newsletter Section (Prominently above Footer) */}
      <NewsletterDigest />

      {/* 8. Comprehensive Portal Footer with Sawer Kopi Redaksi */}
      <Footer
        onOpenIklan={() => handleOpenIklan('Kemitraan Khusus & CSR Pemda / BUMN')}
        onNavigateRedaksi={navigateToRedaksi}
      />

      {/* Article Reader Modal with External Social Sharing & In-Article Ad */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={activeArticle ? isBookmarked(activeArticle.id) : false}
        onAddComment={handleAddComment}
        onReaction={handleReaction}
        relatedArticles={relatedArticles}
        onSelectRelated={(art) => setActiveArticle(art)}
        onOpenIklan={handleOpenIklan}
      />

      {/* Bookmark Drawer */}
      <BookmarkDrawer
        isOpen={isBookmarkDrawerOpen}
        onClose={() => setIsBookmarkDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => setActiveArticle(art)}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => setBookmarkedIds([])}
      />

      {/* Interactive Citizen Journalism Modal (Lapor Warga) */}
      <LaporWargaModal
        isOpen={isLaporWargaOpen}
        onClose={() => setIsLaporWargaOpen(false)}
        onSubmitReport={handleReportSubmit}
      />

      {/* Modal Layanan Pasang Iklan & Kerja Sama Arun News */}
      <IklanModal
        isOpen={isIklanModalOpen}
        onClose={() => setIsIklanModalOpen(false)}
        initialFormat={selectedIklanFormat}
      />
    </div>
  );
}
