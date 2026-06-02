"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { ProductVariant } from "@/data/products";

type ProductConfiguratorProps = {
  variants: ProductVariant[];
  productCode: string;
  lengthLabel?: string;
  tagline?: string;
};

export default function ProductConfigurator({
  variants,
  productCode,
  lengthLabel,
  tagline,
}: ProductConfiguratorProps) {
  const thicknesses = [...new Set(variants.map((v) => v.thickness))];
  const linings = [...new Set(variants.map((v) => v.lining))];

  const [selectedThickness, setSelectedThickness] = useState<string | null>(null);
  const [selectedLining, setSelectedLining] = useState<string | null>(null);

  // Find the currently matched variant
  const selectedVariant = variants.find(
    (v) => v.thickness === selectedThickness && v.lining === selectedLining
  );

  // Check if a combination is valid
  const isValidCombo = (thickness: string, lining: string) =>
    variants.some((v) => v.thickness === thickness && v.lining === lining);

  // When selecting thickness, check if the current lining is still valid
  const handleThicknessSelect = (t: string) => {
    setSelectedThickness(t);
    if (selectedLining && !isValidCombo(t, selectedLining)) {
      setSelectedLining(null);
    }
  };

  // When selecting lining, check if the current thickness is still valid
  const handleLiningSelect = (l: string) => {
    setSelectedLining(l);
    if (selectedThickness && !isValidCombo(selectedThickness, l)) {
      setSelectedThickness(null);
    }
  };

  // Build enquiry URL with selected config
  const enquiryParams = new URLSearchParams({ product: productCode });
  if (selectedThickness) enquiryParams.set("thickness", selectedThickness);
  if (selectedLining) enquiryParams.set("lining", selectedLining);
  if (lengthLabel) enquiryParams.set("length", lengthLabel);

  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 md:p-6 lg:p-8 shadow-sm overflow-hidden">
      <div className="mb-6">
        <h3 className="font-display text-2xl text-text-primary mb-1">
          AVAILABLE CONFIGURATIONS
        </h3>
        <p className="text-sm text-slate-500">
          Select your preferred thickness and lining to find the right specification.
        </p>
      </div>

      {/* Thickness Selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Thickness
        </label>
        <div className="flex flex-wrap gap-2">
          {thicknesses.map((t) => {
            const isActive = selectedThickness === t;
            const isDisabled =
              selectedLining !== null &&
              !variants.some((v) => v.thickness === t && v.lining === selectedLining);

            return (
              <button
                key={t}
                onClick={() => handleThicknessSelect(t)}
                disabled={isDisabled}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-wider border transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white border-accent shadow-[0_4px_12px_rgba(47,49,146,0.25)]"
                    : isDisabled
                    ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                    : "bg-white text-text-primary border-slate-300 hover:border-accent/50 hover:shadow-sm cursor-pointer"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lining Selector */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Lining
        </label>
        <div className="flex flex-wrap gap-2">
          {linings.map((l) => {
            const isActive = selectedLining === l;
            const isDisabled =
              selectedThickness !== null &&
              !variants.some((v) => v.lining === l && v.thickness === selectedThickness);

            return (
              <button
                key={l}
                onClick={() => handleLiningSelect(l)}
                disabled={isDisabled}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-wider border transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white border-accent shadow-[0_4px_12px_rgba(47,49,146,0.25)]"
                    : isDisabled
                    ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                    : "bg-white text-text-primary border-slate-300 hover:border-accent/50 hover:shadow-sm cursor-pointer"
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Variant Info */}
      {selectedVariant && (
        <div className="mb-6 p-4 rounded-lg bg-accent/5 border border-accent/15 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold text-accent uppercase tracking-wider">
              Configuration Selected
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            {lengthLabel && <span className="font-semibold">{lengthLabel}</span>}
            {" · "}
            <span className="font-semibold">{selectedVariant.thickness}</span>
            {" · "}
            <span className="font-semibold">{selectedVariant.lining}</span>
            {selectedVariant.brandName && (
              <span className="ml-2 px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full">
                {selectedVariant.brandName}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Enquire CTA */}
      <Link
        href={`/contact?${enquiryParams.toString()}`}
        className="w-full flex items-center justify-center gap-3 py-4 bg-cta text-white font-bold uppercase tracking-widest rounded hover:bg-cta-light transition-colors text-sm shadow-md"
      >
        Enquire Now <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Full Variant Table */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          All Available Variants
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {lengthLabel && (
                  <th className="text-left py-2.5 px-3 font-bold text-slate-500 uppercase tracking-wider text-xs">
                    Length
                  </th>
                )}
                <th className="text-left py-2.5 px-3 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  Thickness
                </th>
                <th className="text-left py-2.5 px-3 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  Lining
                </th>
                <th className="text-left py-2.5 px-3 font-bold text-slate-500 uppercase tracking-wider text-xs">
                  Brand
                </th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => {
                const isSelected =
                  v.thickness === selectedThickness && v.lining === selectedLining;
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      setSelectedThickness(v.thickness);
                      setSelectedLining(v.lining);
                    }}
                    className={`border-b border-slate-100 cursor-pointer transition-colors duration-150 ${
                      isSelected
                        ? "bg-accent/5"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {lengthLabel && (
                      <td className="py-3 px-3 text-text-secondary font-medium">
                        {lengthLabel}
                      </td>
                    )}
                    <td className="py-3 px-3 text-text-primary font-semibold">
                      {v.thickness}
                    </td>
                    <td className="py-3 px-3 text-text-secondary">
                      {v.lining}
                    </td>
                    <td className="py-3 px-3">
                      {v.brandName ? (
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full">
                          {v.brandName}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tagline */}
      {tagline && (
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-accent/5 to-transparent border-l-4 border-accent">
          <p className="text-sm text-text-secondary italic leading-relaxed">
            {tagline}
          </p>
        </div>
      )}
    </div>
  );
}
