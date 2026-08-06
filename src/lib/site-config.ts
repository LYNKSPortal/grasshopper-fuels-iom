export const siteConfig = {
  name: "Grasshopper Fuels",
  shortName: "Grasshopper Fuels",
  legalName: "Grasshopper Fuels Limited",
  companyNumber: "124767C",
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
    phonePlaceholder: "+44 7624 378119",
    emailPlaceholder: "grasshopperfuels@outlook.com",
    addressPlaceholder:
      "Unit 3, Hills Meadow Industrial Estate, Douglas, IM1 5EA, Isle of Man",
    hoursPlaceholder: "[Opening hours to be confirmed]",
    whatsapp: "+44 7624 378119",
    whatsappLink: "https://wa.me/447624378119",
  },
  social: {
    facebook:
      "https://www.facebook.com/p/Grasshopper-Kiln-Dried-Logs-Isle-of-Man-100057667861337/",
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
