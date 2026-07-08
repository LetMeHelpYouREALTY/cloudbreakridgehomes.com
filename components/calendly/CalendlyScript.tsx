"use client";

import Script from "next/script";
import { CALENDLY_WIDGET_CSS, CALENDLY_WIDGET_JS } from "@/lib/calendly-config";
import { CALENDLY_LOADED_EVENT } from "./types";

export default function CalendlyScript() {
  return (
    <Script
      id="calendly-widget-js"
      src={CALENDLY_WIDGET_JS}
      strategy="lazyOnload"
      onLoad={() => {
        if (!document.querySelector(`link[href="${CALENDLY_WIDGET_CSS}"]`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = CALENDLY_WIDGET_CSS;
          document.head.appendChild(link);
        }
        window.dispatchEvent(new Event(CALENDLY_LOADED_EVENT));
      }}
    />
  );
}
