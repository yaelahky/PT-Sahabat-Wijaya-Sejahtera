import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/content/site-content";
import "./globals.css";

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  display: "swap",
  variable: "--font-jakarta",
  weight: "200 800",
  style: "normal",
});

function safeSiteUrl() {
  try {
    return process.env.SITE_URL ? new URL(process.env.SITE_URL) : null;
  } catch {
    return null;
  }
}

export function generateMetadata(): Metadata {
  const siteUrl = safeSiteUrl();
  const { title, description } = siteConfig.seo;
  return {
    metadataBase: siteUrl ?? undefined,
    title,
    description,
    applicationName: siteConfig.company.name,
    alternates: siteUrl ? { canonical: "/" } : undefined,
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: siteConfig.company.name,
      title,
      description,
      ...(siteUrl ? { url: "/" } : {}),
      ...(siteUrl
        ? { images: [{ url: new URL("/images/sahabat-solutions-hero.webp", siteUrl), width: 1672, height: 941, alt: "Pengadaan perangkat, internet, dan perlengkapan kantor untuk bisnis" }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteUrl ? { images: [new URL("/images/sahabat-solutions-hero.webp", siteUrl)] } : {}),
    },
    icons: { icon: "/icon.png" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
