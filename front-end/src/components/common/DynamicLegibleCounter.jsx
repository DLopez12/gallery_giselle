// front-end/src/components/common/DynamicLegibleCounter.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const isLight = (rgb) => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5;
};

const DynamicLegibleCounter = ({ currentCount, totalCount, imageUrl }) => {
  const [isBackgroundLight, setIsBackgroundLight] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setIsBackgroundLight(true); // Default to light background, so text is dark
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const sampleSize = 10;
        const startX = Math.max(0, Math.floor(img.width / 2) - sampleSize / 2);
        const startY = Math.max(0, Math.floor(img.height / 2) - sampleSize / 2);
        const imageData = ctx.getImageData(startX, startY, sampleSize, sampleSize).data;

        let r = 0, g = 0, b = 0;
        let count = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }

        const avgRgb = [r / count, g / count, b / count];
        setIsBackgroundLight(isLight(avgRgb));

      } catch (error) {
        console.error("Error processing image for luminance:", error);
        setIsBackgroundLight(false); // Default to white text if canvas fails
      }
    };

    img.onerror = () => {
      console.error("Failed to load image for luminance check:", imageUrl);
      setIsBackgroundLight(false); // Default to white text if image fails to load
    };

  }, [imageUrl]);

  const textColorClass = isBackgroundLight ? 'text-gray-900' : 'text-white';
  const textLegibilityShadow = isBackgroundLight ? 'drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]' : 'drop-shadow-[0_0_2px_rgba(0,0,0,0.7)]';

  return (
    <div
      className={`
        relative
        px-4 py-2
        bg-white/20
        backdrop-blur-md
        rounded-full
        shadow-lg
        border border-white/30
        inline-flex items-center justify-center
        transition-colors duration-300
      `}
    >
      <span className={`
        text-xl font-bold
        ${textColorClass}
        ${textLegibilityShadow}
        transition-all duration-300
      `}>
        {currentCount} / {totalCount}
      </span>
    </div>
  );
};

DynamicLegibleCounter.propTypes = {
  currentCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
};

export default DynamicLegibleCounter;