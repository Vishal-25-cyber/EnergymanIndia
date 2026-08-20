import React, { useState } from "react";
import {
  Sun,
  Compass,
  Gauge,
  Thermometer,
  Activity,
  Sparkles,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface CityTelemetry {
  city: string;
  state: string;
  irradiance: number; // W/m²
  temp: number; // °C
  peakSunHours: number; // hrs/day
  optimalTilt: number; // degrees
  optimalAzimuth: string; // True South
  uvIndex: number;
  cloudCover: number; // %
}

const citiesData: Record<string, CityTelemetry> = {
  coimbatore: {
    city: "Coimbatore",
    state: "Tamil Nadu",
    irradiance: 960,
    temp: 31,
    peakSunHours: 5.4,
    optimalTilt: 11,
    optimalAzimuth: "180° True South",
    uvIndex: 9,
    cloudCover: 12
  },
  palani: {
    city: "Palani / Dindigul",
    state: "Tamil Nadu",
    irradiance: 985,
    temp: 33,
    peakSunHours: 5.6,
    optimalTilt: 10.5,
    optimalAzimuth: "180° True South",
    uvIndex: 10,
    cloudCover: 8
  },
  salem: {
    city: "Salem",
    state: "Tamil Nadu",
    irradiance: 950,
    temp: 34,
    peakSunHours: 5.3,
    optimalTilt: 12,
    optimalAzimuth: "180° True South",
    uvIndex: 9,
    cloudCover: 15
  },
  erode: {
    city: "Erode / Tirupur",
    state: "Tamil Nadu",
    irradiance: 970,
    temp: 33,
    peakSunHours: 5.5,
    optimalTilt: 11.5,
    optimalAzimuth: "180° True South",
    uvIndex: 10,
    cloudCover: 10
  },
  bengaluru: {
    city: "Bengaluru",
    state: "Karnataka",
    irradiance: 920,
    temp: 27,
    peakSunHours: 5.1,
    optimalTilt: 13,
    optimalAzimuth: "180° True South",
    uvIndex: 8,
    cloudCover: 20
  }
};

export const LiveSolarTelemetry: React.FC = () => {
  const [selectedCityKey, setSelectedCityKey] = useState<string>("coimbatore");
  const [userTilt, setUserTilt] = useState<number>(11);
  const [userAzimuth, setUserAzimuth] = useState<string>("South");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const city = citiesData[selectedCityKey] || citiesData.coimbatore;

  const tiltDifference = Math.abs(userTilt - city.optimalTilt);
  const orientationFactor = userAzimuth === "South" ? 1.0 : userAzimuth === "South-East" || userAzimuth === "South-West" ? 0.94 : 0.82;
  const tiltFactor = Math.max(0.85, 1.0 - (tiltDifference * 0.008));
  const estimatedYieldEfficiency = Math.round(orientationFactor * tiltFactor * 100);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const handleCityChange = (key: string) => {
    setSelectedCityKey(key);
    setUserTilt(citiesData[key]?.optimalTilt || 11);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0A0A0E] via-[#100D16] to-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="telemetry">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ── Centered Section Header ── */}
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs font-mono">
              <Activity className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>LIVE REGIONAL SOLAR INTELLIGENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              SOLAR IRRADIANCE &{" "}
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                YIELD OPTIMIZER
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              South India enjoys over 300+ days of abundant solar radiation. Explore live regional irradiance telemetry and simulate how roof tilt and orientation maximize your solar generation.
            </p>

            {/* City Preset Tabs Centered */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
              {[
                { key: "coimbatore", label: "Coimbatore (Hub)" },
                { key: "palani", label: "Palani (Dindigul)" },
                { key: "salem", label: "Salem" },
                { key: "erode", label: "Erode & Tirupur" },
                { key: "bengaluru", label: "Bengaluru" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleCityChange(item.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    selectedCityKey === item.key
                      ? "bg-red-950/90 border-red-500 text-rose-200 shadow-md shadow-red-950/80"
                      : "bg-[#14101A]/80 border-red-950/60 text-slate-300 hover:border-red-500/40 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={handleRefresh}
                className={`p-2 rounded-xl bg-[#14101A]/80 border border-red-950/60 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-all cursor-pointer ${
                  isRefreshing ? "animate-spin text-red-400" : ""
                }`}
                title="Refresh Telemetry"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Telemetry & Simulator Command Center (Sitting Directly on Background, No Outer Box) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Live Station Weather & Irradiance (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Station Status Header */}
            <div className="flex items-center justify-between pb-2 border-b border-red-950/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{city.city}, {city.state}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">Live Ground Station Telemetry</span>
                </div>
              </div>
              <span className="bg-red-950/80 text-rose-300 border border-red-500/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full font-mono">
                ● Station Online
              </span>
            </div>

            {/* Main Irradiance Gauge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-purple-950/20 to-amber-950/20 border border-red-500/40 shadow-xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold font-mono">SOLAR IRRADIANCE (GHI)</span>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono flex items-baseline gap-1.5">
                  <span>{city.irradiance}</span>
                  <span className="text-sm text-slate-400 font-sans font-medium">W/m²</span>
                </div>
                <p className="text-[11px] text-rose-300 font-extrabold">Excellent High-Yield Harvest Zone</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400 shadow-md">
                <Sun className="w-8 h-8 animate-spin-slow" />
              </div>
            </div>

            {/* Environmental Metric Sub-Cards (Directly on Background) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#14101A]/95 border border-red-900/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold font-mono">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ambient Temp</span>
                </div>
                <div className="text-xl font-black text-white font-mono">{city.temp}°C</div>
                <span className="text-[10px] text-slate-400">Panel Temp: ~{city.temp + 22}°C</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14101A]/95 border border-red-900/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold font-mono">
                  <Gauge className="w-3.5 h-3.5 text-red-400" />
                  <span>Peak Sun Hours</span>
                </div>
                <div className="text-xl font-black text-red-400 font-mono">{city.peakSunHours} hrs</div>
                <span className="text-[10px] text-slate-400">Daily Average Yield</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14101A]/95 border border-red-900/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold font-mono">
                  <Compass className="w-3.5 h-3.5 text-rose-400" />
                  <span>Optimal Azimuth</span>
                </div>
                <div className="text-xs font-extrabold text-white font-mono truncate">{city.optimalAzimuth}</div>
                <span className="text-[10px] text-slate-400">Zero Azimuth Error</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14101A]/95 border border-red-900/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Optimal Tilt</span>
                </div>
                <div className="text-xl font-black text-amber-400 font-mono">{city.optimalTilt}°</div>
                <span className="text-[10px] text-slate-400">Latitude Matched</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tilt & Orientation Simulator (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Simulator Header */}
            <div className="space-y-1 pb-2 border-b border-red-950/60">
              <span className="text-xs font-bold text-red-400 uppercase font-mono tracking-wider">
                3D Array Simulation
              </span>
              <h3 className="text-base font-black text-white">Rooftop Angle &amp; Orientation Simulator</h3>
              <p className="text-xs text-slate-300">
                Adjust roof tilt and orientation to calculate photovoltaic generation efficiency in {city.city}.
              </p>
            </div>

            {/* Tilt Slider */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#14101A]/95 border border-red-900/30">
              <div className="flex justify-between items-center text-xs font-bold font-mono">
                <span className="text-slate-300">Adjust Panel Tilt Angle:</span>
                <span className="text-red-400 font-mono font-black text-base">{userTilt}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="0.5"
                value={userTilt}
                onChange={(e) => setUserTilt(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0° (Flat Roof)</span>
                <span className="text-amber-300 font-bold">Optimal: {city.optimalTilt}°</span>
                <span>45° (Steep Roof)</span>
              </div>
            </div>

            {/* Orientation Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300">Rooftop Compass Direction:</label>
              <div className="grid grid-cols-4 gap-2">
                {["South", "South-East", "South-West", "East/West"].map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => setUserAzimuth(dir)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      userAzimuth === dir
                        ? "bg-red-950/90 border-red-500 text-white shadow-md shadow-red-950/80"
                        : "bg-[#14101A]/80 border border-red-950/60 text-slate-300 hover:border-red-500/40 hover:text-white"
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Generation Yield Gauge Result */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-purple-950/20 to-amber-950/20 border border-red-500/40 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold font-mono block">Estimated Solar Harvest Efficiency:</span>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  {estimatedYieldEfficiency}% <span className="text-xs text-slate-400 font-sans font-normal">of Max Potential</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono bg-red-950/80 text-rose-300 border border-red-500/40">
                  {estimatedYieldEfficiency >= 95 ? "● Peak Optimum" : estimatedYieldEfficiency >= 85 ? "● Good Yield" : "● Acceptable"}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LiveSolarTelemetry;
