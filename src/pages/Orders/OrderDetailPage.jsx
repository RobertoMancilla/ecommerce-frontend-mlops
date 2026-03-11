import { useEffect, useState } from "react";
import { getOrders } from "../../services/ordersService";
import OrderCard from "../../components/OrderCard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import "./Orders.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getOrders();

      // 🔎 Debug: see what the API actually returns
      console.log("ORDERS API RESPONSE:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }

    } catch (err) {
      console.error("Orders fetch error:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      <h1 className="page-header">My Orders</h1>

      <button className="refresh-btn" onClick={loadOrders}>
        Refresh Orders
      </button>

      {orders.length === 0 && (
        <p>No orders yet.</p>
      )}

      <div className="orders-grid">
        {orders?.map((order, index) => {
          if (!order) return null;

          const orderId = order.id || order.order_id || index;

          return (
            <Link
              key={orderId}
              to={`/orders/${orderId}`}
              className="order-link"
            >
              <OrderCard order={order} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersPage;