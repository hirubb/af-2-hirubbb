import React from 'react';
import SearchBar from './SearchBar';
import backgroundImage from "../assests/website_thumbnail.png"; 

const Banner = ({ onSearch }) => {
  const headingText = "Come See The World";

  return (
    <div 
      className="banner text-center d-flex align-items-center justify-content-center mb-4"
      style={{
         //backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '600px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
         // backgroundColor: 'rgba(0, 0, 0, 0.5)' ,// 50% opacity
          
        }}
      ></div>
      
      <div 
        className="container position-relative"
        style={{ zIndex: 1 }}
      >
        <h1 className="display-4 text-white mb-4 hover-heading">
          {headingText.split("").map((char, index) => (
            <span
              key={index}
              className="hover-char"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="lead text-white mb-4">All the countries in one place</p>
        
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;