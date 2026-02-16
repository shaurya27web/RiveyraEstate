import React, { useState, useEffect, useRef } from 'react';
import { 
  FaStar, 
  FaMapMarkerAlt
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
      const response = await getAgents();
      if (response.data && response.data.data) {
        setAgents(response.data.data);
      } else if (Array.isArray(response.data)) {
        setAgents(response.data);
      } else {
        setAgents([]);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  // Stats counters
  const [statsCounters, setStatsCounters] = useState({
    experts: 0,
    clients: 0,
    propertySold: 0,
    satisfaction: 0
  });

  // Stats counter animation - FIXED
  useEffect(() => {
    if (!isStatsVisible) return;

    const targets = {
      experts: agents.length || 6,
      clients: 10000,
      propertySold: 5000000000,
      satisfaction: 98
    };

    // Reset counters to 0 before starting animation
    setStatsCounters({
      experts: 0,
      clients: 0,
      propertySold: 0,
      satisfaction: 0
    });

    const duration = 2500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStatsCounters({
        experts: Math.floor(progress * targets.experts),
        clients: Math.floor(progress * targets.clients),
        propertySold: Math.floor(progress * targets.propertySold),
        satisfaction: Math.floor(progress * targets.satisfaction)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isStatsVisible, agents.length]);

  // Intersection Observer for stats section - IMPROVED
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Stats section visible - starting animation');
            setIsStatsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: '0px 0px -50px 0px' // Adjust margin
      }
    );

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      if (statsRef.current) {
        observer.observe(statsRef.current);
        console.log('Observer attached to stats section');
      }
    }, 500);

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
      format: null
    },
    { 
      number: statsCounters.clients, 
      label: 'Happy Clients', 
      suffix: '+',
      prefix: '',
      format: null
    },
    { 
      number: statsCounters.propertySold, 
      label: 'Property Sold', 
      suffix: '+',
      prefix: '$',
      format: formatCurrency
    },
    { 
      number: statsCounters.satisfaction, 
      label: 'Satisfaction Rate', 
      suffix: '%',
      prefix: '',
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

  return (
    <PageTransition>
    <div className="agents-page">
      {/* Agents Grid Section */}
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
                        {agent.agentInfo?.experience ? agent.agentInfo.experience + '+ Years' : agent.experience || '5+ Years'}
                      </div>
                      <div className="agent-status"></div>
                    </div>

                    {/* Agent Info - Only Name, Rating, Designation, Location */}
                    <div className="agent-info">
                      <div className="agent-header">
                        <h3 className="agent-name">{agent.name || 'Agent Name'}</h3>
                        <div className="agent-rating">
                          <FaStar className="star-icon" />
                          <span className="rating-number">
                            {agent.rating || '4.9'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="agent-title">{agent.title || agent.agentInfo?.title || 'Real Estate Agent'}</p>
                      
                      <div className="agent-details">
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <span>{agent.location || 'Location not specified'}</span>
                        </div>
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