import React, { useState, useEffect, useRef } from 'react';
import { 
  FaStar, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from 'react-icons/fa';
import { getAgents } from '../../services/api';
import './Agents.css';
import PageTransition from '../../components/Animations/PageTransition';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      console.log('Fetching agents...');
      const response = await getAgents();
      console.log('Full API Response:', response);
      console.log('Response data:', response.data);
      
      // Handle different response structures
      if (response.data && response.data.data) {
        console.log('Setting agents from response.data.data:', response.data.data);
        setAgents(response.data.data);
      } else if (Array.isArray(response.data)) {
        console.log('Setting agents from response.data (array):', response.data);
        setAgents(response.data);
      } else {
        console.log('Unexpected response structure, setting empty array');
        setAgents([]);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  // Stats counters - using requestAnimationFrame for smooth animation
  const [statsCounters, setStatsCounters] = useState({
    experts: 0,
    clients: 0,
    propertySold: 0,
    satisfaction: 0
  });

  // Stats counter animation
  useEffect(() => {
    if (!isStatsVisible) return;

    const targets = {
      experts: 50,
      clients: 10000,
      propertySold: 5000000000,
      satisfaction: 98
    };

    const durations = {
      experts: 2000,
      clients: 2500,
      propertySold: 2500,
      satisfaction: 2000
    };

    const startTimes = {};
    const animationFrame = {};

    Object.keys(targets).forEach((key) => {
      const animate = (timestamp) => {
        if (!startTimes[key]) startTimes[key] = timestamp;
        const progress = Math.min((timestamp - startTimes[key]) / durations[key], 1);
        
        setStatsCounters(prev => ({
          ...prev,
          [key]: Math.floor(progress * targets[key])
        }));

        if (progress < 1) {
          animationFrame[key] = requestAnimationFrame(animate);
        }
      };

      animationFrame[key] = requestAnimationFrame(animate);
    });

    return () => {
      Object.values(animationFrame).forEach(frame => {
        if (frame) cancelAnimationFrame(frame);
      });
    };
  }, [isStatsVisible]);

  // Intersection Observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsStatsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format currency in billions/millions
  const formatCurrency = (num) => {
    if (!num && num !== 0) return '0';
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B+';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    return formatNumber(num);
  };

  const stats = [
    { 
      number: statsCounters.experts, 
      label: 'Expert Agents', 
      suffix: '+',
      prefix: '',
      isVisible: isStatsVisible,
      format: null
    },
    { 
      number: statsCounters.clients, 
      label: 'Happy Clients', 
      suffix: '+',
      prefix: '',
      isVisible: isStatsVisible,
      format: null
    },
    { 
      number: statsCounters.propertySold, 
      label: 'Property Sold', 
      suffix: '+',
      prefix: '$',
      isVisible: isStatsVisible,
      format: formatCurrency
    },
    { 
      number: statsCounters.satisfaction, 
      label: 'Satisfaction Rate', 
      suffix: '%',
      prefix: '',
      isVisible: isStatsVisible,
      format: null
    }
  ];

  if (loading) {
    return (
      <PageTransition>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading agents...</p>
        </div>
      </PageTransition>
    );
  }

  console.log('Rendering with agents:', agents);

  return (
    <PageTransition>
    <div className="agents-page">
      {/* Hero Section with Stats Counters */}
      <section className="agents-hero" data-aos="fade-up">
        <div className="container">
          <div className="agents-hero-content">
            <h1 className="agents-title" data-aos="fade-up" data-aos-delay="200">
              Meet Our <span className="highlight">Expert</span> Agents
            </h1>
            <p className="agents-subtitle" data-aos="fade-up" data-aos-delay="300">
              Our team of dedicated professionals is here to guide you through every step of your real estate journey.
            </p>
            
            <div 
              className="agents-stats" 
              data-aos="fade-up" 
              data-aos-delay="400"
              ref={statsRef}
            >
              {stats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-number">
                    {stat.prefix}
                    {stat.format 
                      ? stat.format(stat.number)
                      : formatNumber(stat.number)}
                    {stat.suffix}
                  </div>
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

      {/* Agents Grid */}
      <section className="agents-grid-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Our Top Agents</h2>
            <p className="section-subtitle">Connect with our experienced agents who specialize in your desired property type</p>
          </div>

          <div className="agents-grid">
          {agents && agents.length > 0 ? (
            agents.map((agent, index) => (
              <div 
                className="agent-card" 
                key={agent._id || index}
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="agent-card-inner">
                  {/* Agent Image & Badge */}
                  <div className="agent-image-container">
                    <img 
                      src={agent.profileImage || 'https://via.placeholder.com/300'} 
                      alt={agent.name || 'Agent'} 
                      className="agent-image" 
                    />
                    <div className="experience-badge">
                      {(agent.agentInfo && agent.agentInfo.experience) ? agent.agentInfo.experience + '+ Years' : '5+ Years'}
                    </div>
                    <div className="agent-status"></div>
                  </div>

                  {/* Agent Info */}
                  <div className="agent-info">
                    <div className="agent-header">
                      <h3 className="agent-name">{agent.name || 'Agent Name'}</h3>
                      <div className="agent-rating">
                        <FaStar className="star-icon" />
                        <span className="rating-number">
                          {(agent.agentInfo && agent.agentInfo.featured) ? '4.9' : '4.8'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="agent-title">Real Estate Agent</p>
                    
                    <div className="agent-details">
                      <div className="detail-item">
                        <FaMapMarkerAlt className="detail-icon" />
                        <span>Location not specified</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="agent-specialties">
                      {(agent.agentInfo && agent.agentInfo.specialization && agent.agentInfo.specialization.length > 0) ? (
                        agent.agentInfo.specialization.map((specialty, idx) => (
                          <span className="specialty-tag" key={idx}>{specialty}</span>
                        ))
                      ) : (
                        <span className="specialty-tag">General Real Estate</span>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="agent-contact">
                      <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <span>{agent.phone || 'Not available'}</span>
                      </div>
                      <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <span>{agent.email || 'Not available'}</span>
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
            ))
          ) : (
            <div className="no-agents-message">
              <p>No agents found</p>
            </div>
          )}
          </div>
        </div>
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
    </PageTransition>
  );
};

export default Agents;