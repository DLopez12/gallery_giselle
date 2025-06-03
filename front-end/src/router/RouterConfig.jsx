import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout'; // This Layout will now handle the modal rendering
import NotFound from '../components/common/NotFound';
import LoadingSpinner from '../components/common/LoadingSpinner';

import ErrorBoundary from '../components/ErrorBoundary';

import HomePage from '../pages/HomePage';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Bookings from '../pages/Bookings';
import { retryImport } from '../utils/retryImport';


// Import portfolio components
const PortfolioLanding = lazy(() => retryImport(() => import('../pages/PortfolioLanding.jsx')));
const PortfolioCategory = lazy(() => retryImport(() => import('../pages/PortfolioCategory.jsx')));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Your main layout
    errorElement: <NotFound />, // Catch errors within this branch
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "portfolio", // This is the landing page for portfolio
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <PortfolioLanding />
            </Suspense>
          </ErrorBoundary>
        ),
        children: [
          {
            path: "weddings-elopments", // Corrected slug for Weddings & Elopements
            element: (
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <PortfolioCategory /> {/* This will render the Weddings & Elopements category */}
                </Suspense>
              </ErrorBoundary>
            )
          },
          {
            path: "couples", // e.g., /portfolio/couples
            element: (
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <PortfolioCategory /> {/* This will render the Couples category */}
                </Suspense>
              </ErrorBoundary>
            )
          },
          {
            path: "college-graduates", // e.g., /portfolio/college-graduates
            element: (
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <PortfolioCategory /> {/* This will render the College Graduates category */}
                </Suspense>
              </ErrorBoundary>
            )
          },
        ]
      },
      { path: "/home", element: <HomePage /> }, // Keep if you want /home specifically
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "bookings", element: <Bookings /> },
      // IMPORTANT: The 404 catch-all route should always be LAST if defined within children
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function RouterConfig() {
  return (
      <RouterProvider router={router} />
  );
}