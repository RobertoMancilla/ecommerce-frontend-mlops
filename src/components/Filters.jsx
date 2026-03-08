function Filters({ categories, onFilter }) {
  return (
    <div>
      <h4>Categories</h4>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilter(cat)}
          style={{ margin: "5px" }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default Filters