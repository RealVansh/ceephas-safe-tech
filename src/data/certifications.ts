export type CertificationCategory = "facility" | "product";

export type CertificationIcon =
  | "quality"
  | "ethical"
  | "audit"
  | "compliance"
  | "market"
  | "risk";

export type CertificateScan = {
  label: string;
  images: string[];
};

export type Certification = {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  markImage: string;
  category: CertificationCategory;
  summary: string;
  detail: string;
  icon: CertificationIcon;
  certificateImage?: string | string[];
  certificateScans?: CertificateScan[];
  documentHref?: string;
};

export const certifications: Certification[] = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    shortTitle: "ISO 9001",
    badge: "ISO",
    markImage: "/assets/certifications/iso-9001.jpeg",
    category: "facility",
    summary: "Quality Management System",
    detail: "Facility-level quality systems and process controls for consistent PPE manufacturing.",
    icon: "quality",
    certificateImage: "/assets/certifications/iso-9001-cert.png",
  },
  {
    id: "sedex-smeta",
    title: "SEDEX SMETA",
    shortTitle: "SEDEX SMETA",
    badge: "SEDEX SMETA",
    markImage: "/assets/certifications/smeta-sedex.png",
    category: "facility",
    summary: "Ethical Trade & Audit",
    detail: "SEDEX membership with completed SMETA audit for responsible supply-chain practices. SEDEX does not issue certificates — the SEDEX logo is used as permitted.",
    icon: "ethical",
  },
  {
    id: "zed-gold",
    title: "ZED Gold",
    shortTitle: "ZED Gold",
    badge: "ZED",
    markImage: "/assets/zed-gold.jpg",
    category: "facility",
    summary: "Zero Defect Zero Effect",
    detail: "MSME sustainable and quality manufacturing certification, ensuring zero defect production with zero environmental effect.",
    icon: "quality",
    certificateImage: "/assets/zed-gold-cert.jpg",
  },
  {
    id: "ce-mark",
    title: "CE Mark",
    shortTitle: "CE Mark",
    badge: "CE",
    markImage: "/assets/certifications/ce-mark.png",
    category: "product",
    summary: "PPE Regulation EU 2016/425",
    detail: "Product conformity route for protective gloves supplied into the European market. The 13-inch CNF15 model was recently upgraded to include EN 388 Cut Resistance Level 1 and protection against Ammonium Hydroxide (O) & Hydrogen Peroxide (P).",
    icon: "compliance",
    certificateScans: [
      {
        label: "13 Inch Gloves",
        images: ["/assets/ce-cert-1.png", "/assets/ce-cert-2.png"]
      },
      {
        label: "18 Inch Gloves",
        images: ["/assets/ce-cert-18-1.jpg", "/assets/ce-cert-18-2.jpg"]
      }
    ],
  },
  {
    id: "ukca",
    title: "UKCA",
    shortTitle: "UKCA",
    badge: "UKCA",
    markImage: "/assets/certifications/ukca-mark.png",
    category: "product",
    summary: "UK Conformity Assessed",
    detail: "Product compliance signal for protective gloves supplied into the UK market.",
    icon: "market",
    certificateScans: [
      {
        label: "18 Inch Gloves",
        images: ["/assets/ukca-cert-18-1.jpg", "/assets/ukca-cert-18-2.jpg"]
      }
    ],
  },
  {
    id: "ppe-category-iii",
    title: "PPE Category III",
    shortTitle: "CAT III",
    badge: "CAT III",
    markImage: "/assets/certifications/ppe-category-iii.png",
    category: "product",
    summary: "Complex Risk Protection",
    detail: "Classification for protection against serious and irreversible workplace risks.",
    icon: "risk",
    certificateImage: "/assets/certifications/ppe-cat-iii-cert.png",
  },
];

export const facilityCertifications = certifications.filter(
  (cert) => cert.category === "facility"
);

export const productCertifications = certifications.filter(
  (cert) => cert.category === "product"
);
