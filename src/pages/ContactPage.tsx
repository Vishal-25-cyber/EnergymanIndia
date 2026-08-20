import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
  Calculator,
  ArrowRight,
  Send
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { companyData } from "../data/company";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    propertyType: "Residential Home",
    monthlyBill: "",
    solution: "Rooftop Solar with Net Metering",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Contact ENERGYMAN - Coimbatore & Palani Solar Engineering"
        description="Reduce Your Energy Bills & Go Green — Get a Free Solar Quote! Contact Energyman Power Technologies (India) Pvt. Ltd. at 119, Gopal Layout, Coimbatore."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>DIRECT ENGINEERING CONSULTATION</span>
          </div>
          <h1 className="heading-hero text-white">
            REDUCE YOUR ENERGY BILLS & <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">GO GREEN</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Get a free solar quote from Energyman Power Technologies (India) Pvt. Ltd. — approved MNRE subsidy partner.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="section-padding bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Large Contact Statement & Offices (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 font-mono">
                  ONE-STOP SOLAR SOLUTIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Let&apos;s Build Your Clean Energy Future.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Headquartered in Coimbatore with regional hubs in Palani, we provide complimentary on-site feasibility studies, 3D PVSyst generation modeling, and turnkey PM Surya Ghar subsidy coordination.
                </p>
              </div>

              {/* Office Cards from Source */}
              <div className="space-y-4 pt-2">
                {companyData.offices.map((office, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#14101A]/95 border border-red-900/30 space-y-3 hover:border-red-500/50 transition-colors shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-white">{office.city}</h3>
                      <span className="badge-crimson text-[10px] font-bold px-2.5 py-0.5 rounded-full">{office.type}</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-200">{office.address}, {office.city} - {office.pincode}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="text-slate-200 hover:text-white font-bold transition-colors font-mono">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-slate-200 hover:text-white font-medium transition-colors font-mono">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{office.workingHours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Channels */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-red-950/60 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase font-mono block">
                  Official Channels
                </span>
                <div className="flex flex-wrap items-center gap-2">
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
                      className="px-3 py-1.5 rounded-xl bg-black/60 border border-red-950/60 text-slate-300 hover:text-white hover:border-red-500/50 transition-all text-xs font-bold"
                    >
                      {soc.name}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: Premium Quote Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#14101A]/95 border border-red-900/40 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
                
                <div className="space-y-1 pb-4 border-b border-red-950/60">
                  <span className="badge-crimson text-xs font-bold">
                    FAST RESPONSE SLA
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Request a Free Solar Quote
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fill in your details below and an Energyman solar engineer will contact you within 2 hours.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="p-8 rounded-2xl bg-slate-900/90 border border-emerald-500/50 text-center space-y-3 animate-fade-in">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-lg font-black text-white">Quote Request Received!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Thank you! Our engineering team in Coimbatore will review your requirements and reach out to <strong className="text-white">{formData.phone || formData.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-primary py-2 px-5 text-xs font-bold mt-2"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Mr. K. Palanisamy"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98422 xxxxx"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-medium font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">City / District (Tamil Nadu) *</label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Coimbatore, Tirupur, Palani"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Sector / Property Type</label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-medium cursor-pointer"
                        >
                          <option value="Residential Home">Residential Rooftop (Home / Villa)</option>
                          <option value="Industrial Factory">Industrial Spinning Mill / Factory</option>
                          <option value="Commercial Complex">Commercial Building / Hospital / Hotel</option>
                          <option value="Agricultural Farm">Agricultural Farm (PM-KUSUM Solar Pump)</option>
                          <option value="Solar Water Heater">Solar Water Heater (Domestic / Industrial)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Monthly Electricity Bill (Approx)</label>
                        <input
                          type="text"
                          value={formData.monthlyBill}
                          onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                          placeholder="e.g. ₹4,500 or ₹1.5 Lakhs"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-medium font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Project Details / Roof Area</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your rooftop area, existing connected load, or specific solar requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-medium resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-4 text-xs sm:text-sm font-black tracking-wider uppercase inline-flex items-center justify-center gap-2 rounded-xl shadow-lg mt-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>GET A FREE SOLAR QUOTE</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
