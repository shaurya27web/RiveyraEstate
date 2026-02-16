import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import useCounter from '../../../../hooks/useCounter';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef(null);
  
  // Destructure from MongoDB schema structure
  const {
    _id,
    title = 'Property',
    price = 0,
    location = {},
    features = {},
    images = [],
    propertyType = 'House',
    featured = false
  } = property || {};

  // Get values from the nested objects
  const address = location?.address || 'Address not available';
  const city = location?.city || '';
  const state = location?.state || '';
  const beds = features?.bedrooms || 0;
  const baths = features?.bathrooms || 0;
  const area = features?.area || 0;
  const image = images?.[0]?.url || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop';

  // Counters - only start when card is visible
  const animatedPrice = useCounter(isCardVisible ? price : 0, 2500);
  const animatedArea = useCounter(isCardVisible ? area : 0, 2200);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCardVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Format location string
  const locationString = city && state ? `${city}, ${state}` : address;

  return (
    <div className={`property-card ${featured ? 'featured' : ''}`} ref={cardRef}>
      <div className="property-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="property-badges">
          <span className="property-type">{propertyType}</span>
          {featured && <span className="featured-badge">Featured</span>}
        </div>
        <div className="property-price-tag">
          ${isCardVisible ? formatNumber(animatedPrice) : '0'}
        </div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">{title}</h3>
        <div className="property-location">
          <FaMapMarkerAlt />
          <span>{locationString}</span>
        </div>
        
        <div className="property-features">
          <div className="feature">
            <FaBed className="feature-icon" />
            <span>{beds} {beds === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="feature">
            <FaBath className="feature-icon" />
            <span>{baths} {baths === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="feature">
            <FaRulerCombined className="feature-icon" />
            <span>{isCardVisible ? animatedArea.toLocaleString() : '0'} sqft</span>
          </div>
        </div>
        
        <div className="property-footer">
          <Link to={`/properties/${_id}`} className="btn btn-primary view-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;