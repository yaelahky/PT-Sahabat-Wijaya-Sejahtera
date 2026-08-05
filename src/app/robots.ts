import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.SITE_INDEXABLE === "true";
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    ...(indexable && process.env.SITE_URL
      ? { sitemap: `${process.env.SITE_URL.replace(/\/$/, "")}/sitemap.xml` }
      : {}),
  };
}
