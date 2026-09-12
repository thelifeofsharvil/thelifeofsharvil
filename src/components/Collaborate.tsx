import React, { useState } from 'react';
import { Mail, Instagram, ArrowRight, Copy, Check, Sparkles, Send, Briefcase } from 'lucide-react';
import { useCreator } from '../context/CreatorContext';

export const Collaborate: React.FC = () => {
  const { config, openStudio } = useCreator();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('Brand Collaboration');
  const [inquiryText, setInquiryText] = useState('');
  const [showInquirySent, setShowInquirySent] = useState(false);

  const collabTypes = [
    'Brand Collaborations',
    'Photography Collaborations',
    'Content Collaborations',
    'Creator Collaborations',
    'Events',
    'Other Creative Opportunities',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Collab Inquiry: ${selectedType}`);
    const body = encodeURIComponent(
      `Hi Sharvil,\n\nI came across your site (@thelifeofsharvil) and would love to collaborate on a ${selectedType}.\n\nMessage:\n${inquiryText}\n\nBest regards.`
    );
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    setShowInquirySent(true);
    setTimeout(() => setShowInquirySent(false), 4000);
  };

  return (
    <section
      id="collaborate"
      className="relative w-full py-28 sm:py-36 bg-[#09090b] text-zinc-100 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-[#09090b] p-8 sm:p-12 md:p-16 border border-white/[0.1] shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono tracking-widest uppercase">
              <Briefcase className="w-3.5 h-3.5 text-zinc-300" />
              <span>Partnerships & Inquiries</span>
            </div>

            <h2
              id="collab-heading"
              className="font-['Syne'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-white leading-none"
            >
              LET'S CREATE SOMETHING.
            </h2>

            <p
              id="collab-subtext"
              className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-zinc-300 font-light"
            >
              "Got an idea? Want to collaborate, create content or work together?"
            </p>

            {/* Collaboration Opportunity Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 pb-4">
              {collabTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                    selectedType === type
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Primary Action Button: Large CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                id="dm-collab-btn"
                href={`https://ig.me/m/${config.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 text-sm font-extrabold tracking-[0.2em] uppercase text-black bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 shadow-2xl hover:scale-[1.02]"
              >
                <Instagram className="w-5 h-5" />
                <span>DM ME FOR COLLABS →</span>
              </a>
            </div>

            {/* Direct Handles and Email Copy Area */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
              {/* Instagram Card */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    Instagram Direct
                  </p>
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-zinc-300"
                  >
                    {config.instagramHandle}
                  </a>
                </div>
                <Instagram className="w-5 h-5 text-zinc-400" />
              </div>

              {/* Email Card with One-Click Copy */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex items-center justify-between">
                <div className="overflow-hidden mr-2">
                  <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    Professional Email
                  </p>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-zinc-300 truncate block"
                    title={config.email}
                  >
                    {config.email}
                  </a>
                </div>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors shrink-0"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick Collaboration Message Composer */}
            <form
              onSubmit={handleSendInquiry}
              className="pt-6 max-w-xl mx-auto space-y-3 text-left"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                  Quick Inquiry for {selectedType}
                </label>
                <button
                  type="button"
                  onClick={openStudio}
                  className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300"
                >
                  Edit email settings
                </button>
              </div>

              <div className="relative">
                <textarea
                  id="collab-inquiry-input"
                  rows={3}
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  placeholder="Tell me a bit about your project, timeline, or idea..."
                  className="w-full rounded-xl bg-black/60 border border-white/[0.08] focus:border-white/30 p-4 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-zinc-500">
                  Direct to {config.email}
                </span>

                <button
                  id="submit-collab-inquiry-btn"
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase bg-zinc-800 hover:bg-zinc-700 text-white transition-all"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Email Inquiry</span>
                </button>
              </div>

              {showInquirySent && (
                <p className="text-xs font-mono text-emerald-400 text-center pt-2">
                  Mail composer launched! Thanks for reaching out.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
