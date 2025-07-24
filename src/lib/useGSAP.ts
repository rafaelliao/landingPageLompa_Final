// Versão simplificada sem GSAP
import { useEffect, useRef } from 'react'

export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      (process.env.NODE_ENV !== "production") && console.log('🎬 useGSAP inicializado (versão simplificada)')
    }
  }, [])

  const animateIn = () => {
    if (elementRef.current) {
      (process.env.NODE_ENV !== "production") && console.log('🎬 Animação de entrada (versão simplificada)')
    }
  }

  const animateOut = () => {
    if (elementRef.current) {
      (process.env.NODE_ENV !== "production") && console.log('🎬 Animação de saída (versão simplificada)')
    }
  }

  const createTimeline = () => {
    (process.env.NODE_ENV !== "production") && console.log('🎬 Timeline criado (versão simplificada)')
    return null
  }

  return {
    elementRef,
    animateIn,
    animateOut,
    createTimeline
  }
} 