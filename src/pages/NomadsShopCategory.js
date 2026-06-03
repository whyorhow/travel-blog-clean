import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { fadeScale, hoverScale, staggerContainer } from "../utils/animations";
import { trackEvent } from "../utils/analytics";
import { cloudinaryImageUrl } from "../utils/cloudinary";
import { FullscreenLightbox } from "../components/GalleryWall";
import ShopPageHeader from "../components/shop/ShopPageHeader";
import { shopTheme } from "../components/shop/shopTheme";

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

            <ShopPageHeader
                title={`${categoryFilter} Collection`}
                subtitle="Click an item to view details"
                className="mb-6"
            />

            {visibleItems.length === 0 ? (
                <motion.div className={`${shopTheme.emptyState} mt-12 px-4`}>
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
                                <p className={shopTheme.cardTitle}>
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
                                        className={shopTheme.cardPurchase}
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
                        className={shopTheme.loadMore}
                    >
                        Load More
                    </motion.button>
                </motion.div>
            )}

            <div className="flex flex-col items-center gap-6 mb-12 mt-8 relative z-10 px-4">
                <Link to="/nomads-shop/brazil" className={shopTheme.returnLink}>
                    <span className="text-xl mr-3 pb-1">←</span>
                    <span className="text-sm md:text-base font-bold tracking-widest uppercase text-center leading-tight">
                        Return to Brazil Shop
                    </span>
                </Link>
            </div>
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
