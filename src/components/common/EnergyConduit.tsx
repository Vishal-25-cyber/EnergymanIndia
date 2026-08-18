import React from "react";

interface EnergyConduitProps {
  variant?: "horizontal" | "vertical" | "curved" | "node";
  color?: "emerald" | "amber" | "cyan";
  className?: string;
  glow?: boolean;
}

export const EnergyConduit: React.FC<EnergyConduitProps> = ({
  variant = "horizontal",
  color = "emerald",
  className = "",
  glow = true
}) => {
  const strokeColor = color === "amber" ? "#F59E0B" : color === "cyan" ? "#06B6D4" : "#10B981";
  const glowColor = color === "amber" ? "rgba(245, 158, 11, 0.4)" : color === "cyan" ? "rgba(6, 182, 212, 0.4)" : "rgba(16, 185, 129, 0.4)";

  if (variant === "node") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div
          className="absolute w-6 h-6 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: strokeColor }}
        />
        <div
          className="w-3 h-3 rounded-full relative z-10 border-2 border-brand-950"
          style={{
            backgroundColor: strokeColor,
            boxShadow: glow ? `0 0 12px ${glowColor}` : "none"
          }}
        />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`relative flex flex-col items-center overflow-hidden pointer-events-none ${className}`}>
        <svg
          className="w-4 h-full min-h-[60px]"
          viewBox="0 0 16 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100"
            stroke={strokeColor}
            strokeWidth="2"
            strokeDasharray="6 10"
            className="energy-conduit-line"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none py-1 ${className}`}>
      <svg
        className="w-full h-3"
        viewBox="0 0 1000 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <line
          x1="0"
          y1="6"
          x2="1000"
          y2="6"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="6"
          x2="1000"
          y2="6"
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray="8 14"
          className="energy-conduit-line"
          style={{ filter: glow ? `drop-shadow(0 0 4px ${glowColor})` : "none" }}
        />
      </svg>
    </div>
  );
};
