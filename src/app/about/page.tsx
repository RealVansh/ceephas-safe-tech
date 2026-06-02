import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Globe, Handshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CertificationMarks from "@/components/ui/CertificationMarks";

export default function About() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        title="ABOUT CEPHAS"
      />

      {/* Story Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-accent font-semibold text-xs tracking-widest uppercase">Our Story</span>
                <div className="w-16 h-[2px] bg-accent" />
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-8 leading-tight">
                BUILT FOR THE WORLD&apos;S<br />MOST DEMANDING INDUSTRIES
              </h2>
              
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>
                  Cephas Medical Private Limited established its state-of-the-art manufacturing facility with international standard machines at Virudhunagar, Tamil Nadu, India. Operating with a fully automated dipping line and a production capacity of 84,00,000 pairs per year, we manufacture Chemical Resistant Nitrile Flock-lined Gloves and Personal Protective Equipment built for the toughest industrial environments.
                </p>
                <p>
                  Our products are globally accredited, holding site certifications including SEDEX and ISO, and product certifications including CE and UKCA — complying with EN ISO 374-1:2016, EN 388:2016, and EN 407:2004 international standards.
                </p>
              </div>
            </div>

            {/* Overlapping Images Composition */}
            <div className="relative h-[450px] sm:h-[600px] w-full mt-12 lg:mt-0">
              {/* Back Image (Exterior) */}
              <div className="absolute top-0 right-0 w-[85%] h-[75%] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl z-10 bg-slate-800 group">
                <Image 
                  src="/assets/about-images/ext.jpg" 
                  alt="Cephas Facility Exterior" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Front Overlapping Image (Interior) */}
              <div className="absolute bottom-0 left-0 w-[65%] h-[55%] rounded-2xl overflow-hidden border-8 border-slate-950 shadow-2xl z-20 bg-slate-800 group">
                <Image 
                  src="/assets/about-images/int.jpg" 
                  alt="Cephas Facility Interior" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Decorative Glow Elements */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/20 rounded-full blur-[80px] -z-10" />
              <div className="absolute top-1/4 -right-12 w-64 h-64 bg-slate-600/20 rounded-full blur-[80px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="pb-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Superior Quality", desc: "Manufacture gloves that ensure safety and trust." },
              { icon: Globe, title: "International Standards", desc: "Comply with global quality benchmarks worldwide." },
              { icon: Handshake, title: "Long-term Partnerships", desc: "Foster trust through consistent performance and reliability." }
            ].map((mission, i) => (
              <div key={i} className="bg-slate-900 border border-slate-700/50 border-t-2 border-t-accent p-8 rounded-b-xl hover:-translate-y-1 transition-transform duration-300">
                <mission.icon className="w-10 h-10 text-accent mb-6" />
                <h3 className="font-display text-2xl text-text-primary mb-3 tracking-wide">{mission.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{mission.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Blocks */}
      <section className="py-24 bg-slate-900 border-y border-slate-700/50 relative overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
            <div className="pt-8 md:pt-0">
              <div className="font-display text-6xl text-text-primary mb-2">84,00,000</div>
              <div className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Pairs/Year Capacity</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="font-display text-5xl md:text-6xl text-text-primary mb-2">MADE IN INDIA</div>
              <div className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Aatmanirbhar Bharat</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="font-display text-6xl text-text-primary mb-2">60+</div>
              <div className="text-sm font-bold text-text-tertiary uppercase tracking-wider">Distributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-display text-3xl text-text-primary mb-4 tracking-widest">GLOBAL ACCREDITATIONS</h3>
            <p className="mb-10 text-text-secondary leading-relaxed">
              Site, product and ethical-trade credentials are presented here for buyer confidence. Detailed EN test methods and protection classifications are available on the standards page.
            </p>
          </div>
          <div className="mx-auto mb-10 max-w-5xl">
            <CertificationMarks />
          </div>
          <div className="text-center">
            <Link href="/standards" className="inline-flex items-center gap-2 px-8 py-4 bg-cta text-white font-bold tracking-widest uppercase rounded hover:bg-cta-light transition-colors text-sm">
              View Full Standards <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
