const mockProducts = [
  {
    id: '1',
    name: 'Laptop X1 Carbon',
    description: 'Ultra-light and powerful business laptop with a stunning display, perfect for professionals on the go. Featuring long battery life and robust security.',
    price: 1500.00,
    imageUrl: 'https://m.media-amazon.com/images/I/61g9F8NmrDL.jpg',
    category: 'Electronics',
    stock: 10,
  },
  {
    id: '2',
    name: 'Mechanical Keyboard RGB',
    description: 'High-performance mechanical keyboard with customizable RGB lighting, durable keycaps, and satisfying tactile switches for gaming and typing.',
    price: 120.00,
    imageUrl: 'https://media.wired.com/photos/5b21913a985bbd041c32d13d/master/pass/keyboard-TA.jpg',
    category: 'Peripherals',
    stock: 25,
  },
  {
    id: '3',
    name: 'Wireless Mouse Pro',
    description: 'Ergonomic wireless mouse with high-precision sensor, multiple programmable buttons, and long-lasting battery, ideal for design and gaming.',
    price: 75.00,
    imageUrl: 'https://m.media-amazon.com/images/I/51uy8gOG-iL.jpg',
    category: 'Peripherals',
    stock: 40,
  },
  {
    id: '4',
    name: 'Monitor UltraWide 34"',
    description: '34-inch ultrawide monitor with stunning QHD resolution, HDR support, and a high refresh rate for immersive gaming and productive multitasking.',
    price: 600.00,
    imageUrl: 'https://www.lg.com/content/dam/channel/wcms/mx/d2c-content/ms/monitor/mx-mnt15-ultrawide-34wr50qk-b/gallery/2010x1334/lg-monitor-34WR50QK-B-add-2-2010.jpg/jcr:content/renditions/thum-1600x1062.jpeg?w=800',
    category: 'Electronics',
    stock: 15,
  },
  {
    id: '5',
    name: 'Webcam 4K HD',
    description: 'Crystal-clear 4K HD webcam with autofocus, built-in privacy shutter, and dual noise-cancelling microphones for professional video calls and streaming.',
    price: 99.00,
    imageUrl: 'https://m.media-amazon.com/images/I/61b4sT7kQeL._AC_UF894,1000_QL80_.jpg',
    category: 'Peripherals',
    stock: 30,
  },
  {
    id: '6',
    name: 'SSD External 1TB',
    description: 'Blazing fast and portable 1TB external SSD with USB-C connectivity, perfect for reliable data storage and quick file transfers on the go.',
    price: 130.00,
    imageUrl: 'https://imagedelivery.net/wExMwKP1304LY2ReXCyTPg/a1c248ba-903a-4e8b-c3ab-954fe6862400/w=500,h=602',
    category: 'Storage',
    stock: 50,
  },
  {
    id: '7',
    name: 'Gaming Headset 7.1',
    description: 'Immersive 7.1 surround sound gaming headset with comfortable earcups, a detachable noise-cancelling microphone, and customizable audio profiles.',
    price: 85.00,
    imageUrl: 'https://m.media-amazon.com/images/I/71LP40TtRHL.jpg',
    category: 'Audio',
    stock: 20,
  },
  {
    id: '8',
    name: 'Laptop Stand Aluminum',
    description: 'Ergonomic aluminum laptop stand designed for better posture, improved airflow, and reduced neck strain during long working sessions.',
    price: 45.00,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-0MnxTgX6ms0H5CXGxL4xTfydFa7R9sLxA&s',
    category: 'Accessories',
    stock: 60,
  },
  {
    id: '9',
    name: 'USB-C Hub Multiport',
    description: 'Compact USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery, expanding your laptop\'s connectivity options.',
    price: 35.00,
    imageUrl: 'https://m.media-amazon.com/images/I/61Nb935ZpsL.jpg',
    category: 'Accessories',
    stock: 75,
  },
  {
    id: '10',
    name: 'Noise Cancelling Headphones',
    description: 'Premium over-ear headphones with industry-leading noise cancellation, exceptional sound quality, and comfortable design for long listening.',
    price: 250.00,
    imageUrl: 'https://www.sony.com.mx/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
    category: 'Audio',
    stock: 18,
  },
];

export const getProducts = async (searchTerm = '', category = '') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredProducts = mockProducts;

  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(lowerSearchTerm) ||
      product.description.toLowerCase().includes(lowerSearchTerm)
    );
  }

  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  return filteredProducts;
};

export const getProductById = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockProducts.find(product => product.id === id);
};

export const getProductCategories = () => {
  const categories = ['All', ...new Set(mockProducts.map(product => product.category))];
  return categories;
};