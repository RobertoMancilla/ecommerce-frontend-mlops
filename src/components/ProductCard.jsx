function ProductCard({ product, onAddToCart }) {
  const handleAdd = (e) => {
    e.preventDefault(); 
    onAddToCart(product);
  };

  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid #DDDDDD",
      borderRadius: "8px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      height: "100%", 
      boxSizing: "border-box"
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ 
          width: "100%", 
          height: "200px", 
          objectFit: "cover", 
          borderRadius: "4px",
          marginBottom: "16px"
        }}
      />

      <div style={{ flexGrow: 1 }}>
        <h3 style={{ margin: "0 0 8px 0", color: "#333333", fontSize: "1.2rem" }}>
          {product.name}
        </h3>
      </div>

      <p style={{ fontWeight: "bold", fontSize: "1.25rem", margin: "16px 0", color: "#000000" }}>
        ${product.price.toFixed(2)}
      </p>

      <button 
        onClick={handleAdd}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#333333",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard