import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Coal",
  description:
    "Premium Kosy Glo Ovoids and Oxbow Red Coal, supplied in 20kg bags, delivered across the Isle of Man.",
  alternates: { canonical: "/products/coal" },
  openGraph: { images: [{ url: "/coal-new.jpg", width: 1200, height: 630 }] },
  twitter: { images: ["/coal-new.jpg"] },
};

export default function CoalPage() {
  const product = getProduct("coal")!;
  return <ProductDetail product={product} />;
}
