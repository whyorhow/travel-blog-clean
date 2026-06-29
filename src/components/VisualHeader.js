import React from "react";
import Logo from "./Logo";
import {
  SITE_HEADER_HEIGHT_CLASS,
} from "./nav/siteHeaderLayout";

const VisualHeader = () => {
    return (
        <header className={`site-visual-header fixed top-0 left-0 w-full z-[99] bg-stony-paper shadow-md border-b border-white/5 ${SITE_HEADER_HEIGHT_CLASS} overflow-visible`}>
            <div className={`w-full ${SITE_HEADER_HEIGHT_CLASS} pl-2 pr-[6.5rem] sm:pr-[7.5rem] flex items-center justify-start`}>
                <Logo className="h-6 sm:h-7 w-auto max-h-9 transition-all duration-300 hover:scale-105" />
            </div>
        </header>
    );
};

export default VisualHeader;
