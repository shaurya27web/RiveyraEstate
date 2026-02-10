import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

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

    // Add hover effects for links and buttons
    const handleLinkHoverEvents = () => {
      const links = document.querySelectorAll('a, button, .btn, [role="button"]');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          if (link.tagName === 'A' || link.classList.contains('link')) {
            setLinkHovered(true);
          } else if (link.tagName === 'BUTTON' || link.classList.contains('btn')) {
            setButtonHovered(true);
          }
        });
        
        link.addEventListener('mouseleave', () => {
          setLinkHovered(false);
          setButtonHovered(false);
        });
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    // Re-run link hover detection when DOM changes
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
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
    clicked ? 'clicked' : '',
    linkHovered ? 'link-hover' : '',
    buttonHovered ? 'button-hover' : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;