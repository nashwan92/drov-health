import Image from "next/image";

export default function WarehousePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">

      <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 shadow-sm">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/60 via-emerald-100/40 to-white" />
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-emerald-200/40 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-6 sm:p-10 items-center">

          {/* Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 backdrop-blur px-4 py-2 border shadow-sm">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">
                Logistics & Storage
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Our Warehouse
            </h1>

            <div className="h-[3px] w-24 rounded-full bg-emerald-500" />

            <p className="text-slate-700 leading-relaxed text-lg">
              DROV Health & Beauty operates a modern, well-organized warehouse
              designed to ensure safe storage, efficient handling, and timely
              distribution of pharmaceutical and medical products across Iraq.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Our facility follows strict quality and safety standards,
              supporting temperature-controlled storage, accurate inventory
              management, and fast dispatch to meet the needs of hospitals,
              pharmacies, and healthcare partners nationwide.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "Temperature Controlled Storage",
                "Quality & Safety Compliance",
                "Efficient Inventory Management",
                "Nationwide Distribution Support",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/70 backdrop-blur border px-4 py-2 text-sm text-emerald-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-white/40 backdrop-blur border shadow-sm" />
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/warehouse/warehouse.jpeg" // ✅ your image
                alt="DROV Warehouse"
                width={900}
                height={600}
                priority
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
