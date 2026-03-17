import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";

const SearchInput = ({ searchOpen, toggleSearch, searchQuery, setSearchQuery, handleSearchSubmit }) => {
    return (
        <div className="search-container fixed top-2 md:top-2 right-16 z-[9999] flex items-center">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`absolute right-0 px-3 py-1 rounded border border-gray-700 outline-none
                        bg-stone-950/80 text-stone-200
        transition-all duration-300 ease-in-out
        ${searchOpen ? "w-40 sm:w-48 md:w-56 opacity-100 pointer-events-auto pl-10" : "w-0 opacity-0 pointer-events-none"}`}
                    style={{ transformOrigin: "right center" }}
                    aria-label="Search"
                />
                <SearchIcon
                    className={`cursor-pointer transition-all duration-300 ease-in-out p-1 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative z-10
        ${searchOpen ? "scale-110 -translate-x-40 sm:-translate-x-44 md:-translate-x-48" : "scale-100 translate-x-0"}`}
                    onClick={toggleSearch}
                    aria-label="Open search"
                />
            </form>
        </div>
    );
};

export default SearchInput;
