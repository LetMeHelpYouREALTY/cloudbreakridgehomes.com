"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AMENITY_CATEGORIES,
  AMENITY_MAP_DEFAULT_HEIGHT_PX,
  COMMUNITY_MAP_CENTER,
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
  type AmenityCategoryId,
} from "@/lib/amenities-map-config";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";
import { searchCategory, type NearbyMapPlace } from "@/lib/amenity-places-search";
import AmenityMapFallback from "@/components/maps/AmenityMapFallback";
import { VERIFIED_NEARBY_PLACES } from "@/lib/nearby-amenities-content";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";

function displayNameFromPlace(place: NearbyMapPlace): string {
  return place.name;
}

function buildPlaceInfoElement(place: NearbyMapPlace): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "220px";
  wrap.style.padding = "4px 0";

  const title = document.createElement("strong");
  title.textContent = place.name;
  wrap.appendChild(title);

  if (place.address) {
    const addr = document.createElement("p");
    addr.style.margin = "4px 0 0";
    addr.style.fontSize = "13px";
    addr.textContent = place.address;
    wrap.appendChild(addr);
  }

  const link = document.createElement("a");
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Directions";
  link.href =
    place.mapsUri ??
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      place.address ? `${place.name}, ${place.address}` : place.name
    )}`;
  link.style.display = "inline-block";
  link.style.marginTop = "8px";
  wrap.appendChild(link);

  return wrap;
}

function buildCommunityInfoElement(): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "240px";
  wrap.style.padding = "4px 0";

  const title = document.createElement("strong");
  title.textContent = COMMUNITY_MAP_CENTER.label;
  wrap.appendChild(title);

  const addr = document.createElement("p");
  addr.style.margin = "4px 0 0";
  addr.style.fontSize = "13px";
  addr.textContent = COMMUNITY_MAP_CENTER.address;
  wrap.appendChild(addr);

  const link = document.createElement("a");
  link.href = CLOUDBREAK_RIDGE.mapsSearchUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View on Google Maps";
  link.style.display = "inline-block";
  link.style.marginTop = "8px";
  wrap.appendChild(link);

  return wrap;
}

function curatedPlacesForCategory(categoryId: AmenityCategoryId): NearbyMapPlace[] {
  return VERIFIED_NEARBY_PLACES
    .filter((p) => p.category === categoryId && p.lat !== undefined && p.lng !== undefined)
    .map((p, index) => ({
      id: `curated-${categoryId}-${index}`,
      name: p.name,
      address: `${p.streetAddress}, ${p.addressLocality}, ${p.addressRegion} ${p.postalCode}`,
      lat: p.lat!,
      lng: p.lng!,
    }));
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
  const rootRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [category, setCategory] = useState<AmenityCategoryId>(defaultCategory);
  const [places, setPlaces] = useState<NearbyMapPlace[]>([]);
  const [curatedList, setCuratedList] = useState<NearbyMapPlace[]>([]);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [inView, setInView] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const enterFallback = useCallback(() => {
    mapRef.current = null;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    infoWindowRef.current?.close();
    infoWindowRef.current = null;
    setUseIframeFallback(true);
    setLoadState("error");
  }, []);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const renderPlaceMarkers = useCallback(
    (map: google.maps.Map, items: NearbyMapPlace[]) => {
      clearMarkers();
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      items.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: displayNameFromPlace(place),
        });
        marker.addListener("click", () => {
          infoWindowRef.current?.close();
          infoWindowRef.current = new google.maps.InfoWindow({
            content: buildPlaceInfoElement(place),
          });
          infoWindowRef.current.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });
    },
    [clearMarkers]
  );

  const addCommunityMarker = useCallback((map: google.maps.Map) => {
    communityMarkerRef.current?.setMap(null);
    const marker = new google.maps.Marker({
      map,
      position: { lat: COMMUNITY_MAP_CENTER.lat, lng: COMMUNITY_MAP_CENTER.lng },
      title: COMMUNITY_MAP_CENTER.label,
      zIndex: 1000,
    });
    marker.addListener("click", () => {
      infoWindowRef.current?.close();
      infoWindowRef.current = new google.maps.InfoWindow({
        content: buildCommunityInfoElement(),
      });
      infoWindowRef.current.open({ map, anchor: marker });
    });
    communityMarkerRef.current = marker;
  }, []);

  const runCategorySearch = useCallback(
    async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
      setStatusMessage("Searching nearby places…");
      setCuratedList([]);
      const center = { lat: COMMUNITY_MAP_CENTER.lat, lng: COMMUNITY_MAP_CENTER.lng };

      try {
        const results = await searchCategory(center, categoryId);
        if (results.length) {
          setPlaces(results);
          renderPlaceMarkers(map, results);
          setStatusMessage(null);
          return;
        }
        const curated = curatedPlacesForCategory(categoryId);
        setPlaces([]);
        clearMarkers();
        if (curated.length) {
          setCuratedList(curated);
          renderPlaceMarkers(map, curated);
          setStatusMessage("Showing featured nearby places for this category.");
        } else {
          setStatusMessage("No results for this category — try another filter.");
        }
      } catch {
        const curated = curatedPlacesForCategory(categoryId);
        setPlaces([]);
        clearMarkers();
        if (curated.length) {
          setCuratedList(curated);
          renderPlaceMarkers(map, curated);
          setStatusMessage("Showing featured nearby places for this category.");
        } else {
          setStatusMessage("No results for this category — try another filter.");
        }
      }
    },
    [clearMarkers, renderPlaceMarkers]
  );

  useEffect(() => {
    if (!inView) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    if (!apiKey) {
      enterFallback();
      return;
    }
    if (!mapContainerRef.current) return;

    let cancelled = false;
    setLoadState("loading");

    loadGoogleMaps(apiKey)
      .then(async () => {
        if (cancelled || !mapContainerRef.current) return;
        const mapsLib = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
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
        await runCategorySearch(map, defaultCategory);
        if (!cancelled) setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) enterFallback();
      });

    return () => {
      cancelled = true;
    };
  }, [inView, apiKey, addCommunityMarker, defaultCategory, enterFallback, runCategorySearch]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || loadState !== "ready" || useIframeFallback) return;
    void runCategorySearch(map, category);
  }, [category, loadState, runCategorySearch, useIframeFallback]);

  if (useIframeFallback || !apiKey) {
    return (
      <AmenityMapFallback
        showStaticList={showFallbackList}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
    );
  }

  const listItems = curatedList.length > 0 ? curatedList : places;

  return (
    <div ref={rootRef}>
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
      {listItems.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-slate-700" aria-label="Places in this category">
          {listItems.map((place) => (
            <li key={place.id}>
              <strong>{place.name}</strong>
              {place.address ? <span className="text-slate-500"> — {place.address}</span> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
