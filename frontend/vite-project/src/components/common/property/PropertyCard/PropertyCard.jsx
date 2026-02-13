import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import useCounter from '../../../../hooks/useCounter';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef(null);
  
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
    featured = false,
    rating = 4.8,
    reviews = 124
  } = property || {};

  // Counters - only start when card is visible
  const animatedPrice = useCounter(isCardVisible ? price : 0, 1500);
  const animatedArea = useCounter(isCardVisible ? area : 0, 1200);
  const animatedRating = useCounter(isCardVisible ? rating * 10 : 0, 1000);
  const animatedReviews = useCounter(isCardVisible ? reviews : 0, 1200);

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
  const formatRating = (num) => (num / 10).toFixed(1);

  return (
    <div className={`property-card ${featured ? 'featured' : ''}`} ref={cardRef}>
      <div className="property-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="property-badges">
          <span className="property-type">{type}</span>
          {featured && <span className="featured-badge">Featured</span>}
        </div>
        <div className="property-price-tag">
          ${isCardVisible ? formatNumber(animatedPrice) : '0'}
        </div>
      </div>
      
      <div className="property-content">
        <div className="property-rating">
          <span className="rating-stars">★</span>
          <span className="rating-value">{isCardVisible ? formatRating(animatedRating) : '0'}</span>
          <span className="rating-count">({isCardVisible ? animatedReviews : '0'} reviews)</span>
        </div>
        
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
            <span>{isCardVisible ? animatedArea.toLocaleString() : '0'} sqft</span>
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