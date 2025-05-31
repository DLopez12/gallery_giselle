// api/fetchPortfolio.js

// Import configuration (centralized API settings)
import { STRAPI_URL, API_ROUTES } from "../config/strapi";

/**
 * Safely fetches portfolio data from Strapi with error handling
 * @returns {Promise<Array>} Formatted portfolio items or empty array on failure
 */
export async function fetchPortfolio() {
  try {
    // 1. Make API request - populate=* gets all relational data
    const res = await fetch(`${STRAPI_URL}${API_ROUTES.portfolio}?populate=*`);
    
    // Throw error if response not OK (404, 500 etc)
    if (!res.ok) throw new Error(`API request failed with status ${res.status}`);

    // 2. Parse JSON response
    const json = await res.json();
    
    // 3. Validate response structure - protects against malformed data
    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("API returned invalid data structure");
    }

    // 4. Transform data with safe property access
    return json.data.map(item => {
      // Safely access nested properties with fallbacks
      const attributes = item.attributes || {}; // Prevent undefined errors
      const imagesData = attributes.images?.data || []; // Empty array if no images

      return {
        // Required fields with fallbacks
        id: item.id, // Always exists in Strapi
        title: attributes.title || "Untitled", // Fallback if empty
        slug: attributes.slug || `item-${item.id}`, // Generated if missing
        
        // Process images with safe access
        images: imagesData.map(img => ({
          id: img.id,
          // Core image properties with fallbacks
          url: img.attributes?.url || "", // Empty string if undefined
          alt: img.attributes?.alternativeText || "", // Accessibility requirement
          // Optional dimensions (useful for layout stability)
          width: img.attributes?.width || 0, 
          height: img.attributes?.height || 0
        }))
      };
    });

  } catch (error) {
    // 5. Graceful error handling
    console.error("Portfolio fetch failed:", error);
    return []; // Return empty array to prevent UI crashes
  }
}