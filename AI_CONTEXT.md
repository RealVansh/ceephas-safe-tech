# 🧠 CEPHASS - Comprehensive AI Project Context & Brain Dump

**To the AI reading this:**
The user has transitioned this project to a new environment. You are inheriting a highly polished Next.js application. Your job is to seamlessly continue the development without breaking the established design system or architectural patterns. 

**DO NOT start from scratch. DO NOT propose a new plan.** Read this document thoroughly to understand the exact state of the project, the design rules, the codebase architecture, and the specific pending tasks you need to execute.

---

## 🏗️ 1. Codebase Architecture & File Structure

This is a **Next.js 15 App Router** project using **Tailwind CSS v4** and **Framer Motion v12**.

### Key Directories & Files
- `src/app/` - Standard App Router structure.
  - `page.tsx` - Homepage. Heavily animated with Framer Motion, uses radial gradients and glassmorphism.
  - `products/page.tsx` - Products listing with a sticky filter bar and the inline `#glove-guide` wizard at the bottom.
  - `products/[slug]/page.tsx` - Dynamic product detail pages.
  - `contact/page.tsx` - Contact page with a form that pre-selects products based on URL queries (`?product=CNF-15`).
  - `api/contact/route.ts` - Backend API route for the contact form (uses Nodemailer/SMTP).
  - `globals.css` - Contains critical CSS variables, grain overlays, and custom scrollbar styles.
- `src/components/ui/` - Reusable UI components.
  - `PageHero.tsx` - Standardized header for inner pages. Takes `title`, `subtitle`, and `breadcrumbs`.
  - `ProductCard.tsx` - Highly polished card component used in grids. Includes hover scaling and soft indigo shadows.
  - `SectionHeader.tsx` - Standardized animated section title used across the homepage.
  - `GloveSelector.tsx` - A complex, interactive 3-step wizard that filters products based on Industry and Hazards.
- `src/data/products.ts` - The single source of truth for all 16 glove products. **Do not hardcode product data in components.**
- `src/lib/animations.ts` - Centralized Framer Motion variants (`fadeUp`, `fadeIn`, `staggerContainer`, etc.).

---

## 🎨 2. Design System & UX Rules (CRITICAL)

The user explicitly demands a **premium, dynamic, and state-of-the-art manufacturer aesthetic.** 
*If you build something that looks like a basic, flat MVP, you have failed.*

### Color Palette (from `globals.css`)
- **Backgrounds:** `--bg-primary` (`#FFFFFF`), `--bg-surface` (`#F8FAFC`).
- **Brand Accents:** `--accent` (`#2F3192` - Deep Indigo). Used for primary highlights, active states, and borders.
- **CTAs:** `--cta` (`#ED1C25` - Vibrant Red). Reserved STRICTLY for high-conversion buttons (e.g., "Request a Quote").
- **Text:** `--text-primary` (`#111827`), `--text-secondary` (`#4B5563`).

### Visual Accents & Micro-Interactions
1. **Glassmorphism:** Use `bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm` for floating cards.
2. **Atmospheric Spotlights:** Use large, faint radial gradients in the background of sections. 
   - Example: `bg-[radial-gradient(circle_at_top_right,rgba(47,49,146,0.03),transparent_70%)]`
3. **Hover States:** Cards must lift slightly (`hover:-translate-y-1.5`) and cast a soft, tinted shadow (`hover:shadow-[0_20px_50px_rgba(47,49,146,0.08)]`).
4. **Buttons:** Primary CTA buttons should have a glowing drop shadow: `shadow-[0_4px_15px_rgba(237,28,37,0.2)] hover:shadow-[0_8px_25px_rgba(237,28,37,0.4)]`.
5. **Typography:** `font-display` (Bebas Neue) for aggressive, bold headings. `font-sans` (Outfit) for clean, readable body text.

---

## ⚙️ 3. The Data Model (`src/data/products.ts`)

The site is driven by a strict TypeScript schema for products. When filtering or displaying products, you must rely on these properties:
- `slug` (e.g., `cnf-15`)
- `code` (e.g., `CNF-15`)
- `category` (Values: `chemical-protection`, `cut-resistant`, `anti-static`, `oil-grip`, `general-purpose`)
- `cutLevel` (Optional: `A`, `B`, `C`, `D`, `E`, `F`)
- `certifications` (Array of strings like `EN 388:2016`, `EN ISO 374-1:2016 Type A`)
- `accentColor` (Used for the top border highlight on product cards)

---

## ✅ 4. Completed Work (Do NOT rebuild these)

We have already completed a massive overhaul. The following features are **done and working perfectly**:
1. **API Integration:** The Contact Form (`/api/contact/route.ts`) is fully functional. It validates inputs and falls back gracefully if SMTP env vars are missing.
2. **Contextual Routing:** `contact/page.tsx` reads `?product=` to pre-select the dropdown using `useSearchParams` (wrapped in Suspense).
3. **Breadcrumbs:** `PageHero.tsx` accurately renders clickable breadcrumb trails.
4. **Hero Section:** Replaced the ugly "Awaiting 3D Render" placeholder on the homepage with 3 floating glassmorphic manufacturer stat cards.
5. **Glove Selection Wizard:** Built `GloveSelector.tsx` — a highly intelligent 3-step engine that matches users to gloves based on Industry + Hazards. 
   - *Nuance:* We embedded this at the bottom of `products/page.tsx` with an ID of `#glove-guide`. The `/guide` route simply redirects there.
6. **UI Polish:** Removed spammy repetitive taglines, added gradient dividers, and ensured the sticky filter bar on the products page scrolls naturally.
7. **Build Integrity:** `npm run build` currently generates 27/27 static pages with zero errors.

---

## 🚀 5. EXACT Pending Tasks (Your To-Do List)

The ultimate goal of this project is to prove to B2B buyers that Cephas is a **Real Manufacturer**, not a trader. 
You must implement the following tasks. Ask the user which one they want to do first.

### 🏭 Task A: The Manufacturing Process Section (Homepage)
**Goal:** Prove manufacturing capability with a visual process pipeline.
- **Location:** `src/app/page.tsx` (Insert between "Why Choose Us" and the "Certifications Strip").
- **Specs:** Create a horizontal or vertical timeline/process flow:
  1. Raw Material Sourcing
  2. Compounding & Mixing
  3. Automated Dipping Line
  4. Curing & Vulcanization
  5. In-house QC Lab Testing
  6. Final Packaging
- **Design:** Use icons for now, but design it so the user can easily swap in real factory photos later. Add stats like "100% Automated Dipping".

### 🤝 Task B: "Trusted By" Client Logo Marquee (Homepage)
**Goal:** Build instant trust.
- **Location:** `src/app/page.tsx` (Directly under the Hero stats bar).
- **Specs:** Build an infinitely scrolling CSS/Framer Motion marquee.
- **Design:** Use 6-8 placeholder grayscale boxes for client logos. They should pause on hover.

### 💬 Task C: Testimonials / Client Quotes Carousel (Homepage)
**Goal:** Peer validation for B2B buyers.
- **Location:** `src/app/page.tsx` (Right before the final bottom CTA).
- **Specs:** A sleek carousel or masonry grid of 3 testimonial cards.
- **Design:** Include star ratings, a bold quote, buyer role (e.g., "Procurement Manager, AutoTech India"), and a soft glassmorphic background.

### 📋 Task D: FAQ Page (`/faq`)
**Goal:** Reduce support friction for B2B buyers.
- **Location:** `src/app/faq/page.tsx`
- **Specs:** Create an accordion-style FAQ using Framer Motion (`AnimatePresence` for smooth expand/collapse).
- **Categories:** Group questions by Ordering (MOQs, lead times), Products (customization, OEMs), Quality (testing), and Shipping.

### 📞 Task E: Floating WhatsApp Button
**Goal:** Instant B2B communication.
- **Location:** Create `src/components/ui/WhatsAppButton.tsx` and drop it into `layout.tsx` so it persists everywhere.
- **Specs:** Fixed bottom-right. Green WhatsApp icon. 
- **Link:** `https://wa.me/919363586977?text=Hi,%20I'm%20interested%20in%20Cephas%20gloves.`

### 📥 Task F: Download Center / Resource Hub (`/resources`)
**Goal:** Let procurement teams download specs.
- **Location:** `src/app/resources/page.tsx` (Add link to Navbar).
- **Specs:** A grid of downloadable resources.
- **Cards:** "Full Product Catalog (PDF)", "ISO 9001 Certificate", "CE Compliance Declarations". Use file-type icons (PDF, ZIP).

### 🌍 Task G: Expand the About Page (`/about`)
**Goal:** Tell the company story.
- **Location:** `src/app/about/page.tsx`
- **Specs:** Replace the current basic paragraphs with a rich page.
- **Sections to add:** 
  1. Our Story / Founding Timeline.
  2. Export Markets (A dotted world map graphic or grid of country flags).
  3. OEM / Private Label Capabilities (Explain that Cephas can white-label gloves for other brands).

---

## 🔒 Final Directives for the AI
1. **Be Precise:** When editing files, use precise tool calls. Do not break existing Framer Motion animations.
2. **Be Premium:** Never use default Tailwind styling without adding the subtle Cephas flair (letter-spacing, correct fonts, faint borders, tinted shadows).
3. **Validate:** Always run `npm run build` after completing a major task to ensure Next.js static generation isn't broken.

**End of Context. Awaiting your first command.**
