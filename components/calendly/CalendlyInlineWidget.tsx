"use client";

import { useEffect, useRef } from "react";
import {
  CALENDLY_BUYER_CONSULTATION_URL,
  CALENDLY_INLINE_HEIGHT,
  CALENDLY_INLINE_MIN_WIDTH,
} from "@/lib/calendly-config";
import { CALENDLY_LOADED_EVENT } from "./types";

type CalendlyInlineWidgetProps = {
  url?: string;
  minWidth?: string;
  height?: string;
  className?: string;
};

export default function CalendlyInlineWidget({
  url = CALENDLY_BUYER_CONSULTATION_URL,
  minWidth = CALENDLY_INLINE_MIN_WIDTH,
  height = CALENDLY_INLINE_HEIGHT,
  className,
}: CalendlyInlineWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initWidget = () => {
      if (!containerRef.current || initializedRef.current || !window.Calendly) {
        return;
      }

      containerRef.current.innerHTML = "";

      const widgetDiv = document.createElement("div");
      widgetDiv.className = "calendly-inline-widget";
      widgetDiv.setAttribute("data-url", url);
      widgetDiv.style.minWidth = minWidth;
      widgetDiv.style.height = height;
      widgetDiv.style.width = "100%";

      containerRef.current.appendChild(widgetDiv);

      window.Calendly.initInlineWidget({
        url,
        parentElement: widgetDiv,
      });

      initializedRef.current = true;
    };

    if (window.Calendly) {
      initWidget();
    } else {
      window.addEventListener(CALENDLY_LOADED_EVENT, initWidget);
    }

    return () => {
      window.removeEventListener(CALENDLY_LOADED_EVENT, initWidget);
      initializedRef.current = false;
    };
  }, [url, minWidth, height]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth, height, width: "100%" }}
    />
  );
}
