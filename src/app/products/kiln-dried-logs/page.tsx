import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/products";
import { getProductWithLiveStock } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Kiln-Dried Logs \u2013 Birch, Oak & Ash",
  description:
    "Premium Birch, Oak, and Ash kiln-dried logs for clean, consistent burning in stoves, fireplaces, and fire pits. Delivery only across the Isle of Man.",
  keywords: getProduct("kiln-dried-logs")!.keywords,
  alternates: { canonical: "/products/kiln-dried-logs" },
  openGraph: {
    title: "Kiln-Dried Logs \u2013 Birch, Oak & Ash | Grasshopper Fuels",
    description:
      "Premium Birch, Oak, and Ash kiln-dried logs for clean, consistent burning. Delivery only across the Isle of Man.",
    images: [{ url: "/Kiln-Dried-Logs.jpg", width: 1200, height: 630, alt: "Kiln-dried Birch, Oak, and Ash logs stacked ready for delivery" }],
  },
  twitter: { images: ["/Kiln-Dried-Logs.jpg"] },
};

export const dynamic = "force-dynamic";

export default async function KilnDriedLogsPage() {
  const product = (await getProductWithLiveStock("kiln-dried-logs"))!;
  return <ProductDetail product={product} />;
}
