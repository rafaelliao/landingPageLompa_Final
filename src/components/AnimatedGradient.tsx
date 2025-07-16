'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedGradient() {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gradientRef.current) return

    // Cores do tema da landing page
    const colors = [
      'linear-gradient(135deg, #E11BFF 0%, #8217E7 20%, #7D15E2 40%, #7111D4 60%, #5D0ABD 80%, #41019D 90%, #3D0099 100%)',
      'linear-gradient(135deg, #8217E7 0%, #7D15E2 20%, #7111D4 40%, #5D0ABD 60%, #4807AD 80%, #3D0099 90%, #E11BFF 100%)',
      'linear-gradient(135deg, #7D15E2 0%, #7111D4 20%, #5D0ABD 40%, #4807AD 60%, #3D0099 80%, #E11BFF 90%, #8217E7 100%)',
      'linear-gradient(135deg, #7111D4 0%, #5D0ABD 20%, #4807AD 40%, #3D0099 60%, #E11BFF 80%, #8217E7 90%, #7D15E2 100%)',
      'linear-gradient(135deg, #5D0ABD 0%, #4807AD 20%, #3D0099 40%, #E11BFF 60%, #8217E7 80%, #7D15E2 90%, #7111D4 100%)',
      'linear-gradient(135deg, #4807AD 0%, #3D0099 20%, #E11BFF 40%, #8217E7 60%, #7D15E2 80%, #7111D4 90%, #5D0ABD 100%)',
    ]

    let currentIndex = 0

    const animateGradient = () => {
      const nextIndex = (currentIndex + 1) % colors.length
      
      gsap.to(gradientRef.current, {
        background: colors[nextIndex],
        duration: 8,
        ease: 'power2.inOut',
        onComplete: () => {
          currentIndex = nextIndex
          animateGradient()
        }
      })
    }

    // Iniciar animação
    animateGradient()

    // Cleanup
    return () => {
      gsap.killTweensOf(gradientRef.current)
    }
  }, [])

  return (
    <div
      ref={gradientRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{
        background: 'linear-gradient(135deg, #E11BFF 0%, #8217E7 20%, #7D15E2 40%, #7111D4 60%, #5D0ABD 80%, #41019D 90%, #3D0099 100%)',
        transition: 'background 8s ease-in-out'
      }}
    />
  )
} 