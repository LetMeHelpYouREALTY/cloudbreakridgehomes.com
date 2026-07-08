import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { MapPin, Phone, Home, Trees } from "lucide-react";
import type { Metadata } from "next";
import { summerlinAreas } from "@/lib/summerlin-areas";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";
import { officeInfo, agentInfo, siteConfig } from "@/lib/site-config";
import CalendlyButton from "@/components/calendly/CalendlyButton";
import {
  HyperlocalIntro,
  LocalServicesBlock,
  LocalCtaBlock,
  LocalInternalLinks,
  AeoFaqList,
} from "@/components/sections/HyperlocalPageBlocks";
import { CLOUDBREAK_RIDGE_FAQS } from "@/lib/cloudbreak-ridge";
import { generateFAQSchema, generateRealEstateAgentSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Summerlin Neighborhoods Near Cloudbreak Ridge | La Madre Peaks",
  description:
    "Explore Summerlin West and La Madre Peaks communities near Cloudbreak Ridge Homes by Dr. Jan Duffy — Enclaves, Reserves, Downtown Summerlin®, The Ridges, Grand Park, and Red Rock access. 1168 Cloudbreak Cove Dr.",
  keywords: [
    "Cloudbreak Ridge Summerlin",
    "La Madre Peaks neighborhoods",
    "Summerlin West homes",
    "Enclaves at Cloudbreak Ridge",
    "Reserves at Cloudbreak Ridge",
    "Downtown Summerlin",
  ],
  alternates: { canonical: `${siteConfig.url}/neighborhoods` },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Summerlin neighborhoods near Cloudbreak Ridge",
  description:
    "Hyperlocal Summerlin and Summerlin West areas relevant to Cloudbreak Ridge / La Madre Peaks buyers.",
  itemListElement: summerlinAreas.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: area.name,
    url: area.href.startsWith("http")
      ? area.href
      : `${siteConfig.url}${area.href === "/" ? "" : area.href}`,
    description: area.description,
  })),
};

const placeSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${siteConfig.url}/neighborhoods#summerlin-hub`,
  name: "Summerlin West & La Madre Peaks",
  description:
    "Neighborhood guide centered on Cloudbreak Ridge by KB Home in La Madre Peaks, Summerlin West, Las Vegas, NV 89138.",
  address: {
    "@type": "PostalAddress",
    streetAddress: CLOUDBREAK_RIDGE.address.street,
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89138",
    addressCountry: "US",
  },
  containedInPlace: {
    "@type": "Place",
    name: "Summerlin",
  },
};

const faqSlice = CLOUDBREAK_RIDGE_FAQS.slice(0, 6).map((f) => ({
  question: f.question,
  answer: f.answer,
}));

const pageSchemas = [
  itemListSchema,
  placeSchema,
  generateRealEstateAgentSchema(),
  generateFAQSchema(faqSlice),
];

export default function NeighborhoodsPage() {
  return (
    <>
      <SchemaScript id="neighborhoods-schema" schemas={pageSchemas} />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Cloudbreak Ridge Homes by Dr. Jan Duffy
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Summerlin Neighborhoods Near Cloudbreak Ridge
            </h1>
            <p className="text-xl text-slate-600">
              Hyperlocal guide to La Madre Peaks, Summerlin West, and nearby Summerlin villages —
              focused on parks, trails, golf, gates, square footage, and commute times (215 /
              Downtown Summerlin® / Red Rock Canyon). No school rankings or crime labels.
            </p>
          </div>

          <HyperlocalIntro
            h2="Which Summerlin areas matter for Cloudbreak Ridge buyers?"
            lead="Start with La Madre Peaks and Cloudbreak Ridge (Enclaves and Reserves), then compare Grand Park proximity, Downtown Summerlin® (~5 minutes on the 215), The Ridges luxury resale, and Red Rock Canyon recreation — using amenities and commute facts, not demographic labels."
          />

          <section className="mb-16 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {summerlinAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={area.href}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-blue-300 group text-left"
                >
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {area.name}
                    </h2>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold text-slate-800 max-w-[10rem]">
                        {area.priceNote}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <LocalServicesBlock />
          <AeoFaqList faqs={faqSlice} title="Cloudbreak Ridge & Summerlin FAQ" />
          <LocalCtaBlock />
          <LocalInternalLinks excludeHref="/neighborhoods" />

          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                “Cloudbreak Ridge sits in La Madre Peaks with quick 215 access to Downtown
                Summerlin® and outdoor recreation toward Red Rock Canyon. I help buyers compare
                Enclaves vs Reserves floor plans, homesites, and timing — with independent
                representation from the first model visit.”
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, {agentInfo.brokerage}
              </cite>
            </div>
          </section>

          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">How we cover Summerlin West</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-3" aria-hidden />
                <h3 className="font-bold mb-2">Area tours</h3>
                <p className="text-slate-400 text-sm">
                  Drive Cloudbreak Cove, Grand Park, Downtown Summerlin®, and trailheads so you
                  feel commute times before you write an offer.
                </p>
              </div>
              <div className="text-center">
                <Trees className="h-12 w-12 text-blue-400 mx-auto mb-3" aria-hidden />
                <h3 className="font-bold mb-2">Amenities &amp; maps</h3>
                <p className="text-slate-400 text-sm">
                  Parks, golf adjacency, gates, and square-footage bands — factual location data,
                  not demographic labels.
                </p>
              </div>
              <div className="text-center">
                <Home className="h-12 w-12 text-blue-400 mx-auto mb-3" aria-hidden />
                <h3 className="font-bold mb-2">New construction</h3>
                <p className="text-slate-400 text-sm">
                  KB Home registration on visit one, contract review, and Enclaves vs Reserves
                  comparison.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 max-w-4xl mx-auto border border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Community &amp; office NAP</h2>
            <p className="text-slate-700 text-sm mb-2">
              <strong>Cloudbreak Ridge models:</strong> {CLOUDBREAK_RIDGE.address.full}
            </p>
            <p className="text-slate-700 text-sm mb-4">
              <strong>Brokerage office:</strong> {officeInfo.address.full} · {agentInfo.brokerage}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={CLOUDBREAK_RIDGE.ctaPhoneTel}
                className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" aria-hidden />
                {CLOUDBREAK_RIDGE.ctaPhone}
              </a>
              <CalendlyButton text="Book a consultation" />
              <a
                href={CLOUDBREAK_RIDGE.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border border-slate-300 px-5 py-2.5 rounded-md font-semibold"
              >
                Directions to models
              </a>
            </div>
          </section>

          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tour Cloudbreak Ridge with representation
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Register Dr. Jan Duffy before your first visit to 1168 Cloudbreak Cove Dr. so you keep
              independent buyer representation.
            </p>
            <a
              href={CLOUDBREAK_RIDGE.ctaPhoneTel}
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" aria-hidden />
              Call {CLOUDBREAK_RIDGE.ctaPhone}
            </a>
            <p className="mt-4 text-blue-200 text-sm">{agentInfo.brokerage}</p>
          </section>
        </div>

        <div className="text-center text-sm text-slate-500 mt-8">
          Last updated: July 2026 · Sources: summerlin.com (Jun 2, 2026), KB Home Reserves community
          page, La Madre Peaks community guides
        </div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
