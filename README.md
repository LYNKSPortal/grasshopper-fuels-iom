# Grasshopper Fuels

Marketing website for **Grasshopper Fuels**, a local supplier of premium kiln-dried logs, coal, and firewood accessories, delivering island-wide across the Isle of Man.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** [Base UI](https://base-ui.com) primitives via `shadcn` (`src/components/ui`)
- **Animation:** Framer Motion
- **Icons:** Lucide React (plus a custom inline WhatsApp SVG icon)

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages hot-reload as you edit files.

Other available scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # run ESLint
```

## Project Structure

```
src/
  app/                    # Routes (App Router)
    page.tsx              # Homepage
    about/                # About page
    contact/              # Contact & order enquiry form
    delivery/             # Delivery information page
    faqs/                 # FAQs page
    products/             # Products index + one route per product (slug)
    privacy-policy/
    terms-and-conditions/
    sitemap.ts            # Generated sitemap
    robots.ts             # Generated robots.txt
    layout.tsx            # Root layout (header, footer, fonts, metadata)
  components/
    home/                 # Homepage-only sections (hero, benefits, process, etc.)
    ui/                   # Reusable shadcn/Base UI primitives (button, sheet, accordion, etc.)
    site-header.tsx        # Sticky nav, WhatsApp link, mobile menu
    site-footer.tsx
    product-card.tsx        # Product summary card (used on homepage + /products)
    product-detail.tsx       # Full product page layout (used by each product route)
    contact-form.tsx
    faq-accordion.tsx
    ...
  lib/
    products.ts            # Product data (name, images, variants, benefits, FAQs, etc.)
    site-config.ts          # Site-wide config: nav links, contact details, social links
    utils.ts
public/                    # Static assets (product photos, logo, hero images, IoM map)
```

## Content & Data

Most page copy and product data lives in plain TypeScript objects rather than a CMS:

- **`src/lib/products.ts`** — single source of truth for all three products (Kiln-Dried Logs, Coal, Firewood Accessories), including images, variants, stock notes, benefits, suitable uses, and FAQs. Product cards and product detail pages both read from here.
- **`src/lib/site-config.ts`** — site name, contact placeholders, social links, and the main/product navigation link lists used by the header and footer.

To update a product's image, variants, or FAQs, edit the corresponding entry in `products.ts` — changes propagate automatically to the homepage preview, the `/products` listing, and the individual product page.

## Key Business Rules

- **Delivery only — no collection.** All copy across the site (FAQs, product pages, delivery page, contact page) reflects that orders are delivered, typically within 1–2 days, and collection is not offered.
- **WhatsApp contact** is surfaced in the header (`07624 378119`, linking to `https://wa.me/447624378119`) alongside the "Order Now" CTA.

## Deployment

This app can be deployed to any Next.js-compatible host (e.g. [Vercel](https://vercel.com/new)). Run `npm run build` to produce a production build, then `npm run start` to serve it.
