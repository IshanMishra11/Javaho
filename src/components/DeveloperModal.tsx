import React from "react";
import { User, Award, Code2, GraduationCap, Sparkles, X, Heart, Terminal } from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="developer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="developer-modal-card"
        className="relative w-full max-w-xl bg-[#111114]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-amber-950/20 text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Accents */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition border border-transparent hover:border-white/10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
              Developer Profile
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">About the Developer</h2>
          </div>
        </div>

        {/* Developer Info Card */}
        <div className="bg-[#09090B]/80 border border-white/5 rounded-xl p-5 mb-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-900/30 ring-2 ring-amber-500/30">
                IM
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Ishan Mishra
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h3>
                <p className="text-xs text-amber-400/90 font-medium flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Electronics & Communication Engineering
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20 shrink-0">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>GDG On Campus IEM Lead</span>
            </div>
          </div>

          {/* Bio Text */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans text-justify">
            Ishan Mishra is a passionate Electronics and Communication Engineering undergraduate with a strong interest in software development, Java, Data Structures & Algorithms, and full-stack web development. He has built multiple real-world projects and actively contributes to the developer community as the GDG On Campus IEM Lead. With strong problem-solving skills, leadership experience, and a continuous learning mindset, he is eager to develop impactful software solutions and grow as a software engineer.
          </p>

          {/* Skill Pills */}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-[11px] font-mono border border-white/5 flex items-center gap-1">
              <Code2 className="w-3 h-3 text-amber-400" /> Java & DSA
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-[11px] font-mono border border-white/5 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" /> Full-Stack Web
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-[11px] font-mono border border-white/5 flex items-center gap-1">
              <Award className="w-3 h-3 text-sky-400" /> Community Leadership
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> for JavaHo
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-lg shadow-amber-900/20 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
