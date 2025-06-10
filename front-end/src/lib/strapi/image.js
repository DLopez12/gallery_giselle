// front-end/src/lib/strapi/image.js

import { STRAPI_URL } from '../../config/strapi'; // This now remains with /api

/**
 * @function getStrapiImage
 * @description Constructs the full URL for an image hosted on Strapi.
 * This function takes a Strapi image object (typically from a media field that has been populated)
 * and prepends the Strapi base URL to its relative path. It specifically handles cases
 * where the base STRAPI_URL includes an '/api' suffix, which needs to be removed for static assets.
 * @param {Object} strapiImage - The populated Strapi image object (e.g., aboutContent.profilePicture).
 * It is expected to have a 'url' property directly on it.
 * @returns {string|null} The full absolute URL of the image, or null if input is invalid.
 */
export const getStrapiImage = (strapiImage) => {
  // Debugging logs (you can remove these once the image displays correctly)
  console.log("--- DEBUGGING getStrapiImage ---");
  console.log("STRAPI_URL in image.js (before modification):", STRAPI_URL);
  console.log("strapiImage object received:", strapiImage);
  console.log("Is strapiImage truthy?", !!strapiImage);
  console.log("Does strapiImage have 'url' property?", Object.prototype.hasOwnProperty.call(strapiImage, 'url'));
  console.log("Value of strapiImage.url:", strapiImage?.url);
  console.log("Type of strapiImage.url:", typeof strapiImage?.url);
  console.log("Is strapiImage.url truthy?", !!strapiImage?.url);
  console.log("--- END DEBUGGING getStrapiImage ---");

  if (strapiImage && strapiImage.url) {
    // Check if STRAPI_URL ends with '/api' and remove it for static asset URLs
    const baseUrlForAssets = STRAPI_URL.endsWith('/api')
      ? STRAPI_URL.slice(0, -4) // Removes the last 4 characters ("/api")
      : STRAPI_URL; // If no '/api', use as is

    return `${baseUrlForAssets}${strapiImage.url}`;
  }

  console.warn("Invalid Strapi image object provided for URL construction:", strapiImage);
  return null;
};

// You can keep formatStrapiImage if you use it elsewhere, otherwise it can be removed.
// export const formatStrapiImage = (strapiData) => ({
//   src: `${STRAPI_URL}${strapiData.attributes.url}`,
//   alt: strapiData.attributes.alternativeText || 'Photography Portfolio',
//   width: strapiData.attributes.width,
//   height: strapiData.attributes.height,
//   aspectRatio: strapiData.attributes.aspectRatio // e.g., '3:2'
// });