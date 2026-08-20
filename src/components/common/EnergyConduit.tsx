import React from "react";

interface EnergyConduitProps {
  variant?: "horizontal" | "vertical" | "curved" | "node";
  color?: "crimson" | "amber" | "rose" | "emerald";
  className?: string;
  glow?: boolean;
}

export const EnergyConduit: React.FC<EnergyConduitProps> = ({
  variant = "horizontal",
  color = "crimson",
  className = "",
  glow = true
}) => {
  const strokeColor = color === "amber" ? "#F59E0B" : color === "rose" ? "#FB7185" : "#E63946";
  const glowColor = color === "amber" ? "rgba(245, 158, 11, 0.3)" : color === "rose" ? "rgba(251, 113, 133, 0.3)" : "rgba(230, 57, 70, 0.3)";

  if (variant === "node") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div
          className="w-2.5 h-2.5 rounded-full relative z-10 border border-slate-700"
          style={{
            backgroundColor: strokeColor,
            boxShadow: glow ? `0 0 8px ${glowColor}` : "none"
          }}
        />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`relative flex flex-col items-center overflow-hidden pointer-events-none ${className}`}>
        <div
          className="w-px h-full min-h-[60px]"
          style={{
            background: `linear-gradient(to bottom, transparent, ${strokeColor}, transparent)`
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none py-1 ${className}`}>
      <div
        className="w-full h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${strokeColor}, transparent)`
        }}
      />
    </div>
  );
};

export default EnergyConduit;
