// Versão simplificada sem GSAP
import { useEffect, useRef } from 'react'

export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (elementRef.current) {
    }
  }, [])

  const animateIn = () => {
    if (elementRef.current) {
    }
  }

  const animateOut = () => {
    if (elementRef.current) {
    }
  }

  const createTimeline = () => {
    return null
  }

  return {
    elementRef,
    animateIn,
    animateOut,
    createTimeline
  }
} 