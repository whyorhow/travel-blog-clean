import React from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";

const SearchInput = ({ searchOpen, toggleSearch, searchQuery, setSearchQuery, handleSearchSubmit }) => {
    const { pathname } = useLocation();
    const isHome = pathname === "/" || pathname === "/home";

    return (
        <div
            className={`search-container fixed z-[100] flex flex-row items-center justify-end pointer-events-none ${
                isHome ? "top-3 right-12 sm:right-14" : "top-0 right-10 sm:right-11 h-12"
            }`}
        >
            <form
                onSubmit={handleSearchSubmit}
                className="flex flex-row items-center pointer-events-auto h-full max-h-12"
            >
                <button
                    type="button"
                    onClick={toggleSearch}
                    className="shrink-0 flex items-center justify-center p-0.5 sm:p-1 transition-transform duration-300 ease-in-out"
                    aria-label={searchOpen ? "Close search" : "Open search"}
                    aria-expanded={searchOpen}
                >
                    <SearchIcon
                        className={`block transition-transform duration-300 ease-in-out ${
                            isHome ? "w-7 h-7 sm:w-8 sm:h-8" : "w-6 h-6 sm:w-7 sm:h-7"
                        } ${searchOpen ? "scale-105" : "scale-100"}`}
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
