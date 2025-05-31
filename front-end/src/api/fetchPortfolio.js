export async function fetchPortfolio() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.portfolio}?populate=deep,3`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const { data } = await res.json();
    
    return data.map(item => ({
      id: item.id,
      title: item.attributes?.title || 'Untitled',
      // Fix: Properly handle the nested images data structure
      images: item.attributes?.images?.data?.map(img => ({
        id: img.id,
        url: img.attributes.url, // Full image URL
        alt: img.attributes.alternativeText || item.attributes.title,
        // Include all available formats
        thumbnail: img.attributes.formats?.thumbnail?.url,
        small: img.attributes.formats?.small?.url,
        medium: img.attributes.formats?.medium?.url,
        large: img.attributes.formats?.large?.url
      })) || [] // Fallback empty array
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}