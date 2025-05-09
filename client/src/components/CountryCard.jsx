import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <div className="card h-100" style={styles.card}>
      <img 
        src={country.flags.png} 
        className="card-img-top" 
        alt={`Flag of ${country.name.common}`}
        style={styles.image}
      />
      <div className="card-body" style={styles.cardBody}>
        <h5 className="card-title" style={styles.cardTitle}>{country.name.common}</h5>
        <ul className="list-unstyled">
          <li><strong>Population:</strong> {country.population.toLocaleString()}</li>
          <li><strong>Region:</strong> {country.region}</li>
          <li><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</li>
        </ul>
        <Link to={`/country/${country.cca3}`} className="btn btn-primary mt-2" style={styles.button}>
          More Details
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
    border: 'none',
    borderRadius: '15px', // Rounded corners
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Soft shadow
    color: 'white',
    cursor: 'pointer', // Adds pointer cursor to indicate hover
  },
  cardBody: {
    padding: '20px',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#fff', // White text for better contrast
    marginBottom: '15px',
  },
  image: {
    height: '160px',
    objectFit: 'cover',
    borderRadius: '15px 15px 0 0', // Rounded top corners
  },
  button: {
    backgroundColor: '#00f0ff',
    borderRadius: '50px',
    padding: '10px 20px',
    fontWeight: 'bold',
    color: 'black',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    textDecoration: 'none',
  },
};

// Adding hover effect for both the card and button
const hoverStyles = {
  ':hover': {
    transform: 'scale(1.05)', // Slightly enlarge the card on hover
    boxShadow: '0 0 15px rgba(0, 240, 255, 0.8)', // Neon blue glow on hover
    background: 'rgba(0, 0, 0, 0.8)', // Slightly darker background on hover
  },
  '.btn': {
    backgroundColor: '#00f0ff', 
    color: 'black',
    boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)', // Neon glow for button
  }
};

export default CountryCard;
