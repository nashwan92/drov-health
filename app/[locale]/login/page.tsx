"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

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

    // ✅ Localized redirect
    router.replace(`/${locale}/dashboard`);
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-5"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>

      {msg && (
        <p className="mt-4 text-center text-red-600 text-sm">
          {msg}
        </p>
      )}
    </div>
  );
}
