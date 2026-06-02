"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Phone, Mail, Globe, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import PageHero from "@/components/ui/PageHero";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .regex(/^[^0-9]*$/, "Name should not contain numbers"),
  company: z.string().min(1, "Company name is required"),
  email: z
    .string()
    .min(1, "Please enter a valid email address")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s\-()]{7,20}$/.test(val),
      "Please enter a valid phone number"
    ),
  product: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function ContactFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";
  const intent = searchParams.get("intent") || "";
  const isCatalogIntent = intent === "catalog";

  // Multi-select product state
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    initialProduct ? [initialProduct] : []
  );
  const [productError, setProductError] = useState<string | null>(null);

  const toggleProduct = (code: string) => {
    setSelectedProducts((prev) => {
      let updated;
      if (code === "General Enquiry") {
        updated = prev.includes("General Enquiry") ? [] : ["General Enquiry"];
      } else {
        const withoutGeneral = prev.filter((c) => c !== "General Enquiry");
        updated = withoutGeneral.includes(code)
          ? withoutGeneral.filter((c) => c !== code)
          : [...withoutGeneral, code];
      }

      if (updated.length > 0) {
        setProductError(null);
      }
      return updated;
    });
  };

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (selectedProducts.length === 0) {
      setProductError("Please select at least one product interest or General Enquiry");
      return;
    }
    setProductError(null);
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          product: selectedProducts.join(", "),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        if (isCatalogIntent) {
          // Trigger automatic download of the catalogue
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = "/assets/product-catalogue.pdf";
          a.download = "Cephas-Product-Catalogue.pdf";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } else {
        const resData = await response.json();
        setSubmitError(resData.error || "Failed to send enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Failed to send enquiry. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = "block w-full px-4 pt-6 pb-2 bg-white border border-slate-300 rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors peer text-text-primary shadow-sm";
  const labelCls = "absolute left-4 top-4 text-text-tertiary text-sm transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="bg-slate-950 min-h-screen">
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="GET IN TOUCH"
      />

      <section className="py-24">
        <div className="container grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-700/50 p-8 md:p-12 rounded-xl shadow-sm">
              <h2 className="font-display text-3xl text-text-primary mb-2">
                {isCatalogIntent ? "Download Product Catalogue" : "Send an Enquiry"}
              </h2>
              {isCatalogIntent && !isSuccess && (
                <p className="text-text-secondary mb-8 text-sm leading-relaxed">
                  Please fill out the contact form below to instantly download our detailed product catalogue, which includes all technical specifications, features, and certifications.
                </p>
              )}
              {!isCatalogIntent && <div className="mb-8" />}
              
              {isSuccess ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="font-display text-3xl text-text-primary mb-4">
                    {isCatalogIntent ? "Catalogue Download Started" : "Enquiry Sent"}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {isCatalogIntent 
                      ? "Thank you! Your download should begin automatically. Our team will also be in touch."
                      : "Thank you. Our team will contact you shortly."}
                  </p>
                  {isCatalogIntent && (
                    <a 
                      href="/assets/product-catalogue.pdf" 
                      download="Cephas-Product-Catalogue.pdf"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-accent-light hover:shadow-[0_4px_12px_rgba(47,49,146,0.3)] transition-all duration-300"
                    >
                      Click here if download didn&apos;t start naturally
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded">
                      {submitError}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input {...register("name")} placeholder=" " className={inputCls} />
                      <label className={labelCls}>Full Name *</label>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="relative">
                      <input {...register("company")} placeholder=" " className={inputCls} />
                      <label className={labelCls}>Company Name *</label>
                      {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input {...register("email")} type="email" placeholder=" " className={inputCls} />
                      <label className={labelCls}>Email Address *</label>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="relative">
                      <input {...register("phone")} type="tel" placeholder=" " className={inputCls} />
                      <label className={labelCls}>Phone Number</label>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Multi-Select Product Interest */}
                  <div>
                    <label className="block text-xs text-text-tertiary uppercase tracking-wider font-semibold mb-3">
                      Product Interest *
                      {selectedProducts.length > 0 && (
                        <span className="ml-2 text-accent">
                          ({selectedProducts.length} selected)
                        </span>
                      )}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {/* General Enquiry Option */}
                      <button
                        type="button"
                        onClick={() => toggleProduct("General Enquiry")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                          selectedProducts.includes("General Enquiry")
                            ? "bg-accent border-accent text-white shadow-[0_0_10px_rgba(47,49,146,0.3)]"
                            : "bg-white border-slate-300 text-slate-500 hover:border-accent/50 hover:text-accent"
                        }`}
                      >
                        {selectedProducts.includes("General Enquiry") && <Check className="w-3 h-3" />}
                        General Enquiry
                      </button>

                      {products.map((p) => {
                        const isSelected = selectedProducts.includes(p.code);
                        return (
                          <button
                            key={p.code}
                            type="button"
                            onClick={() => toggleProduct(p.code)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-accent border-accent text-white shadow-[0_0_10px_rgba(47,49,146,0.3)]"
                                : "bg-white border-slate-300 text-slate-500 hover:border-accent/50 hover:text-accent"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            {p.code}
                          </button>
                        );
                      })}
                    </div>
                    {productError && (
                      <p className="text-red-500 text-xs mt-2">{productError}</p>
                    )}
                  </div>

                  <div className="relative">
                    <textarea {...register("message")} placeholder=" " rows={4} className={`${inputCls} resize-none`} />
                    <label className={labelCls}>Message / Requirements (Optional)</label>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 py-4 bg-cta text-white font-bold uppercase tracking-widest rounded hover:bg-cta-light transition-colors disabled:opacity-50">
                    {isSubmitting ? "Processing..." : isCatalogIntent ? "Submit & Download" : "Send Enquiry"} <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-900 shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-[#25D366]/10 text-[#25D366]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-9 w-9" fill="currentColor" aria-hidden="true">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-text-primary mb-1">Prefer WhatsApp?</h3>
                  <p className="text-sm text-slate-400">
                    Get an instant reply — we&apos;re most active here.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/919363586977"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:bg-accent-light"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <a href="tel:+919363586977" className="block text-sm text-text-primary hover:text-accent transition-colors">+91 93635 86977</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:gloves@cephasmedical.net?bcc=jeremiah@cls.net.in" className="text-sm text-text-primary hover:text-accent transition-colors">gloves@cephasmedical.net</a>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-accent" />
                <a href="https://www.cephasmedical.net" target="_blank" className="text-sm text-text-primary hover:text-accent transition-colors">www.cephasmedical.net</a>
              </div>
            </div>
            <div className="mt-8 relative h-80 rounded overflow-hidden border border-slate-700/50">
              <iframe
                src="https://maps.google.com/maps?q=Cephas+Medical+Pvt+Ltd+II,+Virudhunagar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cephas Medical Manufacturing Facility"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="bg-slate-950 min-h-screen text-white flex items-center justify-center">
        <div className="animate-pulse font-display text-2xl tracking-widest text-slate-400">LOADING CONTACT...</div>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}
