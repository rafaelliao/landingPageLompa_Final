'use client'

import { useEffect, useRef } from 'react'
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
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const mobileTitleContainerRef = useRef<HTMLDivElement>(null)
  
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



  // Efeito dos cards entrando no retângulo - CENTRO EXATO
  useEffect(() => {
    // Limpar todos os ScrollTriggers existentes
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

    if (rectangle && garrafaCard && ursopeluciaCard && blusaCard && bolsaCard && 
        oculosCard && maquiagemCard && tenisCard && boneCard && cremeCard && cameraCard) {
      
      // Obter posição do centro do retângulo (DESTINO FINAL)
      const rectRect = rectangle.getBoundingClientRect()
      const rectCenterX = rectRect.left + rectRect.width / 2
      const rectCenterY = rectRect.top + rectRect.height / 2
      
      console.log('=== CENTRO DO RETÂNGULO ===')
      console.log('Centro X:', rectCenterX)
      console.log('Centro Y:', rectCenterY)
      console.log('==========================')
      
      // Array com todos os cards
      const cards = [
        { ref: garrafaCard, scale: 1.8, zIndex: 100, rotation: 0 }, // Garrafa maior, 80% maior
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
      
      // Pin do retângulo (independente da animação dos cards)
      ScrollTrigger.create({
        trigger: rectangle.parentElement?.parentElement,
        start: 'top -2%',
        end: 'bottom center',
        pin: rectangle.parentElement,
        pinSpacing: true
      })
      
      // Timeline para animação dos cards - COMEÇA DESDE O INÍCIO
      const tlCards = gsap.timeline({
        scrollTrigger: {
          trigger: 'body', // Trigger no body para começar desde o início
          start: 'top top', // Começa desde o topo da página
          end: '+=1000', // Dura 1000px de scroll
          scrub: true, // Sincroniza com o scroll
        }
      })
      
      // Calcular e animar cada card para o centro do retângulo
      cards.forEach(({ ref, scale, zIndex, rotation }, index) => {
        // Calcular posição atual do card (PONTO A)
        const cardRect = ref.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2
        
        // Calcular distância até o centro do retângulo (PONTO B)
        const deltaX = rectCenterX - cardCenterX
        const deltaY = rectCenterY - cardCenterY
        
        console.log(`Card ${index + 1}:`, {
          atual: { x: cardCenterX, y: cardCenterY },
          destino: { x: rectCenterX, y: rectCenterY },
          delta: { x: deltaX, y: deltaY }
        })
        
        // Animação: PONTO A → PONTO B (centro do retângulo)
        tlCards.fromTo(ref, 
          // PONTO A - Posição inicial
          {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            zIndex: 10 + index
          },
          // PONTO B - Centro do retângulo
          {
            x: deltaX,
            y: deltaY,
            scale: scale,
            rotation: rotation, // Usar a rotação calculada
            zIndex: zIndex,
            ease: 'power3.out'
          },
          0 // Sem delay - todos começam juntos
        )
      })
    }
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

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
            <div ref={garrafaCardRef} className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 380px)', top: 'calc(50% + 80px)' }}>
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
                O <span style={{ color: '#4807AD' }}>FUTURO</span> DAS VENDAS É SOCIAL, VISUAL E ACESSÍVEL. E ELE <span style={{ color: '#E321FF' }}>COMEÇA AQUI</span>
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
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 160px)', top: 'calc(50% + 80px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/garrafa_card.png" 
                  alt="Garrafa Stanley" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card sobreposto à esquerda, posicionado acima */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-20" style={{ left: 'calc(50% - 160px)', top: 'calc(50% - 20px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/ursopelucia_icon.png" 
                  alt="Urso Pelúcia" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Novo Card 1 - No quadro amarelo esquerdo */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 140px)', top: 'calc(50% - 60px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/relogio_card.png" 
                  alt="Relógio" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Novo Card 2 - No quadro amarelo direito */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 140px)', top: 'calc(50% - 60px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/camera_card.png" 
                  alt="Câmera" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card com imagem da blusa à direita */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 160px)', top: 'calc(50% + 80px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/blusa-creme.png" 
                  alt="Suéter de malha creme" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

            </div>
            
            {/* Card sobreposto à direita, posicionado acima */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-20" style={{ left: 'calc(50% + 160px)', top: 'calc(50% - 20px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/bolsa_icon.png" 
                  alt="Bolsa Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card extremo à esquerda */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-5" style={{ left: 'calc(50% - 200px)', top: 'calc(50% + 100px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/oculos_icon.png" 
                  alt="Óculos Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              {/* Ícone de like sobreposto à frente do card */}
              <div className="absolute -top-3 -right-3 z-20">
                <img 
                  src="/icon_like.svg" 
                  alt="Like" 
                  className="w-12 h-12 drop-shadow-sm"
                />
              </div>

            </div>
            
            {/* Card extremo à direita */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 200px)', top: 'calc(50% + 100px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/maquiagem_icon.png" 
                  alt="Maquiagem Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card inferior esquerdo-central */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-30" style={{ left: 'calc(50% - 100px)', top: 'calc(50% + 140px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/tenis_icon.png" 
                  alt="Tênis Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card inferior direito-central */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-30" style={{ left: 'calc(50% + 100px)', top: 'calc(50% + 140px)' }}>
              <div className="product-card-transparent w-[46px] h-[58px]">
                <img 
                  src="/bone_icon.png" 
                  alt="Boné Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Título Centralizado */}
            <div ref={mobileTitleContainerRef} className="text-center max-w-3xl mx-auto px-4">
              <div ref={mobileHeartIconRef} className="flex justify-center mb-6">
                <LogoIcon size="md" />
              </div>
              <h1 
                ref={mobileTitleRef}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4" 
                style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}
              >
                O <span style={{ color: '#4807AD' }}>FUTURO</span> DAS VENDAS É SOCIAL, VISUAL E ACESSÍVEL. E ELE <span style={{ color: '#E321FF' }}>COMEÇA AQUI</span>
              </h1>
            </div>
          </div>
        </div>
        
        {/* Seção de Animação - Com GSAP Pin */}
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
              
              {/* Splash Screen SVG centralizado */}
              <img 
                src="/Splash_screen.svg" 
                alt="Splash Screen" 
                className="w-full h-full object-cover z-10 relative"
              />
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