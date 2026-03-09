import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart-page container">
        <h1>Your cart is empty</h1>
        <Link className="btn btn-primary" to="/">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page container">
      <h1>Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
            />
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>
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

          <Link className="btn btn-primary" to="/checkout">
            Go to checkout
          </Link>
          <button className="btn btn-danger" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
