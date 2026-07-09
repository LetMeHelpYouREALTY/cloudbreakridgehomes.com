import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import PageHero from "@/components/sections/PageHero";
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
} from "@/components/sections/CloudbreakContentBlocks";
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
          <PageHero
            heroKey="reserves"
            badge="Cloudbreak Ridge Homes by Dr. Jan Duffy · La Madre Peaks"
            title="Reserves at Cloudbreak Ridge"
            subtitle={`Larger two-story KB Home collection in ${CLOUDBREAK_RIDGE.village} — ${RESERVES_COLLECTION.parkNote}`}
          />

        <RealScoutListings />

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

          <GeoEntityBlock title="About the Reserves at Cloudbreak Ridge" />
          <SchoolsNearCommunityBlock />
          <CommuteAndAccessBlock />
          <SummerlinMasterAmenitiesBlock />
          <LocalServicesBlock />
          <FAQSection
            faqs={faqs}
            title="Reserves FAQ"
            subtitle="Two-story plans, park notes, and first-visit registration"
          />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/reserves" />
        </div>
</main>
      <Footer />
    </>
  );
}
