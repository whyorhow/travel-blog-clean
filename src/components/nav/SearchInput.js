import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";

const SearchInput = ({ searchOpen, toggleSearch, searchQuery, setSearchQuery, handleSearchSubmit }) => {
    return (
        <div className="search-container fixed top-2 md:top-2 right-12 z-50 flex items-center">
            <SearchIcon
                className={`cursor-pointer transition-transform duration-300 p-1 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11
      ${searchOpen ? "scale-125" : "scale-100"}`} // slightly bigger when active
                onClick={toggleSearch}
                aria-label="Open search"
            />
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`absolute right-0 px-3 py-1 rounded border border-gray-700 outline-none
                        bg-stone-950/80 text-stone-200
        transition-all duration-300 ease-in-out
        ${searchOpen ? "w-40 sm:w-48 md:w-56 opacity-100 pointer-events-auto" : "w-0 opacity-0 pointer-events-none"}`}
                    style={{ transformOrigin: "right center" }}
                    aria-label="Search"
                />
            </form>
        </div>
    );
};

export default SearchInput;
