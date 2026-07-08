import Navbar from "@/components/layouts/Navbar";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import HeroBackground from "@/components/sections/HeroBackground";
import LazyWhenVisible from "@/components/shared/LazyWhenVisible";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import CloudbreakRidgeOverview from "@/components/sections/CloudbreakRidgeOverview";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { Phone, Home as HomeIcon, TrendingUp, Shield, Users } from "lucide-react";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { getFaqsForDomain } from "@/lib/faq-config";
import CalendlyBookingSection from "@/components/calendly/CalendlyBookingSection";
import {
  generateRealEstateAgentSchema,
  generateFAQSchema,
  generateCloudbreakRidgeCommunitySchema,
  generateCloudbreakRidgePlaceSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";

const FAQ_SECTION_COPY: Record<string, { title: string; subtitle: string }> = {
  community: {
    title: "Community Real Estate FAQ",
    subtitle: "Common questions from buyers and sellers in this neighborhood",
  },
  luxury: {
    title: "Luxury Las Vegas Real Estate FAQ",
    subtitle: "What high-end buyers and sellers ask Dr. Jan most",
  },
  "55plus": {
    title: "55+ Community FAQ",
    subtitle: "Everything active-adult buyers need to know before moving",
  },
  search: {
    title: "Las Vegas Home Search FAQ",
    subtitle: "Straight answers from a 30-year Las Vegas market expert",
  },
  lifestyle: {
    title: "Moving to Las Vegas FAQ",
    subtitle: "What relocating buyers ask Dr. Jan most often",
  },
  investment: {
    title: "Las Vegas Investment Property FAQ",
    subtitle: "Numbers, strategy, and market insight for investors",
  },
};

export default async function Home() {
  const config = await getPageDomainConfig();
  const faqs = getFaqsForDomain(config.pageType, config.domain);
  const faqCopy = FAQ_SECTION_COPY[config.pageType] ?? FAQ_SECTION_COPY.search;
  const isCloudbreak =
    config.domain === "cloudbreakridgehomes.com" || config.domain === "default";

  const faqTitle = isCloudbreak
    ? "Cloudbreak Ridge FAQ"
    : config.pageType === "community" || config.pageType === "55plus"
      ? `${config.neighborhood} FAQ`
      : faqCopy.title;

  const faqSubtitle = isCloudbreak
    ? "Direct answers about La Madre Peaks, Enclaves, Reserves, and nearby Summerlin parks"
    : faqCopy.subtitle;

  const agentSchema = generateRealEstateAgentSchema();
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: CLOUDBREAK_RIDGE.name, url: "/#about-cloudbreak-ridge" },
  ]);

  const jsonLd = isCloudbreak
    ? combineSchemas(
        agentSchema,
        generateCloudbreakRidgeCommunitySchema(),
        generateCloudbreakRidgePlaceSchema(),
        faqSchema,
        breadcrumbSchema
      )
    : combineSchemas(agentSchema, faqSchema);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
          <HeroBackground />
          <div className="relative z-10 container mx-auto px-4 text-center">
            {config.ctaBadge && (
              <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6">
                {config.ctaBadge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
              {config.heroSubheadline}
            </p>

            <div className="mb-8 flex justify-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<realscout-simple-search agent-encoded-id="${config.realscoutAgentId}"></realscout-simple-search>`,
                }}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">La Madre Peaks</span>
                <span>Newest Summerlin village</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">From $800s</span>
                <span>Enclaves &amp; Reserves</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">~5 min</span>
                <span>to Downtown Summerlin®</span>
              </div>
            </div>
          </div>
        </section>

        {isCloudbreak && <CloudbreakRidgeOverview />}

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Work With Dr. Jan Duffy at Cloudbreak Ridge?
              </h2>
              <p className="text-lg text-slate-600">
                Local guidance for Summerlin&apos;s newest neighborhood — Berkshire Hathaway
                HomeServices Nevada Properties.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "Trusted Brand",
                  desc: "Backed by Warren Buffett's Berkshire Hathaway — unmatched integrity",
                },
                {
                  icon: Users,
                  title: "New Construction Help",
                  desc: "Independent buyer representation for Enclaves and Reserves floorplans",
                },
                {
                  icon: TrendingUp,
                  title: "$127M+ Sold",
                  desc: "Proven Summerlin and Las Vegas results since 2008",
                },
                {
                  icon: HomeIcon,
                  title: "La Madre Peaks Focus",
                  desc: "Scout’s Point, Grand Park, and 215 Beltway access — mapped for you",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-6">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Cloudbreak Ridge home collections at a glance
              </h2>
              <p className="text-slate-600">
                Pricing from {CLOUDBREAK_RIDGE.priceFrom} · {CLOUDBREAK_RIDGE.village},{" "}
                {CLOUDBREAK_RIDGE.masterPlan}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "$800s+", label: "Starting prices", sub: "Builder pricing varies" },
                { value: "2", label: "Collections", sub: "Enclaves & Reserves" },
                { value: "5", label: "Floorplans", sub: "2,251–3,095 sq ft" },
                { value: "215", label: "Beltway access", sub: "~5 min to Downtown Summerlin®" },
              ].map(({ value, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-1">{value}</div>
                  <div className="text-slate-700 text-sm font-medium">{label}</div>
                  {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Ask about available lots
              </Link>
            </div>
          </div>
        </section>

        <LazyWhenVisible minHeight={480}>
          <RealScoutListings />
        </LazyWhenVisible>
        <WhyChooseUs />
        <ReviewsSection />

        <FAQSection faqs={faqs} title={faqTitle} subtitle={faqSubtitle} />

        <section className="py-16 md:py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{config.ctaHeadline}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{config.ctaSubheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="tel:+17022221964"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 702-222-1964
              </a>
              <Link
                href="/contact"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                View Contact Info
              </Link>
            </div>
            <LazyWhenVisible minHeight={700}>
              <CalendlyBookingSection
                title="Book Your Buyer Consultation"
                subtitle="Schedule a free 30-minute consultation to compare Enclaves and Reserves at Cloudbreak Ridge."
                variant="dark"
              />
            </LazyWhenVisible>
            <p className="mt-6 text-blue-200 text-sm">
              Dr. Jan Duffy | License S.0197614.LLC | Berkshire Hathaway HomeServices Nevada
              Properties
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
