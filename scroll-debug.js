// Script para monitorar scroll - Cole no console do browser
(function() {
  console.log('🎯 Scroll Debug ativado!');
  
  let lastScrollVH = 0;
  let scrollCount = 0;
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calcular rolagem em vh
    const scrollVH = (scrollY / windowHeight) * 100;
    
    // Calcular porcentagem total da página
    const totalScrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    
    // Só loga se mudou significativamente (evita spam)
    if (Math.abs(scrollVH - lastScrollVH) > 0.5) {
      scrollCount++;
      
      console.log(`🔄 #${scrollCount} | Scroll: ${scrollVH.toFixed(1)}vh (${totalScrollPercentage.toFixed(1)}%) | Y: ${Math.round(scrollY)}px`);
      
      // Log detalhado a cada 10 mudanças
      if (scrollCount % 10 === 0) {
        console.log('📊 DETALHES:', {
          'Scroll Y': Math.round(scrollY) + 'px',
          'Scroll VH': scrollVH.toFixed(2) + 'vh',
          'Progresso': totalScrollPercentage.toFixed(2) + '%',
          'Window': windowHeight + 'px',
          'Document': documentHeight + 'px',
          'Hora': new Date().toLocaleTimeString()
        });
      }
      
      lastScrollVH = scrollVH;
    }
  };
  
  // Adicionar listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Log inicial
  console.log('✅ Scroll Debug funcionando! Role a página...');
  console.log('💡 Para desativar: window.removeEventListener("scroll", handleScroll)');
  
  // Expor função para desativar
  window.stopScrollDebug = () => {
    window.removeEventListener('scroll', handleScroll);
    console.log('🔚 Scroll Debug desativado');
  };
  
})(); 