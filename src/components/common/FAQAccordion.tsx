import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Search,
} from "lucide-react";
import { faqsData } from "../../data/faqs";

export const FAQAccordion: React.FC<{ defaultCategory?: string }> = ({ defaultCategory = "all" }) => {
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  const [openIds, setOpenIds] = useState<string[]>([faqsData[0]?.id || "faq-1"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqsData.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveCategory("residential")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === "residential"
                ? "bg-red-600 text-white shadow-xs"
                : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
            }`}
          >
            Residential &amp; Subsidy
          </button>
          <button
            onClick={() => setActiveCategory("commercial")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === "commercial"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
            }`}
          >
            Commercial &amp; Industrial
          </button>
          <button
            onClick={() => setActiveCategory("agricultural")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === "agricultural"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
            }`}
          >
            Agricultural Pumps
          </button>
          <button
            onClick={() => setActiveCategory("technical")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === "technical"
                ? "bg-red-800 text-white shadow-xs"
                : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
            }`}
          >
            Technical &amp; Maintenance
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-red-950/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                isOpen
                  ? "bg-[#1C1625] border-red-500/50 shadow-md"
                  : "bg-[#14101A]/95 border-red-950/60 hover:border-red-900"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-950/80 text-rose-300 border border-red-500/40 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                </div>

                <div className="p-1 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-red-400" : ""
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-red-950/60 animate-fade-in font-normal">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-red-950/60 text-slate-400 text-sm">
            No matching questions found. Try adjusting your search or category filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQAccordion;
