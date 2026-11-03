import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DownloadButton } from './DownloadButton';

describe('DownloadButton', () => {
  it('renders direct download button with desktop text and link', () => {
    render(<DownloadButton />);
    const downloadBtn = screen.getByText(/Download for Desktop/i);
    expect(downloadBtn).toBeInTheDocument();

    const link = downloadBtn.closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href');
    expect(link).toHaveAttribute('title');
  });

  it('does not render any dropdown chevron button or dropdown menu', () => {
    render(<DownloadButton />);
    expect(screen.queryByLabelText(/Toggle platform download options/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('platform-dropdown')).not.toBeInTheDocument();
  });

  it('renders all platforms link directly to GitHub releases without any pop-up', () => {
    render(<DownloadButton showOtherPlatformsLink={true} />);
    const allPlatformsLink = screen.getByText(/All platforms/i);
    expect(allPlatformsLink).toBeInTheDocument();
    expect(allPlatformsLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/Flying-Tea-Squad/ReplayLabb/releases'
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides other platforms link when showOtherPlatformsLink is false', () => {
    render(<DownloadButton showOtherPlatformsLink={false} />);
    expect(screen.queryByText(/All platforms/i)).not.toBeInTheDocument();
  });
});
