"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ locale }: { locale: string }) {
  const path = usePathname();

  const menu = [
    { label: "Dashboard", href: `/${locale}/dashboard` },
    { label: "Products", href: `/${locale}/dashboard/products` },
    { label: "Add Product", href: `/${locale}/dashboard/products/add` },
    { label: "Orders", href: `/${locale}/dashboard/orders` },
    { label: "Users", href: `/${locale}/dashboard/users` },
    { label: "News", href: `/${locale}/dashboard/news` },
    { label: "Jobs", href: `/${locale}/dashboard/jobs` },

  ];

  return (
    <aside className="w-64 bg-white border-r h-screen p-4">
      <h2 className="text-xl font-bold mb-6">DROV Admin</h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block p-2 rounded hover:bg-blue-100 ${
              path === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-800"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
