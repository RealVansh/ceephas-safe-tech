"use client";

import { useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Factory, FileCheck2, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { CertificationPictogram } from "@/components/ui/CertificationMarks";
import Lightbox from "@/components/ui/Lightbox";
import {
  facilityCertifications,
  productCertifications,
  type Certification,
} from "@/data/certifications";

function CertificateVisual({ 
  certification,
  onZoom,
}: { 
  certification: Certification;
  onZoom?: (img: string | string[], title: string) => void;
}) {
  const hasImage = !!certification.certificateImage || !!(certification.certificateScans && certification.certificateScans.length > 0);
  let coverImage = "";
  if (certification.certificateImage) {
    coverImage = Array.isArray(certification.certificateImage) ? certification.certificateImage[0] : certification.certificateImage;
  } else if (certification.certificateScans && certification.certificateScans.length > 0) {
    coverImage = certification.certificateScans[0].images[0];
  }
  
  const content = (
    <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-slate-50 w-full">
      {hasImage ? (
        <>
          <Image
            src={coverImage!}
            alt={`${certification.title} certificate`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Zoom Overlay Hint */}
          <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="rounded-full bg-slate-900/60 backdrop-blur-md text-white px-3 py-1.5 text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-md">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
              Click to View Full
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-5 h-28 w-20 rounded-md border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
            <div className="absolute left-3 right-3 top-4 h-1 rounded-full bg-accent/25" />
            <div className="absolute left-3 right-5 top-8 h-1 rounded-full bg-slate-200" />
            <div className="absolute left-3 right-4 top-12 h-1 rounded-full bg-slate-200" />
            <FileCheck2 className="absolute bottom-4 left-1/2 h-9 w-9 -translate-x-1/2 text-accent" strokeWidth={1.7} />
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-text-primary">
            Certificate Image Pending
          </div>
          <p className="mt-2 max-w-56 text-xs leading-relaxed text-text-tertiary">
            certificate scan will be added here.
          </p>
        </div>
      )}
    </div>
  );

  if (hasImage && onZoom) {
    return (
      <button 
        type="button"
        onClick={() => {
          if (certification.certificateScans && certification.certificateScans.length > 0) {
            onZoom(certification.certificateScans[0].images, `${certification.title} - ${certification.certificateScans[0].label}`);
          } else if (certification.certificateImage) {
            onZoom(certification.certificateImage, certification.title);
          }
        }}
        className="w-full text-left cursor-zoom-in outline-none focus:ring-2 focus:ring-accent/50 group"
      >
        {content}
      </button>
    );
  }

  return content;
}

function CertificationProofCard({ 
  certification,
  onZoom,
}: { 
  certification: Certification;
  onZoom?: (img: string | string[], title: string) => void;
}) {
  const categoryLabel =
    certification.category === "facility" ? "Facility Certification" : "Product Certification";

  return (
    <div className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_42px_rgba(47,49,146,0.08)] flex flex-col h-full">
      <CertificateVisual certification={certification} onZoom={onZoom} />
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-6 flex items-start gap-4">
          <CertificationPictogram certification={certification} compact />
          <div className="pt-1">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent">
              {categoryLabel}
            </span>
            <h3 className="mt-1 text-xl font-bold text-text-primary">
              {certification.title}
            </h3>
          </div>
        </div>
        <p className="mb-3 text-sm font-semibold text-text-secondary">
          {certification.summary}
        </p>
        <p className="text-sm leading-relaxed text-text-tertiary mb-6">
          {certification.detail}
        </p>

        {certification.certificateScans && certification.certificateScans.length > 0 && (
          <div className="mt-auto space-y-3 border-t border-slate-100 pt-5">
            {certification.certificateScans.map(scan => (
              <button
                key={scan.label}
                onClick={() => onZoom && onZoom(scan.images, `${certification.title} - ${scan.label}`)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-accent-light transition-colors group/btn"
              >
                <FileCheck2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                View {scan.label} Cert
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CertificationGroup({
  title,
  intro,
  icon: Icon,
  items,
  onZoom,
}: {
  title: string;
  intro: string;
  icon: LucideIcon;
  items: Certification[];
  onZoom?: (img: string | string[], title: string) => void;
}) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="font-display text-3xl text-text-primary">
              {title}
            </h2>
          </div>
          <p className="max-w-2xl text-text-secondary leading-relaxed">
            {intro}
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((certification) => (
          <CertificationProofCard 
            key={certification.id} 
            certification={certification} 
            onZoom={onZoom}
          />
        ))}
      </div>
    </div>
  );
}

export default function Standards() {
  const [zoomImages, setZoomImages] = useState<string[]>([]);
  const [zoomTitle, setZoomTitle] = useState("");

  const handleZoom = (imgs: string | string[], title: string) => {
    setZoomImages(Array.isArray(imgs) ? imgs : [imgs]);
    setZoomTitle(title);
  };

  const chemRows = [
    ["A","Methanol","6756-1","Primary Alcohol"],["B","Acetone","6764-1","Ketone"],
    ["C","Acetonitrile","75-05-8","Ketone"],["D","Dichloromethane","75-09-2","Chlorinated hydrocarbon"],
    ["E","Carbon disulphide","75-15-0","Sulphur organic compound"],["F","Toluene","108-88-3","Aromatic hydrocarbon"],
    ["G","Diethylamine","109-89-7","Amine"],["H","Tetrahydrofuran","109-99-9","Heterocyclic/ether compound"],
    ["I","Ethyl acetate","141-78-6","Ester"],["J","n-Heptane","142-82-5","Saturated hydrocarbon"],
    ["K","Sodium hydroxide 40%","1310-73-2","Inorganic base"],["L","Sulphuric acid 96%","7664-93-9","Inorganic mineral acid, oxidizing"],
    ["M","Nitric acid 65%","7697-37-2","Inorganic mineral acid, oxidizing"],["N","Acetic acid 99%","64-19-7","Organic acid"],
    ["O","Ammonium hydroxide 25%","1336-21-6","Organic base"],["P","Hydrogen peroxide 30%","7722-84-1","Peroxide"],
    ["S","Hydrofluoric acid 40%","7664-39-3","Inorganic mineral acid"],["T","Formaldehyde 37%","50-00-0","Aldehyde"],
  ];
  const thCls = "bg-accent/10 text-accent font-bold tracking-wider uppercase text-xs";
  const tdL = "py-3 px-4 font-mono font-bold text-text-primary text-left";

  return (
    <div className="bg-white min-h-screen">
      <PageHero breadcrumbs={[{label:"Home",href:"/"},{label:"Standards"}]} title="CERTIFICATIONS & STANDARDS" />

      <section id="certifications" className="py-24">
        <div className="container">
          <div className="mb-14 max-w-3xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[2px] w-8 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Certifications
              </span>
            </div>
            <h2 className="mb-5 font-display text-4xl text-text-primary md:text-5xl">
              FACILITY & PRODUCT CREDENTIALS
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Facility certifications prove manufacturing systems and sourcing practices. Product certifications prove market conformity and risk classification. Certificate scans can be placed into these cards as soon as the client provides them.
            </p>
          </div>

          <CertificationGroup
            title="Facility Certifications"
            intro="Factory-level and responsible sourcing credentials for buyers who evaluate the manufacturer, not just the glove."
            icon={Factory}
            items={facilityCertifications}
            onZoom={handleZoom}
          />

          <CertificationGroup
            title="Product Certifications"
            intro="Product-level marks and classifications that support market access and protection claims."
            icon={ShieldCheck}
            items={productCertifications}
            onZoom={handleZoom}
          />
        </div>
      </section>

      <section id="technical-standards" className="pb-12">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[2px] w-8 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Technical Standards
              </span>
            </div>
            <h2 className="mb-5 font-display text-4xl text-text-primary md:text-5xl">
              TEST METHODS & PROTECTION CLASSIFICATIONS
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Detailed EN standards remain here for technical buyers who need to verify chemical, mechanical and thermal protection performance.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="bg-white border-l-4 border-l-accent border border-slate-200 p-8 lg:p-12 rounded shadow-sm mb-16">
            <h2 className="font-display text-4xl text-text-primary mb-2">EN ISO 374-1:2016</h2>
            <h3 className="font-bold text-accent uppercase tracking-widest text-sm mb-6">PROTECTIVE GLOVES AGAINST DANGEROUS CHEMICALS AND MICRO-ORGANISMS</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">Based on three test methods:</p>
            <ul className="space-y-2 text-text-secondary mb-12 font-mono text-sm">
              <li>— Penetration test — EN 374-2:2014</li>
              <li>— Penetration test — EN 16523-1:2015 (replaces EN 374-3)</li>
              <li>— Degradation test — EN 374-4:2013</li>
            </ul>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[{type:"TYPE A",time:"≥30 min",chem:"6 chemicals",code:"AJKLPR"},{type:"TYPE B",time:"≥30 min",chem:"3 chemicals",code:"JKL"},{type:"TYPE C",time:"≥10 min",chem:"1 chemical",code:"—"}].map(t=>(
                <div key={t.type} className="bg-white border border-slate-200 p-6 rounded text-center shadow-sm">
                  <div className="font-display text-2xl text-text-primary mb-2">{t.type}</div>
                  <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded mb-6">{t.type==="TYPE A"?"Highest Protection":"Standard Protection"}</div>
                  <div className="text-sm text-text-secondary font-bold mb-1">{t.time} breakthrough</div>
                  <div className="text-sm text-text-tertiary mb-4">for {t.chem}</div>
                  <div className="text-xl font-mono text-text-primary tracking-widest">{t.code}</div>
                </div>
              ))}
            </div>
            <h4 className="font-display text-2xl text-text-primary mb-6">Hazardous Chemicals Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap border border-slate-200">
                <thead><tr className={thCls}><th className="py-3 px-4 rounded-tl border-l-2 border-l-accent">Code</th><th className="py-3 px-4">Chemical Name</th><th className="py-3 px-4">CAS Number</th><th className="py-3 px-4 rounded-tr">Chemical Class</th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  {chemRows.map((r,i)=>(<tr key={i} className={i%2===0?"bg-white":"bg-slate-50"}><td className="py-3 px-4 font-mono font-bold text-accent">{r[0]}</td><td className="py-3 px-4 text-text-secondary">{r[1]}</td><td className="py-3 px-4 text-text-tertiary">{r[2]}</td><td className="py-3 px-4 text-text-tertiary">{r[3]}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="bg-white border-l-4 border-l-accent border border-slate-200 p-8 lg:p-12 rounded shadow-sm mb-16">
            <h2 className="font-display text-4xl text-text-primary mb-2">EN 388:2016</h2>
            <h3 className="font-bold text-accent uppercase tracking-widest text-sm mb-6">MECHANICAL RISKS</h3>
            <p className="text-text-secondary mb-10 max-w-3xl leading-relaxed">Abrasion resistance, cut resistance, tearing strength, puncture resistance and impact protection are tested.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-12 font-mono text-sm text-text-secondary">
              {["A. Abrasion resistance|(0–4)","B. Cut resistance, coup|(0–5)","C. Tearing strength|(0–4)","D. Puncture resistance|(0–4)","E. Cut resistance, TDM-100|(A–F)","F. Impact protection|(A–F, P)"].map(s=>{const[l,v]=s.split("|");return <div key={l} className="flex items-center justify-between border-b border-slate-200 pb-2"><span>{l}</span><span className="text-text-primary">{v}</span></div>;})}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap mb-8 border border-slate-200">
                <thead><tr className={thCls}><th className="py-3 px-4 rounded-tl border-l-2 border-l-accent">Parameter</th><th className="py-3 px-4 text-center">Level 0</th><th className="py-3 px-4 text-center">Level 1</th><th className="py-3 px-4 text-center">Level 2</th><th className="py-3 px-4 text-center">Level 3</th><th className="py-3 px-4 text-center">Level 4</th><th className="py-3 px-4 text-center rounded-tr">Level 5</th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white"><td className={tdL}>A. Abrasion</td><td className="text-center">&lt;100</td><td className="text-center">≥100</td><td className="text-center">≥500</td><td className="text-center">≥2000</td><td className="text-center">≥8000</td><td className="text-center">≥20000</td></tr>
                  <tr className="bg-slate-50"><td className={tdL}>B. Cut (Coup)</td><td className="text-center">&lt;1.2</td><td className="text-center">≥1.2</td><td className="text-center">≥2.5</td><td className="text-center">≥5.0</td><td className="text-center">≥10.0</td><td className="text-center">≥20.0</td></tr>
                  <tr className="bg-white"><td className={tdL}>C. Tear (N)</td><td className="text-center">&lt;10</td><td className="text-center">≥10</td><td className="text-center">≥25</td><td className="text-center">≥50</td><td className="text-center">≥75</td><td className="text-center">≥125N</td></tr>
                  <tr className="bg-slate-50"><td className={tdL}>D. Puncture (N)</td><td className="text-center">&lt;20</td><td className="text-center">≥20</td><td className="text-center">≥60</td><td className="text-center">≥100</td><td className="text-center">≥150</td><td className="text-center">≥250N</td></tr>
                </tbody>
              </table>
              <table className="w-full text-left text-sm whitespace-nowrap border border-slate-200">
                <thead><tr className={thCls}><th className="py-3 px-4 rounded-tl border-l-2 border-l-accent">Parameter</th><th className="py-3 px-4 text-center">A</th><th className="py-3 px-4 text-center">B</th><th className="py-3 px-4 text-center">C</th><th className="py-3 px-4 text-center">D</th><th className="py-3 px-4 text-center">E</th><th className="py-3 px-4 text-center rounded-tr">F</th></tr></thead>
                <tbody><tr className="bg-white"><td className={tdL}>E. Cut (TDM-100)</td><td className="text-center">&lt;2N</td><td className="text-center">≥5N</td><td className="text-center">≥10N</td><td className="text-center">≥15N</td><td className="text-center">≥22N</td><td className="text-center">≥30N</td></tr></tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="bg-white border-l-4 border-l-accent border border-slate-200 p-8 lg:p-12 rounded shadow-sm">
            <h2 className="font-display text-4xl text-text-primary mb-2">EN 407:2004</h2>
            <h3 className="font-bold text-accent uppercase tracking-widest text-sm mb-6">THERMAL RISKS</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-12 font-mono text-sm text-text-secondary">
              {["A. Burning behaviour|(0–4)","B. Contact heat|(0–4)","C. Convective heat|(0–4)","D. Radiant heat|(0–4)","E. Small splashes|(0–4)","F. Large quantities|(0–4)"].map(s=>{const[l,v]=s.split("|");return <div key={l} className="flex items-center justify-between border-b border-slate-200 pb-2"><span>{l}</span><span className="text-text-primary">{v}</span></div>;})}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap border border-slate-200">
                <thead><tr className={thCls}><th className="py-3 px-4 rounded-tl border-l-2 border-l-accent">Parameter</th><th className="py-3 px-4">Level 1</th><th className="py-3 px-4">Level 2</th><th className="py-3 px-4">Level 3</th><th className="py-3 px-4 rounded-tr">Level 4</th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white"><td className={tdL}>A. Burning</td><td className="text-text-secondary">&lt;20s</td><td>&lt;10/&lt;120s</td><td>&lt;3/&lt;25s</td><td>&lt;2/&lt;5s</td></tr>
                  <tr className="bg-slate-50"><td className={tdL}>B. Contact</td><td className="text-text-secondary">100°C ≥15s</td><td>250°C ≥15s</td><td>350°C ≥15s</td><td>450°C ≥15s</td></tr>
                  <tr className="bg-white"><td className={tdL}>C. Convective</td><td className="text-text-secondary">≥4s</td><td>≥7s</td><td>≥10s</td><td>≥18s</td></tr>
                  <tr className="bg-slate-50"><td className={tdL}>D. Radiant</td><td className="text-text-secondary">≥7s</td><td>≥20s</td><td>≥50s</td><td>≥95s</td></tr>
                  <tr className="bg-white"><td className={tdL}>E. Splashes</td><td className="text-text-secondary">≥10s</td><td>≥15s</td><td>≥25s</td><td>≥35s</td></tr>
                  <tr className="bg-slate-50"><td className={tdL}>F. Large qty</td><td className="text-text-secondary">10g</td><td>60g</td><td>120g</td><td>200g</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        images={zoomImages}
        initialIndex={0}
        isOpen={zoomImages.length > 0}
        onClose={() => setZoomImages([])}
        productName={zoomTitle}
      />
    </div>
  );
}
