import React from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Phone,
  ChevronRight,
  Sun,
  Award,
  Tractor,
  Droplets,
  Zap,
  Gauge
} from "lucide-react";
import { SEOHead } from "../../components/common/SEOHead";
import { SolarWaterHeaterInteractive } from "../../components/common/SolarWaterHeaterInteractive";
import { productsData } from "../../data/products";

export const ProductDetailPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const itemSlug = searchParams.get("item");

  const product =
    productsData.find((p) => p.slug === itemSlug) ||
    productsData.find((p) => p.category === category) ||
    productsData[0];

  const isSolarPump = product.category === "solar-pumps";
  const isSolarWaterHeater = product.category === "solar-water-heaters";

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title={`${product.name} - Technical Specifications | ENERGYMAN`}
        description={product.description}
      />

      {/* ── Breadcrumb Bar ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link to="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link to="/products" className="hover:text-red-400 transition-colors">Product</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </section>

      {/* ── Monumental Editorial Header (Cardless Design) ── */}
      <section className="pt-10 pb-8 bg-[#0A0A0E] relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
              {isSolarPump ? <Tractor className="w-3.5 h-3.5 text-rose-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span>{product.categoryLabel}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{product.warranty}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] max-w-5xl uppercase">
            {product.name.split(" - ")[0]} <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">{product.name.includes(" - ") ? `- ${product.name.split(" - ")[1]}` : ""}</span>
          </h1>

          <p className="text-red-400 font-mono text-sm sm:text-base font-bold max-w-3xl">
            {product.tagline}
          </p>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-4xl font-normal">
            {product.description}
          </p>
        </div>
      </section>

      {/* ── Key Metrics Bar (Cardless Horizontal Quick-Stats Rail) ── */}
      <section className="py-6 bg-[#0A0A0E] border-y border-red-950/60">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
                Motor / Power Rating
              </span>
              <p className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
                {isSolarPump ? "1 Hp to 50 Hp" : "110L - 5000L"}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
                Discharge / Temp
              </span>
              <p className="text-xl sm:text-2xl font-black font-mono text-amber-300 tracking-tight">
                {isSolarPump ? "350,000 LPD" : "Up to 85°C"}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
                Head / Retention
              </span>
              <p className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-tight">
                {isSolarPump ? "600+ Feet Head" : "48+ Hrs Retention"}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
                Govt Subsidy Support
              </span>
              <p className="text-xl sm:text-2xl font-black font-mono text-rose-400 tracking-tight">
                {isSolarPump ? "Up to 60% PM-KUSUM" : "Section 32 Tax Shield"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Showcase Image (Proportional Clean Frame) ── */}
      <section className="py-12 bg-[#0A0A0E]">
        <div className="site-container">
          <div className="max-w-3xl mx-auto relative group">
            <div className="relative rounded-2xl overflow-hidden border border-red-950/60 shadow-2xl shadow-black/80 bg-slate-950">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-[280px] sm:h-[360px] lg:h-[400px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0E] to-transparent" />
              
              {/* Overlay Badges */}
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-[11px] font-mono font-bold text-amber-400 rounded-md border border-red-950/60 z-10">
                Turnkey Hardware Spec
              </span>

              <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-mono font-black rounded-lg shadow-lg z-10">
                {product.categoryLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2-Column Engineering Breakdown (Cardless Architectural Grid) ── */}
      <section className="py-14 bg-[#0A0A0E] border-t border-red-950/60">
        <div className="site-container space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column: Engineering Highlights & Capabilities */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                    01 // CAPABILITIES & ENGINEERING
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Engineering Highlights
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal min-h-[40px]">
                    Manufactured with food-grade stainless steel impellers, brushless permanent-magnet DC/AC motors, and automated sensorless protections.
                  </p>
                </div>

                <div className="space-y-1 pt-1 font-medium">
                  {product.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 py-2.5 border-b border-red-950/30 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Full Technical Specifications Matrix */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  02 // TECHNICAL SPECIFICATIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                  <Cpu className="w-6 h-6 text-amber-400" />
                  <span>Technical Benchmark Matrix</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal min-h-[40px]">
                  Strictly compliant with Bureau of Indian Standards (BIS) and Ministry of New and Renewable Energy (MNRE) guidelines.
                </p>
              </div>

              <div className="space-y-1 text-xs sm:text-sm">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2.5 border-b border-red-950/40">
                    <span className="text-slate-400 font-mono">{spec.name}:</span>
                    <strong className="text-white font-mono font-bold text-right ml-4">{spec.value}</strong>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Symmetrical Statutory Compliance Bar */}
          <div className="pt-6 border-t border-red-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>STATUTORY ACCREDITATIONS &amp; TESTING:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {product.certifications.map((cert, cIdx) => (
                <span
                  key={cIdx}
                  className="bg-slate-900/90 border border-red-950/60 text-slate-200 text-[11px] font-mono font-semibold px-3 py-1 rounded-md shadow-xs"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Unified Centered Bottom Action Bar */}
          <div className="pt-6 border-t border-red-950/60 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={`/get-a-quote?product=${encodeURIComponent(product.name)}`}
              className="btn-primary py-3.5 px-8 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-red-600/20 w-full sm:w-auto justify-center"
            >
              <span>Request Technical Sizing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/contact?subject=${encodeURIComponent(`Engineering Inquiry: ${product.name}`)}`}
              className="py-3.5 px-6 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 inline-flex items-center gap-2 transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>Talk to Solar Engineer</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ── Interactive Water Heater Visualizer if viewing Water Heater ── */}
      {isSolarWaterHeater && (
        <SolarWaterHeaterInteractive />
      )}

    </div>
  );
};

export default ProductDetailPage;
