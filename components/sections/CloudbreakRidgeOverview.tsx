import Link from "next/link";
import { Home, Trees, MapPin, Building2 } from "lucide-react";
import {
  CLOUDBREAK_RIDGE,
  ENCLAVES_COLLECTION,
  RESERVES_COLLECTION,
  NEARBY_AMENITIES,
} from "@/lib/cloudbreak-ridge";
import CloudbreakBuyerTips from "@/components/sections/CloudbreakBuyerTips";

export default function CloudbreakRidgeOverview() {
  return (
    <>
      <section
        className="py-16 md:py-20 bg-white"
        id="about-cloudbreak-ridge"
        aria-labelledby="cbr-about-heading"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-3">
            {CLOUDBREAK_RIDGE.builder} · Newest in Summerlin · {CLOUDBREAK_RIDGE.village}
          </p>
          <h2 id="cbr-about-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            What is Cloudbreak Ridge Homes?
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            {CLOUDBREAK_RIDGE.description}
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Two distinctive collections —{" "}
            <Link href="/enclaves" className="text-blue-600 font-semibold hover:underline">
              Enclaves
            </Link>{" "}
            and{" "}
            <Link href="/reserves" className="text-blue-600 font-semibold hover:underline">
              Reserves
            </Link>{" "}
            — are priced from {CLOUDBREAK_RIDGE.priceFrom}. Models and sales office:{" "}
            <strong>{CLOUDBREAK_RIDGE.address.full}</strong>.
          </p>
          <p className="text-slate-600 text-sm mb-4">
            {CLOUDBREAK_RIDGE.intersectionNote} Guided by {CLOUDBREAK_RIDGE.brandName} — Berkshire
            Hathaway HomeServices Nevada Properties.{" "}
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              Schedule a tour
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CLOUDBREAK_RIDGE.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Directions to {CLOUDBREAK_RIDGE.address.street}
            </a>
            <span className="text-slate-300">·</span>
            <a
              href={CLOUDBREAK_RIDGE.ctaPhoneTel}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Call {CLOUDBREAK_RIDGE.ctaPhone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50" id="enclaves" aria-labelledby="enclaves-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-start gap-3 mb-6">
            <Home className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" aria-hidden />
            <div>
              <h2 id="enclaves-heading" className="text-3xl font-bold text-slate-900 mb-2">
                <Link href="/enclaves" className="hover:text-blue-600">
                  {ENCLAVES_COLLECTION.name}
                </Link>
              </h2>
              <p className="text-slate-700 text-lg max-w-3xl">{ENCLAVES_COLLECTION.summary}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {ENCLAVES_COLLECTION.plans.map((plan) => (
              <article key={plan.id} className="bg-white border border-slate-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.summary}</p>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-slate-500">Square feet</dt>
                    <dd className="font-semibold text-slate-900">{plan.sqFt.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Stories</dt>
                    <dd className="font-semibold text-slate-900">Single-story</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Bedrooms</dt>
                    <dd className="font-semibold text-slate-900">{plan.bedrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Baths</dt>
                    <dd className="font-semibold text-slate-900">{plan.baths}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Garage</dt>
                    <dd className="font-semibold text-slate-900">{plan.garageBays}-car</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Access</dt>
                    <dd className="font-semibold text-slate-900">Gated</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/enclaves" className="text-blue-600 font-semibold hover:underline">
              Full Enclaves guide →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white" id="reserves" aria-labelledby="reserves-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-start gap-3 mb-6">
            <Building2 className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" aria-hidden />
            <div>
              <h2 id="reserves-heading" className="text-3xl font-bold text-slate-900 mb-2">
                <Link href="/reserves" className="hover:text-blue-600">
                  {RESERVES_COLLECTION.name}
                </Link>
              </h2>
              <p className="text-slate-700 text-lg max-w-3xl">{RESERVES_COLLECTION.summary}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {RESERVES_COLLECTION.plans.map((plan) => (
              <article
                key={plan.id}
                className="bg-slate-50 border border-slate-200 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4 text-sm">{plan.summary}</p>
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
          <p className="mt-6">
            <Link href="/reserves" className="text-blue-600 font-semibold hover:underline">
              Full Reserves guide →
            </Link>
          </p>
        </div>
      </section>

      <section
        className="py-16 bg-slate-900 text-white"
        id="amenities"
        aria-labelledby="amenities-heading"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-start gap-3 mb-8">
            <Trees className="h-8 w-8 text-blue-400 flex-shrink-0 mt-1" aria-hidden />
            <div>
              <h2 id="amenities-heading" className="text-3xl font-bold mb-2">
                Parks &amp; Summerlin access near Cloudbreak Ridge
              </h2>
              <p className="text-slate-300 text-lg max-w-3xl">
                La Madre Peaks recreation and quick valley access via the{" "}
                {CLOUDBREAK_RIDGE.accessibility.beltway}. Community address:{" "}
                {CLOUDBREAK_RIDGE.address.full}.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {NEARBY_AMENITIES.map((amenity) => (
              <article key={amenity.name}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-400" aria-hidden />
                  <h3 className="font-bold text-lg">{amenity.name}</h3>
                </div>
                <p className="text-xs text-blue-300 uppercase tracking-wide mb-2">
                  {amenity.type} · {amenity.status}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">{amenity.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CloudbreakBuyerTips />
    </>
  );
}
