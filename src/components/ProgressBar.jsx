import React from 'react';
import { Trophy, CheckCircle2, RotateCcw, Flame, Check } from 'lucide-react';

export default function ProgressBar({ masteredCount, totalCount, onOpenResetModal }) {
  const percentage = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;
  const isAllMastered = totalCount > 0 && masteredCount === totalCount;

  return (
    <div className="bg-[#1e293b] border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl transition-all hover:border-slate-600/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left side: Stats & title */}
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isAllMastered 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20' 
              : 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-lg shadow-sky-500/10'
          }`}>
            {isAllMastered ? (
              <Trophy className="w-6 h-6 animate-bounce" />
            ) : (
              <CheckCircle2 className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-300">
                معدل إتقان الأسئلة:
              </span>
              <span className="font-mono text-base font-bold text-sky-400" dir="ltr">
                {masteredCount} / {totalCount}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 font-mono" dir="ltr">
                {percentage}%
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              {isAllMastered ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  🎉 عظيم جداً! راجعت وأتقنت كل الأسئلة المتاحة، أنت جاهز للإنترفيو!
                </span>
              ) : masteredCount > 0 ? (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-400 inline" />
                  <span>عاش يا بطل! باقي لك <strong className="text-slate-200">{totalCount - masteredCount}</strong> سؤال للإتقان الكامل.</span>
                </>
              ) : (
                <span>ابدأ بمراجعة الأسئلة واضغط على "تمت المراجعة" لمتابعة تقدمك هنا.</span>
              )}
            </p>
          </div>
        </div>

        {/* Right side: Action buttons */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {masteredCount > 0 && (
            <button
              onClick={onOpenResetModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 bg-slate-800/80 hover:bg-rose-950/30 border border-slate-700/80 hover:border-rose-900/50 transition-all duration-200"
              title="إعادة تعيين التقدم بالكامل"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين التقدم</span>
            </button>
          )}
        </div>

      </div>

      {/* Progress Bar Container */}
      <div className="mt-4">
        <div className="w-full bg-slate-900/90 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isAllMastered
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-glow-emerald'
                : 'bg-gradient-to-r from-sky-500 to-cyan-400 shadow-glow-cyan'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
