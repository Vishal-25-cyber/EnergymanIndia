import React from "react";
import { Sun, Home, Factory, Tractor, Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

interface TransitionStage {
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  stat: string;
  statLabel: string;
  icon: React.ReactNode;
  accentColor: string;
  borderGlow: string;
  link: string;
}

const stages: TransitionStage[] = [
  {
    step: "01",
    badge: "ENERGY SOURCE",
    title: "SOLAR HARVEST",
    subtitle: "High-Efficiency Photons",
    desc: "Mono PERC & TOPCon crystalline arrays convert sunlight into clean, reliable DC electricity.",
    stat: ">22.8%",
    statLabel: "Module Efficiency",
    icon: <Sun className="w-5 h-5 text-amber-400" />,
    accentColor: "text-amber-400",
    borderGlow: "group-hover:border-amber-500/60",
    link: "/products"
  },
  {
    step: "02",
    badge: "RESIDENTIAL FREEDOM",
    title: "POWERING HOMES",
    subtitle: "Zero Monthly EB Bills",
    desc: "Eliminating lifetime electricity bills with bi-directional net metering and PM Surya Ghar direct subsidy.",
    stat: "6,500+",
    statLabel: "Homes Empowered",
    icon: <Home className="w-5 h-5 text-rose-400" />,
    accentColor: "text-rose-400",
    borderGlow: "group-hover:border-rose-500/60",
    link: "/solutions/residential"
  },
  {
    step: "03",
    badge: "COMMERCIAL RESILIENCE",
    title: "ENERGIZING INDUSTRY",
    subtitle: "Peak Tariff Protection",
    desc: "Protecting textile mills, foundries, and manufacturing plants with high-yield captive solar power plants.",
    stat: "800+",
    statLabel: "MW Installations",
    icon: <Factory className="w-5 h-5 text-amber-400" />,
    accentColor: "text-amber-400",
    borderGlow: "group-hover:border-amber-500/60",
    link: "/solutions/commercial"
  },
  {
    step: "04",
    badge: "AGRARIAN INDEPENDENCE",
    title: "NOURISHING FARMS",
    subtitle: "Daylight Solar Pumping",
    desc: "High-discharge VFD solar submersible pumps for crops, eliminating expensive diesel generators.",
    stat: "100%",
    statLabel: "Diesel Free Pumping",
    icon: <Tractor className="w-5 h-5 text-emerald-400" />,
    accentColor: "text-emerald-400",
    borderGlow: "group-hover:border-emerald-500/60",
    link: "/solutions/agricultural"
  }
];

export const SustainabilityPossibility: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0E] via-[#100D16] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="sustainability-path">
      
      {/* Background Ambient Light Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ── Centered Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>THE CLEAN ENERGY TRANSITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              FROM SUNLIGHT{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                TO POSSIBILITY
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              How infinite solar irradiance transforms into economic freedom, manufacturing competitiveness, and agrarian self-reliance.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Connected 4-Stage Pipeline (Directly on Background, Cardless & Symmetrical) ── */}
        <div className="relative">
          
          {/* Subtle Connecting Energy Rail on Desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-amber-500/30 via-rose-500/30 to-emerald-500/30 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10">
            {stages.map((stage, idx) => (
              <ScrollReveal key={stage.step} delay={idx * 100} animation="slide-up">
                <Link
                  to={stage.link}
                  className={`group flex flex-col justify-between p-5 rounded-3xl bg-[#14101A]/90 border border-red-900/30 ${stage.borderGlow} hover:bg-[#1A1322] hover:-translate-y-1.5 transition-all duration-300 shadow-lg relative h-full space-y-4 cursor-pointer block`}
                >
                  
                  {/* Top Node Header: Icon + Step Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 group-hover:border-red-500/50 group-hover:scale-110 transition-all shadow-xs">
                      {stage.icon}
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-[#0D0A12] border border-red-950/60 px-3 py-1 rounded-xl">
                      <span className="text-[10px] font-mono font-bold text-slate-400">STEP</span>
                      <span className="text-xs font-mono font-black text-rose-300">{stage.step}</span>
                    </div>
                  </div>

                  {/* Stage Details */}
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {stage.badge}
                    </span>
                    
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-red-400 transition-colors">
                      {stage.title}
                    </h3>
                    
                    <p className={`text-xs font-bold ${stage.accentColor}`}>
                      {stage.subtitle}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal pt-1">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Impact Stat Footer */}
                  <div className="pt-3 border-t border-red-950/60 flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-black text-white font-mono leading-none">
                        {stage.stat}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {stage.statLabel}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-red-950/60 text-rose-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                </Link>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default SustainabilityPossibility;
