import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path) => {
    return location.pathname === path ? "navbar-link active" : "navbar-link";
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="https://i.pinimg.com/originals/96/a0/e4/96a0e4cd82433f787dbb4f7c8cd2cd0e.png"
            alt="Logo"
            className="logo-img"
          />
          <span className="logo-text">ShopSphere</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/cart" className={isActive("/cart")}>
            Cart
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          <Link to="/orders" className={isActive("/orders")}>Orders</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;