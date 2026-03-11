import { ordersAPI } from "./api";

export const getOrders = async () => {
  const res = await ordersAPI.get("/orders");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await ordersAPI.get(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (order) => {
  const res = await ordersAPI.post("/orders", order);
  return res.data;
};