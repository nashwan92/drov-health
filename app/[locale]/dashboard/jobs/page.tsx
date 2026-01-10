"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

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

  const saveJob = async () => {
    if (!title || !description) {
      setMsg("Title and description are required");
      return;
    }

    setLoading(true);
    setMsg("");

    let image_url = "";

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("jobs").upload(fileName, file);

      if (error) {
        setMsg(error.message);
        setLoading(false);
        return;
      }

      image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/jobs/${fileName}`;
    }

    if (editingId) {
      await supabase
        .from("jobs")
        .update({
          title,
          description,
          ...(image_url && { image_url }),
        })
        .eq("id", editingId);

      setMsg("✅ Job updated");
    } else {
      await supabase.from("jobs").insert([
        {
          title,
          description,
          image_url,
          is_active: true, // ✅ new jobs visible by default
        },
      ]);

      setMsg("✅ Job added");
    }

    setTitle("");
    setDescription("");
    setFile(null);
    setEditingId(null);
    setLoading(false);
    loadJobs();
  };

  const deleteJob = async (id: number) => {
    if (!confirm("Delete this job?")) return;
    await supabase.from("jobs").delete().eq("id", id);
    loadJobs();
  };

  const editJob = (job: any) => {
    setEditingId(job.id);
    setTitle(job.title);
    setDescription(job.description);
    setMsg("");
  };

  // ✅ NEW: Toggle visibility (show/hide)
  const toggleJobVisibility = async (job: any) => {
    await supabase
      .from("jobs")
      .update({ is_active: !job.is_active })
      .eq("id", job.id);

    loadJobs();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Manage Jobs</h1>

      {/* FORM */}
      <div className="bg-white border rounded-2xl p-6 max-w-xl space-y-4">
        <input
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Job Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Upload button */}
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-50 transition text-sm text-slate-700">
          📤 Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {file && <p className="text-xs text-slate-500">Selected: {file.name}</p>}

        <div className="flex items-center gap-3">
          <button
            onClick={saveJob}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition cursor-pointer"
          >
            {loading ? "Saving..." : editingId ? "Update Job" : "Add Job"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setDescription("");
              }}
              className="text-sm text-slate-500 hover:text-slate-700 transition cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {msg && <p className="text-sm text-emerald-600">{msg}</p>}
      </div>

      {/* JOB LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="bg-white border rounded-2xl p-4 space-y-3 hover:shadow-md transition"
          >
            {j.image_url && (
              <img
                src={j.image_url}
                alt={j.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            )}

            <div className="flex items-start justify-between gap-3">
              <div className="font-semibold text-slate-900">{j.title}</div>

              {/* ✅ Visible / Hidden badge */}
              <span
                className={`text-xs px-2 py-1 rounded-full border ${
                  j.is_active
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {j.is_active ? "Visible" : "Hidden"}
              </span>
            </div>

            <p className="text-sm text-slate-600 line-clamp-3">{j.description}</p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => editJob(j)}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer text-sm"
              >
                Edit
              </button>

              {/* ✅ NEW: Show/Hide button */}
              <button
                onClick={() => toggleJobVisibility(j)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-sm ${
                  j.is_active
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {j.is_active ? "Hide" : "Show"}
              </button>

              <button
                onClick={() => deleteJob(j.id)}
                className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
