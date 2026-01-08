"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  date: string;
};

export default function NewsSlider({ locale }: { locale: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD NEWS ================= */
  useEffect(() => {
    const loadNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id,title,description,date")
        .order("date", { ascending: false })
        .limit(5);

      if (!error && data) {
        setNews(data);
        setIndex(0); // reset safely
      }

      setLoading(false);
    };

    loadNews();
  }, []);

  /* ================= SLIDER LOGIC (SAFE) ================= */
  useEffect(() => {
    if (news.length <= 1) return; // 🔒 IMPORTANT GUARD

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % news.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [news]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-slate-500">
        Loading news...
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-slate-500">
        No news yet.
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border bg-white p-8 shadow-sm overflow-hidden">
      {news.map((item, i) => (
        <div
          key={item.id}
          className={`transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        >
          <h3 className="text-xl font-semibold text-slate-900">
            {item.title}
          </h3>

          <p className="mt-3 text-slate-600 line-clamp-3">
            {item.description}
          </p>

        <Link
  href={`/${locale}/news/${item.id}`}
  className="inline-block mt-4 text-pink-600 font-medium hover:underline"
>
  Read more →
</Link>


        </div>
      ))}

      {/* Dots */}
      {news.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-pink-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
