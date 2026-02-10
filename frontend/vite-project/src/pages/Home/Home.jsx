import React, { useState, useEffect } from 'react';
import Hero from '../../components/common/home/Hero/Hero';
import FeaturedProperties from '../../components/common/home/Hero/FeaturedProperties/FeaturedProperties';
import PhotoGallery from '../../components/common/home/PhotoGallery/PhotoGallery';
import Credibility from '../../components/common/home/Credibility/Credibility';
import { FaBuilding, FaHome, FaCity, FaUmbrellaBeach } from 'react-icons/fa';
import './Home.css';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const mockProperties = [
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
    ];
    
    setProperties(mockProperties);
  }, []);

  const categories = [
    { icon: <FaHome />, label: 'Houses', count: '240' },
    { icon: <FaBuilding />, label: 'Apartments', count: '150' },
    { icon: <FaCity />, label: 'Commercial', count: '85' },
    { icon: <FaUmbrellaBeach />, label: 'Vacation', count: '45' },
  ];

  return (
    <div className="home-page">
      <Hero />
      <ScrollToTop/>
      
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Find your perfect property from our diverse categories
          </p>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3 className="category-label">{category.label}</h3>
                <p className="category-count">{category.count} Properties</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedProperties properties={properties} />
      <PhotoGallery />
      <Credibility/>
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Find Your Dream Home?</h2>
            <p className="cta-text">
              Join thousands of satisfied customers who found their perfect home with us.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">
                Browse Properties
              </button>
              <button className="btn btn-secondary btn-lg">
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;