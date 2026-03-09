import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const handleAdd = (e) => {
    e.preventDefault(); 
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
      </div>

      <div className="product-card-info">
        <h3 className="product-card-name">
          {product.name}
        </h3>
        
        <p className="product-card-price">
          ${product.price.toFixed(2)}
        </p>

        <button 
          onClick={handleAdd}
          className="product-card-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard