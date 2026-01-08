"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("contact_messages")
      .insert([form]);

    if (!error) {
      alert("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Contact <span className="text-[#4CAF50]">Us</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-8 space-y-5"
        >
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border rounded px-4 py-3"
          />

          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full border rounded px-4 py-3"
          />

          <textarea
            required
            rows={5}
            placeholder="Your message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full border rounded px-4 py-3"
          />

          <button
            disabled={loading}
            className="w-full rounded-full bg-[#4CAF50] py-3 text-white font-semibold hover:bg-[#3E8E41]"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* WHATSAPP */}
        <div className="flex flex-col justify-center gap-6">
          <p className="text-slate-600">
            Prefer instant contact?
          </p>

          <a
            href="https://wa.me/9647508618504?text=Hello%20DROV"
            target="_blank"
            className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-4 text-white font-semibold hover:bg-green-600 transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
