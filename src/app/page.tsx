'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

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

// Componente funcional para o carousel automático
function AboutCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % 2;
      if (carouselRef.current && cardRefs[index].current) {
        const container = carouselRef.current;
        const card = cardRefs[index].current;
        if (card) {
          container.scrollTo({
            left: card.offsetLeft - container.offsetLeft,
            behavior: 'smooth',
          });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      ref={carouselRef}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        overflowX: 'auto',
        padding: '0 16px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        margin: '0 -16px',
        width: '100vw',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        scrollBehavior: 'smooth',
        touchAction: 'pan-x',
      }}
    >
      {/* Card Lompa */}
      <div
        ref={cardRefs[1]}
        style={{
          background: 'linear-gradient(135deg, #7B2FF2 0%, #F357A8 100%)',
          borderRadius: '32px 0px 32px 0px', // Removido arredondamento superior direito e inferior esquerdo
          minWidth: 320,
          maxWidth: 360,
          width: '80vw',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          scrollSnapAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 32 }}>
          <img src="/logo.svg" alt="Lompa Logo" style={{ height: 32 }} />
        </div>
        <ul style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16, color: '#fff', listStyle: 'none', padding: 0, margin: 0 }}>
          <li>✓ Feed de vídeos curtos</li>
          <li>✓ Cadastro sem CNPJ</li>
          <li>✓ Pagamento direto no app</li>
          <li>✓ Taxas acessíveis</li>
          <li>✓ Foco em pequenos vendedores</li>
          <li>✓ Suporte via WhatsApp</li>
          <li>✓ App leve e 100% mobile</li>
          <li>✓ Inclusão digital real</li>
        </ul>
      </div>
      {/* Card Outros Marketplaces */}
      <div
        ref={cardRefs[0]}
        style={{
          background: '#fff',
          borderRadius: '32px 0px 32px 0px', // Removido arredondamento superior direito e inferior esquerdo
          minWidth: 320,
          maxWidth: 360,
          width: '80vw',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          scrollSnapAlign: 'center',
        }}
      >
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, color: '#1A1447', marginBottom: 16, textAlign: 'center', width: '100%' }}>
          Outros<br />Marketplaces
        </div>
        <ul style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16, color: '#1A1447', listStyle: 'none', padding: 0, margin: 0 }}>
          <li>✗ Feed de vídeos curtos</li>
          <li>✗ Cadastro sem CNPJ</li>
          <li>✗ Pagamento direto no app</li>
          <li>✗ Taxas acessíveis</li>
          <li>✗ Foco em pequenos vendedores</li>
          <li>✗ Suporte via WhatsApp</li>
          <li>✗ App leve e 100% mobile</li>
          <li>✗ Inclusão digital real</li>
        </ul>
      </div>
    </div>
  );
}

function HomePageContent() {
  const { isMobile } = useResponsive()
  const [accordion, setAccordion] = useState([true, false, false]);

  // Função para detectar plataforma mobile
  const detectMobilePlatform = () => {
    if (typeof window === 'undefined') return 'unknown';
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    if (/android/.test(userAgent)) {
      return 'android';
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      return 'ios';
    }
    
    return 'unknown';
  };

  // Função para obter o link de download correto
  const getDownloadLink = () => {
    const platform = detectMobilePlatform();
    
    if (platform === 'android') {
      return 'https://play.google.com/store/apps/details?id=com.app.lompamarketplace';
    } else if (platform === 'ios') {
      return 'https://apps.apple.com/in/app/lompa/id6742741600';
    }
    
    // Fallback para desktop ou plataforma desconhecida
    return 'https://lompa.com.br/download';
  };

  const handleDownloadClick = () => {
    const downloadLink = getDownloadLink();
    window.open(downloadLink, '_blank');
  };
  
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
          <section id="cards_central" className={`py-6${isMobile ? ' pb-16 pt-40' : ''}`} style={{ position: isMobile ? 'relative' : undefined }}>
              {isMobile && (
                <>
                  {/* Ícones sobrepostos - dentro da section cards_central */}
                  <img
                    src="/bolsa_icon.png"
                    alt="Bolsa Icon"
                    style={{
                      position: 'absolute',
                      top: 'calc(120px + 15px)', // movido mais 15px para cima
                      right: 'calc(50vw - 125px)',
                      width: '70px',
                      zIndex: 9999,
                      borderRadius: '22px',
                      pointerEvents: 'none',
                    }}
                  />
                  <img
                    src="/coracao_icon.png"
                    alt="Coração Icon"
                    style={{
                      position: 'absolute',
                      left: 'calc(50vw - 155px)', // movido 15px para a esquerda
                      top: 'calc(120px + 340px)',
                      width: '64px', // tamanho aumentado
                      height: '64px', // tamanho aumentado
                      zIndex: 9998,
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Ícones sobrepostos para o segundo card central */}
                  <img
                    src="/blusa_icon.png"
                    alt="Blusa Icon"
                    style={{
                      position: 'absolute',
                      top: 'calc(120px + 495px)', // movido um pouco para baixo
                      left: 'calc(50vw - 135px)', // movido um pouco para a esquerda
                      width: 70,
                      zIndex: 9999,
                      filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.18))',
                      pointerEvents: 'none',
                    }}
                  />
                  <img
                    src="/lego_icon.png"
                    alt="Lego Icon"
                    style={{
                      position: 'absolute',
                      top: 'calc(120px + 750px)', // movido 250px para baixo
                      right: 'calc(50vw - 155px)', // movido mais 15px para a direita
                      width: 60,
                      zIndex: 9999,
                      filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.18))',
                      pointerEvents: 'none',
                    }}
                  />
                </>
              )}
             {isMobile ? (
               <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, minHeight: 950, position: 'relative' }}>
                 {/* Novo card (acima) */}
                 <div style={{
                   width: 249,
                   maxWidth: '81vw',
                   height: 450,
                   background: '#fff',
                   borderRadius: 32,
                   border: '1px solid rgba(255,255,255,0.2)',
                   boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                   margin: '0 auto',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   backdropFilter: 'blur(10px)',
                   position: 'relative',
                 }}>
                   {/* Div superior para a imagem bolsa_card_central */}
                   <div style={{ width: '100%', height: 160, position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', overflow: 'hidden', borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
                     <img
                       src="/bolsa_card_central.png"
                       alt="Bolsa Card Central"
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         borderTopLeftRadius: 32,
                         borderTopRightRadius: 32,
                         filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.18))',
                         pointerEvents: 'none',
                       }}
                     />
                   </div>
                   {/* Conteúdo do card */}
                   <div style={{ width: '100%', padding: '19.2px 19.2px 12.8px 19.2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     {/* Ícone check */}
                     <div style={{ width: 18, height: 18, borderRadius: 9, background: '#E321FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12.8 }}>
                       <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E321FF"/><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                     <div style={{ color: '#6C1EB1', fontFamily: 'Inter', fontWeight: 600, fontSize: 14, textAlign: 'center', marginBottom: 6.4 }}>Você vê o produto de<br />verdade, na mão de quem está vendendo.<br /></div>
                     <div style={{ color: '#6C1EB1', fontFamily: 'Inter', fontWeight: 400, fontSize: 11, textAlign: 'center', marginBottom: 12.8, lineHeight: '16px' }}>
                       <span style={{ fontWeight: 700, color: '#6C1EB1' }}>É FÁCIL, VISUAL E DIRETO!</span><br />
                       Toque para comprar, pague com<br />segurança e receba em casa.
                     </div>
                     <button 
                       onClick={handleDownloadClick}
                       style={{ background: '#442085', color: '#FBF7FF', fontFamily: 'Inter', fontWeight: 600, fontSize: 12.8, border: 'none', borderRadius: 12.8, padding: '14.4px 0', width: '100%', marginTop: 3.2, boxShadow: '0 2px 8px rgba(68,32,133,0.08)', cursor: 'pointer' }}
                     >
                       Quero comprar com segurança
                     </button>
                   </div>
                 </div>
                 {/* Card anterior (abaixo) */}
                 <div style={{
                   width: 249,
                   maxWidth: '81vw',
                   height: 450,
                   background: '#fff',
                   borderRadius: 32,
                   border: '1px solid rgba(255,255,255,0.2)',
                   boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                   overflow: 'hidden',
                   margin: '0 auto',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   backdropFilter: 'blur(10px)',
                   position: 'relative',
                 }}>
                   {/* Div superior para os ícones blusa_icon e lego_icon */}
                   {/* Espaço reservado removido, não há div para ícones, apenas na section */}
                   {/* Imagem de topo */}
                   <div style={{ width: '100%', height: 149, position: 'relative', overflow: 'hidden' }}>
                     <img src="/user_card_central.png" alt="Usuário Card Central" style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 32, borderTopRightRadius: 32 }} />
                     <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 80%)' }} />
                     <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 19 }}>
                       <span style={{ color: '#E321FF', fontFamily: 'Outfit', fontWeight: 500, fontSize: 13, marginBottom: 6, background: 'rgba(255,255,255,0.7)', padding: '4px 8px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Para quem vende</span>
                       <span style={{ color: '#fff', fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, textAlign: 'center', lineHeight: 1.2 }}>Crie sua loja, grave um vídeo<br />e comece a vender</span>
                     </div>
                   </div>
                   {/* Card branco */}
                   <div style={{ width: '100%', padding: '19.2px 19.2px 12.8px 19.2px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     {/* Ícone check */}
                     <div style={{ width: 18, height: 18, borderRadius: 9, background: '#E321FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12.8 }}>
                       <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E321FF"/><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                     <div style={{ color: '#5901B0', fontFamily: 'Inter', fontWeight: 600, fontSize: 14, textAlign: 'center', marginBottom: 6.4 }}>Você só precisa do seu celular</div>
                     <div style={{ color: '#5901B0', fontFamily: 'Inter', fontWeight: 400, fontSize: 11, textAlign: 'center', marginBottom: 12.8, lineHeight: '16px' }}>
                       Grave um vídeo mostrando seu<br />produto, publique no app e comece a vender com pagamento seguro e envio pelos Correios.<br /><br />
                       <span style={{ fontWeight: 700 }}>SEM COMPLICAÇÃO.<br />100% MOBILE. SEM ENROLAÇÃO.</span>
                     </div>
                     <button 
                       onClick={handleDownloadClick}
                       style={{ background: '#442085', color: '#FBF7FF', fontFamily: 'Inter', fontWeight: 600, fontSize: 12.8, border: 'none', borderRadius: 12.8, padding: '14.4px 0', width: '100%', marginTop: 3.2, boxShadow: '0 2px 8px rgba(68,32,133,0.08)', cursor: 'pointer' }}
                     >
                       Quero começar a vender agora
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
          
          {/* Seção "Quem pode usar o Lompa" - Apenas Mobile */}
          {isMobile && (
            <section className="pt-4 pb-16">
              <div style={{ padding: '60px 20px 40px 20px', textAlign: 'center' }}>
                <div style={{ color: '#E321FF', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 14, marginBottom: 8 }}>
                  Quem pode usar o Lompa
                </div>
                <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, marginBottom: 12, lineHeight: 1.3 }}>
                  Venda do seu jeito!
                </h2>
                <p style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, marginBottom: 32, lineHeight: 1.5, opacity: 0.9 }}>
                  Com o Lompa, você vende online, alcança novos clientes e gerencia tudo em um só lugar.
                </p>
                
                {/* Accordion 1 - Comprador digital */}
                <div style={{ background: '#F5F5F5', borderRadius: 16, marginBottom: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                  <div
                    style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setAccordion([!accordion[0], false, false])}
                  >
                    <span style={{ color: '#5901B0', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16 }}>Comprador digital</span>
                    {accordion[0] ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <div
                    style={{
                      padding: accordion[0] ? '0 20px 20px 20px' : '0 20px',
                      color: '#333',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 1.6,
                      maxHeight: accordion[0] ? 500 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s',
                      opacity: accordion[0] ? 1 : 0,
                      transitionProperty: 'max-height, opacity, padding',
                      transitionDuration: '0.4s, 0.3s, 0.3s',
                    }}
                  >
                    Compre vendo o produto em vídeo — ao vivo ou gravado. Pagamento seguro via gateway próprio e envio pelos Correios com rastreio. E o melhor: se algo der errado, estamos aqui para mediar e garantir sua satisfação.
                  </div>
                </div>
                
                {/* Accordion 2 - Criador independente ou revendedor */}
                <div style={{ background: '#F5F5F5', borderRadius: 16, marginBottom: 16, border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div
                    style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setAccordion([false, !accordion[1], false])}
                  >
                    <span style={{ color: '#5901B0', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16 }}>Criador independente ou revendedor</span>
                    {accordion[1] ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <div
                    style={{
                      padding: accordion[1] ? '0 20px 20px 20px' : '0 20px',
                      color: '#333',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 1.6,
                      maxHeight: accordion[1] ? 500 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s',
                      opacity: accordion[1] ? 1 : 0,
                      transitionProperty: 'max-height, opacity, padding',
                      transitionDuration: '0.4s, 0.3s, 0.3s',
                    }}
                  >
                    Venda como criador de conteúdo, influenciador, revendedor ou pequeno empreendedor. Mostre seu produto em vídeo, negocie direto com o cliente e receba pagamentos de forma segura.
                  </div>
                </div>
                
                {/* Accordion 3 - Loja física */}
                <div style={{ background: '#F5F5F5', borderRadius: 16, marginBottom: 16, border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <div
                    style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setAccordion([false, false, !accordion[2]])}
                  >
                    <span style={{ color: '#5901B0', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16 }}>Loja física</span>
                    {accordion[2] ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <div
                    style={{
                      padding: accordion[2] ? '0 20px 20px 20px' : '0 20px',
                      color: '#333',
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 1.6,
                      maxHeight: accordion[2] ? 500 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s',
                      opacity: accordion[2] ? 1 : 0,
                      transitionProperty: 'max-height, opacity, padding',
                      transitionDuration: '0.4s, 0.3s, 0.3s',
                    }}
                  >
                    Traga sua loja física para o digital! Alcance novos públicos, mostre seus produtos em vídeo e aumente suas vendas com a credibilidade do Lompa.
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* About Section - Comparativo Marketplace com Carousel Automático */}
          <section id="about" className="py-20">
            <div className="main-container text-center">
              <div style={{ color: '#E321FF', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                Por que o Lompa é diferente?
              </div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 36, color: '#fff', marginBottom: 8, lineHeight: 1.1 }}>
                Não é só mais um marketplace
              </h2>
              <div style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, opacity: 0.8, marginBottom: 40 }}>
                É a vitrine digital do Brasil real, com vídeo, voz e confiança.
              </div>
              <AboutCarousel />
            </div>
          </section>
          
                     {/* Contact Section - Placeholder */}
           <section id="contact" className={`${isMobile ? 'relative h-[80vh] overflow-hidden' : 'py-20'}`}>
            {isMobile ? (
              <>
                <div 
                   className="w-full h-full bg-cover"
                    style={{ 
                      backgroundImage: 'url(/mockup_multi2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: '55% center',
                      backgroundRepeat: 'no-repeat',
                      opacity: 0.8,
                      height: '100%',
                      width: '100%'
                    }}
                />
                                 {/* Conteúdo sobreposto à imagem - Apenas Mobile */}
                 <div style={{position: 'absolute', top: 0, left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, paddingTop: 24}}>
                   <div style={{background: 'rgba(44, 0, 80, 0.85)', borderRadius: 20, padding: '28px 20px', maxWidth: 320, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.3)'}}>
                     <h2 style={{fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, color: '#fff', marginBottom: 10, lineHeight: 1.1, textAlign: 'left'}}>
                       Venda em vídeo,<br />do seu jeito
                     </h2>
                     <p style={{color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, opacity: 0.9, marginBottom: 20, lineHeight: 1.5, textAlign: 'justify'}}>
                       Com o Lompa, você grava ou transmite ao vivo,<br />se conecta com clientes em tempo real e transforma cada venda em uma experiência. Tudo isso com<br />pagamento seguro, envio rastreável e gestão simplificada.
                     </p>
                     <button 
                       onClick={handleDownloadClick}
                       style={{background: '#E321FF', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, border: 'none', borderRadius: 10, padding: '12px 20px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(227, 33, 255, 0.3)', width: '100%'}}
                     >
                       Quero saber mais
                     </button>
                   </div>
                 </div>
              </>
            ) : (
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
            )}
          </section>
          
          {/* Curta e Compartilhe Section - Carousel Lateral */}
          {isMobile && (
            <section className="py-16">
              <div style={{ padding: '0 2px' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ color: '#E321FF', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: 14, marginBottom: 8 }}>
                    Aplicativo
                  </div>
                  <h2 style={{ color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 24, lineHeight: 1.2 }}>
                    Sua jornada no Lompa começa aqui
                  </h2>
                </div>
                
                {/* Carousel Container */}
                <div style={{ 
                  overflowX: 'auto', 
                  overflowY: 'hidden',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  width: '100%',
                  cursor: 'grab',
                  userSelect: 'none',
                  touchAction: 'pan-x'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: 8, 
                    paddingLeft: '16px',
                    paddingRight: '32px'
                  }}>
                    {/* Card 1 - Poste com vídeo */}
                    <div style={{
                      minWidth: 240,
                      maxWidth: 240,
                      height: 400,
                      background: '#fff',
                      borderRadius: '20px 0 20px 0',
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      {/* Seção superior - 60% da altura */}
                      <div style={{
                        height: '60%',
                        width: '100%',
                        backgroundImage: 'url(/card1_final.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>

                      </div>
                      
                      {/* Ícone central na divisão */}
                      <div style={{
                        position: 'absolute',
                        top: '60%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 50,
                        height: 50,
                        background: '#E321FF',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        zIndex: 10
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="white"/>
                        </svg>
                      </div>
                      
                      {/* Seção inferior - 40% da altura */}
                      <div style={{ 
                        height: '40%',
                        width: '100%',
                        background: '#fff',
                        padding: '30px 10px 20px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <h3 style={{
                          color: '#333',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 700,
                          fontSize: 12,
                          marginBottom: 6,
                          textAlign: 'center'
                        }}>
                          Poste com vídeo
                        </h3>
                        <p style={{
                          color: '#666',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: 10,
                          lineHeight: 1.3,
                          textAlign: 'center'
                        }}>
                          Grave com seu celular, publique no feed e deixe o vídeo vender por você.
                        </p>
                      </div>
                    </div>
                    
                    {/* Card 2 - Venda com segurança */}
                    <div style={{
                      minWidth: 240,
                      maxWidth: 240,
                      height: 400,
                      background: '#fff',
                      borderRadius: '20px 0 20px 0',
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      {/* Seção superior - 60% da altura */}
                      <div style={{
                        height: '60%',
                        width: '100%',
                        backgroundImage: 'url(/card2_final.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      </div>
                      
                      {/* Ícone central na divisão */}
                      <div style={{
                        position: 'absolute',
                        top: '60%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 50,
                        height: 50,
                        background: '#E321FF',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        zIndex: 10
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M7 13V17C7 18.1 7.9 19 9 19H17C18.1 19 19 18.1 19 17V13H7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      {/* Seção inferior - 40% da altura */}
                      <div style={{ 
                        height: '40%',
                        width: '100%',
                        background: '#fff',
                        padding: '30px 15px 20px 15px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <h3 style={{
                          color: '#333',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: 6,
                          textAlign: 'center'
                        }}>
                          Venda com segurança
                        </h3>
                        <p style={{
                          color: '#666',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: 11,
                          lineHeight: 1.3,
                          textAlign: 'center'
                        }}>
                          Receba os pagamentos no app e envie pelos Correios com etiqueta automática.
                        </p>
                      </div>
                    </div>
                    
                    {/* Card 3 - Veja, curta, compre */}
                    <div style={{
                      minWidth: 240,
                      maxWidth: 240,
                      height: 400,
                      background: '#fff',
                      borderRadius: '20px 0 20px 0',
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      {/* Seção superior - 60% da altura */}
                      <div style={{
                        height: '60%',
                        width: '100%',
                        backgroundImage: 'url(/card3_final.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      </div>
                      
                      {/* Ícone central na divisão */}
                      <div style={{
                        position: 'absolute',
                        top: '60%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 50,
                        height: 50,
                        background: '#E321FF',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        zIndex: 10
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M17 8L21 12L17 16M7 8L3 12L7 16M14 4L10 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      {/* Seção inferior - 40% da altura */}
                      <div style={{ 
                        height: '40%',
                        width: '100%',
                        background: '#fff',
                        padding: '30px 15px 20px 15px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <h3 style={{
                          color: '#333',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: 6,
                          textAlign: 'center'
                        }}>
                          Veja, curta, compre
                        </h3>
                        <p style={{
                          color: '#666',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: 11,
                          lineHeight: 1.3,
                          textAlign: 'center'
                        }}>
                          Compre o que curtir. Direto, visual e confiável.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          
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