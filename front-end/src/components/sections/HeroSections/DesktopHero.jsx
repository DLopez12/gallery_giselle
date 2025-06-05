// src/components/layout/sections/HeroSections/DesktopHero.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// DesktopHero now receives 'currentImageItem' instead of 'currentImage'
const DesktopHero = ({ carouselItems, currentImageIndex, totalImages, goToNext, goToPrev, headerHeight }) => {
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
    <div className="relative h-full overflow-hidden flex flex-col flex-grow min-h-0 w-full" style={{ height: '70vh', minHeight: '400px' }}>
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

      <div className="absolute inset-0 flex items-center justify-between p-8 z-20">
        <button
          onClick={goToPrev}
          // --- FIX: Use explicit var() syntax for custom colors with opacity ---
          className="p-2 rounded-full text-white hover:bg-[var(--gallery-tan)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gallery-tan-light)]"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-10 w-10" />
        </button>
        <button
          onClick={goToNext}
          // --- FIX: Use explicit var() syntax for custom colors with opacity ---
          className="p-2 rounded-full text-white hover:bg-[var(--gallery-tan)]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gallery-tan-light)]"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-10 w-10" />
        </button>
      </div>
      <div className="absolute bottom-6 right-6 bg-black/40 text-white px-2 py-2 rounded-lg text-xl z-20">
        {currentImageIndex + 1} / {totalImages}
      </div>
    </div>
  );
};

export default DesktopHero;
