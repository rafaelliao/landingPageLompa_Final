import Logo from './Logo'

export default function Header() {
  return (
    <header className="w-full flex justify-center pt-8 pb-4 px-4 md:px-0" style={{ border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}>
      <nav
        className="relative w-full max-w-7xl"
        aria-label="Barra de navegação principal"
        style={{ border: 'none', boxShadow: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
      >
        {/* Barra translúcida */}
        <div
          className="flex items-center justify-between h-[100px] px-8 md:px-12 bg-white/10 rounded-[30px_0px_30px_0px] backdrop-blur-md"
          style={{ boxSizing: 'border-box', border: 'none', boxShadow: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
        >
          {/* Logo */}
          <div className="flex items-center border-none">
            <Logo size="md" />
          </div>

          {/* Botão Read More */}
          <a
            href="#"
            className="flex items-center justify-center px-7 py-3 gap-2 bg-[#4807AD] text-white font-inter font-semibold text-base rounded-[18px_0px_18px_0px] shadow transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{ height: 52, minWidth: 136, border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif' }}
          >
            Read More
          </a>
        </div>
      </nav>
    </header>
  )
} 