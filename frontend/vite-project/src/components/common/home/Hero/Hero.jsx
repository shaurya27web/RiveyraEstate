import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaBed, 
  FaMoneyBillWave, 
  FaFilter,
  FaTimes,
  FaArrowRight,
  FaHome,
  FaBuilding,
  FaCity
} from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [searchParams, setSearchParams] = useState({
    propertyType: 'buy',
    location: '',
    bedrooms: '',
    price: '',
    propertyCategory: ''
  });
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchCount, setSearchCount] = useState(12543);
  const [animateStats, setAnimateStats] = useState(false);

  const locationSuggestions = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Miami, FL',
    'Austin, TX',
    'Denver, CO',
    'Seattle, WA',
    'Boston, MA'
  ];

  const propertyCategories = [
    { icon: <FaHome />, label: 'House', value: 'house' },
    { icon: <FaBuilding />, label: 'Apartment', value: 'apartment' },
    { icon: <FaCity />, label: 'Commercial', value: 'commercial' },
    { icon: <FaHome />, label: 'Villa', value: 'villa' },
    { icon: <FaBuilding />, label: 'Condominium', value: 'condo' }
  ];

  // Animate stats on load
  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Searching for:', searchParams);
      alert(`Searching for ${searchParams.propertyType} properties in ${searchParams.location || 'any location'} with ${searchParams.bedrooms || 'any'} bedrooms`);
      setIsSearching(false);
      setSearchCount(prev => prev + 1);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
    
    if (name === 'location' && value.length > 2) {
      const filtered = locationSuggestions.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchParams(prev => ({ ...prev, location: suggestion }));
    setSuggestions([]);
  };

  const handlePropertyTypeClick = (type) => {
    setSearchParams(prev => ({ ...prev, propertyType: type }));
  };

  const handleCategoryClick = (category) => {
    setSearchParams(prev => ({ ...prev, propertyCategory: category }));
  };

  const clearFilters = () => {
    setSearchParams({
      propertyType: 'buy',
      location: '',
      bedrooms: '',
      price: '',
      propertyCategory: ''
    });
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your <span className="highlight">Dream Home</span> With Us
            </h1>
            <p className="hero-subtitle">
              Discover the perfect property that matches your lifestyle. 
              Browse thousands of listings with detailed information and 
              virtual tours.
            </p>
            
            <div className="hero-stats">
              <div className={`stat ${animateStats ? 'animated' : ''}`}>
                <span className="stat-number">{searchCount.toLocaleString()}+</span>
                <span className="stat-label">Successful Searches</span>
              </div>
              <div className={`stat ${animateStats ? 'animated' : ''}`} style={{animationDelay: '0.2s'}}>
                <span className="stat-number">500+</span>
                <span className="stat-label">Properties</span>
              </div>
              <div className={`stat ${animateStats ? 'animated' : ''}`} style={{animationDelay: '0.4s'}}>
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
          
          <div className="hero-search">
            <div className="search-header">
              <h3 className="search-title">Find Your Perfect Property</h3>
              <button 
                className="advanced-toggle" 
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <FaFilter /> {showAdvanced ? 'Hide' : 'Advanced'} Filters
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-tabs">
                {['buy', 'rent', 'sell'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`search-tab ${searchParams.propertyType === type ? 'active' : ''}`}
                    onClick={() => handlePropertyTypeClick(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="search-filters">
                {/* Location with autocomplete */}
                <div className="filter-group location-group">
                  <FaMapMarkerAlt className="filter-icon" />
                  <input 
                    type="text" 
                    name="location"
                    placeholder="City, State or ZIP"
                    className="filter-input"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                  {suggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <FaMapMarkerAlt />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Bedrooms */}
                <div className="filter-group">
                  <FaBed className="filter-icon" />
                  <select 
                    name="bedrooms"
                    className="filter-select"
                    value={searchParams.bedrooms}
                    onChange={handleInputChange}
                  >
                    <option value="">Any Beds</option>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>
                
                {/* Price */}
                <div className="filter-group">
                  <FaMoneyBillWave className="filter-icon" />
                  <select 
                    name="price"
                    className="filter-select"
                    value={searchParams.price}
                    onChange={handleInputChange}
                  >
                    <option value="">Any Price</option>
                    <option value="100000">$100,000</option>
                    <option value="300000">$300,000</option>
                    <option value="500000">$500,000</option>
                    <option value="750000">$750,000</option>
                    <option value="1000000">$1,000,000+</option>
                  </select>
                </div>
                
                {/* Advanced Filters */}
                {showAdvanced && (
                  <div className="advanced-filters animate-in">
                    <div className="property-categories">
                      <h4>Property Type</h4>
                      <div className="category-buttons">
                        {propertyCategories.map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            className={`category-btn ${searchParams.propertyCategory === category.value ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category.value)}
                          >
                            {category.icon}
                            <span>{category.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="advanced-actions">
                      <button 
                        type="button" 
                        className="btn-clear"
                        onClick={clearFilters}
                      >
                        <FaTimes /> Clear Filters
                      </button>
                    </div>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className={`btn btn-primary search-btn ${isSearching ? 'searching' : ''}`}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="spinner"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch /> Search Properties
                      <FaArrowRight className="arrow-icon" />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {/* Quick Stats Widget */}
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-value">1.2M+</span>
                <span className="stat-label">Properties Listed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Support Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">99%</span>
                <span className="stat-label">Accurate Listings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Properties Widget */}
      <div className="floating-properties">
        <div className="property-card floating-card">
          <div className="property-badge">New</div>
          <h4>Modern Penthouse</h4>
          <p>$1.2M • NYC</p>
        </div>
        <div className="property-card floating-card">
          <div className="property-badge">Hot</div>
          <h4>Beach Villa</h4>
          <p>$850K • Miami</p>
        </div>
        <div className="property-card floating-card">
          <div className="property-badge">Deal</div>
          <h4>Family Home</h4>
          <p>$550K • Austin</p>
        </div>
      </div>
      
      <div className="hero-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
      
      {/* Animated particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 7}s`
          }}></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;