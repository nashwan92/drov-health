import Sidebar from "@/components/Sidebar";
import AuthGate from "@/components/AuthGate";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ Next 16 expects Promise here
}) {
  const { locale } = await params;

  return (
    <AuthGate locale={locale}>
      <div className="flex">
        <Sidebar locale={locale} />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </AuthGate>
  );
}
