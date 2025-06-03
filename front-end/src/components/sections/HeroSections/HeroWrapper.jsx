// src/components/layout/sections/HeroSections/HeroWrapper.jsx
import React, { useState, useEffect, useCallback } from 'react';
import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

// Placeholder images. You would typically fetch these from Strapi
// or use a context/prop if they come from a higher level.
const HERO_IMAGES = [
  '/images/hero_engagment.avif',
  '/images/hero_family.avif',
  '/images/hero_portrait.avif',
  '/images/hero_graduate.avif',
  // Ensure these paths are correct, e.g., if images are in /images/
];

const HeroWrapper = () => {
  // This state determines which Hero component to render AND which header height to use
  const [isWithinMobileRange, setIsWithinMobileRange] = useState(false);

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = HERO_IMAGES.length;

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages]);

  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    const checkScreenSize = () => {
      // IMPORTANT: Match HeaderWrapper's breakpoints exactly
      setIsWithinMobileRange(window.innerWidth >= 344 && window.innerWidth <= 882);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <>
      {isWithinMobileRange ? (
        <MobileHero
          currentImage={HERO_IMAGES[currentImageIndex]}
          currentImageIndex={currentImageIndex}
          totalImages={totalImages}
          goToNext={goToNext}
          goToPrev={goToPrev}
          headerHeight="64px" // MobileHeader's height (h-16 = 64px)
        />
      ) : (
        <DesktopHero
          currentImage={HERO_IMAGES[currentImageIndex]}
          currentImageIndex={currentImageIndex}
          totalImages={totalImages}
          goToNext={goToNext}
          goToPrev={goToPrev}
          headerHeight="88px" // Desktop NavBar's height (which you measured)
        />
      )}
    </>
  );
};

export default HeroWrapper;