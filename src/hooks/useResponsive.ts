import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window === 'undefined') {
        return;
      }
      
      const width = window.innerWidth;
      
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1024);
      
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Função para obter as classes específicas do hero-container
  const getHeroContainerClasses = () => {
    if (isMobile) {
      return 'hero-container-mobile';
    }
    
    if (isDesktop) {
      if (window.innerWidth >= 1400) {
        return 'hero-container-desktop-extra-large';
      }
      if (window.innerWidth >= 1200) {
        return 'hero-container-desktop-large';
      }
      return 'hero-container-desktop';
    }
    
    return 'hero-container-desktop'; // Fallback para tablet
  };

  const result = {
    isMobile,
    isTablet,
    isDesktop,
    getHeroContainerClasses
  };
  
  return result;
}; 