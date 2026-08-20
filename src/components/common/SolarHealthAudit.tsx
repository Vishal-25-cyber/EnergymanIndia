import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Activity,
} from "lucide-react";

interface DiagnosticIssue {
  id: string;
  label: string;
  category: string;
  cause: string;
  remedy: string;
  potentialYieldLoss: string;
  urgency: "High" | "Medium" | "Low";
}

const issuesList: DiagnosticIssue[] = [
  {
    id: "soiling",
    label: "Dust & Soiling Accumulation on Panels",
    category: "Mechanical & Cleaning",
    cause: "Heavy particulate deposition, bird droppings, or pollen blocking direct photon absorption.",
    remedy: "De-mineralized water pressure cleaning and automated hydrophobic anti-dust coating application.",
    potentialYieldLoss: "12% - 25% Generation Loss",
    urgency: "Medium"
  },
  {
    id: "hotspots",
    label: "Panel Cell Discoloration / Suspected Hotspots",
    category: "Cell Level Degradation",
    cause: "Internal solder joint micro-cracks or bypassed diodes causing localized resistive heating.",
    remedy: "High-resolution Drone Infrared Thermography (FLIR) to isolate failing bypass diodes and warranty RMA replacement.",
    potentialYieldLoss: "15% - 35% Generation Loss + Fire Risk",
    urgency: "High"
  },
  {
    id: "inverter_fault",
    label: "Inverter Red Alarm / Grid Overvoltage Error",
    category: "Power Electronics",
    cause: "Local DISCOM grid voltage surge exceeding 253V AC or insulation resistance leakage to ground.",
    remedy: "AC transformer tap-setting calibration, surge protection device (SPD) testing, and MPPT string re-balancing.",
    potentialYieldLoss: "100% Generation Shutdown during fault",
    urgency: "High"
  },
  {
    id: "shading",
    label: "Vegetation or Neighboring Structure Shading",
    category: "Shadow Analysis",
    cause: "Unpredicted seasonal sun angle shift or newly constructed parapets casting inter-row shadows.",
    remedy: "3D PVSyst shadow path remodelling and installation of module-level DC power optimizers or string re-routing.",
    potentialYieldLoss: "20% - 40% String Output Drop",
    urgency: "Medium"
  }
];

export const SolarHealthAudit: React.FC = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>("soiling");

  const activeIssue = issuesList.find((i) => i.id === selectedIssueId) || issuesList[0];

  return (
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="health-audit">
      <div className="site-container relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span>Interactive EPC Diagnostic Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            SOLAR HEALTH &amp; <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">FAULT DIAGNOSTIC AUDIT</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Is your existing solar plant underperforming or experiencing frequent inverter trips? Select your symptoms below for an instant engineering assessment.
          </p>
        </div>

        {/* Interactive Diagnostic Board */}
        <div className="bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Issue Selector Pills */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Step 1: Select Current Plant Symptom / Behavior
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {issuesList.map((issue) => (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`p-4 rounded-2xl border text-left transition-all shadow-xs cursor-pointer ${
                    selectedIssueId === issue.id
                      ? "bg-[#1C1625] border-red-500 text-white shadow-md ring-1 ring-red-500/30"
                      : "bg-slate-900 border-red-950/60 text-slate-300 hover:border-red-900"
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 block">
                    {issue.category}
                  </span>
                  <h4 className="text-xs font-bold mt-1 line-clamp-2 text-white">
                    {issue.label}
                  </h4>
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Result Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-red-950/60 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-red-950/60">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  Diagnostic Result: {activeIssue.label}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                activeIssue.urgency === "High"
                  ? "bg-red-950/80 text-rose-300 border border-red-500/40"
                  : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
              }`}>
                Urgency: {activeIssue.urgency}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-[#14101A] border border-red-950/60 space-y-1 shadow-xs">
                <span className="text-slate-400 block font-bold">Estimated Output Penalty:</span>
                <strong className="text-sm font-black text-rose-400">{activeIssue.potentialYieldLoss}</strong>
              </div>
              <div className="p-4 rounded-xl bg-[#14101A] border border-red-950/60 space-y-1 shadow-xs md:col-span-2">
                <span className="text-slate-400 block font-bold">Root Cause Analysis:</span>
                <p className="text-slate-200 leading-relaxed font-normal">{activeIssue.cause}</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#1C1625] border border-red-500/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-red-400">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Recommended ENERGYMAN Engineering Remedy:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {activeIssue.remedy}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-medium">
                Need an on-site drone thermography scan or inverter recalibration?
              </span>
              <Link
                to="/contact"
                className="btn-primary py-2.5 px-5 text-xs font-bold inline-flex items-center gap-1.5 rounded-xl shadow-md transition-all"
              >
                <span>Book Plant Health Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarHealthAudit;
