import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUp,
  Calculator
} from "lucide-react";
import { companyData } from "../../data/company";
import { ScrollReveal } from "../common/ScrollReveal";
import { BrandLogo } from "../common/BrandLogo";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0E] text-slate-200 border-t border-red-950/60 relative overflow-hidden mt-0">
      
      {/* Background Subtle Red Geometric Circuit Mesh */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #E63946 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="site-container py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Credentials (4 cols on LG) */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal animation="slide-up" delay={100}>
              <Link to="/" className="inline-block group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl p-1">
                <BrandLogo size="md" />
              </Link>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={150}>
              <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                {companyData.description}
              </p>
            </ScrollReveal>

            {/* Accreditations */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="space-y-2 pt-4 border-t border-red-950/60">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{companyData.mnreAccreditation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>CIN: {companyData.cin}</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Get a Quote Action Button */}
            <ScrollReveal animation="slide-up" delay={250}>
              <div className="pt-2">
                <Link
                  to="/get-a-quote"
                  className="btn-primary py-3 px-6 text-xs font-black tracking-wider uppercase inline-flex items-center gap-2 group/btn shadow-md"
                >
                  <Calculator className="w-4 h-4" />
                  <span>GET A FREE SOLAR QUOTE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Column 2: Solutions Navigation (3 cols) */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-4">
            <ScrollReveal animation="slide-up" delay={150}>
              <p className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                SOLAR ENGINEERING SOLUTIONS
              </p>
              <ul className="space-y-2.5 text-sm mt-4">
                {[
                  { name: "Residential Rooftop Solar", path: "/solutions/residential" },
                  { name: "Industrial Solar Solutions", path: "/solutions/industrial" },
                  { name: "Agricultural Solar Pumps", path: "/solutions/agricultural" },
                  { name: "Commercial Captive Solar", path: "/solutions/commercial" },
                  { name: "Battery Energy Storage (BESS)", path: "/solutions/energy-storage" },
                  { name: "Solar EPC & O&M Maintenance", path: "/solutions/epc-maintenance" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-slate-300 hover:text-red-400 transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-900 group-hover:bg-red-500 group-hover:scale-125 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Column 3: Quick Links & Products (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <ScrollReveal animation="slide-up" delay={200}>
              <p className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                DISCOVER & GUIDES
              </p>
              <ul className="space-y-2.5 text-sm mt-4">
                {[
                  { name: "Commissioned Projects", path: "/projects" },
                  { name: "Solar Water Heaters", path: "/products/solar-water-heaters" },
                  { name: "Solar Pumps (PM-KUSUM)", path: "/products/solar-pumps" },
                  { name: "PM Surya Ghar Subsidy", path: "/government-subsidy" },
                  { name: "Client Sites Gallery", path: "/gallery" },
                  { name: "Insights & Articles", path: "/insights" },
                  { name: "About ENERGYMAN", path: "/about" },
                  { name: "Contact Engineering Hub", path: "/contact" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-slate-300 hover:text-red-400 transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-900 group-hover:bg-red-500 group-hover:scale-125 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Column 4: Factual Contact Directory & Social Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <ScrollReveal animation="slide-up" delay={250}>
              <p className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                HEAD OFFICE & DIRECT CONTACT
              </p>
              
              <div className="space-y-3.5 text-xs text-slate-300 mt-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <address className="not-italic leading-relaxed">
                    119, Gopal Layout, Ponnaiahrajapuram,
                    <br />
                    Behind Gandhi Park, Coimbatore - 641001,
                    <br />
                    Tamil Nadu, India.
                  </address>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="tel:+917092510004" className="hover:text-white transition-colors font-bold">
                    +91 70925 10004
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-red-400 shrink-0" />
                  <a href="mailto:info@energymanindia.in" className="hover:text-white transition-colors font-mono">
                    info@energymanindia.in
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>
              </div>

              {/* Social Media Links from Source */}
              <div className="pt-4 border-t border-red-950/60">
                <span className="text-[11px] font-bold text-slate-400 block mb-2 font-mono">
                  FOLLOW ENERGYMAN
                </span>
                <div className="flex items-center gap-3">
                  {[
                    { name: "Facebook", url: companyData.socialLinks.facebook },
                    { name: "LinkedIn", url: companyData.socialLinks.linkedin },
                    { name: "YouTube", url: companyData.socialLinks.youtube },
                    { name: "Instagram", url: companyData.socialLinks.instagram },
                    { name: "WhatsApp", url: companyData.socialLinks.whatsapp }
                  ].map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-900 border border-red-950/60 text-slate-300 hover:text-white hover:border-red-500/50 transition-all text-xs font-bold"
                    >
                      {soc.name}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="mt-14 pt-8 border-t border-red-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} <strong className="text-slate-200">Energyman Power Technologies (India) Private Limited</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-red-400">
              RENEWABLE ENERGY SAVES EARTH
            </span>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-red-950/60 text-slate-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
