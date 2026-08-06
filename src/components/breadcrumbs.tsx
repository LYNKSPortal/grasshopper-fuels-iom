import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-black/5 bg-[#f7faf9]">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#202e25]/60">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="flex items-center gap-1 font-medium hover:text-[#18af8a]"
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-[#202e25]/30" />
              {item.href && idx !== items.length - 1 ? (
                <Link href={item.href} className="font-medium hover:text-[#18af8a]">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#202e25]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
