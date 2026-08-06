export const siteConfig = {
  name: "Grasshopper Fuels",
  shortName: "Grasshopper Fuels",
  description:
    "Grasshopper Fuels supplies premium kiln-dried logs, coal, and kindling across the Isle of Man, with reliable island-wide delivery within 1\u20132 days.",
  url: "https://www.grasshopperfuels.example",
  keywords: [
    "kiln-dried logs Isle of Man",
    "firewood delivery Isle of Man",
    "coal supplier Isle of Man",
    "kindling Isle of Man",
    "log delivery Isle of Man",
    "solid fuel supplier",
  ],
  contact: {
    phonePlaceholder: "[Phone number to be confirmed]",
    emailPlaceholder: "[Email address to be confirmed]",
    addressPlaceholder: "[Business address to be confirmed], Isle of Man",
    hoursPlaceholder: "[Opening hours to be confirmed]",
  },
  social: {
    facebook: "#",
    instagram: "#",
  },
};

export type NavLink = {
  label: string;
  href: string;
};

export const productLinks: NavLink[] = [
  { label: "All Products", href: "/products" },
  { label: "Kiln-Dried Logs", href: "/products/kiln-dried-logs" },
  { label: "Coal", href: "/products/coal" },
  { label: "Firewood Accessories", href: "/products/kindling" },
];

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Delivery", href: "/delivery" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];
