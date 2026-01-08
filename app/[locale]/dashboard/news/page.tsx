"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type News = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  date: string;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (data) setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("news-images")
      .upload(fileName, file);

    if (error) {
      alert("Image upload failed");
      return null;
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!title.trim()) return alert("Title is required");

    setLoading(true);

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    if (editingId) {
      await supabase
        .from("news")
        .update({
          title,
          description,
          date,
          image_url: imageUrl,
        })
        .eq("id", editingId);
    } else {
      await supabase.from("news").insert([
        {
          title,
          description,
          date,
          image_url: imageUrl,
        },
      ]);
    }

    // reset
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setImageFile(null);
    setEditingId(null);
    setLoading(false);

    fetchNews();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this news item?")) return;
    await supabase.from("news").delete().eq("id", id);
    fetchNews();
  };

  /* ================= EDIT ================= */
  const handleEdit = (item: News) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setDate(item.date);
    setImageFile(null);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">News</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-5 rounded-lg shadow mb-8">
        <h2 className="font-semibold mb-4">
          {editingId ? "Edit News" : "Add News"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-fit"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files?.[0] || null)
            }
            className="text-sm"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            {editingId ? "Update News" : "Add News"}
          </button>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow flex gap-4"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 border rounded text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {news.length === 0 && (
          <p className="text-sm text-gray-500">No news yet.</p>
        )}
      </div>
    </div>
  );
}
