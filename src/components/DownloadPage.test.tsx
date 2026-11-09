import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DownloadPage } from './DownloadPage';

describe('DownloadPage Component', () => {
  it('renders title, brand mark, and releases link', () => {
    render(<DownloadPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Download\s+ReplayLabb/i);
    const releasesLink = screen.getByRole('link', { name: /View previous releases/i });
    expect(releasesLink).toBeInTheDocument();
    expect(releasesLink).toHaveAttribute('href', 'https://github.com/Flying-Tea-Squad/ReplayLabb/releases');
  });

  it('renders all four OS platform tabs and switches active tab on click', () => {
    render(<DownloadPage />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);

    const macTab = screen.getByRole('tab', { name: /macOS/i });
    const winTab = screen.getByRole('tab', { name: /Windows/i });
    const linuxTab = screen.getByRole('tab', { name: /Linux/i });
    const googlebookTab = screen.getByRole('tab', { name: /Googlebook/i });

    expect(macTab).toBeInTheDocument();
    expect(winTab).toBeInTheDocument();
    expect(linuxTab).toBeInTheDocument();
    expect(googlebookTab).toBeInTheDocument();

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

  it('renders all IDE & editor extension cards with documentation links', () => {
    render(<DownloadPage />);

    expect(screen.getByText('Visual Studio Code')).toBeInTheDocument();
    expect(screen.getByText('v1.10.0')).toBeInTheDocument();
    expect(screen.getByText('Visual Studio')).toBeInTheDocument();
    expect(screen.getByText('v1.0.261026.0')).toBeInTheDocument();
    expect(screen.getByText('JetBrains')).toBeInTheDocument();
    expect(screen.getByText('Zed')).toBeInTheDocument();
    expect(screen.getByText('Xcode')).toBeInTheDocument();
    expect(screen.getByText('Eclipse')).toBeInTheDocument();

    const viewDocsButtons = screen.getAllByText('View Docs');
    expect(viewDocsButtons).toHaveLength(6);
  });

  it('renders Standalone IDE and Python SDK sections', () => {
    render(<DownloadPage />);

    expect(screen.getByText('Antigravity IDE (Standalone)')).toBeInTheDocument();
    expect(screen.getByText('v2.6.0')).toBeInTheDocument();
    expect(screen.getByText('Download for x64')).toBeInTheDocument();
    expect(screen.getByText('Download for ARM64')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Antigravity SDK/i })).toBeInTheDocument();
    expect(screen.getByText('v0.1.23')).toBeInTheDocument();
    expect(screen.getByText('Download Python SDK')).toBeInTheDocument();
  });

  it('renders footer with Experience liftoff, products, and Google mark', () => {
    const handleNavigate = vi.fn();
    render(<DownloadPage onNavigate={handleNavigate} />);

    expect(screen.getByText('Experience liftoff')).toBeInTheDocument();
    expect(screen.getAllByText('Product').length).toBeGreaterThan(0);
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByAltText('Google')).toBeInTheDocument();
    expect(screen.getByText('About Google')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });
});
