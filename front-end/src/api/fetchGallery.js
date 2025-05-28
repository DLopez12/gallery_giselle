import { STRAPI_URL, API_ROUTES } from "../config/strapi";

export async function fetchGallery() {
  const res = await fetch(`${STRAPI_URL}${API_ROUTES.gallery}?populate=*`);
  const data = await res.json();
  return data;
}