import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminDashboard.css';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'house',
    status: 'for-sale',
    featured: false,
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    features: {
      bedrooms: '',
      bathrooms: '',
      area: '',
      garage: false,
      yearBuilt: ''
    }
  });
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalInquiries: 0,
    featuredProperties: 0
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [propertiesRes, inquiriesRes] = await Promise.all([
        api.get('/properties'),
        api.get('/contact')
      ]);

      const propertiesData = propertiesRes.data.data || [];
      setProperties(propertiesData);
      setInquiries(inquiriesRes.data.data || []);

      setStats({
        totalProperties: propertiesData.length,
        featuredProperties: propertiesData.filter(p => p.featured).length,
        totalInquiries: inquiriesRes.data.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setUploadingImages(true);
    setError('');

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post('/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        return {
          url: response.data.data.url,
          caption: file.name
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages(prevImages => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.price) {
        throw new Error('Please fill in all required fields');
      }

      // Get the agent ID from localStorage or use a default
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Prepare the data with proper structure
      const submitData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        propertyType: formData.propertyType,
        status: formData.status,
        featured: formData.featured || false,
        agent: user._id, // Add the current user as agent
        location: {
          address: formData.location.address || '',
          city: formData.location.city || '',
          state: formData.location.state || '',
          zipCode: formData.location.zipCode || '',
          country: formData.location.country || 'USA'
        },
        features: {
          bedrooms: formData.features.bedrooms ? Number(formData.features.bedrooms) : 0,
          bathrooms: formData.features.bathrooms ? Number(formData.features.bathrooms) : 0,
          area: formData.features.area ? Number(formData.features.area) : 0,
          garage: formData.features.garage || false,
          yearBuilt: formData.features.yearBuilt ? Number(formData.features.yearBuilt) : null
        },
        images: images.length > 0 ? images : [{ url: 'https://via.placeholder.com/800x600', caption: 'Default image' }]
      };

      console.log('Submitting property:', submitData);

      let response;
      if (editingProperty) {
        // Update existing property
        response = await api.put(`/properties/${editingProperty._id}`, submitData);
        console.log('Update response:', response.data);
      } else {
        // Add new property
        response = await api.post('/properties', submitData);
        console.log('Create response:', response.data);
      }

      // Reset form and refresh data
      resetForm();
      await fetchData();
      
      // Show success message
      alert(editingProperty ? 'Property updated successfully!' : 'Property added successfully!');
      
    } catch (error) {
      console.error('Error saving property:', error);
      
      // Show specific error message
      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx
        setError(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        setError(error.message || 'Error saving property');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setImages(property.images || []);
    setFormData({
      title: property.title || '',
      description: property.description || '',
      price: property.price || '',
      propertyType: property.propertyType || 'house',
      status: property.status || 'for-sale',
      featured: property.featured || false,
      location: {
        address: property.location?.address || '',
        city: property.location?.city || '',
        state: property.location?.state || '',
        zipCode: property.location?.zipCode || '',
        country: property.location?.country || 'USA'
      },
      features: {
        bedrooms: property.features?.bedrooms || '',
        bathrooms: property.features?.bathrooms || '',
        area: property.features?.area || '',
        garage: property.features?.garage || false,
        yearBuilt: property.features?.yearBuilt || ''
      }
    });
    setShowAddForm(true);
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.delete(`/properties/${id}`);
        await fetchData();
        alert('Property deleted successfully!');
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Error deleting property');
      }
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingProperty(null);
    setImages([]);
    setError('');
    setFormData({
      title: '',
      description: '',
      price: '',
      propertyType: 'house',
      status: 'for-sale',
      featured: false,
      location: {
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      },
      features: {
        bedrooms: '',
        bathrooms: '',
        area: '',
        garage: false,
        yearBuilt: ''
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const markInquiryRead = async (id) => {
    try {
      await api.patch(`/contact/${id}`, { status: 'read' });
      await fetchData();
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <ScrollToTop />
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Properties</h3>
          <p className="stat-number">{stats.totalProperties}</p>
        </div>
        <div className="stat-card">
          <h3>Featured Properties</h3>
          <p className="stat-number">{stats.featuredProperties}</p>
        </div>
        <div className="stat-card">
          <h3>Total Inquiries</h3>
          <p className="stat-number">{stats.totalInquiries}</p>
        </div>
      </div>

      <div className="admin-actions">
        <button 
          className="add-property-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add New Property'}
        </button>
      </div>

      {showAddForm && (
        <div className="property-form-container">
          <h2>{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="property-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Property Type</label>
                <select name="propertyType" value={formData.propertyType} onChange={handleInputChange}>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                  <option value="sold">Sold</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  Featured Property
                </label>
              </div>
            </div>

            <h3>Location</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="location.zipCode"
                  value={formData.location.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <h3>Features</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Bedrooms</label>
                <input
                  type="number"
                  name="features.bedrooms"
                  value={formData.features.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Bathrooms</label>
                <input
                  type="number"
                  name="features.bathrooms"
                  value={formData.features.bathrooms}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Area (sq ft)</label>
                <input
                  type="number"
                  name="features.area"
                  value={formData.features.area}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Year Built</label>
                <input
                  type="number"
                  name="features.yearBuilt"
                  value={formData.features.yearBuilt}
                  onChange={handleInputChange}
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="features.garage"
                    checked={formData.features.garage}
                    onChange={handleInputChange}
                  />
                  Has Garage
                </label>
              </div>
            </div>

            <h3>Property Images</h3>
            <div className="form-group">
              <label>Upload Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploadingImages}
              />
              {uploadingImages && <p className="uploading-text">Uploading images...</p>}
            </div>

            {images.length > 0 && (
              <div className="image-preview-grid">
                {images.map((img, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={img.url} alt={`Preview ${index + 1}`} />
                    <button 
                      type="button" 
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : (editingProperty ? 'Update Property' : 'Add Property')}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-sections">
        <div className="section">
          <h2>Properties Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(property => (
                <tr key={property._id}>
                  <td>{property.title}</td>
                  <td>${property.price?.toLocaleString()}</td>
                  <td>{property.propertyType}</td>
                  <td>{property.status}</td>
                  <td>{property.featured ? 'Yes' : 'No'}</td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(property._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Recent Inquiries</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Property</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.slice(0, 10).map(inquiry => (
                <tr key={inquiry._id}>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.propertyTitle || 'General Inquiry'}</td>
                  <td>
                    <span className={`status-badge ${inquiry.status}`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td>
                    {inquiry.status === 'new' && (
                      <button 
                        className="mark-read-btn"
                        onClick={() => markInquiryRead(inquiry._id)}
                      >
                        Mark Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;