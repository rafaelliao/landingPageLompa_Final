'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LogoIcon from './LogoIcon'
import ProductsSection from './ProductsSection'
import { useResponsive } from '../hooks/useResponsive'

interface HeroSectionProps {
  className?: string
  mobileCardRefs?: {
    garrafaRef: React.RefObject<HTMLDivElement>
    ursopeluciaRef: React.RefObject<HTMLDivElement>
    blusaRef: React.RefObject<HTMLDivElement>
    bolsaRef: React.RefObject<HTMLDivElement>
    maquiagemRef: React.RefObject<HTMLDivElement>
    tenisRef: React.RefObject<HTMLDivElement>
    boneRef: React.RefObject<HTMLDivElement>
    relogioRef: React.RefObject<HTMLDivElement>
    cameraRef: React.RefObject<HTMLDivElement>
  }
}

const HeroSection = ({ className = '', mobileCardRefs }: HeroSectionProps) => {
  const { isMobile } = useResponsive()
  
  // Refs para animação
  const titleRef = useRef<HTMLHeadingElement>(null)
  const centralIconRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const mockupMobileRef = useRef<HTMLDivElement>(null)
  const mobileCardsRef = useRef<HTMLDivElement>(null)
  const desktopCardsRef = useRef<HTMLDivElement>(null)



  // Debug logs
  console.log('🏗️ HeroSection renderizando:', {
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'N/A'
  })

  // Animação GSAP com ScrollTrigger
  useEffect(() => {
    console.log('🎬 useEffect iniciado')
    if (typeof window === 'undefined') {
      console.log('❌ Window não disponível')
      return
    }

    console.log('✅ Window disponível, registrando ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    // Aguardar um frame para garantir que todos os elementos estejam renderizados
    const initAnimation = () => {
      console.log('🔍 initAnimation chamada')
      const title = titleRef.current
      const centralIcon = centralIconRef.current
      const mockup = mockupRef.current
      const mockupMobile = mockupMobileRef.current
      const mobileCards = mobileCardsRef.current
      const desktopCards = desktopCardsRef.current

      console.log('🔍 Elementos encontrados:', {
        title: !!title,
        centralIcon: !!centralIcon,
        mockup: !!mockup,
        mockupMobile: !!mockupMobile,
        mobileCards: !!mobileCards,
        desktopCards: !!desktopCards
      })

      if (!title || !centralIcon || !mockup || !mockupMobile || !mobileCards || !desktopCards) {
        console.warn('⚠️ Elementos não encontrados para animação - tentando novamente...')
        setTimeout(initAnimation, 100)
        return
      }

      // Usar o mockup e cards corretos baseado no dispositivo
      const targetMockup = isMobile ? mockupMobile : mockup
      const targetCards = isMobile ? mobileCards : desktopCards
      console.log('🎯 Usando mockup:', isMobile ? 'MOBILE' : 'DESKTOP')
      console.log('🎯 Usando cards:', isMobile ? 'MOBILE CONTAINER' : 'DESKTOP CONTAINER')

      console.log('✅ Todos os elementos encontrados, iniciando animações...')
      
      // Limpar ScrollTriggers existentes
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      // Timeline para animação dos cards
      const animationRange = window.innerWidth <= 768 ? '250vh' : '800vh'
      console.log('🎯 Range da animação:', animationRange)
      
      const tlCards = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: `+=${animationRange}`,
          scrub: 3.5,
          onUpdate: (self) => {
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const scrollVh = (scrollY / viewportHeight) * 100
            const progress = self.progress * 100
            
            // Log apenas a cada 20vh para não sobrecarregar o console
            if (Math.floor(scrollVh) % 20 === 0 && scrollVh > 0) {
              console.log('📊 Scroll:', Math.round(scrollVh) + 'vh | Progresso:', Math.round(progress) + '%')
            }
          },
          onEnter: () => console.log('🎬 ANIMAÇÃO DOS CARDS INICIADA (0vh)'),
          onLeave: () => {
            console.log('🏁 ANIMAÇÃO DOS CARDS FINALIZADA (250vh)')
          },
          onEnterBack: () => console.log('🔄 ANIMAÇÃO DOS CARDS REVERTENDO'),
          onLeaveBack: () => {
            console.log('🔄 ANIMAÇÃO DOS CARDS RESETANDO')
          }
        }
      })

      // Animar cards e seus ícones
      const cardElements = targetCards.querySelectorAll('.product-card-transparent')
      cardElements.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect()
        const mockupRect = targetMockup.getBoundingClientRect()
        
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2
        const mockupCenterX = mockupRect.left + mockupRect.width / 2
        const mockupCenterY = mockupRect.top + mockupRect.height / 2
        
        const deltaX = mockupCenterX - cardCenterX
        const deltaY = mockupCenterY - cardCenterY

        // Encontrar o container pai do card (product-item) que contém o card e o ícone
        const productItem = card.closest('.product-item')
        // Obter nome do produto
        const productName = productItem?.querySelector('img')?.alt || ''
        // Definir rotação
        let rotation = 0
        if (index === 0) {
          rotation = 0
        } else if (productName === 'Maquiagem Icon') {
          rotation = 25
        } else {
          rotation = (index % 2 === 0 ? -25 : 25)
        }
        if (productItem) {
          tlCards.fromTo(productItem, 
            { x: 0, y: 0, scale: 1, rotation: 0 },
            { 
              x: deltaX, 
              y: deltaY, 
              scale: index === 0 ? 1.5 : 0.7, // Reduzido scale da garrafa de 1.8 para 1.5
              rotation,
              ease: 'power2.out', // Easing mais suave para melhor qualidade
              duration: 1 // Duração explícita para melhor controle
            },
            0
          )
        } else {
          // Fallback: animar apenas o card se não encontrar o container
          tlCards.fromTo(card, 
            { x: 0, y: 0, scale: 1, rotation: 0 },
            { 
              x: deltaX, 
              y: deltaY, 
              scale: index === 0 ? 1.5 : 0.7, // Reduzido scale da garrafa de 1.8 para 1.5
              rotation,
              ease: 'power2.out', // Easing mais suave para melhor qualidade
              duration: 1 // Duração explícita para melhor controle
            },
            0
          )
        }
      })

      // Timeline independente para animação do título
      const titleAnimationRange = window.innerWidth <= 768 ? '60vh' : '400vh' // Desktop muito mais longo
      console.log('🎯 Range da animação do título:', titleAnimationRange)
      
      const tlTitle = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: `+=${titleAnimationRange}`,
          scrub: 1,
          onEnter: () => console.log('🎬 ANIMAÇÃO DO TÍTULO INICIADA'),
          onLeave: () => console.log('🏁 ANIMAÇÃO DO TÍTULO FINALIZADA')
        }
      })

      // Animar título e ícone (exit) - timeline independente
      console.log('🎬 Configurando animação do título:', { title: !!title, centralIcon: !!centralIcon })
      
      // Animação do título - duração ainda mais aumentada
      const titleDuration = window.innerWidth <= 768 ? 2.0 : 4.0 // Desktop mais lento
      const titleEase = window.innerWidth <= 768 ? 'power3.out' : 'power1.out' // Desktop mais suave
      
      tlTitle.fromTo([title, centralIcon], 
        { y: 0, opacity: 1 },
        { y: -50, opacity: 0, ease: titleEase, duration: titleDuration }, // Desktop mais lento e suave
        0 // Começa imediatamente
      )
      
      console.log('✅ Animação do título configurada com timeline independente - teste agressivo')

      // Desaparecimento permanente dos cards (exceto garrafa) em 150vh (mobile)
      if (isMobile) {
        console.log('🎬 Configurando desaparecimento permanente dos cards em 150vh')
        
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=250vh',
          end: '+=260vh', // Duração de 10vh para o efeito
          scrub: 0.5,
          onEnter: () => {
            console.log('📱 CARDS - DESAPARECIMENTO PERMANENTE INICIADO (250vh)')
            // Fazer cards (exceto garrafa) desaparecerem permanentemente
            cardElements.forEach((card, index) => {
              if (index !== 0) { // Exceto a garrafa (index 0)
                gsap.to(card, {
                  opacity: 0,
                  scale: 0.3,
                  y: -30,
                  duration: 0.8,
                  ease: 'back.in(1.7)',
                  onComplete: () => {
                    gsap.set(card, { pointerEvents: 'none' })
                  }
                })
              }
            })
            console.log('📱 Cards secundários desapareceram (garrafa permanece)')
          },
          onLeave: () => {
            console.log('📱 CARDS - DESAPARECIMENTO PERMANENTE FINALIZADO (260vh)')
          },
          onEnterBack: () => {
            console.log('📱 CARDS - DESAPARECIMENTO PERMANENTE REVERTENDO')
            // Restaurar cards quando voltar
            cardElements.forEach((card, index) => {
              if (index !== 0) { // Exceto a garrafa (index 0)
                gsap.to(card, {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                  ease: 'back.out(1.7)',
                  onComplete: () => {
                    gsap.set(card, { pointerEvents: 'auto' })
                  }
                })
              }
            })
            console.log('📱 Cards secundários restaurados')
          },
          onLeaveBack: () => {
            console.log('📱 CARDS - DESAPARECIMENTO PERMANENTE RESETANDO')
          }
        })
      }

      // Efeito de saída da garrafa (mobile) - considerando mockup fixado
      if (isMobile && mobileCardRefs?.garrafaRef?.current) {
        console.log('🎬 Configurando efeito de saída da garrafa (mockup fixado)')
        
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=300vh', // Inicia após o mockup estar fixado
          end: '+=340vh', // Duração de 40vh
          scrub: 0.5,
          onEnter: () => {
            console.log('📱 GARRAFA - EFEITO DE SAÍDA INICIADO (300vh) - Mockup fixado')
            // Verificar se o mockup está fixado antes de animar a garrafa
            const mockupPinActive = ScrollTrigger.getAll().some(trigger => 
              trigger.vars.pin === mockupMobileRef.current?.parentElement && trigger.isActive
            )
            
            if (mockupPinActive) {
              console.log('📱 MOCKUP FIXADO - Aplicando efeito de saída da garrafa')
              // Saída da garrafa (efeito)
              gsap.to(mobileCardRefs.garrafaRef.current, {
                scale: 0.3,
                y: -50,
                rotation: 180,
                opacity: 0,
                duration: 1.5, // duração aumentada
                ease: 'back.in(1.7)',
                onComplete: () => {
                  console.log('📱 GARRAFA - Saída concluída (mockup fixado)')
                }
              })
            } else {
              console.log('📱 MOCKUP NÃO FIXADO - Efeito de saída da garrafa adiado')
            }
          },
          onLeave: () => {
            console.log('📱 GARRAFA - EFEITO DE SAÍDA FINALIZADO (340vh)')
          },
          onEnterBack: () => {
            console.log('📱 GARRAFA - EFEITO DE SAÍDA REVERTENDO (scroll reverso)')
            // Reverter o efeito apenas se o mockup estiver fixado
            const mockupPinActive = ScrollTrigger.getAll().some(trigger => 
              trigger.vars.pin === mockupMobileRef.current?.parentElement && trigger.isActive
            )
            
            if (mockupPinActive) {
              // Reversão da garrafa (efeito)
              gsap.to(mobileCardRefs.garrafaRef.current, {
                scale: 1,
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 1.0, // duração suavizada
                ease: 'back.out(1.7)',
                onComplete: () => {
                  console.log('📱 GARRAFA - Saída revertida (mockup fixado)')
                }
              })
            }
          },
          onLeaveBack: () => {
            console.log('📱 GARRAFA - EFEITO DE SAÍDA RESETANDO')
          }
        })
      }

      // Timeline independente para mockup mobile com PIN
      if (isMobile && mockupMobileRef.current) {
        console.log('🎬 Configurando PIN do mockup mobile')
        
        // Pin do mockup mobile de 200vh a 800vh
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=200vh', // Inicia em 200vh
          end: '+=800vh', // Termina em 800vh
          pin: mockupMobileRef.current?.parentElement, // Pin no parent element
          pinSpacing: true, // Mantém o espaçamento como no page2
          onEnter: () => {
            console.log('📱 MOCKUP MOBILE PIN - INICIADO (200vh) - Mockup fixado na tela')
            // Se o scroll já passou do ponto de desaparecimento dos cards, aplicar o efeito imediatamente
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const scrollVh = (scrollY / viewportHeight) * 100;
            if (scrollVh >= 250) {
              const cardElements = mobileCardsRef.current?.querySelectorAll('.product-card-transparent') || [];
              cardElements.forEach((card, index) => {
                if (index !== 0) { // Exceto a garrafa (index 0)
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
              console.log('📱 Cards secundários desapareceram imediatamente após pin (scroll > 250vh)');
            }
          },
          onLeave: () => {
            console.log('📱 MOCKUP MOBILE PIN - FINALIZADO (800vh) - Mockup liberado')
          },
          onEnterBack: () => {
            console.log('📱 MOCKUP MOBILE PIN - REVERTENDO - Mockup será fixado novamente')
            // Se o scroll já passou do ponto de desaparecimento dos cards, aplicar o efeito imediatamente
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const scrollVh = (scrollY / viewportHeight) * 100;
            if (scrollVh >= 250) {
              const cardElements = mobileCardsRef.current?.querySelectorAll('.product-card-transparent') || [];
              cardElements.forEach((card, index) => {
                if (index !== 0) { // Exceto a garrafa (index 0)
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
              console.log('📱 Cards secundários desapareceram imediatamente após pin (scroll > 250vh)');
            }
          },
          onLeaveBack: () => {
            console.log('📱 MOCKUP MOBILE PIN - RESETANDO - Mockup liberado')
            // Se o scroll está antes do ponto de desaparecimento dos cards, reverter o efeito
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const scrollVh = (scrollY / viewportHeight) * 100;
            if (scrollVh < 250) {
              const cardElements = mobileCardsRef.current?.querySelectorAll('.product-card-transparent') || [];
              cardElements.forEach((card, index) => {
                if (index !== 0) { // Exceto a garrafa (index 0)
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
              console.log('📱 Cards secundários restaurados após unpin (scroll < 250vh)');
            }
          }
        })
        
        console.log('✅ PIN do mockup mobile configurado')
      }

      ScrollTrigger.refresh()
    }

    console.log('⏰ Configurando setTimeout para initAnimation')
    setTimeout(initAnimation, 200)
  }, [])

  return (
    <section className={`hero-section ${className}`}>
      {/* Container centralizado */}
      <div className="hero-container">
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
        >
          O FUTURO <span className="text-accent">DO ECOMMERCE</span> É SOCIAL, VISUAL E<br />
          ACESSÍVEL. E ELE<br />
          <span className="text-accent">COMEÇA AQUI</span>
        </h1>

        {/* Container para cards no mobile - mesma altura do título */}
        <div ref={mobileCardsRef} className="mobile-cards-container">
          <ProductsSection 
            garrafaRef={mobileCardRefs?.garrafaRef}
            ursopeluciaRef={mobileCardRefs?.ursopeluciaRef}
            blusaRef={mobileCardRefs?.blusaRef}
            bolsaRef={mobileCardRefs?.bolsaRef}
            maquiagemRef={mobileCardRefs?.maquiagemRef}
            tenisRef={mobileCardRefs?.tenisRef}
            boneRef={mobileCardRefs?.boneRef}
            relogioRef={mobileCardRefs?.relogioRef}
            cameraRef={mobileCardRefs?.cameraRef}
          />
        </div>

        {/* Container para cards no desktop - mesma altura do título */}
        <div ref={desktopCardsRef} className="desktop-cards-container">
          <ProductsSection />
        </div>

        {/* Splash Screen - Desktop */}
        <div
          ref={mockupRef}
          className="smartphone-mockup"
          id="smartphone-mockup-desktop"
          data-testid="mockup-element-desktop"
          data-device="desktop"
        >
          <div className="mockup-screen">
            <img 
              src="/Splash_screen.svg" 
              alt="Splash Screen" 
              className="w-full h-full object-cover"
            />
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

        {/* Splash Screen - Mobile */}
        <div
          ref={mockupMobileRef}
          className="smartphone-mockup"
          id="smartphone-mockup-mobile"
          data-testid="mockup-element-mobile"
          data-device="mobile"
        >
          <div className="mockup-screen">
            <img 
              src="/Splash_screen.svg" 
              alt="Splash Screen" 
              className="w-full h-full object-cover"
            />
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
      </div>


    </section>
  )
}

export default HeroSection 