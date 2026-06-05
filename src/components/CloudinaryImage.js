import React from 'react';
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from '../utils/cloudinary';

const CloudinaryImage = ({
  publicId,
  legacyPath, // Either provide publicId or legacyPath
  alt = "",
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  widths = [400, 800, 1200, 1600, 2400],
  quality = "q_auto",
  priority = false, // Set to true for hero/above-the-fold images
  showPlaceholder = true,
  ...props
}) => {
  // Determine the base Cloudinary public ID
  // A valid public ID must contain a '/' (folder/file) — bare IDs like "caipirinha" are not routable
  const isValidPublicId = publicId && publicId.includes('/');
  const legacyId = getPublicIdFromLegacyPath(legacyPath);
  // If legacyPath is a full Cloudinary URL, extract the public ID from it
  const cloudinaryUrlMatch = legacyPath && legacyPath.startsWith('http')
    ? legacyPath.match(/\/image\/upload\/[^/]+\/(.+)$/)
    : null;
  const extractedId = cloudinaryUrlMatch ? decodeURIComponent(cloudinaryUrlMatch[1]) : null;
  // If legacyPath isn't a /images/ path but contains '/', treat it as a direct Cloudinary public ID
  // Exclude absolute local paths (starting with '/') which are webpack-bundled assets
  const directId = (!legacyId && legacyPath && legacyPath.includes('/') && !legacyPath.startsWith('http') && !legacyPath.startsWith('/')) ? legacyPath : null;
  const idToUse = isValidPublicId ? publicId : (legacyId || extractedId || directId);
  
  // Fallback if no Cloudinary ID can be parsed
  if (!idToUse) {
    return legacyPath ? (
      <img 
        src={legacyPath} 
        alt={alt} 
        className={className} 
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        {...props} 
      />
    ) : null;
  }

  // Generate responsive srcset
  const srcSet = widths
    .map((w) => `${cloudinaryImageUrl(idToUse, { width: w, quality })} ${w}w`)
    .join(", ");

  const defaultWidth = widths[widths.length - 1] || 1200;
  const defaultSrc = cloudinaryImageUrl(idToUse, { width: defaultWidth, quality });

  // Low-quality image placeholder (LQIP)
  const lqipSrc = showPlaceholder ? cloudinaryImageUrl(idToUse, { width: 30, quality: "q_20" }) : "";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={showPlaceholder ? {
        backgroundImage: `url(${lqipSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(4px)'
      } : {}}
    >
      <img
        src={defaultSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className="w-full h-full transition-opacity duration-500"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={(e) => {
          e.currentTarget.parentElement.style.filter = 'none';
          e.currentTarget.parentElement.style.backgroundImage = 'none';
          props.onLoad?.(e);
        }}
        {...props}
      />
    </div>
  );
};

export default CloudinaryImage;
