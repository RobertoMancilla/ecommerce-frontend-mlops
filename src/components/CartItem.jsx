function CartItem({ item, onRemove }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      padding: "10px"
    }}>
      <span>{item.name}</span>

      <span>${item.price}</span>

      <button onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  )
}

export default CartItem