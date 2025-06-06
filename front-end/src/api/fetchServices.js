// src/api/fetchServices.js
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetches all services from Strapi, including their category and image.
 * @returns {Promise<Array>} A promise that resolves to an array of service objects.
 */
export const fetchServices = async () => {
  try {
    // Debug log: Check if API_URL is set
    console.log("DEBUG fetchServices: API_URL:", API_URL);

    if (!API_URL) {
      console.error("Error: VITE_API_URL environment variable is not set. Please check your .env file in the frontend.");
      throw new Error("API URL is not configured.");
    }

    // Debug log: Log the URL being fetched
    console.log("DEBUG fetchServices: Fetching from URL:", `${API_URL}/services?populate=*`);
    const response = await axios.get(`${API_URL}/services?populate=*`);

    // Debug log: Log the raw response data from Strapi
    console.log("DEBUG fetchServices: Raw Strapi response:", response.data);

    // Ensure response.data.data exists and is an array before mapping
    if (!response.data || !Array.isArray(response.data.data)) {
        console.warn("DEBUG fetchServices: Strapi response data.data is missing or not an array.", response.data);
        return []; // Return empty array if data is not in expected format
    }

    return response.data.data.map(item => {
      // DEBUG: Log the ENTIRE item object as a string for full inspection
      console.log("DEBUG fetchServices: Raw item object:", JSON.stringify(item, null, 2));

      // --- FIX START ---
      // Access category directly from `item` (no `attributes` wrapper needed)
      const category = item.category || null; // Will be null if item.category is undefined

      // Access imageUrl directly from `item.image.url` (no `attributes.image.data.attributes.url` needed)
      const imageUrl = item.image?.url
        ? `${API_URL.replace(/\/api$/, '')}${item.image.url}` // Prepend base URL
        : null; // Will be null if any part of the chain is undefined
      // --- FIX END ---

      // Debug log: Log the processed item before returning
      console.log("DEBUG fetchServices: Processed item:", {
        id: item.id,
        ...item, // Spread all properties directly from `item` as it contains all attributes
        category: category, // Our extracted category (will be null if not found)
        imageUrl: imageUrl, // Our extracted image URL (will be null if not found)
      });

      return {
        id: item.id,
        ...item, // Spread all original properties from `item`
        category: category, // Overwrite with our extracted category
        imageUrl: imageUrl, // Overwrite with our extracted image URL
      };
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};
