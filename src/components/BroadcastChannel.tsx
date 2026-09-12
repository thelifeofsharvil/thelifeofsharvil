import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, Radio, CheckCircle2, LockOpen } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const BroadcastChannel: React.FC = () => {
  const { config, openStudio } = useCreator();

  const channelPerks = [
    'Behind-the-scenes updates & raw footage',
    'Random late-night thoughts & audio notes',
    'First access to new content & drops',
    'Exclusive uncompressed photographs',
    'Interactive community polls & Q&As',
    'Personal life updates & travel plans',
    'Things I don’t always post publicly on the feed',
  ];

  return (
    <section
      id="broadcast"
      className="relative w-full py-28 sm:py-36 bg-[#09090b] text-zinc-100 overflow-hidden border-t border-white/[0.04]"
    >
      {/* Cinematic subtle glow circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-zinc-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-zinc-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-8 sm:p-12 md:p-16 border border-white/[0.1] shadow-2xl overflow-hidden">
          {/* Subtle noise and status ribbon */}
          <div className="absolute top-0 right-0 p-6 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Live Channel
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-zinc-400">
                <Radio className="w-4 h-4 text-white" />
                <p className="text-xs font-mono tracking-[0.25em] uppercase text-zinc-400">
                  Direct Broadcast
                </p>
              </div>

              <div>
                <p className="text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-semibold mb-2">
                  YOU'RE INVITED.
                </p>
                <h2
                  id="broadcast-title"
                  className="font-['Syne'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-white"
                >
                  SHARVIL'S BROADCAST
                </h2>
              </div>

              <p
                id="broadcast-description"
                className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-zinc-300 font-light"
              >
                "A little more personal than Instagram."
              </p>

              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-xl">
                The main Instagram feed is curated. The broadcast channel is where I share the real, unfiltered process: raw voice notes, spontaneous location drops, photography experiments, and thoughts before they become posts.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  id="join-broadcast-btn"
                  href={config.broadcastChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 shadow-2xl hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>JOIN MY BROADCAST CHANNEL</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  onClick={openStudio}
                  className="px-4 py-3 text-xs font-mono text-zinc-400 hover:text-zinc-200 underline-offset-4 hover:underline"
                >
                  Edit channel link
                </button>
              </div>
            </div>

            {/* Right Column: Perks / Inside Look */}
            <div className="lg:col-span-5 bg-black/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  Inside The Channel
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  INSTAGRAM BROADCAST
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {channelPerks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="p-1 rounded bg-zinc-900 border border-white/10 text-zinc-300 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-300 leading-snug">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                <p className="text-[11px] font-mono text-zinc-500">
                  Free to join for all Instagram followers • One-click entry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
