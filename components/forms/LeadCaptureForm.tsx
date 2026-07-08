/**
 * Lead capture is handled via Calendly booking.
 * This component preserves the previous export for drop-in replacement.
 */

"use client";

import CalendlyInlineWidget from "@/components/calendly/CalendlyInlineWidget";

export interface LeadCaptureFormProps {
  source?: string;
  stage?: string;
  defaultTags?: string[];
  formType?: "contact" | "property-search" | "home-valuation" | "newsletter";
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function LeadCaptureForm(_props: LeadCaptureFormProps) {
  return <CalendlyInlineWidget />;
}
