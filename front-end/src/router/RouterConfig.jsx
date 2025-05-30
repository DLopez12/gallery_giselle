// src/router/RouterConfig.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NotFound from '../components/common/NotFound';
// import RequireAuth from '../components/auth/RequireAuth';

// Static imports for critical routes
import HomePage from '../pages/HomePage';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Bookings from '../pages/Bookings';

// Dynamic imports for heavy routes (modern approach)
const Portfolio = {
  lazy: async () => {
    const module = await import('../pages/Portfolio');
    return { Component: module.default };
  }
};

const PhotoDetail = {
  lazy: async () => {
    const module = await import('../components/sections/Portfolio/PhotoDetail');
    return { Component: module.default };
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: "portfolio",
        ...Portfolio // Using dynamic import
      },
      {
        path: "portfolio/:photoId",
        ...PhotoDetail, // Using dynamic import
        loader: async ({ params }) => {
          // Temporary mock data - replace with Strapi later
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
      { 
        path: "bookings", 
        element: <Bookings /> // <RequireAuth></RequireAuth> 
      },
    ],
  },
]);

export default function RouterConfig() {
  return <RouterProvider router={router} />;
}