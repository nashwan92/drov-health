'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type Partner = { src: string; alt: string }

export default function PartnersSlider({
  partners,
  intervalMs = 2500,
}: {
  partners: Partner[]
  intervalMs?: number
}) {
  const [index, setIndex] = useState(0)

  const safePartners = useMemo(() => partners.filter(Boolean), [partners])
  const total = safePartners.length

  useEffect(() => {
    if (total <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % total), intervalMs)
    return () => clearInterval(t)
  }, [total, intervalMs])

  if (!total) return null

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Our Partners</h2>

        <div className="flex gap-2">
          {safePartners.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to partner ${i + 1}`}
              onClick={() => setIndex(i)}
              className={[
                'h-2.5 w-2.5 rounded-full transition',
                i === index ? 'bg-slate-900' : 'bg-slate-300 hover:bg-slate-400',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <p className="mt-2 sm:text-lg text-slate-600">
        We collaborate with trusted brands to deliver high-quality health and beauty solutions.
      </p>

      <div className="mt-6">
        <div className="relative mx-auto h-24 w-full max-w-md overflow-hidden">
          {safePartners.map((p, i) => (
            <div
              key={p.src + i}
              className={[
                'absolute inset-0 grid place-items-center transition-all duration-500',
                i === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none',
              ].join(' ')}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={240}
                height={96}
                className="max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {safePartners.slice(0, 6).map((p) => (
            <div key={p.src} className="grid place-items-center rounded-xl border bg-slate-50 p-3">
              <Image
                src={p.src}
                alt={p.alt}
                width={140}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
