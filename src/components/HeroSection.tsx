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
  (process.env.NODE_ENV !== "production") && console.log('🏗️ HeroSection renderizando:', {
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'N/A'
  })

  // Animação GSAP com ScrollTrigger
  useEffect(() => {
    (process.env.NODE_ENV !== "production") && console.log('🎬 useEffect iniciado')
    if (typeof window === 'undefined') {
      (process.env.NODE_ENV !== "production") && console.log('❌ Window não disponível')
      return
    }

    (process.env.NODE_ENV !== "production") && console.log('✅ Window disponível, registrando ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    // Aguardar um frame para garantir que todos os elementos estejam renderizados
    const initAnimation = () => {
      (process.env.NODE_ENV !== "production") && console.log('🔍 initAnimation chamada')
      (process.env.NODE_ENV !== "production") && console.log('📱 Estado do dispositivo - isMobile:', isMobile)
      (process.env.NODE_ENV !== "production") && console.log('📱 Window width:', window.innerWidth, 'Breakpoint mobile (<=768):', window.innerWidth <= 768)
      (process.env.NODE_ENV !== "production") && console.log('📱 Window height:', window.innerHeight)
      
      // Usar diretamente o window.innerWidth para evitar problemas de timing
      const actualIsMobile = window.innerWidth <= 768;
      (process.env.NODE_ENV !== "production") && console.log('📱 Estado real vs hook - actualIsMobile:', actualIsMobile, 'hookIsMobile:', isMobile);
      
      // Usar o estado real em vez do hook para evitar inconsistências
      const shouldUseMobile = actualIsMobile;
      
      const title = titleRef.current
      const centralIcon = centralIconRef.current
      const mockup = mockupRef.current
      const mockupMobile = mockupMobileRef.current
      const desktopCards = desktopCardsRef.current

      (process.env.NODE_ENV !== "production") && console.log('🔍 Elementos encontrados:', {
        title: !!title,
        centralIcon: !!centralIcon,
        mockup: !!mockup,
        mockupMobile: !!mockupMobile,
        desktopCards: !!desktopCards
      })

      if (!title || !centralIcon || !mockup || !mockupMobile || !desktopCards) {
        (process.env.NODE_ENV !== "production") && console.warn('⚠️ Elementos não encontrados para animação - tentando novamente...')
        setTimeout(initAnimation, 2000) // Delay ainda maior para garantir renderização completa
        return
      }
      
                // Verificar se os elementos de referência estão disponíveis
          if (isMobile) {
            const mobileReference = document.getElementById('mockup-center-reference-mobile')
            if (!mobileReference) {
              (process.env.NODE_ENV !== "production") && console.warn('⚠️ Elemento de referência mobile não encontrado - tentando novamente...')
              setTimeout(initAnimation, 3000) // Delay ainda maior
              return
            }
          } else {
            const desktopReference = document.getElementById('mockup-center-reference-desktop')
            if (!desktopReference) {
              (process.env.NODE_ENV !== "production") && console.warn('⚠️ Elemento de referência desktop não encontrado - tentando novamente...')
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
          (process.env.NODE_ENV !== "production") && console.log('🎯 Usando elemento de referência mobile específico')
        } else {
          (process.env.NODE_ENV !== "production") && console.warn('⚠️ Elemento de referência mobile não encontrado, usando mockup principal')
        }
      } else {
        const desktopReference = document.getElementById('mockup-center-reference-desktop')
        if (desktopReference) {
          targetReference = desktopReference
          (process.env.NODE_ENV !== "production") && console.log('🎯 Usando elemento de referência desktop específico')
        }
      }
      
      (process.env.NODE_ENV !== "production") && console.log('🎯 Usando mockup:', shouldUseMobile ? 'MOBILE' : 'DESKTOP')
      (process.env.NODE_ENV !== "production") && console.log('🎯 Usando cards:', shouldUseMobile ? 'NENHUM (MOBILE)' : 'DESKTOP CONTAINER')
      
      // Debug: verificar se os elementos estão sendo encontrados
      (process.env.NODE_ENV !== "production") && console.log('🔍 Debug elementos:', {
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
        (process.env.NODE_ENV !== "production") && console.log('📱 Mobile: Configurando apenas ScrollTriggers do PIN mobile')
        
        // Limpar ScrollTriggers existentes
        (process.env.NODE_ENV !== "production") && console.log('🧹 Limpando ScrollTriggers existentes...')
        const existingTriggers = ScrollTrigger.getAll()
        (process.env.NODE_ENV !== "production") && console.log('🔍 ScrollTriggers existentes:', existingTriggers.length)
        existingTriggers.forEach(trigger => {
          (process.env.NODE_ENV !== "production") && console.log('🗑️ Removendo trigger:', trigger.vars.trigger || 'unknown')
          trigger.kill()
        })
        
        // Configurar ScrollTriggers apenas para mobile
        (process.env.NODE_ENV !== "production") && console.log('📱 Configurando ScrollTriggers para mobile...')
        
                  // PIN do mockup mobile (usando o container correto)
          (process.env.NODE_ENV !== "production") && console.log('🔍 Verificando condições para PIN mobile...')
          (process.env.NODE_ENV !== "production") && console.log('🔍 shouldUseMobile:', shouldUseMobile)
          (process.env.NODE_ENV !== "production") && console.log('🔍 mockupMobileRef.current:', !!mockupMobileRef.current)
          (process.env.NODE_ENV !== "production") && console.log('🔍 mockupMobileRef.current.parentElement:', !!mockupMobileRef.current?.parentElement)
          
          if (shouldUseMobile && mockupMobileRef.current) {
            (process.env.NODE_ENV !== "production") && console.log('📱 Configurando PIN do mockup mobile')
            (process.env.NODE_ENV !== "production") && console.log('📱 isMobile:', isMobile, 'mockupMobileRef.current:', !!mockupMobileRef.current)
            
            // PIN do mockup mobile (mantido em 300-800vh)
            ScrollTrigger.create({
              trigger: 'body',
              start: '300vh top', // Inicia em 300vh de scroll
              end: '800vh top',   // Termina em 800vh de scroll
              pin: mockupMobileRef.current, // Pin no próprio mockup
              pinSpacing: true, // Habilitar pinSpacing para criar espaço e evitar sobreposição
              anticipatePin: 1, // Antecipar o pin para suavizar a transição
              onEnter: () => {
                (process.env.NODE_ENV !== "production") && console.log('📱 MOCKUP MOBILE PIN - INICIADO em 300vh')
                (process.env.NODE_ENV !== "production") && console.log('📱 ScrollTrigger ativado - mockup deve estar fixado agora')
              },
              onLeave: () => {
                (process.env.NODE_ENV !== "production") && console.log('📱 MOCKUP MOBILE PIN - FINALIZADO em 800vh')
                (process.env.NODE_ENV !== "production") && console.log('📱 ScrollTrigger finalizado - mockup deve estar livre agora')
              },
              onEnterBack: () => {
                (process.env.NODE_ENV !== "production") && console.log('📱 MOCKUP MOBILE PIN - REVERTENDO')
                (process.env.NODE_ENV !== "production") && console.log('📱 ScrollTrigger revertendo - mockup será fixado novamente')
              },
              onLeaveBack: () => {
                (process.env.NODE_ENV !== "production") && console.log('📱 MOCKUP MOBILE PIN - RESETANDO')
                (process.env.NODE_ENV !== "production") && console.log('📱 ScrollTrigger resetando - mockup liberado')
              },
              onUpdate: (self) => {
                (process.env.NODE_ENV !== "production") && console.log('📱 MOCKUP MOBILE PIN - UPDATE - Progress:', self.progress.toFixed(2), 'Scroll:', window.scrollY)
              }
            })
          
          // Efeito de saída do título e ícone central - MOBILE
          (process.env.NODE_ENV !== "production") && console.log('📱 Configurando animação de saída do título e ícone mobile')
          const tlTitleMobile = gsap.timeline({
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: '+=200vh', // Range menor para mobile
              scrub: 1,
              onEnter: () => (process.env.NODE_ENV !== "production") && console.log('📱 ANIMAÇÃO DO TÍTULO MOBILE INICIADA'),
              onLeave: () => (process.env.NODE_ENV !== "production") && console.log('📱 ANIMAÇÃO DO TÍTULO MOBILE FINALIZADA')
            }
          })
          
          // Animar título e ícone (exit) - mobile
          (process.env.NODE_ENV !== "production") && console.log('📱 Configurando animação do título mobile:', { title: !!title, centralIcon: !!centralIcon })
          
          tlTitleMobile.fromTo([title, centralIcon], 
            { y: 0, opacity: 1 },
            { y: -30, opacity: 0, ease: 'power3.out', duration: 2.0 }, // Mobile mais rápido
            0 // Começa imediatamente
          )
          
          (process.env.NODE_ENV !== "production") && console.log('✅ Animação de saída do título e ícone mobile configurada')
          
          // ===== ANIMAÇÃO DOS CARDS MOBILE =====
          (process.env.NODE_ENV !== "production") && console.log('📱 Configurando animação dos cards mobile')
          
          // Configurações para mobile (ajustadas para terminar antes do pin)
          const mobileAnimationConfig = {
            range: '200vh', // Termina antes do pin começar em 300vh
            scrub: 1,
            initialScale: 1,
            finalScale: { main: 1.5, others: 0.6 }
          }
          
          (process.env.NODE_ENV !== "production") && console.log('🎯 Configuração de animação MOBILE:', mobileAnimationConfig)
          
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
                  (process.env.NODE_ENV !== "production") && console.log('📱 Scroll:', Math.round(scrollVh) + 'vh | Progresso:', Math.round(progress) + '%')
                }
              },
              onEnter: () => {
                (process.env.NODE_ENV !== "production") && console.log('📱 ANIMAÇÃO DOS CARDS MOBILE INICIADA')
              },
              onLeave: () => {
                (process.env.NODE_ENV !== "production") && console.log('📱 ANIMAÇÃO DOS CARDS MOBILE FINALIZADA')
              },
              onEnterBack: () => (process.env.NODE_ENV !== "production") && console.log('🔄 ANIMAÇÃO DOS CARDS MOBILE REVERTENDO'),
              onLeaveBack: () => {
                (process.env.NODE_ENV !== "production") && console.log('🔄 ANIMAÇÃO DOS CARDS MOBILE RESETANDO')
              }
            }
          })
          
          // Encontrar cards mobile para animação
          const mobileCardElements = document.querySelectorAll('.mobile-product-item')
          (process.env.NODE_ENV !== "production") && console.log('📱 Cards mobile encontrados:', mobileCardElements.length)
          
          if (mobileCardElements.length > 0) {
            // Obter elemento de referência dentro do mockup mobile (igual ao desktop)
            const mobileReference = document.getElementById('mockup-center-reference-mobile')
            if (!mobileReference) {
              console.error('❌ Elemento de referência mobile não encontrado')
              return
            }
            
            // Animar cada card mobile
            mobileCardElements.forEach((productItem, index) => {
              (process.env.NODE_ENV !== "production") && console.log(`📱 Card mobile ${index}:`, {
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
                  (process.env.NODE_ENV !== "production") && console.log('📱 Debug primeiro card mobile:', {
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
                  (process.env.NODE_ENV !== "production") && console.log(`📱 Adicionando card mobile ${index} (${productName}) à timeline`)
                  
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
                (process.env.NODE_ENV !== "production") && console.log('📱 Cards mobile desaparecendo em >= 200vh')
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
                (process.env.NODE_ENV !== "production") && console.log('📱 Cards mobile desaparecendo em >= 200vh (scroll down)')
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
                (process.env.NODE_ENV !== "production") && console.log('📱 Cards mobile voltando a aparecer (< 200vh)')
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
                      (process.env.NODE_ENV !== "production") && console.log('📱 Garrafa Scroll:', Math.round(scrollVh) + 'vh | Progresso:', Math.round(progress) + '%')
                    }
                  },
                  onEnter: () => {
                    (process.env.NODE_ENV !== "production") && console.log('📱 TIMELINE GARRAFA MOBILE - Movimentação iniciada')
                  },
                  onLeave: () => {
                    (process.env.NODE_ENV !== "production") && console.log('📱 TIMELINE GARRAFA MOBILE - Movimentação finalizada')
                  },
                  onEnterBack: () => (process.env.NODE_ENV !== "production") && console.log('🔄 TIMELINE GARRAFA MOBILE - REVERTENDO'),
                  onLeaveBack: () => {
                    (process.env.NODE_ENV !== "production") && console.log('🔄 TIMELINE GARRAFA MOBILE - RESETANDO')
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
                
                (process.env.NODE_ENV !== "production") && console.log('📱 Configuração da garrafa mobile:', {
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
              (process.env.NODE_ENV !== "production") && console.log('📱 Configurando efeito de saída da garrafa mobile')
              ScrollTrigger.create({
                trigger: 'body',
                start: '200vh top', // Inicia o efeito de saída em 200vh
                end: '230vh top',   // Termina em 230vh
                scrub: 0.5,
                onEnter: () => {
                  (process.env.NODE_ENV !== "production") && console.log('📱 Ativando efeito de saída da garrafa mobile')
                  gsap.to(garrafaMobileElement, {
                    scale: 0.4,
                    y: -40,
                    rotation: 180,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'back.in(1.7)',
                    onComplete: () => {
                      (process.env.NODE_ENV !== "production") && console.log('📱 GARRAFA MOBILE - Saída concluída')
                    }
                  })
                },
                onEnterBack: () => {
                  (process.env.NODE_ENV !== "production") && console.log('📱 Revertendo efeito de saída da garrafa mobile')
                  gsap.to(garrafaMobileElement, {
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                      (process.env.NODE_ENV !== "production") && console.log('📱 GARRAFA MOBILE - Saída revertida')
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
                  (process.env.NODE_ENV !== "production") && console.log('🍶 Reset visual da garrafa mobile (scroll curto/topo)')
                  gsap.set(garrafaMobileElement, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: 0
                  })
                },
                onEnterBack: () => {
                  (process.env.NODE_ENV !== "production") && console.log('🍶 Reset visual da garrafa mobile (scroll curto/topo - enterBack)')
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
          
          (process.env.NODE_ENV !== "production") && console.log('✅ Animação dos cards mobile configurada')
          (process.env.NODE_ENV !== "production") && console.log('✅ PIN do mockup mobile configurado com sucesso')
        } else {
          (process.env.NODE_ENV !== "production") && console.log('❌ Mockup mobile NÃO encontrado - shouldUseMobile:', shouldUseMobile, 'mockupMobileRef.current:', !!mockupMobileRef.current)
        }
        
        // Verificar se os ScrollTriggers foram criados
        const allTriggers = ScrollTrigger.getAll()
        (process.env.NODE_ENV !== "production") && console.log('🔍 Total de ScrollTriggers criados:', allTriggers.length)
        allTriggers.forEach((trigger, index) => {
          (process.env.NODE_ENV !== "production") && console.log(`🔍 ScrollTrigger ${index}:`, {
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

      (process.env.NODE_ENV !== "production") && console.log('✅ Todos os elementos encontrados, iniciando animações...')
      
      // Limpar ScrollTriggers existentes
      (process.env.NODE_ENV !== "production") && console.log('🧹 Limpando ScrollTriggers existentes...')
      const existingTriggers = ScrollTrigger.getAll()
      (process.env.NODE_ENV !== "production") && console.log('🔍 ScrollTriggers existentes:', existingTriggers.length)
      existingTriggers.forEach(trigger => {
        (process.env.NODE_ENV !== "production") && console.log('🗑️ Removendo trigger:', trigger.vars.trigger || 'unknown')
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
      
      (process.env.NODE_ENV !== "production") && console.log('🎯 Configuração de animação DESKTOP:', {
        range: animationConfig.range,
        scrub: animationConfig.scrub,
        initialScale: animationConfig.initialScale,
        finalScale: animationConfig.finalScale
      })
      
      // Timeline para animação dos cards
      (process.env.NODE_ENV !== "production") && console.log('🎬 Criando timeline para animação dos cards DESKTOP...')
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
              (process.env.NODE_ENV !== "production") && console.log('📊 Scroll:', Math.round(scrollVh) + 'vh | Progresso:', Math.round(progress) + '%')
            }
          },
          onEnter: () => {
            (process.env.NODE_ENV !== "production") && console.log('🎬 ANIMAÇÃO DOS CARDS DESKTOP INICIADA')
            (process.env.NODE_ENV !== "production") && console.log('🎯 Range:', animationConfig.range)
            (process.env.NODE_ENV !== "production") && console.log('🎯 Timeline criada:', !!tlCards)
          },
          onLeave: () => {
            (process.env.NODE_ENV !== "production") && console.log('🏁 ANIMAÇÃO DOS CARDS DESKTOP FINALIZADA')
          },
          onEnterBack: () => (process.env.NODE_ENV !== "production") && console.log('🔄 ANIMAÇÃO DOS CARDS DESKTOP REVERTENDO'),
          onLeaveBack: () => {
            (process.env.NODE_ENV !== "production") && console.log('🔄 ANIMAÇÃO DOS CARDS DESKTOP RESETANDO')
          }
        }
      })

      (process.env.NODE_ENV !== "production") && console.log('✅ Timeline criada:', !!tlCards)

      // Encontrar cards para animação (apenas desktop)
      (process.env.NODE_ENV !== "production") && console.log('🔍 Procurando cards desktop em:', targetCards)
      (process.env.NODE_ENV !== "production") && console.log('🔍 Classes do container:', targetCards?.className)
      
              const cardElements = targetCards?.querySelectorAll('.product-item') || []
      (process.env.NODE_ENV !== "production") && console.log('🔍 Cards desktop encontrados:', cardElements.length)
      
      if (cardElements.length === 0) {
        console.error('❌ NENHUM CARD DESKTOP ENCONTRADO!')
        return
      }
      

      
      // Animar cada card (apenas desktop)
      cardElements.forEach((productItem, index) => {
        (process.env.NODE_ENV !== "production") && console.log(`🔍 Card desktop ${index}:`, {
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
          (process.env.NODE_ENV !== "production") && console.log('🔍 Debug primeiro card desktop:', {
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
        (process.env.NODE_ENV !== "production") && console.log(`🎯 Adicionando card desktop ${index} (${productName}) à timeline`)
        
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
      (process.env.NODE_ENV !== "production") && console.log('🎯 Range da animação do título:', titleAnimationRange)
      
      const tlTitle = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: `+=${titleAnimationRange}`,
          scrub: 1,
          onEnter: () => (process.env.NODE_ENV !== "production") && console.log('🎬 ANIMAÇÃO DO TÍTULO INICIADA'),
          onLeave: () => (process.env.NODE_ENV !== "production") && console.log('🏁 ANIMAÇÃO DO TÍTULO FINALIZADA')
        }
      })

      // Animar título e ícone (exit) - timeline independente
      (process.env.NODE_ENV !== "production") && console.log('🎬 Configurando animação do título:', { title: !!title, centralIcon: !!centralIcon })
      
      // Animação do título - duração ainda mais aumentada
      const titleDuration = window.innerWidth <= 768 ? 2.0 : 4.0 // Desktop mais lento
      const titleEase = window.innerWidth <= 768 ? 'power3.out' : 'power1.out' // Desktop mais suave
      
      tlTitle.fromTo([title, centralIcon], 
        { y: 0, opacity: 1 },
        { y: -50, opacity: 0, ease: titleEase, duration: titleDuration }, // Desktop mais lento e suave
        0 // Começa imediatamente
      )
      
      (process.env.NODE_ENV !== "production") && console.log('✅ Animação do título configurada com timeline independente - teste agressivo')

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
            (process.env.NODE_ENV !== "production") && console.log('🖥️ CARDS/ÍCONES - DESAPARECIMENTO PERMANENTE INICIADO (750vh)')
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
            (process.env.NODE_ENV !== "production") && console.log('🖥️ Cards e ícones desapareceram (garrafa permanece)');
          },
          onEnterBack: () => {
            (process.env.NODE_ENV !== "production") && console.log('🖥️ CARDS/ÍCONES - SCROLL REVERSO DENTRO DO RANGE (sem reversão)');
          },
          onLeaveBack: () => {
            (process.env.NODE_ENV !== "production") && console.log('🖥️ CARDS/ÍCONES - DESAPARECIMENTO PERMANENTE REVERTENDO (antes do start)');
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
            (process.env.NODE_ENV !== "production") && console.log('🖥️ Cards e ícones restaurados');
          }
        });
      }



      // Efeito de saída da garrafa (desktop) - independente do mobile
      if (!shouldUseMobile && desktopCardsRef.current && mockupRef.current) {
        const garrafaCard = Array.from(desktopCardsRef.current.querySelectorAll('.product-card-transparent'))
          .find(card => card.querySelector('img')?.alt === 'Garrafa Stanley');
        (process.env.NODE_ENV !== "production") && console.log('🖥️ Elemento garrafaCard encontrado para saída:', garrafaCard);
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=80vh', // Inicia o efeito de saída em 80vh
          end: '+=110vh',  // Termina em 110vh (antes do carousel)
          scrub: 0.5,
          onEnter: () => {
            if (garrafaCard) {
              (process.env.NODE_ENV !== "production") && console.log('🖥️ Ativando efeito de saída da garrafa (desktop)', garrafaCard);
              gsap.to(garrafaCard, {
                scale: 0.3,
                y: -50,
                rotation: 180,
                opacity: 0,
                duration: 1.5,
                ease: 'back.in(1.7)',
                onComplete: () => {
                  (process.env.NODE_ENV !== "production") && console.log('🖥️ GARRAFA - Saída concluída (desktop)')
                }
              });
            } else {
              (process.env.NODE_ENV !== "production") && console.log('🖥️ Nenhum elemento garrafaCard encontrado para saída (desktop)');
            }
          },
          onEnterBack: () => {
            if (garrafaCard) {
              (process.env.NODE_ENV !== "production") && console.log('🖥️ Revertendo efeito de saída da garrafa (desktop)', garrafaCard);
              gsap.to(garrafaCard, {
                scale: 1,
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'back.out(1.7)',
                onComplete: () => {
                  (process.env.NODE_ENV !== "production") && console.log('🖥️ GARRAFA - Saída revertida (desktop)')
                }
              });
            } else {
              (process.env.NODE_ENV !== "production") && console.log('🖥️ Nenhum elemento garrafaCard encontrado para reversão (desktop)');
            }
          }
        });
      }



      // Pin do mockup desktop (regra separada)
      if (!shouldUseMobile && mockupRef.current) {
        (process.env.NODE_ENV !== "production") && console.log('🖥️ Configurando PIN do mockup desktop')
        (process.env.NODE_ENV !== "production") && console.log('🖥️ isMobile:', isMobile, 'mockupRef.current:', !!mockupRef.current)
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=800vh', // Inicia em 800vh
          end: '+=1400vh',   // Termina em 1400vh
          pin: mockupRef.current.parentElement, // Pin no parente do mockup desktop
          pinSpacing: true,
          onEnter: () => {
            (process.env.NODE_ENV !== "production") && console.log('🖥️ MOCKUP DESKTOP PIN - INICIADO (800vh) - Mockup fixado na tela')
          },
          onLeave: () => {
            (process.env.NODE_ENV !== "production") && console.log('🖥️ MOCKUP DESKTOP PIN - FINALIZADO (1400vh) - Mockup liberado')
          },
          onEnterBack: () => {
            (process.env.NODE_ENV !== "production") && console.log('🖥️ MOCKUP DESKTOP PIN - REVERTENDO - Mockup será fixado novamente')
          },
          onLeaveBack: () => {
            (process.env.NODE_ENV !== "production") && console.log('🖥️ MOCKUP DESKTOP PIN - RESETANDO - Mockup liberado')
          }
        })
        (process.env.NODE_ENV !== "production") && console.log('✅ PIN do mockup desktop configurado')
      } else {
        (process.env.NODE_ENV !== "production") && console.log('❌ PIN do mockup desktop NÃO configurado - isMobile:', isMobile, 'mockupRef.current:', !!mockupRef.current)
      }




      


      ScrollTrigger.refresh()
      
      // Verificar se os ScrollTriggers foram criados
      const allTriggers = ScrollTrigger.getAll()
      (process.env.NODE_ENV !== "production") && console.log('🔍 Total de ScrollTriggers criados:', allTriggers.length)
      allTriggers.forEach((trigger, index) => {
        (process.env.NODE_ENV !== "production") && console.log(`🔍 ScrollTrigger ${index}:`, {
          trigger: trigger.vars.trigger,
          start: trigger.vars.start,
          end: trigger.vars.end,
          pin: trigger.vars.pin ? 'PIN ATIVO' : 'SEM PIN'
        })
      })
      
      return undefined // Garante que todas as rotas retornem algo
    }

    (process.env.NODE_ENV !== "production") && console.log('⏰ Configurando setTimeout para initAnimation')
    (process.env.NODE_ENV !== "production") && console.log('⏰ Estado atual do isMobile no useEffect:', isMobile)
    
    // Aguardar um pouco mais para garantir que o useResponsive tenha atualizado
    setTimeout(() => {
      (process.env.NODE_ENV !== "production") && console.log('⏰ Executando initAnimation após delay - isMobile:', isMobile)
      initAnimation()
    }, 500)
  }, [isMobile]) // Adicionar isMobile como dependência

  // Novo carousel desktop tipo TikTok
  const videoList = [
    '/Garrafa_Reels.mp4',
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
  }, [showCarousel, isMobile]);

  // Resetar carouselIndex para 0 sempre que showCarousel for ativado (desktop)
  useEffect(() => {
    if (showCarousel) setCarouselIndex(0);
  }, [showCarousel]);

  // Novo carousel mobile tipo TikTok
  const mobileVideoList = [
    '/Garrafa_Reels.mp4',
    '/bolsa2_reels.mp4',
    '/parafusadeira_reels.mp4',
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
  }, [showMobileCarousel, isMobile]);

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
    '/Garrafa_Reels.mp4',
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
      } else if (scrollVh < 100) {
        // Voltar para a posição original (top fixo)
        gsap.to(ctaBtn, { top: 'calc(50% - 260px)', duration: 0.3, ease: 'power2.out' });
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

  // Componente do botão CTA usando portal
  const DownloadCTAButton = ({ visible }: { visible: boolean }) => {
    if (typeof window === 'undefined') return null;
    return ReactDOM.createPortal(
      <div
        id="cta-download-mobile"
        style={{
          position: 'fixed',
          left: '50%',
          top: 'calc(50% - 260px)', // Movido 20px para baixo
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
                <div className="mobile-carousel-container" style={{ width: '100%', height: '100%' }}>
                  <AnimatePresence initial={false}>
                    {mobileVideoList.map((src, i) =>
                      i === mobileCarouselIndex ? (
                        <motion.video
                          key={i}
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
                          poster="/frame_video1.png"
                        />
                      ) : null
                    )}
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
                    O marketplace<br />brasileiro feito para transformar como as pessoas compram e vendem no digital.
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