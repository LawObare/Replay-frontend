import React, { useState } from 'react';
import { DownloadButton } from './DownloadButton';
import { AnimatedSection } from './AnimatedSection';

export const Hero: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // Max 4 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex flex-col items-center text-center">
        {/* Top Badge (Figma #1:12: 594x48px, rounded-full, border #00B894, bg rgba(0, 184, 148, 0.2)) */}
        <AnimatedSection delayMs={100}>
          <div className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-[#00B894] bg-[#00B894]/20 mb-6 sm:mb-12 shadow-sm hover:scale-105 transition-transform duration-200 cursor-default max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#00B894] mr-2 sm:mr-2.5 animate-pulse shrink-0" />
            <span className="font-['Inter'] font-semibold text-xs sm:text-base md:text-[20px] text-black tracking-tight truncate sm:whitespace-normal">
              Local-first API debugging · Windows · MacOS · Linux
            </span>
          </div>
        </AnimatedSection>

        {/* Display Headline (Figma #1:18: 96px, Black 900) */}
        <AnimatedSection delayMs={200}>
          <h1 className="max-w-6xl font-['Inter'] font-black text-3xl sm:text-6xl md:text-7xl lg:text-[96px] tracking-tight leading-[1.08] sm:leading-[1.05] text-black">
            Capture the Failure.{' '}
            <span className="text-[#00B894] italic font-extrabold block sm:inline">
              Prove the fix.
            </span>
          </h1>
        </AnimatedSection>

        {/* Subtitle (Figma #1:19: 24px, Light 300) */}
        <AnimatedSection delayMs={300}>
          <p className="mt-6 sm:mt-8 max-w-4xl font-['Inter'] font-light text-base sm:text-xl md:text-[24px] text-black/90 leading-relaxed px-2">
            A local-first desktop app to capture, sanitize and replay HTTP(s) traffic
            with evidence-linked AI that shows its work and deterministic replay that
            proves the fix.
          </p>
        </AnimatedSection>

        {/* Dual CTAs (Figma #1:20 & #1:24) */}
        <AnimatedSection delayMs={400} className="w-full relative z-30">
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto relative z-30">
            <DownloadButton className="w-full sm:w-[374px]" />

            {/* Secondary Action: See how it works (Figma #1:24: 306x80px, white bg, slate border, rounded-full) */}
            <a
              href="#workflow"
              className="inline-flex items-center justify-center w-full sm:w-[306px] h-[64px] sm:h-[80px] bg-white text-black font-['Inter'] font-bold text-[18px] sm:text-[24px] rounded-full border border-[rgba(84,110,122,0.8)] hover:bg-black/[0.03] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm shrink-0"
            >
              See how it works
            </a>
          </div>
        </AnimatedSection>

        {/* Trust Checklist (Figma #1:27 - #1:33) */}
        <AnimatedSection delayMs={500} className="relative z-10">
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-12 text-xs sm:text-base lg:text-[18px] font-['Inter'] font-light text-black">
            {/* Item 1 */}
            <div className="flex items-center gap-2 group cursor-default">
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[19px] text-[#00B894] group-hover:scale-110 transition-transform shrink-0"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10.5L6.5 15L16 3"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>No account required</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-2 group cursor-default">
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[19px] text-[#00B894] group-hover:scale-110 transition-transform shrink-0"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10.5L6.5 15L16 3"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Signed Installers</span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-2 group cursor-default">
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[19px] text-[#00B894] group-hover:scale-110 transition-transform shrink-0"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10.5L6.5 15L16 3"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Open capture format</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Hero App Showcase Frame (Figma #1:34: 1184x638px) with Interactive 3D Perspective */}
        <AnimatedSection delayMs={600} className="w-full max-w-[1184px] relative z-0">
          <div className="mt-10 sm:mt-20 relative group">
            {/* Interactive Inspector Hotspot Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
              <button
                type="button"
                onClick={() =>
                  setActiveHotspot(
                    activeHotspot === 'proxy' ? null : 'proxy'
                  )
                }
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeHotspot === 'proxy'
                    ? 'bg-black text-white shadow-md'
                    : 'bg-black/5 hover:bg-black/10 text-black/70'
                }`}
              >
                ● 127.0.0.1:9090 (Proxy Active)
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveHotspot(
                    activeHotspot === 'secrets' ? null : 'secrets'
                  )
                }
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeHotspot === 'secrets'
                    ? 'bg-[#00B894] text-white shadow-md'
                    : 'bg-[#00B894]/10 hover:bg-[#00B894]/20 text-[#00B894]'
                }`}
              >
                🔒 rl-sanitize Engine (0 Leaks)
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveHotspot(
                    activeHotspot === 'ai' ? null : 'ai'
                  )
                }
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeHotspot === 'ai'
                    ? 'bg-[#E6B400] text-black shadow-md'
                    : 'bg-[#E6B400]/15 hover:bg-[#E6B400]/25 text-black'
                }`}
              >
                ⚡ AI Evidence Link (#42, #43)
              </button>
            </div>

            {/* Interactive perspective frame */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transition: mousePosition.x === 0 ? 'transform 0.5s ease-out' : 'none',
              }}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#D9D9D9] shadow-xl sm:shadow-2xl bg-white aspect-[16/10] sm:aspect-[1184/638] transition-shadow duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]"
            >
              <img
                src="/hero-app-preview.png"
                alt="ReplayLabb Studio App Preview"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                loading="eager"
              />

              {/* Dynamic hotspot highlight overlay */}
              {activeHotspot === 'proxy' && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-6 animate-in fade-in duration-200">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md text-left border border-black/10">
                    <div className="text-xs font-mono uppercase text-[#00B894] font-bold mb-1">
                      Local TLS Proxy · MITM Engine
                    </div>
                    <h4 className="text-lg font-bold text-black mb-2">
                      Zero-cloud capture architecture
                    </h4>
                    <p className="text-sm font-light text-black/80 leading-relaxed mb-4">
                      Runs locally on loopback. Transparently intercepts HTTP/1.1 and
                      SSE streams with CA trust store automation and zero data telemetry.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="px-4 py-1.5 bg-black text-white text-xs font-medium rounded-full cursor-pointer hover:bg-black/85"
                    >
                      Close Inspector
                    </button>
                  </div>
                </div>
              )}

              {activeHotspot === 'secrets' && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-6 animate-in fade-in duration-200">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md text-left border border-black/10">
                    <div className="text-xs font-mono uppercase text-[#00B894] font-bold mb-1">
                      Deterministic Masking Gate
                    </div>
                    <h4 className="text-lg font-bold text-black mb-2">
                      Fails closed on export
                    </h4>
                    <p className="text-sm font-light text-black/80 leading-relaxed mb-4">
                      Scans JSON keys, auth tokens, bearer credentials, and form bodies.
                      Replaces secrets with unified placeholders so bug reports never leak credentials.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="px-4 py-1.5 bg-[#00B894] text-white text-xs font-medium rounded-full cursor-pointer hover:bg-[#00B894]/90"
                    >
                      Close Inspector
                    </button>
                  </div>
                </div>
              )}

              {activeHotspot === 'ai' && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-6 animate-in fade-in duration-200">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md text-left border border-black/10">
                    <div className="text-xs font-mono uppercase text-[#E6B400] font-bold mb-1">
                      Evidence-Linked AI
                    </div>
                    <h4 className="text-lg font-bold text-black mb-2">
                      Facts separated from hypotheses
                    </h4>
                    <p className="text-sm font-light text-black/80 leading-relaxed mb-4">
                      Every diagnostic finding links directly to frame IDs. No hallucinated
                      root causes — verify deterministic facts with 1 click.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="px-4 py-1.5 bg-black text-white text-xs font-medium rounded-full cursor-pointer hover:bg-black/85"
                    >
                      Close Inspector
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
