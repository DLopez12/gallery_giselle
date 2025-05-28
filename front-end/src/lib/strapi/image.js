// Handles ONLY Strapi-related image transformations
export const formatStrapiImage = (strapiData) => ({
  src: `${import.meta.env.VITE_STRAPI_URL}${strapiData.attributes.url}`,
  alt: strapiData.attributes.alternativeText || 'Photography Portfolio',
  width: strapiData.attributes.width,
  height: strapiData.attributes.height,
  aspectRatio: strapiData.attributes.aspectRatio // e.g., '3:2'
});