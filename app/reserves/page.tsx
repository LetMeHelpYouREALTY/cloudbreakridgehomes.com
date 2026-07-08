import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import CalendlyButton from "@/components/calendly/CalendlyButton";
import CloudbreakBuyerTips from "@/components/sections/CloudbreakBuyerTips";
import SchemaScript from "@/components/SchemaScript";
import {
  generateCloudbreakCollectionSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import {
  CLOUDBREAK_RIDGE,
  RESERVES_COLLECTION,
  RESERVES_FAQS,
} from "@/lib/cloudbreak-ridge";
import { officeInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Reserves at Cloudbreak Ridge | Two-Story KB Home | Summerlin",
  description:
    "Reserves at Cloudbreak Ridge by KB Home — two-story plans ~2,753–3,095 sq ft with planned park in La Madre Peaks. 1168 Cloudbreak Cove Dr. Register Dr. Jan Duffy at 702-222-1964 before your first visit.",
  alternates: { canonical: "https://cloudbreakridgehomes.com/reserves" },
};

export default function ReservesPage() {
  return (
    <>
      <SchemaScript
        id="reserves-schema"
        schemas={[
          generateCloudbreakCollectionSchema("Reserves", "/reserves"),
          generateFAQSchema(
            RESERVES_FAQS.map((f) => ({ question: f.question, answer: f.answer }))
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Reserves at Cloudbreak Ridge", url: "/reserves" },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-3">
            {CLOUDBREAK_RIDGE.builder} · {CLOUDBREAK_RIDGE.village} · {CLOUDBREAK_RIDGE.masterPlan}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Reserves at Cloudbreak Ridge
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mb-2">
            {RESERVES_COLLECTION.summary}
          </p>
          <p className="text-slate-600 mb-6">
            {RESERVES_COLLECTION.parkNote} Priced from {CLOUDBREAK_RIDGE.priceFrom}. Sales office:{" "}
            {CLOUDBREAK_RIDGE.address.full}.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={CLOUDBREAK_RIDGE.ctaPhoneTel}
              className="inline-flex bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-blue-700"
            >
              Call {CLOUDBREAK_RIDGE.ctaPhone}
            </a>
            <CalendlyButton text="Schedule consultation" />
            <a
              href={CLOUDBREAK_RIDGE.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-slate-300 px-5 py-2.5 rounded-md font-semibold text-slate-800 hover:bg-slate-50"
            >
              Directions
            </a>
            <Link
              href="/enclaves"
              className="inline-flex border border-slate-300 px-5 py-2.5 rounded-md font-semibold text-slate-800 hover:bg-slate-50"
            >
              Compare Enclaves
            </Link>
          </div>

          <section className="mb-12" aria-labelledby="reserves-plans">
            <h2 id="reserves-plans" className="text-2xl font-bold text-slate-900 mb-6">
              Reserves floor plans
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {RESERVES_COLLECTION.plans.map((plan) => (
                <article
                  key={plan.id}
                  className="border border-slate-200 rounded-lg p-6 bg-slate-50"
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{plan.summary}</p>
                  <ul className="text-sm space-y-1 text-slate-700">
                    <li>
                      <span className="text-slate-500">Size: </span>
                      {plan.sqFt.toLocaleString()} sq ft
                    </li>
                    <li>
                      <span className="text-slate-500">Beds: </span>
                      {plan.bedrooms}
                    </li>
                    <li>
                      <span className="text-slate-500">Baths: </span>
                      {plan.baths}
                    </li>
                    <li>
                      <span className="text-slate-500">Garage: </span>
                      {plan.garageBays}-car · two-story
                    </li>
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Community NAP</h2>
              <p className="text-slate-700">
                <strong>{CLOUDBREAK_RIDGE.brandName}</strong>
                <br />
                {CLOUDBREAK_RIDGE.address.full}
                <br />
                <a href={CLOUDBREAK_RIDGE.ctaPhoneTel} className="text-blue-600 hover:underline">
                  {CLOUDBREAK_RIDGE.ctaPhone}
                </a>
              </p>
              <p className="text-sm text-slate-500 mt-3">
                Brokerage office (not the models): {officeInfo.address.full}
              </p>
              <iframe
                title="Map to Cloudbreak Ridge models"
                src={CLOUDBREAK_RIDGE.mapsEmbedUrl}
                className="mt-4 w-full h-56 rounded-lg border border-slate-200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Reserves FAQ</h2>
              <div className="space-y-4">
                {RESERVES_FAQS.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                    <p className="text-slate-600 text-sm mt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <CloudbreakBuyerTips />
      </main>
      <Footer />
    </>
  );
}
