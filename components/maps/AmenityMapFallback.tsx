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
  activeCategory?: AmenityCategoryId;
  onCategoryChange?: (id: AmenityCategoryId) => void;
};

function formatAddress(p: {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
}): string {
  return `${p.streetAddress}, ${p.addressLocality}, ${p.addressRegion} ${p.postalCode}`;
}

const FALLBACK_EMBED_URL = `https://www.google.com/maps?q=${COMMUNITY_MAP_CENTER.lat},${COMMUNITY_MAP_CENTER.lng}&z=14&output=embed`;

export default function AmenityMapFallback({
  showStaticList = true,
  className = "",
  activeCategory,
  onCategoryChange,
}: AmenityMapFallbackProps) {
  const categoryFilter = activeCategory;
  const byCategory = AMENITY_CATEGORIES.map((cat) => ({
    ...cat,
    places: VERIFIED_NEARBY_PLACES.filter((p) => p.category === cat.id),
  })).filter((g) => g.places.length > 0);

  const recreation = VERIFIED_NEARBY_PLACES.filter((p) => p.category === "recreation");

  const filteredGroups = categoryFilter
    ? byCategory.filter((g) => g.id === categoryFilter)
    : byCategory;

  return (
    <div className={className}>
      {onCategoryChange && (
        <div
          className="flex flex-wrap gap-2 mb-4"
          role="tablist"
          aria-label="Filter nearby amenities by category"
        >
          {AMENITY_CATEGORIES.map((cat) => {
            const selected = cat.id === (activeCategory ?? "parks");
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show ${cat.label} near ${COMMUNITY_MAP_CENTER.label}`}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
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
      )}

      <div
        className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] max-h-[420px] w-full"
        role="region"
        aria-label={`Map of ${CLOUDBREAK_RIDGE.name} and surrounding area`}
        style={{ minHeight: 280 }}
      >
        <iframe
          title={`Google Map — ${COMMUNITY_MAP_CENTER.address}`}
          src={FALLBACK_EMBED_URL}
          className="w-full h-full min-h-[280px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {showStaticList && (
        <div className="mt-6 space-y-6">
          <p className="text-sm text-slate-600">
            Map preview centered on {CLOUDBREAK_RIDGE.name}. Featured nearby destinations for buyers
            are listed below.
          </p>
          {filteredGroups.map((group) => (
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
          {!categoryFilter && recreation.length > 0 && (
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
