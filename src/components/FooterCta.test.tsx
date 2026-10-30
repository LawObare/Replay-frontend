import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FooterCta } from './FooterCta';

describe('FooterCta Component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver for AnimatedSection
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

    // Mock window.scrollTo
    vi.stubGlobal('scrollTo', vi.fn());
  });

  it('renders the redesigned CTA headline and value proposition', () => {
    render(<FooterCta />);

    expect(
      screen.getByRole('heading', { level: 2, name: /Make truth cheap and guesses expensive/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/READY TO DEBUG · ZERO CLOUD TELEMETRY/i)
    ).toBeInTheDocument();
  });

  it('renders working download and github star buttons', () => {
    render(<FooterCta />);

    // Download button exists and has platform dropdown toggle
    const downloadLinks = screen.getAllByRole('link', { name: /Download for Desktop/i });
    expect(downloadLinks.length).toBeGreaterThan(0);

    // GitHub Star button exists
    const starLink = screen.getByRole('link', { name: /Star on GitHub/i });
    expect(starLink).toBeInTheDocument();
    expect(starLink).toHaveAttribute('href', 'https://github.com/Flying-Tea-Squad/ReplayLabb');
  });

  it('copies the CLI installation command to clipboard on button click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<FooterCta />);

    const copyBtn = screen.getByRole('button', { name: /Copy install command to clipboard/i });
    expect(copyBtn).toBeInTheDocument();

    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining('https://raw.githubusercontent.com/Flying-Tea-Squad/ReplayLabb')
    );

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('renders multi-column developer footer and handles back to top', () => {
    render(<FooterCta />);

    // Navigation columns
    expect(screen.getByRole('heading', { level: 4, name: 'Product' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Architecture' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Open Source' })).toBeInTheDocument();

    // System status
    expect(screen.getByText(/v0.1.0 Stable · All Systems Operational/i)).toBeInTheDocument();

    // Back to top
    const backToTopBtn = screen.getByRole('button', { name: /Back to top/i });
    expect(backToTopBtn).toBeInTheDocument();

    fireEvent.click(backToTopBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
