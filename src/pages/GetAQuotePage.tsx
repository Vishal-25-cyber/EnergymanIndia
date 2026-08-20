import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Phone,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { QuoteWizard } from "../components/common/QuoteWizard";
import { companyData } from "../data/company";

export const GetAQuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type") || "Homeowner";
  const billParam = searchParams.get("bill") || "4500";
  const kwParam = searchParams.get("kw") || "3";

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Get a Solar Quote & Site Assessment - ENERGYMAN"
        description="Request a customized renewable energy quotation and 3D rooftop solar shadow audit from ENERGYMAN. Direct PM Surya Ghar & PM-KUSUM subsidy calculations."
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Interactive 6-Step Guided Solar Planner</span>
          </div>
          <h1 className="heading-hero text-white">
            GET YOUR <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">SOLAR PLAN</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Complete our 60-second guided wizard to receive an accurate system capacity sizing, government subsidy deduction summary, and financial ROI proposal.
          </p>
        </div>
      </section>

      {/* Wizard Section */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container max-w-4xl">
          <QuoteWizard
            initialType={typeParam}
            initialBill={billParam}
            initialKw={kwParam}
          />

          {/* Direct Phone Assistance Strip */}
          <div className="mt-8 p-6 rounded-2xl bg-[#14101A]/95 border border-red-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-md">
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <Phone className="w-5 h-5 text-red-400 shrink-0" />
              <span>
                Prefer to speak with an engineer right now? Call our direct line at <strong className="text-white font-bold">{companyData.phones.primary}</strong>
              </span>
            </div>
            <a
              href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`}
              className="py-2.5 px-5 text-xs font-bold whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 rounded-xl transition-all"
            >
              Call Engineering Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetAQuotePage;
