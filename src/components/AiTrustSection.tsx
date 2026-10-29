import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { useInView } from '../hooks/useInView';

export const AiTrustSection: React.FC = () => {
  const [hypothesisState, setHypothesisState] = useState<'pending' | 'rejected' | 'confirmed'>('pending');
  const [activeCitation, setActiveCitation] = useState<string | null>(null);
  const { ref: meterRef, inView: meterInView } = useInView({ threshold: 0.3 });

  return (
    <section id="ai-trust" className="w-full bg-[#D9D9D9]/20 py-16 sm:py-24 border-y border-[#D9D9D9]/50 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <AnimatedSection delayMs={100}>
            <div className="font-['Inter'] font-light text-sm sm:text-[16px] text-[#00B894] tracking-wider uppercase mb-3 sm:mb-4">
              AI TRUST
            </div>
          </AnimatedSection>

          <AnimatedSection delayMs={200}>
            <h2 className="font-['Inter'] font-semibold text-2xl sm:text-4xl lg:text-[48px] text-black tracking-tight leading-tight">
              Can you{' '}
              <span className="text-[#00B894] italic font-semibold">
                trust
              </span>{' '}
              what the AI tells you?
              <br className="hidden sm:inline" /> It&apos;s visible on every screen.
            </h2>
          </AnimatedSection>
        </div>

        {/* Side-by-side Cards Container (Figma #1:103 & #1:124) */}
        <div ref={meterRef} className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* LEFT CARD: FACT (Deterministic) (Figma #1:124, 908x317px) */}
          <AnimatedSection delayMs={300} direction="left" className="h-full">
            <div className="h-full flex flex-col justify-between p-6 sm:p-10 rounded-2xl bg-white border-2 border-[#D9D9D9] hover:border-[#00B894]/50 shadow-sm hover:shadow-md transition-all duration-300 min-h-[400px] sm:min-h-[460px]">
              <div>
                {/* Badge (Figma #1:137: 263x44px, rounded-lg, bg rgba(0,184,148,0.1), text #00B894) */}
                <div className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#00B894]/10 mb-6 sm:mb-8 hover:bg-[#00B894]/15 transition-colors cursor-default">
                  <span className="w-2 h-2 rounded-full bg-[#00B894] mr-2.5 animate-pulse" />
                  <span className="font-['Inter'] font-bold text-sm sm:text-base lg:text-[20px] text-[#00B894] tracking-wider">
                    FACT · DETERMINISTIC
                  </span>
                </div>

                {/* Title (Figma #1:139: 24px, Bold 700) */}
                <h3 className="font-['Inter'] font-bold text-lg sm:text-xl lg:text-[24px] text-black mb-3 sm:mb-4">
                  Token expired at 12:04:30
                </h3>

                {/* Explanation (Figma #1:140: 24px, Extra Light 200) */}
                <p className="font-['Inter'] font-extralight text-base sm:text-lg lg:text-[24px] text-black leading-relaxed">
                  Decoded from the request Authorization header. Deterministically verified by
                  the capture engine, not inferred.
                </p>
              </div>

              {/* Citations Row (Figma #1:126 & #1:131) with Interactive Tooltip */}
              <div className="mt-8 pt-6 border-t border-[#D9D9D9] flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCitation(activeCitation === '42' ? null : '42')
                    }
                    className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl border transition-all cursor-pointer ${
                      activeCitation === '42'
                        ? 'bg-[#4292C6] text-white border-[#4292C6] shadow-md scale-105'
                        : 'bg-[#4292C6]/10 text-[#4292C6] border-[#4292C6]/20 hover:bg-[#4292C6]/20'
                    }`}
                  >
                    <span
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-colors ${
                        activeCitation === '42' ? 'bg-white' : 'bg-[#4292C6]'
                      }`}
                    />
                    <span className="font-['Inter'] font-semibold text-sm sm:text-base lg:text-[20px]">
                      #42 · auth header
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveCitation(activeCitation === '43' ? null : '43')
                    }
                    className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl border transition-all cursor-pointer ${
                      activeCitation === '43'
                        ? 'bg-[#4292C6] text-white border-[#4292C6] shadow-md scale-105'
                        : 'bg-[#4292C6]/10 text-[#4292C6] border-[#4292C6]/20 hover:bg-[#4292C6]/20'
                    }`}
                  >
                    <span
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-colors ${
                        activeCitation === '43' ? 'bg-white' : 'bg-[#4292C6]'
                      }`}
                    />
                    <span className="font-['Inter'] font-semibold text-sm sm:text-base lg:text-[20px]">
                      #43 · auth header
                    </span>
                  </button>
                </div>

                {/* Citation Inspected Details */}
                {activeCitation && (
                  <div className="p-4 rounded-xl bg-gray-50 border border-[#D9D9D9] font-mono text-xs text-black/80 animate-in fade-in slide-in-from-top-1 duration-200 overflow-x-auto">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <strong className="text-black font-semibold">
                        Exchange #{activeCitation} Authorization Header Trace:
                      </strong>
                      <span className="text-red-500 font-medium">Status: EXPIRED</span>
                    </div>
                    <div className="truncate">Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</div>
                    <div className="mt-1 text-black/60">
                      claims: &#123; exp: 1729857870 (12:04:30 UTC), sub: &quot;usr_4021&quot;, scope: &quot;read:orders&quot; &#125;
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT CARD: HYPOTHESIS (Unverified) (Figma #1:103, 942x317px) */}
          <AnimatedSection delayMs={400} direction="right" className="h-full">
            <div className="h-full flex flex-col justify-between p-6 sm:p-10 rounded-2xl bg-[rgba(230,180,0,0.1)] border-2 border-[#D9D9D9] hover:border-[#E6B400] shadow-sm hover:shadow-md transition-all duration-300 min-h-[400px] sm:min-h-[460px]">
              <div>
                {/* Badge & Confidence Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
                  {/* Badge (Figma #1:109: 306x44px, rounded-lg, bg #E6B400, text #000000) */}
                  <div className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#E6B400] hover:scale-105 transition-transform cursor-default">
                    <span className="font-['Inter'] font-bold text-sm sm:text-base lg:text-[20px] text-black tracking-wider">
                      HYPOTHESIS · UNVERIFIED
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-['Inter'] font-extralight text-base sm:text-lg lg:text-[20px] text-black">
                      #1
                    </span>
                    {/* Confidence Bar (Animates on scroll) */}
                    <div className="w-20 sm:w-36 h-2.5 rounded-full bg-black/10 overflow-hidden">
                      <div
                        style={{
                          width: meterInView ? '82%' : '0%',
                          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className="h-full bg-[#E6B400] rounded-full"
                      />
                    </div>
                    <span className="font-['Inter'] font-extralight text-sm sm:text-base lg:text-[20px] text-black font-mono">
                      82% conf.
                    </span>
                  </div>
                </div>

                {/* Title (Figma #1:106: 24px, Bold 700) */}
                <h3 className="font-['Inter'] font-bold text-lg sm:text-xl lg:text-[24px] text-black mb-3 sm:mb-4">
                  Client never refreshes on 401 during an open stream
                </h3>

                {/* Explanation (Figma #1:107: 24px, Extra Light 200) */}
                <p className="font-['Inter'] font-extralight text-base sm:text-lg lg:text-[24px] text-black leading-relaxed">
                  Retry logic repeats the original request with the stale token instead of calling
                  the refresh endpoint, which then trips the rate limiter.
                </p>
              </div>

              {/* Footer Row (Figma #1:116 - #1:123) */}
              <div className="mt-8 pt-6 border-t border-[#D9D9D9] flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                  {/* Provenance text (Figma #1:117: 24px, Extra Light 200) */}
                  <div className="font-['Inter'] font-extralight text-xs sm:text-sm lg:text-[18px] text-black/80 font-mono">
                    model: local · llama-class · 3 citations
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setHypothesisState('rejected')}
                      className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl border font-['Inter'] font-semibold text-sm sm:text-base lg:text-[20px] transition-all cursor-pointer text-center ${
                        hypothesisState === 'rejected'
                          ? 'bg-red-500 text-white border-red-500 shadow-md'
                          : 'bg-[rgba(84,110,122,0.1)] border-[rgba(84,110,122,0.6)] text-black hover:bg-[rgba(84,110,122,0.2)]'
                      }`}
                    >
                      {hypothesisState === 'rejected' ? 'Rejected ✕' : 'Reject'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setHypothesisState('confirmed')}
                      className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl border font-['Inter'] font-semibold text-sm sm:text-base lg:text-[20px] transition-all cursor-pointer text-center ${
                        hypothesisState === 'confirmed'
                          ? 'bg-[#00B894] border-[#00B894] text-white shadow-md'
                          : 'bg-[rgba(0,184,148,0.8)] border-[rgba(84,110,122,0.6)] text-white hover:bg-[#00B894]'
                      }`}
                    >
                      {hypothesisState === 'confirmed'
                        ? 'Scenario Drafted ✓'
                        : 'confirm & build scenario'}
                    </button>
                  </div>
                </div>

                {/* Live Interactive Scenario Draft Feedback */}
                {hypothesisState === 'confirmed' && (
                  <div className="p-4 rounded-xl bg-white border border-[#00B894] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00B894] uppercase mb-1">
                      <span>✓ Scenario Drafted into Replay Engine</span>
                    </div>
                    <div className="font-mono text-xs text-black/80">
                      Rule generated: Match <code>status == 401</code> on <code>/stream</code> → Force invoke <code>/auth/refresh</code> before retrying.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
