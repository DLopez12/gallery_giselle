// src/components/sections/Services/ServiceCard.jsx

// Import React for building UI components.
import React from 'react';
// Import PropTypes for type-checking component props, enhancing reliability and documentation.
import PropTypes from 'prop-types';

// Define the ServiceCard functional component.
// It receives a 'service' object as a prop, which contains data for a single service.
const ServiceCard = ({ service }) => {
    // The component returns JSX, which describes the UI structure.
    return (
        // Outer div for the service card.
        // `bg-white`: Sets the background to white.
        // `rounded-lg`: Applies large rounded corners to the card.
        // `shadow-md`: Adds a medium-sized box shadow for visual depth.
        // `overflow-hidden`: Hides content that overflows the card's boundaries, especially for the image.
        // `transform`: Enables CSS transforms for animations (like scale).
        // `transition-all duration-300`: Applies a smooth transition effect over 300ms for all animatable properties.
        // `hover:scale-105`: On hover, slightly scales the card up by 5% for a subtle interactive effect.
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105">
            {/* Conditional rendering for the image: only render if `service.imageUrl` exists. */}
            {service.imageUrl && (
                // Image element for the service.
                <img
                    // `src`: Sets the image source to the URL fetched from Strapi.
                    src={service.imageUrl}
                    // `alt`: Provides alternative text for accessibility and when the image fails to load.
                    // It uses the service's title for a descriptive alt text.
                    alt={service.title}
                    // `w-full`: Makes the image take the full width of its parent container.
                    // `h-48`: Sets a fixed height of 48 Tailwind units (12rem or 192px).
                    // `object-cover`: Ensures the image covers the entire area, cropping if necessary, while maintaining aspect ratio.
                    // `onError`: Event handler for when the image fails to load.
                    // It replaces the broken image with a placeholder image and prevents further error calls.
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Missing"; }}
                    className="w-full h-48 object-cover"
                />
            )}
            {/* Inner div for the card's text content. */}
            {/* `p-6`: Adds padding all around the text content (24px). */}
            <div className="p-6">
                {/* Heading for the service title. */}
                {/* `text-xl`: Sets the font size to extra-large. */}
                {/* `font-semibold`: Applies a semi-bold font weight. */}
                {/* `text-gray-900`: Sets the text color to a dark gray. */}
                {/* `mb-2`: Adds a bottom margin of 2 Tailwind units (8px). */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>

                {/* Conditional rendering for the category: only display if `service.category` exists. */}
                {/* `text-sm`: Sets a small font size. */}
                {/* `text-gray-500`: Sets the text color to a medium gray. */}
                {/* `mb-2`: Adds a bottom margin of 2 Tailwind units (8px). */}
                {service.category && (
                    <p className="text-sm text-gray-500 mb-2">Category: {service.category}</p>
                )}

                {/* Paragraph for the service description. */}
                {/* `text-gray-700`: Sets the text color to a darker gray. */}
                {/* `text-sm`: Sets a small font size. */}
                {/* `mb-4`: Adds a bottom margin of 4 Tailwind units (16px). */}
                <p className="text-gray-700 text-sm mb-4">{service.description}</p>

                {/* Conditional rendering for the price: only display if `service.price` exists. */}
                {/* `text-lg`: Sets a large font size. */}
                {/* `font-bold`: Applies a bold font weight. */}
                {/* `text-gray-800`: Sets the text color to a very dark gray. */}
                {service.price && (
                    <p className="text-lg font-bold text-gray-800 text-center">
                        {/* Conditionally display `priceDescription` (e.g., "Starting at ") if it exists. */}
                        {service.priceDescription ? `${service.priceDescription} ` : ''}
                        {/* Display the price, formatted to two decimal places. */}
                        ${service.price.toFixed(2)}
                    </p>
                )}
                {/* Optional: Placeholder for a "Learn More" button, currently commented out. */}
                {/*
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Learn More
                </button>
                */}
            </div>
        </div>
    );
};

// PropTypes for type-checking and documentation of the 'service' prop.
// This helps catch bugs early and makes the component's expected data structure clear.
ServiceCard.propTypes = {
    // The 'service' prop must be an object.
    service: PropTypes.shape({
        // `id`: Can be a string or number, and is required. Used for unique keys in lists.
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        // `title`: Must be a string and is required.
        title: PropTypes.string.isRequired,
        // `description`: Must be a string and is required.
        description: PropTypes.string.isRequired,
        // `price`: Must be a number, but is optional.
        price: PropTypes.number,
        // `priceDescription`: Must be a string, but is optional.
        priceDescription: PropTypes.string,
        // `imageUrl`: Must be a string, but is optional.
        imageUrl: PropTypes.string,
        // `featured`: Must be a boolean, but is optional.
        featured: PropTypes.bool,
        // `category`: Must be a string, but is optional (now it's required from Strapi, but optional here for flexibility).
        category: PropTypes.string,
    }).isRequired, // The entire 'service' object prop is required.
};

// Export the ServiceCard component so it can be imported and used in other files.
export default ServiceCard;
