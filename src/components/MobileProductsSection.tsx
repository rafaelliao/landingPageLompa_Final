'use client'

import { useResponsive } from '../hooks/useResponsive'
import { useEffect, useState } from 'react'

interface MobileProduct {
  id: string
  name: string
  image: string
  alt: string
  side: 'left' | 'right'
  position: 'top' | 'center' | 'bottom'
}

const mobileProducts: MobileProduct[] = [
  // GRUPO ESQUERDA - 3 cards (conforme imagem)
  {
    id: 'mobile-1',
    name: 'Garrafa Stanley',
    image: '/cards_image/garrafa_card.png',
    alt: 'Garrafa Stanley',
    side: 'left',
    position: 'top'
  },
  {
    id: 'mobile-2',
    name: 'Urso Pelúcia',
    image: '/cards_image/ursopelucia_icon.png',
    alt: 'Urso Pelúcia',
    side: 'left',
    position: 'center'
  },
  {
    id: 'mobile-3',
    name: 'Blusa Creme',
    image: '/cards_image/blusa-creme.png',
    alt: 'Suéter de malha creme',
    side: 'left',
    position: 'bottom'
  },
  
  // GRUPO DIREITA - 3 cards (conforme imagem)
  {
    id: 'mobile-4',
    name: 'Boné',
    image: '/cards_image/bone_icon.png',
    alt: 'Boné Icon',
    side: 'right',
    position: 'top'
  },
  {
    id: 'mobile-5',
    name: 'Tênis',
    image: '/cards_image/tenis_icon.png',
    alt: 'Tênis Icon',
    side: 'right',
    position: 'center'
  },
  {
    id: 'mobile-6',
    name: 'Relógio',
    image: '/cards_image/relogio_card.png',
    alt: 'Relógio Card',
    side: 'right',
    position: 'bottom'
  }
]

const MobileProductsSection = () => {
  const { isMobile } = useResponsive()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !isMobile) return null

  const getPositionClasses = (side: string, position: string) => {
    if (side === 'left') {
      switch (position) {
        case 'top':
          return 'top-16 left-6'       // Garrafa Stanley - aproximado do centro
        case 'center':
          return 'top-40 left-2'       // Urso Pelúcia - mantido afastado
        case 'bottom':
          return 'top-64 left-6'       // Blusa Creme - aproximado do centro
        default:
          return 'top-0 left-0'
      }
    } else {
      switch (position) {
        case 'top':
          return 'top-16 right-6'      // Boné - aproximado do centro
        case 'center':
          return 'top-40 right-2'      // Tênis - mantido afastado
        case 'bottom':
          return 'top-64 right-6'      // Relógio - aproximado do centro
        default:
          return 'top-0 right-0'
      }
    }
  }

  return (
    <section className="mobile-products-section">
      <div className="mobile-products-container">
        <div className="mobile-products-grid">
          {mobileProducts.map((product: MobileProduct) => (
            <div
              key={product.id}
              className={`mobile-product-item ${getPositionClasses(product.side, product.position)} ${
                product.name === 'Garrafa Stanley' ? 'mobile-garrafa-card' : ''
              }`}
            >
              <div className="mobile-product-card">
                <img 
                  src={product.image} 
                  alt={product.alt} 
                  className="mobile-product-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MobileProductsSection 