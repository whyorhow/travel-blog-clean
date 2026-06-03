import React from "react";
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import pantanalImages from "../assets/artImages/slices/category/pantanal.json";
import pantanalStory from "../assets/artImages/slices/story/brazil-pantanal.json";
import destinations from "../assets/destinations.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import galleryBg from '../assets/Backgrounds/Weathered-Concrete-Wall.webp';
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { pantanalHeroConfig } from './brazil/pantanal/pantanal.hero.config';

const pantanalCatalog = mergeArtSlices(pantanalImages, pantanalStory);
const img = makeImgResolver(pantanalCatalog);

const GALLERY_ORDER = ['pantanal1','pantanal2','pantanal3','pantanal4','pantanal5','pantanal6','pantanal7'];

const galleryImages = GALLERY_ORDER
  .map(id => pantanalCatalog.find(image => image.id === id))
  .filter(Boolean)
  .map(image => ({
    src: cloudinaryImageUrl(image.cloudinary.gallery, { width: 800 }),
    image: cloudinaryImageUrl(image.cloudinary.lightbox, { width: 1600 }),
    alt: image.title,
    imageId: image.id,
    title: image.title,
    description: image.description,
    sizeClass: 'small',
    theme: 'pantanal',
    energy: 'low',
  }));

const locationData = {
  name: 'The Pantanal',
  seo: {
    title: 'Pantanal Travel Guide: Wildlife, Wetlands & Seasonal Brazil',
    description: 'The Pantanal is one of the largest tropical wetlands on Earth, governed almost entirely by water and seasonal rhythms.',
  },
  coords: destinations.find(d => d.id === 'pantanal'),
  spatialContext: 'Stretching across Brazil, Bolivia, and Paraguay — a landscape governed by water, not borders.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'The Pantanal does not settle — it breathes. What you see depends entirely on when you arrive, and patience matters more than any itinerary.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in Brazil',
    title: 'Bonito',
    tagline: 'From wetland horizons to rivers filtered to glass — another Brazil shaped entirely by water.',
    path: '/brazil/bonito',
    image: 'Brazil/Bonito/thumbnail/Bonito7',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Wait where land meets water',
    text: 'Wildlife here is not hidden in dense forest — the open plain offers long sightlines. Find the edge of a channel, stop moving, and let the landscape come to you.',
    location: 'Along the floodplain',
    image: img('pantanal4', 'Wildlife along the floodplain'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Slow is the only speed',
    text: 'Caimans drift without urgency. Much of what happens in the Pantanal unfolds at that pace — revealed only if you stop expecting a performance.',
    location: 'Shallow channels',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Listen before you look',
    text: 'When water and foliage blur visibility, sound maps the space — macaws overhead, movement in reeds, the splash you almost missed. Ears first, binoculars second.',
    location: 'Forest edge',
    image: img('pantanal3', 'A toucan watching from the branches'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'What We Kept Coming Back To',
    subtitle: 'Attention, not spectacle.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Evening across the wetlands',
    text: [
      'As the sun drops, water reflects light and cloud in equal measure. Evening arrives gently here — without urgency or spectacle.',
      'We kept ending days like this: quiet vehicle, open plain, the sky doing most of the work while we stayed still.',
    ],
    image: img('pantanal6', 'Sunset across the wetlands'),
    location: 'Fazenda roads at dusk',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'memory',
    title: 'Traces rather than encounters',
    text: 'A single feather in the last light often said more than any direct sighting. The Pantanal rewards those who accept partial views.',
    image: img('pantanal5', 'Feather at dusk in the wetland'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'Our dawn and dusk loop',
    subtitle: 'Track → water\'s edge → back before heat',
    text: 'We drove the same routes at the edges of the day when animals moved and the light was low. No completion — just repetition until the rhythm felt familiar.',
  },
];

function Pantanal() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
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
          image: img('pantanal1', 'A caiman pauses where water meets land'),
          heading: 'Water That Moves the World',
          paragraph: 'The Pantanal is open and horizontal. Seasonal flooding spreads water across plains, creating long sightlines and clear edges between land and water. Wildlife is easier to observe not because it is tamer, but because the landscape offers fewer places to disappear. The Amazon asks for immersion; the Pantanal asks for attention.',
        },
        {
          image: img('pantanal4', 'Caiman in the wetlands'),
          heading: 'Ancient Survivors',
          paragraph: 'Caimans are among the Pantanal\'s most recognisable residents, descendants of lineages that have survived millions of years of environmental change. Their movement through shallow water creates channels used by fish, birds, and smaller animals. Survival here depends less on speed than on balance.',
        },
        {
          image: img('pantanal2', 'Macaws in the canopy'),
          heading: 'Voices of the Canopy',
          paragraph: 'Macaws and toucans bring colour and sound to the Pantanal\'s upper layers, but their role goes far beyond spectacle. Feeding on fruit across wide distances, they disperse seeds that help regenerate forests after floods or fires. Sightings here feel incidental rather than orchestrated.',
        },
        {
          image: img('pantanal7', 'Palms after rain in the Pantanal'),
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
