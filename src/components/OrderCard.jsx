import "./OrderCard.css";

function OrderCard({ order }) {
  const statusClass = `status-${order.status.toLowerCase()}`;

  return (
    <div className="order-card">
      <div className="order-card-header">
        <span className="order-id">Order #{order.id}</span>
        <span className={`order-status ${statusClass}`}>{order.status}</span>
      </div>

      <div className="order-card-body">
        <p className="order-total">Total: ${order.total.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default OrderCard