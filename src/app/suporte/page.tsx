'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackgroundCircles from '@/components/BackgroundCircles'
import MainLayout from '@/components/MainLayout'
import { MobileProvider } from '@/contexts/MobileContext'
import { CardRefsProvider } from '@/contexts/CardRefsContext'
import { useResponsive } from '@/hooks/useResponsive'

import type { NavItem, FooterSection } from '@/types'

// Dados de exemplo para a página de suporte
const navigationItems: NavItem[] = []

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

// Componente principal da página de suporte
function SuporteContent() {
  const { isMobile } = useResponsive()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="suporte-page">
      {/* Background Circles */}
      <BackgroundCircles />
      
      {/* Navigation */}
      <Navigation items={navigationItems} />
      
      {/* Conteúdo principal */}
      <MainLayout>
        <div className="suporte-container">
          <div className="suporte-content">
            <h1 className="suporte-title">
              Central de Suporte Lompa
            </h1>
            <div className="suporte-text">
              <p>
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
              
              <h2>Bem-vindo à Central de Ajuda e Suporte do Lompa</h2>
              <p>
                Aqui você encontra respostas rápidas e orientações para usar nossa plataforma com facilidade e segurança.
              </p>
              
              <h2>📲 O que é o Lompa?</h2>
              <p>
                O Lompa é um marketplace social de nova geração que conecta compradores e vendedores por meio de vídeos curtos e envolventes. É como se o e-commerce encontrasse as redes sociais - cada produto ganha vida em vídeo!
              </p>
              
              <h2>🛒 Como comprar um produto?</h2>
              <ul>
                <li>Navegue pelos vídeos postados por vendedores.</li>
                <li>Toque em um produto do seu interesse.</li>
                <li>Veja os detalhes e o preço.</li>
                <li>Clique em "Comprar agora" e siga as etapas de pagamento.</li>
                <li>Acompanhe seu pedido em tempo real no seu perfil.</li>
              </ul>
              
              <h2>🎥 Como vender no Lompa?</h2>
              <ul>
                <li>Crie uma conta de vendedor.</li>
                <li>Grave ou envie um vídeo curto apresentando seu produto.</li>
                <li>Adicione preço, categoria e detalhes de envio.</li>
                <li>Publique seu produto e comece a receber pedidos!</li>
                <li>Gerencie suas vendas e entregas pelo Painel do Vendedor.</li>
              </ul>
              
              <h2>🔒 É seguro comprar no Lompa?</h2>
              <p>
                Sim! Todos os pagamentos são processados com segurança através de parceiros confiáveis, e o Lompa oferece proteção ao comprador. Se o produto não chegar ou estiver diferente do anunciado, ajudamos você a obter reembolso.
              </p>
              
              <h2>🚚 Como funciona a entrega?</h2>
              <p>
                Trabalhamos com parceiros logísticos integrados (como os Correios no Brasil) para garantir envios rápidos e com rastreamento. Você pode acompanhar seu pedido diretamente pelo app.
              </p>
              
              <h2>❌ Como excluir ou desativar minha conta?</h2>
              <p>
                Para remover sua conta:
              </p>
              <ul>
                <li>Acesse a tela do Perfil.</li>
                <li>Toque no ícone de engrenagem no canto superior direito para abrir as Configurações.</li>
                <li>Selecione a opção "Desativar ou Remover Conta" e siga as instruções.</li>
                <li>Após a conclusão, sua conta será desativada ou removida permanentemente, conforme sua escolha.</li>
              </ul>
              
              <h2>📩 Precisa de ajuda?</h2>
              <p>
                Nosso time de suporte está pronto para te atender!
              </p>
              <ul>
                <li><strong>E-mail:</strong> support@lompa.com.br</li>
                <li><strong>WhatsApp:</strong> +55 11 93438-0061</li>
                <li>Ou fale conosco direto pelo app!</li>
              </ul>
              <p>
                Estamos aqui para te ajudar a aproveitar o melhor do Lompa.
              </p>
              <p>
                <strong>O futuro das compras já chegou - e ele é baseado em vídeos.</strong>
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
      
      {/* Footer */}
      <Footer sections={footerSections} />
    </div>
  )
}

// Componente principal da página
export default function SuportePage() {
  return (
    <MobileProvider>
      <CardRefsProvider>
        <SuporteContent />
      </CardRefsProvider>
    </MobileProvider>
  )
} 