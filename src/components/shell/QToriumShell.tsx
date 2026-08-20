import React, { useState, useRef, useEffect, useCallback } from 'react';
import { QToriumProductConfig } from '../../types/qtorium';
import { QToriumSidebar } from './QToriumSidebar';
import { QToriumTopHeader } from './QToriumTopHeader';
import { QToriumInsetTopNav } from './QToriumInsetTopNav';
import { ProductContentPage } from '../content/ProductContentPage';

interface QToriumShellProps {
  config: QToriumProductConfig;
  currentRoute: string;
  onNavigate: (route: string) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenMilestoneHub: () => void;
  onOpenCodeExplorer: () => void;
  onOpenLockedSpecs?: () => void;
  id?: string;
}

export const QToriumShell: React.FC<QToriumShellProps> = ({
  config,
  currentRoute,
  onNavigate,
  darkMode,
  onToggleTheme,
  onOpenMilestoneHub,
  onOpenCodeExplorer,
  onOpenLockedSpecs,
  id = 'qtorium-universal-shell',
}) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(285);
  const [bodyExpanded, setBodyExpanded] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const minSidebar = 230;
  const maxSidebar = 390;

  const dragStartXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(285);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    startWidthRef.current = sidebarWidth;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartXRef.current;
      const newWidth = Math.min(Math.max(startWidthRef.current + delta, minSidebar), maxSidebar);
      setSidebarWidth(newWidth);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Body background matching Clean Minimalism design:
  // Light mode: clean minimalist slate-50 (#f8fafc)
  // Dark mode: slate-900 (#0f172a)
  const bodyBgClass = darkMode ? 'bg-[#0f172a]' : 'bg-[#f8fafc]';

  return (
    <div
      id={id}
      className={`w-full h-full flex flex-row overflow-hidden select-none transition-colors duration-150 ${bodyBgClass}`}
    >
      {/* 1. Left Region: Secondary Blue Dashboard */}
      {!bodyExpanded && (
        <QToriumSidebar
          config={config}
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          width={sidebarWidth}
        />
      )}

      {/* 2. Draggable Resize Divider (230px to 390px) */}
      {!bodyExpanded && (
        <div
          id="qtorium-resize-divider"
          onMouseDown={handleMouseDown}
          title="Drag to resize dashboard (230px - 390px)"
          className={`w-2 h-full flex items-center justify-center cursor-col-resize shrink-0 z-20 group transition-colors ${
            isDragging ? 'bg-blue-600/30' : 'hover:bg-blue-600/15'
          }`}
        >
          <div
            className={`w-[1.5px] h-full transition-colors ${
              isDragging
                ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]'
                : darkMode
                  ? 'bg-slate-800 group-hover:bg-blue-500'
                  : 'bg-slate-200 group-hover:bg-blue-500'
            }`}
          />
        </div>
      )}

      {/* 3. Right Region: Body with Top Header, Inset Nav, and Scrollable Content */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {/* Body-matched Top Header */}
        <QToriumTopHeader
          darkMode={darkMode}
          onToggleTheme={onToggleTheme}
          bodyExpanded={bodyExpanded}
          onToggleBodyExpansion={() => setBodyExpanded(!bodyExpanded)}
          onOpenMilestoneHub={onOpenMilestoneHub}
          onOpenCodeExplorer={onOpenCodeExplorer}
        />

        {/* Inset Secondary Blue Horizontal Navigation */}
        <QToriumInsetTopNav
          config={config}
          currentRoute={currentRoute}
          onNavigate={onNavigate}
        />

        {/* Independent Scrollable Body Region */}
        <div
          id="qtorium-body-scroll-container"
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin select-text"
        >
          <ProductContentPage
            config={config}
            currentRoute={currentRoute}
            onNavigate={onNavigate}
            darkMode={darkMode}
            onOpenMilestoneHub={onOpenMilestoneHub}
            onOpenLockedSpecs={onOpenLockedSpecs}
          />
        </div>
      </main>
    </div>
  );
};
