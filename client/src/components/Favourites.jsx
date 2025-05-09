import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

function Favourites() {
  const [favoriteCountries, setFavoriteCountries] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    setFavoriteCountries(storedFavorites);
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Favorite Countries</h2>
      {favoriteCountries.length === 0 ? (
        <p>No favorite countries saved yet.</p>
      ) : (
        <Row>
          {favoriteCountries.map((country) => (
            <Col md={4} sm={6} xs={12} key={country.code} className="mb-4">
              <Card>
                <Card.Img variant="top" src={country.flag} alt={`Flag of ${country.name}`} />
                <Card.Body>
                  <Card.Title>{country.name}</Card.Title>
                  <Card.Text>Region: {country.region}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favourites;
