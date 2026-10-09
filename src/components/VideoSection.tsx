import React, { useState } from 'react';
import { Play, Eye, Clock, X, Volume2, Maximize2, Pause } from 'lucide-react';
import { VIDEO_STORIES } from '../data/newsData';
import { VideoNews } from '../types/news';

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoNews | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="bg-gradient-to-b from-[#071329] via-[#091b3b] to-[#071329] py-12 border-y border-amber-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded tracking-wider">
                ARUN VIDEO
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white font-editorial">
                Liputan Video &amp; Visual Dokumenter
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Jurnalisme audio-visual Arun News: investigasi mendalam, aspirasi daerah, dan fakta lapangan Nusantara.
            </p>
          </div>

          <div className="text-xs text-amber-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>SIARAN DIGITAL 24 JAM</span>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEO_STORIES.map((vid) => (
            <div
              key={vid.id}
              onClick={() => {
                setActiveVideo(vid);
                setIsPlaying(true);
              }}
              className="group bg-[#0c1f44] border border-blue-800/40 hover:border-amber-400/50 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail with Play Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"></div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-slate-950/90 text-amber-300 text-[11px] font-mono tabular-nums px-2 py-0.5 rounded font-bold border border-slate-700">
                  {vid.duration}
                </div>

                {/* Category kicker */}
                <div className="absolute top-2.5 left-2.5 bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  {vid.category}
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400/95 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-300 transition-all">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug font-editorial">
                  {vid.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-amber-400" />
                    {vid.views}
                  </span>
                  <span>{vid.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1b3b] border border-amber-500/40 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#08152e] border-b border-blue-900/50">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-slate-300 font-semibold truncate max-w-md">
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Tutup video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame Simulation */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-75"
              />
              
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                    STREAMING HD
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-amber-400/90 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-xl transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 fill-slate-950" />
                    ) : (
                      <Play className="w-7 h-7 fill-slate-950 ml-1" />
                    )}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
                    <div className="w-2/5 h-full bg-amber-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 font-mono tabular-nums">
                    <span>01:14 / {activeVideo.duration}</span>
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
                      <Maximize2 className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-white font-editorial">{activeVideo.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
