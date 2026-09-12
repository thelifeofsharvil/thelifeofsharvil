import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Camera, Maximize2, Minimize2, Share2, Check, Trash2 } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const LightboxModal: React.FC = () => {
  const { activePhoto, closeLightbox, nextPhoto, prevPhoto, deletePhoto } = useCreator();
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, closeLightbox, nextPhoto, prevPhoto]);

  if (!activePhoto) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="lightbox-overlay"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden animate-in fade-in duration-300"
    >
      {/* Top Bar Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-20 bg-black/40">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            EXHIBITION PIECE
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-xs font-mono text-zinc-300">
            {activePhoto.category}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="lightbox-zoom-toggle"
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? 'Fit to screen' : 'Zoom in'}
            className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors"
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            id="lightbox-share-btn"
            onClick={handleShare}
            title="Copy link"
            className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            id="lightbox-delete-btn"
            onClick={() => {
              if (activePhoto && confirm(`Delete "${activePhoto.title}" from exhibition?`)) {
                deletePhoto(activePhoto.id);
                closeLightbox();
              }
            }}
            title="Delete photograph"
            className="p-2 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-950/40 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            id="lightbox-close-btn"
            onClick={closeLightbox}
            aria-label="Close exhibition viewer"
            className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto select-none">
        {/* Navigation Arrow Previous */}
        <button
          id="lightbox-prev-btn"
          onClick={prevPhoto}
          aria-label="Previous photograph"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/10 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Displayed Photograph */}
        <div className="relative max-w-full max-h-[75vh] flex items-center justify-center">
          <img
            id="lightbox-active-image"
            src={activePhoto.url}
            alt={activePhoto.title}
            className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Navigation Arrow Next */}
        <button
          id="lightbox-next-btn"
          onClick={nextPhoto}
          aria-label="Next photograph"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/10 transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Exhibition Placard */}
      <div className="px-6 py-5 border-t border-white/10 bg-black/70 backdrop-blur-md z-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-wide">
              {activePhoto.title}
            </h3>
            <p className="font-['Cormorant_Garamond'] italic text-base sm:text-lg text-zinc-300 font-light">
              {activePhoto.caption}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-zinc-400">
            {activePhoto.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {activePhoto.location}
              </span>
            )}
            {activePhoto.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {activePhoto.date}
              </span>
            )}
            {activePhoto.camera && (
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-zinc-500" />
                {activePhoto.camera}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-semibold tracking-wider uppercase text-[10px]">
              Captured by Sharvil
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
