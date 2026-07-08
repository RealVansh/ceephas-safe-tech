import Link from "next/link";

type Props = {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
};

export default function PageHero({ breadcrumbs, title, subtitle }: Props) {
  return (
    <section
      className={`pt-10 ${subtitle ? "pb-16" : "pb-8"} border-b border-slate-200 relative overflow-hidden`}
      style={{ background: "linear-gradient(135deg, #0B1120 0%, #1E293B 60%, #2F3192 100%)" }}
    >
      <div className="hex-pattern" />
      <div className="container relative z-10 text-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <span key={idx} className="flex items-center gap-2">
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-300">{crumb.label}</span>
                  )}
                  {!isLast && <span className="text-slate-500 font-mono">/</span>}
                </span>
              );
            })}
          </nav>
        )}

        <h1 className={`font-display text-5xl md:text-7xl text-white ${subtitle ? "mb-6" : "mb-0"}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
