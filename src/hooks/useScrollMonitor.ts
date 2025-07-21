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
      
      // Log otimizado - apenas a cada 50vh para reduzir spam
      if (scrollVH % 50 === 0 && scrollVH > 0) {
        console.log(`🔄 Scroll: ${scrollVH}vh | Timeline Progress: ${timelineProgress}%`);
      }
      
      // Logs especiais para marcar pontos importantes
      if (scrollVH === 100) {
        console.log(`🎯 PONTO 100vh | Timeline Progress: ${timelineProgress}%`);
      }
      if (scrollVH === 200) {
        console.log(`🎯 PONTO 200vh | Timeline Progress: ${timelineProgress}%`);
      }
      if (scrollVH === 300) {
        console.log(`🎯 PONTO 300vh | Timeline Progress: ${timelineProgress}%`);
      }
      if (scrollVH === 80) {
        console.log(`🎯 PONTO 80vh | Timeline Progress: ${timelineProgress}% - FIM DA TIMELINE MOBILE!`);
      }
      if (scrollVH === 800) {
        console.log(`🎯 PONTO 800vh | Timeline Progress: ${timelineProgress}% - FIM DA TIMELINE DESKTOP!`);
      }
    };

    // Adicionar listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Log inicial
    console.log('🎯 Scroll Monitor ativado! Role a página para ver os dados...');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('🔚 Scroll Monitor desativado');
    };
  }, []);
}; 