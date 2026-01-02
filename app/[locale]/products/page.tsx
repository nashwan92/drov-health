"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

const COMPANIES = ["RIVA PHARMA", "FUTURE", "El Razy Pharma"];

const CATEGORIES = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Drops",
  "Cream",
  "Gel",
  "Lotion",
  "Ampoule",
];

const gridVariants = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-4 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200 rounded-xl" />
      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
      <div className="mt-4 h-3 bg-gray-200 rounded w-2/3" />
    </div>
  );
}

export default function ProductsPage() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [companyFilter, setCompanyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: false });

      setProducts(data || []);
      setLoading(false);
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (companyFilter === "all" || p.company === companyFilter) &&
        (categoryFilter === "all" || p.category === categoryFilter)
    );
  }, [products, companyFilter, categoryFilter]);

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-10 xl:px-14">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Discover our pharmaceutical and healthcare portfolio
        </p>
      </div>

      {/* FILTERS */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-6 rounded-2xl border bg-white px-6 py-4 shadow-sm"
      >
        <div>
          <label className="block text-xs text-gray-500 mb-1">Company</label>
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="all">All companies</option>
            {COMPANIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          variants={gridVariants}
          initial="visible"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -6 }}
            >
              <ProductCard
                product={product}
                locale={locale}
                companyName={product.company}
                categoryName={product.category}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          No products found.
        </p>
      )}
    </div>
  );
}
