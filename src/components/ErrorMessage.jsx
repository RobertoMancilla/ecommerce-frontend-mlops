function ErrorMessage({ message }) {
  return (
    <div style={{
      color: "red",
      padding: "10px",
      border: "1px solid red"
    }}>
      {message}
    </div>
  )
}

export default ErrorMessage