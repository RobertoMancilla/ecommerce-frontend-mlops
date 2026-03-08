function OrderCard({ order }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      marginBottom: "10px"
    }}>
      <p><strong>Order ID:</strong> {order.id}</p>

      <p><strong>Total:</strong> ${order.total}</p>

      <p><strong>Status:</strong> {order.status}</p>
    </div>
  )
}

export default OrderCard