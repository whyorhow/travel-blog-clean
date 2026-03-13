import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function ComingSoon({ title = "Content Coming Soon" }) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#e2e1dc] px-6 text-center">
            <SEO title={`${title} | Nomad Scribbles`} description="New content is on its way. Stay tuned!" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#edd98d]">{title}</h1>
            <p className="text-xl max-w-2xl mb-12 opacity-80">
                I'm currently working on bringing this part of the journey to life.
                Check back soon for stories, photos, and insights from this location.
            </p>
            <Link
                to="/united-states/tennessee"
                className="text-[#ceb752] hover:text-[#e8eac7] transition-colors border-b-2 border-[#ceb752]/20 hover:border-[#ceb752] pb-1 uppercase tracking-widest font-bold"
            >
                Return to Tennessee
            </Link>
        </div>
    );
}

export default ComingSoon;
