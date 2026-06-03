import React from "react";
import Logo from "./Logo";

const VisualHeader = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-[99] bg-stony-paper shadow-md border-b border-white/5 h-12 overflow-visible">
            <div className="w-full h-12 pl-2 pr-[6.5rem] sm:pr-[7.5rem] flex items-center justify-start">
                <Logo className="h-6 sm:h-7 w-auto max-h-9 transition-all duration-300 hover:scale-105" />
            </div>
        </header>
    );
};

export default VisualHeader;
