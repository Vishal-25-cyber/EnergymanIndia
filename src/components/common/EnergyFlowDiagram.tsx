import React, { useState } from "react";
import {
  Sun,
  Zap,
  Cpu,
  Activity,
  Home,
  PiggyBank,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
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
    icon: <Sun className="w-6 h-6 text-solar-400 animate-spin-slow" />,
    color: "from-solar-500/20 to-solar-500/5 border-solar-500/30 text-solar-400",
    description: "Sunlight hits high-efficiency N-Type TOPCon / Mono PERC photovoltaic silicon cells on your roof.",
    metrics: "1,000 W/m² Peak Irradiance"
  },
  {
    id: 2,
    title: "2. DC Power Generation",
    subtitle: "Photovoltaic Conversion",
    icon: <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />,
    color: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
    description: "Photons dislodge electrons, creating Direct Current (DC) electricity conducted through MC4 solar cables.",
    metrics: "Up to 22.8% Conversion Efficiency"
  },
  {
    id: 3,
    title: "3. Smart Inversion",
    subtitle: "DC to AC Conversion",
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
    description: "Advanced Multi-MPPT Inverter transforms raw DC electricity into clean 230V/415V Alternating Current (AC).",
    metrics: "> 98.8% Inversion Efficiency"
  },
  {
    id: 4,
    title: "4. Cloud Telemetry",
    subtitle: "AI Energy Management",
    icon: <Activity className="w-6 h-6 text-purple-400" />,
    color: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
    description: "Smart IoT meter balances loads, logs generation data, and routes surplus power to the grid or batteries.",
    metrics: "Real-Time 24/7 Monitoring"
  },
  {
    id: 5,
    title: "5. Load Consumption",
    subtitle: "Powering Your Facility",
    icon: <Home className="w-6 h-6 text-cyan-400" />,
    color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
    description: "Solar electricity powers appliances, heavy industrial machinery, lighting, and air conditioning first.",
    metrics: "100% Green On-Site Power"
  },
  {
    id: 6,
    title: "6. Net Metering & Savings",
    subtitle: "Zero Electricity Bills",
    icon: <PiggyBank className="w-6 h-6 text-energy-400" />,
    color: "from-energy-500/20 to-energy-500/5 border-energy-500/30 text-energy-400",
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
    <section className="section-padding bg-brand-950 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-energy-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>Visual Energy Architecture</span>
          </div>
          <h2 className="heading-section">
            THE TECHNOLOGY BEHIND <span className="bg-gradient-to-r from-energy-400 via-solar-400 to-energy-300 bg-clip-text text-transparent">YOUR ENERGY</span>
          </h2>
          <p className="text-subtle">
            Follow the seamless journey of clean photons from the sky into reliable, high-voltage electricity powering your daily operations and generating financial savings.
          </p>
        </div>

        {/* Global Energy Flow Circuit Bar (Sun -> Grid) */}
        <div className="hidden lg:flex items-center justify-between bg-brand-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 mb-8">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStep === step.id
                    ? "bg-energy-500 text-brand-950 shadow-lg shadow-energy-500/20 scale-105"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{step.id}.</span>
                <span>{step.subtitle.split(" ")[0]}</span>
              </button>
              {idx < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 bg-slate-800 relative overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      activeStep > step.id
                        ? "bg-energy-500 w-full"
                        : activeStep === step.id
                        ? "bg-gradient-to-r from-energy-500 to-solar-400 w-full animate-pulse"
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
                className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-500 relative overflow-hidden group ${
                  isActive
                    ? "bg-brand-900/90 border-energy-500/60 shadow-2xl shadow-energy-500/15 -translate-y-1"
                    : "bg-brand-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-brand-850/80"
                }`}
              >
                {/* Active Indicator Glow Top Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-500 via-solar-400 to-energy-400" />
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br border ${step.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-energy-500"></span>
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-slate-400 bg-brand-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      Step 0{step.id}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-energy-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-300">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Metric:</span>
                  <span className="text-energy-400 font-bold bg-brand-950 px-2.5 py-1 rounded border border-slate-800 font-mono">
                    {step.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Energy Flow Diagram Summary Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-brand-900/80 backdrop-blur-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl bg-energy-500/10 text-energy-400 border border-energy-500/20 shrink-0">
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
              className="btn-primary w-full md:w-auto py-3.5 px-6 text-xs sm:text-sm font-bold whitespace-nowrap shimmer-container"
            >
              <span>Calculate Your System Sizing →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
