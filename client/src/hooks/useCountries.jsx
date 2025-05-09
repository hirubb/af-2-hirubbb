import { useState, useEffect } from 'react';
import { getAllCountries, getCountriesByRegion, getCountryByName } from '../services/country-service';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const searchCountries = async (term) => {
    if (!term) {
      setFilteredCountries(countries);
      return;
    }
    
    try {
      setLoading(true);
      const data = await getCountryByName(term);
      setFilteredCountries(data);
    } catch (err) {
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByRegion = async (region) => {
    if (!region) {
      setFilteredCountries(countries);
      return;
    }
    
    try {
      setLoading(true);
      const data = await getCountriesByRegion(region);
      setFilteredCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    countries: filteredCountries,
    loading,
    error,
    searchCountries,
    filterByRegion
  };
};