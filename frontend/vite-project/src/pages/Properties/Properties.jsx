import React, { useState } from 'react';
import PropertyCard from '../../components/common/property/PropertyCard/PropertyCard';
import { 
  FaFilter, FaSortAmountDown, FaSortAmountUp, 
  FaMapMarkerAlt, FaBed, FaBath 
} from 'react-icons/fa';
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Modern Villa with Ocean View',
      price: 850000,
      address: '123 Beach Blvd, Miami, FL',
      beds: 4,
      baths: 3,
      area: 3200,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop',
      type: 'Villa',
      featured: true
    },
    {
      id: 2,
      title: 'Downtown Luxury Apartment',
      price: 450000,
      address: '456 Downtown St, New York, NY',
      beds: 2,
      baths: 2,
      area: 1200,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      type: 'Apartment',
      featured: false
    },
    {
      id: 3,
      title: 'Family Home in Suburbs',
      price: 650000,
      address: '789 Suburb Ln, Austin, TX',
      beds: 3,
      baths: 2,
      area: 2200,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      type: 'House',
      featured: true
    },
    {
      id: 4,
      title: 'Modern Loft Studio',
      price: 320000,
      address: '321 Arts District, Portland, OR',
      beds: 1,
      baths: 1,
      area: 900,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop',
      type: 'Studio',
      featured: false
    },
    {
      id: 5,
      title: 'Luxury Penthouse Suite',
      price: 1200000,
      address: '789 Skyline Dr, Los Angeles, CA',
      beds: 3,
      baths: 3,
      area: 2800,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
      type: 'Penthouse',
      featured: true
    },
    {
      id: 6,
      title: 'Cozy Cottage Retreat',
      price: 275000,
      address: '456 Mountain Rd, Denver, CO',
      beds: 2,
      baths: 1,
      area: 1100,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
      type: 'Cottage',
      featured: false
    },
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    beds: 'any',
    baths: 'any',
    minPrice: '',
    maxPrice: ''
  });

  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const propertyTypes = ['All', 'House', 'Apartment', 'Villa', 'Studio', 'Penthouse', 'Cottage'];
  const bedOptions = ['Any', '1', '2', '3', '4+'];
  const bathOptions = ['Any', '1', '2', '3', '4+'];

  return (
    <div className="properties-page">
      <section className="properties-hero">
        <div className="container">
          <h1 className="page-title">Browse Properties</h1>
          <p className="page-subtitle">
            Discover your perfect home from our curated collection
          </p>
        </div>
      </section>

      <div className="container">
        <div className="properties-container">
          <aside className={`properties-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="sidebar-header">
              <h3><FaFilter /> Filter Properties</h3>
              <button 
                className="close-filters" 
                onClick={() => setShowFilters(false)}
              >
                ×
              </button>
            </div>

            <div className="filter-section">
              <h4>Property Type</h4>
              <div className="filter-options">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    className={`filter-tag ${filters.type === type.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, type: type.toLowerCase()})}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Bedrooms</h4>
              <div className="filter-options">
                {bedOptions.map((beds) => (
                  <button
                    key={beds}
                    className={`filter-tag ${filters.beds === beds.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, beds: beds.toLowerCase()})}
                  >
                    {beds}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Bathrooms</h4>
              <div className="filter-options">
                {bathOptions.map((baths) => (
                  <button
                    key={baths}
                    className={`filter-tag ${filters.baths === baths.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, baths: baths.toLowerCase()})}
                  >
                    {baths}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min Price"
                  className="price-input"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <span className="price-separator">-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  className="price-input"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>

            <button className="btn btn-primary apply-filters-btn">
              Apply Filters
            </button>
          </aside>

          <main className="properties-main">
            <div className="properties-header">
              <div className="results-info">
                <span className="results-count">{properties.length} Properties Found</span>
                <button 
                  className="btn-filter-mobile" 
                  onClick={() => setShowFilters(true)}
                >
                  <FaFilter /> Filters
                </button>
              </div>
              
              <div className="sort-options">
                <label>Sort by:</label>
                <select 
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="pagination">
              <button className="pagination-btn">← Previous</button>
              <div className="pagination-numbers">
                <button className="pagination-number active">1</button>
                <button className="pagination-number">2</button>
                <button className="pagination-number">3</button>
                <span>...</span>
                <button className="pagination-number">10</button>
              </div>
              <button className="pagination-btn">Next →</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Properties;