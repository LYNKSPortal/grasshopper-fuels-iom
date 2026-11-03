import { NextRequest, NextResponse } from "next/server";
import { attachPaymentJob, getOrderById } from "@/lib/orders";
import { createPaymentJob } from "@/lib/cashflows";
import { siteConfig } from "@/lib/site-config";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const orderId = body?.orderId;

  if (typeof orderId !== "string" || !orderId.trim()) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const order = await getOrderById(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.paymentStatus === "paid") {
    return NextResponse.json(
      { error: "This order has already been paid." },
      { status: 400 }
    );
  }

  if (!order.amountToCollect || Number(order.amountToCollect) <= 0) {
    return NextResponse.json(
      {
        error:
          "This order can't be paid online. Please contact us to arrange payment.",
      },
      { status: 400 }
    );
  }

  try {
    const job = await createPaymentJob({
      orderNumber: order.id,
      amountToCollect: order.amountToCollect,
      customerName: `${order.firstName} ${order.lastName}`.trim(),
      customerEmail: order.email,
      returnUrlSuccess: `${siteConfig.url}/checkout/complete?order=${order.id}&status=success`,
      returnUrlFailed: `${siteConfig.url}/checkout/complete?order=${order.id}&status=failed`,
      returnUrlCancelled: `${siteConfig.url}/checkout/complete?order=${order.id}&status=cancelled`,
    });

    await attachPaymentJob(order.id, {
      paymentJobReference: job.paymentJobReference,
      paymentReference: job.paymentReference,
      amountToCollect: order.amountToCollect,
    });

    return NextResponse.json({ redirectUrl: job.actionUrl });
  } catch (err) {
    console.error("Cashflows createPaymentJob error:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't start the payment process. Please try again or contact us.",
      },
      { status: 502 }
    );
  }
}
