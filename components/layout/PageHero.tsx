import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  objectPosition?: string;
  /** Altura del hero. Default: "h-56 sm:h-72" */
  height?: string;
}

/**
 * Hero reutilizable para páginas públicas.
 * Overlay verde institucional semitransparente sobre la imagen.
 */
export default function PageHero({
  title,
  subtitle,
  image,
  objectPosition = "center center",
  height = "h-56 sm:h-72",
}: PageHeroProps) {
  return (
    <div className={`relative ${height} overflow-hidden`}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        style={{ objectPosition }}
        priority
      />
      {/* Overlay verde institucional */}
      <div className="absolute inset-0 bg-[#00695C]/75" />
      <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-[#B2DFDB] text-base sm:text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
