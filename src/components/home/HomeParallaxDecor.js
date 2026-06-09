import React from "react";
import { useScroll } from "framer-motion";
import ParallaxBackground from "../ParallaxBackground";

export default function HomeParallaxDecor({ viewportHeight, viewportWidth }) {
  const { scrollY: scrollYMotion } = useScroll();
  return (
    <ParallaxBackground
      scrollYMotion={scrollYMotion}
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
    />
  );
}
