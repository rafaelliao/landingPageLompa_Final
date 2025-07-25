import { useEffect } from 'react';

export const useScrollMonitor = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calcular rolagem em vh (mesmo padrão do HeroSection)
      const scrollVH = Math.round((scrollY / windowHeight) * 100);
      
      // Calcular progresso da timeline (80vh no mobile, 800vh no desktop)
      const timelineRange = window.innerWidth <= 768 ? 80 : 800;
      const timelineProgress = Math.round((scrollVH / timelineRange) * 100);
      
      // Remover todos os console.log
    };

    // Adicionar listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Log inicial
    // Remover todos os console.log
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Remover todos os console.log
    };
  }, []);
}; 