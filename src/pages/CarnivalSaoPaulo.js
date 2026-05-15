import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";

const carnivalImages = artImages.filter(img => img.category === "Carnival");

const resolvePublicId = (id) => {
  const img = carnivalImages.find(i => i.id === id);
  if (!img) return null;
  return img?.cloudinary?.blog || img?.cloudinary?.gallery || null;
};

const locationData = {
  name: 'Carnival',
  seo: {
    title: 'Carnival -- Sao Paulo | Nomad Scribbles',
    description: 'Carnival as structured procession and open street movement.',
  },
  coords: null,
  spatialContext: null,
};

function CarnivalSaoPaulo() {
  return (
    <LightTemplate
      variant="immersive"
      locationData={locationData}
      heroPageData={{ title: 'Carnival', subtitle: 'Sao Paulo' }}
      intro={{
        paragraphs: [
          'It moves across the city over several days. People gather, follow, and drift in and out of it as it shifts between places.',
          'It forms, dissolves, and forms again elsewhere, repeating as it moves through the city.',
        ],
      }}
      rhythmInserts={[]}
      narratives={[
        { type: 'heading', heading: 'In One Place' },
        {
          image: { src: resolvePublicId('carnival1'), alt: 'Mokum Amsterdam: The Eagle\'s Flight to the Libertarian City' },
          heading: 'Then It Begins',
          paragraph: 'Crowds gather, filling the stands before anything begins. The procession holds its line, unfolding step by step. The flow becomes continuous, passing directly in front of the crowd. Shapes hold as they move through it, carried by rhythm rather than direction.',
        },
        {
          image: { src: resolvePublicId('carnival2'), alt: 'Grupo Especial' },
          heading: 'The Procession',
          paragraph: 'The rhythm shifts, and the crowd shifts with it. Their shape holds as they move forward through the flow. Structure becomes the medium — form as movement, movement as form.',
        },
        { type: 'heading', heading: 'In the Streets' },
        {
          image: { src: resolvePublicId('carnival7'), alt: 'Alceu Valenca Bloco' },
          heading: 'Outside the Edges',
          paragraph: 'Outside the edges, the structure begins to loosen. Nothing stays held in place. It spills into rhythm, no longer contained by form or direction. What begins as release becomes a shared current, carried through sound rather than structure.',
        },
        {
          image: { src: resolvePublicId('carnival11'), alt: 'Street Drummers' },
          heading: 'Sound Leads',
          paragraph: 'Drums arrive first, then everything else follows into their space. A continuous beat carries across blocks and intersections, repeating and shifting as it travels. Nothing resolves. It only intensifies and releases in cycles that never fully break.',
        },
        {
          image: { src: resolvePublicId('carnival12'), alt: 'Surdo - The Band Heartbeat' },
          heading: 'Peak Density',
          paragraph: 'At peak density, sound and presence merge into one condition. The idea of groups dissolves into a single field of tempo and response, reactive and immediate, constantly adjusting but never pausing. Even when it shifts, it does not lose continuity.',
        },
        {
          image: { src: resolvePublicId('carnival13'), alt: 'The Macaco Cansado Band' },
          heading: 'Dissolve',
          paragraph: 'As night deepens, the intensity begins to loosen at the edges. The same pulse remains, but it spreads further apart, allowing space to return between moments. What stays is the echo of everything that has passed through, still moving but no longer held at full force.',
        },
      ]}
      bridgeQuote="Carnival belongs to the city as much as the streets do."
      reflectiveClose="The party continues through the night."
      returnLink={{ label: 'Back to Sao Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Green Spaces', path: '/brazil/saopaulo/green-spaces' }}
    />
  );
}

export default CarnivalSaoPaulo;
