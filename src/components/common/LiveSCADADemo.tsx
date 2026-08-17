import React, { useState, useEffect } from "react";
import {
  Activity,
  Zap,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Clock,
  Gauge,
  Sun,
  Trees,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

export const LiveSCADADemo: React.FC = () => {
  const [plantType, setPlantType] = useState<"industrial" | "residential">("industrial");
  const [livePower, setLivePower] = useState<number>(plantType === "industrial" ? 894 : 4.6);
  const [dailyKwh, setDailyKwh] = useState<number>(plantType === "industrial" ? 4850 : 23.8);
  const [inverterTemp, setInverterTemp] = useState<number>(43.5);
  const [gridFrequency, setGridFrequency] = useState<number>(50.02);
  const [powerFactor, setPowerFactor] = useState<number>(0.99);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  useEffect(() => {
    const isInd = plantType === "industrial";
    setLivePower(isInd ? 894 : 4.6);
    setDailyKwh(isInd ? 4850 : 23.8);
  }, [plantType]);

  // Live pulsing simulation every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const isInd = plantType === "industrial";
      const basePower = isInd ? 890 : 4.5;
      const variation = (Math.random() * (isInd ? 15 : 0.3)) - (isInd ? 7.5 : 0.15);
      setLivePower(Number((basePower + variation).toFixed(isInd ? 1 : 2)));
      setGridFrequency(Number((50.0 + (Math.random() * 0.06 - 0.03)).toFixed(2)));
      setInverterTemp(Number((43.0 + (Math.random() * 0.8)).toFixed(1)));
      setDailyKwh((prev) => Number((prev + (isInd ? 0.4 : 0.005)).toFixed(isInd ? 1 : 2)));
      setLastUpdated(new Date().toLocaleTimeString());
    }, 3000);

    return () => clearInterval(timer);
  }, [plantType]);

  return (
    <section className="section-padding bg-brand-950 relative overflow-hidden" id="scada-demo">
      <div className="site-container relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-energy-500/10 text-energy-400 border border-energy-500/30">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>24/7 Cloud Telemetry & SCADA</span>
            </div>
            <h2 className="heading-section">
              LIVE PLANT TELEMETRY <span className="bg-gradient-to-r from-energy-400 to-solar-400 bg-clip-text text-transparent">DEMONSTRATION</span>
            </h2>
            <p className="text-subtle">
              Every Energy Man India system includes real-time IoT cloud monitoring. Experience our live string current mapping, inverter diagnostics, and yield tracking in action.
            </p>
          </div>

          {/* Plant Selector */}
          <div className="flex items-center gap-2 bg-brand-900 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setPlantType("industrial")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                plantType === "industrial"
                  ? "bg-energy-500 text-brand-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              1.2 MW Industrial Mill
            </button>
            <button
              onClick={() => setPlantType("residential")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                plantType === "residential"
                  ? "bg-solar-500 text-brand-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              5 kW Residential Villa
            </button>
          </div>
        </div>

        {/* Live SCADA Control Board */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-energy-400 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-energy-400 -ml-4" />
                <span className="font-bold text-white uppercase tracking-wider">
                  {plantType === "industrial" ? "1.2 MW Textile Mill Solar Array" : "5 kW Villa Rooftop Array"}
                </span>
              </div>
              <span className="text-slate-400">|</span>
              <span className="text-slate-400 font-mono">Location: Coimbatore, TN</span>
            </div>

            <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
              <span>Inverters: <strong className="text-energy-400">Online (100% PR)</strong></span>
              <span>Updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Telemetry Key Gauges (4 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Live Instant Power */}
            <div className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Instant Active Power</span>
                <Zap className="w-4 h-4 text-energy-400 fill-energy-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
                <span>{livePower}</span>
                <span className="text-sm font-bold text-energy-400">kW</span>
              </div>
              <p className="text-[11px] text-slate-400">Peak Daylight Generation</p>
            </div>

            {/* Daily Generation */}
            <div className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Today's Generation</span>
                <Sun className="w-4 h-4 text-solar-400" />
              </div>
              <div className="text-3xl font-black text-solar-400 font-mono flex items-baseline gap-1">
                <span>{dailyKwh.toLocaleString()}</span>
                <span className="text-sm font-bold text-slate-300">kWh</span>
              </div>
              <p className="text-[11px] text-slate-400">Cumulative Clean Energy</p>
            </div>

            {/* Grid Synchronization Frequency */}
            <div className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Grid Frequency & PF</span>
                <Gauge className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
                <span>{gridFrequency}</span>
                <span className="text-sm font-bold text-blue-400">Hz</span>
              </div>
              <p className="text-[11px] text-slate-400">Power Factor: <strong className="text-white">{powerFactor} (Unity)</strong></p>
            </div>

            {/* Inverter Core Temperature */}
            <div className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Inverter Core Temp</span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
                <span>{inverterTemp}</span>
                <span className="text-sm font-bold text-purple-400">°C</span>
              </div>
              <p className="text-[11px] text-energy-400 font-semibold">Smart Cooling Active</p>
            </div>
          </div>

          {/* String Level Current Telemetry */}
          <div className="p-6 rounded-2xl bg-brand-950/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-energy-400" />
                <span>Multi-MPPT String Current Balancing (Real-Time)</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">16BB TOPCon Modules</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { name: "MPPT String 01", curr: plantType === "industrial" ? "13.82 A" : "13.65 A", volt: "642 V" },
                { name: "MPPT String 02", curr: plantType === "industrial" ? "13.79 A" : "13.68 A", volt: "640 V" },
                { name: "MPPT String 03", curr: plantType === "industrial" ? "13.85 A" : "13.62 A", volt: "644 V" },
                { name: "MPPT String 04", curr: plantType === "industrial" ? "13.80 A" : "13.70 A", volt: "641 V" }
              ].map((str, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-brand-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">{str.name}</span>
                  <span className="text-energy-400 font-bold">{str.curr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
