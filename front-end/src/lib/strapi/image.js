// front-end/src/lib/strapi/image.js

// Imports the base API URL from the Strapi configuration.
// This is necessary to construct the full URL for images stored in Strapi.
import { STRAPI_URL } from '../../config/strapi';

// --- ADD THIS LOG HERE ---
console.log("STRAPI_URL in image.js:", STRAPI_URL);
// --- END LOG ---

/**
 * function getStrapiImage
 * description Constructs the full URL for an image hosted on Strapi.
 * This function takes a Strapi image object (typically from a media field)
 * and prepends the Strapi base URL to its relative path.
 * param {Object} strapiImage - The Strapi image object (e.g., response.data.attributes.profilePicture.data).
 * returns {string|null} The full absolute URL of the image, or null if input is invalid.
 */
export const getStrapiImage = (strapiImage) => {
  // --- ADD THESE LOGS HERE ---
  console.log("--- DEBUGGING getStrapiImage ---");
  console.log("strapiImage object received:", strapiImage);
  console.log("Is strapiImage truthy?", !!strapiImage);
  console.log("Does strapiImage have 'url' property?", Object.prototype.hasOwnProperty.call(strapiImage, 'url'));
  console.log("Value of strapiImage.url:", strapiImage?.url); // Use optional chaining for safety
  console.log("Type of strapiImage.url:", typeof strapiImage?.url);
  console.log("Is strapiImage.url truthy?", !!strapiImage?.url);
  console.log("--- END DEBUGGING getStrapiImage ---");
  // --- END LOGS ---

  // Checks if the necessary image data exists to construct a valid URL.
  // Strapi image objects typically have a 'data' property with 'attributes.url'.
  if (strapiImage && strapiImage.url) {
    // Concatenates the base Strapi URL with the image's relative URL.
    // This forms the complete path to access the image.
    return `${STRAPI_URL}${strapiImage.url}`;
  }
  // If the necessary data is missing, returns null to indicate an invalid image source.
  console.warn("Invalid Strapi image object provided for URL construction:", strapiImage);
  return null;
};

// You can keep formatStrapiImage if you use it elsewhere,
// but it's not the one causing the current error.
// export const formatStrapiImage = (strapiData) => ({
//   src: `${STRAPI_URL}${strapiData.attributes.url}`,
//   alt: strapiData.attributes.alternativeText || 'Photography Portfolio',
//   width: strapiData.attributes.width,
//   height: strapiData.attributes.height,
//   aspectRatio: strapiData.attributes.aspectRatio // e.g., '3:2'
// });