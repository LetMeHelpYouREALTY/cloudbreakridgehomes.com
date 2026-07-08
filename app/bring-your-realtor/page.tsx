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
import { CLOUDBREAK_RIDGE, BRING_YOUR_REALTOR } from "@/lib/cloudbreak-ridge";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateRealEstateAgentSchema,
  combineSchemas,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Bring Your Realtor to Cloudbreak Ridge | First Visit Registration",
  description:
    "Builders usually require your buyer’s agent on the first model visit. Register Dr. Jan Duffy before touring Cloudbreak Ridge at 1168 Cloudbreak Cove Dr., La Madre Peaks. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/bring-your-realtor` },
  keywords: [
    "bring your realtor new construction",
    "KB Home agent registration",
    "Cloudbreak Ridge buyer agent",
    "first visit model home",
  ],
};

const faqs = [
  {
    question: "Why bring a Realtor to the first Cloudbreak Ridge visit?",
    answer: BRING_YOUR_REALTOR.body,
  },
  {
    question: "Is buyer representation free on KB Home new construction?",
    answer:
      "Buyer-agent compensation is typically paid through the builder’s co-op / marketing structure — you are not paying an extra fee for representation in the usual Summerlin new-construction arrangement. Confirm current terms before you write an offer.",
  },
  {
    question: "What address should I put in my GPS for Cloudbreak Ridge?",
    answer: `Use ${CLOUDBREAK_RIDGE.address.full}. Call 702-222-1964 so Dr. Jan Duffy can meet you or be registered before you sign the guest book.`,
  },
  {
    question: "What does Dr. Jan help with after registration?",
    answer:
      "Contract review, lot and elevation choices, design-center budgeting, Enclaves vs Reserves comparison, and coordination through closing — independent of the on-site sales team.",
  },
];

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  generateFAQSchema(faqs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Bring your Realtor", url: "/bring-your-realtor" },
  ])
);

export default function BringYourRealtorPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="bring-realtor-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-3">
              Cloudbreak Ridge · La Madre Peaks · Summerlin West
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Bring Your Realtor to the First Visit
            </h1>
            <p className="text-xl text-slate-600">
              Protect independent buyer representation at Cloudbreak Ridge by KB Home
            </p>
          </div>

        <RealScoutListings />

          <HyperlocalIntro
            h2="Do I need my agent at the first Cloudbreak Ridge model visit?"
            lead={`Yes — ${BRING_YOUR_REALTOR.body}`}
          />

          <GeoEntityBlock title="Where you register (community address)" />
          <LocalServicesBlock />
          <FAQSection
            faqs={faqs}
            title="First-visit FAQ"
            subtitle="Registration rules and how Dr. Jan helps at Cloudbreak Ridge"
          />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/bring-your-realtor" />
        </div>
</main>
      <Footer />
    </>
  );
}
