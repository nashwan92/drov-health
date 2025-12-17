"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 Load jobs
  const loadJobs = async () => {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("id", { ascending: false });

    setJobs(data || []);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // ➕ Add job
  const addJob = async () => {
    if (!title || !description) {
      setMsg("Title and description are required");
      return;
    }

    setLoading(true);
    setMsg("");

    let image_url = "";

    // 📤 Upload image if exists
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("jobs") // 🔹 bucket name
        .upload(fileName, file);

      if (uploadError) {
        setMsg(uploadError.message);
        setLoading(false);
        return;
      }

      image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/jobs/${fileName}`;
    }

    // 🧾 Insert job
    const { error } = await supabase.from("jobs").insert([
      {
        title,
        description,
        image_url,
      },
    ]);

    if (error) {
      setMsg(error.message);
      setLoading(false);
      return;
    }

    // ✅ Reset form
    setTitle("");
    setDescription("");
    setFile(null);
    setMsg("✅ Job added successfully");

    await loadJobs();
    setLoading(false);
  };

  // ❌ Delete job
  const deleteJob = async (id: number) => {
    await supabase.from("jobs").delete().eq("id", id);
    await loadJobs();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Jobs</h1>

      {/* ➕ Add job form */}
      <div className="bg-white p-4 border rounded-xl max-w-xl space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={addJob}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Job"}
        </button>

        {msg && <p className="text-sm text-green-700">{msg}</p>}
      </div>

      {/* 📋 Jobs list */}
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="bg-white border rounded-xl p-3 space-y-2"
          >
            {j.image_url && (
              <img
                src={j.image_url}
                alt={j.title}
                className="w-full h-48 object-cover rounded"
              />
            )}

            <div className="font-semibold">{j.title}</div>
            <p className="text-sm text-slate-600">{j.description}</p>

            <button
              onClick={() => deleteJob(j.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
