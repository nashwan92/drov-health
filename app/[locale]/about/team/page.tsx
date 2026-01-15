import Image from "next/image";

export default function OurTeamPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">

      <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 shadow-sm">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/60 via-emerald-100/40 to-white" />
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-emerald-200/40 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-6 sm:p-10 items-center">

          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 rounded-3xl bg-white/40 backdrop-blur border shadow-sm" />
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/team/team.jpeg" // ✅ team image
                alt="DROV Team"
                width={900}
                height={600}
                priority
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 order-1 lg:order-2">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 see backdrop-blur px-4 py-2 border shadow-sm">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">
                People Behind DROV
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Our Team
            </h1>

            <div className="h-[3px] w-24 rounded-full bg-emerald-500" />

            <p className="text-lg text-slate-700 leading-relaxed">
              At DROV Health & Beauty, our strength lies in our people.
              Our team brings together experienced professionals from
              pharmaceutical distribution, logistics, quality assurance,
              and customer service.
            </p>

            <p className="text-slate-700 leading-relaxed">
              With a shared commitment to integrity, efficiency, and
              collaboration, our team works every day to ensure reliable
              access to healthcare and beauty products across Iraq.
            </p>

            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                ["Professional Expertise", "Deep industry knowledge and experience"],
                ["Team Collaboration", "Strong coordination across departments"],
                ["Quality Commitment", "High standards in every process"],
                ["Customer Focus", "Long-term partnerships and trust"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white/70 backdrop-blur border p-4 shadow-sm"
                >
                  <div className="font-medium text-emerald-700">
                    {title}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
