import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Kiln-Dried Logs",
  description:
    "Premium Birch, Oak, and Ash kiln-dried logs for clean, consistent burning in stoves, fireplaces, and fire pits. Delivery only across the Isle of Man.",
  alternates: { canonical: "/products/kiln-dried-logs" },
  openGraph: {
    images: [{ url: "/Kiln-Dried-Logs.jpg", width: 1200, height: 630 }],
  },
  twitter: { images: ["/Kiln-Dried-Logs.jpg"] },
};

export default function KilnDriedLogsPage() {
  const product = getProduct("kiln-dried-logs")!;
  return <ProductDetail product={product} />;
}
