import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X, Sliders, ArrowUpRight } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const Navbar: React.FC = () => {
  const { config, openStudio } = useCreator();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'PHOTOGRAPHY', href: '#photography' },
    { label: 'CONTENT', href: '#content' },
    { label: 'EXCLUSIVE', href: '#exclusive' },
    { label: 'BROADCAST', href: '#broadcast' },
    { label: 'ABOUT', href: '#about' },
    { label: 'COLLAB', href: '#collaborate' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#09090b]/85 backdrop-blur-md border-b border-white/[0.06] py-3.5'
            : 'bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2 text-left"
          >
            <span className="font-['Syne'] font-extrabold tracking-widest text-lg sm:text-xl text-white group-hover:text-zinc-300 transition-colors">
              {config.creatorName}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-subtle" />
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase()}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[11px] font-medium tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Studio Edit button */}
            <button
              id="open-studio-btn-nav"
              onClick={openStudio}
              title="Open Creator Studio (Edit content, links, photos)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 rounded-full transition-all duration-200"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">Studio Edit</span>
            </button>

            {/* Instagram Link */}
            <a
              id="instagram-nav-btn"
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wider font-medium text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-200"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{config.instagramHandle}</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-studio-toggle"
              onClick={openStudio}
              aria-label="Studio edit"
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 border border-zinc-800 rounded-full"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-30 bg-[#09090b]/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10 sm:hidden animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <p className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
              Navigation
            </p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-['Syne'] text-2xl font-bold tracking-wider text-zinc-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800 space-y-4">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold tracking-wide text-black bg-white rounded-xl"
            >
              <Instagram className="w-4 h-4" />
              <span>VISIT {config.instagramHandle}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openStudio();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>CREATOR STUDIO & PHOTO UPLOADER</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
