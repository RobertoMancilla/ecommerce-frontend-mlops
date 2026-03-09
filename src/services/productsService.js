const mockProducts = [
  {
    id: '1',
    name: 'Laptop X1 Carbon',
    description: 'Ultra-light and powerful business laptop with a stunning display.',
    price: 1500.00,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    category: 'Electronics',
    stock: 10,
  },
  {
    id: '2',
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming mechanical keyboard with customizable RGB lighting.',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
    category: 'Peripherals',
    stock: 25,
  },
  {
    id: '3',
    name: 'Wireless Mouse Pro',
    description: 'Ergonomic wireless mouse with high precision sensor.',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    category: 'Peripherals',
    stock: 40,
  },
  {
    id: '4',
    name: 'Monitor UltraWide 34"',
    description: '34-inch ultrawide monitor for immersive gaming.',
    price: 600.00,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    category: 'Electronics',
    stock: 15,
  },
  {
    id: '5',
    name: 'Webcam 4K HD',
    description: 'High-definition 4K webcam with autofocus.',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1588600878108-578307a3cc9d?w=500&q=80',
    category: 'Peripherals',
    stock: 30,
  },
  {
    id: '6',
    name: 'SSD External 1TB',
    description: 'Fast and portable 1TB external SSD.',
    price: 130.00,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80',
    category: 'Storage',
    stock: 50,
  },
  {
    id: '7',
    name: 'Gaming Headset 7.1',
    description: 'Immersive 7.1 surround sound gaming headset.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
    category: 'Audio',
    stock: 20,
  },
  {
    id: '8',
    name: 'Laptop Stand Aluminum',
    description: 'Ergonomic aluminum laptop stand designed for better posture, improved airflow, and reduced neck strain during long working sessions.',
    price: 45.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-0MnxTgX6ms0H5CXGxL4xTfydFa7R9sLxA&s',
    category: 'Accessories',
    stock: 60,
  },
  {
    id: '9',
    name: 'USB-C Hub Multiport',
    description: 'Compact USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery, expanding your laptop\'s connectivity options.',
    price: 35.00,
    image: 'https://m.media-amazon.com/images/I/61Nb935ZpsL.jpg',
    category: 'Accessories',
    stock: 75,
  },
  {
    id: '10',
    name: 'Noise Cancelling Headphones',
    description: 'Premium over-ear headphones with industry-leading noise cancellation, exceptional sound quality, and comfortable design for long listening.',
    price: 250.00,
    image: 'https://www.sony.com.mx/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
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