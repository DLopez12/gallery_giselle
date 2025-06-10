// front-end/src/api/fetchAboutPage.jsx

import strapi from '../config/strapi'; // imports strapi client
import apiRoutes from '../utils/apiRoutes'; // impports the centralized API route

/**
 * - function fetchAboutPage
 * - description Fetches the 'About Page' content from the Strapi backend.
 * This function is designed to retrieve the dynamic content for the About page,
 * including text, images, and calls to action, directly from Strapi.
 * - returns {Promise<Object|null>} A promise that resolves with the about page data,
 * or null if an error occurs during fetching.
 */

export async function fetchAboutPage() {
    try {
        // Constructs the full API URL for the 'about-page' single type.
        // 'apiRoutes.aboutPage' provides the base path, and '?populate=profilePicture'
        // ensures that the related media file (profilePicture) is included in the response.
        const response = await strapi.get(`${apiRoutes.aboutPage}?populate=profilePicture`);

        // --- ADD THESE CONSOLE LOGS ---
        console.log("Full API Response for About Page:", response);
        console.log("API Response Data for About Page:", response.data);
        // --- END CONSOLE LOGS ---
        
        // Strapi's single types return data directly under the 'data' key.
        // If data exists, return the 'attributes' which contain the actual content fields.
        if (response.data && response.data.data.attributes) {
            return response.data.data.attributes; // Returns the content of the about page.
        }

        // If no data attributes are found, log a waringin for debugging purposes.
        console.warn("No data or attributes found for About Page.");
        return null; // Indicates that no valid data was retrieved.

    } catch (error) {
        // Catches any erros during the API request (e.g., network issues, server errors, etc)
        // Logs the error to the console for debugging.
        console.error("Error fetching About Page data:", error);
        return null; // returns null to signifiy a failed fetch operation.
    }
}
