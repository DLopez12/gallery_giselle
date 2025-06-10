// front-end/src/utils/apiRoutes.js

// Defines the API routes for the Strapi backend.
// Centralizing these routes helps in managing endpoints and makes updates easier.
const apiRoutes = {
  // Route for fetching carousel items.
  carouselItems: '/carousel-items',
  // Route for fetching portfolios (e.g., gallery categories).
  portfolio: '/portfolios',
  // Route for fetching services.
  services: '/services',
  // Route for fetching individual couple portfolios.
  couples: '/couples',
  // Route for fetching individual graduate portfolios.
  graduates: '/graduates',
  // Route for fetching individual wedding and elopement portfolios.
  weddingAndElopements: '/wedding-and-elopements',
  // Route for the 'About Page' single type.
  // This must exactly match the API ID of your 'About Page' single type in Strapi.
  aboutPage: '/about-page' // <--- ENSURE THIS LINE EXISTS AND IS CORRECT
};

// Exports the apiRoutes object as the default export of this module.
// This allows other files to import it as `import apiRoutes from '../utils/apiRoutes';`.
export default apiRoutes;