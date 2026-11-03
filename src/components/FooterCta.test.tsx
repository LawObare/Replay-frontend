import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FooterCta } from './FooterCta';

describe('FooterCta Component', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn());
  });

  it('renders brand mark, copyright, and simplified navigation links', () => {
    render(<FooterCta />);

    // Brand and copyright
    expect(screen.getByRole('link', { name: /Replay/i })).toBeInTheDocument();
    expect(screen.getByText(/Local-first API debugging/i)).toBeInTheDocument();

    // Streamlined links
    expect(screen.getByRole('link', { name: 'Problem' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Workflow' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'AI Trust' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Releases' })).toBeInTheDocument();

    // No overly complex column headings
    expect(screen.queryByRole('heading', { level: 4, name: 'Architecture' })).not.toBeInTheDocument();
  });

  it('scrolls to top when clicking the Top button', () => {
    render(<FooterCta />);

    const topBtn = screen.getByRole('button', { name: /Top/i });
    expect(topBtn).toBeInTheDocument();

    fireEvent.click(topBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
