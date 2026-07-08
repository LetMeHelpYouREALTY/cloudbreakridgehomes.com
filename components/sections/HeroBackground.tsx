import Image from "next/image";

const HERO_IMAGE = "/Image/hero_bg_1.jpg";

type HeroBackgroundProps = {
  alt?: string;
};

export default function HeroBackground({
  alt = "Summerlin La Madre Peaks homes at Cloudbreak Ridge",
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 opacity-30" aria-hidden="true">
      <Image
        src={HERO_IMAGE}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />
    </div>
  );
}
