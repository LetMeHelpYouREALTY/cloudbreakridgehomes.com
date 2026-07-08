"use client";

import CalendlyBadge from "./CalendlyBadge";
import CalendlyScript from "./CalendlyScript";

export default function CalendlyProvider() {
  return (
    <>
      <CalendlyScript />
      <CalendlyBadge />
    </>
  );
}
