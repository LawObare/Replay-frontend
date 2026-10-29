import React, { useEffect, useRef } from 'react';
import { ALL_PACKAGES, PlatformOS } from '../lib/osDetector';

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  detectedOs: PlatformOS;
}

export const PlatformModal: React.FC<PlatformModalProps> = ({
  isOpen,
  onClose,
  detectedOs,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // 14Emanuel Gate: Trap escape key and manage accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 14Emanuel Gate: Backdrop click uses onClick + e.target === e.currentTarget (never onMouseDown)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D9D9D9] p-5 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#D9D9D9]">
          <div>
            <h3 id="modal-headline" className="text-xl sm:text-2xl font-bold text-black">
              Download ReplayLabb
            </h3>
            <p className="text-xs sm:text-sm font-light text-black/70 mt-1">
              Select your platform installer. All packages are signed and local-first.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 sm:p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
          {ALL_PACKAGES.map((pkg) => {
            const isDetected = pkg.os === detectedOs && pkg.recommended;
            return (
              <a
                key={pkg.filename}
                href={pkg.url}
                download={pkg.url.startsWith('/') ? pkg.filename : undefined}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all ${
                  isDetected
                    ? 'border-[#00B894] bg-[#00B894]/5 hover:bg-[#00B894]/10 shadow-sm'
                    : 'border-[#D9D9D9] hover:border-black/30 hover:bg-black/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black/5 flex items-center justify-center font-mono text-[10px] sm:text-xs font-semibold uppercase text-black/80 shrink-0">
                    {pkg.format}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="font-semibold text-black text-sm sm:text-base">
                        {pkg.name}
                      </span>
                      {isDetected && (
                        <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-[#00B894] text-white">
                          Your OS
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] sm:text-xs font-light text-black/60 mt-0.5 font-mono truncate max-w-[180px] sm:max-w-none">
                      {pkg.filename} · {pkg.size} · {pkg.arch}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#00B894] shrink-0 ml-2">
                  <span className="hidden sm:inline">Download</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-[#D9D9D9] text-xs font-light text-black/70 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-[#00B894] shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <div>
            <span className="font-semibold text-black">Verifiable Integrity:</span>{' '}
            Binaries are built with deterministic Rust toolchains. SHA256 checksums are
            published alongside every GitHub release.
          </div>
        </div>
      </div>
    </div>
  );
};
