import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../../services/api';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHome, FaCalendar } from 'react-icons/fa';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await getPropertyById(id);
      setProperty(response.data.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading property details...</div>;
  if (!property) return <div className="error">Property not found</div>;

  return (
    <div className="property-details-page">
      <div className="container">
        <h1>{property.title}</h1>
        
        <div className="property-gallery">
          <div className="main-image">
            <img 
              src={property.images?.[selectedImage]?.url || property.images?.[0]?.url} 
              alt={property.title} 
            />
          </div>
          <div className="thumbnail-grid">
            {property.images?.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img.url} alt={`${property.title} - ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="property-info-grid">
          <div className="info-main">
            <div className="price-section">
              <h2>${property.price?.toLocaleString()}</h2>
              <p className="status">{property.status?.replace('-', ' ')}</p>
            </div>

            <div className="features-grid">
              <div className="feature-item">
                <FaBed />
                <span>{property.features?.bedrooms} Bedrooms</span>
              </div>
              <div className="feature-item">
                <FaBath />
                <span>{property.features?.bathrooms} Bathrooms</span>
              </div>
              <div className="feature-item">
                <FaRulerCombined />
                <span>{property.features?.area} sq ft</span>
              </div>
              <div className="feature-item">
                <FaHome />
                <span>{property.propertyType}</span>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>

            <div className="details-section">
              <h3>Additional Details</h3>
              <div className="details-grid">
                <div className="detail-row">
                  <span>Year Built:</span>
                  <span>{property.features?.yearBuilt || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <span>Garage:</span>
                  <span>{property.features?.garage ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-sidebar">
            <div className="location-section">
              <h3>Location</h3>
              <div className="location-details">
                <FaMapMarkerAlt />
                <div>
                  <p>{property.location?.address}</p>
                  <p>{property.location?.city}, {property.location?.state} {property.location?.zipCode}</p>
                  <p>{property.location?.country}</p>
                </div>
              </div>
            </div>

            <div className="agent-section">
              <h3>Listed By</h3>
              {property.agent && (
                <div className="agent-info">
                  <img src={property.agent.profileImage} alt={property.agent.name} />
                  <div>
                    <h4>{property.agent.name}</h4>
                    <p>{property.agent.email}</p>
                    <p>{property.agent.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;