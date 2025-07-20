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
        desktop: '+=1000vh',
        mobile: '+=500vh'  // Aumentado para dar mais espaço à animação
      },
      scrub: {
        desktop: 3.5,
        mobile: 2.5
      },
      description: 'Movimentação dos cards para o centro do mockup'
    },
    TITLE_EXIT: {
      name: 'Title & Icon Fade Out + Slide Up Exit',
      end: {
        desktop: '+=500vh', // 50% da timeline1 desktop
        mobile: '+=250vh'   // 50% da timeline1 mobile
      },
      scrub: {
        desktop: 2.0,
        mobile: 1.5
      },
      description: 'Efeito de saída Fade Out + Slide Up para o título e ícone central'
    },
    GARRAFA_TIMELINE: {
      name: 'Garrafa Stanley Extended',
      end: {
        desktop: '+=1400vh', // 400vh a mais que timeline1
        mobile: '+=700vh'    // 200vh a mais que timeline1
      },
      scrub: {
        desktop: 4.0,        // Mais suave que timeline1
        mobile: 3.0
      },
      description: 'Timeline estendida para a garrafa Stanley com duração maior'
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

    // Debounce para evitar múltiplas chamadas de resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        checkMobile();
        // Recriar todas as timelines no resize (apenas uma vez)
        createAllTimelines();
      }, 150); // Delay de 150ms para agrupar múltiplos eventos de resize
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout); // Limpar timeout de resize
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
    
    // Criar Timeline do Título
    createTitleExitTimeline();
    
    // Criar Timeline da Garrafa Stanley
    createGarrafaTimeline();
    
    // Futuras timelines serão adicionadas aqui
    // createTimeline2();
    // createTimeline3();
    
    // EXEMPLO DE COMO ADICIONAR NOVA TIMELINE:
    // 1. Adicionar configuração em TIMELINE_CONFIG
    // 2. Criar função createTimeline2() seguindo o padrão da Timeline 1
    // 3. Chamar createTimeline2() aqui
    // 4. Atualizar indicadores visuais se necessário
    
    // Refresh do ScrollTrigger apenas uma vez após criar todas as timelines
    ScrollTrigger.refresh();
    
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
    const finalOpacity = isMobileDevice ? 0.7 : 0.85; // Aumentado para diminuir transparência

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
          
          // ANIMAÇÃO PARA OS CARDS NORMAIS (NÃO GARRAFA)
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
            
            // ZIndex otimizado - Cards normais
            const baseZIndex = self.progress > 0.5 ? 1000 : 1;
            setter.setZIndex(baseZIndex);

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
  };

  // CRIAR TIMELINE DO TÍTULO E ÍCONE: FADE OUT + SLIDE UP
  const createTitleExitTimeline = () => {
    const isMobileDevice = window.innerWidth < 768;
    const endValue = isMobileDevice ? TIMELINE_CONFIG.TITLE_EXIT.end.mobile : TIMELINE_CONFIG.TITLE_EXIT.end.desktop;
    const scrubValue = isMobileDevice ? TIMELINE_CONFIG.TITLE_EXIT.scrub.mobile : TIMELINE_CONFIG.TITLE_EXIT.scrub.desktop;
    
    debugLog('🎬 Criando TITLE EXIT TIMELINE:', TIMELINE_CONFIG.TITLE_EXIT.name);
    debugLog(`📱 Configuração: ${isMobileDevice ? 'MOBILE' : 'DESKTOP'} - End: ${endValue}, Scrub: ${scrubValue}`);
    
    // Obter o título e o ícone
    const titleElement = document.querySelector('.hero-title') as HTMLElement;
    const iconElement = document.querySelector('.hero-icon') as HTMLElement;
    
    if (!titleElement) {
      debugLog('❌ Título não encontrado para Title Exit Timeline');
      return;
    }
    
    if (!iconElement) {
      debugLog('⚠️ Ícone não encontrado, animando apenas o título');
    }

    debugLog('✅ Title Exit Timeline configurada');

    // Criar setters para o título
    const titleSetter = {
      setX: gsap.quickSetter(titleElement, 'x', 'px'),
      setY: gsap.quickSetter(titleElement, 'y', 'px'),
      setOpacity: gsap.quickSetter(titleElement, 'opacity'),
      setRotation: gsap.quickSetter(titleElement, 'rotation', 'deg'),
      setScaleX: gsap.quickSetter(titleElement, 'scaleX'),
      setScaleY: gsap.quickSetter(titleElement, 'scaleY')
    };

    // Criar setters para o ícone (se existir)
    const iconSetter = iconElement ? {
      setX: gsap.quickSetter(iconElement, 'x', 'px'),
      setY: gsap.quickSetter(iconElement, 'y', 'px'),
      setOpacity: gsap.quickSetter(iconElement, 'opacity'),
      setRotation: gsap.quickSetter(iconElement, 'rotation', 'deg'),
      setScaleX: gsap.quickSetter(iconElement, 'scaleX'),
      setScaleY: gsap.quickSetter(iconElement, 'scaleY')
    } : null;

    const titleTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: endValue,
      scrub: scrubValue,
      invalidateOnRefresh: true,
      markers: false,
      onUpdate: (self) => {
        // Log reduzido para performance
        if (Math.floor(self.progress * 100) % 20 === 0) {
          debugLog(`📊 Title Exit - Progress: ${(self.progress * 100).toFixed(1)}%`);
        }
        
        // Efeito Fade Out + Slide Up
        const slideDistance = isMobileDevice ? -80 : -120; // Distância do slide (mobile menor)
        const easeCurve = 0.8; // Curva de easing para movimento mais natural
        
        // Slide Up progressivo
        const slideY = slideDistance * Math.pow(self.progress, easeCurve);
        
        // Fade Out progressivo
        const opacity = 1 - Math.pow(self.progress, 1.2); // Curva de fade mais suave
        
        // Scale sutil para dar profundidade
        const scale = 1 - (self.progress * 0.05); // Redução sutil de 5%
        
        // Aplicar animações no título
        titleSetter.setX(0); // Sem movimento horizontal
        titleSetter.setY(slideY);
        titleSetter.setRotation(0); // Sem rotação
        titleSetter.setScaleX(scale);
        titleSetter.setScaleY(scale);
        titleSetter.setOpacity(opacity);
        
        // Aplicar animações no ícone (se existir)
        if (iconSetter) {
          // Ícone com movimento ligeiramente diferente para criar profundidade
          const iconSlideY = slideY * 0.8; // Movimento 20% menor que o título
          const iconScale = 1 - (self.progress * 0.08); // Scale um pouco mais pronunciado
          const iconOpacity = 1 - Math.pow(self.progress, 1.1); // Fade um pouco mais rápido
          
          iconSetter.setX(0);
          iconSetter.setY(iconSlideY);
          iconSetter.setRotation(0);
          iconSetter.setScaleX(iconScale);
          iconSetter.setScaleY(iconScale);
          iconSetter.setOpacity(iconOpacity);
        }
      }
    });

    scrollTriggersRef.current.push(titleTrigger);
    
    debugLog('✅ Title Exit Timeline criada com sucesso');
  };

  // CRIAR TIMELINE INDEPENDENTE PARA A GARRAFA STANLEY
  const createGarrafaTimeline = () => {
    const isMobileDevice = window.innerWidth < 768;
    const endValue = isMobileDevice ? TIMELINE_CONFIG.GARRAFA_TIMELINE.end.mobile : TIMELINE_CONFIG.GARRAFA_TIMELINE.end.desktop;
    const scrubValue = isMobileDevice ? TIMELINE_CONFIG.GARRAFA_TIMELINE.scrub.mobile : TIMELINE_CONFIG.GARRAFA_TIMELINE.scrub.desktop;
    
    debugLog('🎬 Criando GARRAFA TIMELINE:', TIMELINE_CONFIG.GARRAFA_TIMELINE.name);
    debugLog(`📱 Configuração: ${isMobileDevice ? 'MOBILE' : 'DESKTOP'} - End: ${endValue}, Scrub: ${scrubValue}`);
    
    // Obter apenas a garrafa Stanley
    const garrafaElement = document.querySelector('.product-item img[alt="Garrafa Stanley"]')?.closest('.product-item') as HTMLElement;
    if (!garrafaElement) {
      debugLog('❌ Garrafa Stanley não encontrada para Garrafa Timeline');
      return;
    }

    // Verificar se os elementos de referência existem
    const mockupId = isMobileDevice ? 'smartphone-mockup-mobile' : 'smartphone-mockup-desktop';
    const centerRefId = isMobileDevice ? 'mockup-center-reference-mobile' : 'mockup-center-reference-desktop';
    
    debugLog(`🔍 Verificando elementos de referência para Garrafa:`);
    debugLog(`🔍 Mockup ID: ${mockupId}`);
    debugLog(`🔍 Centro ID: ${centerRefId}`);

    // VARIÁVEIS CACHEADAS
    let garrafaData: { el: HTMLElement; centerX: number; centerY: number } | null = null;
    let mockupCenter: { x: number; y: number } = { x: 0, y: 0 };
    let garrafaSetter: { setX: Function; setY: Function; setScaleX: Function; setScaleY: Function; setOpacity: Function; setRotation: Function; setFilter: Function; setZIndex: Function } | null = null;

    debugLog(`✅ Garrafa Timeline configurada`);

    // CONFIGURAÇÕES ESPECÍFICAS DA GARRAFA
    const garrafaFinalScale = isMobileDevice ? 0.6 * 1.8 : 0.8 * 1.8; // 80% maior que timeline1

    const garrafaTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: endValue,
      scrub: scrubValue,
      invalidateOnRefresh: true,
      markers: false,
      onRefresh: (self) => {
        debugLog('🔄 Garrafa Timeline - onRefresh: Recalculando posições...');
        
        // Medir posição da garrafa
        const r = garrafaElement.getBoundingClientRect();
        garrafaData = {
          el: garrafaElement,
          centerX: r.left + r.width / 2,
          centerY: r.top + r.height / 2
        };
        
        debugLog(`📊 Garrafa encontrada: x=${garrafaData.centerX}, y=${garrafaData.centerY}`);
        
        // Medir posição do mockup
        const centerRefElement = document.getElementById(centerRefId) as HTMLElement;
        if (centerRefElement) {
          const rect = centerRefElement.getBoundingClientRect();
          mockupCenter = { 
            x: rect.left + rect.width / 2, 
            y: rect.top + rect.height / 2 
          };
          debugLog(`✅ Garrafa Timeline - Usando ponto de referência: ${centerRefId}`);
          debugLog(`📍 Centro calculado: x=${mockupCenter.x}, y=${mockupCenter.y}`);
        } else {
          const mockupElement = document.getElementById(mockupId) as HTMLElement;
          if (mockupElement) {
            const rect = mockupElement.getBoundingClientRect();
            mockupCenter = { 
              x: rect.left + rect.width / 2, 
              y: rect.top + rect.height / 2 
            };
            debugLog(`✅ Garrafa Timeline - Usando centro do mockup: ${mockupId}`);
            debugLog(`📍 Centro calculado: x=${mockupCenter.x}, y=${mockupCenter.y}`);
          } else {
            debugLog(`❌ Nenhum elemento de referência encontrado para Garrafa Timeline`);
          }
        }
        
        // Configurar quickSetter para a garrafa
        garrafaSetter = {
          setX: gsap.quickSetter(garrafaElement, 'x', 'px'),
          setY: gsap.quickSetter(garrafaElement, 'y', 'px'),
          setScaleX: gsap.quickSetter(garrafaElement, 'scaleX'),
          setScaleY: gsap.quickSetter(garrafaElement, 'scaleY'),
          setOpacity: gsap.quickSetter(garrafaElement, 'opacity'),
          setRotation: gsap.quickSetter(garrafaElement, 'rotation', 'deg'),
          setFilter: gsap.quickSetter(garrafaElement, 'filter'),
          setZIndex: gsap.quickSetter(garrafaElement, 'zIndex')
        };
        
        debugLog('✅ Garrafa Timeline - onRefresh: Cache atualizado');
      },
      onUpdate: (self) => {
        if (!garrafaData || !garrafaSetter) return;
        
        // Log reduzido para performance
        if (Math.floor(self.progress * 100) % 10 === 0) {
          debugLog(`📊 Garrafa Timeline - Progress: ${(self.progress * 100).toFixed(1)}%`);
        }
        
        // ANIMAÇÃO ESPECÍFICA DA GARRAFA STANLEY
        const deltaX = mockupCenter.x - garrafaData.centerX;
        const deltaY = mockupCenter.y - garrafaData.centerY;
        
        // CURVA DE PROGRESSO BASEADA NA TIMELINE1: Move igual aos outros cards até timeline1
        const timeline1End = isMobileDevice ? 500 : 1000; // timeline1 end em vh
        const garrafaEnd = isMobileDevice ? 700 : 1400; // garrafa timeline end em vh
        const timeline1Progress = Math.min(self.progress / (timeline1End / garrafaEnd), 1); // Progresso equivalente à timeline1
        const finalPositionProgress = self.progress > (timeline1End / garrafaEnd) ? 1 : timeline1Progress; // Fica parada após timeline1
        
        // Movimento direto (máxima performance) - Mesma velocidade dos outros cards
        garrafaSetter.setX(deltaX * finalPositionProgress);
        garrafaSetter.setY(deltaY * finalPositionProgress);
        
        // Scale otimizado - GARRAFA 80% MAIOR NO DESTINO (mesma velocidade dos outros cards)
        const scaleProgress = Math.min(self.progress / (timeline1End / garrafaEnd), 1); // Progresso equivalente à timeline1
        const finalScaleProgress = self.progress > (timeline1End / garrafaEnd) ? 1 : scaleProgress; // Fica no tamanho final após timeline1
        const scaleValue = 1 + (garrafaFinalScale - 1) * finalScaleProgress;
        garrafaSetter.setScaleX(scaleValue);
        garrafaSetter.setScaleY(scaleValue);
        
        // Opacity otimizado - GARRAFA SEM TRANSPARÊNCIA
        garrafaSetter.setOpacity(1); // Sempre opaca
        
        // Rotation otimizado (mesma velocidade dos outros cards)
        const rotationProgress = Math.min(self.progress / (timeline1End / garrafaEnd), 1); // Progresso equivalente à timeline1
        const finalRotationProgress = self.progress > (timeline1End / garrafaEnd) ? 1 : rotationProgress; // Fica na rotação final após timeline1
        const rotationValue = (Math.random() * 10 - 5) * finalRotationProgress;
        garrafaSetter.setRotation(rotationValue);
        
        // Filter otimizado
        garrafaSetter.setFilter(self.progress > 0.2 ? `brightness(${1 + self.progress * 0.15})` : 'none');
        
        // ZIndex otimizado - Garrafa Stanley sempre na frente (mesma velocidade dos outros cards)
        const zIndexProgress = Math.min(self.progress / (timeline1End / garrafaEnd), 1); // Progresso equivalente à timeline1
        const finalZIndexProgress = self.progress > (timeline1End / garrafaEnd) ? 1 : zIndexProgress; // Fica no z-index final após timeline1
        const baseZIndex = finalZIndexProgress > 0.5 ? 1000 : 1;
        const garrafaZIndex = baseZIndex + 500;
        garrafaSetter.setZIndex(garrafaZIndex);

        // Efeito de entrada na tela (80-95% da timeline)
        if (self.progress > 0.8) {
          const entryProgress = (self.progress - 0.8) / 0.15;
          const entryScale = garrafaFinalScale * (1 + entryProgress * 0.2);
          garrafaSetter.setScaleX(entryScale);
          garrafaSetter.setScaleY(entryScale);
          garrafaSetter.setFilter(`brightness(${1 + 0.2}) drop-shadow(0 0 15px rgba(255,255,255,${entryProgress * 0.5}))`);
        }

        // Fade out final (95-100% da timeline) - SEM TRANSPARÊNCIA
        if (self.progress > 0.95) {
          const fadeProgress = (self.progress - 0.95) / 0.05;
          garrafaSetter.setOpacity(1); // Mantém sempre opaca
          const fadeScale = garrafaFinalScale * (1 - fadeProgress * 0.3);
          garrafaSetter.setScaleX(fadeScale);
          garrafaSetter.setScaleY(fadeScale);
          garrafaSetter.setFilter(`brightness(${1 + 0.2 - fadeProgress * 0.2}) blur(${fadeProgress * 1.5}px)`);
        }
      }
    });

    scrollTriggersRef.current.push(garrafaTrigger);
    
    debugLog('✅ Garrafa Timeline criada com sucesso');
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