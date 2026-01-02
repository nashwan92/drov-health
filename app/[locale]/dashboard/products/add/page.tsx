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
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Product name (EN)"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          required
          className="w-full border rounded-lg p-2"
        />

        <input
          placeholder="Product name (AR)"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          className="w-full border rounded-lg p-2"
        />

        <input
          placeholder="Product name (KU)"
          value={nameKu}
          onChange={(e) => setNameKu(e.target.value)}
          className="w-full border rounded-lg p-2"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-2 min-h-[100px]"
        />

       <div>
  <label className="block text-sm font-medium mb-1">Company</label>
  <select
    value={company}
    onChange={(e) => setCompany(e.target.value)}
    className="w-full border rounded-lg p-2 bg-white"
    required
  >
    <option value="">Select company</option>
    <option value="RIVA PHARMA">RIVA PHARMA</option>
    <option value="FUTURE">FUTURE</option>
    <option value="El Razy Pharma">El Razy Pharma</option>
  </select>
</div>


       <div>
  <label className="block text-sm font-medium mb-1">Category</label>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border rounded-lg p-2 bg-white"
    required
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


        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>

        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
