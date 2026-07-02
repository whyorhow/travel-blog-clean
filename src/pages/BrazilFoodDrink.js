import React from "react";
import { SEO_TITLES } from '../config/seoTitles';
import { LightTemplate } from "./templates";
import foodImages from "../assets/artImages/slices/category/food-drink.json";
import brazilFoodDrinkHeroConfig from "./brazil/brazilFoodDrink.hero.config";
import { hasFoodDrinkStaticHero, isMobileViewport } from '../utils/staticPageHero';

const img = (id, alt, caption) => {
  const entry = foodImages.find(i => i.id === id);
  if (!entry) return null;
  const src = entry.cloudinary?.blog || null;
  return { src, alt: alt || entry.title, ...(caption ? { caption } : {}) };
};

const locationData = {
  name: 'Brazil Through Appetite',
  seo: {
    title: SEO_TITLES["/brazil/food-drink"],
    description: "A visual exploration of food culture across Brazil — markets, street food, coastal eating, Japanese-Brazilian fusion, and shared meals.",
  },
  coords: null,
  spatialContext: null,
};

function BrazilFoodDrink() {
  return (
    <LightTemplate
      skipHero={hasFoodDrinkStaticHero() && isMobileViewport()}
      variant="immersive"
      locationData={locationData}
      heroConfig={brazilFoodDrinkHeroConfig}
      heroPageData={{ title: 'Brazil Through Appetite', subtitle: 'Food & Drink' }}
      intro={{
        paragraphs: [
          "Food in Brazil rarely separates itself from the world around it. Meals extend into pavements, beaches, music venues, markets, parks, and late-night streets. Eating folds into movement — not as an occasion, but as one of the ways daily life organises itself.",
          "Extra chairs appear when more people arrive. Moqueca stays in the clay pot until the conversation finishes. Sweet avocado in the north, churrasco smoke in the south — the plate always carries where it was eaten.",
        ],
      }}
      rhythmInserts={[
        "The plate arrives before the conversation settles — garlic, oil, shrimp, bread already reaching across the table. In São Paulo, food rarely demands full attention. It exists beside noise, movement, and the particular rhythm of evenings that have no fixed end.",
        "Fruit cut open at the stall, cheese shaped by hand, peppers sorted into baskets — customers watch the work before buying.",
        'Extra chairs appear when more people arrive. Moqueca stays in the clay pot until the conversation finishes.',
        'On the coast, ice melts within the hour — fish in foil on the sand, bowls half-melted on plastic tables while people return to the water.',
      ]}
      narratives={[
        // ── MARKETS & ABUNDANCE ───────────────────────────────────────────
        { type: 'heading', heading: 'Markets & Abundance', anchorId: 'markets' },
        {
          // Cinematic 1: wide market shot — silent, environmental
          layout: 'cinematic',
          image: img('freshProduce', 'Fresh produce at a Brazilian market'),
          paragraph: null,
          expandDescription: "Brazilian markets rarely separate preparation from exchange. Food is handled openly — sliced, weighed, sorted — often within arm's reach of the customer.",
        },
        {
          // Cinematic 2: second cinematic close together — markets are dense and spatial
          layout: 'cinematic',
          image: img('traditionalRefreshments', 'Traditional refreshments being prepared'),
          paragraph: "Brazilian markets rarely separate preparation from exchange. Juice is pressed beside sacks of beans. Oil spits beside the pastry counter. Vendors shout prices over the sound of blenders. The market operates as a system of continuous small transactions, not a place where people linger.",
        },
        {
          // Diptych: pastel + cheesemaking — two faces of the same visibility logic
          layout: 'diptych',
          anchorId: 'itaim-bibi',
          image: img('pastel', 'Pastel — fried pastry made to order'),
          imageB: img('cheesemaking', 'Cheese shaped by hand at a market stall'),
          paragraph: "Nothing is hidden for long. Cheese is shaped in front of you. Fruit is cut open to prove sweetness before money changes hands. Customers watch the work before deciding whether to buy.",
        },
        {
          // Diptych: two pepper varieties — regional variation through colour, silent
          layout: 'diptych',
          image: img('colourfulChiliPeppers', 'Colourful chili peppers'),
          imageB: img('murupiPeppers', 'Murupi peppers'),
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('bellPeppersColour', 'Bell peppers in colour at a market stall'),
          paragraph: null,
        },
        {
          // Cinematic: Manaus market — the geographic pivot, with observational recommendation
          layout: 'cinematic',
          image: img('mercadoAdolphoLisboa', 'Mercado Municipal Adolpho Lisboa in Manaus'),
          paragraph: "At Mercado Adolpho Lisboa, the best approach is to walk slowly and accept samples when offered. Boats arrive at the back docks carrying ingredients from surrounding Amazonian regions — produce that rarely appears further south in Brazil.",
        },
        {
          // Diptych: abundance in pairs
          layout: 'diptych',
          image: img('freshMangoes', 'Fresh mangoes'),
          imageB: img('amazonianAbundance', 'Amazonian produce abundance'),
          paragraph: "Unfamiliar fruits sit in open crates beside the more recognisable — vendors hold things out, you taste, and either nod or move on. Murupi peppers, regional citrus, and fish from the river move through the same narrow corridors every morning. The market is less a tourist attraction than an active exchange point between forest, water, and city.",
        },
        {
          layout: 'diptych',
          image: img('abacateAvocado', 'Abacate — Brazilian avocado'),
          imageB: img('amazonianAvocados', 'Amazonian avocados'),
          paragraph: "Avocado here is often eaten sweet — with sugar and lime — not as the savoury staple it becomes elsewhere. In the north, the fruit itself can be startlingly large.",
        },
        {
          // Insert: caju — fragmentary notebook observation
          layout: 'insert',
          image: img('caju', 'Caju — cashew attached to its fruit', 'The cashew grows beneath the fruit, not inside it.'),
          paragraph: null,
        },
        {
          // Insert: beans — fragmentary observation
          layout: 'insert',
          image: img('varietiesOfBeans', 'Varieties of beans — Feijões', 'Sold by weight from open sacks. You choose how much.'),
          imageLeft: false,
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('itaimBibiMarket', 'Itaim Bibi Street Market'),
          imageLeft: false,
          paragraph: "Neighbourhood markets in São Paulo carry the same logic as the larger municipal halls — produce handled in the open, prices called across narrow aisles, the city folding food into ordinary streets.",
        },

        // ── JAPANESE-BRAZILIAN INFLUENCE ──────────────────────────────────
        { type: 'heading', heading: 'Japanese-Brazilian Influence', anchorId: 'japanese-brazilian' },
        {
          // Split: absorption thesis — compressed, intimate grammar for this section
          layout: 'split',
          image: img('sushiPlatter', 'Sushi platter'),
          heading: null,
          paragraph: "São Paulo holds the largest Japanese diaspora outside Japan — visible at Iwata Sushi in Vila Santa Catarina, where plastic chairs scrape tiled floors and tables sit close enough for neighbouring conversations to overlap.",
        },
        {
          // Insert: Iwata — intimate, ground-level rather than cinematic. Recommendation embedded.
          layout: 'insert',
          image: img('iwataSushi', 'Iwata Sushi Restaurant, Vila Santa Catarina'),
          paragraph: "At Iwata Sushi in Vila Santa Catarina — south of the centre, not in Liberdade — the room feels less curated for visitors than woven into the neighbourhood itself. Plastic chairs scrape across tiled floors. Tables are close enough together that neighbouring conversations overlap with yours.",
        },
        {
          // Diptych: fusion + theatricality
          layout: 'diptych',
          image: img('nigriFusionSushi', 'Nigri fusion sushi'),
          imageB: img('boldFlavours', 'Bold flavours and a lively atmosphere'),
          paragraph: "Tropical ingredients sit alongside Japanese technique. Dishes arrive on dry ice or stacked high — more generous, more social, less composed for the individual plate.",
        },
        {
          // Insert: shimeji — the ordinariness argument, kept quiet
          layout: 'insert',
          image: img('shimejiManteiga', 'Shimeji na Manteiga', 'Sautéed in butter. No longer borrowed from anywhere.'),
          imageLeft: false,
          paragraph: null,
        },
        {
          // Insert: kushiyaki — fragmentary close
          layout: 'insert',
          image: img('ebiKushiyaki', 'Ebi kushiyaki skewers', 'The seams are visible if you look for them. Most people have stopped looking.'),
          paragraph: null,
        },
        {
          layout: 'split',
          image: img('freguesiaOysterBar', 'Freguesia Oyster Bar'),
          heading: null,
          paragraph: "Coastal eating does not stay at the coast. Oyster bars and seafood counters bring the same immediacy into São Paulo neighbourhoods — ice, shellfish, and lemon within a few streets of offices and traffic.",
        },

        // ── COASTAL EATING ────────────────────────────────────────────────
        { type: 'heading', heading: 'Coastal Eating' },
        {
          layout: 'split',
          image: img('peixeAssado', 'Peixe Assado no Papel Alumínio — fish baked in foil at a local home'),
          heading: null,
          paragraph: "Heat on the Brazilian coast changes what can be carried and eaten within the hour — fish baked in foil on the sand, açaí bowls melting on plastic tables, ice under shellfish at oyster counters back in São Paulo neighbourhoods.",
        },
        {
          // Diptych: açaí + beachside staple — cold coastal consumption
          layout: 'diptych',
          image: img('acaiBowl', 'Açaí bowl'),
          imageB: img('brazilianBeachsideStaple', 'Brazilian beachside staple'),
          paragraph: "Açaí is eaten quickly. The cold is the point, and the coast erodes it fast. The food marks a pause in movement rather than a meal with its own structure.",
        },
        {
          // Split: kombucha — newer foods, same conditions
          layout: 'split',
          image: img('kombuchaBeach', 'Kombucha by the beach'),
          heading: null,
          paragraph: "In cities like Florianópolis, newer food cultures have found a natural home. Kombucha, poke bowls, raw ceviche, and plant-based dishes suit the same conditions as everything else on the coast. They have not replaced traditional foods. They simply joined them.",
        },
        {
          layout: 'insert',
          image: img('veganPlatter', 'Vegan platter'),
          imageLeft: false,
          paragraph: null,
        },
        {
          // Diptych: poke bowl + ceviche — two faces of the same coastal drift
          layout: 'diptych',
          image: img('hawaiianPokeBowl', 'Hawaiian poke bowl'),
          imageB: img('peruvianCeviche', 'Peruvian ceviche'),
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('cevichePeixeBranco', 'Ceviche de Peixe Branco', 'White fish cured in citrus — eaten cold, quickly, before the heat wins.'),
          paragraph: null,
        },
        {
          // Insert: tropical salad — fragmentary breath before gathering section
          layout: 'insert',
          image: img('tropicalSalad', 'Tropical salad', 'Everything here is eaten before it can get warm.'),
          paragraph: null,
        },

        // ── FOOD AS GATHERING ─────────────────────────────────────────────
        { type: 'heading', heading: 'Food as Gathering', anchorId: 'food-gathering' },
        {
          layout: 'split',
          image: img('camaraoPaulista', 'Camarão à Paulista'),
          heading: null,
          paragraph: "Garlic, oil, and shrimp arrive before the conversation settles. In São Paulo, the plate is rarely the centre of attention — it sits beside noise, movement, and evenings that keep extending.",
        },
        {
          // Split: moqueca baiana — opens with a micro-story instead of thesis
          layout: 'split',
          image: img('moquecaBaiana', 'Moqueca Baiana'),
          heading: null,
          paragraph: "We ordered moqueca intending to stay an hour. Three caipirinhas later, the restaurant owner had pulled another table against ours to make room for people we hadn't arrived with. Beer bottles sweat onto the tablecloth. Someone's phone was playing something with percussion.",
        },
        {
          // Cinematic: moqueca lunch — the slow shared meal
          layout: 'cinematic',
          image: img('moquecaLunch', 'Moqueca lunch with caipirinha'),
          paragraph: "Moqueca arrives in a clay pot, slowly, designed to be shared before the conversation has finished. Rice and farofa extend the meal without ending it. The pace is built into the food itself — you cannot eat it quickly.",
        },
        {
          layout: 'insert',
          image: img('artisanalPlatter', 'Artisanal platter', 'Shared plates — generosity built into the arrangement.'),
          paragraph: null,
        },
        {
          // Diptych: peixe frito + milho verde — street food at smaller scale
          layout: 'diptych',
          image: img('peixeFrito', 'Peixe Frito — fried fish'),
          imageB: img('milhoVerde', 'Milho Verde — grilled corn'),
          paragraph: "At smaller scale: fried fish eaten standing, grilled corn passed between people on plastic chairs dragged out onto the pavement — no table required, only room made as people arrive.",
        },
        {
          // Insert: sucos bar — quiet physical detail
          layout: 'insert',
          image: img('sucosBar', 'Sucos bar — fresh juice', 'Ordered, drunk, gone. The glass back on the counter before the next person arrives.'),
          paragraph: null,
        },
        {
          layout: 'insert',
          image: img('pinkVelvetBakery', 'Pink Velvet Bakery'),
          imageLeft: false,
          paragraph: null,
        },
        {
          layout: 'split',
          image: img('sansSouci', 'Sans Souci Bistrô'),
          heading: null,
          paragraph: "Some evenings stretch past midnight without anyone naming them as occasions. Bistros and bakeries hold the same openness as the larger tables — room made as people arrive.",
        },
      ]}
      bridgeQuote="Moqueca shared past midnight, fruit cut open at the market, extra chairs dragged to the table as more people arrived."
      reflectiveClose="Moqueca in clay until the third caipirinha, fruit cut open at Mercado Adolpho Lisboa, churrasco smoke drifting across a table that kept gaining chairs."
      returnLink={{ label: 'Back to Brazil', path: '/brazil' }}
    />
  );
}

export default BrazilFoodDrink;
