// front-end/src/pages/About.jsx

import React, { useState, useEffect } from 'react'; // Import React hooks for state and lifecycle management.
import DOMPurify from 'dompurify'; // Imports DOMPurify for sanitizing HTML content from Strapi.
import { fetchAboutPage } from '../api/fetchAboutPage'; // Imports the function to fetch about page data.
import LoadingSpinner from '../components/common/LoadingSpinner'; // Imports the loading spinner component for UX.
import NotFound from '../components/common/NotFound'; // Imports a component to display when content is not found or error.
import { getStrapiImage } from '../lib/strapi/image'; // Utility to construct full image URLs from Strapi paths.
import { Link } from 'react-router-dom'; // Used for internal navigation, specifically for the CTA link.

export default function About() {
  // State to store the fetch about page content. Initially null until data is loaded.
  const [aboutContent, setAboutContent] = useState(null);
  // State to manage the loading status. True when fetching, false otherwise.
  const [isLoading, setIsLoading] = useState(true);
  // State to store any error messages that occur during the fetch operation.
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts.
  // The empy dependency array ensures this effect runs only once after the initial render.
  useEffect(() => {
    const getAboutPageData = async () => {
      try {
        // Sets loading state to true before starting the fetch operation.
        setIsLoading(true);
        // Resets any previous error state.
        setError(null);
        // Calls the API utility to fetch the about page data.
        const data = await fetchAboutPage();
        // Updates the state with the fetched data.
        setAboutContent(data);
      } catch (err) {
        // Sets the error state to display an error message to the user.
        setError("Failed to load about page content.");
      } finally {
        setIsLoading(false);
      }
    };
    
    // Calls the data fetching function.
    getAboutPageData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Conditional rendering: Displays a loading spinner while data is being fetched.
  if (error || !aboutContent) {
    // Provides a fallback message if content is explicitly null or an error occured
    return <NotFound message={error || "About page content could not be loaded."} />;
  }

  // Renders the About page content once data is successfully loaded.
  return (
    <div className="contaier mx-auto px-4 py-8 max-w-3xl">
      {/* Page Title Section */}
      {/* Applies responsive text sizing and bold styling for prominence. */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        {aboutContent.pageTitle}
      </h1>

      {/* Profile Picture Section */}
      {/* Conditionally redners the profiles picture if 'profilePicture' data exists. */}
      {aboutContent.profilePicture && (
        <div className="mb-8 text-center">
          {/* Dynamically generates the image source URL using getStrapiImage utility. */}
          {/* 'object-cover' ensures the image covers its area while maintaining aspect ratio. */}
          {/* 'rounded-lg' applies rounded corners for a softer aesthetic. */}
          <img
            src={getStrapiImage(aboutContent.profilePicture)}
            alt={aboutContent.profilePictureCaption || aboutContent.pageTitle}
            className="w-full max-h-[500px] object-cover rounded-lg shadow-lg mx-auto"
          />
          {/* Displays th profile picture caption, if available. */}
          {aboutContent.profilePictureCaption && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {aboutContent.profilePictureCaption}
            </p>
          )}
        </div>
      )}
      {/* Main Content Section */}
      {/* Renders rich text content securely. DOMPurify sanitizes the HTML to prevent XSS attacks before it's injected. */}
      <div 
        className="mb-8 text-lg leading-relaxed text-gray-800 dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutContent.mainContent) }}
      />
      {/* Mission Statement Section */}
      {/* Conditionally renders the mission statement if content exists. */}
      {aboutContent.missionStatement && (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner mb-8">
          {/* Displays a clear heading for the mission statment */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Our Mission
          </h2>
          {/* Renders the rich text mission statement, sanitized for safety. */}
          <div 
            className="text-md leading-relaxed text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutContent.missionStatement) }}
          />
        </div>
      )}

      {/* Call to Action Section */}
      {/* Conditionally renders the call to action if text and link exist. */}
      {aboutContent.callToAction && aboutContent.callToActionLink && (
        <div className="text-center mt-10">
          <Link
          to={aboutContent.callToActionLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {aboutContent.callToActionText}
          </Link>
        </div>
      )}
    </div>
  )
}