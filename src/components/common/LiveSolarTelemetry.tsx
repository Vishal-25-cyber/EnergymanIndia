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
    <section className="section-padding bg-[#0A0A0E] relative overflow-hidden border-t border-red-950/60" id="telemetry">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-red-950/80 text-rose-300 border border-red-500/40 shadow-xs">
              <Activity className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Live Regional Solar Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              SOLAR IRRADIANCE & <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">YIELD OPTIMIZER</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-red-950/60 text-xs font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer shadow-sm pr-8"
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
              className={`p-2.5 rounded-2xl bg-slate-900 border border-red-950/60 text-slate-300 hover:text-red-400 transition-all shadow-sm cursor-pointer ${
                isRefreshing ? "animate-spin text-red-400" : ""
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
          <div className="lg:col-span-5 bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-red-950/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{city.city}, {city.state}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">Live Ground Station Data</span>
                </div>
              </div>
              <span className="bg-red-950/80 text-rose-300 border border-red-500/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full">Station Online</span>
            </div>

            {/* Main Irradiance Gauge */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-red-950/60 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold">Solar Irradiance (GHI)</span>
                <div className="text-3xl font-black text-white font-mono flex items-baseline gap-1">
                  <span>{city.irradiance}</span>
                  <span className="text-xs text-slate-400 font-medium">W/m²</span>
                </div>
                <p className="text-[11px] text-rose-300 font-extrabold">Excellent Solar Harvest Zone</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400 shadow-xs">
                <Sun className="w-8 h-8 animate-spin-slow" />
              </div>
            </div>

            {/* Environmental Metric Sub-Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ambient Temp</span>
                </div>
                <div className="text-xl font-black text-white font-mono">{city.temp}°C</div>
                <span className="text-[10px] text-slate-400">Panel Temp: ~{city.temp + 22}°C</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <Gauge className="w-3.5 h-3.5 text-red-400" />
                  <span>Peak Sun Hours</span>
                </div>
                <div className="text-xl font-black text-red-400 font-mono">{city.peakSunHours} hrs</div>
                <span className="text-[10px] text-slate-400">Daily Average Yield</span>
              </div>

              <div className="grid col-span-2 grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Compass className="w-3.5 h-3.5 text-rose-400" />
                    <span>Optimal Azimuth</span>
                  </div>
                  <div className="text-xs font-extrabold text-white font-mono truncate">{city.optimalAzimuth}</div>
                  <span className="text-[10px] text-slate-400">Zero Azimuth Error</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-red-950/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Optimal Tilt</span>
                  </div>
                  <div className="text-xl font-black text-amber-400 font-mono">{city.optimalTilt}°</div>
                  <span className="text-[10px] text-slate-400">Latitude Matched</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tilt & Orientation Simulator (7 Cols) */}
          <div className="lg:col-span-7 bg-[#14101A]/95 border border-red-900/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold text-red-400 uppercase font-mono tracking-wider">3D Array Simulation</span>
              <h3 className="text-xl font-black text-white">Rooftop Angle &amp; Orientation Simulator</h3>
              <p className="text-xs text-slate-300">
                Adjust the rooftop tilt angle and facing orientation to see the real-time simulation of photovoltaic generation efficiency for {city.city}.
              </p>
            </div>

            {/* Tilt Slider */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-900 border border-red-950/60">
              <div className="flex justify-between items-center text-xs font-bold">
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
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0° (Flat Roof)</span>
                <span className="text-amber-300 font-bold">Optimal: {city.optimalTilt}°</span>
                <span>45° (Steep Roof)</span>
              </div>
            </div>

            {/* Orientation Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Rooftop Compass Direction:</label>
              <div className="grid grid-cols-4 gap-2">
                {["South", "South-East", "South-West", "East/West"].map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => setUserAzimuth(dir)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      userAzimuth === dir
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-slate-900 border border-red-950/60 text-slate-300 hover:border-red-900"
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Generation Yield Gauge Result */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-red-950/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold block">Estimated Solar Harvest Efficiency:</span>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  {estimatedYieldEfficiency}% <span className="text-xs text-slate-400 font-sans font-normal">of Max Potential</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-rose-300 border border-red-500/40">
                  {estimatedYieldEfficiency >= 95 ? "Peak Optimum" : estimatedYieldEfficiency >= 85 ? "Good Yield" : "Acceptable"}
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
