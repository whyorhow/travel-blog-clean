import React from "react";
import { Helmet } from "react-helmet-async";

function SEO({ title, description, image, slug, url }) {
  const baseUrl = "https://www.nomadscribbles.com";

  // Use 'url' if provided, otherwise construct from 'slug'
  let pageUrl = baseUrl;
  if (url) {
    pageUrl = url;
  } else if (slug) {
    pageUrl = slug.startsWith('http') ? slug : `${baseUrl}${slug.startsWith('/') ? '' : '/'}${slug}`;
  }

  // Handle absolute vs relative image paths
  let fullImage = `${baseUrl}/images/default-share.png`;
  if (image) {
    fullImage = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  const defaultDescription =
    "Nomad Scribbles – a collection of travel stories, sketches, and adventures across the world.";

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph (for Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Nomad Scribbles" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Fallback language */}
      <html lang="en" />
    </Helmet>
  );
}


export default SEO;

