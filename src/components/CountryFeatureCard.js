import React from "react";
import { Link } from "react-router-dom";
import CloudinaryImage from "./CloudinaryImage";

/**
 * Crawlable destination teaser: aspect-ratio box + responsive Cloudinary image.
 */
export default function CountryFeatureCard({
  to,
  legacyPath,
  publicId,
  title,
  subtitle = "Click to explore",
  rounded = "2xl",
}) {
  const roundedClass = rounded === "xl" ? "rounded-xl" : "rounded-2xl";

  return (
    <Link
      to={to}
      className={`group relative block w-full aspect-[3/4] overflow-hidden shadow-2xl ${roundedClass}`}
    >
      <CloudinaryImage
        legacyPath={legacyPath}
        publicId={publicId}
        alt={title}
        sizes="(max-width: 768px) 100vw, 400px"
        widths={[400, 800, 1200]}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 pt-10">
        <h3 className="font-cormorant text-xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-1 font-cormorant text-xs italic text-yellow-400">{subtitle}</p>
      </div>
    </Link>
  );
}
