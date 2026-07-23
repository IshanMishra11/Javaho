import React from "react";
import { Play, RotateCcw, Trash2, Wand2, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

interface ToolbarProps {
  onRun: () => void;
  onFormat: () => void;
  onClear: () => void;
  onReset: () => void;
  isRunning: boolean;
  executionTimeMs?: number;
  isSuccess?: boolean | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onRun,
  onFormat,
  onClear,
  onReset,
  isRunning,
  executionTimeMs,
  isSuccess,
}) => {
  return (
    <div id="ide-toolbar" className="bg-[#0C0C0E] border-b border-white/5 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Run Button */}
        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-lg shadow-amber-900/20 active:scale-95 transition disabled:opacity-50 cursor-pointer border border-amber-400/20"
        >
          {isRunning ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Play className="w-3.5 h-3.5 fill-white" />
          )}
          <span>{isRunning ? "Running..." : "RUN PROGRAM"}</span>
          <span className="hidden sm:inline-block bg-black/30 text-amber-200 text-[10px] px-1.5 py-0.5 rounded font-mono ml-1">
            Ctrl+↵
          </span>
        </button>

        {/* Format Code */}
        <button
          onClick={onFormat}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs px-3 py-2 rounded-lg border border-white/5 transition cursor-pointer"
          title="Format BhojpuriLang Indentation"
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Format</span>
        </button>

        {/* Clear Code */}
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs px-3 py-2 rounded-lg border border-white/5 transition cursor-pointer"
          title="Clear Editor"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Clear</span>
        </button>

        {/* Reset Code */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs px-3 py-2 rounded-lg border border-white/5 transition cursor-pointer"
          title="Reset to Original Sample"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Reset</span>
        </button>
      </div>

      {/* Execution Metrics Badge */}
      {isSuccess !== null && isSuccess !== undefined && (
        <div className="flex items-center space-x-3 text-xs font-mono">
          {isSuccess ? (
            <div className="flex items-center text-emerald-400 gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Success</span>
            </div>
          ) : (
            <div className="flex items-center text-rose-400 gap-1.5 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Error</span>
            </div>
          )}

          {executionTimeMs !== undefined && (
            <div className="flex items-center text-slate-400 gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{executionTimeMs} ms</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

