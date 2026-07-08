import Link from "next/link";
import { Phone, MapPin, Calendar, ArrowRight } from "lucide-react";
import {
  CLOUDBREAK_RIDGE,
  BRING_YOUR_REALTOR,
  NEARBY_AMENITIES,
} from "@/lib/cloudbreak-ridge";
import { officeInfo, agentInfo } from "@/lib/site-config";
import CalendlyButton from "@/components/calendly/CalendlyButton";

const INTERNAL_LINKS = [
  { href: "/enclaves", label: "Enclaves at Cloudbreak Ridge" },
  { href: "/reserves", label: "Reserves at Cloudbreak Ridge" },
  { href: "/enclaves-vs-reserves", label: "Enclaves vs Reserves comparison" },
  { href: "/floor-plans", label: "All KB Home floor plans" },
  { href: "/schools", label: "Schools near Cloudbreak Ridge" },
  { href: "/neighborhoods", label: "Summerlin neighborhoods near Cloudbreak Ridge" },
  { href: "/la-madre-peaks", label: "La Madre Peaks village guide" },
  { href: "/bring-your-realtor", label: "Bring your Realtor to the first visit" },
  { href: "/new-construction", label: "New construction buyer representation" },
  { href: "/contact", label: "Contact Dr. Jan Duffy" },
  { href: "/about", label: "About Dr. Jan Duffy" },
] as const;

type IntroProps = {
  h2: string;
  lead: string;
  children?: React.ReactNode;
};

/** Hyperlocal intro under H1 — place + service + area. */
export function HyperlocalIntro({ h2, lead, children }: IntroProps) {
  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{h2}</h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">{lead}</p>
      {children}
    </section>
  );
}

/** Community facts block — address, collections, amenities. */
export function GeoEntityBlock({
  title = "About Cloudbreak Ridge",
}: {
  title?: string;
}) {
  return (
    <section className="mb-14 max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>
      <p className="text-slate-700 mb-6">
        {CLOUDBREAK_RIDGE.name} by {CLOUDBREAK_RIDGE.builder} sits in{" "}
        {CLOUDBREAK_RIDGE.village}, {CLOUDBREAK_RIDGE.region}, inside the{" "}
        {CLOUDBREAK_RIDGE.masterPlan} master plan at the base of the{" "}
        {CLOUDBREAK_RIDGE.landmark}. Models and sales office:{" "}
        <strong>{CLOUDBREAK_RIDGE.address.full}</strong>.
      </p>
      <dl className="grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="font-semibold text-slate-900">Community address</dt>
          <dd className="text-slate-600">{CLOUDBREAK_RIDGE.address.full}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Collections</dt>
          <dd className="text-slate-600">Enclaves (single-story) · Reserves (two-story)</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Price from (builder list)</dt>
          <dd className="text-slate-600">{CLOUDBREAK_RIDGE.priceFromVerifiedNote}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Commute anchors</dt>
          <dd className="text-slate-600">
            {CLOUDBREAK_RIDGE.accessibility.downtownSummerlinDrive} to Downtown Summerlin® via{" "}
            {CLOUDBREAK_RIDGE.accessibility.beltway}; {CLOUDBREAK_RIDGE.accessibility.grandPark}
          </dd>
        </div>
      </dl>
      <ul className="mt-6 space-y-2 text-sm text-slate-600">
        {NEARBY_AMENITIES.map((a) => (
          <li key={a.name}>
            <strong className="text-slate-800">{a.name}</strong> ({a.status}): {a.description}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-slate-500">
        Facts cited from Summerlin.com (Jun 2026) and KB Home community pages. Confirm live pricing
        and incentives with the builder.
      </p>
    </section>
  );
}

const DEFAULT_SERVICES = [
  {
    title: "Buyer representation for KB Home new construction",
    body: "Independent review of contracts, lot premiums, and design-center options at Enclaves and Reserves — your agent works for you, not the builder.",
  },
  {
    title: "First-visit registration (bring your Realtor)",
    body: BRING_YOUR_REALTOR.body,
  },
  {
    title: "Enclaves vs Reserves comparison",
    body: "Side-by-side floorplan and homesite guidance: single-story 2,251–2,387 sq ft vs two-story 2,753–3,095 sq ft with a planned neighborhood park.",
  },
  {
    title: "Summerlin West orientation",
    body: "Maps to Scout’s Point, Grand Park, Downtown Summerlin® (~5 minutes on the 215), and Red Rock Canyon recreation — square footage and commute times, not demographic labels.",
  },
];

/** Realtor services framed to Cloudbreak Ridge / Summerlin West. */
export function LocalServicesBlock({
  services = DEFAULT_SERVICES,
}: {
  services?: Array<{ title: string; body: string }>;
}) {
  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
        What realtor services do you offer at Cloudbreak Ridge?
      </h2>
      <p className="text-slate-700 mb-6">
        Dr. Jan Duffy ({agentInfo.license}) with {agentInfo.brokerage} represents buyers shopping{" "}
        {CLOUDBREAK_RIDGE.name} in {CLOUDBREAK_RIDGE.village} — and Summerlin West resale when
        comparing options.
      </p>
      <div className="space-y-5">
        {services.map((s) => (
          <div key={s.title}>
            <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Local CTAs — Calendly + CTA phone + maps (community and/or office). */
export function LocalCtaBlock({
  showCommunityMap = true,
  showOfficeNap = true,
}: {
  showCommunityMap?: boolean;
  showOfficeNap?: boolean;
}) {
  return (
    <section className="mb-14 max-w-4xl mx-auto rounded-xl bg-blue-600 text-white p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Ready to tour Cloudbreak Ridge in La Madre Peaks?
      </h2>
      <p className="text-blue-100 mb-6">
        Call or text the client line, book Calendly, or get directions to the models at{" "}
        {CLOUDBREAK_RIDGE.address.full}. Register Dr. Jan before your first KB Home visit.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
        <a
          href={CLOUDBREAK_RIDGE.ctaPhoneTel}
          className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
        >
          <Phone className="h-5 w-5 mr-2" />
          Call {CLOUDBREAK_RIDGE.ctaPhone}
        </a>
        <CalendlyButton
          text="Book a buyer consultation"
          className="inline-flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-md font-bold"
        />
        <a
          href={CLOUDBREAK_RIDGE.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-white/40 px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
        >
          <MapPin className="h-5 w-5 mr-2" />
          Directions to models
        </a>
      </div>
      {showCommunityMap && (
        <div className="rounded-lg overflow-hidden mb-6 aspect-video max-h-64 bg-slate-800">
          <iframe
            src={CLOUDBREAK_RIDGE.mapsEmbedUrl}
            title={`Map — ${CLOUDBREAK_RIDGE.address.full}`}
            className="w-full h-64 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}
      {showOfficeNap && (
        <div className="text-sm text-blue-100 border-t border-white/20 pt-4">
          <p className="font-semibold text-white mb-1">Brokerage office (not the model homes)</p>
          <p>
            {officeInfo.name} · {officeInfo.address.full} · Office line {officeInfo.phone}
          </p>
          <p className="mt-1">
            {agentInfo.name}, {agentInfo.title} · License {agentInfo.license}
          </p>
        </div>
      )}
    </section>
  );
}

/** Descriptive internal links for related Cloudbreak Ridge guides. */
export function LocalInternalLinks({
  excludeHref,
}: {
  excludeHref?: string;
}) {
  const links = INTERNAL_LINKS.filter((l) => l.href !== excludeHref);
  return (
    <section className="mb-10 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Explore Cloudbreak Ridge and Summerlin West
      </h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CommunityFaqList({
  faqs,
  title = "Frequently asked questions",
}: {
  faqs: ReadonlyArray<{ question: string; answer: string }>;
  title?: string;
}) {
  return (
    <section className="mb-14 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
            <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500 flex items-start gap-2">
        <Calendar className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        Pricing and incentives change often — confirm current builder details before you visit.
      </p>
    </section>
  );
}

/** @deprecated Use CommunityFaqList — kept for imports during migration */
export const AeoFaqList = CommunityFaqList;
