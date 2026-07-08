/**
 * Summerlin-hyperlocal neighborhood hub data for cloudbreakridgehomes.com.
 * Amenities / commute facts only — no school-quality, crime, or audience steering.
 * Pricing: soft ranges or "confirm live" — avoid fabricated YoY % without verified comps.
 */

export type SummerlinArea = {
  name: string;
  slug: string;
  href: string;
  description: string;
  highlights: string[];
  priceNote: string;
  external?: boolean;
};

/** Hub cards — Summerlin / near-Summerlin only (Parallel research Jun–Jul 2026). */
export const summerlinAreas: SummerlinArea[] = [
  {
    name: "Cloudbreak Ridge / La Madre Peaks",
    slug: "cloudbreak-ridge",
    href: "/",
    description:
      "KB Home’s newest Summerlin neighborhood in La Madre Peaks (Summerlin West) at the base of the La Madre Mountains — gated Enclaves (single-story) and Reserves (two-story) from the $800,000s. Models at 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138.",
    highlights: [
      "Gated collections",
      "2,251–3,095 sq ft",
      "~5 min Downtown Summerlin®",
      "Scout’s Point / Grand Park",
    ],
    priceNote: "From the $800,000s (builder list; confirm live)",
  },
  {
    name: "Enclaves at Cloudbreak Ridge",
    slug: "enclaves",
    href: "/enclaves",
    description:
      "Gated single-story KB Home plans (~2,251–2,387 sq ft, 3–4 beds, 2.5–3.5 baths, 2-car garage) in La Madre Peaks.",
    highlights: ["Single-story", "Gated", "2 plans", "2-car garage"],
    priceNote: "From the low $800,000s — confirm with builder",
  },
  {
    name: "Reserves at Cloudbreak Ridge",
    slug: "reserves",
    href: "/reserves",
    description:
      "Two-story KB Home plans (~2,753–3,095 sq ft, 4–5 beds, 2.5–5 baths) with a planned future neighborhood park.",
    highlights: ["Two-story", "Planned park", "3 plans", "Larger footprint"],
    priceNote: "From the mid $800,000s — confirm with builder",
  },
  {
    name: "Summerlin (master plan)",
    slug: "summerlin",
    href: "/neighborhoods/summerlin",
    description:
      "Howard Hughes master-planned community with parks, trails, golf courses, Downtown Summerlin®, and multiple active villages — including western Summerlin / La Madre Peaks growth.",
    highlights: ["110+ floorplans (community)", "Parks & trails", "Downtown Summerlin®", "215 Beltway"],
    priceNote: "Wide range by village — ask for current comps",
  },
  {
    name: "Downtown Summerlin®",
    slug: "downtown-summerlin",
    href: "/neighborhoods/summerlin",
    description:
      "Lifestyle center about a five-minute drive from Cloudbreak Ridge via the 215 — shopping, dining, City National Arena, and Las Vegas Ballpark®.",
    highlights: ["Retail & dining", "~5 min from Cloudbreak", "Arena / ballpark", "215 access"],
    priceNote: "Adjacent market context — not a housing village alone",
  },
  {
    name: "The Ridges",
    slug: "the-ridges",
    href: "/neighborhoods/the-ridges",
    description:
      "Guard-gated Summerlin enclave with custom estates, Bear’s Best golf adjacency, and elevated valley / mountain outlooks — useful comps for buyers comparing west Summerlin luxury.",
    highlights: ["Guard-gated", "Custom estates", "Golf adjacency", "Mountain / valley views"],
    priceNote: "Luxury custom — pricing varies widely; call for comps",
  },
  {
    name: "Red Rock Country Club area",
    slug: "red-rock-country-club",
    href: "/neighborhoods/summerlin",
    description:
      "Golf-oriented Summerlin West living near Red Rock Canyon access — relevant for buyers comparing trail and golf lifestyle to La Madre Peaks new construction.",
    highlights: ["Golf community", "Near Red Rock Canyon", "Summerlin West", "Gated sections"],
    priceNote: "Confirm current listings — comps vary by section",
  },
  {
    name: "Grand Park Village area",
    slug: "grand-park",
    href: "/neighborhoods/summerlin",
    description:
      "Summerlin’s largest park campus (phase one complete) with playgrounds, trails, courts, and fields — under five minutes from Cloudbreak Ridge per builder notes.",
    highlights: ["Largest Summerlin park", "Trails & courts", "Phased buildout", "Near La Madre Peaks"],
    priceNote: "Park amenity — nearby homes priced by neighborhood",
  },
];
