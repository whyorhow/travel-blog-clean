import { cloudinaryImageUrl } from "../utils/cloudinary";

/** Cloudinary public id (upload from cloudinary-staging/images/Assets/wall-texture-.webp) */
export const NOMADS_WALL_PUBLIC_ID = "Assets/wall-texture-";

export function nomadsGalleryWallUrl({ width = 2400 } = {}) {
  return cloudinaryImageUrl(NOMADS_WALL_PUBLIC_ID, { width });
}

/** Local fallback until Cloudinary asset is uploaded (npm run upload:cloudinary:wall) */
export function nomadsGalleryWallFallbackUrl() {
  const base = process.env.PUBLIC_URL || "";
  return `${base}/assets/nomads-gallery/wall-texture.webp`;
}
