"use client";

import { useEffect } from "react";
import {
  CALENDLY_BADGE,
  CALENDLY_BUYER_CONSULTATION_URL,
} from "@/lib/calendly-config";
import { CALENDLY_LOADED_EVENT } from "./types";
import "./types";

type CalendlyBadgeProps = {
  url?: string;
  text?: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
};

export default function CalendlyBadge({
  url = CALENDLY_BUYER_CONSULTATION_URL,
  text = CALENDLY_BADGE.text,
  color = CALENDLY_BADGE.color,
  textColor = CALENDLY_BADGE.textColor,
  branding = CALENDLY_BADGE.branding,
}: CalendlyBadgeProps) {
  useEffect(() => {
    const initBadge = () => {
      if (!window.Calendly) {
        return;
      }

      window.Calendly.initBadgeWidget({
        url,
        text,
        color,
        textColor,
        branding,
      });
    };

    if (window.Calendly) {
      initBadge();
    } else {
      window.addEventListener(CALENDLY_LOADED_EVENT, initBadge);
    }

    return () => {
      window.removeEventListener(CALENDLY_LOADED_EVENT, initBadge);
    };
  }, [url, text, color, textColor, branding]);

  return null;
}
