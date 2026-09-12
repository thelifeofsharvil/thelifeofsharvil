import React, { useState, useMemo, useEffect } from 'react';
import { Camera, MapPin, Calendar, Maximize2, Plus, Filter, Trash2 } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';
import { PhotoCategory, PhotoItem } from '../types';

export const ThroughMyLens: React.FC = () => {
  const { photos, openLightbox, openStudio, deletePhoto } = useCreator();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Dynamic sections created manually by Sharvil with his photos
  const dynamicCategories = useMemo(() => {
    const custom = Array.from(
      new Set(photos.map((p) => p.category?.trim()).filter(Boolean))
    );
    if (custom.length === 0) return [];
    return ['All', ...custom];
  }, [photos]);

  // If selected category was deleted, fallback to 'All'
  useEffect(() => {
    if (selectedCategory !== 'All' && !dynamicCategories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [dynamicCategories, selectedCategory]);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return photos;
    return photos.filter((photo) => photo.category === selectedCategory);
  }, [photos, selectedCategory]);

  return (
    <section id="photography" className="relative w-full py-28 sm:py-36 bg-[#09090b] text-zinc-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <p className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
                Exhibition Archive
              </p>
            </div>
            <h2
              id="photography-heading"
              className="font-['Syne'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-white"
            >
              THROUGH MY LENS
            </h2>
            <p
              id="photography-subheading"
              className="font-['Cormorant_Garamond'] italic text-xl sm:text-2xl text-zinc-300 font-light"
            >
              "Nature, places & little moments I couldn't ignore."
            </p>
          </div>

          {/* Quick Action: Add Photograph */}
          <div className="flex items-center gap-3">
            <button
              id="add-photo-btn-gallery"
              onClick={openStudio}
              className="group flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-full transition-all duration-200"
            >
              <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
              <span>Add Photograph</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category/Section Pills Filter - only rendered if user added multiple manual sections */}
        {dynamicCategories.length > 1 && (
          <div className="py-8 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-1 mr-2 shrink-0">
              <Filter className="w-3 h-3" />
              SECTION:
            </span>
            {dynamicCategories.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'All'
                  ? photos.length
                  : photos.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-lg shadow-white/5'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/60'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] ${
                      isActive ? 'text-zinc-600' : 'text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Masonry Exhibition Style Gallery */}
        <div
          id="photography-masonry-grid"
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pt-4"
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              id={`photo-card-${photo.id}`}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openLightbox(photo)}
              className="group relative break-inside-avoid overflow-hidden rounded-xl bg-zinc-950 border border-white/[0.06] hover:border-white/20 transition-all duration-500 cursor-pointer shadow-xl"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] filter brightness-[0.92] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 rounded-md pointer-events-none">
                    {photo.category}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      id={`delete-photo-${photo.id}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete photograph "${photo.title}"?`)) {
                          deletePhoto(photo.id);
                        }
                      }}
                      title="Delete photograph"
                      className="p-1.5 bg-black/70 hover:bg-red-950/90 text-zinc-400 hover:text-red-400 backdrop-blur-md border border-white/10 hover:border-red-500/30 rounded-md transition-all sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="p-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Bottom Exhibition Info Overlay (Appears smoothly on hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <p className="font-['Syne'] text-lg font-bold text-white tracking-wide">
                    {photo.title}
                  </p>
                  <p className="text-xs text-zinc-300 font-light line-clamp-2 mt-1">
                    {photo.caption}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-y-1 gap-x-3 text-[10px] font-mono text-zinc-400">
                    {photo.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {photo.location}
                      </span>
                    )}
                    {photo.camera && (
                      <span className="flex items-center gap-1">
                        <Camera className="w-3 h-3 text-zinc-500" />
                        {photo.camera}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Minimalist Exhibition Placard below image (always visible for gallery feel) */}
              <div className="p-4 bg-zinc-950 flex items-center justify-between border-t border-white/[0.04]">
                <div>
                  <h3 className="text-sm font-medium text-zinc-200 tracking-wide">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    {photo.location || 'Maharashtra, India'} • {photo.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete photograph "${photo.title}"?`)) {
                        deletePhoto(photo.id);
                      }
                    }}
                    title="Delete photograph"
                    className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
                    Captured by Sharvil
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {photos.length === 0 ? (
          <div className="text-center py-20 sm:py-28 border border-dashed border-zinc-800/80 rounded-2xl p-8 bg-zinc-950/40">
            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-2">
              EXHIBITION GALLERY READY
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              All previous photographs have been cleared. Upload your personal shots directly from your device or paste image URLs to curate your exhibition.
            </p>
            <button
              id="empty-state-add-photo-btn"
              onClick={openStudio}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-mono tracking-widest uppercase font-semibold text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 shadow-xl hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Photograph</span>
            </button>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800/80 rounded-2xl p-8 bg-zinc-950/40">
            <Camera className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No photographs found in "{selectedCategory}".</p>
            <button
              onClick={openStudio}
              className="mt-4 px-5 py-2 text-xs font-mono tracking-wider uppercase text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
            >
              + Add {selectedCategory} Photo
            </button>
          </div>
        ) : null}

        {/* Subtle Exhibition Footer Note */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>
            Curated prints & licensing inquiries available via Direct Message.
          </p>
          <p className="text-zinc-400">
            TOTAL EXHIBITION PIECES: {photos.length}
          </p>
        </div>
      </div>
    </section>
  );
};
