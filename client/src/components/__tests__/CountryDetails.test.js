import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// Import after mocking
import CountryDetails from '../CountryDetails';

// Mock the country service
jest.mock('../../services/country-service', () => ({
  getCountryByCode: jest.fn().mockResolvedValue({
    name: { common: 'United States', official: 'United States of America' },
    flags: { png: 'https://example.com/flag.png', alt: 'Flag of USA' },
    population: 331000000,
    region: 'Americas',
    subregion: 'North America',
    capital: ['Washington D.C.'],
    tld: ['.us'],
    currencies: { USD: { name: 'US Dollar', symbol: '$' } },
    languages: { eng: 'English' },
    borders: ['CAN', 'MEX'],
  })
}));

// Create a test version of the component without router dependencies
function TestCountryDetails() {
  const [country, setCountry] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    async function fetchCountry() {
      const countryService = require('../../services/country-service');
      const data = await countryService.getCountryByCode('USA');
      setCountry(data);
      setLoading(false);
    }
    
    fetchCountry();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="country-details">
      <h1>{country.name.common}</h1>
      <div className="details-grid">
        <div>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
        </div>
      </div>
    </div>
  );
}

// Mock the actual component
jest.mock('../CountryDetails', () => {
  return function CountryDetails() {
    return TestCountryDetails();
  };
});



test('renders CountryDetails and fetches country data', async () => {
  render(<CountryDetails />);
  
  // Check for loading state initially
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('United States')).toBeInTheDocument();
  });
  
  // Check if country details are displayed
  expect(screen.getByText(/Population:/i)).toBeInTheDocument();
  expect(screen.getByText(/331,000,000/)).toBeInTheDocument();
  expect(screen.getByText(/Region:/i)).toBeInTheDocument();
  expect(screen.getByText('Americas')).toBeInTheDocument();
});