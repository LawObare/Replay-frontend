import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DownloadButton } from './DownloadButton';

describe('DownloadButton', () => {
  it('renders download button with desktop text and link', () => {
    render(<DownloadButton />);
    const downloadBtn = screen.getByText(/Download for Desktop/i);
    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn.closest('a')).toHaveAttribute('href');
  });

  it('toggles platforms dropdown when chevron button is clicked', () => {
    render(<DownloadButton />);
    const chevronBtn = screen.getByLabelText(/Toggle platform download options/i);
    expect(chevronBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('platform-dropdown')).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(chevronBtn);
    expect(chevronBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('platform-dropdown')).toBeInTheDocument();
    expect(screen.getByText(/Windows NSIS Installer/i)).toBeInTheDocument();
    expect(screen.getByText(/macOS Universal Disk Image/i)).toBeInTheDocument();

    // Click to close
    fireEvent.click(chevronBtn);
    expect(chevronBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('platform-dropdown')).not.toBeInTheDocument();
  });

  it('toggles dropdown when All Platforms link is clicked without opening any pop-up dialog', () => {
    render(<DownloadButton showOtherPlatformsLink={true} />);
    const allPlatformsBtn = screen.getByText(/All platforms/i);
    expect(allPlatformsBtn).toBeInTheDocument();

    // Click "All platforms"
    fireEvent.click(allPlatformsBtn);

    // Dropdown is open
    expect(screen.getByTestId('platform-dropdown')).toBeInTheDocument();
    expect(screen.getByText(/Select Your Platform/i)).toBeInTheDocument();

    // MUST NOT have any modal pop-up dialog
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes dropdown when an option is selected', () => {
    render(<DownloadButton />);
    const chevronBtn = screen.getByLabelText(/Toggle platform download options/i);
    fireEvent.click(chevronBtn);
    expect(screen.getByTestId('platform-dropdown')).toBeInTheDocument();

    const preventNav = (e: MouseEvent) => e.preventDefault();
    window.addEventListener('click', preventNav, { capture: true });

    const macOption = screen.getByText(/macOS Universal Disk Image/i);
    fireEvent.click(macOption);

    window.removeEventListener('click', preventNav, { capture: true });
    expect(screen.queryByTestId('platform-dropdown')).not.toBeInTheDocument();
  });

  it('closes dropdown on Escape key', () => {
    render(<DownloadButton />);
    const chevronBtn = screen.getByLabelText(/Toggle platform download options/i);
    fireEvent.click(chevronBtn);
    expect(screen.getByTestId('platform-dropdown')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('platform-dropdown')).not.toBeInTheDocument();
  });

  it('renders backdrop overlay when dropdown is open and dismisses on backdrop click', () => {
    render(<DownloadButton />);
    const chevronBtn = screen.getByLabelText(/Toggle platform download options/i);
    fireEvent.click(chevronBtn);

    const backdrop = screen.getByTestId('dropdown-backdrop');
    expect(backdrop).toBeInTheDocument();

    fireEvent.click(backdrop);
    expect(screen.queryByTestId('platform-dropdown')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dropdown-backdrop')).not.toBeInTheDocument();
  });

  it('hides other platforms link when showOtherPlatformsLink is false', () => {
    render(<DownloadButton showOtherPlatformsLink={false} />);
    expect(screen.queryByText(/All platforms/i)).not.toBeInTheDocument();
  });
});
