'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LogoIcon from './LogoIcon'
import ProductsSection from './ProductsSection'
import MobileProductsSection from './MobileProductsSection'
import { useResponsive } from '../hooks/useResponsive'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Carousel from 'framer-motion-carousel'
import ReactDOM from 'react-dom'

interface HeroSectionProps {
  className?: string
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const { isMobile, getHeroContainerClasses } = useResponsive()
  
  // Refs para animação
  const titleRef = useRef<HTMLHeadingElement>(null)
  const centralIconRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const mockupMobileRef = useRef<HTMLDivElement>(null)
  const desktopCardsRef = useRef<HTMLDivElement>(null)



  // Debug logs
  

  // Animação GSAP com ScrollTrigger
  useEffect(() => {
    
    if (typeof window === 'undefined') {
      return
    }

    
    gsap.registerPlugin(ScrollTrigger)

    // Aguardar um frame para garantir que todos os elementos estejam renderizados
    const initAnimation = () => {
      
      const actualIsMobile = window.innerWidth <= 768;
      
      // Usar o estado real em vez do hook para evitar inconsistências
      const shouldUseMobile = actualIsMobile;
      
      const title = titleRef.current
      const centralIcon = centralIconRef.current
      const mockup = mockupRef.current
      const mockupMobile = mockupMobileRef.current
      const desktopCards = desktopCardsRef.current

      
      if (!title || !centralIcon || !mockup || !mockupMobile || !desktopCards) {
        setTimeout(initAnimation, 2000) // Delay ainda maior para garantir renderização completa
        return
      }
      
                // Verificar se os elementos de referência estão disponíveis
          if (shouldUseMobile) {
            const mobileReference = document.getElementById('mockup-center-reference-mobile')
            if (!mobileReference) {
              setTimeout(initAnimation, 3000) // Delay ainda maior
              return
            }
          } else {
            const desktopReference = document.getElementById('mockup-center-reference-desktop')
            if (!desktopReference) {
              setTimeout(initAnimation, 3000) // Delay ainda maior
              return
            }
          }
      


      // Usar o mockup e cards corretos baseado no dispositivo
      const targetMockup = shouldUseMobile ? mockupMobile : mockup
      const targetCards = shouldUseMobile ? null : desktopCards // Mobile não tem cards
      
      // Para mobile, usar o elemento de referência específico
      let targetReference: HTMLElement = targetMockup
      if (shouldUseMobile) {
        const mobileReference = document.getElementById('mockup-center-reference-mobile')
        if (mobileReference) {
          targetReference = mobileReference
        } else {
        }
      } else {
        const desktopReference = document.getElementById('mockup-center-reference-desktop')
        if (desktopReference) {
          targetReference = desktopReference
        }
      }
      
      
      // Se for mobile, configurar apenas os ScrollTriggers do PIN mobile
      if (shouldUseMobile) {
        
        
        // Limpar ScrollTriggers existentes
        const existingTriggers = ScrollTrigger.getAll()
        existingTriggers.forEach(trigger => {
          trigger.kill()
        })
        
        // Configurar ScrollTriggers apenas para mobile
        
                  // PIN do mockup mobile (usando o container correto)
          if (shouldUseMobile && mockupMobileRef.current) {
            
            // PIN do mockup mobile (mantido em 300-800vh)
            ScrollTrigger.create({
              trigger: 'body',
              start: '350vh top', // Inicia em 350vh de scroll (ajustado para mockup mais compacto)
              end: '800vh top',   // Termina em 800vh de scroll
              pin: mockupMobileRef.current, // Pin no próprio mockup
              pinSpacing: true, // Habilitar pinSpacing para criar espaço e evitar sobreposição
              anticipatePin: 1, // Antecipar o pin para suavizar a transição
              onEnter: () => {
              },
              onLeave: () => {
              },
              onEnterBack: () => {
              },
              onLeaveBack: () => {
              },
              onUpdate: (self) => {
              }
            })
          
          // Efeito de saída do título e ícone central - MOBILE
          
          // Animar título e ícone (exit) - mobile
          
          const tlTitleMobile = gsap.timeline({
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: '+=200vh', // Range menor para mobile
              scrub: 1,
              onEnter: () => {},
              onLeave: () => {}
            }
          })
          
          // Animar título e ícone (exit) - mobile
          
          tlTitleMobile.fromTo([title, centralIcon], 
            { y: 0, opacity: 1 },
            { y: -30, opacity: 0, ease: 'power3.out', duration: 2.0 }, // Mobile mais rápido
            0 // Começa imediatamente
          )
          
          
          // ===== ANIMAÇÃO DOS CARDS MOBILE =====
          
          // Configurações para mobile (ajustadas para terminar antes do pin)
          const mobileAnimationConfig = {
            range: '200vh', // Termina antes do pin começar em 300vh
            scrub: 1,
            initialScale: 1,
            finalScale: { main: 1.5, others: 0.6 }
          }
          
          
          // Timeline para animação dos cards mobile
          const tlCardsMobile = gsap.timeline({
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: '+=200vh', // Cards mobile até 200vh
              scrub: mobileAnimationConfig.scrub,
              onUpdate: (self) => {
                // Atualizar dinamicamente as posições dos cards durante o scroll
                const scrollY = window.scrollY
                const viewportHeight = window.innerHeight
                const scrollVh = (scrollY / viewportHeight) * 100
                const progress = self.progress * 100
                
                // Log apenas a cada 20vh para não sobrecarregar o console
                if (Math.floor(scrollVh) % 20 === 0 && scrollVh > 0) {
                }
              },
              onEnter: () => {
              },
              onLeave: () => {
              },
              onEnterBack: () => {},
              onLeaveBack: () => {
              }
            }
          })
          
          // Encontrar cards mobile para animação
          const mobileCardElements = document.querySelectorAll('.mobile-product-item')
          
          if (mobileCardElements.length > 0) {
            // Obter elemento de referência dentro do mockup mobile (igual ao desktop)
            const mobileReference = document.getElementById('mockup-center-reference-mobile')
            if (!mobileReference) {
              return
            }
            
            // Animar cada card mobile
            mobileCardElements.forEach((productItem, index) => {
              
              // Obter posições usando o elemento de referência (igual ao desktop)
              const cardRect = productItem.getBoundingClientRect()
              const referenceRect = mobileReference.getBoundingClientRect()
              
              if (referenceRect) {
                // Calcular centro do elemento de referência (como no desktop)
                const targetCenterX = referenceRect.left + referenceRect.width / 2
                const targetCenterY = referenceRect.top + referenceRect.height / 2
                
                // Calcular centro do card
                const cardCenterX = cardRect.left + cardRect.width / 2
                const cardCenterY = cardRect.top + cardRect.height / 2
                
                // Calcular delta (diferença)
                const deltaX = targetCenterX - cardCenterX
                const deltaY = targetCenterY - cardCenterY
                
                // Obter nome do produto para rotação
                const productName = productItem.querySelector('img')?.alt || ''
                
                // Definir rotação baseada no produto
                let rotation = 0
                if (productName.includes('Garrafa')) {
                  rotation = 0 // Garrafa sem rotação (será tratada separadamente)
                } else {
                  rotation = (index % 2 === 0 ? -20 : 20)
                }
                
                // Definir escala final
                const finalScale = productName.includes('Garrafa') ? 
                  mobileAnimationConfig.finalScale.main : 
                  mobileAnimationConfig.finalScale.others
                
                // Debug para primeiro card
                if (index === 0) {
                }
                
                // Adicionar à timeline (exceto garrafa - ela terá timeline própria)
                if (!productName.includes('Garrafa')) {
                  
                  tlCardsMobile.fromTo(productItem, 
                    { 
                      x: 0, 
                      y: 0, 
                      scale: mobileAnimationConfig.initialScale, 
                      rotation: 0 
                    },
                    { 
                      x: deltaX, 
                      y: deltaY, 
                      scale: finalScale,
                      rotation,
                      ease: 'power2.out',
                      duration: 1
                    },
                    0
                  )
                }
              }
            })
            
            // Efeito de desaparecimento dos cards mobile em >= 200vh (exceto garrafa)
            ScrollTrigger.create({
              trigger: 'body',
              start: '200vh top',
              end: '10000vh top',
              onEnter: () => {
                mobileCardElements.forEach((card) => {
                  const cardElement = card as HTMLElement
                  const productName = cardElement.querySelector('img')?.alt || ''
                  if (!productName.includes('Garrafa')) {
                    gsap.to(cardElement, {
                      opacity: 0,
                      scale: 0.8,
                      duration: 0.5,
                      ease: 'power2.out'
                    })
                  }
                })
              },
              onEnterBack: () => {
                mobileCardElements.forEach((card) => {
                  const cardElement = card as HTMLElement
                  const productName = cardElement.querySelector('img')?.alt || ''
                  if (!productName.includes('Garrafa')) {
                    gsap.to(cardElement, {
                      opacity: 0,
                      scale: 0.8,
                      duration: 0.5,
                      ease: 'power2.out'
                    })
                  }
                })
              },
              onLeaveBack: () => {
                mobileCardElements.forEach((card) => {
                  const cardElement = card as HTMLElement
                  const productName = cardElement.querySelector('img')?.alt || ''
                  if (!productName.includes('Garrafa')) {
                    gsap.to(cardElement, {
                      opacity: 1,
                      scale: 1,
                      duration: 0.5,
                      ease: 'power2.out'
                    })
                  }
                })
              }
            })

            // Timeline separada para movimentação da garrafa mobile
            const garrafaMobileElement = Array.from(mobileCardElements)
              .find(card => card.querySelector('img')?.alt?.includes('Garrafa'))
            
            if (garrafaMobileElement) {
              // Timeline específica para garrafa (0-230vh)
              const tlGarrafaMobile = gsap.timeline({
                scrollTrigger: {
                  trigger: 'body',
                  start: 'top top',
                  end: '+=290vh', // Garrafa mobile até 290vh
                  scrub: 1,
                  onUpdate: (self) => {
                    // Atualizar dinamicamente as posições da garrafa durante o scroll
                    const scrollY = window.scrollY
                    const viewportHeight = window.innerHeight
                    const scrollVh = (scrollY / viewportHeight) * 100
                    const progress = self.progress * 100
                    
                    // Log apenas a cada 20vh para não sobrecarregar o console
                    if (Math.floor(scrollVh) % 20 === 0 && scrollVh > 0) {
                    }
                  },
                  onEnter: () => {
                  },
                  onLeave: () => {
                  },
                  onEnterBack: () => {},
                  onLeaveBack: () => {
                  }
                }
              })
              
              // Calcular posição da garrafa usando referência (igual ao desktop)
              const garrafaRect = garrafaMobileElement.getBoundingClientRect()
              const referenceRect = mobileReference.getBoundingClientRect()
              
              if (referenceRect) {
                const targetCenterX = referenceRect.left + referenceRect.width / 2
                const targetCenterY = referenceRect.top + referenceRect.height / 2
                const garrafaCenterX = garrafaRect.left + garrafaRect.width / 2
                const garrafaCenterY = garrafaRect.top + garrafaRect.height / 2
                const deltaX = targetCenterX - garrafaCenterX
                const deltaY = targetCenterY - garrafaCenterY
                
                
                // Animação da garrafa com vh estendido
                tlGarrafaMobile.fromTo(garrafaMobileElement, 
                  { 
                    x: 0, 
                    y: 0, 
                    scale: mobileAnimationConfig.initialScale, 
                    rotation: 0 
                  },
                  { 
                    x: deltaX, 
                    y: deltaY, 
                    scale: mobileAnimationConfig.finalScale.main,
                    rotation: 0, // Garrafa sem rotação
                    ease: 'power2.out',
                    duration: 1
                  },
                  0
                )
              }
            }
            
            // Efeito de saída da garrafa mobile - 200-230vh
            if (garrafaMobileElement) {
              
              ScrollTrigger.create({
                trigger: 'body',
                start: '200vh top', // Inicia o efeito de saída em 200vh
                end: '230vh top',   // Termina em 230vh
                scrub: 0.5,
                onEnter: () => {
                  gsap.to(garrafaMobileElement, {
                    scale: 0.4,
                    y: -40,
                    rotation: 180,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'back.in(1.7)',
                    onComplete: () => {
                    }
                  })
                },
                onEnterBack: () => {
                  gsap.to(garrafaMobileElement, {
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                    }
                  })
                }
              })
            }
            // Reset visual da garrafa mobile para rolagem curta ou retorno ao topo
            if (garrafaMobileElement) {
              ScrollTrigger.create({
                trigger: 'body',
                start: 'top top',
                end: '230vh top',
                onEnter: () => {
                  gsap.set(garrafaMobileElement, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: 0
                  })
                },
                onEnterBack: () => {
                  gsap.set(garrafaMobileElement, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: 0
                  })
                }
              })
            }
          }
          
          
        } else {
        }
        
        // Verificar se os ScrollTriggers foram criados
        const allTriggers = ScrollTrigger.getAll()
        
        ScrollTrigger.refresh()
        return
      }

      // Verificar se targetCards existe (só desktop)
      if (!shouldUseMobile && !targetCards) {
        return
      }

      
      // Limpar ScrollTriggers existentes
      const existingTriggers = ScrollTrigger.getAll()
      existingTriggers.forEach(trigger => {
        trigger.kill()
      })

      // ===== ANIMAÇÃO DOS CARDS - APENAS DESKTOP =====
      
      // Configurações para desktop
      const animationConfig = {
        range: '800vh',
        scrub: 3.5,
        initialScale: 1,
        finalScale: { main: 1.5, others: 0.7 }
      }
      
      
      // Timeline para animação dos cards
      
      const tlCards = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: `+=${animationConfig.range}`,
          scrub: animationConfig.scrub,
          onUpdate: (self) => {
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const scrollVh = (scrollY / viewportHeight) * 100
            const progress = self.progress * 100
            
            // Log apenas a cada 20vh para não sobrecarregar o console
            if (Math.floor(scrollVh) % 20 === 0 && scrollVh > 0) {
            }
          },
          onEnter: () => {
          },
          onLeave: () => {
          },
          onEnterBack: () => {},
          onLeaveBack: () => {
          }
        }
      })

      

      // Encontrar cards para animação (apenas desktop)
      const cardElements = targetCards?.querySelectorAll('.product-item') || [];
      
      
      
      if (cardElements.length === 0) {
        return
      }
      

      
      // Animar cada card (apenas desktop)
      cardElements.forEach((productItem, index) => {
        
        // Obter posições
        const cardRect = productItem.getBoundingClientRect()
        const referenceRect = targetReference.getBoundingClientRect()
        
        // Calcular centro do mockup (referência)
        const targetCenterX = referenceRect.left + referenceRect.width / 2
        const targetCenterY = referenceRect.top + referenceRect.height / 2
        
        // Calcular centro do card
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2
        
        // Calcular delta (diferença)
        const deltaX = targetCenterX - cardCenterX
        const deltaY = targetCenterY - cardCenterY

        // Obter nome do produto para rotação
        const productName = productItem.querySelector('img')?.alt || ''
        
        // Definir rotação baseada no produto
        let rotation = 0
        if (index === 0) {
          rotation = 0 // Card principal sem rotação
        } else if (productName === 'Maquiagem Icon') {
          rotation = 25
        } else {
          rotation = (index % 2 === 0 ? -25 : 25)
        }
        
        // Definir escala final
        const finalScale = index === 0 ? animationConfig.finalScale.main : animationConfig.finalScale.others
        
        // Debug para primeiro card
        if (index === 0) {
        }
        
        // Adicionar à timeline
        
          tlCards.fromTo(productItem, 
            { 
            x: 0, 
            y: 0, 
            scale: animationConfig.initialScale, 
            rotation: 0 
          },
            { 
              x: deltaX, 
              y: deltaY, 
            scale: finalScale,
              rotation,
            ease: 'power2.out',
            duration: 1
            },
            0
          )
      })

      // Timeline independente para animação do título
      const titleAnimationRange = window.innerWidth <= 768 ? '60vh' : '400vh' // Desktop muito mais longo
      
      const tlTitle = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: `+=${titleAnimationRange}`,
          scrub: 1,
          onEnter: () => {},
          onLeave: () => {}
        }
      })

      // Animar título e ícone (exit) - timeline independente
      
      // Animação do título - duração ainda mais aumentada
      const titleDuration = window.innerWidth <= 768 ? 2.0 : 4.0 // Desktop mais lento
      const titleEase = window.innerWidth <= 768 ? 'power3.out' : 'power1.out' // Desktop mais suave
      
      tlTitle.fromTo([title, centralIcon], 
        { y: 0, opacity: 1 },
        { y: -50, opacity: 0, ease: titleEase, duration: titleDuration }, // Desktop mais lento e suave
        0 // Começa imediatamente
      )
      
      
      // Desaparecimento permanente dos cards (exceto garrafa) em 750vh (desktop)
      if (!shouldUseMobile && desktopCardsRef.current && mockupRef.current) {
        const cardElements = Array.from(desktopCardsRef.current.querySelectorAll('.product-card-transparent'));
        const garrafaIndex = cardElements.findIndex(card => card.querySelector('img')?.alt === 'Garrafa Stanley');
        // Selecionar ícones especiais
        const starIcons = Array.from(desktopCardsRef.current.querySelectorAll('.star-icon'));
        const likeIcons = Array.from(desktopCardsRef.current.querySelectorAll('.like-icon'));
        const bagIcons = Array.from(desktopCardsRef.current.querySelectorAll('.bag-icon'));
        const allIcons = [...starIcons, ...likeIcons, ...bagIcons];
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=750vh',
          end: '+=760vh', // Duração curta para o efeito
          scrub: 0.5,
          onEnter: () => {
            cardElements.forEach((card, index) => {
              if (index !== garrafaIndex) {
                gsap.to(card, {
                  opacity: 0,
                  scale: 0.3,
                  y: -30,
                  duration: 0.8,
                  ease: 'back.in(1.7)',
                  onComplete: () => {
                    gsap.set(card, { pointerEvents: 'none' })
                  }
                });
              }
            });
            allIcons.forEach(icon => {
              gsap.to(icon, {
                opacity: 0,
                scale: 0.3,
                y: -30,
                duration: 0.8,
                ease: 'back.in(1.7)',
                onComplete: () => {
                  gsap.set(icon, { pointerEvents: 'none' })
                }
              });
            });
          },
          onEnterBack: () => {
            cardElements.forEach((card, index) => {
              if (index !== garrafaIndex) {
                gsap.to(card, {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                  ease: 'back.out(1.7)',
                  onComplete: () => {
                    gsap.set(card, { pointerEvents: 'auto' })
                  }
                });
              }
            });
            allIcons.forEach(icon => {
              gsap.to(icon, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
                onComplete: () => {
                  gsap.set(icon, { pointerEvents: 'auto' })
                }
              });
            });
          }
        });
      }



      // Efeito de saída da garrafa (desktop) - independente do mobile
      if (!shouldUseMobile && desktopCardsRef.current && mockupRef.current) {
        const garrafaCard = Array.from(desktopCardsRef.current.querySelectorAll('.product-card-transparent'))
          .find(card => card.querySelector('img')?.alt === 'Garrafa Stanley');
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=80vh', // Inicia o efeito de saída em 80vh
          end: '+=110vh',  // Termina em 110vh (antes do carousel)
          scrub: 0.5,
          onEnter: () => {
            if (garrafaCard) {
              gsap.to(garrafaCard, {
                scale: 0.3,
                y: -50,
                rotation: 180,
                opacity: 0,
                duration: 1.5,
                ease: 'back.in(1.7)',
                onComplete: () => {
                }
              });
            } else {
            }
          },
          onEnterBack: () => {
            if (garrafaCard) {
              gsap.to(garrafaCard, {
                scale: 1,
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'back.out(1.7)',
                onComplete: () => {
                }
              });
            } else {
            }
          }
        });
      }



      // Pin do mockup desktop (regra separada)
      if (!shouldUseMobile && mockupRef.current) {
        
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=800vh', // Inicia em 800vh
          end: '+=1400vh',   // Termina em 1400vh
          pin: mockupRef.current.parentElement, // Pin no parente do mockup desktop
          pinSpacing: true,
          onEnter: () => {
          },
          onLeave: () => {
          },
          onEnterBack: () => {
          },
          onLeaveBack: () => {
          }
        })
      } else {
      }




      


      ScrollTrigger.refresh()
      
      // Verificar se os ScrollTriggers foram criados
      const allTriggers = ScrollTrigger.getAll()
      
      return undefined // Garante que todas as rotas retornem algo
    }

    
    // Aguardar um pouco mais para garantir que o useResponsive tenha atualizado
    setTimeout(() => {
      
      initAnimation()
    }, 500)
  }, [isMobile]) // Adicionar isMobile como dependência

  // Novo carousel desktop tipo TikTok
  const videoList = [
    '/garrafa_reels.mp4',
    '/bolsa2_reels.mp4',
    '/parafusadeira_reels.mp4',
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isMobile) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollVh = (scrollY / viewportHeight) * 100;
        setShowCarousel(scrollVh >= 80 && scrollVh <= 250);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowCarousel(false);
      return undefined;
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile && showCarousel) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
          setCarouselIndex((prev) => (prev + 1) % videoList.length);
          }, 5000);
        }
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [showCarousel, isMobile, videoList.length]);

  // Resetar carouselIndex para 0 sempre que showCarousel for ativado (desktop)
  useEffect(() => {
    if (showCarousel) setCarouselIndex(0);
  }, [showCarousel]);

  // Novo carousel mobile tipo TikTok
  const mobileVideoList = [
    '/garrafa_reels_GIF.gif',
    '/bolsa_reels_GIF.gif',
    '/parafusadeira_reels_GIF.gif',
  ];

  const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0);
  const [showMobileCarousel, setShowMobileCarousel] = useState(false);
  const mobileIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollVh = (scrollY / viewportHeight) * 100;
        setShowMobileCarousel(scrollVh >= 30 && scrollVh <= 100);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowMobileCarousel(false);
      return undefined;
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && showMobileCarousel) {
      if (!mobileIntervalRef.current) {
        mobileIntervalRef.current = setInterval(() => {
          setMobileCarouselIndex((prev) => (prev + 1) % mobileVideoList.length);
        }, 5000);
      }
    } else {
      if (mobileIntervalRef.current) {
        clearInterval(mobileIntervalRef.current);
        mobileIntervalRef.current = null;
      }
    }
    return () => {
      if (mobileIntervalRef.current) {
        clearInterval(mobileIntervalRef.current);
        mobileIntervalRef.current = null;
      }
    };
  }, [showMobileCarousel, isMobile, mobileVideoList.length]);

  // Resetar mobileCarouselIndex para 0 sempre que showMobileCarousel for ativado (mobile)
  useEffect(() => {
    if (showMobileCarousel) setMobileCarouselIndex(0);
  }, [showMobileCarousel]);

  // Remover todos os estados, funções, useEffects e JSX relacionados ao carousel desktop
  // Remover:
  // - carouselIndex, showCarousel, mounted, intervalRef, videoList, videoStack, isTransitioning, isVideoReady, pendingIndex
  // - nextVideo
  // - todos os useEffects do carousel
  // - bloco JSX do carousel (motion.div, vídeos, etc)
  //
  // Deixe o espaço pronto para implementar um novo carousel do zero.

  // Pré-carregar vídeos do carousel (desktop e mobile)
  const allCarouselVideos = [
    '/garrafa_reels.mp4',
    '/bolsa2_reels.mp4',
    '/parafusadeira_reels.mp4',
  ];

  const [ctaVisible, setCtaVisible] = useState(false);

  // Regra de visibilidade do botão CTA
  useEffect(() => {
    if (isMobile) {
      // Controlar visibilidade do botão CTA via ScrollTrigger
      const updateCTA = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollVh = (scrollY / viewportHeight) * 100;
        setCtaVisible(scrollVh >= 30 && scrollVh <= 160);
      };
      window.addEventListener('scroll', updateCTA);
      updateCTA();
      return () => window.removeEventListener('scroll', updateCTA);
    } else {
      setCtaVisible(false);
      return undefined;
    }
  }, [isMobile]);

  // Efeito de entrada e pulsante do botão CTA
  useEffect(() => {
    let pulseTween: gsap.core.Tween | null = null;
    if (ctaVisible && isMobile) {
      const ctaBtn = document.getElementById('cta-download-mobile');
      if (ctaBtn) {
        gsap.fromTo(
          ctaBtn,
          { opacity: 0, y: 36, scale: 0.85, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1.04, 
            duration: 0.8, 
            ease: 'back.out(1.7)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            onComplete: () => {
              gsap.to(ctaBtn, { scale: 1, duration: 0.4, ease: 'power1.out', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', onComplete: () => {
                // Efeito pulsante CTA sem brilho rosa
                pulseTween = gsap.to(ctaBtn, {
                  scale: 1.08,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  duration: 0.38,
                  ease: 'power1.inOut',
                  yoyo: true,
                  repeat: -1,
                  repeatDelay: 1.1
                });
              }});
            }
          }
        );
      }
    }
    // Efeito de mover o botão para baixo entre 80vh e 120vh
    let moveTween: gsap.core.Tween | null = null;
    const handleScroll = () => {
      if (!ctaVisible || !isMobile) return;
      const ctaBtn = document.getElementById('cta-download-mobile');
      const mockupMobile = document.getElementById('smartphone-mockup-mobile');
      if (!ctaBtn || !mockupMobile) return;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollVh = (scrollY / viewportHeight) * 100;
      if (scrollVh >= 100 && scrollVh <= 160) {
        // Calcular o centro Y do mockup mobile na tela
        const mockupRect = mockupMobile.getBoundingClientRect();
        const centerY = mockupRect.top + mockupRect.height / 2;
        // Ajustar o botão para o centro do mockup
        gsap.to(ctaBtn, { top: centerY, duration: 0.4, ease: 'power2.out' });
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup
    return () => {
      if (pulseTween) {
        pulseTween.kill();
        pulseTween = null;
      }
      if (moveTween) {
        moveTween.kill();
        moveTween = null;
      }
      window.removeEventListener('scroll', handleScroll);
      const ctaBtn = document.getElementById('cta-download-mobile');
      if (ctaBtn) {
        gsap.set(ctaBtn, { scale: 1, opacity: 1, y: 0 });
      }
    };
  }, [ctaVisible, isMobile]);

  // Função para detectar plataforma mobile
  const detectMobilePlatform = () => {
    if (typeof window === 'undefined') return 'unknown';
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    if (/android/.test(userAgent)) {
      return 'android';
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      return 'ios';
    }
    
    return 'unknown';
  };

  // Componente do botão CTA usando portal
  const DownloadCTAButton = ({ visible }: { visible: boolean }) => {
    if (typeof window === 'undefined') return null;
    
    // Determinar posição inicial baseada no tamanho da tela
    const getInitialTop = () => {
      if (window.innerWidth <= 430) {
        return '8vh'; // Posição mais alta para celulares grandes
      }
      return '12vh'; // Posição padrão para outros tamanhos
    };

    // Função para obter o link de download correto
    const getDownloadLink = () => {
      const platform = detectMobilePlatform();
      
      if (platform === 'android') {
        return 'https://play.google.com/store/apps/details?id=com.app.lompamarketplace'; // Link do Google Play
      } else if (platform === 'ios') {
        return 'https://apps.apple.com/in/app/lompa/id6742741600'; // Link da App Store
      }
      
      // Fallback para desktop ou plataforma desconhecida
      return 'https://lompa.com.br/download'; // Link genérico
    };

    const handleDownloadClick = () => {
      const downloadLink = getDownloadLink();
      window.open(downloadLink, '_blank');
    };
    
    return ReactDOM.createPortal(
      <div
        id="cta-download-mobile"
        style={{
          position: 'fixed',
          left: '50%',
          top: getInitialTop(),
          transform: 'translateX(-50%)',
          zIndex: 9999,
          pointerEvents: visible ? 'auto' : 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
                 <button
           onClick={handleDownloadClick}
           style={{
             display: 'flex',
             flexDirection: 'row',
             justifyContent: 'center',
             alignItems: 'center',
             padding: '18px 24px',
             gap: '7px',
             position: 'relative',
             width: '148px',
             height: '50px',
             background: '#E321FF',
             borderRadius: '18px 0px',
             border: 'none',
             boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
             cursor: 'pointer',
           }}
         >
          <span
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '12px',
              color: '#FBF7FF',
              // Propriedades experimentais:
              // @ts-ignore
              leadingTrim: 'both',
              // @ts-ignore
              textEdge: 'cap',
              flex: 'none',
              order: 0,
              flexGrow: 0,
              display: 'block',
              textAlign: 'center',
            }}
          >
            Descubra agora!
          </span>
        </button>
      </div>,
      document.body
    );
  };

  const [showMockupContent, setShowMockupContent] = useState(false);
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollVh = (scrollY / viewportHeight) * 100;
        setShowMockupContent(scrollVh > 100);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setShowMockupContent(false);
      return undefined;
    }
  }, [isMobile]);

  // Ícone de download via portal, posicionado na base do mockup mobile
  const DownloadIconPortal = () => {
    const [coords, setCoords] = useState<{left: number, top: number}>({ left: 0, top: 0 });
    useEffect(() => {
      if (typeof window === 'undefined') return;
      const updatePosition = () => {
        const mockupMobile = document.getElementById('smartphone-mockup-mobile');
        if (!mockupMobile || !isMobile || !showMockupContent) return;
        const rect = mockupMobile.getBoundingClientRect();
        setCoords({
          left: rect.left + rect.width / 2,
          top: rect.bottom - 150 // mais para cima
        });
      };
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isMobile, showMockupContent]);
    if (!isMobile || !showMockupContent) return null;
    return ReactDOM.createPortal(
      <img
        src="/download_icon.svg"
        alt="Download Icon"
        style={{
          position: 'fixed',
          left: coords.left,
          top: coords.top,
          transform: 'translate(-50%, 0)',
          width: 120,
          height: 120,
          zIndex: 20000,
          pointerEvents: 'none',
        }}
      />,
      document.body
    );
  };

  // Ícone de fundo especial na altura de 100vh no mobile
  const [showLompaFundo, setShowLompaFundo] = useState(false);
  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollVh = (scrollY / viewportHeight) * 100;
      setShowLompaFundo(scrollVh >= 60);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <>
      {/* Pré-carregamento dos vídeos do carousel */}
      {allCarouselVideos.map((src) => (
        <video key={src} src={src} preload="auto" style={{ display: 'none' }} />
      ))}
      <section className={`hero-section ${className}`}>
        {/* Container centralizado */}
        <div className={`hero-container ${getHeroContainerClasses()}`}>
          {/* Ícone centralizado */}
          <div
            ref={centralIconRef}
            className="hero-icon"
          >
            <LogoIcon size="lg" />
          </div>

          {/* Título centralizado */}
          <h1
            ref={titleRef}
            className="hero-title hero-title-mobile"
            style={{ marginBottom: 0 }}
          >
            O futuro do<br />
            ecommerce é<br />
            <span style={{ whiteSpace: 'nowrap' }}>
              <span style={{ color: '#E11BFF', fontWeight: 700 }}>social</span>, <span style={{ color: '#B388FF', fontWeight: 700 }}>visual</span> e
            </span>
            <br className="only-desktop" />
            <span style={{ color: '#3D0099', fontWeight: 700 }}>acessível</span>
            <br className="only-desktop" />
            <br className="only-mobile" />
            <span className="hero-title-highlight">
              <span className="hero-title-bar hero-title-bar-mobile"></span>
              E ELE COMEÇA AQUI!
              
              {/* Setinha abaixo do título */}
              <div className="arrow-container">
                <Image
                  src="/setinha.svg"
                  alt="Setinha"
                  width={40}
                  height={40}
                  className="arrow-icon"
                />
              </div>
            </span>
            <br className="only-desktop" />
          </h1>
          
          {/* Cards Produtos Mobile */}
          <MobileProductsSection />
          
          {/* Splash Screen - Desktop */}
          <div
            ref={mockupRef}
            id="smartphone-mockup-desktop"
            data-testid="mockup-element-desktop"
            data-device="desktop"
          >
            <div className="mockup-screen relative w-full h-full" style={{ overflow: 'hidden' }}>
              {!isMobile && showCarousel ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <AnimatePresence initial={false}>
                    {videoList.map((src, i) =>
                      i === carouselIndex ? (
                        <motion.video
                          key={i}
                          src={src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 2,
                          }}
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0, zIndex: 2 }}
                          exit={{ opacity: 0, y: -100, zIndex: 1 }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                        />
                      ) : null
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <img 
                  src="/Splash_screen.svg" 
                  alt="Splash Screen" 
                  className="w-full h-full object-cover z-0"
                />
              )}
            </div>
            
            {/* Elemento invisível fixo no centro do mockup - Desktop */}
            <div 
              id="mockup-center-reference-desktop"
              className="mockup-center-reference"
              data-device="desktop"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '1px',
                height: '1px',
                backgroundColor: 'transparent',
                zIndex: 1000,
                pointerEvents: 'none'
              }}
            />
          </div>
          {/* Bloco decorativo deve vir abaixo do conteúdo principal */}
          {/* Remover a div vazia decorativa logo após o título */}

          {/* Splash Screen - Mobile */}
          <div
            ref={mockupMobileRef}
            id="smartphone-mockup-mobile"
            data-testid="mockup-element-mobile"
            data-device="mobile"
            style={{
              position: 'relative',
              zIndex: 1, // Fica atrás dos cards (z-index: 300) e título (z-index: 200)
              overflow: 'visible', // Permite que o conteúdo interno seja alterado
            }}
          >
            <div 
              className="mockup-screen relative w-full h-full"
              style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}
            >
              {/* Renderização condicional do conteúdo do mockup mobile */}
              {isMobile && showMobileCarousel ? (
                <div className="mobile-carousel-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <AnimatePresence initial={false}>
                    {mobileVideoList.map((src, i) => {
                      // Associa cada vídeo ao seu frame
                      const frame =
                        src === '/garrafa_reels_GIF.gif' ? '/frame_video1.png' :
                        src === '/bolsa_reels_GIF.gif' ? '/frame_bolsa.png' :
                        src === '/parafusadeira_reels_GIF.gif' ? '/frame_parafusadeira.png' : undefined;
                      return i === mobileCarouselIndex ? (
                        <motion.div
                          key={src}
                          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Frame sobreposto enquanto o vídeo carrega/transiciona */}
                          <motion.img
                            src={frame}
                            alt="Frame do vídeo"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 3 }}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          />
                          {src.endsWith('.gif') ? (
                            <motion.img
                              src={src}
                              alt="GIF do carousel"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 2 }}
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ opacity: 1, y: 0, zIndex: 2 }}
                              exit={{ opacity: 0, y: -100, zIndex: 1 }}
                              transition={{ duration: 0.6, ease: 'easeInOut' }}
                            />
                          ) : (
                            <motion.video
                              src={src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 2 }}
                              initial={{ opacity: 0, y: 100 }}
                              animate={{ opacity: 1, y: 0, zIndex: 2 }}
                              exit={{ opacity: 0, y: -100, zIndex: 1 }}
                              transition={{ duration: 0.6, ease: 'easeInOut' }}
                              poster={src === '/garrafa_reels.mp4' ? '/frame_video1.png' : undefined}
                            />
                          )}
                        </motion.div>
                      ) : null;
                    })}
                  </AnimatePresence>
                </div>
              ) : isMobile && showMockupContent ? (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  zIndex: 1001,
                  pointerEvents: 'none',
                }}>
                  <span style={{
                    display: 'block',
                    marginTop: 24,
                    fontFamily: 'Outfit',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: '13px',
                    color: '#E321FF',
                    textAlign: 'center',
                    letterSpacing: 0.4,
                    // @ts-ignore
                    leadingTrim: 'both',
                    // @ts-ignore
                    textEdge: 'cap',
                  }}>
                    Bem vindo ao Lompa!
                  </span>
                  <span style={{
                    display: 'block',
                    marginTop: 16,
                    marginLeft: 12,
                    marginRight: 12,
                    fontFamily: 'Outfit',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: 18,
                    lineHeight: '22px',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    letterSpacing: 0.4,
                    // @ts-ignore
                    leadingTrim: 'both',
                    // @ts-ignore
                    textEdge: 'cap',
                  }}>
                    O marketplace<br />brasileiro feito para transformar como<br />as pessoas compram e vendem no digital.
                  </span>
                </div>
              ) : (
                <img 
                  src="/Splash_screen.svg" 
                  alt="Splash Screen" 
                  className="w-full h-full object-cover z-0"
                />
              )}
            </div>
            {/* Elemento invisível fixo no centro do mockup - Mobile */}
            <div 
              id="mockup-center-reference-mobile"
              className="mockup-center-reference"
              data-device="mobile"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '1px',
                height: '1px',
                backgroundColor: 'transparent',
                zIndex: 1000,
                pointerEvents: 'none'
              }}
            />
        </div>
          


          {/* Container para cards no desktop - mesma altura do título */}
          <div ref={desktopCardsRef} className="desktop-cards-container">
            <ProductsSection />
          </div>
        </div>

      </section>
      {/* Botão CTA Baixar - Mobile via Portal */}
      {isMobile && ctaVisible && <DownloadCTAButton visible={ctaVisible} />}
      {isMobile && showMockupContent && <DownloadIconPortal />}
      {/* Ícone de fundo especial mobile em 100vh */}
    </>
  )
}

export default HeroSection 