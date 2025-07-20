'use client'

import { useRef } from 'react'
import LogoIcon from './LogoIcon'
import ProductsSection from './ProductsSection'
import { useResponsive } from '../hooks/useResponsive'

interface HeroSectionProps {
  className?: string
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useResponsive()

  // Debug logs
  console.log('🏗️ HeroSection renderizando:', {
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'N/A'
  })

  return (
    <section className={`hero-section ${className}`}>
      {/* Seção de produtos ao fundo */}
      <ProductsSection />
      
      {/* Container centralizado */}
      <div className="hero-container">
        {/* Ícone centralizado */}
        <div
          ref={iconRef}
          className="hero-icon"
        >
          <LogoIcon size="lg" />
        </div>

        {/* Título centralizado */}
        <h1
          ref={titleRef}
          className="hero-title"
        >
          O FUTURO <span className="text-accent">DAS VENDAS</span> É SOCIAL, VISUAL E<br />
          ACESSÍVEL. E ELE<br />
          <span className="text-accent">COMEÇA AQUI</span>
        </h1>

        {/* Splash Screen - Desktop */}
        <div
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