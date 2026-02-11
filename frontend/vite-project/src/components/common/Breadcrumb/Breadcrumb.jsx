import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Map routes to page titles
  const pageTitles = {
    '/': 'Home',
    '/properties': 'Properties',
    '/agents': 'Agents',
    '/about': 'About Us',
    '/contact': 'Contact',
  };
  
  // Get current page title
  const currentPath = location.pathname;
  const currentTitle = pageTitles[currentPath] || 'Page';
  
  // Don't show breadcrumb on home page
  if (currentPath === '/') return null;

  return (
    <div className="breadcrumb-wrapper">
      <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-link">
                <FaHome className="breadcrumb-icon" />
                <span>Home</span>
              </Link>
              <FaChevronRight className="separator" />
            </li>
            <li className="breadcrumb-item active">
              <span className="current-page">{currentTitle}</span>
            </li>
          </ol>
          
          {/* Page Title Display */}
          <div className="page-title-display">
            <h1 className="page-title-main">{currentTitle}</h1>
            <div className="title-underline">
              <span className="underline-dot"></span>
              <span className="underline-line"></span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;