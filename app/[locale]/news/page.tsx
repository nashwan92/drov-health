"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  date: string;
};

export default function NewsPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });

      if (!error && data) {
        setNews(data);
      }

      setLoading(false);
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading news...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-10">
      <h1 className="text-3xl font-bold text-slate-900">Latest News</h1>

      {news.length === 0 && (
        <p className="text-slate-500">No news available.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/news/${item.id}`}
            className="group bg-white border rounded-2xl overflow-hidden
                       shadow-sm hover:shadow-lg transition block"
          >
            {/* IMAGE */}
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h2>

              <p className="text-sm text-slate-600 line-clamp-3">
                {item.description}
              </p>

              <p className="text-xs text-slate-400">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
