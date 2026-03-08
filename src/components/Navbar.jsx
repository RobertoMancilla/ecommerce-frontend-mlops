import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "16px",
      borderBottom: "1px solid #ddd"
    }}>
      <h2>Ecommerce</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </nav>
  )
}

export default Navbar