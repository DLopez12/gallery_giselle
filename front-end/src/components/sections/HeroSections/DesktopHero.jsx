// src/components/layout/sections/HeroSections/DesktopHero.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Assumed installed

const DesktopHero = ({ currentImage, currentImageIndex, totalImages, goToNext, goToPrev, headerHeight }) => {
  return (
    // Outer container for the Hero section on desktop.
    // relative: Establishes a positioning context for its absolutely positioned children.
    // w-screen: Ensures it spans the full width of the viewport.
    // h-full: Crucial for filling the available height of its parent (the <main> element),
    //         which is now correctly sized thanks to Layout.jsx and HeaderWrapper.jsx.
    // overflow-hidden: Prevents content from overflowing if not explicitly sized or positioned.
    <div className="relative w-screen h-full overflow-hidden">
      {/* Background Image Container */}
      {/* absolute inset-0: Positions this div to cover the entire area of its relative parent. */}
      {/* bg-cover bg-center: Ensures the background image covers the area and is centered. */}
      {/* transition-opacity duration-700 ease-in-out: For smooth image transitions. */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        {/* Optional: Semi-transparent overlay for better text readability on top of images */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Navigation Arrows (Previous/Next) */}
      <div className="absolute inset-0 flex items-center justify-between p-8 z-10">
        <button
          onClick={goToPrev}
          className="p-4 rounded-full text-white bg-white/20 hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-10 w-10" />
        </button>
        <button
          onClick={goToNext}
          className="p-4 rounded-full text-white bg-white/20 hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-10 w-10" />
        </button>
      </div>

      {/* Image Counter (e.g., "1 / 4") */}
      <div className="absolute bottom-6 right-6 bg-black/40 text-white px-5 py-3 rounded-lg text-xl z-10">
        {currentImageIndex + 1} / {totalImages}
      </div>

      {/* Hero Text/Call to Action */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10">
        <h1 className="text-6xl font-bold drop-shadow-lg">Giselle Photography</h1>
        <p className="mt-4 text-2xl drop-shadow-lg max-w-xl">
          Capturing life's most beautiful moments with artistry and passion.
        </p>
      </div>
    </div>
  );
};

export default DesktopHero;