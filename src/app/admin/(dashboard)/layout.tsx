import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  AdminThemeProvider,
  adminThemeInitScript,
} from "@/components/admin/admin-theme-provider";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      {/* Applies the stored/system theme to <html> before first paint, so
          there's no flash of the wrong theme on load. */}
      <script dangerouslySetInnerHTML={{ __html: adminThemeInitScript }} />
      <div className="min-h-screen bg-[#f7faf9] dark:bg-[#14191a] lg:flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </AdminThemeProvider>
  );
}
