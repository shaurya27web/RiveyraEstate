import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaUser, FaPhoneAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/properties', label: 'Properties', icon: <FaSearch /> },
    { to: '/agents', label: 'Agents', icon: <FaUser /> },
    { to: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">Riveyra<span className="logo-highlight">Estate</span></span>
            </Link>
          </div>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button className="btn btn-primary nav-cta">
              List Your Property
            </button>
          </nav>

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
    </header>
  );
};

export default Header;