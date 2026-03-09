import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="navbar">
      <h2 className="navbar__brand">Ecommerce</h2>

      <div className="navbar__links">
        <Link to="/">Catalog</Link>
        <Link to="/cart">Cart ({itemCount})</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </nav>
  );
}

export default Navbar;
