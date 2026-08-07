export type Product = {
  slug: "kiln-dried-logs" | "coal" | "kindling";
  name: string;
  shortDescription: string;
  benefit: string;
  image: string;
  variants?: string[];
  stockNote?: string;
  gallery: string[];
  intro: string;
  benefits: { title: string; description: string }[];
  suitableUses: string[];
  faqs: { question: string; answer: string }[];
};

export const products: Product[] = [
  {
    slug: "kiln-dried-logs",
    name: "Kiln-Dried Logs",
    shortDescription:
      "Premium Birch, Oak, and Ash logs, kiln-dried for a cleaner, more consistent burn.",
    benefit: "Delivery only \u2013 no collection",
    image: "/Kiln-Dried-Logs.jpg",
    variants: ["Birch", "Oak", "Ash"],
    stockNote: "18 trailer loads of logs currently in stock.",
    gallery: ["kiln-dried-logs-1", "kiln-dried-logs-2", "kiln-dried-logs-3"],
    intro:
      "Our kiln-dried Birch, Oak, and Ash logs are dried to a reduced moisture content, giving a cleaner burn, easier lighting, and more consistent heat than seasoned or freshly cut wood. They are a popular choice for stoves, open fireplaces, and outdoor fire pits across the Isle of Man. Delivery only \u2013 collection is not available.",
    benefits: [
      {
        title: "Clean Burning",
        description:
          "Lower moisture content helps produce a cleaner burn with less smoke than unseasoned wood.",
      },
      {
        title: "Consistent Heat",
        description:
          "Kiln-drying helps deliver a more even, dependable heat output for your stove or fireplace.",
      },
      {
        title: "Easy Lighting",
        description:
          "Dry logs catch and establish a fire more readily, saving time and firelighters.",
      },
      {
        title: "Delivery Only \u2013 No Collection",
        description:
          "We deliver logs directly to your door, usually within three days, anywhere across the Isle of Man. Collection is not available.",
      },
    ],
    suitableUses: [
      "Wood-burning and multi-fuel stoves",
      "Open fireplaces",
      "Outdoor fire pits and chimineas",
      "Pizza ovens and outdoor cooking",
    ],
    faqs: [
      {
        question: "What are kiln-dried logs?",
        answer:
          "Kiln-dried logs are logs that have been dried in a controlled kiln environment to reduce their moisture content, rather than being left to season naturally over time.",
      },
      {
        question: "How should I store kiln-dried logs?",
        answer:
          "Store logs in a dry, well-ventilated area, ideally off the ground and covered, to help maintain their low moisture content until you are ready to burn them.",
      },
      {
        question: "What moisture content do your logs have?",
        answer:
          "[Moisture percentage to be confirmed]. Please contact us for the latest information on our current stock.",
      },
      {
        question: "What pack sizes are available?",
        answer:
          "[Pack sizes and pricing to be confirmed]. Get in touch and we will be happy to talk through the options available.",
      },
      {
        question: "Do you deliver logs, or can I collect?",
        answer:
          "Logs are delivery only \u2013 collection is not available. We deliver directly to your door, usually within three days.",
      },
    ],
  },
  {
    slug: "coal",
    name: "Coal",
    shortDescription:
      "Premium Kosy Glo Ovoids and Oxbow Red Coal, supplied in 20kg bags for consistent, long-lasting heat.",
    benefit: "20kg bags, delivery only",
    image: "/coal-new.jpg",
    variants: ["Premium Kosy Glo Ovoids \u2013 20kg bags", "Premium Oxbow Red Coal \u2013 20kg bags"],
    gallery: ["coal-1", "coal-2", "coal-3"],
    intro:
      "Grasshopper Fuels supplies Premium Kosy Glo Ovoids and Premium Oxbow Red Coal, both in convenient 20kg bags, suited to a range of household heating needs. Whether you rely on solid fuel as your main source of heat or use it alongside other fuels, our team can help you choose a suitable product for your home.",
    benefits: [
      {
        title: "Reliable Heat",
        description:
          "Coal offers a dependable, long-lasting source of heat for households across the island.",
      },
      {
        title: "Suited to Many Households",
        description:
          "A practical option for homes using open fires or solid-fuel appliances.",
      },
      {
        title: "Delivery Only \u2013 No Collection",
        description:
          "We deliver coal directly to your door, usually within three days. Collection is not available.",
      },
      {
        title: "Guidance Available",
        description:
          "Not sure which product suits your appliance? Our team can help you choose.",
      },
    ],
    suitableUses: [
      "Open household fires",
      "Solid-fuel stoves and appliances",
      "Supplementary household heating",
      "General household solid-fuel use",
    ],
    faqs: [
      {
        question: "What types of coal do you supply?",
        answer:
          "We supply Premium Kosy Glo Ovoids and Premium Oxbow Red Coal, both in 20kg bags.",
      },
      {
        question: "Can you help me choose the right coal for my fire?",
        answer:
          "Yes, our friendly team can help you choose a suitable product based on your appliance and household needs. Please get in touch.",
      },
      {
        question: "Is coal available for delivery?",
        answer:
          "Yes, coal is delivered directly to your door across the Isle of Man, usually within three days. Collection is not available.",
      },
      {
        question: "What pack sizes and prices are available?",
        answer:
          "Both Premium Kosy Glo Ovoids and Premium Oxbow Red Coal are supplied in 20kg bags. [Pricing to be confirmed]. Contact us for up-to-date information.",
      },
    ],
  },
  {
    slug: "kindling",
    name: "Firewood Accessories",
    shortDescription:
      "4kg Kindling Nets and Firelighters for fast, fuss-free fire starting.",
    benefit: "Kindling nets & firelighters",
    image: "/Kindling-Nets-new.jpg",
    variants: ["4kg Kindling Nets", "Firelighters"],
    gallery: ["kindling-1", "kindling-2", "kindling-3"],
    intro:
      "Our 4kg Kindling Nets and Firelighters are designed to help get your fire started quickly and easily, whether you are lighting a stove, fireplace, or fire pit. Pair them with our kiln-dried logs or coal for a complete, hassle-free fire-lighting solution.",
    benefits: [
      {
        title: "Easy Fire Starting",
        description:
          "Dry, thin-cut wood catches quickly, helping your fire establish with less effort.",
      },
      {
        title: "Convenient Packaging",
        description:
          "Supplied ready to use, making fire lighting simple and mess-free.",
      },
      {
        title: "Pairs Perfectly",
        description:
          "Use alongside our kiln-dried logs or coal for a complete fire-lighting solution.",
      },
      {
        title: "Delivery Only \u2013 No Collection",
        description:
          "Available as part of an island-wide delivery order, usually within three days. Collection is not available.",
      },
    ],
    suitableUses: [
      "Lighting wood-burning and multi-fuel stoves",
      "Starting open fires",
      "Outdoor fire pits",
      "Camping and outdoor fires",
    ],
    faqs: [
      {
        question: "What is kindling used for?",
        answer:
          "Kindling is small, thin pieces of dry wood used to help establish a fire before adding larger logs or coal.",
      },
      {
        question: "How is your kindling packaged?",
        answer:
          "Kindling is supplied in 4kg nets, and firelighters are also available. [Further packaging details to be confirmed].",
      },
      {
        question: "Can I order kindling with logs or coal?",
        answer:
          "Yes, kindling nets and firelighters can be ordered alongside logs, coal, or as part of a combined delivery order.",
      },
      {
        question: "Do you deliver kindling across the Isle of Man?",
        answer:
          "Yes, kindling nets and firelighters can be included in island-wide delivery orders, usually within three days. Collection is not available.",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
