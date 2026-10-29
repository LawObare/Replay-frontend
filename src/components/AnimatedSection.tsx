import React from 'react';
import { useInView } from '../hooks/useInView';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  triggerOnce?: boolean;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
  triggerOnce = false,
}) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce });

  const getTransformClasses = () => {
    if (inView) return 'opacity-100 translate-x-0 translate-y-0 scale-100';

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-8';
      case 'down':
        return 'opacity-0 -translate-y-8';
      case 'left':
        return 'opacity-0 translate-x-8';
      case 'right':
        return 'opacity-0 -translate-x-8';
      case 'none':
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
