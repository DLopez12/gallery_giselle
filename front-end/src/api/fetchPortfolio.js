import { STRAPI_URL, API_ROUTES } from "../config/strapi";

export async function fetchPortfolio() {
  const res = await fetch(`${STRAPI_URL}${API_ROUTES.portfolio}?populate=*`);
  const data = await res.json();
  return data;
}