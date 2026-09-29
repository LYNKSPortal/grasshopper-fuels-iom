"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
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
import { WhatsAppIcon } from "@/components/icons";

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
  const { totalCount } = useCart();

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
          <Link
            href="/basket"
            aria-label="View basket"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              isTransparent
                ? "text-white/90 hover:text-white"
                : "text-[#202e25] hover:text-[#18af8a]"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#63cd26] px-1 text-[10px] font-bold text-[#202e25]">
                {totalCount}
              </span>
            )}
          </Link>
          <Button
            render={
              <Link
                href="/order"
                className="rounded-full bg-[#63cd26] px-6 py-2.5 font-bold text-[#202e25] shadow-md hover:bg-[#52ac1e] hover:text-[#202e25]"
              />
            }
          >
            Order Now
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/basket"
            aria-label="View basket"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              isTransparent ? "text-white" : "text-[#202e25]"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#63cd26] px-1 text-[10px] font-bold text-[#202e25]">
                {totalCount}
              </span>
            )}
          </Link>
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
                      href="/order"
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
