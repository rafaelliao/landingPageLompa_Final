import { useState, useEffect } from 'react'

export interface ResponsiveConfig {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

export function useResponsive(): ResponsiveConfig {
  const [responsiveConfig, setResponsiveConfig] = useState<ResponsiveConfig>(() => {
    // Inicialização com valores corretos baseados no tamanho atual da janela
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      const height = window.innerHeight
      
      let breakpoint: ResponsiveConfig['breakpoint'] = 'xs'
      if (width >= BREAKPOINTS['2xl']) breakpoint = '2xl'
      else if (width >= BREAKPOINTS.xl) breakpoint = 'xl'
      else if (width >= BREAKPOINTS.lg) breakpoint = 'lg'
      else if (width >= BREAKPOINTS.md) breakpoint = 'md'
      else if (width >= BREAKPOINTS.sm) breakpoint = 'sm'
      
      return {
        isMobile: width < BREAKPOINTS.md,
        isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg,
        screenWidth: width,
        screenHeight: height,
        breakpoint
      }
    }
    
    return {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    breakpoint: 'xs'
    }
  })

  useEffect(() => {
    const updateResponsiveConfig = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Determinar breakpoint
      let breakpoint: ResponsiveConfig['breakpoint'] = 'xs'
      if (width >= BREAKPOINTS['2xl']) breakpoint = '2xl'
      else if (width >= BREAKPOINTS.xl) breakpoint = 'xl'
      else if (width >= BREAKPOINTS.lg) breakpoint = 'lg'
      else if (width >= BREAKPOINTS.md) breakpoint = 'md'
      else if (width >= BREAKPOINTS.sm) breakpoint = 'sm'

      setResponsiveConfig({
        isMobile: width < BREAKPOINTS.md,
        isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg,
        screenWidth: width,
        screenHeight: height,
        breakpoint
      })
    }

    // Configuração inicial
    updateResponsiveConfig()

    // Listener para mudanças de tamanho
    window.addEventListener('resize', updateResponsiveConfig)
    window.addEventListener('orientationchange', updateResponsiveConfig)

    return () => {
      window.removeEventListener('resize', updateResponsiveConfig)
      window.removeEventListener('orientationchange', updateResponsiveConfig)
    }
  }, [])

  return responsiveConfig
} 