export type PlatformOS = 'linux' | 'windows' | 'macos';

export interface PlatformInfo {
  os: PlatformOS;
  label: string;
  installerName: string;
  format: string;
  size: string;
  downloadUrl: string;
  releaseTag: string;
}

export function detectUserPlatform(): PlatformOS {
  if (typeof window === 'undefined') return 'linux';
  const ua = (window.navigator.userAgent || '').toLowerCase();
  const platform = ((window.navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform || window.navigator.platform || '').toLowerCase();

  if (platform.includes('win') || ua.includes('windows')) {
    return 'windows';
  }
  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os')) {
    return 'macos';
  }
  return 'linux';
}

export const PLATFORMS: Record<PlatformOS, PlatformInfo> = {
  linux: {
    os: 'linux',
    label: 'Linux (Ubuntu / Debian)',
    installerName: 'replaylabb_0.1.0_amd64.deb',
    format: '.deb (x86_64)',
    size: '11 MB',
    downloadUrl: '/downloads/replaylabb_0.1.0_amd64.deb',
    releaseTag: 'v0.1.0',
  },
  windows: {
    os: 'windows',
    label: 'Windows (64-bit)',
    installerName: 'replaylabb_0.1.0_x64-setup.exe',
    format: '.exe (x64)',
    size: '14 MB',
    downloadUrl: 'https://github.com/Flying-Tea-Squad/ReplayLabb/releases/latest',
    releaseTag: 'v0.1.0',
  },
  macos: {
    os: 'macos',
    label: 'macOS (Apple Silicon & Intel)',
    installerName: 'ReplayLabb_0.1.0_universal.dmg',
    format: '.dmg (universal)',
    size: '16 MB',
    downloadUrl: 'https://github.com/Flying-Tea-Squad/ReplayLabb/releases/latest',
    releaseTag: 'v0.1.0',
  },
};

export const ALL_PACKAGES = [
  {
    os: 'linux',
    name: 'Debian / Ubuntu Package',
    filename: 'replaylabb_0.1.0_amd64.deb',
    format: '.deb',
    size: '11 MB',
    arch: 'x86_64',
    url: '/downloads/replaylabb_0.1.0_amd64.deb',
    recommended: true,
  },
  {
    os: 'linux',
    name: 'Universal Linux AppImage',
    filename: 'ReplayLabb_0.1.0_amd64.AppImage',
    format: '.AppImage',
    size: '18 MB',
    arch: 'x86_64',
    url: 'https://github.com/Flying-Tea-Squad/ReplayLabb/releases/latest',
    recommended: false,
  },
  {
    os: 'windows',
    name: 'Windows NSIS Installer',
    filename: 'replaylabb_0.1.0_x64-setup.exe',
    format: '.exe',
    size: '14 MB',
    arch: 'x64',
    url: 'https://github.com/Flying-Tea-Squad/ReplayLabb/releases/latest',
    recommended: true,
  },
  {
    os: 'macos',
    name: 'macOS Universal Disk Image',
    filename: 'ReplayLabb_0.1.0_universal.dmg',
    format: '.dmg',
    size: '16 MB',
    arch: 'Apple Silicon + Intel',
    url: 'https://github.com/Flying-Tea-Squad/ReplayLabb/releases/latest',
    recommended: true,
  },
];
