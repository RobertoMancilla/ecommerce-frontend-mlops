import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getProductCategories } from '../../services/productsService';
import ProductCard from '../../components/ProductCard';
import Filters from '../../components/Filters';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import './Catalog.css';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getProducts(searchTerm, selectedCategory);
        setProducts(fetchedProducts);
        setCategories(await getProductCategories());
      } catch (err) {
        setError("Error loading catalog");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
  };

  return (
    <div className="catalog-container">
      <h1 className="catalog-header">
        {selectedCategory === 'All' ? 'Product Catalog' : `${selectedCategory} Products`}
      </h1>

      <div className="catalog-controls">
        <SearchBar onSearch={setSearchTerm} />
        <Filters 
          categories={categories} 
          onFilter={(cat) => setSelectedCategory(cat)} 
          selectedCategory={selectedCategory}
        />
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && products.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#333333" }}>No products found matching your criteria.</p>
      )}

      <div className="catalog-grid">
        {!loading && !error && products.map(product => (
          /* textDecoration: 'none' and color: 'inherit' fixes the blue underline issue */
          <Link 
            key={product.id} 
            to={`/product/${product.id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ProductCard 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;