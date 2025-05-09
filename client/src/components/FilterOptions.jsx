import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const FilterOptions = ({ onFilterChange }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="mb-4 position-relative" style={{ maxWidth: '300px', margin: '0 auto' }}>
      <div className="position-relative">
        <select 
          className="form-select shadow-sm" 
          onChange={(e) => onFilterChange(e.target.value)}
          defaultValue=""
          style={{
            padding: '12px 40px 12px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            color: 'black',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            fontWeight: '700',
            border: '1px solid #ced4da',
          }}
        >
          <option value="" disabled>🌍 Filter by Region</option>
          {regions.map(region => (
            <option key={region} value={region.toLowerCase()}>
              {region}
            </option>
          ))}
        </select>

        {/* Chevron icon overlay */}
        <FaChevronDown 
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: '#555',
          }}
        />
      </div>
    </div>
  );
};

export default FilterOptions;
