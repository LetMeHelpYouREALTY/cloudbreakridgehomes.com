import { agentInfo, siteConfig } from "@/lib/site-config";

/**
 * Portfolio Cloudflare R2 public bucket `realestatedomains-assets`
 * (managed domain). Shared agent headshot for Dr. Jan Duffy sites.
 */
export const DEFAULT_R2_AGENT_HEADSHOT_URL =
  "https://pub-720ca9b7443b47be981def05abd3d7f0.r2.dev/shared/agent/dr-jan-duffy-headshot.jpg";

/** First-party fallback synced from the R2 object above. */
export const LOCAL_AGENT_HEADSHOT_PATH = "/images/agent/dr-jan-duffy.jpg";

const headshotMeta = {
  width: 512,
  height: 512,
  alt: `${agentInfo.name}, ${agentInfo.title} | ${agentInfo.brokerage} — Cloudbreak Ridge Summerlin`,
} as const;

/**
 * Relative path or absolute URL for Dr. Jan Duffy headshot.
 * Override with `NEXT_PUBLIC_DR_JAN_DUFFY_HEADSHOT` (R2 / imagedelivery.net).
 */
export function getAgentHeadshotSrc(): string {
  const override = process.env.NEXT_PUBLIC_DR_JAN_DUFFY_HEADSHOT?.trim();
  if (override) return override;
  return DEFAULT_R2_AGENT_HEADSHOT_URL;
}

/** Absolute URL for JSON-LD `image` / `logo` fields. */
export function getAgentHeadshotUrl(): string {
  const src = getAgentHeadshotSrc();
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}

export const drJanDuffyPhotos = {
  headshot: {
    get src() {
      return getAgentHeadshotSrc();
    },
    get url() {
      return getAgentHeadshotUrl();
    },
    width: headshotMeta.width,
    height: headshotMeta.height,
    alt: headshotMeta.alt,
  },
} as const;

export function isExternalAgentPhoto(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
