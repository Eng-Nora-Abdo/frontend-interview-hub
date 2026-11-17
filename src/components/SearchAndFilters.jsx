import React from 'react';
import { 
  Search, 
  X, 
  Layers, 
  Atom, 
  Code2, 
  Globe, 
  Palette, 
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Tag
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'الكل', icon: Layers, color: 'text-sky-400' },
  { id: 'JavaScript', label: 'JavaScript', icon: Code2, color: 'text-amber-400' },
  { id: 'React', label: 'React', icon: Atom, color: 'text-cyan-400' },
  { id: 'HTML & CSS', label: 'HTML & CSS', icon: Palette, color: 'text-indigo-400' },
  { id: 'Web & APIs', label: 'Web & APIs', icon: Globe, color: 'text-emerald-400' },
];

export default function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTopic,
  setSelectedTopic,
  availableTopics,
  unmasteredOnly,
  setUnmasteredOnly,
  categoryCounts,
  onExpandAll,
  onCollapseAll,
  areAllExpanded,
  totalFilteredCount
}) {
  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-sky-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث في نصوص الأسئلة، الشرح، أو الكلمات المفتاحية بالإنجليزية (مثلاً: Closures, Event Loop, DOM)..."
          className="w-full pl-12 pr-12 py-3.5 bg-[#1e293b] border border-slate-700/80 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm sm:text-base shadow-lg transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
            title="مسح البحث"
          >
            <div className="p-1 rounded-full bg-slate-800 hover:bg-slate-700">
              <X className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>

      {/* Filter Tabs & Quick Controls Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedTopic('all');
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-400/80 text-sky-300 shadow-md shadow-sky-500/10'
                    : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : cat.color}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-sky-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                  dir="ltr"
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Controls: Unmastered Only Toggle & Expand/Collapse */}
        <div className="flex items-center gap-2.5 justify-between sm:justify-end pt-1 sm:pt-0">
          
          {/* Unmastered Only Toggle */}
          <button
            onClick={() => setUnmasteredOnly(!unmasteredOnly)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
              unmasteredOnly
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-sm'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
              unmasteredOnly 
                ? 'border-amber-400 bg-amber-400 text-slate-950' 
                : 'border-slate-600 bg-transparent'
            }`}>
              {unmasteredOnly && <CheckCircle2 className="w-3.5 h-3.5 fill-amber-400 text-slate-950" />}
            </div>
            <span>الأسئلة المتبقية فقط</span>
          </button>

          {/* Expand / Collapse Toggle */}
          <button
            onClick={areAllExpanded ? onCollapseAll : onExpandAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title={areAllExpanded ? 'طي كل الإجابات' : 'توسيع كل الإجابات'}
          >
            {areAllExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 text-sky-400" />
                <span>طي الكل</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-sky-400" />
                <span>توسيع الكل</span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* Topics Quick Filter Bar (Scrollable horizontally) */}
      {availableTopics && availableTopics.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
          <span className="text-xs text-slate-400 flex items-center gap-1 pl-1 shrink-0 font-medium">
            <Tag className="w-3.5 h-3.5 text-sky-400" />
            <span>المواضيع:</span>
          </span>
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedTopic === 'all'
                ? 'bg-sky-400/20 text-sky-300 border-sky-400/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-300'
            }`}
          >
            كل المواضيع
          </button>
          {availableTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(selectedTopic === topic ? 'all' : topic)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border font-mono ${
                selectedTopic === topic
                  ? 'bg-sky-400/20 text-sky-300 border-sky-400/40'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-300'
              }`}
              dir="ltr"
            >
              {topic}
            </button>
          ))}
        </div>
      )}

      {/* Results summary indicator if filtered */}
      {(searchQuery || selectedCategory !== 'all' || selectedTopic !== 'all' || unmasteredOnly) && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
          <div>
            تم العثور على <strong className="text-sky-400 font-mono font-bold" dir="ltr">{totalFilteredCount}</strong> سؤال يطابق اختياراتك
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTopic('all');
              setUnmasteredOnly(false);
            }}
            className="text-sky-400 hover:text-sky-300 underline underline-offset-4"
          >
            إلغاء جميع الفلاتر
          </button>
        </div>
      )}
    </div>
  );
}
