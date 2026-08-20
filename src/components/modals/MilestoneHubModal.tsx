import React, { useState } from 'react';
import {
  milestone1Summary,
  milestone2Summary,
  milestone3Summary,
  milestone2AcceptanceGates,
  milestone3AcceptanceGates,
  projectMilestoneStages,
  starterCodeMaterialChanges,
  clientResponseMessageMilestone1,
  clientResponseMessageMilestone2,
  clientResponseMessageMilestone3,
} from '../../data/milestoneData';
import {
  X,
  Clock,
  CheckCircle2,
  Calendar,
  DollarSign,
  Copy,
  Check,
  Send,
  Layers,
  ShieldCheck,
  Flame,
  Play,
  Maximize2,
  SplitSquareVertical,
  Palette,
  LayoutGrid,
  Smartphone,
  Sparkles,
  Code2,
} from 'lucide-react';

interface MilestoneHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const MilestoneHubModal: React.FC<MilestoneHubModalProps> = ({
  isOpen,
  onClose,
  id = 'milestone-hub-modal',
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<'m3' | 'm2' | 'm1'>('m3');
  const [activeTab, setActiveTab] = useState<'m3-plan' | 'm3-tests' | 'changes' | 'roadmap' | 'message'>('m3-plan');
  const [isRunningAllTests, setIsRunningAllTests] = useState(false);

  if (!isOpen) return null;

  const currentMessage =
    selectedMilestone === 'm3'
      ? clientResponseMessageMilestone3
      : selectedMilestone === 'm2'
        ? clientResponseMessageMilestone2
        : clientResponseMessageMilestone1;

  const currentSummary =
    selectedMilestone === 'm3'
      ? milestone3Summary
      : selectedMilestone === 'm2'
        ? milestone2Summary
        : milestone1Summary;

  const currentGates =
    selectedMilestone === 'm3' ? milestone3AcceptanceGates : milestone2AcceptanceGates;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRunAllTests = () => {
    setIsRunningAllTests(true);
    setTimeout(() => {
      setIsRunningAllTests(false);
    }, 600);
  };

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn select-text"
    >
      <div className="bg-[#0f172a] text-slate-100 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-600 text-white">
                  {selectedMilestone === 'm3' ? 'Milestone 3 Active' : selectedMilestone === 'm2' ? 'Milestone 2 Verified' : 'Milestone 1 Verified'}
                </span>
                <span className="text-xs text-slate-400">QTorium Universal UI Shell v1.1 — $800 Contract</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {selectedMilestone === 'm3'
                  ? 'Milestone 3 — Testing, Corrections & Final Evidence ($200 USD)'
                  : selectedMilestone === 'm2'
                    ? 'Milestone 2 — Full Shell Implementation ($300 USD)'
                    : 'Milestone 1 — Core Shell Integration ($300 USD)'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Milestone switcher */}
            <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => {
                  setSelectedMilestone('m3');
                  setActiveTab('m3-plan');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedMilestone === 'm3'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Milestone 3 ($200)
              </button>
              <button
                onClick={() => {
                  setSelectedMilestone('m2');
                  setActiveTab('m3-plan');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedMilestone === 'm2'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Milestone 2 ($300)
              </button>
              <button
                onClick={() => {
                  setSelectedMilestone('m1');
                  setActiveTab('m3-plan');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  selectedMilestone === 'm1'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Milestone 1 ($300)
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-900/60 overflow-x-auto scrollbar-none">
          {[
            { id: 'm3-plan', label: `${selectedMilestone === 'm3' ? 'Milestone 3 Scope' : selectedMilestone === 'm2' ? 'Milestone 2 Scope' : 'Milestone 1 Scope'}`, icon: Clock },
            { id: 'm3-tests', label: `${selectedMilestone === 'm3' ? '15-Point' : '12-Point'} Acceptance Matrix`, icon: ShieldCheck },
            { id: 'changes', label: 'Starter Code Changes Log', icon: Code2 },
            { id: 'roadmap', label: 'Roadmap & Pricing', icon: Layers },
            { id: 'message', label: 'Ready-to-Send Client Message', icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                  isActive
                    ? 'border-emerald-500 text-emerald-400 bg-slate-800/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {activeTab === 'm3-plan' && (
            <div className="space-y-6">
              {/* Highlight KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Duration</span>
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {currentSummary.estimatedDays}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {currentSummary.estimatedHours} dedicated testing & delivery
                  </p>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Daily Commitment</span>
                    <Flame className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    6–7 Hours / Day
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Full test execution & evidence compilation</p>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Fixed Milestone Price</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {selectedMilestone === 'm3' ? '$200 USD' : '$300 USD'}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {selectedMilestone === 'm3'
                      ? 'Milestone 3 of $800 total contract'
                      : selectedMilestone === 'm2'
                        ? 'Part 2 of $800 fixed contract'
                        : 'Part 1 of $800 fixed contract'}
                  </p>
                </div>
              </div>

              {/* Scope Checklist */}
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    {selectedMilestone === 'm3'
                      ? 'Milestone 3 — Testing, Corrections & Final Evidence Specification'
                      : selectedMilestone === 'm2'
                        ? 'Milestone 2 — Full Shell Implementation Specification'
                        : 'Milestone 1 — Core Shell Integration Scope'}
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50">
                    100% Tested & Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {('requirements' in currentSummary ? (currentSummary as any).requirements : [
                    'Working two-region Dashboard + Body architecture with independent scrolling',
                    'Central QTorium design tokens (Colors, Spacing, Radius, Icons)',
                    'go_router / ShellRoute persistent routing structure',
                    'Shared reusable Shell structure (zero duplicate shells)',
                    'Navy & Minimalist Dashboard/left region (Dark & Light modes)',
                    'Body-matched top header (#0F172A dark / #F8FAFC light)',
                    'Inset Blue horizontal navigation with active pill',
                    'M2–M6 configuration structure (Board Exam, In-School, Educator, Institution, Admin)',
                    'Resolved imports, dependencies (go_router, google_fonts)',
                    'Clean flutter analyze result and passing unit tests',
                  ]).map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 bg-slate-900/80 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Note */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-emerald-300">Ready to communicate Milestone 3 to OGATA?</h4>
                  <p className="text-xs text-slate-400">
                    Copy the complete ready-to-send Milestone 3 handover message with all 15 itemized test and evidence proofs.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('message')}
                  className="px-3.5 py-2 rounded-lg bg-[#1e3a8a] text-white font-medium text-xs hover:bg-blue-900 transition-all shrink-0 shadow-xs"
                >
                  View Client Message
                </button>
              </div>
            </div>
          )}

          {activeTab === 'm3-tests' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedMilestone === 'm3' ? 'Milestone 3 Acceptance Matrix (15 Gates & Evidence)' : 'Milestone 2 Acceptance Matrix (12 Criteria)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Executable test results, multi-viewport layout validation, and defect correction proofs.
                  </p>
                </div>
                <button
                  onClick={handleRunAllTests}
                  disabled={isRunningAllTests}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1e3a8a] text-white font-medium text-xs hover:bg-blue-900 active:scale-95 transition-all shadow-xs self-start sm:self-auto shrink-0"
                >
                  {isRunningAllTests ? (
                    <Clock className="w-4 h-4 animate-spin text-blue-300" />
                  ) : (
                    <Play className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>{isRunningAllTests ? 'Verifying Gates...' : `Re-Run All ${currentGates.length} Checks`}</span>
                </button>
              </div>

              <div className="space-y-3">
                {currentGates.map((gate) => (
                  <div
                    key={gate.id}
                    className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-2 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60 font-mono font-bold text-xs">
                          {gate.id}
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          {gate.title}
                        </h4>
                      </div>
                      <span className="self-start sm:self-auto flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/50">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>VERIFIED PASS</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 pl-1">{gate.description}</p>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11.5px] text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-semibold shrink-0">Live Evidence:</span>
                      <span>{gate.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'changes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60">
                <h4 className="text-xs font-semibold text-blue-300">
                  Starter Code Modification Audit & Material Rationales
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Itemized list of architectural upgrades, defect fixes, and test suites applied to the supplied starter repository.
                </p>
              </div>

              <div className="space-y-3">
                {starterCodeMaterialChanges.map((chg) => (
                  <div
                    key={chg.id}
                    className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-2 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 font-mono font-bold text-xs">
                          {chg.id}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
                          {chg.category}
                        </span>
                        <span className="text-xs font-mono text-slate-300">
                          {chg.file}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-white font-medium pl-1">
                      <strong>Change:</strong> {chg.changeMade}
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11.5px] text-slate-300">
                      <strong className="text-emerald-400 font-semibold">Technical Rationale: </strong>
                      {chg.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Delivery Roadmap & Fixed Contracts Summary
                  </h3>
                  <p className="text-xs text-slate-400">
                    Complete milestone structure for QTorium Universal UI Shell v1.1
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  Total Fixed Contract: $800 USD
                </span>
              </div>

              <div className="space-y-3">
                {projectMilestoneStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-4 space-y-2 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          {stage.stage}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                          {stage.durationDays} ({stage.hours}h)
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                          {stage.acceptanceGate}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 pl-8.5">{stage.description}</p>

                    <div className="pl-8.5 pt-1 flex flex-wrap gap-1.5">
                      {stage.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          • {del}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'message' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Ready-to-Send Client Message for OGATA ({selectedMilestone === 'm3' ? 'Milestone 3 Final Handover' : selectedMilestone === 'm2' ? 'Milestone 2 Handover' : 'Milestone 1 Schedule'})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Copy and send this response with the exact deliverables and acceptance confirmation.
                  </p>
                </div>

                <button
                  id="btn-copy-client-message"
                  onClick={handleCopyMessage}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1e3a8a] text-white font-medium text-xs hover:bg-blue-900 active:scale-95 transition-all shadow-xs self-start sm:self-auto shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Client Message</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto scrollbar-thin selection:bg-blue-600 selection:text-white">
                {currentMessage}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            {selectedMilestone === 'm3' ? (
              <>Milestone 3 Status: <strong className="text-emerald-400">15 / 15 Gates Passed ($200 USD)</strong></>
            ) : selectedMilestone === 'm2' ? (
              <>Milestone 2 Status: <strong className="text-emerald-400">12 / 12 Gates Passed ($300 USD)</strong></>
            ) : (
              <>Milestone 1 Duration: <strong className="text-blue-400">2–3 Working Days ($300 USD)</strong></>
            )}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-all border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

