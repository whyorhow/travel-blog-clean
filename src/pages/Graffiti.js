import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import { getPublicIdFromLegacyPath } from "../utils/cloudinary";


const muralImages = artImages.filter(img => img.category === "Murals");

const resolvePublicId = (id) => {
  const img = muralImages.find(i => i.id === id);
  if (!img) return null;
  return img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image);
};

const locationData = {
  name: 'Street Murals',
  seo: {
    title: 'Street Murals — São Paulo | Nomad Scribbles',
    description: "São Paulo's walls as part of the city's movement and surface.",
  },
  coords: null,
  spatialContext: null,
};

function Graffiti() {
  return (
    <LightTemplate
      variant="nature"
      locationData={locationData}
      heroPageData={{ title: 'Street Murals', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          'Paint appears, fades, and returns again. Colour spreads across walls, underpasses, stairways, and long stretches of concrete.',
          'Nothing marks where one begins or ends. They sit directly inside the movement of the city.',
        ],
      }}
      rhythmInserts={[
        'Most of it is encountered in passing — through windows, crossings, and gaps between buildings.',
        'Familiarity builds through repetition rather than attention.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('graffiti1'), alt: 'Street mural entry view' },
          heading: 'Walls Across the City',
          paragraph: 'Walls across São Paulo rarely stay blank. Paint appears, fades, and returns again — sometimes over itself, sometimes alongside what was already there. It sits in the movement of the city rather than apart from it.',
        },
        {
          image: { src: resolvePublicId('graffiti3'), alt: 'Fragment above eye level' },
          heading: 'Above Eye Level',
          paragraph: 'Some images sit above eye level. From the street, only fragments are visible. Buildings cut the frame. People pass underneath without stopping.',
        },
        {
          image: { src: resolvePublicId('graffiti4'), alt: 'Layered surfaces in density' },
          heading: 'Layered Surfaces',
          paragraph: 'In some areas, walls are fully covered. Layers sit over one another without a clear starting point. The same surfaces are passed from different directions, each revealing something slightly different.',
        },
        {
          image: { src: resolvePublicId('graffiti6'), alt: 'Making in public space' },
          heading: 'Made in Public',
          paragraph: 'Some of what is passed here is made with the same care as other forms of public work elsewhere. It remains on the surface where it was painted, without being separated from the street or given a different position within it.',
        },
      ]}
      bridgeQuote="Surfaces continue to change without drawing attention to themselves."
      reflectiveClose="New work appears where older images remain partially visible. Some sections fade, others are replaced — but the wall continues to hold everything at once."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Art & Galleries', path: '/brazil/saopaulo/art-galleries' }}
    />
  );
}

export default Graffiti;
