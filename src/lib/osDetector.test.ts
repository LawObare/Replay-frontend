import { describe, it, expect, afterEach } from 'vitest';
import { detectUserPlatform, PLATFORMS, ALL_PACKAGES } from './osDetector';

describe('osDetector', () => {
  const originalUserAgent = window.navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });

  it('detects Windows from userAgent', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      configurable: true,
    });
    expect(detectUserPlatform()).toBe('windows');
  });

  it('detects macOS from userAgent', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      configurable: true,
    });
    expect(detectUserPlatform()).toBe('macos');
  });

  it('defaults to Linux on Linux or unrecognized agents', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      configurable: true,
    });
    expect(detectUserPlatform()).toBe('linux');
  });

  it('provides complete platform records with installer metadata', () => {
    expect(PLATFORMS.linux.installerName).toBe('replaylabb_0.1.0_amd64.deb');
    expect(PLATFORMS.linux.size).toBe('11 MB');
    expect(PLATFORMS.linux.format).toContain('.deb');

    expect(PLATFORMS.windows.format).toContain('.exe');
    expect(PLATFORMS.macos.format).toContain('.dmg');
  });

  it('contains all downloadable packages in ALL_PACKAGES', () => {
    expect(ALL_PACKAGES.length).toBeGreaterThanOrEqual(4);
    const formats = ALL_PACKAGES.map((p) => p.format);
    expect(formats).toContain('.deb');
    expect(formats).toContain('.AppImage');
    expect(formats).toContain('.exe');
    expect(formats).toContain('.dmg');
  });
});
