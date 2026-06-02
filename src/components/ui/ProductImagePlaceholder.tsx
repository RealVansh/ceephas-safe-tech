"use client";

import { Hand } from "lucide-react";

type Props = {
  color?: string;
  label: string;
  size?: "sm" | "md" | "lg" | "full";
};

export default function ProductImagePlaceholder({
  color = "#0EA5E9",
  label,
  size = "full",
}: Props) {
  const sizeClasses = {
    sm: "h-32",
    md: "h-48",
    lg: "h-72",
    full: "h-full w-full absolute inset-0",
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-slate-100 ${sizeClasses[size]}`}
    >
      {/* Background Hexagon */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full p-4"
        style={{ opacity: 0.12 }}
      >
        <polygon
          points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
      </svg>

      {/* Foreground Icon */}
      <div className="relative z-10 flex flex-col items-center">
        <Hand
          className="w-16 h-16 mb-4 text-slate-400 drop-shadow-sm"
          strokeWidth={1.5}
        />
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1 rounded shadow-sm">
          <span className="font-mono text-xs font-semibold tracking-wider text-text-primary uppercase">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
