import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FooterCta } from './FooterCta';

describe('FooterCta Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    vi.stubGlobal('scrollTo', vi.fn());
  });

  it('does not render the removed CTA card', () => {
    render(<FooterCta />);

    expect(
      screen.queryByRole('heading', { level: 2, name: /Make truth cheap and guesses expensive/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/READY TO DEBUG · ZERO CLOUD TELEMETRY/i)
    ).not.toBeInTheDocument();
  });

  it('renders multi-column developer footer and handles back to top', () => {
    render(<FooterCta />);

    // Brand and mission
    expect(screen.getByText(/Local-first API traffic capture, sanitization/i)).toBeInTheDocument();

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
