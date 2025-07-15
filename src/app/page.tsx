import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LogoIcon from '@/components/LogoIcon'
import Logo from '@/components/Logo'
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
    <main className="min-h-screen" style={{ border: 'none', outline: 'none' }}>
      {/* Navigation */}
      <Navigation items={navigationItems} />
      
      {/* Título Centralizado */}
      <section className="flex justify-center pt-0 mt-24 lg:mt-28 relative">
        {/* Elemento invisível no centro para referência */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 opacity-0 pointer-events-none" style={{ top: 'calc(50% + 80px)' }}></div>
        
        {/* Card com imagem da garrafa à esquerda */}
        <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 380px)', top: 'calc(50% + 80px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-2 w-28 h-36 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img 
                src="/garrafa_card.png" 
                alt="Garrafa Stanley" 
                className="w-full h-full object-cover rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                }}
              />
              {/* Overlay sutil para melhorar a apresentação */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Card sobreposto à esquerda, posicionado acima */}
        <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-20" style={{ left: 'calc(50% - 420px)', top: 'calc(50% - 60px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-0 w-28 h-36 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img 
                src="/ursopelucia_icon.png" 
                alt="Urso Pelúcia" 
                className="w-full h-full object-contain rounded-2xl"
                style={{
                  background: '#ffffff'
                }}
              />
              {/* Overlay sutil para melhorar a apresentação */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
        
        {/* Card com imagem da blusa à direita */}
        <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 380px)', top: 'calc(50% + 80px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-2 w-28 h-36 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img 
                src="/blusa-creme.png" 
                alt="Suéter de malha creme" 
                className="w-full h-full object-cover rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                }}
              />
              {/* Overlay sutil para melhorar a apresentação */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Card sobreposto à direita, posicionado acima */}
        <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-20" style={{ left: 'calc(50% + 420px)', top: 'calc(50% - 60px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-2 w-28 h-36 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img 
                src="/bolsa_icon.png" 
                alt="Bolsa Icon" 
                className="w-full h-full object-contain rounded-xl"
                style={{
                  background: '#ffffff'
                }}
              />
              {/* Overlay sutil para melhorar a apresentação */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Novo card extremo à esquerda */}
        <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-5" style={{ left: 'calc(50% - 500px)', top: 'calc(50% + 180px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-2 w-28 h-36 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img 
                src="/oculos_icon.png" 
                alt="Óculos Icon" 
                className="w-full h-full object-contain rounded-xl"
                style={{
                  background: '#ffffff'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
        {/* Novo card extremo à direita */}
        <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 500px)', top: 'calc(50% + 180px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-2 w-28 h-36 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img 
                src="/maquiagem_icon.png" 
                alt="Maquiagem Icon" 
                className="w-full h-full object-contain rounded-xl"
                style={{
                  background: '#ffffff'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      {/* Novo card inferior esquerdo-central */}
      <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 260px)', top: 'calc(50% + 240px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-2 w-28 h-36 flex items-center justify-center">
          <div className="relative w-full h-full">
            <img 
              src="/tenis_icon.png" 
              alt="Tênis Icon" 
              className="w-full h-full object-contain rounded-xl"
              style={{ background: '#ffffff' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
      {/* Novo card inferior direito-central */}
      <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 260px)', top: 'calc(50% + 240px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-2 w-28 h-36 flex items-center justify-center">
          <div className="relative w-full h-full">
            <img 
              src="/bone_icon.png" 
              alt="Boné Icon" 
              className="w-full h-full object-contain rounded-xl"
              style={{ background: '#ffffff' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
        
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-8">
            <LogoIcon size="md" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[60px] font-bold text-white leading-tight mb-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
            O <span style={{ color: '#4807AD' }}>FUTURO</span> DAS VENDAS É SOCIAL, VISUAL E ACESSÍVEL. E ELE <span style={{ color: '#E321FF' }}>COMEÇA AQUI</span>
          </h1>
        </div>
      </section>
      
      {/* Seta de rolagem animada */}
      <div className="flex justify-center py-4">
        <div className="animate-bounce">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <path 
              d="M7 13L12 18L17 13" 
              stroke="url(#gradient)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4807AD" />
                <stop offset="100%" stopColor="#E321FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Retângulo tipo smartphone centralizado */}
      <div className="flex justify-center items-center py-12">
        <div
          className="rounded-[32px] border-2 bg-white/10 shadow-2xl w-[280px] h-[480px] sm:w-[320px] sm:h-[560px] md:w-[360px] md:h-[640px] lg:w-[380px] lg:h-[680px] transition-all duration-300 border-pink-transparent relative"
          style={{
            boxShadow: '0 0 32px 0 #4807AD, 0 0 64px 8px #E321FF55'
          }}
        >
          {/* Brilho animado no fundo */}
          <div className="absolute inset-0 rounded-[32px] pointer-events-none overflow-hidden z-0">
            <div className="w-full h-full animate-shimmer bg-gradient-to-r from-[#4807AD33] via-[#E321FF44] to-[#4807AD33] opacity-60" style={{backgroundSize: '200% 100%'}}></div>
          </div>
          {/* Selo 100% Brasileiro no topo */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
            <span className="bg-[#E321FF] text-white font-bold text-xs px-4 py-1 rounded-full shadow-lg tracking-wide border-2 border-white/30" style={{letterSpacing: 1}}>MARKETPLACE</span>
          </div>
          {/* Logo no topo centralizado */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
            <Logo size="lg" />
          </div>
          
          {/* Call to Action abaixo do logo */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
            <h2 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Um novo jeito de comprar e vender.
            </h2>
            <p className="text-white/90 leading-relaxed text-xl mb-20" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              O primeiro <span style={{ color: '#4807AD' }}>marketplace 100% brasileiro</span> feito para transformar como as pessoas compram e vendem no <span style={{ color: '#E321FF' }}>digital</span>
            </p>
            <div className="mt-4 flex justify-center">
              <button
                className="relative px-8 py-4 rounded-full text-base font-semibold text-white shadow-xl bg-gradient-to-r from-[#4807AD] via-[#7B2FF2] to-[#E321FF] transition-all duration-300 ease-out
                hover:from-[#7B2FF2] hover:to-[#E321FF] hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#E321FF66] group"
                style={{boxShadow: '0 4px 32px 0 #E321FF88, 0 2px 8px 0 #4807AD55'}}
              >
                <span className="relative z-10 tracking-wide drop-shadow-lg">BAIXAR AGORA</span>
                {/* Efeito de brilho ao hover */}
                <span className="absolute left-0 top-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{background: 'linear-gradient(90deg, #fff3 0%, #fff8 50%, #fff3 100%)', filter: 'blur(8px)'}}
                ></span>
              </button>
            </div>
            {/* Imagem dos botões de download Apple e Android */}
            <div className="mt-6 flex justify-center">
              <img src="/Apple_Android_Download.svg" alt="Download para Android e Apple" className="w-[120px] md:w-[140px] lg:w-[160px] h-auto" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Section - Placeholder */}
      <section id="pricing" className="py-20 bg-transparent">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Planos Flexíveis
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades e comece a crescer hoje mesmo.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <p className="text-white/80">Componente de Preços em desenvolvimento...</p>
          </div>
        </div>
      </section>
      
      {/* About Section - Placeholder */}
      <section id="about" className="py-20 bg-transparent">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Sobre a Lompa
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Somos uma empresa inovadora focada em criar soluções digitais que transformam negócios.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-white/80">Componente Sobre em desenvolvimento...</p>
          </div>
        </div>
      </section>
      
      {/* Contact Section - Placeholder */}
      <section id="contact" className="py-20 bg-transparent">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a alcançar seus objetivos digitais.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <p className="text-white/80">Componente de Contato em desenvolvimento...</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer sections={footerSections} />
    </main>
  )
} 