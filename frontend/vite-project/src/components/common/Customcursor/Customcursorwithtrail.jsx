import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursorWithTrail = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    addEventListeners();

    // Clean up trail particles
    const trailInterval = setInterval(() => {
      if (trail.length > 10) {
        setTrail(prev => prev.slice(1));
      }
    }, 100);

    return () => {
      removeEventListeners();
      clearInterval(trailInterval);
    };
  }, [trail]);

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    
    // Add to trail
    setTrail(prev => [
      ...prev,
      { x: e.clientX, y: e.clientY, id: Date.now() }
    ]);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const cursorClasses = [
    'custom-cursor',
    hidden ? 'hidden' : '',
    clicked ? 'clicked' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Trail particles */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="cursor-trail"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: 0.3 - (index * 0.03),
            transform: `translate(-50%, -50%) scale(${0.5 + (index * 0.05)})`
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={cursorClasses}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursorWithTrail;