import React from 'react';
import { Camera, Film, Compass, Heart, Sparkles, Edit3 } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const AboutMe: React.FC = () => {
  const { config, openStudio } = useCreator();
  const { stats } = config;

  const statCards = [
    {
      id: 'stat-photos',
      count: stats.photosCount,
      label: stats.photosLabel,
      desc: stats.photosDesc,
      icon: Camera,
    },
    {
      id: 'stat-reels',
      count: stats.reelsCount,
      label: stats.reelsLabel,
      desc: stats.reelsDesc,
      icon: Film,
    },
    {
      id: 'stat-places',
      count: stats.placesCount,
      label: stats.placesLabel,
      desc: stats.placesDesc,
      icon: Compass,
    },
    {
      id: 'stat-memories',
      count: stats.memoriesCount,
      label: stats.memoriesLabel,
      desc: stats.memoriesDesc,
      icon: Heart,
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-28 sm:py-36 bg-[#0c0c0e] text-zinc-100 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <p className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
                Behind The Lens
              </p>
            </div>

            <h2
              id="about-heading"
              className="font-['Syne'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-white"
            >
              HEY, I'M SHARVIL.
            </h2>

            <p
              id="about-text"
              className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-zinc-200 font-light leading-snug"
            >
              "{config.aboutText}"
            </p>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Based between city lights and secluded mountain ridges. My work is not about perfection or staged aesthetics — it's about holding onto a feeling right before the light fades. Whether it’s an iPhone snap at a rainy railway overpass or long-exposure astro frames in the Western Ghats, this site is my uncensored creative log.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                id="edit-about-btn"
                onClick={openStudio}
                className="flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400 hover:text-white bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Narrative & Stats</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4 Minimal Visual Cards / Statistics */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {statCards.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.id}
                    id={stat.id}
                    className="group relative rounded-2xl bg-zinc-950 p-6 sm:p-7 border border-white/[0.07] hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between h-44"
                  >
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-300 group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                        {stat.label}
                      </span>
                    </div>

                    <div>
                      <p className="font-['Syne'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {stat.count}
                      </p>
                      <p className="font-['Syne'] text-xs font-semibold tracking-wider text-zinc-400 uppercase mt-1">
                        {stat.label}
                      </p>
                      <p className="text-xs text-zinc-500 font-light mt-0.5">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
