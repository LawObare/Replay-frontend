import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsRibbon } from './StatsRibbon';

describe('StatsRibbon Component', () => {
  beforeEach(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '0px';
      readonly thresholds = [0];
      constructor(callback: IntersectionObserverCallback) {
        callback([{ isIntersecting: true } as IntersectionObserverEntry], this);
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn().mockReturnValue([]);
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  it('renders all 4 metric items with centered alignment classes', () => {
    const { container } = render(<StatsRibbon />);

    expect(screen.getByText('Local Capture')).toBeInTheDocument();
    expect(screen.getByText('Secrets Exported Unscanned')).toBeInTheDocument();
    expect(screen.getByText('From claim to evidence')).toBeInTheDocument();
    expect(screen.getByText('Tools cross-referenced')).toBeInTheDocument();

    expect(screen.getByText('Nothing leaves your machine')).toBeInTheDocument();
    expect(screen.getByText('The exporting gate is enforced, not optional')).toBeInTheDocument();
    expect(screen.getByText('Direct traceability to real frame IDs')).toBeInTheDocument();
    expect(screen.getByText('Positioned against what you already know')).toBeInTheDocument();

    // Verify centering classes exist on each metric card container
    const metricContainers = container.querySelectorAll('.items-center.text-center');
    expect(metricContainers.length).toBeGreaterThanOrEqual(4);
  });
});
