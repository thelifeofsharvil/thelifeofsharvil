import React from 'react';
import { ArrowUp, Instagram, Mail, Sliders } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const Footer: React.FC = () => {
  const { config, openStudio } = useCreator();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="main-footer"
      className="relative w-full bg-[#050507] text-zinc-400 py-16 sm:py-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="space-y-2">
            <h3 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
              {config.creatorName}
            </h3>
            <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              {config.heroSubtext}
            </p>
            <p className="text-xs font-mono text-zinc-500 pt-1">
              Instagram:{' '}
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white underline-offset-2 hover:underline"
              >
                {config.instagramHandle}
              </a>
            </p>
          </div>

          {/* Links List */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono tracking-wider uppercase">
            <a
              id="footer-link-instagram"
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <button
              id="footer-link-photography"
              onClick={() => handleNavClick('#photography')}
              className="text-zinc-400 hover:text-white transition-colors uppercase"
            >
              Photography
            </button>
            <button
              id="footer-link-broadcast"
              onClick={() => handleNavClick('#broadcast')}
              className="text-zinc-400 hover:text-white transition-colors uppercase"
            >
              Broadcast Channel
            </button>
            <button
              id="footer-link-collab"
              onClick={() => handleNavClick('#collaborate')}
              className="text-zinc-400 hover:text-white transition-colors uppercase"
            >
              Collaborate
            </button>
            <a
              id="footer-link-contact"
              href={`mailto:${config.email}`}
              className="text-zinc-400 hover:text-white transition-colors uppercase"
            >
              Contact
            </a>
          </div>

          {/* Back to top button */}
          <button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 transition-all border border-zinc-800"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright and studio quick access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <p id="footer-copyright">
            © 2026 {config.creatorName}. All visual rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span>Built for modern storytelling</span>
            <span>•</span>
            <button
              onClick={openStudio}
              className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" />
              <span>Creator Mode</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
