// RouterConfig.jsx
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- IMPORTANT: Ensure you have the correct imports for your components and pages ---
import Layout from '../components/layout/Layout'; // This Layout will now handle the modal rendering
import NotFound from '../components/common/NotFound';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

// --- Page Imports ---
import HomePage from '../pages/HomePage';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Bookings from '../pages/Bookings';

import { retryImport } from '../utils/retryImport';


// --- Corrected Imports ---
// Only lazy import PortfolioLanding once
const PortfolioLanding = lazy(() => retryImport(() => import('../pages/PortfolioLanding')));
// Import GalleryPage, which replaces PortfolioCategory
const GalleryPage = lazy(() => retryImport(() => import('../pages/GalleryPage')));

// --- Router Configuration ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      // Optional: Keep /home if you want it to explicitly go to HomePage too
      { path: "home", element: <HomePage /> },

      { path: "services", element: <Services /> },
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
      // This single route handles all your categories: weddings, couples, graduates
      {
        // IMPORTANT: Ensure the slug matches your category slugs in Strapi (e.g., 'weddings-elopements')
        path: "portfolio/:categorySlug",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <GalleryPage /> {/* This is the component that will fetch and display the gallery */}
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