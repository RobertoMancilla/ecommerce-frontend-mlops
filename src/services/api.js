import axios from "axios";

export const productsAPI = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const ordersAPI = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});