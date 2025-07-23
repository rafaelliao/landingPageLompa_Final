'use client'

import { useRef } from 'react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackgroundCircles from '@/components/BackgroundCircles'
import MainLayout from '@/components/MainLayout'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import { MobileProvider } from '@/contexts/MobileContext'
import { CardRefsProvider } from '@/contexts/CardRefsContext'
import { useResponsive } from '@/hooks/useResponsive'

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

function HomePageContent() {
  const { isMobile } = useResponsive()
  
  return (
    <MobileProvider>
      <main className="min-h-screen" style={{ border: 'none', outline: 'none' }}>
        {/* Círculos de fundo fixos - DESABILITADO PARA TESTE DE PERFORMANCE */}
        {/* <BackgroundCircles /> */}
        
          {/* Navigation */}
            <Navigation items={navigationItems} />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section - Apenas Desktop */}
        {!isMobile && <FeaturesSection features={featuresData} />}
          
          {/* Pricing Section - Placeholder */}
          <section id="pricing" className="py-20">
             {isMobile ? (
               <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, minHeight: 1200 }}>
                 {/* Novo card (acima) */}
                 <div style={{
                   width: 320,
                   maxWidth: '90vw',
                   background: '#fff',
                   borderRadius: 32,
                   boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
                   overflow: 'hidden',
                   margin: '0 auto',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                 }}>
                   {/* Imagem de topo (placeholder) */}
                   <div style={{ width: '100%', height: 210, position: 'relative', overflow: 'hidden' }}>
                     <img src="/bolsa_card_central.png" alt="Bolsa Card Central" style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 32, borderTopRightRadius: 32 }} />
                     <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 80%)' }} />
                     <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 19 }}>
                       <span style={{ color: '#E321FF', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 13, marginBottom: 6 }}>Descubra como comprar</span>
                       <span style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 17.6, textAlign: 'center', lineHeight: 1.2 }}>Veja vídeos de produtos<br />reais e compre com mais<br />confiança</span>
                     </div>
                   </div>
                   {/* Card branco */}
                   <div style={{ width: '100%', padding: '25.6px 19.2px 19.2px 19.2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     {/* Ícone check */}
                     <div style={{ width: 32, height: 32, borderRadius: 16, background: '#E321FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12.8 }}>
                       <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E321FF"/><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                     <div style={{ color: '#6C1EB1', fontFamily: 'Inter', fontWeight: 600, fontSize: 16, textAlign: 'center', marginBottom: 6.4 }}>No Lompa, você vê o produto de verdade, na mão de quem está vendendo.</div>
                     <div style={{ color: '#6C1EB1', fontFamily: 'Inter', fontWeight: 400, fontSize: 12, textAlign: 'center', marginBottom: 12.8, lineHeight: '17.6px' }}>
                       <span style={{ fontWeight: 700, color: '#6C1EB1' }}>É FÁCIL, VISUAL E DIRETO!</span><br />
                       Toque para comprar, pague com segurança<br />e receba em casa.
                     </div>
                     <button style={{ background: '#442085', color: '#FBF7FF', fontFamily: 'Inter', fontWeight: 600, fontSize: 12.8, border: 'none', borderRadius: 12.8, padding: '14.4px 0', width: '100%', marginTop: 6.4, boxShadow: '0 2px 8px rgba(68,32,133,0.08)', cursor: 'pointer' }}>
                       Quero comprar om segurança
                     </button>
                   </div>
                 </div>
                 {/* Card anterior (abaixo) */}
                 <div style={{
                   width: 320,
                   maxWidth: '90vw',
                   background: '#fff',
                   borderRadius: 32,
                   boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
                   overflow: 'hidden',
                   margin: '0 auto',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                 }}>
                   {/* Imagem de topo */}
                   <div style={{ width: '100%', height: 210, background: '#eee', position: 'relative', overflow: 'hidden' }}>
                     <img src="/user_card_central.png" alt="Usuário Card Central" style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 32, borderTopRightRadius: 32 }} />
                     <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 80%)' }} />
                     <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 19 }}>
                       <span style={{ color: '#E321FF', fontFamily: 'Outfit', fontWeight: 500, fontSize: 13, marginBottom: 6 }}>Para quem vende</span>
                       <span style={{ color: '#fff', fontFamily: 'Outfit', fontWeight: 700, fontSize: 17.6, textAlign: 'center', lineHeight: 1.2 }}>Crie sua loja, grave um vídeo<br />e comece a vender</span>
                     </div>
                   </div>
                   {/* Card branco */}
                   <div style={{ width: '100%', padding: '25.6px 19.2px 19.2px 19.2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     {/* Ícone check */}
                     <div style={{ width: 32, height: 32, borderRadius: 16, background: '#E321FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12.8 }}>
                       <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E321FF"/><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                     <div style={{ color: '#5901B0', fontFamily: 'Inter', fontWeight: 600, fontSize: 16, textAlign: 'center', marginBottom: 6.4 }}>Você só precisa do seu celular</div>
                     <div style={{ color: '#5901B0', fontFamily: 'Inter', fontWeight: 400, fontSize: 12, textAlign: 'center', marginBottom: 12.8, lineHeight: '17.6px' }}>
                       Grave um vídeo mostrando seu produto, publique no app e comece a vender com pagamento seguro e envio pelos Correios.<br />
                       <span style={{ fontWeight: 700 }}>SEM COMPLICAÇÃO.<br />100% MOBILE. SEM ENROLAÇÃO.</span>
                     </div>
                     <button style={{ background: '#442085', color: '#FBF7FF', fontFamily: 'Inter', fontWeight: 600, fontSize: 12.8, border: 'none', borderRadius: 12.8, padding: '14.4px 0', width: '100%', marginTop: 6.4, boxShadow: '0 2px 8px rgba(68,32,133,0.08)', cursor: 'pointer' }}>
                       Quero começar a faturar agora
                     </button>
                   </div>
                 </div>
               </div>
             ) : (
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
            )}
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

export default function HomePage() {
  return (
    <CardRefsProvider>
      <HomePageContent />
    </CardRefsProvider>
  )
} 