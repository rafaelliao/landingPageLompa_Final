'use client'

import { useResponsive } from '../hooks/useResponsive'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useRef } from 'react'

interface Product {
  id: string
  name: string
  image: string
  alt: string
  position: 'left-top' | 'left-center' | 'left-bottom' | 'left-bottom-inner' | 'left-center-inner' | 'left-extra' | 'left-top-inner' | 'left-bottom-extra' | 'right-top' | 'right-center' | 'right-bottom' | 'right-bottom-inner' | 'right-extra' | 'right-center-inner' | 'right-top-inner' | 'right-bottom-extra'
}

const allProducts: Product[] = [
  // ===== GRUPO ESQUERDA - Cards à esquerda do título =====
  {
    id: '1',
    name: 'Garrafa Stanley',
    image: '/cards_image/garrafa_card.png',
    alt: 'Garrafa Stanley',
    position: 'left-top'
  },
  {
    id: '2',
    name: 'Urso Pelúcia',
    image: '/cards_image/ursopelucia_icon.png',
    alt: 'Urso Pelúcia',
    position: 'left-center'
  },
  {
    id: '3',
    name: 'Blusa Creme',
    image: '/cards_image/blusa-creme.png',
    alt: 'Suéter de malha creme',
    position: 'left-bottom'
  },
  {
    id: '4',
    name: 'Bolsa',
    image: '/cards_image/bolsa_icon.png',
    alt: 'Bolsa Icon',
    position: 'left-center-inner'
  },
  {
    id: '9',
    name: 'Câmera Card',
    image: '/cards_image/camera_card.png',
    alt: 'Câmera Card',
    position: 'left-extra'
  },
  {
    id: '11',
    name: 'Câmera Icon',
    image: '/cards_image/camera_icon.jpeg',
    alt: 'Câmera Icon',
    position: 'left-bottom-inner'
  },
  {
    id: '13',
    name: 'Fone',
    image: '/cards_image/fone.png',
    alt: 'Fone de Ouvido',
    position: 'left-top-inner'
  },
  {
    id: '15',
    name: 'Ring Light',
    image: '/cards_image/ringlight.png',
    alt: 'Ring Light',
    position: 'left-bottom-extra'
  },
  
  // ===== GRUPO DIREITA - Cards à direita do título =====
  {
    id: '5',
    name: 'Óculos',
    image: '/cards_image/oculos_icon.png',
    alt: 'Óculos Icon',
    position: 'right-top'
  },
  {
    id: '6',
    name: 'Maquiagem',
    image: '/cards_image/maquiagem_icon.png',
    alt: 'Maquiagem Icon',
    position: 'right-center'
  },
  {
    id: '7',
    name: 'Tênis',
    image: '/cards_image/tenis_icon.png',
    alt: 'Tênis Icon',
    position: 'right-bottom'
  },
  {
    id: '8',
    name: 'Boné',
    image: '/cards_image/bone_icon.png',
    alt: 'Boné Icon',
    position: 'right-bottom-inner'
  },
  {
    id: '10',
    name: 'Relógio',
    image: '/cards_image/relogio_card.png',
    alt: 'Relógio Card',
    position: 'right-extra'
  },
  {
    id: '12',
    name: 'Creme Icon',
    image: '/cards_image/creme_icon.png',
    alt: 'Creme Icon',
    position: 'right-center-inner'
  },
  {
    id: '14',
    name: 'Ventilador',
    image: '/cards_image/ventilador.png',
    alt: 'Ventilador',
    position: 'right-top-inner'
  },
  {
    id: '16',
    name: 'Caminha',
    image: '/cards_image/caminha.png',
    alt: 'Caminha',
    position: 'right-bottom-extra'
  }
]

// Cards visíveis apenas na versão mobile
const mobileVisibleCards = [
  'Garrafa Stanley',
  'Bolsa',
  'Blusa Creme',
  'Câmera Card',
  'Boné',
  'Relógio',
  'Fone',
  'Ventilador'
]

const ProductsSection = () => {
  const { isMobile: isMobileResponsive } = useResponsive()
  const { scrollProgress, createAnimation, isMobile: isMobileScroll } = useScrollAnimation()
  const productRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // Usar a detecção de mobile do hook de scroll para animação
  const isMobile = isMobileScroll || isMobileResponsive

  // Filtrar produtos baseado no dispositivo
  const products = isMobile 
    ? allProducts.filter(product => mobileVisibleCards.includes(product.name))
    : allProducts

  // Inicializar animação GSAP com ScrollTrigger
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Inicializando ScrollTriggers para', products.length, 'cards')
      createAnimation()
    }, 300)
    
    return () => clearTimeout(timer)
  }, [createAnimation, products])



  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'left-top':
        return '-top-68 left-5'
      case 'left-center':
        return '-top-50 -left-8'
      case 'left-bottom':
        return '-top-13 -left-10'
      case 'left-bottom-inner':
        return 'top-24 -left-12'
      case 'left-center-inner':
        return '-top-1 left-22'
      case 'left-extra':
        return 'top-15 left-5'
      case 'left-top-inner':
        return '-top-40 left-15'
      case 'left-bottom-extra':
        return 'top-35 -left-5'
      case 'right-top':
        return '-top-68 right-5'
      case 'right-center':
        return '-top-30 right-28'
      case 'right-bottom':
        return '-top-33 -right-10'
      case 'right-bottom-inner':
        return '-top-1 right-22'
      case 'right-extra':
        return 'top-15 right-5'
      case 'right-center-inner':
        return '-top-20 right-15'
      case 'right-top-inner':
        return '-top-45 right-20'
      case 'right-bottom-extra':
        return 'top-30 -right-5'
      default:
        return 'top-0 left-0'
    }
  }

  return (
    <section className="products-section">
      <div className="products-container">
        {/* Indicador do elemento de referência dinâmico */}
        <div 
          id="reference-indicator"
          style={{
            position: 'fixed',
            width: '15px',
            height: '15px',
            background: 'lime',
            borderRadius: '50%',
            border: '3px solid white',
            zIndex: 9998,
            pointerEvents: 'none',
            opacity: 1,
            boxShadow: '0 0 15px rgba(0,255,0,1)',
            transition: 'all 0.1s ease'
          }}
        />
        
        {/* Indicador de progresso da animação */}
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,255,0,0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999,
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}>
          {scrollProgress.toFixed(1)}vh | {scrollProgress <= 74.1 ? ((scrollProgress / 74.1) * 100).toFixed(1) : '100'}%
        </div>
        
        {/* Indicador de fase da animação */}
        <div style={{
          position: 'fixed',
          top: '50px',
          right: '10px',
          background: 'rgba(0,0,255,0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999,
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}>
          BLUEPRINT ATIVO
        </div>
        
        {/* Indicador de ScrollTrigger */}
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '10px',
          background: 'rgba(255,0,255,0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999,
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}>
          SCRUB 3.5
        </div>
        
        {/* Indicador de Performance */}
        <div style={{
          position: 'fixed',
          top: '130px',
          right: '10px',
          background: 'rgba(0,255,0,0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999,
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}>
          800VH TIMELINE
        </div>
        
        {/* Indicador de Cache */}
        <div style={{
          position: 'fixed',
          top: '170px',
          right: '10px',
          background: 'rgba(255,165,0,0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999,
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}>
          FASE SEPARADA
        </div>
        
        {/* Grid de produtos posicionados em meias-luas */}
        <div className="products-grid">
          {products.map((product, index) => {
                          return (
                <div
                  key={product.id}
                  ref={(el) => { productRefs.current[index] = el; }}
                  className={`product-item ${getPositionClasses(product.position)}`}
                >
              <div className="product-card">
                <img 
                  src={product.image} 
                  alt={product.alt} 
                  className="product-image"
                />
              </div>
              
              {/* Ícones especiais para alguns produtos */}
              {product.name === 'Blusa Creme' && (
                <div 
                  className="product-icon star-icon"
                >
                  <img 
                    src="/star_icon.svg" 
                    alt="Star" 
                    className="icon-image"
                  />
                </div>
              )}
              
              {product.name === 'Óculos' && (
                <div 
                  className="product-icon like-icon"
                >
                  <img 
                    src="/icon_like.svg" 
                    alt="Like" 
                    className="icon-image"
                  />
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection 