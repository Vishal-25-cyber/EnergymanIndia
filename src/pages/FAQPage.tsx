import React from "react";
import { Link } from "react-router-dom";
import {
  HelpCircle,
  Sparkles,
  Phone,
  ArrowRight
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { FAQAccordion } from "../components/common/FAQAccordion";
import { companyData } from "../data/company";

export const FAQPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Frequently Asked Questions & Solar Knowledge Base"
        description="Find answers to all questions regarding solar rooftop installation, PM Surya Ghar subsidy, PM-KUSUM pump schemes, payback period, and warranties."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Solar Knowledge Base</span>
          </div>
          <h1 className="heading-hero text-white">
            FREQUENTLY ASKED <span className="bg-gradient-to-r from-purple-400 to-energy-400 bg-clip-text text-transparent">QUESTIONS</span>
          </h1>
          <p className="text-subtle">
            Everything you need to know about rooftop solar sizing, net-metering processes, government subsidies, and system maintenance.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding bg-brand-950">
        <div className="site-container max-w-4xl space-y-12">
          <FAQAccordion defaultCategory="all" />

          {/* Still Have Questions Box */}
          <div className="p-8 rounded-3xl bg-brand-900/80 border border-slate-800 text-center space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-white">Have a Specific Technical Question?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
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
              <Link to="/contact" className="btn-secondary py-3 px-6 text-xs font-semibold">
                Send an Online Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
