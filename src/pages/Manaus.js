import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import destinations from "../assets/destinations.json";
import paperTexture from '../assets/Backgrounds/PaperTexture.jpg';
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import { manausHeroConfig } from './brazil/manaus/manaus.hero.config';

const manausImages = artImages.filter(img => img.category === "Manaus");

const resolvePublicId = (id) => {
  const img = manausImages.find(i => i.id === id);
  if (!img) return null;
  return img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image);
};

const GALLERY_ORDER = Array.from({ length: 22 }, (_, i) => `manaus${i + 1}`);

const galleryImages = GALLERY_ORDER
  .map(id => manausImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img?.imagePublicId || getPublicIdFromLegacyPath(img?.image), { width: 800 }),
    image: img.image,
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'manaus',
    energy: 'low',
  }));

const locationData = {
  name: 'Manaus',
  seo: {
    title: 'Manaus | Nomad Scribbles',
    description: 'Deep in the heart of the Amazon, Manaus is a city shaped by its riverside urbanism and the vast forest that surrounds it.',
  },
  coords: destinations.find(d => d.id === 'manaus'),
  spatialContext: 'Thousands of kilometres from the coast, accessible mainly by river and air — and surrounded on all sides by the Amazon.',
};

function Manaus() {
  return (
    <LightTemplate
      variant="immersive"
      locationData={locationData}
      heroConfig={manausHeroConfig}
      heroPageData={{ title: 'Manaus', subtitle: 'Gateway to the Amazon' }}
      intro={{
        paragraphs: [
          'Manaus is both an extraordinary place and a difficult one. It is a city of more than two million people, located thousands of kilometres from Brazil\'s coast and accessible mainly by river and air — one of the largest urban centres on Earth embedded so deeply within tropical rainforest.',
          'Here, the Amazon isn\'t a distant idea, but a daily presence. Rivers, trees, animals, and people intersect in ways that feel unusually close and unusually exposed. That closeness creates opportunity — wildlife remains visible even at the city\'s edges, and forest products shape everyday life from food and medicine to craft and trade.',
          'But access brings pressure too. Manaus is also an industrial hub, home to one of Brazil\'s largest free trade zones. Economic growth offers stability for many, but it also pulls constantly at the forest that sustains the city.',
        ],
      }}
      rhythmInserts={[
        'None of this happens at a distance. The forest is right there.',
        'The benefits and the risks exist side by side — often for the same people, often through the same systems.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('manaus3'), alt: 'Daily life shaped by the market and the forest' },
          heading: 'Access, Proximity, Opportunity',
          paragraph: 'Tourism brings income and connection, particularly for Indigenous communities who use the city as a base while maintaining strong ties to the forest. Manaus makes the Amazon accessible — not as a myth or a backdrop, but as something lived with and worked through.',
        },
        {
          image: { src: resolvePublicId('manaus6'), alt: 'Manaus city scale and urban pressure' },
          heading: 'City, Scale, Pressure',
          paragraph: 'Manaus grows outward as well as upward. Streets stretch, neighbourhoods densify, and infrastructure follows the river\'s edge deeper into the forest. Every new road, warehouse, or housing block sits in direct conversation with what it replaces. The city\'s scale is felt not through skylines, but through the quiet accumulation of pressure on the land around it.',
        },
        {
          image: { src: resolvePublicId('manaus12'), alt: 'The forest itself at Manaus' },
          heading: 'The Forest Itself',
          paragraph: 'Choices are rarely clean, and rarely made from a place of certainty. Land becomes something to sell. Trees become resources. Farming, logging, and development arrive not as abstract threats, but as practical responses to immediate needs. To leave Manaus is to leave with that complexity intact — not a warning, and not a celebration, but an understanding that the Amazon\'s future is being shaped here, by ordinary decisions made every day.',
        },
        {
          image: { src: resolvePublicId('manaus19'), alt: 'Quiet consequences in the Amazon' },
          heading: 'Quiet Consequences',
          paragraph: 'It is a place where the Amazon is still present and powerful, shaping daily life rather than sitting safely beyond reach. People work with the forest, learn from it, and rely on it in ways that are practical and immediate. At the same time, Manaus shows how fragile that balance is — growth brings real benefits, but also tension, and not every decision protects what surrounds the city.',
        },
      ]}
      bridgeQuote="Manaus doesn't give you a neat ending. It is a story of people negotiating their future in real time."
      galleryImages={galleryImages}
      galleryBackground={paperTexture}
      reflectiveClose="You leave Manaus carrying a question more than an answer — about what it means to live beside something vast, to depend on it, and to keep making choices that test its limits."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Salvador', path: '/brazil/salvador' }}
    />
  );
}

export default Manaus;
