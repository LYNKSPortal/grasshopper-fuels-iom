import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Firewood Accessories \u2013 Kindling Nets & Firelighters",
  description:
    "4kg Kindling Nets and Firelighters for fast fire starting, delivered across the Isle of Man.",
  keywords: getProduct("kindling")!.keywords,
  alternates: { canonical: "/products/kindling" },
  openGraph: {
    title: "Kindling Nets & Firelighters | Grasshopper Fuels",
    description:
      "4kg Kindling Nets and Firelighters for fast, fuss-free fire starting. Delivered across the Isle of Man.",
    images: [{ url: "/Kindling-Nets-new.jpg", width: 1200, height: 630, alt: "4kg kindling nets and firelighters" }],
  },
  twitter: { images: ["/Kindling-Nets-new.jpg"] },
};

export default function KindlingPage() {
  const product = getProduct("kindling")!;
  return <ProductDetail product={product} />;
}
