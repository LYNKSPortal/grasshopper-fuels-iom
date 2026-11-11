import { Resend } from "resend";
import type { EmailType, Order, OrderStatus } from "@/lib/order-types";
import { logOrderEmail } from "@/lib/orders";
import { siteConfig } from "@/lib/site-config";

const statusEmailTypes: Record<OrderStatus, EmailType> = {
  pending: "status_pending",
  in_process: "status_in_process",
  done: "status_done",
};

const statusCopy: Record<OrderStatus, { subject: string; heading: string; body: string }> = {
  pending: {
    subject: "We've received your order",
    heading: "Order Received",
    body: "Thanks for your order! We've received it and it's awaiting review. We'll be in touch shortly to confirm availability and delivery details.",
  },
  in_process: {
    subject: "Your order is being processed",
    heading: "Order In Process",
    body: "Good news \u2013 your order is now being processed. We'll be in touch if we need anything further ahead of delivery.",
  },
  done: {
    subject: "Your order is complete",
    heading: "Order Complete",
    body: "Your order has been completed. Thank you for choosing Grasshopper Fuels \u2013 we hope you enjoy your delivery!",
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderShell(heading: string, bodyHtml: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #202e25;">
      <div style="background-color: #202e25; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
        <span style="color: #ffffff; font-size: 20px; font-weight: bold;">${siteConfig.name}</span>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 28px; border-radius: 0 0 12px 12px;">
        <h1 style="font-size: 20px; margin: 0 0 12px;">${heading}</h1>
        ${bodyHtml}
        <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
          Questions? Just reply to this email or contact us at
          <a href="mailto:${siteConfig.contact.emailPlaceholder}" style="color: #18af8a;">${siteConfig.contact.emailPlaceholder}</a>
          or ${siteConfig.contact.phonePlaceholder}.
        </p>
      </div>
      <p style="text-align: center; font-size: 11px; color: #9ca3af; margin-top: 16px;">
        ${siteConfig.legalName} &middot; ${siteConfig.contact.addressPlaceholder}
      </p>
    </div>
  `;
}

function renderStatusEmailHtml(order: Order, status: OrderStatus, note?: string): string {
  const copy = statusCopy[status];
  return renderShell(
    copy.heading,
    `
      <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 20px;">
        Hi ${escapeHtml(order.firstName)}, ${copy.body}
      </p>
      <div style="background-color: #f7faf9; border-radius: 8px; padding: 16px; font-size: 13px; color: #374151;">
        <p style="margin: 0 0 6px;"><strong>Order:</strong> ${escapeHtml(order.order)}</p>
        <p style="margin: 0;"><strong>Status:</strong> ${copy.heading}</p>
      </div>
      ${
        note
          ? `<div style="margin-top: 16px; padding: 16px; border-left: 3px solid #18af8a; background-color: #18af8a0d; font-size: 13px; color: #374151;">
              <strong>Note from our team:</strong><br />${escapeHtml(note)}
            </div>`
          : ""
      }
    `
  );
}

function renderConfirmationEmailHtml(order: Order): string {
  return renderShell(
    "Order Received",
    `
      <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 20px;">
        Hi ${escapeHtml(order.firstName)}, thanks for your order! We've received it${
          order.paymentStatus === "paid" ? " and your payment" : ""
        } successfully. <strong>Someone from our team will be in touch within 48 hours</strong> to confirm availability and your delivery details.
      </p>
      <div style="background-color: #f7faf9; border-radius: 8px; padding: 16px; font-size: 13px; color: #374151;">
        <p style="margin: 0 0 6px;"><strong>Order:</strong> ${escapeHtml(order.order)}</p>
        <p style="margin: 0 0 6px;"><strong>Delivery address:</strong> ${escapeHtml(order.address)}</p>
        ${
          order.amountToCollect
            ? `<p style="margin: 0;"><strong>Total:</strong> \u00a3${escapeHtml(order.amountToCollect)}${
                order.paymentStatus === "paid" ? " (paid)" : ""
              }</p>`
            : ""
        }
      </div>
    `
  );
}

/**
 * Sends an email via Resend and logs the attempt (success or failure)
 * against the order, so staff can see delivery status in the admin
 * dashboard. Never throws - a failed/unconfigured email must never block
 * the order creation or status update it's attached to.
 */
async function sendAndLog(params: {
  orderId: string;
  emailType: EmailType;
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(`RESEND_API_KEY/RESEND_FROM_EMAIL not set - skipping ${params.emailType} email.`);
    await logOrderEmail({
      orderId: params.orderId,
      emailType: params.emailType,
      recipient: params.to,
      success: false,
      errorMessage: "Resend not configured (missing RESEND_API_KEY/RESEND_FROM_EMAIL).",
    }).catch((err) => console.error("Failed to log email attempt:", err));
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    // The Resend SDK does not throw on API-level errors (e.g. an
    // unverified sending domain) - it returns { data: null, error }.
    if (error) {
      console.error(`Resend rejected ${params.emailType} email:`, error);
      await logOrderEmail({
        orderId: params.orderId,
        emailType: params.emailType,
        recipient: params.to,
        success: false,
        errorMessage: error.message ?? String(error),
      });
      return;
    }

    console.log(`${params.emailType} email sent to ${params.to} (id: ${data?.id})`);
    await logOrderEmail({
      orderId: params.orderId,
      emailType: params.emailType,
      recipient: params.to,
      success: true,
      resendId: data?.id,
    });
  } catch (err) {
    console.error(`Failed to send ${params.emailType} email:`, err);
    await logOrderEmail({
      orderId: params.orderId,
      emailType: params.emailType,
      recipient: params.to,
      success: false,
      errorMessage: err instanceof Error ? err.message : String(err),
    }).catch((logErr) => console.error("Failed to log email attempt:", logErr));
  }
}

/**
 * Emails a customer immediately after they place an order, confirming
 * we've received it and that someone will be in touch within 48 hours.
 */
export async function sendOrderConfirmationEmail(order: Order): Promise<void> {
  if (!order.email) return;
  await sendAndLog({
    orderId: order.id,
    emailType: "confirmation",
    to: order.email,
    subject: `Order Received \u2013 ${siteConfig.name}`,
    html: renderConfirmationEmailHtml(order),
  });
}

/** Emails a customer when their order's status changes. */
export async function sendOrderStatusEmail(
  order: Order,
  status: OrderStatus,
  note?: string
): Promise<void> {
  if (!order.email) return;
  const copy = statusCopy[status];
  await sendAndLog({
    orderId: order.id,
    emailType: statusEmailTypes[status],
    to: order.email,
    subject: `${copy.subject} \u2013 ${siteConfig.name}`,
    html: renderStatusEmailHtml(order, status, note),
  });
}
