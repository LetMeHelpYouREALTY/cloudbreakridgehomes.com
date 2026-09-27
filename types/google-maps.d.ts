/** Minimal Google Maps JS API types for amenity map (full types optional via @types/google.maps). */

declare namespace google.maps {
  function importLibrary(name: "maps" | "places" | "marker"): Promise<unknown>;

  class Map {
    constructor(el: HTMLElement, opts: Record<string, unknown>);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    fitBounds(bounds: LatLngBounds): void;
  }

  class LatLngBounds {
    extend(point: LatLng | LatLngLiteral): void;
  }

  class InfoWindow {
    constructor(opts?: { content?: string });
    open(opts: { map: Map; anchor?: unknown }): void;
    close(): void;
    setContent?(content: string): void;
  }

  class Marker {
    constructor(opts?: Record<string, unknown>);
    addListener(event: string, handler: () => void): void;
    setMap(map: Map | null): void;
  }

  namespace places {
    class PlacesService {
      constructor(map: Map);
      nearbySearch(
        request: {
          location: LatLng | LatLngLiteral;
          radius: number;
          type?: string;
        },
        callback: (
          results: PlaceResult[] | null,
          status: PlacesServiceStatus
        ) => void
      ): void;
    }

    type PlaceResult = {
      name?: string;
      vicinity?: string;
      formatted_address?: string;
      geometry?: { location?: LatLng };
      rating?: number;
      place_id?: string;
    };

    type PlacesServiceStatus = string;

    class Place {
      static searchNearby(request: Record<string, unknown>): Promise<{
        places: Array<{
          displayName?: string;
          formattedAddress?: string;
          location?: LatLngLiteral;
          rating?: number;
          id?: string;
        }>;
      }>;
    }
  }

  namespace marker {
    class AdvancedMarkerElement {
      constructor(opts?: Record<string, unknown>);
      addListener(event: string, handler: () => void): void;
    }
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }
}

interface Window {
  google?: typeof google;
}
