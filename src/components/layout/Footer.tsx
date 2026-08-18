import React from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUp
} from "lucide-react";
import { companyData } from "../../data/company";
import { ScrollReveal } from "../common/ScrollReveal";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-950 border-t border-slate-800/80 relative overflow-hidden mt-0">
      {/* Top glowing circuit border line with traveling photon */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-energy-500/60 to-transparent">
        <div className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-energy-400 to-transparent animate-[energyTravelHorizontal_6s_ease-in-out_infinite]" />
      </div>

      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-energy-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-solar-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="site-container py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Credentials (Spans 4 cols on LG) */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal animation="slide-up" delay={100}>
              <Link to="/" className="flex items-center gap-3 group inline-flex">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-900 to-brand-850 border border-slate-700/80 flex items-center justify-center shadow-lg shadow-black/50 group-hover:border-energy-500/50 transition-all group-hover:scale-105">
                  <Sun className="w-6 h-6 text-solar-400 transition-transform duration-700 group-hover:rotate-180" />
                  <Zap className="w-3.5 h-3.5 text-energy-400 absolute bottom-1.5 right-1.5 fill-energy-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-energy-400 transition-colors">
                      ENERGY MAN
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-solar-500/20 text-solar-400 border border-solar-500/30">
                      INDIA
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium tracking-wide">
                    {companyData.tagline}
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={200}>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                {companyData.description}
              </p>
            </ScrollReveal>

            {/* Accreditations */}
            <ScrollReveal animation="slide-up" delay={300}>
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-energy-400 shrink-0" />
                  <span>{companyData.mnreAccreditation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-solar-400 shrink-0" />
                  <span>CIN: {companyData.cin}</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Action Button */}
            <ScrollReveal animation="slide-up" delay={400}>
              <div className="pt-2">
                <Link
                  to="/get-a-quote"
                  className="btn-primary py-2.5 px-5 text-xs font-bold inline-flex items-center gap-2 group/btn"
                >
                  <span>Request Free Site Survey</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-4">
            <ScrollReveal animation="slide-up" delay={200}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Solar Solutions</p>
              <ul className="space-y-2.5 text-sm mt-4">
                {[
                  { name: "Residential Rooftop", path: "/solutions/residential" },
                  { name: "Commercial Solar", path: "/solutions/commercial" },
                  { name: "Industrial MW-Scale", path: "/solutions/industrial" },
                  { name: "Agricultural Solar Pumps", path: "/solutions/agricultural" },
                  { name: "Solar EPC & O&M", path: "/solutions/epc-maintenance" },
                  { name: "Energy Storage (BESS)", path: "/solutions/energy-storage" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-slate-400 hover:text-energy-400 transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-energy-400 group-hover:scale-125 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Column 3: Products & Knowledge Hubs */}
          <div className="lg:col-span-3 lg:col-start-10 space-y-4">
            <ScrollReveal animation="slide-up" delay={300}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Products & Hubs</p>
              <ul className="space-y-2.5 text-sm mt-4">
                {[
                  { name: "TOPCon Solar Panels", path: "/products/solar-panels" },
                  { name: "Solar Inverters", path: "/products/inverters" },
                  { name: "Solar Water Pumps", path: "/products/solar-pumps" },
                  { name: "Solar Water Heaters", path: "/products/solar-water-heaters" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-slate-400 hover:text-solar-400 transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-solar-400 group-hover:scale-125 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link to="/government-subsidy" className="text-solar-400 hover:text-solar-300 font-medium transition-colors flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-solar-400" />
                    PM Surya Ghar Guide
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-slate-400 hover:text-solar-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-solar-400 group-hover:scale-125 transition-all" />
                    Solar FAQs & Payback
                  </Link>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>

        {/* Contact Info Row */}
        <ScrollReveal animation="slide-up" delay={400}>
          <div className="mt-12 pt-8 border-t border-slate-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-900 border border-slate-700 shadow-md">
                  <MapPin className="w-4 h-4 text-energy-400" />
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <strong className="text-white block font-semibold">Coimbatore Experience Center:</strong>
                  <span>{companyData.offices[0].address}, Coimbatore - {companyData.offices[0].pincode}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-900 border border-slate-700 shadow-md">
                  <MapPin className="w-4 h-4 text-solar-400" />
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <strong className="text-white block font-semibold">Palani Registered Hub:</strong>
                  <span>{companyData.offices[1].address}, Palani - {companyData.offices[1].pincode}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-900 border border-slate-700 shadow-md">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-300 space-y-1 flex flex-col justify-center h-full">
                  <a href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`} className="text-slate-200 hover:text-white font-medium text-sm transition-colors">
                    {companyData.phones.primary}
                  </a>
                  <a href={`mailto:${companyData.emails.primary}`} className="text-slate-400 hover:text-white transition-colors">
                    {companyData.emails.primary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-900 border border-slate-700 shadow-md">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xs text-slate-300 space-y-1 flex items-center h-full">
                  <span className="text-slate-300">{companyData.offices[0].workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Bar: Copyright & Legal */}
        <ScrollReveal animation="fade-in" delay={500}>
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-400 relative">
            <p className="order-2 lg:order-1 text-center lg:text-left">
              © {new Date().getFullYear()} Energyman Power Technologies (India) Private Limited. All rights reserved.
            </p>
            
            <div className="order-1 lg:order-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-medium">
              <Link to="/about" className="hover:text-energy-400 transition-colors">About Us</Link>
              <Link to="/projects/commercial" className="hover:text-energy-400 transition-colors">Projects Gallery</Link>
              <Link to="/insights" className="hover:text-energy-400 transition-colors">Insights</Link>
              <Link to="/get-a-quote" className="hover:text-energy-400 transition-colors">Support</Link>
            </div>

            {/* Back to top button */}
            <button 
              onClick={scrollToTop}
              className="absolute -top-14 right-0 lg:static lg:ml-4 w-10 h-10 rounded-full bg-brand-900 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-white hover:border-energy-400 hover:bg-brand-850 transition-all hover:-translate-y-1 group order-3 focus:outline-none focus:ring-2 focus:ring-energy-500 shadow-lg"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
