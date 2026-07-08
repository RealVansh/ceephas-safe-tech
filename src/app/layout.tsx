import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cephassafetech.com"),
  title: {
    default: "Cephas Safe Tech | Chemical Resistant Nitrile Gloves Manufacturer India",
    template: "%s | Cephas Safe Tech",
  },
  description:
    "Manufacturer of Chemical Resistant Nitrile Flock-lined Gloves and PPE. CE & UKCA Certified. EN ISO 374-1 Type A. 84,00,000 pairs/year. Virudhunagar, Tamil Nadu, India.",
  keywords: [
    "nitrile gloves manufacturer india",
    "chemical resistant gloves",
    "CE certified PPE india",
    "cut resistant gloves",
    "anti static gloves",
    "nitrile flock lined gloves",
    "13 inch nitrile flock lined gloves",
    "18 inch long cuff nitrile gloves",
    "PPE manufacturer Tamil Nadu",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.cephassafetech.com",
    siteName: "Cephas Safe Tech",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "ZoSSI-YU5u4Wi_2maTAggltf_F5TzEa5vBpRYQR-F4Q",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${outfit.variable} antialiased`} suppressHydrationWarning>
      <body className="bg-white text-text-primary min-h-screen flex flex-col">
        <div className="grain-overlay" />
        <LenisProvider>
          <Navbar />
          <main className="flex-1 relative z-10 pt-16 lg:pt-28">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
