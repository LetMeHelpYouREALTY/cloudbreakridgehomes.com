/**
 * Hyperlocal amenity map — community center and Google Places category config.
 * Center: KB Home Cloudbreak Ridge models / sales office (1168 Cloudbreak Cove Dr., Las Vegas, NV 89138).
 * Coordinates align with officeInfo.coordinates in lib/site-config.ts (geocoded to that address).
 */

import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";

export const COMMUNITY_MAP_CENTER = {
  lat: 36.194063,
  lng: -115.373438,
  label: CLOUDBREAK_RIDGE.name,
  address: CLOUDBREAK_RIDGE.address.full,
  /** Search radius for nearby Places requests */
  radiusMeters: 8000,
  /** Keyless embed when Maps JS API is unavailable */
  embedUrl: `https://www.google.com/maps?q=${CLOUDBREAK_RIDGE.mapsQuery}&z=14&output=embed`,
} as const;

export type AmenityCategoryId =
  | "parks"
  | "grocery"
  | "restaurants"
  | "cafes"
  | "healthcare"
  | "golf"
  | "fitness"
  | "shopping"
  | "pharmacies"
  | "schools"
  | "parking";

export type AmenityCategoryConfig = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places (New) primary types — all passed in one searchNearby call */
  primaryTypes: string[];
};

/**
 * Category order tuned for master-planned new construction in Summerlin West
 * (Parks & daily errands first; schools included).
 */
export const AMENITY_CATEGORIES: AmenityCategoryConfig[] = [
  {
    id: "parks",
    label: "Parks",
    primaryTypes: ["park", "national_park"],
  },
  {
    id: "grocery",
    label: "Grocery",
    primaryTypes: ["grocery_store", "supermarket"],
  },
  {
    id: "restaurants",
    label: "Restaurants",
    primaryTypes: ["restaurant"],
  },
  {
    id: "cafes",
    label: "Cafes",
    primaryTypes: ["cafe", "coffee_shop"],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    primaryTypes: ["hospital", "doctor", "medical_clinic"],
  },
  {
    id: "golf",
    label: "Golf",
    primaryTypes: ["golf_course"],
  },
  {
    id: "fitness",
    label: "Fitness",
    primaryTypes: ["gym", "fitness_center"],
  },
  {
    id: "shopping",
    label: "Shopping",
    primaryTypes: ["shopping_mall", "department_store"],
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    primaryTypes: ["pharmacy", "drugstore"],
  },
  {
    id: "schools",
    label: "Schools",
    primaryTypes: ["school", "primary_school", "secondary_school"],
  },
  {
    id: "parking",
    label: "Parking",
    primaryTypes: ["parking", "parking_garage"],
  },
];

export const AMENITY_MAP_DEFAULT_HEIGHT_PX = 420;

export function getGoogleMapsApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return key && key.trim().length > 0 ? key.trim() : undefined;
}

export function getGoogleMapsMapId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  return id && id.trim().length > 0 ? id.trim() : undefined;
}

export function buildDirectionsUrl(placeName: string, address?: string): string {
  const query = address ? `${placeName}, ${address}` : placeName;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
