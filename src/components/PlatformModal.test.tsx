import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlatformModal } from './PlatformModal';

describe('PlatformModal', () => {
  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    render(<PlatformModal isOpen={false} onClose={handleClose} detectedOs="linux" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal dialog when isOpen is true', () => {
    const handleClose = vi.fn();
    render(<PlatformModal isOpen={true} onClose={handleClose} detectedOs="linux" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Download ReplayLabb/i)).toBeInTheDocument();
    expect(screen.getByText(/Debian \/ Ubuntu Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Universal Linux AppImage/i)).toBeInTheDocument();
  });

  it('closes on Escape key press (14Emanuel Gate)', () => {
    const handleClose = vi.fn();
    render(<PlatformModal isOpen={true} onClose={handleClose} detectedOs="linux" />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes on backdrop click with onClick (14Emanuel Gate)', () => {
    const handleClose = vi.fn();
    render(<PlatformModal isOpen={true} onClose={handleClose} detectedOs="linux" />);
    const dialogBackdrop = screen.getByRole('dialog');
    fireEvent.click(dialogBackdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
