"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const COMPANIES = ["RIVA PHARMA", "FUTURE", "El Razy Pharma"];
const CATEGORIES = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Drops",
  "Cream",
  "Gel",
  "Lotion",
  "Ampoule",
];

type Product = {
  id: number;
  name_en: string | null;
  name_ar: string | null;
  name_ku: string | null;
  description: string | null;
  company: string | null;
  category: string | null;
  image_url: string | null;
  is_active: boolean;
};

export default function DashboardProductsPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  async function loadProducts() {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const getName = (p: Product) => {
    if (locale === "ar") return p.name_ar || p.name_en;
    if (locale === "ku") return p.name_ku || p.name_en;
    return p.name_en;
  };

  async function toggleActive(p: Product) {
    await supabase
      .from("products")
      .update({ is_active: !p.is_active })
      .eq("id", p.id);

    loadProducts();
  }

  async function deleteProduct(id: number) {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    await supabase.from("products").delete().eq("id", id);
    loadProducts();
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);

    await supabase
      .from("products")
      .update({
        name_en: editing.name_en,
        name_ar: editing.name_ar,
        name_ku: editing.name_ku,
        description: editing.description,
        company: editing.company,
        category: editing.category,
      })
      .eq("id", editing.id);

    setSaving(false);
    setEditing(null);
    loadProducts();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <a
          href={`/${locale}/dashboard/products/add`}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Product
        </a>
      </div>

      {loading && <p>Loading…</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border rounded-2xl p-4 bg-white/5 hover:shadow-lg"
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              {p.image_url ? (
                <Image
                  src={p.image_url}
                  alt={getName(p) || ""}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                  No image
                </div>
              )}
            </div>

            <h2 className="mt-3 font-semibold">{getName(p)}</h2>

            <div className="text-xs text-gray-500 mt-1 space-y-0.5">
              <div>Company: {p.company}</div>
              <div>Category: {p.category}</div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 flex items-center justify-between">
              {/* Show / Hide */}
              <motion.button
                whileHover={{ scale: 1.06, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                onClick={() => toggleActive(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full
                  ${
                    p.is_active
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  }`}
              >
                {p.is_active ? "Hide" : "Show"}
              </motion.button>

              {/* Edit / Delete */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  onClick={() => setEditing({ ...p })}
                  className="px-3 py-1.5 text-xs font-medium rounded-full
                             bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  onClick={() => deleteProduct(p.id)}
                  className="px-3 py-1.5 text-xs font-medium rounded-full
                             bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-xl p-5 w-full max-w-lg space-y-3"
          >
            <h2 className="text-lg font-semibold">Edit Product</h2>

            <input
              className="w-full border rounded p-2"
              value={editing.name_en || ""}
              onChange={(e) =>
                setEditing({ ...editing, name_en: e.target.value })
              }
              placeholder="Name (EN)"
            />

            <textarea
              className="w-full border rounded p-2"
              value={editing.description || ""}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              placeholder="Description"
            />

            <select
              className="w-full border rounded p-2"
              value={editing.company || ""}
              onChange={(e) =>
                setEditing({ ...editing, company: e.target.value })
              }
            >
              {COMPANIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              className="w-full border rounded p-2"
              value={editing.category || ""}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
