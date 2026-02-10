import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const {
    id = 1,
    title = 'Property',
    price = 0,
    address = 'Address not available',
    beds = 0,
    baths = 0,
    area = 0,
    image = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
    type = 'House',
    featured = false
  } = property || {};

  return (
    <div className={`property-card ${featured ? 'featured' : ''}`}>
      <div className="property-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="property-badges">
          <span className="property-type">{type}</span>
          {featured && <span className="featured-badge">Featured</span>}
        </div>
        <div className="property-price-tag">
          ${price.toLocaleString()}
        </div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">{title}</h3>
        <div className="property-location">
          <FaMapMarkerAlt />
          <span>{address}</span>
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
            <span>{area.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="property-footer">
          <Link to={`/properties/${id}`} className="btn btn-primary view-details-btn">
            View Details
          </Link>
          <button className="btn-favorite" aria-label="Add to favorites">
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;