import Link from "next/link";
import { t } from "@/lib/translations";

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {t(locale, "heroTitle")}
          </h1>

          <p className="text-lg text-gray-600">
            {t(locale, "heroSubtitle")}
          </p>

          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full
                       bg-gradient-to-r from-pink-500 to-purple-500
                       text-white font-semibold shadow-lg
                       hover:opacity-90 transition"
          >
            {t(locale, "heroButtonShop")}
          </Link>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">
          <div className="rounded-[2rem] h-72 md:h-80
                          bg-gradient-to-br from-pink-200 via-pink-100 to-white
                          shadow-xl">
          </div>
        </div>

      </section>
    </div>
  );
}
