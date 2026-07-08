"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function Lightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
  productName = "Image",
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync index when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePrev = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 backdrop-blur-lg transition-all duration-300 animate-fade-in p-4 md:p-8"
      onClick={onClose}
    >
      {/* Top Header Controls */}
      <div 
        className="flex w-full items-center justify-between z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          {productName}
        </div>
        
        {images.length > 1 && (
          <div className="rounded-full bg-slate-800/40 border border-slate-700/30 px-4 py-1 text-xs font-bold text-slate-300 tracking-wider">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          aria-label="Close viewer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Image View Area */}
      <div className="relative flex-1 flex items-center justify-center w-full my-4 select-none">
        
        {/* Navigation - Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 md:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:bg-slate-700 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* The Image Container */}
        <div 
          className="relative w-full h-full max-h-[80vh] max-w-[85vw] flex items-center justify-center transition-all duration-300 scale-95"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex]}
            alt={`${productName} fullscreen view ${currentIndex + 1}`}
            fill
            priority
            className="object-contain transition-all duration-300 select-none pointer-events-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
          />
        </div>

        {/* Navigation - Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 md:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:bg-slate-700 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Thumbnails (if multiple images) */}
      {images.length > 1 && (
        <div 
          className="flex gap-3 overflow-x-auto p-2 mb-4 max-w-full no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? "border-accent shadow-md ring-1 ring-accent/50"
                  : "border-slate-600 opacity-60 hover:opacity-100 hover:border-slate-400"
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

      {/* Footer hint */}
      <div 
        className="text-center text-xs text-slate-500 font-medium tracking-wider mb-2 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 ? "Use Arrow Keys or Swipe to Navigate • Click ESC to close" : "Click ESC to close"}
      </div>
    </div>
  );
}
