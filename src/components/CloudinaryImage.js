import React from 'react';
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from '../utils/cloudinary';

const CloudinaryImage = ({
  publicId,
  legacyPath, // Either provide publicId or legacyPath
  alt = "",
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  widths = [400, 800, 1200, 1600, 2400],
  priority = false, // Set to true for hero/above-the-fold images
  ...props
}) => {
  // Determine the base Cloudinary public ID
  const idToUse = publicId || getPublicIdFromLegacyPath(legacyPath);
  
  // Fallback if no Cloudinary ID can be parsed
  if (!idToUse) {
    return legacyPath ? (
      <img 
        src={legacyPath} 
        alt={alt} 
        className={className} 
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : "auto"}
        {...props} 
      />
    ) : null;
  }

  // Generate responsive srcset
  const srcSet = widths
    .map(w => `${cloudinaryImageUrl(idToUse, { width: w })} ${w}w`)
    .join(", ");

  // Default src for browsers that don't support srcset (or fallback)
  const defaultSrc = cloudinaryImageUrl(idToUse, { width: 1200 });

  return (
    <img
      src={defaultSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "auto"}
      {...props}
    />
  );
};

export default CloudinaryImage;
