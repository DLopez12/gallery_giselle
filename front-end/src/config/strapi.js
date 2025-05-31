// Centralized configuration for Strapi API connections
// Uses Vite's environment variables (must be prefixed with VITE_)

// Environment Configuration
export const STRAPI_URL = import.meta.env.VITE_API_URL; // Base URL from .env

// API Route Definitions
export const API_ROUTES = {
  portfolio: '/api/portfolios' // Matches Strapi collection name
};