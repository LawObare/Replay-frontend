import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero Component', () => {
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

  it('renders headline, subtitle, and CTAs without the top badge pill', () => {
    render(<Hero />);

    // Headline is present
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Capture the Failure\.\s*Prove the fix\./i
    );

    // Subtitle is present
    expect(
      screen.getByText(/A local-first desktop app to capture, sanitize and replay HTTP\(s\) traffic/i)
    ).toBeInTheDocument();

    // Top badge pill is removed
    expect(
      screen.queryByText(/Local-first API debugging · Windows · MacOS · Linux/i)
    ).not.toBeInTheDocument();

    // CTAs exist
    expect(screen.getByRole('link', { name: /Download for Desktop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /See how it works/i })).toBeInTheDocument();

    // Trust items exist
    expect(screen.getByText('No account required')).toBeInTheDocument();
    expect(screen.getByText('Signed Installers')).toBeInTheDocument();
    expect(screen.getByText('Open capture format')).toBeInTheDocument();
  });

  it('toggles hotspot inspector badges on click', () => {
    render(<Hero />);

    const proxyBadge = screen.getByRole('button', { name: /● 127\.0\.0\.1:9090 \(Proxy Active\)/i });
    expect(proxyBadge).toBeInTheDocument();

    fireEvent.click(proxyBadge);
    expect(screen.getByText(/Zero-cloud capture architecture/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close Inspector/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/Zero-cloud capture architecture/i)).not.toBeInTheDocument();
  });
});
