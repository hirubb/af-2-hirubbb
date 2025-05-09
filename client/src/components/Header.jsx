import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
  
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    // Check if user is logged in with a valid token
    const token = localStorage.getItem('token');
    setLoggedIn(token && isTokenValid(token));
  
    handleResize(); // Call it initially
  
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set up a token check interval
  useEffect(() => {
    // Check token validity periodically
    const tokenCheckInterval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token || !isTokenValid(token)) {
        setLoggedIn(false);
      }
    }, 60000); // Check every minute
    
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header 
      className={`${scrolled ? 'py-2 shadow-lg' : 'py-3'}`}
      style={{
        background: 'transparent',
        transition: 'all 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
       
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Link 
          to="/" 
          className="text-decoration-none d-flex align-items-center"
        >
          <div className="d-flex align-items-center">
            <span 
              className="me-2" 
              style={{ 
                fontSize: '4.8rem',
                color: 'white',
                textShadow: '0 0 10px rgba(0, 240, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.5)'
              }}
            >
             <i className="bi bi-globe-americas"></i>
            </span>
            <h1 
              style={{ 
                fontSize: `${scrolled ? '1.3rem' : '1.5rem'}`,
                margin: 0,
                fontWeight: 700,
                color: 'white',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                textShadow: '0 0 5px rgba(0, 240, 255, 0.3)'
              }}
            >
              WorldScope
            </h1>
          </div>
        </Link>
        
        {/* Hamburger icon - Only displays on mobile */}
        {isMobile ? (
          <div className="d-flex align-items-center">
            <button
              className="btn text-white border-0"
              onClick={toggleMenu}
              style={{
                fontSize: '1.8rem',
                outline: 'none',
                boxShadow: 'none'
              }}
            >
              <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
            
            {/* Mobile Menu - Shows when hamburger is clicked */}
            {menuOpen && (
              <div 
                className="position-absolute bg-dark"
                style={{
                  right: '15px',
                  top: '100%',
                  width: '200px',
                  zIndex: 1001,
                  borderRadius: '8px',
                  padding: '1rem',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(0, 240, 255, 0.3)'
                }}
              >
                <ul className="list-unstyled mb-0">
                  <li className="mb-3">
                    <Link 
                      to="/" 
                      className="text-decoration-none d-block py-2"
                      style={{
                        color: isActive('/') ? '#00f0ff' : 'white',
                        fontWeight: 500,
                      }}
                      onClick={toggleMenu}
                    >
                      <i className="bi bi-house me-2"></i>
                      Home
                    </Link>
                  </li>
                  {loggedIn && (
                    <li className="mb-3">
                      <Link 
                        to="/favorites" 
                        className="text-decoration-none d-block py-2"
                        style={{
                          color: isActive('/favorites') ? '#00f0ff' : 'white',
                          fontWeight: 500,
                        }}
                        onClick={toggleMenu}
                      >
                        <i className="bi bi-heart me-2"></i>
                        Favorites
                      </Link>
                    </li>
                  )}
                  <li>
                    {loggedIn ? (
                      <Link 
                        to="/profile" 
                        className="text-decoration-none d-block py-2"
                        style={{
                          color: isActive('/profile') ? '#00f0ff' : 'white',
                          fontWeight: 500,
                        }}
                        onClick={toggleMenu}
                      >
                        <i className="bi bi-person-circle me-2"></i>
                        Profile
                      </Link>
                    ) : (
                      <Link 
                        to="/login" 
                        className="btn w-100 py-2"
                        style={{
                          backgroundColor: isActive('/login') ? '#00f0ff' : 'transparent',
                          color: isActive('/login') ? '#000' : '#00f0ff',
                          border: '1px solid #00f0ff',
                          borderRadius: '50px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                        }}
                        onClick={toggleMenu}
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <nav>
            <ul className="d-flex list-unstyled mb-0 align-items-center">
              <li className="ms-4">
                <Link 
                  to="/" 
                  className="text-decoration-none position-relative px-2 py-1"
                  style={{
                    color: isActive('/') ? '#00f0ff' : 'white',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Home</span>
                  {isActive('/') && (
                    <span 
                      className="position-absolute" 
                      style={{
                        height: '2px',
                        width: '100%',
                        background: '#00f0ff',
                        bottom: '-3px',
                        left: 0,
                        boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)'
                      }}
                    ></span>
                  )}
                </Link>
              </li>
              {loggedIn && (
                <li className="ms-4">
                  <Link 
                    to="/favourites" 
                    className="text-decoration-none d-flex align-items-center"
                    style={{
                      fontSize: '1.2rem',
                      color: 'white',
                      textShadow: '0 0 5px rgba(0, 240, 255, 0.5)',
                    }}
                  >
                    <i className="bi bi-heart" style={{ fontSize: '1.5rem' }}></i>
                  </Link>
                </li>
              )}
              <li className="ms-4">
                {loggedIn ? (
                  <Link 
                    to="/profile" 
                    className="text-decoration-none d-flex align-items-center"
                    style={{
                      fontSize: '1.2rem',
                      color: 'white',
                      textShadow: '0 0 5px rgba(0, 240, 255, 0.5)',
                    }}
                  >
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                    <span className="ms-2">Profile</span>
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="btn px-3 py-2"
                    style={{
                      backgroundColor: isActive('/login') ? '#00f0ff' : 'transparent',
                      color: isActive('/login') ? '#000' : '#00f0ff',
                      border: '1px solid #00f0ff',
                      borderRadius: '50px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;