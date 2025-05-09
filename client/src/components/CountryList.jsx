import React from 'react';
import CountryCard from './CountryCard';

const CountryList = ({ countries, loading, error }) => {
  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (countries.length === 0) {
    return <div className="alert alert-info">No countries found.</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {countries.map(country => (
        <div className="col" key={country.cca3}>
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
};

export default CountryList;