"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage({
  params,
}: {
  params: { locale: string };
}) {
  const router = useRouter();
  const locale = params.locale;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ LOGIN HANDLER
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    // ✅ CORRECT LOCALIZED REDIRECT
    router.replace(`/${locale}/dashboard`);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* ❌ NO form, NO onClick inside form */}
      <button
        type="button"
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Login
      </button>

      {msg && <p className="mt-4 text-red-600">{msg}</p>}
    </div>
  );
}
