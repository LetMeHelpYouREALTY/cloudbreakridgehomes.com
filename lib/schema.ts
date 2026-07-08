/**
 * Schema.org Structured Data Generators for cloudbreakridgehomes.com
 * Following Google's 2025 Structured Data Guidelines
 *
 * @see https://schema.org
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { siteConfig, agentInfo, officeInfo, agentStats } from "./site-config";
import { getAgentHeadshotUrl } from "./agent-photos";
import {
  CLOUDBREAK_RIDGE,
  ENCLAVES_COLLECTION,
  RESERVES_COLLECTION,
  NEARBY_AMENITIES,
} from "./cloudbreak-ridge";

// ============================================================================
// Types
// ============================================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
}

export interface NeighborhoodData {
  name: string;
  slug: string;
  description: string;
  medianPrice?: string;
  latitude?: number;
  longitude?: number;
  containedIn?: string;
}

export interface CommunityAmenity {
  name: string;
  description?: string;
}

export interface SeniorCommunityData {
  name: string;
  description: string;
  priceRange: string;
  numberOfHomes: number;
  yearBuilt?: string;
  amenities: CommunityAmenity[];
  latitude?: number;
  longitude?: number;
  hoaFees?: string;
  ageRestriction?: string;
}

// ============================================================================
// Constants
// ============================================================================

const BASE_URL = siteConfig.url;

// Social media profiles (to be updated with actual URLs)
export const socialProfiles = {
  facebook: "https://www.facebook.com/cloudbreakridgehomes",
  instagram: "https://www.instagram.com/cloudbreakridgehomes",
  linkedin: "https://www.linkedin.com/in/drjanduffy",
  tiktok: "https://www.tiktok.com/@cloudbreakridgehomes",
  youtube: "https://www.youtube.com/@cloudbreakridgehomes",
};

// ============================================================================
// Core Schema Generators
// ============================================================================

/**
 * Generate RealEstateAgent schema (LocalBusiness subtype)
 * Used site-wide in the root layout
 */
export function generateRealEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${BASE_URL}#organization`,
    name: "Cloudbreak Ridge Homes by Dr. Jan Duffy",
    alternateName: [
      "Cloudbreak Ridge Homes",
      "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
      "BHHS Nevada Properties",
      "Berkshire Hathaway HomeServices",
    ],
    url: BASE_URL,
    logo: getAgentHeadshotUrl(),
    image: getAgentHeadshotUrl(),
    description: siteConfig.description,
    telephone: "+1-702-500-1942",
    email: agentInfo.email,
    priceRange: "$385K - $10M+",
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: officeInfo.coordinates.lat,
      longitude: officeInfo.coordinates.lng,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Las Vegas",
        sameAs: "https://en.wikipedia.org/wiki/Las_Vegas",
      },
      {
        "@type": "City",
        name: "Henderson",
        sameAs: "https://en.wikipedia.org/wiki/Henderson,_Nevada",
      },
      {
        "@type": "Place",
        name: "Summerlin",
      },
      {
        "@type": "City",
        name: "North Las Vegas",
      },
      {
        "@type": "Place",
        name: "Green Valley",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      recognizedBy: {
        "@type": "Organization",
        name: "Nevada Real Estate Division",
      },
      validIn: {
        "@type": "State",
        name: "Nevada",
      },
      identifier: agentInfo.license,
    },
    sameAs: Object.values(socialProfiles),
    parentOrganization: {
      "@type": "Organization",
      "@id": `${BASE_URL}#parent-organization`,
      name: "Berkshire Hathaway HomeServices Nevada Properties",
      url: "https://www.bfrre.com",
      parentOrganization: {
        "@type": "Organization",
        name: "Berkshire Hathaway HomeServices",
        url: "https://www.bhhs.com",
        sameAs: "https://en.wikipedia.org/wiki/Berkshire_Hathaway_HomeServices",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: agentStats.averageRating.toString(),
      reviewCount: agentStats.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "Las Vegas real estate",
      "Henderson homes",
      "Summerlin properties",
      "Luxury homes",
      "New construction",
      "Investment properties",
      "Relocation services",
      "55+ communities",
      "First-time homebuyers",
    ],
    slogan: "Your Berkshire Hathaway HomeServices expert in Las Vegas",
  };
}

/**
 * Generate Organization schema for BHHS brand
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#parent-organization`,
    name: "Berkshire Hathaway HomeServices Nevada Properties",
    url: "https://www.bfrre.com",
    logo: `${BASE_URL}/favicon-32x32.png`,
    parentOrganization: {
      "@type": "Organization",
      name: "Berkshire Hathaway HomeServices",
      url: "https://www.bhhs.com",
      sameAs: [
        "https://en.wikipedia.org/wiki/Berkshire_Hathaway_HomeServices",
        "https://www.linkedin.com/company/berkshire-hathaway-homeservices/",
      ],
    },
  };
}

// ============================================================================
// Navigation Schema Generators
// ============================================================================

/**
 * Generate BreadcrumbList schema for navigation trails
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}#website`,
    name: siteConfig.name,
    url: BASE_URL,
    description: siteConfig.description,
    publisher: {
      "@id": `${BASE_URL}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/listings?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ============================================================================
// Content Schema Generators
// ============================================================================

/**
 * Generate FAQPage schema from FAQ items
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate AggregateRating schema
 */
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  bestRating = 5,
  worstRating = 1
) {
  return {
    "@type": "AggregateRating",
    ratingValue: ratingValue.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: bestRating.toString(),
    worstRating: worstRating.toString(),
  };
}

/**
 * Generate Review schema for individual testimonials
 */
export function generateReviewSchema(reviews: ReviewItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${BASE_URL}#organization`,
    name: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
    aggregateRating: generateAggregateRatingSchema(
      agentStats.averageRating,
      agentStats.reviewCount
    ),
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished || new Date().toISOString().split("T")[0],
    })),
  };
}

// ============================================================================
// Location Schema Generators
// ============================================================================

/**
 * Generate Place schema for neighborhoods
 */
export function generateNeighborhoodSchema(neighborhood: NeighborhoodData) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${BASE_URL}/neighborhoods/${neighborhood.slug}#place`,
    name: `${neighborhood.name}, Las Vegas`,
    description: neighborhood.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: neighborhood.containedIn || "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
  };

  if (neighborhood.latitude && neighborhood.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: neighborhood.latitude,
      longitude: neighborhood.longitude,
    };
  }

  if (neighborhood.containedIn) {
    schema.containedInPlace = {
      "@type": "City",
      name: neighborhood.containedIn,
      addressRegion: "NV",
    };
  }

  return schema;
}

/**
 * Generate Residence schema for 55+ communities
 * Uses ResidentialComplex with amenityFeature
 */
export function generateSeniorCommunitySchema(community: SeniorCommunityData) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    name: community.name,
    description: community.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Henderson",
      addressRegion: "NV",
      addressCountry: "US",
    },
    numberOfAccommodationUnits: community.numberOfHomes,
    petsAllowed: true,
  };

  if (community.latitude && community.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: community.latitude,
      longitude: community.longitude,
    };
  }

  if (community.yearBuilt) {
    schema.yearBuilt = community.yearBuilt;
  }

  // Add amenity features
  if (community.amenities.length > 0) {
    schema.amenityFeature = community.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.name,
      value: true,
      ...(amenity.description && { description: amenity.description }),
    }));
  }

  // Add price range as offers
  if (community.priceRange) {
    schema.additionalProperty = [
      {
        "@type": "PropertyValue",
        name: "Price Range",
        value: community.priceRange,
      },
      {
        "@type": "PropertyValue",
        name: "Age Restriction",
        value: community.ageRestriction || "55+",
      },
    ];

    if (community.hoaFees) {
      (schema.additionalProperty as Array<Record<string, unknown>>).push({
        "@type": "PropertyValue",
        name: "HOA Fees",
        value: community.hoaFees,
      });
    }
  }

  return schema;
}

/**
 * Generate RealEstateListing schema for property pages
 */
export function generateRealEstateListingSchema(listing: {
  name: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  images?: string[];
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.name,
    description: listing.description,
    url: listing.url.startsWith("http") ? listing.url : `${BASE_URL}${listing.url}`,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address.street,
      addressLocality: listing.address.city,
      addressRegion: listing.address.state,
      postalCode: listing.address.zip,
      addressCountry: "US",
    },
    ...(listing.bedrooms && { numberOfBedrooms: listing.bedrooms }),
    ...(listing.bathrooms && { numberOfBathroomsTotal: listing.bathrooms }),
    ...(listing.sqft && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: listing.sqft,
        unitCode: "FTK",
      },
    }),
    ...(listing.images &&
      listing.images.length > 0 && {
        image: listing.images.map((img) =>
          img.startsWith("http") ? img : `${BASE_URL}${img}`
        ),
      }),
  };
}

// ============================================================================
// Page-Specific Schema Generators
// ============================================================================

/**
 * Generate Service schema for services pages
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url.startsWith("http") ? service.url : `${BASE_URL}${service.url}`,
    provider: {
      "@id": `${BASE_URL}#organization`,
    },
    areaServed: service.areaServed || ["Las Vegas", "Henderson", "Summerlin", "North Las Vegas"],
    serviceType: "Real Estate Services",
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${page.url.startsWith("http") ? page.url : `${BASE_URL}${page.url}`}#webpage`,
    name: page.name,
    description: page.description,
    url: page.url.startsWith("http") ? page.url : `${BASE_URL}${page.url}`,
    isPartOf: {
      "@id": `${BASE_URL}#website`,
    },
    about: {
      "@id": `${BASE_URL}#organization`,
    },
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Combine multiple schemas into a single JSON-LD script
 */
export function combineSchemas(...schemas: Record<string, unknown>[]) {
  if (schemas.length === 1) {
    return schemas[0];
  }
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      // Remove @context from individual schemas when combining
      const { "@context": _, ...rest } = schema;
      return rest;
    }),
  };
}

/**
 * Convert schema object to JSON-LD string
 */
export function schemaToJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}

/**
 * Cloudbreak Ridge — ResidentialComplex + Place + nested Residence/Offer floor plans.
 * Kept aligned with visible homepage copy in lib/cloudbreak-ridge.ts (GEO / entity SEO).
 * FAQPage remains for AEO citeability even after Google retired FAQ rich results (May 2026).
 */
export function generateCloudbreakRidgeCommunitySchema() {
  const complexId = `${BASE_URL}/#residential-complex`;
  const placeId = `${BASE_URL}/#place-cloudbreak-ridge`;

  const floorPlanOffers = [
    ...ENCLAVES_COLLECTION.plans,
    ...RESERVES_COLLECTION.plans,
  ].map((plan) => ({
    "@type": "Offer",
    name: `${plan.name} — ${plan.collection} at Cloudbreak Ridge`,
    description: plan.summary,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      description: `Homes at Cloudbreak Ridge priced from ${CLOUDBREAK_RIDGE.priceFrom}`,
      minPrice: CLOUDBREAK_RIDGE.priceFromNumericHint,
    },
    itemOffered: {
      "@type": "Residence",
      name: `${plan.name} (${plan.collection})`,
      floorSize: {
        "@type": "QuantitativeValue",
        value: plan.sqFt,
        unitCode: "FTK",
      },
      numberOfRooms: plan.bedrooms,
      numberOfBathroomsTotal: plan.baths,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Stories",
          value: String(plan.stories),
        },
        {
          "@type": "PropertyValue",
          name: "Garage bays",
          value: String(plan.garageBays),
        },
        {
          "@type": "PropertyValue",
          name: "Collection",
          value: plan.collection,
        },
      ],
    },
  }));

  const communityAddress = {
    "@type": "PostalAddress" as const,
    streetAddress: CLOUDBREAK_RIDGE.address.street,
    addressLocality: CLOUDBREAK_RIDGE.address.city,
    addressRegion: CLOUDBREAK_RIDGE.address.state,
    postalCode: CLOUDBREAK_RIDGE.address.zip,
    addressCountry: "US",
  };

  return {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    "@id": complexId,
    name: CLOUDBREAK_RIDGE.name,
    alternateName: [
      CLOUDBREAK_RIDGE.brandName,
      "Enclaves at Cloudbreak Ridge",
      "Reserves at Cloudbreak Ridge",
      "Cloudbreak Ridge by KB Home",
    ],
    description: CLOUDBREAK_RIDGE.description,
    url: BASE_URL,
    address: communityAddress,
    hasMap: CLOUDBREAK_RIDGE.mapsSearchUrl,
    containedInPlace: {
      "@type": "Place",
      "@id": placeId,
      name: `${CLOUDBREAK_RIDGE.village}, ${CLOUDBREAK_RIDGE.masterPlan}`,
      description: `${CLOUDBREAK_RIDGE.village} is Summerlin's newest village in ${CLOUDBREAK_RIDGE.region} at the base of the ${CLOUDBREAK_RIDGE.landmark}.`,
      containedInPlace: {
        "@type": "Place",
        name: CLOUDBREAK_RIDGE.masterPlan,
        containedInPlace: {
          "@type": "City",
          name: "Las Vegas",
          addressRegion: "NV",
        },
      },
    },
    amenityFeature: NEARBY_AMENITIES.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: true,
      description: a.description,
    })),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Builder",
        value: CLOUDBREAK_RIDGE.builder,
      },
      {
        "@type": "PropertyValue",
        name: "Price from",
        value: CLOUDBREAK_RIDGE.priceFrom,
      },
      {
        "@type": "PropertyValue",
        name: "Village",
        value: CLOUDBREAK_RIDGE.village,
      },
      {
        "@type": "PropertyValue",
        name: "Master plan",
        value: CLOUDBREAK_RIDGE.masterPlan,
      },
      {
        "@type": "PropertyValue",
        name: "Collections",
        value: "Enclaves (gated single-story), Reserves (two-story)",
      },
      {
        "@type": "PropertyValue",
        name: "Community address",
        value: CLOUDBREAK_RIDGE.address.full,
      },
    ],
    makesOffer: floorPlanOffers,
    broker: {
      "@id": `${BASE_URL}#organization`,
    },
  };
}

export function generateCloudbreakRidgePlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${BASE_URL}/#place-cloudbreak-ridge`,
    name: `${CLOUDBREAK_RIDGE.name}, ${CLOUDBREAK_RIDGE.village}`,
    description: CLOUDBREAK_RIDGE.shortDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLOUDBREAK_RIDGE.address.street,
      addressLocality: CLOUDBREAK_RIDGE.address.city,
      addressRegion: CLOUDBREAK_RIDGE.address.state,
      postalCode: CLOUDBREAK_RIDGE.address.zip,
      addressCountry: "US",
    },
    hasMap: CLOUDBREAK_RIDGE.mapsSearchUrl,
    containedInPlace: {
      "@type": "Place",
      name: CLOUDBREAK_RIDGE.masterPlan,
    },
    amenityFeature: NEARBY_AMENITIES.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: true,
      description: a.description,
    })),
  };
}

/** Collection-level ResidentialComplex for /enclaves or /reserves. */
export function generateCloudbreakCollectionSchema(
  collection: "Enclaves" | "Reserves",
  pagePath: string
) {
  const data =
    collection === "Enclaves" ? ENCLAVES_COLLECTION : RESERVES_COLLECTION;
  const pageUrl = `${BASE_URL}${pagePath}`;

  return {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    "@id": `${pageUrl}#residential-complex`,
    name: data.name,
    description: data.summary,
    url: pageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLOUDBREAK_RIDGE.address.street,
      addressLocality: CLOUDBREAK_RIDGE.address.city,
      addressRegion: CLOUDBREAK_RIDGE.address.state,
      postalCode: CLOUDBREAK_RIDGE.address.zip,
      addressCountry: "US",
    },
    hasMap: CLOUDBREAK_RIDGE.mapsSearchUrl,
    containedInPlace: {
      "@type": "Place",
      "@id": `${BASE_URL}/#place-cloudbreak-ridge`,
      name: CLOUDBREAK_RIDGE.name,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Builder",
        value: CLOUDBREAK_RIDGE.builder,
      },
      {
        "@type": "PropertyValue",
        name: "Stories",
        value: String(data.stories),
      },
      {
        "@type": "PropertyValue",
        name: "Gated",
        value: "true",
      },
    ],
    makesOffer: data.plans.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} — ${data.name}`,
      description: plan.summary,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: `Homes priced from ${CLOUDBREAK_RIDGE.priceFrom}`,
        minPrice: CLOUDBREAK_RIDGE.priceFromNumericHint,
      },
      itemOffered: {
        "@type": "Residence",
        name: plan.name,
        floorSize: {
          "@type": "QuantitativeValue",
          value: plan.sqFt,
          unitCode: "FTK",
        },
        numberOfRooms: plan.bedrooms,
        numberOfBathroomsTotal: plan.baths,
      },
    })),
    broker: { "@id": `${BASE_URL}#organization` },
  };
}

/** ItemList of KB Home floor plans — for /floor-plans hub. */
export function generateCloudbreakFloorPlanItemListSchema(pagePath = "/floor-plans") {
  const pageUrl = `${BASE_URL}${pagePath}`;
  const allPlans = [...ENCLAVES_COLLECTION.plans, ...RESERVES_COLLECTION.plans];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#floor-plan-list`,
    name: "KB Home floor plans at Cloudbreak Ridge",
    description: `All ${allPlans.length} floor plans at Cloudbreak Ridge by KB Home in La Madre Peaks, Summerlin West.`,
    numberOfItems: allPlans.length,
    itemListElement: allPlans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${plan.name} — ${plan.collection}`,
      url: plan.collection === "Enclaves" ? `${BASE_URL}/enclaves` : `${BASE_URL}/reserves`,
      item: {
        "@type": "Residence",
        name: `${plan.name} (${plan.collection} at Cloudbreak Ridge)`,
        description: plan.summary,
        floorSize: {
          "@type": "QuantitativeValue",
          value: plan.sqFt,
          unitCode: "FTK",
        },
        numberOfRooms: plan.bedrooms,
        numberOfBathroomsTotal: plan.baths,
      },
    })),
  };
}

/** Schools near Cloudbreak Ridge — EducationalOrganization list for /schools. */
export function generateCloudbreakSchoolsSchema(pagePath = "/schools") {
  const pageUrl = `${BASE_URL}${pagePath}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: "Schools near Cloudbreak Ridge, Summerlin",
    description:
      "Elementary, middle, and high schools cited by KB Home for Cloudbreak Ridge in La Madre Peaks — verify CCSD zoning before purchase.",
    url: pageUrl,
    about: {
      "@type": "Place",
      name: CLOUDBREAK_RIDGE.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: CLOUDBREAK_RIDGE.address.street,
        addressLocality: CLOUDBREAK_RIDGE.address.city,
        addressRegion: CLOUDBREAK_RIDGE.address.state,
        postalCode: CLOUDBREAK_RIDGE.address.zip,
        addressCountry: "US",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Schools serving Cloudbreak Ridge (per KB Home, 2026)",
      itemListElement: [
        { name: "Linda Rankin Givens Elementary School", level: "Elementary" },
        { name: "Sig Rogich Middle School", level: "Middle" },
        { name: "Palo Verde High School", level: "High" },
      ].map((school, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "EducationalOrganization",
          name: school.name,
          educationalLevel: school.level,
        },
      })),
    },
  };
}
