// front-end/src/config/strapi.js

import axios from 'axios'; // Imports the axios library for making HTTP requests.

// Centralized configuration for Strapi API connections.
// Uses Vite's environment variables, which must be prefixed with VITE_ for client-side exposure.

// Environment Configuration: Defines the base URL for the Strapi API.
// This URL is read from the .env file (e.g., VITE_API_URL=http://localhost:1337).
export const STRAPI_URL = import.meta.env.VITE_API_URL;

// API Route Definitions: Centralizes paths to different API endpoints in Strapi.
// This improves maintainability and makes it easy to update routes if Strapi's API changes.
export const API_ROUTES = {
  // Defines the route for fetching portfolio items.
  // The path '/api/portfolios' should match your Strapi collection's API ID.
  portfolio: '/api/portfolios',
  // Defines the route for the 'About Page' single type.
  // This should match the API ID you set up in Strapi (e.g., 'about-page').
  aboutPage: '/api/about-page'
};

// Creates and exports a default Axios instance specifically configured for Strapi.
// This instance will be used throughout the frontend to make API calls to Strapi.
const strapiClient = axios.create({
  // Sets the base URL for all requests made with this client.
  // This ensures all requests go to the correct Strapi backend instance.
  baseURL: STRAPI_URL,
  // Defines default headers for all requests.
  // 'Content-Type' is set to JSON as Strapi typically expects and returns JSON.
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exports the configured Axios instance as the default export of this module.
// This allows other files to import it simply as `import strapi from '../config/strapi';`.
export default strapiClient;