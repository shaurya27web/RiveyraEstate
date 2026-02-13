import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../../../property/PropertyCard/PropertyCard';
import './FeaturedProperties.css';

const FeaturedProperties = ({ properties = [] }) => {
  
  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="section featured-properties">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">
            Discover our handpicked selection of premium properties
          </p>
        </div>
        
        {featuredProperties.length > 0 ? (
          <>
            <div className="properties-grid">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            <div className="view-all-container">
              
            </div>
          </>
        ) : (
          <p className="no-properties">No featured properties available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;