const mockOrders = [
  {
    id: "1001",
    status: "PENDING",
    total: 1575.0,
    createdAt: "2026-03-08T10:30:00",
    items: [
      {
        productId: "1",
        name: "Laptop X1 Carbon",
        quantity: 1,
        price: 1500.0,
      },
      {
        productId: "9",
        name: "USB-C Hub Multiport",
        quantity: 1,
        price: 35.0,
      },
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
      {
        productId: "3",
        name: "Wireless Mouse Pro",
        quantity: 1,
        price: 75.0,
      },
      {
        productId: "9",
        name: "USB-C Hub Multiport",
        quantity: 1,
        price: 10.0,
      },
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
      {
        productId: "9",
        name: "USB-C Hub Multiport",
        quantity: 1,
        price: 40.0,
      },
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

export const getOrders = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [...mockOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const getOrderById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const order = mockOrders.find((order) => order.id === id);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};