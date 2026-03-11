import "./OrderCard.css";

function OrderCard({ order }) {
  if (!order) return null;

  const orderId = order.id || order.order_id || "N/A";
  const status = order.status || "pending";
  const total = Number(order.total || 0);

  const statusClass = `status-${status.toLowerCase()}`;

  return (
    <div className="order-card">
      <div className="order-card-header">
        <span className="order-id">Order #{orderId}</span>
        <span className={`order-status ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="order-card-body">
        <p className="order-total">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OrderCard;


