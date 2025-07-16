'use client'

import { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LogoIcon from '@/components/LogoIcon'
import Logo from '@/components/Logo'
import GSAPDemo from '@/components/GSAPDemo'
import FloatingParticles from '@/components/FloatingParticles'
import CursorGlow from '@/components/CursorGlow'
import type { NavItem, Feature, FooterSection } from '@/types'

// Dados de exemplo para a landing page
const navigationItems: NavItem[] = []

const featuresData: Feature[] = [
  {
    id: '1',
    title: 'Design Responsivo',
    description: 'Layouts que se adaptam perfeitamente a qualquer dispositivo, garantindo uma experiência consistente.',
    icon: 'responsive',
    color: 'primary'
  },
  {
    id: '2',
    title: 'Performance Otimizada',
    description: 'Carregamento ultra-rápido e otimizações avançadas para máxima velocidade e eficiência.',
    icon: 'performance',
    color: 'secondary'
  },
  {
    id: '3',
    title: 'SEO Avançado',
    description: 'Ferramentas integradas para melhorar seu ranking nos motores de busca e aumentar a visibilidade.',
    icon: 'seo',
    color: 'success'
  },
  {
    id: '4',
    title: 'Analytics em Tempo Real',
    description: 'Acompanhe o desempenho do seu site com métricas detalhadas e insights valiosos.',
    icon: 'analytics',
    color: 'warning'
  },
  {
    id: '5',
    title: 'Suporte 24/7',
    description: 'Equipe especializada disponível 24 horas por dia para ajudar você a ter sucesso.',
    icon: 'support',
    color: 'danger'
  },
  {
    id: '6',
    title: 'Integrações Fáceis',
    description: 'Conecte-se com suas ferramentas favoritas através de nossa API robusta e flexível.',
    icon: 'integrations',
    color: 'primary'
  }
]

const footerSections: FooterSection[] = [
  {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#features' },
      { label: 'Preços', href: '#pricing' },
      { label: 'Integrações', href: '#integrations' },
      { label: 'API', href: '#api' },
      { label: 'Documentação', href: '#docs', external: true }
    ]
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Nós', href: '#about' },
      { label: 'Carreiras', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Imprensa', href: '#press' },
      { label: 'Parceiros', href: '#partners' }
    ]
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de Ajuda', href: '#help' },
      { label: 'Comunidade', href: '#community' },
      { label: 'Status', href: '#status' },
      { label: 'Contato', href: '#contact' },
      { label: 'Feedback', href: '#feedback' }
    ]
  }
]

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const mobileTitleRef = useRef<HTMLHeadingElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const mobileCardsRef = useRef<HTMLDivElement>(null)
  const heartIconRef = useRef<HTMLDivElement>(null)
  const mobileHeartIconRef = useRef<HTMLDivElement>(null)
  const rectangleRef = useRef<HTMLDivElement>(null)
  const mobileRectangleRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const mobileTitleContainerRef = useRef<HTMLDivElement>(null)
  
  // Estado para controlar o conteúdo do retângulo
  const [rectangleContent, setRectangleContent] = useState<'splash' | 'final'>('splash')
  
  // Refs para os cards desktop
  const garrafaCardRef = useRef<HTMLDivElement>(null)
  const ursopeluciaCardRef = useRef<HTMLDivElement>(null)
  const blusaCardRef = useRef<HTMLDivElement>(null)
  const bolsaCardRef = useRef<HTMLDivElement>(null)
  const oculosCardRef = useRef<HTMLDivElement>(null)
  const maquiagemCardRef = useRef<HTMLDivElement>(null)
  const tenisCardRef = useRef<HTMLDivElement>(null)
  const boneCardRef = useRef<HTMLDivElement>(null)
  const cremeCardRef = useRef<HTMLDivElement>(null)
  const cameraCardRef = useRef<HTMLDivElement>(null)

  // Refs para os cards mobile
  const mobileGarrafaCardRef = useRef<HTMLDivElement>(null)
  const mobileUrsopeluciaCardRef = useRef<HTMLDivElement>(null)
  const mobileBlusaCardRef = useRef<HTMLDivElement>(null)
  const mobileBolsaCardRef = useRef<HTMLDivElement>(null)
  const mobileMaquiagemCardRef = useRef<HTMLDivElement>(null)
  const mobileTenisCardRef = useRef<HTMLDivElement>(null)
  const mobileBoneCardRef = useRef<HTMLDivElement>(null)
  const mobileRelogioCardRef = useRef<HTMLDivElement>(null)
  const mobileCameraCardRef = useRef<HTMLDivElement>(null)

  // Registrar o plugin ScrollTrigger
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }
  }, [])

  // Animação GSAP para o título (segura para cliques)
  useEffect(() => {
    const title = titleRef.current
    const mobileTitle = mobileTitleRef.current

    if (title) {
      // Timeline para animação do título desktop
      const tl = gsap.timeline()
      
      // Animação de entrada do título (sem transformações que interferem)
      tl.fromTo(title, {
        opacity: 0,
        scale: 0.95
      }, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.5
      })
      // Efeito de brilho sutil
      .to(title, {
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      }, '-=0.8')
    }

    if (mobileTitle) {
      // Timeline para animação do título mobile
      const tlMobile = gsap.timeline()
      
      // Animação de entrada do título mobile (sem transformações que interferem)
      tlMobile.fromTo(mobileTitle, {
        opacity: 0,
        scale: 0.95
      }, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.5
      })
      // Efeito de brilho sutil
      .to(mobileTitle, {
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      }, '-=0.8')
    }
  }, [])

  // Animação GSAP para header, cards, ícone de coração e retângulo
  useEffect(() => {
    const header = headerRef.current
    const cards = cardsRef.current
    const mobileCards = mobileCardsRef.current
    const heartIcon = heartIconRef.current
    const mobileHeartIcon = mobileHeartIconRef.current
    const rectangle = rectangleRef.current

    // Animação do header (simplificada para não interferir com cliques)
    if (header) {
      gsap.fromTo(header, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
      })
    }

    // Animação dos cards desktop (segura para cliques)
    if (cards) {
      const cardElements = cards.querySelectorAll('.product-card-transparent')
      const iconElements = cards.querySelectorAll('img[src*="icon"]')
      
      // Timeline para cards
      const tlCards = gsap.timeline()
      
      tlCards.fromTo(cardElements, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
      })
      .fromTo(iconElements, {
        opacity: 0,
        scale: 0.5,
        rotation: -180
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      }, '-=0.4')
    }

    // Animação dos cards mobile (segura para cliques)
    if (mobileCards) {
      const mobileCardElements = mobileCards.querySelectorAll('.product-card-transparent')
      const mobileIconElements = mobileCards.querySelectorAll('img[src*="icon"]')
      
      // Timeline para cards mobile
      const tlMobileCards = gsap.timeline()
      
      tlMobileCards.fromTo(mobileCardElements, {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
      })
      .fromTo(mobileIconElements, {
        opacity: 0,
        scale: 0.5,
        rotation: -180
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      }, '-=0.4')
    }

    // Animação do ícone de coração desktop (segura para cliques)
    if (heartIcon) {
      const tlHeart = gsap.timeline()
      
      tlHeart.fromTo(heartIcon, {
        opacity: 0,
        scale: 0.3,
        rotation: -180
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.8
      })
      // Efeito de pulso contínuo
      .to(heartIcon, {
        scale: 1.1,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      }, '-=0.8')
    }

          // Animação do ícone de coração mobile (segura para cliques)
    if (mobileHeartIcon) {
      const tlMobileHeart = gsap.timeline()
      
      tlMobileHeart.fromTo(mobileHeartIcon, {
        opacity: 0,
        scale: 0.3,
        rotation: -180
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.8
      })
      // Efeito de pulso contínuo
      .to(mobileHeartIcon, {
        scale: 1.1,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      }, '-=0.8')
    }


  }, [])



  // Efeito dos cards entrando no retângulo - VERSÃO OTIMIZADA
  useEffect(() => {
    // Não limpar todos os ScrollTriggers aqui para não interferir com outras animações
    
    const rectangle = rectangleRef.current
    const garrafaCard = garrafaCardRef.current
    const ursopeluciaCard = ursopeluciaCardRef.current
    const blusaCard = blusaCardRef.current
    const bolsaCard = bolsaCardRef.current
    const oculosCard = oculosCardRef.current
    const maquiagemCard = maquiagemCardRef.current
    const tenisCard = tenisCardRef.current
    const boneCard = boneCardRef.current
    const cremeCard = cremeCardRef.current
    const cameraCard = cameraCardRef.current

    // Refs mobile
    const mobileGarrafaCard = mobileGarrafaCardRef.current
    const mobileUrsopeluciaCard = mobileUrsopeluciaCardRef.current
    const mobileBlusaCard = mobileBlusaCardRef.current
    const mobileBolsaCard = mobileBolsaCardRef.current
    const mobileMaquiagemCard = mobileMaquiagemCardRef.current
    const mobileTenisCard = mobileTenisCardRef.current
    const mobileBoneCard = mobileBoneCardRef.current
    const mobileRelogioCard = mobileRelogioCardRef.current
    const mobileCameraCard = mobileCameraCardRef.current

    // Listener para redimensionamento da janela (definido fora do if para ser acessível no cleanup)
    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 768 || window.matchMedia('(max-width: 768px)').matches
      console.log('🔄 Redimensionamento detectado - Mobile:', isMobileNow, 'Largura:', window.innerWidth)
      
      // Recarregar ScrollTrigger para ajustar aos novos tamanhos
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('resize', handleResize)
    
    if (rectangle && garrafaCard && ursopeluciaCard && blusaCard && bolsaCard && 
        oculosCard && maquiagemCard && tenisCard && boneCard && cremeCard && cameraCard &&
        mobileGarrafaCard && mobileUrsopeluciaCard && mobileBlusaCard && mobileBolsaCard &&
        mobileMaquiagemCard && mobileTenisCard && mobileBoneCard &&
        mobileRelogioCard && mobileCameraCard) {
      
      // Obter referência do retângulo mobile
      const mobileRectangle = mobileRectangleRef.current
      
      console.log('=== CONFIGURAÇÃO DE ANIMAÇÃO ===')
      console.log('Retângulo Desktop:', rectangle ? '✅ Encontrado' : '❌ Não encontrado')
      console.log('Retângulo Mobile:', mobileRectangle ? '✅ Encontrado' : '❌ Não encontrado')
      console.log('================================')
      
      // Array com todos os cards desktop
      const cards = [
        { ref: garrafaCard, scale: 2.2, zIndex: 1000, rotation: 0 }, // Garrafa sempre na frente (z-index máximo)
        { ref: ursopeluciaCard, scale: 0.7, zIndex: 50, rotation: -25 }, // Esquerda
        { ref: blusaCard, scale: 0.7, zIndex: 50, rotation: 25 }, // Direita
        { ref: bolsaCard, scale: 0.7, zIndex: 50, rotation: 30 }, // Direita
        { ref: oculosCard, scale: 0.7, zIndex: 50, rotation: -30 }, // Esquerda
        { ref: maquiagemCard, scale: 0.7, zIndex: 50, rotation: 35 }, // Direita
        { ref: tenisCard, scale: 0.7, zIndex: 50, rotation: -20 }, // Esquerda
        { ref: boneCard, scale: 0.7, zIndex: 50, rotation: 20 }, // Direita
        { ref: cremeCard, scale: 0.7, zIndex: 50, rotation: -35 }, // Esquerda
        { ref: cameraCard, scale: 0.7, zIndex: 50, rotation: 40 } // Direita
      ]

      // Array com todos os cards mobile
      const mobileCards = [
        { ref: mobileGarrafaCard, scale: 2.2, zIndex: 1000, rotation: 0 }, // Garrafa sempre na frente (z-index máximo)
        { ref: mobileUrsopeluciaCard, scale: 0.7, zIndex: 50, rotation: -25 }, // Esquerda
        { ref: mobileBlusaCard, scale: 0.7, zIndex: 50, rotation: 25 }, // Direita
        { ref: mobileBolsaCard, scale: 0.7, zIndex: 50, rotation: 30 }, // Direita
        { ref: mobileMaquiagemCard, scale: 0.7, zIndex: 50, rotation: 35 }, // Direita
        { ref: mobileTenisCard, scale: 0.7, zIndex: 50, rotation: -20 }, // Esquerda
        { ref: mobileBoneCard, scale: 0.7, zIndex: 50, rotation: 20 }, // Direita
        { ref: mobileRelogioCard, scale: 0.7, zIndex: 50, rotation: -35 }, // Esquerda
        { ref: mobileCameraCard, scale: 0.7, zIndex: 50, rotation: 40 } // Direita
      ]
      
      // Pin do retângulo desktop (independente da animação dos cards)
      ScrollTrigger.create({
        trigger: rectangle.parentElement?.parentElement,
        start: 'top top', // Quando o topo da seção toca o topo da viewport
        end: 'bottom center', // Quando a base da seção toca o centro da viewport
        pin: rectangle.parentElement,
        pinSpacing: true,
        onRefresh: () => {
          console.log('🔄 Pin do retângulo DESKTOP recarregado')
        }
      })
      
      // Pin do retângulo mobile (independente da animação dos cards) - USANDO KEYWORDS
      // Apenas para mobile - começa a partir de 400vh
      if (mobileRectangle) {
        // Verificar se o elemento mobile está visível (usando CSS display)
        const mobileSection = mobileRectangle.closest('.lg\\:hidden')
        if (mobileSection && window.getComputedStyle(mobileSection).display !== 'none') {
          console.log('📱 Configurando pin do retângulo MOBILE - Largura:', window.innerWidth)
          ScrollTrigger.create({
            trigger: 'body',
            start: '+=400vh', // Começa a partir de 400vh no mobile
            end: '+=600vh', // Dura 200vh de pin
            pin: mobileRectangle.parentElement,
            pinSpacing: true,
            onEnter: () => {
              console.log('📌 Pin do retângulo MOBILE ATIVADO - 400vh')
            },
            onLeave: () => {
              console.log('🔓 Pin do retângulo MOBILE LIBERADO - 600vh')
            },
            onEnterBack: () => {
              console.log('📌 Pin do retângulo MOBILE ATIVADO novamente - 600vh')
            },
            onLeaveBack: () => {
              console.log('🔓 Pin do retângulo MOBILE LIBERADO novamente - 400vh')
            },
            onRefresh: () => {
              console.log('🔄 Pin do retângulo MOBILE recarregado')
            }
          })
        } else {
          console.log('🖥️ Desktop detectado - Pin do retângulo mobile não aplicado (elemento oculto)')
        }
      } else {
        console.log('⚠️ Referência do retângulo mobile não encontrada')
      }
      
      // Timeline para animação dos cards - USANDO VIEWPORT UNITS
      const tlCards = gsap.timeline({
        scrollTrigger: {
          trigger: 'body', // Trigger no body para começar desde o início
          start: 'top top', // Começa desde o topo da página
          end: '+=800vh', // Dura 800vh (8x altura da viewport) de scroll para animação bem mais lenta
          scrub: 2, // Sincroniza com o scroll com suavização de 2 segundos
          onUpdate: (self) => {
            console.log('=== SCROLL TRIGGER UPDATE ===')
            console.log('Progress:', Math.round(self.progress * 100) + '%')
            console.log('Direction:', self.direction)
            console.log('Is Active:', self.isActive)
            console.log('=============================')
          },
          onEnter: () => {
            console.log('🎬 ANIMAÇÃO INICIADA - Cards começando a se mover')
          },
          onLeave: () => {
            console.log('🏁 ANIMAÇÃO FINALIZADA - Cards chegaram ao destino')
          },
          onEnterBack: () => {
            console.log('↩️ ANIMAÇÃO REVERTENDO - Scroll para cima')
          },
          onLeaveBack: () => {
            console.log('🔄 ANIMAÇÃO RESETANDO - Voltando ao início')
          },
          onRefresh: () => {
            console.log('🔄 Timeline dos cards recarregada')
          }
        }
      })
      
      // Função para animar cards (desktop e mobile)
      const animateCards = (cardsArray: Array<{ ref: HTMLElement, scale: number, zIndex: number, rotation: number }>, isMobile = false) => {
        cardsArray.forEach(({ ref, scale, zIndex, rotation }, index: number) => {
          // Calcular posição atual do card (PONTO A)
          const cardRect = ref.getBoundingClientRect()
          const cardCenterX = cardRect.left + cardRect.width / 2
          const cardCenterY = cardRect.top + cardRect.height / 2
          
          // Usar a referência correta do retângulo baseado na versão
          const targetRectangle = isMobile ? mobileRectangle : rectangle
          if (!targetRectangle) {
            console.error(`❌ Referência do retângulo ${isMobile ? 'MOBILE' : 'DESKTOP'} não encontrada`)
            return
          }
          const rectRect = targetRectangle.getBoundingClientRect()
          const rectCenterX = rectRect.left + rectRect.width / 2
          const rectCenterY = rectRect.top + rectRect.height / 2
          
          // Calcular distância até o centro do retângulo (PONTO B)
          let deltaX = rectCenterX - cardCenterX
          let deltaY = rectCenterY - cardCenterY
          
          // Para a garrafa (index 0), calcular posição para centralizar no retângulo
          if (index === 0) {
            // Calcular o centro atual da garrafa
            const garrafaCenterX = cardRect.left + cardRect.width / 2
            const garrafaCenterY = cardRect.top + cardRect.height / 2
            
            // Calcular a distância direta do centro da garrafa ao centro do retângulo
            deltaX = rectCenterX - garrafaCenterX
            deltaY = rectCenterY - garrafaCenterY
            
            console.log(`🎯 GARRAFA ${isMobile ? 'MOBILE' : 'DESKTOP'} - Centralização:`, {
              retangulo: { x: rectCenterX, y: rectCenterY },
              garrafa: { x: garrafaCenterX, y: garrafaCenterY },
              delta: { x: deltaX, y: deltaY }
            })
          }
          
          console.log(`Card ${index + 1} ${isMobile ? 'MOBILE' : 'DESKTOP'}:`, {
            atual: { x: cardCenterX, y: cardCenterY },
            destino: { x: rectCenterX, y: rectCenterY },
            delta: { x: deltaX, y: deltaY },
            scale: scale
          })
          
          // Animação: PONTO A → PONTO B (centro do retângulo)
          tlCards.fromTo(ref, 
            // PONTO A - Posição inicial
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              zIndex: index === 0 ? 1000 : 10 + index // Garrafa sempre com z-index máximo
            },
            // PONTO B - Centro do retângulo
            {
              x: deltaX,
              y: deltaY,
              scale: scale,
              rotation: rotation, // Usar a rotação calculada
              zIndex: zIndex, // Usar o zIndex definido no array (1000 para garrafa)
              ease: 'power3.out',
              onUpdate: function() {
                // Log a cada 25% do progresso para não sobrecarregar o console
                const progress = this.progress()
                if (progress % 0.25 < 0.01) {
                  console.log(`📦 Card ${index + 1} ${isMobile ? 'MOBILE' : 'DESKTOP'} (${ref.querySelector('img')?.alt || 'Card'}):`)
                  console.log(`   Progresso: ${Math.round(progress * 100)}%`)
                  console.log(`   Posição: x=${Math.round(this.targets()[0]._gsap.x)}px, y=${Math.round(this.targets()[0]._gsap.y)}px`)
                  console.log(`   Escala: ${this.targets()[0]._gsap.scale}`)
                  console.log(`   Rotação: ${this.targets()[0]._gsap.rotation}°`)
                }
              }
            },
            0 // Sem delay - todos começam juntos
          )
        })
      }

      // Animar cards desktop
      animateCards(cards, false)
      
      // Animar cards mobile
      animateCards(mobileCards, true)
      
      // Recalibrar ScrollTrigger após setup completo
      ScrollTrigger.refresh()
      console.log('✅ ScrollTrigger recarregado e pronto')
      
      // Pin específico para o card da garrafa desktop entre 500vh e 700vh
      ScrollTrigger.create({
        trigger: 'body',
        start: '+=500vh', // Começa em 500vh
        end: '+=700vh', // Termina em 700vh
        pin: garrafaCard, // Fixa o card da garrafa
        pinSpacing: true,
        onEnter: () => {
          // Garantir que a garrafa fique na frente durante o pin
          gsap.set(garrafaCard, { zIndex: 1000 })
          console.log('📌 Card da garrafa DESKTOP FIXADO - 500vh (z-index: 1000)')
        },
        onLeave: () => {
          console.log('🔓 Card da garrafa DESKTOP LIBERADO - 700vh')
        },
        onEnterBack: () => {
          // Garantir que a garrafa fique na frente durante o pin
          gsap.set(garrafaCard, { zIndex: 1000 })
          console.log('📌 Card da garrafa DESKTOP FIXADO novamente - 700vh (z-index: 1000)')
        },
        onLeaveBack: () => {
          console.log('🔓 Card da garrafa DESKTOP LIBERADO novamente - 500vh')
        }
      })

      // Pin específico para o card da garrafa mobile entre 500vh e 700vh
      ScrollTrigger.create({
        trigger: 'body',
        start: '+=500vh', // Começa em 500vh
        end: '+=700vh', // Termina em 700vh
        pin: mobileGarrafaCard, // Fixa o card da garrafa mobile
        pinSpacing: true,
        onEnter: () => {
          // Garantir que a garrafa fique na frente durante o pin
          gsap.set(mobileGarrafaCard, { zIndex: 1000 })
          console.log('📌 Card da garrafa MOBILE FIXADO - 500vh (z-index: 1000)')
        },
        onLeave: () => {
          console.log('🔓 Card da garrafa MOBILE LIBERADO - 700vh')
        },
        onEnterBack: () => {
          // Garantir que a garrafa fique na frente durante o pin
          gsap.set(mobileGarrafaCard, { zIndex: 1000 })
          console.log('📌 Card da garrafa MOBILE FIXADO novamente - 700vh (z-index: 1000)')
        },
        onLeaveBack: () => {
          console.log('🔓 Card da garrafa MOBILE LIBERADO novamente - 500vh')
        }
      })

      // Efeito de desintegração do card da garrafa desktop a partir de 600vh
      ScrollTrigger.create({
        trigger: 'body',
        start: '+=600vh', // Começa a desintegração em 600vh
        end: '+=615vh', // Dura 15vh para a desintegração (extremamente rápido)
        scrub: 0.2, // Sincronização extremamente rápida
        onEnter: () => {
          console.log('✨ INICIANDO DESINTEGRAÇÃO DA GARRAFA DESKTOP - 600vh')
          // Garantir que a garrafa esteja visível antes de começar a desintegração
          garrafaCard.style.opacity = '1'
          garrafaCard.style.transform = 'scale(1)'
          garrafaCard.style.filter = 'blur(0px) brightness(1)'
          console.log('🔄 Estado inicial da garrafa DESKTOP garantido para desintegração')
        },
        onUpdate: (self) => {
          // Efeito de desintegração progressiva
          const progress = self.progress
          
          // Criar efeito de partículas flutuantes que se desprendem
          if (progress > 0.05 && progress < 0.6) {
            // Criar partículas extremamente frequentemente durante a desintegração
            if (Math.random() < 0.6) { // 60% de chance a cada frame (extremamente mais partículas)
              const particle = document.createElement('div')
              particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
              `
              
              // Posicionar partícula na borda da garrafa
              const garrafaRect = garrafaCard.getBoundingClientRect()
              const centerX = garrafaRect.left + garrafaRect.width / 2
              const centerY = garrafaRect.top + garrafaRect.height / 2
              
              // Posição aleatória na borda da garrafa
              const angle = Math.random() * Math.PI * 2
              const radius = Math.min(garrafaRect.width, garrafaRect.height) / 2
              const startX = centerX + Math.cos(angle) * radius
              const startY = centerY + Math.sin(angle) * radius
              
              particle.style.left = startX + 'px'
              particle.style.top = startY + 'px'
              
              document.body.appendChild(particle)
              
              // Animação da partícula flutuando para cima (extremamente rápida)
              gsap.to(particle, {
                y: -40 - Math.random() * 60,
                x: (Math.random() - 0.5) * 40,
                opacity: 0,
                scale: 0,
                duration: 0.3 + Math.random() * 0.3, // Duração extremamente reduzida
                ease: 'power5.out', // Easing extremamente agressivo
                onComplete: () => {
                  if (particle.parentNode) {
                    particle.parentNode.removeChild(particle)
                  }
                }
              })
            }
          }
          
          // Efeito de transparência progressiva (extremamente agressivo)
          const opacity = 1 - (progress * 3.0) // Desaparece extremamente rapidamente
          garrafaCard.style.opacity = Math.max(0, opacity).toString()
          
          // Efeito de escala extremamente agressivo
          const scale = 1 - (progress * 1.0) // Reduz 100% do tamanho
          garrafaCard.style.transform = `scale(${scale})`
          
          // Efeito de blur progressivo (extremamente intenso)
          const blur = progress * 12 // Máximo 12px de blur
          garrafaCard.style.filter = `blur(${blur}px)`
          
          // Efeito de brilho extremamente intenso
          if (progress > 0.1) {
            const brightness = 1 + (progress - 0.1) * 3.0
            garrafaCard.style.filter += ` brightness(${brightness})`
          }
        },
        onLeave: () => {
          console.log('✨ DESINTEGRAÇÃO FINALIZADA - 615vh')
          // Garantir que a garrafa esteja completamente transparente
          garrafaCard.style.opacity = '0'
          garrafaCard.style.transform = 'scale(0.7)'
          garrafaCard.style.filter = 'blur(3px) brightness(1.25)'
          
          // Fallback para garantir estado final consistente
          setTimeout(() => {
            if (garrafaCard.style.opacity !== '0') {
              console.log('🔄 Aplicando fallback de estado final')
              garrafaCard.style.opacity = '0'
              garrafaCard.style.transform = 'scale(0.7)'
              garrafaCard.style.filter = 'blur(3px) brightness(1.25)'
            }
          }, 100)
        },
        onEnterBack: () => {
          console.log('✨ REVERTENDO DESINTEGRAÇÃO - 615vh')
          // Restaurar estado da garrafa imediatamente
          garrafaCard.style.opacity = '1'
          garrafaCard.style.transform = 'scale(1)'
          garrafaCard.style.filter = 'blur(0px) brightness(1)'
          console.log('✅ Estado da garrafa restaurado imediatamente')
        },
        onLeaveBack: () => {
          console.log('✨ DESINTEGRAÇÃO DESKTOP REVERTIDA - 600vh')
          // Fallback adicional para garantir estado correto
          if (garrafaCard.style.opacity !== '1' || garrafaCard.style.transform !== 'scale(1)') {
            console.log('🔄 Aplicando fallback de restauração DESKTOP')
            garrafaCard.style.opacity = '1'
            garrafaCard.style.transform = 'scale(1)'
            garrafaCard.style.filter = 'blur(0px) brightness(1)'
          }
        }
      })

      // Efeito de desintegração do card da garrafa mobile a partir de 600vh
      ScrollTrigger.create({
        trigger: 'body',
        start: '+=600vh', // Começa a desintegração em 600vh
        end: '+=615vh', // Dura 15vh para a desintegração (extremamente rápido)
        scrub: 0.2, // Sincronização extremamente rápida
        onEnter: () => {
          console.log('✨ INICIANDO DESINTEGRAÇÃO DA GARRAFA MOBILE - 600vh')
          // Garantir que a garrafa esteja visível antes de começar a desintegração
          mobileGarrafaCard.style.opacity = '1'
          mobileGarrafaCard.style.transform = 'scale(1)'
          mobileGarrafaCard.style.filter = 'blur(0px) brightness(1)'
          console.log('🔄 Estado inicial da garrafa MOBILE garantido para desintegração')
        },
        onUpdate: (self) => {
          // Efeito de desintegração progressiva
          const progress = self.progress
          
          // Criar efeito de partículas flutuantes que se desprendem
          if (progress > 0.05 && progress < 0.6) {
            // Criar partículas extremamente frequentemente durante a desintegração
            if (Math.random() < 0.6) { // 60% de chance a cada frame (extremamente mais partículas)
              const particle = document.createElement('div')
              particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
              `
              
              // Posicionar partícula na borda da garrafa
              const garrafaRect = mobileGarrafaCard.getBoundingClientRect()
              const centerX = garrafaRect.left + garrafaRect.width / 2
              const centerY = garrafaRect.top + garrafaRect.height / 2
              
              // Posição aleatória na borda da garrafa
              const angle = Math.random() * Math.PI * 2
              const radius = Math.min(garrafaRect.width, garrafaRect.height) / 2
              const startX = centerX + Math.cos(angle) * radius
              const startY = centerY + Math.sin(angle) * radius
              
              particle.style.left = startX + 'px'
              particle.style.top = startY + 'px'
              
              document.body.appendChild(particle)
              
              // Animação da partícula flutuando para cima (extremamente rápida)
              gsap.to(particle, {
                y: -40 - Math.random() * 60,
                x: (Math.random() - 0.5) * 40,
                opacity: 0,
                scale: 0,
                duration: 0.3 + Math.random() * 0.3, // Duração extremamente reduzida
                ease: 'power5.out', // Easing extremamente agressivo
                onComplete: () => {
                  if (particle.parentNode) {
                    particle.parentNode.removeChild(particle)
                  }
                }
              })
            }
          }
          
          // Efeito de transparência progressiva (extremamente agressivo)
          const opacity = 1 - (progress * 3.0) // Desaparece extremamente rapidamente
          mobileGarrafaCard.style.opacity = Math.max(0, opacity).toString()
          
          // Efeito de escala extremamente agressivo
          const scale = 1 - (progress * 1.0) // Reduz 100% do tamanho
          mobileGarrafaCard.style.transform = `scale(${scale})`
          
          // Efeito de blur progressivo (extremamente intenso)
          const blur = progress * 12 // Máximo 12px de blur
          mobileGarrafaCard.style.filter = `blur(${blur}px)`
          
          // Efeito de brilho extremamente intenso
          if (progress > 0.1) {
            const brightness = 1 + (progress - 0.1) * 3.0
            mobileGarrafaCard.style.filter += ` brightness(${brightness})`
          }
        },
        onLeave: () => {
          console.log('✨ DESINTEGRAÇÃO MOBILE FINALIZADA - 615vh')
          // Garantir que a garrafa esteja completamente transparente
          mobileGarrafaCard.style.opacity = '0'
          mobileGarrafaCard.style.transform = 'scale(0.7)'
          mobileGarrafaCard.style.filter = 'blur(3px) brightness(1.25)'
          
          // Fallback para garantir estado final consistente
          setTimeout(() => {
            if (mobileGarrafaCard.style.opacity !== '0') {
              console.log('🔄 Aplicando fallback de estado final MOBILE')
              mobileGarrafaCard.style.opacity = '0'
              mobileGarrafaCard.style.transform = 'scale(0.7)'
              mobileGarrafaCard.style.filter = 'blur(3px) brightness(1.25)'
            }
          }, 100)
        },
        onEnterBack: () => {
          console.log('✨ REVERTENDO DESINTEGRAÇÃO MOBILE - 615vh')
          // Restaurar estado da garrafa imediatamente
          mobileGarrafaCard.style.opacity = '1'
          mobileGarrafaCard.style.transform = 'scale(1)'
          mobileGarrafaCard.style.filter = 'blur(0px) brightness(1)'
          console.log('✅ Estado da garrafa MOBILE restaurado imediatamente')
        },
        onLeaveBack: () => {
          console.log('✨ DESINTEGRAÇÃO MOBILE REVERTIDA - 600vh')
          // Fallback adicional para garantir estado correto
          if (mobileGarrafaCard.style.opacity !== '1' || mobileGarrafaCard.style.transform !== 'scale(1)') {
            console.log('🔄 Aplicando fallback de restauração MOBILE')
            mobileGarrafaCard.style.opacity = '1'
            mobileGarrafaCard.style.transform = 'scale(1)'
            mobileGarrafaCard.style.filter = 'blur(0px) brightness(1)'
          }
        }
      })
      
      // ScrollTrigger para trocar o conteúdo do retângulo quando a animação terminar
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '+=800vh',
        scrub: 2,
        onUpdate: (self) => {
          // Calcular o vh atual baseado no progresso
          const currentVh = self.progress * 800
          
          // Log detalhado a cada 50vh para não sobrecarregar o console
          if (Math.floor(currentVh) % 50 === 0 && currentVh > 0) {
            console.log(`📏 VH ATUAL: ${Math.floor(currentVh)}vh (${Math.round(self.progress * 100)}% do progresso)`)
          }
          
          // Log mais frequente quando estiver próximo do momento de mudança (após 600vh)
          if (currentVh > 600 && Math.floor(currentVh) % 10 === 0) {
            console.log(`🎯 VH PRÓXIMO: ${Math.floor(currentVh)}vh - MOMENTO DE MUDANÇA APROXIMANDO!`)
          }
          
          // Quando chegar a 87.5% do progresso (700vh), trocar o conteúdo
          if (self.progress >= 0.875) {
            setRectangleContent('final')
            // Garantir que a garrafa desktop esteja completamente invisível quando o conteúdo mudar
            if (garrafaCard) {
              garrafaCard.style.opacity = '0'
              garrafaCard.style.transform = 'scale(0)'
              garrafaCard.style.filter = 'blur(20px) brightness(0)'
              garrafaCard.style.pointerEvents = 'none'
            }
            // Garantir que a garrafa mobile esteja completamente invisível quando o conteúdo mudar
            if (mobileGarrafaCard) {
              mobileGarrafaCard.style.opacity = '0'
              mobileGarrafaCard.style.transform = 'scale(0)'
              mobileGarrafaCard.style.filter = 'blur(20px) brightness(0)'
              mobileGarrafaCard.style.pointerEvents = 'none'
            }
            console.log('🎯 Conteúdo do retângulo alterado para FINAL - Garrafas ocultas')
          } else {
            setRectangleContent('splash')
          }
        },
        onEnter: () => {
          console.log('🔄 Iniciando detecção de troca de conteúdo')
        },
        onLeave: () => {
          console.log('✅ Animação completa - conteúdo final ativo')
        },
        onEnterBack: () => {
          console.log('↩️ Voltando para conteúdo splash')
        },
        onLeaveBack: () => {
          console.log('🔄 Resetando para conteúdo splash')
          // Restaurar a garrafa desktop quando voltar para splash
          if (garrafaCard) {
            garrafaCard.style.opacity = '1'
            garrafaCard.style.transform = 'scale(1)'
            garrafaCard.style.filter = 'blur(0px) brightness(1)'
            garrafaCard.style.pointerEvents = 'auto'
          }
          // Restaurar a garrafa mobile quando voltar para splash
          if (mobileGarrafaCard) {
            mobileGarrafaCard.style.opacity = '1'
            mobileGarrafaCard.style.transform = 'scale(1)'
            mobileGarrafaCard.style.filter = 'blur(0px) brightness(1)'
            mobileGarrafaCard.style.pointerEvents = 'auto'
          }
        }
      })

      // ScrollTrigger para esconder/mostrar todos os cards desktop exceto a garrafa a partir de 500vh
      const outrosCards = [ursopeluciaCard, blusaCard, bolsaCard, oculosCard, maquiagemCard, tenisCard, boneCard, cremeCard, cameraCard];
      ScrollTrigger.create({
        trigger: 'body',
        start: '+=500vh',
        end: '+=800vh', // Mantém até o final do scroll
        onEnter: () => {
          outrosCards.forEach(card => {
            if (card) {
              gsap.set(card, { opacity: 0, pointerEvents: 'none' });
            }
          });
          console.log('🚫 Outros cards DESKTOP ocultos a partir de 500vh');
        },
        onLeaveBack: () => {
          outrosCards.forEach(card => {
            if (card) {
              gsap.set(card, { opacity: 1, pointerEvents: 'auto' });
            }
          });
          console.log('✅ Outros cards DESKTOP visíveis novamente ao voltar antes de 500vh');
        }
      });

      // ScrollTrigger para esconder/mostrar todos os cards mobile exceto a garrafa a partir de 500vh
      const outrosCardsMobile = [mobileUrsopeluciaCard, mobileBlusaCard, mobileBolsaCard, mobileMaquiagemCard, mobileTenisCard, mobileBoneCard, mobileRelogioCard, mobileCameraCard];
      ScrollTrigger.create({
        trigger: 'body',
        start: '+=500vh',
        end: '+=800vh', // Mantém até o final do scroll
        onEnter: () => {
          outrosCardsMobile.forEach(card => {
            if (card) {
              gsap.set(card, { opacity: 0, pointerEvents: 'none' });
            }
          });
          console.log('🚫 Outros cards MOBILE ocultos a partir de 500vh');
        },
        onLeaveBack: () => {
          outrosCardsMobile.forEach(card => {
            if (card) {
              gsap.set(card, { opacity: 1, pointerEvents: 'auto' });
            }
          });
          console.log('✅ Outros cards MOBILE visíveis novamente ao voltar antes de 500vh');
        }
      });
    }
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, []) // Dependências vazias - executa apenas uma vez após DOM estar pronto

  return (
    <main className="min-h-screen" style={{ border: 'none', outline: 'none' }}>
      {/* Partículas flutuantes de fundo */}
      <FloatingParticles />
      
      {/* Brilho do cursor */}
      <CursorGlow />
      
      {/* Navigation */}
      <div ref={headerRef}>
      <Navigation items={navigationItems} />
      </div>
      
      {/* Hero Section com Layout Responsivo */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Layout Desktop - Título Centralizado com Cards ao Redor */}
        <div ref={cardsRef} className="hidden lg:block relative w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-center pt-0 mt-24 lg:mt-28 relative">
        {/* Elemento invisível no centro para referência */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 opacity-0 pointer-events-none" style={{ top: 'calc(50% + 80px)' }}></div>
        
        {/* Card com imagem da garrafa à esquerda */}
            <div ref={garrafaCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 400px)', top: 'calc(50% + 80px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
              <img 
                src="/garrafa_card.png" 
                alt="Garrafa Stanley" 
                  className="w-full h-full object-contain rounded-xl"
              />
          </div>
        </div>
        
        {/* Card sobreposto à esquerda, posicionado acima */}
            <div ref={ursopeluciaCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-20" style={{ left: 'calc(50% - 420px)', top: 'calc(50% - 60px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
              <img 
                src="/ursopelucia_icon.png" 
                alt="Urso Pelúcia" 
                  className="w-full h-full object-contain rounded-xl"
              />
          </div>
        </div>
        
        {/* Card com imagem da blusa à direita */}
            <div ref={blusaCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 380px)', top: 'calc(50% + 80px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
              <img 
                src="/blusa-creme.png" 
                alt="Suéter de malha creme" 
                  className="w-full h-full object-contain rounded-xl"
              />
            </div>
              {/* Ícone de estrela sobreposto à frente do card */}
              <div className="absolute -top-6 -left-6 z-20">
                <img 
                  src="/star_icon.svg" 
                  alt="Star" 
                  className="w-[70px] h-[70px] drop-shadow-sm"
                />
          </div>
        </div>
        
        {/* Card sobreposto à direita, posicionado acima */}
            <div ref={bolsaCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-20" style={{ left: 'calc(50% + 420px)', top: 'calc(50% - 60px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
              <img 
                src="/bolsa_icon.png" 
                alt="Bolsa Icon" 
                className="w-full h-full object-contain rounded-xl"
              />
          </div>
        </div>
        
            {/* Card extremo à esquerda */}
            <div ref={oculosCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-5" style={{ left: 'calc(50% - 500px)', top: 'calc(50% + 180px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
              <img 
                src="/oculos_icon.png" 
                alt="Óculos Icon" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
              {/* Ícone de like sobreposto à frente do card */}
              <div className="absolute -top-6 -right-6 z-20">
                <img 
                  src="/icon_like.svg" 
                  alt="Like" 
                  className="w-16 h-16 drop-shadow-sm"
                />
          </div>

        </div>
            
            {/* Card extremo à direita */}
            <div ref={maquiagemCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 500px)', top: 'calc(50% + 180px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
              <img 
                src="/maquiagem_icon.png" 
                alt="Maquiagem Icon" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>
            
            {/* Card inferior esquerdo-central */}
            <div ref={tenisCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-30" style={{ left: 'calc(50% - 260px)', top: 'calc(50% + 240px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
            <img 
              src="/tenis_icon.png" 
              alt="Tênis Icon" 
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>
            
            {/* Card inferior direito-central */}
            <div ref={boneCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-30" style={{ left: 'calc(50% + 260px)', top: 'calc(50% + 240px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
            <img 
              src="/bone_icon.png" 
              alt="Boné Icon" 
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
            </div>
            
            {/* Novo Card extremo superior à esquerda */}
            <div ref={cremeCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-5" style={{ left: 'calc(50% - 600px)', top: 'calc(50% - 40px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
                <img 
                  src="/creme_icon.png" 
                  alt="Creme Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            {/* Novo Card extremo superior à direita */}
            <div ref={cameraCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 600px)', top: 'calc(50% - 40px)' }}>
              <div className="product-card-transparent w-[81px] h-[104px]">
                <img 
                  src="/camera_icon.jpeg" 
                  alt="Camera Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
        </div>
      </div>
        
            {/* Título Centralizado */}
            <div ref={titleContainerRef} className="text-center max-w-3xl mx-auto px-4 relative z-30">
              <div ref={heartIconRef} className="flex justify-center mb-8">
            <LogoIcon size="md" />
          </div>
              <h1 
                ref={titleRef}
                className="text-4xl md:text-6xl lg:text-[60px] font-bold text-white leading-tight mb-2" 
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}
              >
            O <span style={{ color: '#4807AD' }}>FUTURO</span> DAS VENDAS É SOCIAL, VISUAL E ACESSÍVEL. E ELE <span style={{ color: '#4807AD' }}>COMEÇA AQUI</span>
          </h1>
        </div>
          </div>
        </div>
        
        {/* Layout Mobile - Cards ao Redor do Título Central */}
        <div ref={mobileCardsRef} className="lg:hidden relative w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-center pt-0 mt-16 relative">
            {/* Elemento invisível no centro para referência */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 opacity-0 pointer-events-none" style={{ top: 'calc(50% + 40px)' }}></div>
            
            {/* Card com imagem da garrafa à esquerda */}
            <div ref={mobileGarrafaCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 200px)', top: 'calc(50% + 80px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/garrafa_card.png" 
                  alt="Garrafa Stanley" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card sobreposto à esquerda, posicionado acima */}
            <div ref={mobileUrsopeluciaCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-20" style={{ left: 'calc(50% - 180px)', top: 'calc(50% - 20px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/ursopelucia_icon.png" 
                  alt="Urso Pelúcia" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Novo Card 1 - No quadro amarelo esquerdo */}
            <div ref={mobileRelogioCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 160px)', top: 'calc(50% - 60px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/relogio_card.png" 
                  alt="Relógio" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Novo Card 2 - No quadro amarelo direito */}
            <div ref={mobileCameraCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 140px)', top: 'calc(50% - 60px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/camera_card.png" 
                  alt="Câmera" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card com imagem da blusa à direita */}
            <div ref={mobileBlusaCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 160px)', top: 'calc(50% + 80px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/blusa-creme.png" 
                  alt="Suéter de malha creme" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

            </div>
            
            {/* Card sobreposto à direita, posicionado acima */}
            <div ref={mobileBolsaCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-20" style={{ left: 'calc(50% + 160px)', top: 'calc(50% - 20px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/bolsa_icon.png" 
                  alt="Bolsa Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card extremo à esquerda - REMOVIDO */}
            
            {/* Card extremo à direita */}
            <div ref={mobileMaquiagemCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 200px)', top: 'calc(50% + 100px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/maquiagem_icon.png" 
                  alt="Maquiagem Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card inferior esquerdo-central */}
            <div ref={mobileTenisCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-30" style={{ left: 'calc(50% - 120px)', top: 'calc(50% + 140px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/tenis_icon.png" 
                  alt="Tênis Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card inferior direito-central */}
            <div ref={mobileBoneCardRef} className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-30" style={{ left: 'calc(50% + 100px)', top: 'calc(50% + 140px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/bone_icon.png" 
                  alt="Boné Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Título Centralizado */}
            <div ref={mobileTitleContainerRef} className="text-center max-w-3xl mx-auto px-4 relative z-50">
              <div ref={mobileHeartIconRef} className="flex justify-center mb-6">
                <LogoIcon size="md" />
              </div>
              <h1 
                ref={mobileTitleRef}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4" 
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}
              >
                O <span style={{ color: '#4807AD' }}>FUTURO</span> DAS VENDAS É SOCIAL, VISUAL E ACESSÍVEL. E ELE <span style={{ color: '#4807AD' }}>COMEÇA AQUI</span>
              </h1>
            </div>
          </div>
        </div>
        
        {/* Seção de Animação Desktop - Com GSAP Pin */}
        <div className="hidden lg:block relative" style={{ height: '200vh' }}>
          <div className="h-screen flex items-center justify-center">
            <div
              ref={rectangleRef}
              className="rounded-[32px] border-2 bg-white/10 shadow-2xl w-[280px] h-[580px] sm:w-[320px] sm:h-[620px] md:w-[360px] md:h-[680px] lg:w-[380px] lg:h-[680px] transition-all duration-300 border-pink-transparent relative overflow-hidden flex items-center justify-center"
            >
              {/* Brilho animado no fundo */}
              <div className="absolute left-0 top-0 w-full h-full rounded-[32px] pointer-events-none overflow-hidden z-0">
                <div className="w-full h-full animate-shimmer bg-gradient-to-r from-[#4807AD11] via-[#E321FF22] to-[#4807AD11] opacity-20" style={{backgroundSize: '200% 100%'}}></div>
              </div>
              
              {/* Ponto de referência invisível no centro do retângulo */}
              <div className="absolute w-1 h-1 bg-transparent pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
              
              {/* Conteúdo condicional do retângulo */}
              {rectangleContent === 'splash' ? (
                // Conteúdo inicial - Splash Screen
                <img 
                  src="/Splash_screen.svg" 
                  alt="Splash Screen" 
                  className="w-full h-full object-cover z-10 relative transition-opacity duration-500"
                />
              ) : (
                // Conteúdo final - Garrafa Reels
                <video 
                  src="/Garrafa_Reels.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover z-10 relative transition-opacity duration-500 rounded-[32px]"
                  style={{ objectPosition: 'center' }}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Seção de Animação Mobile - Com GSAP Pin */}
        <div className="lg:hidden relative" style={{ height: '200vh' }}>
          <div className="h-screen flex items-center justify-center">
            <div
              ref={mobileRectangleRef}
              className="rounded-[24px] border-2 bg-white/10 shadow-2xl w-[240px] h-[480px] sm:w-[280px] sm:h-[520px] transition-all duration-300 border-pink-transparent relative overflow-hidden flex items-center justify-center"
            >
              {/* Brilho animado no fundo */}
              <div className="absolute left-0 top-0 w-full h-full rounded-[24px] pointer-events-none overflow-hidden z-0">
                <div className="w-full h-full animate-shimmer bg-gradient-to-r from-[#4807AD11] via-[#E321FF22] to-[#4807AD11] opacity-20" style={{backgroundSize: '200% 100%'}}></div>
              </div>
              
              {/* Ponto de referência invisível no centro do retângulo */}
              <div className="absolute w-1 h-1 bg-transparent pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
              
              {/* Conteúdo condicional do retângulo */}
              {rectangleContent === 'splash' ? (
                // Conteúdo inicial - Splash Screen
                <img 
                  src="/Splash_screen.svg" 
                  alt="Splash Screen" 
                  className="w-full h-full object-cover z-10 relative transition-opacity duration-500"
                />
              ) : (
                // Conteúdo final - Garrafa Reels
                <video 
                  src="/Garrafa_Reels.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover z-10 relative transition-opacity duration-500 rounded-[24px]"
                  style={{ objectPosition: 'center' }}
                />
              )}
            </div>
          </div>
        </div>
      
      {/* Seta de rolagem animada */}
      <div className="flex justify-center py-4">
        <div className="animate-bounce">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <path 
              d="M7 13L12 18L17 13" 
              stroke="url(#gradient)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4807AD" />
                <stop offset="100%" stopColor="#E321FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
            </section>
        
        {/* GSAP Demo Section */}
      <GSAPDemo />
      
      {/* Pricing Section - Placeholder */}
      <section id="pricing" className="py-20 bg-transparent">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Planos Flexíveis
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades e comece a crescer hoje mesmo.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <p className="text-white/80">Componente de Preços em desenvolvimento...</p>
          </div>
        </div>
      </section>
      
      {/* About Section - Placeholder */}
      <section id="about" className="py-20 bg-transparent">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Sobre a Lompa
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Somos uma empresa inovadora focada em criar soluções digitais que transformam negócios.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-white/80">Componente Sobre em desenvolvimento...</p>
          </div>
        </div>
      </section>
      
      {/* Contact Section - Placeholder */}
      <section id="contact" className="py-20 bg-transparent">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a alcançar seus objetivos digitais.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <p className="text-white/80">Componente de Contato em desenvolvimento...</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer sections={footerSections} />
      

    </main>
  )
} 