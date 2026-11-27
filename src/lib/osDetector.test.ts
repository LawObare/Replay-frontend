import { describe, it, expect, afterEach } from 'vitest';
import {
  detectUserPlatform,
  PLATFORMS,
  ALL_PACKAGES,
  DOWNLOAD_CATALOG,
  RELEASE_INFO,
} from './osDetector';

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

  it('provides complete platform records linked to Dixon-O/replaylabb v0.1.0-test.1', () => {
    expect(RELEASE_INFO.releaseTag).toBe('v0.1.0-test.1');
    expect(RELEASE_INFO.checksumsUrl).toBe(
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/SHA256SUMS'
    );

    expect(PLATFORMS.linux.installerName).toBe('ReplayLabb-0.1.0-bb5269b-linux-x64.deb');
    expect(PLATFORMS.linux.size).toBe('16.5 MB');
    expect(PLATFORMS.linux.format).toContain('.deb');
    expect(PLATFORMS.linux.available).toBe(true);
    expect(PLATFORMS.linux.downloadUrl).toBe(
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/ReplayLabb-0.1.0-bb5269b-linux-x64.deb'
    );

    expect(PLATFORMS.windows.installerName).toBe('ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe');
    expect(PLATFORMS.windows.size).toBe('8.0 MB');
    expect(PLATFORMS.windows.format).toContain('.exe');
    expect(PLATFORMS.windows.available).toBe(true);
    expect(PLATFORMS.windows.downloadUrl).toBe(
      'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe'
    );

    expect(PLATFORMS.macos.available).toBe(false);
    expect(PLATFORMS.macos.downloadUrl).toBe('https://github.com/Dixon-O/replaylabb/releases');
  });

  it('exposes Windows x64 alternatives and pending flags in DOWNLOAD_CATALOG', () => {
    expect(DOWNLOAD_CATALOG.windows.x64.available).toBe(true);
    expect(DOWNLOAD_CATALOG.windows.x64.alternatives).toHaveLength(2);
    expect(DOWNLOAD_CATALOG.windows.arm64.available).toBe(false);
    expect(DOWNLOAD_CATALOG.linux.x64.available).toBe(true);
    expect(DOWNLOAD_CATALOG.linux.x64.installCommand).toContain('wget -O /tmp/replaylabb.deb');
    expect(DOWNLOAD_CATALOG.linux.x64.installCommand).toContain(
      DOWNLOAD_CATALOG.linux.x64.primary?.url
    );
    expect(DOWNLOAD_CATALOG.linux.x64.installCommand).toContain('sudo apt install -y /tmp/replaylabb.deb');
    expect(DOWNLOAD_CATALOG.linux.x64.installCommand).toContain('rm -f /tmp/replaylabb.deb');
    expect(DOWNLOAD_CATALOG.linux.x64.installCommandInfo?.title).toBeTruthy();
    expect(DOWNLOAD_CATALOG.linux.x64.installCommandInfo?.summary).toBeTruthy();
    expect(DOWNLOAD_CATALOG.linux.x64.installCommandInfo?.reasons.length).toBeGreaterThanOrEqual(3);
    expect(DOWNLOAD_CATALOG.linux.arm64.available).toBe(false);
    expect(DOWNLOAD_CATALOG.macos.x64.available).toBe(false);
    expect(DOWNLOAD_CATALOG.macos.arm64.available).toBe(false);
  });

  it('contains all downloadable packages in ALL_PACKAGES', () => {
    expect(ALL_PACKAGES).toHaveLength(4);
    const formats = ALL_PACKAGES.map((p) => p.format);
    expect(formats).toContain('.deb');
    expect(formats).toContain('.exe');
    expect(formats).toContain('.msi');
  });
});
