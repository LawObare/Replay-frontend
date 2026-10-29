import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

interface FeatureItem {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
  snippetTitle: string;
  snippet: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'capture',
    tabLabel: '01 Traffic Capture',
    badge: '0 Cloud Relays · Loopback Proxy',
    title: 'Real-time HTTP(S) & SSE Stream Inspection',
    subtitle: 'Transparent local interception with zero cloud dependencies',
    description:
      'Intercepts HTTP/1.1 and streaming Server-Sent Events with automated CA root trust. Millisecond-accurate latency waterfalls, header breakdowns, query parameters, and structured JSON body formatting recorded entirely into a local SQLite WAL database.',
    imageSrc: '/features/capture-traffic.png',
    imageAlt: 'ReplayLabb Studio Live Session Traffic Capture',
    highlights: [
      'Local-first loopback proxy: nothing leaves your workstation',
      'Automated root CA certificate installation in 1 click',
      'Millisecond-precision timeline waterfall and status badges',
      'Deep inspect for headers, cookies, query parameters, and bodies',
    ],
    snippetTitle: 'Proxy Setup & Interception',
    snippet: 'export HTTP_PROXY=http://127.0.0.1:9090\nexport HTTPS_PROXY=http://127.0.0.1:9090\n# All requests recorded locally into encrypted SQLite WAL storage',
  },
  {
    id: 'ai',
    tabLabel: '02 AI Investigation',
    badge: 'Deterministic Facts vs Hypotheses',
    title: 'Evidence-Linked AI That Shows Its Work',
    subtitle: 'Every diagnostic finding traced to exact frame IDs',
    description:
      'Local LLMs analyze the complete multi-exchange sequence rather than diagnosing isolated 500 error symptoms. Facts are visually distinguished from causal hypotheses, and every conclusion cites exact exchange IDs (#42, #43) so you can verify truth in one click.',
    imageSrc: '/features/ai-investigation.png',
    imageAlt: 'ReplayLabb AI Review Workspace with Traceable Citations',
    highlights: [
      '100% offline local model inference (Ollama / Llama-class)',
      'Traceable citations linking claims directly to real frame IDs',
      'Strict separation of proven facts from causal hypotheses',
      'Drafts reproducible scenarios directly from diagnostic findings',
    ],
    snippetTitle: 'AI Investigation Trace',
    snippet: 'FACT: Exchange #42 Authorization token expired at 12:04:30 UTC\nHYPOTHESIS: Exchange #43 failed to request /v1/auth/tokens before retry\nRESULT: Exchange #44 tripped 429 rate limit (60s cooldown)',
  },
  {
    id: 'replay',
    tabLabel: '03 Deterministic Replay',
    badge: 'Cryptographic Assertion Engine',
    title: 'Mock Rules, Fault Injection & CI Assertions',
    subtitle: 'Turn captured failure sequences into permanent regression tests',
    description:
      'Convert intermittent API failures into approved, cryptographically locked scenarios. Define path/method matching rules, inject simulated latency or error responses, and verify downstream recovery with automated assertions runnable in local CI pipelines.',
    imageSrc: '/features/deterministic-replay.png',
    imageAlt: 'ReplayLabb Scenario Review and Assertion Editor',
    highlights: [
      'Granular match rules for paths, methods, queries, and headers',
      'Simulated fault injection: inject latency delays and error codes',
      'Automated assertions to prove fix before committing code',
      'Approved scenarios replayable locally and in GitHub Actions',
    ],
    snippetTitle: 'Approved Scenario Definition',
    snippet: 'Scenario "token_expiry_stream_recovery":\n  MATCH: path == "/v1/payments/stream", method == "POST"\n  FAULT: delay 250ms, status 401, body: { "error": "token_stale" }\n  ASSERT: /v1/auth/tokens called, all downstream status == 200',
  },
  {
    id: 'sanitizer',
    tabLabel: '04 Secret Sanitization',
    badge: 'Zero-Leak Security Gate',
    title: 'Fail-Closed Redaction & Bug Capsules',
    subtitle: 'Never leak customer secrets or credentials in bug reports',
    description:
      'Automated high-entropy scanning scans JSON bodies, query parameters, authorization headers, and cookies before export. High-confidence secrets must be resolved before the export gate opens, packaging verified sessions into self-contained, encrypted .capsule bundles.',
    imageSrc: '/features/secret-sanitization.png',
    imageAlt: 'ReplayLabb Capsule Review and Zero-Leak Export Gate',
    highlights: [
      'Automated high-entropy key and token detection engine',
      'Export gate fails closed if high-confidence secrets remain unmasked',
      'Replaces sensitive values with consistent unified placeholders',
      'Packages tamper-proof, encrypted .capsule archives for QA sharing',
    ],
    snippetTitle: 'rl-sanitize Masking Output',
    snippet: 'Authorization: Bearer [REDACTED_AUTH_TOKEN_40]\nPOST /v1/charge { "client_id": "[REDACTED_CLIENT_ID]" }\n// Export Readiness: 100% verified clean, 0 secrets leaked',
  },
];

export const FeaturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('capture');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const currentFeature = FEATURES.find((f) => f.id === activeTab) || FEATURES[0];

  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-16 max-w-[1920px] mx-auto border-t border-[#D9D9D9]/40">
      {/* Section Eyebrow & Title */}
      <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <AnimatedSection delayMs={100}>
          <div className="font-['Inter'] font-light text-sm sm:text-[16px] text-[#00B894] tracking-wider uppercase mb-3">
            CORE CAPABILITIES
          </div>
        </AnimatedSection>

        <AnimatedSection delayMs={200}>
          <h2 className="font-['Inter'] font-semibold text-3xl sm:text-5xl lg:text-[54px] text-black tracking-tight leading-tight mb-4">
            Everything you need to{' '}
            <span className="text-[#00B894] italic font-semibold">
              prove the fix
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delayMs={300}>
          <p className="font-['Inter'] font-light text-base sm:text-xl text-black/80 leading-relaxed px-2">
            A complete API debugging laboratory running locally on loopback. Transparent TLS proxying,
            traceable AI diagnostics, and deterministic scenario assertions.
          </p>
        </AnimatedSection>
      </div>

      {/* Interactive Feature Tabs */}
      <AnimatedSection delayMs={350}>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {FEATURES.map((feature) => {
            const isActive = feature.id === activeTab;
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => setActiveTab(feature.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-md scale-102'
                    : 'bg-black/5 text-black/70 hover:bg-black/10 hover:text-black'
                }`}
              >
                {feature.tabLabel}
              </button>
            );
          })}
        </div>
      </AnimatedSection>

      {/* Active Feature Display Card */}
      <AnimatedSection key={currentFeature.id} delayMs={150}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl border border-[#D9D9D9] p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
          {/* Left: Info, Highlights & Snippet (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00B894]/10 border border-[#00B894]/30 text-[#00B894] font-mono text-xs font-semibold mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00B894] mr-2 animate-pulse" />
                {currentFeature.badge}
              </div>

              {/* Title */}
              <h3 className="font-['Inter'] font-bold text-2xl sm:text-3xl text-black tracking-tight mb-2">
                {currentFeature.title}
              </h3>

              {/* Subtitle */}
              <p className="font-['Inter'] font-medium text-sm sm:text-base text-[#00B894] mb-4">
                {currentFeature.subtitle}
              </p>

              {/* Description */}
              <p className="font-['Inter'] font-light text-sm sm:text-base text-black/80 leading-relaxed mb-6">
                {currentFeature.description}
              </p>

              {/* Bullet highlights */}
              <ul className="space-y-2.5 mb-8 text-xs sm:text-sm font-['Inter'] text-black/85">
                {currentFeature.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg
                      className="w-4 h-4 text-[#00B894] shrink-0 mt-0.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 8.5L6 12L13.5 4"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code / Configuration Snippet */}
            <div className="rounded-xl bg-black text-white p-4 font-mono text-xs overflow-x-auto border border-black/10">
              <div className="text-[10px] uppercase font-bold text-[#00B894] mb-1.5 tracking-wider">
                {currentFeature.snippetTitle}
              </div>
              <pre className="text-white/90 leading-relaxed whitespace-pre-wrap">{currentFeature.snippet}</pre>
            </div>
          </div>

          {/* Right: High-Resolution Screenshot Frame (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              onClick={() => setLightboxImage({ src: currentFeature.imageSrc, alt: currentFeature.imageAlt })}
              className="relative w-full rounded-2xl overflow-hidden border border-[#D9D9D9] shadow-xl group cursor-pointer aspect-[16/10] bg-slate-100"
              title="Click to view full size screenshot"
            >
              <img
                src={currentFeature.imageSrc}
                alt={currentFeature.imageAlt}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-white text-black font-['Inter'] text-xs font-semibold shadow-lg flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00B894]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Click to Expand
                </span>
              </div>
            </div>
            <span className="text-xs font-light text-black/50 mt-3 text-center">
              Real desktop app screenshot · Click image to expand
            </span>
          </div>
        </div>
      </AnimatedSection>

      {/* Lightbox Modal (14Emanuel Gate: role="dialog", Escape key, onClick backdrop) */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImage(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#D9D9D9] bg-white">
              <span className="font-semibold text-sm sm:text-base text-black">
                {lightboxImage.alt}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close image modal"
                className="p-1.5 rounded-full text-black/60 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-2 overflow-auto flex-1 bg-slate-900 flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
