"use client";

import { CALENDLY_BUYER_CONSULTATION_URL } from "@/lib/calendly-config";
import { CALENDLY_LOADED_EVENT } from "./types";
import "./types";

type CalendlyButtonProps = {
  url?: string;
  text?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function CalendlyButton({
  url = CALENDLY_BUYER_CONSULTATION_URL,
  text = "Schedule time with me",
  className = "inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors",
  children,
}: CalendlyButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const openPopup = () => {
      window.Calendly?.initPopupWidget({ url });
    };

    if (window.Calendly) {
      openPopup();
    } else {
      window.addEventListener(CALENDLY_LOADED_EVENT, openPopup, { once: true });
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children || text}
    </button>
  );
}
