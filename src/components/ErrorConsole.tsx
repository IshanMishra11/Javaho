import React from "react";
import { AlertOctagon, Lightbulb, HelpCircle } from "lucide-react";

interface ErrorConsoleProps {
  errors: string[];
}

export const ErrorConsole: React.FC<ErrorConsoleProps> = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return (
      <div id="error-console" className="h-full bg-slate-950 p-4 flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-2">
          <span className="text-emerald-400 font-bold">✓</span>
        </div>
        <p className="text-slate-400 font-medium">No errors detected</p>
        <p className="text-slate-600 text-[11px] mt-1">Lexer, Parser, and Interpreter executed cleanly.</p>
      </div>
    );
  }

  // Parse line number from error message if available
  const extractLineNumber = (msg: string): number | null => {
    const match = msg.match(/line (\d+)/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const getTipForError = (msg: string): string => {
    if (msg.includes("Missing 'khatam'")) {
      return "Tip: Every 'agar' (if) and 'jabtak' (while) block in BhojpuriLang must end with 'khatam'.";
    }
    if (msg.includes("Unknown variable")) {
      return "Tip: Declare variables first using 'rakh <variable_name> = <value>'.";
    }
    if (msg.includes("Expected '='")) {
      return "Tip: Variable declaration syntax is 'rakh name = value'.";
    }
    if (msg.includes("Division by zero")) {
      return "Tip: Ensure denominator is non-zero before dividing.";
    }
    if (msg.includes("Unterminated string")) {
      return 'Tip: Make sure string literals have closing double quote "';
    }
    return "Tip: Check BhojpuriLang syntax reference in the Cheatsheet above.";
  };

  return (
    <div id="error-console" className="h-full bg-slate-950 p-4 font-mono text-xs overflow-y-auto space-y-3">
      <div className="flex items-center space-x-2 text-rose-400 font-semibold border-b border-rose-950/80 pb-2">
        <AlertOctagon className="w-4 h-4" />
        <span>Execution Error Console ({errors.length})</span>
      </div>

      {errors.map((err, idx) => {
        const lineNum = extractLineNumber(err);
        const tip = getTipForError(err);

        return (
          <div key={idx} className="bg-rose-950/30 border border-rose-900/60 rounded-lg p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="bg-rose-900 text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded">
                  ERROR
                </span>
                {lineNum && (
                  <span className="bg-slate-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    Line {lineNum}
                  </span>
                )}
              </div>
            </div>

            <p className="text-rose-200 font-mono text-xs leading-relaxed font-semibold">
              {err}
            </p>

            <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 flex items-start space-x-2 text-amber-200 text-[11px]">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
