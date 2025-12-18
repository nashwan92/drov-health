"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/useAuth";
import LanguageSwitcher from "./LanguageSwitcher";
import { t } from "@/lib/translations";

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = `/${locale}`;
  };

  const linkClass = (href: string) =>
    pathname === href
      ? "text-pink-600 font-bold"
      : "hover:text-pink-500 transition";

  return (
    <header className="bg-gray-300 border-b">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${locale}`} className="text-2xl font-bold text-pink-600">
          DROV
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <Link href={`/${locale}`} className={linkClass(`/${locale}`)}>
            {t(locale, "navHome")}
          </Link>

          {/* ✅ About link added here */}
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

          {/* 🔐 Dashboard (only if logged in) */}
          {!loading && user && (
            <Link
              href={`/${locale}/dashboard`}
              className="text-blue-600 font-semibold hover:underline"
            >
              Dashboard
            </Link>
          )}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />

          {!loading && !user && (
            <Link
              href={`/${locale}/login`}
              className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition"
            >
              Login
            </Link>
          )}

          {!loading && user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
