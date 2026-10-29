import React, { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { AnimatedSection } from './AnimatedSection';

interface MetricItem {
  target: number;
  prefix?: string;
  suffix?: string;
  displayOverride?: string;
  title: string;
  caption: string;
}

const METRICS: MetricItem[] = [
  {
    target: 100,
    suffix: '%',
    title: 'Local Capture',
    caption: 'Nothing leaves your machine',
  },
  {
    target: 0,
    displayOverride: '0',
    title: 'Secrets Exported Unscanned',
    caption: 'The exporting gate is enforced, not optional',
  },
  {
    target: 1,
    suffix: ' click',
    title: 'From claim to evidence',
    caption: 'Direct traceability to real frame IDs',
  },
  {
    target: 13,
    title: 'Tools cross-referenced',
    caption: 'Positioned against what you already know',
  },
];

export const StatsRibbon: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutExpo
      const factor = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(
        METRICS.map((m) => Math.round(m.target * factor))
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="w-full bg-[#D9D9D9]/20 py-12 sm:py-16 lg:py-0 lg:h-[360px] flex items-center border-y border-[#D9D9D9]/40 relative overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {METRICS.map((metric, idx) => {
            const formattedValue =
              metric.displayOverride !== undefined
                ? metric.displayOverride
                : `${metric.prefix || ''}${counts[idx]}${metric.suffix || ''}`;

            return (
              <AnimatedSection
                key={idx}
                delayMs={idx * 150}
                direction="up"
                className="flex flex-col items-center text-center justify-center group"
              >
                {/* Metric Number (Figma: 64px, Bold 700, #00B894) */}
                <div className="font-['Inter'] font-bold text-4xl sm:text-5xl lg:text-[64px] text-[#00B894] tracking-tight leading-none mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-105">
                  {formattedValue}
                </div>

                {/* Title (Figma: 20px, Bold 700, #000000) */}
                <div className="font-['Inter'] font-bold text-base sm:text-lg lg:text-[20px] text-black mb-1 group-hover:text-[#00B894] transition-colors">
                  {metric.title}
                </div>

                {/* Caption (Figma: 16px, Light 300, #000000) */}
                <div className="font-['Inter'] font-light text-xs sm:text-sm lg:text-[16px] text-black/80 max-w-[280px] mx-auto">
                  {metric.caption}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
