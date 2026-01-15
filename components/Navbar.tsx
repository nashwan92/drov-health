"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/useAuth";
import LanguageSwitcher from "./LanguageSwitcher";
import { t } from "@/lib/translations";
import Image from "next/image";

/* ================= ABOUT MENU DATA ================= */
const aboutMenu = [
  { title: "About Drov", href: "/about", desc: "Company overview & mission" },
  { title: "Directors", href: "/about/directors", desc: "Board & leadership" },
  { title: "Our Team", href: "/about/team", desc: "Professional staff" },
  { title: "Warehouse", href: "/about/warehouse", desc: "Storage & logistics" },
];

/* ================= DESKTOP NAV LINK ================= */
const DesktopNavLink = ({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className={`relative px-3 py-2 rounded-xl transition
      ${active ? "bg-pink-50 text-pink-600 font-semibold" : "text-gray-700"}
      hover:bg-pink-50 hover:text-pink-600`}
  >
    {children}
  </Link>
);

/* ================= ABOUT MEGA MENU (DESKTOP) ================= */
const AboutMegaMenu = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  return (
    <div className="relative group">
      <span className="cursor-pointer px-3 py-2 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-600">
        About ▾
      </span>

      <div className="absolute left-0 top-full z-50 hidden group-hover:block">
        <div className="mt-4 w-[520px] rounded-2xl border bg-white shadow-xl p-6">
          <div className="grid grid-cols-2 gap-4">
            {aboutMenu.map((item) => {
              const active = pathname === `/${locale}${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`rounded-xl p-4 transition ${
                    active
                      ? "bg-pink-50 text-pink-600"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= NAVBAR ================= */
export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isRTL = locale === "ar" || locale === "ku";

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} aria-label="Home">
            <Image src="/logo/d-logo.png" alt="DROV" width={140} height={40} priority />
          </Link>

          {/* ========== DESKTOP MENU ========== */}
          <ul className="hidden md:flex items-center gap-2 text-lg font-medium">
            <DesktopNavLink href={`/${locale}`} active={pathname === `/${locale}`}>
              {t(locale, "navHome")}
            </DesktopNavLink>

            <AboutMegaMenu locale={locale} />

            <DesktopNavLink
              href={`/${locale}/products`}
              active={pathname.startsWith(`/${locale}/products`)}
            >
              {t(locale, "navProducts")}
            </DesktopNavLink>

            <DesktopNavLink href={`/${locale}/news`} active={pathname === `/${locale}/news`}>
              {t(locale, "navNews")}
            </DesktopNavLink>

            <DesktopNavLink href={`/${locale}/jobs`} active={pathname === `/${locale}/jobs`}>
              {t(locale, "navJobs")}
            </DesktopNavLink>

            {!loading && user && (
              <>
                <DesktopNavLink
                  href={`/${locale}/dashboard`}
                  active={pathname.startsWith(`/${locale}/dashboard`)}
                >
                  Dashboard
                </DesktopNavLink>

                <button
                  onClick={handleLogout}
                  className="ml-3 rounded-full border px-4 py-1 text-sm hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            )}
          </ul>

          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
            <button onClick={() => setOpen(true)} className="md:hidden text-2xl">
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* ================= MOBILE MENU (FIXED & POLISHED) ================= */}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={menuRef}
            initial={{ x: isRTL ? -320 : 320 }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? -320 : 320 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={`fixed top-0 ${isRTL ? "left-0" : "right-0"} z-50 h-full w-80 bg-white shadow-xl`}
          >
            <div className="p-6 flex flex-col gap-6">

              {/* Close */}
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} className="text-2xl">✕</button>
              </div>

              {/* MAIN LINKS */}
              <nav className="flex flex-col gap-3 text-lg font-medium">

                <Link
                  href={`/${locale}`}
                  className="rounded-xl px-4 py-3 hover:bg-pink-50 transition"
                >
                  {t(locale, "navHome")}
                </Link>

                {/* ABOUT (Accordion) */}
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className="flex justify-between items-center rounded-xl px-4 py-3 hover:bg-pink-50 transition"
                >
                  <span>About</span>
                  <span className="text-xl">{aboutOpen ? "−" : "+"}</span>
                </button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-3 border-l pl-3 flex flex-col gap-2"
                    >
                      {aboutMenu.map((item) => (
                        <Link
                          key={item.href}
                          href={`/${locale}${item.href}`}
                          className="rounded-lg px-3 py-2 text-base hover:bg-pink-50 transition"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  href={`/${locale}/products`}
                  className="rounded-xl px-4 py-3 hover:bg-pink-50 transition"
                >
                  {t(locale, "navProducts")}
                </Link>

                <Link
                  href={`/${locale}/news`}
                  className="rounded-xl px-4 py-3 hover:bg-pink-50 transition"
                >
                  {t(locale, "navNews")}
                </Link>

                <Link
                  href={`/${locale}/jobs`}
                  className="rounded-xl px-4 py-3 hover:bg-pink-50 transition"
                >
                  {t(locale, "navJobs")}
                </Link>
              </nav>

              {/* AUTH */}
              {!loading && user && (
                <div className="pt-4 border-t flex flex-col gap-3">
                  <Link
                    href={`/${locale}/dashboard`}
                    className="rounded-xl px-4 py-3 bg-emerald-50 text-emerald-700"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl px-4 py-3 bg-red-50 text-red-600 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
