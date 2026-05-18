import React from "react";
import { LightTemplate } from "./templates";
import salvadorImages from "../assets/artImages/slices/category/salvador.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { salvadorHeroConfig } from './brazil/salvador/salvador.hero.config';

const resolvePublicId = (id) => {
  const img = salvadorImages.find(i => i.id === id);
  if (!img) return null;
  return img.cloudinary.blog;
};

const GALLERY_ORDER = Array.from({ length: 22 }, (_, i) => `salvador${i + 1}`);

const galleryImages = GALLERY_ORDER
  .map(id => salvadorImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'salvador',
    energy: 'high',
  }));

const locationData = {
  name: 'Salvador',
  seo: {
    title: 'Salvador | Nomad Scribbles',
    description: 'Salvador: A city where history moves, sings, resists, and remembers.',
  },
  coords: destinations.find(d => d.id === 'salvador'),
  spatialContext: 'On the coast of Bahia — where Brazil\'s African heritage is most visibly, loudly, and deliberately present.',
};

function Salvador() {
  return (
    <LightTemplate
      variant="immersive"
      locationData={locationData}
      heroConfig={salvadorHeroConfig}
      heroPageData={{ title: 'Salvador', subtitle: 'The Soul of Bahia' }}
      intro={{
        paragraphs: [
          'Salvador announces itself immediately — through colour, sound, movement, and ritual. This is one of Brazil\'s most historically layered cities, and it doesn\'t hide that history behind distance or subtlety.',
          'Much of what defines Salvador today is designed to be encountered. The streets invite observation. The food is offered openly. Music spills outward. Tradition is worn, carried, and performed in public space. This isn\'t a city that pretends not to be watched — it has learned how to meet attention directly.',
          'In the cobblestone streets of Pelourinho, the past and present are inseparable. It is here that Brazil\'s African heart beats strongest, expressed through the rhythm of drums, the grace of capoeira, and the vibrant colours of colonial architecture.',
        ],
      }}
      rhythmInserts={[
        'History doesn\'t unfold chronologically here. It stacks.',
        'Observation is part of the exchange. The spectacle is real, but it doesn\'t pretend to be effortless.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('salvador10'), alt: 'Colonial history visible in daily use' },
          heading: 'History That Stays Visible',
          paragraph: 'Salvador\'s historic centre isn\'t preserved behind glass. Colonial buildings are still walked past, leaned against, adapted, and repainted. The city\'s elevation shapes how it\'s experienced — streets rise and fall sharply, revealing new views in fragments: ocean glimpses, rooftops, courtyards, towers.',
        },
        {
          image: { src: resolvePublicId('salvador11'), alt: 'Ritual in public space' },
          heading: 'Ritual in Public Space',
          paragraph: 'Many of Salvador\'s most recognisable traditions exist where visitors can see them — and that visibility is intentional. Baianas in traditional dress offer food shaped by religious and cultural practice. Coloured ribbons collect wishes without explanation. Music and dance move through streets without requiring a ticket. These are public rituals that continue regardless of who is watching.',
        },
        {
          image: { src: resolvePublicId('salvador13'), alt: 'Performance without illusion' },
          heading: 'Performance Without Illusion',
          paragraph: 'Salvador\'s relationship with performance is unusually direct. Dance, music, and Carnival are not presented as spontaneous miracles, but as practiced, physical disciplines shaped by repetition and strength. Performers move with intent — not to impress, but to hold rhythm, timing, and presence.',
        },
        {
          image: { src: resolvePublicId('salvador9'), alt: 'The city at rest on the coast' },
          heading: 'The City at Rest',
          paragraph: 'Away from the density of the historic centre, the pace shifts. The coastline opens outward. Boats drift just offshore, beaches fill gradually, shade structures appear and disappear with the sun. This isn\'t escape from Salvador — it\'s part of how the city balances itself.',
        },
      ]}
      bridgeQuote="Salvador is well suited to travellers who want to engage directly with Brazil's visible culture — without needing to decode it first. It may feel intense, layered, and busy. That's not a flaw — it's the point."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="This isn't a place to disappear into. It's a place to pay attention — and Salvador rewards that attention fully."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: São Paulo', path: '/brazil/saopaulo' }}
    />
  );
}

export default Salvador;
