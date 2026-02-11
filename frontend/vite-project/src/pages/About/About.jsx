import React from 'react';
import { FaCheckCircle, FaAward, FaUsers, FaHome, FaHeart, FaShieldAlt, FaLightbulb, FaHandshake } from 'react-icons/fa';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <FaHeart />,
      title: 'Client-First Approach',
      description: 'We prioritize your needs and work tirelessly to exceed your expectations.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Trust & Integrity',
      description: 'Honest, transparent communication in every transaction.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'Leveraging technology to provide the best real estate experience.'
    },
    {
      icon: <FaHandshake />,
      title: 'Partnership',
      description: 'Building long-term relationships with our clients and community.'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Founded', description: 'Started with a vision to revolutionize real estate' },
    { year: '2018', title: '1000+ Clients', description: 'Reached first major milestone' },
    { year: '2020', title: 'Expansion', description: 'Opened offices in 5 major cities' },
    { year: '2023', title: 'Award Winner', description: 'Best Real Estate Agency 2023' },
    { year: '2024', title: '10,000+', description: 'Successful property transactions' }
  ];

  const teamStats = [
    { number: '50+', label: 'Expert Agents', icon: <FaUsers /> },
    { number: '15+', label: 'Years Experience', icon: <FaAward /> },
    { number: '500+', label: 'Properties Listed', icon: <FaHome /> },
    { number: '98%', label: 'Client Satisfaction', icon: <FaHeart /> }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" data-aos="fade-up">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <span className="about-badge" data-aos="zoom-in">Our Story</span>
              <h1 className="about-title" data-aos="fade-up" data-aos-delay="200">
                Redefining <span className="highlight">Real Estate</span> Excellence
              </h1>
              <p className="about-subtitle" data-aos="fade-up" data-aos-delay="300">
                At RiveryraEstate, we don't just sell properties—we create lasting relationships 
                and help you find places where memories are made.
              </p>
            </div>
            
            <div className="about-hero-stats" data-aos="fade-up" data-aos-delay="400">
              {teamStats.map((stat, index) => (
                <div className="stat-card" key={index} data-aos="zoom-in" data-aos-delay={500 + (index * 100)}>
                  <div className="stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="about-hero-shape shape-1"></div>
        <div className="about-hero-shape shape-2"></div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-card" data-aos="fade-right">
              <div className="mission-header">
                <div className="mission-icon">🎯</div>
                <h2 className="mission-title">Our Mission</h2>
              </div>
              <p className="mission-text">
                To empower people to find their perfect home by providing exceptional service, 
                innovative solutions, and unmatched expertise in the real estate industry.
              </p>
            </div>
            
            <div className="mission-card" data-aos="fade-left" data-aos-delay="200">
              <div className="mission-header">
                <div className="mission-icon">🌟</div>
                <h2 className="mission-title">Our Vision</h2>
              </div>
              <p className="mission-text">
                To become the most trusted and innovative real estate partner, 
                transforming how people buy, sell, and experience properties worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                className="value-card" 
                key={index}
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="value-icon-wrapper">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">Milestones that shaped our success story</p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Why Choose RiveryraEstate?</h2>
            <p className="section-subtitle">Experience the difference with our premium services</p>
          </div>

          <div className="features-grid">
            <div className="feature-item" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrapper">
                <FaCheckCircle />
              </div>
              <h3 className="feature-title">Verified Listings</h3>
              <p className="feature-description">
                Every property is thoroughly verified for accuracy and quality.
              </p>
            </div>
            
            <div className="feature-item" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrapper">
                <FaAward />
              </div>
              <h3 className="feature-title">Award-Winning Service</h3>
              <p className="feature-description">
                Recognized for excellence in customer service and satisfaction.
              </p>
            </div>
            
            <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon-wrapper">
                <FaUsers />
              </div>
              <h3 className="feature-title">Expert Team</h3>
              <p className="feature-description">
                Dedicated professionals with deep market knowledge and expertise.
              </p>
            </div>
            
            <div className="feature-item" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon-wrapper">
                <FaHome />
              </div>
              <h3 className="feature-title">End-to-End Service</h3>
              <p className="feature-description">
                Comprehensive support from search to closing and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta" data-aos="fade-up">
        <div className="container">
          <div className="about-cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-text">
              Let us help you find the perfect property or get expert advice on selling your current home.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">
                Get Free Consultation
              </button>
              <button className="btn btn-secondary btn-lg">
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;