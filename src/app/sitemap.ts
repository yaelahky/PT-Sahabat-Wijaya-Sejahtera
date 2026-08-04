import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.SITE_URL || process.env.SITE_INDEXABLE !== "true") return [];
  return [{ url: process.env.SITE_URL.replace(/\/$/, ""), lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}

