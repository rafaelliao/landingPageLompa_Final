'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
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
        <motion.div
          ref={iconRef}
          className="hero-icon"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LogoIcon size="lg" />
        </motion.div>

        {/* Título centralizado */}
        <motion.h1
          ref={titleRef}
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          O FUTURO <span className="text-accent">DAS VENDAS</span> É SOCIAL, VISUAL E<br />
          ACESSÍVEL. E ELE<br />
          <span className="text-accent">COMEÇA AQUI</span>
        </motion.h1>

        {/* Splash Screen */}
        <motion.div
          className="smartphone-mockup"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="mockup-screen">
            <img 
              src="/Splash_screen.svg" 
              alt="Splash Screen" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Seta de rolagem */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scroll-arrow"
          >
            <path
              d="M7 13L12 18L17 13"
              stroke="url(#scrollGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4807AD" />
                <stop offset="100%" stopColor="#E321FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection 