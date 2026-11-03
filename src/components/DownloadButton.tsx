import React from 'react';
import { detectUserPlatform, PLATFORMS } from '../lib/osDetector';

interface DownloadButtonProps {
  className?: string;
  showOtherPlatformsLink?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  className = '',
  showOtherPlatformsLink = true,
}) => {
  const detectedOs = detectUserPlatform();
  const currentPlatform = PLATFORMS[detectedOs];

  return (
    <div className="flex flex-col items-center w-full sm:w-auto">
      {/* Direct One-Click Download Button */}
      <a
        href={currentPlatform.downloadUrl}
        download={detectedOs === 'linux' ? currentPlatform.installerName : undefined}
        title={`Download ${currentPlatform.installerName} (${currentPlatform.size})`}
        className={`group inline-flex items-center justify-center gap-3 w-full sm:w-[374px] h-[64px] sm:h-[80px] bg-black text-white hover:text-[#00B894] hover:bg-black/90 active:scale-[0.99] rounded-full transition-all shadow-lg hover:shadow-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B894] ${className}`}
      >
        <span className="font-['Inter'] font-bold text-[18px] sm:text-[24px] tracking-tight">
          Download for Desktop
        </span>
        <svg
          className="w-[18px] h-[16px] text-white transition-transform duration-200 group-hover:translate-y-1"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 16L0.339745 1L17.6603 1L9 16Z" fill="currentColor" />
        </svg>
      </a>

      {/* Sub-text: Default format and link to all releases */}
      {showOtherPlatformsLink && (
        <div className="mt-2.5 flex flex-wrap justify-center text-center items-center gap-1.5 sm:gap-2 text-xs font-light text-black/60 px-2 w-full max-w-[374px]">
          <span>
            Default: <strong className="font-medium text-black">{currentPlatform.format}</strong> ({currentPlatform.size})
          </span>
          <span className="hidden sm:inline">·</span>
          <a
            href="https://github.com/Flying-Tea-Squad/ReplayLabb/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline underline-offset-2 hover:text-[#00B894] transition-colors"
          >
            All platforms (.AppImage, .dmg, .exe)
          </a>
        </div>
      )}
    </div>
  );
};
