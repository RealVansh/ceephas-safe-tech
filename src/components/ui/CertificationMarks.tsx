import Image from "next/image";
import Link from "next/link";
import {
  certifications,
  type Certification,
  type CertificationCategory,
} from "@/data/certifications";

type CertificationPictogramProps = {
  certification: Certification;
  compact?: boolean;
};

export function CertificationPictogram({
  certification,
  compact = false,
}: CertificationPictogramProps) {
  return (
    <div
      className={`relative mx-auto flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_10px_22px_rgba(47,49,146,0.08)] ${
        compact ? "h-20 w-full max-w-[140px] p-3" : "h-24 w-36 p-3"
      }`}
      aria-hidden="true"
    >
      <Image
        src={certification.markImage}
        alt=""
        width={compact ? 140 : 144}
        height={compact ? 80 : 96}
        className="h-full w-full object-contain"
        unoptimized
        loading="lazy"
      />
    </div>
  );
}

type CertificationMarksProps = {
  compact?: boolean;
  category?: CertificationCategory;
};

export default function CertificationMarks({
  compact = false,
  category,
}: CertificationMarksProps) {
  const visibleCertifications = category
    ? certifications.filter((cert) => cert.category === category)
    : certifications;

  return (
    <div
      className={`grid gap-4 ${
        compact ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {visibleCertifications.map((cert) => {
        const className = `group rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_14px_30px_rgba(47,49,146,0.07)] ${
          compact ? "min-h-32 p-4 text-center flex flex-col justify-between block cursor-pointer" : "p-6"
        }`;

        const InnerContent = compact ? (
          <div className="flex h-full flex-col items-center justify-center">
            <CertificationPictogram certification={cert} compact />
            <div className="mt-5 text-sm font-bold leading-snug text-text-primary">
              {cert.shortTitle}
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between gap-4">
              <CertificationPictogram certification={cert} />
              <span className="rounded-full border border-slate-200 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-text-tertiary">
                {cert.category}
              </span>
            </div>
            <div className="mt-auto">
              <div className="mb-2 text-lg font-bold text-text-primary">
                {cert.title}
              </div>
              <div className="text-sm font-semibold text-text-secondary">
                {cert.summary}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-text-tertiary">
                {cert.detail}
              </div>
            </div>
          </div>
        );

        return compact ? (
          <Link key={cert.id} href="/standards" className={className}>
            {InnerContent}
          </Link>
        ) : (
          <div key={cert.id} className={className}>
            {InnerContent}
          </div>
        );
      })}
    </div>
  );
}
