export const CLOUDINARY_CLOUD_NAME = "dqypj6rlw";

/** Map new Brazil/* folder IDs to legacy Cloudinary paths until re-upload completes. */
const BRAZIL_LEGACY_PREFIXES = [
  ["Brazil/Sao Paulo/Landing/", "SaoPauloLanding/"],
  ["Brazil/Sao Paulo/Green Spaces/", "SP-Parks/"],
  ["Brazil/Sao Paulo/Galleries/", "ArtGallery/"],
  ["Brazil/Sao Paulo/Carnival/", "CarnivalSP/"],
  ["Brazil/Sao Paulo/Street Art/", "Murals/"],
  ["Brazil/Bonito/", "Bonito/"],
  ["Brazil/Floripa/", "Floripa/"],
  ["Brazil/Food-Drink/", "Food-Drink/"],
  ["Brazil/Iguazu/", "Iguazu/"],
  ["Brazil/Ilha Grande/", "IlhaGrande/"],
  ["Brazil/IlhaGrande/", "IlhaGrande/"],
  ["Brazil/Manaus/", "Manaus/"],
  ["Brazil/Natural Spaces/", "Natural Spaces/"],
  ["Brazil/Pantanal/", "Pantanal/"],
  ["Brazil/Rio/", "Rio/"],
  ["Brazil/Salvador/", "Salvador/"],
  ["Brazil/Santos/", "Santos/"],
];

function resolveCloudinaryPublicId(publicId) {
  const id = normalizeCloudinaryPublicId(publicId);
  if (!id) return "";

  for (const [newPrefix, oldPrefix] of BRAZIL_LEGACY_PREFIXES) {
    if (id.startsWith(newPrefix)) {
      return oldPrefix + id.slice(newPrefix.length);
    }
  }

  return id;
}

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

/** Responsive srcSet string for a Cloudinary public ID */
export function cloudinarySrcSet(publicId, widths = [400, 800, 1200, 1600], options = {}) {
  const id = resolveCloudinaryPublicId(publicId);
  if (!id) return "";
  return widths
    .map((w) => `${cloudinaryImageUrl(id, { width: w, ...options })} ${w}w`)
    .join(", ");
}

export function cloudinaryImageUrl(publicId, { width, version, quality = "q_auto" } = {}) {
  const id = resolveCloudinaryPublicId(publicId);
  if (!id) return "";

  const encodedId = id
    .split("/")
    .filter(Boolean)
    .map((seg) => encodeURIComponent(seg))
    .join("/");

  const transforms = ["f_auto", quality];
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
