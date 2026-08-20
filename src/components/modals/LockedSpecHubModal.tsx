import React, { useState } from 'react';
import {
  adminExecutionSplitAI,
  adminExecutionSplitDev,
  lockedSpecDocuments,
} from '../../data/lockedSpecsData';
import {
  X,
  FileText,
  Cpu,
  UserCheck,
  ShieldAlert,
  GraduationCap,
  Building2,
  Lock,
  Layers,
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Code2,
} from 'lucide-react';

interface LockedSpecHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDocId?: string;
  id?: string;
}

export const LockedSpecHubModal: React.FC<LockedSpecHubModalProps> = ({
  isOpen,
  onClose,
  initialDocId = 'admin-exec-split',
  id = 'locked-spec-hub-modal',
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDocId);
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'clauses' | 'execution-split'>('overview');
  const [splitFilter, setSplitFilter] = useState<'all' | 'ai' | 'dev'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentDoc = lockedSpecDocuments.find((d) => d.id === selectedDocId) || lockedSpecDocuments[0];

  const totalAI = adminExecutionSplitAI.reduce((acc, curr) => acc + curr.percentage, 0);
  const totalDev = adminExecutionSplitDev.reduce((acc, curr) => acc + curr.percentage, 0);

  const filteredAI = adminExecutionSplitAI.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDev = adminExecutionSplitDev.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div className="bg-[#0f172a] text-slate-100 border border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/60 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-600 text-white">
                  100% PRE-AI SPEC LOCKED
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentDoc.version} · {currentDoc.lastUpdated}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {currentDoc.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Selector Pills */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-800 bg-slate-950 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider shrink-0 text-[10px] mr-1">
            Governing Docs:
          </span>
          {lockedSpecDocuments.map((doc) => {
            const isSelected = doc.id === selectedDocId;
            return (
              <button
                key={doc.id}
                onClick={() => {
                  setSelectedDocId(doc.id);
                  if (doc.id === 'admin-exec-split') {
                    setActiveTab('execution-split');
                  } else if (activeTab === 'execution-split') {
                    setActiveTab('overview');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {doc.id === 'admin-exec-split' && <Cpu className="w-3.5 h-3.5 text-blue-300" />}
                {doc.id === 'admin-doc1' && <Lock className="w-3.5 h-3.5 text-amber-300" />}
                {doc.id === 'educator-doc1' && <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />}
                {doc.id === 'institution-doc1' && <Building2 className="w-3.5 h-3.5 text-purple-300" />}
                {doc.id === 'boardex-doc1' && <Layers className="w-3.5 h-3.5 text-cyan-300" />}
                <span>{doc.docNumber}: {doc.id.split('-')[0].toUpperCase()}</span>
                {doc.surfaceCount && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isSelected ? 'bg-blue-800 text-blue-200' : 'bg-slate-800 text-slate-400'}`}>
                    {doc.surfaceCount}s
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 pt-2.5 border-b border-slate-800 bg-slate-900/60 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            {[
              { id: 'overview', label: 'Summary & Core Principles', icon: FileText },
              { id: 'sections', label: `Sections & Surfaces (${currentDoc.sectionsOrModules.length})`, icon: Layers },
              { id: 'clauses', label: `Governing Clauses (${currentDoc.keyClauses.length})`, icon: ShieldAlert },
              { id: 'execution-split', label: 'AI 55% / Dev 45% Execution Split', icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                    isActive
                      ? 'border-blue-500 text-blue-400 bg-slate-800/60'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-block">
            Namespace: <strong className="text-blue-400">{currentDoc.namespace || 'UNIVERSAL'}</strong>
          </span>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5">
                  <span className="text-xs text-slate-400 block mb-1">Authoritative Surfaces</span>
                  <div className="text-2xl font-bold text-blue-400">
                    {currentDoc.surfaceCount} Product Surfaces
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Closed 10-state model applied per registered surface
                  </p>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5">
                  <span className="text-xs text-slate-400 block mb-1">Document Status</span>
                  <div className="text-2xl font-bold text-emerald-400">
                    {currentDoc.version}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Locked Denominator ({currentDoc.lastUpdated})
                  </p>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5">
                  <span className="text-xs text-slate-400 block mb-1">Architecture Standard</span>
                  <div className="text-2xl font-bold text-white">
                    100% PRE-AI Master
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Unified Universal UI Shell v1.1 compliance
                  </p>
                </div>
              </div>

              {/* Core Principle Callout */}
              <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    Core Architectural Principle
                  </h3>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {currentDoc.corePrinciple}
                </p>
              </div>

              {/* Summary */}
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Specification Summary & Boundaries
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentDoc.summary}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SECTIONS & SURFACES */}
          {activeTab === 'sections' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {currentDoc.title} — Sections Register
                  </h3>
                  <p className="text-xs text-slate-400">
                    Display-name pass applied with short labels and dropdown details.
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-blue-300 border border-slate-700">
                  {currentDoc.sectionsOrModules.length} Modules / Sections
                </span>
              </div>

              <div className="space-y-3">
                {currentDoc.sectionsOrModules.map((sec) => (
                  <div
                    key={sec.id}
                    className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-2 hover:border-slate-600 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60 font-mono font-bold text-xs flex items-center justify-center">
                          {sec.id}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {sec.shortLabel}
                          </h4>
                          {sec.dropdownDetail && sec.dropdownDetail !== sec.shortLabel && (
                            <span className="text-[11px] text-blue-300 italic">
                              Dropdown detail: {sec.dropdownDetail}
                            </span>
                          )}
                        </div>
                      </div>

                      {sec.route && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {sec.route}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 pl-8">{sec.description}</p>

                    {sec.surfaces && sec.surfaces.length > 0 && (
                      <div className="pl-8 pt-1 flex flex-wrap gap-1.5">
                        {sec.surfaces.map((surf, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
                          >
                            • {surf}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: KEY CLAUSES */}
          {activeTab === 'clauses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Governing Implementation Clauses
                  </h3>
                  <p className="text-xs text-slate-400">
                    Strict boundary definitions, RLS security gates, and data ownership rules.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {currentDoc.keyClauses.map((clause, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-2 hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-mono font-bold text-xs">
                        {clause.number}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {clause.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pl-1">
                      {clause.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AI 55% / DEVELOPER 45% EXECUTION SPLIT */}
          {activeTab === 'execution-split' && (
            <div className="space-y-6">
              {/* Progress & Split Banner */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-600 text-white">
                      Document 2 v2.1 — Final Locked Execution Split
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      Admin/CEO Dashboard Job Allocation (100% Total Denominator)
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span>
                      <span className="text-blue-300 font-bold">AI Work: {totalAI.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
                      <span className="text-emerald-300 font-bold">Dev Work: {totalDev.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden flex border border-slate-800">
                  <div
                    style={{ width: `${totalAI}%` }}
                    className="bg-blue-600 h-full flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    AI 55.0%
                  </div>
                  <div
                    style={{ width: `${totalDev}%` }}
                    className="bg-emerald-600 h-full flex items-center justify-center text-[10px] font-bold text-white"
                  >
                    DEV 45.0%
                  </div>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setSplitFilter('all')}
                    className={`px-3 py-1 rounded-md font-medium transition-all ${
                      splitFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All Packages (32)
                  </button>
                  <button
                    onClick={() => setSplitFilter('ai')}
                    className={`px-3 py-1 rounded-md font-medium transition-all ${
                      splitFilter === 'ai' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    AI Work (18 · 55%)
                  </button>
                  <button
                    onClick={() => setSplitFilter('dev')}
                    className={`px-3 py-1 rounded-md font-medium transition-all ${
                      splitFilter === 'dev' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Developer Work (14 · 45%)
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search package or schema..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-900 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-64"
                  />
                </div>
              </div>

              {/* Work Items Grid / List */}
              <div className="space-y-4">
                {(splitFilter === 'all' || splitFilter === 'ai') && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 pt-2">
                      <Cpu className="w-4 h-4" />
                      <span>AI Engineering Packages (18 Items · 55.0%)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filteredAI.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-2 hover:border-blue-500/50 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono font-bold text-xs">
                                {item.id}
                              </span>
                              <h4 className="text-xs font-bold text-white">
                                {item.title}
                              </h4>
                            </div>
                            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-600 text-white shrink-0">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>

                          <p className="text-[11.5px] text-slate-300 leading-relaxed">
                            {item.description}
                          </p>

                          {item.deliverables && (
                            <div className="pt-1.5 border-t border-slate-800/80 space-y-1">
                              {item.deliverables.map((deliv, idx) => (
                                <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-slate-400">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{deliv}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(splitFilter === 'all' || splitFilter === 'dev') && (
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <UserCheck className="w-4 h-4" />
                      <span>Developer Integration Packages (14 Items · 45.0%)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filteredDev.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-2 hover:border-emerald-500/50 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold text-xs">
                                {item.id}
                              </span>
                              <h4 className="text-xs font-bold text-white">
                                {item.title}
                              </h4>
                            </div>
                            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-600 text-white shrink-0">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>

                          <p className="text-[11.5px] text-slate-300 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10.5px] text-slate-400">
                            <span>Status: <strong className="text-slate-200">{item.status}</strong></span>
                            <span className="font-mono text-slate-500">Universal Shell v1.1</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="text-slate-400">
            Total Work Denominator: <strong className="text-white">100.0% (AI 55.0% / Dev 45.0%)</strong> · All 5 Specifications Final Locked (Aug 2026).
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all self-end sm:self-auto"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
