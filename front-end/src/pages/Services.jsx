// src/pages/Services.jsx

// Import React, useEffect, and useState hooks for managing component state and side effects.
import React, { useEffect, useState } from 'react';
// Import the API function to fetch service data.
import { fetchServices } from '../api/fetchServices';
// Import the ServiceCard component to render individual service items.
import ServiceCard from '../components/sections/Services/ServiceCard';
// Import a LoadingSpinner component to show while data is being fetched.
import LoadingSpinner from '../components/common/LoadingSpinner';
// Import an ErrorBoundary component for robust error handling.
import ErrorBoundary from '../components/ErrorBoundary';

// Define the ServicesPage functional component.
// This page will display all services, serving as the main "All Services" landing page.
const ServicesPage = () => {
    // State to store the array of all fetched services.
    const [services, setServices] = useState([]);
    // State to manage the loading status (true when fetching data, false otherwise).
    const [loading, setLoading] = useState(true);
    // State to store any error messages that occur during data fetching.
    const [error, setError] = useState(null);

    // useEffect hook to fetch all services when the component mounts.
    useEffect(() => {
        // Asynchronous function to fetch service data.
        const getServices = async () => {
            try {
                // Set loading state to true at the start of the fetch operation.
                setLoading(true);
                // Clear any previous error messages.
                setError(null);

                // Fetch all services from the API.
                const data = await fetchServices();
                // Update the state with the fetched services.
                setServices(data);
            } catch (err) {
                // If an error occurs, set an error message and log the error to the console.
                setError('Failed to load services. Please try again later.');
                console.error('Error fetching all services:', err);
            } finally {
                // Regardless of success or failure, set loading state to false once the operation completes.
                setLoading(false);
            }
        };

        // Call the data fetching function.
        getServices();
    }, []); // Empty dependency array means this effect runs only once after the initial render.

    // Conditional rendering: If data is still loading, display a loading spinner.
    if (loading) {
        return <LoadingSpinner />;
    }

    // Conditional rendering: If an error occurred, display the error message.
    if (error) {
        return (
            // Flex container to center the error message on the screen.
            // `h-screen`: Makes the div take the full height of the viewport.
            // `text-red-600`: Sets text color to red for error indication.
            // `text-lg`: Sets large text size for readability.
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
            // `container mx-auto`: Centers the content horizontally and sets a maximum width.
            // `px-4 py-8`: Adds horizontal (padding-x) and vertical (padding-y) padding.
            // `mt-20`: Adds a top margin to ensure content clears the fixed navigation bar.
            <div className="container mx-auto px-4 py-8 mt-20">
                {/* Main heading for the Services page. */}
                // `text-4xl`: Sets a very large font size.
                // `font-bold`: Applies a bold font weight.
                // `text-center`: Centers the heading text.
                // `text-gray-900`: Sets the text color to a very dark gray.
                // `mb-10`: Adds a large bottom margin below the heading.
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">All Photography Services</h1>

                {/* Conditional rendering: If no services are fetched, display a message. */}
                {services.length === 0 ? (
                    // Centered message when no services are available.
                    // `text-center`: Centers the text.
                    // `text-gray-600`: Sets text color to a medium gray.
                    // `text-lg`: Sets a large font size.
                    <p className="text-center text-gray-600 text-lg">No services available at the moment. Please check back later!</p>
                ) : (
                    // Grid layout for displaying service cards.
                    // `grid grid-cols-1`: Default to one column on small screens.
                    // `md:grid-cols-2`: Switches to two columns on medium screens and up.
                    // `lg:grid-cols-3`: Switches to three columns on large screens and up.
                    // `gap-8`: Sets a consistent gap of 8 Tailwind units (32px) between grid items.
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Map over the `services` array and render a `ServiceCard` for each service object. */}
                        // `key={service.id}`: Essential for React to efficiently update lists; provides a unique identifier for each item.
                        // `service={service}`: Passes the current `service` object as a prop to the `ServiceCard` component.
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

// Export the ServicesPage component so it can be imported and used in other files, like RouterConfig.jsx.
export default ServicesPage;
