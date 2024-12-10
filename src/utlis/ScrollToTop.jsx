import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const basePath = location.pathname.split('/')[1]; 

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;  
}

export default ScrollToTop;
