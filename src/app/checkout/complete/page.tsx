import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClearCartOnSuccess } from "@/components/clear-cart-on-success";
import { getOrderById } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Payment Complete",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type ReturnStatus = "success" | "failed" | "cancelled";

export default async function CheckoutCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; status?: string }>;
}) {
  const { order: orderId, status } = await searchParams;
  const order = orderId ? await getOrderById(orderId) : null;
  const returnStatus: ReturnStatus =
    status === "success" || status === "failed" || status === "cancelled"
      ? status
      : "failed";

  const content = {
    success: {
      icon: CheckCircle2,
      iconClass: "text-[#18af8a]",
      bgClass: "border-[#18af8a]/20 bg-[#18af8a]/5",
      title: "Payment Received",
      description:
        "Thank you! Your payment has been received and your order is confirmed. We'll be in touch to confirm delivery details.",
    },
    failed: {
      icon: XCircle,
      iconClass: "text-red-500",
      bgClass: "border-red-200 bg-red-50",
      title: "Payment Failed",
      description:
        "Something went wrong processing your payment and no money has been taken. Please try again, or contact us if the problem continues.",
    },
    cancelled: {
      icon: AlertTriangle,
      iconClass: "text-amber-500",
      bgClass: "border-amber-200 bg-amber-50",
      title: "Payment Cancelled",
      description:
        "Your payment was cancelled and no money has been taken. Your basket has been kept so you can try again.",
    },
  }[returnStatus];

  const Icon = content.icon;

  return (
    <>
      {returnStatus === "success" && <ClearCartOnSuccess />}
      <PageHero
        eyebrow="Checkout"
        title={content.title}
        description={content.description}
      />
      <Breadcrumbs items={[{ label: "Checkout" }, { label: "Complete" }]} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex flex-col items-center gap-4 rounded-3xl border p-10 text-center ${content.bgClass}`}
          >
            <Icon className={`h-12 w-12 ${content.iconClass}`} />
            <h2 className="text-xl font-bold text-[#202e25]">{content.title}</h2>
            <p className="max-w-sm text-sm text-[#202e25]/65">{content.description}</p>

            {order && (
              <div className="mt-2 w-full rounded-2xl border border-black/5 bg-white p-4 text-left text-sm text-[#202e25]/70">
                <p>
                  <span className="font-semibold text-[#202e25]">Order:</span>{" "}
                  {order.order}
                </p>
                {order.amountToCollect && (
                  <p className="mt-1">
                    <span className="font-semibold text-[#202e25]">Total:</span> £
                    {order.amountToCollect}
                  </p>
                )}
              </div>
            )}

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              {returnStatus === "success" ? (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[#18af8a] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#139775]"
                >
                  Back to Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/basket"
                    className="inline-flex items-center gap-2 rounded-full bg-[#18af8a] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#139775]"
                  >
                    Return to Basket
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3 text-sm font-bold text-[#202e25] hover:bg-muted"
                  >
                    Contact Us
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
