import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { cloudinaryUrlFromLegacyPath } from "../utils/cloudinary";
import { seoConfig } from "../config/seo";
import { labelForSegment } from "../config/breadcrumbLabels";

const BASE_URL = "https://www.nomadscribbles.com";

function buildPageUrl(explicitSlug, pathname) {
  if (explicitSlug) {
    if (explicitSlug.startsWith("http")) return explicitSlug;
    const path = explicitSlug.startsWith("/") ? explicitSlug : `/${explicitSlug}`;
    return `${BASE_URL}${path}`;
  }
  if (pathname && pathname !== "/") {
    return `${BASE_URL}${pathname}`;
  }
  return BASE_URL;
}

function buildBreadcrumbJsonLd(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${BASE_URL}/`,
    },
  ];

  let pathAcc = "";
  segments.forEach((segment, index) => {
    pathAcc += `/${segment}`;
    itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      name: labelForSegment(segment),
      item: `${BASE_URL}${pathAcc}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

function buildArticleJsonLd({ title, description, image, pageUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Nomad Scribbles",
      url: BASE_URL,
    },
  };
}

function SEO({ pageId, title, description, image, slug, url, type = "website" }) {
  const { pathname } = useLocation();
  const config = pageId && seoConfig[pageId] ? seoConfig[pageId] : {};

  const finalTitle = title || config.title || seoConfig.default.title;
  const finalDescription =
    description || config.description || seoConfig.default.description;
  const finalImage = image || config.image || seoConfig.default.image;
  const explicitSlug = url || slug || config.slug || "";

  const pageUrl = buildPageUrl(explicitSlug, pathname);
  const ogType = type === "article" ? "article" : "website";

  let fullImage = `${BASE_URL}/images/default-share.png`;
  if (finalImage) {
    if (finalImage.startsWith("http")) {
      fullImage = finalImage;
    } else {
      const cloud = cloudinaryUrlFromLegacyPath(finalImage, { width: 1600 });
      fullImage = cloud || `${BASE_URL}${finalImage}`;
    }
  }

  const jsonLdSchemas = [];
  const breadcrumb = buildBreadcrumbJsonLd(pathname);
  if (breadcrumb) jsonLdSchemas.push(breadcrumb);
  if (type === "article") {
    jsonLdSchemas.push(
      buildArticleJsonLd({
        title: finalTitle,
        description: finalDescription,
        image: fullImage,
        pageUrl,
      })
    );
  }

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Nomad Scribbles" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImage} />

      {jsonLdSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      <html lang="en" />
    </Helmet>
  );
}

export default SEO;
