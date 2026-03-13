export const CLOUDINARY_CLOUD_NAME = "dqypj6rlw";

export function normalizeCloudinaryPublicId(publicId) {
  if (!publicId || typeof publicId !== "string") return "";

  // Allow passing legacy "/images/..." paths.
  let id = publicId.trim().replace(/^\/+/, "");

  // Strip common image extensions to keep IDs consistent.
  id = id.replace(/\.(webp|jpe?g|png|svg)$/i, "");

  return id;
}

export function cloudinaryImageUrl(publicId, { width } = {}) {
  const id = normalizeCloudinaryPublicId(publicId);
  if (!id) return "";

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms.join(",")}/${id}`;
}

export function getPublicIdFromLegacyPath(path) {
  if (!path || typeof path !== "string") return "";

  // Legacy paths are like "/images/Folder/file.webp".
  // We want public ID "images/Folder/file".
  const trimmed = path.trim();
  if (!trimmed.startsWith("/images/") && !trimmed.startsWith("images/")) return "";
  return normalizeCloudinaryPublicId(trimmed);
}
