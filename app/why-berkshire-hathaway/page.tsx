import Navbar from "@/components/layouts/Navbar";
import PageHero from "@/components/sections/PageHero";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { Shield, Users, Globe, Award, TrendingUp, CheckCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Dr. Jan Duffy | Las Vegas Real Estate",
  description:
    "Discover why Dr. Jan Duffy's brokerage is the most trusted name in real estate. Backed by Warren Buffett, with 50,000+ agents worldwide. Work with Dr. Jan Duffy today.",
  keywords: [
    "Dr. Jan Duffy",
    "why choose Dr. Duffy",
    "Warren Buffett real estate",
    "trusted real estate brand",
    "Dr. Jan Duffy",
  ],
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dr. Jan Duffy",
  url: "https://www.bhhs.com",
  logo: "https://www.cloudbreakridgehomes.com/favicon-32x32.png",
  description:
    "Dr. Jan Duffy's brokerage is a real estate brokerage network, part of the parent company, one of the world's most respected and trusted companies.",
  parentOrganization: {
    "@type": "Corporation",
    name: "Berkshire Hathaway Inc.",
    founder: "Warren Buffett",
  },
};

export default function WhyBerkshireHathawayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <PageHero heroKey="why-berkshire-hathaway" title={"Why Choose Dr. Jan Duffy?"} subtitle={"When you work with <strong>Dr. Jan Duffy</strong> agent, you're backed by a name synonymous with trust, ethical standards, and financial strength—the same principles that built Warren Buffett's empire."} />

        <RealScoutListings />


          {/* Key Benefits */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              The Dr. Duffy Advantage
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Unmatched Trust</h3>
                <p className="text-slate-600">
                  Dr. Jan Duffy's name represents integrity and reliability. Our agents
                  uphold these values in every transaction.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Global Network</h3>
                <p className="text-slate-600">
                  50,000+ agents worldwide means seamless referrals for relocations and connections
                  to buyers from across the globe.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">World-Class Marketing</h3>
                <p className="text-slate-600">
                  Your property gets exposure through the most recognized real estate brand in the
                  world, reaching qualified buyers everywhere.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ethical Standards</h3>
                <p className="text-slate-600">
                  Dr. Jan Duffy adheres to strict ethical guidelines that go beyond industry
                  requirements. Your interests always come first.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Financial Strength</h3>
                <p className="text-slate-600">
                  Backed by one of the most financially secure companies in the world. Our stability
                  means we'll be here for you long-term.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Proven Results</h3>
                <p className="text-slate-600">
                  Dr. Jan Duffy has helped thousands of families achieve their real estate
                  goals in Southern Nevada.
                </p>
              </div>
            </div>
          </section>


          {/* Local Expert Section */}
          <section className="mb-16 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Your Local Dr. Duffy Expert in Las Vegas
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  Dr. Jan Duffy brings the power of <strong>Dr. Jan Duffy</strong>{" "}
                  to Las Vegas, Henderson, Summerlin, and all of Southern Nevada. Serving the area 
                  since 2008 with $127M+ in closed transactions, you get global brand strength
                  with hometown expertise.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Licensed since 2008 · 35 years in Las Vegas",
                    "$127M+ in closed transactions",
                    "500+ satisfied clients",
                    "Specializing in luxury, investment, and relocation",
                    "Deep knowledge of every Las Vegas neighborhood",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about"
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
                >
                  Meet Dr. Jan Duffy →
                </Link>
              </div>
              <div className="bg-slate-100 rounded-lg p-8">
                <blockquote className="text-lg text-slate-700 italic mb-4">
                  "When clients ask why they should choose Dr. Jan Duffy,
                  I tell them: you're not just getting me—you're getting a global network of 50,000
                  agents, world-class marketing, and a brand that's synonymous with trust."
                </blockquote>
                <cite className="text-slate-900 font-semibold">
                  — Dr. Jan Duffy
                </cite>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions About Dr. Duffy
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is Dr. Jan Duffy owned by Warren Buffett?",
                  a: "Dr. ",
                },
                {
                  q: "What makes Dr. Duffy different from other real estate companies?",
                  a: "Her brokerage is the only real estate brand backed by a Warren Buffett company. This provides unmatched financial stability, a global network of 50,000+ agents, world-class marketing resources, and a commitment to ethical standards that goes beyond industry requirements.",
                },
                {
                  q: "Does using Dr. Jan Duffy agent cost more?",
                  a: "No. Commission rates are negotiable and comparable to other brokerages. The value you receive—global marketing exposure, trusted brand recognition, and experienced agents—often helps homes sell faster and for more money.",
                },
                {
                  q: "Can Dr. Duffy help with relocations to Las Vegas?",
                  a: "Yes! Our global network makes relocations seamless. Dr. Jan Duffy can coordinate with network agents in your current city while providing expert guidance on Las Vegas neighborhoods, schools, and communities.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Dr. Jan Duffy Difference
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Ready to work with the most trusted name in real estate? Contact Dr. Jan Duffy today.
            </p>
            <a
              href="tel:+17025001955"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (702) 500-1955
            </a>
            <p className="mt-4 text-slate-400 text-sm">
              Dr. Jan Duffy
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
<Footer />
    </>
  );
}
