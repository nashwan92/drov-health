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
  ]

  // Update coordinates to your real office location
  const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3219.8394411272716!2d43.99851177581087!3d36.19478647242599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDExJzQxLjIiTiA0NMKwMDAnMDMuOSJF!5e0!3m2!1sen!2siq!4v1766001866882!5m2!1sen!2siq'

  return (
    <main className="about-page bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">

        {/* 1) HERO section (after navbar) */}
        <section className="overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
         
         
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex items-center gap-3">
              {/* Replace with your real logo path if you have it: /public/logo.png */}
              <div className="h-12 w-12 rounded-2xl bg-white/10 grid place-items-center border border-white/15">
                <span className="text-lg font-semibold">D</span>
              </div>

              <div className="leading-tight">
                <div className="text-sm text-white/80">Drov</div>
                <div className="text-xs text-white/70">Health & Beauty</div>
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your trusted partner for complete health and beauty solutions.
            </h1>

            <div className="mt-4 max-w-2xl text-white/85">
              <div className="h-px w-16 bg-white/30 my-4" />
              <p className="text-base sm:text-lg">
                A leading distributor of pharmaceuticals and medical supplies across Iraq since 2014.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                Pharmaceuticals
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                Medical Supplies
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                Nationwide Distribution
              </span>
            </div>
          </div>
        </section>

        {/* 2) Partners section (logos + slideshow) */}
        <section>
          <PartnersSlider partners={partners} />
        </section>

  

        {/* 3) About Drov section */}
        <section className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

{/* Animated background */}
<div className="absolute inset-0">
  <CurvedLinesBg />
</div>

{/* Content */}
<div className="relative z-10">
  <h2 className="text-2xl font-semibold">
    About Drov
  </h2>

  <p className="mt-3">
    DROV is committed to delivering reliable health and beauty products
    with professional service and strong supply-chain capabilities.
    We focus on quality, safety, and long-term partnerships across Iraq.
  </p>
</div>

</section>


        {/* 4) Vision & Mission (two columns) */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900">Vision</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              To be Iraq’s most trusted and innovative distributor of pharmaceuticals and medical supplies,
              enabling better healthcare access through quality, efficiency, and integrity.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-semibold text-slate-900">Mission</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              To provide dependable distribution, transparent service, and consistent product availability,
              while building strong relationships with partners and customers across the country.
            </p>
          </div>
        </section>

        {/* 5) History section */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">History</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
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
