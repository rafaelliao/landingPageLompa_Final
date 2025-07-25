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

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Lompa. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacidade" className="text-white/60 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-white/60 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="/cookies" className="text-white/60 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
          </div>
      </div>
    </footer>
  )
} 