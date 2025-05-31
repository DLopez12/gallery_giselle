// Import necessary modules
import API_ROUTES from "../utils/apiRoutes";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPortfolio() {
  try {
    const res = await fetch(`${API_URL}${API_ROUTES.portfolio}?populate=images`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const { data } = await res.json();

    return data.map(item => ({
      id: item.id,
      title: item.attributes?.title || 'Untitled',
      // === FIX IS HERE ===
      // Access `item.attributes.images` directly, it's already an array
      images: item.attributes?.images?.map(img => ({
        id: img.id,
        // Ensure you prepend the API_URL if the image URL from Strapi is relative
        url: `${API_URL}${img.url}`, // Access img.url directly
        alt: img.alternativeText || item.attributes.title, // Access img.alternativeText directly
        // Include all available formats, prepending API_URL
        // The formats object is directly on `img`, not `img.attributes`
        thumbnail: img.formats?.thumbnail?.url ? `${API_URL}${img.formats.thumbnail.url}` : undefined,
        small: img.formats?.small?.url ? `${API_URL}${img.formats.small.url}` : undefined,
        medium: img.formats?.medium?.url ? `${API_URL}${img.formats.medium.url}` : undefined,
        large: img.formats?.large?.url ? `${API_URL}${img.formats.large.url}` : undefined
      })) || [] // Fallback empty array
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}