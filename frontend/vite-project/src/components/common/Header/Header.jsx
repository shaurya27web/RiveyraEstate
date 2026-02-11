import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaSearch, 
  FaUser, 
  FaPhoneAlt,
  FaInfoCircle,
  FaBuilding 
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/properties', label: 'Properties', icon: <FaSearch /> },
    { to: '/agents', label: 'Agents', icon: <FaUser /> },
    { to: '/about', label: 'About', icon: <FaInfoCircle /> },
    { to: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo on Left */}
          <div className="logo">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <span className="logo-icon"><FaBuilding /></span>
              <span className="logo-text">Riveyra<span className="logo-highlight">Estate</span></span>
            </Link>
          </div>

          {/* Navigation in Center */}
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <Link 
                key={item.to} 
                to={item.to} 
                className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button on Right */}
          <div className="header-actions">
            
            
            <button 
              className="menu-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;