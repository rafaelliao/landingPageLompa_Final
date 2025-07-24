import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - useEffect executado');
    const checkScreenSize = () => {
      if (typeof window === 'undefined') {
        (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Window não está disponível (SSR)');
        return;
      }
      
      const width = window.innerWidth;
      (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Window width:', width);
      (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Window existe:', typeof window !== 'undefined');
      (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Window.innerWidth existe:', typeof window.innerWidth !== 'undefined');
      (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Breakpoint mobile (<=768):', width <= 768);
      (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Breakpoint tablet (768-1024):', width > 768 && width <= 1024);
      (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Breakpoint desktop (>1024):', width > 1024);
      
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1024);
      
      (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Estados definidos:', { 
        isMobile: width <= 768, 
        isTablet: width > 768 && width <= 1024, 
        isDesktop: width > 1024 
      });
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
  
  (process.env.NODE_ENV !== "production") && console.log('📱 useResponsive - Retornando estados:', result);
  
  return result;
}; 