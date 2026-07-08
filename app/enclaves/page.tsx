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
  CLOUDBREAK_RIDGE,
  ENCLAVES_COLLECTION,
  ENCLAVES_FAQS,
} from "@/lib/cloudbreak-ridge";
import {
  generateCloudbreakCollectionSchema,
  generateCloudbreakRidgePlaceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateRealEstateAgentSchema,
  combineSchemas,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Enclaves at Cloudbreak Ridge | Single-Story KB Home Summerlin",
  description:
    "Enclaves at Cloudbreak Ridge — gated single-story KB Home floorplans (Plan 2251 ~2,251 sq ft; Plan 2387 ~2,387 sq ft) in La Madre Peaks, Summerlin West. 1168 Cloudbreak Cove Dr. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/enclaves` },
  keywords: [
    "Enclaves at Cloudbreak Ridge",
    "Cloudbreak Ridge single story",
    "La Madre Peaks KB Home",
    "Summerlin West new construction",
  ],
};

const faqs = [...ENCLAVES_FAQS];

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  generateCloudbreakCollectionSchema("Enclaves", "/enclaves"),
  generateCloudbreakRidgePlaceSchema(),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Enclaves at Cloudbreak Ridge", url: "/enclaves" },
  ])
);

export default function EnclavesPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="enclaves-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Cloudbreak Ridge Homes by Dr. Jan Duffy · La Madre Peaks
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Enclaves at Cloudbreak Ridge
            </h1>
            <p className="text-xl text-slate-600">
              Gated single-story KB Home collection in {CLOUDBREAK_RIDGE.village},{" "}
              {CLOUDBREAK_RIDGE.region} — from {CLOUDBREAK_RIDGE.priceFrom}
            </p>
          </div>

        <RealScoutListings />

          <HyperlocalIntro
            h2="Where are Enclaves at Cloudbreak Ridge?"
            lead={`${ENCLAVES_COLLECTION.summary} Models are at ${CLOUDBREAK_RIDGE.address.full}, near Mountain Run Drive and Park Drift Trail. Downtown Summerlin® is about five minutes via the 215 Beltway.`}
          >
            <ul className="mt-4 space-y-2 text-slate-700">
              {ENCLAVES_COLLECTION.plans.map((p) => (
                <li key={p.id}>
                  <strong>{p.name}:</strong> {p.summary}
                </li>
              ))}
            </ul>
          </HyperlocalIntro>

          <GeoEntityBlock title="Enclaves entity facts (GEO)" />
          <LocalServicesBlock />
          <FAQSection
            faqs={faqs}
            title="Enclaves FAQ"
            subtitle="Direct answers about single-story plans at Cloudbreak Ridge"
          />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/enclaves" />
        </div>
</main>
      <Footer />
    </>
  );
}
