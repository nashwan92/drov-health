"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function HomeProductsPreview({
  locale,
}: {
  locale: string;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false })
        .limit(3);

      setProducts(data || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border bg-white p-6 shadow-sm animate-pulse"
          >
            <div className="h-36 rounded-xl bg-slate-100 mb-4" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />
            <div className="mt-3 h-3 bg-slate-200 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => {
        const name =
          locale === "ku"
            ? p.name_ku || p.name_en
            : locale === "ar"
            ? p.name_ar || p.name_en
            : p.name_en;

        return (
          <Link
            key={p.id}
            href={`/${locale}/products/${p.id}`}
            className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition block"
          >
            <div className="h-36 rounded-xl bg-gray-50 flex items-center justify-center mb-4 overflow-hidden">
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={name}
                  loading="eager"
                  className="max-h-full max-w-full object-contain p-2"
                />
              ) : (
                <span className="text-xs text-gray-400">No image</span>
              )}
            </div>

            <h3 className="text-lg font-semibold">{name}</h3>

            {p.description && (
              <p className="mt-2 text-slate-600 text-sm line-clamp-2">
                {p.description}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}
