'use client'

import { useResponsive } from '../hooks/useResponsive'

import { useEffect, useRef, useMemo, useState } from 'react'

interface Product {
  id: string
  name: string
  image: string
  alt: string
  position: 'left-top' | 'left-center' | 'left-bottom' | 'left-bottom-inner' | 'left-center-inner' | 'left-extra' | 'left-top-inner' | 'left-bottom-extra' | 'right-top' | 'right-center' | 'right-bottom' | 'right-bottom-inner' | 'right-extra' | 'right-center-inner' | 'right-top-inner' | 'right-bottom-extra'
}

interface ProductsSectionProps {
  garrafaRef?: React.RefObject<HTMLDivElement>
  ursopeluciaRef?: React.RefObject<HTMLDivElement>
  blusaRef?: React.RefObject<HTMLDivElement>
  bolsaRef?: React.RefObject<HTMLDivElement>
  maquiagemRef?: React.RefObject<HTMLDivElement>
  tenisRef?: React.RefObject<HTMLDivElement>
  boneRef?: React.RefObject<HTMLDivElement>
  relogioRef?: React.RefObject<HTMLDivElement>
  cameraRef?: React.RefObject<HTMLDivElement>
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

// Cards visíveis apenas na versão mobile (4 de cada lado)
const mobileVisibleCards = [
  // GRUPO ESQUERDA - 4 cards
  'Garrafa Stanley',    // ✅ Garantido - Card principal
  'Bolsa',              // ✅ Card importante
  'Blusa Creme',        // ✅ Card com estrela
  'Urso Pelúcia',       // ✅ Novo card inserido no grupo da esquerda
  // 'Câmera Card',     // ❌ Removido do mobile
  // 'Fone',            // ❌ Removido do mobile
  
  // GRUPO DIREITA - 4 cards
  'Boné',               // ✅ Card importante
  'Óculos',             // ✅ Novo card inserido no grupo da direita
  'Relógio',            // ✅ Card visual
  // 'Ventilador'       // ❌ Removido do mobile
]

const ProductsSection = ({ 
  garrafaRef,
  ursopeluciaRef,
  blusaRef,
  bolsaRef,
  maquiagemRef,
  tenisRef,
  boneRef,
  relogioRef,
  cameraRef
}: ProductsSectionProps = {}) => {
  const { isMobile: isMobileResponsive } = useResponsive()

  const productRefs = useRef<(HTMLDivElement | null)[]>([])
  const garrafaCardRef = useRef<HTMLDivElement>(null)

  // Garantir renderização só no client para evitar mismatch
  const [isClient, setIsClient] = useState(false)
  useEffect(() => { setIsClient(true) }, [])

  const isMobile = isMobileResponsive

  // Filtrar produtos baseado no dispositivo
  const products = useMemo(() => {
    if (isMobile) {
      return allProducts.filter(product => mobileVisibleCards.includes(product.name))
    } else {
      return allProducts.filter(product => product.name !== 'Creme Icon')
    }
  }, [isMobile, allProducts])



  if (!isClient) return null

  const getPositionClasses = (position: string) => {
    // Posições específicas para mobile com coordenadas salvas
    if (isMobile) {
      switch (position) {
        case 'left-top':
          return 'top-24 left-2'       // Garrafa Stanley: left: 10px, top: 6rem
        case 'left-center':
          return 'top-40 left-1'       // Urso Pelúcia: left: 5px, top: 8rem (movido para cima)
        case 'left-bottom':
          return 'top-24 left-85'      // Blusa Creme: left: 85%, top: 6rem
        case 'left-bottom-inner':
          return 'top-16 left-4'       // Câmera Icon: left: 15px, top: 4rem
        case 'left-center-inner':
          return 'top-12 left-10'      // Bolsa: left: 40px, top: 3rem
        case 'left-extra':
          return 'top-24 left-4'       // Câmera Card: left: 15px, top: 6rem
        case 'left-top-inner':
          return 'top-8 left-5'        // Fone: left: 20px, top: 2rem
        case 'left-bottom-extra':
          return 'top-35 left-1'       // Ring Light: left: 5px, top: 10rem
        case 'right-top':
          return 'top-24 right-0'      // Óculos: right: 0px, top: 6rem
        case 'right-center':
          return 'top-10 right-0'      // Maquiagem - grupo da direita, alinhado
        case 'right-bottom':
          return 'top-48 right-2'      // Ventilador: right: 10px, top: 12rem
        case 'right-bottom-inner':
          return 'top-4 right-10'      // Boné: right: 40px, top: 1rem
        case 'right-extra':
          return 'top-48 right-6'      // Tenis: right: 15px, top: 12rem
        case 'right-center-inner':
          return 'top-40 right-6'      // Ursinho: right: 24px, top: 10rem
        case 'right-top-inner':
          return 'top-40 right-5'      // Relógio: right: 5px, top: 10rem
        case 'right-bottom-extra':
          return 'top-30 right-1'      // Posição padrão
        default:
          return 'top-0 left-0'
      }
    }
    
    // Posições padrão para desktop e outros cards mobile
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
        return 'top-15 left-5'        // Câmera Card - desktop: posição original
      case 'left-top-inner':
        return '-top-40 left-15'      // Fone - desktop: posição original
      case 'left-bottom-extra':
        return 'top-35 -left-5'
      case 'right-top':
        return '-top-68 right-5'
      case 'right-center':
        return 'top-10 right-20'      // Maquiagem - mais ao centro
      case 'right-bottom':
        return 'top-20 right-0'      // Tênis - colado na borda direita
      case 'right-bottom-inner':
        return '-top-16 right-20'       // Boné - volta para mais à direita
      case 'right-extra':
        return 'top-15 right-5'
      case 'right-center-inner':
        return '-top-20 right-15'     // Creme Icon - desktop: posição original
      case 'right-top-inner':
        return '-top-45 right-20'     // Ventilador - desktop: posição original
      case 'right-bottom-extra':
        return 'top-30 -right-5'
      default:
        return 'top-0 left-0'
    }
  }

  return (
    <section className="products-section">
      <div className="products-container">
        {/* Grid de produtos posicionados em meias-luas */}
        <div className="products-grid">
          {products.map((product: Product, index: number) => {
            // Determinar qual ref usar baseado no nome do produto
            const getProductRef = (productName: string) => {
              switch (productName) {
                case 'Garrafa Stanley':
                  return garrafaRef || garrafaCardRef
                case 'Urso Pelúcia':
                  return ursopeluciaRef
                case 'Blusa Creme':
                  return blusaRef
                case 'Bolsa':
                  return bolsaRef
                case 'Maquiagem':
                  return maquiagemRef
                case 'Tênis':
                  return tenisRef
                case 'Boné':
                  return boneRef
                case 'Relógio':
                  return relogioRef
                case 'Câmera Card':
                  return cameraRef
                default:
                  return (el: HTMLDivElement | null) => { productRefs.current[index] = el; }
              }
            }

            return (
              <div
                key={product.id}
                ref={getProductRef(product.name)}
                className={`product-item ${getPositionClasses(product.position)}`}
              >
              <div className="product-card product-card-transparent">
                <img 
                  src={product.image} 
                  alt={product.alt} 
                  className="product-image"
                />
              </div>
              
              {/* Ícones especiais para alguns produtos - APENAS DESKTOP */}
              {product.name === 'Blusa Creme' && !isMobile && (
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
              
              {product.name === 'Óculos' && !isMobile && (
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
          )})}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection 