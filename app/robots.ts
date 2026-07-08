import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * App Router robots — authoritative over public/robots.txt when both exist.
 * Do not Disallow /_next/ (blocks CSS/JS needed for rendering).
 * Canonical host must match production www redirect + sitemap <loc> URLs.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/monitoring/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
