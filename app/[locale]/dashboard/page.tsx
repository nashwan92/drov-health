"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-slate-600">Manage products, news, jobs, and partners here.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <a
        href="/dashboard/products"
        className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
      >
        <h2 className="font-semibold">Products</h2>
        <p className="text-sm text-slate-600 mt-1">Manage products</p>
      </a>

      <a
        href="/dashboard/news"
        className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
      >
        <h2 className="font-semibold">News</h2>
        <p className="text-sm text-slate-600 mt-1">Manage news</p>
      </a>

      <a
        href="/dashboard/jobs"
        className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
      >
        <h2 className="font-semibold">Jobs</h2>
        <p className="text-sm text-slate-600 mt-1">Manage jobs</p>
      </a>

      <a
        href="/dashboard/partners"
        className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
      >
        <h2 className="font-semibold">Partners</h2>
        <p className="text-sm text-slate-600 mt-1">Manage partner logos</p>
      </a>
    </div>
  </div>
);
}
