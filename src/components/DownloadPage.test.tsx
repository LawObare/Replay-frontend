import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DownloadPage } from './DownloadPage';

describe('DownloadPage Component', () => {
  it('renders title and brand mark without previous releases button', () => {
    render(<DownloadPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Download\s+ReplayLabb/i);
    expect(screen.queryByRole('link', { name: /View previous releases/i })).not.toBeInTheDocument();
  });

  it('renders all three ReplayLabb OS platform tabs and switches active tab on click', () => {
    render(<DownloadPage />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    const macTab = screen.getByRole('tab', { name: /macOS/i });
    const winTab = screen.getByRole('tab', { name: /Windows/i });
    const linuxTab = screen.getByRole('tab', { name: /Linux/i });

    expect(macTab).toBeInTheDocument();
    expect(winTab).toBeInTheDocument();
    expect(linuxTab).toBeInTheDocument();

    // Click Windows tab
    fireEvent.click(winTab);
    expect(winTab).toHaveAttribute('aria-selected', 'true');
    const winReqs = screen.getAllByText(/Windows 10 64-bit/i);
    expect(winReqs.length).toBeGreaterThan(0);

    // Click macOS tab
    fireEvent.click(macTab);
    expect(macTab).toHaveAttribute('aria-selected', 'true');
    const macReqs = screen.getAllByText(/macOS 12.0/i);
    expect(macReqs.length).toBeGreaterThan(0);
  });

  it('renders processor download sections for x64 and ARM64', () => {
    render(<DownloadPage />);

    expect(screen.getByRole('heading', { name: /Download for x64 processors/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Download for ARM64 processors/i })).toBeInTheDocument();

    const minReqs = screen.getAllByText(/Minimum Requirements/i);
    expect(minReqs.length).toBeGreaterThanOrEqual(2);
  });

  it('does not contain any Antigravity references', () => {
    const { container } = render(<DownloadPage />);
    expect(container.textContent?.toLowerCase()).not.toContain('antigravity');
    expect(container.textContent?.toLowerCase()).not.toContain('autonomous coding agent');
    expect(container.textContent?.toLowerCase()).not.toContain('googlebook');
  });
});
