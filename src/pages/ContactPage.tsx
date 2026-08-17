import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2
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
    <>
      <SEOHead
        title="Contact Energy Man India - Offices in Coimbatore & Palani"
        description="Get in touch with Energyman Power Technologies (India) Pvt. Ltd. Contact our Coimbatore Experience Center or Palani Engineering Hub for solar inquiries."
      />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-950 via-brand-900/60 to-brand-950 border-b border-slate-800">
        <div className="site-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Engineering Consultation</span>
          </div>
          <h1 className="heading-hero text-white">
            LET'S BUILD YOUR <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">ENERGY FUTURE</span>
          </h1>
          <p className="text-subtle">
            Reach out to our solar engineering centers in Coimbatore and Palani. We provide complimentary on-site feasibility studies and customized generation proposals.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="section-padding bg-brand-950">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Office Locations & Channels (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-energy-400">Our Offices & Hubs</span>
                <h2 className="text-2xl font-bold text-white">Visit or Call Our Engineering Desks</h2>
              </div>

              {/* Office Cards */}
              <div className="space-y-4">
                {companyData.offices.map((office, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-brand-900/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-bold text-white">{office.city}</h3>
                      <span className="badge-emerald text-[10px]">{office.type}</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
                        <span>{office.address}, {office.city} - {office.pincode}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-energy-400 shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="text-slate-200 hover:text-white font-medium">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-slate-200 hover:text-white">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-slate-400">{office.workingHours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct WhatsApp Box */}
              <div className="p-6 rounded-3xl bg-solar-500/10 border border-solar-500/30 space-y-3">
                <h4 className="text-sm font-bold text-white">Instant WhatsApp Consultation</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have a quick question about PM Surya Ghar subsidies or solar water pumps? Chat directly with our technical support team.
                </p>
                <a
                  href={companyData.socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-solar py-2.5 px-5 text-xs font-bold inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Start WhatsApp Chat →</span>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Inquiry Form (7 Cols) */}
            <div className="lg:col-span-7 bg-brand-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Send Us an Engineering Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fill in your details below and our team will get back to you with a complimentary solar site audit plan.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-energy-500/15 border border-energy-500 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-energy-500/20 text-energy-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Thank you, <strong className="text-white">{formData.name}</strong>. An Energy Man India representative will contact you at <strong className="text-white">{formData.phone}</strong> within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        location: "",
                        propertyType: "Residential Home",
                        monthlyBill: "",
                        solution: "Rooftop Solar with Net Metering",
                        message: ""
                      });
                    }}
                    className="btn-secondary py-2 px-5 text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 94433 12890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. anand@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">City / District *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Coimbatore, Palani, Salem"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Property Classification</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      >
                        <option value="Residential Home">Residential Home / Villa</option>
                        <option value="Commercial Complex">Commercial Complex / Office</option>
                        <option value="Industrial Factory">Industrial Manufacturing Factory</option>
                        <option value="Agricultural Farm">Agricultural Farm / Irrigation</option>
                        <option value="Institutional / Hospital">Hospital / College Campus</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Monthly Electricity Bill (₹)</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹5,000 / month"
                        value={formData.monthlyBill}
                        onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Interested Solution</label>
                      <select
                        value={formData.solution}
                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      >
                        <option value="Rooftop Solar with Net Metering">Rooftop Solar with Net Metering (PM Surya Ghar)</option>
                        <option value="Commercial Solar & Tax Depreciation">Commercial Solar & 40% Tax Depreciation</option>
                        <option value="Industrial MW-Scale Captive Plant">Industrial MW-Scale Captive Power Plant</option>
                        <option value="Agricultural Solar Water Pump">Agricultural Solar Water Pump (PM-KUSUM)</option>
                        <option value="Energy Storage BESS">Battery Energy Storage Systems (BESS)</option>
                        <option value="Solar Water Heater">Solar Water Heater (ETC / FPC)</option>
                      </select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Your Message / Questions</label>
                      <textarea
                        rows={3}
                        placeholder="Please tell us about your roof area, sanctioned load, or specific timelines..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-850 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-energy-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 font-bold text-sm justify-center inline-flex items-center gap-2 mt-4"
                  >
                    <span>{isSubmitting ? "Sending Your Enquiry..." : "Send Enquiry →"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
