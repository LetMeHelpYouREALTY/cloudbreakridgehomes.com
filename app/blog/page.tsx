import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site-config";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateBlogIndexSchema,
  generateRealEstateAgentSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cloudbreak Ridge & Summerlin Blog | New Construction Updates",
  description:
    "Buyer guides and community news for Cloudbreak Ridge, La Madre Peaks, and Summerlin West — pricing, financing, floor plans, and grand-opening updates from Dr. Jan Duffy.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  keywords: [
    "Cloudbreak Ridge blog",
    "Summerlin new construction news",
    "KB Home Las Vegas updates",
    "La Madre Peaks homes",
  ],
};

const jsonLd = combineSchemas(
  generateRealEstateAgentSchema(),
  generateBlogIndexSchema(
    BLOG_POSTS.map((p) => ({ slug: p.slug, title: p.title, publishedAt: p.publishedAt }))
  ),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ])
);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

export default function BlogIndexPage() {
  return (
    <>
      <SchemaScript schema={jsonLd} id="blog-index-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="max-w-4xl mx-auto mb-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <span className="text-slate-900">Blog</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Cloudbreak Ridge &amp; Summerlin Blog
            </h1>
            <p className="text-lg text-slate-600">
              New construction updates, buyer guides, and community news for La Madre Peaks and
              Summerlin West — written for homebuyers, not industry jargon.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid gap-10">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="grid md:grid-cols-5 gap-6 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="md:col-span-2 relative min-h-[220px] md:min-h-full"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </Link>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                  <p className="text-sm text-blue-600 font-semibold mb-2">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-700">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 font-semibold text-sm hover:text-blue-800"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
