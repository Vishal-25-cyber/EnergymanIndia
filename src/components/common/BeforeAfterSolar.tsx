import React, { useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Sparkles,
  Zap,
  ShieldCheck,
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
      },
      imageBefore: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80",
      imageAfter: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
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
      },
      imageBefore: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80",
      imageAfter: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1000&q=80"
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
      },
      imageBefore: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
      imageAfter: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80"
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
      },
      imageBefore: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      imageAfter: "https://images.unsplash.com/photo-1598425255359-c2e47405e461?auto=format&fit=crop&w=1000&q=80"
    }
  };

  const current = data[activeSegment];

  return (
    <section className="section-padding bg-brand-950/90 relative overflow-hidden border-t border-slate-800" id="before-after">
      <div className="site-container relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Documented Economic Impact</span>
          </div>
          <h2 className="heading-section">
            BEFORE & AFTER <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">SOLAR TRANSFORMATION</span>
          </h2>
          <p className="text-subtle">
            See the concrete financial, operational, and environmental contrast before and after commissioning an Energy Man India clean power system.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "industrial", label: "Industrial Mill (1.2 MW)", icon: <Factory className="w-4 h-4" /> },
            { id: "commercial", label: "Hospital Campus (350 kW)", icon: <Building2 className="w-4 h-4" /> },
            { id: "agricultural", label: "Agro Farm (10 HP Pump)", icon: <Tractor className="w-4 h-4" /> },
            { id: "residential", label: "Luxury Villa (10 kW)", icon: <Home className="w-4 h-4" /> }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveSegment(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeSegment === cat.id
                  ? "bg-energy-500 text-brand-950 shadow-lg shadow-energy-500/20 ring-1 ring-energy-500"
                  : "bg-brand-900 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Transformation Comparison Dual Card */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">{current.title}</h3>
              <p className="text-xs text-solar-400 font-medium">{current.location}</p>
            </div>
            <span className="badge-emerald text-xs font-bold">Verified Real Client Case</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* BEFORE Card (Red Theme) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-950/90 border border-red-500/30 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                    <XCircle className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-extrabold text-red-400">BEFORE SOLAR</h4>
                    <span className="text-[11px] text-slate-400">High Recurring Utility Costs</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs divide-y divide-slate-800/80">
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Electricity Expenditure:</span>
                    <strong className="text-red-300 text-sm font-mono">{current.before.bill}</strong>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Carbon Emissions:</span>
                    <span className="text-slate-300">{current.before.carbon}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Grid & Fuel Vulnerability:</span>
                    <span className="text-slate-300">{current.before.gridReliance}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Diesel Generator Costs:</span>
                    <span className="text-slate-300">{current.before.dieselGen}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Tax & Subsidy Benefits:</span>
                    <span className="text-slate-400 italic">{current.before.taxBenefit}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AFTER Card (Energy Green Theme) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-950/90 border border-energy-500/50 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden ring-1 ring-energy-500/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-energy-500/10 rounded-bl-full pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-energy-500/20 text-energy-400 border border-energy-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-extrabold text-energy-400">AFTER ENERGY MAN SOLAR</h4>
                    <span className="text-[11px] text-slate-400">Engineered Clean Power Asset</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs divide-y divide-slate-800/80">
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Reduced Electricity Bill:</span>
                    <strong className="text-energy-400 text-sm font-mono">{current.after.bill}</strong>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Environmental Footprint:</span>
                    <span className="text-slate-200 font-semibold">{current.after.carbon}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Energy Independence:</span>
                    <span className="text-slate-200">{current.after.gridReliance}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Diesel Generator Displacement:</span>
                    <span className="text-slate-200">{current.after.dieselGen}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-400 block mb-0.5">Tax Depreciation & Subsidy:</span>
                    <strong className="text-solar-400 font-bold">{current.after.taxBenefit}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
