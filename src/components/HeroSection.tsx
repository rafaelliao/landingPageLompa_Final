'use client'

import { useRef } from 'react'
import LogoIcon from './LogoIcon'
import ProductsSection from './ProductsSection'

interface HeroSectionProps {
  className?: string
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

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

        {/* Splash Screen */}
        <div
          className="smartphone-mockup"
          id="smartphone-mockup-target"
          data-testid="mockup-element"
        >
          <div className="mockup-screen">
            <img 
              src="/Splash_screen.svg" 
              alt="Splash Screen" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Elemento invisível fixo no centro do mockup */}
          <div 
            id="mockup-center-reference"
            className="mockup-center-reference"
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