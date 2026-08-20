import React from 'react';
import { QToriumProductConfig, ViewportMode } from '../../types/qtorium';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  Code2,
  CalendarCheck2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

interface ShellControlBarProps {
  configs: QToriumProductConfig[];
  activeConfig: QToriumProductConfig;
  onSelectProduct: (config: QToriumProductConfig) => void;
  viewportMode: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenMilestoneHub: () => void;
  onOpenCodeExplorer: () => void;
  onOpenAcceptanceGates: () => void;
  onOpenLockedSpecs?: () => void;
  onReset: () => void;
  id?: string;
}

export const ShellControlBar: React.FC<ShellControlBarProps> = ({
  configs,
  activeConfig,
  onSelectProduct,
  viewportMode,
  onChangeViewport,
  darkMode,
  onToggleTheme,
  onOpenMilestoneHub,
  onOpenCodeExplorer,
  onOpenAcceptanceGates,
  onOpenLockedSpecs,
  onReset,
  id = 'shell-control-bar',
}) => {
  return (
    <div
      id={id}
      className={`border-b px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2.5 text-xs select-none z-30 shrink-0 transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
      }`}
    >
      {/* Left: Product Module Selector M2-M6 */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
        <span className="text-[11px] font-bold text-[#1e3a8a] dark:text-blue-400 tracking-wider uppercase mr-1 hidden lg:inline">
          Module:
        </span>
        {configs.map((cfg) => {
          const isActive = cfg.id === activeConfig.id;
          return (
            <button
              key={cfg.id}
              id={`btn-module-${cfg.id}`}
              onClick={() => onSelectProduct(cfg)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11.5px] transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-[#1e3a8a] text-white shadow-sm font-bold'
                  : darkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span
                className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                  isActive ? 'bg-blue-400 text-[#1e3a8a] font-bold' : darkMode ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-500'
                }`}
              >
                {cfg.milestoneId}
              </span>
              <span>{cfg.title}</span>
            </button>
          );
        })}
      </div>

      {/* Center/Right: Viewport Mode Switcher & Deliverable Hubs */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Viewport controls */}
        <div className={`hidden sm:flex items-center gap-1 p-0.5 rounded-lg border ${
          darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          {[
            { mode: 'responsive' as ViewportMode, label: 'Full', icon: Maximize2 },
            { mode: 'desktop' as ViewportMode, label: '1920', icon: Monitor },
            { mode: 'laptop' as ViewportMode, label: '1440', icon: Laptop },
            { mode: 'tablet' as ViewportMode, label: '1024', icon: Tablet },
            { mode: 'tablet768' as ViewportMode, label: '768', icon: Tablet },
            { mode: 'mobile' as ViewportMode, label: '375', icon: Smartphone },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = viewportMode === item.mode;
            return (
              <button
                key={item.mode}
                id={`btn-viewport-${item.mode}`}
                onClick={() => onChangeViewport(item.mode)}
                title={`Viewport: ${item.label}`}
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-[#1e3a8a] text-white font-bold shadow-xs'
                    : darkMode
                      ? 'text-slate-400 hover:text-slate-100'
                      : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Milestone 1 Hub Button */}
        <button
          id="btn-milestone-hub"
          onClick={onOpenMilestoneHub}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e3a8a] text-white font-semibold text-xs shadow-sm hover:bg-blue-900 active:scale-95 transition-all"
        >
          <CalendarCheck2 className="w-3.5 h-3.5 text-blue-300" />
          <span>Milestone 1 Plan & Days</span>
        </button>

        {/* Locked Specs & 55/45 Execution Split */}
        {onOpenLockedSpecs && (
          <button
            id="btn-locked-specs-hub"
            onClick={onOpenLockedSpecs}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium text-xs border transition-all ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                : 'bg-white hover:bg-slate-50 text-amber-700 border-slate-200 shadow-xs'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Locked Specs & 55/45 Split</span>
            <span className="lg:hidden">Specs</span>
          </button>
        )}

        {/* Flutter Source Code Modal */}
        <button
          id="btn-flutter-code"
          onClick={onOpenCodeExplorer}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium text-xs border transition-all ${
            darkMode
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-blue-400" />
          <span className="hidden md:inline">Flutter Dart Source</span>
          <span className="md:hidden">Flutter</span>
        </button>

        {/* Acceptance Gates Badge */}
        <button
          id="btn-acceptance-gates"
          onClick={onOpenAcceptanceGates}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold text-xs border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Gates: 10/10 PASS</span>
        </button>

        {/* Reset */}
        <button
          id="btn-reset-simulator"
          onClick={onReset}
          title="Reset View"
          className={`p-1.5 rounded-lg transition-all ${
            darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
