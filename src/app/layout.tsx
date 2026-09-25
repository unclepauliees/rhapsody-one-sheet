import type { Metadata, Viewport } from "next";
import { BRAND_NAME, SPINE, BOILERPLATE } from "@/config/brand";
import "./globals.css";
import "./space.css";
import { asset } from "@/config/assets";
const siteUrl = new URL(`${process.env.SITE_ORIGIN || "https://1sheet.project-rhapsody.com"}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`);
siteUrl.protocol = "https:";
const title = `${BRAND_NAME} | ${SPINE}`;
const shareImage = new URL("brand/share-card-v2.png", siteUrl).href;
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description: BOILERPLATE,
  alternates: { canonical: siteUrl.href },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website", url: siteUrl.href, siteName: BRAND_NAME,
    title, description: BOILERPLATE, locale: "en_US",
    images: [{ url: shareImage, secureUrl: shareImage, width: 1200, height: 630, type: "image/png", alt: `${BRAND_NAME} partner one-sheet` }],
  },
  twitter: {
    card: "summary_large_image", title, description: BOILERPLATE,
    images: [{ url: shareImage, alt: `${BRAND_NAME} partner one-sheet` }],
  },
  icons: { icon: asset("/brand/emblem.svg") },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }: { children: React.ReactNode }) {return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;}
