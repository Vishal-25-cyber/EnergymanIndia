import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Cpu,
  Flame
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
    <section className="section-padding bg-brand-950 relative overflow-hidden border-t border-slate-800" id="health-audit">
      <div className="site-container relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/30">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive EPC Diagnostic Tool</span>
          </div>
          <h2 className="heading-section">
            SOLAR HEALTH & <span className="bg-gradient-to-r from-red-400 via-solar-400 to-energy-400 bg-clip-text text-transparent">FAULT DIAGNOSTIC AUDIT</span>
          </h2>
          <p className="text-subtle">
            Is your existing solar plant underperforming or experiencing frequent inverter trips? Select your symptoms below for an instant engineering assessment.
          </p>
        </div>

        {/* Interactive Diagnostic Board */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Issue Selector Pills */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Step 1: Select Current Plant Symptom / Behavior
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {issuesList.map((issue) => (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedIssueId === issue.id
                      ? "bg-energy-500/20 border-energy-500 text-white shadow-lg ring-1 ring-energy-500"
                      : "bg-brand-950/80 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge-slate text-[10px]">{issue.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      issue.urgency === "High" ? "bg-red-500/20 text-red-400 border border-red-500/40" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                    }`}>
                      {issue.urgency} Priority
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2">{issue.label}</h4>
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Result & Engineering Remedy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4 border-t border-slate-800">
            {/* Left: Engineering Diagnosis (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-brand-950/90 border border-slate-700 space-y-5">
              <div className="space-y-2">
                <span className="badge-amber text-xs font-bold">Engineering Assessment</span>
                <h3 className="text-xl font-bold text-white">{activeIssue.label}</h3>
              </div>

              <div className="space-y-3 text-xs text-slate-300 divide-y divide-slate-800">
                <div className="pt-2">
                  <strong className="text-slate-400 block mb-1">Root Engineering Cause:</strong>
                  <p className="leading-relaxed">{activeIssue.cause}</p>
                </div>

                <div className="pt-3">
                  <strong className="text-energy-400 block mb-1">Energy Man Rectification Protocol:</strong>
                  <p className="leading-relaxed text-slate-200">{activeIssue.remedy}</p>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-slate-400">Estimated Recoverable Revenue / Yield:</span>
                  <span className="text-energy-400 font-bold font-mono text-sm">{activeIssue.potentialYieldLoss}</span>
                </div>
              </div>
            </div>

            {/* Right: AMC & Audit Booking Action (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-brand-950/90 border border-slate-700 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-solar-400">
                  <Wrench className="w-5 h-5" />
                  <h4 className="text-base font-bold text-white">Book a Comprehensive Plant Health Audit</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our certified O&M engineers in Coimbatore and Palani arrive on-site with FLIR drone thermal cameras, IV-curve tracers, and insulation testers.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-energy-400 shrink-0" />
                    <span>Drone Infrared Thermography Mapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-energy-400 shrink-0" />
                    <span>String IV-Curve & Insulation Resistance Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-energy-400 shrink-0" />
                    <span>Guaranteed PR (Performance Ratio) Restoration</span>
                  </div>
                </div>
              </div>

              <Link
                to="/solutions/epc-maintenance"
                className="btn-primary w-full py-3 text-xs font-bold justify-center"
              >
                Schedule On-Site Solar Audit →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
