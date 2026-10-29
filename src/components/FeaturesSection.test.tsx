import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeaturesSection } from './FeaturesSection';

describe('FeaturesSection Component', () => {
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
  });

  it('renders section title and all four capability tabs', () => {
    render(<FeaturesSection />);

    expect(screen.getByText('CORE CAPABILITIES')).toBeInTheDocument();
    expect(screen.getByText(/Everything you need to/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /01 Traffic Capture/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /02 AI Investigation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /03 Deterministic Replay/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /04 Secret Sanitization/i })).toBeInTheDocument();
  });

  it('switches active feature details and image when clicking tabs', () => {
    render(<FeaturesSection />);

    // Default tab is Traffic Capture
    expect(
      screen.getByText('Real-time HTTP(S) & SSE Stream Inspection'),
    ).toBeInTheDocument();

    // Switch to AI Investigation
    const aiTab = screen.getByRole('button', { name: /02 AI Investigation/i });
    fireEvent.click(aiTab);
    expect(
      screen.getByText('Evidence-Linked AI That Shows Its Work'),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('ReplayLabb AI Review Workspace with Traceable Citations'),
    ).toBeInTheDocument();

    // Switch to Deterministic Replay
    const replayTab = screen.getByRole('button', { name: /03 Deterministic Replay/i });
    fireEvent.click(replayTab);
    expect(
      screen.getByText('Mock Rules, Fault Injection & CI Assertions'),
    ).toBeInTheDocument();

    // Switch to Secret Sanitization
    const sanitizeTab = screen.getByRole('button', { name: /04 Secret Sanitization/i });
    fireEvent.click(sanitizeTab);
    expect(
      screen.getByText('Fail-Closed Redaction & Bug Capsules'),
    ).toBeInTheDocument();
  });

  it('opens and closes screenshot lightbox modal', () => {
    render(<FeaturesSection />);

    const screenshotImg = screen.getByAltText('ReplayLabb Studio Live Session Traffic Capture');
    fireEvent.click(screenshotImg);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Close image modal/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Close image modal/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
