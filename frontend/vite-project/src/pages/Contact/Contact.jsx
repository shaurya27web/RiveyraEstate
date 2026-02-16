import React, { useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaCheckCircle,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaUser,
  FaBuilding,
  FaCalendarAlt,
  FaWhatsapp,
  FaArrowRight,
  FaHome,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';
import './Contact.css';
import PageTransition from '../../components/Animations/PageTransition';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: '',
    budget: '',
    timeline: '',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('general');
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setAnimateCards(true), 300);
  }, []);

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Our Location',
      details: ["UPSIDC,Kanpur"],
      color: '#0d9488',
      
      delay: '0s'
    },
    {
      icon: <FaPhone />,
      title: 'Phone Number',
      details: ['+91 87867374844', '+91 9876543210'],
      color: '#1e40af',
      delay: '0.1s'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Address',
      details: ['hello@riveyra.com', 'support@riveyra.com'],
      color: '#f59e0b',
      delay: '0.2s'
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      details: ['Mon-Fri: 9am - 6pm', 'Saturday: 10am - 4pm'],
      color: '#8b5cf6',
      delay: '0.3s'
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, label: 'Facebook', url: '#', color: '#1877F2' },
    { icon: <FaInstagram />, label: 'Instagram', url: '#', color: '#E4405F' },
    { icon: <FaTwitter />, label: 'Twitter', url: '#', color: '#1DA1F2' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: '#', color: '#0A66C2' },
    { icon: <FaWhatsapp />, label: 'WhatsApp', url: '#', color: '#25D366' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = 'Name is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    if (!formData.message.trim()) validationErrors.message = 'Message is required';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: '',
        budget: '',
        timeline: '',
        contactMethod: 'email'
      });
      setErrors({});
      
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <PageTransition>
      <div className="contact-page">
        {/* Animated Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <div className="hero-content">
            <div className="hero-text">
              <h6 className="hero-subtitle">Get in Touch</h6>
              <h1 className="hero-title">
                Let's Find Your <span className="highlight">Dream Home</span> Together
              </h1>
              <p className="hero-description">
                Our expert team is ready to guide you through every step of your real estate journey. 
                Contact us today for personalized assistance.
              </p>
              
              <div className="hero-features">
                <div className="feature">
                  <FaHeadset className="feature-icon" />
                  <div>
                    <h4>24/7 Support</h4>
                    <p>Always here to help</p>
                  </div>
                </div>
                <div className="feature">
                  <FaShieldAlt className="feature-icon" />
                  <div>
                    <h4>Verified Agents</h4>
                    <p>Trusted professionals</p>
                  </div>
                </div>
                <div className="feature">
                  <FaHome className="feature-icon" />
                  <div>
                    <h4>Quick Response</h4>
                    <p>Within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
          <div className="hero-image">
  <div className="floating-card">
    <div className="card-header">
      <div className="header-icon-wrapper">
        <FaUser />
      </div>
      <span>Live Support Available</span>
    </div>
    <h3>Need Help?</h3>
    <p>Chat with our experts now</p>
    <button className="btn btn-primary floating-btn">
      <FaWhatsapp className="btn-whatsapp-icon" /> Start Chat
    </button>
  </div>
</div>
          </div>
        </div>
        
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      <div className="container">
        <div className="contact-main">
          {/* Contact Info Section */}
          <div className="contact-info-section">
            <div className="section-header">
              <h2 className="section-title">Contact Information</h2>
              <p className="section-subtitle">
                Multiple ways to connect with our dedicated team
              </p>
            </div>
            
            <div className="info-cards-container">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className={`info-card ${animateCards ? 'animate' : ''}`}
                  style={{ 
                    '--card-color': info.color,
                    animationDelay: info.delay 
                  }}
                >
                  <div className="card-icon-wrapper">
                    <div className="card-icon" style={{ backgroundColor: info.color }}>
                      {info.icon}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>{info.title}</h3>
                    <div className="card-details">
                      {info.details.map((detail, i) => (
                        <p key={i} className="detail-item">{detail}</p>
                      ))}
                    </div>
                    <a href={info.link} className="card-link">
                      {info.linkText}
                      
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Section */}
          
          </div>

          {/* Contact Form Section */}
          <div className="contact-form-section">
            <div className="form-intro">
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-subtitle">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            {isSubmitted && (
              <div className="success-message">
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                <div className="success-content">
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for contacting us. We'll respond within 2 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-tabs">
                <button 
                  type="button"
                  className={`form-tab ${activeTab === 'general' ? 'active' : ''}`}
                  onClick={() => setActiveTab('general')}
                >
                  General Inquiry
                </button>
                <button 
                  type="button"
                  className={`form-tab ${activeTab === 'property' ? 'active' : ''}`}
                  onClick={() => setActiveTab('property')}
                >
                  Property Inquiry
                </button>
              </div>

              <div className="form-fields">
                <div className="form-row">
                  <div className="form-group">
                    <div className="input-icon">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <div className="input-icon">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <div className="input-icon">
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <div className="input-icon">
                      <FaBuilding />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {activeTab === 'property' && (
                  <div className="property-fields">
                    <div className="form-row">
                      <div className="form-group">
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                        >
                          <option value="">Property Type</option>
                          <option value="house">House</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                        >
                          <option value="">Budget Range</option>
                          <option value="100k">$100K - $300K</option>
                          <option value="300k">$300K - $500K</option>
                          <option value="500k">$500K - $1M</option>
                          <option value="1m">$1M+</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="input-icon">
                        <FaCalendarAlt />
                      </div>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                      >
                        <option value="">Timeline</option>
                        <option value="immediate">Immediately</option>
                        <option value="1month">1 Month</option>
                        <option value="3months">3 Months</option>
                        <option value="6months">6 Months</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="form-group message-group">
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="contact-alternatives">
              <div className="alternative">
                <FaWhatsapp className="alt-icon" />
                <div>
                  <h4>WhatsApp Chat</h4>
                  <p>Quick responses via WhatsApp</p>
                  <a href="#" className="alt-link">
                    Start Chat <FaArrowRight />
                  </a>
                </div>
              </div>
              <div className="alternative">
                <FaPhone className="alt-icon" />
                <div>
                  <h4>Call Us Directly</h4>
                  <p>Speak with an agent now</p>
                  <a href="000000889" className="alt-link">
                    Call Now <FaArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Contact;