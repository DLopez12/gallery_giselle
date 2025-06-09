// src/components/sections/HeroSections/ResponsiveHero.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DynamicLegibleCounter from '../../common/DynamicLegibleCounter';
import { motion, AnimatePresence } from 'framer-motion';

const ResponsiveHero = ({
  carouselItems,
  currentImageIndex,
  totalImages,
  goToNext,
  goToPrev,
}) => {
  if (!carouselItems || carouselItems.length === 0 || currentImageIndex < 0 || currentImageIndex >= totalImages) {
    return (
      <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-gray-200">
        <p className="text-gray-600">No hero images to display.</p>
      </div>
    );
  }

  const currentItem = carouselItems[currentImageIndex];

  // --- START OF CRITICAL CHANGES FOR SMOOTH CROSS-FADE ---
  const imageVariants = {
    // State for the *entering* image (when it first appears)
    // It starts fully transparent and at a lower z-index
    initial: {
      opacity: 0,
      zIndex: 0 // Entering image starts behind the one that's exiting
    },
    // State for the *active* image (when it's fully visible and not transitioning)
    // It becomes fully opaque and remains at a lower z-index
    animate: { // Renamed from 'center' to 'animate' to match the prop name
      opacity: 1,
      zIndex: 0, // The active image stays at z-index 0
      transition: {
        duration: 0.8, // Duration for the fade-in animation
        ease: "easeInOut"
      }
    },
    // State for the *exiting* image (when it's leaving the screen)
    // It fades out from full opacity and stays at a higher z-index during its fade
    exit: {
      opacity: 0,
      zIndex: 1, // The exiting image remains on top while fading out
      transition: {
        duration: 0.8, // Duration for the fade-out animation (should match fade-in)
        ease: "easeInOut"
      }
    }
  };
  // --- END OF CRITICAL CHANGES FOR SMOOTH CROSS-FADE ---


  return (
    <section
      className="relative w-full h-full overflow-hidden"
      // Removed any explicit background color here.
      // The images should now perfectly cross-fade without exposing the background.
    >
      {/* Background Image (Current Carousel Image) */}
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={currentItem.id || currentImageIndex} // IMPORTANT: key must change for AnimatePresence to detect a new item
          src={currentItem.imageUrl}
          alt={currentItem.title || `Carousel image ${currentImageIndex + 1}`}
          // --- START OF CRITICAL CLASSNAME AND PROP CHANGES ---
          // This className ensures the image covers the parent and allows stacking
          className="absolute inset-0 w-full h-full object-cover block"
          variants={imageVariants}
          // Corrected the state names here to match our variants object:
          initial="initial" // Corrected typo from "inital"
          animate="animate" // Corrected from "center" to "animate" to match the prop
          exit="exit"
          // REMOVED: transition={{ duration: 0.8, ease: "easeInOut" }}
          // This prop is redundant when using 'variants' and can cause conflicts.
          // Transitions are now defined *within* the imageVariants object.
          // --- END OF CRITICAL CLASSNAME AND PROP CHANGES ---
        />
      </AnimatePresence>

      {/* Navigation Buttons (Often similar for mobile/desktop, use Tailwind for sizing/placement if needed) */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-2xl z-10 transition-colors duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/80"
        aria-label="Previous image"
      >
        &#8249;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-2xl z-10 transition-colors duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/80"
        aria-label="Next image"
      >
        &#8250;
      </button>

      {/* Dynamic Counter - positioned at the bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <DynamicLegibleCounter
          currentCount={currentImageIndex + 1}
          totalCount={totalImages}
          imageUrl={currentItem.imageUrl}
        />
      </div>
    </section>
  );
};

ResponsiveHero.propTypes = {
  carouselItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    order: PropTypes.number,
  })).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  totalImages: PropTypes.number.isRequired,
  goToNext: PropTypes.func.isRequired,
  goToPrev: PropTypes.func.isRequired,
  headerHeight: PropTypes.string, // This prop is not being used in this component currently.
};

export default ResponsiveHero;