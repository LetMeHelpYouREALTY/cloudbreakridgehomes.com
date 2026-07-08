import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
import {
  HyperlocalIntro,
  LocalServicesBlock,
  LocalCtaBlock,
  LocalInternalLinks,
} from "@/components/sections/HyperlocalPageBlocks";
import {
  EnclavesVsReservesComparisonBlock,
  FloorPlansOverviewBlock,
} from "@/components/sections/CloudbreakContentBlocks";
import {
  CLOUDBREAK_RIDGE,
  ENCLAVES_VS_RESERVES,
  COMPARISON_FAQS,
} from "@/lib/cloudbreak-ridge";
import { siteConfig } from "@/lib/site-config";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateRealEstateAgentSchema,
  generateCloudbreakCollectionSchema,
  generateCloudbreakRidgePlaceSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Enclaves vs Reserves at Cloudbreak Ridge | Which KB Home Collection?",
  description:
    "Compare Enclaves (single-story, ~2,251–2,387 sq ft) vs Reserves (two-story, ~2,753–3,095 sq ft) at Cloudbreak Ridge in La Madre Peaks. Gated KB Home from the $800,000s. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/enclaves-vs-reserves` },
  keywords: [
    "Enclaves vs Reserves Cloudbreak Ridge",
    "Cloudbreak Ridge comparison",
    "single story vs two story Summerlin",
    "KB Home La Madre Peaks",
  ],
};

const faqs = [...COMPARISON_FAQS];

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  generateCloudbreakCollectionSchema("Enclaves", "/enclaves"),
  generateCloudbreakCollectionSchema("Reserves", "/reserves"),
  generateCloudbreakRidgePlaceSchema(),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Enclaves vs Reserves", url: "/enclaves-vs-reserves" },
  ])
);

export default function EnclavesVsReservesPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="enclaves-vs-reserves-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Cloudbreak Ridge · La Madre Peaks · Summerlin West
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Enclaves vs Reserves at Cloudbreak Ridge
            </h1>
            <p className="text-xl text-slate-600">
              Side-by-side comparison of KB Home&apos;s two gated collections at{" "}
              {CLOUDBREAK_RIDGE.address.full}
            </p>
          </div>

          <RealScoutListings />

          <HyperlocalIntro
            h2="Should I buy in Enclaves or Reserves?"
            lead={ENCLAVES_VS_RESERVES.directAnswer}
          />

          <EnclavesVsReservesComparisonBlock showFullGuideLink={false} />
          <FloorPlansOverviewBlock showCompareLink={false} />
          <LocalServicesBlock />
          <FAQSection
            faqs={faqs}
            title="Enclaves vs Reserves FAQ"
            subtitle="Pricing, square footage, and which collection fits your household"
          />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/enclaves-vs-reserves" />
        </div>
      </main>
      <Footer />
    </>
  );
}
