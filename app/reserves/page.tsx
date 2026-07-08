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
  RESERVES_COLLECTION,
  RESERVES_FAQS,
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
  title: "Reserves at Cloudbreak Ridge | Two-Story KB Home Summerlin",
  description:
    "Reserves at Cloudbreak Ridge — two-story KB Home plans (~2,753–3,095 sq ft) with a planned neighborhood park in La Madre Peaks, Summerlin West. 1168 Cloudbreak Cove Dr. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/reserves` },
  keywords: [
    "Reserves at Cloudbreak Ridge",
    "Cloudbreak Ridge two story",
    "La Madre Peaks KB Home",
    "Summerlin West new homes",
  ],
};

const faqs = [...RESERVES_FAQS];

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  generateCloudbreakCollectionSchema("Reserves", "/reserves"),
  generateCloudbreakRidgePlaceSchema(),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Reserves at Cloudbreak Ridge", url: "/reserves" },
  ])
);

export default function ReservesPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="reserves-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Cloudbreak Ridge Homes by Dr. Jan Duffy · La Madre Peaks
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Reserves at Cloudbreak Ridge
            </h1>
            <p className="text-xl text-slate-600">
              Larger two-story KB Home collection in {CLOUDBREAK_RIDGE.village} —{" "}
              {RESERVES_COLLECTION.parkNote}
            </p>
          </div>

          <HyperlocalIntro
            h2="What floor plans are in Reserves at Cloudbreak Ridge?"
            lead={`${RESERVES_COLLECTION.summary} Sales office: ${CLOUDBREAK_RIDGE.address.full}. Grand Park is less than five minutes away; Downtown Summerlin® about five minutes on the 215.`}
          >
            <ul className="mt-4 space-y-2 text-slate-700">
              {RESERVES_COLLECTION.plans.map((p) => (
                <li key={p.id}>
                  <strong>{p.name}:</strong> {p.summary}
                </li>
              ))}
            </ul>
          </HyperlocalIntro>

          <GeoEntityBlock title="Reserves entity facts (GEO)" />
          <LocalServicesBlock />
          <FAQSection
            faqs={faqs}
            title="Reserves FAQ"
            subtitle="Two-story plans, park notes, and first-visit registration"
          />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/reserves" />
        </div>
        <RealScoutListings />
      </main>
      <Footer />
    </>
  );
}
