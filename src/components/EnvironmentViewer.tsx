import React from "react";
import { Database } from "lucide-react";

interface EnvironmentViewerProps {
  environment?: Record<string, any>;
}

export const EnvironmentViewer: React.FC<EnvironmentViewerProps> = ({ environment }) => {
  if (!environment || Object.keys(environment).length === 0) {
    return (
      <div id="environment-viewer" className="h-full bg-slate-950 p-4 flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
        <Database className="w-8 h-8 mb-2 opacity-40 text-slate-500" />
        <p>No variables declared in memory. Use 'rakh variable = value' to create variables.</p>
      </div>
    );
  }

  return (
    <div id="environment-viewer" className="h-full bg-slate-950 p-4 font-mono text-xs overflow-y-auto">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Interpreter Environment (Memory Symbol Table)</span>
        </div>
        <span className="text-[11px] text-slate-500">Active Variables</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(environment).map(([key, value]) => {
          const valType = typeof value;
          let displayVal = String(value);
          if (valType === "boolean") {
            displayVal = value ? "sahi (true)" : "galat (false)";
          } else if (valType === "string") {
            displayVal = `"${value}"`;
          }

          return (
            <div key={key} className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col justify-between space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="text-amber-400 font-bold text-sm">{key}</span>
                <span className="bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px] uppercase">
                  {valType}
                </span>
              </div>
              <div className="text-emerald-300 font-bold text-sm truncate font-mono">
                {displayVal}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
