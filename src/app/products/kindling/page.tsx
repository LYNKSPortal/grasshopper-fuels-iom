import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Firewood Accessories",
  description:
    "4kg Kindling Nets and Firelighters for fast fire starting, delivered across the Isle of Man.",
  alternates: { canonical: "/products/kindling" },
  openGraph: {
    images: [{ url: "/Kindling-Nets-new.jpg", width: 1200, height: 630 }],
  },
  twitter: { images: ["/Kindling-Nets-new.jpg"] },
};

export default function KindlingPage() {
  const product = getProduct("kindling")!;
  return <ProductDetail product={product} />;
}
