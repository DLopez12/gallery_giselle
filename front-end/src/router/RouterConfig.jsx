// src/router/RouterConfig.jsx
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- IMPORTANT: Ensure you have the correct imports for your components and pages ---
import Layout from '../components/layout/Layout'; // This Layout will now handle the modal rendering
import NotFound from '../components/common/NotFound';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

// --- Page Imports ---
import HomePage from '../pages/HomePage';
import Services from '../pages/Services'; // The main "All Services" page
import About from '../pages/About';
import Contact from '../pages/Contact';
import Bookings from '../pages/Bookings';

// Corrected Imports
// Only lazy import PortfolioLanding once
const PortfolioLanding = lazy(() => import('../pages/PortfolioLanding')); // Removed retryImport for simplicity unless explicitly needed
// Import GalleryPage, which replaces PortfolioCategory
const GalleryPage = lazy(() => import('../pages/GalleryPage'));

// NEW: Import the ServiceCategoryPage
const ServiceCategoryPage = lazy(() => import('../pages/ServiceCategoryPage')); // Removed retryImport for simplicity unless explicitly needed


// --- Router Configuration ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />, // Catch errors for children routes
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },

      // --- Services Routes ---
      { path: "services", element: <Services /> }, // Route for "All Services" page
      // NEW: Dynamic route for specific service categories
      {
        path: "services/:categorySlug", // e.g., /services/family-portraits
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <ServiceCategoryPage /> {/* Render the generic ServiceCategoryPage */}
            </Suspense>
          </ErrorBoundary>
        ),
      },

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "bookings", element: <Bookings /> },

      // --- Portfolio Routes ---
      // 1. Portfolio Landing Page (e.g., /portfolio)
      {
        path: "portfolio",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <PortfolioLanding />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      // 2. Dynamic Gallery Pages (e.g., /portfolio/weddings-elopements)
      {
        path: "portfolio/:categorySlug",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <GalleryPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },

      // IMPORTANT: The 404 catch-all route should always be LAST in the children array
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function RouterConfig() {
  return (
      <RouterProvider router={router} />
  );
}
