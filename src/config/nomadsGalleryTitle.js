import { cloudinaryImageUrl } from "../utils/cloudinary";

/** Cloudinary public id (upload from cloudinary-staging/images/Assets/Gallery-Tile.webp) */
export const NOMADS_GALLERY_TITLE_PUBLIC_ID = "Assets/Gallery-Tile";

export function nomadsGalleryTitleUrl({ width = 1200 } = {}) {
  return cloudinaryImageUrl(NOMADS_GALLERY_TITLE_PUBLIC_ID, { width });
}
