"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameKu, setNameKu] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function uploadImage(file: File) {
    const ext = file.name.split(".").pop();
    const fileName = `products/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase.from("products").insert({
        name_en: nameEn,
        name_ar: nameAr || null,
        name_ku: nameKu || null,
        description: description || null,
        company: company || null,
        category: category || null,
        image_url: imageUrl,
        is_active: true,
      });

      if (error) throw error;

      setMessage("✅ Product added successfully");

      setNameEn("");
      setNameAr("");
      setNameKu("");
      setDescription("");
      setCompany("");
      setCategory("");
      setImageFile(null);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8 space-y-5">
      <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-4 sm:p-6 space-y-4"
      >
        {/* Names */}
        <input
          placeholder="Product name (EN)"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          required
          className="w-full border rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          placeholder="Product name (AR)"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          placeholder="Product name (KU)"
          value={nameKu}
          onChange={(e) => setNameKu(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3 min-h-[120px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Company */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1">
            Company
          </label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full border rounded-lg p-3 bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select company</option>
            <option value="RIVA PHARMA">RIVA PHARMA</option>
            <option value="FUTURE">FUTURE</option>
            <option value="El Razy Pharma">El Razy Pharma</option>
            <option value="SCOTT-EDIL">SCOTT-EDIL</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded-lg p-3 bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select category</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Drops">Drops</option>
            <option value="Cream">Cream</option>
            <option value="Gel">Gel</option>
            <option value="Lotion">Lotion</option>
            <option value="Ampoule">Ampoule</option>
          </select>
        </div>

        {/* Upload image */}
        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-medium">
            Product Image
          </label>

          <label className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-lg border cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
            📤 Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
            />
          </label>

          {imageFile && (
            <p className="text-xs text-slate-500 truncate">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition text-sm sm:text-base cursor-pointer"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>

        {message && (
          <p className="text-sm text-center text-slate-700">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
