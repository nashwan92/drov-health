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


export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isRTL = locale === "ar" || locale === "ku";

  /* Close on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* Focus trap */
  useEffect(() => {
    if (!open || !menuRef.current) return;

    const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
    focusable[0]?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  };

  const linkClass = (href: string) =>
    pathname === href
      ? "text-pink-600 font-semibold"
      : "hover:text-pink-500 transition";

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          
          


<Link
  href={`/${locale}`}
  className="flex items-center"
  aria-label="DROV Home"
>
  <Image
    src="/logo/d-logo.png"
    alt="DROV Logo"
    width={140}
    height={40}
    priority
    className="h-10 w-auto object-contain"
  />
</Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8 text-lg font-medium items-center">
            <Link href={`/${locale}`} className={linkClass(`/${locale}`)}>
              {t(locale, "navHome")}
            </Link>
            <Link href={`/${locale}/about`} className={linkClass(`/${locale}/about`)}>
              {t(locale, "navAbout") ?? "About"}
            </Link>
            <Link href={`/${locale}/products`} className={linkClass(`/${locale}/products`)}>
              {t(locale, "navProducts")}
            </Link>
            <Link href={`/${locale}/news`} className={linkClass(`/${locale}/news`)}>
              {t(locale, "navNews")}
            </Link>
            <Link href={`/${locale}/jobs`} className={linkClass(`/${locale}/jobs`)}>
              {t(locale, "navJobs")}
            </Link>

            {!loading && user && (
              <>
                <Link href={`/${locale}/dashboard`} className="text-blue-600 font-semibold">
                  Dashboard
                </Link>

                {/* ✅ Logout (desktop) */}
                <button
                  onClick={handleLogout}
                  className="ml-4 rounded-full border px-4 py-1 text-sm hover:bg-slate-100 transition"
                >
                  Logout
                </button>
              </>
            )}
          </ul>

          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />

            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-2xl"
              aria-label="Open menu"
              aria-expanded={open}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* ===== OVERLAY ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            initial={{ x: isRTL ? -300 : 300 }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? -300 : 300 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={`fixed top-0 ${isRTL ? "left-0" : "right-0"} z-50 h-full w-72 bg-white shadow-xl`}
          >
            <div className="p-6 flex flex-col gap-5 text-lg font-medium">
              <button
                onClick={() => setOpen(false)}
                className="self-end text-2xl"
                aria-label="Close menu"
              >
                ✕
              </button>

              {[
                ["", "navHome"],
                ["/about", "navAbout"],
                ["/products", "navProducts"],
                ["/news", "navNews"],
                ["/jobs", "navJobs"],
              ].map(([path, key]) => (
                <Link
                  key={key}
                  href={`/${locale}${path}`}
                  className={
                    pathname === `/${locale}${path}`
                      ? "text-pink-600 font-semibold"
                      : ""
                  }
                >
                  {t(locale, key) ?? key}
                </Link>
              ))}

              {!loading && user && (
                <>
                  <Link href={`/${locale}/dashboard`} className="text-blue-600 font-semibold">
                    Dashboard
                  </Link>

                  {/* ✅ Logout (mobile) */}
                  <button
                    onClick={handleLogout}
                    className="mt-4 rounded-full bg-red-500 px-4 py-2 text-white text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
