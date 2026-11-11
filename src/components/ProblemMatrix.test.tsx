import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProblemMatrix } from './ProblemMatrix';

describe('ProblemMatrix Component', () => {
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

  it('renders headline and all 4 problem cards without WHY REPLAYLABB eyebrow', () => {
    render(<ProblemMatrix />);

    expect(screen.queryByText('WHY REPLAYLABB')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Built for the moment a dashboard says\s*500\s*and nothing else/i
    );

    expect(screen.getByText('A status code is a red light, not a diagnosis')).toBeInTheDocument();
    expect(screen.getByText('Cause and effect hide across dozen of exchanges')).toBeInTheDocument();
    expect(screen.getByText("You can’t prove a fix you can’t reproduce")).toBeInTheDocument();
    expect(screen.getByText('Share a capture leaks everything')).toBeInTheDocument();
  });

  it('toggles active card state on click', () => {
    render(<ProblemMatrix />);
    const cardTitle = screen.getByText('A status code is a red light, not a diagnosis');
    fireEvent.click(cardTitle);

    expect(screen.getByText(/Error 500: Internal Server Error/i)).toBeInTheDocument();
  });
});
