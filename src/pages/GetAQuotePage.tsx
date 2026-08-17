import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Phone,
  CheckCircle2
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
    <>
      <SEOHead
        title="Get a Solar Quote & Site Assessment - Energy Man India"
        description="Request a customized renewable energy quotation and 3D rooftop solar shadow audit from Energy Man India. Direct PM Surya Ghar & PM-KUSUM subsidy calculations."
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 6-Step Guided Solar Planner</span>
          </div>
          <h1 className="heading-hero text-white">
            GET YOUR <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">SOLAR PLAN</span>
          </h1>
          <p className="text-subtle">
            Complete our 60-second guided wizard to receive an accurate system capacity sizing, government subsidy deduction summary, and financial ROI proposal.
          </p>
        </div>
      </section>

      {/* Wizard Section */}
      <section className="section-padding bg-brand-950">
        <div className="site-container max-w-4xl">
          <QuoteWizard
            initialType={typeParam}
            initialBill={billParam}
            initialKw={kwParam}
          />

          {/* Direct Phone Assistance Strip */}
          <div className="mt-8 p-6 rounded-2xl bg-brand-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="w-5 h-5 text-solar-400 shrink-0" />
              <span>
                Prefer to speak with an engineer right now? Call our direct line at <strong className="text-white">{companyData.phones.primary}</strong>
              </span>
            </div>
            <a
              href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`}
              className="btn-secondary py-2 px-4 text-xs font-semibold whitespace-nowrap"
            >
              Call Engineering Desk
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
