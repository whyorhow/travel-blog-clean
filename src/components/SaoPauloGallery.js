import { useState, useMemo, useCallback, useEffect } from "react";
import SimpleLightbox from "./SimpleLightbox";

// Size class definitions with weight values
const SIZE_CLASSES = {
  small: { weight: 1, aspectRatio: 'standard' },
  wide: { weight: 2, aspectRatio: 'wide' },
  tall: { weight: 2, aspectRatio: 'tall' },
  large: { weight: 3, aspectRatio: 'large' }
};

// Enhanced data model: add behavioral properties to images
const enhanceGalleryData = (images) => {
  // Deduplicate by src before processing — prevents same image appearing multiple times
  const seen = new Set();
  const unique = images.filter(img => {
    const key = img.src || img.image;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.map((img, index) => {
    // Derive size class from image dimensions or category patterns
    const sizeClass = deriveSizeClass(img);
    
    return {
      ...img,
      // Core behavioral properties
      id: img.imageId || img.src || img.image || `img-${index}`,
      sizeClass,
      weight: SIZE_CLASSES[sizeClass].weight,
      
      // Optional semantic properties (can be enhanced later)
      theme: deriveTheme(img),
      energy: deriveEnergy(img),
      isAnchor: isAnchorImage(img, index),
      
      // Metadata for shuffle system
      originalIndex: index
    };
  });
};

// Derive size class based on image properties or naming patterns
const deriveSizeClass = (img) => {
  // Check if image has explicit size info
  if (img.sizeClass) return img.sizeClass;
  
  // Derive from aspect ratio hints in filename or category
  const filename = img.image || img.src || '';
  const category = img.category || '';
  
  if (filename.includes('wide') || category.includes('panorama')) return 'wide';
  if (filename.includes('tall') || category.includes('portrait')) return 'tall';
  if (filename.includes('large') || category.includes('feature')) return 'large';
  
  return 'small'; // default
};

// Derive theme for content-based spacing
const deriveTheme = (img) => {
  return img.category || 'general';
};

// Derive energy level for rhythm control
const deriveEnergy = (img) => {
  const category = img.category || '';
  const title = img.title || '';
  const desc = img.description || '';
  const text = (category + title + desc).toLowerCase();
  
  if (text.includes('carnival') || text.includes('festival') || text.includes('night')) return 'high';
  if (text.includes('park') || text.includes('garden') || text.includes('quiet')) return 'low';
  
  return 'medium';
};

// Identify anchor images (visual breathing points)
const isAnchorImage = (img, index) => {
  // First and last images are often anchors
  if (index === 0 || index === 9) return true;
  
  // Images with special titles or categories
  const category = img.category || '';
  const title = img.title || '';
  
  if (category.includes('feature') || title.includes('cathedral') || title.includes('landmark')) return true;
  
  return false;
};

export default function SaoPauloGallery({ 
  images, 
  openLightbox,
  backgroundImage
}) {
  // Enhanced Gallery with behavioral shuffle system
  
  // State structure: baseGallery (immutable) + displayedGallery (mutable)
  const [displayedGallery, setDisplayedGallery] = useState([]);
  
  // Create enhanced gallery data with behavioral properties
  const baseGallery = useMemo(() => enhanceGalleryData(images), [images]);
  
  // Initialize displayed gallery when baseGallery is ready
  useEffect(() => {
    if (baseGallery.length > 0) {
      selectRandomSubset();
    }
  }, [baseGallery]);
  
  // Select random subset of images (1/3 of total)
  const selectRandomSubset = useCallback(() => {
    const subsetSize = Math.ceil(baseGallery.length / 3);
    let shuffled = [...baseGallery];
    
    // PASS 1: Initial shuffle (raw randomness)
    shuffled = shuffled.sort(() => Math.random() - 0.5);
    
    // PASS 2: Take subset
    let subset = shuffled.slice(0, subsetSize);
    
    // PASS 3: Apply behavioral passes to subset
    subset = protectAnchors(subset);
    subset = balanceWeights(subset);
    subset = separateThemes(subset);
    
    setDisplayedGallery(subset);
  }, [baseGallery]);
  
  // 4-PASS SHUFFLE PIPELINE
  const shuffleGallery = useCallback(() => {
    selectRandomSubset();
  }, [selectRandomSubset]);
  
  // PASS 2: Anchor protection - space out anchor images
  const protectAnchors = (sequence) => {
    const anchors = sequence.filter(img => img.isAnchor);
    const result = [...sequence];
    
    // Simple anchor spacing: ensure minimum distance between anchors
    const minAnchorDistance = Math.ceil(sequence.length / anchors.length);
    
    anchors.forEach(anchor => {
      const currentIndex = result.findIndex(img => img.id === anchor.id);
      
      // Check for nearby anchors and try to separate
      for (let i = Math.max(0, currentIndex - minAnchorDistance + 1); i <= Math.min(sequence.length - 1, currentIndex + minAnchorDistance - 1); i++) {
        if (i !== currentIndex && result[i]?.isAnchor) {
          // Find a non-anchor position to swap with
          for (let j = 0; j < sequence.length; j++) {
            if (!result[j].isAnchor && Math.abs(j - currentIndex) >= minAnchorDistance) {
              // Swap positions
              [result[currentIndex], result[j]] = [result[j], result[currentIndex]];
              break;
            }
          }
        }
      }
    });
    
    return result;
  };
  
  // PASS 3: Weight balancing - avoid heavy clustering and create rhythm
  const balanceWeights = (sequence) => {
    const result = [...sequence];
    const windowSize = 4; // Look at groups of 4 items
    const maxWeight = 6; // Maximum weight in any window
    
    for (let i = 0; i <= result.length - windowSize; i++) {
      const window = result.slice(i, i + windowSize);
      const totalWeight = window.reduce((sum, img) => sum + img.weight, 0);
      
      if (totalWeight > maxWeight) {
        // Find the heaviest item in this window
        const heaviestIndex = i + window.findIndex((img, idx) => 
          img.weight === Math.max(...window.map(w => w.weight))
        );
        
        // Try to swap with a lighter item ahead
        for (let j = i + windowSize; j < result.length; j++) {
          if (result[j].weight < result[heaviestIndex].weight) {
            [result[heaviestIndex], result[j]] = [result[j], result[heaviestIndex]];
            break;
          }
        }
      }
    }
    
    return result;
  };
  
  // PASS 4: Theme/energy separation - avoid repetition clustering
  const separateThemes = (sequence) => {
    const result = [...sequence];
    const themeWindow = 8; // Check for theme repetition within 8 items
    
    for (let i = 0; i < result.length; i++) {
      const currentTheme = result[i].theme;
      
      // Look for same theme in nearby positions
      for (let j = i + 1; j < Math.min(i + themeWindow, result.length); j++) {
        if (result[j].theme === currentTheme) {
          // Try to swap with a different theme ahead
          for (let k = j + 1; k < result.length; k++) {
            if (result[k].theme !== currentTheme) {
              [result[j], result[k]] = [result[k], result[j]];
              break;
            }
          }
        }
      }
    }
    
    return result;
  };

  const handleImageClick = (image) => {
    // Click on image: open external lightbox
    if (openLightbox) {
      const index = displayedGallery.findIndex(img => img.imageId === image.imageId);
      if (index !== -1) {
        openLightbox(index, displayedGallery);
      }
    }
  };

  // Add CSS animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <section
        className="relative py-32 overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 border-t-2 border-b-2 border-orange-200"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
      >
        {/* Divider Line */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="w-full h-px bg-stone-300"></div>
        </div>

        {/* Warm gallery texture background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100"></div>
          <img 
            src="/images/textures/gallery-wall.webp" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        {/* Warm shadow overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-200/20 via-transparent to-amber-100/10"></div>
        
        {/* Full width content */}
        <div className="relative z-10 w-full">
          
          {/* Gallery Grid with Behavioral Shuffle */}
          <div className="px-6 md:px-12 lg:px-16">
            {/* Shuffle Button */}
            <div className="text-center mb-12">
              <button
                onClick={shuffleGallery}
                className="px-8 py-4 bg-[#cbbda4] text-[#B8860B] font-handwriting text-2xl md:text-3xl font-bold transition-all duration-300 hover:bg-[#c0b09a] border-2 border-[#cbbda4] rounded-lg"
              >
                Remix Gallery
              </button>
            </div>
            
            {/* Fixed masonry layout with increased spacing */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-8 md:gap-12">
              {displayedGallery.map((image, index) => (
                <div 
                  key={image.id}
                  className="break-inside-avoid mb-16 md:mb-24 transition-all duration-700 ease-out transform hover:scale-105 relative"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="relative group cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(image);
                    }}
                  >
                    {/* Clean image with proper spacing */}
                    <img 
                      src={image.src || image.image}
                      alt={image.alt}
                      loading="lazy"
                      className={`w-full h-auto rounded-lg transition-all duration-500 group-hover:scale-110 ${
                        image.sizeClass === 'wide' ? 'max-w-full' :
                        image.sizeClass === 'tall' ? 'max-w-xs mx-auto' :
                        image.sizeClass === 'large' ? 'max-w-sm mx-auto' :
                        'max-w-[120px] mx-auto'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
