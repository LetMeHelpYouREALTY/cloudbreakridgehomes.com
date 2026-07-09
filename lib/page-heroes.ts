/**
 * Hero image paths and alt text per page — matches public/images/hero/{key}.webp
 */

export type PageHeroKey = keyof typeof PAGE_HEROES;

export type PageHeroMeta = {
  src: string;
  alt: string;
};

export const PAGE_HEROES = {
  home: {
    src: "/images/hero/home.webp",
    alt: "Gated Cloudbreak Ridge new homes in La Madre Peaks, Summerlin West, Nevada",
  },
  enclaves: {
    src: "/images/hero/enclaves.webp",
    alt: "Single-story KB Home homes at Enclaves, Cloudbreak Ridge, Summerlin",
  },
  reserves: {
    src: "/images/hero/reserves.webp",
    alt: "Two-story KB Home homes at Reserves, Cloudbreak Ridge, La Madre Peaks",
  },
  "la-madre-peaks": {
    src: "/images/hero/la-madre-peaks.webp",
    alt: "La Madre Peaks village and La Madre Mountains, Summerlin West",
  },
  "bring-your-realtor": {
    src: "/images/hero/bring-your-realtor.webp",
    alt: "Register your buyer agent before touring Cloudbreak Ridge model homes",
  },
  neighborhoods: {
    src: "/images/hero/neighborhoods.webp",
    alt: "Summerlin West neighborhoods near Cloudbreak Ridge, Las Vegas",
  },
  schools: {
    src: "/images/hero/schools.webp",
    alt: "Schools serving Cloudbreak Ridge and La Madre Peaks, Summerlin",
  },
  "floor-plans": {
    src: "/images/hero/floor-plans.webp",
    alt: "KB Home floor plans at Cloudbreak Ridge Enclaves and Reserves",
  },
  "enclaves-vs-reserves": {
    src: "/images/hero/enclaves-vs-reserves.webp",
    alt: "Compare Enclaves single-story and Reserves two-story homes at Cloudbreak Ridge",
  },
  blog: {
    src: "/images/hero/blog.webp",
    alt: "Cloudbreak Ridge and Summerlin real estate news and buyer guides",
  },
  buyers: {
    src: "/images/hero/buyers.webp",
    alt: "Las Vegas and Summerlin home buyers working with Dr. Jan Duffy",
  },
  "first-time-buyers": {
    src: "/images/hero/first-time-buyers.webp",
    alt: "First-time home buyers in Las Vegas and Summerlin",
  },
  "california-relocator": {
    src: "/images/hero/california-relocator.webp",
    alt: "California to Las Vegas relocation and Summerlin home search",
  },
  "luxury-homes-las-vegas": {
    src: "/images/hero/luxury-homes-las-vegas.webp",
    alt: "Luxury homes for sale in Las Vegas and Summerlin",
  },
  sellers: {
    src: "/images/hero/sellers.webp",
    alt: "Las Vegas home sellers listing with Dr. Jan Duffy",
  },
  "move-up": {
    src: "/images/hero/move-up.webp",
    alt: "Move-up sellers in Summerlin and Las Vegas",
  },
  downsizing: {
    src: "/images/hero/downsizing.webp",
    alt: "Downsizing and rightsizing home sales in Las Vegas",
  },
  "divorce-probate": {
    src: "/images/hero/divorce-probate.webp",
    alt: "Discreet home sale support for divorce and probate in Las Vegas",
  },
  "seller-relocation": {
    src: "/images/hero/seller-relocation.webp",
    alt: "Selling your Las Vegas home when relocating out of Nevada",
  },
  "new-construction": {
    src: "/images/hero/new-construction.webp",
    alt: "New construction homes and builder representation in Summerlin",
  },
  "luxury-homes": {
    src: "/images/hero/luxury-homes.webp",
    alt: "Luxury estates and high-end homes in Las Vegas",
  },
  "investment-properties": {
    src: "/images/hero/investment-properties.webp",
    alt: "Las Vegas investment property and rental market",
  },
  relocation: {
    src: "/images/hero/relocation.webp",
    alt: "Relocating to Las Vegas and Summerlin — buyer guide",
  },
  "home-valuation": {
    src: "/images/hero/home-valuation.webp",
    alt: "Las Vegas home valuation and market pricing",
  },
  about: {
    src: "/images/hero/about.webp",
    alt: "Dr. Jan Duffy, REALTOR with Berkshire Hathaway HomeServices Nevada Properties",
  },
  contact: {
    src: "/images/hero/contact.webp",
    alt: "Contact Dr. Jan Duffy for Cloudbreak Ridge and Summerlin real estate",
  },
  faq: {
    src: "/images/hero/faq.webp",
    alt: "Frequently asked questions about buying in Summerlin and Cloudbreak Ridge",
  },
  services: {
    src: "/images/hero/services.webp",
    alt: "Real estate services for buyers and sellers in Las Vegas",
  },
  "why-berkshire-hathaway": {
    src: "/images/hero/why-berkshire-hathaway.webp",
    alt: "Berkshire Hathaway HomeServices Nevada Properties real estate",
  },
  "market-report": {
    src: "/images/hero/market-report.webp",
    alt: "Las Vegas real estate market report and trends",
  },
  "market-update": {
    src: "/images/hero/market-update.webp",
    alt: "Las Vegas housing market update",
  },
  "market-insights": {
    src: "/images/hero/market-insights.webp",
    alt: "Las Vegas real estate market insights and forecasts",
  },
  listings: {
    src: "/images/hero/listings.webp",
    alt: "Homes for sale in Las Vegas and Summerlin",
  },
  summerlin: {
    src: "/images/hero/summerlin.webp",
    alt: "Summerlin master-planned community, Las Vegas Nevada",
  },
  henderson: {
    src: "/images/hero/henderson.webp",
    alt: "Henderson Nevada homes and neighborhoods",
  },
  "green-valley": {
    src: "/images/hero/green-valley.webp",
    alt: "Green Valley Henderson homes and parks",
  },
  "centennial-hills": {
    src: "/images/hero/centennial-hills.webp",
    alt: "Centennial Hills Las Vegas homes near the mountains",
  },
  inspirada: {
    src: "/images/hero/inspirada.webp",
    alt: "Inspirada master-planned community Henderson Nevada",
  },
  "mountains-edge": {
    src: "/images/hero/mountains-edge.webp",
    alt: "Mountains Edge community Las Vegas",
  },
  "north-las-vegas": {
    src: "/images/hero/north-las-vegas.webp",
    alt: "North Las Vegas homes and neighborhoods",
  },
  "skye-canyon": {
    src: "/images/hero/skye-canyon.webp",
    alt: "Skye Canyon master-planned community Las Vegas",
  },
  "southern-highlands": {
    src: "/images/hero/southern-highlands.webp",
    alt: "Southern Highlands luxury homes Las Vegas",
  },
  "the-ridges": {
    src: "/images/hero/the-ridges.webp",
    alt: "The Ridges luxury homes Summerlin Las Vegas",
  },
  "55-plus-communities": {
    src: "/images/hero/55-plus-communities.webp",
    alt: "55 plus active adult communities in Las Vegas",
  },
  "sun-city-summerlin": {
    src: "/images/hero/sun-city-summerlin.webp",
    alt: "Sun City Summerlin active adult community",
  },
  "sun-city-anthem": {
    src: "/images/hero/sun-city-anthem.webp",
    alt: "Sun City Anthem 55 plus community Henderson",
  },
  "sun-city-aliante": {
    src: "/images/hero/sun-city-aliante.webp",
    alt: "Sun City Aliante North Las Vegas active adult",
  },
  "heritage-stonebridge": {
    src: "/images/hero/heritage-stonebridge.webp",
    alt: "Heritage at Stonebridge 55 plus Summerlin",
  },
  "trilogy-summerlin": {
    src: "/images/hero/trilogy-summerlin.webp",
    alt: "Trilogy Summerlin resort lifestyle community",
  },
  "solera-anthem": {
    src: "/images/hero/solera-anthem.webp",
    alt: "Solera at Anthem 55 plus Henderson",
  },
  "del-webb-lake-las-vegas": {
    src: "/images/hero/del-webb-lake-las-vegas.webp",
    alt: "Del Webb Lake Las Vegas active adult community",
  },
} as const satisfies Record<string, PageHeroMeta>;

/** Resolve hero key from an app router pathname like /enclaves or /buyers/first-time-buyers */
export function pathnameToHeroKey(pathname: string): PageHeroKey | undefined {
  const normalized = pathname.replace(/^\/|\/$/g, "");
  if (!normalized) return "home";
  const key = normalized.replace(/\//g, "-");
  if (key in PAGE_HEROES) return key as PageHeroKey;
  const last = normalized.split("/").pop();
  if (last && last in PAGE_HEROES) return last as PageHeroKey;
  return undefined;
}

export function getPageHero(key: PageHeroKey): PageHeroMeta {
  return PAGE_HEROES[key];
}
