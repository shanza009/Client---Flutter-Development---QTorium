import React from 'react';
import { QToriumProductConfig, QToriumNavItem } from '../../types/qtorium';
import { IconRenderer } from '../ui/IconRenderer';

interface QToriumSidebarProps {
  config: QToriumProductConfig;
  currentRoute: string;
  onNavigate: (route: string) => void;
  width: number;
  id?: string;
}

export const QToriumSidebar: React.FC<QToriumSidebarProps> = ({
  config,
  currentRoute,
  onNavigate,
  width,
  id = 'qtorium-sidebar',
}) => {
  return (
    <aside
      id={id}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
      className="h-full bg-[#1e3a8a] text-white flex flex-col select-none transition-[width] duration-75 relative z-10 border-r border-blue-900/60 shrink-0"
    >
      {/* Brand Header */}
      <div className="p-6 pb-4 flex items-center justify-between border-b border-blue-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-white shadow-sm font-display text-lg">
            Q
          </div>
          <div>
            <span className="font-display font-semibold text-xl tracking-tight text-white block leading-none">
              QTorium
            </span>
            <span className="text-[11px] font-medium text-blue-200/80 block mt-0.5">
              {config.title}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-800/60 text-blue-200 border border-blue-700/50">
          {config.milestoneId}
        </span>
      </div>

      {/* Product Module Subtitle Tag */}
      <div className="px-6 py-2.5 text-xs text-blue-200/75 leading-snug border-b border-blue-800/40 bg-blue-950/20">
        <p className="truncate font-medium">{config.subtitle}</p>
      </div>

      {/* Navigation List - Independent Scroll Container */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
        {config.navItems.map((item: QToriumNavItem) => {
          const isSelected = currentRoute === item.route;

          return (
            <button
              key={item.route}
              id={`nav-item-${item.id}`}
              onClick={() => onNavigate(item.route)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                isSelected
                  ? 'bg-blue-700/40 text-white shadow-xs font-semibold'
                  : 'text-blue-100/70 hover:bg-blue-800/50 hover:text-white font-medium'
              }`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 shrink-0 transition-colors ${
                  isSelected ? 'text-white' : 'text-blue-200/80 group-hover:text-white'
                }`}
              >
                <IconRenderer name={item.icon} size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-sm leading-tight truncate block font-medium">
                  {item.label}
                </span>
                {item.dropdownDetail && item.dropdownDetail !== item.label && (
                  <span className={`text-[10.5px] truncate block ${
                    isSelected ? 'text-blue-200' : 'text-blue-300/60 group-hover:text-blue-200/80'
                  }`}>
                    {item.dropdownDetail}
                  </span>
                )}
              </div>

              {item.surfaceCode && (
                <span className={`text-[8.5px] font-mono px-1 py-0.2 rounded border hidden sm:inline-block ${
                  isSelected
                    ? 'bg-blue-800 text-blue-100 border-blue-600'
                    : 'bg-blue-950/40 text-blue-300/70 border-blue-900/50'
                }`}>
                  {item.surfaceCode.replace('SH-', '').replace('UI-', '')}
                </span>
              )}

              {item.label === 'Preview' && (
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider ${
                    isSelected
                      ? 'bg-blue-400 text-[#1e3a8a]'
                      : 'bg-blue-800/80 text-blue-200'
                  }`}
                >
                  Start
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer info Widget */}
      <div className="p-4 border-t border-blue-800/50 bg-[#172e6d]/40">
        <div className="bg-blue-800/40 p-3.5 rounded-xl border border-blue-700/30">
          <div className="text-[10px] uppercase tracking-widest text-blue-300 font-bold mb-1.5 flex items-center justify-between">
            <span>Project Status</span>
            <span className="font-mono text-[9px] text-blue-300/80 lowercase">{width}px</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-white">Milestone 1 Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
