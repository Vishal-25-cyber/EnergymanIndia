"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Factory,
  Tractor,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Sun,
  IndianRupee,
  MapPin,
  Calendar,
  User,
  Mail,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Gauge,
  Sparkles
} from "lucide-react";

export interface QuoteFormData {
  userType: string;
  city: string;
  pincode: string;
  state: string;
  monthlyBill: string;
  roofArea: string;
  roofType: string;
  solutionType: string;
  name: string;
  phone: string;
  email: string;
  preferredConsultation: string;
  notes: string;
}

const STEPS = [
  { id: 1, label: "Profile", title: "Property Sector" },
  { id: 2, label: "Location", title: "Site Location" },
  { id: 3, label: "Energy", title: "Consumption & Roof" },
  { id: 4, label: "System", title: "Solar Architecture" },
  { id: 5, label: "Schedule", title: "Consultation" },
  { id: 6, label: "Confirm", title: "Proposal" }
];

export const QuoteWizard: React.FC<{ initialType?: string; initialBill?: string; initialKw?: string }> = ({
  initialType = "Homeowner",
  initialBill = "4500",
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    userType: initialType,
    city: "Coimbatore",
    pincode: "641001",
    state: "Tamil Nadu",
    monthlyBill: initialBill,
    roofArea: "500",
    roofType: "RCC Concrete Flat Roof",
    solutionType: "On-Grid Rooftop Solar (Net Metering)",
    name: "",
    phone: "",
    email: "",
    preferredConsultation: "Morning (9:00 AM - 1:00 PM)",
    notes: ""
  });

  const [referenceId, setReferenceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Real-time dynamic calculations for the Live Engineering Dossier
  const liveSpecs = useMemo(() => {
    const bill = Number(formData.monthlyBill) || 4500;
    let tariff = 7.0;
    if (formData.userType === "Business") tariff = 9.5;
    if (formData.userType === "Industry") tariff = 10.0;
    if (formData.userType === "Farmer") tariff = 5.5;

    const monthlyUnits = bill / tariff;
    const dailyUnits = monthlyUnits / 30;
    let recKw = Math.max(1, Math.ceil((dailyUnits / 4.2) * 10) / 10);
    if (formData.userType === "Business" && recKw < 10) recKw = 10;
    if (formData.userType === "Industry" && recKw < 30) recKw = 50;

    let subsidy = 0;
    if (formData.userType === "Homeowner") {
      if (recKw >= 3) subsidy = 78000;
      else if (recKw >= 2) subsidy = 60000;
      else subsidy = 30000;
    } else if (formData.userType === "Farmer") {
      subsidy = Math.round(recKw * 35000 * 0.6);
    }

    const annualKwh = Math.round(recKw * 1480);
    const lifetimeSavingsLakhs = ((annualKwh * tariff * 25) / 100000).toFixed(1);

    return {
      recKw,
      subsidy,
      annualKwh,
      dailyGen: (recKw * 4.2).toFixed(1),
      lifetimeSavingsLakhs,
      tariff
    };
  }, [formData.monthlyBill, formData.userType]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === 5) {
      setIsSubmitting(true);
      setTimeout(() => {
        const randId = `EMI-${Math.floor(100000 + Math.random() * 900000)}`;
        setReferenceId(randId);
        setIsSubmitting(false);
        setCurrentStep(6);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <form onSubmit={handleNext} className="w-full relative text-slate-100 space-y-10">
      
      {/* ── 2-Column Clean-Tech Studio Configurator ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* ── Left Column: Interactive Stepper & Configurator Engine (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Top Typographic Stepper Pipeline */}
          <div className="space-y-3 pb-6 border-b border-red-950/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-black text-red-500 uppercase tracking-widest">
                STAGE 0{currentStep} // 06
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {STEPS[currentStep - 1]?.title}
              </span>
            </div>

            {/* Stepper Dots & Line */}
            <div className="flex items-center gap-2">
              {STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => s.id < currentStep && setCurrentStep(s.id)}
                  disabled={s.id > currentStep}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    s.id === currentStep
                      ? "bg-red-500 shadow-md shadow-red-500/50"
                      : s.id < currentStep
                      ? "bg-rose-400 cursor-pointer"
                      : "bg-slate-800"
                  }`}
                  title={s.title}
                />
              ))}
            </div>
          </div>

          {/* Form Step Content */}
          <div className="space-y-8">
            
            {/* ── STEP 1: PROPERTY SECTOR (Cardless List with Bottom Accent Lines) ── */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Select Your Property Sector
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    Choose the installation type to unlock customized central subsidies and engineering designs.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { id: "Homeowner", num: "01", label: "Residential Homeowner", desc: "Independent house, villa, or apartment rooftop with PM Surya Ghar subsidy.", icon: <Home className="w-4 h-4" /> },
                    { id: "Business", num: "02", label: "Commercial Enterprise", desc: "Offices, hospitals, colleges, hotels & IT tech parks.", icon: <Building2 className="w-4 h-4" /> },
                    { id: "Industry", num: "03", label: "Industrial Manufacturing", desc: "Textile spinning mills, foundries & high-tension captive MW plants.", icon: <Factory className="w-4 h-4" /> },
                    { id: "Farmer", num: "04", label: "Agricultural Farming", desc: "High-discharge VFD solar borewell pumps & PM-KUSUM 60% grant.", icon: <Tractor className="w-4 h-4" /> },
                    { id: "Other", num: "05", label: "Builder / Architect / EPC", desc: "Real estate developers, infrastructure planners & solar consultants.", icon: <HelpCircle className="w-4 h-4" /> }
                  ].map((item) => {
                    const isSelected = formData.userType === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => updateField("userType", item.id)}
                        className={`group relative py-4 px-3 sm:px-4 rounded-xl border-b transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? "border-red-500 bg-red-950/40 text-white"
                            : "border-red-950/60 hover:border-red-500/40 hover:bg-slate-900/40 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-xs font-black transition-colors ${
                            isSelected ? "text-red-500" : "text-slate-600 group-hover:text-slate-400"
                          }`}>
                            {item.num}
                          </span>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm sm:text-base font-black transition-colors ${
                                isSelected ? "text-white" : "text-slate-200 group-hover:text-white"
                              }`}>
                                {item.label}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 font-normal leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {/* Status Radio / Indicator */}
                        <div className="shrink-0 flex items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-red-500 bg-red-600 shadow-md shadow-red-500/40"
                              : "border-slate-700 group-hover:border-slate-500"
                          }`}>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── STEP 2: LOCATION (Architectural Underline Inputs) ── */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Where is the Project Located?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    DISCOM solar net-metering timelines and grid approval guidelines vary by jurisdiction.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coimbatore, Palani, Salem, Erode, Tirupur, Chennai"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full pb-3 pt-1 text-base sm:text-lg bg-transparent border-b-2 border-red-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Postal Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 641001"
                      value={formData.pincode}
                      onChange={(e) => updateField("pincode", e.target.value)}
                      className="w-full pb-3 pt-1 text-base sm:text-lg bg-transparent border-b-2 border-red-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors font-mono font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      State / DISCOM Authority *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className="w-full pb-3 pt-1 text-base bg-transparent border-b-2 border-red-950/80 text-white focus:outline-none focus:border-red-500 transition-colors font-semibold cursor-pointer"
                    >
                      <option value="Tamil Nadu" className="bg-[#0A0A0E] text-white">Tamil Nadu (TANGEDCO / TNEB)</option>
                      <option value="Karnataka" className="bg-[#0A0A0E] text-white">Karnataka (BESCOM / HESCOM / MESCOM)</option>
                      <option value="Kerala" className="bg-[#0A0A0E] text-white">Kerala (KSEB)</option>
                      <option value="Andhra Pradesh" className="bg-[#0A0A0E] text-white">Andhra Pradesh (APEPDCL / APSPDCL)</option>
                      <option value="Telangana" className="bg-[#0A0A0E] text-white">Telangana (TSSPDCL / TSNPDCL)</option>
                      <option value="Maharashtra" className="bg-[#0A0A0E] text-white">Maharashtra (MSEDCL)</option>
                      <option value="Other" className="bg-[#0A0A0E] text-white">Other State in India</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: CONSUMPTION & ROOF SURFACE ── */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Monthly Bill &amp; Roof Specs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    Drag the slider to adjust your average monthly bill or click quick presets.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  {/* Huge Interactive Number Display */}
                  <div className="space-y-3 pb-6 border-b border-red-950/60">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Average Monthly Electricity Bill
                    </span>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                        ₹{Number(formData.monthlyBill).toLocaleString("en-IN")}
                      </span>
                      <span className="text-slate-400 text-sm font-mono">/ month</span>
                    </div>

                    <input
                      type="range"
                      min={1000}
                      max={150000}
                      step={1000}
                      value={formData.monthlyBill}
                      onChange={(e) => updateField("monthlyBill", e.target.value)}
                      className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none"
                    />

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[2500, 4500, 7500, 15000, 30000, 60000, 120000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => updateField("monthlyBill", String(preset))}
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                            Number(formData.monthlyBill) === preset
                              ? "bg-red-950 text-rose-300 border border-red-500"
                              : "bg-slate-900 text-slate-400 hover:text-white border border-red-950/60"
                          }`}
                        >
                          ₹{preset.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Surface Selection Pills */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Rooftop / Installation Surface
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {[
                        "RCC Concrete Flat Roof",
                        "Metal Sheet Industrial Shed",
                        "Tiled / Sloped Roof",
                        "Elevated Superstructure",
                        "Farmland Ground Mount",
                        "Need Feasibility Survey"
                      ].map((surface) => {
                        const isSelected = formData.roofType === surface;
                        return (
                          <button
                            key={surface}
                            type="button"
                            onClick={() => updateField("roofType", surface)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                                : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-red-950/60"
                            }`}
                          >
                            {surface}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 4: SOLUTION ARCHITECTURE (Cardless List) ── */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Select System Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    Choose your technical priority (grid net metering, battery backup, or thermal).
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { id: "On-Grid Rooftop Solar (Net Metering)", num: "01", title: "On-Grid Solar with Net Metering", desc: "Best for direct PM Surya Ghar subsidy and 90% EB bill elimination." },
                    { id: "Hybrid Solar with Battery Storage (BESS)", num: "02", title: "Hybrid Solar + LiFePO4 Battery", desc: "100% blackout security with sub-10ms automatic UPS power transfer." },
                    { id: "Agricultural Solar Water Pump (PM-KUSUM)", num: "03", title: "Agricultural Solar Pump Set", desc: "Stainless steel submersible / surface pumps with 60% KUSUM subsidy." },
                    { id: "Commercial / Industrial Captive MW Plant", num: "04", title: "Commercial & Industrial EPC", desc: "High-voltage grid sync, 40% accelerated tax depreciation & DG sync." },
                    { id: "Solar Water Heater (Domestic / Commercial)", num: "05", title: "Solar Thermal Water Heater", desc: "ETC vacuum tube systems for domestic & industrial hot water." },
                    { id: "Custom Engineering Consultation", num: "06", title: "Expert Technical Survey", desc: "Let ENERGYMAN engineers perform precision 3D shadow audit & sizing." }
                  ].map((sol) => {
                    const isSelected = formData.solutionType === sol.id;
                    return (
                      <div
                        key={sol.id}
                        onClick={() => updateField("solutionType", sol.id)}
                        className={`group py-4 px-3 sm:px-4 rounded-xl border-b transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? "border-red-500 bg-red-950/40 text-white"
                            : "border-red-950/60 hover:border-red-500/40 hover:bg-slate-900/40 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-xs font-black ${
                            isSelected ? "text-red-500" : "text-slate-600"
                          }`}>
                            {sol.num}
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-black text-white">{sol.title}</h4>
                            <p className="text-xs text-slate-400 font-normal leading-relaxed">{sol.desc}</p>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? "border-red-500 bg-red-600 shadow-md shadow-red-500/40"
                            : "border-slate-700 group-hover:border-slate-500"
                        }`}>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── STEP 5: CONTACT & SCHEDULE ── */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Contact &amp; Preferred Time
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    Our technical engineering team will dispatch your customized 3D shadow report & quotation.
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Krishnan"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full pb-3 pt-1 text-base sm:text-lg bg-transparent border-b-2 border-red-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98422 45890"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full pb-3 pt-1 text-base sm:text-lg bg-transparent border-b-2 border-red-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors font-mono font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full pb-3 pt-1 text-base bg-transparent border-b-2 border-red-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Preferred Consultation Window
                    </label>
                    <select
                      value={formData.preferredConsultation}
                      onChange={(e) => updateField("preferredConsultation", e.target.value)}
                      className="w-full pb-3 pt-1 text-base bg-transparent border-b-2 border-red-950/80 text-white focus:outline-none focus:border-red-500 transition-colors font-semibold cursor-pointer"
                    >
                      <option value="Morning (9:00 AM - 1:00 PM)" className="bg-[#0A0A0E]">Morning (9:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)" className="bg-[#0A0A0E]">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 7:30 PM)" className="bg-[#0A0A0E]">Evening (5:00 PM - 7:30 PM)</option>
                      <option value="Weekend Site Visit" className="bg-[#0A0A0E]">Weekend Site Visit</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 6: CONFIRMATION DOSSIER ── */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-fade-in py-2">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SPECIFICATION SUBMISSION COMPLETE</span>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight">
                    Thank You! Consultation Ticket Logged.
                  </h3>
                  <p className="text-sm text-slate-300 font-normal">
                    Reference ID: <strong className="text-amber-400 font-mono text-base">{referenceId}</strong>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Our Coimbatore/Palani engineering center has received your project profile. An engineer will reach out at <strong className="text-white">{formData.phone}</strong> during <strong className="text-white">{formData.preferredConsultation}</strong> with your formal 3D proposal.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/contact"
                    className="btn-primary py-3.5 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact Engineering Team</span>
                  </Link>

                  <Link
                    href="/"
                    className="py-3.5 px-6 text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 rounded-xl transition-colors"
                  >
                    <span>Return to Homepage</span>
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ── Right Column: Live Solar Engineering Blueprint / Telemetry Dossier (5 Cols) ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 pt-4 lg:pt-0">
          
          <div className="space-y-6 pb-6 border-b border-red-950/60">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-400">
                LIVE ENGINEERING BLUEPRINT
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Real-Time Sizing
              </span>
            </div>

            {/* Main Calculated kW Highlight */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono">RECOMMENDED SOLAR CAPACITY</span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight flex items-baseline gap-2">
                <span>{liveSpecs.recKw}</span>
                <span className="text-xl sm:text-2xl text-amber-300 font-sans font-bold">kWp</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                High-efficiency Tier-1 TOPCon Bifacial Arrays
              </p>
            </div>

            {/* Real-time Technical Metrics Grid (Seamless, no cards) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-500">Est. Daily Yield</span>
                <p className="text-sm font-black font-mono text-white">~{liveSpecs.dailyGen} Units / day</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-500">Annual Generation</span>
                <p className="text-sm font-black font-mono text-white">~{liveSpecs.annualKwh.toLocaleString()} kWh</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-500">PM Surya Ghar Subsidy</span>
                <p className="text-sm font-black font-mono text-amber-300">
                  {liveSpecs.subsidy > 0 ? `₹${liveSpecs.subsidy.toLocaleString("en-IN")}` : "Accelerated Tax Dep."}
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-500">25-Yr Bill Savings</span>
                <p className="text-sm font-black font-mono text-emerald-400">~₹{liveSpecs.lifetimeSavingsLakhs} Lakhs</p>
              </div>
            </div>

            {/* Selected Config Summary Strip */}
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Target Sector:</span>
                <strong className="text-white">{formData.userType}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Location:</span>
                <strong className="text-white">{formData.city}, {formData.state.split(" ")[0]}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Rooftop Surface:</span>
                <strong className="text-rose-300">{formData.roofType.split(" ")[0]}</strong>
              </div>
            </div>

          </div>

          {/* Trust Guarantees Strip */}
          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>MNRE Approved Channel Partner • Direct Subsidy Filing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>End-to-End TANGEDCO Net Metering & Inspection</span>
            </div>
          </div>

        </div>

      </div>

      {/* ── Full-Width Navigation Action Controls (Steps 1 to 5) Aligned to Far Right Corner ── */}
      {currentStep < 6 && (
        <div className="pt-6 border-t border-red-950/60 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="py-3 px-5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto btn-primary py-3.5 px-8 text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/40 hover:scale-[1.02] transition-transform"
          >
            <span>{currentStep === 5 ? (isSubmitting ? "Submitting..." : "Generate Solar Proposal") : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </form>
  );
};

export default QuoteWizard;
