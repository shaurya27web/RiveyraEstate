import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Left Section - Logo, Description, Social */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">Riveyra<span className="logo-highlight">Estate</span></span>
            </div>
            <p className="footer-description">
              Your trusted partner in finding the perfect home. 
              We connect buyers with their dream properties and 
              sellers with serious buyers.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>

          {/* Center Left - Quick Links */}
          <div className="footer-section links-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/properties">Buy Property</Link></li>
              <li><Link to="/properties">Rent Property</Link></li>
              <li><Link to="/agents">Find Agent</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Center Right - Contact Info */}
          <div className="footer-section contact-section">
            <h3 className="footer-heading">Contact Info</h3>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>UPSIDC, Kanpur</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>99999999</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>info@riveyraestate.com</span>
              </li>
            </ul>
          </div>

          {/* Right Section - Newsletter */}
          <div className="footer-section newsletter-section">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="newsletter-text">
              Subscribe to get updates on new properties
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} RiveyraEstate. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;