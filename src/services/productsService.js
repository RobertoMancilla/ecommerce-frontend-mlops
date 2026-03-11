import { productsAPI } from "./api";

export const getProducts = async (searchTerm = "", category = "All") => {
  const params = {};

  if (category && category !== "All") {
    params.category = category;
  }

  if (searchTerm) {
    params.search = searchTerm;
  }

  const res = await productsAPI.get("/products", { params });
  return res.data || [];
};

export const getProductById = async (id) => {
  const res = await productsAPI.get(`/products/${id}`);
  return res.data;
};

export const getProductCategories = async () => {
  const res = await productsAPI.get("/products");

  const products = res.data || [];

  const categories = [...new Set(products.map((p) => p.category))];

  return ["All", ...categories];
};