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
  Sparkles
} from "lucide-react";
import { companyData } from "../../data/company";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-energy-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-solar-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="site-container py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand & Credentials (Spans 2 cols on LG) */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-900 to-brand-850 border border-slate-700/80 flex items-center justify-center shadow-lg shadow-black/50 group-hover:border-energy-500/50 transition-all">
                <Sun className="w-6 h-6 text-solar-400" />
                <Zap className="w-3.5 h-3.5 text-energy-400 absolute bottom-1.5 right-1.5 fill-energy-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-white">
                    ENERGY MAN
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-solar-500/20 text-solar-400 border border-solar-500/30">
                    INDIA
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium tracking-wide">
                  {companyData.tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {companyData.description}
            </p>

            {/* Accreditations */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-energy-400 shrink-0" />
                <span>{companyData.mnreAccreditation}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Award className="w-4 h-4 text-solar-400 shrink-0" />
                <span>CIN: {companyData.cin}</span>
              </div>
            </div>

            {/* Quick Action Button */}
            <div>
              <Link
                to="/get-a-quote"
                className="btn-primary py-2.5 px-5 text-xs font-bold inline-flex items-center gap-2"
              >
                <span>Request Free Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Solar Solutions</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/solutions/residential" className="text-slate-400 hover:text-energy-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-energy-400 transition-colors" />
                  Residential Rooftop
                </Link>
              </li>
              <li>
                <Link to="/solutions/commercial" className="text-slate-400 hover:text-energy-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-energy-400 transition-colors" />
                  Commercial Solar
                </Link>
              </li>
              <li>
                <Link to="/solutions/industrial" className="text-slate-400 hover:text-energy-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-energy-400 transition-colors" />
                  Industrial MW-Scale
                </Link>
              </li>
              <li>
                <Link to="/solutions/agricultural" className="text-slate-400 hover:text-energy-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-energy-400 transition-colors" />
                  Agricultural Solar Pumps
                </Link>
              </li>
              <li>
                <Link to="/solutions/epc-maintenance" className="text-slate-400 hover:text-energy-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-energy-400 transition-colors" />
                  Solar EPC & O&M
                </Link>
              </li>
              <li>
                <Link to="/solutions/energy-storage" className="text-slate-400 hover:text-energy-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-energy-400 transition-colors" />
                  Energy Storage (BESS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products & Knowledge Hubs */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Products & Hubs</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products/solar-panels" className="text-slate-400 hover:text-solar-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-solar-400 transition-colors" />
                  TOPCon Solar Panels
                </Link>
              </li>
              <li>
                <Link to="/products/inverters" className="text-slate-400 hover:text-solar-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-solar-400 transition-colors" />
                  Solar Inverters
                </Link>
              </li>
              <li>
                <Link to="/products/solar-pumps" className="text-slate-400 hover:text-solar-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-solar-400 transition-colors" />
                  Solar Water Pumps
                </Link>
              </li>
              <li>
                <Link to="/products/solar-water-heaters" className="text-slate-400 hover:text-solar-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-solar-400 transition-colors" />
                  Solar Water Heaters
                </Link>
              </li>
              <li>
                <Link to="/government-subsidy" className="text-solar-400 hover:text-solar-300 font-medium transition-colors flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-solar-400" />
                  PM Surya Ghar Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-solar-400 transition-colors flex items-center gap-1 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-solar-400 transition-colors" />
                  Solar FAQs & Payback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Contact & Support</p>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-energy-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Coimbatore Experience Center:</strong>
                  <span>{companyData.offices[0].address}, Coimbatore - {companyData.offices[0].pincode}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Palani Registered Hub:</strong>
                  <span>{companyData.offices[1].address}, Palani - {companyData.offices[1].pincode}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-energy-400 shrink-0" />
                <a href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`} className="text-slate-300 hover:text-white font-medium">
                  {companyData.phones.primary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-solar-400 shrink-0" />
                <a href={`mailto:${companyData.emails.primary}`} className="text-slate-300 hover:text-white">
                  {companyData.emails.primary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400">{companyData.offices[0].workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Energyman Power Technologies (India) Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-200 transition-colors">About Us</Link>
            <Link to="/gallery" className="hover:text-slate-200 transition-colors">Projects Gallery</Link>
            <Link to="/insights" className="hover:text-slate-200 transition-colors">Clean Energy Insights</Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
