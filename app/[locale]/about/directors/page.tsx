import Image from "next/image";

export default function DirectorsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 space-y-24">

      {/* ===================== CEO ===================== */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 shadow-sm">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/60 via-emerald-100/40 to-white" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 grid lg:grid-cols-3 gap-8 p-6 sm:p-10">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-white/60 backdrop-blur border shadow-sm">
            <Image
              src="/directors/sirwan.jpeg"
              alt="Sirwan – CEO"
              width={600}
              height={800}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl bg-white/70 backdrop-blur border p-8 shadow-sm">
              <h1 className="text-3xl font-semibold text-emerald-700">
                Mr. Sirwan Rahman
              </h1>

              <p className="mt-1 text-lg text-slate-600">
                Chief Executive Officer (CEO)
              </p>

              <div className="mt-6 h-[3px] w-20 rounded-full bg-emerald-500" />

              <p className="mt-6 text-slate-700 leading-relaxed">
                Mr. Sirwan leads the strategic vision and overall operations of
                DROV Health & Beauty. With extensive experience in pharmaceutical
                distribution and corporate leadership, he has played a key role
                in expanding the company’s national footprint and strengthening
                long-term partnerships across Iraq.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 text-slate-700">
              Under his leadership, DROV has focused on operational excellence,
              quality assurance, and sustainable growth, ensuring reliable
              access to healthcare products while maintaining high professional
              standards.
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GENERAL MANAGER ===================== */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 shadow-sm">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/60 via-emerald-100/40 to-white" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 grid lg:grid-cols-3 gap-8 p-6 sm:p-10">

          {/* Text */}
          <div className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1">
            <div className="rounded-2xl bg-white/70 backdrop-blur border p-8 shadow-sm">
              <h1 className="text-3xl font-semibold text-emerald-700">
                Dr. Sarhang Hayyas
              </h1>

              <p className="mt-1 text-lg text-slate-600">
                General Manager
              </p>

              <div className="mt-6 h-[3px] w-20 rounded-full bg-emerald-500" />

              <p className="mt-6 text-slate-700 leading-relaxed">
                Dr. Sarhang oversees the daily operations and administrative
                management of DROV Health & Beauty. His role is central to
                coordinating logistics, managing teams, and ensuring smooth
                execution of company strategies.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 text-slate-700">
              Through strong organizational skills and operational insight,
              he supports DROV’s mission to deliver dependable healthcare
              solutions with efficiency, transparency, and consistency.
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-white/60 backdrop-blur border shadow-sm order-1 lg:order-2">
            <Image
              src="/directors/sarhang.jpeg"
              alt="Sarhang – General Manager"
              width={600}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
