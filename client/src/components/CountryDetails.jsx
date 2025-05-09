import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/country-service';
import { Heart, Share2, ArrowLeft, Globe, Map, Info, Download, Star, Home } from 'lucide-react';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Check if country is in favorites on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    setIsFavorite(favorites.some(fav => fav.code === code));
  }, [code]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(code);
        setCountry(data[0]);
        document.title = `${data[0]?.name.common || 'Country'} | Countries Explorer`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();

    return () => {
      document.title = 'Countries Explorer';
    };
  }, [code]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.code !== code);
      localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      const updatedFavorites = [
        ...favorites, 
        { 
          code, 
          name: country.name.common, 
          flag: country.flags.svg,
          region: country.region
        }
      ];
      localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const shareViaLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Use a more modern toast notification instead of alert
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = 'Link copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    }, 10);
    setShowShareOptions(false);
  };

  const downloadCountryInfo = () => {
    // Create a text file with country info
    const countryData = `
      Country: ${country.name.common}
      Official Name: ${country.name.official}
      Population: ${country.population.toLocaleString()}
      Region: ${country.region}
      Sub Region: ${country.subregion || 'N/A'}
      Capital: ${country.capital?.[0] || 'N/A'}
      Languages: ${Object.values(country.languages || {}).join(', ')}
      Currencies: ${Object.values(country.currencies || {}).map(c => `${c.name} (${c.symbol || 'N/A'})`).join(', ')}
      Area: ${country.area?.toLocaleString() || 'N/A'} km²
      Time Zones: ${country.timezones?.join(', ') || 'N/A'}
      Driving Side: ${country.car?.side || 'N/A'}
      UN Member: ${country.unMember ? 'Yes' : 'No'}
    `;
    
    const blob = new Blob([countryData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${country.name.common}-info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#0c1424' }}>
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-3 text-light">Loading country information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5" style={{ background: '#0c1424', minHeight: '100vh', color: '#fff' }}>
        <div className="alert p-4 rounded-lg shadow" style={{ background: '#1e293b', border: '1px solid #384766', color: '#e2e8f0' }}>
          <h4 className="alert-heading text-danger">Error Loading Country</h4>
          <p>{error}</p>
          <hr style={{ borderColor: '#384766' }} />
          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-outline-info" 
              onClick={() => navigate('/')}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container py-5" style={{ background: '#0c1424', minHeight: '100vh', color: '#fff' }}>
        <div className="alert p-4 rounded-lg shadow" style={{ background: '#1e293b', border: '1px solid #384766', color: '#e2e8f0' }}>
          <h4 className="alert-heading text-warning">Country Not Found</h4>
          <p>We couldn't find information for the requested country.</p>
          <hr style={{ borderColor: '#384766' }} />
          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-outline-info" 
              onClick={() => navigate('/')}
            >
              Browse All Countries
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Extract languages as an array
  const languages = country.languages ? Object.values(country.languages) : [];
  // Get currency information
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || 'N/A'})`)
    : [];

  return (
    <div style={{ background: '#0c1424', minHeight: '100vh', color: '#e2e8f0', paddingBottom: '2rem' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/" className="btn btn-outline-info d-flex align-items-center gap-2">
            <ArrowLeft size={18} />
            Back to Countries
          </Link>
          
          <div className="d-flex gap-2">
            <button 
              onClick={toggleFavorite} 
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'} d-flex align-items-center gap-1`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={18} fill={isFavorite ? "#fff" : "none"} />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </button>
            
            <div className="dropdown">
              <button 
                onClick={handleShare}
                className="btn btn-outline-info d-flex align-items-center gap-1"
              >
                <Share2 size={18} />
                Share
              </button>
              
              {showShareOptions && (
                <div className="dropdown-menu show shadow" style={{ 
                  minWidth: '200px', 
                  right: 0, 
                  background: '#1e293b', 
                  border: '1px solid #384766' 
                }}>
                  <button className="dropdown-item text-light" style={{ 
                    hover: { background: '#2c3e50' }
                  }} onClick={shareViaLink}>
                    Copy Link
                  </button>
                  <button className="dropdown-item text-light" onClick={() => 
                    window.open(`https://twitter.com/intent/tweet?text=Check out ${country.name.common}&url=${window.location.href}`)
                  }>
                    Share on Twitter
                  </button>
                  <button className="dropdown-item text-light" onClick={() => 
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)
                  }>
                    Share on Facebook
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={downloadCountryInfo} 
              className="btn btn-outline-success d-flex align-items-center gap-1"
              title="Download country information"
            >
              <Download size={18} />
              Save Info
            </button>
          </div>
        </div>
        
        <div className="card shadow-lg border-0 overflow-hidden" style={{ 
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px'
        }}>
          <div className="row g-0">
            <div className="col-md-5">
              <div className="position-relative h-100">
                <img 
                  src={country.flags.svg} 
                  alt={`Flag of ${country.name.common}`}
                  className="w-100 h-100 object-fit-cover"
                  style={{ objectFit: 'cover' }}
                />
                {country.coatOfArms?.svg && (
                  <div className="position-absolute bottom-0 end-0 p-2">
                    <img 
                      src={country.coatOfArms.svg} 
                      alt={`Coat of arms of ${country.name.common}`}
                      style={{ width: '60px', height: '60px' }}
                      className="bg-white rounded-circle p-1"
                      title="National Coat of Arms"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-md-7">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h1 className="mb-2 text-info">{country.name.common}</h1>
                  {country.independent && (
                    <span className="badge" style={{ background: '#06b6d4' }}>Independent Nation</span>
                  )}
                </div>
                
                <p className="text-white mb-4">{country.name.official}</p>
                
                <ul className="nav nav-tabs" id="countryTab" role="tablist" style={{ borderBottom: '1px solid #384766' }}>
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link ${activeTab === 'overview' ? 'active' : ''} d-flex align-items-center gap-1`}
                      onClick={() => setActiveTab('overview')}
                      style={{ 
                        background: activeTab === 'overview' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                        color: activeTab === 'overview' ? '#06b6d4' : '#9ca3af',
                        border: 'none',
                        borderBottom: activeTab === 'overview' ? '2px solid #06b6d4' : 'none'
                      }}
                    >
                      <Info size={16} />
                      Overview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link ${activeTab === 'details' ? 'active' : ''} d-flex align-items-center gap-1`}
                      onClick={() => setActiveTab('details')}
                      style={{ 
                        background: activeTab === 'details' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                        color: activeTab === 'details' ? '#06b6d4' : '#9ca3af',
                        border: 'none',
                        borderBottom: activeTab === 'details' ? '2px solid #06b6d4' : 'none'
                      }}
                    >
                      <Globe size={16} />
                      Details
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link ${activeTab === 'map' ? 'active' : ''} d-flex align-items-center gap-1`}
                      onClick={() => setActiveTab('map')}
                      style={{ 
                        background: activeTab === 'map' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                        color: activeTab === 'map' ? '#06b6d4' : '#9ca3af',
                        border: 'none',
                        borderBottom: activeTab === 'map' ? '2px solid #06b6d4' : 'none'
                      }}
                    >
                      <Map size={16} />
                      Map
                    </button>
                  </li>
                </ul>
                
                <div className="tab-content pt-4" id="countryTabContent">
                  {activeTab === 'overview' && (
                    <div className="row">
                      <div className="col-md-6">
                        <p className="text-white mb-4"><strong className="text-info">Population:</strong> {country.population.toLocaleString()}</p>
                        <p className="text-white mb-4"><strong className="text-info">Region:</strong> {country.region}</p>
                        <p className="text-white mb-4"><strong className="text-info">Sub Region:</strong> {country.subregion || 'N/A'}</p>
                        <p className="text-white mb-4"><strong className="text-info">Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="text-white mb-4"><strong className="text-info">Top Level Domain:</strong> {country.tld?.[0] || 'N/A'}</p>
                        <p className="text-white mb-4"><strong className="text-info">Languages:</strong> {languages.join(', ') || 'N/A'}</p>
                        <p className="text-white mb-4"><strong className="text-info">Currency:</strong> {currencies.join(', ') || 'N/A'}</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'details' && (
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="text-white mb-4"><strong className="text-info">Area:</strong> {country.area?.toLocaleString() || 'N/A'} km²</p>
                          <p className="text-white mb-4"><strong className="text-info">Time Zones:</strong> {country.timezones?.join(', ') || 'N/A'}</p>
                          <p className="text-white mb-4"><strong className="text-info">Driving Side:</strong> {country.car?.side || 'N/A'}</p>
                          <p className="text-white mb-4"><strong className="text-info">UN Member:</strong> {country.unMember ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="col-md-6">
                          <p className="text-white mb-4"><strong className="text-info">FIFA Code:</strong> {country.fifa || 'N/A'}</p>
                          <p className="text-white mb-4"><strong className="text-info">Start of Week:</strong> {country.startOfWeek || 'N/A'}</p>
                          <p className="text-white mb-4"><strong className="text-info">International Calling Code:</strong> {country.idd?.root}{country.idd?.suffixes?.[0] || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 rounded" style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                        <div className="d-flex align-items-center mb-2">
                          <Star size={16} className="text-warning me-2" />
                          <h6 className="text-info mb-0">Did you know?</h6>
                        </div>
                        <p className="text-white mb-4 small">
                          {country.name.common} {country.independent ? 'is an independent country' : 'is not an independent country'} 
                          {country.landlocked ? ' and is landlocked.' : ' with access to the sea.'}
                          {country.population > 100000000 ? ' It is one of the most populous countries in the world.' : 
                           country.population < 1000000 ? ' It has a relatively small population.' : ''}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'map' && (
                    <div>
                      <p className="mb-3">
                        <a 
                          href={country.maps?.googleMaps} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-sm me-2"
                          style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', border: '1px solid #06b6d4' }}
                        >
                          Open in Google Maps
                        </a>
                        <a 
                          href={country.maps?.openStreetMaps} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-sm"
                          style={{ background: 'rgba(148, 163, 184, 0.2)', color: '#94a3b8', border: '1px solid #94a3b8' }}
                        >
                          Open in OpenStreetMap
                        </a>
                      </p>
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe 
                          title={`Map of ${country.name.common}`}
                          src={`https://maps.google.com/maps?q=${country.latlng?.[0]},${country.latlng?.[1]}&z=5&output=embed`}
                          className="embed-responsive-item border-0"
                          style={{ width: '100%', height: '300px', borderRadius: '8px' }}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
                
                {country.borders && country.borders.length > 0 && (
                  <div className="mt-4">
                    <h5 className="border-bottom pb-2 text-info" style={{ borderColor: '#384766' }}>Border Countries:</h5>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {country.borders.map(border => (
                        <Link 
                          key={border}
                          to={`/country/${border}`}
                          className="btn btn-sm"
                          style={{ 
                            background: 'rgba(6, 182, 212, 0.1)', 
                            color: '#06b6d4',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(6, 182, 212, 0.3)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                          }}
                        >
                          {border}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Toast Notification CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(6, 182, 212, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
          }
          .toast-notification.show {
            transform: translateY(0);
            opacity: 1;
          }
          .dropdown-item:hover {
            background-color: rgba(6, 182, 212, 0.2) !important;
          }
        `
      }} />
    </div>
  );
};

export default CountryDetails;