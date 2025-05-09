import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchTerm) {
        setSearchTerm('');
        onSearch('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm, onSearch]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`search-form shadow-md ${isFocused ? 'search-focused' : ''}`}
      style={{
        transition: 'all 0.3s ease',
        transform: isFocused ? 'scale(1.03)' : 'scale(1)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.25)',
        borderRadius: '2rem',
        padding: '0.5rem',
      }}
    >
      <div className="input-group align-items-center" style={{ background: 'transparent', borderRadius: '2rem' }}>
        <span className="input-group-text bg-transparent border-0">
          <i className="bi bi-search text-white" style={{ opacity: '0.9' }}></i>
        </span>
        <input
          type="text"
          className="form-control form-control-lg bg-transparent border-0"
          placeholder="Search for any country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search for a country"
          style={{
            boxShadow: 'none',
            fontSize: '1rem',
            padding: '0.75rem 1rem',
            color: 'white',
          }}
        />
        {searchTerm && (
          <button 
            type="button" 
            className="btn btn-outline-light border-0"
            onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}
            style={{
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem',
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
        <button 
          className="btn btn-primary px-4 py-2"
          type="submit"
          style={{
            borderRadius: '2rem',
            fontWeight: '500',
            transition: 'all 0.2s ease',
          }}
        >
          Search
        </button>
      </div>

      <style>
        {`
        .search-form {
          overflow: hidden;
        }
        .search-focused {
          box-shadow: 0 0 10px rgba(13, 110, 253, 5.4);
        }
        .input-group-text {
          border: none;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(13, 110, 253, 0.4);
        }
        ::placeholder {
          color: rgba(255, 255, 255, 0.8) !important;
          opacity: 1;
        }
        `}
      </style>
    </form>
  );
};

export default SearchBar;