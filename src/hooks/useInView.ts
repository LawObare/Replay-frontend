import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px 0px 0px',
  triggerOnce = false,
}: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    let localObserver: IntersectionObserver | null = null;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            if (typeof obs?.unobserve === 'function') {
              obs.unobserve(element);
            } else if (typeof localObserver?.unobserve === 'function') {
              localObserver.unobserve(element);
            }
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    localObserver = observer;
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}
