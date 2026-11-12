"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, PackageSearch, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/admin/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/admin/orders", label: "Orders", icon: PackageSearch },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
              isActive
                ? "bg-[#18af8a]/10 text-[#18af8a]"
                : "text-[#202e25]/65 hover:bg-[#f7faf9] hover:text-[#202e25] dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
            )}
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile top bar with hamburger menu */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#1c2225] lg:hidden">
        <Link href="/admin/orders" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Grasshopper Fuels"
            width={300}
            height={80}
            priority
            className="h-auto w-[130px]"
          />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-[#202e25] active:bg-[#f7faf9] dark:border-white/10 dark:text-white dark:active:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </button>
            <SheetContent side="left" className="w-4/5 max-w-xs p-0">
              <SheetHeader className="border-b border-black/5 dark:border-white/10">
                <SheetTitle className="text-base font-extrabold text-[#202e25] dark:text-white">
                  Grasshopper Fuels Admin
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-1 flex-col gap-1 p-3">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <SheetClose
                      key={item.href}
                      render={
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors",
                            isActive
                              ? "bg-[#18af8a]/10 text-[#18af8a]"
                              : "text-[#202e25]/70 active:bg-[#f7faf9] dark:text-white/70 dark:active:bg-white/5"
                          )}
                        />
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="border-t border-black/5 p-3 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-[#202e25]/70 transition-colors active:bg-red-50 active:text-red-600 dark:text-white/70 dark:active:bg-red-500/10 dark:active:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                  Log Out
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-black/5 bg-white dark:border-white/10 dark:bg-[#1c2225] lg:sticky lg:top-0 lg:flex">
        <div className="flex items-center justify-between px-6 py-6">
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
          <NavLinks pathname={pathname} />
        </nav>

        <div className="space-y-2 border-t border-black/5 p-3 dark:border-white/10">
          <div className="flex items-center justify-between px-3">
            <span className="text-xs font-bold uppercase tracking-wide text-[#202e25]/40 dark:text-white/40">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#202e25]/65 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-white/65 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut className="h-4.5 w-4.5" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
