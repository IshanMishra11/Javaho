import React from "react";
import { ProgramNode, ASTNode } from "../engine/ast";
import { Network } from "lucide-react";

interface ASTViewerProps {
  ast: ProgramNode | null;
}

export const ASTViewer: React.FC<ASTViewerProps> = ({ ast }) => {
  if (!ast) {
    return (
      <div id="ast-viewer" className="h-full bg-slate-950 p-4 flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
        <Network className="w-8 h-8 mb-2 opacity-40 text-slate-500" />
        <p>No Abstract Syntax Tree generated. Run valid BhojpuriLang code to parse AST.</p>
      </div>
    );
  }

  const renderNode = (node: any, depth = 0): React.ReactNode => {
    if (!node) return null;

    if (Array.isArray(node)) {
      return (
        <div className="pl-4 border-l border-slate-800 space-y-1">
          {node.map((item, idx) => (
            <div key={idx}>{renderNode(item, depth + 1)}</div>
          ))}
        </div>
      );
    }

    if (typeof node !== "object") {
      return <span className="text-emerald-300 font-semibold">{String(node)}</span>;
    }

    const { kind, line, ...rest } = node;

    return (
      <div className="my-1.5 font-mono text-xs">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded shadow-sm">
          <span className="text-amber-400 font-bold">{kind}</span>
          {line !== undefined && (
            <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              L{line}
            </span>
          )}
        </div>

        <div className="pl-4 mt-1 border-l border-slate-800/80 space-y-1">
          {Object.entries(rest).map(([key, val]) => (
            <div key={key} className="flex items-start space-x-2 text-slate-300">
              <span className="text-sky-400 font-medium">{key}:</span>
              <div className="flex-1">{renderNode(val, depth + 1)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="ast-viewer" className="h-full bg-slate-950 p-4 font-mono text-xs overflow-y-auto">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
        <div className="flex items-center space-x-2">
          <Network className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-slate-300">Abstract Syntax Tree (AST)</span>
        </div>
        <span className="text-[11px] text-slate-500">Parser Output Structure</span>
      </div>

      <div className="p-3 bg-slate-900/40 rounded border border-slate-800/80 overflow-x-auto">
        {renderNode(ast)}
      </div>
    </div>
  );
};
