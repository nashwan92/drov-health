import Image from "next/image";
import Link from "next/link";
import PartnersSlider from "@/components/about/PartnersSlider";
import NewsSlider from "@/components/home/NewsSlider";
import HomeProductsPreview from "@/components/home/HomeProductsPreview";

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
        <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] w-full">
          <Image
            src="/images/drov2.png"
            alt="Premium health and beauty products from DROV"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-white/45 sm:bg-white/35" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-6xl px-4 w-full">
              <div className="max-w-xl text-center sm:text-left">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Feel Better. <br />
                  <span className="text-green-600">Look Better.</span>
                </h1>

                <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-700">
                  Premium health & beauty products from DROV.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center sm:justify-start">
                  <Link
                    href={`/${locale}/products`}
                    className="rounded-full bg-green-600 px-8 py-3 text-white font-semibold shadow-lg hover:bg-pink-700 transition"
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
              <div className="text-3xl font-bold text-green-600">{value}</div>
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
              className="hidden sm:inline text-green-600 font-medium hover:underline"
            >
              See all products →
            </Link>
          </div>

          {/* 🔥 REAL PRODUCTS FROM DATABASE */}
          <HomeProductsPreview locale={locale} />

          <div className="mt-8 text-center sm:hidden">
            <Link
              href={`/${locale}/products`}
              className="inline-block rounded-full bg-green-600 px-6 py-3 text-white font-medium hover:bg-pink-700 transition"
            >
              See All Products
            </Link>
          </div>
        </div>
      </section>

 {/* ================= WHY DROV ================= */}
<section className="relative py-24 overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#E8F5E9] via-white to-[#F1F8F4]" />

  {/* Decorative blurred shapes */}
  <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#4CAF50]/20 rounded-full blur-3xl" />
  <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#3E8E41]/20 rounded-full blur-3xl" />

  <div className="relative mx-auto max-w-6xl px-4">
    {/* Section header */}
    <div className="text-center max-w-2xl mx-auto mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
        Why Choose <span className="text-[#4CAF50]">DROV</span>
      </h2>
      <p className="mt-4 text-slate-600 text-lg">
        We deliver trusted healthcare solutions with quality, reliability, and care.
      </p>
    </div>

    {/* Cards */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Quality First",
          desc: "We source products from trusted manufacturers that meet international standards.",
          icon: "✔️",
        },
        {
          title: "Reliable Distribution",
          desc: "A strong logistics network ensures fast and consistent delivery across Iraq.",
          icon: "🚚",
        },
        {
          title: "Customer Focused",
          desc: "We build long-term partnerships based on trust, transparency, and support.",
          icon: "🤝",
        },
      ].map(({ title, desc, icon }) => (
        <div
          key={title}
          className="group relative rounded-3xl bg-white p-8 shadow-sm border transition
                     hover:shadow-xl hover:-translate-y-1"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl
                          bg-[#E8F5E9] text-2xl mb-6
                          group-hover:bg-[#4CAF50] group-hover:text-white transition">
            {icon}
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-slate-900">
            {title}
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            {desc}
          </p>

          {/* Subtle hover border */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent
                          group-hover:ring-[#4CAF50]/30 transition" />
        </div>
      ))}
    </div>
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
<section
  id="news"
  className="relative py-24 overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#F1F8F4] via-white to-[#E8F5E9]" />

  {/* Decorative blurs */}
  <div className="absolute -top-24 right-10 w-72 h-72 bg-[#4CAF50]/20 rounded-full blur-3xl" />
  <div className="absolute -bottom-24 left-10 w-72 h-72 bg-[#3E8E41]/20 rounded-full blur-3xl" />

  <div className="relative mx-auto max-w-6xl px-4">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Latest <span className="text-[#4CAF50]">News</span>
        </h2>
        <p className="mt-2 text-slate-600 max-w-md">
          Stay updated with our latest announcements and company updates.
        </p>
      </div>

      <Link
        href={`/${locale}/news`}
        className="hidden sm:inline-flex items-center gap-1 text-[#4CAF50] font-medium hover:underline"
      >
        View all news →
      </Link>
    </div>

    {/* News slider */}
    <div className="relative rounded-3xl bg-white/80 backdrop-blur border shadow-sm p-6">
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
    </div>

    {/* Mobile button */}
    <div className="mt-10 text-center sm:hidden">
      <Link
        href={`/${locale}/news`}
        className="inline-block rounded-full bg-[#4CAF50] px-6 py-3 text-white font-medium hover:bg-[#3E8E41] transition"
      >
        View All News
      </Link>
    </div>
  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl bg-gradient-to-r from-green-600 to-pink-500 p-10 text-white text-center">
            <h2 className="text-3xl font-semibold">
              Ready to work with DROV?
            </h2>

            <p className="mt-3 text-lg text-white/90">
              Discover our products or contact our team today.
            </p>

            <Link
              href={`/${locale}/contact`}
              className="inline-block mt-6 rounded-full bg-white px-8 py-3 text-green-600 font-medium hover:bg-slate-100 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
