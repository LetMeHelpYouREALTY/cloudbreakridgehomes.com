/**
 * Cloudbreak Ridge community facts — single source for SEO / AEO / GEO /
 * JSON-LD. Mirror visible homepage + collection page copy from this module.
 *
 * Community / Residence address (not brokerage office NAP):
 * 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138
 */

export const CLOUDBREAK_RIDGE = {
  name: "Cloudbreak Ridge",
  brandName: "Cloudbreak Ridge Homes by Dr. Jan Duffy",
  builder: "KB Home",
  village: "La Madre Peaks",
  masterPlan: "Summerlin",
  region: "Summerlin West",
  landmark: "La Madre Mountains",
  priceFrom: "the $800,000s",
  priceFromNumericHint: 800000,
  /** KB Home listed Reserves from ~$839,990 (summerlin.com / KB Home, mid-2026). Confirm live. */
  priceFromVerifiedNote:
    "Priced from the $800,000s (builder list; homesite premiums may apply — confirm current pricing).",
  slug: "cloudbreak-ridge",
  homesitesApprox: 104,
  acresApprox: 20.58,
  description:
    "Cloudbreak Ridge by KB Home is the newest neighborhood to open in the Summerlin master-planned community, located in Summerlin’s newest village, La Madre Peaks, in Summerlin West at the base of the La Madre Mountains. The community features two collections—Enclaves and Reserves—priced from the $800,000s.",
  shortDescription:
    "KB Home new construction in La Madre Peaks, Summerlin West — gated Enclaves (single-story) and Reserves (two-story) homes from the $800,000s near Scout’s Point, Grand Park, and Downtown Summerlin®.",
  containedIn: ["La Madre Peaks", "Summerlin", "Las Vegas", "Clark County"],
  /** Community / models address — not the BHHS brokerage office */
  address: {
    street: "1168 Cloudbreak Cove Dr.",
    streetAlt: "1168 Cloudbreak Cove Drive",
    city: "Las Vegas",
    state: "NV",
    zip: "89138",
    full: "1168 Cloudbreak Cove Dr., Las Vegas, NV 89138",
  },
  mapsQuery: "1168+Cloudbreak+Cove+Dr,+Las+Vegas,+NV+89138",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=1168+Cloudbreak+Cove+Dr,+Las+Vegas,+NV+89138&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1168+Cloudbreak+Cove+Dr,+Las+Vegas,+NV+89138",
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=1168+Cloudbreak+Cove+Dr,+Las+Vegas,+NV+89138",
  intersectionNote:
    "Northwest corner of Mountain Run Drive and Park Drift Trail in La Madre Peaks (KB Home also references Park Drift Trail and Sandstone Rise Drive).",
  /** ~104 homesites across both collections (Summerlin village filings / builder materials, 2026). */
  collectionSplit: {
    enclavesHomesites: 32,
    reservesHomesites: 72,
    totalHomesites: 104,
  },
  accessibility: {
    beltway: "215 Beltway",
    downtownSummerlinDrive: "about a five-minute drive",
    redRockCanyon: "near Red Rock Canyon National Conservation Area",
    grandPark: "less than five minutes to Grand Park",
  },
  /** Client CTA per portfolio operating instructions */
  ctaPhone: "(702) 222-1964",
  ctaPhoneTel: "tel:+17022221964",
} as const;

export type FloorPlan = {
  id: string;
  collection: "Enclaves" | "Reserves";
  name: string;
  sqFt: number;
  stories: 1 | 2;
  bedrooms: string;
  baths: string;
  garageBays: 2;
  summary: string;
};

export const ENCLAVES_COLLECTION = {
  name: "Enclaves at Cloudbreak Ridge",
  slug: "enclaves",
  gated: true,
  stories: 1 as const,
  sqFtRange: { min: 2251, max: 2387 },
  homesitesNote: "Part of ~104 homesites across Cloudbreak Ridge (Enclaves + Reserves).",
  summary:
    "Enclaves at Cloudbreak Ridge is a gated KB Home neighborhood offering all single-story homes in two floorplans (about 2,251–2,387 sq ft), each with a two-car garage.",
  plans: [
    {
      id: "plan-2251",
      collection: "Enclaves" as const,
      name: "Plan 2251",
      sqFt: 2251,
      stories: 1 as const,
      bedrooms: "3–4",
      baths: "2.5",
      garageBays: 2 as const,
      summary:
        "Plan 2251 offers about 2,251 square feet with three to four bedrooms, 2.5 baths, and a two-car garage.",
    },
    {
      id: "plan-2387",
      collection: "Enclaves" as const,
      name: "Plan 2387",
      sqFt: 2387,
      stories: 1 as const,
      bedrooms: "4",
      baths: "2.5–3.5",
      garageBays: 2 as const,
      summary:
        "Plan 2387 offers about 2,387 square feet with four bedrooms, 2.5–3.5 baths, and a two-car garage.",
    },
  ] satisfies FloorPlan[],
};

export const RESERVES_COLLECTION = {
  name: "Reserves at Cloudbreak Ridge",
  slug: "reserves",
  gated: true,
  stories: 2 as const,
  sqFtRange: { min: 2753, max: 3095 },
  parkNote: "Includes a planned future neighborhood park.",
  summary:
    "Reserves at Cloudbreak Ridge offers three larger two-story KB Home floorplans from about 2,753 to 3,095 square feet, with four to five bedrooms, 2.5–5 baths, two-car garages, and a planned future neighborhood park.",
  plans: [
    {
      id: "plan-2753",
      collection: "Reserves" as const,
      name: "Plan 2753",
      sqFt: 2753,
      stories: 2 as const,
      bedrooms: "4–5",
      baths: "2.5–3",
      garageBays: 2 as const,
      summary:
        "Plan 2753 offers about 2,753 square feet with four to five bedrooms, 2.5–3 baths, and a two-car garage.",
    },
    {
      id: "plan-2989",
      collection: "Reserves" as const,
      name: "Plan 2989",
      sqFt: 2989,
      stories: 2 as const,
      bedrooms: "4",
      baths: "3.5",
      garageBays: 2 as const,
      summary:
        "Plan 2989 offers about 2,989 square feet with four bedrooms, 3.5 baths, and a two-car garage.",
    },
    {
      id: "plan-3095",
      collection: "Reserves" as const,
      name: "Plan 3095",
      sqFt: 3095,
      stories: 2 as const,
      bedrooms: "4–5",
      baths: "2.5–5",
      garageBays: 2 as const,
      summary:
        "Plan 3095 offers about 3,095 square feet with four to five bedrooms, 2.5–5 baths, and a two-car garage.",
    },
  ] satisfies FloorPlan[],
};

export const NEARBY_AMENITIES = [
  {
    name: "Scout’s Point",
    type: "village park" as const,
    status: "planned",
    description:
      "Cloudbreak Ridge is close to Scout’s Point, a planned village park in La Madre Peaks designed around a climbing-themed play experience focused on discovery. Planned amenities include two flex lawns, hard- and soft-surface trails, a picnic and shaded overlook, a restroom building, parking, and a future trail connection to the west.",
  },
  {
    name: "Grand Park",
    type: "community park" as const,
    status: "phased — first phase complete",
    description:
      "Residents are less than five minutes from Grand Park, Summerlin’s largest park, with playgrounds, trails, sports courts, and fields. Grand Park is being developed in phases, with the first phase already complete.",
  },
  {
    name: "Downtown Summerlin®",
    type: "retail / lifestyle center" as const,
    status: "open",
    description:
      "From the 215 Beltway, Downtown Summerlin® is about a five-minute drive — shopping, dining, entertainment, City National Arena, and Las Vegas Ballpark®.",
  },
  {
    name: "Red Rock Canyon",
    type: "outdoor recreation" as const,
    status: "open",
    description:
      "Western Summerlin access puts Red Rock Canyon National Conservation Area and nearby trails within a short drive for hiking and scenic overlooks.",
  },
] as const;

/** Schools cited by KB Home for Cloudbreak Ridge — verify zoning with CCSD before you buy. */
export const SCHOOLS_NEAR_CLOUDBREAK = [
  {
    name: "Linda Rankin Givens Elementary School",
    level: "Elementary",
    district: "Clark County School District",
    note: "Listed by KB Home as the elementary school serving Cloudbreak Ridge buyers (May 2026 opening materials).",
  },
  {
    name: "Sig Rogich Middle School",
    level: "Middle",
    district: "Clark County School District",
    note: "Listed by KB Home as the middle school for the community.",
  },
  {
    name: "Palo Verde High School",
    level: "High",
    district: "Clark County School District",
    note: "Listed by KB Home as the high school for the community.",
  },
] as const;

export const SCHOOLS_DISCLAIMER =
  "School assignments can change with boundary updates. Confirm current zoning with the Clark County School District and your lender before you rely on a specific campus.";

/** Commute and regional access — KB Home / Summerlin sources, 2026. */
export const COMMUTE_AND_ACCESS = {
  heading: "Commute and regional access from Cloudbreak Ridge",
  summary:
    "Cloudbreak Ridge sits in Summerlin West with quick beltway access to employment centers, Harry Reid International Airport, and west-side recreation.",
  items: [
    {
      label: "215 Beltway",
      detail: "About a five-minute drive to Downtown Summerlin® for shopping, dining, City National Arena, and Las Vegas Ballpark®.",
    },
    {
      label: "Interstates 15 & 215",
      detail: "Convenient access to Las Vegas employment corridors and valley-wide commutes.",
    },
    {
      label: "Harry Reid International Airport",
      detail: "Reachable via the 215 and I-15 — helpful for relocators and second-home buyers.",
    },
    {
      label: "Red Rock Canyon & Lone Mountain",
      detail: "Short drives to Red Rock Canyon National Conservation Area, Lone Mountain Peak, and Lone Mountain Regional Park.",
    },
    {
      label: "Red Rock® Casino Resort & Spa",
      detail: "Nearby dining and entertainment west of the 215 in Summerlin.",
    },
  ],
} as const;

/** Summerlin master-plan amenities (beyond village parks). */
export const SUMMERLIN_MASTER_AMENITIES = {
  heading: "Summerlin resort-style amenities for Cloudbreak Ridge residents",
  intro:
    "As part of the Summerlin master plan, Cloudbreak Ridge homeowners can tap the community’s pools, parks, trails, community centers, playgrounds, and sport courts — in addition to La Madre Peaks village assets like Scout’s Point and Grand Park.",
  items: [
    "Community pools and recreation centers",
    "Parks, trails, and playgrounds throughout Summerlin",
    "Sport courts and athletic fields",
    "Grand Park — Summerlin’s 100-acre park (phase one complete; additional phases planned)",
  ],
} as const;

export const ENCLAVES_VS_RESERVES = {
  heading: "Enclaves vs Reserves at Cloudbreak Ridge",
  directAnswer:
    "Enclaves is the gated single-story collection (two plans, ~2,251–2,387 sq ft). Reserves is the two-story collection (three plans, ~2,753–3,095 sq ft) with a planned future neighborhood park. Both are priced from the $800,000s — confirm live base prices and homesite premiums with KB Home.",
  rows: [
    { label: "Stories", enclaves: "Single-story only", reserves: "Two-story" },
    { label: "Floor plans", enclaves: "2 (Plan 2251, Plan 2387)", reserves: "3 (Plan 2753, Plan 2989, Plan 3095)" },
    { label: "Square footage", enclaves: "~2,251–2,387 sq ft", reserves: "~2,753–3,095 sq ft" },
    { label: "Bedrooms / baths", enclaves: "3–4 beds · 2.5–3.5 baths", reserves: "4–5 beds · 2.5–5 baths" },
    { label: "Garage", enclaves: "2-car on all plans", reserves: "2-car on all plans" },
    { label: "Gated", enclaves: "Yes", reserves: "Yes" },
    { label: "Park", enclaves: "Near Scout’s Point & Grand Park", reserves: "Planned future neighborhood park + nearby Grand Park" },
    { label: "Typical buyer fit", enclaves: "Single-level living, fewer stairs", reserves: "More square footage, separation between floors" },
  ],
} as const;

export const WHY_BUY_EARLY = {
  heading: "Why buy early at Cloudbreak Ridge?",
  points: [
    "Wider choice of homesites, floor plans, elevations, and structural options while inventory is early in the release.",
    "Later phases often see higher base prices and fewer premium lot options — pricing and premiums change over time.",
    "KB Home personalization (layout, exterior style, design options) is easiest when the community is in early selling phases.",
  ],
} as const;

export const BRING_YOUR_REALTOR = {
  heading: "Bring your own Realtor on the first visit",
  body: "Most builders require your buyer’s agent to accompany you or be registered on the first visit to the models or sales office. If you register alone, you may forfeit the right to independent representation. Call or book Dr. Jan Duffy before you visit Cloudbreak Ridge.",
} as const;

/** Transaction / lifestyle descriptors — no protected-class steering. */
export const BUYER_FIT_NOTES = {
  heading: "Who shops Cloudbreak Ridge?",
  body: "Typical purchase profiles include move-up buyers adding square footage, second-home buyers, and relocators comparing Nevada’s tax and lifestyle advantages to their current market. Floor-plan and lot choice drive fit more than any demographic label.",
} as const;

export const FINAL_THOUGHTS = {
  heading: "Cloudbreak Ridge in context — 2026",
  body: "Cloudbreak Ridge by KB Home adds gated new construction to La Madre Peaks in Summerlin West — mountain backdrop, planned parks, and quick access to Downtown Summerlin® and Red Rock Canyon. Interest is strong as La Madre Peaks builds out through 2026; confirm current pricing, incentives, and homesite availability before you write an offer.",
} as const;

/** Visible FAQ answers lead with the direct answer (AEO). */
export const CLOUDBREAK_RIDGE_FAQS = [
  {
    question: "What is Cloudbreak Ridge Homes in Summerlin?",
    answer:
      "Cloudbreak Ridge by KB Home is the newest neighborhood to open in the Summerlin master-planned community. It sits in La Madre Peaks, Summerlin’s newest village in Summerlin West, at the base of the La Madre Mountains, with homes priced from the $800,000s.",
  },
  {
    question: "Where is Cloudbreak Ridge located?",
    answer:
      "The KB Home sales office and models are at 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138, in La Madre Peaks near Mountain Run Drive and Park Drift Trail. The 215 Beltway reaches Downtown Summerlin® in about five minutes; Grand Park and Red Rock Canyon are a short drive.",
  },
  {
    question: "Who builds Cloudbreak Ridge?",
    answer:
      "KB Home builds Cloudbreak Ridge in La Madre Peaks, Summerlin West — two collections, Enclaves and Reserves.",
  },
  {
    question: "What are Enclaves at Cloudbreak Ridge?",
    answer:
      "Enclaves at Cloudbreak Ridge is a gated collection of all single-story homes with two floorplans and two-car garages: Plan 2251 (~2,251 sq ft, 3–4 bedrooms, 2.5 baths) and Plan 2387 (~2,387 sq ft, 4 bedrooms, 2.5–3.5 baths).",
  },
  {
    question: "What are Reserves at Cloudbreak Ridge?",
    answer:
      "Reserves at Cloudbreak Ridge offers three larger two-story floorplans from about 2,753 to 3,095 square feet, each with a two-car garage and a planned future neighborhood park. Plans are 2753, 2989, and 3095 (4–5 bedrooms, 2.5–5 baths depending on plan).",
  },
  {
    question: "Why bring a Realtor to the first Cloudbreak Ridge visit?",
    answer:
      "Builders often require your agent at initial registration. Visiting alone can mean you forfeit buyer representation. Call Dr. Jan Duffy at 702-222-1964 or book a consultation before you go to 1168 Cloudbreak Cove Dr.",
  },
  {
    question: "What amenities are near Cloudbreak Ridge?",
    answer:
      "Homes are close to Scout’s Point (planned La Madre Peaks village park), Grand Park (Summerlin’s largest park, phase one complete), Downtown Summerlin® about five minutes via the 215, and outdoor recreation toward Red Rock Canyon.",
  },
  {
    question: "How do I tour Cloudbreak Ridge or compare Enclaves vs Reserves?",
    answer:
      "Call or text Dr. Jan Duffy at 702-222-1964, or book a buyer consultation. Register her before your first model visit so you keep independent representation while comparing floorplans and homesites with KB Home.",
  },
] as const;

export const ENCLAVES_FAQS = [
  {
    question: "What floor plans are in Enclaves at Cloudbreak Ridge?",
    answer:
      "Two single-story plans: Plan 2251 (~2,251 sq ft, 3–4 beds, 2.5 baths) and Plan 2387 (~2,387 sq ft, 4 beds, 2.5–3.5 baths). Both include a two-car garage in a gated setting.",
  },
  {
    question: "Is Enclaves at Cloudbreak Ridge gated?",
    answer:
      "Yes. Enclaves is the gated single-story collection at Cloudbreak Ridge by KB Home in La Madre Peaks, Summerlin.",
  },
  {
    question: "What is the address for Enclaves / Cloudbreak Ridge models?",
    answer:
      "KB Home’s Cloudbreak Ridge sales office is at 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138. Call Dr. Jan Duffy at 702-222-1964 before your first visit so she can register with you.",
  },
  {
    question: "How do Enclaves compare to Reserves?",
    answer:
      "Enclaves are single-story homes from about 2,251–2,387 sq ft. Reserves are larger two-story plans from about 2,753–3,095 sq ft with a planned future neighborhood park. Both start from the $800,000s — confirm live pricing with the builder.",
  },
] as const;

export const RESERVES_FAQS = [
  {
    question: "What floor plans are in Reserves at Cloudbreak Ridge?",
    answer:
      "Three two-story plans: Plan 2753 (~2,753 sq ft, 4–5 beds, 2.5–3 baths), Plan 2989 (~2,989 sq ft, 4 beds, 3.5 baths), and Plan 3095 (~3,095 sq ft, 4–5 beds, 2.5–5 baths). All include a two-car garage.",
  },
  {
    question: "Does Reserves at Cloudbreak Ridge have a park?",
    answer:
      "Yes — Reserves includes a planned future neighborhood park. Grand Park (phase one complete) and Scout’s Point (planned village park) are also nearby in Summerlin / La Madre Peaks.",
  },
  {
    question: "Where is Reserves at Cloudbreak Ridge?",
    answer:
      "Reserves is part of Cloudbreak Ridge by KB Home at 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138, in La Madre Peaks, Summerlin West.",
  },
  {
    question: "Should I buy early in Reserves?",
    answer:
      "Early phases typically offer more homesite, elevation, and option choice; prices and premiums can rise later. Bring your Realtor on the first visit — call 702-222-1964 to register Dr. Jan Duffy before you tour.",
  },
] as const;

export const SCHOOLS_FAQS = [
  {
    question: "What schools serve Cloudbreak Ridge in Summerlin?",
    answer:
      "KB Home lists Linda Rankin Givens Elementary School, Sig Rogich Middle School, and Palo Verde High School for Cloudbreak Ridge (May 2026). Confirm current CCSD boundaries before you buy — assignments can change.",
  },
  {
    question: "Are Summerlin schools near Cloudbreak Ridge highly rated?",
    answer:
      "Summerlin campuses are widely sought after, but ratings and boundaries shift. Tour schools in person and verify zoning with the Clark County School District for your specific homesite address.",
  },
  {
    question: "How do I verify school zoning for a Cloudbreak Ridge homesite?",
    answer:
      "Use the Clark County School District zoning lookup with the lot's full street address, or ask Dr. Jan Duffy to confirm during buyer representation. Do not rely on third-party listing sites alone.",
  },
] as const;

export const FLOOR_PLANS_FAQS = [
  {
    question: "How many floor plans does Cloudbreak Ridge offer?",
    answer:
      "Five KB Home plans across two collections: Enclaves has Plan 2251 (~2,251 sq ft) and Plan 2387 (~2,387 sq ft); Reserves has Plan 2753 (~2,753 sq ft), Plan 2989 (~2,989 sq ft), and Plan 3095 (~3,095 sq ft).",
  },
  {
    question: "What is the smallest floor plan at Cloudbreak Ridge?",
    answer:
      "Plan 2251 in Enclaves is the smallest at about 2,251 square feet with three to four bedrooms and 2.5 baths on one level.",
  },
  {
    question: "What is the largest floor plan at Cloudbreak Ridge?",
    answer:
      "Plan 3095 in Reserves is the largest at about 3,095 square feet with four to five bedrooms and up to five baths on two stories.",
  },
] as const;

export const COMPARISON_FAQS = [
  {
    question: "Should I buy in Enclaves or Reserves at Cloudbreak Ridge?",
    answer:
      "Choose Enclaves for single-story living around 2,251–2,387 sq ft. Choose Reserves for larger two-story homes (~2,753–3,095 sq ft) and the planned future neighborhood park. Tour both and compare homesite premiums with your Realtor.",
  },
  {
    question: "Is Enclaves or Reserves more expensive at Cloudbreak Ridge?",
    answer:
      "Both collections start from the $800,000s on KB Home's public pricing (Reserves from about $839,990 as of mid-2026). Final price depends on plan, elevation, structural options, and homesite premium — confirm live numbers before you write an offer.",
  },
  {
    question: "Are both Enclaves and Reserves gated?",
    answer:
      "Yes. Both Enclaves and Reserves at Cloudbreak Ridge are gated KB Home collections within La Madre Peaks, Summerlin West.",
  },
] as const;
