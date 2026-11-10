import { Resend } from "resend";
import type { Order, OrderStatus } from "@/lib/order-types";
import { siteConfig } from "@/lib/site-config";

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

function renderEmailHtml(order: Order, status: OrderStatus, note?: string): string {
  const copy = statusCopy[status];
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #202e25;">
      <div style="background-color: #202e25; padding: 24px; text-align: center; border-radius: 12px 12px 0 0;">
        <span style="color: #ffffff; font-size: 20px; font-weight: bold;">${siteConfig.name}</span>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 28px; border-radius: 0 0 12px 12px;">
        <h1 style="font-size: 20px; margin: 0 0 12px;">${copy.heading}</h1>
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

/**
 * Emails a customer when their order's status changes. Silently skipped
 * (with a server log) if Resend isn't configured, and never throws - a
 * failed/unconfigured email must never block an admin status update.
 */
export async function sendOrderStatusEmail(
  order: Order,
  status: OrderStatus,
  note?: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn("RESEND_API_KEY/RESEND_FROM_EMAIL not set - skipping order status email.");
    return;
  }

  if (!order.email) return;

  try {
    const resend = new Resend(apiKey);
    const copy = statusCopy[status];
    const { data, error } = await resend.emails.send({
      from,
      to: order.email,
      subject: `${copy.subject} \u2013 ${siteConfig.name}`,
      html: renderEmailHtml(order, status, note),
    });
    // The Resend SDK does not throw on API-level errors (e.g. an
    // unverified sending domain) - it returns { data: null, error }.
    if (error) {
      console.error("Resend rejected order status email:", error);
      return;
    }
    console.log(`Order status email sent to ${order.email} (id: ${data?.id})`);
  } catch (err) {
    console.error("Failed to send order status email:", err);
  }
}
