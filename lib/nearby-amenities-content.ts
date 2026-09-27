/**
 * Server-rendered nearby amenities copy and verified Place entities for JSON-LD.
 * Only documented, real locations — no invented ratings or drive times.
 */

import { CLOUDBREAK_RIDGE, SCHOOLS_NEAR_CLOUDBREAK } from "@/lib/cloudbreak-ridge";
import type { AmenityCategoryId } from "@/lib/amenities-map-config";

export type VerifiedNearbyPlace = {
  name: string;
  schemaType:
    | "Place"
    | "Restaurant"
    | "Park"
    | "Hospital"
    | "GolfCourse"
    | "School"
    | "Store"
    | "Pharmacy";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  category: AmenityCategoryId | "commute" | "recreation";
  note?: string;
};

/** Featured places for ItemList schema and static fallback list (verified addresses). */
export const VERIFIED_NEARBY_PLACES: VerifiedNearbyPlace[] = [
  {
    name: "Grand Park",
    schemaType: "Park",
    streetAddress: "10100 Baron Ave",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89138",
    category: "parks",
    note: "Summerlin’s largest park — playgrounds, trails, sports courts, and fields (phase one complete).",
  },
  {
    name: "Downtown Summerlin",
    schemaType: "Place",
    streetAddress: "1980 Festival Plaza Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89135",
    category: "shopping",
    note: "Retail, dining, City National Arena, and Las Vegas Ballpark® — about a five-minute drive via the 215 Beltway from Cloudbreak Ridge (builder/Summerlin materials).",
  },
  {
    name: "Red Rock Canyon National Conservation Area",
    schemaType: "Park",
    streetAddress: "3205 State Highway 159",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89161",
    category: "recreation",
    note: "Scenic drives, hiking, and overlooks west of Summerlin.",
  },
  {
    name: "Summerlin Hospital Medical Center",
    schemaType: "Hospital",
    streetAddress: "657 N Town Center Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89144",
    category: "healthcare",
    note: "Full-service hospital in the Summerlin area.",
  },
  {
    name: "TPC Summerlin",
    schemaType: "GolfCourse",
    streetAddress: "1700 Village Center Cir",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89134",
    category: "golf",
    note: "Public golf in Summerlin — confirm tee times and access with the course.",
  },
  {
    name: "Whole Foods Market",
    schemaType: "Store",
    streetAddress: "8855 W Charleston Blvd",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89117",
    category: "grocery",
    note: "Grocery and prepared foods in west Summerlin.",
  },
  {
    name: "Vons",
    schemaType: "Store",
    streetAddress: "1950 N Buffalo Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89128",
    category: "grocery",
    note: "Supermarket on Buffalo Drive serving northwest Summerlin / west valley shoppers.",
  },
  {
    name: "Linda Rankin Givens Elementary School",
    schemaType: "School",
    streetAddress: "655 Park Vista Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89138",
    category: "schools",
    note: "Listed by KB Home for Cloudbreak Ridge — verify CCSD zoning for your homesite.",
  },
  {
    name: "Sig Rogich Middle School",
    schemaType: "School",
    streetAddress: "1050 N Buffalo Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89128",
    category: "schools",
    note: "Listed by KB Home for Cloudbreak Ridge — confirm boundaries before you buy.",
  },
  {
    name: "Palo Verde High School",
    schemaType: "School",
    streetAddress: "333 S Pavilion Center Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89144",
    category: "schools",
    note: "Listed by KB Home for Cloudbreak Ridge — confirm boundaries before you buy.",
  },
];

export type CategoryCopySection = {
  id: AmenityCategoryId | "commute" | "overview";
  heading: string;
  paragraphs: string[];
};

export const AMENITIES_PAGE_CATEGORY_COPY: CategoryCopySection[] = [
  {
    id: "overview",
    heading: `Life near ${CLOUDBREAK_RIDGE.name} in La Madre Peaks`,
    paragraphs: [
      `${CLOUDBREAK_RIDGE.name} by ${CLOUDBREAK_RIDGE.builder} sits in ${CLOUDBREAK_RIDGE.village}, ${CLOUDBREAK_RIDGE.region}, at ${CLOUDBREAK_RIDGE.address.full}. Buyers here pair new gated construction with Summerlin master-plan parks, beltway access to Downtown Summerlin®, and outdoor recreation toward Red Rock Canyon.`,
      `Scout’s Point — a planned climbing-themed village park in La Madre Peaks — and Grand Park (phase one complete) are the headline outdoor anchors cited on Summerlin.com and KB Home community materials.`,
    ],
  },
  {
    id: "restaurants",
    heading: "Dining near Cloudbreak Ridge",
    paragraphs: [
      `Day-to-day dining clusters at Downtown Summerlin® (Festival Plaza Drive) and along Charleston Boulevard and Rampart Boulevard corridors in west Summerlin. Exact restaurants change; use the map filters for current options within a few miles of ${CLOUDBREAK_RIDGE.address.street}.`,
    ],
  },
  {
    id: "cafes",
    heading: "Cafes and coffee",
    paragraphs: [
      `Coffee shops and quick-service cafes concentrate at Downtown Summerlin® and nearby retail nodes along the 215 Beltway. Filter the map for cafes when you want walkable options after a model-home tour.`,
    ],
  },
  {
    id: "grocery",
    heading: "Grocery stores",
    paragraphs: [
      `West Summerlin shoppers commonly use grocers such as Whole Foods Market on Charleston Boulevard and Vons on Buffalo Drive, plus additional chains at Downtown Summerlin®. Drive time varies by traffic — confirm your preferred store on the map before you move in.`,
    ],
  },
  {
    id: "parks",
    heading: "Parks and recreation",
    paragraphs: [
      `Grand Park at 10100 Baron Ave is less than five minutes from Cloudbreak Ridge per builder materials. Scout’s Point remains planned for La Madre Peaks with flex lawns, trails, and a climbing-themed play experience. Summerlin HOA amenities also include community pools, trails, and recreation centers across the master plan.`,
      `Red Rock Canyon National Conservation Area is a short drive west for hiking and scenic overlooks.`,
    ],
  },
  {
    id: "golf",
    heading: "Golf",
    paragraphs: [
      `Summerlin is known for golf communities and public courses. TPC Summerlin on Village Center Circle is a well-known public option in the area. Private clubs such as Red Rock Country Club are also part of the west Summerlin landscape — confirm membership and guest policies directly with each club.`,
    ],
  },
  {
    id: "healthcare",
    heading: "Healthcare and hospitals",
    paragraphs: [
      `Summerlin Hospital Medical Center on Town Center Drive is a major full-service hospital serving the west valley. Urgent care, medical offices, and specialists are also clustered near Downtown Summerlin® and along Charleston Boulevard. Use the Healthcare filter on the map for facilities closest to Cloudbreak Ridge.`,
    ],
  },
  {
    id: "shopping",
    heading: "Shopping",
    paragraphs: [
      `Downtown Summerlin® is the primary lifestyle center — department stores, specialty retail, dining, City National Arena, and Las Vegas Ballpark®. Additional strip retail sits along Charleston, Rampart, and Buffalo corridors.`,
    ],
  },
  {
    id: "schools",
    heading: "Schools",
    paragraphs: SCHOOLS_NEAR_CLOUDBREAK.map(
      (s) => `${s.name} (${s.level}) — ${s.note}`
    ),
  },
  {
    id: "commute",
    heading: "Commute and regional access",
    paragraphs: [
      `Downtown Summerlin® is about a five-minute drive via the 215 Beltway from Cloudbreak Ridge (KB Home / Summerlin sources). The Las Vegas Strip and resort corridor are reachable via I-15 and the 215 — approximate drive time depends on time of day and your destination on the Strip.`,
      `Harry Reid International Airport is typically accessed via the 215 and I-15; allow extra time for valley traffic peaks.`,
      `These drive times are approximate — use Google Maps with your departure time for trip planning.`,
    ],
  },
];

export const AMENITIES_PAGE_FAQS = [
  {
    question: `What grocery stores are near ${CLOUDBREAK_RIDGE.name}?`,
    answer:
      "Whole Foods Market on Charleston Boulevard and Vons on Buffalo Drive are established west Summerlin grocers, with additional options at Downtown Summerlin®. Use the grocery filter on this page’s map for locations within a few miles of 1168 Cloudbreak Cove Dr.",
  },
  {
    question: `How far is ${CLOUDBREAK_RIDGE.name} from the Las Vegas Strip?`,
    answer:
      "Cloudbreak Ridge is in Summerlin West, not on the Strip. Most buyers reach the resort corridor via the 215 Beltway and I-15; approximate drive time varies widely by traffic and Strip exit — plan trips with a live navigation app.",
  },
  {
    question: `Are there hospitals near ${CLOUDBREAK_RIDGE.name}?`,
    answer:
      "Yes — Summerlin Hospital Medical Center on Town Center Drive is a major hospital serving west Las Vegas. Filter the map for healthcare to see additional clinics and urgent care near La Madre Peaks.",
  },
  {
    question: `What parks are closest to ${CLOUDBREAK_RIDGE.name}?`,
    answer:
      "Grand Park (phase one complete) is less than five minutes away per builder materials. Scout’s Point is a planned La Madre Peaks village park near the community. Summerlin master-plan trails and neighborhood parks extend across the village.",
  },
  {
    question: `How long does it take to get to Downtown Summerlin® from Cloudbreak Ridge?`,
    answer:
      "About five minutes via the 215 Beltway per KB Home and Summerlin community materials — confirm with your own drive during peak hours.",
  },
  {
    question: `What schools serve ${CLOUDBREAK_RIDGE.name}?`,
    answer:
      "KB Home lists Linda Rankin Givens Elementary, Sig Rogich Middle, and Palo Verde High for Cloudbreak Ridge buyers. Verify Clark County School District boundaries for your specific homesite before you rely on a campus assignment.",
  },
  {
    question: `Is golf available near ${CLOUDBREAK_RIDGE.name}?`,
    answer:
      "Yes — public golf at TPC Summerlin and multiple private and resort courses across Summerlin. Use the golf filter on the map for courses within your preferred drive radius.",
  },
  {
    question: `How do I tour ${CLOUDBREAK_RIDGE.name} with a local Realtor?`,
    answer:
      "Register Dr. Jan Duffy before your first KB Home visit — call 702-222-1964 or book a buyer consultation. Most builders require your agent on initial registration so you keep independent representation.",
  },
] as const;
