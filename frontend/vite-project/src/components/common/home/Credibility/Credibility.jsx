import React, { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaChartLine, 
  FaUsers, 
  FaAward, 
  FaClock, 
  FaHandshake,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './Credibility.css';

const Credibility = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const credibilityPoints = [
    {
      icon: <FaShieldAlt />,
      title: 'Trust & Security',
      description: 'Secure transactions and verified listings ensure peace of mind in every real estate deal.',
      stats: '100% Verified'
    },
    {
      icon: <FaChartLine />,
      title: 'Market Expertise',
      description: '15+ years of market analysis helping clients make informed investment decisions.',
      stats: '98% Accuracy'
    },
    {
      icon: <FaUsers />,
      title: 'Dedicated Support',
      description: 'Personalized service with dedicated agents available 24/7 for all your needs.',
      stats: '50+ Experts'
    },
    {
      icon: <FaAward />,
      title: 'Award Winning',
      description: 'Recognized as the best real estate agency for customer satisfaction 3 years in a row.',
      stats: '15 Awards'
    },
    {
      icon: <FaClock />,
      title: 'Fast Transactions',
      description: 'Average closing time 30% faster than industry standard through streamlined processes.',
      stats: '22 Days Avg.'
    },
    {
      icon: <FaHandshake />,
      title: 'Client First',
      description: 'Putting clients first with transparent pricing and no hidden fees.',
      stats: '95% Repeat'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Michael Rodriguez',
      role: 'Home Buyer',
      quote: 'Found my dream home in just 2 weeks! The team was incredibly helpful and professional throughout the entire process.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      quote: 'Their market insights helped me make profitable investment decisions. Their attention to detail is exceptional!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'First-time Seller',
      quote: 'Sold my property 15% above asking price. Their negotiation skills and market knowledge are outstanding.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'Commercial Client',
      quote: 'Professional, efficient, and transparent. They made a complex commercial deal feel simple.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Robert Kim',
      role: 'Relocation Client',
      quote: 'Moved across states and RiveyraEstate found us the perfect neighborhood. Truly a stress-free experience.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, currentTestimonial]);

  return (
    <section className="credibility-section">
      <div className="container">
        <div className="credibility-header">
          <h2 className="section-title">Why Choose RiveyraEstate?</h2>
          <p className="section-subtitle">
            Discover why thousands of clients trust us with their real estate journey
          </p>
        </div>

        <div className="credibility-grid">
          {credibilityPoints.map((point, index) => (
            <div key={index} className="credibility-card">
              <div className="credibility-icon">
                {point.icon}
              </div>
              <div className="credibility-content">
                <h3 className="credibility-title">{point.title}</h3>
                <p className="credibility-description">{point.description}</p>
                <div className="credibility-stats">
                  <span className="stat-badge">{point.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-section">
          <div className="testimonials-header">
            <h3 className="testimonials-title">What Our Clients Say</h3>
            <p className="testimonials-subtitle">
              Real stories from satisfied clients
            </p>
          </div>
          
          {/* Testimonial Slider */}
          <div className="testimonial-slider">
            <button 
              className="slider-nav-btn prev-btn" 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            
            <div className="slider-container">
              <div 
                className="slider-track" 
                style={{ 
                  transform: `translateX(-${currentTestimonial * 100}%)` 
                }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="slider-slide">
                    <div className="testimonial-card">
                      <div className="testimonial-image">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                      <div className="testimonial-content">
                        <div className="quote-icon">"</div>
                        <p className="testimonial-quote">{testimonial.quote}</p>
                        <div className="testimonial-author">
                          <div className="author-info">
                            <h4 className="author-name">{testimonial.name}</h4>
                            <p className="author-role">{testimonial.role}</p>
                          </div>
                          <div className="testimonial-rating">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="star">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="slider-nav-btn next-btn" 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Slider Dots */}
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <div className="achievement-item">
            <div className="achievement-number">15+</div>
            <div className="achievement-label">Years Experience</div>
          </div>
          <div className="achievement-item">
            <div className="achievement-number">2500+</div>
            <div className="achievement-label">Properties Sold</div>
          </div>
          <div className="achievement-item">
            <div className="achievement-number">98%</div>
            <div className="achievement-label">Client Satisfaction</div>
          </div>
          <div className="achievement-item">
            <div className="achievement-number">50+</div>
            <div className="achievement-label">Awards Won</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credibility;