import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      gap: '8px', 
      width: '100%', /* Forces it to be wide */
      maxWidth: '800px' /* Prevents it from being TOO ridiculously wide on giant screens */
    }}>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          flexGrow: 1, /* Makes the input box take all remaining space */
          padding: '12px 16px',
          borderRadius: '4px',
          border: '1px solid #DDDDDD',
          fontSize: '1rem',
          outline: 'none'
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '0 24px',
          backgroundColor: '#333333',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;