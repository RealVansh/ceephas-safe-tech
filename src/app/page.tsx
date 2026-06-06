"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Factory, Globe, ShieldAlert, Settings, FlaskConical, Droplet, Zap, Hand, Truck, CheckCircle2 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useCountUp } from "@/hooks/useCountUp";
import { products } from "@/data/products";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import CertificationMarks from "@/components/ui/CertificationMarks";

// --- Animated Stat ---

function AnimatedStat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(value, 2500);
  return (
    <div ref={ref} className="text-center p-6 lg:p-8">
      <div className="font-display text-5xl md:text-6xl text-text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="font-body text-sm text-text-tertiary uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");

  const heroImages = [
    "/assets/hero-glove1.png",
    "/assets/hero-glove2.png",
    "/assets/hero-glove3.png",
    "/assets/hero-glove4.png",
    "/assets/hero-glove5.png",
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentImgIndex, heroImages.length]);

  const swallowVariants = {
    enter: {
      scale: 0,
      rotate: -180,
      opacity: 0,
      filter: "blur(10px)",
    },
    center: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 15,
        mass: 0.8,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.55,
        ease: "easeInOut" as const,
      },
    },
  } as const;

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
      ? products.slice(0, 6)
      : products.filter(
          (p) => p.category.toLowerCase() === activeTab.toLowerCase().replace(" ", "-")
        ).slice(0, 6);

  return (
    <>
      {/* ─── SECTION A: HERO ─── */}
      <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-7rem)] flex items-center overflow-hidden bg-white py-12 lg:py-0">
        
        {/* Split-Screen Background: Left White, Right Factory */}
        <div className="absolute inset-0 z-0 flex flex-col lg:flex-row">
          {/* Left Side: Solid White (Transparent on mobile to let background through) */}
          <div className="w-full lg:w-1/2 h-full bg-transparent lg:bg-white relative z-10" />
          
          {/* Right Side: Factory Image */}
          <div className="absolute inset-0 lg:relative lg:inset-auto w-full lg:w-1/2 h-full z-0 lg:z-10 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 lg:transition-transform lg:duration-1000 lg:hover:scale-105" 
              style={{ backgroundImage: "url('/assets/about-images/int.jpg')" }}
            />
            
            {/* Mobile faded overlay (so text is readable on mobile where layout stacks) */}
            <div className="lg:hidden absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
            <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white" />
          </div>
        </div>
        
        {/* Ambient glow over the left text area */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse, rgba(47,49,146,0.04), transparent 70%)" }}
        />

        <div className="container relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 pt-4 lg:pt-0">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
            >

              <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] text-text-primary mb-6 tracking-wide drop-shadow-sm relative z-10">
                MANUFACTURER<br />
                OF <span className="text-accent">CHEMICAL</span><br />
                <span className="text-accent">RESISTANT</span><br />
                <span className="text-cta">NITRILE GLOVES</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="font-body text-lg text-text-primary max-w-lg mb-10 leading-relaxed font-semibold drop-shadow-sm relative z-10">
                Protection Engineered. Trusted Globally. Built to international standards. CE &amp; UKCA certified.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 relative z-10">
                <Link href="/products" className="flex items-center justify-center gap-2 px-8 py-4 bg-cta text-white font-bold tracking-widest uppercase rounded shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:bg-cta-light hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out text-sm cursor-pointer">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column — Dynamic Hero Visual */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[300px] lg:min-h-[480px] mt-8 lg:mt-0">
            {/* Rotating hexagon background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] flex items-center justify-center opacity-70"
            >
              {/* Outer Hexagon */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-accent drop-shadow-[0_4px_15px_rgba(47,49,146,0.15)]">
                <polygon
                  points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
              {/* Inner Hexagon (Counter-rotating) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300">
                  <polygon
                    points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Hero Glove Image Slideshow with Vortex (Swallow) Animation */}
            <div className="relative z-10 w-[280px] h-[240px] lg:w-[420px] lg:h-[360px] flex items-center justify-center translate-y-8 lg:translate-y-12 scale-100 lg:scale-110">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center relative"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    src={heroImages[currentImgIndex]}
                    alt={`Cephas Safety Glove ${currentImgIndex + 1}`}
                    className="absolute w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.22)] select-none cursor-pointer"
                    variants={swallowVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onClick={() => setCurrentImgIndex((prev) => (prev + 1) % heroImages.length)}
                  />
                </AnimatePresence>
              </motion.div>
              
              {/* Navigation Indicators */}
              <div className="absolute -bottom-6 flex gap-2.5 z-20">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentImgIndex
                        ? "bg-accent w-6 shadow-[0_0_8px_rgba(237,28,37,0.4)]"
                        : "bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to glove image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stat Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="absolute top-2 right-0 md:top-8 md:right-4 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg rounded-lg px-2.5 py-1.5 md:px-4 md:py-3 z-20"
            >
              <div className="font-display text-base md:text-xl text-accent font-bold tracking-wide">CE &amp; UKCA</div>
              <div className="text-[9px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">Certified</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg rounded-lg px-2.5 py-1.5 md:px-4 md:py-3 z-20"
            >
              <div className="font-display text-base md:text-xl text-accent font-bold tracking-wide">8.4M+</div>
              <div className="text-[9px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">Pairs / Year</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
              className="absolute bottom-6 right-2 md:bottom-12 md:right-8 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg rounded-lg px-2.5 py-1.5 md:px-4 md:py-3 z-20"
            >
              <div className="font-display text-base md:text-xl text-accent font-bold tracking-wide">ISO 9001</div>
              <div className="text-[9px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">Quality System</div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── SECTION B: STATS BAR ─── */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10" />
      <section className="bg-white/80 backdrop-blur-sm relative z-10 py-2">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <AnimatedStat value={8400000} suffix="+" label="Pairs / Year Capacity" />
            <AnimatedStat value={16} suffix="" label="Product Variants" />
            <AnimatedStat value={6} suffix="" label="Globally Relevant Credentials" />
          </div>
        </div>
      </section>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent relative z-10" />

      {/* ─── MANUFACTURER BANNER STRIP ─── */}
      <section className="bg-slate-50 py-8 relative overflow-hidden">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
              <Factory className="w-5 h-5 text-accent shrink-0" />
              <span
                className="font-display text-2xl font-bold uppercase tracking-wider"
                style={{
                  background: 'linear-gradient(90deg, #2F3192 0%, #7E80C2 50%, #ED1C25 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Own Manufacturing
              </span>
              <span className="text-slate-300 font-bold text-lg">•</span>
              <span className="font-body text-sm md:text-base text-slate-500 font-semibold uppercase tracking-wider">
                SIDCO Industrial Estate, Virudhunagar
              </span>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* ─── SECTION C: PRODUCT RANGE PREVIEW ─── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Soft atmospheric radial spotlight */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(47,49,146,0.025),transparent_70%)] pointer-events-none" />
        
        <div className="container relative z-10">
          <SectionHeader
            label="Our Products"
            title="ENGINEERED FOR EVERY HAZARD"
            subtitle="From chemical splash to cut-level E — a glove for every industrial challenge."
          />

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto mb-12 gap-2 justify-start md:justify-center items-center no-scrollbar bg-slate-100/60 p-1.5 rounded-full border border-slate-200/60 max-w-fit mx-auto shadow-sm">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative whitespace-nowrap font-display text-sm uppercase tracking-widest px-6 py-2.5 rounded-full transition-colors duration-300 font-bold z-10 cursor-pointer ${
                    isActive ? "text-white" : "text-slate-500 hover:text-text-primary"
                  }`}
                >
                  <span className="relative z-10">{tab}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-accent rounded-full shadow-[0_4px_10px_rgba(47,49,146,0.15)] z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="min-h-[600px] mb-12">
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

          <div className="text-center">
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-300 text-text-primary font-bold tracking-widest uppercase rounded hover:bg-white hover:border-accent/40 hover:shadow-[0_8px_20px_rgba(47,49,146,0.06)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out text-sm shadow-sm">
              View All 16 Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION D: WHY CHOOSE US ─── */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        {/* Technical blueprint drafting grid accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.22] pointer-events-none" />
        
        <div className="container relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-accent font-semibold text-xs tracking-widest uppercase">Why Cephas</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl text-text-primary mb-6">
              PRECISION BUILT.<br />GLOBALLY PROVEN.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 mb-12 leading-relaxed text-lg max-w-2xl">
              Every product that leaves our facility is tested against the world&apos;s most demanding standards. We don&apos;t just meet compliance — we engineer for the conditions your workers actually face.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Factory, title: "State-of-the-Art Manufacturing", desc: "Fully automated dipping lines with international standard machines at our Virudhunagar, Tamil Nadu facility." },
              { icon: Globe, title: "Globally Certified", desc: "CE, UKCA, ISO 9001:2015, SEDEX and SMETA certified. Our products meet EN ISO 374-1, EN 388 and EN 407 standards." },
              { icon: ShieldAlert, title: "Chemical Resistance Specialists", desc: "EN ISO 374-1:2016 Type A certified — tested against 18 hazardous chemical classes including acids, solvents and hydrocarbons." },
              { icon: Settings, title: "Custom Solutions at Scale", desc: "Products can be tailored to your specifications. 84,00,000 pairs per year production capacity, fully scalable." }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 bg-white border border-slate-200 rounded-xl p-6 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(47,49,146,0.045)] shadow-[0_4px_20px_rgba(47,49,146,0.015)] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:scale-105 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold mb-1.5 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION E: CERTIFICATIONS SNAPSHOT ─── */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-4">
                <div className="h-[2px] w-8 bg-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">International Approvals</span>
              </div>
              <h3 className="mb-5 font-display text-4xl text-text-primary md:text-5xl">CERTIFIED WHERE IT COUNTS</h3>
              <p className="mb-7 max-w-xl text-slate-600 leading-relaxed">
                A quick trust signal for buyers, backed by detailed test standards and declarations on the dedicated standards page.
              </p>
              <Link href="/standards" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent transition-colors duration-300 hover:text-accent-light">
                View Detailed Standards <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <CertificationMarks compact />
          </div>
        </div>
      </section>

      {/* ─── SECTION G: INDUSTRIES WE SERVE ─── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        {/* Soft atmospheric spotlight */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_bottom_left,rgba(47,49,146,0.025),transparent_70%)] pointer-events-none" />
        <div className="container">
          <h3 className="font-display text-4xl text-center text-text-primary mb-16 tracking-widest">INDUSTRIES WE PROTECT</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FlaskConical, name: "Chemical & Pharmaceutical" },
              { icon: Droplet, name: "Oil, Gas & Petroleum" },
              { icon: Zap, name: "Electronics & EV Assembly" },
              { icon: Hand, name: "Glass & Sheet Metal Handling" },
              { icon: Truck, name: "Tyre & Rubber Industry" },
              { icon: Factory, name: "General Manufacturing" },
            ].map((ind, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50 border border-slate-200/90 p-6 rounded-lg hover:border-accent/20 hover:bg-white hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(47,49,146,0.035)] transition-all duration-300 group cursor-pointer">
                <div className="p-2.5 rounded-lg bg-slate-100 group-hover:bg-accent/5 transition-colors duration-300">
                  <ind.icon className="w-7 h-7 text-slate-400 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                </div>
                <span className="font-bold text-text-primary uppercase tracking-wider text-sm group-hover:text-accent transition-colors duration-300">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION: WHY BUY DIRECT ─── */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-cta" />
              <span className="text-cta font-semibold text-xs tracking-widest uppercase">Direct Manufacturer Advantage</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl text-text-primary mb-12">
              WHY BUY DIRECT FROM THE MAKER?
            </motion.h2>
            {/* <motion.p variants={fadeUp} className="text-slate-600 mb-16 leading-relaxed text-lg max-w-2xl">
              This industry is dominated by traders who rebrand and resell. When you work with Cephas Safe Tech, you work with the people who actually make the gloves.
            </motion.p> */}
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-stretch">
            {/* CEPHAS Card */}
            <div className="flex-1 bg-white border border-accent/25 hover:border-accent/45 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(47,49,146,0.08)] transition-all duration-300 shadow-[0_8px_30px_rgba(47,49,146,0.03)] bg-gradient-to-br from-white via-white to-accent/[0.005] rounded-2xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Factory className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-text-primary tracking-wide font-bold">CEPHAS SAFE TECH</h3>
                  <span className="text-xs text-accent font-bold uppercase tracking-widest">The Manufacturer</span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  "End-to-end quality control in our own facility",
                  "Full OEM & Private Label customization",
                  "Direct holder of CE, UKCA, ISO 9001 certifications",
                  "Factory-direct pricing, no middleman markup",
                  "Controlled lead times from our own lines",
                  "Full traceability from raw material to product"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-text-primary font-semibold leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VS Divider
            <div className="flex items-center justify-center lg:flex-col lg:px-6 py-6 lg:py-0">
              <div className="hidden lg:block w-[2px] flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
              <div className="w-14 h-14 rounded-full bg-white border-2 border-accent flex items-center justify-center mx-4 lg:mx-0 lg:my-4 shrink-0 shadow-md">
                <span className="font-display text-lg text-accent font-bold">VS</span>
              </div>
              <div className="hidden lg:block w-[2px] flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
              <div className="lg:hidden flex-1 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>

            {/* TRADER Card */}
            {/* <div className="flex-1 bg-white/85 border border-slate-200 rounded-2xl p-8 lg:p-10 relative overflow-hidden opacity-90 hover:opacity-100 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.02)] transition-all duration-300">
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-slate-600 tracking-wide font-bold">TYPICAL TRADER</h3>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">The Reseller</span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  "No control over production quality",
                  "Limited to supplier stock options",
                  "Borrowed or claimed certifications",
                  "Marked up pricing with hidden margins",
                  "Dependent on third-party supplier timelines",
                  "No visibility into manufacturing process"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 opacity-75">
                    <XCircle className="w-6 h-6 text-slate-400 shrink-0" />
                    <span className="text-slate-500 leading-relaxed font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ─── SECTION H: CTA BANNER ─── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1120 0%, #1E293B 50%, #0B3C5D 100%)" }}>
        <div className="grain-overlay opacity-10" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6 text-shadow-glow">
            READY TO PROTECT YOUR WORKFORCE?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg font-medium">
            Talk to our team about the right glove specification for your application.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-cta text-white font-bold tracking-widest uppercase rounded shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:bg-cta-light hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out text-sm w-full sm:w-auto cursor-pointer">
              Request a Quote
            </Link>
            <Link href="/products" className="px-8 py-4 bg-transparent border border-slate-500 text-white font-bold tracking-widest uppercase rounded hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out text-sm w-full sm:w-auto cursor-pointer">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
