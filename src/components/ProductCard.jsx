function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img className="product-card__image" src={product.imageUrl} alt={product.name} />
      <h3 className="product-card__title">{product.name}</h3>
      <p className="product-card__category">{product.category}</p>
      <p className="product-card__price">${product.price.toFixed(2)}</p>
      <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;
