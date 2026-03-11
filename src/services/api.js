import axios from "axios";

export const productsAPI = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_API_URL || "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ordersAPI = axios.create({
  baseURL: import.meta.env.VITE_ORDERS_API_URL || "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
