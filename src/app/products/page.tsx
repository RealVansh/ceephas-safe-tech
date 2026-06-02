"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, HelpCircle, Download, Shield, FlaskConical, Ruler } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import PageHero from "@/components/ui/PageHero";
import GloveSelector from "@/components/ui/GloveSelector";

/* ─── Chemical family cards data ─── */
const familyCards = [
  {
    slug: "chem-13",
    icon: FlaskConical,
    title: "13 Inch Nitrile Gloves",
    subtitle: "Flock lined & unlined · 11 to 18 mil",
    description:
      "The industry standard length for chemical resistant hand protection. Available across multiple thicknesses for light to heavy-duty chemical handling.",
    highlight: true,
  },
  {
    slug: "chem-15",
    icon: Shield,
    title: "15 Inch Nitrile Gloves",
    subtitle: "Mid-length protection · 11 to 18 mil",
    description:
      "Extended wrist and lower forearm coverage for applications requiring additional splash protection without full forearm coverage.",
    highlight: false,
  },
  {
    slug: "chem-18",
    icon: Ruler,
    title: "18 Inch Long Cuff Nitrile Gloves",
    subtitle: "Unlined · 15 & 22 mil",
    description:
      "Full forearm protection for demanding chemical handling environments. One of the few specialist manufacturers producing this specification globally.",
    highlight: false,
    badge: "Specialized Long Cuff",
  },
];

/* ─── Compute variant table data ─── */
const chemProducts = products.filter(
  (p) => p.category === "chemical-protection"
);

const allVariants = chemProducts.flatMap(
  (p) =>
    p.variants?.map((v) => ({
      length: p.lengthLabel || "",
      thickness: v.thickness,
      lining: v.lining,
      brandName: v.brandName,
    })) || []
);

export default function Products() {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = [
    "All",
    "Chemical Protection",
    "Cut Resistant",
    "Anti-Static",
    "Oil Grip",
    "General Purpose",
  ];

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === activeTab.toLowerCase().replace(" ", "-")
        );

  const isChemicalTab = activeTab === "Chemical Protection";

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        title="OUR GLOVE RANGE"
      />

      {/* Filter & Actions Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex overflow-x-auto gap-6 md:gap-8 justify-start no-scrollbar w-full md:w-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap font-display text-lg md:text-xl tracking-wider transition-colors ${
                    activeTab === tab
                      ? "text-accent border-b-2 border-accent pb-1"
                      : "text-slate-500 hover:text-text-primary"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Download Catalog CTA */}
            <div className="w-full md:w-auto flex justify-start md:justify-end shrink-0 pl-2">
              <Link
                href="/contact?intent=catalog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-accent-light hover:shadow-[0_4px_12px_rgba(47,49,146,0.3)] transition-all duration-300 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Chemical Protection: Rich Catalogue Section ─── */}
      <AnimatePresence mode="wait">
        {isChemicalTab && (
          <motion.div
            key="chem-catalogue"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Intro + Family Cards */}
            <section className="py-14 bg-white">
              <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <h2 className="font-display text-3xl md:text-5xl text-text-primary mb-4">
                    CHEMICAL RESISTANT NITRILE GLOVES
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Specialized nitrile gloves available in multiple cuff lengths,
                    thicknesses, and lining options for industrial chemical handling.
                    Built for demanding environments and available for OEM and private
                    label requirements.
                  </p>
                  <Link
                    href="/products/chemical-resistant-gloves"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:underline"
                  >
                    View Chemical Resistant Range
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 3 Product Family Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {familyCards.map((card) => (
                    <Link
                      key={card.slug}
                      href={`/products/${card.slug}`}
                      className={`group relative rounded-xl border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(47,49,146,0.08)] ${
                        card.highlight
                          ? "border-accent/30 bg-gradient-to-br from-accent/[0.03] to-white shadow-[0_8px_25px_rgba(47,49,146,0.06)]"
                          : "border-slate-200 bg-white hover:border-accent/25"
                      }`}
                    >
                      {card.highlight && (
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-accent text-white text-[0.6rem] font-bold uppercase tracking-widest rounded-full shadow-sm">
                          Most Popular
                        </div>
                      )}
                      {card.badge && (
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-cta text-white text-[0.6rem] font-bold uppercase tracking-widest rounded-full shadow-sm">
                          {card.badge}
                        </div>
                      )}

                      <div className="mb-5 p-3 rounded-lg bg-accent/5 w-fit group-hover:bg-accent/10 transition-colors duration-300">
                        <card.icon className="w-7 h-7 text-accent" />
                      </div>

                      <h3 className="font-display text-2xl text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-4">
                        {card.subtitle}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        {card.description}
                      </p>

                      <span className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                        View Configurations{" "}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Full Configuration Table */}
            <section className="py-14 bg-slate-50 relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <div className="container">
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-3">
                    ALL AVAILABLE CONFIGURATIONS
                  </h2>
                  <p className="text-slate-500 max-w-xl mx-auto">
                    Complete range of chemical resistant nitrile gloves with
                    customizable thickness and lining options.
                  </p>
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left py-3.5 px-5 font-bold text-slate-500 uppercase tracking-wider text-xs">
                            Length
                          </th>
                          <th className="text-left py-3.5 px-5 font-bold text-slate-500 uppercase tracking-wider text-xs">
                            Thickness
                          </th>
                          <th className="text-left py-3.5 px-5 font-bold text-slate-500 uppercase tracking-wider text-xs">
                            Lining
                          </th>
                          <th className="text-left py-3.5 px-5 font-bold text-slate-500 uppercase tracking-wider text-xs">
                            Brand
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allVariants.map((v, i) => (
                          <tr
                            key={i}
                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                          >
                            <td className="py-3 px-5 text-text-primary font-semibold">
                              {v.length}
                            </td>
                            <td className="py-3 px-5 text-text-secondary font-medium">
                              {v.thickness}
                            </td>
                            <td className="py-3 px-5 text-text-secondary">
                              {v.lining}
                            </td>
                            <td className="py-3 px-5">
                              {v.brandName ? (
                                <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full">
                                  {v.brandName}
                                </span>
                              ) : (
                                <span className="text-slate-300">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                  <Link
                    href="/contact?intent=custom-chemical-glove"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-cta text-white font-bold tracking-widest uppercase rounded shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:bg-cta-light hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
                  >
                    Request Custom Configuration{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Product Grid ─── */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          {/* Section heading when in chemical tab */}
          {isChemicalTab && (
            <h2 className="font-display text-3xl md:text-4xl text-text-primary text-center mb-10">
              PRODUCT DETAILS
            </h2>
          )}

          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {filteredProducts.length === 0 && (
             <div className="py-20 text-center text-slate-400">
               No products found in this category.
             </div>
          )}
        </div>
      </section>

      {/* ─── Glove Selection Guide (Inline) ─── */}
      <section id="glove-guide" className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Atmospheric accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(47,49,146,0.02),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_left,rgba(47,49,146,0.015),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="container relative z-10">
          {/* Intro */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/15 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Need Help Choosing?
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-text-primary mb-4">
              NOT SURE WHICH GLOVE<br />IS RIGHT FOR YOU?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
              Answer two quick questions about your industry and hazards — we&apos;ll match you with the best glove from our range.
            </p>
          </div>

          {/* Wizard */}
          <GloveSelector />
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1120 0%, #1E293B 50%, #0B3C5D 100%)" }}>
        <div className="grain-overlay opacity-10" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            STILL NEED EXPERT GUIDANCE?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 font-medium">
            Our team has decades of experience matching gloves to real-world hazards. Send us your requirements and we&apos;ll recommend the exact specification.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cta text-white font-bold tracking-widest uppercase rounded shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:bg-cta-light hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
          >
            Get Expert Help <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
