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

  return (
    <header className="bg-gray-300 border-b">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        <Link href={`/${locale}`} className="text-2xl font-bold text-pink-600">
          DROV
        </Link>

        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <Link href={`/${locale}`} className={pathname === `/${locale}` ? "text-pink-600 font-bold" : ""}>
            {t(locale, "navHome")}
          </Link>

          <Link href={`/${locale}/products`}>{t(locale, "navProducts")}</Link>
          <Link href={`/${locale}/news`}>{t(locale, "navNews")}</Link>
          <Link href={`/${locale}/jobs`}>{t(locale, "navJobs")}</Link>

          {/* 🔐 Only show Dashboard if logged in */}
          {!loading && user && (
            <Link href={`/${locale}/dashboard`} className="text-blue-600 font-semibold">
              Dashboard
            </Link>
          )}
        </ul>

        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />

          {/* 🔐 Auth button */}
          {!loading && !user && (
            <Link
              href={`/${locale}/login`}
              className="px-4 py-2 rounded-full bg-pink-600 text-white"
            >
              Login
            </Link>
          )}

          {!loading && user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 text-white"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
