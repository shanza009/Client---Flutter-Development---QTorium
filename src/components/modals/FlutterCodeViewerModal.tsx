import React, { useState } from 'react';
import { flutterSourceFiles } from '../../data/flutterSourceCode';
import { DartSourceFile } from '../../types/qtorium';
import {
  X,
  Code2,
  Copy,
  Check,
  FileCode,
  Folder,
  Download,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

interface FlutterCodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const FlutterCodeViewerModal: React.FC<FlutterCodeViewerModalProps> = ({
  isOpen,
  onClose,
  id = 'flutter-code-viewer-modal',
}) => {
  const [selectedFile, setSelectedFile] = useState<DartSourceFile>(flutterSourceFiles[0]);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredFiles = flutterSourceFiles.filter((f) =>
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn select-text"
    >
      <div className="bg-[#0f172a] text-slate-100 border border-slate-700/80 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/60 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-600 text-white">
                  Flutter Web v1.1
                </span>
                <span className="text-xs text-slate-400">Dart 3.2+ · Flutter 3.16+ · Material 3</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                QTorium Universal UI Shell — Flutter Source Code Package
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

        {/* Workspace Body */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Left File Tree Sidebar */}
          <div className="w-full md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
            <div className="p-3 border-b border-slate-800">
              <input
                type="text"
                placeholder="Filter Dart files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 px-3 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Project Files ({filteredFiles.length})
              </div>
              {filteredFiles.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <FileCode
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-white' : 'text-blue-400'
                      }`}
                    />
                    <div className="truncate flex-1">
                      <span className="block truncate font-mono text-[11px]">{file.name}</span>
                      <span
                        className={`block text-[9px] truncate ${
                          isSelected ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {file.path}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Flutter Analyze Status in Sidebar */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>flutter analyze: 0 issues</span>
              </div>
              <p className="text-[10px] text-slate-400">Targeting Flutter Web · Zero duplicate shells</p>
            </div>
          </div>

          {/* Right Code Content View */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#020617] overflow-hidden">
            {/* File Path & Action Bar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono text-xs text-white truncate font-semibold">
                  {selectedFile.path}
                </span>
                <span className="hidden sm:inline text-[10px] text-slate-400 truncate">
                  — {selectedFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadFile}
                  title="Download this file"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#1e3a8a] text-white font-medium text-xs hover:bg-blue-900 active:scale-95 transition-all shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Dart Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200 bg-[#020617] scrollbar-thin">
              <pre className="leading-relaxed">
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            Ready for integration into QTorium Flutter repository
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
