import { useEffect } from 'react';

export const useScrollMonitor = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calcular rolagem em vh
      const scrollVH = (scrollY / windowHeight) * 100;
      
      // Calcular porcentagem total da página
      const totalScrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
      
      // Log detalhado no console
      console.log('📊 SCROLL MONITOR:', {
        'Scroll Y (px)': Math.round(scrollY),
        'Scroll (vh)': scrollVH.toFixed(2) + 'vh',
        'Progresso (%)': totalScrollPercentage.toFixed(2) + '%',
        'Window Height': windowHeight + 'px',
        'Document Height': documentHeight + 'px',
        'Timestamp': new Date().toLocaleTimeString()
      });
      
      // Log simples para debug rápido
      console.log(`🔄 Scroll: ${scrollVH.toFixed(1)}vh (${totalScrollPercentage.toFixed(1)}%)`);
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