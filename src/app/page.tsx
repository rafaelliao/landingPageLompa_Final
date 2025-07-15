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
      
      {/* Hero Section com Layout Responsivo */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Layout Desktop - Título Centralizado com Cards ao Redor */}
        <div className="hidden lg:block relative w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-center pt-0 mt-24 lg:mt-28 relative">
            {/* Elemento invisível no centro para referência */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 opacity-0 pointer-events-none" style={{ top: 'calc(50% + 80px)' }}></div>
            
            {/* Card com imagem da garrafa à esquerda */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 380px)', top: 'calc(50% + 80px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/garrafa_card.png" 
                  alt="Garrafa Stanley" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Card sobreposto à esquerda, posicionado acima */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-20" style={{ left: 'calc(50% - 420px)', top: 'calc(50% - 60px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/ursopelucia_icon.png" 
                  alt="Urso Pelúcia" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Card com imagem da blusa à direita */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 380px)', top: 'calc(50% + 80px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/blusa-creme.png" 
                  alt="Suéter de malha creme" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Card sobreposto à direita, posicionado acima */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-20" style={{ left: 'calc(50% + 420px)', top: 'calc(50% - 60px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/bolsa_icon.png" 
                  alt="Bolsa Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Card extremo à esquerda */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-5" style={{ left: 'calc(50% - 500px)', top: 'calc(50% + 180px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/oculos_icon.png" 
                  alt="Óculos Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Card extremo à direita */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 500px)', top: 'calc(50% + 180px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/maquiagem_icon.png" 
                  alt="Maquiagem Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Card inferior esquerdo-central */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-30" style={{ left: 'calc(50% - 260px)', top: 'calc(50% + 240px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/tenis_icon.png" 
                  alt="Tênis Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Card inferior direito-central */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-30" style={{ left: 'calc(50% + 260px)', top: 'calc(50% + 240px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/bone_icon.png" 
                  alt="Boné Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Novo Card extremo superior à esquerda */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-5" style={{ left: 'calc(50% - 600px)', top: 'calc(50% - 40px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/creme_icon.png" 
                  alt="Creme Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            {/* Novo Card extremo superior à direita */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 600px)', top: 'calc(50% - 40px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-2 w-[81px] h-[104px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/camera_icon.jpeg" 
                  alt="Camera Icon" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            {/* Título Centralizado */}
            <div className="text-center max-w-3xl mx-auto px-4">
              <div className="flex justify-center mb-8">
                <LogoIcon size="md" />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-[60px] font-bold text-white leading-tight mb-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                O <span style={{ color: '#4807AD' }}>FUTURO</span> DAS VENDAS É SOCIAL, VISUAL E ACESSÍVEL. E ELE <span style={{ color: '#E321FF' }}>COMEÇA AQUI</span>
              </h1>
            </div>
          </div>
        </div>
        
        {/* Layout Mobile - Cards ao Redor do Título Central */}
        <div className="lg:hidden relative w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-center pt-0 mt-16 relative">
            {/* Elemento invisível no centro para referência */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 opacity-0 pointer-events-none" style={{ top: 'calc(50% + 40px)' }}></div>
            
            {/* Card com imagem da garrafa à esquerda */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-10" style={{ left: 'calc(50% - 120px)', top: 'calc(50% + 40px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/garrafa_card.png" 
                  alt="Garrafa Stanley" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card sobreposto à esquerda, posicionado acima */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-20" style={{ left: 'calc(50% - 140px)', top: 'calc(50% - 30px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/ursopelucia_icon.png" 
                  alt="Urso Pelúcia" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card com imagem da blusa à direita */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-10" style={{ left: 'calc(50% + 120px)', top: 'calc(50% + 40px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/blusa-creme.png" 
                  alt="Suéter de malha creme" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card sobreposto à direita, posicionado acima */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-20" style={{ left: 'calc(50% + 140px)', top: 'calc(50% - 30px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/bolsa_icon.png" 
                  alt="Bolsa Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card extremo à esquerda */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-5" style={{ left: 'calc(50% - 180px)', top: 'calc(50% + 90px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/oculos_icon.png" 
                  alt="Óculos Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card extremo à direita */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-5" style={{ left: 'calc(50% + 180px)', top: 'calc(50% + 90px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/maquiagem_icon.png" 
                  alt="Maquiagem Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card inferior esquerdo-central */}
            <div className="absolute left-1/2 transform -translate-x-full -translate-y-1/2 z-30" style={{ left: 'calc(50% - 80px)', top: 'calc(50% + 120px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/tenis_icon.png" 
                  alt="Tênis Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Card inferior direito-central */}
            <div className="absolute left-1/2 transform translate-x-0 -translate-y-1/2 z-30" style={{ left: 'calc(50% + 80px)', top: 'calc(50% + 120px)' }}>
              <div className="bg-white rounded-2xl shadow-2xl p-1 w-[46px] h-[58px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/bone_icon.png" 
                  alt="Boné Icon" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            {/* Título Centralizado */}
            <div className="text-center max-w-3xl mx-auto px-4">
              <div className="flex justify-center mb-6">
                <LogoIcon size="md" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                O <span style={{ color: '#4807AD' }}>FUTURO</span> DAS VENDAS É SOCIAL, VISUAL E ACESSÍVEL. E ELE <span style={{ color: '#E321FF' }}>COMEÇA AQUI</span>
              </h1>
            </div>
          </div>
        </div>
        
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
        <div className="flex justify-center items-center py-8 lg:py-12 px-4 relative z-10">
          {/* Container do retângulo com badge */}
          <div className="relative">
            {/* Badge MARKETPLACE posicionado na borda superior */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-50">
              <span className="bg-[#E321FF] text-white font-bold text-xs px-4 py-1 rounded-full shadow-lg tracking-wide border-2 border-white/30" style={{letterSpacing: 1}}>MARKETPLACE</span>
            </div>
          
            <div
              className="rounded-[32px] border-2 bg-white/10 shadow-2xl w-[280px] h-[580px] sm:w-[320px] sm:h-[620px] md:w-[360px] md:h-[680px] lg:w-[380px] lg:h-[680px] transition-all duration-300 border-pink-transparent flex flex-col items-center justify-start px-4 pb-6 relative overflow-hidden"
            >
              {/* Brilho animado no fundo */}
              <div className="absolute left-0 top-0 w-full h-full rounded-[32px] pointer-events-none overflow-hidden z-0">
                <div className="w-full h-full animate-shimmer bg-gradient-to-r from-[#4807AD11] via-[#E321FF22] to-[#4807AD11] opacity-20" style={{backgroundSize: '200% 100%'}}></div>
              </div>
              
              {/* Logo no topo centralizado DENTRO do retângulo */}
              <div className="w-full flex justify-center pt-6 lg:pt-8 pb-3">
                <Logo size="lg" />
              </div>
              
              {/* Conteúdo do retângulo compactado no topo */}
              <div className="flex flex-col items-center w-full flex-1 justify-start px-2 pt-2">
                {/* Texto superior compactado */}
                <div className="flex flex-col items-center w-full flex-shrink-0">
                  <h2 className="text-white font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-center w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Um novo jeito de comprar e vender.
                  </h2>
                  <p className="text-white/90 leading-relaxed text-base sm:text-lg lg:text-xl mb-4 sm:mb-5 text-center w-full" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    O primeiro <span style={{ color: '#4807AD' }}>marketplace 100% brasileiro</span> feito para transformar como as pessoas compram e vendem no <span style={{ color: '#E321FF' }}>digital</span>
                  </p>
                </div>
                
                {/* Botões de Call to Action - Posicionados logo após o texto */}
                <div className="flex flex-col items-center w-full gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-6 flex-shrink-0">
                  <button
                    className="relative px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white shadow-xl bg-gradient-to-r from-[#4807AD] via-[#7B2FF2] to-[#E321FF] transition-all duration-300 ease-out
                    hover:from-[#7B2FF2] hover:to-[#E321FF] hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#E321FF66] group w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[220px]"
                    style={{boxShadow: '0 4px 32px 0 #E321FF88, 0 2px 8px 0 #4807AD55'}}
                  >
                    <span className="relative z-10 tracking-wide drop-shadow-lg">BAIXAR AGORA</span>
                    {/* Efeito de brilho ao hover */}
                    <span className="absolute left-0 top-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{background: 'linear-gradient(90deg, #fff3 0%, #fff8 50%, #fff3 100%)', filter: 'blur(8px)'}}>
                    </span>
                  </button>
                  
                  {/* QR Code centralizado */}
                  <div className="flex flex-col items-center gap-2 mt-2">
                    <div className="bg-white rounded-lg p-2 shadow-lg">
                      <svg 
                        width="60" 
                        height="60" 
                        viewBox="0 0 60 60" 
                        className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                      >
                        {/* QR Code pattern - versão simplificada */}
                        <rect width="60" height="60" fill="white"/>
                        <rect x="0" y="0" width="60" height="60" fill="black" opacity="0.1"/>
                        
                        {/* Padrão QR Code básico */}
                        <rect x="8" y="8" width="8" height="8" fill="black"/>
                        <rect x="20" y="8" width="8" height="8" fill="black"/>
                        <rect x="32" y="8" width="8" height="8" fill="black"/>
                        <rect x="44" y="8" width="8" height="8" fill="black"/>
                        
                        <rect x="8" y="20" width="8" height="8" fill="black"/>
                        <rect x="20" y="20" width="8" height="8" fill="white"/>
                        <rect x="32" y="20" width="8" height="8" fill="black"/>
                        <rect x="44" y="20" width="8" height="8" fill="white"/>
                        
                        <rect x="8" y="32" width="8" height="8" fill="black"/>
                        <rect x="20" y="32" width="8" height="8" fill="black"/>
                        <rect x="32" y="32" width="8" height="8" fill="white"/>
                        <rect x="44" y="32" width="8" height="8" fill="black"/>
                        
                        <rect x="8" y="44" width="8" height="8" fill="black"/>
                        <rect x="20" y="44" width="8" height="8" fill="white"/>
                        <rect x="32" y="44" width="8" height="8" fill="black"/>
                        <rect x="44" y="44" width="8" height="8" fill="black"/>
                        
                        {/* Padrão interno */}
                        <rect x="24" y="24" width="12" height="12" fill="black"/>
                        <rect x="26" y="26" width="8" height="8" fill="white"/>
                        <rect x="28" y="28" width="4" height="4" fill="black"/>
                      </svg>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm text-center font-medium">Escaneie para baixar</p>
                  </div>
                  
                  {/* Imagem dos botões de download Apple e Android */}
                  <img 
                    src="/Apple_Android_Download.svg" 
                    alt="Download para Android e Apple" 
                    className="w-[80px] sm:w-[90px] md:w-[100px] lg:w-[120px] h-auto mt-2" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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