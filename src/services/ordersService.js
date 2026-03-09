import api from "./api";

export async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data;
}
