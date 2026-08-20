import React, { useState } from 'react';
import { QToriumProductConfig } from '../../types/qtorium';
import { QToriumCard } from '../shell/QToriumCard';
import { QToriumPreviewGrid } from '../shell/QToriumPreviewGrid';
import { IconRenderer } from '../ui/IconRenderer';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  BookOpen,
  Cpu,
  Layers,
  ChevronRight,
  Target,
  Sliders,
  ShieldCheck,
  FileText,
  Lock,
  ExternalLink,
} from 'lucide-react';

interface ProductContentPageProps {
  config: QToriumProductConfig;
  currentRoute: string;
  onNavigate: (route: string) => void;
  darkMode: boolean;
  onOpenMilestoneHub: () => void;
  onOpenLockedSpecs?: () => void;
  id?: string;
}

export const ProductContentPage: React.FC<ProductContentPageProps> = ({
  config,
  currentRoute,
  onNavigate,
  darkMode,
  onOpenMilestoneHub,
  onOpenLockedSpecs,
  id = 'qtorium-content-page',
}) => {
  const currentItem = config.navItems.find((i) => i.route === currentRoute) || config.navItems[0];
  const isPreview = currentItem.label === 'Preview';

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'interactive' | 'telemetry' | 'schema' | 'security'>('interactive');

  const textColor = darkMode ? 'text-slate-100' : 'text-slate-900';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500';

  if (isPreview) {
    return (
      <div id={id} className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
        {/* Preview Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                darkMode ? 'bg-blue-950/50 text-blue-300 border-blue-800/60' : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                {config.milestoneId} ARCHITECTURE
              </span>
              <span className={`text-xs ${textMuted}`}>{config.title} Suite</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 font-bold">
                100% PRE-AI SPEC LOCKED
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${textColor}`}>
              {config.title} Preview
            </h1>
            <p className={`text-sm ${textMuted} mt-1`}>
              Choose where you want to go from the locked {config.navItems.length - 1} destination surfaces.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenLockedSpecs && (
              <button
                onClick={onOpenLockedSpecs}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium text-xs border transition-all ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Locked Specs & 55/45 Split</span>
              </button>
            )}

            <button
              onClick={onOpenMilestoneHub}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e3a8a] text-white font-medium text-xs hover:bg-blue-900 transition-all shadow-xs"
            >
              <Clock className="w-4 h-4" />
              <span>Milestone Delivery Hub</span>
            </button>
          </div>
        </div>

        {/* Highlight Banner */}
        <QToriumCard prominence="hero" darkMode={darkMode} padding="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Universal Shell v1.1 Master Specification Active
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-bold ${textColor}`}>
                {config.title} — Integrated Preview Surface
              </h2>
              <p className={`text-sm ${textMuted}`}>
                {config.description} {config.accentNote && <strong className="text-blue-600 dark:text-blue-400 font-semibold">{config.accentNote}</strong>}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className={`text-xs font-medium ${textMuted} block`}>Destinations</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {config.navItems.length - 1} Locked
                </span>
              </div>
            </div>
          </div>
        </QToriumCard>

        {/* Clickable Preview Grid */}
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between">
            <h2 className={`text-base font-semibold ${textColor} flex items-center gap-2`}>
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Available Module Destinations</span>
            </h2>
            <span className={`text-xs font-mono ${textMuted}`}>Preview-First Routing · Display-Name Pass</span>
          </div>

          <QToriumPreviewGrid
            config={config}
            onNavigate={onNavigate}
            darkMode={darkMode}
          />
        </div>
      </div>
    );
  }

  // Non-preview destination page
  return (
    <div id={id} className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Destination Page Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <button
              onClick={() => onNavigate(config.navItems[0].route)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{config.title}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
              darkMode ? 'bg-blue-950/50 text-blue-300 border-blue-800/60' : 'bg-blue-50 text-blue-700 border-blue-100'
            }`}>
              {config.milestoneId}
            </span>
            {currentItem.surfaceCode && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/80 font-bold">
                {currentItem.surfaceCode}
              </span>
            )}
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${textColor} flex items-center gap-3`}>
            <span className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm border border-blue-100 dark:border-blue-900/40">
              <IconRenderer name={currentItem.icon} size={20} />
            </span>
            <span>{currentItem.label}</span>
          </h1>
          {currentItem.dropdownDetail && currentItem.dropdownDetail !== currentItem.label && (
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
              Dropdown Detail: {currentItem.dropdownDetail}
            </p>
          )}
          <p className={`text-sm ${textMuted} mt-1`}>
            {currentItem.description || 'Universal surface aligned to QTorium v1.1 Master Specification.'}
          </p>
        </div>

        {/* Breadcrumb / Back to Preview */}
        <div className="flex items-center gap-2">
          {onOpenLockedSpecs && (
            <button
              onClick={onOpenLockedSpecs}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                darkMode
                  ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Spec Details</span>
            </button>
          )}

          <button
            onClick={() => onNavigate(config.navItems[0].route)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
              darkMode
                ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Return to Preview Grid</span>
          </button>
        </div>
      </div>

      {/* Prominence: Hero Card */}
      <QToriumCard prominence="hero" darkMode={darkMode} padding="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-h-[130px]">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-600 text-white">
                Hero Prominence Surface
              </span>
              <span className={`text-xs ${textMuted}`}>Route: <code className="font-mono text-blue-600 dark:text-blue-400">{currentItem.route}</code></span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                10-State Standard Model
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold ${textColor}`}>
              {currentItem.label} Interactive Workspace
            </h2>
            <p className={`text-sm ${textMuted} max-w-2xl`}>
              This surface integrates universal telemetry, persistent routing state, and isolated business logic containerized within the Universal Shell v1.1.
            </p>
          </div>

          {/* Radial Progress Telemetry */}
          <div className={`flex items-center gap-4 shrink-0 px-5 py-4 rounded-xl border ${
            darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="relative w-18 h-18 flex items-center justify-center">
              <svg className="w-18 h-18 transform -rotate-90">
                <circle
                  cx="36"
                  cy="36"
                  r="28"
                  stroke={darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
                  strokeWidth="7"
                  fill="transparent"
                />
                <circle
                  cx="36"
                  cy="36"
                  r="28"
                  stroke="#2563eb"
                  strokeWidth="7"
                  fill="transparent"
                  strokeDasharray="175.9"
                  strokeDashoffset="49.2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-sm font-bold ${textColor}`}>100%</span>
              </div>
            </div>
            <div className="text-left">
              <span className={`text-[11px] font-medium ${textMuted} block`}>Spec State</span>
              <span className="text-xs font-bold text-emerald-500 block">Final Locked</span>
              <span className={`text-[10px] ${textMuted}`}>Universal State</span>
            </div>
          </div>
        </div>
      </QToriumCard>

      {/* Content Surfaces Grid & Utility Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-base font-semibold ${textColor} flex items-center gap-2`}>
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Modular Content Surfaces (Standard & Utility Prominences)</span>
          </h2>
          <span className={`text-xs ${textMuted}`}>Design Tokens: Clean Minimalism</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Surface 1 - Standard Prominence */}
          <QToriumCard prominence="standard" darkMode={darkMode} padding="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>
                    Surface 01 · Standard
                  </span>
                </div>
                <h3 className={`text-base font-bold ${textColor}`}>
                  Active Module Runtime: {config.title}
                </h3>
                <p className={`text-xs ${textMuted} leading-relaxed`}>
                  Independent data layer isolated from adjacent shells. Preserves persistent route state during horizontal menu interaction.
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/40">
                <Target className="w-4 h-4" />
              </div>
            </div>
          </QToriumCard>

          {/* Surface 2 - Standard Prominence */}
          <QToriumCard prominence="standard" darkMode={darkMode} padding="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>
                    Surface 02 · Standard
                  </span>
                </div>
                <h3 className={`text-base font-bold ${textColor}`}>
                  Two-Region Layout Sync
                </h3>
                <p className={`text-xs ${textMuted} leading-relaxed`}>
                  Draggable divider active with responsive drag clamping between 230px and 390px.
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/40">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </QToriumCard>
        </div>

        {/* Surfaces 3 to 7 - Utility Prominence Cards */}
        <div className="space-y-3 pt-1">
          {[
            {
              title: 'Reusable Content Surface 3 · Token Binding',
              desc: 'Tokens bound to QToriumColors.primaryNavy, QToriumRadius.md, and QToriumSpacing.lg',
            },
            {
              title: 'Reusable Content Surface 4 · Responsive Breakpoints',
              desc: '4 cols (>=1500px), 3 cols (>=1050px), 2 cols (>=700px), 1 col (<700px)',
            },
            {
              title: 'Reusable Content Surface 5 · 10-State Standard Coverage',
              desc: 'Default, Loading, Empty, Error, Success, Disabled, Unauthorized, Pending, Confirmation, Destructive-Action',
            },
            {
              title: 'Reusable Content Surface 6 · Shared GoRouter ShellRoute',
              desc: 'Single shell instance wraps all child routes with zero recreation',
            },
            {
              title: 'Reusable Content Surface 7 · Data Ownership Boundary',
              desc: 'Student-owned personal data is never exportable or deletable by admin/institution roles',
            },
          ].map((item, idx) => (
            <QToriumCard
              key={idx}
              prominence="utility"
              darkMode={darkMode}
              padding="px-5 py-4"
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 text-xs font-semibold flex items-center justify-center border border-blue-100 dark:border-blue-900/40">
                  {idx + 3}
                </span>
                <div>
                  <h4 className={`text-xs sm:text-sm font-semibold ${textColor}`}>
                    {item.title}
                  </h4>
                  <p className={`text-xs ${textMuted} mt-0.5`}>{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-md border ${
                  darkMode ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  Verified
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </QToriumCard>
          ))}
        </div>
      </div>
    </div>
  );
};
