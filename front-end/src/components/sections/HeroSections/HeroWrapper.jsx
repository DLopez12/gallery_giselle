// src/components/layout/sections/HeroSections/HeroWrapper.jsx
import React, { useState, useEffect, useCallback } from 'react';
import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

// Array of hero image paths. These should be accessible from your public folder.
const HERO_IMAGES = [
  '/images/hero_engagment.avif',
  '/images/hero_family.avif',
  '/images/hero_portrait.avif',
  '/images/hero_graduate.avif',
];

const HeroWrapper = () => {
  // State to determine if the viewport is within the mobile range, affecting which Hero component to render.
  const [isWithinMobileRange, setIsWithinMobileRange] = useState(false);

  // Carousel state: current image index and total number of images.
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = HERO_IMAGES.length;

  // Callback function to go to the next image in the carousel.
  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages]); // Recalculate if totalImages changes (unlikely for fixed array)

  // Callback function to go to the previous image in the carousel.
  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  }, [totalImages]); // Recalculate if totalImages changes

  // Effect to check screen size and update isWithinMobileRange state.
  useEffect(() => {
    const checkScreenSize = () => {
      // IMPORTANT: These breakpoints MUST match the logic used in HeaderWrapper.jsx
      // and Layout.jsx to ensure consistent mobile/desktop views.
      setIsWithinMobileRange(window.innerWidth >= 344 && window.innerWidth <= 882);
    };

    // Initial check on component mount.
    checkScreenSize();
    // Add event listener for window resize.
    window.addEventListener('resize', checkScreenSize);

    // Cleanup: remove event listener when component unmounts.
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    // React Fragment: This component doesn't add an extra div to the DOM.
    // Its children (DesktopHero or MobileHero) will directly be children of <main>.
    <>
      {isWithinMobileRange ? (
        <MobileHero
          currentImage={HERO_IMAGES[currentImageIndex]}
          currentImageIndex={currentImageIndex}
          totalImages={totalImages}
          goToNext={goToNext}
          goToPrev={goToPrev}
          // The headerHeight prop is passed for informational purposes,
          // but the actual layout is now handled by Layout.jsx's padding-top
          // and the placeholder in HeaderWrapper.
          headerHeight="64px" // Matches MobileHeader's h-16 (64px)
        />
      ) : (
        <DesktopHero
          currentImage={HERO_IMAGES[currentImageIndex]}
          currentImageIndex={currentImageIndex}
          totalImages={totalImages}
          goToNext={goToNext}
          goToPrev={goToPrev}
          // The headerHeight prop is passed for informational purposes.
          // Actual layout handled by Layout.jsx's padding-top and HeaderWrapper's placeholder.
          headerHeight="88px" // Matches NavBar's effective height (88px)
        />
      )}
    </>
  );
};

export default HeroWrapper;