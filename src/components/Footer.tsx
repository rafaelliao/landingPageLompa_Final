'use client'


import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from './Logo'
import type { FooterSection } from '@/types'

interface FooterProps {
  sections: FooterSection[]
  className?: string
}

export default function Footer({ sections, className }: FooterProps) {
  return (
    <footer className={cn('bg-black/20 backdrop-blur-sm border-t border-white/20 text-white', className)}>
      <div className="container-custom py-16 px-4 md:px-8">
        <div className="flex justify-center">
          {/* Brand Section */}
          <div className="text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-white/70 mb-6 leading-relaxed text-center text-justify">
              Lompa Marketplace é o primeiro marketplace social de vídeos curtos do Brasil. 
              Feito para conectar quem vende com quem compra, de forma simples, visual e acessível.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-3 text-white/70">
                <Mail className="w-4 h-4" />
                <span>contato@lompa.com.br</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/70">
                <Phone className="w-4 h-4" />
                <span>(11) 93438-0061</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
          {/* Facebook */}
          <a 
            href="https://facebook.com/lompa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div style={{
              width: 48,
              height: 48,
              background: '#fff',
              borderRadius: '12px 0 12px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}
            className="group-hover:scale-105 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#5C2D91">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </div>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/company/lompa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div style={{
              width: 48,
              height: 48,
              background: '#E321FF',
              borderRadius: '12px 0 12px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(227, 33, 255, 0.3)'
            }}
            className="group-hover:scale-105 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
          </a>

          {/* Twitter */}
          <a 
            href="https://twitter.com/lompa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div style={{
              width: 48,
              height: 48,
              background: '#fff',
              borderRadius: '12px 0 12px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}
            className="group-hover:scale-105 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#5C2D91">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 4c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/lompa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div style={{
              width: 48,
              height: 48,
              background: '#fff',
              borderRadius: '12px 0 12px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}
            className="group-hover:scale-105 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#5C2D91">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
                <circle cx="17.5" cy="6.5" r="1" fill="white"/>
              </svg>
            </div>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center">
              <p className="text-white/60 text-sm">
                © 2024 Lompa. Todos os direitos reservados.
              </p>
              <p className="text-white/60 text-sm mt-1">
                CNPJ: 57.632.888/0001-00
              </p>
            </div>
            <div className="flex items-center space-x-3 md:space-x-6 text-sm">
              <a href="/politica-privacidade" className="text-white/60 hover:text-white transition-colors text-xs md:text-sm">
                Política de Privacidade
              </a>
              <a href="/termos-servico" className="text-white/60 hover:text-white transition-colors text-xs md:text-sm">
                Termos de Serviço
              </a>
              <a href="/cookies" className="text-white/60 hover:text-white transition-colors text-xs md:text-sm">
                Cookies
              </a>
            </div>
          </div>
          </div>
      </div>
    </footer>
  )
} 