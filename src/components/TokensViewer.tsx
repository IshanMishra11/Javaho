import React from "react";
import { Token, TokenType } from "../engine/tokens";
import { List } from "lucide-react";

interface TokensViewerProps {
  tokens: Token[];
}

export const TokensViewer: React.FC<TokensViewerProps> = ({ tokens }) => {
  if (!tokens || tokens.length === 0) {
    return (
      <div id="tokens-viewer" className="h-full bg-slate-950 p-4 flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
        <List className="w-8 h-8 mb-2 opacity-40 text-slate-500" />
        <p>No tokens generated yet. Run code to see lexical token stream.</p>
      </div>
    );
  }

  const getTokenColor = (type: TokenType) => {
    switch (type) {
      case TokenType.RAKH:
      case TokenType.DIKHA:
      case TokenType.AGAR:
      case TokenType.NAHIN:
      case TokenType.JABTAK:
      case TokenType.KHATAM:
        return "bg-amber-950/80 text-amber-300 border-amber-800/60";
      case TokenType.SAHI:
      case TokenType.GALAT:
        return "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
      case TokenType.STRING:
        return "bg-teal-950/80 text-teal-300 border-teal-800/60";
      case TokenType.INTEGER:
        return "bg-sky-950/80 text-sky-300 border-sky-800/60";
      case TokenType.IDENTIFIER:
        return "bg-slate-900 text-slate-200 border-slate-700";
      default:
        return "bg-purple-950/80 text-purple-300 border-purple-800/60";
    }
  };

  return (
    <div id="tokens-viewer" className="h-full bg-slate-950 p-4 font-mono text-xs overflow-y-auto">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
        <div className="flex items-center space-x-2">
          <List className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-300">Lexer Tokens Stream ({tokens.length})</span>
        </div>
        <span className="text-[11px] text-slate-500">Lexical Analysis Step</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {tokens.map((tok, idx) => (
          <div
            key={idx}
            className={`p-2 rounded border flex flex-col justify-between font-mono ${getTokenColor(tok.type)}`}
          >
            <div className="flex items-center justify-between text-[10px] opacity-75 font-bold uppercase tracking-wider mb-1">
              <span>{tok.type}</span>
              <span className="bg-black/30 px-1 rounded text-[9px]">L{tok.line}</span>
            </div>
            <div className="text-sm font-bold truncate">
              {tok.type === TokenType.EOF ? "<EOF>" : `"${tok.value}"`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
