import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import { EDITORIAL_PLACEMENTS } from "../components/editorial";
import parkImages from "../assets/artImages/slices/category/parks.json";
import naturalSpacesImages from "../assets/artImages/slices/category/natural-spaces.json";
import saoPauloArt from "../assets/artImages/slices/bundles/saopaulo.json";
import { mergeArtSlices, makeImgResolver } from "../utils/artImageResolver";
import { greenSpacesHeroConfig } from "./brazil/saopaulo/green-spaces.hero.config";
import { hasGreenSpacesStaticHero, isMobileViewport } from "../utils/staticPageHero";

const greenSpacesCatalog = mergeArtSlices(parkImages, naturalSpacesImages);
const img = makeImgResolver(greenSpacesCatalog);

const imgSp = makeImgResolver(saoPauloArt);

const externalImg = (url, alt, { interactive = true } = {}) => ({ src: url, alt, external: true, interactive });

const IPE_CASACOR_URL =
  'https://casacor.abril.com.br/en-US/noticias/paisagismo/conheca-especies-de-ipe-que-deixam-qualquer-paisagem-mais-vibrante';
const IPE_CASACOR_IMAGE =
  'https://cdn.assets-casacor.tec.br/file/casacor-images-news/2025/06/gleive-marcio-rodrigues-de-souza-CxVq04mnZiA-unsplash.webp';

const locationData = {
  name: 'Green Spaces',
  seo: {
    title: SEO_TITLES["/brazil/saopaulo/green-spaces"],
    description: "Three São Paulo green spaces — Ibirapuera, Trianon, and the Botanical Garden — as everyday green, not one escape hatch.",
  },
  coords: null,
  spatialContext: 'Ibirapuera to Trianon on Paulista, the Botanical Garden in the south — green threaded across zones, not a single address.',
};

const editorialBlocks = [
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'reflective-fragment',
    text: 'São Paulo\'s parks are not one place you visit once. They sit in different corners of the city — a pocket forest on Paulista, a designed landmark in the south, a living collection in Ipiranga — each with its own pace.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.AFTER_INTRO,
    type: 'link-banner',
    eyebrow: 'Also in São Paulo',
    title: 'Street Art',
    tagline: 'From designed green to painted walls — Vila Madalena and murals across the city.',
    path: '/brazil/saopaulo/street-art',
    image: 'Brazil/Sao Paulo/Graffiti/small/graffiti2',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 0,
    type: 'local-tip',
    title: 'Arrive early at Ibirapuera',
    text: 'Before nine, dew still sits on the lawns and the paths belong to early walkers. Musicians test melodies under the trees; families stake out the same corners week after week. By midday the heat flattens everything — come when the city is still waking into the park, not when it is already full.',
    location: 'Parque Ibirapuera',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 1,
    type: 'local-tip',
    title: 'Read the roots, not just the canopy',
    text: 'Ibirapuera means "rotting tree" in Tupi — wetland memory beneath designed paths. Eucalyptus groves planted in the 1920s drained the marsh before the park took its present shape; some of those trees still tower over the lawns. Look for fig trees (Ficus) with aerial roots threading down like the banyan, and native Atlantic Forest species Burle Marx kept when the park was laid out: not an imported lawn, but a planted forest floor.',
    location: 'Parque Ibirapuera',
    image: img('theHistoricEucalyptusOfIbirapuera', 'Historic eucalyptus grove at Ibirapuera'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 2,
    type: 'local-tip',
    title: 'Wildlife is negotiated, not staged',
    text: 'Monkeys, birds, and ants cross the same blankets and paths as people. Lower your voice, step around without drama, and accept that you are visiting shared territory — not a zoo enclosure.',
    location: 'Ibirapuera & Trianon canopy paths',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'The hour when detail returns',
    text: 'Late afternoon under deep canopy — when direct sun drops out and contrast softens — texture takes over: bark grain, leaf venation, shade sliding across grass. You do not need to hunt for it; stop on a bench at the rim of a lawn and let foot traffic pass without following it.',
    location: 'Shaded paths — Ibirapuera & Trianon',
    image: img('park6', 'Light shifting across quiet corners of the park'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Burle Marx\'s living palette',
    text: 'Roberto Burle Marx (1909–1994) — Brazil\'s foremost landscape architect, as much botanist as designer — shaped Ibirapuera as a working landscape, not a display garden. Bamboo forms tunnels and screens; heliconias hold waxy bracts at eye level. His UNESCO-listed home and nursery are in Rio — a separate visit if you want the full archive of his plant collections.',
    location: 'Parque Ibirapuera',
    image: img('park7', 'Bamboo canopy tunnel at Ibirapuera'),
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'link-banner',
    compact: true,
    href: 'https://casacor.abril.com.br/en-US/noticias/paisagismo/30-anos-sem-burle-marx-obras-percursor-paisagismo-moderno',
    imageUrl: 'https://cdn.assets-casacor.tec.br/file/casacor-images-news/2024/06/burlemarx.webp',
    imageAlt: 'Roberto Burle Marx — portrait from CASACOR',
    eyebrow: 'Further reading',
    title: '30 years without Burle Marx',
    tagline: 'CASACOR on native plants, modern tropical gardens, and his legacy — the UNESCO sitio is in Rio, not São Paulo.',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BETWEEN_NARRATIVES,
    afterNarrativeIndex: 3,
    type: 'local-tip',
    title: 'Watch for ipê in the dry season',
    text: 'Handroanthus — ipê-amarelo and ipê-roxo — flowers briefly when rain eases, usually May through July in São Paulo. Whole crowns turn gold or purple above the paths; petals carpet the grass for a day or two. Paulistas treat it as a calendar marker, not a spectacle.',
    location: 'City parks — especially Ibirapuera',
    image: externalImg(
      IPE_CASACOR_IMAGE,
      'Ipê-amarelo (Handroanthus) in bloom — photo: CASACOR',
      { interactive: false },
    ),
    link: {
      href: IPE_CASACOR_URL,
      label: 'CASACOR — ipê species in Brazilian landscaping',
    },
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'Three green spaces',
    subtitle: 'Different corners of the same city.',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    anchorId: 'ibirapuera',
    title: 'Ibirapuera',
    text: [
      'The park Paulistas treat as shared ground — runners, picnics, capoeira circles, and the slow drift between lawn and canopy that never quite finishes in one visit.',
      'Burle Marx\'s curves still organise the paths here; monkeys cross the same air as families, and the pavilion quarter pulls a different crowd when you want culture under the trees. Or skip the programme entirely — frozen açaí with banana and condensed milk on the grass is its own reason to stay.',
    ],
    image: img('lakesideReflectionsOfSaoPaulo', 'Lake and Oca pavilion reflected at Ibirapuera'),
    images: [img('brazilianAcaiBowl', 'Brazilian açaí bowl — Ibirapuera')],
    location: 'Parque Ibirapuera — Vila Mariana',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'link-banner',
    compact: true,
    eyebrow: 'Also in Brazil',
    title: 'Food & Drink',
    tagline: 'Find out more about Brazilian food culture.',
    path: '/brazil/food-drink',
    image: 'Brazil/Food-Drink/Small/Pastel',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Trianon on Paulista',
    text: [
      'A fragment of Atlantic Forest pressed against Avenida Paulista — forty thousand square metres of shade where the avenue forgets to hurry.',
      'Francisco Leopoldo e Silva\'s marble Aretuza sits among the paths like furniture the city grew around: a nymph from Greek myth, placed here long before the towers closed in. Cast-iron lampposts from an earlier Paulista still mark the walkways beneath the canopy — you can cross it on the way to work until none of it registers as heritage.',
    ],
    image: imgSp('aretuzaSculpture', 'Aretuza — marble sculpture in Parque Trianon'),
    images: [img('aHistoricLampInParqueTrianon', 'Historic lamppost beneath the Trianon canopy')],
    location: 'Parque Tenente Siqueira Campos — Avenida Paulista',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    anchorId: 'jardim-botanico',
    title: 'Jardim Botânico de São Paulo',
    text: [
      'In Ipiranga, the garden reads as collection rather than commons — palms, cacti, Atlantic Forest plots, and greenhouses tied to the Instituto de Botânica since the nineteenth century.',
      'Jabuticaba fruits sprout directly from the trunk — cauliflory that stops you mid-path before you register what you are looking at. Cape leadwort spills sky-blue beside the walkways; a walking palm lifts its stilt roots above the forest-floor plot. The visit rewards labels and layout — pair it with the neighbouring state park when you want forest without the city\'s noise at the edges.',
    ],
    image: img('jabuticabaTree', 'Jabuticaba tree — Jardim Botânico de São Paulo'),
    images: [
      img('bluePlumbago', 'Blue Plumbago — Jardim Botânico de São Paulo'),
      img('walkingPalm', 'Walking palm — Jardim Botânico de São Paulo'),
    ],
    location: 'Jardim Botânico — Ipiranga',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'breathing-space',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'custom-text',
    title: 'Something different to explore',
    subtitle: 'Exhibition pavilions at the heart of Ibirapuera',
    align: 'center',
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'favourite-place',
    title: 'Culture between the trees',
    text: [
      'Ibirapuera is not only lawns and canopy — Niemeyer\'s pavilions at the centre hold museums, workshops, and immersive shows that pull the city\'s energy indoors without losing scale.',
      'A graffiti workshop fills glass halls with spray cans and borrowed walls; next door, Blow Up Brasil turns a pavilion into soft architecture — giant inflatables, saturated colour, lighting that keeps shifting. Same park, different register — worth drifting through when you want colour and shade in the same afternoon.',
    ],
    image: img('blowUpBrasil', 'Blow Up Brasil — inflatables and light at Ibirapuera'),
    images: [img('graffitiWorkshop', 'Graffiti workshop in the park pavilions')],
    location: 'Ibirapuera — central pavilions',
    link: {
      href: 'https://bienal.org.br/fundacao',
      label: 'Niemeyer\'s Ibirapuera pavilion complex — Fundação Bienal',
    },
  },
  {
    placement: EDITORIAL_PLACEMENTS.BEFORE_BRIDGE,
    type: 'walking-route',
    title: 'How we moved between them',
    subtitle: 'Paulista pocket → Ibirapuera → botanical garden',
    text: 'No single park carried the whole visit. Trianon for a shaded crossing on Paulista, Ibirapuera for the long afternoon — the Botanical Garden when we wanted names on what was growing.',
  },
];

function GreenSpaces() {
  return (
    <LightTemplate
      variant="nature"
      atmosphere="brazil"
      editorialBlocks={editorialBlocks}
      locationData={locationData}
      heroConfig={greenSpacesHeroConfig}
      skipHero={hasGreenSpacesStaticHero() && isMobileViewport()}
      heroPageData={{ title: 'Green Spaces', subtitle: 'São Paulo' }}
      intro={{
        paragraphs: [
          "São Paulo's parks are not escapes from the city. They are where everyday life continues outdoors — in different neighbourhoods, at different scales.",
          "People sit, move, and rest in the same spaces at the same time. There's a quiet understanding in how it all runs. Everyone brings their own pace and activity, but no one fully dominates the space. Over time, that creates a feeling that the park belongs to everyone and no one in particular, just for as long as you're in it.",
          "We kept returning to three registers of green: Ibirapuera's designed landmark, Trianon's pocket forest on Paulista, and the Botanical Garden's living collections — Atlantic Forest species, seasonal ipê, and the small systems that reward stopping.",
        ],
      }}
      rhythmInserts={[
        "It's still São Paulo. Just with less urgency.",
        'The trees here were already established before much of the city was built around them — and they haven\'t been pushed aside.',
        'When the ipês flower, the canopy announces it before anyone sends a message.',
      ]}
      narratives={[
        {
          image: img('park2', 'A caterpillar crosses stone warmed by the sun'),
          heading: 'Shared Pace',
          paragraph: 'A caterpillar crosses warm stone while conversation continues nearby — no one hurries it, no one breaks the thread. People drift toward shade and stay there. Light moves across arms and bags as leaves shift above; the park stretches time just enough to notice what would vanish on pavement.',
        },
        {
          image: img('park1', 'Brazilwood tree in Ibirapuera'),
          heading: 'Part of Everyday Life',
          paragraph: "São Paulo is a city built in concrete, but it doesn't stay that way for long. Pau-brasil (Paubrasilia echinata) — the tree that gave Brazil its name — still stands in Ibirapuera alongside jequitibá and fig trees whose roots braid the paths. Green space isn't treated as something separate; people bring what they need and stay for hours under canopies that were planted for shade, not display.",
        },
        {
          image: img('park4', 'Monkey in the canopy above the paths'),
          heading: 'Moving Around Each Other',
          paragraph: "Monkeys move between branches without hesitation. Birds build nests in light posts. Ants cross picnic blankets in steady lines. People step around ants without thinking. It's not organised, and no one is directing it. They move around each other, close enough to notice, but not close enough to interrupt.",
        },
        {
          image: img('treeMushrooms', 'Bracket fungi on a park tree'),
          heading: 'What Stays',
          paragraph: 'Tree stumps gather moss over time. Bracket fungi spread along trunks and fallen wood — decomposers feeding the cycle that keeps bromeliads and orchids rooted in bark. Fine cracks widen slightly, holding bits of soil where seedlings and grasses push through. The parks hold their shape — not because they\'re maintained into stillness, but because they\'re used constantly.',
        },
      ]}
      bridgeQuote="It never settles into one way of being used."
      reflectiveClose="São Paulo's green spaces don't ask you to slow down. They simply make it easier — wherever in the city you find them."
      returnLink={{ label: 'Back to São Paulo', path: '/brazil/saopaulo' }}
      nextLink={{ label: 'Next: Street Art', path: '/brazil/saopaulo/street-art' }}
    />
  );
}

export default GreenSpaces;
