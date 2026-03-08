function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      width: "220px"
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%" }}
      />

      <h3>{product.name}</h3>

      <p>${product.price}</p>

      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard