import api from "./api";

const mockOrders = [
  {
    id: "1001",
    status: "PENDING",
    total: 1575.0,
    createdAt: "2026-03-08T10:30:00",
    items: [
      { productId: "1", name: "Laptop X1 Carbon", quantity: 1, price: 1500.0 },
      { productId: "9", name: "USB-C Hub Multiport", quantity: 1, price: 35.0 },
      {
        productId: "8",
        name: "Laptop Stand Aluminum",
        quantity: 1,
        price: 45.0,
      },
    ],
  },
  {
    id: "1002",
    status: "CONFIRMED",
    total: 205.0,
    createdAt: "2026-03-07T14:15:00",
    items: [
      {
        productId: "2",
        name: "Mechanical Keyboard RGB",
        quantity: 1,
        price: 120.0,
      },
      { productId: "3", name: "Wireless Mouse Pro", quantity: 1, price: 75.0 },
      { productId: "9", name: "USB-C Hub Multiport", quantity: 1, price: 10.0 },
    ],
  },
  {
    id: "1003",
    status: "PAID",
    total: 335.0,
    createdAt: "2026-03-06T09:45:00",
    items: [
      {
        productId: "10",
        name: "Noise Cancelling Headphones",
        quantity: 1,
        price: 250.0,
      },
      {
        productId: "8",
        name: "Laptop Stand Aluminum",
        quantity: 1,
        price: 45.0,
      },
      { productId: "9", name: "USB-C Hub Multiport", quantity: 1, price: 40.0 },
    ],
  },
  {
    id: "1004",
    status: "CANCELLED",
    total: 99.0,
    createdAt: "2026-03-05T18:20:00",
    items: [
      {
        productId: "5",
        name: "Webcam 4K HD",
        quantity: 1,
        price: 99.0,
      },
    ],
  },
];

const sortByDateDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

const shouldUseFallback = (error) => !error?.response;

const mapApiOrder = (order) => ({
  ...order,
  items: (order.items || []).map((item) => ({
    ...item,
    price: item.price ?? item.unitPrice ?? 0,
  })),
});

export const getOrders = async () => {
  try {
    const response = await api.get("/orders");
    const orders = Array.isArray(response.data) ? response.data : [];
    return orders.map(mapApiOrder).sort(sortByDateDesc);
  } catch (error) {
    if (!shouldUseFallback(error)) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [...mockOrders].sort(sortByDateDesc);
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return mapApiOrder(response.data);
  } catch (error) {
    if (!shouldUseFallback(error)) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    const order = mockOrders.find((mockOrder) => mockOrder.id === id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }
};

export const createOrder = async (payload) => {
  try {
    const response = await api.post("/orders", payload);
    return response.data;
  } catch (error) {
    if (!shouldUseFallback(error)) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 450));

    const newOrder = {
      id: String(1000 + mockOrders.length + 1),
      status: "PENDING",
      total: payload.summary?.total ?? 0,
      createdAt: new Date().toISOString(),
      items: (payload.items || []).map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.unitPrice ?? item.price ?? 0,
      })),
    };

    mockOrders.unshift(newOrder);
    return newOrder;
  }
};
