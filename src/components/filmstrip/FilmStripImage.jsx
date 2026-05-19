import React from "react";
import CloudinaryImage from "../CloudinaryImage";
import { filmstripPublicId } from "../../utils/filmstripPool";

const USE_DEDICATED_THUMBNAILS =
  process.env.REACT_APP_FILMSTRIP_THUMBNAILS === "true";

/** Layout frames are small but need ~2–3× px for retina + CSS zoom/scale */
export const FILMSTRIP_COMPACT_WIDTHS = [160, 220, 300, 400];
export const FILMSTRIP_COMPACT_SIZES =
  "(max-width: 640px) 72px, (max-width: 1024px) 96px, 120px";
export const FILMSTRIP_EXPANDED_WIDTHS = [320, 420, 560, 720];
export const FILMSTRIP_EXPANDED_SIZES =
  "(max-width: 640px) 220px, (max-width: 1024px) 280px, 360px";
export const FILMSTRIP_LIGHTBOX_WIDTHS = [480, 640, 800, 960];
export const FILMSTRIP_LIGHTBOX_SIZES =
  "(max-width: 640px) 280px, (max-width: 1024px) 360px, 480px";

/**
 * Compact strips use blog/small originals at higher delivery widths (CSS scales down).
 * Set REACT_APP_FILMSTRIP_THUMBNAILS=true after Cloudinary /thumbnails exist.
 */
export default function FilmStripImage({ cloudinary, alt, isCompact, className, sizes, widths }) {
  const blogId = filmstripPublicId(cloudinary);
  const thumbId = cloudinary?.thumbnail;
  const publicId =
    isCompact && USE_DEDICATED_THUMBNAILS && thumbId ? thumbId : blogId;

  if (!publicId) return null;

  return (
    <CloudinaryImage
      publicId={publicId}
      alt={alt}
      className={className}
      sizes={sizes}
      widths={widths}
      quality="q_auto:good"
      draggable={false}
    />
  );
}
