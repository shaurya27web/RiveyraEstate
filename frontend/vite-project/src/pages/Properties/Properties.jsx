import React, { useState, useEffect } from 'react';
import { getProperties } from '../../services/api';
import PropertyCard from '../../components/common/property/PropertyCard/PropertyCard';
import './Properties.css';
import PageTransition from '../../components/Animations/PageTransition';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    city: '',
    status: 'for-sale'
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await getProperties();
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredProperties = properties.filter(property => {
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    if (filters.city && !property.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.status && property.status !== filters.status) return false;
    return true;
  });

  if (loading) return <div>Loading properties...</div>;

  return (
    <PageTransition>
    <div className="properties-page">
      <div className="container">
      

        {/* Properties Grid */}
        <div className="properties-grid">
          {filteredProperties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <p className="no-results">No properties found</p>
        )}
      </div>
    </div>
    </PageTransition>
  );
};

export default Properties;