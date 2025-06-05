// src/components/layout/sections/HeroSections/HeroWrapper.jsx
import React, { useState, useEffect, useCallback } from 'react';
import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

const HeroWrapper = ({ carouselItems }) => {
  const [isWithinMobileRange, setIsWithinMobileRange] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = carouselItems ? carouselItems.length : 0;

  // Auto-advance the carousel
  useEffect(() => {
    if (totalImages > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
      }, 8000); // Auto-advance every 8 seconds (adjusted from 5s)

      return () => clearInterval(timer);
    }
  }, [totalImages]); // Re-run if totalImages changes (after data loads)

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages]);

  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsWithinMobileRange(window.innerWidth >= 344 && window.innerWidth <= 882);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (!carouselItems || carouselItems.length === 0) {
    return null; // Or handle loading/empty state from parent Carousel.jsx
  }

  return (
    <>
      {isWithinMobileRange ? (
        <MobileHero
          carouselItems={carouselItems} // Pass the entire array
          currentImageIndex={currentImageIndex}
          totalImages={totalImages}
          goToNext={goToNext}
          goToPrev={goToPrev}
          headerHeight="64px"
        />
      ) : (
        <DesktopHero
          carouselItems={carouselItems} // Pass the entire array
          currentImageIndex={currentImageIndex}
          totalImages={totalImages}
          goToNext={goToNext}
          goToPrev={goToPrev}
          headerHeight="88px"
        />
      )}
    </>
  );
};

export default HeroWrapper;
