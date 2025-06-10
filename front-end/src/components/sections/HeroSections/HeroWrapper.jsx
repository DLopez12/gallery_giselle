// src/components/sections/HeroSections/HeroWrapper.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'; // Import useRef
import PropTypes from 'prop-types';
import ResponsiveHero from './ResponsiveHero';

const HeroWrapper = ({ carouselItems, headerHeight }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = carouselItems ? carouselItems.length : 0;

  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // --- NEW: Refs for managing timers and constants for intervals ---
  const autoAdvanceTimerRef = useRef(null); // Holds the ID of the auto-advance setInterval
  const userActivityTimerRef = useRef(null); // Holds the ID of the setTimeout for user inactivity
  const AUTO_ADVANCE_INTERVAL = 8000; // Time (ms) each image is displayed during auto-play (your current 8 seconds)
  const INACTIVITY_PAUSE_DURATION = 15000; // Time (ms) of user inactivity before auto-play resumes (e.g., 15 seconds)
  // --- END NEW ---

  // --- NEW: Function to start the auto-advance carousel ---
  const startAutoAdvance = useCallback(() => {
    // Clear any existing auto-advance timer to prevent multiple intervals running
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
    }

    // Only start auto-advance if there are multiple images to cycle through
    if (totalImages > 1) {
      autoAdvanceTimerRef.current = setInterval(() => {
        const nextIndex = (currentImageIndex + 1) % totalImages;
        const nextImageUrl = carouselItems[nextIndex]?.imageUrl;

        // Only advance if the next image is confirmed to be preloaded
        if (nextImageUrl && preloadedImages.has(nextImageUrl)) {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
        } else {
          // Optional: Log if an advance is skipped because the next image isn't ready
          // console.log(`Skipping auto-advance: Next image (${nextImageUrl}) not yet preloaded.`);
        }
      }, AUTO_ADVANCE_INTERVAL);
    }
  }, [totalImages, currentImageIndex, carouselItems, preloadedImages]); // Dependencies for useCallback

  // --- NEW: Function to reset the user activity timer (for resuming auto-play) ---
  const resetUserActivityTimer = useCallback(() => {
    // Clear any existing user activity timeout
    if (userActivityTimerRef.current) {
      clearTimeout(userActivityTimerRef.current);
    }
    // Set a new timeout to restart auto-advance after the specified inactivity duration
    userActivityTimerRef.current = setTimeout(() => {
      startAutoAdvance(); // Resume auto-advance
    }, INACTIVITY_PAUSE_DURATION);
  }, [startAutoAdvance]); // Dependency for useCallback

  // --- NEW: Function to handle any manual user interaction ---
  const handleUserInteraction = useCallback(() => {
    // Immediately stop the current auto-advance timer
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
    }
    // Reset the user activity timer to potentially resume auto-play later
    resetUserActivityTimer();
  }, [resetUserActivityTimer]); // Dependency for useCallback
  // --- END NEW ---

  // Effect to manage initial auto-advance start and cleanup
  useEffect(() => {
    startAutoAdvance(); // Start auto-advance when the component mounts or dependencies change

    // Cleanup function: clear all timers when the component unmounts
    return () => {
      if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current);
      if (userActivityTimerRef.current) clearTimeout(userActivityTimerRef.current);
    };
  }, [startAutoAdvance]); // Dependency: ensures effect re-runs if startAutoAdvance callback changes

  // Effect for proactive image pre-loading (logic remains the same as previous step)
  useEffect(() => {
    if (totalImages > 0 && carouselItems) {
      const imagesToLoad = new Set();

      // Always try to pre-load the currently active image if not already loaded
      const currentItemUrl = carouselItems[currentImageIndex]?.imageUrl;
      if (currentItemUrl && !preloadedImages.has(currentItemUrl)) {
        imagesToLoad.add(currentItemUrl);
      }

      // Proactively pre-load the next image in the sequence
      const nextIndex = (currentImageIndex + 1) % totalImages;
      const nextImageUrl = carouselItems[nextIndex]?.imageUrl;
      if (nextImageUrl && !preloadedImages.has(nextImageUrl)) {
        imagesToLoad.add(nextImageUrl);
      }

      imagesToLoad.forEach(url => {
        if (url) {
          const img = new Image(); // Create a new Image object
          img.src = url;           // Set its source to start loading

          img.onload = () => {
            setPreloadedImages(prev => new Set(prev).add(url));
            // console.log(`Preloaded: ${url}`);
          };
          img.onerror = () => {
            console.error(`Failed to preload: ${url}`);
            setPreloadedImages(prev => new Set(prev).add(url)); // Still mark as attempted to avoid retries
          };
        }
      });
    }
  }, [carouselItems, currentImageIndex, totalImages, preloadedImages]);

  // Navigation functions (now calling handleUserInteraction)
  const goToNext = useCallback(() => {
    handleUserInteraction(); // Call handler on user click to pause auto-play and reset resume timer
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages, handleUserInteraction]); // Dependency on handleUserInteraction

  const goToPrev = useCallback(() => {
    handleUserInteraction(); // Call handler on user click
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  }, [totalImages, handleUserInteraction]); // Dependency on handleUserInteraction

  if (!carouselItems || carouselItems.length === 0) {
    return null; // Don't render if no carousel items
  }

  return (
    <ResponsiveHero
      carouselItems={carouselItems}
      currentImageIndex={currentImageIndex}
      totalImages={totalImages}
      goToNext={goToNext}
      goToPrev={goToPrev}
      headerHeight="96px" // Pass your actual header height here if ResponsiveHero uses it
    />
  );
};

HeroWrapper.propTypes = {
  carouselItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    order: PropTypes.number,
  })), // carouselItems can be null/empty initially
};

export default HeroWrapper;