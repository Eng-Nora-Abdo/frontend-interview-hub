import React, { useState, useEffect, useMemo } from 'react';
import initialQuestions from './data/questions.json';
import Header from './components/Header.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import SearchAndFilters from './components/SearchAndFilters.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import ResetModal from './components/ResetModal.jsx';
import { 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Code2, 
  GraduationCap, 
  RefreshCw,
  FolderOpen
} from 'lucide-react';

const STORAGE_KEY = 'frontend_prep_mastered_ids_v1';

export default function App() {
  const [questions] = useState(initialQuestions);

  // Initialize mastered IDs from localStorage
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (err) {
      console.error('Error loading mastered state from localStorage:', err);
    }
    return [];
  });

  // Save to localStorage whenever masteredIds changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(masteredIds));
    } catch (err) {
      console.error('Error saving mastered state to localStorage:', err);
    }
  }, [masteredIds]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [unmasteredOnly, setUnmasteredOnly] = useState(false);

  // Expanded Accordion State (set of question IDs)
  // Initially expand the first question to immediately show what an answered card looks like
  const [expandedIds, setExpandedIds] = useState(() => [1]);

  // Reset Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Toggle single question mastered status
  const handleToggleMastered = (id) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle single question accordion expand/collapse
  const handleToggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Expand All / Collapse All
  const handleExpandAll = () => {
    const allFilteredIds = filteredQuestions.map((q) => q.id);
    setExpandedIds(allFilteredIds);
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
  };

  // Reset all mastered progress
  const handleConfirmReset = () => {
    setMasteredIds([]);
  };

  // Compute category counts for badges
  const categoryCounts = useMemo(() => {
    const counts = { all: questions.length };
    questions.forEach((q) => {
      counts[q.category] = (counts[q.category] || 0) + 1;
    });
    return counts;
  }, [questions]);

  // Available unique topics
  const availableTopics = useMemo(() => {
    const topicSet = new Set();
    questions.forEach((q) => {
      if (selectedCategory === 'all' || q.category === selectedCategory) {
        if (q.topic) topicSet.add(q.topic);
      }
    });
    return Array.from(topicSet);
  }, [questions, selectedCategory]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return questions.filter((q) => {
      // Category filter
      if (selectedCategory !== 'all' && q.category !== selectedCategory) {
        return false;
      }

      // Topic filter
      if (selectedTopic !== 'all' && q.topic !== selectedTopic) {
        return false;
      }

      // Unmastered only filter
      if (unmasteredOnly && masteredIds.includes(q.id)) {
        return false;
      }

      // Search query in question, simpleExplanation, interviewPoints, topic, keywords, and code
      if (query) {
        const matchQuestion = q.question.toLowerCase().includes(query);
        const matchSimple = q.simpleExplanation ? q.simpleExplanation.toLowerCase().includes(query) : false;
        const matchPoints = q.interviewPoints ? q.interviewPoints.some((pt) => pt.toLowerCase().includes(query)) : false;
        const matchAnswer = q.answer ? q.answer.toLowerCase().includes(query) : false;
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchKeywords = q.keywords?.some((kw) =>
          kw.toLowerCase().includes(query)
        );
        const matchCode = q.code ? q.code.toLowerCase().includes(query) : false;

        return matchQuestion || matchSimple || matchPoints || matchAnswer || matchTopic || matchKeywords || matchCode;
      }

      return true;
    });
  }, [questions, selectedCategory, selectedTopic, unmasteredOnly, searchQuery, masteredIds]);

  const areAllExpanded =
    filteredQuestions.length > 0 &&
    filteredQuestions.every((q) => expandedIds.includes(q.id));

  // Quick filter by topic or keyword
  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSelectKeyword = (keyword) => {
    setSearchQuery(keyword);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        
        {/* Progress Tracker Card */}
        <ProgressBar
          masteredCount={masteredIds.length}
          totalCount={questions.length}
          onOpenResetModal={() => setIsResetModalOpen(true)}
        />

        {/* Search & Category Filter Section */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          availableTopics={availableTopics}
          unmasteredOnly={unmasteredOnly}
          setUnmasteredOnly={setUnmasteredOnly}
          categoryCounts={categoryCounts}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          areAllExpanded={areAllExpanded}
          totalFilteredCount={filteredQuestions.length}
        />

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                isMastered={masteredIds.includes(q.id)}
                onToggleMastered={handleToggleMastered}
                isExpanded={expandedIds.includes(q.id)}
                onToggleExpand={() => handleToggleExpand(q.id)}
                onSelectTopic={handleSelectTopic}
                onSelectKeyword={handleSelectKeyword}
              />
            ))
          ) : (
            /* Empty State */
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-10 sm:p-14 text-center shadow-xl space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                <FolderOpen className="w-8 h-8 text-sky-400/80" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-200">
                  مفيش أسئلة تطابق بحثك حالياً
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  جرّب تبحث بكلمات تانية، أو إلغاء فلتر "الأسئلة المتبقية فقط"، أو اختيار تصنيف مختلف من القائمة أعلاه.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTopic('all');
                    setUnmasteredOnly(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-lg shadow-sky-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  إعادة ضبط البحث والفلاتر
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info Tips Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#1e293b] border border-slate-800/80 text-slate-400 text-xs sm:text-sm leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                💡 نصيحة إنترفيو الجافاسكريبت:
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                ركّز دايماً على المفاهيم الجوهرية زي الـ Event Loop، الـ Closures، وفروق الـ this والـ Scope، لأنها أكثر أسئلة بتحدد عمق فهم المطور.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 shrink-0 font-mono" dir="ltr">
            {questions.length} JS Questions loaded
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <p>
          تم التطوير باستخدام <span className="text-sky-400 font-mono">React + Vite + Tailwind CSS</span> لتجهيز مهندسي الـ Frontend للمقابلات التقنية
        </p>
      </footer>

      {/* Confirmation Reset Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
