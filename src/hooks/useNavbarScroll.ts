import { useState, useEffect } from 'react'

export const useNavbarScroll = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Se está no início da página (scroll = 0), mantém a navbar visível
      if (currentScrollY === 0) {
        setIsVisible(true)
        setIsScrolling(false)
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }
        setLastScrollY(currentScrollY)
        return
      }
      
      // Se está rolando, mostra a navbar
      setIsVisible(true)
      setIsScrolling(true)
      
      // Limpa o timeout anterior
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Define um novo timeout para esconder a navbar após 1 segundo sem rolagem
      scrollTimeout = setTimeout(() => {
        setIsVisible(false)
        setIsScrolling(false)
      }, 1000)
      
      setLastScrollY(currentScrollY)
    }

    // Adiciona o listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [])

  return {
    isVisible,
    isScrolling,
    lastScrollY
  }
} 