import React, { useState } from "react";
import { Copy, Check, Terminal, Trash2 } from "lucide-react";

interface OutputConsoleProps {
  output: string;
  onClear: () => void;
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({ output, onClear }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="output-console" className="h-full bg-[#09090B] p-4 flex flex-col font-mono text-xs overflow-hidden">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-slate-400">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Standard Output (dikha)</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 text-slate-300 px-2.5 py-1 rounded border border-white/5 transition cursor-pointer disabled:opacity-40"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy Output"}</span>
          </button>
          <button
            onClick={onClear}
            disabled={!output}
            className="flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 text-slate-400 px-2.5 py-1 rounded border border-white/5 transition cursor-pointer disabled:opacity-40"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed p-3 bg-[#0C0C0E] rounded-lg border border-white/5">
        {output ? (
          <div className="space-y-1">
            {output.split("\n").map((line, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-slate-100">
                <span className="text-slate-600 select-none text-xs w-6 text-right pt-0.5">{idx + 1}</span>
                <span className="text-amber-500 select-none">›</span>
                <span className="whitespace-pre-wrap break-all font-mono text-emerald-400">{line}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 italic py-8">
            <Terminal className="w-8 h-8 mb-2 opacity-40 text-slate-500" />
            <p className="text-xs">No output yet. Click "RUN PROGRAM" or press Ctrl+Enter to execute.</p>
          </div>
        )}
      </div>
    </div>
  );
};
