"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const locale = params.locale as string;
  const id = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      setProduct(data);
      setLoading(false);
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading product…</p>;
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Product not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-3 text-sm underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const name =
    locale === "ku"
      ? product.name_ku || product.name_en
      : locale === "ar"
      ? product.name_ar || product.name_en
      : product.name_en;

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-6xl mx-auto space-y-8">
      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:underline"
      >
        ← Back to products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="border rounded-2xl bg-gray-50 flex items-center justify-center p-6">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={name}
              className="max-h-[420px] object-contain"
            />
          ) : (
            <span className="text-sm text-gray-400">No image</span>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">{name}</h1>

          <div className="space-y-1 text-sm text-slate-600">
            {product.company && (
              <div>
                <strong>Brand:</strong> {product.company}
              </div>
            )}
            {product.category && (
              <div>
                <strong>Category:</strong> {product.category}
              </div>
            )}
          </div>

          {product.description && (
            <div className="pt-4 text-sm text-slate-700 leading-relaxed">
              {product.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
