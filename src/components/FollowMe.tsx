import React from 'react';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const FollowMe: React.FC = () => {
  const { config } = useCreator();

  return (
    <section
      id="follow"
      className="relative w-full py-24 sm:py-32 bg-[#09090b] text-zinc-100 border-t border-white/[0.04] text-center"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <p className="text-xs font-mono tracking-[0.3em] text-zinc-400 uppercase">
            Stay Connected
          </p>
        </div>

        <h2
          id="follow-heading"
          className="font-['Syne'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-white"
        >
          FOLLOW THE LIFE
        </h2>

        <div className="space-y-2">
          <p
            id="follow-handle"
            className="font-mono text-2xl sm:text-3xl font-bold tracking-wider text-zinc-200"
          >
            {config.instagramHandle}
          </p>
          <p
            id="follow-description"
            className="text-xs sm:text-sm font-mono tracking-[0.2em] text-zinc-400 uppercase"
          >
            Freestyle content • Photography • Life
          </p>
        </div>

        <div className="pt-4">
          <a
            id="follow-visit-instagram-btn"
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <Instagram className="w-4 h-4" />
            <span>VISIT INSTAGRAM</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
