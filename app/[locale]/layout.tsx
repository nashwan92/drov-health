import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata = {
  title: "DROV | Premium Health & Beauty",
  description: "Premium health & beauty products from DROV",
};


type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <>
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer />
    </>
  );
}


