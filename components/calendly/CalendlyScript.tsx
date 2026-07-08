"use client";

import Script from "next/script";
import { CALENDLY_WIDGET_JS } from "@/lib/calendly-config";
import { CALENDLY_LOADED_EVENT } from "./types";

export default function CalendlyScript() {
  return (
    <Script
      id="calendly-widget"
      src={CALENDLY_WIDGET_JS}
      strategy="afterInteractive"
      onLoad={() => {
        window.dispatchEvent(new Event(CALENDLY_LOADED_EVENT));
      }}
    />
  );
}
