import Link from "next/link";
import { MapPin, Home, Trees, Phone } from "lucide-react";
import {
  CLOUDBREAK_RIDGE,
  ENCLAVES_COLLECTION,
  RESERVES_COLLECTION,
  NEARBY_AMENITIES,
  BRING_YOUR_REALTOR,
  WHY_BUY_EARLY,
} from "@/lib/cloudbreak-ridge";

/**
 * Homepage overview for Cloudbreak Ridge — hyperlocal intro under hero.
 */
export default function CloudbreakRidgeOverview() {
  return (
    <section id="about-cloudbreak-ridge" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
          What is Cloudbreak Ridge in La Madre Peaks?
        </h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          {CLOUDBREAK_RIDGE.description} Models and the KB Home sales office are at{" "}
          <strong>{CLOUDBREAK_RIDGE.address.full}</strong> — {CLOUDBREAK_RIDGE.intersectionNote}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/enclaves"
            className="border border-slate-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <Home className="h-5 w-5 text-blue-600" aria-hidden />
              <h3 className="text-xl font-bold text-slate-900">{ENCLAVES_COLLECTION.name}</h3>
            </div>
            <p className="text-slate-600 text-sm mb-3">{ENCLAVES_COLLECTION.summary}</p>
            <ul className="text-sm text-slate-600 space-y-1">
              {ENCLAVES_COLLECTION.plans.map((p) => (
                <li key={p.id}>
                  {p.name}: ~{p.sqFt.toLocaleString()} sq ft · {p.bedrooms} bd · {p.baths} ba
                </li>
              ))}
            </ul>
          </Link>
          <Link
            href="/reserves"
            className="border border-slate-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <Trees className="h-5 w-5 text-blue-600" aria-hidden />
              <h3 className="text-xl font-bold text-slate-900">{RESERVES_COLLECTION.name}</h3>
            </div>
            <p className="text-slate-600 text-sm mb-3">{RESERVES_COLLECTION.summary}</p>
            <ul className="text-sm text-slate-600 space-y-1">
              {RESERVES_COLLECTION.plans.map((p) => (
                <li key={p.id}>
                  {p.name}: ~{p.sqFt.toLocaleString()} sq ft · {p.bedrooms} bd · {p.baths} ba
                </li>
              ))}
            </ul>
          </Link>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 md:p-8 mb-10">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" aria-hidden />
            Nearby amenities (amenities &amp; commute — not school rankings)
          </h3>
          <ul className="space-y-3 text-sm text-slate-700">
            {NEARBY_AMENITIES.map((a) => (
              <li key={a.name}>
                <strong>{a.name}</strong> ({a.status}): {a.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">{WHY_BUY_EARLY.heading}</h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
              {WHY_BUY_EARLY.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-2">{BRING_YOUR_REALTOR.heading}</h3>
            <p className="text-sm text-slate-600 mb-4">{BRING_YOUR_REALTOR.body}</p>
            <a
              href={CLOUDBREAK_RIDGE.ctaPhoneTel}
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
            >
              <Phone className="h-4 w-4 mr-2" aria-hidden />
              Call {CLOUDBREAK_RIDGE.ctaPhone} before you visit
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/enclaves" className="text-blue-600 font-medium hover:underline">
            Enclaves floor plans
          </Link>
          <Link href="/reserves" className="text-blue-600 font-medium hover:underline">
            Reserves floor plans
          </Link>
          <Link href="/la-madre-peaks" className="text-blue-600 font-medium hover:underline">
            La Madre Peaks guide
          </Link>
          <Link href="/bring-your-realtor" className="text-blue-600 font-medium hover:underline">
            Bring your Realtor
          </Link>
          <Link href="/neighborhoods" className="text-blue-600 font-medium hover:underline">
            Summerlin West neighborhoods
          </Link>
        </div>
      </div>
    </section>
  );
}
