"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  productName: string;
};

export default function ProductGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-[3/2] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-4 shadow-sm">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority={activeIndex === 0}
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? "border-accent shadow-md ring-1 ring-accent/20"
                  : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
