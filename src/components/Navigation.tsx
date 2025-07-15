'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, HeadphonesIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from './Logo'
import type { NavItem } from '@/types'

interface NavigationProps {
  items: NavItem[]
  className?: string
}

export default function Navigation({ items, className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md shadow-lg' 
          : 'bg-transparent',
        className
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
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
              {items.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'text-white/80 hover:text-white transition-colors duration-200 font-medium',
                    item.external && 'flex items-center space-x-1'
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                  {item.external && <ChevronDown className="w-4 h-4" />}
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            className="hidden lg:flex items-center space-x-4"
            variants={itemVariants}
          >
            <motion.button
              className="flex items-center justify-center px-6 py-3 rounded-lg text-white transition-all duration-200 transform hover:scale-105 gap-2"
              style={{ 
                backgroundColor: '#4807AD',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HeadphonesIcon className="w-5 h-5" />
              Suporte
            </motion.button>
            <motion.button
              className="flex items-center justify-center px-6 py-3 rounded-lg text-white transition-all duration-200 transform hover:scale-105"
              style={{ 
                backgroundColor: '#4807AD',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Acesso Vendedor
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-white/10 backdrop-blur-md rounded-lg mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4 px-4">
                {items.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.95 }}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  className="flex items-center justify-center px-6 py-3 rounded-lg text-white transition-all duration-200 w-full gap-2"
                  style={{ 
                    backgroundColor: '#4807AD',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  <HeadphonesIcon className="w-5 h-5" />
                  Suporte
                </motion.button>
                
                <motion.button
                  className="flex items-center justify-center px-6 py-3 rounded-lg text-white transition-all duration-200 w-full"
                  style={{ 
                    backgroundColor: '#4807AD',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  Acesso Vendedor
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
} 