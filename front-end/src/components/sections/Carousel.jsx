import React, { useEffect, useState } from 'react';

// Use environment variable for the Strapi API base URL.
const STRAPI_API_URL = import.meta.env.VITE_API_URL;
const STRAPI_UPLOAD_BASE_URL = STRAPI_API_URL ? STRAPI_API_URL.replace(/\/api$/, '') : '';

export default function Carousel({ children }) {
    const [carouselItems, setCarouselItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarouselItems = async () => {
            try {
                if (!STRAPI_API_URL) {
                    throw new Error("VITE_API_URL environment variable is not set. Please check your .env file.");
                }

                // Corrected: Use template literal for STRAPI_API_URL
                // Ensure STRAPI_API_URL is correctly defined in .env as http://localhost:1337/api
                // If it's http://localhost:1337, then it should be `${STRAPI_API_URL}/api/carousel-items...`
                const response = await fetch(`${STRAPI_API_URL}/carousel-items?populate=*`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
                }

                const responseData = await response.json(); // Renamed to avoid conflict with `data` array below

                // --- CRITICAL FIX HERE ---
                // Access title, order, and image directly from 'item', not 'item.attributes'.
                // Access image URL directly from 'item.image.url'.
                const items = responseData.data.map(item => {
                    const imageUrl = item.image?.url // Safely access image.url directly
                        ? `${STRAPI_UPLOAD_BASE_URL}${item.image.url}`
                        : 'https://placehold.co/1920x1080/cccccc/000000?text=No+Image'; // Fallback for missing image

                    return {
                        id: item.id,
                        title: item.title, // Access title directly from item
                        imageUrl: imageUrl,
                        order: item.order, // Access order directly from item
                    };
                });

                items.sort((a, b) => (a.order || 0) - (b.order || 0));

                setCarouselItems(items);

            } catch (e) {
                setError(e);
                console.error("Error fetching carousel items:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchCarouselItems();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md">
                <p className="text-xl font-semibold text-gray-700">Loading stunning visuals...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">Error: {error.message}. Please ensure Strapi is running and API permissions are correct.</p>
            </div>
        );
    }

    if (carouselItems.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">No carousel items found. Please add content in Strapi.</p>
            </div>
        );
    }

    return React.cloneElement(children, { carouselItems });
}
