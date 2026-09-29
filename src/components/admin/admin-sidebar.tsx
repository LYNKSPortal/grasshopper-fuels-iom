"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PackageSearch, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/orders", label: "Orders", icon: PackageSearch },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-black/5 bg-white">
      <div className="flex items-center px-6 py-6">
        <Link href="/admin/orders" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Grasshopper Fuels"
            width={300}
            height={80}
            priority
            className="h-auto w-[170px]"
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#18af8a]/10 text-[#18af8a]"
                  : "text-[#202e25]/65 hover:bg-[#f7faf9] hover:text-[#202e25]"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-black/5 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#202e25]/65 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4.5 w-4.5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
