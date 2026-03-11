import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../../services/ordersService";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./Orders.css";

function getOrderTotal(order) {
  const direct = order.total ?? order.total_amount ?? order.totalAmount;
  if (direct != null && Number(direct) > 0) return Number(direct);

  const items = order.items || order.order_items || [];
  if (items.length > 0) {
    const sum = items.reduce((acc, item) => {
      const price = Number(item.price || item.unit_price || item.product_price || 0);
      const qty = Number(item.quantity || 1);
      return acc + price * qty;
    }, 0);
    if (sum > 0) return sum;
  }

  return 0;
}

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrderById(id);
        console.log("ORDER DETAIL RESPONSE:", data);
        setOrder(data);
      } catch (err) {
        console.error("Order detail fetch error:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!order) return <ErrorMessage message="Order not found" />;

  const orderId = order.id || order.order_id || id;
  const status = order.status || "pending";
  const statusClass = `status-${status.toLowerCase()}`;
  const total = getOrderTotal(order);
  const items = order.items || order.order_items || [];
  const date = order.created_at || order.createdAt || order.date;

  return (
    <div className="page-container">
      <Link to="/orders" className="back-link">&larr; Back to Orders</Link>

      <div className="order-detail">
        <div className="order-detail-header">
          <h1>Order #{orderId}</h1>
          <span className={`order-status ${statusClass}`}>{status}</span>
        </div>

        {date && <p className="order-date">Placed on {new Date(date).toLocaleDateString()}</p>}

        {order.user_id && <p className="order-user">Customer: {order.user_id}</p>}

        <h2>Items</h2>
        <div className="order-items">
          {items.length === 0 ? (
            <p>No item details available.</p>
          ) : (
            items.map((item, idx) => {
              const name = item.name || item.product_name || `Product ${item.product_id || idx + 1}`;
              const price = Number(item.price || item.unit_price || item.product_price || 0);
              const qty = Number(item.quantity || 1);

              return (
                <div key={item.product_id || idx} className="order-item">
                  <span>
                    {name} &times; {qty}
                  </span>
                  <span>${(price * qty).toFixed(2)}</span>
                </div>
              );
            })
          )}
        </div>

        <p className="order-total">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OrderDetailPage;