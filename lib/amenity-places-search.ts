import { AMENITY_CATEGORIES, COMMUNITY_MAP_CENTER, type AmenityCategoryId } from "@/lib/amenities-map-config";

export type NearbyMapPlace = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  mapsUri?: string;
};

const cache = new Map<string, Promise<google.maps.places.Place[]>>();

function getCategoryTypes(categoryId: AmenityCategoryId): string[] {
  const config = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
  return config?.primaryTypes ?? [];
}

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId
): Promise<NearbyMapPlace[]> {
  const types = getCategoryTypes(categoryId);
  if (!types.length) return Promise.resolve([]);

  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI", "id"],
        locationRestriction: {
          center,
          radius: COMMUNITY_MAP_CENTER.radiusMeters,
        },
        includedPrimaryTypes: types,
        maxResultCount: 10,
        rankPreference: "POPULARITY" as unknown as google.maps.places.SearchNearbyRankPreference,
      });
      return places ?? [];
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }

  return p.then((places) => {
    const rows: NearbyMapPlace[] = [];
    places.forEach((place, index) => {
      const loc = place.location;
      if (!loc) return;
      const json = loc.toJSON?.() ?? { lat: loc.lat(), lng: loc.lng() };
      if (!Number.isFinite(json.lat) || !Number.isFinite(json.lng)) return;
      const display = place.displayName;
      const name =
        typeof display === "string"
          ? display
          : (display as { text?: string } | undefined)?.text ?? "Place";
      const uri = place.googleMapsURI;
      rows.push({
        id: place.id ?? `place-${categoryId}-${index}`,
        name,
        address: place.formattedAddress ?? "",
        lat: json.lat,
        lng: json.lng,
        ...(uri ? { mapsUri: uri } : {}),
      });
    });
    return rows;
  });
}
