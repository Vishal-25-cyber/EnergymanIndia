"use client";
import React, { useState } from "react";
import {
  Sun,
  Zap,
  Cpu,
  Activity,
  Home,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";

interface FlowStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  metrics: string;
}

const steps: FlowStep[] = [
  {
    id: 1,
    title: "1. Sunlight Capture",
    subtitle: "Clean Solar Radiation",
    icon: <Sun className="w-6 h-6 text-amber-500 animate-spin-slow" />,
    color: "from-amber-500/20 to-amber-500/5 border-amber-500/40 text-amber-300 bg-amber-950/60",
    description: "Sunlight hits high-efficiency N-Type TOPCon / Mono PERC photovoltaic silicon cells on your roof.",
    metrics: "1,000 W/m² Peak Irradiance"
  },
  {
    id: 2,
    title: "2. DC Power Generation",
    subtitle: "Photovoltaic Conversion",
    icon: <Zap className="w-6 h-6 text-red-500 fill-red-500" />,
    color: "from-red-500/20 to-rose-500/5 border-red-500/40 text-rose-300 bg-red-950/60",
    description: "Photons dislodge electrons, creating Direct Current (DC) electricity conducted through MC4 solar cables.",
    metrics: "Up to 22.8% Conversion Efficiency"
  },
  {
    id: 3,
    title: "3. Smart Inversion",
    subtitle: "DC to AC Conversion",
    icon: <Cpu className="w-6 h-6 text-red-400" />,
    color: "from-red-500/20 to-rose-500/5 border-red-500/40 text-red-300 bg-red-950/60",
    description: "Advanced Multi-MPPT Inverter transforms raw DC electricity into clean 230V/415V Alternating Current (AC).",
    metrics: "> 98.8% Inversion Efficiency"
  },
  {
    id: 4,
    title: "4. Cloud Telemetry",
    subtitle: "AI Energy Management",
    icon: <Activity className="w-6 h-6 text-amber-400" />,
    color: "from-amber-500/20 to-yellow-500/5 border-amber-500/40 text-amber-300 bg-amber-950/60",
    description: "Smart IoT meter balances loads, logs generation data, and routes surplus power to the grid or batteries.",
    metrics: "Real-Time 24/7 Monitoring"
  },
  {
    id: 5,
    title: "5. Load Consumption",
    subtitle: "Powering Your Facility",
    icon: <Home className="w-6 h-6 text-rose-400" />,
    color: "from-rose-500/20 to-red-500/5 border-rose-500/40 text-rose-300 bg-red-950/60",
    description: "Solar electricity powers appliances, heavy industrial machinery, lighting, and air conditioning first.",
    metrics: "100% Green On-Site Power"
  },
  {
    id: 6,
    title: "6. Net Metering & Savings",
    subtitle: "Zero Electricity Bills",
    icon: <PiggyBank className="w-6 h-6 text-red-500" />,
    color: "from-red-500/20 to-red-500/5 border-red-500/40 text-red-400 bg-red-950/60",
    description: "Surplus electricity spins your bidirectional DISCOM meter backward, generating credits and slashing bills.",
    metrics: "Up to 90% Bill Reduction"
  }
];

export const EnergyFlowDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  // Auto-pulse through the energy chain periodically
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60">

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-red-400" />
            <span>Visual Energy Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            THE TECHNOLOGY BEHIND <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">YOUR CLEAN POWER</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Follow the seamless journey of clean photons from the sky into reliable, high-voltage electricity powering your daily operations and generating financial savings.
          </p>
        </div>

        {/* Global Energy Flow Circuit Bar (Sun -> Grid) */}
        <div className="hidden lg:flex items-center justify-between bg-[#14101A]/95 backdrop-blur-md p-3.5 rounded-2xl border border-red-950/60 shadow-xl mb-8">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStep === step.id
                    ? "bg-red-600 text-white shadow-md shadow-black/40 scale-105"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>{step.id}.</span>
                <span>{step.subtitle.split(" ")[0]}</span>
              </button>
              {idx < steps.length - 1 && (
                <div className="flex-1 mx-2 h-1 bg-slate-800 rounded-full relative overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      activeStep > step.id
                        ? "bg-red-500 w-full"
                        : activeStep === step.id
                        ? "bg-gradient-to-r from-red-500 to-amber-400 w-full animate-pulse"
                        : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step-by-Step Interactive Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-400 relative overflow-hidden group ${
                  isActive
                    ? "bg-[#1C1625] border-red-500/60 shadow-2xl shadow-black/70 -translate-y-1.5"
                    : "bg-[#14101A]/95 border-red-950/60 hover:border-red-900 hover:bg-[#1A1424] shadow-md"
                }`}
              >
                {/* Active Indicator Glow Top Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-amber-400" />
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl border ${step.color} shadow-sm group-hover:scale-105 transition-transform`}>
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-red-950/60">
                      Step 0{step.id}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white group-hover:text-red-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-bold text-rose-300">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-red-950/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">Specification:</span>
                  <span className="text-rose-300 font-extrabold bg-red-950/80 px-2.5 py-1 rounded border border-red-500/40 font-mono">
                    {step.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Energy Flow Diagram Summary Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#14101A]/95 backdrop-blur-xl border border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl bg-red-950 text-red-400 border border-red-900 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Tier-1 Hardware & Turnkey CEIG Compliance</p>
              <p className="text-xs text-slate-400">All components adhere strictly to MNRE, IEC & BIS safety benchmarks for zero electrical loss.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="/#calculator"
              className="btn-primary w-full md:w-auto py-3.5 px-6 text-xs sm:text-sm font-bold whitespace-nowrap shadow-md"
            >
              <span>Calculate Your System Sizing →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyFlowDiagram;
