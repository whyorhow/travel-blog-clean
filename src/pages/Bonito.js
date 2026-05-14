import React from "react";
import { LightTemplate } from "./templates";
import artImages from "../assets/artImages.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Textured-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { bonitoHeroConfig } from './brazil/bonito/bonito.hero.config';

const bonitoImages = artImages.filter(img => img.category === "Bonito");

const resolvePublicId = (id) => {
  const img = bonitoImages.find(i => i.id === id);
  if (!img) return null;
  return img.cloudinary.blog;
};

const GALLERY_ORDER = [
  'bonito1','bonito2','bonito3','bonito4','bonito5','bonito6',
  'bonito7','bonito8','bonito9','bonito10','bonito11',
];

const galleryImages = GALLERY_ORDER
  .map(id => bonitoImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'bonito',
    energy: 'low',
  }));

const locationData = {
  name: 'Bonito',
  seo: {
    title: 'Bonito | Nomad Scribbles',
    description: 'Explore the crystal clear waters, breathtaking waterfalls, and surreal caves of Bonito, Brazil\'s premier ecotourism destination.',
  },
  coords: destinations.find(d => d.id === 'bonito'),
  spatialContext: 'Deep in Mato Grosso do Sul — where limestone filters every river into impossible clarity.',
};

function Bonito() {
  return (
    <LightTemplate
      variant="nature"
      locationData={locationData}
      heroConfig={bonitoHeroConfig}
      heroPageData={{ title: 'Bonito', subtitle: 'The Source of Purity' }}
      intro={{
        paragraphs: [
          'Located in the heart of Mato Grosso do Sul, Bonito is a testament to the preservation of nature. It\'s a place where the water is so clear that it seems to vanish, where fish swim in liquid crystal, and where the Earth\'s inner beauty is revealed in every cave and waterfall.',
        ],
      }}
      rhythmInserts={[
        'The limestone floor of the riverbeds acts as a giant natural filter — removing all impurities and leaving only pristine, mineral-rich turquoise.',
        'Bonito\'s waterfalls are not just features of the landscape. They are architected by nature over millennia.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('bonito11'), alt: 'Crystal cascades at Bonito' },
          heading: 'Crystal Cascades',
          paragraph: 'High concentrations of calcium carbonate in the water create tufa deposits — living stone that grows and shapes the cascades into terraced pools of impossible clarity. Whether it\'s the towering Boca da Onça or the intimate falls of Estância Mimosa, the trails lead through lush riparian forests where monkeys and tropical birds watch from the canopy.',
        },
        {
          image: { src: resolvePublicId('bonito3'), alt: 'Snorkelling the crystal rivers' },
          heading: 'Aquarium of the Earth',
          paragraph: 'Floating down the Rio da Prata or the Rio Sucuri is a transcendent experience. The water is so clear it feels like flying through an underwater garden. Schools of Piraputanga, with their bright orange tails, glide alongside you in a silent, colourful parade.',
        },
        {
          image: { src: resolvePublicId('bonito2'), alt: 'The Blue Lake Cave' },
          heading: 'Abyssal Blue',
          paragraph: 'Descend into the Gruta do Lago Azul, where a steep climb down reveals a subterranean lake of electric blue that defies belief. Periodic columns and stalactites frame the view, some dating back hundreds of thousands of years. For the adventurous, the Abismo Anhumas offers a 72-metre rappel into a massive cavern.',
        },
      ]}
      bridgeQuote="In Bonito, the water doesn't just flow — it creates. Everything here is shaped by what the river carries and what it leaves behind."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="Bonito stays with you as a quality of light — the particular turquoise of filtered water, the way fish move through it as if gravity has softened. You don't forget that kind of clarity."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Manaus', path: '/brazil/manaus' }}
    />
  );

}

export default Bonito;
