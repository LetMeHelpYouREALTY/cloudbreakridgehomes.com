"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type RealScoutListingsProps = {
  /** Defer widget mount until idle — improves mobile LCP on homepage. */
  deferUntilIdle?: boolean;
};

function ListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[320px]" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <div key={n} className="rounded-lg bg-slate-200/80 animate-pulse h-64" />
      ))}
    </div>
  );
}

export default function RealScoutListings({ deferUntilIdle = false }: RealScoutListingsProps) {
  const [ready, setReady] = useState(!deferUntilIdle);

  useEffect(() => {
    if (!deferUntilIdle) return;

    const mount = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 3200 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(mount, 3200);
    return () => window.clearTimeout(timer);
  }, [deferUntilIdle]);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-slate-600 text-lg">
              Discover exceptional homes in Las Vegas and Henderson
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a href="http://drjanduffy.realscout.com/" target="_blank" rel="noopener noreferrer">
              View All Properties
            </a>
          </Button>
        </div>

        {ready ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-office-listings 
              agent-encoded-id="QWdlbnQtMjI1MDUw" 
              sort-order="NEWEST" 
              listing-status="For Sale" 
              property-types=",SFR,MF,TC" 
              price-min="500000" 
              price-max="800000"
            ></realscout-office-listings>`,
            }}
          />
        ) : (
          <ListingsSkeleton />
        )}
      </div>
    </section>
  );
}
