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
  const [rectangleContent, setRectangleContent] = useState<'splash' | 'garrafa-overlay' | 'final'>('splash')
  const [garrafaOpacity, setGarrafaOpacity] = useState(0)
  const [garrafaScale, setGarrafaScale] = useState(0)
  const [garrafaRotation, setGarrafaRotation] = useState(180)
  const [videoOpacity, setVideoOpacity] = useState(0)
  const [videoScale, setVideoScale] = useState(0.8)
  const [currentVideo, setCurrentVideo] = useState<'garrafa' | 'bolsa' | 'parafusadeira'>('garrafa')
  
  // Estados para transição TikTok
  const [videoTransform, setVideoTransform] = useState('translateY(0vh)')
  const [videoTransitionProgress, setVideoTransitionProgress] = useState(0)
  

  
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

  // Forçar autoplay em dispositivos móveis com interação do usuário
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const forcePlayVideos = async () => {
        const videos = document.querySelectorAll('video')
        videos.forEach(async (video) => {
          try {
            await (video as HTMLVideoElement).play()
          } catch (err) {
            console.log('Tentativa de autoplay falhou:', err)
          }
        })
      }

      // Tentar reproduzir vídeos em diferentes eventos de interação
      const events = ['touchstart', 'touchend', 'click', 'scroll']
      events.forEach(event => {
        document.addEventListener(event, forcePlayVideos, { once: true })
      })

      // Tentar reproduzir após um delay
      setTimeout(forcePlayVideos, 1000)
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
    // Verificar se estamos no browser e se GSAP está disponível
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger) {
      console.warn('⚠️ GSAP ou ScrollTrigger não disponível')
      return
    }

    // Aguardar um frame para garantir que todos os elementos estejam renderizados
    const initAnimation = () => {
      // Verificar novamente se todos os elementos estão disponíveis
      const allElements = [
        rectangleRef.current,
        garrafaCardRef.current,
        ursopeluciaCardRef.current,
        blusaCardRef.current,
        bolsaCardRef.current,
        oculosCardRef.current,
        maquiagemCardRef.current,
        tenisCardRef.current,
        boneCardRef.current,
        cremeCardRef.current,
        cameraCardRef.current,
        mobileGarrafaCardRef.current,
        mobileUrsopeluciaCardRef.current,
        mobileBlusaCardRef.current,
        mobileBolsaCardRef.current,
        mobileMaquiagemCardRef.current,
        mobileTenisCardRef.current,
        mobileBoneCardRef.current,
        mobileRelogioCardRef.current,
        mobileCameraCardRef.current
      ]

      if (allElements.some(el => !el)) {
        console.warn('⚠️ Alguns elementos ainda não estão disponíveis, tentando novamente...')
        setTimeout(initAnimation, 100) // Usar setTimeout em vez de requestAnimationFrame para mais estabilidade
        return
      }

      console.log('✅ Todos os elementos encontrados, iniciando animações...')
      
      // Limpar ScrollTriggers existentes para evitar conflitos
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      
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
          { ref: garrafaCard, scale: 1, zIndex: 1000, rotation: -25 }, // Garrafa sempre na frente (z-index máximo) - Rotação como cards da esquerda
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
          { ref: mobileGarrafaCard, scale: 1, zIndex: 1000, rotation: -25 }, // Garrafa sempre na frente (z-index máximo) - Rotação como cards da esquerda
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
        
        // Pin do retângulo mobile (independente da animação dos cards)
        if (mobileRectangle) {
          ScrollTrigger.create({
            trigger: mobileRectangle.parentElement?.parentElement,
            start: 'top top', // Quando o topo da seção toca o topo da viewport
            end: 'bottom center', // Quando a base da seção toca o centro da viewport
            pin: mobileRectangle.parentElement,
            pinSpacing: true,
            onRefresh: () => {
              console.log('🔄 Pin do retângulo MOBILE recarregado')
            }
          })
        }
        
        // Timeline para animação dos cards - USANDO VIEWPORT UNITS
        const tlCards = gsap.timeline({
          scrollTrigger: {
            trigger: 'body', // Trigger no body para começar desde o início
            start: 'top top', // Começa desde o topo da página
            end: window.innerWidth <= 768 ? '+=400vh' : '+=800vh', // 400vh para mobile, 800vh para desktop
            scrub: 3.5, // Sincroniza com o scroll com suavização de 3.5 segundos (mais lento)
            onUpdate: (self) => {
              // Calcular progresso em vh
              const scrollY = window.scrollY
              const viewportHeight = window.innerHeight
              const scrollVh = scrollY / viewportHeight
              
              console.log('=== SCROLL STATUS ===')
              console.log('Scroll VH:', scrollVh.toFixed(2) + 'vh')
              console.log('Scroll Pixels:', Math.round(scrollY) + 'px')
              console.log('Progress:', Math.round(self.progress * 100) + '%')
              console.log('Direction:', self.direction)
              console.log('=====================')
            },
            onEnter: () => {
              console.log('🎬 ANIMAÇÃO INICIADA - Cards começando a se mover')
            },
            onLeave: () => {
              console.log('🏁 ANIMAÇÃO FINALIZADA - Cards chegaram ao destino')
            },
            onEnterBack: () => {
              console.log('🔄 ANIMAÇÃO REVERTENDO - Scroll para cima')
            },
            onLeaveBack: () => {
              console.log('🔄 ANIMAÇÃO RESETANDO - Voltando ao início')
              // Resetar todos os cards desktop
              cards.forEach(card => {
                gsap.set(card.ref, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  opacity: 1,
                  pointerEvents: 'auto',
                  zIndex: card.zIndex
                })
                // Resetar também o estilo inline para garantir
                card.ref.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)'
                card.ref.style.opacity = '1'
                card.ref.style.filter = 'none'
              })
              // Resetar todos os cards mobile
              mobileCards.forEach(card => {
                gsap.set(card.ref, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  opacity: 1,
                  pointerEvents: 'auto',
                  zIndex: card.zIndex
                })
                // Resetar também o estilo inline para garantir
                card.ref.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)'
                card.ref.style.opacity = '1'
                card.ref.style.filter = 'none'
              })
            },
            onRefresh: () => {
              console.log('🔄 Timeline dos cards recarregada')
            }
          }
        })
        
        // Função para animar cards (desktop e mobile)
        const animateCards = (cardsArray: Array<{ ref: HTMLElement, scale: number, zIndex: number, rotation: number }>, isMobile = false) => {
          cardsArray.forEach(({ ref, scale, zIndex, rotation }, index: number) => {
            // Função para calcular posição centralizada usando centro da página como referência
            const calculateCenteredPosition = () => {
              // Para a garrafa (index 0), usar centro da página como referência absoluta
              if (index === 0) {
                // Calcular posição atual do card (PONTO A)
                const cardRect = ref.getBoundingClientRect()
                const cardCenterX = cardRect.left + cardRect.width / 2
                const cardCenterY = cardRect.top + cardRect.height / 2
                
                // Usar centro da viewport como ponto de destino horizontal (PONTO B)
                const viewportCenterX = window.innerWidth / 2
                
                // Calcular distância horizontal do centro do card ao centro da viewport
                let deltaX = viewportCenterX - cardCenterX
                deltaX = Math.round(deltaX)
                
                // Para o eixo Y, usar o centro do retângulo como referência
                const targetRectangle = isMobile ? mobileRectangle : rectangle
                if (!targetRectangle) {
                  console.error(`❌ Referência do retângulo ${isMobile ? 'MOBILE' : 'DESKTOP'} não encontrada`)
                  return { deltaX: 0, deltaY: 0 }
                }
                const rectRect = targetRectangle.getBoundingClientRect()
                const rectCenterY = rectRect.top + rectRect.height / 2
                
                // Calcular distância vertical do centro do card ao centro do retângulo
                let deltaY = rectCenterY - cardCenterY
                deltaY = Math.round(deltaY)
                
                return { deltaX, deltaY }
              } else {
                // Para outros cards, usar a lógica original do retângulo
                const cardRect = ref.getBoundingClientRect()
                const cardCenterX = cardRect.left + cardRect.width / 2
                const cardCenterY = cardRect.top + cardRect.height / 2
                
                const targetRectangle = isMobile ? mobileRectangle : rectangle
                if (!targetRectangle) {
                  console.error(`❌ Referência do retângulo ${isMobile ? 'MOBILE' : 'DESKTOP'} não encontrada`)
                  return { deltaX: 0, deltaY: 0 }
                }
                const rectRect = targetRectangle.getBoundingClientRect()
                const rectCenterX = rectRect.left + rectRect.width / 2
                const rectCenterY = rectRect.top + rectRect.height / 2
                
                let deltaX = rectCenterX - cardCenterX
                let deltaY = rectCenterY - cardCenterY
                
                return { deltaX, deltaY }
              }
            }
            
            // Calcular posição inicial
            let { deltaX, deltaY } = calculateCenteredPosition()
            
            // Para a garrafa, fazer retry se necessário
            if (index === 0) {
              // Aguardar um frame adicional para garantir renderização completa
              requestAnimationFrame(() => {
                const retryPosition = calculateCenteredPosition()
                deltaX = retryPosition.deltaX
                deltaY = retryPosition.deltaY
              })
            }
            
            // Removido log de posicionamento dos cards para manter console limpo
            
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
                  // Removido logs detalhados dos cards para manter console limpo
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
        
        // Efeito para fazer todos os cards desaparecerem aos 400vh
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=400vh', // Começa aos 400vh
          end: '+=410vh', // Dura 10vh para o fade out
          scrub: 0.5, // Sincronização rápida
          onEnter: () => {
            console.log('👻 INICIANDO FADE OUT DE TODOS OS CARDS - 400vh')
            // Fazer todos os cards desaparecerem juntos
            cards.forEach((card) => {
              gsap.to(card.ref, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: 'power2.out'
              })
            })
            
            // Alterar conteúdo do retângulo para mostrar garrafa sobreposta ao splash
            setRectangleContent('garrafa-overlay')
            
            // Animar entrada da garrafa IMEDIATAMENTE - ANIMAÇÃO IMPACTANTE
            gsap.to({}, {
              duration: 0.4, // Mais rápida
              onUpdate: function() {
                const progress = this.progress()
                setGarrafaOpacity(1) // Manter opacidade sempre em 1
                setGarrafaScale(progress) // Escala de 0 a 1
                setGarrafaRotation(180 - (progress * 180)) // Rotação de 180° a 0°
              },
              ease: 'back.out(1.7)' // Easing mais dramático
            })
          },
          onLeave: () => {
            console.log('✅ TODOS OS CARDS DESAPARECERAM - 410vh')
          },
          onEnterBack: () => {
            console.log('🔄 RETORNANDO TODOS OS CARDS - 410vh')
            // Verificar se estamos na posição correta para retornar os cards
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const scrollVh = scrollY / viewportHeight
            
            // Só retornar os cards se estivermos abaixo de 300vh (onde eles devem permanecer ocultos)
            if (scrollVh < 300) {
              console.log('✅ RETORNANDO CARDS DESKTOP - Scroll abaixo de 300vh (', scrollVh.toFixed(1) + 'vh)')
              // Fazer todos os cards aparecerem juntos
              cards.forEach((card) => {
                gsap.to(card.ref, {
                  opacity: 1,
                  scale: 1, // Retornar à escala original (1)
                  duration: 0.5,
                  ease: 'power2.out',
                  onComplete: () => {
                    // Garantir que o estilo inline esteja correto após a animação
                    card.ref.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)'
                    card.ref.style.opacity = '1'
                    card.ref.style.filter = 'none'
                    card.ref.style.pointerEvents = 'auto'
                  }
                })
              })
              
              // Voltar para o conteúdo splash original e ocultar garrafa
              setRectangleContent('splash')
              setGarrafaOpacity(0)
              setGarrafaScale(0)
              setGarrafaRotation(180)
            } else {
              console.log('🚫 CARDS DESKTOP PERMANECEM OCULTOS - Ainda em zona de vídeo (', scrollVh.toFixed(1) + 'vh)')
              // Forçar cards ocultos mesmo no retorno se ainda estiver acima de 300vh
              cards.forEach(card => {
                gsap.set(card.ref, {
                  opacity: 0,
                  scale: 0.8
                })
                card.ref.style.opacity = '0'
                card.ref.style.pointerEvents = 'none'
              })
            }
          },
          onLeaveBack: () => {
            console.log('✅ TODOS OS CARDS RETORNARAM - 400vh')
          }
        })

        // Efeito para fazer todos os cards mobile desaparecerem aos 250vh
        ScrollTrigger.create({
          trigger: 'body',
          start: '+=250vh', // Começa aos 250vh (antes da mudança do vídeo)
          end: '+=260vh', // Dura 10vh para o fade out
          scrub: 0.5, // Sincronização rápida
          onEnter: () => {
            console.log('👻 INICIANDO FADE OUT DE TODOS OS CARDS MOBILE - 250vh')
            // Fazer todos os cards mobile desaparecerem juntos
            mobileCards.forEach((card) => {
              gsap.to(card.ref, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: 'power2.out'
              })
            })
            
            // Alterar conteúdo do retângulo para mostrar garrafa sobreposta ao splash
            setRectangleContent('garrafa-overlay')
            
            // Animar entrada da garrafa mobile IMEDIATAMENTE - ANIMAÇÃO IMPACTANTE
            gsap.to({}, {
              duration: 0.4, // Mais rápida
              onUpdate: function() {
                const progress = this.progress()
                setGarrafaOpacity(1) // Manter opacidade sempre em 1
                setGarrafaScale(progress) // Escala de 0 a 1
                setGarrafaRotation(180 - (progress * 180)) // Rotação de 180° a 0°
              },
              ease: 'back.out(1.7)' // Easing mais dramático
            })
          },
          onLeave: () => {
            console.log('✅ TODOS OS CARDS MOBILE DESAPARECERAM - 260vh')
          },
          onEnterBack: () => {
            console.log('🔄 RETORNANDO TODOS OS CARDS MOBILE - 260vh')
            // Verificar se estamos na posição correta para retornar os cards
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const scrollVh = scrollY / viewportHeight
            
            // Só retornar os cards se estivermos abaixo de 300vh (onde eles devem permanecer ocultos)
            if (scrollVh < 300) {
              console.log('✅ RETORNANDO CARDS MOBILE - Scroll abaixo de 300vh (', scrollVh.toFixed(1) + 'vh)')
              // Fazer todos os cards mobile aparecerem juntos
              mobileCards.forEach((card) => {
                gsap.to(card.ref, {
                  opacity: 1,
                  scale: 1, // Retornar à escala original (1)
                  duration: 0.5,
                  ease: 'power2.out',
                  onComplete: () => {
                    // Garantir que o estilo inline esteja correto após a animação
                    card.ref.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)'
                    card.ref.style.opacity = '1'
                    card.ref.style.filter = 'none'
                    card.ref.style.pointerEvents = 'auto'
                  }
                })
              })
              
              // NÃO alterar o conteúdo do retângulo aqui - deixar que o ScrollTrigger principal controle
              // Isso evita conflitos com a animação da garrafa
            } else {
              console.log('🚫 CARDS MOBILE PERMANECEM OCULTOS - Ainda em zona de vídeo (', scrollVh.toFixed(1) + 'vh)')
              // Forçar cards ocultos mesmo no retorno se ainda estiver acima de 300vh
              mobileCards.forEach(card => {
                gsap.set(card.ref, {
                  opacity: 0,
                  scale: 0.8
                })
                card.ref.style.opacity = '0'
                card.ref.style.pointerEvents = 'none'
              })
            }
          },
          onLeaveBack: () => {
            console.log('✅ TODOS OS CARDS MOBILE RETORNARAM - 250vh')
          }
        })

        // ScrollTrigger para controlar o reaparecimento dos cards mobile no fallback - REGRA GLOBAL
        ScrollTrigger.create({
          trigger: 'body',
          start: 'top top', // Monitora desde o início
          end: window.innerWidth <= 768 ? '+=400vh' : '+=800vh', // 400vh para mobile, 800vh para desktop
          scrub: 0.5,
          onUpdate: (self) => {
            // Calcular o vh atual
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const scrollVh = scrollY / viewportHeight
            
            // Se estamos em fallback (direction === -1) e ainda na zona onde os cards devem estar ocultos
            if (self.direction === -1 && scrollVh >= 300) {
              console.log('🚫 FALLBACK MOBILE DETECTADO - MANTENDO CARDS OCULTOS em', scrollVh.toFixed(1) + 'vh')
              mobileCards.forEach(card => {
                gsap.set(card.ref, {
                  opacity: 0,
                  scale: 0.8
                })
                // Forçar também o estilo inline para garantir
                card.ref.style.opacity = '0'
                card.ref.style.transform = card.ref.style.transform.replace(/scale\([^)]*\)/, 'scale(0.8)')
              })
            }
          },
          onEnter: () => {
            console.log('👀 MONITORAMENTO GLOBAL DE FALLBACK MOBILE ATIVADO')
          },
          onLeave: () => {
            console.log('✅ MONITORAMENTO GLOBAL DE FALLBACK MOBILE FINALIZADO')
          }
        })

        // ScrollTrigger ADICIONAL para garantir que os cards mobile permaneçam ocultos durante fallback
        ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: '+=400vh',
          scrub: 0.1,
          onUpdate: (self) => {
            // Calcular o vh atual
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const scrollVh = scrollY / viewportHeight
            
            // Se estamos em fallback (direction === -1) e acima de 300vh, FORÇAR cards ocultos
            if (self.direction === -1 && scrollVh >= 300) {
              mobileCards.forEach(card => {
                // Forçar opacidade 0 e escala 0.8
                gsap.set(card.ref, {
                  opacity: 0,
                  scale: 0.8,
                  immediateRender: true
                })
                // Forçar também o estilo inline
                card.ref.style.opacity = '0'
                card.ref.style.pointerEvents = 'none'
              })
            }
          }
        })

        // ScrollTrigger OTIMIZADO para trocar o conteúdo do retângulo - SEM CONFLITOS
        ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: window.innerWidth <= 768 ? '+=400vh' : '+=800vh', // 400vh para mobile, 800vh para desktop
          scrub: 1, // Reduzido para 1 para evitar conflitos
          onUpdate: (self) => {
            // Calcular o vh atual baseado no progresso (responsivo)
            const maxVh = window.innerWidth <= 768 ? 300 : 700
            const currentVh = self.progress * maxVh
            
            // Log detalhado a cada 50vh para não sobrecarregar o console
            if (Math.floor(currentVh) % 50 === 0 && currentVh > 0) {
              console.log(`📏 VH ATUAL: ${Math.floor(currentVh)}vh (${Math.round(self.progress * 100)}% do progresso)`)
            }
            
            // Log mais frequente quando estiver próximo do momento de mudança
            const thresholdVh = window.innerWidth <= 768 ? 300 : 700
            if (currentVh > thresholdVh && Math.floor(currentVh) % 10 === 0) {
              console.log(`🎯 VH PRÓXIMO: ${Math.floor(currentVh)}vh - MOMENTO DE MUDANÇA APROXIMANDO!`)
            }
            
            // LÓGICA SIMPLIFICADA E OTIMIZADA - SEM CONFLITOS
            if (self.progress >= 0.98) {
              // Fase final: vídeo ativo
              setRectangleContent('final')
              setGarrafaOpacity(0)
              setCurrentVideo('garrafa')
              setVideoOpacity(1)
              setVideoScale(1)
              console.log('🎯 Conteúdo do retângulo alterado para FINAL - Vídeo da garrafa ativo IMEDIATAMENTE')
            } else if (self.progress >= 0.95) {
              // Pré-carregamento do vídeo
              setRectangleContent('final')
              setCurrentVideo('garrafa')
              setVideoOpacity(0.1)
              setVideoScale(0.8)
              setGarrafaOpacity(0) // Garantir que garrafa está oculta
              console.log('🔄 PRÉ-CARREGANDO vídeo da garrafa em', Math.round(self.progress * 100) + '%')
            } else if (self.progress >= 0.6) {
              // Fase da garrafa: transição suave
              setRectangleContent('garrafa-overlay')
              setVideoOpacity(0) // Garantir que vídeo está oculto
              setVideoScale(0.8)
              
              // Animar a entrada da garrafa de forma suave
              const garrafaProgress = (self.progress - 0.6) / 0.38 // Normalizar progresso entre 60% e 98%
              if (garrafaProgress > 0) {
                // Transição suave: opacidade de 0 a 1, escala de 0.8 a 1.8
                setGarrafaOpacity(Math.min(1, garrafaProgress * 1.5)) // Entrada mais suave
                setGarrafaScale(0.8 + (garrafaProgress * 1.0)) // Escala de 0.8 a 1.8
                setGarrafaRotation(0)
              }
            } else {
              // Fase inicial: splash screen
              setRectangleContent('splash')
              setGarrafaOpacity(0)
              setGarrafaScale(0.8)
              setGarrafaRotation(180)
              setVideoOpacity(0)
              setVideoScale(0.8)
            }
          },
          onEnter: () => {
            console.log('🔄 Iniciando detecção de troca de conteúdo OTIMIZADA')
          },
          onLeave: () => {
            console.log('✅ Animação completa - conteúdo final ativo')
          }
          // REMOVIDOS onEnterBack e onLeaveBack para evitar conflitos
        })



        // ScrollTrigger de FALLBACK para transição entre vídeos com TIKTOK - PROTEÇÃO CONTRA SCROLL INVERSO - SEM ZONA MORTA (3 VÍDEOS)
        ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: window.innerWidth <= 768 ? '+=1600vh' : '+=1900vh', // Aumentado para acomodar 3 vídeos
          scrub: 0.5,
          onUpdate: (self) => {
            // Calcular o vh atual
            const scrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const scrollVh = scrollY / viewportHeight
            
            // Primeiro vídeo inicia em 98% do progresso
            const firstVideoStartVh = window.innerWidth <= 768 ? 300 * 0.98 : 700 * 0.98
            const secondVideoStartVh = firstVideoStartVh + 600
            const thirdVideoStartVh = secondVideoStartVh + 600 // Terceiro vídeo 600vh após o segundo
            
            // Zona de transição TikTok entre primeiro e segundo vídeo
            const firstTransitionStartVh = secondVideoStartVh - 200
            const firstTransitionEndVh = secondVideoStartVh
            
            // Zona de transição TikTok entre segundo e terceiro vídeo
            const secondTransitionStartVh = thirdVideoStartVh - 200
            const secondTransitionEndVh = thirdVideoStartVh
            
            // Se estamos em fallback (direction === -1) e na zona dos vídeos
            if (self.direction === -1) {
              if (scrollVh >= secondTransitionEndVh) {
                // Manter terceiro vídeo ativo durante fallback
                setCurrentVideo('parafusadeira')
                setVideoTransform('translateY(0vh)')
                setVideoTransitionProgress(1)
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('🔄 FALLBACK - MANTENDO TERCEIRO VÍDEO em', scrollVh.toFixed(1) + 'vh')
              } else if (scrollVh >= secondTransitionStartVh) {
                // Manter transição TikTok entre segundo e terceiro vídeo durante fallback
                const transitionProgress = (scrollVh - secondTransitionStartVh) / 200
                setVideoTransitionProgress(transitionProgress)
                
                // TRANSIÇÃO CONTÍNUA NO FALLBACK 2-3
                if (transitionProgress < 0.5) {
                  setCurrentVideo('bolsa')
                  const translateY = -100 * transitionProgress * 2
                  setVideoTransform(`translateY(${translateY}vh)`)
                  setVideoOpacity(1)
                  setVideoScale(1)
                } else {
                  setCurrentVideo('parafusadeira')
                  const translateY = 100 - (100 * (transitionProgress - 0.5) * 2)
                  setVideoTransform(`translateY(${translateY}vh)`)
                  setVideoOpacity(1)
                  setVideoScale(1)
                }
                
                // PROTEÇÃO CONTRA ZONA MORTA NO FALLBACK 2-3
                if (transitionProgress >= 0.4 && transitionProgress <= 0.6) {
                  const criticalProgress = (transitionProgress - 0.4) / 0.2
                  
                  if (criticalProgress < 0.5) {
                    setCurrentVideo('bolsa')
                    const translateY = -100 + (100 * criticalProgress * 2)
                    setVideoTransform(`translateY(${translateY}vh)`)
                  } else {
                    setCurrentVideo('parafusadeira')
                    const translateY = 100 - (100 * (criticalProgress - 0.5) * 2)
                    setVideoTransform(`translateY(${translateY}vh)`)
                  }
                  
                  setVideoOpacity(1)
                  setVideoScale(1)
                }
                
                console.log('🔄 FALLBACK - MANTENDO TRANSITION TIKTOK 2-3 SEM ZONA MORTA em', scrollVh.toFixed(1) + 'vh')
              } else if (scrollVh >= firstTransitionEndVh) {
                // Manter segundo vídeo ativo durante fallback
                setCurrentVideo('bolsa')
                setVideoTransform('translateY(0vh)')
                setVideoTransitionProgress(0)
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('🔄 FALLBACK - MANTENDO SEGUNDO VÍDEO em', scrollVh.toFixed(1) + 'vh')
              } else if (scrollVh >= firstTransitionStartVh) {
                // Manter transição TikTok entre primeiro e segundo vídeo durante fallback
                const transitionProgress = (scrollVh - firstTransitionStartVh) / 200
                setVideoTransitionProgress(transitionProgress)
                
                // TRANSIÇÃO CONTÍNUA NO FALLBACK 1-2
                if (transitionProgress < 0.5) {
                  setCurrentVideo('garrafa')
                  const translateY = -100 * transitionProgress * 2
                  setVideoTransform(`translateY(${translateY}vh)`)
                  setVideoOpacity(1)
                  setVideoScale(1)
                } else {
                  setCurrentVideo('bolsa')
                  const translateY = 100 - (100 * (transitionProgress - 0.5) * 2)
                  setVideoTransform(`translateY(${translateY}vh)`)
                  setVideoOpacity(1)
                  setVideoScale(1)
                }
                
                // PROTEÇÃO CONTRA ZONA MORTA NO FALLBACK 1-2
                if (transitionProgress >= 0.4 && transitionProgress <= 0.6) {
                  const criticalProgress = (transitionProgress - 0.4) / 0.2
                  
                  if (criticalProgress < 0.5) {
                    setCurrentVideo('garrafa')
                    const translateY = -100 + (100 * criticalProgress * 2)
                    setVideoTransform(`translateY(${translateY}vh)`)
                  } else {
                    setCurrentVideo('bolsa')
                    const translateY = 100 - (100 * (criticalProgress - 0.5) * 2)
                    setVideoTransform(`translateY(${translateY}vh)`)
                  }
                  
                  setVideoOpacity(1)
                  setVideoScale(1)
                }
                
                console.log('🔄 FALLBACK - MANTENDO TRANSITION TIKTOK 1-2 SEM ZONA MORTA em', scrollVh.toFixed(1) + 'vh')
              } else if (scrollVh >= firstVideoStartVh) {
                // Manter primeiro vídeo ativo durante fallback
                setCurrentVideo('garrafa')
                setVideoTransform('translateY(0vh)')
                setVideoTransitionProgress(0)
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('🔄 FALLBACK - MANTENDO PRIMEIRO VÍDEO em', scrollVh.toFixed(1) + 'vh')
              }
            }
          },
          onEnter: () => {
            console.log('🔄 FALLBACK DE 3 VÍDEOS COM TIKTOK ATIVADO - SEM ZONA MORTA')
          },
          onLeave: () => {
            console.log('✅ FALLBACK DE 3 VÍDEOS FINALIZADO')
          }
        })

        // ScrollTrigger UNIFICADO para transição entre vídeos com ANIMAÇÃO TIKTOK - SEM ZONA MORTA (3 VÍDEOS)
        ScrollTrigger.create({
          trigger: 'body',
          start: 'top top',
          end: window.innerWidth <= 768 ? '+=1600vh' : '+=1900vh', // Aumentado para acomodar 3 vídeos
          scrub: 1,
          onUpdate: (self) => {
            // Calcular o vh atual baseado no progresso total
            const maxVh = window.innerWidth <= 768 ? 1600 : 1900
            const currentVh = self.progress * maxVh
            
            // Primeiro vídeo inicia em 98% do progresso (294vh mobile, 686vh desktop)
            const firstVideoStartVh = window.innerWidth <= 768 ? 300 * 0.98 : 700 * 0.98
            const secondVideoStartVh = firstVideoStartVh + 600
            const thirdVideoStartVh = secondVideoStartVh + 600 // Terceiro vídeo 600vh após o segundo
            
            // Zona de transição TikTok entre primeiro e segundo vídeo
            const firstTransitionStartVh = secondVideoStartVh - 200
            const firstTransitionEndVh = secondVideoStartVh
            
            // Zona de transição TikTok entre segundo e terceiro vídeo
            const secondTransitionStartVh = thirdVideoStartVh - 200
            const secondTransitionEndVh = thirdVideoStartVh
            
            // LÓGICA COMPLETA PARA 3 VÍDEOS COM TRANSIÇÃO TIKTOK
            if (currentVh >= secondTransitionEndVh) {
              // Terceiro vídeo totalmente ativo
              setCurrentVideo('parafusadeira')
              setVideoTransform('translateY(0vh)')
              setVideoTransitionProgress(1)
              setVideoOpacity(1)
              setVideoScale(1)
              console.log('🎬 TERCEIRO VÍDEO ATIVO - VH atual:', Math.floor(currentVh), 'VH início terceiro vídeo:', Math.floor(thirdVideoStartVh))
            } else if (currentVh >= secondTransitionStartVh) {
              // Zona de transição TikTok entre segundo e terceiro vídeo
              const transitionProgress = (currentVh - secondTransitionStartVh) / 200 // 0 a 1 em 200vh
              setVideoTransitionProgress(transitionProgress)
              
              // TRANSIÇÃO CONTÍNUA: Ambos os vídeos sempre ativos durante a transição
              if (transitionProgress < 0.5) {
                // Primeira metade: segundo vídeo sobe, terceiro vídeo já está posicionado embaixo
                setCurrentVideo('bolsa') // Segundo vídeo visível
                const translateYSecond = -100 * transitionProgress * 2 // 0vh a -100vh
                setVideoTransform(`translateY(${translateYSecond}vh)`)
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('📱 TIKTOK TRANSITION 2-3 - Segundo vídeo subindo:', Math.round(translateYSecond) + 'vh')
              } else {
                // Segunda metade: terceiro vídeo sobe para ocupar o espaço
                setCurrentVideo('parafusadeira') // Terceiro vídeo visível
                const translateYThird = 100 - (100 * (transitionProgress - 0.5) * 2) // 100vh a 0vh
                setVideoTransform(`translateY(${translateYThird}vh)`)
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('📱 TIKTOK TRANSITION 2-3 - Terceiro vídeo subindo:', Math.round(translateYThird) + 'vh')
              }
              
              // PROTEÇÃO CONTRA ZONA MORTA: Garantir transição suave no ponto crítico
              if (transitionProgress >= 0.4 && transitionProgress <= 0.6) {
                // Zona crítica expandida: ambos os vídeos devem estar ativos para transição suave
                const criticalProgress = (transitionProgress - 0.4) / 0.2 // 0 a 1 na zona crítica expandida
                
                if (criticalProgress < 0.5) {
                  // Ainda mostrando segundo vídeo, mas preparando terceiro
                  setCurrentVideo('bolsa')
                  const translateY = -100 + (100 * criticalProgress * 2) // -100vh a 0vh
                  setVideoTransform(`translateY(${translateY}vh)`)
                } else {
                  // Transição para terceiro vídeo
                  setCurrentVideo('parafusadeira')
                  const translateY = 100 - (100 * (criticalProgress - 0.5) * 2) // 100vh a 0vh
                  setVideoTransform(`translateY(${translateY}vh)`)
                }
                
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('🔄 ZONA CRÍTICA EXPANDIDA 2-3 - Transição suave em progresso:', Math.round(criticalProgress * 100) + '%')
              }
            } else if (currentVh >= firstTransitionEndVh) {
              // Segundo vídeo totalmente ativo (sem transição)
              setCurrentVideo('bolsa')
              setVideoTransform('translateY(0vh)')
              setVideoTransitionProgress(0)
              setVideoOpacity(1)
              setVideoScale(1)
              console.log('🎬 SEGUNDO VÍDEO ATIVO - VH atual:', Math.floor(currentVh), 'VH início segundo vídeo:', Math.floor(secondVideoStartVh))
            } else if (currentVh >= firstTransitionStartVh) {
              // Zona de transição TikTok entre primeiro e segundo vídeo
              const transitionProgress = (currentVh - firstTransitionStartVh) / 200 // 0 a 1 em 200vh
              setVideoTransitionProgress(transitionProgress)
              
              // TRANSIÇÃO CONTÍNUA: Ambos os vídeos sempre ativos durante a transição
              if (transitionProgress < 0.5) {
                // Primeira metade: primeiro vídeo sobe, segundo vídeo já está posicionado embaixo
                setCurrentVideo('garrafa') // Primeiro vídeo visível
                const translateYFirst = -100 * transitionProgress * 2 // 0vh a -100vh
                setVideoTransform(`translateY(${translateYFirst}vh)`)
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('📱 TIKTOK TRANSITION 1-2 - Primeiro vídeo subindo:', Math.round(translateYFirst) + 'vh')
              } else {
                // Segunda metade: segundo vídeo sobe para ocupar o espaço
                setCurrentVideo('bolsa') // Segundo vídeo visível
                const translateYSecond = 100 - (100 * (transitionProgress - 0.5) * 2) // 100vh a 0vh
                setVideoTransform(`translateY(${translateYSecond}vh)`)
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('📱 TIKTOK TRANSITION 1-2 - Segundo vídeo subindo:', Math.round(translateYSecond) + 'vh')
              }
              
              // PROTEÇÃO CONTRA ZONA MORTA: Garantir transição suave no ponto crítico
              if (transitionProgress >= 0.4 && transitionProgress <= 0.6) {
                // Zona crítica expandida: ambos os vídeos devem estar ativos para transição suave
                const criticalProgress = (transitionProgress - 0.4) / 0.2 // 0 a 1 na zona crítica expandida
                
                if (criticalProgress < 0.5) {
                  // Ainda mostrando primeiro vídeo, mas preparando segundo
                  setCurrentVideo('garrafa')
                  const translateY = -100 + (100 * criticalProgress * 2) // -100vh a 0vh
                  setVideoTransform(`translateY(${translateY}vh)`)
                } else {
                  // Transição para segundo vídeo
                  setCurrentVideo('bolsa')
                  const translateY = 100 - (100 * (criticalProgress - 0.5) * 2) // 100vh a 0vh
                  setVideoTransform(`translateY(${translateY}vh)`)
                }
                
                setVideoOpacity(1)
                setVideoScale(1)
                console.log('🔄 ZONA CRÍTICA EXPANDIDA 1-2 - Transição suave em progresso:', Math.round(criticalProgress * 100) + '%')
              }
            } else if (currentVh >= firstVideoStartVh) {
              // Primeiro vídeo ativo (sem transição)
              setCurrentVideo('garrafa')
              setVideoTransform('translateY(0vh)')
              setVideoTransitionProgress(0)
              setVideoOpacity(1)
              setVideoScale(1)
              console.log('🎬 PRIMEIRO VÍDEO ATIVO - VH atual:', Math.floor(currentVh), 'VH início primeiro vídeo:', Math.floor(firstVideoStartVh))
            }
          },
          onEnter: () => {
            console.log('🎬 Iniciando controle de transição entre vídeos com ANIMAÇÃO TIKTOK - SEM ZONA MORTA (3 VÍDEOS)')
          },
          onLeave: () => {
            console.log('✅ Transição entre vídeos finalizada')
          }
        })


        
        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize)
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
      }
    }
    
    // Aguardar um frame para garantir que todos os elementos estejam renderizados
    setTimeout(initAnimation, 200) // Aumentar o delay para garantir renderização completa
    
    // Cleanup function
    return () => {
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
              className="rounded-[32px] border-2 bg-white/10 shadow-2xl w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] md:w-[360px] md:h-[720px] lg:w-[380px] lg:h-[760px] transition-all duration-300 border-pink-transparent relative overflow-hidden flex items-center justify-center"
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
              ) : rectangleContent === 'garrafa-overlay' ? (
                // Conteúdo intermediário - Splash Screen com Garrafa sobreposta
                <div className="w-full h-full relative">
                  <img 
                    src="/Splash_screen.svg" 
                    alt="Splash Screen" 
                    className="w-full h-full object-cover z-10 transition-opacity duration-500"
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 z-20"
                    style={{ 
                      opacity: garrafaOpacity,
                      transform: `translate(-50%, -50%) scale(${garrafaScale}) rotate(${garrafaRotation}deg)`
                    }}
                  >
                    <div className="product-card-transparent w-48 h-64">
                      <img 
                        src="/garrafa_card.png" 
                        alt="Garrafa Stanley" 
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Conteúdo final - Vídeos com transição SEM ZONA MORTA
                <div className="w-full h-full relative">
                  {/* Vídeo da Garrafa - SEMPRE ATIVO DURANTE TRANSIÇÃO */}
                  <video 
                    src="/Garrafa_Reels.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    className="w-full h-full object-cover z-10 absolute top-0 left-0 rounded-[32px] transition-opacity duration-500"
                    style={{ 
                      objectPosition: 'center',
                      opacity: videoTransitionProgress > 0 ? Math.max(0, 1 - videoTransitionProgress) * videoOpacity : (currentVideo === 'garrafa' ? videoOpacity : 0),
                      transform: `${videoTransform} scale(${videoScale})`,
                      willChange: 'transform, opacity' as const
                    }}
                    onLoadedData={(e) => {
                      // Forçar play quando o vídeo estiver carregado
                      const video = e.target as HTMLVideoElement;
                      // Múltiplas tentativas de play para dispositivos móveis
                      const playVideo = async () => {
                        try {
                          await video.play()
                        } catch (err) {
                          console.log('Primeira tentativa falhou, tentando novamente...')
                          // Segunda tentativa após um delay
                          setTimeout(async () => {
                            try {
                              await video.play()
                            } catch (err2) {
                              console.log('Segunda tentativa falhou, tentando com user interaction...')
                              // Terceira tentativa com user interaction
                              document.addEventListener('touchstart', async () => {
                                try {
                                  await video.play()
                                } catch (err3) {
                                  console.log('Erro ao reproduzir vídeo garrafa desktop:', err3)
                                }
                              }, { once: true })
                            }
                          }, 100)
                        }
                      }
                      playVideo()
                    }}
                  />
                  
                  {/* Vídeo da Bolsa - SEMPRE ATIVO DURANTE TRANSIÇÃO */}
                  <video 
                    src="/bolsa_reels_final.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    className="w-full h-full object-cover z-20 absolute top-0 left-0 rounded-[32px] transition-opacity duration-500"
                    style={{ 
                      objectPosition: 'center',
                      opacity: videoTransitionProgress > 0 ? Math.min(1, videoTransitionProgress) * videoOpacity : (currentVideo === 'bolsa' ? videoOpacity : 0),
                      transform: `${videoTransform} scale(${videoScale})`,
                      willChange: 'transform, opacity' as const
                    }}
                    onLoadedData={(e) => {
                      // Forçar play quando o vídeo estiver carregado
                      const video = e.target as HTMLVideoElement;
                      // Múltiplas tentativas de play para dispositivos móveis
                      const playVideo = async () => {
                        try {
                          await video.play()
                        } catch (err) {
                          console.log('Primeira tentativa falhou, tentando novamente...')
                          // Segunda tentativa após um delay
                          setTimeout(async () => {
                            try {
                              await video.play()
                            } catch (err2) {
                              console.log('Segunda tentativa falhou, tentando com user interaction...')
                              // Terceira tentativa com user interaction
                              document.addEventListener('touchstart', async () => {
                                try {
                                  await video.play()
                                } catch (err3) {
                                  console.log('Erro ao reproduzir vídeo bolsa desktop:', err3)
                                }
                              }, { once: true })
                            }
                          }, 100)
                        }
                      }
                      playVideo()
                    }}
                  />
                  
                  {/* Vídeo da Parafusadeira */}
                  <video 
                    src="/parafusadeira_reels.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    className="w-full h-full object-cover z-30 absolute top-0 left-0 rounded-[32px] transition-opacity duration-500"
                    style={{ 
                      objectPosition: 'center',
                      opacity: currentVideo === 'parafusadeira' ? videoOpacity : 0,
                      transform: `${videoTransform} scale(${videoScale})`,
                      willChange: 'transform, opacity' as const
                    }}
                    onLoadedData={(e) => {
                      // Forçar play quando o vídeo estiver carregado
                      const video = e.target as HTMLVideoElement;
                      // Múltiplas tentativas de play para dispositivos móveis
                      const playVideo = async () => {
                        try {
                          await video.play()
                        } catch (err) {
                          console.log('Primeira tentativa falhou, tentando novamente...')
                          // Segunda tentativa após um delay
                          setTimeout(async () => {
                            try {
                              await video.play()
                            } catch (err2) {
                              console.log('Segunda tentativa falhou, tentando com user interaction...')
                              // Terceira tentativa com user interaction
                              document.addEventListener('touchstart', async () => {
                                try {
                                  await video.play()
                                } catch (err3) {
                                  console.log('Erro ao reproduzir vídeo parafusadeira desktop:', err3)
                                }
                              }, { once: true })
                            }
                          }, 100)
                        }
                      }
                      playVideo()
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Seção de Animação Mobile - Com GSAP Pin */}
        <div className="lg:hidden relative" style={{ height: '200vh' }}>
          <div className="h-screen flex items-center justify-center">
            <div
              ref={mobileRectangleRef}
              className="rounded-[24px] border-2 bg-white/10 shadow-2xl w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] transition-all duration-300 border-pink-transparent relative overflow-hidden flex items-center justify-center"
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
              ) : rectangleContent === 'garrafa-overlay' ? (
                // Conteúdo intermediário - Splash Screen com Garrafa sobreposta
                <div className="w-full h-full relative">
                  <img 
                    src="/Splash_screen.svg" 
                    alt="Splash Screen" 
                    className="w-full h-full object-cover z-10 transition-opacity duration-500"
                  />
                  <div 
                    className="absolute top-1/2 left-1/2 z-20"
                    style={{ 
                      opacity: garrafaOpacity,
                      transform: `translate(-50%, -50%) scale(${garrafaScale}) rotate(${garrafaRotation}deg)`
                    }}
                  >
                    <div className="product-card-transparent w-40 h-48">
                      <img 
                        src="/garrafa_card.png" 
                        alt="Garrafa Stanley" 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Conteúdo final - Vídeos com transição SEM ZONA MORTA
                <div className="w-full h-full relative">
                  {/* Vídeo da Garrafa - SEMPRE ATIVO DURANTE TRANSIÇÃO */}
                  <video 
                    src="/Garrafa_Reels.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    className="w-full h-full object-cover z-10 absolute top-0 left-0 rounded-[24px] transition-opacity duration-500"
                    style={{ 
                      objectPosition: 'center',
                      opacity: videoTransitionProgress > 0 ? Math.max(0, 1 - videoTransitionProgress) * videoOpacity : (currentVideo === 'garrafa' ? videoOpacity : 0),
                      transform: `${videoTransform} scale(${videoScale})`,
                      willChange: 'transform, opacity' as const
                    }}
                    onLoadedData={(e) => {
                      // Forçar play quando o vídeo estiver carregado
                      const video = e.target as HTMLVideoElement;
                      // Múltiplas tentativas de play para dispositivos móveis
                      const playVideo = async () => {
                        try {
                          await video.play()
                        } catch (err) {
                          console.log('Primeira tentativa falhou, tentando novamente...')
                          // Segunda tentativa após um delay
                          setTimeout(async () => {
                            try {
                              await video.play()
                            } catch (err2) {
                              console.log('Segunda tentativa falhou, tentando com user interaction...')
                              // Terceira tentativa com user interaction
                              document.addEventListener('touchstart', async () => {
                                try {
                                  await video.play()
                                } catch (err3) {
                                  console.log('Erro ao reproduzir vídeo garrafa mobile:', err3)
                                }
                              }, { once: true })
                            }
                          }, 100)
                        }
                      }
                      playVideo()
                    }}
                  />
                  
                  {/* Vídeo da Bolsa - SEMPRE ATIVO DURANTE TRANSIÇÃO */}
                  <video 
                    src="/bolsa_reels_final.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    className="w-full h-full object-cover z-20 absolute top-0 left-0 rounded-[24px] transition-opacity duration-500"
                    style={{ 
                      objectPosition: 'center',
                      opacity: videoTransitionProgress > 0 ? Math.min(1, videoTransitionProgress) * videoOpacity : (currentVideo === 'bolsa' ? videoOpacity : 0),
                      transform: `${videoTransform} scale(${videoScale})`,
                      willChange: 'transform, opacity' as const
                    }}
                    onLoadedData={(e) => {
                      // Forçar play quando o vídeo estiver carregado
                      const video = e.target as HTMLVideoElement;
                      // Múltiplas tentativas de play para dispositivos móveis
                      const playVideo = async () => {
                        try {
                          await video.play()
                        } catch (err) {
                          console.log('Primeira tentativa falhou, tentando novamente...')
                          // Segunda tentativa após um delay
                          setTimeout(async () => {
                            try {
                              await video.play()
                            } catch (err2) {
                              console.log('Segunda tentativa falhou, tentando com user interaction...')
                              // Terceira tentativa com user interaction
                              document.addEventListener('touchstart', async () => {
                                try {
                                  await video.play()
                                } catch (err3) {
                                  console.log('Erro ao reproduzir vídeo bolsa mobile:', err3)
                                }
                              }, { once: true })
                            }
                          }, 100)
                        }
                      }
                      playVideo()
                    }}
                  />
                  
                  {/* Vídeo da Parafusadeira */}
                  <video 
                    src="/parafusadeira_reels.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    className="w-full h-full object-cover z-30 absolute top-0 left-0 rounded-[24px] transition-opacity duration-500"
                    style={{ 
                      objectPosition: 'center',
                      opacity: currentVideo === 'parafusadeira' ? videoOpacity : 0,
                      transform: `${videoTransform} scale(${videoScale})`,
                      willChange: 'transform, opacity' as const
                    }}
                    onLoadedData={(e) => {
                      // Forçar play quando o vídeo estiver carregado
                      const video = e.target as HTMLVideoElement;
                      // Múltiplas tentativas de play para dispositivos móveis
                      const playVideo = async () => {
                        try {
                          await video.play()
                        } catch (err) {
                          console.log('Primeira tentativa falhou, tentando novamente...')
                          // Segunda tentativa após um delay
                          setTimeout(async () => {
                            try {
                              await video.play()
                            } catch (err2) {
                              console.log('Segunda tentativa falhou, tentando com user interaction...')
                              // Terceira tentativa com user interaction
                              document.addEventListener('touchstart', async () => {
                                try {
                                  await video.play()
                                } catch (err3) {
                                  console.log('Erro ao reproduzir vídeo parafusadeira mobile:', err3)
                                }
                              }, { once: true })
                            }
                          }, 100)
                        }
                      }
                      playVideo()
                    }}
                  />
                </div>
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