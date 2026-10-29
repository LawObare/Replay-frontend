import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useInView } from './useInView';

describe('useInView', () => {
  let intersectionCallback: IntersectionObserverCallback;
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;

  const TestComponent: React.FC = () => {
    const { ref, inView } = useInView();
    return (
      <div ref={ref} data-testid="target">
        {inView ? 'VISIBLE' : 'HIDDEN'}
      </div>
    );
  };

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '0px';
      readonly thresholds = [0];

      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }

      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = vi.fn();
      takeRecords = vi.fn().mockReturnValue([]);
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  it('starts hidden and calls observe', () => {
    render(<TestComponent />);
    expect(screen.getByText('HIDDEN')).toBeInTheDocument();
    expect(observeMock).toHaveBeenCalled();
  });

  it('updates to visible when intersection occurs', () => {
    render(<TestComponent />);
    expect(screen.getByText('HIDDEN')).toBeInTheDocument();

    const target = screen.getByTestId('target');

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        { unobserve: unobserveMock } as unknown as IntersectionObserver
      );
    });

    expect(screen.getByText('VISIBLE')).toBeInTheDocument();
  });

  it('fades out (updates to false) when scrolling out of view if triggerOnce is false', () => {
    render(<TestComponent />);
    const target = screen.getByTestId('target');

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        { unobserve: unobserveMock } as unknown as IntersectionObserver
      );
    });
    expect(screen.getByText('VISIBLE')).toBeInTheDocument();

    act(() => {
      intersectionCallback(
        [{ isIntersecting: false, target } as IntersectionObserverEntry],
        { unobserve: unobserveMock } as unknown as IntersectionObserver
      );
    });
    expect(screen.getByText('HIDDEN')).toBeInTheDocument();
  });

  it('remains visible when scrolling out of view if triggerOnce is true', () => {
    const OnceComponent: React.FC = () => {
      const { ref, inView } = useInView({ triggerOnce: true });
      return (
        <div ref={ref} data-testid="target">
          {inView ? 'VISIBLE' : 'HIDDEN'}
        </div>
      );
    };

    render(<OnceComponent />);
    const target = screen.getByTestId('target');

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        { unobserve: unobserveMock } as unknown as IntersectionObserver
      );
    });
    expect(screen.getByText('VISIBLE')).toBeInTheDocument();
    expect(unobserveMock).toHaveBeenCalledWith(target);
  });
});
