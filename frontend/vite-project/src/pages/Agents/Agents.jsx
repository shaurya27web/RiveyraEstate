import React from 'react';
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Agents.css';

const Agents = () => {
  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      experience: '8+ Years',
      location: 'New York, NY',
      phone: '+1 (555) 123-4567',
      email: 'sarah@riveryra.com',
      rating: 4.9,
      totalSales: 245,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      specialties: ['Luxury Homes', 'Penthouse', 'Commercial']
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Commercial Real Estate Expert',
      experience: '12+ Years',
      location: 'San Francisco, CA',
      phone: '+1 (555) 234-5678',
      email: 'michael@riveryra.com',
      rating: 4.8,
      totalSales: 312,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      specialties: ['Commercial', 'Investment', 'Office Space']
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      title: 'Luxury Property Specialist',
      experience: '6+ Years',
      location: 'Miami, FL',
      phone: '+1 (555) 345-6789',
      email: 'elena@riveryra.com',
      rating: 4.9,
      totalSales: 187,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      specialties: ['Luxury Villas', 'Waterfront', 'Condos']
    },
    {
      id: 4,
      name: 'David Wilson',
      title: 'First-Time Home Specialist',
      experience: '5+ Years',
      location: 'Austin, TX',
      phone: '+1 (555) 456-7890',
      email: 'david@riveryra.com',
      rating: 4.7,
      totalSales: 156,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      specialties: ['First-Time Buyers', 'Family Homes', 'Suburban']
    },
    {
      id: 5,
      name: 'Priya Patel',
      title: 'Investment Property Advisor',
      experience: '10+ Years',
      location: 'Seattle, WA',
      phone: '+1 (555) 567-8901',
      email: 'priya@riveryra.com',
      rating: 4.9,
      totalSales: 278,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      specialties: ['Investment', 'Rental', 'Multi-Family']
    },
    {
      id: 6,
      name: 'James Miller',
      title: 'Land & Development Expert',
      experience: '15+ Years',
      location: 'Denver, CO',
      phone: '+1 (555) 678-9012',
      email: 'james@riveryra.com',
      rating: 4.8,
      totalSales: 189,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      specialties: ['Land', 'Development', 'Commercial']
    }
  ];

  const stats = [
    { number: '50+', label: 'Expert Agents' },
    { number: '10,000+', label: 'Happy Clients' },
    { number: '$5B+', label: 'Property Sold' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="agents-page">
      {/* Hero Section */}
    

      {/* Agents Grid */}
      <section className="agents-grid-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Our Top Agents</h2>
            <p className="section-subtitle">Connect with our experienced agents who specialize in your desired property type</p>
          </div>

          <div className="agents-grid">
            {agents.map((agent, index) => (
              <div 
                className="agent-card" 
                key={agent.id}
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="agent-card-inner">
                  {/* Agent Image & Badge */}
                  <div className="agent-image-container">
                    <img src={agent.image} alt={agent.name} className="agent-image" />
                    <div className="experience-badge">
                      {agent.experience}
                    </div>
                    <div className="agent-status"></div>
                  </div>

                  {/* Agent Info */}
                  <div className="agent-info">
                    <div className="agent-header">
                      <h3 className="agent-name">{agent.name}</h3>
                      <div className="agent-rating">
                        <FaStar className="star-icon" />
                        <span className="rating-number">{agent.rating}</span>
                      </div>
                    </div>
                    
                    <p className="agent-title">{agent.title}</p>
                    
                    <div className="agent-details">
                      <div className="detail-item">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>{agent.location}</span>
                      </div>
                      <div className="detail-item">
                        <div className="sales-badge">
                          {agent.totalSales}+ Sales
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="agent-specialties">
                      {agent.specialties.map((specialty, idx) => (
                        <span className="specialty-tag" key={idx}>{specialty}</span>
                      ))}
                    </div>

                    {/* Contact Info */}
                    <div className="agent-contact">
                      <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <span>{agent.phone}</span>
                      </div>
                      <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <span>{agent.email}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="agent-actions">
                      <button className="btn btn-primary">
                        View Profile
                      </button>
                      <button className="btn btn-secondary">
                        Contact
                      </button>
                    </div>

                    {/* Social Links */}
                    <div className="agent-social">
                      <a href="#" className="social-link">
                        <FaFacebook />
                      </a>
                      <a href="#" className="social-link">
                        <FaTwitter />
                      </a>
                      <a href="#" className="social-link">
                        <FaInstagram />
                      </a>
                      <a href="#" className="social-link">
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="agents-hero" data-aos="fade-up">
        <div className="container">
          <div className="agents-hero-content">
            <h1 className="agents-title" data-aos="fade-up" data-aos-delay="200">
              Meet Our <span className="highlight">Expert</span> Agents
            </h1>
            <p className="agents-subtitle" data-aos="fade-up" data-aos-delay="300">
              Our team of dedicated professionals is here to guide you through every step of your real estate journey.
            </p>
            
            <div className="agents-stats" data-aos="fade-up" data-aos-delay="400">
              {stats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="agents-hero-shape shape-1"></div>
        <div className="agents-hero-shape shape-2"></div>
        <div className="agents-hero-shape shape-3"></div>
      </section>

      {/* CTA Section */}
      <section className="agents-cta" data-aos="fade-up">
        <div className="container">
          <div className="agents-cta-content">
            <h2 className="cta-title">Want to Join Our Team?</h2>
            <p className="cta-text">
              We're always looking for talented real estate professionals to join our growing team.
            </p>
            <button className="btn btn-primary btn-lg">
              Become an Agent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agents;