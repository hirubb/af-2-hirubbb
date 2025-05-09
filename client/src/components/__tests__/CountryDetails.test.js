// src/components/__tests__/CountryDetails.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryDetails from '../CountryDetails';
import { useParams, Link, useNavigate } from 'react-router-dom';

const mockCountry = {
  name: { common: 'Japan' },
  capital: ['Tokyo'],
  region: 'Asia',
  population: 125960000,
  flags: { png: 'https://flagcdn.com/jp.png', alt: 'Flag of Japan' },
  languages: { jpn: 'Japanese' },
};

describe('CountryDetails Component', () => {
  test('renders all country details correctly', () => {
    render(<CountryDetails country={mockCountry} />);

    // Check country name
    expect(screen.getByText(/Japan/i)).toBeInTheDocument();

    // Check capital
    expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();

    // Check region
    expect(screen.getByText(/Asia/i)).toBeInTheDocument();

    // Check population
    expect(screen.getByText(/125960000/)).toBeInTheDocument();

    // Check language
    expect(screen.getByText(/Japanese/i)).toBeInTheDocument();

    // Check flag image
    const flag = screen.getByAltText(/Flag of Japan/i);
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveAttribute('src', mockCountry.flags.png);
  });
});
