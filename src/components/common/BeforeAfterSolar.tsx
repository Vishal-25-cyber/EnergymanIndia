import React, { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  Building2,
  Factory,
  Tractor,
  Home
} from "lucide-react";

export const BeforeAfterSolar: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<"industrial" | "commercial" | "agricultural" | "residential">("industrial");

  const data = {
    industrial: {
      title: "Textile Spinning & Manufacturing Mill (1.2 MW)",
      location: "Coimbatore / Tirupur, Tamil Nadu",
      before: {
        bill: "₹14,50,000 / month",
        carbon: "1,450 Tonnes CO₂ / year",
        gridReliance: "100% Dependent on High HT Tariff & Peak Surcharges",
        dieselGen: "₹2,80,000 / mo in Backup DG Fuel during Peak Load",
        taxBenefit: "Zero Accelerated Depreciation Tax Shields"
      },
      after: {
        bill: "₹2,10,000 / month (~85% Reduction)",
        carbon: "Zero Net Emissions (Green Factory Certified)",
        gridReliance: "82% Captive Solar Self-Consumption with DG-PV Sync",
        dieselGen: "Zero DG Fuel required during sunny production hours",
        taxBenefit: "₹72,00,000 40% Year-1 Tax Depreciation Shield"
      }
    },
    commercial: {
      title: "Multi-Speciality Hospital & Research Campus (350 kWp)",
      location: "Palani / Dindigul, Tamil Nadu",
      before: {
        bill: "₹4,80,000 / month",
        carbon: "420 Tonnes CO₂ / year",
        gridReliance: "High Commercial Tariff & HVAC Daytime Peak Demand",
        dieselGen: "Frequent Switchover to High-Cost Diesel Generators",
        taxBenefit: "Standard Corporate Tax Liability"
      },
      after: {
        bill: "₹95,000 / month (~80% Reduction)",
        carbon: "NABH / ESG Green Hospital Platinum Accreditation",
        gridReliance: "Rooftop Net Metering with Smart Peak Shaving",
        dieselGen: "Uninterrupted Clean Power for ICU & Diagnostic Units",
        taxBenefit: "40% Accelerated Tax Depreciation Benefit"
      }
    },
    agricultural: {
      title: "Coconut Plantation & Agro-Farm (10 HP Solar Pump)",
      location: "Udumalaipettai, Tamil Nadu",
      before: {
        bill: "High Diesel Fuel Cost & Irregular Night-Shift Grid Power",
        carbon: "24 Tonnes CO₂ / year from Diesel Generator Pumps",
        gridReliance: "Low-Voltage Fluctuations Damaging Submersible Motors",
        dieselGen: "₹18,000 / month in Constant Diesel Purchases",
        taxBenefit: "Heavy Capital Burn with No Subsidies"
      },
      after: {
        bill: "₹0 Fuel Cost (100% Free Solar Irrigation Power)",
        carbon: "100% Clean Zero-Emission Farming",
        gridReliance: "Daylight Automatic Irrigation with Remote IoT Start",
        dieselGen: "Zero Diesel Maintenance & 25-Year Motor Protection",
        taxBenefit: "60% Government Subsidy under PM-KUSUM"
      }
    },
    residential: {
      title: "Independent Luxury Villa Rooftop (10 kWp)",
      location: "Race Course, Coimbatore",
      before: {
        bill: "₹18,500 / bimonthly TANGEDCO Bill",
        carbon: "14 Tonnes CO₂ / year",
        gridReliance: "Vulnerable to Local Grid Outages & Voltage Surges",
        dieselGen: "Lead-Acid Inverter Replacement Every 3 Years",
        taxBenefit: "Zero Subsidy"
      },
      after: {
        bill: "₹0 / bimonthly (100% Offset with Bi-Directional Credit)",
        carbon: "Eco-Friendly Sustainable Home",
        gridReliance: "Uninterrupted Power Backup with LiFePO4 Battery Bank",
        dieselGen: "Zero Maintenance 25-Year Linear Power Warranty",
        taxBenefit: "₹78,000 Direct DBT Central Subsidy Claimed"
      }
    }
  };

  const current = data[activeSegment];

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="before-after">
      <div className="site-container relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-red-400" />
            <span>Documented Economic Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            BEFORE &amp; AFTER <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">ENERGYMAN TRANSFORMATION</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real documented before-and-after operational transformations achieved across industrial manufacturing, healthcare, farming, and homes since 2016.
          </p>
        </div>

        {/* Sector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { key: "industrial", label: "1.2 MW Industrial Mill", icon: <Factory className="w-4 h-4" /> },
            { key: "commercial", label: "350 kW Hospital Campus", icon: <Building2 className="w-4 h-4" /> },
            { key: "agricultural", label: "10 HP Solar Agro Farm", icon: <Tractor className="w-4 h-4" /> },
            { key: "residential", label: "10 kW Villa Rooftop", icon: <Home className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSegment(tab.key as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSegment === tab.key
                  ? "bg-red-600 text-white shadow-md shadow-red-900/40 scale-105"
                  : "bg-[#14101A] border border-red-950/60 text-slate-300 hover:border-red-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Before vs After Split Comparison Card */}
        <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="border-b border-red-950/60 pb-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-black text-white">{current.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{current.location}</p>
            </div>
            <span className="bg-red-950/80 text-rose-300 border border-red-500/40 text-xs font-bold px-3 py-1 rounded-full">
              Audited Case Study
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Before Column (Red Tinted) */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-red-950/60 space-y-6">
              <div className="flex items-center gap-2.5 text-rose-400 border-b border-red-950/60 pb-3 font-extrabold text-sm uppercase tracking-wider">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <span>Before Solar (Traditional Grid Reliance)</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Monthly Power Expenditure:</span>
                  <strong className="text-rose-400 text-base font-black font-mono">{current.before.bill}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Carbon Footprint:</span>
                  <p className="text-slate-300 font-medium">{current.before.carbon}</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Grid Reliance & Surcharges:</span>
                  <p className="text-slate-300 font-medium">{current.before.gridReliance}</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Backup Diesel / Generator Cost:</span>
                  <p className="text-slate-300 font-medium">{current.before.dieselGen}</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Tax Savings:</span>
                  <p className="text-slate-300 font-medium">{current.before.taxBenefit}</p>
                </div>
              </div>
            </div>

            {/* After Column (Crimson / Ruby Highlighted) */}
            <div className="p-6 rounded-3xl bg-[#1C1625] border border-red-500/40 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-amber-400" />

              <div className="flex items-center gap-2.5 text-red-400 border-b border-red-900/40 pb-3 font-extrabold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                <span>After ENERGYMAN Solar Commissioning</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">New Net Monthly Power Expense:</span>
                  <strong className="text-red-400 text-base font-black font-mono">{current.after.bill}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Carbon Footprint:</span>
                  <p className="text-white font-medium">{current.after.carbon}</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Captive Solar Generation:</span>
                  <p className="text-white font-medium">{current.after.gridReliance}</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Diesel Displacement:</span>
                  <p className="text-white font-medium">{current.after.dieselGen}</p>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold">Tax & Subsidy Realization:</span>
                  <p className="text-amber-300 font-bold font-mono">{current.after.taxBenefit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSolar;
