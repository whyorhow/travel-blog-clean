import React from "react";
import { LightTemplate } from "./templates";
import pantanalImages from "../assets/artImages/slices/category/pantanal.json";
import destinations from "../assets/destinations.json";
import galleryBg from '../assets/Backgrounds/Weathered-Concrete-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { pantanalHeroConfig } from './brazil/pantanal/pantanal.hero.config';

const resolvePublicId = (id) => {
  const img = pantanalImages.find(i => i.id === id);
  if (!img) return null;
  return img.cloudinary.blog;
};

const GALLERY_ORDER = ['pantanal1','pantanal2','pantanal3','pantanal4','pantanal5','pantanal6','pantanal7'];

const galleryImages = GALLERY_ORDER
  .map(id => pantanalImages.find(img => img.id === id))
  .filter(Boolean)
  .map(img => ({
    src: cloudinaryImageUrl(img.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(img.cloudinary.lightbox, { width: 1600 }),
    alt: img.title,
    imageId: img.id,
    title: img.title,
    description: img.description,
    sizeClass: 'small',
    theme: 'pantanal',
    energy: 'low',
  }));

const locationData = {
  name: 'The Pantanal',
  seo: {
    title: 'Pantanal | Nomad Scribbles',
    description: 'The Pantanal is one of the largest tropical wetlands on Earth, governed almost entirely by water and seasonal rhythms.',
  },
  coords: destinations.find(d => d.id === 'pantanal'),
  spatialContext: 'Stretching across Brazil, Bolivia, and Paraguay — a landscape governed by water, not borders.',
};

function Pantanal() {
  return (
    <LightTemplate
      variant="nature"
      locationData={locationData}
      heroConfig={pantanalHeroConfig}
      heroPageData={{ title: 'The Pantanal', subtitle: 'Shaped by Water' }}
      intro={{
        paragraphs: [
          'The Pantanal is one of the largest tropical wetlands on Earth, stretching across Brazil, Bolivia, and Paraguay. Unlike places defined by roads, borders, or permanent landmarks, this landscape is governed almost entirely by water.',
          'Seasonal flooding reshapes everything. Grasslands turn into shallow lakes, rivers spill into forests, and familiar paths vanish for months at a time. Life here is built around movement and return. The land doesn\'t settle — it breathes.',
        ],
      }}
      rhythmInserts={[
        'What you experience in the Pantanal depends entirely on when you arrive. There is no single, fixed version of this place.',
        'In a landscape where water and foliage blur visibility, sound becomes a way of mapping space.',
      ]}
      narratives={[
        {
          image: { src: resolvePublicId('pantanal1'), alt: 'A caiman pauses where water meets land' },
          heading: 'Water That Moves the World',
          paragraph: 'The Pantanal is open and horizontal. Seasonal flooding spreads water across plains, creating long sightlines and clear edges between land and water. Wildlife is easier to observe not because it is tamer, but because the landscape offers fewer places to disappear. The Amazon asks for immersion; the Pantanal asks for attention.',
        },
        {
          image: { src: resolvePublicId('pantanal4'), alt: 'Caiman in the wetlands' },
          heading: 'Ancient Survivors',
          paragraph: 'Caimans are among the Pantanal\'s most recognisable residents, descendants of lineages that have survived millions of years of environmental change. Their movement through shallow water creates channels used by fish, birds, and smaller animals. Survival here depends less on speed than on balance.',
        },
        {
          image: { src: resolvePublicId('pantanal2'), alt: 'Macaws in the canopy' },
          heading: 'Voices of the Canopy',
          paragraph: 'Macaws and toucans bring colour and sound to the Pantanal\'s upper layers, but their role goes far beyond spectacle. Feeding on fruit across wide distances, they disperse seeds that help regenerate forests after floods or fires. Sightings here feel incidental rather than orchestrated.',
        },
        {
          image: { src: resolvePublicId('pantanal7'), alt: 'The Pantanal at dusk' },
          heading: 'A Delicate Balance',
          paragraph: 'Despite its vastness, the Pantanal is fragile. Fires, deforestation, and changes to upstream rivers threaten the flooding cycles that sustain everything here. Conservation isn\'t about freezing it in time — it\'s about allowing its natural rhythms to continue uninterrupted.',
        },
      ]}
      bridgeQuote="The Pantanal doesn't perform for visitors. It simply continues — flooding, receding, and returning on its own terms."
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose="You leave the Pantanal with the sense that you observed something much older than yourself. The water was moving before you arrived and will continue long after."
      returnLink={{ label: 'Return to Brazil', path: '/brazil' }}
      nextLink={{ label: 'Next: Iguazu Falls', path: '/brazil/foz' }}
    />
  );
}

export default Pantanal;
