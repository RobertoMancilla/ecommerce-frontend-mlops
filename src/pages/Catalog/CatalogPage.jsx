import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, getProductCategories } from "../../services/productsService";
import ProductCard from "../../components/ProductCard";
import Filters from "../../components/Filters";
import SearchBar from "../../components/SearchBar";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useCart } from "../../context/CartContext";
import "./Catalog.css";

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedProducts = await getProducts(searchTerm, selectedCategory);
        setProducts(fetchedProducts);

        const cats = await getProductCategories();
        setCategories(cats);
      } catch (err) {
        console.error(err);
        setError("Error loading catalog");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <>
      <div className="catalog-subheader">
        <div className="container">
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            onFilter={(cat) => setSelectedCategory(cat)}
          />
        </div>
      </div>

      <div className="catalog-container">
        <h1 className="catalog-header">
          {selectedCategory === "All"
            ? "Product Catalog"
            : `${selectedCategory} Products`}
        </h1>

        <div className="catalog-controls">
          <SearchBar onSearch={setSearchTerm} />
        </div>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
              No products found matching your criteria.
            </p>
          </div>
        )}

        <div className="catalog-grid">
          {!loading &&
            !error &&
            products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export default CatalogPage;