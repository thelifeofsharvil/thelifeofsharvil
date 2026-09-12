import React, { useRef } from 'react';
import { Instagram, ArrowDown, ArrowUpRight, Camera, Upload } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const Hero: React.FC = () => {
  const { config, setHeroImage, openStudio } = useCreator();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHeroImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToPhotography = () => {
    const element = document.querySelector('#photography');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[680px] flex items-end justify-start overflow-hidden bg-[#09090b]"
    >
      {/* Background Main Visual Photograph (Dominated by Sharvil's Photo) */}
      <div className="absolute inset-0 z-0">
        <img
          id="hero-photograph"
          src={config.heroImageUrl}
          alt="Sharvil - Photographer & Creator"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.06] transition-transform duration-1000 scale-[1.02] hover:scale-100"
          referrerPolicy="no-referrer"
        />

        {/* Subtle dark gradient overlay ensuring editorial typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Film grain subtle overlay */}
        <div className="absolute inset-0 film-grain opacity-60 pointer-events-none" />
      </div>

      {/* Floating Quick Action for Sharvil to Upload / Change Hero Image */}
      <div className="absolute top-24 right-5 sm:right-8 z-20">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          id="change-hero-photo-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Upload your personal photo for the hero background"
          className="group flex items-center gap-2 px-3 py-1.5 bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-full text-xs text-zinc-300 hover:text-white transition-all shadow-lg"
        >
          <Camera className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          <span className="text-[11px] font-mono tracking-wider">Change Hero Photo</span>
          <Upload className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
        </button>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
        <div className="max-w-3xl space-y-6">
          {/* Small Subtext */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-400/80" />
            <p
              id="hero-subtext"
              className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-zinc-300 font-mono"
            >
              {config.heroSubtext}
            </p>
          </div>

          {/* Creator Name */}
          <h1
            id="hero-creator-name"
            className="font-['Syne'] text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-none uppercase select-none"
          >
            {config.creatorName}
          </h1>

          {/* Main Tagline */}
          <p
            id="hero-tagline"
            className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl md:text-4xl text-zinc-200 font-light tracking-wide"
          >
            {config.heroTagline}
          </p>

          {/* Two Minimal Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            {/* [ VISIT INSTAGRAM ↗ ] */}
            <a
              id="hero-visit-instagram-btn"
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 shadow-xl"
            >
              <Instagram className="w-4 h-4" />
              <span>VISIT INSTAGRAM</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* [ EXPLORE ↓ ] */}
            <button
              id="hero-explore-btn"
              onClick={scrollToPhotography}
              className="group flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 rounded-full transition-all duration-300"
            >
              <span>EXPLORE</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-zinc-300" />
            </button>
          </div>
        </div>

        {/* Small Scroll Indicator at Bottom */}
        <div className="mt-14 sm:mt-16 flex items-center justify-between border-t border-white/[0.08] pt-6">
          <button
            id="scroll-to-explore-indicator"
            onClick={scrollToPhotography}
            className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-zinc-400 hover:text-white uppercase transition-colors"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-zinc-400" />
          </button>

          <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-zinc-500">
            <span>{config.instagramHandle}</span>
            <span>•</span>
            <span id="hero-location">{config.location || 'NAVI MUMBAI'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
