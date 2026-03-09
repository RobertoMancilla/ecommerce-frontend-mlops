function Filters({ categories, onFilter, selectedCategory }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      gap: '12px', /* Adds the separation between category tags */
      width: '100%',
      marginTop: '16px'
    }}>
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onFilter(cat)}
            style={{
              padding: "8px 16px",
              backgroundColor: isActive ? "#333333" : "#FFFFFF",
              color: isActive ? "#FFFFFF" : "#333333",
              border: isActive ? "1px solid #333333" : "1px solid #DDDDDD",
              borderRadius: "20px", /* Makes them look like pill tags */
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem",
              transition: "0.2s"
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  )
}

export default Filters