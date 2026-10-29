import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AiTrustSection } from './AiTrustSection';

describe('AiTrustSection', () => {
  beforeEach(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '0px';
      readonly thresholds = [0];
      observe = vi.fn((el) => {
        this.callback(
          [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
          this
        );
      });
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn().mockReturnValue([]);
      callback: IntersectionObserverCallback;
      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  it('renders FACT and HYPOTHESIS cards', () => {
    render(<AiTrustSection />);
    expect(screen.getByText(/FACT · DETERMINISTIC/i)).toBeInTheDocument();
    expect(screen.getByText(/Token expired at 12:04:30/i)).toBeInTheDocument();
    expect(screen.getByText(/HYPOTHESIS · UNVERIFIED/i)).toBeInTheDocument();
    expect(screen.getByText(/Client never refreshes on 401/i)).toBeInTheDocument();
  });

  it('toggles interactive citation trace on click', () => {
    render(<AiTrustSection />);
    const citationBtn = screen.getByText(/#42 · auth header/i);
    fireEvent.click(citationBtn);

    expect(screen.getByText(/Exchange #42 Authorization Header Trace:/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: EXPIRED/i)).toBeInTheDocument();
  });

  it('allows confirming and building scenario with interactive feedback', () => {
    render(<AiTrustSection />);
    const confirmBtn = screen.getByText(/confirm & build scenario/i);
    fireEvent.click(confirmBtn);

    expect(screen.getByText(/Scenario Drafted ✓/i)).toBeInTheDocument();
    expect(screen.getByText(/Scenario Drafted into Replay Engine/i)).toBeInTheDocument();
  });
});
