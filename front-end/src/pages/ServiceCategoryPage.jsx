// src/pages/ServiceCategoryPage.jsx

// Import React, useEffect, and useState hooks for managing component state and side effects.
import React, { useEffect, useState } from 'react';
// Import useParams from 'react-router-dom' to access URL parameters (like the category slug).
import { useParams } from 'react-router-dom';
// Import the API function to fetch service data.
import { fetchServices } from '../api/fetchServices';
// Import the ServiceCard component to render individual service items.
import ServiceCard from '../components/sections/Services/ServiceCard';
// Import a LoadingSpinner component to show while data is being fetched.
import LoadingSpinner from '../components/common/LoadingSpinner';
// Import an ErrorBoundary component for robust error handling.
import ErrorBoundary from '../components/ErrorBoundary';

// Define the ServiceCategoryPage functional component.
const ServiceCategoryPage = () => {
    // `useParams()` hook destructures the `categorySlug` from the URL.
    // Example: if the URL is /services/family-portraits, categorySlug will be "family-portraits".
    const { categorySlug } = useParams();
    // State to store the array of filtered services.
    const [services, setServices] = useState([]);
    // State to manage the loading status (true when fetching data, false otherwise).
    const [loading, setLoading] = useState(true);
    // State to store any error messages that occur during data fetching.
    const [error, setError] = useState(null);
    // State to hold the formatted category name (e.g., "Family Portraits" from "family-portraits").
    const [categoryName, setCategoryName] = useState('');

    // Helper function to convert a URL slug (e.g., "family-portraits") into a readable title (e.g., "Family Portraits").
    const formatCategorySlug = (slug) => {
        // Return an empty string if the slug is null or undefined to prevent errors.
        if (!slug) return '';
        // Replace hyphens with spaces, then capitalize the first letter of each word.
        const words = slug.split('-');
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // useEffect hook to fetch services whenever the `categorySlug` in the URL changes.
    useEffect(() => {
        // Format the URL slug into a user-friendly category name and update state.
        const formattedName = formatCategorySlug(categorySlug);
        setCategoryName(formattedName);
        console.log("DEBUG ServiceCategoryPage: categorySlug from URL:", categorySlug); // DEBUG LOG
        console.log("DEBUG ServiceCategoryPage: Formatted category name (expected from Strapi):", formattedName); // DEBUG LOG

        // Asynchronous function to fetch service data.
        const getServices = async () => {
            try {
                // Set loading state to true at the start of the fetch operation.
                setLoading(true);
                // Clear any previous error messages when a new fetch begins.
                setError(null);

                // Fetch all services from the API.
                const allServices = await fetchServices();
                console.log("DEBUG ServiceCategoryPage: All services fetched:", allServices); // DEBUG LOG

                // Filter the fetched services based on the current category slug.
                // It converts both the service's category and the formatted slug to lowercase for a case-insensitive comparison.
                const filteredServices = allServices.filter(service => {
                    // DEBUG: Log the category of each service item and the target formatted name for comparison
                    console.log(`DEBUG ServiceCategoryPage: Service ID: ${service.id}, Service Category: '${service.category}', Target Category: '${formattedName}'`); // DEBUG LOG
                    // Ensure service.category exists before calling toLowerCase()
                    return service.category && service.category.toLowerCase() === formattedName.toLowerCase();
                });
                console.log("DEBUG ServiceCategoryPage: Filtered services count:", filteredServices.length, filteredServices); // DEBUG LOG

                // Update the state with the filtered services.
                setServices(filteredServices);
            } catch (err) {
                // If an error occurs, set an error message and log the error to the console.
                setError(`Failed to load services for "${formattedName}". Please try again later.`);
                console.error('Error fetching services for category:', formattedName, err);
            } finally {
                // Regardless of success or failure, set loading state to false once the operation completes.
                setLoading(false);
            }
        };

        // Call the data fetching function.
        getServices();
    }, [categorySlug]); // Dependency array: this effect runs whenever `categorySlug` changes.

    // Conditional rendering: If data is still loading, display a loading spinner.
    if (loading) {
        return <LoadingSpinner />;
    }

    // Conditional rendering: If an error occurred, display the error message.
    if (error) {
        return (
            // Flex container to center the error message.
            <div className="flex justify-center items-center h-screen text-red-600 text-lg">
                <p>{error}</p>
            </div>
        );
    }

    // Main component rendering once data is loaded and no errors.
    return (
        // Wrap the content in ErrorBoundary for localized error handling.
        <ErrorBoundary>
            {/* Main container for the page content. */}
            <div className="container mx-auto px-4 py-8 mt-20">
                {/* Main heading for the category page. */}
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
                    {categoryName} Services
                </h1>

                {/* Conditional rendering: If no services are found for the category, display a message. */}
                {services.length === 0 ? (
                    // Centered message for no services found.
                    <p className="text-center text-gray-600 text-lg">
                        No {categoryName.toLowerCase()} services available at the moment. Please check back later!
                    </p>
                ) : (
                    // Grid layout for displaying service cards.
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Map over the filtered services array and render a ServiceCard for each. */}
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

// Export the ServiceCategoryPage component so it can be imported and used in the router configuration.
export default ServiceCategoryPage;
