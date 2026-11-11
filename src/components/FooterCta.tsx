import React from 'react';

export const FooterCta: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 sm:py-10 px-4 sm:px-8 lg:px-16 max-w-[1920px] mx-auto border-t border-[#D9D9D9]/60">
      <div className="max-w-[1508px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left">
          <a href="#" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-[#00B894] shadow-sm group-hover:scale-105 transition-transform duration-200"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" focusable="false">
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
            <span className="font-['Inter'] font-extrabold text-xl tracking-tight text-black">
              Replay<span className="text-[#00B894]">Labb</span>
            </span>
          </a>

          <span className="hidden sm:inline text-black/25">·</span>

          <span className="text-xs sm:text-sm font-light text-black/60">
            © {new Date().getFullYear()} ReplayLabb. Local-first API debugging.
          </span>
        </div>

        {/* Essential Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs sm:text-sm font-normal text-black/70">
          <a href="#problem" className="hover:text-[#00B894] transition-colors">
            Problem
          </a>
          <a href="#workflow" className="hover:text-[#00B894] transition-colors">
            Workflow
          </a>
          <a href="#features" className="hover:text-[#00B894] transition-colors">
            Features
          </a>
          <a href="#ai-trust" className="hover:text-[#00B894] transition-colors">
            AI Trust
          </a>
          <a
            href="https://github.com/Flying-Tea-Squad/ReplayLabb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B894] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Flying-Tea-Squad/ReplayLabb/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00B894] transition-colors"
          >
            Releases
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-black/60 hover:text-[#00B894] font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>Top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
