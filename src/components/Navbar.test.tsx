import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders brand mark and navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('Replay')).toBeInTheDocument();
    expect(screen.getByText('Labb')).toBeInTheDocument();
    expect(screen.getByTestId('app-logo-mark')).toBeInTheDocument();
    expect(screen.queryByText('RL')).not.toBeInTheDocument();

    const problemLinks = screen.getAllByText('Problem');
    expect(problemLinks.length).toBeGreaterThan(0);
    const workflowLinks = screen.getAllByText('Workflow');
    expect(workflowLinks.length).toBeGreaterThan(0);
  });

  it('toggles mobile navigation drawer when hamburger button is clicked', () => {
    render(<Navbar />);

    const hamburgerBtn = screen.getByLabelText(/Open navigation menu/i);
    expect(hamburgerBtn).toBeInTheDocument();
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(hamburgerBtn);
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/View All Platforms/i)).toBeInTheDocument();

    // Click again to close
    fireEvent.click(hamburgerBtn);
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(/View All Platforms/i)).not.toBeInTheDocument();
  });

  it('closes mobile menu when a mobile nav link is clicked', () => {
    render(<Navbar />);

    const hamburgerBtn = screen.getByLabelText(/Open navigation menu/i);
    fireEvent.click(hamburgerBtn);

    const mobileProblemLinks = screen.getAllByText('Problem');
    // Click mobile link
    fireEvent.click(mobileProblemLinks[mobileProblemLinks.length - 1]);

    expect(screen.queryByText(/View All Platforms/i)).not.toBeInTheDocument();
  });
});
