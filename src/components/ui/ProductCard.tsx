import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings2 } from "lucide-react";
import ProductImagePlaceholder from "./ProductImagePlaceholder";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_20px_40px_rgba(47,49,146,0.07)] transition-all duration-300 ease-out relative flex flex-col shadow-[0_8px_30px_rgba(47,49,146,0.025)] cursor-pointer"
    >
      {/* Dynamic Top Stripe with Hover Scale */}
      <div
        className="absolute top-0 left-0 right-0 h-[4px] origin-left group-hover:scale-y-[1.5] transition-transform duration-300 z-10"
        style={{ backgroundColor: product.accentColor }}
      />

      <div className="relative h-56 overflow-hidden bg-slate-50/50 border-b border-slate-100 group-hover:bg-slate-50 transition-colors">
        {product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <ProductImagePlaceholder
            label={product.code}
            color={product.accentColor}
            size="full"
          />
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-cta/10 border border-cta/20 text-[10px] font-bold text-cta uppercase tracking-wider rounded">
              <Settings2 className="w-3 h-3" />
              Customizable
            </span>
          </div>
        )}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="px-2.5 py-0.5 bg-accent/5 border border-accent/10 text-[10px] font-mono text-accent font-bold rounded shadow-sm">
            {product.code}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            {product.category.replace("-", " ")}
          </span>
        </div>

        <h3 className="font-display text-2xl text-text-primary mb-3 leading-tight font-bold group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>

        {!compact && (
          <>
            <ul className="text-sm text-text-secondary space-y-2 mb-5 flex-1">
              {product.features.slice(0, 2).map((feature, i) => (
                <li key={i} className="line-clamp-2 text-slate-500 font-medium">
                  — {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.certifications.slice(0, 3).map((cert) => (
                <span
                  key={cert}
                  className="px-2 py-0.5 border border-slate-200 text-[9px] font-bold text-slate-500 uppercase rounded bg-slate-50/50 shadow-sm hover:border-accent/20 hover:bg-accent/[0.01] transition-colors"
                >
                  {cert}
                </span>
              ))}
            </div>
          </>
        )}

        <span className="mt-auto text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2 group-hover:text-accent-light transition-colors duration-300">
          {product.variants && product.variants.length > 0 ? (
            <>
              <Settings2 className="w-4 h-4" />
              Configure & Enquire
            </>
          ) : (
            "View Details"
          )}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
