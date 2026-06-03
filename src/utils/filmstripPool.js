import galleryPool from "../assets/artImages/slices/bundles/gallery-pool.json";
import { cloudinaryImageUrl } from "./cloudinary";

const poolById = new Map(galleryPool.map((img) => [img.id, img]));

export function frameSeed(str, offset = 0) {
  return str.split("").reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1 + offset), 0);
}

export function getPoolImage(id) {
  return poolById.get(id) ?? null;
}

/** Full-size strip frames (non-z /small originals) */
export function filmstripPublicId(cloudinary) {
  if (!cloudinary) return null;
  if (cloudinary.blog) return cloudinary.blog;
  const gallery = cloudinary.gallery;
  if (!gallery) return null;
  return gallery.replace(/\/([^/]+)z$/i, "/$1");
}

/** Reserved path for future Cloudinary /thumbnails uploads (see artImages.json). */
export function filmstripThumbPublicId(cloudinary) {
  if (!cloudinary) return null;
  return cloudinary.thumbnail || filmstripPublicId(cloudinary);
}

export function resolveStripFrames(strip) {
  const seenImageKeys = new Set();

  return strip.frames
    .map((frame) => {
      if (frame.type === "note") {
        return { type: "note", text: frame.text, subtext: frame.subtext };
      }
      const img = getPoolImage(frame.id);
      if (!img) return null;
      return {
        type: "image",
        ...img,
        stripId: strip.id,
        stripTitle: strip.title,
      };
    })
    .filter(Boolean)
    .filter((frame) => {
      if (frame.type === "note") return true;
      const key = filmstripPublicId(frame.cloudinary) || frame.id;
      if (seenImageKeys.has(key)) return false;
      seenImageKeys.add(key);
      return true;
    });
}

export function toLightboxImage(img, stripTitle) {
  const lightboxId = img.cloudinary?.lightbox;
  const blogId = filmstripPublicId(img.cloudinary);
  return {
    image: cloudinaryImageUrl(lightboxId, { width: 1600 }),
    src: cloudinaryImageUrl(blogId, { width: 800 }),
    lightboxImagePublicId: lightboxId,
    imagePublicId: blogId,
    cloudinary: img.cloudinary,
    title: img.title,
    description: img.description,
    gumroadLink: img.gumroadLink,
    shopLink: img.shopLink,
    storyLink: img.storyLink,
    stripTitle,
    category: img.category,
  };
}

export function stripImageFrames(frames) {
  return frames.filter((f) => f.type === "image");
}
