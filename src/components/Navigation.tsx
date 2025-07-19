'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, HeadphonesIcon, Phone, Mail, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from './Logo'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'
import type { NavItem } from '@/types'

interface NavigationProps {
  items: NavItem[]
  className?: string
}

export default function Navigation({ items, className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isVisible, isScrolling } = useNavbarScroll()

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isOpen && !target.closest('.mobile-menu')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const mobileItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  }

  return (
    <>
      {/* Navbar Principal */}
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 px-4',
          isVisible ? 'navbar-visible' : 'navbar-hidden',
          className
        )}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.div
          className={cn(
            'flex items-center justify-between px-4 py-3 transition-all duration-300 max-w-7xl mx-auto navbar-custom-rounded mt-4',
            isScrolling 
              ? 'bg-white/20 backdrop-blur-md shadow-lg border border-white/20' 
              : 'bg-white/10 backdrop-blur-sm border border-white/10'
          )}
          variants={itemVariants}
        >
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Logo size="md" />
          </motion.div>

          {/* Desktop Navigation */}
          {items.length > 0 && (
            <motion.div
              className="hidden lg:flex items-center space-x-8"
              variants={itemVariants}
            >
              {items.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'text-white/80 hover:text-white transition-colors duration-200 font-medium relative group',
                    item.external && 'flex items-center space-x-1'
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                  {item.external && <ChevronDown className="w-4 h-4" />}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Desktop CTA Buttons */}
          <motion.div
            className="hidden lg:flex items-center space-x-4"
            variants={itemVariants}
          >
            <motion.button
              className="group support-button flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/30 text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Abrindo suporte...')
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 button-custom-rounded"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-white font-semibold text-sm">Suporte</span>
              </motion.div>
              <motion.div
                className="relative z-10 transition-transform duration-300 group-hover:opacity-0"
              >
                <HeadphonesIcon className="w-4 h-4" />
              </motion.div>
            </motion.button>
            <motion.button
              className="flex items-center justify-center px-6 py-3 button-custom-rounded text-white transition-all duration-200 font-semibold"
              style={{ 
                background: 'linear-gradient(135deg, #4807AD 0%, #E321FF 100%)',
                boxShadow: '0 4px 15px rgba(72, 7, 173, 0.3)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log('Abrindo acesso vendedor...')
              }}
            >
              Acesso Vendedor
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-200 text-white mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            style={{ 
              backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              animate={isOpen ? 'open' : 'closed'}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu Expanded */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-[9999] lg:hidden mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div
                className="bg-white/20 backdrop-blur-md border-b border-white/20 navbar-custom-rounded"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Header do Menu */}
                <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
                  <Logo size="sm" />
                  <motion.button
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white"
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Links de Navegação */}
                <div className="px-4 pb-4">
                  <motion.div
                    className="space-y-2"
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate="open"
                  >
                    {items.map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-3 px-4 rounded-xl hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                        variants={mobileItemVariants}
                        whileTap={{ scale: 0.95 }}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </motion.div>

                  {/* Botões de Ação */}
                  <motion.div
                    className="flex flex-col space-y-3 mt-8"
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate="open"
                  >
                    <motion.button
                      className="flex items-center justify-center w-full py-3 button-custom-rounded text-white transition-all duration-200 font-semibold"
                      style={{ 
                        background: 'linear-gradient(135deg, #4807AD 0%, #E321FF 100%)',
                        boxShadow: '0 4px 15px rgba(72, 7, 173, 0.3)'
                      }}
                      variants={mobileItemVariants}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsOpen(false)
                        console.log('Abrindo acesso vendedor...')
                      }}
                    >
                      Acesso Vendedor
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center justify-center w-full py-3 button-custom-rounded border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all duration-200 font-semibold"
                      variants={mobileItemVariants}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsOpen(false)
                        console.log('Abrindo suporte...')
                      }}
                    >
                      <HeadphonesIcon className="w-4 h-4 mr-2" />
                      Suporte
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 