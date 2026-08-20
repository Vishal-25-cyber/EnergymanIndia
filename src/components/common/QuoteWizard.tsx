import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    roofArea: "400",
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
      }, 700);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Top Step Progress Indicator */}
      <div className="mb-8 pb-6 border-b border-red-950/60">
        <div className="flex items-center justify-between text-xs font-mono font-bold mb-3">
          <span className="text-red-400 font-extrabold">Step 0{currentStep} of 06</span>
          <span className="text-slate-400">
            {currentStep === 1 && "Customer Profile"}
            {currentStep === 2 && "Installation Location"}
            {currentStep === 3 && "Consumption & Roof Area"}
            {currentStep === 4 && "Desired Solar Solution"}
            {currentStep === 5 && "Contact & Schedule"}
            {currentStep === 6 && "Confirmation & Summary"}
          </span>
        </div>

        {/* Step Progress Line */}
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step <= currentStep
                  ? "bg-red-500 shadow-sm"
                  : "bg-slate-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP FORMS */}
      <form onSubmit={handleNext}>
        {/* STEP 1: Who are you? */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Who are you requesting a solar solution for?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Select your property classification so we can tailor subsidy eligibility and system engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { id: "Homeowner", label: "Residential Homeowner", desc: "Independent house, villa, or apartment terrace", icon: <Home className="w-5 h-5 text-red-400" /> },
                { id: "Business", label: "Commercial Enterprise", desc: "Offices, hospitals, colleges, hotels & warehouses", icon: <Building2 className="w-5 h-5 text-amber-400" /> },
                { id: "Industry", label: "Industrial Manufacturing", desc: "Textile mills, foundries, factories & MW captive", icon: <Factory className="w-5 h-5 text-rose-400" /> },
                { id: "Farmer", label: "Farmer / Agriculture", desc: "Borewell pumps, drip irrigation & farm microgrids", icon: <Tractor className="w-5 h-5 text-emerald-400" /> },
                { id: "Other", label: "Builder / Architect / EPC", desc: "Real estate developers and solar consultants", icon: <HelpCircle className="w-5 h-5 text-indigo-400" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField("userType", item.id)}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all shadow-xs cursor-pointer ${
                    formData.userType === item.id
                      ? "bg-[#1C1625] border-red-500 ring-2 ring-red-500/30 shadow-md"
                      : "bg-slate-900 border-red-950/60 hover:border-red-900"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-950 border border-red-950/60 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{item.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-normal">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Where is the installation site located?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                DISCOM solar policies and net-metering timelines vary by state and electricity board.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">City / District *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coimbatore, Palani, Salem, Chennai"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Postal Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 641001"
                  value={formData.pincode}
                  onChange={(e) => updateField("pincode", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">State / Region *</label>
                <select
                  value={formData.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
                >
                  <option value="Tamil Nadu">Tamil Nadu (TANGEDCO)</option>
                  <option value="Karnataka">Karnataka (BESCOM / HESCOM / MESCOM)</option>
                  <option value="Kerala">Kerala (KSEB)</option>
                  <option value="Andhra Pradesh">Andhra Pradesh (APEPDCL / APSPDCL)</option>
                  <option value="Telangana">Telangana (TSSPDCL / TSNPDCL)</option>
                  <option value="Maharashtra">Maharashtra (MSEDCL)</option>
                  <option value="Other">Other State in India</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Monthly Bill & Roof Area */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Electricity Bill &amp; Roof Specifications
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Helps our engineering team calculate your optimum kW capacity and structural mounting design.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Average Monthly Electricity Bill (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 4500"
                  value={formData.monthlyBill}
                  onChange={(e) => updateField("monthlyBill", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Approx. Usable Roof Area (Sq.Ft)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={formData.roofArea}
                  onChange={(e) => updateField("roofArea", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Rooftop / Installation Surface Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    "RCC Concrete Flat Roof",
                    "Metal Sheet Industrial Shed",
                    "Tiled / Sloped Roof",
                    "Elevated Superstructure",
                    "Open Farmland / Ground Mount",
                    "Not Sure / Need Survey"
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField("roofType", type)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all shadow-xs cursor-pointer ${
                        formData.roofType === type
                          ? "bg-[#1C1625] border-red-500 text-rose-300 ring-2 ring-red-500/30"
                          : "bg-slate-900 border-red-950/60 text-slate-300 hover:border-red-900"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Desired Solution */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Which solar solution do you require?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Choose the system architecture that aligns with your operational priorities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { id: "On-Grid Rooftop Solar (Net Metering)", title: "On-Grid Solar with Net Metering", desc: "Best for zero power bills and direct PM Surya Ghar subsidy." },
                { id: "Hybrid Solar with Battery Storage (BESS)", title: "Hybrid Solar + Battery Backup", desc: "24/7 power security during grid load-shedding and power cuts." },
                { id: "Agricultural Solar Water Pump (PM-KUSUM)", title: "Agricultural Solar Pump Set", desc: "Submersible / surface farm pumps with 60% government subsidy." },
                { id: "Commercial / Industrial Captive MW Plant", title: "Commercial & Industrial Solar EPC", desc: "High-voltage grid sync, 40% tax depreciation & DG sync." },
                { id: "Solar Water Heater (Domestic / Commercial)", title: "Solar Water Heating System", desc: "ETC / FPC vacuum tube thermal hot water solutions." },
                { id: "Custom Engineering Consultation", title: "Expert Site Consultation", desc: "Let ENERGYMAN engineers assess and recommend the best fit." }
              ].map((sol) => (
                <button
                  key={sol.id}
                  type="button"
                  onClick={() => updateField("solutionType", sol.id)}
                  className={`p-4 rounded-2xl border text-left transition-all shadow-xs cursor-pointer ${
                    formData.solutionType === sol.id
                      ? "bg-[#1C1625] border-red-500 ring-2 ring-red-500/30 shadow-md"
                      : "bg-slate-900 border-red-950/60 hover:border-red-900"
                  }`}
                >
                  <h4 className="text-sm font-black text-white">{sol.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-normal">{sol.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Contact Details */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Contact Details &amp; Preferred Site Survey Schedule
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                Our solar engineers will prepare a customized 3D shadow report and financial quotation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Krishnan"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98422 45890"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Preferred Consultation Window</label>
                <select
                  value={formData.preferredConsultation}
                  onChange={(e) => updateField("preferredConsultation", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
                >
                  <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:00 PM - 7:30 PM)">Evening (5:00 PM - 7:30 PM)</option>
                  <option value="Weekend Site Visit">Weekend Site Visit</option>
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Specific Requirements or Comments</label>
                <textarea
                  rows={2}
                  placeholder="Mention sanctioned load, transformer capacity, or specific pump depth..."
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-red-950/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-slate-500 shadow-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation Screen */}
        {currentStep === 6 && (
          <div className="space-y-6 text-center py-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-red-950 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-2xl font-black text-white">
                Thank You! Your Solar Request Has Been Received.
              </h3>
              <p className="text-sm text-slate-300 font-semibold">
                Your consultation reference number is: <strong className="text-amber-300 font-mono text-base">{referenceId}</strong>
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                An ENERGYMAN technical specialist from our Coimbatore/Palani engineering center will review your electricity profile and contact you at <strong className="text-white">{formData.phone}</strong> during your requested time window ({formData.preferredConsultation}).
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-900 border border-red-950/60 text-left space-y-2 text-xs shadow-md">
              <div className="flex justify-between py-1 border-b border-red-950/60">
                <span className="text-slate-400">Customer Category:</span>
                <span className="text-white font-bold">{formData.userType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-red-950/60">
                <span className="text-slate-400">Solution Requested:</span>
                <span className="text-white font-bold">{formData.solutionType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-red-950/60">
                <span className="text-slate-400">Site Location:</span>
                <span className="text-white font-bold">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Monthly Power Bill:</span>
                <span className="text-amber-300 font-bold">₹{Number(formData.monthlyBill).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={`https://wa.me/919842211910?text=Hello%20ENERGYMAN%2C%20my%20quote%20reference%20is%20${referenceId}.%20I%20requested%20a%20solar%20solution%20for%20${formData.city}.`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary py-3 px-6 text-xs font-bold inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Instant WhatsApp Support</span>
              </a>

              <Link
                to="/"
                className="py-3 px-6 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-red-950/60 rounded-xl transition-colors"
              >
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Steps 1 to 5) */}
        {currentStep < 6 && (
          <div className="mt-8 pt-6 border-t border-red-950/60 flex items-center justify-between gap-4">
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
              className="btn-primary py-3 px-7 text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{currentStep === 5 ? (isSubmitting ? "Submitting..." : "Submit Solar Requirement") : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuoteWizard;
