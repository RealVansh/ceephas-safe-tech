import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-12 pb-8 shadow-sm">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Col 1 */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image src="/logo.png" alt="Cephas Logo" width={240} height={60} className="w-auto h-40 object-contain" />
            </Link>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">
              Manufacturer of Chemical Resistant Nitrile Gloves
            </p>
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded border border-slate-300 w-max shadow-sm">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-text-primary tracking-widest uppercase">
                SEDEX / SMETA Member
              </span>
            </div>
            <a
              href="https://www.cephasmedical.net"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent font-medium transition-colors"
            >
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Group Company</span>
              <span className="text-slate-400">—</span>
              <span className="hover:underline">www.cephasmedical.net</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display text-lg font-bold tracking-widest text-text-primary mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "About", href: "/about" },
                { label: "Standards", href: "/standards" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-accent hover:underline font-medium transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-display text-lg font-bold tracking-widest text-text-primary mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-accent mb-1 uppercase tracking-wider">Corporate Office</p>
                <a
                  href="https://www.google.com/maps/place/Cephas+Medical+Pvt+Ltd/@12.93955,80.121387,8z/data=!4m6!3m5!1s0x3a525f9f40000001:0xb70b10e3f8d1e050!8m2!3d12.9395502!4d80.1213874!16s%2Fg%2F1tdzddv2?hl=en&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 leading-relaxed hover:text-accent transition-colors block font-medium"
                >
                  B13 MEPZ Special Economic Zone<br />
                  Chennai — 600 045, India
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-accent mb-1 uppercase tracking-wider">Manufacturing</p>
                <a 
                  href="https://www.google.com/maps/place/Cephas+Medical+Pvt+Ltd+II/@9.3101859,77.2347779,9.42z/data=!4m6!3m5!1s0x3a526564e175df7f:0x8006045a6c8043e3!8m2!3d9.5864732!4d77.933775!16s%2Fg%2F11p758hm04?hl=en&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 leading-relaxed hover:text-accent transition-colors block font-medium"
                >
                  SIDCO Industrial Estate (Urban)<br />
                  Virudhunagar, Tamil Nadu 626 003
                </a>
              </div>
              <div className="pt-2">
                <a href="tel:+919363586977" className="block text-sm text-slate-500 hover:text-accent font-medium">
                  +91 93635 86977
                </a>

                <a href="mailto:gloves@cephasmedical.net?bcc=jeremiah@cls.net.in" className="block text-sm text-slate-500 hover:text-accent font-medium mt-1">
                  gloves@cephasmedical.net
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {currentYear} Cephas Medical Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
