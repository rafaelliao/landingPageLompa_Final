'use client'

import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    console.log('Menu clicked, current state:', isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="w-full flex justify-center pt-8 pb-4 px-4 md:px-0" style={{ border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}>
      <nav
        className="relative w-full max-w-7xl"
        aria-label="Barra de navegação principal"
        style={{ border: 'none', boxShadow: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
      >
        {/* Barra translúcida */}
        <div
          className="flex items-center justify-between h-[100px] px-8 md:px-12 bg-white/10 rounded-[30px_0px_30px_0px] backdrop-blur-md relative"
          style={{ boxSizing: 'border-box', border: 'none', boxShadow: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
        >
          {/* Logo */}
          <div className="flex items-center border-none">
            <Logo size="lg" className="hidden lg:block" />
            <Logo size="md" className="lg:hidden" />
          </div>

          {/* Botão Read More - Desktop */}
          <a
            href="#"
            className="hidden lg:flex items-center justify-center px-7 py-3 gap-2 bg-[#4807AD] text-white font-inter font-semibold text-base rounded-[18px_0px_18px_0px] shadow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{ height: 52, minWidth: 136, border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          >
            Read More
          </a>

          {/* Menu Sanduíche - Mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1 focus:outline-none z-50 relative"
            aria-label="Abrir menu"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        <div className={`lg:hidden absolute top-full right-0 mt-2 bg-red-500/90 backdrop-blur-md rounded-[20px] overflow-hidden transition-all duration-300 z-50 min-w-[200px] ${isMenuOpen ? 'max-h-48 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
          <div className="p-4 space-y-3">
            {/* Botão Suporte */}
            <a
              href="#"
              className="flex items-center justify-center px-6 py-3 gap-2 bg-[#E321FF] text-white font-inter font-semibold text-sm rounded-[15px_0px_15px_0px] shadow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
              style={{ border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Suporte
            </a>
            
            {/* Botão Acesso Vendedor */}
            <a
              href="#"
              className="flex items-center justify-center px-6 py-3 gap-2 bg-[#4807AD] text-white font-inter font-semibold text-sm rounded-[15px_0px_15px_0px] shadow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
              style={{ border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Acesso Vendedor
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
} 