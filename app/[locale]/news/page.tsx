"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("news").select("*");
      setNews(data || []);
    }
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">News</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {news.map((n) => (
          <div
            key={n.id}
            className="bg-white border rounded-xl p-3 space-y-2"
          >
            {n.image_url && (
              <img
                src={n.image_url}
                className="w-full h-48 object-cover rounded"
                alt={n.title}
              />
            )}
            <div className="font-semibold text-slate-900">{n.title}</div>
            <p className="text-sm text-slate-600">{n.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
