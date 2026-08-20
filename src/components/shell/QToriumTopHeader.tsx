import React, { useState } from 'react';
import {
  ChevronsLeft,
  ChevronsRight,
  Search,
  Moon,
  Sun,
  Bell,
  User,
  SlidersHorizontal,
} from 'lucide-react';

interface QToriumTopHeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  bodyExpanded: boolean;
  onToggleBodyExpansion: () => void;
  onOpenMilestoneHub: () => void;
  onOpenCodeExplorer: () => void;
  id?: string;
}

export const QToriumTopHeader: React.FC<QToriumTopHeaderProps> = ({
  darkMode,
  onToggleTheme,
  bodyExpanded,
  onToggleBodyExpansion,
  onOpenMilestoneHub,
  onOpenCodeExplorer,
  id = 'qtorium-top-header',
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const bgColor = darkMode ? 'bg-[#1e293b]' : 'bg-[#f8fafc]';
  const textColor = darkMode ? 'text-slate-100' : 'text-slate-800';
  const borderBottom = darkMode ? 'border-slate-800' : 'border-slate-200';

  return (
    <header
      id={id}
      className={`h-16 min-h-16 ${bgColor} ${textColor} border-b ${borderBottom} px-6 flex items-center justify-between transition-colors duration-150 relative z-10 select-none`}
    >
      {/* Left: Expand/Restore Toggle Button & Current View indicator */}
      <div className="flex items-center gap-3">
        <button
          id="btn-toggle-body-expansion"
          onClick={onToggleBodyExpansion}
          title={bodyExpanded ? 'Restore dashboard' : 'Expand body to full interface'}
          aria-label={bodyExpanded ? 'Restore dashboard' : 'Expand body to full interface'}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
            darkMode
              ? 'border-slate-700 bg-slate-800/80 text-blue-400 hover:bg-slate-700'
              : 'border-slate-200 bg-white text-blue-600 hover:bg-slate-50 shadow-xs'
          }`}
        >
          {bodyExpanded ? (
            <>
              <ChevronsRight className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Restore Dashboard</span>
            </>
          ) : (
            <>
              <ChevronsLeft className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Expand Body</span>
            </>
          )}
        </button>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <span>/</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">Core Shell Integration</span>
        </div>
      </div>

      {/* Right Controls: Search, Quick Tools, Theme Toggle, Notification, Avatar */}
      <div className="flex items-center gap-3">
        {/* Search Field */}
        <div className="relative w-44 sm:w-60 md:w-68">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            id="qtorium-search-input"
            type="text"
            placeholder="Search commands, modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-8.5 pl-8.5 pr-3 text-xs rounded-full outline-none border transition-all ${
              darkMode
                ? 'bg-slate-900 text-slate-100 placeholder-slate-500 border-slate-700 focus:border-blue-500'
                : 'bg-white text-slate-800 placeholder-slate-400 border-slate-200 focus:border-blue-500 shadow-xs'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Git Branch Pill Badge */}
        <div className={`hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
          darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-600 border-slate-200 shadow-xs'
        }`}>
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span>Git: main</span>
        </div>

        {/* Milestone 1 Hub Quick Action */}
        <button
          id="btn-top-milestone-hub"
          onClick={onOpenMilestoneHub}
          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            darkMode
              ? 'bg-blue-950/40 text-blue-300 border-blue-800/60 hover:bg-blue-900/40'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          }`}
          title="View Milestone 1 Timeline & Days to Complete"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Milestone 1</span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <button
          id="btn-toggle-theme"
          onClick={onToggleTheme}
          title={darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
          aria-label={darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
          className={`p-1.5 rounded-lg transition-all ${
            darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Notifications Icon */}
        <button
          id="btn-notifications"
          aria-label="Notifications"
          className={`p-1.5 rounded-lg relative transition-all ${
            darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        {/* Profile Circle Avatar */}
        <div
          id="user-profile-avatar"
          className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 cursor-pointer hover:scale-105 transition-transform"
          title="Abu Naser Maaz (QTorium Specialist)"
        >
          AN
        </div>
      </div>
    </header>
  );
};
