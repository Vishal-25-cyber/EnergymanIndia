import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { companyData } from "../../data/company";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0E] text-slate-200 border-t border-red-950/60 relative overflow-hidden mt-0">

      <div className="site-container py-10 lg:py-12 relative z-10 space-y-8">

        {/* ── 4 NAVIGATION COLUMNS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">

          {/* Column 1: Solar Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-red-400 font-mono">
              SOLAR SOLUTIONS
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Residential Rooftop Solar", path: "/solutions/residential" },
                { name: "Industrial Solar Plants", path: "/solutions/industrial" },
                { name: "Agricultural Solar Pumps", path: "/solutions/agricultural" },
                { name: "Energy Storage Systems (BESS)", path: "/solutions/energy-storage" },
                { name: "Solar Water Heaters", path: "/products/solar-water-heaters" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-slate-300 hover:text-red-400 transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-red-400 font-mono">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Government Subsidy Guide", path: "/government-subsidy" },
                { name: "Commissioned Project Sites", path: "/projects" },
                { name: "Hardware & Products Catalogue", path: "/products" },
                { name: "Client Sites Gallery", path: "/gallery" },
                { name: "Company Insights & News", path: "/insights" },
                { name: "Contact Engineering Desk", path: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-slate-300 hover:text-red-400 transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Head Office & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-red-400 font-mono">
              HEAD OFFICE &amp; CONTACT
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">119, Gopal Layout, Ponnaiahrajapuram, Near Gandhi Park, Coimbatore - 641001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+917092510004" className="font-bold text-white font-mono hover:text-red-400 transition-colors">
                  +91 70925 10004
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <a href="mailto:info@energymanindia.in" className="font-mono hover:text-white transition-colors">
                  info@energymanindia.in
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>MNRE Approved Subsidy Vendor</span>
              </div>
            </div>
          </div>

          {/* Column 4: Connect With Us */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-red-400 font-mono">
              CONNECT WITH US
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Follow us on social media for updates, project showcases, and energy insights.
            </p>
            <div className="flex flex-wrap items-center gap-2">

                {/* Facebook */}
                <a href={companyData.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-900 border border-[#1877F2]/30 hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all cursor-pointer"
                  title="Facebook" aria-label="Facebook">
                  <svg className="w-3.5 h-3.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href={companyData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-900 border border-[#0A66C2]/30 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all cursor-pointer"
                  title="LinkedIn" aria-label="LinkedIn">
                  <svg className="w-3.5 h-3.5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a href={companyData.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-900 border border-[#FF0000]/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all cursor-pointer"
                  title="YouTube" aria-label="YouTube">
                  <svg className="w-3.5 h-3.5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href={companyData.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-900 border border-[#E4405F]/30 hover:border-[#E4405F] hover:bg-[#E4405F]/10 transition-all cursor-pointer"
                  title="Instagram" aria-label="Instagram">
                  <svg className="w-3.5 h-3.5 text-[#E4405F]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a href={companyData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-900 border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all cursor-pointer"
                  title="WhatsApp" aria-label="WhatsApp">
                  <svg className="w-3.5 h-3.5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>

            </div>
          </div>

        </div>

        {/* ── BOTTOM: FULLY CENTERED COPYRIGHT ── */}
        <div className="pt-6 border-t border-red-950/60 text-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()}&nbsp;
            <strong className="text-slate-300">Energyman Power Technologies (India) Private Limited</strong>.
            &nbsp;All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
