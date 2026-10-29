import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkflowSection } from './WorkflowSection';

describe('WorkflowSection', () => {
  beforeEach(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '0px';
      readonly thresholds = [0];
      observe = vi.fn((el) => {
        // Trigger intersection asynchronously
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

  it('renders all four workflow steps from Figma', () => {
    render(<WorkflowSection />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Capture')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Diagnose')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('Sanitize')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
    expect(screen.getByText('Replay')).toBeInTheDocument();
  });

  it('opens interactive preview modal when clicking a step card', () => {
    render(<WorkflowSection />);
    const captureCard = screen.getByText('Capture');
    fireEvent.click(captureCard);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Local TLS Proxy Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/export HTTP_PROXY=/i)).toBeInTheDocument();

    const closeBtn = screen.getByText('Close Preview');
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
