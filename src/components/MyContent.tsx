import React, { useState } from 'react';
import { Instagram, Play, ArrowUpRight, Film, Heart, MessageCircle } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const MyContent: React.FC = () => {
  const { instagramPosts, config } = useCreator();
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  return (
    <section id="content" className="relative w-full py-28 sm:py-36 bg-[#0c0c0e] text-zinc-100 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-zinc-800 text-zinc-400">
                <Instagram className="w-3.5 h-3.5" />
              </span>
              <p className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
                {config.instagramHandle} • Reels & Visuals
              </p>
            </div>
            <h2
              id="content-heading"
              className="font-['Syne'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-white"
            >
              MY CONTENT
            </h2>
            <p
              id="content-subheading"
              className="font-['Cormorant_Garamond'] italic text-xl sm:text-2xl text-zinc-300 font-light"
            >
              "A collection of things I post, create and randomly capture."
            </p>
          </div>

          <a
            id="watch-more-ig-header-btn"
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-200"
          >
            <span>WATCH MORE ON INSTAGRAM</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Selected Instagram Reels / Posts Grid */}
        <div
          id="instagram-content-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10"
        >
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              id={`instagram-card-${post.id}`}
              onMouseEnter={() => setActivePlayingId(post.id)}
              onMouseLeave={() => setActivePlayingId(null)}
              className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-2xl"
            >
              {/* Media Thumbnail with Reel Aspect Ratio (9:14 or 4:5 vibe) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette & Grain */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

                {/* Top Badge: Type & Date */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                  <span className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md border border-white/10 text-white rounded-full">
                    <Film className="w-3 h-3 text-zinc-300" />
                    <span>{post.type.toUpperCase()}</span>
                  </span>

                  {post.likesOrViews && (
                    <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 rounded-full">
                      {post.likesOrViews}
                    </span>
                  )}
                </div>

                {/* Center Play Button Pulse Effect on Hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 ${
                      activePlayingId === post.id
                        ? 'scale-110 bg-white text-black opacity-100'
                        : 'scale-90 opacity-40 group-hover:opacity-80'
                    }`}
                  >
                    <Play
                      className={`w-5 h-5 ml-0.5 ${
                        activePlayingId === post.id ? 'fill-black' : 'fill-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2 z-10">
                  <p className="font-['Syne'] text-lg font-bold text-white leading-tight">
                    {post.title}
                  </p>
                  <p className="text-xs text-zinc-300 line-clamp-2 font-light">
                    {post.caption}
                  </p>
                </div>
              </div>

              {/* Card Footer with Direct Instagram CTA */}
              <div className="p-4 bg-zinc-950 flex items-center justify-between border-t border-white/[0.06]">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Instagram className="w-3.5 h-3.5 text-zinc-500" />
                  {config.instagramHandle}
                </span>

                <a
                  href={post.instagramUrl || config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono tracking-wider text-white hover:text-zinc-300 underline-offset-4 hover:underline"
                >
                  <span>View Post</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 text-center">
          <a
            id="watch-more-instagram-btn"
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 shadow-2xl hover:scale-[1.02]"
          >
            <Instagram className="w-4 h-4" />
            <span>WATCH MORE ON INSTAGRAM ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};
