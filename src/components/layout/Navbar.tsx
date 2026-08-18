import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Zap,
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowRight,
  Home,
  Building2,
  Factory,
  Tractor,
  Wrench,
  BatteryCharging,
  Cpu,
  Layers,
  FileText,
  HelpCircle,
  Users,
  Image as ImageIcon,
  Sparkles
} from "lucide-react";
import { companyData } from "../../data/company";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      {/* Scroll Progress Energy Line */}
      <div
        className="scroll-energy-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-brand-950/90 backdrop-blur-2xl backdrop-saturate-150 border-b border-slate-800/60 shadow-xl shadow-black/40 py-2.5"
            : "bg-gradient-to-b from-brand-950/95 via-brand-950/60 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between">
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center group focus:outline-none focus:ring-2 focus:ring-energy-500 rounded-xl p-1 transition-transform duration-300 hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Energy Man India Logo" 
                className="h-12 sm:h-14 object-contain"
                onError={(e) => {
                  // Fallback if logo.png is not yet placed by the user
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<span class="font-display font-extrabold text-lg sm:text-xl text-white">ENERGY MAN</span>');
                }}
              />
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2">
              {/* HOME */}
              <Link
                to="/"
                className={`px-2 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all ${
                  location.pathname === "/"
                    ? "text-energy-400 bg-brand-850"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                HOME
              </Link>

              {/* GOVERNMENT SUBSIDY */}
              <Link
                to="/government-subsidy"
                className={`flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all whitespace-nowrap ${
                  location.pathname === "/government-subsidy"
                    ? "text-solar-400 bg-solar-500/10 border border-solar-500/30"
                    : "text-slate-200 hover:text-solar-400 hover:bg-slate-800/60"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-solar-400" />
                <span>GOVERNMENT SUBSIDY</span>
              </Link>

              {/* PROJECTS Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("projects")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown("projects")}
                  className={`flex items-center gap-1 px-2 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all ${
                    location.pathname.startsWith("/projects")
                      ? "text-energy-400 bg-brand-850"
                      : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                  }`}
                  aria-expanded={activeDropdown === "projects"}
                >
                  <span>PROJECTS</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "projects" ? "rotate-180 text-energy-400" : "text-slate-400"}`} />
                </button>

                {activeDropdown === "projects" && (
                  <div className="absolute top-full left-0 w-64 pt-2 animate-fade-in z-50">
                    <div className="bg-brand-900/95 backdrop-blur-xl border border-slate-700/80 rounded-xl p-2 shadow-2xl shadow-black/80 space-y-1">
                      <Link to="/projects" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-brand-800">
                        All Projects
                      </Link>
                      <Link to="/projects/industrial" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-brand-800">
                        Industrial Solar Projects
                      </Link>
                      <Link to="/projects/agricultural" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-brand-800">
                        Agricultural Solar Solutions
                      </Link>
                      <Link to="/projects/commercial" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-brand-800">
                        Commercial Projects
                      </Link>
                      <Link to="/projects/residential" className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-brand-800">
                        Residential Solar Solutions
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* PRODUCT Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("products")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown("products")}
                  className={`flex items-center gap-1 px-2 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all ${
                    location.pathname.startsWith("/products")
                      ? "text-energy-400 bg-brand-850"
                      : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                  }`}
                  aria-expanded={activeDropdown === "products"}
                >
                  <span>PRODUCT</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-energy-400" : "text-slate-400"}`} />
                </button>

                {activeDropdown === "products" && (
                  <div className="absolute top-full left-0 w-64 pt-2 animate-fade-in z-50">
                    <div className="bg-brand-900/95 backdrop-blur-xl border border-slate-700/80 rounded-xl p-2 shadow-2xl shadow-black/80 space-y-1">
                      <Link to="/products/solar-pumps" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-brand-800">
                        <Tractor className="w-4 h-4 text-emerald-400" />
                        <span>SOLAR PUMP</span>
                      </Link>
                      <Link to="/products/solar-water-heaters" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-brand-800">
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>SOLAR WATER HEATER</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* BLOG */}
              <Link
                to="/insights"
                className={`px-2 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all ${
                  location.pathname.startsWith("/insights")
                    ? "text-energy-400 bg-brand-850"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                BLOG
              </Link>

              {/* GALLERY */}
              <Link
                to="/gallery"
                className={`px-2 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all ${
                  location.pathname === "/gallery"
                    ? "text-energy-400 bg-brand-850"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                GALLERY
              </Link>

              {/* CONTACT */}
              <Link
                to="/contact"
                className={`px-2 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all ${
                  location.pathname === "/contact"
                    ? "text-energy-400 bg-brand-850"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                CONTACT
              </Link>
            </nav>

            {/* DESKTOP RIGHT ACTIONS */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <a
                href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`}
                className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-2 xl:px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 transition-colors whitespace-nowrap"
                title="Call Sales & Support"
              >
                <Phone className="w-3.5 h-3.5 text-energy-400" />
                <span>{companyData.phones.primary}</span>
              </a>

              <Link
                to="/get-a-quote"
                className="btn-primary py-2.5 px-4 xl:px-5 text-xs sm:text-sm font-bold shadow-lg group whitespace-nowrap"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/get-a-quote"
                className="btn-primary py-2 px-3 text-xs font-bold"
              >
                <span>Get Quote</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-brand-850 border border-slate-700 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-energy-500"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[68px] z-40 bg-brand-950/95 backdrop-blur-xl lg:hidden overflow-y-auto border-t border-slate-800 animate-fade-in p-5 pb-24">
          <div className="space-y-4">
            {/* Direct Contact Bar */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-brand-900 border border-slate-800 text-xs">
              <a href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-energy-400 font-semibold">
                <Phone className="w-4 h-4" />
                <span>{companyData.phones.primary}</span>
              </a>
              <a href={companyData.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="text-solar-400 font-semibold">
                WhatsApp Chat →
              </a>
            </div>

            {/* Menu Links */}
            <div className="space-y-1">
              <Link to="/" className="block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-slate-200 hover:text-white hover:bg-brand-850">
                HOME
              </Link>
              
              <Link to="/government-subsidy" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-solar-400 bg-solar-500/10">
                <Sparkles className="w-4 h-4 text-solar-400" />
                <span>GOVERNMENT SUBSIDY</span>
              </Link>

              <div className="pt-2 pb-1 px-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">PROJECTS</p>
              </div>
              <Link to="/projects/industrial" className="block px-3 py-2 ml-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-850">
                Industrial Projects
              </Link>
              <Link to="/projects/agricultural" className="block px-3 py-2 ml-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-850">
                Agricultural Solutions
              </Link>
              <Link to="/projects/commercial" className="block px-3 py-2 ml-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-850">
                Commercial Projects
              </Link>
              <Link to="/projects/residential" className="block px-3 py-2 ml-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-850">
                Residential Solutions
              </Link>

              <div className="pt-2 pb-1 px-3 border-t border-slate-800/80 mt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">PRODUCT</p>
              </div>
              <Link to="/products/solar-pumps" className="flex items-center gap-2 px-3 py-2 ml-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-850">
                <Tractor className="w-4 h-4 text-emerald-400" />
                <span>SOLAR PUMP</span>
              </Link>
              <Link to="/products/solar-water-heaters" className="flex items-center gap-2 px-3 py-2 ml-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-850">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>SOLAR WATER HEATER</span>
              </Link>

              <div className="pt-2 border-t border-slate-800/80 mt-2">
                <Link to="/insights" className="block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-slate-200 hover:text-white hover:bg-brand-850">
                  BLOG
                </Link>
                <Link to="/gallery" className="block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-slate-200 hover:text-white hover:bg-brand-850">
                  GALLERY
                </Link>
                <Link to="/contact" className="block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-slate-200 hover:text-white hover:bg-brand-850">
                  CONTACT
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/get-a-quote" className="btn-primary w-full py-3.5 font-bold text-center">
                Get Your Custom Solar Plan →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
