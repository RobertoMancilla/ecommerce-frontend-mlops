function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <article className="cart-item">
      <div className="cart-item__info">
        <img className="cart-item__image" src={item.imageUrl} alt={item.name} />
        <div>
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)} each</p>
        </div>
      </div>

      <div className="cart-item__actions">
        <div className="qty-control">
          <button className="btn" onClick={() => onQuantityChange(item.id, item.quantity - 1)}>
            -
          </button>

          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.quantity}
            onChange={(e) => onQuantityChange(item.id, e.target.value)}
          />

          <button className="btn" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
            +
          </button>
        </div>

        <strong>${(item.price * item.quantity).toFixed(2)}</strong>

        <button className="btn btn-danger" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
