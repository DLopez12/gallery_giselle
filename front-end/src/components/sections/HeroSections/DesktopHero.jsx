// src/components/layout/sections/HeroSections/DesktopHero.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Install if you haven't

const DesktopHero = ({ currentImage, currentImageIndex, totalImages, goToNext, goToPrev }) => {
  return (
    <div className="relative w-screen h-[calc(100vh - 88px)] overflow-hidden"> {/* Adjust height for fixed navbar */}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        {/* Optional: Image Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-8 z-10">
        <button
          onClick={goToPrev}
          className="p-4 bg-white/30 rounded-full text-white hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-10 w-10" />
        </button>
        <button
          onClick={goToNext}
          className="p-4 bg-white/30 rounded-full text-white hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-10 w-10" />
        </button>
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-6 right-6 bg-black/40 text-white px-5 py-3 rounded-lg text-xl z-10">
        {currentImageIndex + 1} / {totalImages}
      </div>
      {/* You can add a hero text/CTA here for desktop if desired */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10">
        <h1 className="text-6xl font-bold drop-shadow-lg">Giselle Photography</h1>
        <p className="mt-4 text-2xl drop-shadow-lg max-w-xl">
          Capturing life's most beautiful moments with artistry and passion.
        </p>
        {/* <button className="mt-8 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-xl hover:bg-blue-700 transition duration-300 text-lg">
          Explore Portfolio
        </button> */}
      </div>
    </div>
  );
};

export default DesktopHero;