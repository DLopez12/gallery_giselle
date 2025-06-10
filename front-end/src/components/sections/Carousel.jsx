// src/components/sections/Carousel.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const STRAPI_API_URL = import.meta.env.VITE_API_URL;
const STRAPI_UPLOAD_BASE_URL = STRAPI_API_URL ? STRAPI_API_URL.replace(/\/api$/, '') : '';

// Define the Navbar height as a constant for clarity and easy updates
const NAVBAR_HEIGHT_PX = 96; // Based on p-4 padding + h-12 image in NavBar.jsx

export default function Carousel({ children, headerHeight }) {
    const [carouselItems, setCarouselItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                if (!STRAPI_API_URL) {
                    throw new Error("VITE_API_URL environment variable is not set. Please check your .env file.");
                }

                const requestUrl = `${STRAPI_API_URL}/carousel-items?populate=*`;
                console.log("Attempting to fetch from:", requestUrl);

                const response = await fetch(requestUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
                }

                const responseData = await response.json();

                console.log("Full API Response Data (after JSON parse):", responseData);
                console.log("Array to map over (responseData.data):", responseData.data);

                const items = responseData.data.map(item => {
                    // --- CRITICAL GUARD: Ensure 'item' is not null or undefined ---
                    if (!item) {
                        console.warn("Skipping null or undefined item found in carousel data.");
                        return null; // Return null for invalid items
                    }
                    // -------------------------------------------------------------

                    console.log("Processing item in map (before image URL):", item);

                    let imageUrl;
                    const imagePath = item.image?.url; 

                    if (imagePath) {
                        imageUrl = `${STRAPI_UPLOAD_BASE_URL}${imagePath}`;
                    } else {
                        imageUrl = 'https://placehold.co/1920x1080/cccccc/000000?text=No+Image'; // Fallback
                        console.warn(`No image URL found for carousel item ${item.id || 'unknown'}. Using fallback.`);
                    }

                    return {
                        id: item.id,
                        title: item.title,
                        imageUrl: imageUrl,
                        order: item.order,
                    };
                }).filter(Boolean); // Filter out any `null` entries that were returned by the map

                items.sort((a, b) => (a.order || 0) - (b.order || 0));
                setCarouselItems(items);

            } catch (e) {
                setError(e);
                console.error("Error fetching carousel items:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchCarouselData();
    }, []);

    // --- Loading, Error, and No Items Found States ---
    // Base classes for loading/error/no-items states.

    const baseClasses = "flex justify-center items-center h-64 rounded-lg shadow-md";
    console.log("Carousel: headerHeight prop received:", headerHeight);
    console.log("Carousel: Calculated height for div:", `calc(100vh - ${headerHeight}px)`);

    if (loading) {
        return (
            <div className={`${baseClasses} bg-gray-100`}>
                <p className="text-xl font-semibold text-gray-700">Loading stunning visuals...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${baseClasses} bg-red-100 border border-red-400 text-red-700 p-4`}>
                <p className="text-lg font-semibold">Error: {error.message}. Please ensure Strapi is running and API permissions are correct.</p>
            </div>
        );
    }

    if (carouselItems.length === 0) {
        return (
            <div className={`${baseClasses} bg-yellow-100 border border-yellow-400 text-yellow-700 p-4`}>
                <p className="text-lg font-semibold">No carousel items found. Please add content in Strapi.</p>
            </div>
        );
    }

    // --- The Main Carousel Render ---
    return (
        // This outer div is where the height calculation and top margin go.
        // It wraps the 'children' which will be your HeroWrapper.
        <div
            className="relative w-full overflow-hidden"
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
        >
            {/* The 'children' function is called here, rendering HeroWrapper with carouselItems */}
            {/* HeroWrapper will then inherit the w-full h-full from this div */}
            {children({ carouselItems })}
        </div>
    );
}

Carousel.propTypes = {
    children: PropTypes.func.isRequired,
};