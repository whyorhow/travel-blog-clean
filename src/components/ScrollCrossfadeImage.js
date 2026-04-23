import React, { useEffect, useRef, useState } from "react";

export default function ScrollCrossfadeImage({
  photoSrc,
  drawnSrc,
  alt = "",
  aspectRatio = "3 / 2"
}) {
  const containerRef = useRef(null);
  const [isDrawn, setIsDrawn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // preload both images
  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();

    img1.src = photoSrc;
    img2.src = drawnSrc;

    img2.onload = () => setLoaded(true);
  }, [photoSrc, drawnSrc]);

  // scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
        } else {
          setIsDrawn(false);
        }
      },
      {
        threshold: 0.4
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
      style={{ aspectRatio }}
    >
      
      {/* Photo version */}
      <img
        src={photoSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3500ms] delay-[2000ms] ease-in-out ${
          isDrawn ? "opacity-0" : "opacity-100"
        }`}
        style={{ objectPosition: "center top" }}
      />

      {/* Drawn version */}
      <img
        src={drawnSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3500ms] delay-[2000ms] ease-in-out ${
          isDrawn ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectPosition: "center top" }}
      />

      {/* optional soft loading state */}
      {!loaded && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse" />
      )}
    </div>
  );
}
