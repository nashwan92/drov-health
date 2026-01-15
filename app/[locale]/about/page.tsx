import Image from 'next/image'
import PartnersSlider from '@/components/about/PartnersSlider'
import CurvedLinesBg from "@/components/CurvedLinesBg";


export const metadata = {
  title: 'About | DROV Health & Beauty',
  description: 'Learn about DROV, our mission, vision, history, partners, and contact details.',
}

export default function AboutPage() {
  // Update these to your real partner logos in /public/partners
  const partners = [
    { src: '/partners/elrazy.png', alt: 'el-razy' },
    { src: '/partners/future.png', alt: 'future' },
    { src: '/partners/riva.png', alt: 'riva' },
    { src: '/partners/scott-edil.png', alt: 'scott-edil' },
  ]

  // Update coordinates to your real office location
  const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.8372164263046!2d43.99901807429978!3d36.194840572425946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4007230014e0537b%3A0xd4d5a61833207dbf!2sDROV%20Company!5e0!3m2!1sen!2siq!4v1768024630953!5m2!1sen!2siq" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'

  return (
    <main className="about-page bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">

{/* 1) HERO section (after navbar) */}
<section className="group relative overflow-hidden rounded-3xl border border-emerald-200/40 bg-gradient-to-br from-emerald-100 via-green-50 to-white shadow-[0_25px_70px_-25px_rgba(16,185,129,0.45)] transition-all duration-500 hover:shadow-[0_30px_90px_-30px_rgba(16,185,129,0.65)]">

  {/* Animated soft glows */}
  <div className="pointer-events-none absolute -top-28 -left-28 h-[460px] w-[460px] rounded-full bg-emerald-300/40 blur-[140px] transition-transform duration-700 group-hover:translate-x-10 group-hover:translate-y-6" />
  <div className="pointer-events-none absolute -bottom-32 -right-32 h-[460px] w-[460px] rounded-full bg-green-200/40 blur-[140px] transition-transform duration-700 group-hover:-translate-x-10 group-hover:-translate-y-6" />

  <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-20">

    {/* Brand */}
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-2xl bg-white/80 backdrop-blur border border-emerald-200 shadow-sm grid place-items-center transition-transform duration-300 hover:scale-105 hover:shadow-md">
        <span className="text-xl font-semibold text-emerald-700">D</span>
      </div>

      <div className="leading-tight">
        <div className="text-lg font-semibold tracking-wide text-emerald-600">Drov</div>
<div className="text-lg sm:text-xl font-semibold tracking-wide text-emerald-600">
  Health & Beauty
</div>

      </div>
    </div>

    {/* Headline */}
    <h1 className="mt-9 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
      Your trusted partner for complete health and beauty solutions.
    </h1>

    {/* Accent divider + subtitle */}
    <div className="mt-6 max-w-2xl text-slate-700">
      <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300 group-hover:w-24 my-4" />
      <p className="text-base sm:text-lg">
        A leading distributor of pharmaceuticals and medical supplies across Iraq since 2014.
      </p>
    </div>

    {/* Feature pills */}
    <div className="mt-10 flex flex-wrap gap-3">
      {[
        'Pharmaceuticals',
        'Medical Supplies',
        'Nationwide Distribution',
      ].map((item) => (
        <span
          key={item}
          className="rounded-full border border-emerald-200 bg-white/80 backdrop-blur px-5 py-2 text-sm text-emerald-800 shadow-sm transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          {item}
        </span>
      ))}
    </div>

  </div>
</section>



        {/* 2) Partners section (logos + slideshow) */}
        <section>
          <PartnersSlider partners={partners} />
        </section>

  

      {/* 3) About Drov */}
<section className="group relative overflow-hidden rounded-2xl border border-emerald-200/40 bg-white/80 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-10">

  {/* Soft animated background */}
  <div className="absolute inset-0 opacity-40">
    <CurvedLinesBg />
  </div>

  {/* Soft green glow */}
  <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />

  {/* Content */}
  <div className="relative z-10 max-w-3xl">

    <h2 className="flex items-center gap-—all text-2xl font-semibold text-slate-900">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      About Drov
    </h2>

    <div className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300 group-hover:w-24" />

    <p className="mt-5 text-slate-600 leading-relaxed">
      DROV is committed to delivering reliable health and beauty products
      through professional service and strong supply-chain capabilities.
      We focus on quality, safety, and long-term partnerships across Iraq.
    </p>

  </div>

</section>



{/* 4) Vision & Mission */}
<section className="grid gap-6 lg:grid-cols-2">

  {/* Vision */}
  <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/40 bg-white/80 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
    <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />

    <h3 className="relative z-10 flex items-center gap-2 text-xl font-semibold text-slate-900">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      Vision
    </h3>

    <p className="relative z-10 mt-4 text-slate-600 leading-relaxed">
      To be Iraq’s most trusted and innovative distributor of pharmaceuticals and medical supplies,
      enabling better healthcare access through quality, efficiency, and integrity.
    </p>
  </div>

  {/* Mission */}
  <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/40 bg-white/80 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
    <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-green-200/30 blur-2xl transition-transform duration-500 group-hover:-translate-x-6 group-hover:translate-y-6" />

    <h3 className="relative z-10 flex items-center gap-2 text-xl font-semibold text-slate-900">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      Mission
    </h3>

    <p className="relative z-10 mt-4 text-slate-600 leading-relaxed">
      To provide dependable distribution, transparent service, and consistent product availability,
      while building strong relationships with partners and customers across the country.
    </p>
  </div>

</section>

{/* 5) History */}
<section className="group relative overflow-hidden rounded-2xl border border-emerald-200/40 bg-white/80 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:p-8">
  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500 to-green-400 opacity-70" />

  <h2 className="ml-4 flex items-center gap-2 text-2xl font-semibold text-slate-900">
    History
  </h2>

  <p className="ml-4 mt-4 max-w-3xl text-slate-600 leading-relaxed">
    Since 2014, Drov has grown by focusing on service excellence, reliable sourcing, and strong logistics.
    Our journey has been shaped by trust, consistent delivery, and the goal of supporting Iraq’s healthcare
    ecosystem with professional distribution and customer care.
  </p>
</section>


        {/* 6) Contact + Address + Map */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Contact & Address</h2>

            <div className="mt-4 space-y-3 text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4 border">
                <div className="text-sm font-medium text-slate-900 text-slate-900">Office Address</div>
                <div className="mt-1 text-sm text-slate-600">
                  Erbil, Iraq — (replace with your full address)
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border">
                <div className="text-sm font-medium text-slate-900">Email</div>
                <a
                  href="mailto:info@drovpharma.com"
                  className="mt-1 block text-sm text-slate-600 hover:text-slate-900"
                >
                  info@drovpharma.com
                </a>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border">
                <div className="text-sm font-medium text-slate-900">Phone</div>
                <a
                  href="tel:+964000000000"
                  className="mt-1 block text-sm text-slate-600 hover:text-slate-900"
                >
                  +964 750 861 8504
                </a>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border">
                <div className="text-sm font-medium text-slate-900">Working Hours</div>
                <div className="mt-1 text-sm text-slate-600">Sat–Thu, 9:00–18:00</div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="border-b px-5 py-4">
              <h3 className="text-lg font-semibold text-slate-900">Find us on Google Maps</h3>
              <p className="mt-1 text-sm text-slate-600">Use the map to get directions to our office.</p>
            </div>

            <iframe
              title="DROV Office Location"
              src={mapEmbedUrl}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

      </div>
    </main>
  )
}
