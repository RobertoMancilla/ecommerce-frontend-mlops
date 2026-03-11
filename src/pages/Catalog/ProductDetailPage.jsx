import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/productsService";
import { useCart } from "../../context/CartContext";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);

        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error loading product detail");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  const price = Number(product.price || 0);
  const stock = Number(product.stock || 0);

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">
        {"<- Back to Catalog"}
      </Link>

      <div className="product-detail-card">
        <div className="product-detail-image-wrapper">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-info">
          <p className="product-detail-category">
            {product.category || "Uncategorized"}
          </p>

          <h1 className="product-detail-name">
            {product.name}
          </h1>

          <p className="product-detail-price">
            ${price.toFixed(2)}
          </p>

          <p className="product-detail-description">
            {product.description || "No description available."}
          </p>

          <div className="stock-info">
            <p
              className={`stock-status ${
                stock > 0 ? "stock-in" : "stock-out"
              }`}
            >
              {stock > 0
                ? `In Stock: ${stock} units`
                : "Out of Stock"}
            </p>

            <button
              disabled={stock === 0}
              className="add-to-cart-large"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;