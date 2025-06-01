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

const Portfolio = lazy(() => retryImport(() => import('../pages/Portfolio.jsx')));
// const EnlargedPhoto = lazy(() => import('../components/sections/Portfolio/EnlargedPhoto')); // <-- REMOVE THIS LINE HERE

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Your main layout
    errorElement: <NotFound />, // Catch errors within this branch
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "portfolio",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Portfolio />
            </Suspense>
          </ErrorBoundary>
        )
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
  // If EnlargedPhoto is a modal, it should NOT be a direct child of the main router's children array like this.
  // It will be rendered conditionally in the Layout or App.
]);

export default function RouterConfig() {
  return (
    // <Suspense fallback={<LoadingSpinner />}> // Suspense goes inside routes or components
      <RouterProvider router={router} />
    // </Suspense>
  );
}