import { createContext, useContext, useState } from "react";

const NarrativeContext = createContext();

export function NarrativeProvider({ children }) {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const value = {
    currentCountry,
    setCurrentCountry,
    currentCity,
    setCurrentCity,
    activeIndex,
    setActiveIndex,
  };

  return (
    <NarrativeContext.Provider value={value}>
      {children}
    </NarrativeContext.Provider>
  );
}

export function useNarrative() {
  return useContext(NarrativeContext);
}
