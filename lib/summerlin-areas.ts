/**
 * Summerlin-focused area cards for /neighborhoods hub.
 * Amenities / commute facts only — no Fair Housing proxies.
 */

export type SummerlinArea = {
  slug: string;
  name: string;
  href: string;
  description: string;
  highlights: string[];
  priceNote: string;
};

export const summerlinAreas: SummerlinArea[] = [
  {
    slug: "cloudbreak-ridge",
    name: "Cloudbreak Ridge / La Madre Peaks",
    href: "/",
    description:
      "KB Home new construction in La Madre Peaks, Summerlin West — Enclaves (single-story) and Reserves (two-story) from the $800,000s at 1168 Cloudbreak Cove Dr.",
    highlights: [
      "Gated collections",
      "2,251–3,095 sq ft",
      "Scout’s Point nearby",
      "~5 min Downtown Summerlin®",
    ],
    priceNote: "From the $800s",
  },
  {
    slug: "enclaves",
    name: "Enclaves at Cloudbreak Ridge",
    href: "/enclaves",
    description:
      "Gated single-story plans: Plan 2251 (~2,251 sq ft) and Plan 2387 (~2,387 sq ft), each with a two-car garage.",
    highlights: ["Single-story", "Gated", "2 floorplans", "Two-car garages"],
    priceNote: "From the $800s",
  },
  {
    slug: "reserves",
    name: "Reserves at Cloudbreak Ridge",
    href: "/reserves",
    description:
      "Larger two-story plans from about 2,753–3,095 sq ft with a planned future neighborhood park.",
    highlights: ["Two-story", "3 floorplans", "Planned park", "4–5 bedrooms"],
    priceNote: "From the $800s",
  },
  {
    slug: "la-madre-peaks",
    name: "La Madre Peaks Village",
    href: "/la-madre-peaks",
    description:
      "Summerlin’s newest village in Summerlin West at the base of the La Madre Mountains — parks, trails, and new-home collections including Cloudbreak Ridge.",
    highlights: ["Newest Summerlin village", "Mountain backdrop", "Grand Park nearby", "215 access"],
    priceNote: "Varies by neighborhood",
  },
  {
    slug: "summerlin",
    name: "Summerlin Master Plan",
    href: "/neighborhoods/summerlin",
    description:
      "Howard Hughes master-planned community with parks, trails, golf, and Downtown Summerlin® lifestyle center.",
    highlights: ["150+ parks", "Trails network", "Golf communities", "Downtown Summerlin®"],
    priceNote: "Varies by village",
  },
  {
    slug: "the-ridges",
    name: "The Ridges",
    href: "/neighborhoods/the-ridges",
    description:
      "Guard-gated Summerlin estates near golf and elevated valley / mountain views — luxury resale context for Cloudbreak Ridge shoppers.",
    highlights: ["Guard-gated", "Custom estates", "Golf adjacency", "Views"],
    priceNote: "Luxury custom",
  },
  {
    slug: "grand-park",
    name: "Grand Park area",
    href: "/la-madre-peaks#grand-park",
    description:
      "Summerlin’s largest park campus (phase one complete) — playgrounds, trails, sports courts and fields within a short drive of Cloudbreak Ridge.",
    highlights: ["Playgrounds", "Trails", "Sports courts", "Fields"],
    priceNote: "Adjacent amenities",
  },
  {
    slug: "red-rock",
    name: "Red Rock Canyon access",
    href: "/neighborhoods/summerlin",
    description:
      "Western Summerlin puts Red Rock Canyon National Conservation Area within a short drive for hiking and scenic overlooks.",
    highlights: ["Hiking", "Scenic drives", "Conservation area", "Western Summerlin"],
    priceNote: "Recreation context",
  },
];
