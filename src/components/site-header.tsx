"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mainNavLinks, productLinks } from "@/lib/site-config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.484 1.34 4.997L2 22l5.116-1.341a9.958 9.958 0 0 0 4.888 1.24h.004c5.514 0 9.997-4.483 9.997-9.997s-4.483-9.899-9.997-9.899zm0 18.061h-.003a8.06 8.06 0 0 1-4.109-1.126l-.295-.175-3.037.797.811-2.96-.192-.304a8.058 8.058 0 0 1-1.234-4.301c0-4.454 3.626-8.08 8.083-8.08 2.16 0 4.188.842 5.714 2.37a8.026 8.026 0 0 1 2.366 5.716c-.001 4.454-3.628 8.063-8.104 8.063z" />
    </svg>
  );
}

function Logo() {
  return (
    <Link href="/" className="group flex items-center">
      <Image
        src="/logo.png"
        alt="Grasshopper Fuels"
        width={300}
        height={80}
        priority
        className="h-auto w-[200px] transition-transform group-hover:scale-105 sm:w-[300px]"
      />
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setProductsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;
  const isProductsActive = pathname.startsWith("/products");

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent py-5"
          : "bg-white/95 backdrop-blur-md shadow-sm py-3"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" label="Home" active={pathname === "/"} transparent={isTransparent} />

          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                isProductsActive
                  ? isTransparent
                    ? "text-white"
                    : "text-[#18af8a]"
                  : isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-[#202e25] hover:text-[#18af8a]"
              )}
              aria-expanded={productsOpen}
              aria-haspopup="true"
            >
              Products
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  productsOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full pt-2"
                >
                  <div className="w-64 overflow-hidden rounded-2xl border border-black/5 bg-white p-2 shadow-xl">
                    {productLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#202e25] transition-colors hover:bg-[#18af8a]/10 hover:text-[#18af8a]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mainNavLinks
            .filter((l) => l.href !== "/" && l.href !== "/contact")
            .map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname.startsWith(link.href)}
                transparent={isTransparent}
              />
            ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/447624378119"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              isTransparent
                ? "text-white/90 hover:text-white"
                : "text-[#202e25] hover:text-[#18af8a]"
            )}
          >
            <WhatsAppIcon className="h-4 w-4" />
            07624 378119
          </a>
          <Button
            render={
              <Link
                href="/contact"
                className="rounded-full bg-[#63cd26] px-6 py-2.5 font-bold text-[#202e25] shadow-md hover:bg-[#52ac1e] hover:text-[#202e25]"
              />
            }
          >
            Order Now
          </Button>
        </div>

        <div className="flex lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  aria-label="Open menu"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                    isTransparent ? "text-white" : "text-[#202e25]"
                  )}
                />
              }
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white p-0 sm:w-[360px]">
              <SheetHeader className="border-b border-black/5 px-6 py-5">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 py-4">
                <SheetClose
                  render={
                    <Link
                      href="/"
                      className="rounded-xl px-3 py-3 text-base font-semibold text-[#202e25] hover:bg-[#18af8a]/10"
                    />
                  }
                >
                  Home
                </SheetClose>

                <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-[#202e25]/50">
                  Products
                </p>
                {productLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#202e25] hover:bg-[#18af8a]/10"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}

                <div className="my-2 h-px bg-black/5" />

                {mainNavLinks
                  .filter((l) => l.href !== "/")
                  .map((link) => (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className="rounded-xl px-3 py-3 text-base font-semibold text-[#202e25] hover:bg-[#18af8a]/10"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  ))}

                <SheetClose
                  render={
                    <Link
                      href="/contact"
                      className="mt-4 flex w-full items-center justify-center rounded-full bg-[#63cd26] py-4 text-base font-bold text-[#202e25] hover:bg-[#52ac1e]"
                    />
                  }
                >
                  Order Now
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  transparent,
}: {
  href: string;
  label: string;
  active: boolean;
  transparent: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? transparent
            ? "text-white"
            : "text-[#18af8a]"
          : transparent
          ? "text-white/90 hover:text-white"
          : "text-[#202e25] hover:text-[#18af8a]"
      )}
    >
      {label}
    </Link>
  );
}
