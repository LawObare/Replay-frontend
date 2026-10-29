import React, { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

interface ProblemCard {
  id: number;
  title: string;
  description: string;
  quote?: string;
}

const PROBLEMS: ProblemCard[] = [
  {
    id: 1,
    title: 'A status code is a red light, not a diagnosis',
    description:
      'A 500 on one request is usually caused by an exchange 3 requests earlier. Dashboards and logs show you the symptom, never the chain.',
    quote: 'Error 500: Internal Server Error (No additional context)',
  },
  {
    id: 2,
    title: 'Cause and effect hide across dozen of exchanges',
    description:
      'Distributed API failures are sequences, not events. Debugging from the outside means reading hundreds of rows on your own.',
    quote: 'Exchange #12 -> #28 -> #42: Broken state propagation',
  },
  {
    id: 3,
    title: "You can’t prove a fix you can’t reproduce",
    description:
      '“Works on my machine” isn’t a test. Without deterministic replay of the exact failure, QA re-tests on hope.',
    quote: 'Assert: replay identical upstream sequence deterministically',
  },
  {
    id: 4,
    title: 'Share a capture leaks everything',
    description:
      'Pasting a HAR into a ticket/chat exports every token and secret in it. That’s the moment most teams accidentally leak credentials.',
    quote: 'rl-sanitize: 100% of tokens masked before export gate opens',
  },
];

export const ProblemMatrix: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="problem" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 max-w-[1920px] mx-auto border-t border-[#D9D9D9]/40">
      {/* Eyebrow */}
      <AnimatedSection delayMs={100}>
        <div className="font-['Inter'] font-light text-sm sm:text-[16px] text-[#00B894] tracking-wider uppercase mb-2 sm:mb-3">
          WHY REPLAYLABB
        </div>
      </AnimatedSection>

      {/* Headline */}
      <AnimatedSection delayMs={200}>
        <h2 className="font-['Inter'] font-semibold text-2xl sm:text-4xl lg:text-[48px] text-black tracking-tight mb-8 sm:mb-14 max-w-4xl leading-tight">
          Built for the moment a dashboard says{' '}
          <span className="text-[#00B894] inline-block hover:scale-110 transition-transform cursor-default">
            500
          </span>{' '}
          and nothing else
        </h2>
      </AnimatedSection>

      {/* 2x2 Grid (Figma: 686x166px cards, rounded-2xl, border #D9D9D9) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {PROBLEMS.map((card, idx) => (
          <AnimatedSection
            key={card.id}
            delayMs={idx * 120}
            direction={idx % 2 === 0 ? 'left' : 'right'}
            className="h-full"
          >
            <div
              onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
              className={`h-full p-6 sm:p-10 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                activeCard === card.id
                  ? 'border-[#00B894] shadow-[0_8px_30px_rgba(0,184,148,0.12)] -translate-y-1'
                  : 'border-[#D9D9D9] hover:border-[#00B894]/60 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Accent Left Bar */}
              <div
                className={`absolute top-0 bottom-0 left-0 w-1.5 transition-all duration-300 ${
                  activeCard === card.id ? 'bg-[#00B894]' : 'bg-transparent group-hover:bg-[#00B894]/40'
                }`}
              />

              <div>
                <h3 className="font-['Inter'] font-semibold text-lg sm:text-[24px] text-black mb-2 sm:mb-3 group-hover:text-[#00B894] transition-colors">
                  {card.title}
                </h3>
                <p className="font-['Inter'] font-normal text-sm sm:text-[20px] text-black/85 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Interactive micro badge on click or hover */}
              {card.quote && (
                <div
                  className={`mt-4 pt-3 border-t border-black/5 font-mono text-xs text-black/60 transition-all ${
                    activeCard === card.id ? 'block text-[#00B894]' : 'hidden sm:block'
                  }`}
                >
                  💡 {card.quote}
                </div>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};
