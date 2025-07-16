'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GSAPDemo() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animação do título
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 100, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.5, 
          ease: 'back.out(1.7)',
          delay: 0.5
        }
      )
    }

    // Animação dos cards com stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.card')
      gsap.fromTo(cards, 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: 'power2.out',
          delay: 1
        }
      )
    }

    // Animação flutuante contínua
    if (floatingRef.current) {
      gsap.to(floatingRef.current, {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      })
    }

    // ScrollTrigger para animações baseadas no scroll
    const scrollElements = document.querySelectorAll('.scroll-animate')
    scrollElements.forEach((element) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Elemento flutuante */}
      <div 
        ref={floatingRef}
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#E11BFF] to-[#8217E7] rounded-full opacity-20 blur-xl"
      />

      <div className="container-custom">
        {/* Título animado */}
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-16"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Animações <span style={{ color: '#E321FF' }}>GSAP</span>
        </h2>

        {/* Cards com animação stagger */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E11BFF] to-[#8217E7] rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Performance</h3>
            <p className="text-white/80">Animações suaves e otimizadas para máxima performance</p>
          </div>

          <div className="card bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#8217E7] to-[#4807AD] rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Velocidade</h3>
            <p className="text-white/80">Transições rápidas e responsivas em todos os dispositivos</p>
          </div>

          <div className="card bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4807AD] to-[#3D0099] rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Precisão</h3>
            <p className="text-white/80">Controle total sobre timing, easing e sequências</p>
          </div>
        </div>

        {/* Seção com scroll trigger */}
        <div className="space-y-8">
          <div className="scroll-animate bg-white/5 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Scroll Trigger</h3>
            <p className="text-white/80">
              Esta seção aparece quando você faz scroll até ela. O GSAP detecta quando o elemento 
              entra na viewport e executa a animação automaticamente.
            </p>
          </div>

          <div className="scroll-animate bg-white/5 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Timeline</h3>
            <p className="text-white/80">
              Crie sequências complexas de animações com timelines. Controle a ordem, 
              duração e sobreposição de múltiplas animações.
            </p>
          </div>

          <div className="scroll-animate bg-white/5 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Stagger</h3>
            <p className="text-white/80">
              Animações em sequência com delay entre elementos. Perfeito para listas, 
              grids e elementos que devem aparecer um após o outro.
            </p>
          </div>
        </div>

        {/* Botão com hover animation */}
        <div className="text-center mt-16">
          <button 
            className="px-8 py-4 bg-gradient-to-r from-[#E11BFF] to-[#4807AD] text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
            onMouseEnter={(e) => {
              gsap.to(e.target, { scale: 1.05, duration: 0.3 })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, { scale: 1, duration: 0.3 })
            }}
          >
            Experimente as Animações
          </button>
        </div>
      </div>
    </section>
  )
} 