"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Footer() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-[#4CAF50]">DROV</h2>
            <p className="mt-4 text-sm text-slate-600 max-w-sm leading-relaxed">
              Your trusted partner for professional health and beauty solutions,
              serving pharmacies, clinics, and distributors across Iraq.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-[#4CAF50] transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/products`}
                  className="hover:text-[#4CAF50] transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/news`}
                  className="hover:text-[#4CAF50] transition"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/jobs`}
                  className="hover:text-[#4CAF50] transition"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
  {/* SOCIAL */}
<div>
  <h3 className="text-sm font-semibold text-slate-900 tracking-wide uppercase">
    Follow Us
  </h3>

  <div className="mt-5 flex gap-4">
    {/* FACEBOOK */}
    <a
      href="https://www.facebook.com/share/185DmTBwpZ/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="w-10 h-10 flex items-center justify-center rounded-full
                 border border-[#4CAF50]/30
                 text-[#4CAF50]
                 hover:bg-[#4CAF50] hover:text-white
                 hover:scale-110
                 transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .1 2 .1v2.3h-1.2c-1.2 0-1.6.7-1.6 1.5V11H16l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" />
      </svg>
    </a>

    {/* INSTAGRAM */}
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="w-10 h-10 flex items-center justify-center rounded-full
                 border border-[#4CAF50]/30
                 text-[#4CAF50]
                 hover:bg-[#4CAF50] hover:text-white
                 hover:scale-110
                 transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5a4.9 4.9 0 0 1 1.8 1.2 4.9 4.9 0 0 1 1.2 1.8c.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4a4.9 4.9 0 0 1-1.2 1.8 4.9 4.9 0 0 1-1.8 1.2c-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5a4.9 4.9 0 0 1-1.8-1.2 4.9 4.9 0 0 1-1.2-1.8c-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4A4.9 4.9 0 0 1 4 3.4 4.9 4.9 0 0 1 5.8 2.2c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Z" />
        <path d="M12 6.6a5.4 5.4 0 1 0 0 10.8 5.4 5.4 0 0 0 0-10.8Zm0 8.9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
      </svg>
    </a>

    {/* LINKEDIN */}
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="w-10 h-10 flex items-center justify-center rounded-full
                 border border-[#4CAF50]/30
                 text-[#4CAF50]
                 hover:bg-[#4CAF50] hover:text-white
                 hover:scale-110
                 transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2ZM8.1 18.3H5.7V9h2.4v9.3ZM6.9 7.9a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8ZM18.3 18.3h-2.4v-4.5c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.6H10.2V9h2.3v1.3h.1a2.5 2.5 0 0 1 2.3-1.3c2.4 0 2.9 1.6 2.9 3.7v5.6Z" />
      </svg>
    </a>
  </div>
</div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} DROV Health & Beauty. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
