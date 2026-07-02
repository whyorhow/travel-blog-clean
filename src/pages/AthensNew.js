import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import athensImages from "../assets/artImages/slices/story/greece-athens.json";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import galleryBg from '../assets/Backgrounds/Beige-Wall-Grunge-Cracked.webp';
import { hasAthensStaticHero, isMobileViewport } from "../utils/staticPageHero";

const img = (id) => {
  const entry = athensImages.find(i => i.id === id);
  if (!entry) return null;
  return { src: entry.cloudinary.blog, alt: entry.title };
};

const galleryImages = athensImages.map(entry => ({
  src: cloudinaryImageUrl(entry.cloudinary.gallery, { width: 800 }),
  image: cloudinaryImageUrl(entry.cloudinary.lightbox, { width: 1600 }),
  fallbackSrc: cloudinaryImageUrl(entry.cloudinary.blog, { width: 800 }),
  alt: entry.title,
  title: entry.title,
  description: entry.description,
  imageId: entry.id,
}));

const locationData = {
  name: 'Athens',
  seo: {
    title: SEO_TITLES["/greece/athens"],
    description:
      'Exploring Athens through the Acropolis, quiet neighbourhoods, hidden chapels, local bakeries, and the nearby coast.',
  },
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'Winter oranges hung low enough to brush your shoulder on the climb back uphill.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Across Europe',
    title: 'Antwerp',
    tagline: 'Next: Flemish brick, the Grote Markt, and streets we found only by walking past them.',
    path: '/belgium/antwerp',
    image: 'Belgium/Antwerp/antwerp-backup',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 28,
    type: 'single-image-pause',
    image: img('orange-trees'),
    caption: 'Winter oranges over the pavement on the climb back towards the Acropolis each morning.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_NARRATIVE,
    type: 'do-this-again',
    text: [
      'We\'d spend more time below the Acropolis than on top of it.',
      'The bakery on the corner, Kotili Café, and the small chapel we passed each morning — warm bread, the smell from the oven in the street, and the ticket queue still empty when we climbed early.',
    ],
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'The Bakery Near the Acropolis',
    text: [
      'Bread came out of the oven throughout the day.',
      'We kept returning because it was close, the smell drifted into the street long before we reached the door, and the loaves were still warm when they were handed across the counter.',
    ],
    image: img('crusty-greek-bread'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-cafe',
    title: 'Kotili Café',
    text: [
      'A small café tucked away from the busiest streets.',
      'The owner would sit with us whenever business slowed, trading bits of English for bits of Greek while the afternoon passed outside.',
      'We ordered the same espresso twice in one week and he remembered without us asking.',
    ],
    image: img('kotili-cafe'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_GALLERY,
    type: 'divider-image',
    image: img('acropolis-view'),
    caption: 'The route that always led us back uphill.',
    compact: true,
  },
];

const rhythmInserts = [];
rhythmInserts[5] = 'Ticket queues had not formed yet. We could hear tour groups on the steps before we saw them.';
rhythmInserts[11] = 'Ferries leaving for Aegina left white wakes across the bay at midday.';

function AthensNew() {
  return (
    <LightTemplate
      variant="immersive"
      atmosphere="greece"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroImage={{
        src: cloudinaryImageUrl('Greece/Athens/Athens-backup', { width: 1600 }),
        alt: 'Athens',
      }}
      skipHero={hasAthensStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Athens', subtitle: 'Greece · Ancient & Alive' }}
      intro={{
        paragraphs: [
          'We stepped off the metro into heat and marble dust. The Acropolis was already visible above the rooftops — not pointed out, just there. A bakery door opened on the corner below it, and commuters passed cracked columns without looking up.',
          'Nineteenth-century façades overlooked archaeological sites. We climbed to the hill early, ate lunch that drifted into the afternoon, and kept finding small chapels tucked between houses — a white wall on a side street one day, another above a stair we had not noticed before.',
        ],
      }}
      rhythmInserts={rhythmInserts}
      narratives={[
        { type: 'heading', heading: 'Where It Starts to Make Sense' },
        {
          type: 'prose',
          paragraph:
            'We reached the Acropolis while the city was still waking. We kept catching sight of it again from different streets — above apartment blocks on the walk up, then church domes and the port in the haze beyond once we were on the hill. Before the ticket queues formed, the marble carried a soft golden light.',
        },
        {
          type: 'prose',
          paragraph:
            'Standing among the ruins is one thing. Watching breakfast being served beneath them is another. Ancient temples stood above cafés opening for the day. Commuters walked under columns older than most countries. A vendor unfolded an umbrella beside the Propylaea while tour groups were still climbing the steps.',
        },
        {
          layout: 'cinematic',
          image: img('acropolis-hill'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('acropolis-view'),
          imageB: img('temple-of-hephaestus'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Where History Overlaps' },
        {
          type: 'prose',
          paragraph:
            'The Arch of Hadrian marked the shift in stone. Hadrian\'s Library sat beside nineteenth-century buildings and a busy road where buses idled at the kerb. We bought bottled water at a kiosk near the Roman columns and waited for the light to change before crossing.',
        },
        {
          type: 'prose',
          paragraph:
            'Roman columns rose beside a bus stop. The Zappeion\'s yellow façade faced park paths where joggers passed each morning. On the walk from the Arch to the library and back past the columns, each turn showed a different century still in daily use.',
        },
        {
          layout: 'cinematic',
          image: img('arch-of-hadrian'),
          paragraph: 'Greek and Roman stone standing only a short walk apart.',
        },
        {
          layout: 'diptych',
          image: img('hadrians-library'),
          imageB: img('roman-columns'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('zappeion-building'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Towards the Coast' },
        {
          type: 'prose',
          paragraph:
            'After several days of marble and narrow streets, we took the road towards the coast. At Perachora, ruined sanctuaries overlooked turquoise coves. We ate oranges in the car at Loutraki while pine trees leaned towards the water below. The Corinth Canal cut through rock so narrow we could see both sides at once.',
        },
        {
          type: 'prose',
          paragraph:
            'We swam at Aegina, walked a wooden pier at Loutraki, and watched turtles in a pond behind a low wall. The heat felt different beside the sea — less stone, more shade, and lunch spreads laid out on tables under awnings.',
        },
        {
          layout: 'cinematic',
          image: img('aegina-beach'),
          paragraph: 'A change from marble and streets to sea and open coastline.',
        },
        {
          layout: 'cinematic',
          image: img('sanctuary-of-hera-at-perachora'),
          paragraph: 'Stone foundations beside a cove where the water stays pale turquoise even in the shade.',
        },
        {
          layout: 'diptych',
          image: img('the-corinth-canal'),
          imageB: img('acrocorinth-mountain-slopes'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('loutraki-beach'),
          imageB: img('loutraki-view'),
          paragraph: null,
        },
        {
          layout: 'diptych',
          image: img('wooden-pier'),
          imageB: img('turtle-pond'),
          paragraph: null,
        },

        { type: 'heading', heading: 'Everyday Athens' },
        {
          type: 'prose',
          paragraph:
            'Warm bread barely made it back from the bakery before we started eating it. Lunches drifted into the afternoon at tables on the pavement — salad, bread torn open, wine left on the table long after we had stopped eating.',
        },
        {
          layout: 'diptych',
          image: img('traditional-greek-lunch-spread'),
          imageB: img('crusty-greek-bread'),
          paragraph: null,
        },
        {
          layout: 'cinematic',
          image: img('athenian-sunset'),
          paragraph: 'Warm stone, neighbourhood bakeries, cafés, and evenings spent outside.',
        },

        { type: 'heading', heading: 'Quiet Corners That Stayed With Us' },
        {
          type: 'prose',
          paragraph:
            'We found chapels while walking — white walls beside coastal roads at Heraion, a small church tucked into a residential street, another perched above the water at Ypanema.',
        },
        {
          type: 'prose',
          paragraph:
            'They were quiet inside. Candles, worn stone floors, and doors left ajar. We stopped for a few minutes between busier days and kept walking without noting the names of most of them.',
        },
        {
          layout: 'cinematic',
          image: img('chapel-at-heraion'),
          paragraph: 'Chapel at Heraion — white walls and worn stone steps above the coastal road.',
        },
        {
          layout: 'diptych',
          image: img('chapel-ypanema-heraion'),
          imageB: img('church-transfiguration'),
          paragraph: null,
        },
      ]}
      galleryImages={galleryImages}
      galleryBackground={galleryBg}
      reflectiveClose={[
        'Warm bread wrapped in paper. Orange trees over the pavement. Marble catching the last light on the walk back uphill.',
        'We still picture the bakery door opening below the hill at first light — commuters already on the pavement, the oven smell reaching the corner.',
      ]}
      returnLink={{ label: 'Return to Greece', path: '/greece' }}
    />
  );
}

export default AthensNew;
