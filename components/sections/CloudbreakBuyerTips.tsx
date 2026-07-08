import Link from "next/link";
import {
  CLOUDBREAK_RIDGE,
  WHY_BUY_EARLY,
  BRING_YOUR_REALTOR,
  BUYER_FIT_NOTES,
  FINAL_THOUGHTS,
} from "@/lib/cloudbreak-ridge";
import CalendlyButton from "@/components/calendly/CalendlyButton";

export default function CloudbreakBuyerTips() {
  return (
    <section
      className="py-16 bg-white border-t border-slate-100"
      id="buy-early-realtor"
      aria-labelledby="buy-early-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl space-y-10">
        <div>
          <h2 id="buy-early-heading" className="text-3xl font-bold text-slate-900 mb-4">
            {WHY_BUY_EARLY.heading}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            {WHY_BUY_EARLY.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {BRING_YOUR_REALTOR.heading}
          </h2>
          <p className="text-slate-700 mb-4">{BRING_YOUR_REALTOR.body}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CLOUDBREAK_RIDGE.ctaPhoneTel}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-blue-700"
            >
              Call {CLOUDBREAK_RIDGE.ctaPhone}
            </a>
            <CalendlyButton text="Book a buyer consultation" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{BUYER_FIT_NOTES.heading}</h2>
          <p className="text-slate-700">{BUYER_FIT_NOTES.body}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{FINAL_THOUGHTS.heading}</h2>
          <p className="text-slate-700 mb-3">{FINAL_THOUGHTS.body}</p>
          <p className="text-sm text-slate-600">
            Community: {CLOUDBREAK_RIDGE.address.full}. Brokerage office:{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact Dr. Jan Duffy
            </Link>{" "}
            · Berkshire Hathaway HomeServices Nevada Properties.
          </p>
        </div>
      </div>
    </section>
  );
}
