import React from "react";
import SEO from "../components/SEO";
import FilmStripArchive from "../components/filmstrip/FilmStripArchive";

const ngTitleSrc = `${process.env.PUBLIC_URL}/assets/NGTitle.svg?v=20260519`;

export default function NomadsGallery() {
  return (
    <>
      <SEO
        title="Nomads Gallery | Nomad Scribbles"
        description="A cinematic archive of recurring travel moments — thematic filmstrips across the wider journey."
        image="/images/NomadsGallery/NGTitle.webp"
        slug="/nomads-gallery"
        canonical="https://nomadscribbles.com/nomads-gallery"
      />
      <FilmStripArchive titleSrc={ngTitleSrc} />
    </>
  );
}
