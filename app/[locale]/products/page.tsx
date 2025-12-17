"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const [products, setProducts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [companyFilter, setCompanyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    async function load() {
      const { data: productsData } = await supabase
        .from("products")
        .select("*");
      const { data: companiesData } = await supabase
        .from("companies")
        .select("*");
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*");

      setProducts(productsData || []);
      setCompanies(companiesData || []);
      setCategories(categoriesData || []);
    }

    load();
  }, []);

  const filtered = products.filter(
    (p) =>
      (companyFilter === "all" || String(p.company_id) === companyFilter) &&
      (categoryFilter === "all" || String(p.category_id) === categoryFilter)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-3 border rounded-xl text-sm">
        <div>
          <div className="text-xs text-slate-500 mb-1">Company</div>
          <select
            className="border rounded px-2 py-1"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="all">All companies</option>
            {companies.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-xs text-slate-500 mb-1">Category</div>
          <select
            className="border rounded px-2 py-1"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => {
          const company = companies.find((c) => c.id === p.company_id);
          const category = categories.find((c) => c.id === p.category_id);

          return (
            <ProductCard
              key={p.id}
              product={p}
              locale={locale}
              companyName={company?.name}
              categoryName={category?.name}
            />
          );
        })}
      </div>
    </div>
  );
}
