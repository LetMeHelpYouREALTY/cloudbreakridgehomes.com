import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import LazyWhenVisible from "@/components/shared/LazyWhenVisible";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";
import { AMENITY_MAP_DEFAULT_HEIGHT_PX } from "@/lib/amenities-map-config";

const AmenityMap = dynamic(() => import("@/components/maps/AmenityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl border border-slate-200 bg-slate-100 animate-pulse"
      style={{ height: AMENITY_MAP_DEFAULT_HEIGHT_PX, minHeight: 280 }}
      aria-hidden="true"
    />
  ),
});

type NearbyAmenitiesSectionProps = {
  /** Section heading — defaults to “Life Near Cloudbreak Ridge” */
  title?: string;
  /** Show link to full /amenities page */
  linkToFullPage?: boolean;
  /** Compact copy for interior pages */
  variant?: "home" | "interior";
};

export default function NearbyAmenitiesSection({
  title = `Life Near ${CLOUDBREAK_RIDGE.name}`,
  linkToFullPage = true,
  variant = "home",
}: NearbyAmenitiesSectionProps) {
  const subtitle =
    variant === "home"
      ? "Explore parks, grocery, dining, healthcare, golf, and schools around La Madre Peaks — then dive into the full amenities guide."
      : "Filter restaurants, parks, grocery, healthcare, and more near 1168 Cloudbreak Cove Dr.";

  return (
    <section
      className="py-16 md:py-20 bg-slate-50 border-y border-slate-200"
      aria-labelledby="nearby-amenities-heading"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2
            id="nearby-amenities-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
          >
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <LazyWhenVisible minHeight={AMENITY_MAP_DEFAULT_HEIGHT_PX + 80}>
          <AmenityMap showFallbackList={variant === "home"} />
        </LazyWhenVisible>

        {linkToFullPage && (
          <div className="text-center mt-8">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              Nearby Amenities in {CLOUDBREAK_RIDGE.name}, Las Vegas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
