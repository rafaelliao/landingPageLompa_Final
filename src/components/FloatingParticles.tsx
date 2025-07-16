'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Cores só branco para máximo contraste, mas opacidade um pouco maior
    const colors = [
      'rgba(255,255,255,0.4)',
      'rgba(255,255,255,0.3)',
      'rgba(255,255,255,0.25)'
    ]

    // Criar partículas pequenas e poucas
    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(window.innerWidth / 50, 25)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 10, // Bem maiores
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.15 + 0.2, // Um pouco mais visíveis
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      return particles
    }

    particlesRef.current = createParticles()

    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Atualizar posição
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Borda da tela
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Manter partículas dentro da tela
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Desenhar partícula
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        
        // Gradiente branco sutil
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Conectar partículas próximas com linhas brancas
        // Linhas de conexão um pouco mais visíveis
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            )
            
            if (distance < 100) {
              ctx.save()
              ctx.globalAlpha = (100 - distance) / 100 * 0.12
              ctx.strokeStyle = '#fff'
              ctx.lineWidth = 0.8
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
              ctx.restore()
            }
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hidden lg:block fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ 
        background: 'transparent'
      }}
    />
  )
} 