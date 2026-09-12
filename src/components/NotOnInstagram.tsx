import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';
import { ExclusiveItem } from '../types';

export const NotOnInstagram: React.FC = () => {
  const { exclusiveItems } = useCreator();
  // Store revealed state per item ID or all revealed
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [revealAll, setRevealAll] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<ExclusiveItem | null>(null);

  const toggleReveal = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRevealAll = () => {
    const nextState = !revealAll;
    setRevealAll(nextState);
    const updated: Record<string, boolean> = {};
    exclusiveItems.forEach((item) => {
      updated[item.id] = nextState;
    });
    setRevealedIds(updated);
  };

  return (
    <section
      id="exclusive"
      className="relative w-full py-28 sm:py-36 bg-[#08080a] text-zinc-100 overflow-hidden border-t border-white/[0.05]"
    >
      {/* Background ambient lighting - dark and moody */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-950/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse" />
              <p className="text-xs font-mono tracking-[0.25em] uppercase text-zinc-400">
                The Vault • Off-Feed Archive
              </p>
            </div>
            <h2
              id="exclusive-heading"
              className="font-['Syne'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-white"
            >
              NOT ON INSTAGRAM
            </h2>
            <p
              id="exclusive-subheading"
              className="font-['Cormorant_Garamond'] italic text-xl sm:text-2xl text-zinc-300 font-light"
            >
              "A few things I kept off the feed."
            </p>
          </div>

          {/* Reveal All Toggle */}
          <div className="flex items-center gap-3">
            <button
              id="reveal-all-vault-btn"
              onClick={handleRevealAll}
              className="group flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-full transition-all duration-200"
            >
              {revealAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{revealAll ? 'Conceal All' : 'Reveal All Vault'}</span>
            </button>
          </div>
        </div>

        <p className="text-xs font-mono text-zinc-500 py-4 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          Hover or tap on any frame to dispel the lens blur and reveal unreleased memories.
        </p>

        {/* Vault Grid - Unique Darkroom/Film Slate presentation */}
        <div
          id="exclusive-items-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6"
        >
          {exclusiveItems.map((item, index) => {
            const isItemRevealed = revealAll || !!revealedIds[item.id];

            return (
              <div
                key={item.id}
                id={`exclusive-card-${item.id}`}
                onClick={() => toggleReveal(item.id)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-zinc-600 transition-all duration-500 cursor-pointer shadow-2xl"
              >
                {/* Visual Area */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black select-none">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      isItemRevealed
                        ? 'filter blur-0 scale-100 brightness-100'
                        : 'filter blur-[16px] scale-110 brightness-[0.45] group-hover:blur-[8px] group-hover:brightness-75'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Darkroom Frame Grid Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                  {/* Top Type Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase bg-black/80 backdrop-blur-md border border-white/10 text-zinc-300 rounded-full">
                      {item.type}
                    </span>

                    <span className="text-[10px] font-mono text-zinc-500">
                      ROLL 0{index + 1}
                    </span>
                  </div>

                  {/* Locked/Reveal Indicator in Center */}
                  {!isItemRevealed && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-80">
                      <div className="w-12 h-12 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-zinc-300 mb-2">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                        Tap / Hover to Reveal
                      </span>
                    </div>
                  )}

                  {/* Bottom Text Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5 z-10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-['Syne'] text-lg font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-400">{item.date}</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-light line-clamp-3">
                      {item.note}
                    </p>
                  </div>
                </div>

                {/* Minimal Card Base Bar */}
                <div className="px-5 py-3 bg-zinc-950 flex items-center justify-between border-t border-white/[0.06] text-[11px] font-mono">
                  <span className="text-zinc-500">OFF-RECORD MEMORY</span>
                  <button
                    onClick={(e) => toggleReveal(item.id, e)}
                    className="text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    {isItemRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Conceal</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Unblur</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
