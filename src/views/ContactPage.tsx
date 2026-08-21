"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ChevronRight,
  Send,
  Building
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const mailtoLink = `mailto:info@energymanindia.in?subject=Customer Query from ${formData.name}&body=Name: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0A%0AMessage:%0A${formData.message}`;
    window.location.href = mailtoLink;
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen">
      <SEOHead
        title="Contact ENERGYMAN - Solar Engineering Desk | Coimbatore"
        description="Reach Energyman Power Technologies (India) Pvt. Ltd. at 119, Gopal Layout, Coimbatore. Call +91 70925 10004 or email info@energymanindia.in"
      />

      {/* ── Breadcrumb ── */}
      <section className="pt-28 pb-4 bg-[#0A0A0E] border-b border-red-950/60">
        <div className="site-container flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-bold">Contact Us</span>
        </div>
      </section>

      {/* ── Hero Header ── */}
      <section className="pt-10 pb-12 bg-[#0A0A0E] border-b border-red-950/60 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10 space-y-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-950/80 text-rose-300 border border-red-500/40">
            <Building className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Engineering Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] max-w-5xl uppercase">
            REACH US &amp; <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">GET IN TOUCH</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl font-normal">
            Headquartered in Coimbatore. Send us a message or call directly — our engineering team responds within 2 hours.
          </p>
        </div>
      </section>

      {/* ── Main 2-Column Layout ── */}
      <section className="py-16 bg-[#0A0A0E]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* ── LEFT: Contact Details (Cardless Rail) ── */}
            <div className="space-y-10">

              {/* Head Office */}
              <div className="space-y-5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block pb-2 border-b border-red-950/60">
                  REGISTERED HEAD OFFICE
                </span>

                <div className="space-y-4 text-sm font-mono">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-sans font-bold text-sm mb-0.5">Energyman Power Technologies (India) Pvt. Ltd.</strong>
                      <span className="text-slate-400 text-xs leading-relaxed">
                        119, Gopal Layout, Ponnaiahrajapuram,<br />
                        Near Gandhi Park, Coimbatore – 641001,<br />
                        Tamil Nadu, India
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="space-x-2 text-xs">
                      <a href="tel:+917092510004" className="text-white hover:text-red-400 font-bold transition-colors">
                        +91 70925 10004
                      </a>
                      <span className="text-slate-600">/</span>
                      <a href="tel:+919787455554" className="text-white hover:text-red-400 font-bold transition-colors">
                        +91 97874 55554
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                    <a href="mailto:info@energymanindia.in" className="text-slate-300 hover:text-white text-xs transition-colors">
                      info@energymanindia.in
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-400 text-xs">Monday – Saturday: 9:00 AM – 7:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Regional Hub */}
              <div className="space-y-4 pt-4 border-t border-red-950/60">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block pb-2 border-b border-red-950/60">
                  REGIONAL SERVICE HUB — PALANI
                </span>

                <div className="space-y-3 text-sm font-mono">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-slate-400 text-xs leading-relaxed">
                      Dindigul Highway, Palani – 624601, Tamil Nadu
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href="tel:+919787455554" className="text-white hover:text-red-400 font-bold text-xs transition-colors">
                      +91 97874 55554
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Connect */}
              <div className="space-y-3 pt-4 border-t border-red-950/60">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">
                  QUICK CONNECT
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="px-3.5 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-900/80 transition-all cursor-pointer"
                  >
                    WhatsApp Us
                  </button>
                  <button
                    type="button"
                    className="px-3.5 py-2 rounded-lg bg-slate-900 border border-red-950/60 text-slate-300 text-xs font-mono font-bold hover:text-white hover:border-red-500/50 transition-all cursor-pointer"
                  >
                    Send Email Directly
                  </button>
                </div>
              </div>

            </div>

            {/* ── RIGHT: Simple Email Query Form (Cardless) ── */}
            <div className="space-y-6">

              <div className="border-l-4 border-red-600 pl-4 sm:pl-5 space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block">
                  SEND US A MESSAGE
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Have a Query? Write to Us
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Fill in the form below and we'll respond within 2 hours on working days.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-10 space-y-3 text-center font-mono border-t border-red-950/60">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white">Message Sent Successfully!</p>
                  <p className="text-xs text-slate-400">Our team at Coimbatore will reach out to you shortly.</p>
                  <button
                    onClick={() => { setIsSuccess(false); setFormData({ name: "", phone: "", email: "", message: "" }); }}
                    className="btn-primary py-2 px-5 text-xs font-bold mt-2 inline-flex items-center gap-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 pt-2">

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-400 uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mr. K. Palanisamy"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-400 uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98422 xxxxx"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-mono"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Your Message / Query *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your question, requirement, or inquiry here... e.g. I want to know about solar rooftop subsidy for my home in Coimbatore."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 focus:border-red-500 focus:outline-none text-white text-xs font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-xs sm:text-sm font-black tracking-wider uppercase inline-flex items-center justify-center gap-2 rounded-xl cursor-pointer disabled:opacity-50 font-mono"
                  >
                    {isSubmitting ? (
                      <span>Opening Mail Client...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND YOUR QUERY</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 font-mono text-center">
                    This will open your email client pre-filled with your message to info@energymanindia.in
                  </p>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
