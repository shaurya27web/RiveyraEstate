import { useLocation, useNavigate } from 'react-router-dom';

const useNavigationWithRefresh = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (e, to) => {
    e.preventDefault();
    
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Check if we're already on the target page
    if (location.pathname === to) {
      // If on same page, refresh after scroll
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      // If different page, navigate to it
      navigate(to);
      // Also ensure scroll to top on navigation
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Check if already on homepage
    if (location.pathname === '/') {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return { handleNavigation, handleLogoClick };
};

export default useNavigationWithRefresh;