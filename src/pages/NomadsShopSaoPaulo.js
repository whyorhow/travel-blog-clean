import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, hoverScale, staggerContainer } from "../utils/animations";

// import analytics function
import { trackEvent } from "../utils/analytics";

export default function NomadsShopSaoPaulo({ openLightbox }) {
  const items = [
    // City Life
    {
      id: "caparinhaPhoto",
      title: "Caipirinha Photo",
      description: "A refreshing caipirinha moment in São Paulo.",
      image: "/images/SaoPauloLanding/small/caparinhaz.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/oiloo",
      category: "City Life",
    },
    {
      id: "caparinhaDrawn",
      title: "Caipirinha Drawing",
      description: "Artistic drawn version of a caipirinha.",
      image: "/images/SaoPauloLanding/small/CaparinhaDrawnz.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/byrhy",
      category: "City Life",
    },
    {
      id: "pizza",
      title: "Pizza Print",
      description: "São Paulo’s famous pizza scene captured.",
      image: "/images/SaoPauloLanding/small/pizzaz.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/iechb",
      category: "City Life",
    },
    {
      id: "rain",
      title: "Rain Scene",
      description: "A rainy day in São Paulo streets.",
      image: "/images/SaoPauloLanding/small/rainz.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/rpfnoe",
      category: "City Life",
    },

    // Parks
    {
      id: "park1",
      title: "Ibirapuera Park Print",
      description: "Beautiful view of Ibirapuera Park in São Paulo.",
      image: "/images/SP-Parks/small/Park1.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/nmdpn",
      category: "Parks",
    },
    {
      id: "park2",
      title: "Park2 Print",
      description: "Another view of São Paulo’s parks.",
      image: "/images/SP-Parks/small/Park2.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/zypszc",
      category: "Parks",
    },
    {
      id: "park3",
      title: "Park3 Print",
      description: "Capturing the greenery of the city.",
      image: "/images/SP-Parks/small/Park3.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/wwpco",
      category: "Parks",
    },
    {
      id: "park4",
      title: "Park4 Print",
      description: "Quiet corners of Ibirapuera Park.",
      image: "/images/SP-Parks/small/Park4.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/pdlkl",
      category: "Parks",
    },
    {
      id: "park5",
      title: "Park5 Print",
      description: "Park paths and city skyline.",
      image: "/images/SP-Parks/small/Park5.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/dqsmj",
      category: "Parks",
    },
    {
      id: "park6",
      title: "Park6 Print",
      description: "Sunlight through the trees.",
      image: "/images/SP-Parks/small/Park6.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/lstekx",
      category: "Parks",
    },
    {
      id: "park7",
      title: "Burle Marx Poster",
      description: "Iconic design poster of Burle Marx.",
      image: "/images/SP-Parks/small/Park7.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/vgmnwm",
      category: "Parks",
    },

    // Murals
    {
      id: "graffiti1",
      title: "Graffiti 1",
      description: "Vibrant street art in São Paulo.",
      image: "/images/Murals/small/Graffiti1.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/lyxdq",
      category: "Murals",
    },
    {
      id: "graffiti2",
      title: "Graffiti 2",
      description: "Urban mural capturing city life.",
      image: "/images/Murals/small/Graffiti2.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/vxqtux",
      category: "Murals",
    },
    {
      id: "graffiti3",
      title: "Graffiti 3",
      description: "Colourful street art scene.",
      image: "/images/Murals/small/Graffiti3.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/mztdgd",
      category: "Murals",
    },
    {
      id: "graffiti4",
      title: "Graffiti 4",
      description: "A wall full of creative expression.",
      image: "/images/Murals/small/Graffiti4.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/gipav",
      category: "Murals",
    },
    {
      id: "graffiti5",
      title: "Graffiti 5",
      description: "São Paulo mural culture captured.",
      image: "/images/Murals/small/Graffiti5.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/twbmh",
      category: "Murals",
    },
    {
      id: "graffiti6",
      title: "Graffiti 6",
      description: "Urban art in the city streets.",
      image: "/images/Murals/small/Graffiti6.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/mgmcf",
      category: "Murals",
    },
    {
      id: "graffiti7",
      title: "Graffiti 7",
      description: "Dynamic colours and shapes.",
      image: "/images/Murals/small/Graffiti7.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/sbhqbf",
      category: "Murals",
    },
    {
      id: "graffiti8",
      title: "Graffiti 8",
      description: "Street art showcasing São Paulo vibes.",
      image: "/images/Murals/small/Graffiti8.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/klcopp",
      category: "Murals",
    },

    // Museums
    {
      id: "artgallery1",
      title: "MASP floating gallery",
      description: "Masterpieces floating on glass easels.",
      image: "/images/ArtGallery/small/ArtGallery1.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/azpozv",
      category: "Museums",
    },
    {
      id: "artgallery2",
      title: "Degas Ballerina",
      description: "Degas sculpture in MASP.",
      image: "/images/ArtGallery/small/ArtGallery2.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/vbggph",
      category: "Museums",
    },
    {
      id: "artgallery4drawn",
      title: "Art Gallery Drawing",
      description: "Sketch of São Paulo’s art scene.",
      image: "/images/ArtGallery/small/ArtGallery4Drawn.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/rxtsgi",
      category: "Museums",
    },
    {
      id: "artgallery3",
      title: "Indigenous Exhibition",
      description: "Indigenous art at MASP.",
      image: "/images/ArtGallery/small/ArtGallery3.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/bltpzl",
      category: "Museums",
    },
    {
      id: "artgallery4",
      title: "Pinacoteca light",
      description: "Sunlight in the Pinacoteca.",
      image: "/images/ArtGallery/small/ArtGallery4.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/wkanbl",
      category: "Museums",
    },
    {
      id: "artgallery5",
      title: "Pinacoteca Architecture",
      description: "Brick and iron details.",
      image: "/images/ArtGallery/small/ArtGallery5.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/mshcaw",
      category: "Museums",
    },

    // Santos
    {
      id: "santos1",
      title: "Santos 1",
      description: "Coastal charm of Santos, Brazil.",
      image: "/images/Santos/small/Santos1.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/imrcgs",
      category: "Santos",
    },
    {
      id: "santos2",
      title: "Santos 2",
      description: "Scenes from the port city of Santos.",
      image: "/images/Santos/small/Santos2.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/felnv",
      category: "Santos",
    },
    {
      id: "santos3",
      title: "Santos 3",
      description: "Ocean and urban blend in Santos.",
      image: "/images/Santos/small/Santos3.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/epmgt",
      category: "Santos",
    },
    {
      id: "santos4",
      title: "Santos 4",
      description: "Views from the coastline of Santos.",
      image: "/images/Santos/small/Santos4.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/xhgdwdd",
      category: "Santos",
    },
    {
      id: "santos5",
      title: "Santos 5",
      description: "Life by the beaches of Santos.",
      image: "/images/Santos/small/Santos5.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/rswumv",
      category: "Santos",
    },
    {
      id: "santos6",
      title: "Santos 5 Artwork",
      description: "Another moment from the city of Santos.",
      image: "/images/Santos/small/Santos5Drawn.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/ynvfwu",
      category: "Santos",
    },

    // Carnival
    {
      id: "carnival1",
      title: "Carnival 1",
      description: "São Paulo Carnival streets alive with color and music",
      image: "/images/CarnivalSP/small/Carnival1.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/junhjy",
      category: "Carnival",
    },
    {
      id: "carnival2",
      title: "Carnival 2",
      description: "Samba schools perform at Sambódromo do Anhembi",
      image: "/images/CarnivalSP/small/Carnival2.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/htrdk",
      category: "Carnival",
    },
    {
      id: "carnival3",
      title: "Carnival 3",
      description: "Floats behind the scenes at Sambódromo",
      image: "/images/CarnivalSP/small/Carnival3.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/oktonph",
      category: "Carnival",
    },
    {
      id: "carnival4",
      title: "Carnival 4",
      description: "Spectators watching Carnival, city rhythms unfolding",
      image: "/images/CarnivalSP/small/Carnival4.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/hfnkpg",
      category: "Carnival",
    },
    {
      id: "carnival5",
      title: "Carnival 5",
      description: "Blocos in alleyways and open parks during Carnival",
      image: "/images/CarnivalSP/small/Carnival5.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/cgujou",
      category: "Carnival",
    },
    {
      id: "carnival6",
      title: "Carnival 6",
      description: "Ibirapuera Park bloco dancers winding through trees",
      image: "/images/CarnivalSP/small/Carnival6.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/iuzniy",
      category: "Carnival",
    },
    {
      id: "carnival7",
      title: "Carnival 7",
      description: "Drag performers performing marchinhas at a bloco",
      image: "/images/CarnivalSP/small/Carnival7.webp",
      gumroadLink: "https://nomadscribbles.gumroad.com/l/mykatk",
      category: "Carnival",
    },
  ];

  const categories = ["All", "City Life", "Parks", "Murals", "Santos", "Carnival", "Museums"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);

  // prepare objects for lightbox
  const lightboxItems = filteredItems.map((item) => ({
    image: item.image,
    title: item.title,
    shortDescription: item.description,
    gumroadLink: item.gumroadLink,
  }));

  return (
    <motion.div
      className="relative"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <SEO
        title="São Paulo Collection | Nomads Shop"
        description="Explore our curated collection of art and prints from São Paulo."
        image="/images/SaoPauloLanding/SaoPauloFeature.webp"
        slug="nomads-shop/brazil/saopaulo"
      />

      <div className="flex flex-col items-center mb-8 relative z-10 mt-14 sm:mt-8">
        <img
          src="/images/NomadsShop/NomadsShopTitle.webp"
          alt="NomadsShop Title"
          className="w-1/2 max-w-[8rem] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg"
        />
        <p className="text-center text-xs sm:text-lg font-bold mt-2 text-[#eeda8d] drop-shadow-md opacity-80">
          click an item to view details
        </p>
      </div>

      <div className="flex justify-center mt-2 mb-2">
        <img
          src={`${process.env.PUBLIC_URL}/images/SaoPauloLanding/SaoPauloFeature.webp`}
          alt="São Paulo skyline with feature title"
          className="w-full max-w-[600px] h-auto rounded-lg shadow-lg object-contain"
        />
      </div>

      <h1 className="sr-only">São Paulo</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-medium transition ${selectedCategory === cat
              ? "bg-black text-white"
              : "bg-white/70 text-black hover:bg-black/10"
              }`}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(12);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto">
        {visibleItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={fadeScale}
            whileHover={hoverScale}
            className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:shadow-xl"
            onClick={() => {
              trackEvent("open_lightbox", { item: item.title, category: item.category });
              openLightbox(index, lightboxItems);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                openLightbox(index, lightboxItems);
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white/60 backdrop-blur-sm p-2 flex flex-col items-center gap-1 rounded-b-lg">
              <p className="text-[#111] font-semibold text-sm sm:text-base text-center">
                {item.title}
              </p>
              <p className="text-[#111] text-xs sm:text-sm text-center">{item.description}</p>
              {item.gumroadLink && (
                <a
                  href={item.gumroadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("purchase_click", { item: item.title, category: item.category })
                  }
                  className="bg-gray-200 text-[#111] py-1 px-2 rounded hover:bg-gray-300 transition text-xs sm:text-sm"
                >
                  Purchase
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < filteredItems.length && (
        <div className="flex justify-center my-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition"
          >
            Load More
          </motion.button>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
        <Link to="/nomads-shop" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
          <span className="text-xl mr-3 pb-1">←</span>
          <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Shop</span>
        </Link>
      </div>
    </motion.div>
  );
}
