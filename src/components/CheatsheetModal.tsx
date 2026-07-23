import React from "react";
import { X, BookOpen, Copy, Check } from "lucide-react";

interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertCode: (snippet: string) => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({
  isOpen,
  onClose,
  onInsertCode,
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const cheatItems = [
    {
      title: "Variable Declaration (rakh)",
      desc: "Creates a new variable in memory",
      keyword: "rakh",
      snippet: `rakh naam = "Ishan"\nrakh umar = 21\nrakh sthiti = sahi`,
    },
    {
      title: "Print Output (dikha)",
      desc: "Prints a string, number, boolean, or variable to output console",
      keyword: "dikha",
      snippet: `dikha "Ram Ram!"\ndikha naam`,
    },
    {
      title: "If-Else Condition (agar / nahin / khatam)",
      desc: "Conditional branching logic closed with khatam",
      keyword: "agar ... nahin ... khatam",
      snippet: `agar umar >= 18\n    dikha "Adult ba"\nnahin\n    dikha "Minor ba"\nkhatam`,
    },
    {
      title: "While Loop (jabtak / khatam)",
      desc: "Repeats code block while condition evaluates to true",
      keyword: "jabtak ... khatam",
      snippet: `rakh i = 1\n\njabtak i <= 5\n    dikha i\n    i = i + 1\nkhatam`,
    },
    {
      title: "Booleans (sahi / galat)",
      desc: "True is 'sahi', False is 'galat'",
      keyword: "sahi / galat",
      snippet: `rakh pass = sahi\nrakh fail = galat`,
    },
    {
      title: "Single-line Comments (#)",
      desc: "Lines starting with # are ignored by Lexer",
      keyword: "#",
      snippet: `# Yo BhojpuriLang me tippani ba\nrakh x = 100`,
    },
  ];

  const handleCopySnippet = (snippet: string, idx: number) => {
    onInsertCode(snippet);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div id="cheatsheet-modal" className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111114]/95 backdrop-blur-xl border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#09090B] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">JavaHo / BhojpuriLang Syntax Guide</h2>
              <p className="text-xs text-slate-400">Quick syntax reference and keyword guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cheatItems.map((item, idx) => (
              <div key={idx} className="bg-[#09090B]/80 p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-200 text-sm">{item.title}</h3>
                    <span className="bg-amber-500/10 text-amber-400 font-mono text-[10px] px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                      {item.keyword}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{item.desc}</p>
                </div>

                <div className="relative mt-2">
                  <pre className="bg-[#0C0C0E] p-3 rounded-lg text-amber-300 font-mono text-xs overflow-x-auto border border-white/5">
                    {item.snippet}
                  </pre>
                  <button
                    onClick={() => handleCopySnippet(item.snippet, idx)}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-slate-200 p-1.5 rounded-md border border-white/10 transition cursor-pointer flex items-center gap-1 text-[10px]"
                    title="Insert into editor"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedIndex === idx ? "Inserted!" : "Insert"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Operators Summary Table */}
          <div className="bg-[#09090B]/80 p-4 rounded-xl border border-white/5 mt-4">
            <h3 className="font-bold text-slate-200 text-sm mb-2">Supported Operators</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-slate-300">
              <div className="bg-[#0C0C0E] p-2 rounded-lg border border-white/5">
                <span className="text-amber-400 font-bold">+ - * / %</span>
                <p className="text-[10px] text-slate-400 font-sans">Arithmetic</p>
              </div>
              <div className="bg-[#0C0C0E] p-2 rounded-lg border border-white/5">
                <span className="text-amber-400 font-bold">&lt; &gt; &lt;= &gt;=</span>
                <p className="text-[10px] text-slate-400 font-sans">Relational</p>
              </div>
              <div className="bg-[#0C0C0E] p-2 rounded-lg border border-white/5">
                <span className="text-amber-400 font-bold">== !=</span>
                <p className="text-[10px] text-slate-400 font-sans">Equality</p>
              </div>
              <div className="bg-[#0C0C0E] p-2 rounded-lg border border-white/5">
                <span className="text-amber-400 font-bold">=</span>
                <p className="text-[10px] text-slate-400 font-sans">Assignment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#09090B] border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-1.5 rounded-lg transition cursor-pointer text-xs"
          >
            Close Cheatsheet
          </button>
        </div>
      </div>
    </div>
  );
};
