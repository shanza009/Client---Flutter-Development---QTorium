import React from 'react';
import { QToriumProductConfig, QToriumNavItem } from '../../types/qtorium';

interface QToriumInsetTopNavProps {
  config: QToriumProductConfig;
  currentRoute: string;
  onNavigate: (route: string) => void;
  id?: string;
}

export const QToriumInsetTopNav: React.FC<QToriumInsetTopNavProps> = ({
  config,
  currentRoute,
  onNavigate,
  id = 'qtorium-inset-top-nav',
}) => {
  return (
    <div className="px-6 pt-3 pb-1 shrink-0 select-none">
      <div
        id={id}
        className="bg-[#1e3a8a] rounded-xl flex items-center p-1.5 shadow-sm overflow-x-auto scrollbar-none"
      >
        <div className="flex items-center gap-1 min-w-max">
          {config.navItems.map((item: QToriumNavItem) => {
            const isSelected = currentRoute === item.route;

            return (
              <button
                key={item.route}
                id={`top-nav-item-${item.id}`}
                onClick={() => onNavigate(item.route)}
                className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-[13px] whitespace-nowrap transition-all duration-150 ${
                  isSelected
                    ? 'bg-white text-[#1e3a8a] font-semibold shadow-sm'
                    : 'text-blue-100/80 hover:text-white hover:bg-blue-800/40 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
