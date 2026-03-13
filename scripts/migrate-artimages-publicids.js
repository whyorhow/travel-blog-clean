const fs = require("fs");
const path = require("path");

function normalizeCloudinaryPublicId(publicId) {
  if (!publicId || typeof publicId !== "string") return "";
  let id = publicId.trim().replace(/^\/+/, "");
  id = id.replace(/\.(webp|jpe?g|png|svg)$/i, "");
  id = id.replace(/^images\//i, "");
  return id;
}

function getPublicIdFromLegacyPath(p) {
  if (!p || typeof p !== "string") return "";
  const trimmed = p.trim();
  if (!trimmed.startsWith("/images/") && !trimmed.startsWith("images/")) return "";
  return normalizeCloudinaryPublicId(trimmed);
}

function migrateItem(item) {
  if (!item || typeof item !== "object") return item;

  const next = { ...item };

  if (next.image) {
    const pid = getPublicIdFromLegacyPath(next.image);
    if (pid) next.imagePublicId = pid;
  }

  if (next.lightboxImage) {
    const pid = getPublicIdFromLegacyPath(next.lightboxImage);
    if (pid) next.lightboxImagePublicId = pid;
  }

  const blogPath = next.blogimage || next.blogImage;
  if (blogPath) {
    const pid = getPublicIdFromLegacyPath(blogPath);
    if (pid) next.blogImagePublicId = pid;
  }

  return next;
}

function main() {
  const filePath = path.join(process.cwd(), "src", "assets", "artImages.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data)) {
    throw new Error("artImages.json must be an array");
  }

  const migrated = data.map(migrateItem);
  fs.writeFileSync(filePath, JSON.stringify(migrated, null, 2) + "\n", "utf8");

  const counts = {
    total: migrated.length,
    imagePublicId: migrated.filter((x) => x && x.imagePublicId).length,
    lightboxImagePublicId: migrated.filter((x) => x && x.lightboxImagePublicId).length,
    blogImagePublicId: migrated.filter((x) => x && x.blogImagePublicId).length,
  };

  console.log("Migrated artImages.json:", counts);
}

main();
