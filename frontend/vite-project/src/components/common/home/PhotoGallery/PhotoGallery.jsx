import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaExpand, FaPause, FaPlay } from 'react-icons/fa';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const mainImageRef = useRef(null);

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop',
      title: 'Luxury Villa Interior',
      category: 'Interior',
      description: 'Spacious living area with modern furnishings'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop',
      title: 'Modern Kitchen',
      category: 'Kitchen',
      description: 'State-of-the-art appliances and marble countertops'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop',
      title: 'Swimming Pool View',
      category: 'Outdoor',
      description: 'Infinity pool with panoramic city views'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1567496898669-ee935f003f30?w=1200&auto=format&fit=crop',
      title: 'Elegant Bedroom',
      category: 'Bedroom',
      description: 'Master suite with walk-in closet and en-suite bathroom'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=1200&auto=format&fit=crop',
      title: 'Home Office Space',
      category: 'Office',
      description: 'Productive workspace with natural lighting'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&auto=format&fit=crop',
      title: 'Garden & Landscape',
      category: 'Garden',
      description: 'Beautifully landscaped gardens with outdoor seating'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mainImageRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  // Touch swipe for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(null);
  };

  return (
    <section className="photo-gallery-section">
      <div className="container">
        <div className="gallery-header">
          <h2 className="section-title">
            <span className="title-highlight">Property</span> Gallery
          </h2>
          <p className="section-subtitle">
            Explore beautiful interiors and architectural designs of premium properties
          </p>
        </div>

        <div className="gallery-container">
          <div className="gallery-main">
            <div 
              className="main-image-container"
              ref={mainImageRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img 
                src={galleryImages[currentIndex].url} 
                alt={galleryImages[currentIndex].title}
                className="main-image"
                loading="lazy"
              />
              <div className="image-overlay">
                <div className="image-info">
                  <div className="image-tags">
                    <span className="image-count">
                      {currentIndex + 1} / {galleryImages.length}
                    </span>
                    <span className="image-category">
                      {galleryImages[currentIndex].category}
                    </span>
                  </div>
                  <h3 className="image-title">{galleryImages[currentIndex].title}</h3>
                  <p className="image-description">{galleryImages[currentIndex].description}</p>
                </div>
              </div>
              
              {/* Control buttons */}
              <div className="gallery-controls">
                <button 
                  className="control-btn play-btn" 
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button 
                  className="control-btn fullscreen-btn" 
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  <FaExpand />
                </button>
              </div>

              <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous image">
                <FaChevronLeft />
              </button>
              <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next image">
                <FaChevronRight />
              </button>
            </div>

            {/* Progress bar */}
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${((currentIndex + 1) / galleryImages.length) * 100}%` 
                }}
              />
            </div>
          </div>

          <div className="thumbnail-container">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                <div className="thumbnail-wrapper">
                  <img 
                    src={image.url} 
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail-image"
                    loading="lazy"
                  />
                  <div className="thumbnail-overlay">
                    <span className="thumbnail-category">{image.category}</span>
                  </div>
                  {index === currentIndex && (
                    <div className="active-indicator"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-info">
          <div className="info-content">
            <p className="info-text">
              Browse through our collection of professionally photographed properties. 
              Each image showcases the quality and attention to detail you can expect 
              from our listed properties.
            </p>
            <div className="info-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Properties</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Professionally Shot</span>
              </div>
              <div className="stat">
                <span className="stat-number">360°</span>
                <span className="stat-label">Virtual Tours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;