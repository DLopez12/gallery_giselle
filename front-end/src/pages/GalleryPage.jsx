import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ---IMPORTANT: Replace with your actual Strapi API URL ---
const STRAPI_API_URL = import.meta.env.VITE_API_URL;

export default function GalleryPage() {
    const { categorySlug } = useParams();
    const [galleryInfo, setGalleryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGalleryData = async () => {
            setLoading(true);
            setError(null);
            setGalleryInfo(null); // Clear previous data

            try {
                // --- IMPORTANT: Adjust content type plural name if different in your Strapi ---
                // Strapi typically pluralizes your content type's display name,
                // so "Wedding and Elopement" might become "wedding-and-elopements"
                // Check your Strapi API documentation or try a direct browser call to confirm
                let contentTypePlural;
                switch (categorySlug) {
                    case 'weddings-elopements':
                        contentTypePlural = 'wedding-and-elopements'; // Adjust if Strapi's pluralization is different
                        break;
                    case 'couples':
                        contentTypePlural = 'couples'; // Adjust if Strapi's pluralization is different
                        break;
                    case 'college-graduates':
                        contentTypePlural = 'graduates'; // Adjust if Strapi's pluralization is different
                        break;
                    default:
                        setError("Invalid category slug.");
                        setLoading(false);
                        return;
                }

                // Construct the API URL
                const response = await fetch(
                    `${STRAPI_API_URL}/${contentTypePlural}?filters[slug][$eq]=${categorySlug}&populate=photos.image`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Check if data is found and structured as expected
                if (data.data && data.data.length > 0) {
                    const categoryData = data.data[0].attributes;

                    // Map Strapi's photo data to a simpler structure for our component
                    const photos = categoryData.photos.data.map(photoItem => ({
                        id: photoItem.id,
                        src: `${photoItem.attributes.image.data.attributes.url}`, // Strapi returns full path relative to base URL
                        alt: photoItem.attributes.altText || categoryData.title // Use altText if available, otherwise category title
                    }));

                    setGalleryInfo({
                        title: categoryData.title,
                        description: categoryData.description || '', // Use description if available, otherwise empty string
                        images: photos,
                    });
                } else {
                    setError(`No data found for category: ${categorySlug}`);
                }
            } catch (e) {
                console.error("Failed to fetch gallery data:", e);
                setError(`Failed to load gallery: ${e.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryData();
    }, [categorySlug]); // Depend on categorySlug so it refetches if the URL changes

    if (loading) {
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <p className="text-xl text-gray-600">Loading gallery...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-display mb-6 p-2 text-red-600">
                    Error Loading Gallery
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
                    {error}
                </p>
                <Link to="/portfolio" className="text-brand-primary hover:underline">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    if (!galleryInfo) {
        // This case handles if loading finished but no galleryInfo was set (e.g., category not found)
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-display mb-6 p-2 text-brand-dark">
                    Gallery Not Found
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
                    The requested gallery could not be found. Please check the URL or if content exists in Strapi.
                </p>
                <Link to="/portfolio" className="text-brand-primary hover:underline">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display mb-6 p-2 text-brand-dark">
                {galleryInfo.title}
            </h1>

            {/* Only render description if it exists */}
            {galleryInfo.description && (
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
                    {galleryInfo.description}
                </p>
            )}

            {/* Grid for images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {galleryInfo.images.length > 0 ? (
                    galleryInfo.images.map((image) => (
                        <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
                            <img
                                // Important: Ensure the full path including Strapi base URL is used if images are served from Strapi
                                // For local Strapi, it's typically just the URL from Strapi's data.
                                src={image.src.startsWith('http') ? image.src : `${STRAPI_API_URL.replace('/api', '')}${image.src}`}
                                alt={image.alt}
                                className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Optional: Add a subtle overlay on hover for better UX */}
                            <div className="absolute inset-0 bg-photo-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                {/* You could add a magnifying glass icon or a 'view' text here */}
                                <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    View
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-gray-600">No photos found for this gallery yet. Add some in Strapi!</p>
                )}
            </div>

            <div className="mt-12">
                <Link to="/portfolio" className="inline-block px-6 py-3 bg-brand-primary text-white rounded-md shadow hover:bg-opacity-90 transition-colors duration-300">
                    Back to All Portfolios
                </Link>
            </div>
        </div>
    );
}