"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type HeroRealScoutSearchProps = {
  agentEncodedId: string;
};

/**
 * Defers RealScout simple-search until after first paint / idle — keeps hero H1 as LCP on mobile.
 */
export default function HeroRealScoutSearch({ agentEncodedId }: HeroRealScoutSearchProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 2800 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(mount, 2800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <div
        className="h-12 w-full max-w-md mx-auto rounded-md bg-white/15 border border-white/25"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<realscout-simple-search agent-encoded-id="${agentEncodedId}"></realscout-simple-search>`,
      }}
    />
  );
}

/** Static fallback link for no-JS and screen readers. */
export function HeroSearchFallback() {
  return (
    <p className="sr-only">
      <Link href="http://drjanduffy.realscout.com/">Search Cloudbreak Ridge and Las Vegas homes</Link>
    </p>
  );
}
