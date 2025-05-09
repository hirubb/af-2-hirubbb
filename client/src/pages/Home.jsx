import React from 'react';
import Banner from '../components/Banner';
import FilterOptions from '../components/FilterOptions';
import CountryList from '../components/CountryList';
import { useCountries } from '../hooks/useCountries';

const Home = () => {
  const { countries, loading, error, searchCountries, filterByRegion } = useCountries();

  return (
    <div className="container-fluid px-0">
      <Banner onSearch={searchCountries} />
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-md-6 ms-auto">
            <FilterOptions onFilterChange={filterByRegion} />
          </div>
        </div>
        
        <CountryList countries={countries} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Home;