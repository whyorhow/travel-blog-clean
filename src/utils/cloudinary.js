export const CLOUDINARY_CLOUD_NAME = "dqypj6rlw";

export function normalizeCloudinaryPublicId(publicId) {
  if (!publicId || typeof publicId !== "string") return "";

  // Allow passing legacy "/images/..." paths.
  let id = publicId.trim().replace(/^\/+/, "");

  // Strip common image extensions to keep IDs consistent.
  id = id.replace(/\.(webp|jpe?g|png|svg)$/i, "");

  // Our Cloudinary uploader sets public_id relative to the local `images/` folder,
  // so Cloudinary public IDs do NOT include a leading `images/` segment.
  id = id.replace(/^images\//i, "");

  return id;
}

export function cloudinaryImageUrl(publicId, { width, version } = {}) {
  const id = normalizeCloudinaryPublicId(publicId);
  if (!id) return "";

  const encodedId = id
    .split("/")
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join("/");

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);

  const versionSegment = version ? `v${version}/` : "";
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms.join(",")}/${versionSegment}${encodedId}`;
}

export function getPublicIdFromLegacyPath(path) {
  if (!path || typeof path !== "string") return "";

  // Legacy paths are like "/images/Folder/file.webp".
  // We want public ID "images/Folder/file".
  const trimmed = path.trim();
  if (!trimmed.startsWith("/images/") && !trimmed.startsWith("images/")) return "";
  return normalizeCloudinaryPublicId(trimmed);
}

export function cloudinaryUrlFromLegacyPath(path, { width } = {}) {
  const publicId = getPublicIdFromLegacyPath(path);
  if (!publicId) return "";
  return cloudinaryImageUrl(publicId, { width });
}
