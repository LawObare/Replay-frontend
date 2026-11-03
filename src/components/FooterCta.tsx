import React from 'react';

export const FooterCta: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-16 sm:pt-20 pb-12 px-4 sm:px-8 lg:px-16 max-w-[1920px] mx-auto border-t border-[#D9D9D9]/50 overflow-hidden">
      <div className="max-w-[1508px] mx-auto">
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
