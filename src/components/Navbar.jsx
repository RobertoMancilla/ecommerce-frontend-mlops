import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "navbar-link active" : "navbar-link";
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          Market
        </Link>

        <div className="navbar-links">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/cart" className={isActive("/cart")}>Cart</Link>
          <Link to="/orders" className={isActive("/orders")}>Orders</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar