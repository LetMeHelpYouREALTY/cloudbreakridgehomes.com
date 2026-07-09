import type { ReactNode } from "react";
import Image from "next/image";
import { getPageHero, type PageHeroKey } from "@/lib/page-heroes";

/** Normalize text extracted from legacy hero markup (entities, escaped JSX fragments). */
function normalizeHeroText(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\{\s*"\\?"\s*\}/g, " ")
    .replace(/\\"/g, '"');
}

function renderTextWithOptionalHtml(text: string, className: string) {
  const normalized = normalizeHeroText(text);
  if (/<[a-z][\s\S]*>/i.test(normalized)) {
    return (
      <p
        className={className}
        dangerouslySetInnerHTML={{ __html: normalized }}
      />
    );
  }
  return <p className={className}>{normalized}</p>;
}

type PageHeroProps = {
  heroKey: PageHeroKey;
  badge?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  priority?: boolean;
  className?: string;
};

const TITLE_CLASS =
  "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-balance [&_span]:text-blue-200";
const SUBTITLE_CLASS =
  "text-lg md:text-xl lg:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed text-balance [&_a]:text-blue-200 [&_a]:font-semibold [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:text-white";

/**
 * Full-width hero band with page-specific background image (public/images/hero/{key}.webp).
 */
export default function PageHero({
  heroKey,
  badge,
  title,
  subtitle,
  children,
  priority = false,
  className = "",
}: PageHeroProps) {
  const hero = getPageHero(heroKey);

  return (
    <section
      className={`relative overflow-hidden rounded-none md:rounded-2xl mb-12 md:mb-14 -mx-4 md:mx-0 ${className}`}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/55 to-slate-900/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-14 md:py-20 lg:py-24 text-center text-white">
        {badge && (
          <p className="text-sm font-semibold text-blue-200 mb-3 tracking-wide">{badge}</p>
        )}
        {typeof title === "string" ? (
          /<[a-z][\s\S]*>/i.test(normalizeHeroText(title)) ? (
            <h1
              className={TITLE_CLASS}
              dangerouslySetInnerHTML={{ __html: normalizeHeroText(title) }}
            />
          ) : (
            <h1 className={TITLE_CLASS}>{normalizeHeroText(title)}</h1>
          )
        ) : (
          <h1 className={TITLE_CLASS}>{title}</h1>
        )}
        {subtitle &&
          (typeof subtitle === "string" ? (
            renderTextWithOptionalHtml(subtitle, SUBTITLE_CLASS)
          ) : (
            <p className={SUBTITLE_CLASS}>{subtitle}</p>
          ))}
        {children}
      </div>
    </section>
  );
}
