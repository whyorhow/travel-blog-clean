import React from "react";
import { motion, useTransform } from "framer-motion";
import { skyObjects } from "./Sky";
import { sunsObjects } from "./Suns";
import { waterObjects } from "./Water";
import { soilObjects } from "./Soil";
import { grassObjects } from "./Grass";

const ParallaxLayer = ({ layer, scrollY, viewportHeight, viewportWidth }) => {
    const isMobileBp = viewportWidth <= 640;
    const isTabletBp = viewportWidth > 640 && viewportWidth <= 1024;

    const pick = (mobileVal, tabletVal, desktopVal, fallbackVal) => {
        if (isMobileBp && mobileVal !== undefined) return mobileVal;
        if (isTabletBp && tabletVal !== undefined) return tabletVal;
        if (desktopVal !== undefined) return desktopVal;
        return fallbackVal;
    };

    const width = pick(layer.widthMobile, layer.widthTablet, layer.widthDesktop, layer.width || "100%");
    const speed = pick(layer.speedMobile, layer.speedTablet, layer.speedDesktop, layer.speed ?? 0.05);
    const xSpeed = pick(layer.xSpeedMobile, layer.xSpeedTablet, layer.xSpeedDesktop, layer.xSpeed ?? 0);

    const baseTopPercent = pick(
        layer.baseTopPercentMobile,
        layer.baseTopPercentTablet,
        layer.baseTopPercentDesktop,
        layer.baseTopPercent
    );

    const baseBottomPercent = pick(
        layer.baseBottomPercentMobile,
        layer.baseBottomPercentTablet,
        layer.baseBottomPercentDesktop,
        layer.baseBottomPercent
    );

    const baseLeftPercent = pick(
        layer.baseLeftPercentMobile,
        layer.baseLeftPercentTablet,
        layer.baseLeftPercentDesktop,
        layer.baseLeftPercent || 0
    );

    // Initial Static Position (Base)
    const initialTop = (baseTopPercent !== undefined)
        ? viewportHeight * (baseTopPercent / 100)
        : (baseBottomPercent !== undefined)
            ? viewportHeight - (viewportHeight * (baseBottomPercent / 100))
            : 0;

    const initialLeft = (baseLeftPercent / 100) * viewportWidth;

    // Transform Y Position (GPU)
    const y = useTransform(scrollY, (latest) => -latest * speed * 20);

    // Transform X Position (GPU)
    const rawX = useTransform(scrollY, (latest) => {
        if (layer.centerHorizontally) {
            return xSpeed ? latest * (xSpeed * 10) : 0;
        } else {
            return latest * (xSpeed * 20);
        }
    });

    // Composite transform for centering
    const xTransform = useTransform(rawX, (val) => {
        return layer.centerHorizontally ? `calc(-50% + ${val}px)` : `${val}px`;
    });

    const style = {
        position: "absolute",
        width,
        height: layer.height || "auto",
        zIndex: layer.zIndex ?? 0,
        top: `${initialTop}px`, // Static initial offset
        left: layer.centerHorizontally ? "50%" : `${initialLeft}px`,
        x: xTransform,
        y: y,
        pointerEvents: "none",
        maxWidth: "none",
        willChange: "transform",
        opacity: layer.opacity ?? 1,
    };

    if (layer.sway) {
        style.animation = `sway ${layer.swayDuration || 2}s ease-in-out infinite alternate`;
    }

    const isSoilOrGround = layer.id?.startsWith("soil") || layer.id === "ground";

    return (
        <motion.svg
            viewBox={layer.viewBox || "0 0 800 400"}
            preserveAspectRatio={layer.preserveAspectRatio || "xMidYMid meet"}
            style={{
                ...style,
                filter: isSoilOrGround ? "url(#soilTexture)" : style.filter
            }}
        >
            {layer.path && (
                <path d={layer.path} fill={layer.fill} stroke={layer.stroke} strokeWidth={layer.strokeWidth} />
            )}
        </motion.svg>
    );
};

const ParallaxBackground = React.memo(({ scrollYMotion, viewportHeight, viewportWidth }) => {
    const sky = skyObjects.map((layer, idx) => ({ ...layer, id: layer.id || `sky-${idx}`, zIndex: layer.zIndex ?? 1 }));
    const suns = sunsObjects.map((layer, idx) => ({ ...layer, id: layer.id || `suns-${idx}`, zIndex: layer.zIndex ?? 10 }));
    const water = waterObjects.map((layer, idx) => ({ ...layer, id: layer.id || `water-${idx}`, zIndex: layer.zIndex ?? 15 }));
    const soil = soilObjects.map((layer, idx) => ({ ...layer, id: layer.id || `soil-${idx}`, zIndex: layer.zIndex ?? 20 }));
    const grass = grassObjects.map((layer, idx) => ({ ...layer, id: layer.id || `grass-${idx}`, zIndex: layer.zIndex ?? 25 }));

    const allLayers = [...sky, ...suns, ...water, ...soil, ...grass];

    return (
        <>
            {allLayers.map((layer, index) => (
                <ParallaxLayer
                    key={layer.id || index}
                    layer={layer}
                    scrollY={scrollYMotion}
                    viewportHeight={viewportHeight}
                    viewportWidth={viewportWidth}
                />
            ))}
        </>
    );
});

export default ParallaxBackground;
