import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
import {
  HyperlocalIntro,
  GeoEntityBlock,
  LocalServicesBlock,
  LocalCtaBlock,
  LocalInternalLinks,
} from "@/components/sections/HyperlocalPageBlocks";
import {
  SchoolsNearCommunityBlock,
  CommuteAndAccessBlock,
  SummerlinMasterAmenitiesBlock,
  EnclavesVsReservesComparisonBlock,
} from "@/components/sections/CloudbreakContentBlocks";
import { CLOUDBREAK_RIDGE, NEARBY_AMENITIES } from "@/lib/cloudbreak-ridge";
import { siteConfig } from "@/lib/site-config";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateRealEstateAgentSchema,
  generateCloudbreakRidgePlaceSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "La Madre Peaks Summerlin West | Village Near Cloudbreak Ridge",
  description:
    "La Madre Peaks is Summerlin’s newest village in Summerlin West at the base of the La Madre Mountains — home to Cloudbreak Ridge by KB Home near Scout’s Point and Grand Park. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/la-madre-peaks` },
  keywords: [
    "La Madre Peaks",
    "La Madre Peaks Summerlin",
    "Summerlin West village",
    "Cloudbreak Ridge La Madre Peaks",
  ],
};

const faqs = [
  {
    question: "What is La Madre Peaks in Summerlin?",
    answer:
      "La Madre Peaks is Summerlin’s newest village in Summerlin West, at the base of the La Madre Mountains. It includes new-home collections such as Cloudbreak Ridge by KB Home, with proximity to Scout’s Point (planned village park) and Grand Park.",
  },
  {
    question: "Where is Cloudbreak Ridge within La Madre Peaks?",
    answer: `Cloudbreak Ridge models are at ${CLOUDBREAK_RIDGE.address.full}, near Mountain Run Drive and Park Drift Trail. Downtown Summerlin® is about a five-minute drive via the 215 Beltway.`,
  },
  {
    question: "What parks serve La Madre Peaks buyers?",
    answer:
      "Scout’s Point is a planned climbing-themed village park with flex lawns, trails, and a shaded overlook. Grand Park (Summerlin’s largest park, phase one complete) is less than five minutes away with playgrounds, trails, courts, and fields.",
  },
  {
    question: "How do I tour homes in La Madre Peaks with a Realtor?",
    answer:
      "Register Dr. Jan Duffy before your first builder visit — call 702-222-1964 or book a consultation. Most builders require your agent on the initial registration.",
  },
  {
    question: "What schools serve La Madre Peaks and Cloudbreak Ridge?",
    answer:
      "KB Home lists Linda Rankin Givens Elementary, Sig Rogich Middle, and Palo Verde High for Cloudbreak Ridge buyers. Verify CCSD boundaries for your homesite address before you buy.",
  },
];

const placeSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${siteConfig.url}/la-madre-peaks#place`,
  name: "La Madre Peaks, Summerlin",
  description:
    "Newest Summerlin village in Summerlin West at the base of the La Madre Mountains, including Cloudbreak Ridge by KB Home.",
  containedInPlace: {
    "@type": "Place",
    name: "Summerlin",
    containedInPlace: { "@type": "City", name: "Las Vegas", addressRegion: "NV" },
  },
  amenityFeature: NEARBY_AMENITIES.map((a) => ({
    "@type": "LocationFeatureSpecification",
    name: a.name,
    value: true,
    description: a.description,
  })),
};

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  placeSchema,
  generateCloudbreakRidgePlaceSchema(),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Neighborhoods", url: "/neighborhoods" },
    { name: "La Madre Peaks", url: "/la-madre-peaks" },
  ])
);

export default function LaMadrePeaksPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="la-madre-peaks-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Cloudbreak Ridge Homes by Dr. Jan Duffy
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              La Madre Peaks, Summerlin West
            </h1>
            <p className="text-xl text-slate-600">
              Summerlin’s newest village at the base of the La Madre Mountains — parks, trails, and
              new construction including Cloudbreak Ridge
            </p>
          </div>

        <RealScoutListings />

          <HyperlocalIntro
            h2="Where is La Madre Peaks relative to Downtown Summerlin®?"
            lead="La Madre Peaks sits in Summerlin West. From Cloudbreak Ridge, the 215 Beltway reaches Downtown Summerlin® in about five minutes; Grand Park is less than five minutes; Red Rock Canyon recreation is a short drive west."
          >
            <p className="text-slate-700">
              Cloudbreak Ridge by KB Home opened in La Madre Peaks in May 2026 with gated Enclaves
              and Reserves collections from the $800,000s, near Scout&apos;s Point and Grand Park.
            </p>
          </HyperlocalIntro>

          <section id="grand-park" className="mb-14 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              What amenities are near La Madre Peaks?
            </h2>
            <p className="text-slate-700 mb-4">
              Village parks, trails, sports courts, and quick drives to Downtown Summerlin® and Red
              Rock Canyon — practical location facts for buyers comparing La Madre Peaks.
            </p>
            <ul className="space-y-3 text-slate-700 text-sm">
              {NEARBY_AMENITIES.map((a) => (
                <li key={a.name}>
                  <strong>{a.name}</strong> ({a.status}): {a.description}
                </li>
              ))}
            </ul>
          </section>

          <GeoEntityBlock />
          <SchoolsNearCommunityBlock />
          <CommuteAndAccessBlock />
          <SummerlinMasterAmenitiesBlock />
          <EnclavesVsReservesComparisonBlock />
          <LocalServicesBlock />
          <FAQSection
            faqs={faqs}
            title="La Madre Peaks FAQ"
            subtitle="Village location, parks, and touring with representation"
          />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/la-madre-peaks" />
        </div>
</main>
      <Footer />
    </>
  );
}
