import "./CartItem.css";

function CartItem({ item, onRemove, onUpdateQuantity }) {
  const lineTotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <div className="cart-item__info">
        <img className="cart-item__image" src={item.imageUrl} alt={item.name} />
        <div>
          <h3 className="cart-item-name">{item.name}</h3>
          <p className="cart-item-price">${item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="cart-item__actions">
        <div className="qty-control">
          <button
            type="button"
            className="qty-button"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            aria-label={`Decrease quantity for ${item.name}`}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, e.target.value)}
            aria-label={`Quantity for ${item.name}`}
          />
          <button
            type="button"
            className="qty-button"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            aria-label={`Increase quantity for ${item.name}`}
            disabled={item.quantity >= item.stock}
          >
            +
          </button>
        </div>

        <strong>${lineTotal.toFixed(2)}</strong>

        <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
