import React from 'react';
import { CreatorProvider, useCreator } from './context/CreatorContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThroughMyLens } from './components/ThroughMyLens';
import { MyContent } from './components/MyContent';
import { NotOnInstagram } from './components/NotOnInstagram';
import { BroadcastChannel } from './components/BroadcastChannel';
import { AboutMe } from './components/AboutMe';
import { Collaborate } from './components/Collaborate';
import { FollowMe } from './components/FollowMe';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { CreatorStudioModal } from './components/CreatorStudioModal';
import { Sliders } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { openStudio } = useCreator();

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] font-['Plus_Jakarta_Sans'] antialiased selection:bg-white selection:text-black">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. HOMEPAGE / HERO */}
        <Hero />

        {/* 2. THROUGH MY LENS — PHOTOGRAPHY */}
        <ThroughMyLens />

        {/* 3. MY CONTENT — INSTAGRAM */}
        <MyContent />

        {/* 4. NOT ON INSTAGRAM — EXCLUSIVE CONTENT */}
        <NotOnInstagram />

        {/* 5. BROADCAST CHANNEL */}
        <BroadcastChannel />

        {/* 6. ABOUT ME */}
        <AboutMe />

        {/* 7. LET'S COLLABORATE */}
        <Collaborate />

        {/* 8. FOLLOW ME */}
        <FollowMe />
      </main>

      {/* 9. FOOTER */}
      <Footer />

      {/* Fullscreen Exhibition Lightbox */}
      <LightboxModal />

      {/* Creator Editing Studio */}
      <CreatorStudioModal />

      {/* Discreet floating Creator Studio trigger on desktop and tablet */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          id="floating-studio-btn"
          onClick={openStudio}
          title="Open Sharvil Creator Studio (Edit content, links, uploads)"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/25 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <Sliders className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
          <span className="text-[11px] font-mono tracking-wider">Creator Studio</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CreatorProvider>
      <MainAppContent />
    </CreatorProvider>
  );
}
