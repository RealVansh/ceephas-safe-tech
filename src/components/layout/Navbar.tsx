"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Standards", href: "/standards" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm pt-4 pb-2"
            : "bg-white/80 backdrop-blur-sm pt-6 pb-2"
        }`}
      >
        <div className="w-full px-6 lg:px-12 xl:px-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="Cephas Logo" width={260} height={65} className="w-auto h-12 lg:h-20 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-semibold text-sm tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-slate-600 hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-4 px-6 py-2.5 rounded-full bg-cta text-white text-sm font-bold tracking-widest uppercase shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:bg-cta-light hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out cursor-pointer"
            >
              Request a Quote
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-text-primary"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Scroll Accent Line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-cta to-accent transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <Image src="/logo.png" alt="Cephas Logo" width={240} height={70} className="w-auto h-16 object-contain" />
              <button onClick={() => setMobileOpen(false)} className="p-2 text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-display text-3xl font-bold tracking-wider uppercase ${
                    pathname === link.href ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-8 w-full py-4 text-center rounded bg-cta text-white font-bold tracking-widest uppercase shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:bg-cta-light hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)] transition-all duration-300"
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
