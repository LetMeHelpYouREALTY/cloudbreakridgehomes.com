"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AMENITY_CATEGORIES,
  AMENITY_MAP_DEFAULT_HEIGHT_PX,
  COMMUNITY_MAP_CENTER,
  buildDirectionsUrl,
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
  type AmenityCategoryId,
} from "@/lib/amenities-map-config";
import { loadGoogleMapsScript } from "@/components/maps/load-google-maps";
import AmenityMapFallback from "@/components/maps/AmenityMapFallback";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";

type MapPlace = {
  id: string;
  name: string;
  address: string;
  rating?: number;
  lat: number;
  lng: number;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function infoWindowHtml(place: MapPlace): string {
  const rating =
    place.rating !== undefined
      ? `<p style="margin:4px 0 0;font-size:13px">Rating: ${place.rating.toFixed(1)}</p>`
      : "";
  const directions = buildDirectionsUrl(place.name, place.address);
  return `<div style="max-width:220px;padding:4px 0">
    <strong>${escapeHtml(place.name)}</strong>
    <p style="margin:4px 0 0;font-size:13px">${escapeHtml(place.address)}</p>
    ${rating}
    <p style="margin:8px 0 0"><a href="${directions}" target="_blank" rel="noopener noreferrer">Directions</a></p>
  </div>`;
}

export default function AmenityMap({
  defaultCategory = "parks",
  height = AMENITY_MAP_DEFAULT_HEIGHT_PX,
  showFallbackList = false,
}: {
  defaultCategory?: AmenityCategoryId;
  height?: number;
  showFallbackList?: boolean;
}) {
  const apiKey = getGoogleMapsApiKey();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [category, setCategory] = useState<AmenityCategoryId>(defaultCategory);
  const [places, setPlaces] = useState<MapPlace[]>([]);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const addCommunityMarker = useCallback((map: google.maps.Map) => {
    if (communityMarkerRef.current) {
      communityMarkerRef.current.setMap(null);
    }
    const marker = new google.maps.Marker({
      map,
      position: { lat: COMMUNITY_MAP_CENTER.lat, lng: COMMUNITY_MAP_CENTER.lng },
      title: COMMUNITY_MAP_CENTER.label,
      zIndex: 1000,
    });
    marker.addListener("click", () => {
      infoWindowRef.current?.close();
      infoWindowRef.current = new google.maps.InfoWindow({
        content: `<div style="max-width:240px;padding:4px 0">
          <strong>${escapeHtml(COMMUNITY_MAP_CENTER.label)}</strong>
          <p style="margin:4px 0 0;font-size:13px">${escapeHtml(COMMUNITY_MAP_CENTER.address)}</p>
          <p style="margin:8px 0 0"><a href="${CLOUDBREAK_RIDGE.mapsSearchUrl}" target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
        </div>`,
      });
      infoWindowRef.current.open({ map, anchor: marker });
    });
    communityMarkerRef.current = marker;
  }, []);

  const renderPlaceMarkers = useCallback(
    (map: google.maps.Map, items: MapPlace[]) => {
      clearMarkers();
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      items.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
        });
        marker.addListener("click", () => {
          infoWindowRef.current?.close();
          infoWindowRef.current = new google.maps.InfoWindow({
            content: infoWindowHtml(place),
          });
          infoWindowRef.current.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });
    },
    [clearMarkers]
  );

  const searchNearby = useCallback(
    async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
      const config = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!config) return;

      setStatusMessage("Searching nearby places…");

      const center = { lat: COMMUNITY_MAP_CENTER.lat, lng: COMMUNITY_MAP_CENTER.lng };

      const toMapPlaces = (
        rows: Array<{
          name: string;
          address: string;
          lat: number;
          lng: number;
          rating?: number;
          id: string;
        }>
      ): MapPlace[] => rows.filter((r) => Number.isFinite(r.lat) && Number.isFinite(r.lng));

      try {
        const placesLib = (await google.maps.importLibrary("places")) as {
          Place?: typeof google.maps.places.Place;
        };

        if (placesLib.Place?.searchNearby) {
          const { places: results } = await placesLib.Place.searchNearby({
            fields: ["displayName", "formattedAddress", "location", "rating", "id"],
            locationRestriction: {
              circle: {
                center,
                radius: COMMUNITY_MAP_CENTER.radiusMeters,
              },
            },
            includedPrimaryTypes: [config.primaryTypes[0]],
            maxResultCount: 15,
          });

          const mapped = toMapPlaces(
            (results ?? []).map((p, index) => {
              const display = p.displayName as string | { text?: string } | undefined;
              const name =
                typeof display === "string"
                  ? display
                  : display?.text ?? "Place";
              return {
                id: p.id ?? `place-${index}`,
                name,
                address: p.formattedAddress ?? "",
                lat: p.location?.lat ?? 0,
                lng: p.location?.lng ?? 0,
                rating: p.rating,
              };
            })
          );
          setPlaces(mapped);
          renderPlaceMarkers(map, mapped);
          setStatusMessage(mapped.length ? null : "No results for this category — try another filter.");
          return;
        }
      } catch {
        // Fall through to legacy PlacesService
      }

      await new Promise<void>((resolve) => {
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: center,
            radius: COMMUNITY_MAP_CENTER.radiusMeters,
            type: config.legacyType,
          },
          (results, status) => {
            if (status !== "OK" || !results?.length) {
              setPlaces([]);
              clearMarkers();
              setStatusMessage("No results for this category — try another filter.");
              resolve();
              return;
            }
            const mapped = toMapPlaces(
              results.map((r, index) => ({
                id: r.place_id ?? `legacy-${index}`,
                name: r.name ?? "Place",
                address: r.vicinity ?? r.formatted_address ?? "",
                lat: r.geometry?.location?.lat() ?? 0,
                lng: r.geometry?.location?.lng() ?? 0,
                rating: r.rating,
              }))
            );
            setPlaces(mapped);
            renderPlaceMarkers(map, mapped);
            setStatusMessage(null);
            resolve();
          }
        );
      });
    },
    [clearMarkers, renderPlaceMarkers]
  );

  useEffect(() => {
    if (!apiKey) {
      setLoadState("error");
      return;
    }
    if (!mapContainerRef.current) return;

    let cancelled = false;
    setLoadState("loading");

    (async () => {
      try {
        await loadGoogleMapsScript(apiKey);
        if (cancelled || !mapContainerRef.current) return;
        const mapsLib = (await google.maps.importLibrary("maps")) as {
          Map: typeof google.maps.Map;
        };
        const mapId = getGoogleMapsMapId();
        const map = new mapsLib.Map(mapContainerRef.current, {
          center: { lat: COMMUNITY_MAP_CENTER.lat, lng: COMMUNITY_MAP_CENTER.lng },
          zoom: 13,
          ...(mapId ? { mapId } : {}),
          disableDefaultUI: false,
          fullscreenControl: true,
          streetViewControl: false,
        });
        mapRef.current = map;
        addCommunityMarker(map);
        await searchNearby(map, defaultCategory);
        if (!cancelled) setLoadState("ready");
      } catch {
        if (!cancelled) setLoadState("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiKey, addCommunityMarker, defaultCategory, searchNearby]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || loadState !== "ready") return;
    void searchNearby(map, category);
  }, [category, loadState, searchNearby]);

  if (!apiKey || loadState === "error") {
    return <AmenityMapFallback showStaticList={showFallbackList} />;
  }

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 mb-4"
        role="tablist"
        aria-label="Filter nearby amenities by category"
      >
        {AMENITY_CATEGORIES.map((cat) => {
          const selected = cat.id === category;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Show ${cat.label} near ${COMMUNITY_MAP_CENTER.label}`}
              onClick={() => setCategory(cat.id)}
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

      <div
        ref={mapContainerRef}
        className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
        style={{ height, minHeight: 280 }}
        role="application"
        aria-label={`Interactive map of ${COMMUNITY_MAP_CENTER.label} and nearby ${AMENITY_CATEGORIES.find((c) => c.id === category)?.label ?? "places"}`}
      />

      {loadState === "loading" && (
        <p className="mt-2 text-sm text-slate-500" aria-live="polite">Loading map…</p>
      )}
      {statusMessage && (
        <p className="mt-2 text-sm text-slate-600" aria-live="polite">{statusMessage}</p>
      )}
      {places.length > 0 && (
        <p className="mt-2 text-xs text-slate-500">
          Showing {places.length} nearby {AMENITY_CATEGORIES.find((c) => c.id === category)?.label ?? "places"}.
          Tap a marker for details and directions.
        </p>
      )}
    </div>
  );
}
