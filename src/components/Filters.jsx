import "./Filters.css";

function Filters({ categories, onFilter, selectedCategory }) {
  return (
    <div className="filters-container">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onFilter(cat)}
            className={`filter-button ${isActive ? 'active' : ''}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  )
}

export default Filters