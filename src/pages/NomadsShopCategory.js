import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, hoverScale, staggerContainer } from "../utils/animations";
import { trackEvent } from "../utils/analytics";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { FullscreenLightbox } from "../components/GalleryWall";

const CITY_LABELS = {
    rio: "Rio",
    salvador: "Salvador",
    pantanal: "Pantanal",
    foz: "Foz do Iguaçu",
    bonito: "Bonito",
    manaus: "Manaus",
};

const CITY_SLICE_LOADERS = {
    rio: () => import("../assets/artImages/slices/category/rio.json"),
    salvador: () => import("../assets/artImages/slices/category/salvador.json"),
    pantanal: () => import("../assets/artImages/slices/category/pantanal.json"),
    foz: () => import("../assets/artImages/slices/category/iguazu.json"),
    bonito: () => import("../assets/artImages/slices/category/bonito.json"),
    manaus: () => import("../assets/artImages/slices/category/manaus.json"),
};

export default function NomadsShopCategory() {
    const { city } = useParams();
    const cityKey = city?.toLowerCase() || "";
    const categoryFilter = CITY_LABELS[cityKey] || city;

    const [filteredItems, setFilteredItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    useEffect(() => {
        setVisibleCount(12);
        const load = CITY_SLICE_LOADERS[cityKey];
        if (!load) {
            setFilteredItems([]);
            return undefined;
        }
        let cancelled = false;
        load().then((mod) => {
            if (!cancelled) setFilteredItems(mod.default || []);
        });
        return () => {
            cancelled = true;
        };
    }, [cityKey]);

    const visibleItems = filteredItems.slice(0, visibleCount);

    const lightboxItems = filteredItems.map((item) => ({
        image: cloudinaryImageUrl(item.cloudinary?.lightbox, { width: 1600 }),
        src: cloudinaryImageUrl(item.cloudinary?.blog, { width: 800 }),
        title: item.title,
        description: item.description,
        gumroadLink: item.gumroadLink,
        shopLink: item.shopLink,
    }));

    return (
        <>
        <motion.div
            className="relative"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            <SEO
                title={`${categoryFilter} Collection | Nomads Shop`}
                description={`Explore our curated collection of art and prints from ${categoryFilter}, Brazil.`}
                slug={`nomads-shop/brazil/${cityKey}`}
            />

            <motion.div className="flex flex-col items-center mb-8 relative z-10 mt-14 sm:mt-8">
                <img
                    src="/images/NomadsShop/NomadsShopTitle.webp"
                    alt="NomadsShop Title"
                    className="w-1/2 max-w-[8rem] sm:max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg"
                />
                <h1 className="text-center text-xl sm:text-2xl font-bold mt-4 text-galleryGold drop-shadow-md opacity-90 capitalize">
                    {categoryFilter} Collection
                </h1>
                <p className="text-center text-xs sm:text-sm font-semibold mt-1 text-white/80 drop-shadow-md">
                    click an item to view details
                </p>
            </motion.div>

            <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
                <Link to="/nomads-shop" className="flex flex-row items-center justify-center text-stone-300 hover:text-white transition-colors drop-shadow-md bg-stone-950/50 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 shadow-lg hover:bg-stone-900/60 w-fit min-w-[240px]">
                    <span className="text-xl mr-3 pb-1">←</span>
                    <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">Return to Shop</span>
                </Link>
            </div>

            {visibleItems.length === 0 ? (
                <motion.div className="text-center text-white mt-12">
                    <p>No items found for this collection yet.</p>
                </motion.div>
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
                                setLightboxIndex(index);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ")
                                    setLightboxIndex(index);
                            }}
                        >
                            <img
                                src={cloudinaryImageUrl(item.cloudinary?.blog, { width: 400 })}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-white/60 backdrop-blur-sm p-2 flex flex-col items-center gap-1 rounded-b-lg">
                                <p className="text-text-primary font-semibold text-sm sm:text-base text-center line-clamp-1">
                                    {item.title}
                                </p>
                                {item.gumroadLink && (
                                    <a
                                        href={item.gumroadLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            trackEvent("purchase_click", { item: item.title, category: item.category });
                                        }}
                                        className="bg-gray-200 text-text-primary py-1 px-3 rounded hover:bg-gray-300 transition text-xs sm:text-sm font-medium"
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
                <motion.div className="flex justify-center my-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setVisibleCount((prev) => prev + 12)}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition"
                    >
                        Load More
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
        {lightboxIndex !== null && (
            <FullscreenLightbox
                images={lightboxItems}
                startIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
            />
        )}
        </>
    );
}
