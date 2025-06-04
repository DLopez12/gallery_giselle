// src/components/layout/sections/HeroSections/DesktopHero.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const DesktopHero = ({ currentImage, currentImageIndex, totalImages, goToNext, goToPrev, headerHeight }) => {
  return (
    // ADDED: flex flex-col
    
    <div className="relative h-full overflow-hidden flex flex-col flex-grow min-h-0">
      <div className="w-full h-48 bg-gallery-blue text-white flex items-center justify-center text-xl">
        This is a test div with gallery-blue background.
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-8 z-10">
        <button
          onClick={goToPrev}
          className="p-4 rounded-full text-white hover:bg-gallery-tan-light/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gallery-tan-light"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-10 w-10" />
        </button>
        <button
          onClick={goToNext}
          className="p-4 rounded-full text-white hover:bg-gallery-tan-light/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gallery-tan-light"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-10 w-10" />
        </button>
      </div>

      <div className="absolute bottom-6 right-6 bg-black/40 text-white px-2 py-2 rounded-lg text-xl z-10">
        {currentImageIndex + 1} / {totalImages}
      </div>
    </div>
  );
};

export default DesktopHero;