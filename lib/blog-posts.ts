import type { FAQItem } from "@/lib/schema";
import { CLOUDBREAK_RIDGE } from "@/lib/cloudbreak-ridge";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  imageAlt: string;
  tags: readonly string[];
  /** Direct-answer lead for the article (first paragraph). */
  directAnswer: string;
  sections: ReadonlyArray<{
    heading: string;
    paragraphs: readonly string[];
    bullets?: readonly string[];
  }>;
  quickFacts: ReadonlyArray<{ label: string; value: string }>;
  faqs: readonly FAQItem[];
};

const KBHS_DESIGN_STUDIO = "5795 Badura Ave #150, Las Vegas, NV 89118";

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "cloudbreak-ridge-grand-opening-kbhs-below-market-rates",
    title:
      "Cloudbreak Ridge Grand Opening: Below Market Rates & KBHS Financing (July 2026)",
    description:
      "KB Home’s Cloudbreak Ridge grand opening in La Madre Peaks — from $839,990, gated Enclaves & Reserves, below-market-rate financing through KBHS Home Loans, move-in-ready inventory, and 4–5 month personalized builds.",
    excerpt:
      "Grand opening at 1168 Cloudbreak Cove Dr. in Summerlin’s La Madre Peaks village — gated new construction from $839,990 with KBHS “below market rates” (rate requires KBHS financing) and one move-in-ready home now.",
    publishedAt: "2026-07-08",
    image: "/images/blog/cloudbreak-ridge-grand-opening-kbhs-offer.webp",
    imageAlt:
      "Gated Cloudbreak Ridge new homes in La Madre Peaks, Summerlin West, at the base of the La Madre Mountains",
    tags: [
      "Cloudbreak Ridge",
      "KB Home",
      "La Madre Peaks",
      "Summerlin new construction",
      "KBHS Home Loans",
    ],
    directAnswer:
      "Cloudbreak Ridge at Summerlin is in grand-opening phase at 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138, with homes from $839,990 in gated La Madre Peaks. KB Home advertises “below market rates” through KBHS Home Loans — the captive lender — but the specific rate is not published publicly and requires KBHS financing to access. One move-in-ready home is available now; personalized builds run about 4–5 months.",
    sections: [
      {
        heading: "What is the best current offer at Cloudbreak Ridge?",
        paragraphs: [
          "KB Home is promoting below market rates through KBHS Home Loans, LLC — KB Home’s affiliated mortgage company. The marketing emphasizes transparent pricing and competitive financing, but the exact interest rate is not stated on the public community pages. Buyers typically must use KBHS to access that promotional pricing tier.",
          "That does not mean you must skip independent advice: Dr. Jan Duffy represents buyers (not the builder) and can help you compare KBHS terms against outside lenders, lot premiums, and design-center options before you commit.",
        ],
        bullets: [
          "Promotional label: “Below Market Rates” (KBHS Home Loans)",
          "Specific rate: not publicly listed — confirm in writing with KBHS",
          "Financing: promotional pricing tied to KBHS; shop alternatives before you sign",
        ],
      },
      {
        heading: "Where is Cloudbreak Ridge and what is open now?",
        paragraphs: [
          "Cloudbreak Ridge is KB Home’s newest neighborhood in Summerlin’s La Madre Peaks village — Summerlin West at the base of the La Madre Mountains. The sales office and models are at 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138.",
          "The community is gated and includes Enclaves (single-story) and Reserves (two-story) collections. As of July 2026, KB Home shows one confirmed move-in-ready home available now, with personalized new builds delivering in approximately four to five months.",
        ],
      },
      {
        heading: "Where is the KB Home Design Studio?",
        paragraphs: [
          `Interior selections for KB Home Las Vegas buyers are handled at the Design Studio: ${KBHS_DESIGN_STUDIO}. Plan design-center appointments with your buyer’s agent so structural and finish choices stay within budget.`,
        ],
      },
      {
        heading: "Why register a Realtor before your first visit?",
        paragraphs: [
          "Most builders require your buyer’s agent on the first model-home registration. Visiting alone can limit independent representation. Call Dr. Jan Duffy at 702-222-1964 before you tour Cloudbreak Ridge so she can register with you and review Enclaves vs Reserves floor plans, homesite premiums, and KBHS vs outside lender options.",
        ],
      },
    ],
    quickFacts: [
      { label: "Community", value: "Cloudbreak Ridge at Summerlin" },
      { label: "Address", value: CLOUDBREAK_RIDGE.address.full },
      { label: "Price from", value: "$839,990 (builder list; homesite premium may apply)" },
      { label: "Village", value: "La Madre Peaks, Summerlin West (gated)" },
      { label: "Move-in ready", value: "1 home confirmed available (July 2026 — confirm live)" },
      { label: "Personalized build", value: "Approx. 4–5 month delivery" },
      { label: "Design Studio", value: KBHS_DESIGN_STUDIO },
      {
        label: "Financing promo",
        value: "Below market rates via KBHS Home Loans (rate not public; KBHS required)",
      },
    ],
    faqs: [
      {
        question: "What are the below market rates at Cloudbreak Ridge?",
        answer:
          "KB Home advertises below market rates through KBHS Home Loans. The specific rate is not published online — you must apply through KBHS to see current terms. Compare KBHS against other lenders with your Realtor before you lock.",
      },
      {
        question: "How much do Cloudbreak Ridge homes cost?",
        answer:
          "KB Home lists Reserves at Cloudbreak Ridge from $839,990 as of mid-2026. Enclaves and other plans also start in the $800,000s. Homesite premiums, elevations, and design options add to the base price.",
      },
      {
        question: "Is there a move-in-ready home at Cloudbreak Ridge now?",
        answer:
          "KB Home showed one move-in-ready home available in July 2026. Inventory changes daily — confirm with the sales office or ask Dr. Jan Duffy to verify before you visit 1168 Cloudbreak Cove Dr.",
      },
      {
        question: "How long does a personalized KB Home build take at Cloudbreak Ridge?",
        answer:
          "KB Home quotes approximately four to five months for personalized new homes at Cloudbreak Ridge, depending on plan, homesite, and option selections.",
      },
      {
        question: "Where is the Cloudbreak Ridge model home?",
        answer:
          "Models and the KB Home sales office are at 1168 Cloudbreak Cove Dr., Las Vegas, NV 89138, in La Madre Peaks, Summerlin West.",
      },
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
