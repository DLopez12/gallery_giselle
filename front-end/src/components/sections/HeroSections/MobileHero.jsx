// src/components/layout/sections/HeroSections/MobileHero.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Assumed installed

const MobileHero = ({ currentImage, currentImageIndex, totalImages, goToNext, goToPrev, headerHeight }) => {
  return (
    // Outer container for the Hero section on mobile.
    // relative: Establishes a positioning context for its absolutely positioned children.
    // w-screen: Ensures it spans the full width of the viewport.
    // h-full: Crucial for filling the available height of its parent (the <main> element).
    // overflow-hidden: Prevents content from overflowing.
    <div className="relative w-screen h-full overflow-hidden">
      {/* Background Image Container */}
      {/* absolute inset-0: Positions this div to cover the entire area of its relative parent. */}
      {/* bg-cover bg-center: Ensures the background image covers the area and is centered. */}
      {/* transition-opacity duration-700 ease-in-out: For smooth image transitions. */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        {/* Optional: Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-2 z-10">
        <button
          onClick={goToPrev}
          className="p-2 bg-white/30 rounded-full text-white hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="p-2 bg-white/30 rounded-full text-white hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-3 right-3 bg-black/40 text-white px-3 py-1 rounded-lg text-sm z-10">
        {currentImageIndex + 1} / {totalImages}
      </div>

      {/* Mobile-specific hero text/CTA (currently commented out) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10 p-4">
        {/* Uncomment and customize if you want text on mobile hero */}
        {/* <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-xl hover:bg-blue-700 transition duration-300">
          Explore
        </button> */}
      </div>
    </div>
  );
};

export default MobileHero;