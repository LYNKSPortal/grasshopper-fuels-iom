-- Grasshopper Fuels schema.
-- Run with `npm run db:migrate`. Safe to re-run (uses IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_process', 'done')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  order_summary TEXT NOT NULL,
  address TEXT NOT NULL,
  message TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS orders_email_idx ON orders (email);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);

-- Cashflows Hosted Checkout Pages payment tracking.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid'
  CHECK (payment_status IN ('unpaid', 'pending', 'paid', 'failed', 'cancelled'));
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_job_reference TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_reference TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS amount_to_collect NUMERIC(10, 2);

CREATE INDEX IF NOT EXISTS orders_payment_job_reference_idx
  ON orders (payment_job_reference) WHERE payment_job_reference IS NOT NULL;

-- Preserves the original human-readable ID of orders imported from the
-- legacy JSON file store, since orders.id is now a real UUID.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS legacy_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS orders_legacy_id_idx
  ON orders (legacy_id) WHERE legacy_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS order_status_notes (
  id UUID PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS order_status_notes_order_id_idx
  ON order_status_notes (order_id);

-- Logs every email attempt (confirmation on order creation, and status
-- change notifications) so staff can audit whether/when a customer was
-- actually emailed, straight from the admin dashboard.
CREATE TABLE IF NOT EXISTS order_emails (
  id UUID PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  email_type TEXT NOT NULL
    CHECK (email_type IN ('confirmation', 'status_pending', 'status_in_process', 'status_done')),
  recipient TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  error_message TEXT,
  resend_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS order_emails_order_id_idx
  ON order_emails (order_id);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON contact_messages (created_at DESC);

-- Live stock status per product variant, editable from the admin dashboard
-- (/admin/stock) instead of requiring a code change + deploy. Any variant
-- not yet present here falls back to the outOfStockVariants hardcoded in
-- src/lib/products.ts (see src/lib/stock.ts).
CREATE TABLE IF NOT EXISTS product_stock (
  product_slug TEXT NOT NULL,
  variant_label TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (product_slug, variant_label)
);

-- Seed with the current hardcoded stock state. ON CONFLICT DO NOTHING so
-- re-running this migration never overwrites stock changes made via the
-- admin UI.
INSERT INTO product_stock (product_slug, variant_label, in_stock) VALUES
  ('kiln-dried-logs', 'Birch', true),
  ('kiln-dried-logs', 'Oak', false),
  ('kiln-dried-logs', 'Ash', false),
  ('coal', 'Premium Kosy Glo Ovoids – 20kg bags', true),
  ('kindling', '4kg Kindling Nets', true),
  ('kindling', 'Firelighters', true)
ON CONFLICT (product_slug, variant_label) DO NOTHING;
