import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import CalendlyProvider from "@/components/calendly/CalendlyProvider";
import { CALENDLY_WIDGET_CSS } from "@/lib/calendly-config";

const canonicalSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  siteConfig.url;

/** GSC HTML-tag verification token only — set in Vercel Production; never commit real values. */
const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.GOOGLE_SITE_VERIFICATION;

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const config = getDomainConfig(domain);
  return {
    metadataBase: new URL(canonicalSiteUrl),
    title: {
      default: "Cloudbreak Ridge Homes by Dr. Jan Duffy",
      template: "%s | Cloudbreak Ridge Homes by Dr. Jan Duffy",
    },
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: "/",
    },
    verification: googleSiteVerification
      ? { google: googleSiteVerification }
      : undefined,
    openGraph: {
      title: config.heroHeadline || "Cloudbreak Ridge Homes by Dr. Jan Duffy",
      description: config.description,
      type: "website",
      siteName: "Cloudbreak Ridge Homes by Dr. Jan Duffy",
      url: canonicalSiteUrl,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link href={CALENDLY_WIDGET_CSS} rel="stylesheet" />
        {/* WidgetTracker */}
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        {children}
        <CalendlyProvider />
        <Analytics />
      </body>
    </html>
  );
}
