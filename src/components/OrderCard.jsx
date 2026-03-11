import "./OrderCard.css";

function getOrderTotal(order) {
  // Try direct total fields
  const direct = order.total ?? order.total_amount ?? order.totalAmount;
  if (direct != null && Number(direct) > 0) return Number(direct);

  // Calculate from items
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

function OrderCard({ order }) {
  if (!order) return null;

  const orderId = order.id || order.order_id || "N/A";
  const status = order.status || "pending";
  const total = getOrderTotal(order);
  const itemCount = (order.items || order.order_items || []).length;
  const date = order.created_at || order.createdAt || order.date;

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
        {date && <p className="order-date">{new Date(date).toLocaleDateString()}</p>}
        {itemCount > 0 && (
          <p className="order-items-count">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
        )}
        <p className="order-total">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OrderCard;


