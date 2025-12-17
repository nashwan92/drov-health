"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function changeLang(lang: string) {
    const parts = pathname.split("/");
    parts[1] = lang;
    router.push(parts.join("/") || `/${lang}`);
  }

  return (
    <select
      onChange={(e) => changeLang(e.target.value)}
      value={currentLocale}
      className="border px-2 py-1 rounded-md text-sm"
    >
      <option value="en">EN</option>
      <option value="ku">KU</option>
      <option value="ar">AR</option>
    </select>
  );
}
