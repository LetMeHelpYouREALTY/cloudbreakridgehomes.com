import Link from "next/link";
import { GraduationCap, MapPinned, Building2, LayoutGrid } from "lucide-react";
import {
  CLOUDBREAK_RIDGE,
  SCHOOLS_NEAR_CLOUDBREAK,
  SCHOOLS_DISCLAIMER,
  COMMUTE_AND_ACCESS,
  SUMMERLIN_MASTER_AMENITIES,
  ENCLAVES_VS_RESERVES,
  ENCLAVES_COLLECTION,
  RESERVES_COLLECTION,
} from "@/lib/cloudbreak-ridge";

export function SchoolsNearCommunityBlock({
  showSchoolsGuideLink = true,
}: {
  showSchoolsGuideLink?: boolean;
}) {
  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 flex items-center gap-2">
        <GraduationCap className="h-7 w-7 text-blue-600 shrink-0" aria-hidden />
        What schools are near Cloudbreak Ridge?
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        KB Home lists the following Clark County School District campuses for buyers at{" "}
        {CLOUDBREAK_RIDGE.name} in {CLOUDBREAK_RIDGE.village} (May 2026 opening materials). Tour
        campuses and confirm zoning for your specific homesite before you write an offer.
      </p>
      <ul className="space-y-4 mb-6">
        {SCHOOLS_NEAR_CLOUDBREAK.map((school) => (
          <li
            key={school.name}
            className="border border-slate-200 rounded-lg p-4 bg-white"
          >
            <h3 className="font-semibold text-slate-900">{school.name}</h3>
            <p className="text-sm text-blue-700 font-medium">{school.level}</p>
            <p className="text-sm text-slate-600 mt-1">{school.note}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500 mb-4">{SCHOOLS_DISCLAIMER}</p>
      {showSchoolsGuideLink && (
        <Link
          href="/schools"
          className="text-blue-600 font-medium hover:text-blue-800 text-sm"
        >
          Full schools guide for Cloudbreak Ridge →
        </Link>
      )}
    </section>
  );
}

export function CommuteAndAccessBlock() {
  return (
    <section className="mb-14 max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
        <MapPinned className="h-6 w-6 text-blue-600 shrink-0" aria-hidden />
        {COMMUTE_AND_ACCESS.heading}
      </h2>
      <p className="text-slate-700 mb-6">{COMMUTE_AND_ACCESS.summary}</p>
      <dl className="space-y-4">
        {COMMUTE_AND_ACCESS.items.map((item) => (
          <div key={item.label}>
            <dt className="font-semibold text-slate-900">{item.label}</dt>
            <dd className="text-sm text-slate-600 mt-1">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function SummerlinMasterAmenitiesBlock() {
  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 flex items-center gap-2">
        <Building2 className="h-7 w-7 text-blue-600 shrink-0" aria-hidden />
        {SUMMERLIN_MASTER_AMENITIES.heading}
      </h2>
      <p className="text-slate-700 mb-4 leading-relaxed">{SUMMERLIN_MASTER_AMENITIES.intro}</p>
      <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm">
        {SUMMERLIN_MASTER_AMENITIES.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function FloorPlansOverviewBlock({ showCompareLink = true }: { showCompareLink?: boolean }) {
  const collections = [ENCLAVES_COLLECTION, RESERVES_COLLECTION];

  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 flex items-center gap-2">
        <LayoutGrid className="h-7 w-7 text-blue-600 shrink-0" aria-hidden />
        KB Home floor plans at Cloudbreak Ridge
      </h2>
      <p className="text-slate-700 mb-6">
        {CLOUDBREAK_RIDGE.collectionSplit.totalHomesites} homesites across{" "}
        {CLOUDBREAK_RIDGE.collectionSplit.enclavesHomesites} Enclaves and{" "}
        {CLOUDBREAK_RIDGE.collectionSplit.reservesHomesites} Reserves lots — five floor plans from{" "}
        {CLOUDBREAK_RIDGE.priceFrom}. Confirm live pricing and premiums with the builder.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {collections.map((col) => (
          <div key={col.slug} className="border border-slate-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{col.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{col.summary}</p>
            <ul className="text-sm text-slate-700 space-y-2">
              {col.plans.map((p) => (
                <li key={p.id}>
                  <strong>{p.name}:</strong> ~{p.sqFt.toLocaleString()} sq ft · {p.bedrooms} bd ·{" "}
                  {p.baths} ba
                </li>
              ))}
            </ul>
            <Link
              href={`/${col.slug}`}
              className="inline-block mt-4 text-blue-600 font-medium text-sm hover:text-blue-800"
            >
              View {col.name} →
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/floor-plans" className="text-blue-600 font-medium hover:text-blue-800">
          All floor plans guide →
        </Link>
        {showCompareLink && (
          <Link
            href="/enclaves-vs-reserves"
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            Enclaves vs Reserves comparison →
          </Link>
        )}
      </div>
    </section>
  );
}

export function EnclavesVsReservesComparisonBlock({
  showFullGuideLink = true,
}: {
  showFullGuideLink?: boolean;
}) {
  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
        {ENCLAVES_VS_RESERVES.heading}
      </h2>
      <p className="text-lg text-slate-800 font-medium mb-6 leading-relaxed">
        {ENCLAVES_VS_RESERVES.directAnswer}
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-900">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Feature
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Enclaves
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Reserves
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {ENCLAVES_VS_RESERVES.rows.map((row) => (
              <tr key={row.label} className="bg-white">
                <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-slate-700">{row.enclaves}</td>
                <td className="px-4 py-3 text-slate-700">{row.reserves}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showFullGuideLink && (
        <Link
          href="/enclaves-vs-reserves"
          className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800 text-sm"
        >
          Full Enclaves vs Reserves buyer guide →
        </Link>
      )}
    </section>
  );
}
