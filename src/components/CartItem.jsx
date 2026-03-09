import "./CartItem.css";

function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <span className="cart-item-name">{item.name}</span>
      <span className="cart-item-price">${item.price.toFixed(2)}</span>
      <button className="remove-button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  )
}

export default CartItem