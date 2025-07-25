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
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="md" />
            </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
              Transformando ideias em experiências digitais incríveis. 
              Criamos soluções inovadoras que impulsionam seu negócio.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <Mail className="w-4 h-4" />
                <span>contato@lompa.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone className="w-4 h-4" />
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 flex items-center space-x-1 group"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      <span>{link.label}</span>
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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