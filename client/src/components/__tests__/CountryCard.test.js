import { render, screen } from '@testing-library/react';
import CountryCard from '../CountryCard';
import { Link } from 'react-router-dom';


const mockCountry = {
  name: { common: 'Canada' },
  population: 38000000,
  region: 'Americas',
  flags: { png: 'https://flagcdn.com/ca.png', alt: 'Flag of Canada' },
};

test('renders country card with correct data', () => {
  render(<CountryCard country={mockCountry} />);

  expect(screen.getByText('Canada')).toBeInTheDocument();
  expect(screen.getByText(/Americas/i)).toBeInTheDocument();
  expect(screen.getByAltText(/flag of canada/i)).toBeInTheDocument();
});
