import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const disallow = ["/admin", "/api", "/checkout", "/basket"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Explicitly welcome known AI/answer-engine crawlers so the site can
      // be read, summarised, and cited by AI assistants and search
      // overviews (GEO/AEO) - same allow/disallow rules as everyone else.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Bytespider",
          "CCBot",
        ],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
