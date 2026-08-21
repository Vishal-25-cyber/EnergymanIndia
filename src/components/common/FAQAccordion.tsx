import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { faqsData } from "../../data/faqs";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "agricultural", label: "Agricultural" },
  { id: "technical", label: "Technical" },
];

export const FAQAccordion: React.FC<{ defaultCategory?: string }> = ({ defaultCategory = "all" }) => {
  const [activeCat, setActiveCat] = useState(defaultCategory);
  const [openId, setOpenId] = useState<string>("");
  const openScrollPos = useRef<number>(0);

  const filtered = faqsData.filter(
    (f) => activeCat === "all" || f.category === activeCat
  );

  const toggle = (id: string) => {
    setOpenId((prev) => {
      if (prev === id) return "";
      openScrollPos.current = window.scrollY;
      return id;
    });
  };

  useEffect(() => {
    if (!openId) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - openScrollPos.current) > 50) {
        setOpenId("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openId]);

  return (
    <div className="w-full space-y-8">

      {/* ── Category tabs — left-aligned underline style ── */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-red-900/30 pb-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCat(cat.id); setOpenId(""); }}
            className={`pb-3 -mb-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeCat === cat.id
                ? "border-red-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Full-width accordion rows — no cards ── */}
      <div className="w-full divide-y divide-red-900/20">
        {filtered.map((faq, idx) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="group">
              {/* Question row */}
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-start gap-5 py-5 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                {/* Index number */}
                <span className={`shrink-0 text-xs font-black font-mono w-7 pt-0.5 transition-colors ${isOpen ? "text-red-500" : "text-slate-600 group-hover:text-slate-400"
                  }`}>
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Question text */}
                <span className={`flex-1 text-sm sm:text-base font-bold leading-snug transition-colors ${isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}>
                  {faq.question}
                </span>

                {/* +/- icon */}
                <span className={`shrink-0 mt-0.5 transition-all duration-200 ${isOpen ? "text-red-500" : "text-slate-500 group-hover:text-slate-300"
                  }`}>
                  {isOpen
                    ? <Minus className="w-4 h-4" />
                    : <Plus className="w-4 h-4" />
                  }
                </span>
              </button>

              {/* Answer — inline, no box */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="pl-12 pb-6 pr-8">
                  {/* Red accent bar */}
                  <div className="w-8 h-0.5 bg-red-500 mb-3 rounded-full" />
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                  {/* Category tag */}
                  <span className="inline-block mt-4 text-[9px] font-mono font-black uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-900/40 px-2.5 py-0.5 rounded-full">
                    {faq.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">
            No questions in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQAccordion;
