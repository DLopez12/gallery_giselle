// api/fetchPortfolio.js

const API_URL = import.meta.env.VITE_API_URL;

const API_ROUTES = {
  portfolio: '/api/portfolios',
};

export async function fetchPortfolio() {
  try {
    console.log('Fetching portfolio data from:', `${API_URL}${API_ROUTES.portfolio}?populate[images][populate]=*`);

    const res = await fetch(`${API_URL}${API_ROUTES.portfolio}?populate[images][populate]=*`);

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData}`);
    }

    const json = await res.json();
    const data = json.data; // This 'data' is the array of top-level portfolio items

    if (!data || !Array.isArray(data)) {
      console.warn("API response data is not an array:", data);
      return [];
    }

    return data.map(item => {
      // In your JSON, the actual portfolio item fields (title, slug, images)
      // seem to be directly on the 'item' object (which is 'data' in Strapi's outer wrapper),
      // not nested under 'attributes'. This is an older Strapi v3 style or a custom setup.
      // If your Strapi version is v4+, typically 'attributes' is used.
      // Let's assume for THIS JSON, they are direct properties of 'item'.

      return {
        id: item.id,
        title: item.title || 'Untitled', // Access title directly from item
        slug: item.slug || `untitled-${item.id}`, // Access slug directly from item
        
        // Access images directly from item, and then each image object's properties directly from img
        images: item.images?.map(img => ({
          id: img.id,
          url: `${API_URL}${img.url}`, // Image URL is directly on 'img'
          alternativeText: img.alternativeText || img.name || item.title, // Access direct properties
          name: img.name || '',
          formats: img.formats ? {
            thumbnail: img.formats.thumbnail?.url ? `${API_URL}${img.formats.thumbnail.url}` : undefined,
            small: img.formats.small?.url ? `${API_URL}${img.formats.small.url}` : undefined,
            medium: img.formats.medium?.url ? `${API_URL}${img.formats.medium.url}` : undefined,
            large: img.formats.large?.url ? `${API_URL}${img.formats.large.url}` : undefined
          } : {}
        })) || []
      };
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
}