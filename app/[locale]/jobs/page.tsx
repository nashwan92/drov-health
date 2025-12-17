"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("jobs").select("*");
      setJobs(data || []);
    }
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Jobs</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="bg-white border rounded-xl p-3 space-y-2"
          >
            {j.image_url && (
              <img
                src={j.image_url}
                className="w-full h-48 object-cover rounded"
                alt={j.title}
              />
            )}
            <div className="font-semibold text-slate-900">{j.title}</div>
            <p className="text-sm text-slate-600">{j.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
