import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  actionText: string;
  detailHeadline: string;
  detailContent: string;
  snippet: string;
}

const STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Capture',
    description:
      'A local https proxy records every request/response pair, headers, bodies, timing with nothing leaving your machine.',
    actionText: 'Proxy Setup',
    detailHeadline: 'Local TLS Proxy Architecture',
    detailContent:
      'Transparently intercepts HTTP/1.1 and streaming SSE requests. System trust store certificate installed with 1 click; no external servers or cloud relays required.',
    snippet: 'export HTTP_PROXY=http://127.0.0.1:9090\nexport HTTPS_PROXY=http://127.0.0.1:9090\n# All traffic recorded into local sqlite WAL database',
  },
  {
    step: '02',
    title: 'Diagnose',
    description:
      'AI reads the whole sequence and explains what actually broke with facts and hypotheses visually separated and every claim traced to an exchange.',
    actionText: 'AI Investigation',
    detailHeadline: 'Traceable Root-Cause Analysis',
    detailContent:
      'The local LLM evaluates the entire sequence of upstream exchanges rather than looking at isolated 500 errors. Every claim provides clickable citations to exact frame IDs.',
    snippet: 'FACT: Exchange #42 Authorization token expired at 12:04:30\nHYPOTHESIS: Exchange #43 failed to request /auth/refresh\nRESULT: Exchange #44 tripped 429 rate limit',
  },
  {
    step: '03',
    title: 'Sanitize',
    description:
      'A secret scan runs before any export. Token, keys and PII are caught and redacted before a session can leave the building.',
    actionText: 'Export Review',
    detailHeadline: 'Zero-Leak Export Security Gate',
    detailContent:
      'Automated high-entropy key scanner and regex rules inspect request headers, JSON bodies, and query params. The export gate fails closed if high-confidence secrets remain unmasked.',
    snippet: 'Authorization: Bearer [REDACTED_TOKEN_42]\nPOST /v1/charge { "card_num": "[REDACTED_PAN_01]" }\n// Export readiness: 100% verified safe to share',
  },
  {
    step: '04',
    title: 'Replay',
    description:
      'Turn the failure into an approved scenario with match rules, faults and assertions then replay it deterministically to prove the fix.',
    actionText: 'Scenario Replay',
    detailHeadline: 'Deterministic Mocking & Assertion Engine',
    detailContent:
      'Convert any captured failure sequence into a permanent regression test scenario. Approved scenarios are cryptographically locked and replayable in local CI pipelines.',
    snippet: 'Scenario "auth_refresh_recovery":\n  WHEN request.path == "/auth/refresh"\n  THEN respond status: 200, body: { "token": "mock_valid" }\n  ASSERT all downstream exchanges status == 200',
  },
];

export const WorkflowSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);

  return (
    <section id="workflow" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 max-w-[1920px] mx-auto">
      {/* Eyebrow (Figma #1:56: 16px, Light 300, #00B894) */}
      <AnimatedSection delayMs={100}>
        <div className="font-['Inter'] font-light text-sm sm:text-[16px] text-[#00B894] tracking-wider uppercase mb-2 sm:mb-3">
          WORKFLOW
        </div>
      </AnimatedSection>

      {/* Headline (Figma #1:57: 48px, SemiBold 600) */}
      <AnimatedSection delayMs={200}>
        <h2 className="font-['Inter'] font-semibold text-2xl sm:text-4xl lg:text-[48px] text-black tracking-tight mb-8 sm:mb-14">
          Four steps.{' '}
          <span className="text-[#00B894] italic font-semibold">
            One loop
          </span>
        </h2>
      </AnimatedSection>

      {/* 4 Cards Grid (Figma #1:58 - #1:85: 328x312px cards, rounded-2xl, border #D9D9D9) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {STEPS.map((item, idx) => (
          <AnimatedSection
            key={item.step}
            delayMs={idx * 120}
            direction="up"
            className="h-full"
          >
            <div
              onClick={() => setSelectedStep(item)}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-[#D9D9D9] hover:border-[#00B894] hover:shadow-[0_12px_32px_rgba(0,184,148,0.12)] -translate-y-0 hover:-translate-y-2 transition-all duration-300 min-h-[280px] sm:min-h-[312px] h-full cursor-pointer group"
            >
              <div>
                {/* Step Badge (Figma: 16px, SemiBold 600, #00B894) */}
                <div className="font-['Inter'] font-semibold text-[16px] text-[#00B894] mb-8 group-hover:scale-110 transition-transform origin-left">
                  {item.step}
                </div>

                {/* Title (Figma: 24px, Bold 700, #000000) */}
                <h3 className="font-['Inter'] font-bold text-[24px] text-black mb-3 group-hover:text-[#00B894] transition-colors">
                  {item.title}
                </h3>

                {/* Description (Figma: 16px, Light 300, #000000) */}
                <p className="font-['Inter'] font-light text-[16px] text-black leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Link (Figma: 16px, Medium 500) */}
              <div className="mt-8 flex items-center gap-2 font-['Inter'] font-medium text-[16px] text-black group-hover:text-[#00B894] transition-colors">
                <span>{item.actionText}</span>
                <svg
                  className="w-2.5 h-2 text-black/80 group-hover:text-[#00B894] group-hover:translate-x-1.5 transition-all"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4H9M9 4L6 1M9 4L6 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Interactive Step Detail Drawer Modal */}
      {selectedStep && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedStep(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#D9D9D9] p-5 sm:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-[#D9D9D9]">
              <div>
                <span className="text-xs font-mono font-bold text-[#00B894] uppercase tracking-wider">
                  Step {selectedStep.step} · {selectedStep.title}
                </span>
                <h3 className="text-2xl font-bold text-black mt-1">
                  {selectedStep.detailHeadline}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStep(null)}
                aria-label="Close step drawer"
                className="p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-base font-light text-black/80 leading-relaxed">
              {selectedStep.detailContent}
            </p>

            <div className="mt-5 p-4 rounded-xl bg-black text-white font-mono text-xs overflow-x-auto leading-relaxed border border-white/10">
              <pre>{selectedStep.snippet}</pre>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStep(null)}
                className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-black/85 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
