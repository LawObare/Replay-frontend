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

  it('links Linux x64 directly to the GitHub release .deb and marks Linux ARM64 as Coming Soon', () => {
    render(<DownloadPage />);
    fireEvent.click(screen.getByRole('tab', { name: /Linux/i }));

    const debLink = screen.getByRole('link', { name: /Download \(\.deb\)/i });
    expect(debLink).toHaveAttribute(
      'href',
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/ReplayLabb-0.1.0-bb5269b-linux-x64.deb'
    );
    expect(
      screen.getByText(/sudo apt install \.\/ReplayLabb-0\.1\.0-bb5269b-linux-x64\.deb/i)
    ).toBeInTheDocument();

    const comingSoonBtn = screen.getByRole('button', { name: /Coming Soon/i });
    expect(comingSoonBtn).toBeDisabled();
  });

  it('links Windows x64 to Setup EXE, MSI, and Standalone EXE and marks Windows ARM64 as Coming Soon', () => {
    render(<DownloadPage />);
    fireEvent.click(screen.getByRole('tab', { name: /Windows/i }));

    expect(screen.getByRole('link', { name: /Download Setup \(\.exe\)/i })).toHaveAttribute(
      'href',
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe'
    );
    expect(screen.getByRole('link', { name: /MSI Installer/i })).toHaveAttribute(
      'href',
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/ReplayLabb-0.1.0-508e7be-windows-x64.msi'
    );
    expect(screen.getByRole('link', { name: /Standalone EXE/i })).toHaveAttribute(
      'href',
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/ReplayLabb-0.1.0-508e7be-windows-x64.exe'
    );
    expect(screen.getByRole('button', { name: /Coming Soon/i })).toBeDisabled();
  });

  it('marks both macOS Intel and Apple Silicon as Coming Soon', () => {
    render(<DownloadPage />);
    fireEvent.click(screen.getByRole('tab', { name: /macOS/i }));

    const comingSoonButtons = screen.getAllByRole('button', { name: /Coming Soon/i });
    expect(comingSoonButtons).toHaveLength(2);
    comingSoonButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it('renders SHA256SUMS and Release Notes links for v0.1.0-test.1', () => {
    render(<DownloadPage />);

    expect(screen.getByRole('link', { name: /Verify with SHA256SUMS/i })).toHaveAttribute(
      'href',
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/SHA256SUMS'
    );
    expect(screen.getByRole('link', { name: /Release Notes on GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/Dixon-O/replaylabb/releases/tag/v0.1.0-test.1'
    );
  });

  it('does not contain any Antigravity references', () => {
    const { container } = render(<DownloadPage />);
    expect(container.textContent?.toLowerCase()).not.toContain('antigravity');
    expect(container.textContent?.toLowerCase()).not.toContain('autonomous coding agent');
    expect(container.textContent?.toLowerCase()).not.toContain('googlebook');
  });
});
