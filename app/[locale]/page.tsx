import Image from "next/image";

import Link from "next/link";
import PartnersSlider from "@/components/about/PartnersSlider";
import NewsSlider from "@/components/home/NewsSlider";

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  const partners = [
    { src: "/partners/elrazy.png", alt: "Elrazy" },
    { src: "/partners/future.png", alt: "Future" },
    { src: "/partners/riva.png", alt: "Riva" },
  ];

  return (
    <main>


{/* ================= HERO ================= */}
<section className="relative">
  {/* Background Image */}
  <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] w-full">
    <Image
      src="/images/drov2.png"
      alt="Premium health and beauty products from DROV"
      fill
      priority
      className="object-cover object-center"
      sizes="100vw"
    />

    {/* Light overlay (NO BLUR) */}
    <div className="absolute inset-0 bg-white/45 sm:bg-white/35" />

    {/* Content */}
    <div className="absolute inset-0 flex items-center">
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            Feel Better. <br />
            <span className="text-pink-600">Look Better.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-700">
            Premium health & beauty products from DROV.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center sm:justify-start">
            <Link
              href={`/${locale}/products`}
              className="rounded-full bg-pink-600 px-8 py-3 text-white font-semibold shadow-lg hover:bg-pink-700 transition"
            >
              See Our Products
            </Link>

            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-slate-300 bg-white/80 px-8 py-3 text-slate-800 font-medium hover:bg-white transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ================= TRUST / STATS ================= */}
      <section className="py-16 bg-white border-t border-b">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["10+", "Years Experience"],
            ["500+", "Products"],
            ["100+", "Partners"],
            ["All Iraq", "Nationwide Coverage"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold text-pink-600">{value}</div>
              <p className="mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS PREVIEW ================= */}
      <section id="products" className="py-20">
        <div className="mx-auto max-w-6xl px-4">

          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Our Products</h2>

            <Link
              href={`/${locale}/products`}
              className="hidden sm:inline text-pink-600 font-medium hover:underline"
            >
              See all products →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Vitamin Supplements", "High-quality daily health supplements."],
              ["Medical Equipment", "Certified medical supplies and devices."],
              ["Skincare Products", "Dermatologically tested skincare range."],
            ].map(([name, desc]) => (
              <div
                key={name}
                className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="h-36 rounded-xl bg-slate-100 mb-4" />
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="mt-2 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile button */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href={`/${locale}/products`}
              className="inline-block rounded-full bg-pink-600 px-6 py-3 text-white font-medium hover:bg-pink-700 transition"
            >
              See All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY DROV ================= */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 grid gap-10 lg:grid-cols-3">
          {[
            ["Quality First", "We source products from trusted manufacturers."],
            ["Reliable Distribution", "Strong logistics across Iraq."],
            ["Customer Focused", "Long-term partnerships built on trust."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-semibold text-center">
            Trusted by Leading Brands
          </h2>

          <div className="mt-10">
            <PartnersSlider partners={partners} />
          </div>
        </div>
      </section>

      {/* ================= LATEST NEWS ================= */}
      <section id="news" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold">Latest News</h2>

            <Link
              href={`/${locale}/news`}
              className="hidden sm:inline text-pink-600 font-medium hover:underline"
            >
              View all news →
            </Link>
          </div>

          <NewsSlider
            news={[
              {
                title: "DROV Expands Distribution Network",
                summary:
                  "We are proud to announce the expansion of our distribution coverage across Iraq.",
                link: `/${locale}/news/drov-expands-network`,
              },
              {
                title: "New International Partnership",
                summary:
                  "DROV signs strategic partnership with leading pharmaceutical brand.",
                link: `/${locale}/news/new-partnership`,
              },
              {
                title: "Introducing New Medical Products",
                summary:
                  "A new range of certified medical supplies is now available.",
                link: `/${locale}/news/new-products`,
              },
            ]}
          />

          {/* Mobile button */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href={`/${locale}/news`}
              className="inline-block rounded-full bg-pink-600 px-6 py-3 text-white font-medium hover:bg-pink-700 transition"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl bg-gradient-to-r from-pink-600 to-pink-500 p-10 text-white text-center">
            <h2 className="text-3xl font-semibold">
              Ready to work with DROV?
            </h2>

            <p className="mt-3 text-lg text-white/90">
              Discover our products or contact our team today.
            </p>

            <Link
              href={`/${locale}/contact`}
              className="inline-block mt-6 rounded-full bg-white px-8 py-3 text-pink-600 font-medium hover:bg-slate-100 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
