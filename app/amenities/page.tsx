import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import SchemaScript from "@/components/SchemaScript";
import LazyWhenVisible from "@/components/shared/LazyWhenVisible";
import { LocalCtaBlock } from "@/components/sections/HyperlocalPageBlocks";
import FAQSection from "@/components/sections/FAQSection";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";
import { siteConfig, agentInfo, officeInfo } from "@/lib/site-config";
import {
  AMENITIES_PAGE_CATEGORY_COPY,
  AMENITIES_PAGE_FAQS,
  VERIFIED_NEARBY_PLACES,
} from "@/lib/nearby-amenities-content";
import { AMENITY_MAP_DEFAULT_HEIGHT_PX } from "@/lib/amenities-map-config";
import { generateAmenitiesPageSchemaBundle } from "@/lib/schema";

const AmenityMap = dynamic(() => import("@/components/maps/AmenityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl border border-slate-200 bg-slate-100 animate-pulse"
      style={{ height: AMENITY_MAP_DEFAULT_HEIGHT_PX, minHeight: 280 }}
      aria-hidden="true"
    />
  ),
});

export const metadata: Metadata = {
  title: `Nearby Amenities in ${CLOUDBREAK_RIDGE.name}, Las Vegas | Summerlin West`,
  description:
    "Interactive map and hyperlocal guide to parks, grocery, dining, healthcare, golf, and schools near Cloudbreak Ridge in La Madre Peaks, Summerlin West. Grand Park, Downtown Summerlin®, and CCSD schools. Call 702-222-1964.",
  alternates: { canonical: `${siteConfig.url}/amenities` },
  openGraph: {
    title: `Nearby Amenities in ${CLOUDBREAK_RIDGE.name}, Las Vegas`,
    description:
      "Parks, grocery, dining, healthcare, and schools near KB Home Cloudbreak Ridge at 1168 Cloudbreak Cove Dr.",
    url: `${siteConfig.url}/amenities`,
    type: "website",
  },
  keywords: [
    "Cloudbreak Ridge amenities",
    "La Madre Peaks parks",
    "Summerlin West grocery",
    "Grand Park Summerlin",
    "schools near Cloudbreak Ridge",
  ],
};

const faqs = [...AMENITIES_PAGE_FAQS];
const jsonLd = generateAmenitiesPageSchemaBundle(faqs);

function formatVerifiedAddress(p: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
}): string {
  return `${p.streetAddress}, ${p.addressLocality}, ${p.addressRegion} ${p.postalCode}`;
}

export default function AmenitiesPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="amenities-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <PageHero
            heroKey="amenities"
            badge="Summerlin West · La Madre Peaks"
            title={`Nearby Amenities in ${CLOUDBREAK_RIDGE.name}, Las Vegas`}
            subtitle={`Hyperlocal map and guide for buyers at ${CLOUDBREAK_RIDGE.address.full} — parks, errands, healthcare, golf, and schools in ${CLOUDBREAK_RIDGE.village}.`}
          />

          <section className="mb-14" aria-labelledby="amenities-map-heading">
            <h2 id="amenities-map-heading" className="text-2xl font-bold text-slate-900 mb-4">
              Interactive amenity map
            </h2>
            <p className="text-slate-700 mb-6">
              Centered on {CLOUDBREAK_RIDGE.name} at the KB Home models. Switch categories to
              explore restaurants, cafes, grocery, parks, golf, healthcare, pharmacies, shopping,
              parking, fitness, and schools within about {COMMUNITY_RADIUS_LABEL} of the community.
            </p>
            <LazyWhenVisible minHeight={AMENITY_MAP_DEFAULT_HEIGHT_PX + 96}>
              <AmenityMap showFallbackList height={AMENITY_MAP_DEFAULT_HEIGHT_PX + 40} />
            </LazyWhenVisible>
          </section>

          {AMENITIES_PAGE_CATEGORY_COPY.map((section) => (
            <section key={section.id} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.heading}</h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                {section.paragraphs.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mb-14" aria-labelledby="verified-places-heading">
            <h2 id="verified-places-heading" className="text-2xl font-bold text-slate-900 mb-4">
              Featured nearby places (verified addresses)
            </h2>
            <ul className="space-y-4 text-slate-700">
              {VERIFIED_NEARBY_PLACES.map((place) => (
                <li key={place.name} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-slate-900">{place.name}</h3>
                  <p className="text-sm text-slate-600">{formatVerifiedAddress(place)}</p>
                  {place.note && <p className="text-sm mt-1">{place.note}</p>}
                </li>
              ))}
            </ul>
          </section>

          <FAQSection
            faqs={faqs}
            title="Nearby amenities FAQ"
            subtitle={`What buyers ask about living near ${CLOUDBREAK_RIDGE.name}`}
          />

          <section
            className="mb-14 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8"
            aria-labelledby="agent-trust-heading"
          >
            <h2 id="agent-trust-heading" className="text-2xl font-bold text-slate-900 mb-3">
              Your local Realtor for {CLOUDBREAK_RIDGE.name}
            </h2>
            <p className="text-slate-700 mb-4">
              {agentInfo.name}, {agentInfo.title}, represents buyers at Enclaves and Reserves with{" "}
              {agentInfo.brokerage}. Register before your first KB Home visit so you keep independent
              representation while comparing floorplans and homesites.
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Client line: {CLOUDBREAK_RIDGE.ctaPhone}</li>
              <li>Office: {officeInfo.address.full}</li>
              <li>License {agentInfo.license}</li>
              <li>Email: {agentInfo.email}</li>
            </ul>
          </section>

          <LocalCtaBlock showCommunityMap={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}

const COMMUNITY_RADIUS_LABEL = "8 km";
