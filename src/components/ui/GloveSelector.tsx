"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Droplet,
  Zap,
  Hand,
  Truck,
  Factory,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { products, Product } from "@/data/products";

/* ─── Data Mappings ─── */
type IndustryKey =
  | "chemical"
  | "oil-gas"
  | "electronics"
  | "glass-metal"
  | "tyre-rubber"
  | "general";

type HazardKey =
  | "chemical-splash"
  | "cut-sharp"
  | "oil-grease"
  | "static"
  | "abrasion"
  | "heat";

interface IndustryOption {
  key: IndustryKey;
  label: string;
  icon: typeof FlaskConical;
  desc: string;
  suggestedHazards: HazardKey[];
}

interface HazardOption {
  key: HazardKey;
  label: string;
  desc: string;
}

const INDUSTRIES: IndustryOption[] = [
  {
    key: "chemical",
    label: "Chemical & Pharmaceutical",
    icon: FlaskConical,
    desc: "Acids, solvents, reagents, lab work",
    suggestedHazards: ["chemical-splash", "abrasion"],
  },
  {
    key: "oil-gas",
    label: "Oil, Gas & Petroleum",
    icon: Droplet,
    desc: "Hydrocarbons, petroleum derivatives, refinery ops",
    suggestedHazards: ["chemical-splash", "oil-grease", "heat"],
  },
  {
    key: "electronics",
    label: "Electronics & EV Assembly",
    icon: Zap,
    desc: "PCB handling, ESD-sensitive components",
    suggestedHazards: ["static", "abrasion"],
  },
  {
    key: "glass-metal",
    label: "Glass & Sheet Metal",
    icon: Hand,
    desc: "Sharp edges, cutting, stamping, fabrication",
    suggestedHazards: ["cut-sharp", "abrasion"],
  },
  {
    key: "tyre-rubber",
    label: "Tyre & Rubber Industry",
    icon: Truck,
    desc: "Loading, unloading, material handling",
    suggestedHazards: ["oil-grease", "abrasion", "cut-sharp"],
  },
  {
    key: "general",
    label: "General Manufacturing",
    icon: Factory,
    desc: "Assembly lines, packaging, maintenance",
    suggestedHazards: ["abrasion", "oil-grease"],
  },
];

const HAZARDS: HazardOption[] = [
  {
    key: "chemical-splash",
    label: "Chemical Splash & Immersion",
    desc: "Protection from acids, solvents, ketones, bases",
  },
  {
    key: "cut-sharp",
    label: "Cut & Sharp Object Handling",
    desc: "Protection from blades, glass, sheet metal edges",
  },
  {
    key: "oil-grease",
    label: "Oil & Grease Contact",
    desc: "Grip and protection in oily/greasy environments",
  },
  {
    key: "static",
    label: "Electrostatic Discharge (ESD)",
    desc: "Anti-static protection for sensitive components",
  },
  {
    key: "abrasion",
    label: "Abrasion & General Wear",
    desc: "Resistance to rubbing, rough surfaces, handling",
  },
  {
    key: "heat",
    label: "Contact Heat",
    desc: "Protection from moderate thermal exposure",
  },
];

/* ─── Matching Engine ─── */
function getMatchingProducts(
  industry: IndustryKey | null,
  hazards: HazardKey[]
): Product[] {
  if (!industry || hazards.length === 0) return [];

  // Count how many "primary" (non-abrasion) hazards are selected
  const primaryHazards = hazards.filter((h) => h !== "abrasion");

  const scored = products.map((p) => {
    let score = 0;

    // ── Primary hazard matches (strong signals, +10 each) ──
    if (hazards.includes("chemical-splash") && p.category === "chemical-protection") score += 10;
    if (hazards.includes("cut-sharp") && p.category === "cut-resistant") {
      score += 10;
      if (p.cutLevel === "E") score += 3;
      else if (p.cutLevel === "D") score += 2;
      else if (p.cutLevel === "C") score += 1;
    }
    if (hazards.includes("oil-grease") && p.category === "oil-grip") score += 10;
    if (hazards.includes("static") && p.category === "anti-static") score += 10;
    if (hazards.includes("heat") && p.certifications.some((c) => c.includes("EN 407"))) score += 8;

    // ── Abrasion is a weak/secondary signal — only boost if no primary hazard matched ──
    if (hazards.includes("abrasion") && score === 0) {
      if (p.category === "general-purpose") score += 5;
      if (p.category === "cut-resistant") score += 3;
    }

    // ── Industry-specific boosts (only on top of existing matches) ──
    if (score > 0) {
      if (industry === "chemical" && p.category === "chemical-protection") score += 3;
      if (industry === "oil-gas" && p.thickness) score += 2;
      if (industry === "electronics" && p.category === "anti-static") score += 5;
      if (industry === "glass-metal" && p.category === "cut-resistant" && (p.cutLevel === "D" || p.cutLevel === "E")) score += 4;
      if (industry === "tyre-rubber" && p.category === "oil-grip") score += 3;
      if (industry === "general" && p.category === "general-purpose") score += 4;
    }

    return { product: p, score };
  });

  const sorted = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (sorted.length === 0) return [];

  // Only keep products that score at least 50% of the best match
  const topScore = sorted[0].score;
  const threshold = topScore * 0.5;

  return sorted
    .filter((s) => s.score >= threshold)
    .slice(0, primaryHazards.length >= 2 ? 4 : 3) // tighter results for focused queries
    .map((s) => s.product);
}

/* ─── Step Animations ─── */
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

/* ─── Component ─── */
export default function GloveSelector() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey | null>(null);
  const [selectedHazards, setSelectedHazards] = useState<HazardKey[]>([]);

  const industryData = INDUSTRIES.find((i) => i.key === selectedIndustry);
  const matchedProducts = useMemo(
    () => getMatchingProducts(selectedIndustry, selectedHazards),
    [selectedIndustry, selectedHazards]
  );

  function goNext() { setDirection(1); setStep((s) => s + 1); }
  function goBack() { setDirection(-1); setStep((s) => s - 1); }
  function reset() { setDirection(-1); setStep(0); setSelectedIndustry(null); setSelectedHazards([]); }

  function selectIndustry(key: IndustryKey) {
    setSelectedIndustry(key);
    const ind = INDUSTRIES.find((i) => i.key === key);
    if (ind) setSelectedHazards(ind.suggestedHazards);
    setDirection(1);
    setStep(1);
  }

  function toggleHazard(key: HazardKey) {
    setSelectedHazards((prev) =>
      prev.includes(key) ? prev.filter((h) => h !== key) : [...prev, key]
    );
  }

  const stepLabels = ["Industry", "Hazards", "Results"];

  return (
    <>
      {/* ─── Progress Stepper ─── */}
      <div className="flex items-center justify-center gap-2 md:gap-4 max-w-lg mx-auto mb-12">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  i < step
                    ? "bg-accent text-white"
                    : i === step
                    ? "bg-accent text-white shadow-[0_0_15px_rgba(47,49,146,0.3)] scale-110"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-widest hidden sm:inline ${
                  i <= step ? "text-accent" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`w-8 md:w-16 h-[2px] transition-colors duration-500 ${
                  i < step ? "bg-accent" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ─── Step Content ─── */}
      <AnimatePresence mode="wait" custom={direction}>
        {/* ═══ STEP 0: SELECT INDUSTRY ═══ */}
        {step === 0 && (
          <motion.div
            key="step-0"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="text-center mb-10">
              <h3 className="font-display text-3xl md:text-4xl text-text-primary mb-3">
                WHAT INDUSTRY ARE YOU IN?
              </h3>
              <p className="text-slate-500 max-w-lg mx-auto text-sm">
                Select the industry closest to your operations. We&apos;ll narrow down the best options for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.key}
                  onClick={() => selectIndustry(ind.key)}
                  className="group text-left bg-white border border-slate-200/90 rounded-xl p-5 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(47,49,146,0.07)] shadow-[0_4px_20px_rgba(47,49,146,0.015)] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/10 group-hover:scale-105 transition-all duration-300">
                    <ind.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-bold text-text-primary text-sm mb-1 group-hover:text-accent transition-colors duration-300">
                    {ind.label}
                  </h4>
                  <p className="text-xs text-slate-500">{ind.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest">
                    Select <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 1: SELECT HAZARDS ═══ */}
        {step === 1 && (
          <motion.div
            key="step-1"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="text-center mb-10">
              <h3 className="font-display text-3xl md:text-4xl text-text-primary mb-3">
                WHAT HAZARDS DO YOU FACE?
              </h3>
              <p className="text-slate-500 max-w-lg mx-auto text-sm">
                We&apos;ve pre-selected hazards common to{" "}
                <span className="font-bold text-accent">{industryData?.label}</span>.
                Adjust as needed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto mb-10">
              {HAZARDS.map((hazard) => {
                const isSelected = selectedHazards.includes(hazard.key);
                return (
                  <button
                    key={hazard.key}
                    onClick={() => toggleHazard(hazard.key)}
                    className={`group text-left rounded-xl p-4 border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-accent/[0.04] border-accent/50 shadow-[0_8px_25px_rgba(47,49,146,0.06)]"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                          isSelected
                            ? "bg-accent border-accent"
                            : "border-slate-300 group-hover:border-slate-400"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <h4
                          className={`font-bold text-sm mb-0.5 transition-colors duration-300 ${
                            isSelected ? "text-accent" : "text-text-primary"
                          }`}
                        >
                          {hazard.label}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{hazard.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={goBack}
                className="px-6 py-2.5 border border-slate-300 text-text-primary font-bold tracking-widest uppercase rounded text-sm hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={goNext}
                disabled={selectedHazards.length === 0}
                className="px-7 py-2.5 bg-accent text-white font-bold tracking-widest uppercase rounded text-sm shadow-[0_4px_15px_rgba(47,49,146,0.2)] hover:shadow-[0_8px_25px_rgba(47,49,146,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
              >
                See Recommendations <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 2: RESULTS ═══ */}
        {step === 2 && (
          <motion.div
            key="step-2"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-accent font-semibold text-xs tracking-widest uppercase">
                  Your Recommendations
                </span>
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-text-primary mb-3">
                {matchedProducts.length > 0
                  ? `WE FOUND ${matchedProducts.length} GLOVE${matchedProducts.length !== 1 ? "S" : ""} FOR YOU`
                  : "NO EXACT MATCHES FOUND"}
              </h3>
              <p className="text-slate-500 max-w-lg mx-auto text-sm">
                {matchedProducts.length > 0
                  ? `Based on your ${industryData?.label} profile and selected hazards.`
                  : "Try adjusting your selections or contact our team for a custom recommendation."}
              </p>
            </div>

            {/* Filters summary */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mr-1">Filters:</span>
              {industryData && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/5 border border-accent/20 rounded-full text-[10px] font-bold text-accent">
                  <industryData.icon className="w-3 h-3" />
                  {industryData.label}
                </span>
              )}
              {selectedHazards.map((hk) => {
                const h = HAZARDS.find((hz) => hz.key === hk);
                return (
                  <span key={hk} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-[10px] font-bold text-slate-600">
                    <ShieldCheck className="w-3 h-3 text-slate-400" />
                    {h?.label}
                  </span>
                );
              })}
            </div>

            {/* Results */}
            {matchedProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
                {matchedProducts.map((product, idx) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="group block bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:border-accent/30 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(47,49,146,0.08)] shadow-[0_4px_20px_rgba(47,49,146,0.015)] transition-all duration-300"
                    >
                      <div
                        className="h-1.5 w-full transition-transform duration-300 origin-left group-hover:scale-y-[2]"
                        style={{ backgroundColor: product.accentColor }}
                      />
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-slate-400 font-bold tracking-wider">{product.code}</span>
                          {idx === 0 && (
                            <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">
                              Best Match
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-text-primary mb-1.5 group-hover:text-accent transition-colors duration-300 leading-snug text-sm">
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{product.application}</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {product.certifications.slice(0, 3).map((cert) => (
                            <span key={cert} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-500 tracking-wider">
                              {cert}
                            </span>
                          ))}
                          {product.cutLevel && (
                            <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded text-[10px] font-bold text-amber-700 tracking-wider">
                              CUT {product.cutLevel}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-widest group-hover:gap-2 transition-all duration-300">
                          View Details <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-text-primary font-bold tracking-widest uppercase rounded text-sm hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Start Over
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-2.5 bg-cta text-white font-bold tracking-widest uppercase rounded text-sm shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:bg-cta-light hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Need Help? Talk to Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
