import React from "react";
import SEO from "../components/SEO";
import FilmStripArchive from "../components/filmstrip/FilmStripArchive";
import {
  NOMADS_GALLERY_TITLE_PUBLIC_ID,
  nomadsGalleryTitleUrl,
} from "../config/nomadsGalleryTitle";

export default function NomadsGallery() {
  return (
    <>
      <SEO
        title="Nomads Gallery | Nomad Scribbles"
        description="A cinematic archive of recurring travel moments — thematic filmstrips across the wider journey."
        image={nomadsGalleryTitleUrl({ width: 1600 })}
        slug="/nomads-gallery"
      />
      <FilmStripArchive titlePublicId={NOMADS_GALLERY_TITLE_PUBLIC_ID} />
    </>
  );
}
