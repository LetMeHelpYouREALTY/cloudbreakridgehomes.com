/**
 * Server-rendered nearby amenities copy and verified Place entities for JSON-LD.
 * Addresses verified against primary sources (sourceUrl on each entry).
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
  /** Official page used to verify name and address */
  sourceUrl: string;
  /** Optional coordinates for map markers when Places API is unavailable */
  lat?: number;
  lng?: number;
  note?: string;
};

/** Featured places for ItemList schema and static fallback list (verified addresses). */
export const VERIFIED_NEARBY_PLACES: VerifiedNearbyPlace[] = [
  {
    name: "Grand Park (phase one)",
    schemaType: "Park",
    streetAddress: "1001 Kettle Ridge Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89138",
    category: "parks",
    sourceUrl: "https://summerlin.com/grand-park-village-teeming-with-new-home-options/",
    lat: 36.1689,
    lng: -115.3525,
    note: "Summerlin West council park — first phase includes sports courts, splash pad, playground, and fields (Summerlin.com, 2026).",
  },
  {
    name: "Downtown Summerlin",
    schemaType: "Place",
    streetAddress: "1980 Festival Plaza Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89135",
    category: "shopping",
    sourceUrl: "https://www.downtownsummerlin.com/",
    lat: 36.1187,
    lng: -115.3324,
    note: "Retail, dining, City National Arena, and Las Vegas Ballpark® — drive time varies with traffic.",
  },
  {
    name: "Red Rock Canyon National Conservation Area",
    schemaType: "Park",
    streetAddress: "3205 State Highway 159",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89161",
    category: "recreation",
    sourceUrl: "https://www.blm.gov/red-rock-canyon-nca",
    lat: 36.1359,
    lng: -115.4279,
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
    sourceUrl: "https://www.summerlinhospital.com/",
    lat: 36.1752,
    lng: -115.3331,
    note: "Full-service hospital in the Summerlin area.",
  },
  {
    name: "TPC Las Vegas",
    schemaType: "GolfCourse",
    streetAddress: "9851 Canyon Run Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89144",
    category: "golf",
    sourceUrl: "https://tpc.com/tpc/las-vegas",
    lat: 36.1642,
    lng: -115.3548,
    note: "Public golf in west Summerlin — confirm tee times and access with the course.",
  },
  {
    name: "Angel Park Golf Club",
    schemaType: "GolfCourse",
    streetAddress: "100 S Rampart Blvd",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89145",
    category: "golf",
    sourceUrl: "https://www.angelpark.com/",
    lat: 36.1771,
    lng: -115.2865,
    note: "Municipal golf complex on Rampart Boulevard.",
  },
  {
    name: "Whole Foods Market (Summerlin)",
    schemaType: "Store",
    streetAddress: "2475 S Town Center Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89135",
    category: "grocery",
    sourceUrl: "https://www.wholefoodsmarket.com/stores/summerlin",
    lat: 36.1211,
    lng: -115.335,
    note: "Grocery and prepared foods at Downtown Summerlin.",
  },
  {
    name: "Smith's Food and Drug",
    schemaType: "Store",
    streetAddress: "9851 W Charleston Blvd",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89117",
    category: "grocery",
    sourceUrl: "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/charleston/705/00305",
    lat: 36.1581,
    lng: -115.2982,
    note: "Supermarket on Charleston Boulevard serving west Summerlin shoppers.",
  },
  {
    name: "Linda Rankin Givens Elementary School",
    schemaType: "School",
    streetAddress: "655 Park Vista Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89138",
    category: "schools",
    sourceUrl: "https://givenses.ccsd.net/",
    lat: 36.1945,
    lng: -115.3712,
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
    sourceUrl: "https://rogichms.ccsd.net/",
    lat: 36.1812,
    lng: -115.2615,
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
    sourceUrl: "https://paloverdehs.ccsd.net/",
    lat: 36.1683,
    lng: -115.3342,
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
      `Scout’s Point — a planned climbing-themed village park in La Madre Peaks — and Grand Park (phase one open in Summerlin West) are outdoor anchors cited on Summerlin.com and KB Home community materials.`,
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
      `Coffee shops and quick-service cafes concentrate at Downtown Summerlin® and nearby retail nodes along the 215 Beltway. Filter the map for cafes when you want options after a model-home tour.`,
    ],
  },
  {
    id: "grocery",
    heading: "Grocery stores",
    paragraphs: [
      `West Summerlin shoppers commonly use Whole Foods Market at Downtown Summerlin (Town Center Drive) and Smith’s on Charleston Boulevard, plus additional chains at Downtown Summerlin®. Drive time varies by traffic — confirm your preferred store on the map before you move in.`,
    ],
  },
  {
    id: "parks",
    heading: "Parks and recreation",
    paragraphs: [
      `Grand Park phase one at 1001 Kettle Ridge Dr is a major Summerlin West park per Summerlin.com materials. Scout’s Point remains planned for La Madre Peaks with flex lawns, trails, and a climbing-themed play experience. Summerlin HOA amenities also include community pools, trails, and recreation centers across the master plan.`,
      `Red Rock Canyon National Conservation Area is a short drive west for hiking and scenic overlooks.`,
    ],
  },
  {
    id: "golf",
    heading: "Golf",
    paragraphs: [
      `Summerlin has multiple public and private courses. TPC Las Vegas on Canyon Run Drive and Angel Park on Rampart Boulevard are established public options in west Summerlin. Confirm tee times and guest policies directly with each course.`,
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
      "Whole Foods Market at 2475 S Town Center Dr (Downtown Summerlin) and Smith’s at 9851 W Charleston Blvd are established west Summerlin grocers, with additional options at Downtown Summerlin®. Use the grocery filter on this page’s map for locations within a few miles of 1168 Cloudbreak Cove Dr.",
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
      "Grand Park phase one in Summerlin West and Scout’s Point (planned in La Madre Peaks) are cited in Summerlin and KB Home materials. Summerlin master-plan trails and neighborhood parks extend across the village.",
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
      "Yes — public golf at TPC Las Vegas and Angel Park Golf Club, plus additional courses across Summerlin. Use the golf filter on the map for courses within your preferred drive radius.",
  },
  {
    question: `How do I tour ${CLOUDBREAK_RIDGE.name} with a local Realtor?`,
    answer:
      `Register Dr. Jan Duffy before your first KB Home visit — call ${CLOUDBREAK_RIDGE.ctaPhone} or book a buyer consultation. Most builders require your agent on initial registration so you keep independent representation.`,
  },
] as const;
