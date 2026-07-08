"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Award, Star, Medal, Newspaper, Heart, ArrowRight, Download, ExternalLink, Play } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Lightbox from "@/components/ui/Lightbox";

const awards = [
  {
    title: "Outstanding Business Partner",
    org: "Hollister Incorporated, USA",
    year: "July 2012",
    description:
      "Awarded for exceptional quality and performance as a manufacturing partner. This recognition reflects Cephas Medical's commitment to delivering world-class products consistently.",
    icon: Trophy,
    image: "/assets/awards/hollister-outstanding-partner.png",
  },
  {
    title: "Government of India Recognition",
    org: "Ministry of Commerce, Govt. of India",
    year: "22nd March 2013",
    description:
      "Award presented by Shri. Madhusudana Rao, Additional Secretary, Ministry of Commerce, Government of India. Received by Mr. Thangiah Immanuel — Managing Director, Cephas Medical.",
    icon: Award,
    image: "/assets/awards/govt-india-award.png",
  },
  {
    title: "Preferred Direct Ship Supplier",
    org: "Hollister Incorporated, USA",
    year: "June 2016",
    description:
      "Recognized as the preferred direct-ship supplier, a distinction earned through consistent on-time delivery, rigorous quality control, and seamless supply chain integration.",
    icon: Star,
    image: "/assets/awards/hollister-preferred-supplier.png",
  },
  {
    title: "Living the Immutable Principles",
    org: "Hollister Incorporated, USA",
    year: "October 2016",
    description:
      "Honored for embodying Hollister's core values of dignity, integrity, service, and stewardship across every aspect of the manufacturing partnership.",
    icon: Medal,
    image: "/assets/awards/hollister-immutable-principles.png",
  },
  {
    title: "Commitment Towards Performance Excellence",
    org: "Confederation of Indian Industries (CII)",
    year: "2019",
    description:
      "Recognized by the Confederation of Indian Industries for demonstrating an unwavering commitment to performance excellence in manufacturing operations.",
    icon: Award,
    image: "/assets/awards/cii-performance-excellence.png",
  },
  {
    title: "Export Excellence Award",
    org: "Export Recognition Body",
    year: "May 2022",
    description:
      "Awarded for outstanding contributions to India's export ecosystem, reflecting the company's growing global footprint and trusted international supply partnerships.",
    icon: Trophy,
    image: "/assets/awards/export-excellence.png",
  },
  {
    title: "MedTech Quality Champion Award — Gold Winner",
    org: "MedTech Industry Awards",
    year: "November 2024",
    description:
      "Gold winner in the MedTech Quality Champion category, recognizing the highest standards of quality management in medical device and PPE manufacturing.",
    icon: Medal,
    image: "/assets/awards/medtech-quality-champion.png",
  },
  {
    title: "Best Partner for High-Quality Contract Manufacturing",
    org: "Industry Partnership Awards",
    year: "2024",
    description:
      "Recognized as the best partner for high-quality contract manufacturing, a testament to the company's precision, reliability, and end-to-end manufacturing capabilities.",
    icon: Star,
    image: "/assets/awards/best-partner-manufacturing.png",
  },
  {
    title: "ET MSME Awards 2024 — Nominated",
    org: "The Economic Times",
    year: "2024",
    description:
      "Nominated for the prestigious Economic Times MSME Awards 2024, recognizing Cephas Medical as one of India's most impactful small and medium enterprises in the manufacturing sector.",
    icon: Star,
    image: "/assets/awards/et-msme-nomination.png",
  },
  {
    title: "Business Maestro Award in MSME",
    org: "Tally",
    year: "2025",
    description:
      "Awarded the Business Maestro Award in the MSME category by Tally, recognizing exceptional business management, operational efficiency, and sustained growth.",
    icon: Trophy,
    image: "/assets/awards/tally-business-maestro.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function AwardCard({
  award,
  onZoom,
}: {
  award: (typeof awards)[0];
  onZoom: (img: string, title: string) => void;
}) {
  const Icon = award.icon;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="group overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_42px_rgba(47,49,146,0.12)] flex flex-col h-full"
    >
      {/* Image / Icon Header — Tap to view fullscreen */}
      <button
        type="button"
        onClick={() => imageLoaded && onZoom(award.image, award.title)}
        className={`relative h-52 bg-slate-800 overflow-hidden flex items-center justify-center w-full ${imageLoaded ? "cursor-zoom-in" : "cursor-default"}`}
      >
        <Image
          src={award.image}
          alt={award.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-0"
          onLoad={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.classList.remove("opacity-0");
            setImageLoaded(true);
            const fallback = img.parentElement?.querySelector("[data-fallback]");
            if (fallback) (fallback as HTMLElement).style.display = "none";
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Icon Fallback — visible until image loads */}
        <div data-fallback className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-slate-800">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/15 text-accent">
            <Icon className="h-10 w-10" />
          </div>
        </div>
        {/* Tap to view overlay */}
        {imageLoaded && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <span className="text-white font-bold text-sm tracking-wider uppercase">Tap to View</span>
          </div>
        )}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
      </button>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent">
            {award.org}
          </span>
          <span className="px-2 py-0.5 bg-accent/15 text-accent text-[0.6rem] font-bold rounded-full tracking-wider">
            {award.year}
          </span>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
          {award.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-tertiary flex-1">
          {award.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Awards() {
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleZoom = (img: string, title: string) => {
    setLightboxImages([img]);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Awards" }]}
        title="AWARDS & ACHIEVEMENTS"
      />

      {/* Parent Company Disclaimer */}
      <section className="pt-24 pb-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-accent/10 border border-accent/20 rounded-xl flex items-start gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white mt-0.5">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-accent mb-1 uppercase tracking-widest">
                  Parent Company Recognition
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  The following awards and recognitions have been received by our
                  parent company,{" "}
                  <Link
                    href="https://cephasmedical.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Cephas Medical Pvt. Ltd.
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  , reflecting the group&apos;s legacy of manufacturing
                  excellence that powers Cephas Safe Tech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[2px] w-8 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Awards
              </span>
            </div>
            <h2 className="font-display text-4xl text-text-primary md:text-5xl mb-4">
              GLOBALLY RECOGNIZED EXCELLENCE
            </h2>
            <p className="text-text-secondary leading-relaxed">
              From international manufacturing partnerships to government
              recognition, our parent company&apos;s track record speaks to the
              quality and reliability that defines every Cephas Safe Tech
              product.
            </p>
          </div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {awards.map((award) => (
              <AwardCard key={award.title} award={award} onZoom={handleZoom} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Media Feature */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[2px] w-8 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Media
              </span>
            </div>
            <h2 className="font-display text-4xl text-text-primary md:text-5xl mb-4">
              IN THE SPOTLIGHT
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-900 to-accent/5 p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Newspaper className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-text-primary">
                      Aval Vikatan Feature
                    </h3>
                    <p className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">
                      March 2021
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Leading Tamil magazine <strong className="text-text-primary">Aval Vikatan</strong> published
                  a feature article highlighting Cephas Medical&apos;s
                  manufacturing excellence, innovation in the PPE sector, and
                  contribution to India&apos;s industrial growth.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://cephasmedical.net/wp-content/uploads/2024/06/Aval-Vikatan.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:bg-accent-light transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Tamil PDF
                  </a>
                  <a
                    href="https://cephasmedical.net/wp-content/uploads/2024/06/Aval-Viatan-English-Translation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent text-accent text-xs font-bold uppercase tracking-widest hover:-translate-y-0.5 hover:bg-accent/10 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    English PDF
                  </a>
                </div>
              </div>

              {/* Video */}
              <div className="relative h-72 md:h-80 rounded-xl overflow-hidden border border-slate-700/30 bg-slate-800">
                <video
                  src="/assets/awards/Media-video-2.mp4#t=0.1"
                  controls
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSR Section */}
      <section className="py-16 pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900 p-8 md:p-12"
          >
            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/15 text-green-500">
                <Heart className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl text-text-primary mb-2">
                  CSR — CREATING POSITIVE CHANGE
                </h3>
                <h4 className="text-sm font-bold text-green-500 uppercase tracking-widest mb-4">
                  Sustainable Growth
                </h4>
                <p className="text-text-secondary leading-relaxed max-w-3xl mb-6">
                  At Cephas, we believe that manufacturing excellence goes
                  hand-in-hand with social responsibility. Our parent company is
                  committed to ethical sourcing, sustainable manufacturing
                  practices, and creating positive community impact across all
                  facilities.
                </p>
                <Link
                  href="https://cephasmedical.net/awards-media/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-accent-light transition-colors group"
                >
                  Explore Cephas Medical CSR Initiatives
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox for fullscreen award images */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        initialIndex={0}
        onClose={() => setLightboxOpen(false)}
        productName={lightboxTitle}
      />
    </div>
  );
}
