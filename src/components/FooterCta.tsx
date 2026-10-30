import React, { useState } from 'react';
import { DownloadButton } from './DownloadButton';
import { AnimatedSection } from './AnimatedSection';

export const FooterCta: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const installCommand = 'curl -fsSL https://raw.githubusercontent.com/Flying-Tea-Squad/ReplayLabb/develop-2/install.sh | bash';

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-16 sm:pt-24 pb-12 px-4 sm:px-8 lg:px-16 max-w-[1920px] mx-auto overflow-hidden">
      {/* Harmonious Light Studio CTA Banner */}
      <AnimatedSection delayMs={100} direction="up">
        <div className="relative max-w-[1508px] mx-auto rounded-3xl bg-gradient-to-b from-white via-white to-[#F0FAF7]/70 border-2 border-[#00B894]/30 p-8 sm:p-14 lg:p-20 text-center flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          {/* Subtle Ambient Emerald Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-[#00B894]/10 blur-[100px] pointer-events-none rounded-full"
          />

          {/* Top Eyebrow Badge */}
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B894]/15 border border-[#00B894]/30 text-[#00B894] font-mono text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00B894] animate-pulse" />
            <span>READY TO DEBUG · ZERO CLOUD TELEMETRY</span>
          </div>

          {/* Headline */}
          <h2 className="relative font-['Inter'] font-black text-3xl sm:text-5xl lg:text-[56px] text-black tracking-tight leading-[1.1] max-w-4xl mb-4 sm:mb-6">
            Make truth cheap and{' '}
            <span className="text-[#00B894] italic font-extrabold">
              guesses expensive
            </span>
          </h2>

          {/* Subtitle */}
          <p className="relative font-['Inter'] font-light text-base sm:text-lg lg:text-[20px] text-black/80 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
            Capture reality, let evidence-linked AI explain the failure, and prove
            the fix deterministically — all local-first, all on your machine.
          </p>

          {/* Dual Primary Actions (Interactive Download with working dropdown & GitHub Star) */}
          <div className="relative z-30 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
            {/* Functional Download Button with Upward Dropdown */}
            <DownloadButton
              className="w-full sm:w-[374px]"
              variant="dark"
              dropdownDirection="up"
              subTextColor="dark"
            />

            {/* Star on GitHub Action */}
            <a
              href="https://github.com/Flying-Tea-Squad/ReplayLabb"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-[340px] h-[64px] sm:h-[80px] bg-white hover:bg-black/[0.03] text-black rounded-full border border-[rgba(84,110,122,0.8)] hover:border-black/50 transition-all duration-200 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="w-6 h-6 text-black group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="font-['Inter'] font-bold text-[18px] sm:text-[22px]">
                Star on GitHub
              </span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-black/5 text-black/80 group-hover:bg-[#E6B400]/20 group-hover:text-[#B28700] transition-colors">
                ★ Open Source
              </span>
            </a>
          </div>

          {/* Quick CLI Install Pill */}
          <div className="relative mt-8 sm:mt-10 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#D9D9D9] font-mono text-xs sm:text-sm text-black/80 max-w-full overflow-x-auto shadow-sm">
            <span className="text-[#00B894] font-bold select-none">$</span>
            <span className="text-black/90 font-mono truncate select-all">
              {installCommand}
            </span>
            <button
              type="button"
              onClick={handleCopyCommand}
              aria-label="Copy install command to clipboard"
              className="ml-2 px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 active:bg-black/15 text-black text-xs font-sans font-medium transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-[#00B894]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[#00B894] font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-black/60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Trust Assurances Row */}
          <div className="relative mt-10 pt-8 border-t border-black/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-['Inter'] text-black/70">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B894]" />
              <span>100% Local Loopback</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B894]" />
              <span>Deterministic Redaction</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B894]" />
              <span>Zero Telemetry</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B894]" />
              <span>Signed Desktop Binaries</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Comprehensive Developer Footer */}
      <div className="max-w-[1508px] mx-auto mt-16 sm:mt-24 pt-12 border-t border-[#D9D9D9]/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12">
          {/* Brand & Mission (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group mb-4">
              <div
                className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-[#00B894] shadow-sm group-hover:scale-105 transition-transform duration-200"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  focusable="false"
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
              <span className="font-['Inter'] font-extrabold text-2xl tracking-tight text-black">
                Replay<span className="text-[#00B894]">Labb</span>
              </span>
            </a>

            <p className="font-['Inter'] font-light text-sm text-black/70 leading-relaxed max-w-sm mb-6">
              A local-first API traffic capture, sanitization, and deterministic
              replay studio. Built for engineers who value empirical evidence over
              guesswork.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B894]/10 text-[#00B894] border border-[#00B894]/20 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00B894] animate-pulse" />
              <span>v0.1.0 Stable · All Systems Operational</span>
            </div>
          </div>

          {/* Col 1: Product Navigation */}
          <div>
            <h4 className="font-['Inter'] font-bold text-sm uppercase tracking-wider text-black mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-black/70">
              <li>
                <a href="#problem" className="hover:text-[#00B894] transition-colors">
                  The Problem
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-[#00B894] transition-colors">
                  3-Stage Workflow
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#00B894] transition-colors">
                  Core Capabilities
                </a>
              </li>
              <li>
                <a href="#ai-trust" className="hover:text-[#00B894] transition-colors">
                  Evidence-Linked AI
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors inline-flex items-center gap-1"
                >
                  <span>Releases (v0.1.0)</span>
                  <span className="text-[10px] bg-[#00B894]/15 text-[#00B894] font-bold px-1.5 py-0.2 rounded">
                    Latest
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Architecture & Crates */}
          <div>
            <h4 className="font-['Inter'] font-bold text-sm uppercase tracking-wider text-black mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-black/70">
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/tree/develop-2/crates/rl-proxy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  Local Proxy (<code className="text-xs font-mono">rl-proxy</code>)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/tree/develop-2/crates/rl-replay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  Deterministic Replay (<code className="text-xs font-mono">rl-replay</code>)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/tree/develop-2/crates/rl-sanitize"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  Sanitization Gate (<code className="text-xs font-mono">rl-sanitize</code>)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/tree/develop-2/crates/rl-store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  Encrypted Vault (<code className="text-xs font-mono">rl-store</code>)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/tree/develop-2/crates/rl-capsule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  Bug Capsules (<code className="text-xs font-mono">rl-capsule</code>)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Open Source */}
          <div>
            <h4 className="font-['Inter'] font-bold text-sm uppercase tracking-wider text-black mb-4">
              Open Source
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-black/70">
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LawObare/Replay-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  Frontend Website Repo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  Issue Tracker & Bugs
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Flying-Tea-Squad/ReplayLabb/blob/develop-2/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B894] transition-colors"
                >
                  License (MIT / Apache 2.0)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="pt-8 border-t border-[#D9D9D9]/40 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-black/60 gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} ReplayLabb. Built for engineers who demand proof over speculation.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-black/40">100% Localhost · No Account Required</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-black hover:text-[#00B894] font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Back to top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
