// front-end/src/lib/strapi/image.js

import { STRAPI_URL } from '../../config/strapi';

/**
 * @function getStrapiImage
 * @description Constructs the full URL for an image hosted on Strapi.
 * This function takes a Strapi image object (typically from a media field that has been populated)
 * and prepends the Strapi base URL to its relative path.
 * @param {Object} strapiImage - The populated Strapi image object (e.g., aboutContent.profilePicture).
 * It is expected to have a 'url' property directly on it.
 * @returns {string|null} The full absolute URL of the image, or null if input is invalid.
 */
export const getStrapiImage = (strapiImage) => {
  // Checks if the strapiImage object exists and directly contains a 'url' property.
  // This structure is common when single media fields are populated.
  if (strapiImage && strapiImage.url) {
    // Concatenates the base Strapi URL with the image's relative URL.
    return `<span class="math-inline">\{STRAPI\_URL\}</span>{strapiImage.url}`;
  }
  // If the necessary data is missing, logs a warning and returns null.
  console.warn("Invalid Strapi image object provided for URL construction:", strapiImage);
  return null;
};

// Keep formatStrapiImage if you use it elsewhere, otherwise it can be removed.
// export const formatStrapiImage = (strapiData) => ({
//   src: `${STRAPI_URL}${strapiData.attributes.url}`,
//   alt: strapiData.attributes.alternativeText || 'Photography Portfolio',
//   width: strapiData.attributes.width,
//   height: strapiData.attributes.height,
//   aspectRatio: strapiData.attributes.aspectRatio // e.g., '3:2'
// });