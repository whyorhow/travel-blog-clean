import React from "react";
import { Helmet } from "react-helmet-async";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import { seoConfig } from "../config/seo";

function SEO({ pageId, title, description, image, slug, url }) {
  const config = pageId && seoConfig[pageId] ? seoConfig[pageId] : {};
  
  const finalTitle = title || config.title || seoConfig.default.title;
  const finalDescription = description || config.description || seoConfig.default.description;
  const finalImage = image || config.image || seoConfig.default.image;
  const finalSlug = url ? url : (slug || config.slug || "");

  const baseUrl = "https://www.nomadscribbles.com";

  let pageUrl = baseUrl;
  if (finalSlug) {
    pageUrl = finalSlug.startsWith('http') ? finalSlug : `${baseUrl}${finalSlug.startsWith('/') ? '' : '/'}${finalSlug}`;
  }

  // Handle absolute vs relative image paths
  let fullImage = `${baseUrl}/images/default-share.png`;
  if (finalImage) {
    if (finalImage.startsWith("http")) {
      fullImage = finalImage;
    } else {
      const cloud = cloudinaryUrlFromLegacyPath(finalImage, { width: 1600 });
      fullImage = cloud || `${baseUrl}${finalImage}`;
    }
  }

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph (for Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Nomad Scribbles" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Fallback language */}
      <html lang="en" />
    </Helmet>
  );
}

export default SEO;
