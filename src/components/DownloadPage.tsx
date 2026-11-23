import React, { useEffect, useState } from 'react';
import {
  ArchDownloadConfig,
  detectUserPlatform,
  DOWNLOAD_CATALOG,
  RELEASE_INFO,
} from '../lib/osDetector';

type SelectedOS = 'macos' | 'windows' | 'linux';

interface DownloadPageProps {
  onNavigate?: (view: 'home' | 'download', sectionId?: string) => void;
}

export const DownloadPage: React.FC<DownloadPageProps> = () => {
  const detected = detectUserPlatform();
  const initialOS: SelectedOS =
    detected === 'linux' || detected === 'windows' || detected === 'macos'
      ? detected
      : 'linux';

  const [activeOS, setActiveOS] = useState<SelectedOS>(initialOS);
  const [openInfoKey, setOpenInfoKey] = useState<string | null>(null);

  useEffect(() => {
    if (openInfoKey === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenInfoKey(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openInfoKey]);

  const osTabs: { id: SelectedOS; label: string; icon: string; width: number; height: number }[] = [
    { id: 'macos', label: 'macOS', icon: '/icons/icon-macos.svg', width: 16, height: 20 },
    { id: 'windows', label: 'Windows', icon: '/icons/icon-windows.svg', width: 20, height: 20 },
    { id: 'linux', label: 'Linux', icon: '/icons/icon-linux.svg', width: 20, height: 20 },
  ];

  const getRequirementsText = () => {
    switch (activeOS) {
      case 'macos':
        return 'macOS 12.0 (Monterey) or later (Apple Silicon M1/M2/M3/M4 & Intel 64-bit)';
      case 'windows':
        return 'Windows 10 64-bit (build 19041+) or Windows 11 (x64). WebView2 is required for the standalone EXE.';
      case 'linux':
      default:
        return 'Ubuntu 24.04 x64 (GTK 3 and WebKitGTK 4.1 dependencies resolved automatically via APT)';
    }
  };

  const x64Config = DOWNLOAD_CATALOG[activeOS].x64;
  const arm64Config = DOWNLOAD_CATALOG[activeOS].arm64;

  const renderArchSection = (
    archKey: 'x64' | 'arm64',
    title: string,
    config: ArchDownloadConfig,
    extraPadding = false
  ) => {
    const infoKey = `${activeOS}-${archKey}`;
    const isInfoOpen = openInfoKey === infoKey;
    const infoCardId = `install-info-${infoKey}`;
    const infoTitleId = `install-info-title-${infoKey}`;

    return (
      <div className={`space-y-6 ${extraPadding ? 'pt-4' : ''}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium leading-[34px] tracking-[-0.0047em] text-[#121317]">
        {title}
      </h2>

      <div className="space-y-4">
        {config.available && config.primary ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={config.primary.url}
                rel="noopener noreferrer"
                title={`Download ${config.primary.filename} (${config.primary.size})`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[220px] px-6 h-[47px] bg-[#121317] text-white text-base sm:text-[17.5px] font-medium rounded-full hover:bg-[#121317]/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>{config.primary.label}</span>
                <span className="text-xs font-normal text-white/70">
                  {config.primary.size}
                </span>
              </a>

              {config.alternatives?.map((alt) => (
                <a
                  key={alt.id}
                  href={alt.url}
                  rel="noopener noreferrer"
                  title={`Download ${alt.filename} (${alt.size})`}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 h-[47px] bg-white text-[#121317] border border-[#212226]/18 text-sm sm:text-[15px] font-medium rounded-full hover:bg-[#121317]/5 hover:border-[#121317]/40 transition-all duration-200 cursor-pointer"
                >
                  <span>{alt.label}</span>
                  <span className="text-xs font-normal text-[#45474D]">
                    {alt.size}
                  </span>
                </a>
              ))}
            </div>

            {config.installNote && (
              <div className="space-y-2 pt-1 max-w-3xl">
                <p className="text-[13.1px] text-[#45474D] leading-relaxed">
                  {config.installNote}
                </p>
                {config.installCommand && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <code className="block max-w-full w-fit px-3.5 py-2 rounded-lg bg-[#121317]/[0.04] border border-[#212226]/10 font-mono text-xs sm:text-[13px] text-[#121317] overflow-x-auto">
                        {config.installCommand}
                      </code>
                      {config.installCommandInfo && (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenInfoKey((prev) => (prev === infoKey ? null : infoKey))
                          }
                          aria-expanded={isInfoOpen}
                          aria-controls={infoCardId}
                          aria-label={config.installCommandInfo.title}
                          title={config.installCommandInfo.title}
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-200 shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B894] ${
                            isInfoOpen
                              ? 'bg-[#121317] text-white border-[#121317]'
                              : 'bg-white text-[#45474D] border-[#212226]/20 hover:border-[#121317]/50 hover:text-[#121317] hover:bg-[#121317]/5'
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
                            <path d="M12 11.2v5.8" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {config.installCommandInfo && isInfoOpen && (
                      <div
                        id={infoCardId}
                        role="region"
                        aria-labelledby={infoTitleId}
                        className="mt-2.5 p-4 sm:p-5 rounded-2xl bg-white border border-[#212226]/15 shadow-lg max-w-2xl space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full bg-[#00B894] shrink-0"
                              aria-hidden="true"
                            />
                            <h3 id={infoTitleId} className="text-sm font-semibold text-[#121317]">
                              {config.installCommandInfo.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setOpenInfoKey(null)}
                            aria-label="Close install command explanation"
                            className="p-1 rounded-full text-[#45474D] hover:text-[#121317] hover:bg-[#121317]/5 transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B894]"
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-[13px] text-[#45474D] leading-relaxed">
                          {config.installCommandInfo.summary}
                        </p>

                        <ul className="space-y-1.5 text-[13px] text-[#45474D] leading-relaxed">
                          {config.installCommandInfo.reasons.map((reason) => (
                            <li key={reason} className="flex items-start gap-2.5">
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00B894] shrink-0"
                                aria-hidden="true"
                              />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>

                        {config.installCommandInfo.guiAlternative && (
                          <p className="p-3 rounded-xl bg-[#121317]/[0.03] border border-[#212226]/10 text-xs text-[#45474D] leading-relaxed">
                            {config.installCommandInfo.guiAlternative}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center justify-center w-full sm:w-[220px] h-[47px] bg-[#121317]/10 text-[#45474D] text-base sm:text-[17.5px] font-medium rounded-full cursor-not-allowed"
            >
              Coming Soon
            </button>
            <p className="text-[13.1px] text-[#45474D] max-w-3xl leading-relaxed">
              {config.pendingNote}{' '}
              <a
                href={RELEASE_INFO.releasesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121317] underline underline-offset-2 hover:text-[#00B894] transition-colors"
              >
                Follow releases on GitHub
              </a>
            </p>
          </div>
        )}

        <div className="space-y-1 pt-1">
          <p className="text-[13.6px] font-medium text-[#121317]">
            Minimum Requirements
          </p>
          <p className="text-[13.1px] text-[#45474D] max-w-3xl leading-relaxed">
            {getRequirementsText()}
          </p>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#121317] font-['Inter',sans-serif]">
      {/* Main Container */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24">
        {/* Header Title */}
        <div className="pb-9">
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-tight tracking-[-0.017em]">
            <span>Download</span>{' '}
            <span className="font-extrabold italic text-[#00B894]">ReplayLabb</span>
          </h1>
        </div>

        {/* OS Platform Switcher Bar */}
        <div className="border-b border-[#212226]/12 py-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5" role="tablist" aria-label="Select Operating System">
            {osTabs.map((tab) => {
              const isActive = activeOS === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => {
                    setActiveOS(tab.id);
                    setOpenInfoKey(null);
                  }}
                  className={`inline-flex items-center gap-2.5 px-5 py-2 h-[38px] rounded-full text-[15.2px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#121317] text-white border border-[#121317] shadow-sm'
                      : 'bg-white text-[#45474D] border border-[#212226]/12 hover:bg-[#121317]/5 hover:text-[#121317]'
                  }`}
                >
                  <img
                    src={tab.icon}
                    alt=""
                    width={tab.width}
                    height={tab.height}
                    className={`shrink-0 transition-all duration-200 ${
                      isActive ? 'brightness-0 invert' : ''
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Download Sections */}
        <div id={`panel-${activeOS}`} role="tabpanel" className="space-y-12">
          {renderArchSection(
            'x64',
            activeOS === 'macos'
              ? 'Download for Intel (x64) processors'
              : 'Download for x64 processors',
            x64Config
          )}

          {renderArchSection(
            'arm64',
            activeOS === 'macos'
              ? 'Download for Apple Silicon (ARM64) processors'
              : 'Download for ARM64 processors',
            arm64Config,
            true
          )}
        </div>

        {/* Release & Checksum Verification Bar */}
        <div className="mt-16 pt-6 border-t border-[#212226]/12 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13.1px] text-[#45474D]">
          <span>
            Current test release:{' '}
            <strong className="font-medium text-[#121317]">{RELEASE_INFO.releaseTag}</strong>
          </span>
          <span className="hidden sm:inline text-[#212226]/25">·</span>
          <a
            href={RELEASE_INFO.checksumsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#121317] underline underline-offset-2 hover:text-[#00B894] transition-colors"
          >
            Verify with SHA256SUMS
          </a>
          <span className="hidden sm:inline text-[#212226]/25">·</span>
          <a
            href={RELEASE_INFO.releasePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#121317] underline underline-offset-2 hover:text-[#00B894] transition-colors"
          >
            Release Notes on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};
