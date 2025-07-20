import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

  // Registrar o plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [debugMode, setDebugMode] = useState(false); // Controle de debug
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Função helper para logs condicionais
  const debugLog = (message: string, ...args: any[]) => {
    if (debugMode) {
      console.log(message, ...args);
    }
  };
  
  // Configurações das timelines
  const TIMELINE_CONFIG = {
    TIMELINE_1: {
      name: 'Cards to Mockup',
      end: {
        desktop: '+=800vh',
        mobile: '+=400vh'  // Aumentado de 60vh para 400vh para dar mais espaço
      },
      scrub: {
        desktop: 3.5,
        mobile: 2.5
      },
      description: 'Movimentação dos cards para o centro do mockup'
    }
    // FUTURAS TIMELINES - EXEMPLO DE COMO ADICIONAR:
    // TIMELINE_2: {
    //   name: 'Mockup to Features',
    //   end: '+=600vh',
    //   scrub: 2.5,
    //   description: 'Movimentação do mockup para a seção de features'
    // },
    // TIMELINE_3: {
    //   name: 'Features Animation',
    //   end: '+=400vh',
    //   scrub: 1.5,
    //   description: 'Animação dos cards de features'
    // }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Usar o mesmo breakpoint do useResponsive
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Função para atualizar progresso do scroll
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollVH = (scrollY / windowHeight) * 100;
      setScrollProgress(scrollVH);
    };

    // Atualizar progresso inicial
    updateScrollProgress();

    // Listener para atualizar progresso
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    const handleResize = () => {
      checkMobile();
      // Recriar todas as timelines no resize
      createAllTimelines();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);
      // Limpar ScrollTriggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  // Cache otimizado - removido getMockupPosition para evitar reflows

  // Função principal para criar todas as timelines
  const createAllTimelines = () => {
    // Limpar ScrollTriggers anteriores
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];

    debugLog('🎬 Iniciando criação de todas as timelines...');
    
    // Criar Timeline 1
    createTimeline1();
    
    // Futuras timelines serão adicionadas aqui
    // createTimeline2();
    // createTimeline3();
    
    // EXEMPLO DE COMO ADICIONAR NOVA TIMELINE:
    // 1. Adicionar configuração em TIMELINE_CONFIG
    // 2. Criar função createTimeline2() seguindo o padrão da Timeline 1
    // 3. Chamar createTimeline2() aqui
    // 4. Atualizar indicadores visuais se necessário
    
    debugLog('✅ Todas as timelines criadas com sucesso!');
  };

  const createTimeline1 = () => {
    const isMobileDevice = window.innerWidth < 768;
    const endValue = isMobileDevice ? TIMELINE_CONFIG.TIMELINE_1.end.mobile : TIMELINE_CONFIG.TIMELINE_1.end.desktop;
    const scrubValue = isMobileDevice ? TIMELINE_CONFIG.TIMELINE_1.scrub.mobile : TIMELINE_CONFIG.TIMELINE_1.scrub.desktop;
    
    debugLog('🎬 Criando TIMELINE 1:', TIMELINE_CONFIG.TIMELINE_1.name);
    debugLog(`📱 Configuração: ${isMobileDevice ? 'MOBILE' : 'DESKTOP'} - End: ${endValue}, Scrub: ${scrubValue}`);
    
    // Obter todos os cards
    const elements = Array.from(document.querySelectorAll('.product-item')) as HTMLElement[];
    if (elements.length === 0) {
      debugLog('❌ Nenhum card encontrado para Timeline 1');
      return;
    }

    // Verificar se os elementos de referência existem
    // isMobileDevice já declarado acima
    const mockupId = isMobileDevice ? 'smartphone-mockup-mobile' : 'smartphone-mockup-desktop';
    const centerRefId = isMobileDevice ? 'mockup-center-reference-mobile' : 'mockup-center-reference-desktop';
    
    debugLog(`🔍 Verificando elementos de referência:`);
    debugLog(`🔍 Mockup ID: ${mockupId}`);
    debugLog(`🔍 Centro ID: ${centerRefId}`);
    debugLog(`🔍 Mockup existe: ${!!document.getElementById(mockupId)}`);
    debugLog(`🔍 Centro existe: ${!!document.getElementById(centerRefId)}`);
    
    // Listar todos os elementos com IDs que contêm "mockup" para debug
    const allMockupElements = document.querySelectorAll('[id*="mockup"]');
    debugLog(`🔍 Todos os elementos mockup encontrados:`, Array.from(allMockupElements).map(el => el.id));

    // VARIÁVEIS CACHEADAS (serão preenchidas no onRefresh)
    let cardsData: Array<{ el: HTMLElement; centerX: number; centerY: number }> = [];
    let mockupCenter: { x: number; y: number } = { x: 0, y: 0 };
    let setters: Array<{ setX: Function; setY: Function; setScaleX: Function; setScaleY: Function; setOpacity: Function; setRotation: Function; setFilter: Function; setZIndex: Function }> = [];

    debugLog(`✅ Timeline 1 configurada para ${elements.length} cards`);

    // CRIAR TIMELINE 1: SCROLLTRIGGER PARA TODOS OS CARDS (BLUEPRINT OTIMIZADO)
    const finalScale = isMobileDevice ? 0.6 : 0.8;
    const finalOpacity = isMobileDevice ? 0.5 : 0.7;

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: isMobileDevice ? TIMELINE_CONFIG.TIMELINE_1.end.mobile : TIMELINE_CONFIG.TIMELINE_1.end.desktop,
      scrub: isMobileDevice ? TIMELINE_CONFIG.TIMELINE_1.scrub.mobile : TIMELINE_CONFIG.TIMELINE_1.scrub.desktop,
      invalidateOnRefresh: true,
      markers: false, // Removido marcadores visuais
      onRefresh: (self) => {
        // FASE 1: MEDIÇÃO - RECALCULAR AQUI E ARMAZENAR
        debugLog('🔄 Timeline 1 - onRefresh: Recalculando posições...');
        
        // Detectar dispositivo
        const isMobileDevice = window.innerWidth < 768;
        debugLog('📱 Dispositivo detectado:', isMobileDevice ? 'MOBILE' : 'DESKTOP');
        
        // Medir posições dos cards
        cardsData = elements.map(card => {
          const r = card.getBoundingClientRect();
          return {
            el: card,
            centerX: r.left + r.width / 2,
            centerY: r.top + r.height / 2
          };
        });
        
        debugLog(`📊 Cards encontrados: ${cardsData.length}`);
        
        // Medir posição do mockup
        debugLog(`🎯 Procurando mockup: ${mockupId}`);
        debugLog(`🎯 Procurando centro: ${centerRefId}`);
        
        // Primeiro tentar usar o ponto de referência dinâmico no centro
        const centerRefElement = document.getElementById(centerRefId) as HTMLElement;
        if (centerRefElement) {
          const rect = centerRefElement.getBoundingClientRect();
          mockupCenter = { 
            x: rect.left + rect.width / 2, 
            y: rect.top + rect.height / 2 
          };
          debugLog(`✅ Timeline 1 - Usando ponto de referência dinâmico: ${centerRefId}`);
          debugLog(`📍 Centro calculado: x=${mockupCenter.x}, y=${mockupCenter.y}`);
        } else {
          debugLog(`❌ Ponto de referência não encontrado: ${centerRefId}`);
          // Fallback para o mockup principal
          const mockupElement = document.getElementById(mockupId) as HTMLElement;
          if (mockupElement) {
            const rect = mockupElement.getBoundingClientRect();
            mockupCenter = { 
              x: rect.left + rect.width / 2, 
              y: rect.top + rect.height / 2 
            };
            debugLog(`✅ Timeline 1 - Usando centro do mockup principal: ${mockupId}`);
            debugLog(`📍 Centro calculado: x=${mockupCenter.x}, y=${mockupCenter.y}`);
          } else {
            debugLog(`❌ Mockup principal não encontrado: ${mockupId}`);
            debugLog(`❌ Nenhum elemento de referência encontrado!`);
          }
        }
        
        // Configurar quickSetters
        setters = elements.map(card => ({
          setX: gsap.quickSetter(card, 'x', 'px'),
          setY: gsap.quickSetter(card, 'y', 'px'),
          setScaleX: gsap.quickSetter(card, 'scaleX'),
          setScaleY: gsap.quickSetter(card, 'scaleY'),
          setOpacity: gsap.quickSetter(card, 'opacity'),
          setRotation: gsap.quickSetter(card, 'rotation', 'deg'),
          setFilter: gsap.quickSetter(card, 'filter'),
          setZIndex: gsap.quickSetter(card, 'zIndex')
        }));
        
        debugLog('✅ Timeline 1 - onRefresh: Cache atualizado para', cardsData.length, 'cards');
      },
      onUpdate: (self) => {
        // FASE 2: ATUALIZAÇÃO - AQUI SÓ CHAME SETTERS ULTRA-LEVES
        if (cardsData.length === 0 || setters.length === 0) return;
        
        // Log reduzido para performance
        if (Math.floor(self.progress * 100) % 10 === 0) {
          debugLog(`📊 Timeline 1 - Progress: ${(self.progress * 100).toFixed(1)}%`);
          debugLog(`🎯 Mockup Center: x=${mockupCenter.x}, y=${mockupCenter.y}`);
        }
        
        // ANIMAÇÃO OTIMIZADA: APENAS SETTERS SEM MEDIÇÕES
        cardsData.forEach((data, i) => {
          const setter = setters[i];
          
          // Calcular delta usando dados cacheados
          const deltaX = mockupCenter.x - data.centerX;
          const deltaY = mockupCenter.y - data.centerY;
          
          // Log do primeiro card para debug
          if (i === 0 && Math.floor(self.progress * 100) % 10 === 0) {
            debugLog(`🎯 Card 0 - Original: x=${data.centerX}, y=${data.centerY}`);
            debugLog(`🎯 Card 0 - Delta: x=${deltaX}, y=${deltaY}`);
            debugLog(`🎯 Card 0 - Aplicado: x=${deltaX * self.progress}, y=${deltaY * self.progress}`);
          }
          
          // Aplicar movimento direto (máxima performance)
          setter.setX(deltaX * self.progress);
          setter.setY(deltaY * self.progress);
          
          // Scale otimizado
          const scaleValue = 1 + (finalScale - 1) * self.progress;
          setter.setScaleX(scaleValue);
          setter.setScaleY(scaleValue);
          
          // Opacity otimizado
          setter.setOpacity(1 + (finalOpacity - 1) * self.progress);
          
          // Rotation otimizado (fixo para evitar recálculos)
          const rotationValue = (Math.random() * 10 - 5) * self.progress;
          setter.setRotation(rotationValue);
          
          // Filter otimizado
          setter.setFilter(self.progress > 0.2 ? `brightness(${1 + self.progress * 0.15})` : 'none');
          
          // ZIndex otimizado
          setter.setZIndex(self.progress > 0.5 ? 1000 : 1);

          // Efeito de entrada na tela (80-95% da timeline)
          if (self.progress > 0.8) {
            const entryProgress = (self.progress - 0.8) / 0.15;
            const entryScale = finalScale * (1 + entryProgress * 0.2);
            setter.setScaleX(entryScale);
            setter.setScaleY(entryScale);
            setter.setFilter(`brightness(${1 + 0.2}) drop-shadow(0 0 15px rgba(255,255,255,${entryProgress * 0.5}))`);
          }

          // Fade out final (95-100% da timeline)
          if (self.progress > 0.95) {
            const fadeProgress = (self.progress - 0.95) / 0.05;
            setter.setOpacity(finalOpacity * (1 - fadeProgress));
            const fadeScale = finalScale * (1 - fadeProgress * 0.3);
            setter.setScaleX(fadeScale);
            setter.setScaleY(fadeScale);
            setter.setFilter(`brightness(${1 + 0.2 - fadeProgress * 0.2}) blur(${fadeProgress * 1.5}px)`);
          }
        });
      }
    });

    scrollTriggersRef.current.push(trigger);
    
    // Refresh do ScrollTrigger após criar todos os triggers
    ScrollTrigger.refresh();
  };

  // Inicializar todas as timelines quando o componente montar
  useEffect(() => {
    const timer = setTimeout(() => {
      debugLog('🚀 Iniciando criação de timelines após delay...');
      createAllTimelines();
    }, 500); // Aumentado de 200ms para 500ms para garantir renderização

    return () => clearTimeout(timer);
  }, []);

  // Função para ativar/desativar debug mode
  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
    console.log(`🔧 Debug mode ${!debugMode ? 'ATIVADO' : 'DESATIVADO'}`);
  };

  return { 
    scrollProgress, 
    createAnimation: createAllTimelines, 
    isMobile, 
    debugMode, 
    toggleDebugMode 
  };
}; 