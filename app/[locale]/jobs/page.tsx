"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const params = useParams();

  // Get locale safely
  const locale =
    typeof params?.locale === "string" ? params.locale : "en";

  // Load ONLY visible jobs
  const loadJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true) // ✅ show only visible jobs
      .order("id", { ascending: false });

    if (!error) setJobs(data || []);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-slate-900">
        Jobs
      </h1>

      {/* Empty state */}
      {jobs.length === 0 && (
        <div className="rounded-xl border bg-slate-50 p-6 text-center text-slate-600">
          No job opportunities available at the moment.
        </div>
      )}

      {/* Jobs grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((j) => (
          <Link
            key={j.id}
            href={`/${locale}/jobs/${j.id}`} // ✅ locale-aware
            className="group"
          >
            <div className="bg-white border rounded-2xl p-5 space-y-4 transition hover:shadow-lg cursor-pointer">

              {j.image_url && (
                <img
                  src={j.image_url}
                  alt={j.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              )}

              <div className="font-semibold text-lg text-slate-900 group-hover:text-emerald-600 transition">
                {j.title}
              </div>

              <p className="text-sm text-slate-600 line-clamp-3">
                {j.description}
              </p>

              <span className="inline-block pt-2 text-sm text-emerald-600 font-medium">
                View details →
              </span>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
