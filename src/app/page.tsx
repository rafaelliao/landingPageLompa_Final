'use client'


import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackgroundCircles from '@/components/BackgroundCircles'
import MainLayout from '@/components/MainLayout'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import { MobileProvider } from '@/contexts/MobileContext'

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
  return (
    <MobileProvider>
      <main className="min-h-screen" style={{ border: 'none', outline: 'none' }}>
        {/* Círculos de fundo fixos - DESABILITADO PARA TESTE DE PERFORMANCE */}
        {/* <BackgroundCircles /> */}
        
        {/* Navigation */}
            <Navigation items={navigationItems} />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection features={featuresData} />
          
          {/* Pricing Section - Placeholder */}
          <section id="pricing" className="py-20">
            <div className="main-container text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Planos Flexíveis
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Escolha o plano ideal para suas necessidades e comece a crescer hoje mesmo.
              </p>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <p className="text-white/80 text-base">Componente de Preços em desenvolvimento...</p>
              </div>
            </div>
          </section>
          
          {/* About Section - Placeholder */}
          <section id="about" className="py-20 bg-white/5">
            <div className="main-container text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Sobre a Lompa
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Somos uma empresa inovadora focada em criar soluções digitais que transformam negócios.
              </p>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-white/80 text-base">Componente Sobre em desenvolvimento...</p>
              </div>
            </div>
          </section>
          
          {/* Contact Section - Placeholder */}
          <section id="contact" className="py-20">
            <div className="main-container text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Entre em Contato
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Estamos aqui para ajudar você a alcançar seus objetivos digitais.
              </p>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <p className="text-white/80 text-base">Componente de Contato em desenvolvimento...</p>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <Footer sections={footerSections} />
      </main>
    </MobileProvider>
  )
} 