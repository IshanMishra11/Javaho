import React from "react";
import { Code2, BookOpen, Layers, User, Terminal, Sparkles } from "lucide-react";
import { SAMPLE_PROGRAMS } from "../data/samplePrograms";

interface NavbarProps {
  currentSampleId: string;
  onSelectSample: (sampleId: string) => void;
  onOpenCheatsheet: () => void;
  onOpenArchitecture: () => void;
  onOpenDeveloper: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSampleId,
  onSelectSample,
  onOpenCheatsheet,
  onOpenArchitecture,
  onOpenDeveloper,
}) => {
  return (
    <header id="ide-navbar" className="bg-[#111114] border-b border-white/5 text-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-amber-600 hover:bg-amber-500 transition flex items-center justify-center text-white font-black text-base shadow-lg shadow-amber-900/20 ring-1 ring-amber-400/30">
          JH
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold tracking-tight text-white uppercase flex items-center gap-2">
              JavaHo <span className="text-[10px] text-amber-500/90 bg-amber-500/10 font-mono px-2 py-0.5 rounded border border-amber-500/20 font-normal lowercase">v1.0.4-alpha</span>
            </h1>
          </div>
          <p className="text-xs text-amber-400/90 font-medium font-sans flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Bhojpuri mein coding
          </p>
        </div>
      </div>

      {/* Controls & Modals */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Sample Select */}
        <div className="flex items-center space-x-2 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs text-slate-300 font-medium hidden md:inline">Sample:</span>
          <select
            value={currentSampleId}
            onChange={(e) => onSelectSample(e.target.value)}
            className="bg-transparent text-xs text-amber-200 font-mono outline-none cursor-pointer pr-1"
          >
            {SAMPLE_PROGRAMS.map((prog) => (
              <option key={prog.id} value={prog.id} className="bg-[#111114] text-slate-200">
                {prog.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cheatsheet Button */}
        <button
          onClick={onOpenCheatsheet}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/5 transition cursor-pointer"
          title="Language Syntax & Keywords Reference"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Cheatsheet</span>
        </button>

        {/* Architecture Button */}
        <button
          onClick={onOpenArchitecture}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/5 transition cursor-pointer"
          title="Java Backend Architecture & Specs"
        >
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Java Spec</span>
        </button>

        {/* About the Developer Button */}
        <button
          onClick={onOpenDeveloper}
          className="flex items-center gap-1.5 bg-amber-600/15 hover:bg-amber-600/25 text-amber-400 hover:text-amber-300 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-amber-500/25 hover:border-amber-500/40 transition cursor-pointer shadow-sm"
          title="About the Developer (Ishan Mishra)"
        >
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>About the Developer</span>
        </button>
      </div>
    </header>
  );
};

