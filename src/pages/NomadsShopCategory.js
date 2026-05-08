import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, hoverScale, staggerContainer } from "../utils/animations";
import { trackEvent } from "../utils/analytics";
import allProducts from "../assets/artImages.json";

export default function NomadsShopCategory({ openLightbox }) {
    const { city } = useParams();

    // Helper to normalize city names for filtering.
    // Currently artImages.json uses categories like "Rio", "Salvador", "Pantanal".
    // The URL param :city might be "rio", "salvador", "pantanal" (lowercase).

    // Create a mapping if needed, or just capitalize.
    const cityMap = {
        rio: "Rio",
        salvador: "Salvador",
        pantanal: "Pantanal",
        foz: "Foz do Iguaçu",
        bonito: "Bonito",
        manaus: "Manaus"
    };

    const categoryFilter = cityMap[city.toLowerCase()] || city;

    // Filter items based on category
    const filteredItems = allProducts.filter(
        (item) => item.category === categoryFilter
    );

    const [visibleCount, setVisibleCount] = useState(12);
    const visibleItems = filteredItems.slice(0, visibleCount);

    // Prepare objects for lightbox
    const lightboxItems = filteredItems.map((item) => ({
        image: item.image,
        title: item.title,
        shortDescription: item.description,
        gumroadLink: item.gumroadLink,
        shopLink: item.shopLink
    }));

    // Title image logic (optional: could have a map for specific title images per city if available)
    // For now, we can use a generic title or the city name.
    // Using the Shop title image for consistency.

    return (
        <motion.div
            className="relative"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            <SEO
                title={`${categoryFilter} Collection | Nomads Shop`}
                description={`Explore our curated collection of art and prints from ${categoryFilter}, Brazil.`}
                slug={`nomads-shop/brazil/${city.toLowerCase()}`}
            />

            <div className="flex flex-col items-center mb-8 relative z-10 mt-14 sm:mt-8">
                <img
                    src="/images/NomadsShop/NomadsShopTitle.webp"
                    alt="NomadsShop Title"
                    className="w-1/2 max-w-[8rem] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg"
                />
                <h1 className="text-center text-xl sm:text-2xl font-bold mt-4 text-[#eeda8d] drop-shadow-md opacity-90 capitalize">
                    {categoryFilter} Collection
                </h1>
                <p className="text-center text-xs sm:text-sm font-semibold mt-1 text-white/80 drop-shadow-md">
                    click an item to view details
                </p>
            </div>

            <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
                <Link to="/nomads-shop" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
                    <span className="text-xl mr-3 pb-1">←</span>
                    <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Shop</span>
                </Link>
            </div>

            {visibleItems.length === 0 ? (
                <div className="text-center text-white mt-12">
                    <p>No items found for this collection yet.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto px-4">
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
                                <p className="text-[#111] font-semibold text-sm sm:text-base text-center line-clamp-1">
                                    {item.title}
                                </p>
                                {/* <p className="text-[#111] text-xs sm:text-sm text-center line-clamp-1">{item.description}</p> */}
                                {item.gumroadLink && (
                                    <a
                                        href={item.gumroadLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent opening lightbox when clicking purchase
                                            trackEvent("purchase_click", { item: item.title, category: item.category });
                                        }}
                                        className="bg-gray-200 text-[#111] py-1 px-3 rounded hover:bg-gray-300 transition text-xs sm:text-sm font-medium"
                                    >
                                        Purchase
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

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
        </motion.div>
    );
}
