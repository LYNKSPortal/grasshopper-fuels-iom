import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";
import { getProductWithLiveStock } from "@/lib/stock";

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
    images: [{ url: "/natural-firelighters-02.jpg", width: 1200, height: 630, alt: "4kg kindling nets and firelighters" }],
  },
  twitter: { images: ["/natural-firelighters-02.jpg"] },
};

export const dynamic = "force-dynamic";

export default async function KindlingPage() {
  const product = (await getProductWithLiveStock("kindling"))!;
  return <ProductDetail product={product} />;
}
