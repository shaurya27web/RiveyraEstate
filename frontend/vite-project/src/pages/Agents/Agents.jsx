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
import './Agents.css';

const Agents = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [visibleAgents, setVisibleAgents] = useState({});
  const [agentSalesCounters, setAgentSalesCounters] = useState({});
  const statsRef = useRef(null);
  const agentRefs = useRef([]);
  const animationFrameRefs = useRef({});

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

  // Initialize counters for each agent
  useEffect(() => {
    const initialCounters = {};
    agents.forEach(agent => {
      initialCounters[agent.id] = 0;
    });
    setAgentSalesCounters(initialCounters);
  }, [agents]);

  // Smooth counter animation for agent sales - FIXED
  useEffect(() => {
    agents.forEach(agent => {
      // Only start if visible and not already at target
      if (visibleAgents[agent.id] && agentSalesCounters[agent.id] < agent.totalSales) {
        const target = agent.totalSales;
        const duration = 1500;
        const startTime = performance.now();
        const startValue = agentSalesCounters[agent.id];

        const animateCounter = (timestamp) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
          
          setAgentSalesCounters(prev => ({
            ...prev,
            [agent.id]: Math.min(currentValue, target)
          }));

          if (progress < 1) {
            animationFrameRefs.current[agent.id] = requestAnimationFrame(animateCounter);
          }
        };

        // Cancel any existing animation for this agent
        if (animationFrameRefs.current[agent.id]) {
          cancelAnimationFrame(animationFrameRefs.current[agent.id]);
        }

        animationFrameRefs.current[agent.id] = requestAnimationFrame(animateCounter);
      }
    });

    // Cleanup function
    return () => {
      agents.forEach(agent => {
        if (animationFrameRefs.current[agent.id]) {
          cancelAnimationFrame(animationFrameRefs.current[agent.id]);
        }
      });
    };
  }, [visibleAgents, agents]);

  // Initialize visibleAgents state
  useEffect(() => {
    const initialVisibleState = {};
    agents.forEach(agent => {
      initialVisibleState[agent.id] = false;
    });
    setVisibleAgents(initialVisibleState);
  }, [agents]);

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

  // Intersection Observer for agent cards - OPTIMIZED
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const agentId = entry.target.dataset.agentId;
            setVisibleAgents(prev => {
              // Only update if not already visible
              if (prev[agentId]) return prev;
              return {
                ...prev,
                [agentId]: true
              };
            });
            // Unobserve after marking as visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Lower threshold for faster triggering
        rootMargin: '50px' // Start animation slightly before card comes into view
      }
    );

    // Observe all agent cards
    agentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      agentRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [agents]);

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
      isVisible: isStatsVisible 
    },
    { 
      number: statsCounters.clients, 
      label: 'Happy Clients', 
      suffix: '+',
      prefix: '',
      isVisible: isStatsVisible 
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
      isVisible: isStatsVisible 
    }
  ];

  return (
    <div className="agents-page">
      

      {/* Agents Grid with Sales Counters */}
      <section className="agents-grid-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Our Top Agents</h2>
            <p className="section-subtitle">Connect with our experienced agents who specialize in your desired property type</p>
          </div>

          <div className="agents-grid">
            {agents.map((agent, index) => {
              const salesCount = agentSalesCounters[agent.id] ;
              
              return (
                <div 
                  className="agent-card" 
                  key={agent.id}
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                  data-agent-id={agent.id}
                  ref={el => agentRefs.current[index] = el}
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
                            <span className="sales-count">
                              {formatNumber(salesCount)}+
                            </span>
                            <span className="sales-label">Sales</span>
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
              );
            })}
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
  );
};

export default Agents;