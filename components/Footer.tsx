"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  return (
    <>
      {/* ================= MAIN FOOTER ================= */}
      <motion.footer
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden border-t border-white/30
                   bg-white/70 backdrop-blur-xl"
      >
        {/* Animated background blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 -right-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-14 md:grid-cols-3 text-center md:text-left">
            {/* BRAND */}
            <div>
              <h2 className="text-3xl font-bold text-[#4CAF50] tracking-tight">
                DROV
              </h2>
              <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-md mx-auto md:mx-0">
                Your trusted partner for professional health and beauty solutions,
                serving pharmacies, clinics, and distributors across Iraq.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                Quick Links
              </h3>
              <ul className="mt-6 space-y-3 text-base sm:text-lg text-slate-700">
                {[
                  ["about", "About Us"],
                  ["products", "Products"],
                  ["news", "News"],
                  ["jobs", "Careers"],
                ].map(([path, label]) => (
                  <li key={path}>
                    <Link
                      href={`/${locale}/${path}`}
                      className="hover:text-[#4CAF50] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                Follow Us
              </h3>

              <div className="mt-6 flex justify-center md:justify-start gap-5">
                {/* Facebook */}
                <SocialIcon
                  href="https://www.facebook.com/share/185DmTBwpZ/?mibextid=wwXIfr"
                  label="Facebook"
                  bg="bg-[#1877F2]/10"
                  hover="hover:bg-[#1877F2]"
                  color="text-[#1877F2]"
                >
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .1 2 .1v2.3h-1.2c-1.2 0-1.6.7-1.6 1.5V11H16l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" />
                </SocialIcon>

                {/* Instagram */}
                <SocialIcon
                  href="https://instagram.com"
                  label="Instagram"
                  gradient
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5a4.9 4.9 0 0 1 1.8 1.2 4.9 4.9 0 0 1 1.2 1.8c.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4a4.9 4.9 0 0 1-1.2 1.8 4.9 4.9 0 0 1-1.8 1.2c-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5a4.9 4.9 0 0 1-1.8-1.2 4.9 4.9 0 0 1-1.2-1.8c-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4A4.9 4.9 0 0 1 4 3.4 4.9 4.9 0 0 1 5.8 2.2c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Z" />
                </SocialIcon>

                {/* LinkedIn */}
                <SocialIcon
                  href="https://www.linkedin.com/in/drov-pharma-7014383a1"
                  label="LinkedIn"
                  bg="bg-[#0A66C2]/10"
                  hover="hover:bg-[#0A66C2]"
                  color="text-[#0A66C2]"
                >
                  <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2Z" />
                </SocialIcon>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-300/40 pt-6 text-center text-base text-slate-600">
            © {new Date().getFullYear()} DROV Health & Beauty. All rights reserved.
          </div>
        </div>
      </motion.footer>

      {/* ================= STICKY MOBILE CTA ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="mx-auto max-w-6xl px-4 pb-safe">
          <div className="flex items-center justify-between gap-4
                          rounded-t-2xl border border-white/30
                          bg-white/80 backdrop-blur-xl
                          shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.15)]
                          px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Ready to work with DROV?
              </p>
              <p className="text-xs text-slate-600">
                Explore products or contact us
              </p>
            </div>

            <Link
              href={`/${locale}/products`}
              className="shrink-0 rounded-full bg-[#4CAF50]
                         px-5 py-2 text-sm font-semibold text-white
                         shadow-md hover:bg-[#43a047] transition"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== Social Icon Component ===== */
function SocialIcon({
  href,
  label,
  children,
  bg,
  hover,
  color,
  gradient,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  bg?: string;
  hover?: string;
  color?: string;
  gradient?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group w-14 h-14 rounded-full flex items-center justify-center
                  backdrop-blur-lg shadow-md
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  ${
                    gradient
                      ? "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white"
                      : `${bg} ${color} ${hover} hover:text-white`
                  }`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        {children}
      </svg>
    </a>
  );
}
