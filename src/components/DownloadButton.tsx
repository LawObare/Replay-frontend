import React, { useState, useRef, useEffect } from 'react';
import { detectUserPlatform, PLATFORMS, ALL_PACKAGES, type PlatformOS } from '../lib/osDetector';

interface DownloadButtonProps {
  className?: string;
  showOtherPlatformsLink?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  className = '',
  showOtherPlatformsLink = true,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const detectedOs = detectUserPlatform();
  const currentPlatform = PLATFORMS[detectedOs];

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  const renderOsIcon = (os: PlatformOS) => {
    switch (os) {
      case 'macos':
        return (
          <svg className="w-5 h-5 shrink-0 text-black/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.19c.67-.82 1.13-1.96 1-3.1-.98.04-2.17.65-2.86 1.47-.61.71-1.14 1.88-.99 2.99 1.09.08 2.22-.56 2.85-1.36z" />
          </svg>
        );
      case 'windows':
        return (
          <svg className="w-5 h-5 shrink-0 text-black/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5.45l7.3-1v7.12H3V5.45zm0 13.1l7.3 1v-7.12H3v6.12zm8.4 1.15L21 21V12.43h-9.6v7.27zm0-15.4L21 3v8.57h-9.6V4.3z" />
          </svg>
        );
      case 'linux':
        return (
          <svg className="w-5 h-5 shrink-0 text-black/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.01 2c-2.48 0-4.5 2.02-4.5 4.5 0 .52.09 1.02.26 1.48-1.76.77-3 2.52-3 4.56 0 1.28.48 2.44 1.28 3.33C5.4 16.59 5 17.5 5 18.5 5 20.43 8.13 22 12 22s7-1.57 7-3.5c0-1-.4-1.91-1.05-2.63.8-.89 1.28-2.05 1.28-3.33 0-2.04-1.24-3.79-3-4.56.17-.46.26-.96.26-1.48 0-2.48-2.02-4.5-4.48-4.5z" />
          </svg>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center w-full sm:w-auto ${
        isDropdownOpen ? 'z-50' : 'z-20'
      }`}
    >
      {/* Transparent backdrop overlay for reliable dismiss and preventing misclicks */}
      {isDropdownOpen && (
        <div
          data-testid="dropdown-backdrop"
          aria-hidden="true"
          onClick={() => setIsDropdownOpen(false)}
          className="fixed inset-0 z-40 bg-transparent cursor-default"
        />
      )}

      {/* Main Download Button & Dropdown Chevron */}
      <div
        className={`group relative z-50 inline-flex items-center justify-between w-full sm:w-[374px] h-[64px] sm:h-[80px] bg-black text-white rounded-full transition-transform active:scale-[0.99] hover:bg-black/90 shadow-lg hover:shadow-xl ${className}`}
      >
        {/* Direct Download for detected platform */}
        <a
          href={currentPlatform.downloadUrl}
          download={detectedOs === 'linux' ? currentPlatform.installerName : undefined}
          className="flex-1 h-full inline-flex items-center justify-center pl-6 sm:pl-8 pr-2 font-['Inter'] font-bold text-[18px] sm:text-[24px] tracking-tight text-white hover:text-[#00B894] transition-colors rounded-l-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B894]"
          title={`Download ${currentPlatform.installerName} (${currentPlatform.size})`}
        >
          Download for Desktop
        </a>

        {/* Dropdown Chevron Toggle Button */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-label="Toggle platform download options"
          className="h-full px-4 sm:px-6 inline-flex items-center justify-center border-l border-white/20 hover:bg-white/10 active:bg-white/20 transition-colors rounded-r-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B894]"
        >
          <svg
            className={`w-[18px] h-[16px] text-white transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`}
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 16L0.339745 1L17.6603 1L9 16Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* Inline Platform Dropdown Menu */}
      {isDropdownOpen && (
        <div
          role="menu"
          data-testid="platform-dropdown"
          className="absolute top-full mt-3 w-full sm:w-[420px] left-0 sm:left-1/2 sm:-translate-x-1/2 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-black/10 p-3 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-3 py-2 border-b border-black/5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Select Your Platform
            </span>
            <span className="text-[11px] font-medium text-[#00B894] bg-[#00B894]/10 px-2 py-0.5 rounded-full">
              v0.1.0
            </span>
          </div>

          <div className="py-1 divide-y divide-black/5">
            {ALL_PACKAGES.map((pkg) => {
              const isDetected = pkg.os === detectedOs && pkg.recommended;
              return (
                <a
                  key={pkg.filename}
                  href={pkg.url}
                  download={pkg.os === 'linux' ? pkg.filename : undefined}
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                  className={`group flex items-center justify-between p-3 rounded-xl hover:bg-black/[0.04] transition-colors cursor-pointer ${
                    isDetected ? 'bg-[#00B894]/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {renderOsIcon(pkg.os as PlatformOS)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-black group-hover:text-[#00B894] transition-colors">
                          {pkg.name}
                        </span>
                        {isDetected && (
                          <span className="text-[10px] font-bold text-[#00B894] bg-[#00B894]/15 px-1.5 py-0.5 rounded-md">
                            Detected
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-light text-black/60 mt-0.5">
                        {pkg.format} · {pkg.arch} · {pkg.size}
                      </div>
                    </div>
                  </div>

                  <svg
                    className="w-4 h-4 text-black/40 group-hover:text-[#00B894] group-hover:translate-y-0.5 transition-all shrink-0 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              );
            })}
          </div>

          <div className="pt-2 mt-1 border-t border-black/5 px-2 text-center">
            <a
              href="https://github.com/Flying-Tea-Squad/ReplayLabb/releases"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsDropdownOpen(false)}
              className="text-xs font-medium text-black/60 hover:text-[#00B894] transition-colors inline-flex items-center gap-1"
            >
              <span>View all releases and checksums on GitHub</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      )}

      {/* Sub-text: Default format and All Platforms toggle */}
      {showOtherPlatformsLink && (
        <div className="mt-2.5 flex flex-wrap justify-center text-center items-center gap-1.5 sm:gap-2 text-xs font-light text-black/60 px-2 w-full max-w-[374px]">
          <span>
            Default: <strong className="font-medium text-black">{currentPlatform.format}</strong> ({currentPlatform.size})
          </span>
          <span className="hidden sm:inline">·</span>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            className="text-black underline underline-offset-2 hover:text-[#00B894] transition-colors cursor-pointer"
          >
            All platforms (.AppImage, .dmg, .exe)
          </button>
        </div>
      )}
    </div>
  );
};
