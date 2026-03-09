function Filters({ categories, onFilter }) {
  return (
    <div className="filters">
      <h4>Categories</h4>

      <div className="filters__list">
        {categories.map((cat) => (
          <button key={cat} className="btn" onClick={() => onFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
