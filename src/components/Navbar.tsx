import React, { useState, useEffect } from 'react';
import { PlatformModal } from './PlatformModal';
import { detectUserPlatform, PLATFORMS } from '../lib/osDetector';

export const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const detectedOs = detectUserPlatform();
  const currentPlatform = PLATFORMS[detectedOs];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['problem', 'workflow', 'features', 'ai-trust'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '#problem', label: 'Problem', id: 'problem' },
    { href: '#workflow', label: 'Workflow', id: 'workflow' },
    { href: '#features', label: 'Features', id: 'features' },
    { href: '#ai-trust', label: 'AI Trust', id: 'ai-trust' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-[72px] sm:h-[90px] lg:h-[123px] transition-all duration-300 ${
          scrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-black/10'
            : 'bg-[#E5E7EB]/20 backdrop-blur-md border-b border-black/5'
        }`}
      >
        <div className="max-w-[1920px] mx-auto h-full px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black flex items-center justify-center text-[#00B894] shadow-sm group-hover:scale-105 transition-transform duration-200"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]"
                fill="none"
                focusable="false"
                data-testid="app-logo-mark"
              >
                <path
                  d="M6.2 9.2A6 6 0 0 1 17.8 7M17.8 14.8A6 6 0 0 1 6.2 17"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M18.4 3.6V8h-4.4M5.6 20.4V16h4.4"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-['Inter'] font-extrabold text-xl sm:text-2xl tracking-tight text-black">
              Replay<span className="text-[#00B894]">Labb</span>
            </span>
          </a>

          {/* Desktop Navigation Links (Figma #1:4 - #1:7) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-12 text-base lg:text-[20px] font-normal text-black">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`transition-all duration-200 hover:text-[#00B894] relative py-1 ${
                  activeSection === link.id
                    ? 'text-[#00B894] font-medium'
                    : 'text-black'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B894] rounded-full animate-in fade-in" />
                )}
              </a>
            ))}
          </nav>

          {/* Actions: Download Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={currentPlatform.downloadUrl}
              download={detectedOs === 'linux' ? currentPlatform.installerName : undefined}
              onClick={(e) => {
                if (detectedOs !== 'linux') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 lg:w-[201px] lg:h-[78px] bg-black text-white text-xs sm:text-base lg:text-[20px] font-normal rounded-full hover:bg-black/85 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer shrink-0"
            >
              Download
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-xl text-black hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B894]"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-black/10 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 text-lg font-medium text-black">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-[#00B894]/10 text-[#00B894] font-semibold'
                      : 'hover:bg-black/5 text-black'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="w-2 h-2 rounded-full bg-[#00B894]" />
                  )}
                </a>
              ))}
              <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3 text-center text-sm font-medium text-black/70 hover:text-black border border-black/10 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                >
                  View All Platforms (.AppImage, .dmg, .exe)
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        detectedOs={detectedOs}
      />
    </>
  );
};
