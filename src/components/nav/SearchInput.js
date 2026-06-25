import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import {
  SITE_HEADER_HEIGHT_CLASS,
  CLUSTER_BTN_CLASS,
  SEARCH_ICON_CLASS,
} from "./siteHeaderLayout";

const SearchInput = ({
  searchOpen,
  toggleSearch,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
}) => {
  return (
    <div className="search-container flex items-center pointer-events-none">
      <form
        onSubmit={handleSearchSubmit}
        className={`flex flex-row items-center pointer-events-auto ${SITE_HEADER_HEIGHT_CLASS}`}
      >
        <button
          type="button"
          onClick={toggleSearch}
          className={`shrink-0 transition-transform duration-300 ease-in-out ${CLUSTER_BTN_CLASS}`}
          aria-label={searchOpen ? "Close search" : "Open search"}
          aria-expanded={searchOpen}
        >
          <SearchIcon
            className={`block transition-transform duration-300 ease-in-out ${SEARCH_ICON_CLASS} ${
              searchOpen ? "scale-105" : "scale-100"
            }`}
          />
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`rounded border border-stone-600/80 bg-stone-950/90 text-stone-200 placeholder:text-stone-400 text-xs sm:text-sm outline-none shadow-sm transition-all duration-300 ease-in-out origin-left h-8 ${
            searchOpen
              ? "w-28 sm:w-36 md:w-44 opacity-100 pointer-events-auto ml-1.5 px-2"
              : "w-0 opacity-0 pointer-events-none ml-0 px-0 border-0"
          }`}
          aria-label="Search"
          tabIndex={searchOpen ? 0 : -1}
        />
      </form>
    </div>
  );
};

export default SearchInput;
