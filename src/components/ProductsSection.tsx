'use client'

import { useResponsive } from '../hooks/useResponsive'

interface Product {
  id: string
  name: string
  image: string
  alt: string
  position: 'left-top' | 'left-center' | 'left-bottom' | 'left-bottom-inner' | 'left-center-inner' | 'left-extra' | 'right-top' | 'right-center' | 'right-bottom' | 'right-bottom-inner' | 'right-extra'
}

const allProducts: Product[] = [
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
    id: '9',
    name: 'Câmera Card',
    image: '/cards_image/camera_card.png',
    alt: 'Câmera Card',
    position: 'left-extra'
  },
  {
    id: '10',
    name: 'Relógio',
    image: '/cards_image/relogio_card.png',
    alt: 'Relógio Card',
    position: 'right-extra'
  }
]

// Cards visíveis apenas na versão mobile
const mobileVisibleCards = [
  'Garrafa Stanley',
  'Bolsa',
  'Blusa Creme',
  'Câmera Card',
  'Boné',
  'Relógio'
]

const ProductsSection = () => {
  const { isMobile } = useResponsive()

  // Filtrar produtos baseado no dispositivo
  const products = isMobile 
    ? allProducts.filter(product => mobileVisibleCards.includes(product.name))
    : allProducts



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
      default:
        return 'top-0 left-0'
    }
  }

  return (
    <section className="products-section">
      <div className="products-container">
        {/* Grid de produtos posicionados em meias-luas */}
        <div className="products-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection 