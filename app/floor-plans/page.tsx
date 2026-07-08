import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
import {
  HyperlocalIntro,
  GeoEntityBlock,
  LocalCtaBlock,
  LocalInternalLinks,
} from "@/components/sections/HyperlocalPageBlocks";
import {
  FloorPlansOverviewBlock,
  EnclavesVsReservesComparisonBlock,
} from "@/components/sections/CloudbreakContentBlocks";
import {
  CLOUDBREAK_RIDGE,
  ENCLAVES_COLLECTION,
  RESERVES_COLLECTION,
  FLOOR_PLANS_FAQS,
} from "@/lib/cloudbreak-ridge";
import { siteConfig } from "@/lib/site-config";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateRealEstateAgentSchema,
  generateCloudbreakRidgeCommunitySchema,
  generateCloudbreakFloorPlanItemListSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cloudbreak Ridge Floor Plans | KB Home Enclaves & Reserves",
  description:
    "All five KB Home floor plans at Cloudbreak Ridge: Enclaves Plan 2251 & 2387 (single-story) and Reserves Plan 2753, 2989 & 3095 (two-story) in La Madre Peaks. From the $800,000s. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/floor-plans` },
  keywords: [
    "Cloudbreak Ridge floor plans",
    "KB Home Plan 2251",
    "KB Home Plan 3095",
    "Enclaves floor plans",
    "Reserves floor plans Summerlin",
  ],
};

const faqs = [...FLOOR_PLANS_FAQS];

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  generateCloudbreakRidgeCommunitySchema(),
  generateCloudbreakFloorPlanItemListSchema(),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Floor plans", url: "/floor-plans" },
  ])
);

export default function FloorPlansPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="floor-plans-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Cloudbreak Ridge Homes by Dr. Jan Duffy
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Cloudbreak Ridge Floor Plans
            </h1>
            <p className="text-xl text-slate-600">
              Five KB Home plans across gated Enclaves and Reserves — models at{" "}
              {CLOUDBREAK_RIDGE.address.full}
            </p>
          </div>

          <RealScoutListings />

          <HyperlocalIntro
            h2="How many floor plans does Cloudbreak Ridge offer?"
            lead={`Cloudbreak Ridge has five KB Home floor plans: two single-story plans in ${ENCLAVES_COLLECTION.name} and three two-story plans in ${RESERVES_COLLECTION.name}. Square footage runs from about 2,251 to 3,095 sq ft, priced from ${CLOUDBREAK_RIDGE.priceFrom}.`}
          />

          <FloorPlansOverviewBlock showCompareLink />

          <section className="mb-14 max-w-4xl mx-auto space-y-10">
            {[ENCLAVES_COLLECTION, RESERVES_COLLECTION].map((col) => (
              <div key={col.slug}>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{col.name}</h2>
                <p className="text-slate-600 mb-4 text-sm">{col.summary}</p>
                <div className="space-y-4">
                  {col.plans.map((plan) => (
                    <article
                      key={plan.id}
                      className="border border-slate-200 rounded-lg p-5"
                      itemScope
                      itemType="https://schema.org/Residence"
                    >
                      <h3 className="text-lg font-semibold text-slate-900" itemProp="name">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-blue-700 font-medium mb-2">{plan.collection}</p>
                      <p className="text-slate-700 text-sm leading-relaxed" itemProp="description">
                        {plan.summary}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <EnclavesVsReservesComparisonBlock />
          <GeoEntityBlock title="Where to tour these floor plans" />
          <FAQSection
            faqs={faqs}
            title="Floor plan FAQ"
            subtitle="Sizes, bedrooms, and collection differences at Cloudbreak Ridge"
          />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/floor-plans" />
        </div>
      </main>
      <Footer />
    </>
  );
}
