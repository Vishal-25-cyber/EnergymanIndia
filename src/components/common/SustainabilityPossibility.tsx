import React from "react";
import { Sun, Home, Factory, Tractor, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";

export const SustainabilityPossibility: React.FC = () => {
  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="sustainability-path">
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.015] tracking-widest pointer-events-none select-none uppercase font-sans">
        FUTURE
      </div>

      <div className="site-container relative z-10 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>THE CLEAN ENERGY TRANSITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              FROM SUNLIGHT
              <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                TO POSSIBILITY
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              How infinite solar irradiance transforms into economic freedom, manufacturing competitiveness, and agrarian self-reliance.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 4-Stage Energy Flow Journey ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {[
            {
              step: "01",
              title: "SOLAR HARVEST",
              subtitle: "High-Efficiency Photons",
              desc: "Mono PERC and TOPCon crystalline arrays convert sunlight into clean, reliable DC electricity with >22.8% module efficiency.",
              icon: <Sun className="w-6 h-6 text-amber-400" />,
              badge: "Source"
            },
            {
              step: "02",
              title: "POWERING HOMES",
              subtitle: "Residential Freedom",
              desc: "Eliminating monthly electricity tariffs for 6,500+ homeowners with bi-directional net metering and PM Surya Ghar subsidies.",
              icon: <Home className="w-6 h-6 text-red-400" />,
              badge: "Living"
            },
            {
              step: "03",
              title: "ENERGIZING INDUSTRY",
              subtitle: "Manufacturing Resilience",
              desc: "Protecting textile mills, foundries, and cold storage chains from soaring peak commercial tariffs with captive solar power.",
              icon: <Factory className="w-6 h-6 text-amber-400" />,
              badge: "Commerce"
            },
            {
              step: "04",
              title: "NOURISHING FARMS",
              subtitle: "Agricultural Independence",
              desc: "Daylight solar submersible pumping for crops, eliminating diesel expenses and securing round-the-clock water discharge.",
              icon: <Tractor className="w-6 h-6 text-rose-400" />,
              badge: "Agriculture"
            }
          ].map((node, nIdx) => (
            <ScrollReveal key={node.step} delay={nIdx * 100} animation="slide-up">
              <div className="h-full bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-6 hover:border-red-500/60 hover:bg-[#1C1625] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 group flex flex-col justify-between space-y-4 relative shadow-md">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-red-950/60 group-hover:scale-110 group-hover:border-red-500/50 transition-all shadow-xs">
                      {node.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-red-500 bg-slate-900 px-3 py-1 rounded-xl border border-red-950/60">
                      STEP {node.step}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                      {node.badge}
                    </span>
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">
                      {node.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400/90 mt-0.5">
                      {node.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {node.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-red-950/60 flex items-center justify-between text-xs text-red-400 font-bold">
                  <span className="font-mono text-[11px]">CLEAN IMPACT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            </ScrollReveal>
          ))}

        </div>

      </div>
    </section>
  );
};

export default SustainabilityPossibility;
