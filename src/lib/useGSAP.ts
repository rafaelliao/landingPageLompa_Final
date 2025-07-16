import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null)

  const animateIn = (animation: any) => {
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, animation.from, {
        ...animation.to,
        duration: animation.duration || 1,
        ease: animation.ease || 'power2.out',
        delay: animation.delay || 0
      })
    }
  }

  const animateOut = (animation: any) => {
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        ...animation,
        duration: animation.duration || 1,
        ease: animation.ease || 'power2.in'
      })
    }
  }

  const staggerIn = (elements: string, animation: any) => {
    gsap.fromTo(elements, animation.from, {
      ...animation.to,
      duration: animation.duration || 1,
      ease: animation.ease || 'power2.out',
      stagger: animation.stagger || 0.1,
      delay: animation.delay || 0
    })
  }

  const scrollTrigger = (animation: any) => {
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, animation.from, {
        ...animation.to,
        duration: animation.duration || 1,
        ease: animation.ease || 'power2.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: animation.start || 'top 80%',
          end: animation.end || 'bottom 20%',
          toggleActions: animation.toggleActions || 'play none none reverse'
        }
      })
    }
  }

  const timeline = () => {
    return gsap.timeline()
  }

  return {
    elementRef,
    animateIn,
    animateOut,
    staggerIn,
    scrollTrigger,
    timeline
  }
}

// Animações pré-definidas
export const animations = {
  fadeInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 }
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 }
  },
  slideInUp: {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 }
  },
  bounceIn: {
    from: { opacity: 0, scale: 0.3 },
    to: { opacity: 1, scale: 1, ease: 'back.out(1.7)' }
  }
} 