import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Download, Settings2 } from "lucide-react";
import ProductImagePlaceholder from "@/components/ui/ProductImagePlaceholder";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductCard from "@/components/ui/ProductCard";
import ProductConfigurator from "@/components/ui/ProductConfigurator";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

const siteUrl = "https://www.cephasmedical.net";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.application,
    keywords: product.seoKeywords,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.application,
      url: `${siteUrl}/products/${product.slug}`,
      type: "website",
      images: product.images[0] ? [`${siteUrl}${product.images[0]}`] : undefined,
    },
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug);
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const isChemicalProduct = product.category === "chemical-protection";
  const variantNames =
    product.variants?.map((variant) =>
      [product.lengthLabel, variant.thickness, variant.lining, "nitrile chemical resistant gloves"]
        .filter(Boolean)
        .join(" ")
    ) || [];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.seoDescription || product.application,
      brand: {
        "@type": "Brand",
        name: "Cephas",
      },
      manufacturer: {
        "@type": "Organization",
        name: "Cephas Medical Private Limited",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Virudhunagar",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
      category: product.category.replace("-", " "),
      material: product.material,
      image: product.images.map((image) => `${siteUrl}${image}`),
      url: productUrl,
      additionalProperty: [
        { "@type": "PropertyValue", name: "Application", value: product.application },
        { "@type": "PropertyValue", name: "Certifications", value: product.certifications.join(", ") },
        product.lengthLabel
          ? { "@type": "PropertyValue", name: "Length", value: product.lengthLabel }
          : undefined,
        product.variants?.length
          ? { "@type": "PropertyValue", name: "Available configurations", value: variantNames.join("; ") }
          : undefined,
      ].filter(Boolean),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: `${siteUrl}/products`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.name,
          item: productUrl,
        },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        

        {/* ─── Two Column Layout ─── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24 overflow-hidden">
          
          {/* LEFT COLUMN: Image Gallery & Certs */}
          <div className="lg:col-span-7 animate-fade-in-up">
            {product.images.length > 0 ? (
              <ProductGallery images={product.images} productName={product.name} />
            ) : (
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-6 shadow-sm">
                <ProductImagePlaceholder label={product.code} color={product.accentColor} size="lg" />
              </div>
            )}
            
            {/* Certifications Row */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.certifications.map(cert => (
                <div key={cert} className="px-3 py-1.5 rounded bg-white border border-slate-300 text-[10px] md:text-xs font-bold text-text-primary uppercase tracking-wider md:tracking-widest shadow-sm">
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="lg:col-span-5 pt-4 animate-fade-in-right animate-delay-200 overflow-hidden">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-3 py-1 bg-accent/10 text-xs font-mono text-accent rounded tracking-wider font-semibold">
                {product.code}
              </span>
              {product.cutLevel && (
                <span className="flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-widest">
                  Cut Level {product.cutLevel} <span className="text-lg leading-none">▲</span>
                </span>
              )}
              {product.badge && (
                <span className="px-3 py-1 bg-cta/10 text-cta text-xs font-bold uppercase tracking-widest rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl lg:text-5xl text-text-primary mb-4">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm text-slate-500 leading-relaxed mb-4 italic border-l-4 border-accent/30 pl-4">
                {product.tagline}
              </p>
            )}
            
            <div className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
              {product.category.replace("-", " ")}
            </div>

            {/* Customizability Banner */}
            {product.variants && product.variants.length > 0 && (
              <a href="#configurator" className="group block w-full mb-10 bg-accent/5 border border-accent/20 rounded-xl p-4 hover:bg-accent/10 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-accent group-hover:scale-110 transition-transform">
                      <Settings2 className="w-5 h-5 animate-pulse-slow" />
                    </div>
                    <div>
                      <h4 className="font-bold text-accent text-sm uppercase tracking-widest">Highly Customizable</h4>
                      <p className="text-xs text-text-secondary mt-0.5">Click here to configure thickness and lining.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-1 border-t border-slate-200 mb-10 animate-fade-in-up animate-delay-400">
              {[
                { label: "Material", value: product.material },
                { label: "Thickness", value: product.thickness },
                { label: "Weight", value: product.weight },
                { label: "Packaging", value: product.packaging },
              ].map((spec, i) => (
                spec.value && (
                  <div key={i} className="grid grid-cols-3 border-b border-slate-200 py-4">
                    <div className="col-span-1 text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="col-span-2 text-sm text-text-secondary break-words">
                      {spec.value}
                    </div>
                  </div>
                )
              ))}
              
              <div className="grid grid-cols-3 border-b border-slate-200 py-4">
                <div className="col-span-1 text-sm font-bold text-slate-400 uppercase tracking-wider self-center">
                  Sizes
                </div>
                <div className="col-span-2 flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <span key={size} className="min-w-10 h-10 px-3 flex items-center justify-center rounded border border-slate-300 text-xs md:text-sm font-bold text-text-primary bg-white shadow-sm">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8 animate-fade-in-up animate-delay-500">
              <h3 className="font-display text-2xl text-text-primary mb-4">Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Application */}
            <div className="mb-8">
              <h3 className="font-display text-2xl text-text-primary mb-4">Application</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {product.application}
              </p>
            </div>

            {/* Technical Markings */}
            {product.markings && (
              <div className="mb-10">
                <h3 className="font-display text-2xl text-text-primary mb-4">Technical Markings</h3>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded text-sm font-mono text-text-primary shadow-sm">
                  {product.certifications.find(c => c.includes("EN")) || "EN Standard"} · {product.markings}
                </div>
              </div>
            )}

            {isChemicalProduct && (
              <div className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="font-display text-2xl text-text-primary mb-3">
                  {product.lengthLabel} Nitrile Glove Manufacturing Options
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  Cephas manufactures chemical resistant nitrile gloves for
                  industrial buyers, distributors, OEM programs and private label
                  requirements. This range includes uncommon specifications such
                  as flock lined nitrile gloves, long cuff nitrile gloves and
                  heavy-duty mil thickness options.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Available specifications include {variantNames.join(", ")}.
                </p>
                <Link
                  href="/products/chemical-resistant-gloves"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
                >
                  View Complete Chemical Resistant Range
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Variant Configurator */}
            {product.variants && product.variants.length > 0 ? (
              <div id="configurator" className="scroll-mt-32">
                <ProductConfigurator
                  variants={product.variants}
                  productCode={product.code}
                  lengthLabel={product.lengthLabel}
                  tagline={product.tagline}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <Link href={`/contact?product=${encodeURIComponent(product.code)}`} className="w-full flex items-center justify-center gap-3 py-4 bg-cta text-white font-bold uppercase tracking-widest rounded hover:bg-cta-light transition-colors text-sm shadow-md">
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link 
                  href={`/contact?intent=catalog&product=${encodeURIComponent(product.code)}`} 
                  className="w-full flex items-center justify-center gap-3 py-4 bg-accent border border-accent text-white font-bold uppercase tracking-widest rounded hover:bg-accent-light hover:shadow-[0_4px_15px_rgba(47,49,146,0.35)] transition-all duration-300 text-sm shadow-md group"
                >
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" /> Download Full Catalogue
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ─── RELATED PRODUCTS ─── */}
        <div className="pt-16 border-t border-slate-200 animate-fade-in-up animate-delay-600">
          <h3 className="font-display text-4xl text-text-primary mb-10 text-center md:text-left">
            RELATED PRODUCTS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(related => (
              <ProductCard key={related.slug} product={related} compact />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
