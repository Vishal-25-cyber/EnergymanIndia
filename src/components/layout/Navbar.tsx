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
    };

    window.addEventListener("scroll", handleScroll);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/30 py-3"
            : "bg-gradient-to-b from-brand-950/90 via-brand-950/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between">
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-energy-500 rounded-xl p-1">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-brand-900 to-brand-850 border border-slate-700/80 flex items-center justify-center shadow-lg shadow-black/50 group-hover:border-energy-500/50 transition-all duration-300">
                <Sun className="w-6 h-6 text-solar-400 animate-spin-slow transition-transform group-hover:scale-110" />
                <Zap className="w-3.5 h-3.5 text-energy-400 absolute bottom-1.5 right-1.5 fill-energy-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-energy-400 transition-colors">
                    ENERGY MAN
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-solar-500/20 text-solar-400 border border-solar-500/30 tracking-wider">
                    INDIA
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide">
                  Renewable Energy Saves Earth
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Solutions Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("solutions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown("solutions")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname.startsWith("/solutions")
                      ? "text-energy-400 bg-brand-850"
                      : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                  }`}
                  aria-expanded={activeDropdown === "solutions"}
                >
                  <span>Solutions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180 text-energy-400" : "text-slate-400"}`} />
                </button>

                {activeDropdown === "solutions" && (
                  <div className="absolute top-full left-0 w-[580px] -ml-24 pt-2 animate-fade-in z-50">
                    <div className="bg-brand-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 shadow-2xl shadow-black/80 grid grid-cols-2 gap-2">
                      <Link
                        to="/solutions/residential"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-800/80 border border-transparent hover:border-slate-700 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-energy-500/10 text-energy-400 border border-energy-500/20 group-hover:bg-energy-500 group-hover:text-brand-950 transition-colors">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-energy-400 transition-colors">Residential Solar</p>
                          <p className="text-xs text-slate-400 line-clamp-1">Rooftop net metering & PM Surya Ghar ₹78k subsidy</p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/commercial"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-800/80 border border-transparent hover:border-slate-700 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-solar-500/10 text-solar-400 border border-solar-500/20 group-hover:bg-solar-500 group-hover:text-brand-950 transition-colors">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-solar-400 transition-colors">Commercial Solar</p>
                          <p className="text-xs text-slate-400 line-clamp-1">Office towers, institutions & 40% depreciation</p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/industrial"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-800/80 border border-transparent hover:border-slate-700 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-brand-950 transition-colors">
                          <Factory className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Industrial Solar</p>
                          <p className="text-xs text-slate-400 line-clamp-1">MW-scale captive plants & spinning mill EPC</p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/agricultural"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-800/80 border border-transparent hover:border-slate-700 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-brand-950 transition-colors">
                          <Tractor className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">Agricultural Solar</p>
                          <p className="text-xs text-slate-400 line-clamp-1">PM-KUSUM 60% subsidy pumps & farm microgrids</p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/epc-maintenance"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-800/80 border border-transparent hover:border-slate-700 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-brand-950 transition-colors">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">Solar EPC & O&M</p>
                          <p className="text-xs text-slate-400 line-clamp-1">Turnkey plant execution & lifetime SCADA O&M</p>
                        </div>
                      </Link>

                      <Link
                        to="/solutions/energy-storage"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-800/80 border border-transparent hover:border-slate-700 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-brand-950 transition-colors">
                          <BatteryCharging className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">Energy Storage (BESS)</p>
                          <p className="text-xs text-slate-400 line-clamp-1">LiFePO4 battery banks & peak shaving</p>
                        </div>
                      </Link>

                      <div className="col-span-2 pt-2 border-t border-slate-800 flex items-center justify-between px-2 text-xs">
                        <span className="text-slate-400">Need customized solar engineering?</span>
                        <Link to="/solutions" className="text-energy-400 font-semibold hover:underline flex items-center gap-1">
                          View All Solutions <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("products")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown("products")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname.startsWith("/products")
                      ? "text-energy-400 bg-brand-850"
                      : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                  }`}
                  aria-expanded={activeDropdown === "products"}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-energy-400" : "text-slate-400"}`} />
                </button>

                {activeDropdown === "products" && (
                  <div className="absolute top-full left-0 w-[520px] -ml-20 pt-2 animate-fade-in z-50">
                    <div className="bg-brand-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 shadow-2xl shadow-black/80 grid grid-cols-2 gap-2">
                      <Link to="/products/solar-panels" className="p-3 rounded-xl hover:bg-brand-850 border border-transparent hover:border-slate-700 transition-all group">
                        <div className="flex items-center gap-2 mb-1">
                          <Cpu className="w-4 h-4 text-energy-400" />
                          <p className="text-sm font-semibold text-white group-hover:text-energy-400">Solar Panels</p>
                        </div>
                        <p className="text-xs text-slate-400">N-Type TOPCon Bi-facial & Mono PERC modules (585W+)</p>
                      </Link>

                      <Link to="/products/inverters" className="p-3 rounded-xl hover:bg-brand-850 border border-transparent hover:border-slate-700 transition-all group">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-solar-400" />
                          <p className="text-sm font-semibold text-white group-hover:text-solar-400">Solar Inverters</p>
                        </div>
                        <p className="text-xs text-slate-400">On-Grid, Hybrid & Micro-inverters with 98.8% efficiency</p>
                      </Link>

                      <Link to="/products/solar-pumps" className="p-3 rounded-xl hover:bg-brand-850 border border-transparent hover:border-slate-700 transition-all group">
                        <div className="flex items-center gap-2 mb-1">
                          <Tractor className="w-4 h-4 text-emerald-400" />
                          <p className="text-sm font-semibold text-white group-hover:text-emerald-400">Solar Pumps</p>
                        </div>
                        <p className="text-xs text-slate-400">SS Submersible & Surface Pumps (3HP to 15HP) with MPPT VFD</p>
                      </Link>

                      <Link to="/products/solar-water-heaters" className="p-3 rounded-xl hover:bg-brand-850 border border-transparent hover:border-slate-700 transition-all group">
                        <div className="flex items-center gap-2 mb-1">
                          <Sun className="w-4 h-4 text-amber-400" />
                          <p className="text-sm font-semibold text-white group-hover:text-amber-400">Solar Water Heaters</p>
                        </div>
                        <p className="text-xs text-slate-400">ETC & FPC high-retention domestic & industrial thermal</p>
                      </Link>

                      <Link to="/products/energy-storage" className="p-3 rounded-xl hover:bg-brand-850 border border-transparent hover:border-slate-700 transition-all group">
                        <div className="flex items-center gap-2 mb-1">
                          <BatteryCharging className="w-4 h-4 text-cyan-400" />
                          <p className="text-sm font-semibold text-white group-hover:text-cyan-400">Energy Storage</p>
                        </div>
                        <p className="text-xs text-slate-400">LiFePO4 modular rack batteries (6,000+ cycle life)</p>
                      </Link>

                      <Link to="/products/other" className="p-3 rounded-xl hover:bg-brand-850 border border-transparent hover:border-slate-700 transition-all group">
                        <div className="flex items-center gap-2 mb-1">
                          <Layers className="w-4 h-4 text-slate-300" />
                          <p className="text-sm font-semibold text-white group-hover:text-slate-300">Other Solar Products</p>
                        </div>
                        <p className="text-xs text-slate-400">Solar street lights, HDG structures & DC combiner boxes</p>
                      </Link>

                      <div className="col-span-2 pt-2 border-t border-slate-800 flex items-center justify-between px-2 text-xs">
                        <span className="text-slate-400">Engineering Hardware Catalogue</span>
                        <Link to="/products" className="text-energy-400 font-semibold hover:underline flex items-center gap-1">
                          Browse All Products <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Projects Link */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("projects")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown("projects")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname.startsWith("/projects")
                      ? "text-energy-400 bg-brand-850"
                      : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                  }`}
                  aria-expanded={activeDropdown === "projects"}
                >
                  <span>Projects</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "projects" ? "rotate-180 text-energy-400" : "text-slate-400"}`} />
                </button>

                {activeDropdown === "projects" && (
                  <div className="absolute top-full left-0 w-64 pt-2 animate-fade-in z-50">
                    <div className="bg-brand-900/95 backdrop-blur-xl border border-slate-700/80 rounded-xl p-2 shadow-2xl shadow-black/80 space-y-1">
                      <Link to="/projects" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        All Projects
                      </Link>
                      <Link to="/projects/industrial" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        Industrial Solar Projects
                      </Link>
                      <Link to="/projects/agricultural" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        Agricultural Solar Solutions
                      </Link>
                      <Link to="/projects/commercial" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        Commercial Projects
                      </Link>
                      <Link to="/projects/residential" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        Residential Solar Solutions
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Government Subsidy Highlight */}
              <Link
                to="/government-subsidy"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === "/government-subsidy"
                    ? "text-solar-400 bg-solar-500/10 border border-solar-500/30"
                    : "text-slate-200 hover:text-solar-400 hover:bg-slate-800/60"
                }`}
              >
                <Sparkles className="w-4 h-4 text-solar-400" />
                <span>Government Subsidy</span>
              </Link>

              {/* Insights */}
              <Link
                to="/insights"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname.startsWith("/insights")
                    ? "text-energy-400 bg-brand-850"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                Insights
              </Link>

              {/* Company Links (About / Gallery / FAQ) */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("company")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown("company")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    ["/about", "/gallery", "/testimonials", "/faq"].includes(location.pathname)
                      ? "text-energy-400 bg-brand-850"
                      : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                  }`}
                  aria-expanded={activeDropdown === "company"}
                >
                  <span>Company</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180 text-energy-400" : "text-slate-400"}`} />
                </button>

                {activeDropdown === "company" && (
                  <div className="absolute top-full right-0 w-60 pt-2 animate-fade-in z-50">
                    <div className="bg-brand-900/95 backdrop-blur-xl border border-slate-700/80 rounded-xl p-2 shadow-2xl shadow-black/80 space-y-1">
                      <Link to="/about" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        <Users className="w-4 h-4 text-energy-400" />
                        <span>About Energy Man</span>
                      </Link>
                      <Link to="/gallery" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        <ImageIcon className="w-4 h-4 text-solar-400" />
                        <span>Project Gallery</span>
                      </Link>
                      <Link to="/testimonials" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span>Customer Testimonials</span>
                      </Link>
                      <Link to="/faq" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-brand-800">
                        <HelpCircle className="w-4 h-4 text-purple-400" />
                        <span>Knowledge & FAQs</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === "/contact"
                    ? "text-energy-400 bg-brand-850"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* DESKTOP RIGHT ACTIONS */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 transition-colors"
                title="Call Sales & Support"
              >
                <Phone className="w-3.5 h-3.5 text-energy-400" />
                <span>{companyData.phones.primary}</span>
              </a>

              <Link
                to="/get-a-quote"
                className="btn-primary py-2.5 px-5 text-xs sm:text-sm font-bold shadow-lg group"
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

            {/* Solutions Accordion */}
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">Solar Solutions</p>
              <Link to="/solutions/residential" className="flex items-center gap-3 p-2.5 rounded-lg text-slate-200 hover:bg-brand-850">
                <Home className="w-4 h-4 text-energy-400" />
                <span>Residential Solar (PM Surya Ghar)</span>
              </Link>
              <Link to="/solutions/commercial" className="flex items-center gap-3 p-2.5 rounded-lg text-slate-200 hover:bg-brand-850">
                <Building2 className="w-4 h-4 text-solar-400" />
                <span>Commercial Solar Systems</span>
              </Link>
              <Link to="/solutions/industrial" className="flex items-center gap-3 p-2.5 rounded-lg text-slate-200 hover:bg-brand-850">
                <Factory className="w-4 h-4 text-blue-400" />
                <span>Industrial & MW-Scale Captive</span>
              </Link>
              <Link to="/solutions/agricultural" className="flex items-center gap-3 p-2.5 rounded-lg text-slate-200 hover:bg-brand-850">
                <Tractor className="w-4 h-4 text-emerald-400" />
                <span>Agricultural Solar Pumps (PM-KUSUM)</span>
              </Link>
              <Link to="/solutions/epc-maintenance" className="flex items-center gap-3 p-2.5 rounded-lg text-slate-200 hover:bg-brand-850">
                <Wrench className="w-4 h-4 text-purple-400" />
                <span>Solar EPC & Lifetime O&M</span>
              </Link>
              <Link to="/solutions/energy-storage" className="flex items-center gap-3 p-2.5 rounded-lg text-slate-200 hover:bg-brand-850">
                <BatteryCharging className="w-4 h-4 text-amber-400" />
                <span>Energy Storage (BESS)</span>
              </Link>
            </div>

            {/* Products Accordion */}
            <div className="space-y-1 pt-2 border-t border-slate-800/80">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">Solar Products</p>
              <Link to="/products/solar-panels" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Solar Panels (TOPCon & Mono PERC)
              </Link>
              <Link to="/products/inverters" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Solar Inverters (On-Grid & Hybrid)
              </Link>
              <Link to="/products/solar-pumps" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Solar Submersible & Surface Pumps
              </Link>
              <Link to="/products/solar-water-heaters" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Solar Water Heaters (ETC & FPC)
              </Link>
              <Link to="/products/energy-storage" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                LiFePO4 Energy Storage Racks
              </Link>
              <Link to="/products/other" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Solar Lighting & Mounting Systems
              </Link>
            </div>

            {/* General Navigation */}
            <div className="space-y-1 pt-2 border-t border-slate-800/80">
              <Link to="/government-subsidy" className="flex items-center gap-2 p-2.5 rounded-lg text-solar-400 font-semibold bg-solar-500/10">
                <Sparkles className="w-4 h-4" />
                <span>Government Subsidy Hub</span>
              </Link>
              <Link to="/projects" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Projects Portfolio
              </Link>
              <Link to="/gallery" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Project Gallery
              </Link>
              <Link to="/insights" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Insights & Blog
              </Link>
              <Link to="/about" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                About Energy Man India
              </Link>
              <Link to="/testimonials" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Customer Testimonials
              </Link>
              <Link to="/faq" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                FAQs & Support
              </Link>
              <Link to="/contact" className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-brand-850">
                Contact Us
              </Link>
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
