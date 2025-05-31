// api/fetchPortfolio.js

const API_URL = import.meta.env.VITE_API_URL;

const API_ROUTES = {
  portfolio: '/api/portfolios',
};

export async function fetchPortfolio() {
  try {
    console.log('Fetching portfolio data from:', `${API_URL}${API_ROUTES.portfolio}?populate[images][populate]=*`);

    // The populate[images][populate]=* is working correctly!
    const res = await fetch(`${API_URL}${API_ROUTES.portfolio}?populate[images][populate]=*`);

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData}`);
    }

    const json = await res.json();
    const data = json.data; // This 'data' is the array of portfolio items

    if (!data || !Array.isArray(data)) {
      console.warn("API response data is not an array:", data);
      return [];
    }

    return data.map(item => ({
      id: item.id,
      title: item.attributes?.title || 'Untitled',
      slug: item.attributes?.slug || `untitled-${item.id}`,
      // ********* CRITICAL CHANGE HERE *********
      // The 'images' array is directly under 'item.attributes' and its elements
      // are the image objects themselves, not nested in 'data.attributes'.
      images: item.attributes?.images?.map(img => ({ // Removed `.data` and `.attributes` from `img`
        id: img.id,
        url: `${API_URL}${img.url}`, // Access url directly from img
        alternativeText: img.alternativeText || img.name || item.attributes.title, // Access directly
        name: img.name || '', // Access directly
        formats: img.formats ? { // Access formats directly
          thumbnail: img.formats.thumbnail?.url ? `${API_URL}${img.formats.thumbnail.url}` : undefined,
          small: img.formats.small?.url ? `${API_URL}${img.formats.small.url}` : undefined,
          medium: img.formats.medium?.url ? `${API_URL}${img.formats.medium.url}` : undefined,
          large: img.formats.large?.url ? `${API_URL}${img.formats.large.url}` : undefined
        } : {}
      })) || []
    }));
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
}