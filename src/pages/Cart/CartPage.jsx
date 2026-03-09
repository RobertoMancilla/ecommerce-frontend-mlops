import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem";
import "./Cart.css";

function CartPage() {
  const {
    cartItems,
    itemCount,
    subtotal,
    shipping,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <section className="page-container cart-page">
      <h1 className="page-header">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="cart-link-btn">Continue shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p>
              <span>Items</span>
              <strong>{itemCount}</strong>
            </p>
            <p>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <p>
              <span>Shipping</span>
              <strong>${shipping.toFixed(2)}</strong>
            </p>
            <p className="cart-summary__total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </p>

            <div className="cart-summary-actions">
              <Link to="/checkout" className="cart-link-btn">Go to checkout</Link>
              <button type="button" className="cart-clear-btn" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

export default CartPage;
