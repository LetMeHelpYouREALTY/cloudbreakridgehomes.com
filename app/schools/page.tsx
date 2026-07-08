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
import { SchoolsNearCommunityBlock } from "@/components/sections/CloudbreakContentBlocks";
import {
  CLOUDBREAK_RIDGE,
  SCHOOLS_NEAR_CLOUDBREAK,
  SCHOOLS_DISCLAIMER,
  SCHOOLS_FAQS,
} from "@/lib/cloudbreak-ridge";
import { siteConfig } from "@/lib/site-config";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateRealEstateAgentSchema,
  generateCloudbreakRidgePlaceSchema,
  generateCloudbreakSchoolsSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Schools Near Cloudbreak Ridge | La Madre Peaks Summerlin",
  description:
    "Schools near Cloudbreak Ridge by KB Home: Linda Rankin Givens Elementary, Sig Rogich Middle, and Palo Verde High (per KB Home, 2026). Verify CCSD zoning before you buy. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/schools` },
  keywords: [
    "Cloudbreak Ridge schools",
    "La Madre Peaks schools",
    "Summerlin West schools",
    "Sig Rogich Middle School",
    "Palo Verde High School",
  ],
};

const faqs = [...SCHOOLS_FAQS];

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  generateCloudbreakRidgePlaceSchema(),
  generateCloudbreakSchoolsSchema(),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Schools near Cloudbreak Ridge", url: "/schools" },
  ])
);

export default function SchoolsPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="schools-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Cloudbreak Ridge · La Madre Peaks · Summerlin West
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Schools Near Cloudbreak Ridge
            </h1>
            <p className="text-xl text-slate-600">
              CCSD campuses cited by KB Home for buyers at {CLOUDBREAK_RIDGE.address.full}
            </p>
          </div>

          <RealScoutListings />

          <HyperlocalIntro
            h2="What schools serve Cloudbreak Ridge in Summerlin?"
            lead={`KB Home lists Linda Rankin Givens Elementary School, Sig Rogich Middle School, and Palo Verde High School for ${CLOUDBREAK_RIDGE.name} (May 2026). ${SCHOOLS_DISCLAIMER}`}
          >
            <ul className="mt-4 space-y-3">
              {SCHOOLS_NEAR_CLOUDBREAK.map((s) => (
                <li key={s.name} className="text-slate-700">
                  <strong>{s.name}</strong> ({s.level}) — {s.district}
                </li>
              ))}
            </ul>
          </HyperlocalIntro>

          <SchoolsNearCommunityBlock showSchoolsGuideLink={false} />
          <GeoEntityBlock title="Community location for school zoning lookups" />
          <FAQSection
            faqs={faqs}
            title="Schools FAQ"
            subtitle="How to verify CCSD assignments before you buy at Cloudbreak Ridge"
          />
          <LocalCtaBlock showCommunityMap={false} />
          <LocalInternalLinks excludeHref="/schools" />
        </div>
      </main>
      <Footer />
    </>
  );
}
