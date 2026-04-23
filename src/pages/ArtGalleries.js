import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import artImages from "../assets/artImages.json";
import { cloudinaryImageUrl, getPublicIdFromLegacyPath } from "../utils/cloudinary";
import ScrollCrossfadeImage from "../components/ScrollCrossfadeImage";

const cloudSmallSrc = (img) =>
  cloudinaryImageUrl(
    img?.blogImagePublicId || img?.imagePublicId || getPublicIdFromLegacyPath(img?.image),
    { width: 1200 }
  );

function ArtGalleries({ openLightbox }) {
  const images = artImages.filter(img => img.category === "ArtGallery" || img.category === "Museums");

  const getImage = (id) => images.find(i => i.id === id);

  const imageOrder = ["gallery1", "gallery2", "gallery3", "gallery4", "gallery5"];

  const sortedImages = imageOrder
    .map(id => images.find(img => img.id === id))
    .filter(Boolean);

  const handleImageClick = (imageId) => {
    const index = sortedImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      openLightbox(index, sortedImages);
    }
  };

  const sections = [
    {
      id: "intro",
      text:
        "In São Paulo, galleries sit within the city, but they are not passed through in the same way as streets or parks.\n\nPeople enter them deliberately, often between other parts of the day.\n\nWhat happens inside is separate from the movement outside, even if it exists only a few steps away from it.\n\nThey are returned to at different times, when there is space to step out of everything else for a while.\n\nThey are not destinations, but rather pauses from the movement of the city."
    },

    {
      id: "gallery1",
      coverImage: "gallery1",
      caption: "MASP, suspended above Avenida Paulista.",
      text:
        "MASP sits above Avenida Paulista, lifted away from the movement of the street.\n\nTraffic, noise, and daily routines continue beneath it while the building stays still above them.\n\nInside, artworks are placed on glass supports so they are visible from all sides.\n\nThere is no fixed route through the space. People move between works, stopping when something catches their attention, then continuing without needing to complete a path."
    },

    {
      id: "gallery2",
      coverImage: "gallery2",
      drawnImage: "artgallery4drawn",
      caption: "A figure by Degas held in stillness.",
      text:
        "In certain rooms, people move in and out rather than staying for long periods.\n\nThey pause, leave, and return again - sometimes within the same visit, sometimes on different days.\n\nWhat is noticed on one visit is not always the same on the next. Some works become familiar over time, not because they change, but because they are seen again."
    },

    {
      id: "gallery3",
      coverImage: "gallery3",
      caption: "Indigenous Brazilian works at MASP.",
      text:
        "Below the main levels, the building becomes quieter.\n\nLight changes here, and the materials feel older and less polished.\n\nIndigenous Brazilian works are shown alongside other collections, not set apart as distant objects but placed within the same space of attention."
    },

    {
      id: "gallery5",
      coverImage: "gallery5",
      caption: "Pinacoteca, shaped by brick and light.",
      text:
        "Inside the Pinacoteca, brick and iron remain visible throughout the building.\n\nLight enters through high windows, leaving parts of each room in shadow.\n\nWorks are encountered one at a time as the building moves from one enclosed space to the next."
    },

    {
      id: "gallery4",
      coverImage: "gallery4",
      caption: "In a Window of Prestes Maia 911 Building by Brazilian photographer Julio Bittencourt.",
      text: ""
    },

    {
      id: "closing",
      text:
        "For many people in São Paulo, galleries are not planned occasions.\n\nThey are visited when time opens up, fitting into days rather than defining them.\n\nThey remain part of the city's interior rhythm, present but not always entered."
    }
  ];

  return (
    <div className="bg-stone-50 relative">

      <SEO
        title="Art & Galleries - São Paulo | Nomad Scribbles"
        description="São Paulo's galleries as part of everyday movement through the city."
        image={cloudinaryImageUrl("SP-ArtGallery/small/gallery1", { width: 1200 })}
        slug="/brazil/saopaulo/art-galleries"
      />

      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-5xl md:text-7xl font-handwriting text-[#2e1065]">
          Art & Galleries
        </h1>

        <div className="mt-6 bg-[#2e1065]/10 p-4 rounded-lg border-l-4 border-[#2e1065]">
          <p className="text-xl md:text-2xl text-stone-800 italic font-medium">
            MASP · Pinacoteca · Interior collections across the city
          </p>
        </div>
      </div>

      {/* STORY FLOW */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-20">

        {sections.map((s) => {
          const img = s.coverImage ? getImage(s.coverImage) : null;
          
          
          return (
            <div key={s.id}>

              {/* SPECIAL LAYOUT FOR GALLERY1 (MASP) - SIDE BY SIDE ON DESKTOP */}
              { s.id === "gallery1" || s.id === "gallery3" ? (
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* TEXT */}
                  {s.text && (
                    <div className="flex-1 text-lg leading-relaxed text-stone-800">
                      {s.text.split("\n\n").map((p, i) => (
                        <p key={i} className={i > 0 ? "mt-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* IMAGE */}
                  {s.coverImage && img && (
                    <div className="flex-shrink-0 w-full md:w-96">
                      { s.drawnImage ? (
                          (() => {
                            const drawnImg = getImage(s.drawnImage);
                            return (
                              <ScrollCrossfadeImage
                                photoSrc={cloudSmallSrc(img)}
                                drawnSrc={drawnImg ? cloudSmallSrc(drawnImg) : ''}
                                alt={s.caption || ""}
                                aspectRatio="3/4"
                              />
                            );
                          })()
                        ) : (
                          <img
                            src={cloudSmallSrc(img)}
                            alt={s.caption || ""}
                            onClick={() => handleImageClick(s.coverImage)}
                            className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                          />
                        )}
                      {s.caption && (
                        <p className="text-sm italic text-stone-500 text-center mt-3">
                          {s.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* TEXT */}
                  {s.text && (
                    <div className="text-lg leading-relaxed text-stone-800">
                      {s.text.split("\n\n").map((p, i) => (
                        <p key={i} className={i > 0 ? "mt-6" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* IMAGE INTERRUPTION */}
                  {s.coverImage && img && (
                    <div className="flex justify-center mt-10">
                      <div className="w-72 sm:w-80 md:w-96">
                        { s.drawnImage ? (
                          (() => {
                            const drawnImg = getImage(s.drawnImage);
                            return (
                              <ScrollCrossfadeImage
                                photoSrc={cloudSmallSrc(img)}
                                drawnSrc={drawnImg ? cloudSmallSrc(drawnImg) : ''}
                                alt={s.caption || ""}
                                aspectRatio="3/4"
                              />
                            );
                          })()
                        ) : (
                          <img
                            src={cloudSmallSrc(img)}
                            alt={s.caption || ""}
                            onClick={() => handleImageClick(s.coverImage)}
                            className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                          />
                        )}
                        {s.caption && (
                          <p className="text-sm italic text-stone-500 text-center mt-3">
                            {s.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>
          );
        })}

      </div>

      {/* NAVIGATION */}
      <div className="text-center pb-16">
        <Link to="/brazil/saopaulo" className="text-[#2e1065] underline">
          Back to São Paulo
        </Link>
      </div>

    </div>
  );
}

export default ArtGalleries;
