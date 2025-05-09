import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0, 240, 255, 0.2)',
        color: 'white',
        padding: '2rem 0',
        marginTop: '4rem',
        boxShadow: '0 -5px 15px rgba(0, 240, 255, 0.1)',
      }}
    >
      <div className="container">
        <div className="row">
          {/* Logo and description */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <span 
                className="me-2" 
                style={{ 
                  fontSize: '2.5rem',
                  color: 'white',
                  textShadow: '0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5)'
                }}
              >
                <i className="bi bi-globe-americas"></i>
              </span>
              <h3 
                style={{ 
                  margin: 0,
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '1px',
                  textShadow: '0 0 5px rgba(0, 240, 255, 0.3)'
                }}
              >
                WorldScope
              </h3>
            </div>
            <p className="text-light mb-3" style={{ fontSize: '0.95rem' }}>
              Explore the world from the comfort of your screen. WorldScope brings you comprehensive information about every country on Earth.
            </p>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3" style={{ color: 'white', fontSize: '1.3rem' }}>
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3" style={{ color: 'white', fontSize: '1.3rem' }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3" style={{ color: 'white', fontSize: '1.3rem' }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.3rem' }}>
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="col-lg-2 col-md-4 col-6 mb-4 mb-md-0">
            <h5 style={{ color: '#00f0ff', fontSize: '1.1rem', fontWeight: 600 }}>Explore</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/regions" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Regions</Link>
              </li>
              <li className="mb-2">
                <Link to="/favorites" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Favorites</Link>
              </li>
              <li className="mb-2">
                <Link to="/compare" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Compare Countries</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-lg-2 col-md-4 col-6 mb-4 mb-md-0">
            <h5 style={{ color: '#00f0ff', fontSize: '1.1rem', fontWeight: 600 }}>Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/data-sources" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Data Sources</Link>
              </li>
              <li className="mb-2">
                <Link to="/api" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>API Access</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Blog</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-lg-2 col-md-4 col-sm-6 mb-4 mb-md-0">
            <h5 style={{ color: '#00f0ff', fontSize: '1.1rem', fontWeight: 600 }}>Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/privacy" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Terms of Use</Link>
              </li>
              <li className="mb-2">
                <Link to="/cookies" className="text-decoration-none text-light" style={{ fontSize: '0.95rem' }}>Cookie Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-lg-2 col-md-6">
            <h5 style={{ color: '#00f0ff', fontSize: '1.1rem', fontWeight: 600 }}>Stay Updated</h5>
            <p className="text-light mb-3" style={{ fontSize: '0.95rem' }}>
              Subscribe to our newsletter for the latest updates.
            </p>
            <form>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email address" 
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
                <button 
                  className="btn" 
                  type="submit"
                  style={{
                    backgroundColor: '#00f0ff',
                    color: '#000',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div 
          className="mt-4 pt-3 text-center"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.9rem'
          }}
        >
          <p className="mb-0">
            © {currentYear} WorldScope. All rights reserved. 
            <span className="mx-2">|</span> 
            <span style={{ fontSize: '0.85rem' }}>Made with <i className="bi bi-heart-fill text-danger"></i> for global explorers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;