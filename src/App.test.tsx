import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

describe('App Integration', () => {
  it('renders landing page initially and navigates to download page when Download is clicked', () => {
    window.location.hash = '';
    render(<App />);

    // Check landing page components
    expect(screen.getByRole('heading', { name: /Capture the Failure/i })).toBeInTheDocument();

    // Click Download button on navbar
    const downloadNavBtn = screen.getByRole('link', { name: /^Download$/i });
    fireEvent.click(downloadNavBtn);

    // Verify DownloadPage is now displayed
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Download\s+ReplayLabb/i);
    expect(screen.getByRole('tab', { name: /macOS/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Linux/i })).toBeInTheDocument();

    // Click brand mark in navbar to return to home
    const brandMark = screen.getByText('Replay').closest('a')!;
    fireEvent.click(brandMark);

    // Verify home page is back
    expect(screen.getByRole('heading', { name: /Capture the Failure/i })).toBeInTheDocument();
  });
});
