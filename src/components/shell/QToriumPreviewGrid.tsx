import React from 'react';
import { QToriumProductConfig, QToriumNavItem } from '../../types/qtorium';
import { QToriumCard } from './QToriumCard';
import { IconRenderer } from '../ui/IconRenderer';
import { ChevronRight } from 'lucide-react';

interface QToriumPreviewGridProps {
  config: QToriumProductConfig;
  onNavigate: (route: string) => void;
  darkMode: boolean;
  id?: string;
}

export const QToriumPreviewGrid: React.FC<QToriumPreviewGridProps> = ({
  config,
  onNavigate,
  darkMode,
  id = 'qtorium-preview-grid',
}) => {
  const destinations = config.navItems.filter((e: QToriumNavItem) => e.label !== 'Preview');

  return (
    <div id={id} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {destinations.map((item: QToriumNavItem) => {
          return (
            <QToriumCard
              key={item.route}
              id={`preview-card-${item.id}`}
              prominence="preview"
              darkMode={darkMode}
              onTap={() => onNavigate(item.route)}
              padding="p-5"
              className="flex items-center gap-4 group cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 min-w-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-105 border border-blue-100 dark:border-blue-900/40 shrink-0">
                <IconRenderer name={item.icon} size={20} className="text-blue-600 dark:text-blue-400" />
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5 mb-0.5">
                  <h3
                    className={`text-sm font-semibold leading-tight truncate ${
                      darkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {item.label}
                  </h3>
                  {item.surfaceCode && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shrink-0">
                      {item.surfaceCode.replace('SH-', '')}
                    </span>
                  )}
                </div>

                {item.dropdownDetail && item.dropdownDetail !== item.label && (
                  <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 truncate mb-1">
                    {item.dropdownDetail}
                  </p>
                )}

                {item.description && (
                  <p
                    className={`text-xs leading-snug line-clamp-2 ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {item.description}
                  </p>
                )}
              </div>

              {/* Chevron indicator */}
              <ChevronRight
                size={16}
                className={`shrink-0 transition-transform group-hover:translate-x-1 ${
                  darkMode ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-400 group-hover:text-blue-600'
                }`}
              />
            </QToriumCard>
          );
        })}
      </div>
    </div>
  );
};
