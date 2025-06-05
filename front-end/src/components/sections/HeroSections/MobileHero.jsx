// src/components/layout/sections/HeroSections/MobileHero.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// MobileHero now receives 'currentImageItem' instead of 'currentImage'
const MobileHero = ({ carouselItems, currentImageIndex, totalImages, goToNext, goToPrev, headerHeight }) => {
  if (!carouselItems || carouselItems.length === 0) { // Using carouselItems instead of currentImageItem for initial check
    return (
      <div className="relative h-full overflow-hidden flex flex-col flex-grow min-h-0 bg-gray-200 justify-center items-center">
        <p className="text-gray-600">No images to display.</p>
      </div>
    );
  }

  // Ensure currentImageItem exists before accessing its properties in the JSX
  const currentImageItem = carouselItems[currentImageIndex];
  if (!currentImageItem) {
    return (
        <div className="relative h-full overflow-hidden flex flex-col flex-grow min-h-0 bg-gray-200 justify-center items-center">
            <p className="text-gray-600">Loading image data...</p>
        </div>
    );
  }


  return (
    <div className="relative h-full overflow-hidden flex flex-col flex-grow min-h-0 w-full" style={{ height: '50vh', minHeight: '300px' }}>
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-between p-2 z-20">
        <button
          onClick={goToPrev}
          className="p-2 rounded-full text-white hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="p-2 rounded-full text-white hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-20 p-4">
        <h1 className="text-2xl font-bold mb-2">{currentImageItem.title}</h1>
      </div>
    </div>
  );
};

export default MobileHero;
