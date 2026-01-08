"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  date: string;
};

export default function SingleNewsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNaN(id)) return;

    const loadNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setNews(data);
      }

      setLoading(false);
    };

    loadNews();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading news...
      </div>
    );
  }

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-red-500">
        News not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        {news.title}
      </h1>

      <p className="text-sm text-slate-500">
        {new Date(news.date).toLocaleDateString()}
      </p>

      {news.image_url && (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
        {news.description}
      </p>
    </div>
  );
}
