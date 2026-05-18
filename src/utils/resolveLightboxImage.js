import {
  cloudinaryImageUrl,
  cloudinaryUrlFromLegacyPath,
  getPublicIdFromLegacyPath,
} from "./cloudinary";

/**
 * Resolve a gallery/lightbox item to a display URL.
 * Accepts strings, legacy /images/ paths, Cloudinary public IDs, or rich objects.
 */
export function resolveLightboxSrc(item, { width = 1600 } = {}) {
  if (!item) return "";

  if (typeof item === "string") {
    if (item.startsWith("/assets/") || item.startsWith("http")) return item;
    return (
      cloudinaryImageUrl(item, { width }) ||
      cloudinaryUrlFromLegacyPath(item, { width }) ||
      ""
    );
  }

  const legacyPath = item.lightboxImage || item.image || item.src;
  const publicId =
    item.lightboxImagePublicId ||
    item.imagePublicId ||
    item.publicId ||
    getPublicIdFromLegacyPath(legacyPath);

  if (publicId) {
    return cloudinaryImageUrl(publicId, { width });
  }

  if (typeof legacyPath === "string") {
    if (legacyPath.startsWith("/assets/") || legacyPath.startsWith("http")) {
      return legacyPath;
    }
    return cloudinaryUrlFromLegacyPath(legacyPath, { width }) || "";
  }

  if (legacyPath) return legacyPath;

  return "";
}

export function normalizeLightboxIndex(index) {
  return index === null || index === undefined || index < 0 ? null : index;
}

export function isLightboxOpen(index) {
  return normalizeLightboxIndex(index) !== null;
}
