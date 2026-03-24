import { useState } from "react";
import stoneWallLine from "../assets/images/stone wall line1.webp";
import CloseIcon from "../assets/images/cross.svg";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function GalleryWall({ 
  images, 
  openLightbox, 
  title = "The Gallery", 
  subtitle = "Step inside" 
}) {
  // GalleryWall component v2.0 - room-based navigation

  // Create gallery rooms (groups of 5-6 images)
  const createGalleryRooms = (imageArray) => {
    const rooms = [];
    const shuffled = shuffleArray(imageArray);
    
    for (let i = 0; i < shuffled.length; i += 5) {
      rooms.push(shuffled.slice(i, i + 6)); // 5-6 images per room
    }
    
    return rooms;
  };

  const [galleryRooms] = useState(createGalleryRooms(images));
  const [currentRoom, setCurrentRoom] = useState(0);
  const [framedImage, setFramedImage] = useState(null);

  const handleImageClick = (image, event) => {
    event.stopPropagation();
    
    // First click: show framed view
    if (!framedImage) {
      setFramedImage(image);
    } 
    // Second click: close framed view
    else if (framedImage.imageId === image.imageId) {
      setFramedImage(null);
    }
    // Click different image: show new framed view
    else {
      setFramedImage(image);
    }
  };

  const handleFramedImageClick = (image) => {
    // Double-click on framed image: open lightbox
    if (openLightbox) {
      const index = images.findIndex(img => img.imageId === image.imageId);
      if (index !== -1) {
        openLightbox(index, images);
        setFramedImage(null); // Close framed view when opening lightbox
      }
    }
  };

  const closeFramedView = (event) => {
    event.stopPropagation();
    setFramedImage(null);
  };

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % galleryRooms.length);
  };

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + galleryRooms.length) % galleryRooms.length);
  };

  const currentRoomImages = galleryRooms[currentRoom] || [];

  return (
    <>
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 border-t-2 border-b-2 border-orange-200 my-16">

        {/* Stone Wall Line Decoration */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <img 
            src={stoneWallLine}
            alt="Stone wall decoration"
            className="w-full h-8 object-cover"
          />
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

          {/* Heading */}
          <div className="text-center mb-24 px-6">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-800 font-handwriting mb-4">
              {title}
            </h2>
            <p className="text-gray-600 italic text-lg md:text-xl">
              {subtitle}
            </p>
          </div>

          {/* Gallery Room */}
          <div className="px-6 md:px-12 lg:px-16">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-24 lg:gap-30">
              {currentRoomImages.map((image, index) => (
                <div 
                  key={index}
                  className="mb-24 lg:mb-30 break-inside-avoid cursor-pointer group transform transition-all duration-500 relative"
                  onClick={(e) => handleImageClick(image, e)}
                >
                  {/* Image container for hover overlay */}
                  <div className="relative">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:rotate-[0.5deg]"
                    />
                    
                    {/* Light hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                  </div>
                  
                  {/* Narrow gallery cards */}
                  <div className="mt-3 max-w-[200px] p-2 bg-white/80 backdrop-blur-sm border-l border-gray-400 rounded-lg shadow-sm">
                    <h4 className="text-gray-800 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1 font-cormorant leading-tight">
                      {image.alt}
                    </h4>
                    <div className="mt-1 w-3 h-[1px] bg-gray-400"></div>
                    <p className="text-gray-600 text-[7px] sm:text-[9px] mt-1 italic font-serif leading-tight">
                      {image.alt === "Cathedral" && "Gothic masterpiece"}
                      {image.alt === "Flower Market" && "Fresh blooms daily"}
                      {image.alt === "Port House" && "Modern architecture"}
                      {image.alt === "Street Mural" && "Urban art scene"}
                      {image.alt === "Chocolate Shop" && "Belgian treats"}
                      {image.alt === "Central Station" && "Historic transport"}
                      {image.alt === "Outdoor Market" && "Local commerce"}
                      {image.alt === "Rustic Restaurant" && "Traditional dining"}
                      {image.alt === "Seafood Restaurant" && "Maritime cuisine"}
                      {image.alt === "Confectionery Shop" && "Sweet delights"}
                      {image.alt === "Evening Glow" && "Golden hour"}
                      {image.alt === "Historic Stone Bridge" && "River crossing"}
                      {image.alt === "Bustling Quay" && "Port activity"}
                      {image.alt === "Historic Brick Buildings" && "Heritage architecture"}
                      {image.alt === "Cobblestone Street" && "Medieval pathways"}
                      {image.alt === "Grote Markt" && "Main square"}
                      {image.alt === "Brabo Statue" && "Legendary figure"}
                      {image.alt === "Het Steen" && "Medieval castle"}
                      {image.alt === "Medieval Tower" && "Historic landmark"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Navigation */}
          {galleryRooms.length > 1 && (
            <div className="text-center mt-24 flex flex-col md:flex-row gap-6 justify-center px-6 items-center">

              <button
                onClick={prevRoom}
                className="px-8 py-4 border border-gray-300 border-l-4 border-gray-400 bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg shadow-sm hover:bg-white/90 hover:border-gray-400 hover:border-l-gray-500 transition-all duration-300 font-medium"
              >
                ← Previous Room
              </button>

              <div className="text-gray-600 text-sm font-medium">
                Room {currentRoom + 1} of {galleryRooms.length}
              </div>

              <button
                onClick={nextRoom}
                className="px-8 py-4 border border-gray-300 border-l-4 border-gray-400 bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg shadow-sm hover:bg-white/90 hover:border-gray-400 hover:border-l-gray-500 transition-all duration-300 font-medium"
              >
                Next Room →
              </button>

            </div>
          )}

        </div>
      </section>

      {/* Enlarged Image Modal */}
      {framedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeFramedView}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Larger image - natural scaling without cropping */}
            <div className="relative flex items-center justify-center" style={{ minHeight: '60vh', maxHeight: '70vh' }}>
              <img 
                src={framedImage.src}
                alt={framedImage.alt}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                onDoubleClick={() => handleFramedImageClick(framedImage)}
              />
            </div>
            
            {/* Title card below image */}
            <div className="mt-3 mx-auto max-w-[200px] p-2 bg-white/80 backdrop-blur-sm border-l border-gray-400 rounded-lg shadow-sm">
              <h4 className="text-gray-800 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1 font-cormorant leading-tight">
                {framedImage.alt}
              </h4>
              <div className="mt-1 w-3 h-[1px] bg-gray-400"></div>
              <p className="text-gray-600 text-[7px] sm:text-[9px] mt-1 italic font-serif leading-tight">
                {framedImage.alt === "Cathedral" && "Gothic masterpiece"}
                {framedImage.alt === "Flower Market" && "Fresh blooms daily"}
                {framedImage.alt === "Port House" && "Modern architecture"}
                {framedImage.alt === "Street Mural" && "Urban art scene"}
                {framedImage.alt === "Chocolate Shop" && "Belgian treats"}
                {framedImage.alt === "Central Station" && "Historic transport"}
                {framedImage.alt === "Outdoor Market" && "Local commerce"}
                {framedImage.alt === "Rustic Restaurant" && "Traditional dining"}
                {framedImage.alt === "Seafood Restaurant" && "Maritime cuisine"}
                {framedImage.alt === "Confectionery Shop" && "Sweet delights"}
                {framedImage.alt === "Evening Glow" && "Golden hour"}
                {framedImage.alt === "Historic Stone Bridge" && "River crossing"}
                {framedImage.alt === "Bustling Quay" && "Port activity"}
                {framedImage.alt === "Historic Brick Buildings" && "Heritage architecture"}
                {framedImage.alt === "Cobblestone Street" && "Medieval pathways"}
                {framedImage.alt === "Grote Markt" && "Main square"}
                {framedImage.alt === "Brabo Statue" && "Legendary figure"}
                {framedImage.alt === "Het Steen" && "Medieval castle"}
                {framedImage.alt === "Medieval Tower" && "Historic landmark"}
              </p>
            </div>
            
            {/* Close button */}
            <button
              onClick={closeFramedView}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <img src={CloseIcon} alt="Close" className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
