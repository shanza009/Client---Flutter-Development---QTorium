/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { allDashboardConfigs, boardExConfig } from './data/qtoriumConfigs';
import { QToriumProductConfig, ViewportMode } from './types/qtorium';
import { ShellControlBar } from './components/ui/ShellControlBar';
import { QToriumShell } from './components/shell/QToriumShell';
import { MilestoneHubModal } from './components/modals/MilestoneHubModal';
import { FlutterCodeViewerModal } from './components/modals/FlutterCodeViewerModal';
import { AcceptanceGatesModal } from './components/modals/AcceptanceGatesModal';
import { LockedSpecHubModal } from './components/modals/LockedSpecHubModal';

export default function App() {
  const [activeConfig, setActiveConfig] = useState<QToriumProductConfig>(boardExConfig);
  const [currentRoute, setCurrentRoute] = useState<string>('/boardex/preview');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');

  // Modals state
  const [isMilestoneHubOpen, setIsMilestoneHubOpen] = useState<boolean>(false);
  const [isCodeExplorerOpen, setIsCodeExplorerOpen] = useState<boolean>(false);
  const [isAcceptanceGatesOpen, setIsAcceptanceGatesOpen] = useState<boolean>(false);
  const [isLockedSpecsOpen, setIsLockedSpecsOpen] = useState<boolean>(false);

  const handleSelectProduct = (config: QToriumProductConfig) => {
    setActiveConfig(config);
    // Preview-first routing: navigate to that product's preview route
    setCurrentRoute(config.navItems[0].route);
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
  };

  const handleReset = () => {
    setActiveConfig(boardExConfig);
    setCurrentRoute('/boardex/preview');
    setViewportMode('responsive');
    setDarkMode(true);
  };

  // Viewport container sizing
  const getViewportClasses = () => {
    switch (viewportMode) {
      case 'desktop':
        return 'w-full max-w-[1920px] h-[95vh] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 my-auto';
      case 'laptop':
        return 'w-full max-w-[1440px] h-[90vh] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 my-auto';
      case 'tablet':
        return 'w-full max-w-[1024px] h-[85vh] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 my-auto';
      case 'tablet768':
        return 'w-full max-w-[768px] h-[85vh] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 my-auto';
      case 'mobile':
        return 'w-full max-w-[390px] h-[844px] rounded-3xl shadow-2xl border-4 border-slate-800 my-auto overflow-hidden ring-4 ring-blue-500/20';
      case 'responsive':
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className={`w-screen h-screen flex flex-col ${darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#f1f5f9] text-slate-900'} overflow-hidden font-sans`}>
      {/* 1. Global Shell Control & Environment Bar */}
      <ShellControlBar
        configs={allDashboardConfigs}
        activeConfig={activeConfig}
        onSelectProduct={handleSelectProduct}
        viewportMode={viewportMode}
        onChangeViewport={setViewportMode}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenMilestoneHub={() => setIsMilestoneHubOpen(true)}
        onOpenCodeExplorer={() => setIsCodeExplorerOpen(true)}
        onOpenAcceptanceGates={() => setIsAcceptanceGatesOpen(true)}
        onOpenLockedSpecs={() => setIsLockedSpecsOpen(true)}
        onReset={handleReset}
      />

      {/* 2. Main Live Viewport Stage */}
      <div className={`flex-1 w-full overflow-hidden flex items-center justify-center p-0 md:p-2 relative ${darkMode ? 'bg-[#0b0f19]' : 'bg-[#e2e8f0]'}`}>
        <div className={`transition-all duration-300 overflow-hidden flex flex-col ${getViewportClasses()}`}>
          <QToriumShell
            config={activeConfig}
            currentRoute={currentRoute}
            onNavigate={handleNavigate}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode(!darkMode)}
            onOpenMilestoneHub={() => setIsMilestoneHubOpen(true)}
            onOpenCodeExplorer={() => setIsCodeExplorerOpen(true)}
            onOpenLockedSpecs={() => setIsLockedSpecsOpen(true)}
          />
        </div>
      </div>

      {/* 3. Deliverable Modals */}
      <MilestoneHubModal
        isOpen={isMilestoneHubOpen}
        onClose={() => setIsMilestoneHubOpen(false)}
      />

      <FlutterCodeViewerModal
        isOpen={isCodeExplorerOpen}
        onClose={() => setIsCodeExplorerOpen(false)}
      />

      <AcceptanceGatesModal
        isOpen={isAcceptanceGatesOpen}
        onClose={() => setIsAcceptanceGatesOpen(false)}
      />

      <LockedSpecHubModal
        isOpen={isLockedSpecsOpen}
        onClose={() => setIsLockedSpecsOpen(false)}
      />
    </div>
  );
}
