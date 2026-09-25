import type { Metadata, Viewport } from "next";
import { BRAND_NAME, SPINE, BOILERPLATE } from "@/config/brand";
import "./globals.css";
import "./space.css";
import { asset } from "@/config/assets";
export const metadata: Metadata = { metadataBase: new URL(`${process.env.SITE_ORIGIN || "https://1sheet.project-rhapsody.com"}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`), title: `${BRAND_NAME} | ${SPINE}`, description: BOILERPLATE, robots: { index: false, follow: false }, icons: { icon: asset("/brand/emblem.svg") } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }: { children: React.ReactNode }) {return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;}
