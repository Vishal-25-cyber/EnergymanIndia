import React from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  Phone,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { FAQAccordion } from "../components/common/FAQAccordion";
import { companyData } from "../data/company";

export const FAQPage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Frequently Asked Questions & Solar Knowledge Base"
        description="Find answers to all questions regarding solar rooftop installation, PM Surya Ghar subsidy, PM-KUSUM pump schemes, payback period, and warranties."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Solar Knowledge Base</span>
          </div>
          <h1 className="heading-hero text-white">
            FREQUENTLY ASKED <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">QUESTIONS</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Everything you need to know about rooftop solar sizing, net-metering processes, government subsidies, and system maintenance.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container max-w-4xl space-y-12">
          <FAQAccordion defaultCategory="all" />

          {/* Still Have Questions Box */}
          <div className="p-8 rounded-3xl bg-[#14101A]/95 border border-red-900/30 text-center space-y-4 shadow-xl">
            <h3 className="text-xl font-black text-white">Have a Specific Technical Question?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-normal">
              Our engineering team in Coimbatore and Palani is available to answer all questions regarding your specific roof structure or tariff rate.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`}
                className="btn-primary py-3 px-6 text-xs font-bold inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us: {companyData.phones.primary}</span>
              </a>
              <Link to="/contact" className="py-3 px-6 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 rounded-xl transition-colors">
                Send an Online Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
