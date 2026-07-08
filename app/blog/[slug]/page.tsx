import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
import { LocalCtaBlock } from "@/components/sections/HyperlocalPageBlocks";
import {
  BLOG_POSTS,
  getAllBlogSlugs,
  getBlogPost,
} from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site-config";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateBlogPostingSchema,
  generateFAQSchema,
  generateRealEstateAgentSchema,
} from "@/lib/schema";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };

  const canonical = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    keywords: [...post.tags],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      url: canonical,
      images: [{ url: `${siteConfig.url}${post.image}`, alt: post.imageAlt }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const wordCount =
    post.directAnswer.split(/\s+/).length +
    post.sections.reduce(
      (sum, s) =>
        sum +
        s.paragraphs.join(" ").split(/\s+/).length +
        (s.bullets?.join(" ").split(/\s+/).length ?? 0),
      0
    );

  const jsonLd = combineSchemas(
    generateRealEstateAgentSchema(),
    generateBlogPostingSchema({
      slug: post.slug,
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      imagePath: post.image,
      imageAlt: post.imageAlt,
      wordCount,
    }),
    generateFAQSchema([...post.faqs]),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` },
    ])
  );

  return (
    <>
      <SchemaScript schema={jsonLd} id="blog-post-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            {" / "}
            <span className="text-slate-900 line-clamp-1">{post.title}</span>
          </nav>

          <header className="mb-8">
            <p className="text-sm font-semibold text-blue-600 mb-2">
              {formatDate(post.publishedAt)} · Dr. Jan Duffy
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-slate-700 leading-relaxed font-medium">{post.directAnswer}</p>
          </header>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-slate-100">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <aside className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick facts</h2>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm">
              {post.quickFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-semibold text-slate-900">{fact.label}</dt>
                  <dd className="text-slate-600 mt-0.5">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="prose prose-slate max-w-none mb-12">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="text-slate-700 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <FAQSection
            faqs={[...post.faqs]}
            title="Cloudbreak Ridge buyer FAQ"
            subtitle="Direct answers about pricing, KBHS financing, and touring with representation"
          />

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <Link href="/enclaves" className="text-blue-600 font-medium hover:text-blue-800">
              Enclaves floor plans →
            </Link>
            <Link href="/reserves" className="text-blue-600 font-medium hover:text-blue-800">
              Reserves floor plans →
            </Link>
            <Link
              href="/enclaves-vs-reserves"
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              Enclaves vs Reserves →
            </Link>
            <Link href="/bring-your-realtor" className="text-blue-600 font-medium hover:text-blue-800">
              Bring your Realtor →
            </Link>
          </div>

          <div className="mt-12">
            <LocalCtaBlock />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
