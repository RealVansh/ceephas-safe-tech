import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, Ruler, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { products } from "@/data/products";

const siteUrl = "https://www.cephasmedical.net";
const chemicalDescription =
  "Cephas manufactures chemical resistant nitrile gloves in 13, 15 and 18 inch lengths with flock lined, unlined, 11 mil, 13 mil, 15 mil, 18 mil and 22 mil options.";
const chemicalProducts = products.filter((product) => product.category === "chemical-protection");
const variants = chemicalProducts.flatMap((product) =>
  product.variants?.map((variant) => ({
    product,
    length: product.lengthLabel || "",
    thickness: variant.thickness,
    lining: variant.lining,
    brandName: variant.brandName,
  })) || []
);

export const metadata: Metadata = {
  title: "Chemical Resistant Nitrile Gloves Manufacturer India | Cephas",
  description: chemicalDescription,
  keywords: [
    "chemical resistant nitrile gloves",
    "chemical resistant gloves manufacturer India",
    "13 inch nitrile flock lined gloves",
    "18 inch long cuff nitrile gloves",
    "nitrile flock lined gloves manufacturer",
    "22 mil nitrile gloves",
    "Golden Hands nitrile gloves",
  ],
  alternates: {
    canonical: "/products/chemical-resistant-gloves",
  },
  openGraph: {
    title: "Chemical Resistant Nitrile Gloves Manufacturer India | Cephas",
    description:
      "Specialist manufacturer of 13, 15 and 18 inch chemical resistant nitrile gloves with flock lined, unlined and heavy-duty thickness options.",
    url: `${siteUrl}/products/chemical-resistant-gloves`,
    type: "website",
  },
};

const familyCards = [
  {
    title: "13 Inch Nitrile Flock Lined Gloves",
    subtitle: "Unlined and flock lined options from 11 to 18 mil",
    href: "/products/chem-13",
    icon: FlaskConical,
    body:
      "A priority range for buyers searching for 13 inch nitrile flock lined gloves, chemical resistant nitrile gloves and Golden Hands nitrile gloves.",
  },
  {
    title: "15 Inch Nitrile Chemical Gloves",
    subtitle: "Mid-length chemical splash protection",
    href: "/products/chem-15",
    icon: ShieldCheck,
    body:
      "Configured for industrial handling environments where buyers need additional wrist and lower forearm coverage.",
  },
  {
    title: "18 Inch Long Cuff Nitrile Gloves",
    subtitle: "15 and 22 mil unlined configurations",
    href: "/products/chem-18",
    icon: Ruler,
    body:
      "A specialized long-cuff range for extended forearm protection in demanding chemical, petroleum and cleaning applications.",
  },
];

export default function ChemicalResistantGlovesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Chemical Resistant Nitrile Gloves",
      description: chemicalDescription,
      url: `${siteUrl}/products/chemical-resistant-gloves`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: chemicalProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/products/${product.slug}`,
          name: product.name,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: `${siteUrl}/products`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Chemical Resistant Gloves",
          item: `${siteUrl}/products/chemical-resistant-gloves`,
        },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Chemical Resistant Gloves" },
        ]}
        title="CHEMICAL RESISTANT GLOVES"
        subtitle="Specialist nitrile glove manufacturing in 13, 15 and 18 inch lengths with flock lined, unlined and heavy-duty thickness options."
      />

      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <p className="text-lg text-slate-600 leading-relaxed mb-5">
              Cephas manufactures chemical resistant nitrile gloves for industrial
              buyers, distributors, OEM programs and private label supply. The
              range is built around practical buyer specifications: cuff length,
              mil thickness, lining choice, certification requirements and
              application environment.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              For rare specifications, Cephas is positioned as
              <span className="font-semibold text-text-primary">
                {" "}one of the few specialist manufacturers producing long-cuff
                and flock lined nitrile chemical resistant gloves.
              </span>
              {" "}This highlights specialist capability while keeping the claim
              precise and publicly supportable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_18px_35px_rgba(47,49,146,0.08)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded bg-accent/5 text-accent">
                  <card.icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {card.title}
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-4">
                  {card.subtitle}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {card.body}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                  View Product <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-3">
              Chemical Glove Configurations
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Buyers can compare Cephas chemical resistant nitrile gloves by
              length, thickness, lining and brand or OEM configuration.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Length
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Thickness
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Lining
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Product
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Brand / Supply
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr
                      key={`${variant.length}-${variant.thickness}-${variant.lining}-${variant.brandName || "cephas"}`}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-5 py-3 font-semibold text-text-primary">
                        {variant.length}
                      </td>
                      <td className="px-5 py-3 text-text-secondary">
                        {variant.thickness}
                      </td>
                      <td className="px-5 py-3 text-text-secondary">
                        {variant.lining}
                      </td>
                      <td className="px-5 py-3">
                        <Link href={`/products/${variant.product.slug}`} className="font-semibold text-accent hover:underline">
                          {variant.product.name}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-text-secondary">
                        {variant.brandName || "Cephas"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl text-text-primary mb-4">
                Common Buyer Specifications
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Chemical buyers often compare products by glove length, lining
                and mil thickness. Cephas supports requirements for chemical
                resistant nitrile gloves, nitrile flock lined gloves, 13 inch
                nitrile flock lined gloves, 18 inch long cuff nitrile gloves
                and 22 mil nitrile gloves.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl text-text-primary mb-4">
                Specialist Manufacturer Positioning
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Cephas is positioned as one of the few specialist manufacturers
                supporting uncommon nitrile chemical glove specifications for
                industrial buyers, export distributors, OEM programs and private
                label requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
