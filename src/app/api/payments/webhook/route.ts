import { NextRequest, NextResponse } from "next/server";
import { mapCashflowsStatus, retrievePayment } from "@/lib/cashflows";
import { updatePaymentStatusByJobReference } from "@/lib/orders";

// Cashflows notification webhook. We never trust the body of the webhook
// itself for the payment status - we re-fetch the authoritative status via
// the Gateway API (RetrievePaymentJob) as recommended by Cashflows, so a
// spoofed or intercepted webhook can't be used to mark an order as paid.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const paymentJobReference = body?.paymentJobReference;
  const paymentReference = body?.paymentReference;

  if (
    typeof paymentJobReference !== "string" ||
    typeof paymentReference !== "string"
  ) {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }

  try {
    const result = await retrievePayment(paymentJobReference, paymentReference);
    const status = mapCashflowsStatus(result.status);
    await updatePaymentStatusByJobReference(paymentJobReference, status);
  } catch (err) {
    console.error("Cashflows webhook processing error:", err);
    // Still acknowledge receipt below so Cashflows doesn't retry a message we
    // currently can't process; failures are visible in the server logs for
    // manual reconciliation.
  }

  // Acknowledge the webhook per Cashflows' spec, or they will keep retrying
  // delivery for up to a month.
  return NextResponse.json({ paymentJobReference, paymentReference });
}
