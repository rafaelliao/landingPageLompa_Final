import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
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
      // Recriar ScrollTriggers no resize
      createScrollTriggers();
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

  const createScrollTriggers = () => {
    // Limpar ScrollTriggers anteriores
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];

    // Obter todos os cards
    const elements = Array.from(document.querySelectorAll('.product-item')) as HTMLElement[];
    if (elements.length === 0) {
      console.warn('Nenhum card encontrado');
      return;
    }

    // VARIÁVEIS CACHEADAS (serão preenchidas no onRefresh)
    let cardsData: Array<{ el: HTMLElement; centerX: number; centerY: number }> = [];
    let mockupCenter: { x: number; y: number } = { x: 0, y: 0 };
    let setters: Array<{ setX: Function; setY: Function; setScaleX: Function; setScaleY: Function; setOpacity: Function; setRotation: Function; setFilter: Function; setZIndex: Function }> = [];

    console.log('ScrollTriggers criados para', elements.length, 'cards com blueprint otimizado');

    // CRIAR UM ÚNICO SCROLLTRIGGER PARA TODOS OS CARDS (BLUEPRINT OTIMIZADO)
    const isMobileDevice = window.innerWidth < 1024;
    const finalScale = isMobileDevice ? 0.6 : 0.8;
    const finalOpacity = isMobileDevice ? 0.5 : 0.7;

    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "+=800vh", // VALOR DO PROJETO ANTERIOR QUE FUNCIONAVA
      scrub: 3.5, // SCRUB MAIS SUAVE COMO NO PROJETO ANTERIOR
      invalidateOnRefresh: true,
      markers: true,
      onRefresh: (self) => {
        // FASE 1: MEDIÇÃO - RECALCULAR AQUI E ARMAZENAR
        console.log('🔄 onRefresh: Recalculando posições...');
        
        // Medir posições dos cards
        cardsData = elements.map(card => {
          const r = card.getBoundingClientRect();
          return {
            el: card,
            centerX: r.left + r.width / 2,
            centerY: r.top + r.height / 2
          };
        });
        
        // Medir posição do mockup
        const mockupElement = document.getElementById('smartphone-mockup-target') as HTMLElement;
        if (mockupElement) {
          const rect = mockupElement.getBoundingClientRect();
          mockupCenter = { 
            x: rect.left + rect.width / 2, 
            y: rect.top + rect.height / 2 
          };
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
        
        console.log('✅ onRefresh: Cache atualizado para', cardsData.length, 'cards');
      },
      onUpdate: (self) => {
        // FASE 2: ATUALIZAÇÃO - AQUI SÓ CHAME SETTERS ULTRA-LEVES
        if (cardsData.length === 0 || setters.length === 0) return;
        
        // Log reduzido para performance
        if (Math.floor(self.progress * 100) % 10 === 0) {
          console.log(`📊 Progress: ${(self.progress * 100).toFixed(1)}%`);
        }
        
        // ANIMAÇÃO OTIMIZADA: APENAS SETTERS SEM MEDIÇÕES
        cardsData.forEach((data, i) => {
          const setter = setters[i];
          
          // Calcular delta usando dados cacheados
          const deltaX = mockupCenter.x - data.centerX;
          const deltaY = mockupCenter.y - data.centerY;
          
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

  // Inicializar ScrollTriggers quando o componente montar
  useEffect(() => {
    const timer = setTimeout(() => {
      createScrollTriggers();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return { scrollProgress, createAnimation: createScrollTriggers, isMobile };
}; 