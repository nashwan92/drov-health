'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type Partner = {
  src: string
  alt: string
  slug?: string
}

export default function PartnersSlider({
  partners,
  intervalMs = 4000,
}: {
  partners: Partner[]
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)
  const params = useParams()
  const locale = typeof params?.locale === 'string' ? params.locale : 'en'

  const safePartners = useMemo(
    () => partners.filter((p) => p && p.src),
    [partners]
  )

  const total = safePartners.length

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % total),
      intervalMs
    )
    return () => clearInterval(timer)
  }, [total, intervalMs])

  if (!total) return null

  const getHref = (p: Partner) =>
    p.slug ? `/${locale}/products?company=${p.slug}` : `/${locale}/products`

  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-10 py-14">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          Our Partners
        </h2>
        <p className="mt-2 text-slate-600">
          Trusted pharmaceutical and medical brands we collaborate with
        </p>
      </div>

      <div className="mx-auto mt-8 h-[2px] w-32 bg-emerald-600" />

      <div className="relative mt-12 flex h-36 items-center justify-center">
        {safePartners.map((p, i) => (
          <Link
            key={p.src + i}
            href={getHref(p)}
            className={`absolute transition-all duration-700 ${
              i === index
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
            aria-label={`View ${p.alt} products`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={420}
              height={160}
              className="max-h-28 w-auto object-contain grayscale hover:grayscale-0 transition"
              priority={i === 0}
            />
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        {safePartners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-10 rounded-full transition ${
              i === index
                ? 'bg-emerald-600'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Partner ${i + 1}`}
          />
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-20 gap-y-10">
        {safePartners.map((p, i) => (
          <Link
            key={p.src + i}
            href={getHref(p)}
            className={`transition-opacity ${
              i === index ? 'opacity-40' : 'opacity-100'
            }`}
            aria-label={`View ${p.alt} products`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={200}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}