import { createHash } from "crypto";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function getConfig() {
  return {
    configurationId: requireEnv("CASHFLOWS_CONFIGURATION_ID"),
    apiKey: requireEnv("CASHFLOWS_API_KEY"),
    baseUrl: process.env.CASHFLOWS_BASE_URL || "https://gateway.cashflows.com",
  };
}

// The hash must be computed over the *exact* byte string sent as the request
// body, so callers should serialize the body once and reuse that same string
// for both signing and the HTTP request.
function signRequestBody(apiKey: string, body: string): string {
  return createHash("sha512").update(apiKey + body, "utf-8").digest("hex");
}

export type CreatePaymentJobParams = {
  orderNumber: string;
  amountToCollect: string; // e.g. "42.50"
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  returnUrlSuccess: string;
  returnUrlFailed: string;
  returnUrlCancelled: string;
};

export type CreatePaymentJobResult = {
  paymentJobReference: string;
  paymentReference: string;
  actionUrl: string;
};

export async function createPaymentJob(
  params: CreatePaymentJobParams
): Promise<CreatePaymentJobResult> {
  const { configurationId, apiKey, baseUrl } = getConfig();

  const [firstName, ...rest] = (params.customerName ?? "").trim().split(/\s+/);
  const lastName = rest.join(" ");

  const requestBody = {
    amountToCollect: params.amountToCollect,
    currency: params.currency ?? "GBP",
    locale: "en_GB",
    order: {
      orderNumber: params.orderNumber,
      ...(firstName || lastName
        ? {
            billingAddress: {
              firstName: firstName || undefined,
              lastName: lastName || undefined,
            },
          }
        : {}),
      ...(params.customerEmail
        ? { billingIdentity: { emailAddress: params.customerEmail } }
        : {}),
    },
    parameters: {
      returnUrlSuccess: params.returnUrlSuccess,
      returnUrlFailed: params.returnUrlFailed,
      returnUrlCancelled: params.returnUrlCancelled,
    },
  };

  const bodyString = JSON.stringify(requestBody);
  const hash = signRequestBody(apiKey, bodyString);

  const res = await fetch(`${baseUrl}/api/gateway/payment-jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      configurationId,
      hash,
    },
    body: bodyString,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data) {
    throw new Error(
      `Cashflows createPaymentJob failed (${res.status}): ${JSON.stringify(data)}`
    );
  }

  const payment = data.data?.payments?.[0];
  const actionUrl = data.links?.action?.url;

  if (!payment?.reference || !data.data?.reference || !actionUrl) {
    throw new Error(
      `Cashflows createPaymentJob response missing expected fields: ${JSON.stringify(data)}`
    );
  }

  return {
    paymentJobReference: data.data.reference,
    paymentReference: payment.reference,
    actionUrl,
  };
}

export type RetrievePaymentJobResult = {
  status: string;
  amountToCollect: string;
};

export async function retrievePayment(
  paymentJobReference: string,
  paymentReference: string
): Promise<RetrievePaymentJobResult> {
  const { configurationId, apiKey, baseUrl } = getConfig();

  // GET requests are signed over an empty body string.
  const hash = signRequestBody(apiKey, "");

  const res = await fetch(
    `${baseUrl}/api/gateway/payment-jobs/${encodeURIComponent(
      paymentJobReference
    )}/payments/${encodeURIComponent(paymentReference)}`,
    {
      method: "GET",
      headers: { configurationId, hash },
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok || !data) {
    throw new Error(
      `Cashflows retrievePayment failed (${res.status}): ${JSON.stringify(data)}`
    );
  }

  return {
    status: data.status ?? data.data?.status,
    amountToCollect: data.amountToCollect ?? data.data?.amountToCollect,
  };
}

/** Maps a Cashflows payment status string to our internal payment_status enum. */
export function mapCashflowsStatus(
  cashflowsStatus: string
): "pending" | "paid" | "failed" | "cancelled" {
  const normalized = cashflowsStatus.toLowerCase();
  if (normalized === "paid" || normalized === "captured" || normalized === "authorised") {
    return "paid";
  }
  if (normalized === "cancelled") return "cancelled";
  if (normalized === "pending") return "pending";
  return "failed";
}
