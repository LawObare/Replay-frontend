export type PlatformOS = 'linux' | 'windows' | 'macos';
export type PlatformArch = 'x64' | 'arm64';

export const RELEASE_INFO = {
  repoUrl: 'https://github.com/Dixon-O/replaylabb',
  releasesUrl: 'https://github.com/Dixon-O/replaylabb/releases',
  releaseTag: 'v0.1.0-test.1',
  releaseName: 'ReplayLabb 0.1.0 Test 1',
  releasePageUrl: 'https://github.com/Dixon-O/replaylabb/releases/tag/v0.1.0-test.1',
  checksumsUrl:
    'https://github.com/Dixon-O/replaylabb/releases/download/v0.1.0-test.1/SHA256SUMS',
} as const;

const DOWNLOAD_BASE = `${RELEASE_INFO.releasesUrl}/download/${RELEASE_INFO.releaseTag}`;

export interface DownloadVariant {
  id: string;
  label: string;
  filename: string;
  format: string;
  size: string;
  url: string;
  note?: string;
}

export interface ArchDownloadConfig {
  available: boolean;
  primary?: DownloadVariant;
  alternatives?: DownloadVariant[];
  installNote?: string;
  installCommand?: string;
  pendingNote?: string;
}

export interface PlatformInfo {
  os: PlatformOS;
  label: string;
  installerName: string;
  format: string;
  size: string;
  downloadUrl: string;
  releaseTag: string;
  available: boolean;
}

export function detectUserPlatform(): PlatformOS {
  if (typeof window === 'undefined') return 'linux';
  const ua = (window.navigator.userAgent || '').toLowerCase();
  const platform = (
    (window.navigator as unknown as { userAgentData?: { platform?: string } })
      .userAgentData?.platform ||
    window.navigator.platform ||
    ''
  ).toLowerCase();

  if (platform.includes('win') || ua.includes('windows')) {
    return 'windows';
  }
  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os')) {
    return 'macos';
  }
  return 'linux';
}

export const DOWNLOAD_CATALOG: Record<PlatformOS, Record<PlatformArch, ArchDownloadConfig>> = {
  windows: {
    x64: {
      available: true,
      primary: {
        id: 'windows-x64-setup',
        label: 'Download Setup (.exe)',
        filename: 'ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe',
        format: 'Setup .exe (x64)',
        size: '8.0 MB',
        url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe`,
      },
      alternatives: [
        {
          id: 'windows-x64-msi',
          label: 'MSI Installer',
          filename: 'ReplayLabb-0.1.0-508e7be-windows-x64.msi',
          format: '.msi',
          size: '11.7 MB',
          url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-508e7be-windows-x64.msi`,
        },
        {
          id: 'windows-x64-standalone',
          label: 'Standalone EXE',
          filename: 'ReplayLabb-0.1.0-508e7be-windows-x64.exe',
          format: 'Standalone .exe',
          size: '31.8 MB',
          url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-508e7be-windows-x64.exe`,
          note: 'Requires WebView2',
        },
      ],
      installNote:
        'Windows test builds are unsigned, so Windows may show an unknown-publisher warning. The standalone EXE skips the installer and requires WebView2.',
    },
    arm64: {
      available: false,
      pendingNote: 'Windows ARM64 installer is pending.',
    },
  },
  linux: {
    x64: {
      available: true,
      primary: {
        id: 'linux-x64-deb',
        label: 'Download (.deb)',
        filename: 'ReplayLabb-0.1.0-bb5269b-linux-x64.deb',
        format: '.deb (x64)',
        size: '16.5 MB',
        url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-bb5269b-linux-x64.deb`,
      },
      installNote:
        'Install via APT from your download folder so GTK 3 and WebKitGTK 4.1 dependencies are resolved automatically:',
      installCommand: 'sudo apt install ./ReplayLabb-0.1.0-bb5269b-linux-x64.deb',
    },
    arm64: {
      available: false,
      pendingNote: 'Linux ARM64 installer is pending.',
    },
  },
  macos: {
    x64: {
      available: false,
      pendingNote: 'macOS (Intel) installer is pending.',
    },
    arm64: {
      available: false,
      pendingNote: 'macOS (Apple Silicon) installer is pending.',
    },
  },
};

export const PLATFORMS: Record<PlatformOS, PlatformInfo> = {
  linux: {
    os: 'linux',
    label: 'Linux (Ubuntu 24.04 x64)',
    installerName: 'ReplayLabb-0.1.0-bb5269b-linux-x64.deb',
    format: '.deb (x64)',
    size: '16.5 MB',
    downloadUrl: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-bb5269b-linux-x64.deb`,
    releaseTag: RELEASE_INFO.releaseTag,
    available: true,
  },
  windows: {
    os: 'windows',
    label: 'Windows (64-bit)',
    installerName: 'ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe',
    format: 'Setup .exe (x64)',
    size: '8.0 MB',
    downloadUrl: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe`,
    releaseTag: RELEASE_INFO.releaseTag,
    available: true,
  },
  macos: {
    os: 'macos',
    label: 'macOS (Apple Silicon & Intel)',
    installerName: 'Coming soon',
    format: 'macOS (Pending)',
    size: 'Pending',
    downloadUrl: RELEASE_INFO.releasesUrl,
    releaseTag: RELEASE_INFO.releaseTag,
    available: false,
  },
};

export const ALL_PACKAGES = [
  {
    os: 'linux' as PlatformOS,
    name: 'Ubuntu / Debian Package',
    filename: 'ReplayLabb-0.1.0-bb5269b-linux-x64.deb',
    format: '.deb',
    size: '16.5 MB',
    arch: 'x64',
    url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-bb5269b-linux-x64.deb`,
    recommended: true,
  },
  {
    os: 'windows' as PlatformOS,
    name: 'Windows Setup Installer',
    filename: 'ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe',
    format: '.exe',
    size: '8.0 MB',
    arch: 'x64',
    url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-508e7be-windows-x64-setup.exe`,
    recommended: true,
  },
  {
    os: 'windows' as PlatformOS,
    name: 'Windows MSI Installer',
    filename: 'ReplayLabb-0.1.0-508e7be-windows-x64.msi',
    format: '.msi',
    size: '11.7 MB',
    arch: 'x64',
    url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-508e7be-windows-x64.msi`,
    recommended: false,
  },
  {
    os: 'windows' as PlatformOS,
    name: 'Windows Standalone Executable',
    filename: 'ReplayLabb-0.1.0-508e7be-windows-x64.exe',
    format: '.exe',
    size: '31.8 MB',
    arch: 'x64 (WebView2)',
    url: `${DOWNLOAD_BASE}/ReplayLabb-0.1.0-508e7be-windows-x64.exe`,
    recommended: false,
  },
];
