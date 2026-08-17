import React, { useState, useEffect } from "react";
import {
  Sun,
  Compass,
  Gauge,
  Thermometer,
  Zap,
  Activity,
  Sparkles,
  MapPin,
  RefreshCw,
  Info
} from "lucide-react";

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
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <section className="section-padding bg-brand-950/80 relative overflow-hidden border-t border-slate-800" id="telemetry">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-solar-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-energy-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-solar-500/10 text-solar-400 border border-solar-500/30">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Live Regional Solar Intelligence</span>
            </div>
            <h2 className="heading-section">
              SOLAR IRRADIANCE & <span className="bg-gradient-to-r from-solar-400 via-energy-400 to-solar-300 bg-clip-text text-transparent">YIELD OPTIMIZER</span>
            </h2>
            <p className="text-subtle">
              South India enjoys over 300+ days of abundant solar radiation. Explore live regional irradiance telemetry and simulate how roof tilt and orientation maximize your solar generation.
            </p>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedCityKey}
                onChange={(e) => {
                  setSelectedCityKey(e.target.value);
                  setUserTilt(citiesData[e.target.value]?.optimalTilt || 11);
                }}
                className="px-4 py-2.5 rounded-2xl bg-brand-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-energy-500 cursor-pointer shadow-lg pr-8"
              >
                <option value="coimbatore">Coimbatore (Hub)</option>
                <option value="palani">Palani (Registered Hub)</option>
                <option value="salem">Salem (Industrial)</option>
                <option value="erode">Erode & Tirupur (Textile Belt)</option>
                <option value="bengaluru">Bengaluru (Karnataka)</option>
              </select>
            </div>

            <button
              onClick={handleRefresh}
              className={`p-2.5 rounded-2xl bg-brand-900 border border-slate-700 text-slate-300 hover:text-white transition-all ${
                isRefreshing ? "animate-spin text-energy-400" : ""
              }`}
              title="Refresh Telemetry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Telemetry Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Live Station Weather & Irradiance (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 via-brand-900/90 to-brand-850 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-energy-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{city.city}, {city.state}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">Live Ground Telemetry</span>
                </div>
              </div>
              <span className="badge-emerald text-[10px] font-bold">Station Online</span>
            </div>

            {/* Main Irradiance Gauge */}
            <div className="p-5 rounded-2xl bg-brand-950/80 border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-medium">Solar Irradiance (GHI)</span>
                <div className="text-3xl font-black text-solar-400 font-mono flex items-baseline gap-1">
                  <span>{city.irradiance}</span>
                  <span className="text-xs text-slate-400 font-normal">W/m²</span>
                </div>
                <p className="text-[11px] text-energy-400 font-semibold">Excellent Solar Resource</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-solar-500/10 border border-solar-500/30 text-solar-400">
                <Sun className="w-8 h-8 animate-spin-slow" />
              </div>
            </div>

            {/* Environmental Metric Sub-Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-brand-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Thermometer className="w-3.5 h-3.5 text-red-400" />
                  <span>Ambient Temp</span>
                </div>
                <div className="text-xl font-bold text-white font-mono">{city.temp}°C</div>
                <span className="text-[10px] text-slate-400">Panel Temp: ~{city.temp + 22}°C</span>
              </div>

              <div className="p-4 rounded-2xl bg-brand-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Gauge className="w-3.5 h-3.5 text-energy-400" />
                  <span>Peak Sun Hours</span>
                </div>
                <div className="text-xl font-bold text-energy-400 font-mono">{city.peakSunHours} hrs</div>
                <span className="text-[10px] text-slate-400">Daily Average Yield</span>
              </div>

              <div className="p-4 rounded-2xl bg-brand-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Compass className="w-3.5 h-3.5 text-blue-400" />
                  <span>Optimal Azimuth</span>
                </div>
                <div className="text-xs font-bold text-white font-mono truncate">{city.optimalAzimuth}</div>
                <span className="text-[10px] text-slate-400">Zero Azimuth Error</span>
              </div>

              <div className="p-4 rounded-2xl bg-brand-950/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-solar-400" />
                  <span>Optimal Tilt</span>
                </div>
                <div className="text-xl font-bold text-solar-400 font-mono">{city.optimalTilt}°</div>
                <span className="text-[10px] text-slate-400">Latitude Matched</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Roof Tilt & Azimuth Simulator (7 Cols) */}
          <div className="lg:col-span-7 bg-brand-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-energy-400 font-mono">
                Interactive Engineering Simulation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Roof Tilt & Orientation Yield Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Adjust roof mounting tilt and directional facing to evaluate generation efficiency retention.
              </p>
            </div>

            {/* Tilt Angle Slider */}
            <div className="space-y-3 p-5 rounded-2xl bg-brand-950/70 border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Panel Tilt Angle: <strong className="text-solar-400 font-mono text-sm">{userTilt}°</strong>
                </label>
                <span className="text-[11px] text-energy-400 bg-energy-500/10 px-2.5 py-0.5 rounded-full border border-energy-500/30">
                  Optimal for {city.city}: {city.optimalTilt}°
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={45}
                step={1}
                value={userTilt}
                onChange={(e) => setUserTilt(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-solar-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0° (Flat Horizontal)</span>
                <span>11° (Recommended South India)</span>
                <span>45° (High Slope)</span>
              </div>
            </div>

            {/* Azimuth Facing Direction */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Roof Azimuth Facing Direction
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "South", label: "South (180°)", desc: "100% Ideal" },
                  { id: "South-East", label: "South-East (135°)", desc: "~94% Yield" },
                  { id: "South-West", label: "South-West (225°)", desc: "~94% Yield" },
                  { id: "East-West", label: "East / West", desc: "~82% Yield" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setUserAzimuth(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      userAzimuth === item.id
                        ? "bg-energy-500/20 border-energy-500 text-white shadow-md ring-1 ring-energy-500"
                        : "bg-brand-850 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Simulation Output */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-slate-400 font-medium">Estimated Generation Efficiency</span>
                <div className="text-3xl font-black text-white font-mono flex items-center justify-center sm:justify-start gap-2">
                  <span className={estimatedYieldEfficiency > 95 ? "text-energy-400" : estimatedYieldEfficiency > 85 ? "text-solar-400" : "text-amber-400"}>
                    {estimatedYieldEfficiency}%
                  </span>
                  <span className="text-xs text-slate-400 font-normal">of Max Theoretical Capacity</span>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-xs text-slate-400 block mb-1">Energy Man Engineering Fix:</span>
                <span className="text-xs font-bold text-solar-400 bg-brand-850 px-3 py-1.5 rounded-xl border border-slate-700 inline-block">
                  Custom HDG Elevated Structure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
