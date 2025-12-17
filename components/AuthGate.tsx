"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGate({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace(`/${locale}/login`);
        return;
      }
      setOk(true);
    })();
  }, [locale, router]);

  if (!ok) return <div className="p-6">Checking access…</div>;

  return <>{children}</>;
}
