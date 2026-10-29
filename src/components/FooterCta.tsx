import React, { useState } from 'react';
import { detectUserPlatform, PLATFORMS } from '../lib/osDetector';
import { PlatformModal } from './PlatformModal';
import { AnimatedSection } from './AnimatedSection';

export const FooterCta: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const detectedOs = detectUserPlatform();
  const currentPlatform = PLATFORMS[detectedOs];

  return (
    <footer className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 max-w-[1920px] mx-auto overflow-hidden">
      {/* Banner Container (Figma #1:141: 1508x462px, gradient, rounded-2xl) */}
      <AnimatedSection delayMs={100} direction="up">
        <div className="max-w-[1508px] mx-auto rounded-2xl sm:rounded-3xl bg-footer-gradient border border-[#00B894]/20 p-6 sm:p-14 lg:p-20 text-center flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Headline (Figma #1:142: 48px, SemiBold 600) */}
          <h2 className="font-['Inter'] font-semibold text-2xl sm:text-4xl lg:text-[48px] text-black tracking-tight mb-3 sm:mb-4">
            Make truth cheap and guesses expensive
          </h2>

          {/* Subtitle (Figma #1:143: 16px, Light 300) */}
          <p className="font-['Inter'] font-light text-sm sm:text-base lg:text-[18px] text-black/80 max-w-3xl mb-8 sm:mb-12 leading-relaxed">
            Capture reality, let AI explain it with evidence, and prove the fix deterministically — all
            local-first, all on your machine.
          </p>

          {/* Dual Actions (Figma #1:144 & #1:148: 374x80px buttons) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
            {/* Download for Desktop Pill */}
            <a
              href={currentPlatform.downloadUrl}
              download={detectedOs === 'linux' ? currentPlatform.installerName : undefined}
              onClick={(e) => {
                if (detectedOs !== 'linux') {
                  e.preventDefault();
                  setIsModalOpen(true);
                }
              }}
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-[374px] h-[64px] sm:h-[80px] bg-black text-white rounded-full hover:bg-black/85 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg cursor-pointer"
            >
              <span className="font-['Inter'] font-bold text-[18px] sm:text-[24px]">
                Download for Desktop
              </span>
              {/* Downward Arrow (Figma #1:147) */}
              <svg
                className="w-[18px] h-[16px] text-white transition-transform group-hover:translate-y-1"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16L0.339745 1L17.6603 1L9 16Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Star on Github (Figma #1:148) */}
            <a
              href="https://github.com/Flying-Tea-Squad/ReplayLabb"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-[374px] h-[64px] sm:h-[80px] bg-white text-black rounded-full border border-[#D9D9D9] hover:border-black/40 hover:bg-black/[0.02] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span className="font-['Inter'] font-bold text-[18px] sm:text-[24px]">
                Star on Github
              </span>
              {/* GitHub Star Vector (Figma #1:151) */}
              <svg
                className="w-[18px] h-[18px] text-black group-hover:text-[#E6B400] group-hover:scale-110 transition-all duration-200"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Copyright & Info Footer */}
      <div className="max-w-[1508px] mx-auto mt-12 sm:mt-16 pt-8 border-t border-[#D9D9D9]/40 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-light text-black/60 gap-4 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} ReplayLabb. Local-first API capture and deterministic replay.
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <a
            href="https://github.com/Flying-Tea-Squad/ReplayLabb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            GitHub Repository
          </a>
          <a
            href="https://github.com/Flying-Tea-Squad/ReplayLabb/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            Release Notes
          </a>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="hover:text-black transition-colors cursor-pointer"
          >
            All Platforms
          </button>
        </div>
      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        detectedOs={detectedOs}
      />
    </footer>
  );
};
