import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NotFound from '../components/common/NotFound';
import LoadingSpinner from '../components/common/LoadingSpinner'; // Add a spinner component

// Static imports for critical above-the-fold routes
import HomePage from '../pages/HomePage';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Bookings from '../pages/Bookings';

// Modern dynamic imports using React.lazy
const Portfolio = lazy(() => import('../pages/Portfolio'));
const PhotoDetail = lazy(() => import('../components/sections/Portfolio/PhotoDetail'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: "portfolio",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Portfolio />
          </Suspense>
        )
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "portfolio/:photoId",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PhotoDetail />
          </Suspense>
        ),
        loader: async ({ params }) => {
          return {
            id: params.photoId,
            title: "Sample Photo",
            description: "Beautiful photography work",
            imageUrl: `/placeholder-${params.photoId}.jpg`
          };
        }
      },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "bookings", element: <Bookings /> }
    ],
  },
]);

export default function RouterConfig() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}