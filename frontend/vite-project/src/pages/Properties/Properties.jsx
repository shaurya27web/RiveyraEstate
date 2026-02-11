import React, { useState } from 'react';
import PropertyCard from '../../components/common/property/PropertyCard/PropertyCard';
import { FaHome, FaBuilding, FaCity } from 'react-icons/fa';
import { MdApartment, MdCottage } from 'react-icons/md';
import { GiVillage } from 'react-icons/gi';
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
      featured: true,
      tags: ['Ocean View', 'Pool', 'Garage']
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
      featured: false,
      tags: ['City View', 'Gym', 'Concierge']
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
      featured: true,
      tags: ['Garden', 'Garage', 'Pet Friendly']
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
      featured: false,
      tags: ['Loft', 'Arts District', 'Modern']
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
      featured: true,
      tags: ['Rooftop', 'Panoramic', 'Luxury']
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
      featured: false,
      tags: ['Mountain', 'Fireplace', 'Secluded']
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const propertyTypes = [
    { value: 'all', label: 'All Properties', icon: <FaHome /> },
    { value: 'house', label: 'Houses', icon: <FaHome /> },
    { value: 'apartment', label: 'Apartments', icon: <MdApartment /> },
    { value: 'villa', label: 'Villas', icon: <GiVillage /> },
    { value: 'studio', label: 'Studios', icon: <FaBuilding /> },
    { value: 'penthouse', label: 'Penthouses', icon: <FaCity /> },
    { value: 'cottage', label: 'Cottages', icon: <MdCottage /> },
  ];

  const propertyStats = [
    { number: '250+', label: 'Properties' },
    { number: '98%', label: 'Satisfaction' },
    { number: '24/7', label: 'Support' },
    { number: '15+', label: 'Cities' }
  ];

  // Filter properties based on active filter
  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(property => property.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="properties-page">
      {/* Hero Section */}
      <section className="properties-hero">
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="page-title">
              Find Your <span className="highlight">Perfect</span> Home
            </h1>
            <p className="page-subtitle">
              Discover premium properties tailored to your lifestyle and aspirations
            </p>
          </div>
          
          {/* Stats Banner */}
          <div className="stats-banner" data-aos="fade-up" data-aos-delay="200">
            {propertyStats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </section>

      <div className="container">
        {/* Property Type Filter Bar - Clean & Simple */}
        <div className="property-type-filter" data-aos="fade-up">
          <div className="filter-scroll">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                className={`type-filter-btn ${activeFilter === type.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(type.value)}
              >
                <span className="filter-icon">{type.icon}</span>
                <span className="filter-label">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="properties-container">
          {/* Main Content - Full Width */}
          <main className="properties-main">
            <div className="properties-header" data-aos="fade-up">
              <div className="results-info">
                <span className="results-count">{filteredProperties.length} Properties Found</span>
              </div>
              
              <div className="sort-options">
                <span className="active-category">
                  {activeFilter === 'all' ? 'All Properties' : propertyTypes.find(t => t.value === activeFilter)?.label}
                </span>
              </div>
            </div>

            <div className="properties-grid">
              {filteredProperties.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                />
              ))}
            </div>

            {/* Pagination */}
         

            {/* Call to Action */}
            <div className="properties-cta" data-aos="fade-up">
              <h3>Can't Find What You're Looking For?</h3>
              <p>Let our agents help you find the perfect property</p>
              <button className="btn btn-primary btn-lg" href="/Agents">
                Contact an Agent
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Properties;