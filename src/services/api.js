import axios from "axios";

// In dev, requests go through Vite proxy (no CORS issues).
// In production, set these env vars to the real Lambda URLs.
const PRODUCTS_BASE = import.meta.env.VITE_PRODUCTS_API_URL || "/api-products";
const ORDERS_BASE = import.meta.env.VITE_ORDERS_API_URL || "/api-orders";

export const productsApi = axios.create({
  baseURL: PRODUCTS_BASE,
});

export const ordersApi = axios.create({
  baseURL: ORDERS_BASE,
});
