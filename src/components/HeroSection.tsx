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
      console.log('📱 Estado do dispositivo - isMobile:', isMobile)
      console.log('📱 Window width:', window.innerWidth, 'Breakpoint mobile (<=768):', window.innerWidth <= 768)
      console.log('📱 Window height:', window.innerHeight)
      
      // Usar diretamente o window.innerWidth para evitar problemas de timing
      const actualIsMobile = window.innerWidth <= 768;
      console.log('📱 Estado real vs hook - actualIsMobile:', actualIsMobile, 'hookIsMobile:', isMobile);
      
      // Usar o estado real em vez do hook para evitar inconsistências
      const shouldUseMobile = actualIsMobile;
      
      const title = titleRef.current
      const centralIcon = centralIconRef.current
      const mockup = mockupRef.current
      const mockupMobile = mockupMobileRef.current
      const desktopCards = desktopCardsRef.current

      console.log('🔍 Elementos encontrados:', {
        title: !!title,
        centralIcon: !!centralIcon,
        mockup: !!mockup,
        mockupMobile: !!mockupMobile,
        desktopCards: !!desktopCards
      })

      if (!title || !centralIcon || !mockup || !mockupMobile || !desktopCards) {
        console.warn('⚠️ Elementos não encontrados para animação - tentando novamente...')
        setTimeout(initAnimation, 2000) // Delay ainda maior para garantir renderização completa
        return
      }
      
                // Verificar se os elementos de referência estão disponíveis
          if (isMobile) {
            const mobileReference = document.getElementById('mockup-center-reference-mobile')
            if (!mobileReference) {
              console.warn('⚠️ Elemento de referência mobile não encontrado - tentando novamente...')
              setTimeout(initAnimation, 3000) // Delay ainda maior
              return
            }
          } else {
            const desktopReference = document.getElementById('mockup-center-reference-desktop')
            if (!desktopReference) {
              console.warn('⚠️ Elemento de referência desktop não encontrado - tentando novamente...')
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
          console.log('🎯 Usando elemento de referência mobile específico')
        } else {
          console.warn('⚠️ Elemento de referência mobile não encontrado, usando mockup principal')
        }
      } else {
        const desktopReference = document.getElementById('mockup-center-reference-desktop')
        if (desktopReference) {
          targetReference = desktopReference
          console.log('🎯 Usando elemento de referência desktop específico')
        }
      }
      
      console.log('🎯 Usando mockup:', shouldUseMobile ? 'MOBILE' : 'DESKTOP')
      console.log('🎯 Usando cards:', shouldUseMobile ? 'NENHUM (MOBILE)' : 'DESKTOP CONTAINER')
      
      // Debug: verificar se os elementos estão sendo encontrados
      console.log('🔍 Debug elementos:', {
        targetMockup: !!targetMockup,
        targetReference: !!targetReference,
        targetCards: !!targetCards,
        mockupRect: targetMockup?.getBoundingClientRect(),
        referenceRect: targetReference?.getBoundingClientRect(),
        cardsRect: targetCards?.getBoundingClientRect(),
        isMobile,
        mobileReference: document.getElementById('mockup-center-reference-mobile'),
        desktopReference: document.getElementById('mockup-center-reference-desktop')
      })

      // Se for mobile, configurar apenas os ScrollTriggers do PIN mobile
      if (shouldUseMobile) {
        console.log('📱 Mobile: Configurando apenas ScrollTriggers do PIN mobile')
        
        // Limpar ScrollTriggers existentes
        console.log('🧹 Limpando ScrollTriggers existentes...')
        const existingTriggers = ScrollTrigger.getAll()
        console.log('🔍 ScrollTriggers existentes:', existingTriggers.length)
        existingTriggers.forEach(trigger => {
          console.log('🗑️ Removendo trigger:', trigger.vars.trigger || 'unknown')
          trigger.kill()
        })
        
        // Configurar ScrollTriggers apenas para mobile
        console.log('📱 Configurando ScrollTriggers para mobile...')
        
                  // PIN do mockup mobile (usando o container correto)
          console.log('🔍 Verificando condições para PIN mobile...')
          console.log('🔍 shouldUseMobile:', shouldUseMobile)
          console.log('🔍 mockupMobileRef.current:', !!mockupMobileRef.current)
          console.log('🔍 mockupMobileRef.current.parentElement:', !!mockupMobileRef.current?.parentElement)
          
          if (shouldUseMobile && mockupMobileRef.current) {
            console.log('📱 Configurando PIN do mockup mobile')
            console.log('📱 isMobile:', isMobile, 'mockupMobileRef.current:', !!mockupMobileRef.current)
            
            // PIN do mockup mobile (mantido em 300-800vh)
            ScrollTrigger.create({
              trigger: 'body',
              start: '300vh top', // Inicia em 300vh de scroll
              end: '800vh top',   // Termina em 800vh de scroll
              pin: mockupMobileRef.current, // Pin no próprio mockup
              pinSpacing: true, // Habilitar pinSpacing para criar espaço e evitar sobreposição
              anticipatePin: 1, // Antecipar o pin para suavizar a transição
              onEnter: () => {
                console.log('📱 MOCKUP MOBILE PIN - INICIADO em 300vh')
                console.log('📱 ScrollTrigger ativado - mockup deve estar fixado agora')
              },
              onLeave: () => {
                console.log('📱 MOCKUP MOBILE PIN - FINALIZADO em 800vh')
                console.log('📱 ScrollTrigger finalizado - mockup deve estar livre agora')
              },
              onEnterBack: () => {
                console.log('📱 MOCKUP MOBILE PIN - REVERTENDO')
                console.log('📱 ScrollTrigger revertendo - mockup será fixado novamente')
              },
              onLeaveBack: () => {
                console.log('📱 MOCKUP MOBILE PIN - RESETANDO')
                console.log('📱 ScrollTrigger resetando - mockup liberado')
              },
              onUpdate: (self) => {
                console.log('📱 MOCKUP MOBILE PIN - UPDATE - Progress:', self.progress.toFixed(2), 'Scroll:', window.scrollY)
              }
            })
          
          // Efeito de saída do título e ícone central - MOBILE
          console.log('📱 Configurando animação de saída do título e ícone mobile')
          const tlTitleMobile = gsap.timeline({
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: '+=200vh', // Range menor para mobile
              scrub: 1,
              onEnter: () => console.log('📱 ANIMAÇÃO DO TÍTULO MOBILE INICIADA'),
              onLeave: () => console.log('📱 ANIMAÇÃO DO TÍTULO MOBILE FINALIZADA')
            }
          })
          
          // Animar título e ícone (exit) - mobile
          console.log('📱 Configurando animação do título mobile:', { title: !!title, centralIcon: !!centralIcon })
          
          tlTitleMobile.fromTo([title, centralIcon], 
            { y: 0, opacity: 1 },
            { y: -30, opacity: 0, ease: 'power3.out', duration: 2.0 }, // Mobile mais rápido
            0 // Começa imediatamente
          )
          
          console.log('✅ Animação de saída do título e ícone mobile configurada')
          
          // ===== ANIMAÇÃO DOS CARDS MOBILE =====
          console.log('📱 Configurando animação dos cards mobile')
          
          // Configurações para mobile (ajustadas para terminar antes do pin)
          const mobileAnimationConfig = {
            range: '200vh', // Termina antes do pin começar em 300vh
            scrub: 1,
            initialScale: 1,
            finalScale: { main: 1.5, others: 0.6 }
          }
          
          console.log('🎯 Configuração de animação MOBILE:', mobileAnimationConfig)
          
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
                  console.log('📱 Scroll:', Math.round(scrollVh) + 'vh | Progresso:', Math.round(progress) + '%')
                }
              },
              onEnter: () => {
                console.log('📱 ANIMAÇÃO DOS CARDS MOBILE INICIADA')
              },
              onLeave: () => {
                console.log('📱 ANIMAÇÃO DOS CARDS MOBILE FINALIZADA')
              },
              onEnterBack: () => console.log('🔄 ANIMAÇÃO DOS CARDS MOBILE REVERTENDO'),
              onLeaveBack: () => {
                console.log('🔄 ANIMAÇÃO DOS CARDS MOBILE RESETANDO')
              }
            }
          })
          
          // Encontrar cards mobile para animação
          const mobileCardElements = document.querySelectorAll('.mobile-product-item')
          console.log('📱 Cards mobile encontrados:', mobileCardElements.length)
          
          if (mobileCardElements.length > 0) {
            // Obter elemento de referência dentro do mockup mobile (igual ao desktop)
            const mobileReference = document.getElementById('mockup-center-reference-mobile')
            if (!mobileReference) {
              console.error('❌ Elemento de referência mobile não encontrado')
              return
            }
            
            // Animar cada card mobile
            mobileCardElements.forEach((productItem, index) => {
              console.log(`📱 Card mobile ${index}:`, {
                className: productItem.className,
                tagName: productItem.tagName
              })
              
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
                  console.log('📱 Debug primeiro card mobile:', {
                    productName,
                    cardRect,
                    referenceRect,
                    targetCenterX,
                    targetCenterY,
                    cardCenterX,
                    cardCenterY,
                    deltaX,
                    deltaY,
                    rotation,
                    finalScale
                  })
                }
                
                // Adicionar à timeline (exceto garrafa - ela terá timeline própria)
                if (!productName.includes('Garrafa')) {
                  console.log(`📱 Adicionando card mobile ${index} (${productName}) à timeline`)
                  
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
                console.log('📱 Cards mobile desaparecendo em >= 200vh')
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
                console.log('📱 Cards mobile desaparecendo em >= 200vh (scroll down)')
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
                console.log('📱 Cards mobile voltando a aparecer (< 200vh)')
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
                      console.log('📱 Garrafa Scroll:', Math.round(scrollVh) + 'vh | Progresso:', Math.round(progress) + '%')
                    }
                  },
                  onEnter: () => {
                    console.log('📱 TIMELINE GARRAFA MOBILE - Movimentação iniciada')
                  },
                  onLeave: () => {
                    console.log('📱 TIMELINE GARRAFA MOBILE - Movimentação finalizada')
                  },
                  onEnterBack: () => console.log('🔄 TIMELINE GARRAFA MOBILE - REVERTENDO'),
                  onLeaveBack: () => {
                    console.log('🔄 TIMELINE GARRAFA MOBILE - RESETANDO')
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
                
                console.log('📱 Configuração da garrafa mobile:', {
                  deltaX,
                  deltaY,
                  targetCenterX,
                  targetCenterY,
                  garrafaCenterX,
                  garrafaCenterY
                })
                
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
              console.log('📱 Configurando efeito de saída da garrafa mobile')
              ScrollTrigger.create({
                trigger: 'body',
                start: '200vh top', // Inicia o efeito de saída em 200vh
                end: '230vh top',   // Termina em 230vh
                scrub: 0.5,
                onEnter: () => {
                  console.log('📱 Ativando efeito de saída da garrafa mobile')
                  gsap.to(garrafaMobileElement, {
                    scale: 0.4,
                    y: -40,
                    rotation: 180,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'back.in(1.7)',
                    onComplete: () => {
                      console.log('📱 GARRAFA MOBILE - Saída concluída')
                    }
                  })
                },
                onEnterBack: () => {
                  console.log('📱 Revertendo efeito de saída da garrafa mobile')
                  gsap.to(garrafaMobileElement, {
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                      console.log('📱 GARRAFA MOBILE - Saída revertida')
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
                  console.log('🍶 Reset visual da garrafa mobile (scroll curto/topo)')
                  gsap.set(garrafaMobileElement, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: 0
                  })
                },
                onEnterBack: () => {
                  console.log('🍶 Reset visual da garrafa mobile (scroll curto/topo - enterBack)')
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
          
          console.log('✅ Animação dos cards mobile configurada')
          console.log('✅ PIN do mockup mobile configurado com sucesso')
        } else {
          console.log('❌ Mockup mobile NÃO encontrado - shouldUseMobile:', shouldUseMobile, 'mockupMobileRef.current:', !!mockupMobileRef.current)
        }
        
        // Verificar se os ScrollTriggers foram criados
        const allTriggers = ScrollTrigger.getAll()
        console.log('🔍 Total de ScrollTriggers criados:', allTriggers.length)
        allTriggers.forEach((trigger, index) => {
          console.log(`🔍 ScrollTrigger ${index}:`, {
            trigger: trigger.vars.trigger,
            start: trigger.vars.start,
            end: trigger.vars.end,
            pin: trigger.vars.pin ? 'PIN ATIVO' : 'SEM PIN'
          })
        })
        
        ScrollTrigger.refresh()
        return
      }

      // Verificar se targetCards existe (só desktop)
      if (!shouldUseMobile && !targetCards) {
        console.error('❌ Container de cards desktop não encontrado')
        return
      }

      console.log('✅ Todos os elementos encontrados, iniciando animações...')
      
      // Limpar ScrollTriggers existentes
      console.log('🧹 Limpando ScrollTriggers existentes...')
      const existingTriggers = ScrollTrigger.getAll()
      console.log('🔍 ScrollTriggers existentes:', existingTriggers.length)
      existingTriggers.forEach(trigger => {
        console.log('🗑️ Removendo trigger:', trigger.vars.trigger || 'unknown')
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
      
      console.log('🎯 Configuração de animação DESKTOP:', {
        range: animationConfig.range,
        scrub: animationConfig.scrub,
        initialScale: animationConfig.initialScale,
        finalScale: animationConfig.finalScale
      })
      
      // Timeline para animação dos cards
      console.log('🎬 Criando timeline para animação dos cards DESKTOP...')
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
              console.log('📊 Scroll:', Math.round(scrollVh) + 'vh | Progresso:', Math.round(progress) + '%')
            }
          },
          onEnter: () => {
            console.log('🎬 ANIMAÇÃO DOS CARDS DESKTOP INICIADA')
            console.log('🎯 Range:', animationConfig.range)
            console.log('🎯 Timeline criada:', !!tlCards)
          },
          onLeave: () => {
            console.log('🏁 ANIMAÇÃO DOS CARDS DESKTOP FINALIZADA')
          },
          onEnterBack: () => console.log('🔄 ANIMAÇÃO DOS CARDS DESKTOP REVERTENDO'),
          onLeaveBack: () => {
            console.log('🔄 ANIMAÇÃO DOS CARDS DESKTOP RESETANDO')
          }
        }
      })

      console.log('✅ Timeline criada:', !!tlCards)

      // Encontrar cards para animação (apenas desktop)
      console.log('🔍 Procurando cards desktop em:', targetCards)
      console.log('🔍 Classes do container:', targetCards?.className)
      
              const cardElements = targetCards?.querySelectorAll('.product-item') || []
      console.log('🔍 Cards desktop encontrados:', cardElements.length)
      
      if (cardElements.length === 0) {
        console.error('❌ NENHUM CARD DESKTOP ENCONTRADO!')
        return
      }
      

      
      // Animar cada card (apenas desktop)
      cardElements.forEach((productItem, index) => {
        console.log(`🔍 Card desktop ${index}:`, {
          className: productItem.className,
          tagName: productItem.tagName
        })
        
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
          console.log('🔍 Debug primeiro card desktop:', {
            productName,
            cardRect,
            referenceRect,
            targetCenterX,
            targetCenterY,
            cardCenterX,
            cardCenterY,
            deltaX,
            deltaY,
            rotation,
            finalScale
          })
        }
        
        // Adicionar à timeline
        console.log(`🎯 Adicionando card desktop ${index} (${productName}) à timeline`)
        
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
            console.log('🖥️ CARDS/ÍCONES - DESAPARECIMENTO PERMANENTE INICIADO (750vh)')
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
            console.log('🖥️ Cards e ícones desapareceram (garrafa permanece)');
          },
          onEnterBack: () => {
            console.log('🖥️ CARDS/ÍCONES - SCROLL REVERSO DENTRO DO RANGE (sem reversão)');
          },
          onLeaveBack: () => {
            console.log('🖥️ CARDS/ÍCONES - DESAPARECIMENTO PERMANENTE REVERTENDO (antes do start)');
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
            console.log('🖥️ Cards e ícones restaurados');
          }
        });
      }



      // Efeito de saída da garrafa (desktop) - independente do mobile
      if (!shouldUseMobile && desktopCardsRef.current && mockupRef.current) {
        const garrafaCard = Array.from(desktopCardsRef.current.querySelectorAll('.product-card-transparent'))
          .find(card => card.querySelector('img')?.alt === 'Garrafa Stanley');
        console.log('🖥️ Elemento garrafaCard encontrado para saída:', garrafaCard);
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=80vh', // Inicia o efeito de saída em 80vh
          end: '+=110vh',  // Termina em 110vh (antes do carousel)
          scrub: 0.5,
          onEnter: () => {
            if (garrafaCard) {
              console.log('🖥️ Ativando efeito de saída da garrafa (desktop)', garrafaCard);
              gsap.to(garrafaCard, {
                scale: 0.3,
                y: -50,
                rotation: 180,
                opacity: 0,
                duration: 1.5,
                ease: 'back.in(1.7)',
                onComplete: () => {
                  console.log('🖥️ GARRAFA - Saída concluída (desktop)')
                }
              });
            } else {
              console.log('🖥️ Nenhum elemento garrafaCard encontrado para saída (desktop)');
            }
          },
          onEnterBack: () => {
            if (garrafaCard) {
              console.log('🖥️ Revertendo efeito de saída da garrafa (desktop)', garrafaCard);
              gsap.to(garrafaCard, {
                scale: 1,
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'back.out(1.7)',
                onComplete: () => {
                  console.log('🖥️ GARRAFA - Saída revertida (desktop)')
                }
              });
            } else {
              console.log('🖥️ Nenhum elemento garrafaCard encontrado para reversão (desktop)');
            }
          }
        });
      }



      // Pin do mockup desktop (regra separada)
      if (!shouldUseMobile && mockupRef.current) {
        console.log('🖥️ Configurando PIN do mockup desktop')
        console.log('🖥️ isMobile:', isMobile, 'mockupRef.current:', !!mockupRef.current)
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=800vh', // Inicia em 800vh
          end: '+=1400vh',   // Termina em 1400vh
          pin: mockupRef.current.parentElement, // Pin no parente do mockup desktop
          pinSpacing: true,
          onEnter: () => {
            console.log('🖥️ MOCKUP DESKTOP PIN - INICIADO (800vh) - Mockup fixado na tela')
          },
          onLeave: () => {
            console.log('🖥️ MOCKUP DESKTOP PIN - FINALIZADO (1400vh) - Mockup liberado')
          },
          onEnterBack: () => {
            console.log('🖥️ MOCKUP DESKTOP PIN - REVERTENDO - Mockup será fixado novamente')
          },
          onLeaveBack: () => {
            console.log('🖥️ MOCKUP DESKTOP PIN - RESETANDO - Mockup liberado')
          }
        })
        console.log('✅ PIN do mockup desktop configurado')
      } else {
        console.log('❌ PIN do mockup desktop NÃO configurado - isMobile:', isMobile, 'mockupRef.current:', !!mockupRef.current)
      }




      


      ScrollTrigger.refresh()
      
      // Verificar se os ScrollTriggers foram criados
      const allTriggers = ScrollTrigger.getAll()
      console.log('🔍 Total de ScrollTriggers criados:', allTriggers.length)
      allTriggers.forEach((trigger, index) => {
        console.log(`🔍 ScrollTrigger ${index}:`, {
          trigger: trigger.vars.trigger,
          start: trigger.vars.start,
          end: trigger.vars.end,
          pin: trigger.vars.pin ? 'PIN ATIVO' : 'SEM PIN'
        })
      })
      
      return undefined // Garante que todas as rotas retornem algo
    }

    console.log('⏰ Configurando setTimeout para initAnimation')
    console.log('⏰ Estado atual do isMobile no useEffect:', isMobile)
    
    // Aguardar um pouco mais para garantir que o useResponsive tenha atualizado
    setTimeout(() => {
      console.log('⏰ Executando initAnimation após delay - isMobile:', isMobile)
      initAnimation()
    }, 500)
  }, [isMobile]) // Adicionar isMobile como dependência

  // Carousel de vídeos para desktop
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [showCarousel, setShowCarousel] = useState(false)
  const [mounted, setMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoList = [
    '/Garrafa_Reels.mp4',
    '/bolsa_reels_final.mp4',
    '/bolsa2_reels.mp4',
  ]

  // Novo estado para controlar a pilha de vídeos ativos
  const [videoStack, setVideoStack] = useState([{ key: 0, index: 0 }])

  // Novo estado para controlar se está em transição
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Função para avançar o carousel (desktop)
  const nextVideo = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (carouselIndex + 1) % videoList.length;
    setVideoStack([
      { key: carouselIndex, index: carouselIndex },
      { key: nextIndex, index: nextIndex }
    ]);
    setTimeout(() => {
      setCarouselIndex(nextIndex);
      setVideoStack([{ key: nextIndex, index: nextIndex }]);
      setIsTransitioning(false);
    }, 400);
  }

  // 1. Estados para controlar se o vídeo está pronto
  const [isVideoReady, setIsVideoReady] = useState(true)
  const [pendingIndex, setPendingIndex] = useState<number|null>(null)

  useEffect(() => {
    setMounted(true)
    if (!isMobile) {
      const handleScroll = () => {
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        const scrollVh = (scrollY / viewportHeight) * 100
        setShowCarousel(scrollVh >= 80 && scrollVh <= 250)
        console.log('[CAROUSEL DEBUG] scrollY:', scrollY, 'viewportHeight:', viewportHeight, 'scrollVh:', scrollVh, 'showCarousel:', scrollVh >= 80 && scrollVh <= 250)
      }
      window.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setShowCarousel(false)
      return undefined
    }
  }, [isMobile])

  // No setInterval, só chamar nextVideo/nextVideoMobile se não estiver em transição
  useEffect(() => {
    if (!isMobile) {
      if (showCarousel) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            if (!isTransitioning) nextVideo();
          }, 5000);
        }
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [showCarousel, isMobile, isTransitioning]);

  // 2. Função para trocar o vídeo do carousel DESKTOP
  useEffect(() => {
    if (pendingIndex !== null && isVideoReady) {
      setCarouselIndex(pendingIndex)
      setPendingIndex(null)
      setIsVideoReady(false)
    }
  }, [pendingIndex, isVideoReady])

  // Carousel de vídeos para mobile


  return (
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
            {mounted && !isMobile && showCarousel ? (
              <motion.div
                animate={{ y: `-${carouselIndex * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {videoList.map((src, i) => (
                  <video
                    key={i}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      flexShrink: 0,
                      minHeight: '100%'
                    }}
                  />
                ))}
              </motion.div>
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
            overflow: 'visible' // Permite que o conteúdo interno seja alterado
          }}
        >
          <div 
            className="mockup-screen relative w-full h-full"
          style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}
          >
              <img 
                src="/Splash_screen.svg" 
                alt="Splash Screen" 
                className="w-full h-full object-cover z-0"
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
          


        {/* Container para cards no desktop - mesma altura do título */}
        <div ref={desktopCardsRef} className="desktop-cards-container">
          <ProductsSection />
        </div>
      </div>

    </section>
  )
}

export default HeroSection 