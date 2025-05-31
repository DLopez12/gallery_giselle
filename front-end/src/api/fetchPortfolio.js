// Import necessary modules
import API_ROUTES from "../utils/apiRoutes";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPortfolio() {
  try {
    
    console.log('Fetching from URL:', `<span class="math-inline">\{API\_URL\}</span>{API_ROUTES.portfolio}?populate=images`)

    const res = await fetch(`${API_URL}${API_ROUTES.portfolio}?populate=images`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const { data } = await res.json();

    return data.map(item => ({
      id: item.id,
      title: item.attributes?.title || 'Untitled',
      slug: item.attributes?.slug || `untitled-${item.id}`, // Ensure slug exists for Link
      images: item.attributes?.images?.data?.map(imgData => ({ // Access imgData.attributes for actual image details
        id: imgData.id,
        // Make sure to access attributes for URL and other image properties in Strapi V4
        url: `${API_URL}${imgData.attributes.url}`,
        alternativeText: imgData.attributes.alternativeText || item.attributes.title,
        name: imgData.attributes.name || '',
        formats: imgData.attributes.formats ? {
          thumbnail: imgData.attributes.formats.thumbnail?.url ? `${API_URL}${imgData.attributes.formats.thumbnail.url}` : undefined,
          small: imgData.attributes.formats.small?.url ? `${API_URL}${imgData.attributes.formats.small.url}` : undefined,
          medium: imgData.attributes.formats.medium?.url ? `${API_URL}${imgData.attributes.formats.medium.url}` : undefined,
          large: imgData.attributes.formats.large?.url ? `${API_URL}${imgData.attributes.formats.large.url}` : undefined
        } : {}
      })) || []
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}