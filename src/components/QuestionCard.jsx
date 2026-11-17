import React, { useState } from 'react';
import { 
  ChevronDown, 
  Check, 
  Copy, 
  Code2, 
  Atom, 
  Globe, 
  Palette, 
  Sparkles, 
  CheckCircle2, 
  Circle,
  Hash,
  Lightbulb,
  ListChecks
} from 'lucide-react';

const CATEGORY_STYLES = {
  JavaScript: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    icon: Code2,
    badgeBg: 'bg-amber-400/15',
    pillBg: 'bg-amber-950/40 border-amber-800/40 text-amber-300'
  },
  React: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    text: 'text-sky-400',
    icon: Atom,
    badgeBg: 'bg-sky-400/15',
    pillBg: 'bg-sky-950/40 border-sky-800/40 text-sky-300'
  },
  'HTML & CSS': {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    icon: Palette,
    badgeBg: 'bg-indigo-400/15',
    pillBg: 'bg-indigo-950/40 border-indigo-800/40 text-indigo-300'
  },
  'Web & APIs': {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    icon: Globe,
    badgeBg: 'bg-emerald-400/15',
    pillBg: 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
  }
};

export default function QuestionCard({
  question,
  isMastered,
  onToggleMastered,
  isExpanded,
  onToggleExpand,
  onSelectTopic,
  onSelectKeyword
}) {
  const [copied, setCopied] = useState(false);

  const style = CATEGORY_STYLES[question.category] || CATEGORY_STYLES.JavaScript;
  const CategoryIcon = style.icon;

  const handleCopyCode = async (e) => {
    e.stopPropagation();
    if (!question.code) return;
    try {
      await navigator.clipboard.writeText(question.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div 
      className={`group bg-[#1e293b] border rounded-2xl transition-all duration-300 overflow-hidden shadow-lg ${
        isMastered
          ? 'border-emerald-500/40 bg-gradient-to-b from-[#1e293b] to-emerald-950/10'
          : isExpanded
          ? 'border-sky-500/40 shadow-sky-950/20 shadow-xl'
          : 'border-slate-800/90 hover:border-slate-700 hover:shadow-xl'
      }`}
    >
      {/* Clickable Header for Accordion */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggleExpand}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleExpand();
          }
        }}
        className="w-full text-right p-5 sm:p-6 cursor-pointer select-none transition-colors"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Left Metadata: Category, Topic & Question ID */}
          <div className="flex items-center flex-wrap gap-2.5">
            <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-400 border border-slate-800 font-semibold flex items-center gap-1" dir="ltr">
              <Hash className="w-3 h-3 text-sky-400" />
              {question.id}
            </span>

            {/* Category Badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${style.bg} ${style.border} ${style.text}`}>
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{question.category}</span>
            </span>

            {/* Topic Badge */}
            <span 
              onClick={(e) => {
                if (onSelectTopic) {
                  e.stopPropagation();
                  onSelectTopic(question.topic);
                }
              }}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 hover:text-sky-300 text-slate-300 border border-slate-700/60 transition-colors" 
              dir="ltr"
              title="تصفية حسب هذا الموضوع"
            >
              {question.topic}
            </span>

            {isMastered && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Check className="w-3 h-3" />
                تم الإتقان
              </span>
            )}
          </div>

          {/* Right Action: Mastered Button & Chevron */}
          <div className="flex items-center gap-2 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onToggleMastered(question.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isMastered
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-700/70 hover:border-slate-600'
              }`}
              title={isMastered ? 'إلغاء وضع علامة المراجعة' : 'تحديد السؤال كمتقن'}
            >
              {isMastered ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                  <span>تمت المراجعة</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-500" />
                  <span>مراجعة</span>
                </>
              )}
            </button>

            {/* Chevron toggle indicator */}
            <div 
              onClick={onToggleExpand}
              className={`p-2 rounded-xl text-slate-400 group-hover:text-sky-400 bg-slate-900/60 border border-slate-800 transition-all ${
                isExpanded ? 'rotate-180 text-sky-400 bg-sky-950/30 border-sky-900/50' : ''
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Question Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-3.5 leading-snug group-hover:text-white transition-colors">
          {question.question}
        </h3>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div className="border-t border-slate-800/80 bg-slate-950/50 p-5 sm:p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          
          {/* Section 1: "الفكرة ببساطة" (Highlighted box) */}
          {(question.simpleExplanation || question.answer) && (
            <div className="relative overflow-hidden rounded-xl border border-sky-500/25 bg-gradient-to-r from-sky-950/30 via-slate-900/40 to-slate-900/20 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-sky-400">
                <div className="p-1 rounded-md bg-sky-500/20 border border-sky-500/30 text-sky-400">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span>الفكرة ببساطة:</span>
              </div>
              <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed font-normal">
                {question.simpleExplanation || question.answer}
              </p>
            </div>
          )}

          {/* Section 2: "إجابة الإنترفيو" (Clean bullet points) */}
          {question.interviewPoints && question.interviewPoints.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-300">
                <div className="p-1 rounded-md bg-slate-800 border border-slate-700 text-sky-400">
                  <ListChecks className="w-4 h-4" />
                </div>
                <span>إجابة الإنترفيو:</span>
              </div>
              <ul className="space-y-2.5 pr-1">
                {question.interviewPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-slate-200 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0 shadow-sm shadow-sky-400/50"></span>
                    <span className="flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords Section (English LTR Pill Badges) */}
          {question.keywords && question.keywords.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 mb-2">
                الكلمات المفتاحية والمصطلحات التقنية:
              </div>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {question.keywords.map((keyword, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      if (onSelectKeyword) {
                        e.stopPropagation();
                        onSelectKeyword(keyword);
                      }
                    }}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900 border border-slate-700/80 text-sky-300 hover:text-white hover:border-sky-400 transition-colors shadow-sm cursor-pointer"
                    title={`بحث عن "${keyword}"`}
                  >
                    #{keyword}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Code Snippet Section (LTR) */}
          {question.code && (
            <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl" dir="ltr">
              
              {/* Code block header bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 pl-2">
                    {question.category === 'HTML & CSS' ? 'styles.css' : question.category === 'React' ? 'component.jsx' : 'solution.js'}
                  </span>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition-all duration-150"
                  title="نسخ الكود"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-sans">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-sans">نسخ الكود</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Pre container */}
              <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed bg-[#0a0f1d] selection:bg-sky-500/30">
                <pre>
                  <code>{question.code}</code>
                </pre>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}
