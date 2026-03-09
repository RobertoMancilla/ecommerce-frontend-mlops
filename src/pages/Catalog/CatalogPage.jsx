import { useEffect, useState } from "react";
import Filters from "../../components/Filters";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { useCart } from "../../context/CartContext";
import { getProductCategories, getProducts } from "../../services/productsService";
import "./Catalog.css";

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const categories = getProductCategories();

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProducts(searchTerm, category);
        if (active) {
          setProducts(data);
        }
      } catch {
        if (active) {
          setError("Failed to load products.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [searchTerm, category]);

  return (
    <section className="catalog-page container">
      <header className="catalog-page__header">
        <h1>Product Catalog</h1>
        <p>Find products and add them to your cart.</p>
      </header>

      <div className="catalog-page__toolbar">
        <SearchBar onSearch={setSearchTerm} />
        <Filters categories={categories} onFilter={setCategory} />
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CatalogPage;
