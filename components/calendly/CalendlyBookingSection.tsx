import CalendlyInlineWidget from "./CalendlyInlineWidget";

type CalendlyBookingSectionProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: "light" | "dark";
};

export default function CalendlyBookingSection({
  title = "Schedule Your Free Consultation",
  subtitle = "Book a 30-minute buyer consultation with Dr. Jan Duffy.",
  className = "",
  variant = "light",
}: CalendlyBookingSectionProps) {
  const isDark = variant === "dark";

  return (
    <section className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-6">
          {title && (
            <h2
              className={`text-2xl md:text-3xl font-bold mb-3 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-3xl mx-auto">
        <CalendlyInlineWidget />
      </div>
    </section>
  );
}
