export type ProductVariant = {
  thickness: string;
  lining: "Unlined" | "Flock lined";
  brandName?: string;
};

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: 'chemical-protection' | 'cut-resistant' | 'anti-static' | 'oil-grip' | 'general-purpose';
  accentColor: string; // for placeholder
  thickness?: string;
  weight?: string;
  material: string;
  sizes: string[];
  packaging?: string;
  features: string[];
  certifications: string[];
  markings?: string;
  application: string;
  cutLevel?: string;
  images: string[]; // first image = main (card + detail hero), rest = gallery
  variants?: ProductVariant[];
  lengthLabel?: string; // e.g. "13 Inch", "18 Inch"
  tagline?: string; // premium positioning copy
  isHighlighted?: boolean; // hero product badge
  badge?: string; // e.g. "Specialized Long Cuff"
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

export const products: Product[] = [
  {
    slug: "chem-13",
    code: "CHEM-13",
    name: "13 Inch Nitrile Chemical Resistant Gloves",
    category: "chemical-protection",
    accentColor: "#2D8653",
    lengthLabel: "13 Inch",
    isHighlighted: true,
    seoTitle: "13 Inch Nitrile Flock Lined Chemical Resistant Gloves Manufacturer India",
    seoDescription:
      "Cephas manufactures 13 inch nitrile chemical resistant gloves in flock lined and unlined options, including 11, 13, 15 and 18 mil variants for industrial chemical handling.",
    seoKeywords: [
      "13 inch nitrile flock lined gloves",
      "13 inch nitrile gloves manufacturer India",
      "nitrile flock lined gloves",
      "chemical resistant nitrile gloves 13 inch",
      "Golden Hands nitrile gloves",
    ],
    material: "Premium Acrylonitrile Butadiene Rubber",
    sizes: ["S/7", "M/8", "L/9", "XL/10", "XXL/11"],
    features: [
      "Upgraded EN 388 Cut Resistance (Level 1)",
      "Certified for Ammonium Hydroxide (O) and Hydrogen Peroxide (P)",
      "Fully automated dipping line manufacturing",
      "Resistant to a wide variety of chemicals and solvents",
      "Superior puncture and abrasion protection over rubber or neoprene",
      "Chlorinated to reduce odour",
      "Diamond textured pattern on the palm",
      "Customizable to customer requirements",
      "Available in flock lined and unlined options"
    ],
    certifications: ["CAT III", "EN 388:2016", "EN ISO 374-1:2016 Type A", "EN ISO 374-5:2016"],
    markings: "AJKLMNT - OP",
    application: "Chemical handling, laboratory, industrial, virus protection, bio waste handling, housekeeping, paint workshops, food processing, aircraft maintenance",
    images: [
      "/assets/products/chem-glove-1.png",
      "/assets/products/chem-glove-2.png"
    ],
    variants: [
      { thickness: "11 mil", lining: "Unlined" },
      { thickness: "11 mil", lining: "Flock lined" },
      { thickness: "13 mil", lining: "Flock lined", brandName: "Golden Hands" },
      { thickness: "15 mil", lining: "Flock lined", brandName: "Cephas / Breg Pro" },
      { thickness: "18 mil", lining: "Flock lined", brandName: "Chempro Safe" },
    ],
  },
  {
    slug: "chem-15",
    code: "CHEM-15",
    name: "15 Inch Nitrile Chemical Resistant Gloves",
    category: "chemical-protection",
    accentColor: "#2D8653",
    lengthLabel: "15 Inch",
    seoTitle: "15 Inch Nitrile Chemical Resistant Gloves Manufacturer India",
    seoDescription:
      "Cephas manufactures 15 inch nitrile chemical resistant gloves with unlined and flock lined configurations from 11 to 18 mil for industrial splash protection.",
    seoKeywords: [
      "15 inch nitrile gloves",
      "15 inch chemical resistant gloves",
      "nitrile flock lined gloves manufacturer",
      "industrial nitrile gloves India",
    ],
    material: "Premium Acrylonitrile Butadiene Rubber",
    sizes: ["S/7", "M/8", "L/9", "XL/10", "XXL/11"],
    features: [
      "Mid-length cuff for extended wrist and lower forearm protection",
      "Fully automated dipping line manufacturing",
      "Resistant to a wide variety of chemicals and solvents",
      "Superior puncture and abrasion protection",
      "Chlorinated to reduce odour",
      "Diamond textured pattern on the palm",
      "Customizable to customer requirements"
    ],
    certifications: ["CAT III", "EN 388:2016", "EN ISO 374-1:2016 Type A", "EN ISO 374-5:2016"],
    markings: "AJKLMNT - OP",
    application: "Chemical handling, laboratory, industrial cleaning, petroleum handling, food processing",
    images: [
      "/assets/products/chem-glove-1.png",
      "/assets/products/chem-glove-2.png"
    ],
    variants: [
      { thickness: "11 mil", lining: "Unlined" },
      { thickness: "13 mil", lining: "Flock lined" },
      { thickness: "15 mil", lining: "Flock lined" },
      { thickness: "18 mil", lining: "Flock lined" },
    ],
  },
  {
    slug: "chem-18",
    code: "CHEM-18",
    name: "18 Inch Long Cuff Nitrile Chemical Resistant Gloves",
    category: "chemical-protection",
    accentColor: "#2D8653",
    lengthLabel: "18 Inch",
    badge: "Specialized Long Cuff",
    tagline: "Manufactured by a select group of specialist producers globally, Cephas offers long-cuff nitrile gloves for demanding chemical handling applications.",
    seoTitle: "18 Inch Long Cuff Nitrile Chemical Resistant Gloves Manufacturer India",
    seoDescription:
      "Cephas manufactures 18 inch long cuff nitrile chemical resistant gloves in 15 and 22 mil unlined variants for extended forearm protection in demanding chemical handling.",
    seoKeywords: [
      "18 inch nitrile gloves",
      "18 inch long cuff nitrile gloves",
      "long cuff chemical resistant gloves",
      "22 mil nitrile gloves",
      "nitrile chemical gloves manufacturer India",
    ],
    material: "100% Premium Grade Nitrile Rubber",
    sizes: ["S/7", "M/8", "L/9", "XL/10", "XXL/11"],
    features: [
      "100% premium grade nitrile rubber from state-of-art dipping systems",
      "Extended 18\" cuff for full forearm protection",
      "Raised diamond-pattern palm for sustained grip in wet and oily environments",
      "Superior snag, puncture and abrasion protection",
      "Resistant to hydrocarbons, petroleum derivatives, acids, ketones, alkalis, vegetable oils",
      "Chlorinated to reduce odour",
      "Customized solutions available based on volume"
    ],
    certifications: ["CAT III", "EN 388:2016", "EN ISO 374-1:2016 Type A", "EN ISO 374-5:2016"],
    markings: "AJRLMNT - OP",
    application: "Chemical, petroleum, cleaning industries, heavy-duty industrial chemical handling",
    images: [
      "/assets/products/cnf-22/main.png",
      "/assets/products/cnf-22/IMG_0239.png"
    ],
    variants: [
      { thickness: "15 mil", lining: "Unlined" },
      { thickness: "22 mil", lining: "Unlined", brandName: "OEM" },
    ],
  },
  {
    slug: "cst-lf-w",
    code: "CST/LF/W",
    name: "CST Lint Free — Elastic Cuff",
    category: "general-purpose",
    accentColor: "#E0E0E0",
    material: "Synthetic Polyester Liner",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "Synthetic polyester liner for excellent fit with small components",
      "Lint free — eliminates contamination in sensitive environments",
      "13 GG knitting with elastic cuff"
    ],
    certifications: ["EN 388"],
    application: "Assembly, General Purpose",
    images: [
      "/assets/products/cst-lf-w/main.png",
      "/assets/products/cst-lf-w/DSC01276.png",
      "/assets/products/cst-lf-w/DSC01277.png",
    ]
  },
  {
    slug: "cst-pu-w",
    code: "CST/PU-W",
    name: "CST PU White — General Purpose Coated",
    category: "general-purpose",
    accentColor: "#F5F5F5",
    material: "Synthetic Polyester with PU coating",
    sizes: ["7", "8", "9"],
    packaging: "12 Pairs/Poly",
    features: [
      "13 GG knitting with basic Cut Level 1",
      "PU coating for better grip on small components",
      "Elastic wrist for comfort fit"
    ],
    certifications: ["EN 388"],
    markings: "4131",
    application: "Assembly, General application",
    images: [
      "/assets/products/cst-pu-w/main.png",
      "/assets/products/cst-pu-w/DSC01304.png",
      "/assets/products/cst-pu-w/DSC01305.png",
    ]
  },
  {
    slug: "cst-pu-g",
    code: "CST/PU-G",
    name: "CST PU Grey — Breathable Reusable",
    category: "general-purpose",
    accentColor: "#9E9E9E",
    material: "Synthetic Polyester with PU coating",
    sizes: ["7", "8", "9"],
    packaging: "12 Pairs/Poly",
    features: [
      "Fine GSM for high breathability and long wear",
      "Comfortable, lint free, washable and reusable",
      "Elastic wrist for comfort fit"
    ],
    certifications: ["EN 388"],
    markings: "4131",
    application: "Assembly, General application",
    images: [
      "/assets/products/cst-pu-g/main.png",
      "/assets/products/cst-pu-g/DSC01322.png",
    ]
  },
  {
    slug: "cst-pu-b",
    code: "CST/PU-B",
    name: "CST PU Black — General Purpose Coated",
    category: "general-purpose",
    accentColor: "#2A2A2A",
    material: "Synthetic Polyester with PU coating",
    sizes: ["7", "8", "9"],
    packaging: "12 Pairs/Poly",
    features: [
      "13 GG knitting with basic Cut Level 1",
      "Black PU coating for better grip on small components",
      "Elastic wrist for comfort fit"
    ],
    certifications: ["EN 388"],
    markings: "4131",
    application: "Assembly, General application",
    images: [
      "/assets/products/cst-pu-b/main.png",
      "/assets/products/cst-pu-b/DSC01163.png",
      "/assets/products/cst-pu-b/DSC01164.png"
    ]
  },
  {
    slug: "cst-fnc",
    code: "CST/FNC",
    name: "CST FNC — Flat Smooth Nitrile Oil Grip",
    category: "oil-grip",
    accentColor: "#757575",
    material: "Synthetic Polyester liner with Grey Flat Smooth Nitrile coating",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "Synthetic polyester liner for small component handling",
      "Flat smooth nitrile coating for better oil grip",
      "Light heat reduction",
      "Elastic cuff for snug fit"
    ],
    certifications: ["EN 388"],
    markings: "3121",
    application: "Engine assembly, Painting area",
    images: [
      "/assets/products/cst-fnc/main.png",
      "/assets/products/cst-fnc/DSC01001.png"
    ]
  },
  {
    slug: "cst-tesd",
    code: "CST/TESD",
    name: "CST TESD — Anti-Static Finger Tip PU",
    category: "anti-static",
    accentColor: "#B0BEC5",
    material: "Synthetic liner with Carbon Fiber",
    sizes: ["7", "8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Gunny Bag",
    features: [
      "13 GG knitting for better dexterity",
      "Carbon fiber construction for anti-static property",
      "Snug fit for small component picking",
      "Finger tips PU coated for better grip"
    ],
    certifications: ["EN 388", "Anti-Static"],
    application: "Electronic Industry, Assembly, EV Vehicle Assembly",
    images: [
      "/assets/products/cst-tesd/main.png",
      "/assets/products/cst-tesd/DSC01292.png",
      "/assets/products/cst-tesd/DSC01295.png",
      "/assets/products/cst-tesd/DSC01297.png",
    ]
  },
  {
    slug: "cst-pesd",
    code: "CST/PESD",
    name: "CST PESD — Anti-Static Palm PU Coated",
    category: "anti-static",
    accentColor: "#CFD8DC",
    material: "Synthetic liner with Carbon Fiber",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "13 GG knitting with Carbon fiber for better grip",
      "Anti-static property throughout",
      "Palm fully PU coated for better grip"
    ],
    certifications: ["EN 388", "Anti-Static"],
    application: "Electronic Industry, Motherboard Assembly",
    images: [
      "/assets/products/cst-pesd/main.png",
      "/assets/products/cst-pesd/DSC01339.png"
    ]
  },
  {
    slug: "cst-clc",
    code: "CST/CLC",
    name: "CST CLC — Crinkle Latex Coated Red",
    category: "oil-grip",
    accentColor: "#C62828",
    material: "13 GG Knitting Synthetic Liner with Crinkle Latex coating",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "Synthetic liner offers Cut Level 1",
      "Crinkle Latex offers better grip and product handling"
    ],
    certifications: ["EN 388"],
    markings: "3121",
    application: "Tyre Industry, Glass Handling, Loading/Unloading",
    images: [
      "/assets/products/cst-clc/main.png",
      "/assets/products/cst-clc/DSC01182.png",
      "/assets/products/cst-clc/DSC01184.png",
    ]
  },
  {
    slug: "cst-flexigrip",
    code: "FLEXIGRIP",
    name: "CST FlexiGrip — Nitrile Foam Micro Assembly",
    category: "oil-grip",
    accentColor: "#424242",
    material: "15 GG Knitted Synthetic Special yarn with Nitrile Micro Foam coating",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "15 GG knitting for excellent dexterity",
      "Nitrile Micro Foam for better grip with oil components"
    ],
    certifications: ["EN 388"],
    markings: "4131",
    application: "Micro Assembly, Mild Oil and Grease Area",
    images: [
      "/assets/products/cst-flexigrip/main.png",
      "/assets/products/cst-flexigrip/DSC01219.png",
      "/assets/products/cst-flexigrip/DSC01223.png",
      "/assets/products/cst-flexigrip/DSC01229.png"
    ]
  },
  {
    slug: "cst-cut-c",
    code: "CST/Cut C",
    name: "CST Cut C — HPPE Glass Fiber, DMF Free",
    category: "cut-resistant",
    accentColor: "#78909C",
    material: "13 GG HPPE with Glass Fiber Yarn, Grey PU coating",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "13 GG Knitted HPPE liner — Cut Level C",
      "Grey PU coating for better grip",
      "DMF Free PU Coating — CE Standard, skin-friendly",
      "Elastic cuff for snug fit"
    ],
    certifications: ["EN 388:2016", "DMF Free"],
    markings: "4 x 42 C",
    application: "Cut protection, general assembly",
    cutLevel: "C",
    images: [
      "/assets/products/cst-cut-c/main.png",
      "/assets/products/cst-cut-c/DSC01253.png",
      "/assets/products/cst-cut-c/DSC01255.png"
    ]
  },
  {
    slug: "cst-gn-cut-d",
    code: "CST/GN/Cut D",
    name: "CST GN Cut D — HPPE Polyethylene Sandy Finish",
    category: "cut-resistant",
    accentColor: "#388E3C",
    material: "HPPE plus Polyethylene Fiber",
    sizes: ["7", "8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "HPPE + Polyethylene fiber for Cut Level D protection",
      "Nitrile Sandy finish for grip and reduced oil penetration",
      "Contact Heat Level 1 from nitrile coating",
      "Elastic cuff for snug fit"
    ],
    certifications: ["EN 388:2016", "EN 407"],
    markings: "4 x 42 D",
    application: "Wet/mild oil handling areas with sharp objects",
    cutLevel: "D",
    images: [
      "/assets/products/cst-gn-cut-d/main.png",
      "/assets/products/cst-gn-cut-d/DSC01206.png",
      "/assets/products/cst-gn-cut-d/DSC01207.png",
    ]
  },
  {
    slug: "cst-opu-cut-d",
    code: "CST/OPU/Cut D",
    name: "CST OPU Cut D — Orange HPPE, DMF Free",
    category: "cut-resistant",
    accentColor: "#E65100",
    material: "HPPE liner with PE fiber and Elastane",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "HPPE + PE + Elastane for excellent abrasion and Cut Level D",
      "Black PU palm coating for better grip",
      "DMF Free PU Coating — CE Standard, skin-friendly",
      "Elastic cuff for snug fit"
    ],
    certifications: ["EN 388:2016", "DMF Free"],
    markings: "4 x 42 D",
    application: "Sharp edges, Sheet metal, Glass handling",
    cutLevel: "D",
    images: [
      "/assets/products/cst-opu-cut-d/main.png",
      "/assets/products/cst-opu-cut-d/DSC01264.png",
      "/assets/products/cst-opu-cut-d/DSC01266.png",
    ]
  },
  {
    slug: "cst-bpu-cut-e",
    code: "CST/BPU/Cut E",
    name: "CST BPU Cut E — Blue HPPE, Cut Level E, DMF Free",
    category: "cut-resistant",
    accentColor: "#1565C0",
    material: "13 GG Knitted HPPE with Special yarn for High Cut Level",
    sizes: ["8", "9"],
    packaging: "12 Pairs/Poly · 600 Pairs/Bag",
    features: [
      "HPPE + special yarn combination for Cut Level E",
      "Black PU for excellent grip",
      "DMF Free PU Coating — CE Standard, skin-friendly",
      "Elastic cuff for snug fit"
    ],
    certifications: ["EN 388:2016", "DMF Free"],
    markings: "4 x 42 E",
    application: "Glass Industry, Thin Sheet Metal Handling",
    cutLevel: "E",
    images: [
      "/assets/products/cst-bpu-cut-e/main.png",
      "/assets/products/cst-bpu-cut-e/DSC01234.png",
      "/assets/products/cst-bpu-cut-e/DSC01237.png"
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit: number = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter(p => p.slug !== slug && p.category === current.category)
    .concat(products.filter(p => p.slug !== slug && p.category !== current.category))
    .slice(0, limit);
}
