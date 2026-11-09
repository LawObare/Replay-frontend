import React, { useState } from 'react';
import { detectUserPlatform, PLATFORMS } from '../lib/osDetector';

type SelectedOS = 'macos' | 'windows' | 'linux' | 'googlebook';

interface DownloadPageProps {
  onNavigate?: (view: 'home' | 'download', sectionId?: string) => void;
}

interface ExtensionInfo {
  name: string;
  version: string;
  icon: string;
  description: string;
  docUrl: string;
}

const EXTENSIONS: ExtensionInfo[] = [
  {
    name: 'Visual Studio Code',
    version: 'v1.10.0',
    icon: '/icons/icon-vscode.svg',
    description: 'Autonomous coding agent, inline completions, and full diff reviews in VS Code and VS Code Insiders.',
    docUrl: 'https://docs.replaylabb.com/extensions/vscode',
  },
  {
    name: 'Visual Studio',
    version: 'v1.0.261026.0',
    icon: '/icons/icon-visualstudio.svg',
    description: 'Agentic workflows, tool executions, and multi-file code editing for Visual Studio 2026.',
    docUrl: 'https://docs.replaylabb.com/extensions/visual-studio',
  },
  {
    name: 'JetBrains',
    version: 'v1.4.1',
    icon: '/icons/icon-jetbrains.svg',
    description: 'IntelliJ IDEA, PyCharm, WebStorm, GoLand, CLion, Rider, and more (Enterprise support in Preview).',
    docUrl: 'https://docs.replaylabb.com/extensions/jetbrains',
  },
  {
    name: 'Zed',
    version: 'v1.4.1',
    icon: '/icons/icon-zed.svg',
    description: 'High-performance agent orchestration and native multibuffer editing in Zed (Enterprise support in Preview).',
    docUrl: 'https://docs.replaylabb.com/extensions/zed',
  },
  {
    name: 'Xcode',
    version: 'v1.4.1',
    icon: '/icons/icon-xcode.svg',
    description: 'Native agentic development inside Xcode for macOS, iOS, iPadOS, watchOS, and visionOS (Enterprise support in Preview).',
    docUrl: 'https://docs.replaylabb.com/extensions/xcode',
  },
  {
    name: 'Eclipse',
    version: 'v1.0.0',
    icon: '/icons/icon-eclipse.svg',
    description: 'Agentic workflows, multi-step task execution, and diff reviews in Eclipse on macOS, Linux, and Windows (Public Preview).',
    docUrl: 'https://docs.replaylabb.com/extensions/eclipse',
  },
];

export const DownloadPage: React.FC<DownloadPageProps> = () => {
  const detected = detectUserPlatform();
  const initialOS: SelectedOS = (detected === 'linux' || detected === 'windows' || detected === 'macos')
    ? detected
    : 'linux';

  const [activeOS, setActiveOS] = useState<SelectedOS>(initialOS);

  const osTabs: { id: SelectedOS; label: string; icon: string; width: number; height: number }[] = [
    { id: 'macos', label: 'macOS', icon: '/icons/icon-macos.svg', width: 16, height: 20 },
    { id: 'windows', label: 'Windows', icon: '/icons/icon-windows.svg', width: 20, height: 20 },
    { id: 'linux', label: 'Linux', icon: '/icons/icon-linux.svg', width: 20, height: 20 },
    { id: 'googlebook', label: 'Googlebook', icon: '/icons/icon-googlebook.svg', width: 20, height: 20 },
  ];

  const getRequirementsText = () => {
    switch (activeOS) {
      case 'macos':
        return 'macOS 12.0 (Monterey) or later (Apple Silicon M1/M2/M3/M4 & Intel 64-bit)';
      case 'windows':
        return 'Windows 10 64-bit (build 19041+) or Windows 11 (x64 / ARM64)';
      case 'googlebook':
        return 'ChromeOS with Linux development environment (Debian/Crostini container enabled)';
      case 'linux':
      default:
        return 'glibc >= 2.28, glibcxx >= 3.4.25 (e.g. Ubuntu 20+, Debian 10+, Fedora 36+, RHEL 8+)';
    }
  };

  const getDownloadConfig = (arch: 'x64' | 'arm64') => {
    if (activeOS === 'linux') {
      if (arch === 'x64') {
        return {
          href: PLATFORMS.linux.downloadUrl,
          fileName: PLATFORMS.linux.installerName,
          label: 'Download (.deb)',
        };
      }
      return {
        href: 'https://github.com/Flying-Tea-Squad/ReplayLabb/releases/latest',
        fileName: 'replaylabb_0.1.0_arm64.deb',
        label: 'Download (ARM64)',
      };
    }
    if (activeOS === 'macos') {
      return {
        href: PLATFORMS.macos.downloadUrl,
        fileName: PLATFORMS.macos.installerName,
        label: arch === 'arm64' ? 'Download for Apple Silicon' : 'Download for Intel',
      };
    }
    if (activeOS === 'windows') {
      return {
        href: PLATFORMS.windows.downloadUrl,
        fileName: PLATFORMS.windows.installerName,
        label: arch === 'x64' ? 'Download for x64' : 'Download for ARM64',
      };
    }
    // googlebook / chromeos
    return {
      href: PLATFORMS.linux.downloadUrl,
      fileName: PLATFORMS.linux.installerName,
      label: 'Download (.deb for ChromeOS)',
    };
  };

  const x64Config = getDownloadConfig('x64');
  const arm64Config = getDownloadConfig('arm64');

  return (
    <div className="w-full min-h-screen bg-white text-[#121317] font-['Inter',sans-serif]">
      {/* Main Container */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24">
        
        {/* Header Title */}
        <div className="pb-9">
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-tight tracking-[-0.017em]">
            <span>Download</span>{' '}
            <span className="font-extrabold italic text-[#00B894]">ReplayLabb</span>
          </h1>
        </div>

        {/* OS Platform Switcher Bar */}
        <div className="border-b border-[#212226]/12 py-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5" role="tablist" aria-label="Select Operating System">
            {osTabs.map((tab) => {
              const isActive = activeOS === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveOS(tab.id)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2 h-[38px] rounded-full text-[15.2px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#121317] text-white border border-[#121317] shadow-sm'
                      : 'bg-white text-[#45474D] border border-[#212226]/12 hover:bg-[#121317]/5 hover:text-[#121317]'
                  }`}
                >
                  <img
                    src={tab.icon}
                    alt=""
                    width={tab.width}
                    height={tab.height}
                    className={`shrink-0 transition-all duration-200 ${
                      isActive ? 'brightness-0 invert' : ''
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Download Sections */}
        <div id={`panel-${activeOS}`} role="tabpanel" className="space-y-12">
          {/* Section 1: x64 Processors */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium leading-[34px] tracking-[-0.0047em] text-[#121317]">
              {activeOS === 'macos' ? 'Download for Intel (x64) processors' : 'Download for x64 processors'}
            </h2>

            <div className="space-y-4">
              <a
                href={x64Config.href}
                download={activeOS === 'linux' ? x64Config.fileName : undefined}
                className="inline-flex items-center justify-center w-full sm:w-[220px] h-[47px] bg-[#121317] text-white text-base sm:text-[17.5px] font-medium rounded-full hover:bg-[#121317]/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-sm cursor-pointer"
              >
                Download
              </a>

              <div className="space-y-1 pt-1">
                <p className="text-[13.6px] font-medium text-[#121317]">
                  Minimum Requirements
                </p>
                <p className="text-[13.1px] text-[#45474D] max-w-3xl leading-relaxed">
                  {getRequirementsText()}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: ARM64 Processors */}
          <div className="space-y-6 pt-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium leading-[34px] tracking-[-0.0047em] text-[#121317]">
              {activeOS === 'macos' ? 'Download for Apple Silicon (ARM64) processors' : 'Download for ARM64 processors'}
            </h2>

            <div className="space-y-4">
              <a
                href={arm64Config.href}
                className="inline-flex items-center justify-center w-full sm:w-[220px] h-[47px] bg-[#121317] text-white text-base sm:text-[17.5px] font-medium rounded-full hover:bg-[#121317]/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-sm cursor-pointer"
              >
                Download
              </a>

              <div className="space-y-1 pt-1">
                <p className="text-[13.6px] font-medium text-[#121317]">
                  Minimum Requirements
                </p>
                <p className="text-[13.1px] text-[#45474D] max-w-3xl leading-relaxed">
                  {getRequirementsText()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Extensions Grid Section */}
        <div className="mt-16 pt-12 border-t border-[#212226]/12">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium leading-[34px] tracking-[-0.0047em] text-[#121317]">
              IDE &amp; Editor Extensions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#45474D]">
              Capture and debug HTTP(s) requests directly within your development environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {EXTENSIONS.map((item) => (
              <div key={item.name} className="flex flex-col items-start space-y-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="shrink-0"
                  />
                  <h3 className="text-lg sm:text-[18.4px] font-medium text-[#121317]">
                    {item.name}
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[#E8F0FE] border border-[#D2E3FC] text-[#174EA6] text-xs font-mono font-bold">
                    {item.version}
                  </span>
                </div>

                <p className="text-sm sm:text-[14.4px] leading-relaxed text-[#45474D] max-w-xl">
                  {item.description}
                </p>

                <div className="pt-1">
                  <a
                    href={item.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 h-[47px] bg-[#B7BFD9]/10 hover:bg-[#B7BFD9]/20 border border-[#212226]/[0.06] rounded-full text-[#121317] text-sm sm:text-[17.5px] font-medium transition-all duration-200 shadow-sm"
                  >
                    View Docs
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
