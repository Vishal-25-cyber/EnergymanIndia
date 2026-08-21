"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Sun,
  Home as HomeIcon,
  Building2,
  Factory,
  Tractor,
  BatteryCharging,
  Droplets,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { BrandLogo } from "../common/BrandLogo";
import { companyData } from "../../data/company";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname() ?? "";
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and dropdowns when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleDropdown = (menuName: string) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* MAIN NAVIGATION BAR */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-[#0A0A0E]/95 backdrop-blur-xl border-b border-red-900/30 shadow-lg shadow-black/50 py-3"
              : "bg-[#0A0A0E]/85 backdrop-blur-md border-b border-red-950/40 shadow-xs py-3.5"
          }`}
        >
          {/* Wide-screen anchored container */}
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1700px] mx-auto">
            <div className="flex items-center justify-between gap-6">
              
              {/* LEFT: BRAND LOGO */}
              <Link
                href="/"
                className="flex items-center shrink-0 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-0.5"
                title="ENERGYMAN - Renewable Energy Saves Earth"
              >
                <BrandLogo size="md" />
              </Link>

              {/* RIGHT: DESKTOP NAVIGATION LINKS (INCLUDING HOME PAGE) */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                
                {/* Home */}
                <Link
                  href="/"
                  prefetch={true}
                  className={`text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 ${
                    pathname === "/"
                      ? "text-red-500 font-bold"
                      : "text-slate-200 hover:text-red-400"
                  }`}
                >
                  Home
                </Link>

                {/* Government Subsidy */}
                <Link
                  href="/government-subsidy"
                  prefetch={true}
                  className={`text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 ${
                    pathname === "/government-subsidy"
                      ? "text-red-500 font-bold"
                      : "text-slate-200 hover:text-red-400"
                  }`}
                >
                  Government Subsidy
                </Link>

                {/* Projects (Dropdown) */}
                <div
                  className="relative group py-2"
                  onMouseEnter={() => handleMouseEnter("projects")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/projects"
                    prefetch={true}
                    className={`flex items-center gap-1.5 text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 cursor-pointer ${
                      pathname.startsWith("/projects")
                        ? "text-red-500 font-bold"
                        : "text-slate-200 hover:text-red-400"
                    }`}
                  >
                    <span>Projects</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 ${
                        activeDropdown === "projects" ? "rotate-180 text-red-500" : ""
                      }`}
                    />
                  </Link>

                  {/* Projects Mega Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 pt-2 w-80 z-50 transition-all duration-200 ${
                      activeDropdown === "projects"
                        ? "visible opacity-100 pointer-events-auto"
                        : "invisible opacity-0 group-hover:visible group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    }`}
                  >
                    <div className="rounded-2xl bg-[#14101A]/95 backdrop-blur-2xl border border-red-900/40 p-3 shadow-2xl shadow-black/80">
                      <div className="space-y-1">
                        <Link
                          href="/projects/industrial"
                          prefetch={true}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-red-400 hover:bg-slate-900/90 transition-colors"
                        >
                          <Factory className="w-4 h-4 text-red-400 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-100">Our Industrial Solar Projects</p>
                            <p className="text-[11px] text-slate-400 font-normal">Textile mills & captive MW rooftop systems</p>
                          </div>
                        </Link>

                        <Link
                          href="/projects/commercial"
                          prefetch={true}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-red-400 hover:bg-slate-900/90 transition-colors"
                        >
                          <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-100">Our Commercial Solar Projects</p>
                            <p className="text-[11px] text-slate-400 font-normal">Export units & commercial rooftops</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product (Dropdown) */}
                <div
                  className="relative group py-2"
                  onMouseEnter={() => handleMouseEnter("product")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/products"
                    prefetch={true}
                    className={`flex items-center gap-1.5 text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 cursor-pointer ${
                      pathname.startsWith("/products")
                        ? "text-red-500 font-bold"
                        : "text-slate-200 hover:text-red-400"
                    }`}
                  >
                    <span>Product</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 ${
                        activeDropdown === "product" ? "rotate-180 text-red-500" : ""
                      }`}
                    />
                  </Link>

                  {/* Product Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 pt-2 w-72 z-50 transition-all duration-200 ${
                      activeDropdown === "product"
                        ? "visible opacity-100 pointer-events-auto"
                        : "invisible opacity-0 group-hover:visible group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    }`}
                  >
                    <div className="rounded-2xl bg-[#14101A]/95 backdrop-blur-2xl border border-red-900/40 p-3 shadow-2xl shadow-black/80">
                      <div className="space-y-1">
                        <Link
                          href="/products/solar-pumps"
                          prefetch={true}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-red-400 hover:bg-slate-900/90 transition-colors"
                        >
                          <Droplets className="w-4 h-4 text-rose-400 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-100">Solar Pump</p>
                            <p className="text-[11px] text-slate-400">PM-KUSUM Submersible & Surface</p>
                          </div>
                        </Link>

                        <Link
                          href="/products/solar-water-heaters"
                          prefetch={true}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-red-400 hover:bg-slate-900/90 transition-colors"
                        >
                          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-100">Solar Water Heater</p>
                            <p className="text-[11px] text-slate-400">110L - 330L Domestic & Industrial</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog */}
                <Link
                  href="/insights"
                  prefetch={true}
                  className={`text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 ${
                    pathname.startsWith("/insights")
                      ? "text-red-500 font-bold"
                      : "text-slate-200 hover:text-red-400"
                  }`}
                >
                  Blog
                </Link>

                {/* Gallery */}
                <Link
                  href="/gallery"
                  prefetch={true}
                  className={`text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 ${
                    pathname === "/gallery"
                      ? "text-red-500 font-bold"
                      : "text-slate-200 hover:text-red-400"
                  }`}
                >
                  Gallery
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  prefetch={true}
                  className={`text-[15px] xl:text-[16px] font-semibold transition-colors duration-200 ${
                    pathname === "/contact"
                      ? "text-red-500 font-bold"
                      : "text-slate-200 hover:text-red-400"
                  }`}
                >
                  Contact
                </Link>
              </nav>

              {/* MOBILE MENU TOGGLE */}
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl bg-slate-900 border border-red-950/60 text-slate-200 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[62px] md:top-[68px] z-40 bg-[#0A0A0E]/98 backdrop-blur-2xl lg:hidden overflow-y-auto border-t border-red-950/60 animate-fade-in p-5 pb-24 shadow-2xl">
          <div className="space-y-4 max-w-lg mx-auto">
            {/* Direct Contact Bar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-red-950/60 text-xs">
              <a href={`tel:${companyData.phones.primary.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-red-400 font-bold">
                <Phone className="w-4 h-4 text-red-500" />
                <span>{companyData.phones.primary}</span>
              </a>
              <a href={companyData.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="text-red-400 font-bold hover:underline">
                WhatsApp Chat →
              </a>
            </div>

            {/* Mobile Nav Links with Home */}
            <div className="space-y-1">
              <Link
                href="/"
                prefetch={true}
                className={`block px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                  pathname === "/"
                    ? "bg-red-950/90 text-red-400 border border-red-500/40"
                    : "text-slate-200 hover:bg-slate-900 hover:text-white"
                }`}
              >
                Home
              </Link>

              <Link
                href="/government-subsidy"
                prefetch={true}
                className={`block px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                  pathname === "/government-subsidy"
                    ? "bg-red-950/90 text-red-400 border border-red-500/40"
                    : "text-slate-200 hover:bg-slate-900 hover:text-white"
                }`}
              >
                Government Subsidy
              </Link>

              {/* Projects Mobile Accordion */}
              <div className="pt-1">
                <p className="px-4 py-2 text-xs font-bold font-mono text-red-400 uppercase tracking-wider">
                  Projects
                </p>
                <div className="space-y-1 pl-2">
                  <Link href="/projects/industrial" prefetch={true} className="block px-4 py-2 text-sm text-slate-300 hover:text-white">
                    • Our Industrial Solar Projects
                  </Link>
                  <Link href="/projects/commercial" prefetch={true} className="block px-4 py-2 text-sm text-slate-300 hover:text-white">
                    • Our Commercial Solar Projects
                  </Link>
                </div>
              </div>

              {/* Product Mobile Accordion */}
              <div className="pt-2">
                <p className="px-4 py-2 text-xs font-bold font-mono text-red-400 uppercase tracking-wider">
                  Product
                </p>
                <div className="space-y-1 pl-2">
                  <Link href="/products/solar-pumps" prefetch={true} className="block px-4 py-2 text-sm text-slate-300 hover:text-white">
                    • Solar Pump
                  </Link>
                  <Link href="/products/solar-water-heaters" prefetch={true} className="block px-4 py-2 text-sm text-slate-300 hover:text-white">
                    • Solar Water Heater
                  </Link>
                </div>
              </div>

              <div className="pt-2 border-t border-red-950/60 mt-2">
                <Link
                  href="/insights"
                  prefetch={true}
                  className="block px-4 py-3 rounded-2xl text-base font-bold text-slate-200 hover:bg-slate-900 hover:text-white"
                >
                  Blog
                </Link>
                <Link
                  href="/gallery"
                  prefetch={true}
                  className="block px-4 py-3 rounded-2xl text-base font-bold text-slate-200 hover:bg-slate-900 hover:text-white"
                >
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="block px-4 py-3 rounded-2xl text-base font-bold text-slate-200 hover:bg-slate-900 hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Address Footer in Mobile Menu */}
            <div className="text-center pt-4 border-t border-red-950/60 text-xs text-slate-400 space-y-1">
              <p className="font-mono text-red-400 font-bold">119, Gopal Layout, Coimbatore</p>
              <p>Approved MNRE Subsidy Partner</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
