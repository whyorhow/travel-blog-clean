import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import { getPublicIdFromLegacyPath } from "../utils/cloudinary";

const galleryImagesData = artImages.filter(img => img.category === "ArtGallery" || img.category === "Museums");

const resolvePublicId = (id) => {
  const img = galleryImagesData.find(i => i.id === id);
  if (!img) return null;
  return img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image);
};

const locationData = {
  name: 'Art & Galleries',
  seo: {
    title: 'Art & Galleries -- Sao Paulo | Nomad Scribbles',
    description: "Sao Paulo's galleries as part of everyday movement through the city.",
  },
  coords: null,
  spatialContext: null,
};

function ArtGalleries() {
  return (
    <LightTemplate
      variant="nature"
      locationData={locationData}
      heroPageData={{ title: 'Art & Galleries', subtitle: 'Sao Paulo' }}
      intro={{
        paragraphs: [
          'In Sao Paulo, galleries sit within the city, but they are not passed through in the same way as streets or parks.',
          'People enter them deliberately, often between other parts of the day. They are not destinations, but rather pauses from the movement of the city.',
        ],
      }}
      rhythmInserts={[
        'There is no fixed route through the space.',
        'Works are encountered one at a time as the building moves from one enclosed space to the next.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('gallery1'), alt: 'MASP suspended above Avenida Paulista' },
          heading: 'MASP',
          paragraph: 'MASP sits above Avenida Paulista, lifted away from the movement of the street. Traffic, noise, and daily routines continue beneath it while the building stays still above them. Inside, artworks are placed on glass supports so they are visible from all sides. People move between works, stopping when something catches their attention, then continuing without needing to complete a path.',
        },
        {
          image: { src: resolvePublicId('gallery2'), alt: 'A figure by Degas held in stillness' },
          heading: 'Returning',
          paragraph: 'In certain rooms, people move in and out rather than staying for long periods. They pause, leave, and return again - sometimes within the same visit, sometimes on different days. What is noticed on one visit is not always the same on the next. Some works become familiar over time, not because they change, but because they are seen again.',
        },
        {
          image: { src: resolvePublicId('gallery3'), alt: 'Indigenous Brazilian works at MASP' },
          heading: 'Below the Main Levels',
          paragraph: 'Below the main levels, the building becomes quieter. Light changes here, and the materials feel older and less polished. Indigenous Brazilian works are shown alongside other collections, not set apart as distant objects but placed within the same space of attention.',
        },
        {
          image: { src: resolvePublicId('gallery5'), alt: 'Pinacoteca shaped by brick and light' },
          heading: 'Pinacoteca',
          paragraph: 'Inside the Pinacoteca, brick and iron remain visible throughout the building. Light enters through high windows, leaving parts of each room in shadow. For many people in Sao Paulo, galleries are visited when time opens up, fitting into days rather than defining them.',
        },
      ]}
      bridgeQuote="They remain part of the city's interior rhythm - present, but not always entered."
      reflectiveClose="Sao Paulo's galleries don't ask to be sought out. They simply remain available - part of the city's quieter interior."
      returnLink={{ label: 'Back to Sao Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Carnival', path: '/brazil/saopaulo/carnival' }}
    />
  );
}

export default ArtGalleries;
