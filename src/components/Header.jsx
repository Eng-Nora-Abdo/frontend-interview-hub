import React from 'react';
import { Terminal, Code2, Sparkles, Layers } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 p-0.5 shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-sky-400" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border-2 border-[#0f172a]"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>بنك أسئلة إنترفيو الـ Frontend</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950/80 text-sky-400 border border-sky-800/60" dir="ltr">
                  v1.0 Pro
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                استعد لإنترفيو الشركات التقنية بأهم الأسئلة المشروحة باللهجة المصرية والإنجليزية التقنية
              </p>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end text-xs text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-slate-300" dir="ltr">React • Vite • Tailwind</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>أسئلة عملية</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
