import { useState } from 'react';
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="search-input"
        placeholder="Search for products..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        type="submit"
        className="search-button"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;