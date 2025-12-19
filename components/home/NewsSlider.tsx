"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  title: string;
  summary: string;
  link: string;
};

export default function NewsSlider({ news }: { news: NewsItem[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % news.length),
      4000
    );
    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <div className="relative rounded-2xl border bg-white p-8 shadow-sm overflow-hidden">

      {news.map((item, i) => (
        <div
          key={item.title}
          className={`transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        >
          <h3 className="text-xl font-semibold">
            {item.title}
          </h3>

          <p className="mt-3 text-slate-600">
            {item.summary}
          </p>

          <a
            href={item.link}
            className="inline-block mt-4 text-pink-600 font-medium hover:underline"
          >
            Read more →
          </a>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {news.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${
              i === index ? "bg-pink-600" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
