import Link from "next/link";
import {
  COMMUNITY_MAP_CENTER,
  AMENITY_CATEGORIES,
  type AmenityCategoryId,
} from "@/lib/amenities-map-config";
import { VERIFIED_NEARBY_PLACES } from "@/lib/nearby-amenities-content";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";

type AmenityMapFallbackProps = {
  showStaticList?: boolean;
  className?: string;
};

function formatAddress(p: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
}): string {
  return `${p.streetAddress}, ${p.addressLocality}, ${p.addressRegion} ${p.postalCode}`;
}

export default function AmenityMapFallback({
  showStaticList = true,
  className = "",
}: AmenityMapFallbackProps) {
  const byCategory = AMENITY_CATEGORIES.map((cat) => ({
    ...cat,
    places: VERIFIED_NEARBY_PLACES.filter((p) => p.category === cat.id),
  })).filter((g) => g.places.length > 0);

  const recreation = VERIFIED_NEARBY_PLACES.filter((p) => p.category === "recreation");

  return (
    <div className={className}>
      <div
        className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] max-h-[420px] w-full"
        role="region"
        aria-label={`Map of ${CLOUDBREAK_RIDGE.name} and surrounding area`}
      >
        <iframe
          title={`Google Map — ${COMMUNITY_MAP_CENTER.address}`}
          src={COMMUNITY_MAP_CENTER.embedUrl}
          className="w-full h-full min-h-[320px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {showStaticList && (
        <div className="mt-6 space-y-6">
          <p className="text-sm text-slate-600">
            Interactive amenity search requires a Google Maps API key in production. Below are
            verified nearby destinations for {CLOUDBREAK_RIDGE.name} buyers.
          </p>
          {byCategory.map((group) => (
            <div key={group.id}>
              <h3 className="font-semibold text-slate-900 mb-2">{group.label}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {group.places.map((place) => (
                  <li key={place.name}>
                    <strong>{place.name}</strong>
                    <span className="text-slate-500"> — {formatAddress(place)}</span>
                    {place.note && <p className="text-slate-600 mt-0.5">{place.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {recreation.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Outdoor recreation</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {recreation.map((place) => (
                  <li key={place.name}>
                    <strong>{place.name}</strong>
                    <span className="text-slate-500"> — {formatAddress(place)}</span>
                    {place.note && <p className="text-slate-600 mt-0.5">{place.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-sm">
            <Link href="/amenities" className="text-blue-600 font-medium hover:text-blue-800">
              View the full Nearby Amenities guide →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export function StaticAmenityChips({
  activeId,
  onSelect,
}: {
  activeId: AmenityCategoryId;
  onSelect?: (id: AmenityCategoryId) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2 mb-4"
      role="tablist"
      aria-label="Amenity categories (static preview)"
    >
      {AMENITY_CATEGORIES.map((cat) => {
        const selected = cat.id === activeId;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={`${cat.label} amenities`}
            disabled={!onSelect}
            onClick={() => onSelect?.(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selected
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
